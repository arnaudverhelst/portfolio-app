// Cloudflare Pages Function: /api/journal
// Stores each signed-in user's journal notes in the USERS KV under "jr:<email>".
import {who} from "./users.js";
const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
export async function onRequestGet({request,env}){
  const w=await who(request,env);if(!w.email||!env.USERS)return J({error:"not signed in"},401);
  const v=await env.USERS.get("jr:"+w.email,"json")||{notes:[],del:[]};
  return J({notes:v.notes||[],del:v.del||[]});
}
export async function onRequestPut({request,env}){
  const w=await who(request,env);if(!w.email||!env.USERS)return J({error:"not signed in"},401);
  const b=await request.json().catch(()=>null);
  if(!b||!Array.isArray(b.notes))return J({error:"bad request"},400);
  const v=JSON.stringify({notes:b.notes,del:Array.isArray(b.del)?b.del.slice(-2000):[]});
  if(v.length>2e6)return J({error:"too large"},413);
  await env.USERS.put("jr:"+w.email,v);
  return J({ok:true});
}
