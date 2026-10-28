// Cloudflare Pages Function: /api/users
// Needs: KV binding USERS; env vars ADMIN_EMAIL, TEAM_DOMAIN (xxx.cloudflareaccess.com), POLICY_AUD.
const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
const b64u=s=>{s=s.replace(/-/g,"+").replace(/_/g,"/");s+="=".repeat((4-s.length%4)%4);return Uint8Array.from(atob(s),c=>c.charCodeAt(0))};
const today=()=>new Date().toISOString().slice(0,10);
let CERTS=null,CT=0;
async function who(req,env){
  const t=req.headers.get("Cf-Access-Jwt-Assertion"),TD=String(env.TEAM_DOMAIN||"").replace(/^https?:\/\//,"").replace(/\/+$/,"").trim(),AUD=String(env.POLICY_AUD||"").trim();
  if(!t)return {why:"no-login-header (site not behind Access, or you opened a URL Access does not cover)"};
  if(!TD||!AUD)return {why:"TEAM_DOMAIN or POLICY_AUD missing in Pages variables"};
  try{
    const [h,p,s]=t.split("."),hd=JSON.parse(new TextDecoder().decode(b64u(h))),pl=JSON.parse(new TextDecoder().decode(b64u(p)));
    if(pl.exp*1000<Date.now()||pl.iss!=="https://"+TD||![].concat(pl.aud).includes(AUD))return {why:"TEAM_DOMAIN or POLICY_AUD does not match this Access application"};
    if(!CERTS||Date.now()-CT>36e5){CERTS=await (await fetch("https://"+TD+"/cdn-cgi/access/certs")).json();CT=Date.now()}
    const k=CERTS.keys.find(x=>x.kid===hd.kid);if(!k)return {why:"signing key not found"};
    const key=await crypto.subtle.importKey("jwk",k,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},false,["verify"]);
    const ok=await crypto.subtle.verify("RSASSA-PKCS1-v1_5",key,b64u(s),new TextEncoder().encode(h+"."+p));
    return ok&&pl.email?{email:pl.email.toLowerCase()}:{why:"token check failed"};
  }catch(e){return {why:"error: "+e.message}}
}
async function list(env){
  const l=await env.USERS.list(),o=[];
  for(const k of l.keys){const v=await env.USERS.get(k.name,"json");if(v)o.push(v)}
  return o.sort((a,b)=>a.joined<b.joined?-1:a.joined>b.joined?1:0);
}
export async function onRequestGet({request,env}){
  const w=await who(request,env);if(!w.email)return J({admin:false,why:w.why});
  const em=w.email;
  if(!env.USERS)return J({admin:false,why:"KV binding USERS missing"});
  const adm=em===(env.ADMIN_EMAIL||"").toLowerCase();
  let u=await env.USERS.get(em,"json")||{email:em,name:"",plan:"Free",status:"Active",joined:today()};
  u.last=today();await env.USERS.put(em,JSON.stringify(u));
  if(!adm&&u.status==="Suspended")return J({admin:false,suspended:true});
  return J({email:em,admin:adm,users:adm?await list(env):undefined});
}
export async function onRequestPost({request,env}){
  const em=(await who(request,env)).email;
  if(!em||em!==(env.ADMIN_EMAIL||"").toLowerCase())return J({error:"forbidden"},403);
  const b=await request.json().catch(()=>({})),t=String(b.email||"").trim().toLowerCase();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(t))return J({error:"email"},400);
  if(b.op==="del"){if(t!==em)await env.USERS.delete(t)}
  else{
    const u=await env.USERS.get(t,"json")||{email:t,name:"",plan:"Free",status:"Active",joined:today()};
    if(b.op==="add"&&b.name)u.name=String(b.name).slice(0,80);
    if(b.plan)u.plan=b.plan==="Pro"?"Pro":"Free";
    if(b.status&&t!==em)u.status=b.status==="Suspended"?"Suspended":"Active";
    await env.USERS.put(t,JSON.stringify(u));
  }
  return J({email:em,admin:true,users:await list(env)});
}
