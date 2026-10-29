// Cloudflare Pages Function: /api/users
// Needs: KV binding USERS; env vars ADMIN_EMAIL, TEAM_DOMAIN (xxx.cloudflareaccess.com), POLICY_AUD.
const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
const b64u=s=>{s=s.replace(/-/g,"+").replace(/_/g,"/");s+="=".repeat((4-s.length%4)%4);return Uint8Array.from(atob(s),c=>c.charCodeAt(0))};
const today=()=>new Date().toISOString().slice(0,10);
const PLANS=["Free","Paid","Suspended","Discount"];
const ago=n=>new Date(Date.now()-n*864e5).toISOString().slice(0,10);
const blank=(em)=>({email:em,name:"",plan:"Free",joined:today(),last:"",n:0,ld:{},seen:0});
function norm(u){
  if(u.plan==="Pro")u.plan="Paid";
  if(u.status==="Suspended")u.plan="Suspended";
  delete u.status;
  if(!u.ld)u.ld={};if(!u.n)u.n=0;if(!u.seen)u.seen=0;if(u.last===undefined)u.last="";
  return u;
}
/* one login = first visit after 30 minutes of silence */
function touch(u){
  const now=Date.now();
  if(u.seen&&now-u.seen<18e5)return false;
  u.seen=now;u.n++;u.last=today();u.ld[u.last]=(u.ld[u.last]||0)+1;
  const cut=ago(62);for(const d in u.ld)if(d<cut)delete u.ld[d];
  return true;
}
function stats(u){
  const t=today(),wd=(new Date().getUTCDay()+6)%7,wk=ago(wd),mo=t.slice(0,8)+"01",d30=ago(29);
  let day=0,week=0,month=0,days=0;
  for(const d in u.ld){const c=u.ld[d];if(d===t)day+=c;if(d>=wk)week+=c;if(d>=mo)month+=c;if(d>=d30)days++}
  return {email:u.email,name:u.name,plan:u.plan,joined:u.joined,last:u.last,today:day,week:week,month:month,total:u.n,days:days};
}
let CERTS=null,CT=0;
export async function who(req,env){
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
  for(const k of l.keys){if(k.name.startsWith("jr:"))continue;const v=await env.USERS.get(k.name,"json");if(v)o.push(stats(norm(v)))}
  return o.sort((a,b)=>a.joined<b.joined?-1:a.joined>b.joined?1:0);
}
export async function onRequestGet({request,env}){
  const w=await who(request,env);if(!w.email)return J({admin:false,why:w.why});
  const em=w.email;
  if(!env.USERS)return J({admin:false,why:"KV binding USERS missing"});
  const adm=em===String(env.ADMIN_EMAIL||"").trim().toLowerCase();
  let u=norm(await env.USERS.get(em,"json")||blank(em)),ch=touch(u);
  if(adm&&u.plan!=="Master"){u.plan="Master";ch=true}
  if(ch)await env.USERS.put(em,JSON.stringify(u));
  if(!adm&&u.plan==="Suspended")return J({admin:false,suspended:true});
  return J({email:em,admin:adm,plan:u.plan,users:adm?await list(env):undefined});
}
export async function onRequestPost({request,env}){
  const em=(await who(request,env)).email;
  if(!em||em!==String(env.ADMIN_EMAIL||"").trim().toLowerCase())return J({error:"forbidden"},403);
  const b=await request.json().catch(()=>({})),t=String(b.email||"").trim().toLowerCase();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(t))return J({error:"email"},400);
  if(b.op==="del"){if(t!==em)await env.USERS.delete(t)}
  else{
    const u=norm(await env.USERS.get(t,"json")||blank(t));
    if(b.op==="add"&&b.name)u.name=String(b.name).slice(0,80);
    /* Master only for the admin account; the admin plan cannot be changed */
    if(t===em)u.plan="Master";
    else if(PLANS.includes(b.plan))u.plan=b.plan;
    await env.USERS.put(t,JSON.stringify(u));
  }
  return J({email:em,admin:true,users:await list(env)});
}
