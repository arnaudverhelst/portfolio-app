const PROXY="https://price-proxy.arnaudverhelst.workers.dev";
const MON={jan:0,feb:1,mar:2,mrt:2,apr:3,may:4,mei:4,jun:5,jul:6,aug:7,sep:8,oct:9,okt:9,nov:10,dec:11};
const SUF={xams:".AS",xetr:".DE",xpar:".PA",xbru:".BR",xlon:".L",xmil:".MI",xswx:".SW",xmad:".MC",xhel:".HE",xsto:".ST",xcse:".CO",xosl:".OL",xtsx:".V",xtse:".TO",xasx:".AX",xhkg:".HK"};
const TFS=["1D","1W","1M","3M","6M","YTD","1Y","3Y","5Y","Max"];
const PALS={
light:["#1d4ed8","#ea580c","#059669","#7c3aed","#0891b2","#db2777","#ca8a04","#475569","#65a30d","#dc2626","#0d9488","#9333ea","#a8a29e"],
dark:["#4f8cff","#ef6a4c","#3fd0a0","#a78bfa","#6fd6e0","#f472b6","#f2b84b","#9aa5bd","#b5e04f","#ff9a6b","#2dd4bf","#c9b6ff","#d9d2c3"]};
let MODEV="light";
let COL=PALS.light.slice(0,6);
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}},del:k=>{try{localStorage.removeItem(k)}catch(e){}}};
let ov={},IS={},SC={},BV="all";try{ov=JSON.parse(ls.get("ov")||"{}")}catch(e){}try{IS=JSON.parse(ls.get("isin")||"{}")}catch(e){}
let AC=[],DV=[],AO=[],SXD=[],POSL=[],TAB="r",DET=null,ALV="h",CTF="Max",PTF="Max",CU=false,DBG=false,DTF="Max",tx=[],days=[],P={},rows=[],ser={},TF="Max",SK=[],IG={},OP=[],MODE=1,VM="v",CF="2026-01-01",CT="2026-04-30",FX={},G={};
const msg=t=>{$("msg").textContent=t};
const infoI=t=>'<span class="inf" tabindex="0" data-tip="'+esc(t)+'"></span>';
const BMN={"IWDA.AS":"World (MSCI World)","VWCE.DE":"All-World (FTSE)","VUAA.AS":"S&P 500","^STOXX50E":"Euro Stoxx 50","^NDX":"Nasdaq 100"};
const bmLab=n=>BMN[n]||n;
const BMP=[["IWDA.AS","World"],["VWCE.DE","All-World"],["VUAA.AS","S&P 500"],["^STOXX50E","Euro Stoxx 50"],["^NDX","Nasdaq 100"]];
const ekc=v=>HIDE?"":v>=1e6?"\u20ac"+(+(v/1e6).toFixed(2))+"M":v>=1e3?"\u20ac"+Math.round(v/1e3)+"k":"\u20ac"+Math.round(v);
const actB=()=>{const L=rows.filter(r=>r.kind==="b");return L.find(r=>r.name===BMA)||L[0]};
let VT=["1D","1M","YTD","1Y","Max"],DVM="m",DVS="",DVT="chart",BMA=ls.get("bma")||"",TXV="table",TXS="",TXF="all",TXO=-1;try{const v=JSON.parse(ls.get("vt")||"null");if(v&&v.length)VT=v}catch(e){}
const TFA=()=>TFS.filter(t=>t==="Max"||iStart(t)>=0);
const VTs=()=>{const a=TFA().filter(t=>VT.includes(t));return a.length?a:["Max"]};
let HIDE=ls.get("hide")==="1",PF=ls.get("pf")||"open",OPS=new Set(),PB=ls.get("pb")||"me",PT=ls.get("pt")||"all";
function fxAt(c,d){const f=FX[c];if(!f)return 1;let a=0,b=f.d.length-1,j=0;while(a<=b){const m=(a+b)>>1;if(f.d[m]<=d){j=m;a=m+1}else b=m-1}return f.v[j]}
function retPx(r,t){
const L=days.length-1,p=P[r.k],x=ser[r.k];
if(t==="Max"){
if(!x||!x.d.length)return null;
const pen=x.cur==="GBp"||x.cur==="GBX",c=pen?"GBP":x.cur,e=(c&&c!=="EUR"&&FX[c])?fxAt(c,x.d[0]):1,p0=x.v[0]*(pen?0.01:1)/e;
return p0>0?p[L]/p0-1:null;
}
const i0=iStart(t);if(i0<0||i0>=L)return null;return p[L]/p[i0]-1;
}
const sh=v=>HIDE?"\u2022\u2022\u2022":v;
const rt=(r,t)=>PB==="stock"&&r.k&&P[r.k]?retPx(r,t):ret(r,t);
const pf=k=>(PF==="all"||(PF==="open")===OPS.has(k))&&(PT==="all"||typOf(k)===PT);
const TYPS={ETF:"ETFs",Stock:"stocks",Derivative:"derivatives"};
let WB={age:30,start:null,monthly:500,grow:0,ret:7,infl:2,income:2500,wr:4,years:25,real:false,mode:"age"};try{Object.assign(WB,JSON.parse(ls.get("wb")||"{}"))}catch(e){}
const pfChips=()=>TAB!=="r"&&TAB!=="p"?"":'<div class="tfc"><span class="mu">Show: </span>'+[["open","Open positions"],["closed","Closed positions"],["all","All positions"]].map(z=>'<button data-pf="'+z[0]+'"'+(PF===z[0]?' class="on"':"")+'>'+z[1]+'</button>').join("")+'<span class="mu" style="flex-basis:100%">Type: </span>'+[["all","All types"],["ETF","ETFs"],["Stock","Stocks"],["Derivative","Derivatives"]].map(z=>'<button data-pt="'+z[0]+'"'+(PT===z[0]?' class="on"':"")+'>'+z[1]+'</button>').join("")+'</div>';
function subRow(){
const ks=new Set(G.keys.filter(k=>pf(k)));if(!ks.size)return null;
const r=twrr(ks,MODE);return {name:(PT==="all"?"Total portfolio":"Total "+TYPS[PT])+(PF==="all"?"":" ("+(PF==="open"?"open":"closed")+" positions)"),idx:r.idx,st:r.st,held:r.held};
}
const e2=v=>HIDE?"\u20ac\u2022\u2022\u2022":(v<0?"-":"")+"\u20ac"+(Math.abs(v)).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
const ysym=s=>{const p=s.split(":");return p[0]+(SUF[(p[1]||"").toLowerCase()]||"")};
const map=s=>ov[s]||IS[s]||ysym(s);
function pd(s){
s=String(s).trim();
if(/^\d{5}$/.test(s))return new Date(Date.UTC(1899,11,30)+(+s)*864e5).toISOString().slice(0,10);let m=s.match(/^(\d{1,2})[-\/ .]([A-Za-z]+)[-\/ .](\d{4})$/);
if(m){const mo=MON[m[2].slice(0,3).toLowerCase()];if(mo===undefined)return null;return new Date(Date.UTC(+m[3],mo,+m[1])).toISOString().slice(0,10)}
m=s.match(/^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4})$/);
if(m)return new Date(Date.UTC(+m[3],+m[2]-1,+m[1])).toISOString().slice(0,10);
return null;
}
function parseTable(t){
const first=t.split(/\r?\n/)[0];
const d=["\t",";",","].map(c=>[c,first.split(c).length]).sort((a,b)=>b[1]-a[1])[0][0];
const out=[];let row=[],f="",q=false;
for(let i=0;i<t.length;i++){
const c=t[i];
if(q){if(c=='"'){if(t[i+1]=='"'){f+='"';i++}else q=false}else f+=c}
else if(c=='"')q=true;
else if(c==d){row.push(f);f=""}
else if(c=="\n"){row.push(f);out.push(row);row=[];f=""}
else if(c!="\r")f+=c;
}
if(f||row.length){row.push(f);out.push(row)}
return out;
}
function num(v){
let s=String(v==null?"":v).trim().replace(/\s/g,"");if(!s)return NaN;
const c=s.lastIndexOf(","),d=s.lastIndexOf(".");
if(c>=0&&d>=0)s=c>d?s.replace(/\./g,"").replace(",","."):s.replace(/,/g,"");
else if(c>=0)s=s.replace(",",".");
return parseFloat(s);
}
function toTx(t){
const r=parseTable(t.replace(/^\uFEFF/,"")).filter(x=>x.length>3);
if(!r.length)throw new Error("No table found in the text.");
IG={};SXD=[];
let hi=r.findIndex(x=>x.some(c=>c.trim().toLowerCase()==="transactiedatum"));if(hi<0)hi=0;
const h=r[hi].map(x=>x.trim().toLowerCase()),ix=n=>h.indexOf(n);
const iD=ix("transactiedatum"),iS=ix("instrumentsymbool"),iA=ix("acties"),iN=ix("instrument"),iT=ix("type"),iC=ix("aantal"),iR=ix("omrekeningskoers"),iV=ix("instrumentvaluta");
if(iD<0||iS<0||iA<0)throw new Error("Columns not found. The first line must contain Transactiedatum, Instrumentsymbool and Acties.");
const a=[];
for(const x of r.slice(hi+1)){
const m=(x[iA]||"").match(/^\s*(koop|verkoop|buy|sell)\s+(-?[\d.]+)\s*@\s*([\d.]+)/i),d=pd(x[iD]);
if(d&&x[iS]&&/cashdividend/i.test(x[iA]||"")){const am=iC>=0?num(x[iC]):NaN,rr=iR>=0?num(x[iR]):NaN;if(isFinite(am))SXD.push({k:"div",d:d,s:x[iS].trim(),n:(x[iN]||x[iS]).trim(),eur:am*(rr>0?rr:1),b:"Saxo"})}
if(!m||!d||!x[iS]){const kk=((iT>=0?x[iT]:"")+" | "+(x[iA]||"").replace(/[-\d.,@]+/g,"").trim()).slice(0,60);IG[kk]=(IG[kk]||0)+1;continue}
const sell=/^(verkoop|sell)/i.test(m[1]);
a.push({d:d,s:x[iS].trim(),n:(x[iN]||x[iS]).trim(),q:(sell?-1:1)*Math.abs(parseFloat(m[2])),px:parseFloat(m[3]),c:iC>=0?num(x[iC]):NaN,rt:iR>=0?num(x[iR]):NaN,cur:iV>=0?(x[iV]||"").trim():"",b:"Saxo"});
}
a.sort((p,q)=>p.d<q.d?-1:p.d>q.d?1:0);
return a;
}
async function getSeries(sym){
const r=await fetch(PROXY+"/?symbol="+encodeURIComponent(sym)+"&range=10y&interval=1d");
const j=await r.json();
const res=j.chart&&j.chart.result&&j.chart.result[0];
if(!res)throw new Error(sym+": no data");
const ts=res.timestamp||[],off=res.meta.gmtoffset||0;
const qc=res.indicators.quote[0].close,ac=res.indicators.adjclose&&res.indicators.adjclose[0].adjclose;
const p=ac||qc,d=[],v=[],cv=[];
ts.forEach((t,i)=>{if(p[i]!=null){d.push(new Date((t+off)*1000).toISOString().slice(0,10));v.push(p[i]);cv.push(qc[i]!=null?qc[i]:p[i])}});
if(!d.length)throw new Error(sym+": empty");
const sp=[],evs=res.events&&res.events.splits;
if(evs)for(const k in evs){const e=evs[k];sp.push({d:new Date(((e.date||+k)+off)*1000).toISOString().slice(0,10),f:e.numerator/e.denominator,r:e.numerator+":"+e.denominator})}
return {d:d,v:v,type:res.meta.instrumentType,name:res.meta.longName||res.meta.shortName||sym,cur:res.meta.currency,gran:res.meta.dataGranularity,sp:sp,cv:cv};
}
function align(s,vv){vv=vv||s.v;
const o=[];let j=0,last=vv[0];
for(const d of days){while(j<s.d.length&&s.d[j]<=d){last=vv[j];j++}o.push(last)}
return o;
}
function twrr(ks,mode){
const pos={},bas={};let k=0,idx=100,pv=0,st=-1;const out=[],held=new Uint8Array(days.length);
for(let i=0;i<days.length;i++){
let B=0,S=0;
while(k<tx.length&&tx[k].di<=i){
const t=tx[k],s=t.key;k++;
if(!ks.has(s))continue;
const f=mode?t.fc:t.fg,buy=t.q>0;
if(!isFinite(f))continue;
if(buy)B+=f;else S+=f;
const q0=pos[s]||0;
if(t.opt){
const q1=q0+t.q;
if((q0>=0&&buy)||(q0<=0&&!buy))bas[s]=(bas[s]||0)+(buy?f:-f);
else if(q0!==0)bas[s]=(bas[s]||0)*(q1/q0);
pos[s]=q1;
}else pos[s]=q0+t.qa;
if(Math.abs(pos[s])<1e-9){pos[s]=0;bas[s]=0}
}
for(const s in G.ex)if(G.ex[s]===i&&ks.has(s)){pos[s]=0;bas[s]=0}
let v=0;for(const s in pos)v+=P[s]?pos[s]*P[s][i]:(bas[s]||0);
if(B>0&&st<0)st=i;
if(pv+B>0)idx*=1+Math.max(-0.9999,(v+S-B-pv)/(pv+B));
held[i]=(pv>0||B>0)?1:0;
pv=v;out.push(idx);
}
return {idx:out,st:st,held:held};
}
function iStart(tf){
if(tf==="Max")return 0;
const e=new Date(days[days.length-1]+"T00:00:00Z");let s;
if(tf==="YTD")s=(e.getUTCFullYear()-1)+"-12-31";
else{if(tf==="1D")return Math.max(0,days.length-2);if(tf==="1W")e.setUTCDate(e.getUTCDate()-7);else e.setUTCMonth(e.getUTCMonth()-{"1M":1,"3M":3,"6M":6,"1Y":12,"3Y":36,"5Y":60}[tf]);s=e.toISOString().slice(0,10)}
let i=-1;for(let j=0;j<days.length&&days[j]<=s;j++)i=j;
return i;
}
const MN=["January","February","March","April","May","June","July","August","September","October","November","December"];
const fd=d=>{if(!d)return "";const p=d.split("-");return (+p[2])+" "+MN[+p[1]-1]+" '"+p[0].slice(2)};
const hasHeld=(h,a,b)=>{for(let i=a+1;i<=b;i++)if(h[i])return true;return false};
const dayIdx=d=>{let i=-1;for(let j=0;j<days.length&&days[j]<=d;j++)i=j;return i};
function valueAt(i,ks){
const pos={},bas={};let v=0;
tx.forEach(t=>{
if(t.di>i||(ks&&!ks.has(t.key)))return;const s=t.key;
if(t.opt){
const q0=pos[s]||0,q1=q0+t.q,f=t.fc,buy=t.q>0;
if((q0>=0&&buy)||(q0<=0&&!buy))bas[s]=(bas[s]||0)+(buy?f:-f);else if(q0!==0)bas[s]=(bas[s]||0)*(q1/q0);
pos[s]=q1;
}else pos[s]=(pos[s]||0)+t.qa;
});
for(const s in pos){
if(Math.abs(pos[s])<1e-9)continue;
if(P[s])v+=pos[s]*P[s][i]/(G.DR[s]?G.DR[s][i]:1);
else if(!(G.ex[s]!==undefined&&G.ex[s]<=i))v+=bas[s]||0;
}
return v;
}
function periodInfo(){
const a=dayIdx(CF),b=dayIdx(CT);
if(a<0||b<=a)return "";
const X=valueAt(a),Y=valueAt(b);let net=0,w=0;
tx.forEach(t=>{if(t.di>a&&t.di<=b){const f=(t.q>0?1:-1)*t.fc;net+=f;w+=f*(b-t.di)/(b-a)}});
const profit=Y-X-net,den=X+w;
return '<p class="mu">Holdings only (no cash). Value on '+fd(days[a])+': <b>'+eur(X)+'</b>. Value on '+fd(days[b])+': <b>'+eur(Y)+'</b>. Bought minus sold in between: <b>'+eur(net)+'</b>. Profit: <b>'+eur(profit)+'</b>'+(den>0?'. Simple money-weighted return: <b>'+(profit/den*100).toFixed(1)+'%</b>':'')+'.</p>';
}
function cagr(r){
if(PB==="stock"&&r.k&&P[r.k]&&ser[r.k]){const v=retPx(r,"Max");if(v==null)return null;const y=(new Date(days[days.length-1])-new Date(ser[r.k].d[0]))/864e5/365.25;return y<0.9?null:Math.pow(1+v,1/y)-1}
const v=ret(r,"Max");if(v==null)return null;
let e=days.length-1;
if(r.held){e=-1;for(let i=days.length-1;i>=0;i--)if(r.held[i]){e=i;break}if(e<0)return null}
const y=(new Date(days[e])-new Date(days[Math.max(0,r.st)]))/864e5/365.25;
return y<0.9?null:Math.pow(1+v,1/y)-1;
}
function ret(r,tf){
if(tf==="C"){const ia=d=>{let i=-1;for(let j=0;j<days.length&&days[j]<=d;j++)i=j;return i},a=ia(CF),b=ia(CT);return(a<0||b<=a||r.st<0||a<r.st||(r.held&&!hasHeld(r.held,a,b)))?null:r.idx[b]/r.idx[a]-1}
const L=days.length-1;
if(tf==="Max"&&r.kind!=="b")return r.st<0?null:r.idx[L]/100-1;
const i0=tf==="Max"?r.st:iStart(tf);
if(i0<0||r.st<0||i0<r.st||i0>=L)return null;
if(r.held&&!hasHeld(r.held,i0,L))return null;
return r.idx[L]/r.idx[i0]-1;
}
const cell=v=>v==null?'<td class="mu">–</td>':'<td class="'+(v>=0?"pos":"neg")+'">'+(v>0?"+":"")+(v*100).toFixed(1)+"%</td>";
let CH=[];
const pctf=v=>(v>0?"+":"")+v.toFixed(1)+"%";
const CD={ch:{W:700,H:336},dv:{W:700,H:300}};
function lineChart(S,x0,L,fmt,zero,marks,rid){
const id=rid==null?CH.length:rid,W=CD.ch.W,H=CD.ch.H,pl=58,pr=10,pt=12,pb=26;
let mn=zero?0:1e18,mx=zero?0:-1e18;
S.forEach(s=>s.v.forEach(v=>{if(v<mn)mn=v;if(v>mx)mx=v}));
(marks||[]).forEach(m=>{if(m.v<mn)mn=m.v;if(m.v>mx)mx=m.v});
if(mx===mn){mx+=1;mn-=1}
const raw=(mx-mn)/4,pw=Math.pow(10,Math.floor(Math.log10(raw))),fr=raw/pw,step=(fr<=1?1:fr<=2?2:fr<=2.5?2.5:fr<=5?5:10)*pw;
mn=Math.floor(mn/step+1e-9)*step;mx=Math.ceil(mx/step-1e-9)*step;
const xs=i=>pl+(i-x0)*(W-pl-pr)/(L-x0),ys=v=>H-pb-(v-mn)*(H-pt-pb)/(mx-mn);
let g="";
const n=Math.round((mx-mn)/step);
for(let k=0;k<=n;k++){
const v=mn+k*step,z=Math.abs(v)<step/1000,y=ys(v).toFixed(1);
g+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y+'" y2="'+y+'" class="gl" stroke="currentColor" opacity="'+(z?".5":".09")+'"'+(z?' stroke-dasharray="5 4"':"")+'/><text x="'+(pl-7)+'" y="'+(+y+4)+'" font-size="12" text-anchor="end" fill="currentColor">'+fmt(z?0:v)+'</text>';
}
if(S.length<=2&&S[0].v.length>1){
const s0=S[0],by=ys(zero?0:mn).toFixed(1);let d="M"+xs(s0.a).toFixed(1)+","+by;
s0.v.forEach((v,j)=>{d+="L"+xs(s0.a+j).toFixed(1)+","+ys(v).toFixed(1)});
d+="L"+xs(s0.a+s0.v.length-1).toFixed(1)+","+by+"Z";
g+='<defs><linearGradient id="ag'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+COL[0]+'" style="stop-opacity:var(--ao)"/><stop offset="1" stop-color="'+COL[0]+'" stop-opacity="0"/></linearGradient></defs><path d="'+d+'" fill="url(#ag'+id+')"/>';
}
S.forEach((s,k)=>{g+='<polyline class="ln" stroke="'+COL[k%COL.length]+'" stroke-linejoin="round" stroke-linecap="round" points="'+s.v.map((v,j)=>xs(s.a+j).toFixed(1)+","+ys(v).toFixed(1)).join(" ")+'"/><circle cx="'+xs(s.a+s.v.length-1).toFixed(1)+'" cy="'+ys(s.v[s.v.length-1]).toFixed(1)+'" r="3.5" fill="'+COL[k%COL.length]+'" style="stroke:var(--card)" stroke-width="1.5"/>'});
(marks||[]).forEach(m=>{g+='<circle cx="'+xs(m.i).toFixed(1)+'" cy="'+ys(m.v).toFixed(1)+'" r="5" fill="'+m.c+'" style="stroke:var(--card)" stroke-width="2"/>'});
[...new Set([x0,Math.round((x0+L)/2),L])].forEach((i,k)=>{g+='<text x="'+xs(i).toFixed(1)+'" y="'+(H-7)+'" font-size="12" text-anchor="'+(i===x0?"start":i===L?"end":"middle")+'" fill="currentColor">'+fd(days[i])+'</text>'});
g+='<line id="cur'+id+'" y1="'+pt+'" y2="'+(H-pb)+'" stroke="currentColor" opacity=".55" visibility="hidden"/><g id="tg'+id+'" visibility="hidden" pointer-events="none"></g>';
CH[id]={S:S,x0:x0,L:L,fmt:fmt,zero:zero,marks:marks,pl:pl,pr:pr,W:W,H:H,pt:pt,pb:pb,mn:mn,mx:mx};
const lg=S.map((s,k)=>'<span><b style="color:'+COL[k%COL.length]+'">●</b> '+esc(s.name)+'</span>').join("");
return '<svg class="ch" data-c="'+id+'" viewBox="0 0 '+W+' '+H+'">'+g+'</svg><div class="lg">'+lg+'</div>'+(TAB==="r"?"":'<div class="mu">Hover over the chart, or touch and drag on a phone, to see the values.</div>');
}
function chart(){
const L=days.length-1,i0=Math.max(iStart(TF),0);
const S=rows.filter(r=>r.chart&&r.st>=0).map(r=>{
const a=Math.max(i0,r.st),bs=(TF==="Max"&&r.kind!=="b")?100:r.idx[a],v=[];
for(let i=a;i<=L;i++)v.push((r.idx[i]/bs-1)*100);
return {name:r.name,a:a,v:v};
}).filter(s=>s.a<L);
if(!S.length)return '<p class="mu">Not enough data for this period.</p>';
return lineChart(S,Math.min(...S.map(s=>s.a)),L,pctf,true);
}
function valueCard(){if(HIDE)VM="p";
const L=days.length-1,st0=rows[0].st;
if(st0<0||st0>=L)return "";
let x0=PTF==="Max"?st0:Math.max(st0,iStart(PTF));if(x0>=L)x0=st0;
let S,f;
if(VM==="v"){
const val=[],net=[];let cum=0,k=0;
for(let i=0;i<=L;i++){
while(k<tx.length&&tx[k].di<=i){cum+=(tx[k].q>0?1:-1)*(isFinite(tx[k].cs)?tx[k].cs:tx[k].g);k++}
if(i>=x0){val.push(valueAt(i));net.push(cum)}
}
S=[{name:"Value of holdings",a:x0,v:val},{name:"Net invested",a:x0,v:net}];f=eur;
}else{
S=rows.filter(r=>r.name==="Total portfolio"||r===actB()).map(r=>{
const b=(r.kind==="b"||x0>st0)?r.idx[x0]:100,v=[];
for(let i=x0;i<=L;i++)v.push((r.idx[i]/b-1)*100);
return {name:r.kind==="b"?bmLab(r.name):r.name,a:x0,v:v};
});
f=pctf;
}
return '<div class="card"><h2>Portfolio over time</h2><button data-vm="v"'+(VM==="v"?' class="on"':"")+'>Value (€)</button><button data-vm="p"'+(VM==="p"?' class="on"':"")+'>Performance (%)</button> &nbsp; '+TFA().map(t=>'<button data-ptf="'+t+'"'+(t===PTF?' class="on"':"")+'>'+t+'</button>').join("")+lineChart(S,x0,L,f,VM==="p")+'<p class="mu">'+(VM==="v"?"Holdings only, cash not included. Net invested is cumulative since your first trade; over the full period, the gap between the lines is your profit.":"Time-weighted return of your invested part since your first trade, against the benchmark.")+"</p></div>";
}
function hold(syms,bad){
const q={},nm={},bu={},se={};tx.forEach(t=>{q[t.s]=(q[t.s]||0)+t.q;nm[t.s]=t.n;if(t.q>0)bu[t.s]=(bu[t.s]||0)+t.q;else se[t.s]=(se[t.s]||0)-t.q});
let h='<div class="card"><h2>Holdings found</h2><p class="mu">If a symbol shows ✗, correct the Yahoo symbol and it recalculates.</p><div class="sc"><table><tr><th>Instrument</th><th>Yahoo symbol</th><th>Type</th><th>Bought</th><th>Sold</th><th>Net</th><th></th></tr>';
syms.forEach(s=>{
const k=kof(s),x=ser[k];
h+='<tr><td>'+esc(nm[s])+'<br><span class="mu">'+esc(s)+'</span></td><td>'+(isOpt(s)?"option":'<input data-s="'+esc(s)+'" value="'+esc(k)+'">')+'</td><td>'+(x?esc(x.type||""):"")+'</td><td>'+(+(bu[s]||0).toFixed(4))+'</td><td>'+(+(se[s]||0).toFixed(4))+'</td><td>'+(+q[s].toFixed(4))+'</td><td>'+(bad.includes(k)?"✗":x?"✓":"")+'</td></tr>';
});
return h+"</table></div></div>";
}
function costs(list){let tot=0,n=0;for(const t of list){if(t.opt||!isFinite(t.cs)||!isFinite(t.g))continue;tot+=t.q>0?t.cs-t.g:t.g-t.cs;n++}return {tot:tot,n:n}}
const eur=x=>HIDE?"\u20ac\u2022\u2022\u2022":(x<0?"-":"")+"€"+Math.abs(x).toLocaleString("en-US",{maximumFractionDigits:0});
const f2=x=>x.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
const pc=v=>'<td class="'+(v>=0?"pos":"neg")+'">'+(v>0?"+":"")+eur(v)+"</td>";
const pcs=(v,b)=>{const c=v>=0?"pos":"neg",p=b>0.005?v/b*100:null;return '<td class="'+c+'" data-s="'+v.toFixed(2)+'">'+(v>0?"+":"")+eur(v)+'</td><td class="'+c+' pp" data-s="'+(p==null?"":p.toFixed(2))+'">'+(p==null?"\u2013":pctf(p))+'</td>'};
const DERN=/(TURBO|WARRANT|\bCALL\b|\bPUT\b|\bSTR\b|\(SUB\)|\b[CP]\d+(\.\d+)?\b|\d{2}(JAN|FEB|MAR|APR|MAI|MEI|JUN|JUL|AUG|SEP|OKT|OCT|NOV|DEC)\d{2}|ILLIMIT|LEVERAGED|\bLEV\b)/i;
const ETFN=/\b(ETF|UCITS|ETC|ETN|TRACKER)\b/i;
const typOf=k=>{
const x=ser[k],t=tx.find(z=>z.key===k),n=(t?t.n:"")+" "+(x?x.name:"");
if(x)return (x.type==="ETF"||ETFN.test(n))?"ETF":"Stock";
if(k.includes("/")||DERN.test(n))return "Derivative";
return ETFN.test(n)?"ETF":"Stock";
};
const TYPN={ETF:"ETFs",Stock:"Stocks",Derivative:"Options, turbos and other derivatives"};
const byName=(a,b)=>a.localeCompare(b,undefined,{sensitivity:"base"});
function positions(){
const L=days.length-1,by={},out=[],dvk={};
tx.forEach(t=>{(by[t.key]=by[t.key]||[]).push(t)});
DV.forEach(e=>{dvk[e.k]=(dvk[e.k]||0)+e.g+e.t});
for(const s in by){
const o=isOpt(s);let q=0,cost=0,real=0,bg=0,sc=0;
by[s].forEach(t=>{
const a=o?t.q:t.qa,c=isFinite(t.cs)?t.cs:t.g;
if(a>0){q+=a;cost+=c;bg+=c}
else if(q>0){const f=Math.min(1,-a/q);real+=c-cost*f;sc+=cost*f;cost-=cost*f;q+=a}
else real+=c;
});
if(Math.abs(q)<1e-9){q=0;cost=0}
if(o&&G.ex[s]!==undefined&&q>0){real-=cost;sc+=cost;cost=0;q=0}
const k=s,px=o?0:P[k][L],val=o?cost:q*px;
out.push({k:s,n:(o?by[s][0].n:ser[k].name),q:q,avg:q>0?cost/q:0,px:px,val:val,un:q>0?val-cost:0,real:real,o:o,dv:dvk[s]||0,typ:typOf(s),bg:bg,sc:sc});
}
POSL=out;OPS=new Set(out.filter(r=>r.q>0).map(r=>r.k));const vis=out.filter(r=>pf(r.k));
const tv=vis.reduce((a,r)=>a+r.val,0);
let h='<div class="card"><h2>Positions</h2><div class="sc"><table><tr><th>Instrument</th><th>Shares</th><th>Avg buy</th><th>Price now</th><th>Value</th><th>Weight</th><th>Unrealised</th><th>% unrealised'+infoI("Unrealised gain as a percentage of what the shares you still hold cost you (value now divided by cost, minus 1).")+'</th><th>Realised (sales)</th><th>% realised'+infoI("Profit or loss on shares you sold, as a percentage of what those sold shares cost you.")+'</th><th>Dividends</th><th>% dividends'+infoI("Net dividends received as a percentage of everything you ever bought of this holding.")+'</th><th>Total</th><th>% total'+infoI("Unrealised plus realised plus dividends, as a percentage of everything you ever bought of this holding.")+'</th></tr>';
["ETF","Stock","Derivative"].forEach(ty=>{
const g=vis.filter(r=>r.typ===ty).sort((a,b)=>byName(a.n,b.n));
if(!g.length)return;
h+='<tr><td colspan="14" class="grp">'+TYPN[ty]+'</td></tr>';
g.forEach(r=>{
h+='<tr><td><a href="#" data-det="'+esc(r.k)+'">'+esc(r.n)+'</a></td><td>'+sh(+r.q.toFixed(4))+'</td><td>'+(r.o||!r.q?"–":"€"+f2(r.avg))+'</td><td>'+(r.o?"–":"€"+f2(r.px))+'</td><td>'+eur(r.val)+'</td><td class="wt">'+(tv>0?(r.val/tv*100).toFixed(1)+'%<div class="wb"><i style="width:'+Math.min(100,r.val/tv*300).toFixed(0)+'%"></i></div>':"–")+"</td>"+pcs(r.un,r.q>0?r.val-r.un:0)+pcs(r.real,r.sc)+pcs(r.dv,r.bg)+pcs(r.un+r.real+r.dv,r.bg)+"</tr>";
});
});
const U=vis.reduce((a,r)=>a+r.un,0),R=vis.reduce((a,r)=>a+r.real,0),Dv=vis.reduce((a,r)=>a+r.dv,0),Cu=vis.reduce((a,r)=>a+(r.q>0?r.val-r.un:0),0),Sc=vis.reduce((a,r)=>a+r.sc,0),Bg=vis.reduce((a,r)=>a+r.bg,0);
h+='<tr><td><b>Total</b></td><td></td><td></td><td></td><td><b>'+eur(tv)+'</b></td><td></td>'+pcs(U,Cu)+pcs(R,Sc)+pcs(Dv,Bg)+pcs(U+R+Dv,Bg)+"</tr></table></div>";
return h+'<p class="mu"><b>Realised (sales)</b> is the profit or loss on shares you sold, after trading costs. <b>Dividends</b> are not part of it: they have their own column (net of withholding tax) and are added in <b>Total</b>. Amounts are in euro, use the average-cost method, and options and other derivatives are carried at cost until sold or expired. Shares are shown on today\'s basis, so a reverse split lowers the count. The % columns show each result relative to its base; hover the i icons in the headers for the base used.</p></div>';
}
function cmp(k,x,f){
if(!f||f.q<=0)return "–";
const b=f.px/(f.qa/f.q),l=x.cv[x.cv.length-1];
return b.toFixed(2)+" → "+l.toFixed(2)+" "+(x.cur||"")+" ("+((l/b-1)*100).toFixed(1)+"%), in EUR "+((f.qa*P[k][days.length-1]/f.fg-1)*100).toFixed(1)+"%";
}
function detail(syms){
const L=days.length-1,i6=iStart("6M");
const pr=(k,i)=>i<0||!P[k]?"–":(+P[k][i].toFixed(2));
let h='<div class="card"><h2>Price check</h2><p class="mu">Compare these with a price chart. Prices are adjusted closes, converted to euro.</p><div class="sc"><table><tr><th>Instrument</th><th>Data</th><th>First buy</th><th>Price then</th><th>6M ago'+(i6>=0?" ("+fd(days[i6])+")":"")+'</th><th>Latest</th><th>Splits</th><th>First buy to now</th></tr>';
syms.forEach(s=>{
const k=map(s),x=ser[k],f=tx.find(t=>t.s===s),ib=days.findIndex(d=>d>=f.d);
h+='<tr><td>'+esc(x.name)+'<br><span class="mu">'+esc(k)+'</span></td><td>'+esc(x.gran||"")+', '+x.d.length+' points from '+fd(x.d[0])+'</td><td>'+fd(f.d)+'</td><td>'+pr(k,ib)+'</td><td>'+pr(k,i6)+'</td><td>'+pr(k,L)+'</td><td>'+(x.sp&&x.sp.length?x.sp.map(e=>e.d+" "+e.r).join(", "):"–")+'</td><td>'+cmp(k,x,f)+'</td></tr>';
});
return h+"</table></div></div>";
}
const SORTS={};
function cellVal(td,ci){const ds=td&&td.getAttribute&&td.getAttribute("data-s");if(ds!=null&&ds!=="")return +ds;
const t=(td?td.textContent:"").trim();
if(t===""||t==="–"||t==="=")return null;
const m=t.match(/^(\d{1,2}) ([A-Za-z]+) '(\d\d)$/);
if(m){const mi=MN.indexOf(m[2]);if(mi>=0)return Date.UTC(2000+ +m[3],mi,+m[1])}
if(ci===0)return t.toLowerCase();
const c=t.replace(/ points?/,"");
if(/[A-Za-z]/.test(c))return t.toLowerCase();
const n=parseFloat(c.replace(/[^\d.\-]/g,""));
return isFinite(n)?n:null;
}
function applySort(tb,c,d){
const all=[...tb.rows].filter(r=>!r.querySelector("th"));
let fixedEnd=null;const last=all[all.length-1];
if(last&&/^Total\b/.test(last.cells[0].textContent.trim())){fixedEnd=last;all.pop()}
const isG=r=>r.cells.length===1&&r.cells[0].classList.contains("grp");
const head=[],segs=[];let cur=null;
all.forEach(r=>{if(isG(r)){cur={g:r,rows:[]};segs.push(cur)}else if(cur)cur.rows.push(r);else head.push(r)});
const srt=rs=>rs.map((r,i)=>({r:r,i:i,v:cellVal(r.cells[c],c)})).sort((a,b)=>{
const x=a.v,y=b.v;if(x==null&&y==null)return a.i-b.i;if(x==null)return 1;if(y==null)return -1;
const k=(typeof x==="string"||typeof y==="string")?String(x).localeCompare(String(y),undefined,{sensitivity:"base",numeric:true}):x-y;
return (k*d)||(a.i-b.i);
}).map(o=>o.r);
const body=tb.tBodies[0]||tb;
(segs.length?head:srt(head)).forEach(r=>body.appendChild(r));
segs.forEach(sg=>{body.appendChild(sg.g);srt(sg.rows).forEach(r=>body.appendChild(r))});
if(fixedEnd)body.appendChild(fixedEnd);
}
function markSort(tb,s){
const hr=[...tb.rows].find(r=>r.querySelector("th"));
[...hr.cells].forEach((th,i)=>{if(th.classList.contains("srt"))th.firstChild.nodeValue=th.getAttribute("data-l")+(s&&i===s.c?(s.d>0?" ▲":" ▼"):"")});
}
function enhanceTables(){
if(!document.querySelectorAll)return;
document.querySelectorAll("#out table").forEach(tb=>{
const hr=[...tb.rows].find(r=>r.querySelector("th"));if(!hr)return;
if([...tb.rows].filter(r=>!r.querySelector("th")).length<3||tb.querySelector("input"))return;
const sec=tb.closest(".card"),h=sec&&sec.querySelector("h2"),key=(h?h.textContent.trim():"")+"|"+(sec?[...sec.querySelectorAll("table")].indexOf(tb):0);
tb.setAttribute("data-sk",key);
[...hr.cells].forEach(th=>{const t=th.textContent.trim();if(t){th.classList.add("srt");th.setAttribute("data-l",t)}});
const st=SORTS[key];if(st){applySort(tb,st.c,st.d);markSort(tb,st)}
});
}
function sortClick(th){
const tb=th.closest("table"),key=tb.getAttribute("data-sk"),c=th.cellIndex,s=SORTS[key];
const n=(s&&s.c===c)?{c:c,d:-s.d}:{c:c,d:1};
SORTS[key]=n;applySort(tb,n.c,n.d);markSort(tb,n);
}
function render(syms,bad,warn){renderBase(syms,bad,warn);enhanceTables();layout();wbUpdate();fit()}
function renderBase(syms,bad,warn){
if(DET&&rows.length&&!bad.length){CH=[];positions();$("out").innerHTML=tabsHtml()+detailView(DET);return}
if(TAB==="a"&&rows.length&&!bad.length){
CH=[];
$("out").innerHTML=kpis()+tabsHtml()+analysis()+(warn.length?'<p class="mu">'+warn.map(esc).join("<br>")+"</p>":"");
return;
}
if(TAB==="w"&&rows.length&&!bad.length){
CH=[];positions();
$("out").innerHTML=kpis()+tabsHtml()+wealth();
return;
}
if(TAB==="t"&&rows.length&&!bad.length){
CH=[];
$("out").innerHTML=kpis()+tabsHtml()+transactions()+(warn.length?'<p class="mu">'+warn.map(esc).join("<br>")+"</p>":"");
return;
}
if(TAB==="d"&&rows.length&&!bad.length){
CH=[];positions();
$("out").innerHTML=kpis()+tabsHtml()+dividends()+(warn.length?'<p class="mu">'+warn.map(esc).join("<br>")+"</p>":"");
return;
}
if(TAB==="p"&&rows.length&&!bad.length){
CH=[];
$("out").innerHTML=kpis()+tabsHtml()+positions()+(warn.length?'<p class="mu">'+warn.map(esc).join("<br>")+"</p>":"");
return;
}
if(TAB==="u"){CH=[];$("out").innerHTML=tabsHtml()+users();return}
renderR(syms,bad,warn);
if(rows.length)$("out").innerHTML=kpis()+tabsHtml()+$("out").innerHTML;
}
function renderR(syms,bad,warn){if(rows.length&&!bad.length)positions();
CH=[];
let h="";
if(SK.length)warn=warn.concat(["Skipped by your choice: "+SK.join(", ")]);
if(rows.length){
h+='<div class="card"><h2>'+(PB==="stock"?"Stock performance":"My performance (TWRR)")+'</h2><p class="mu">Costs: <select id="mode"><option value="1"'+(MODE?" selected":"")+'>included</option><option value="0"'+(MODE?"":" selected")+'>excluded</option></select> &nbsp; <label><input type="checkbox" id="cu" style="width:auto"'+(CU?" checked":"")+'> Custom period</label>'+(CU?' <input type="date" id="d0" style="width:auto" value="'+CF+'"> to <input type="date" id="d1" style="width:auto" value="'+CT+'">':"")+'</p><div class="tfc"><span class="mu">Periods shown: </span>'+TFA().map(t=>'<button data-vt="'+t+'"'+(VTs().includes(t)?' class="on"':"")+'>'+t+'</button>').join("")+'</div><div class="tfc"><span class="mu">Basis: </span>'+[["me","My performance (TWRR)"],["stock","Stock performance"]].map(z=>'<button data-pb="'+z[0]+'"'+(PB===z[0]?' class="on"':"")+'>'+z[1]+'</button>').join("")+'</div><div class="sc"><table><tr><th>Instrument</th>'+VTs().map(t=>"<th>"+t+"</th>").join("")+(CU?"<th>Custom</th>":"")+"<th>CAGR (all)</th></tr>";
const NC=VTs().length+(CU?1:0)+2;
const line=r=>"<tr><td>"+(r.k?'<a href="#" data-det="'+esc(r.k)+'">'+esc(r.name)+"</a>":esc(r.kind==="b"?bmLab(r.name):r.name))+(r.kind==="b"?" (benchmark)":"")+"</td>"+VTs().map(t=>cell(rt(r,t))).join("")+(CU?cell(ret(r,"C")):"")+cell(cagr(r))+"</tr>";
(PF==="all"&&PT==="all"?rows.filter(r=>!r.k&&(r.kind!=="b"||r===actB())):[subRow()].concat([actB()]).filter(Boolean)).forEach(r=>{h+=line(r)});
["ETF","Stock","Derivative"].forEach(ty=>{
const g=rows.filter(r=>r.k&&r.typ===ty&&(PT==="all"||r.typ===PT)&&(PF==="all"||(PF==="open")===!!r.open)).sort((x,y)=>byName(x.name,y.name));
if(g.length){h+='<tr><td colspan="'+NC+'" class="grp">'+TYPN[ty]+'</td></tr>';g.forEach(r=>{h+=line(r)})}
});
h+='</table></div><p class="mu">"Max" counts from when each line was first invested. A dash means the holding was not in your portfolio during that period (or the period starts before your data does). CAGR is the yearly growth rate behind the "Max" figure and only appears once the holding period is at least about 11 months; for a closed position it covers the time you held it. For closed positions, a period shows the return while the position was held. Basis: "My performance" is time-weighted, so it ignores when you added money and equals the stock\'s own return over the time you held it; "Stock performance" is the price return over the whole period, whether or not you held it (dividends reinvested). Options and other derivatives are part of the total; for them, look at the euro result in Positions.</p>'+(CU?periodInfo():"")+'</div>';
h+='<div class="card"><h2>Comparison</h2>'+TFA().map(t=>'<button data-tf="'+t+'"'+(t===TF?' class="on"':"")+">"+t+"</button>").join("")+chart()+"</div>";
}
if(rows.length)h+=valueCard();
if(DBG||bad.length)h+=hold(syms,bad);
if(DBG&&rows.length)h+=detail(syms.filter(s=>!isOpt(s)));
if(DBG&&rows.length){
const c=costs(tx),oo=tx.filter(t=>t.opt),o=oo.reduce((a,t)=>a+(isFinite(t.c)?t.c:0),0);
h+='<div class="card"><h2>Check: trading costs and derivative cash</h2><div class="sc"><table><tr><td>Trading costs on stock and ETF trades, including currency conversion (estimate from '+c.n+' trades)</td><td>'+eur(c.tot)+'</td></tr><tr><td>Net cash result of option trades ('+oo.length+' trades)</td><td>'+eur(o)+'</td></tr></table></div><p class="mu">Also left out: idle cash, currency effects on non-euro holdings, and tax withheld on dividends. Saxo includes all of these.</p></div>';
}
if(DBG&&Object.keys(IG).length)h+='<div class="card"><h2>Rows not used</h2><p class="mu">These rows are not buys or sells, so the calculation ignores them. Anything that changes share counts (transfers, splits, exercises) matters here.</p><div class="sc"><table>'+Object.keys(IG).map(k=>'<tr><td>'+esc(k)+'</td><td>'+IG[k]+'</td></tr>').join("")+'</table></div></div>';
if(warn.length)h+='<p class="mu">'+warn.map(esc).join("<br>")+"</p>";
h+='<p class="mu">Method: time-weighted return of your invested part only (cash is not included), chained daily. Trades enter at their real price, costs can be switched on or off, non-euro holdings are converted to euro, and dividends count as reinvested in these returns (the cash received is on the Dividends tab).</p>';
$("out").innerHTML=h;
}
const UNR=new Set();
const isOpt=s=>s.includes("/")||UNR.has(s);
const kof=s=>isOpt(s)?s:map(s);
const MC={F:0,G:1,H:2,J:3,K:4,M:5,N:6,Q:7,U:8,V:9,X:10,Z:11};
function optExp(s){
const m=s.match(/\/(\d{1,2})([FGHJKMNQUVXZ])(\d{2})/);
return m?new Date(Date.UTC(2000+ +m[3],MC[m[2]],+m[1])).toISOString().slice(0,10):null;
}
function toAcc(text){
const r=parseTable(text.replace(/^\uFEFF/,"")).filter(x=>x.length>5);
if(!r.length)throw new Error("No table found in the account statement.");
const h=r[0].map(x=>x.trim().toLowerCase()),ix=n=>h.indexOf(n);
const iD=ix("datum"),iP=ix("product"),iI=ix("isin"),iO=ix("omschrijving"),iM=ix("mutatie");
if(iD<0||iO<0||iM<0)throw new Error("Account statement columns not found. The first line must contain Datum, Omschrijving and Mutatie.");
const a=[];
for(const x of r.slice(1)){
const d=pd(x[iD]),amt=num(x[iM+1]),o=(x[iO]||"").trim();
if(!d||!isFinite(amt))continue;
let k=null;
if(/^dividend$/i.test(o))k="div";else if(/^dividendbelasting$/i.test(o))k="tax";
else if(/^transactiebelasting/i.test(o)||/aansluitingskosten/i.test(o))k="fee";
else if(/^rente$/i.test(o)||/^flatex interest/i.test(o))k="int";
if(k)a.push({k:k,d:d,isin:(x[iI]||"").trim(),n:(x[iP]||"").trim(),cur:(x[iM]||"EUR").trim()||"EUR",amt:amt,b:"Degiro"});
}
return a;
}
function fileToText(f,cb){
const r=new FileReader(),isX=/\.xls[xm]?$/i.test(f.name);
r.onload=()=>{
try{
if(isX){
const wb=XLSX.read(r.result,{type:"array"});
const a=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,raw:false,defval:""});
cb(a.map(x=>x.map(c=>String(c).replace(/[\t\r\n]+/g," ")).join("\t")).join("\n"));
}else cb(r.result);
}catch(x){msg("Could not read the file: "+x.message)}
};
if(isX)r.readAsArrayBuffer(f);else r.readAsText(f);
}
function toEur(amt,cur,d){
if(!cur||cur==="EUR")return amt;
const pen=cur==="GBp"||cur==="GBX",s=FX[pen?"GBP":cur];
if(!s)return NaN;
let j=0;for(let i=0;i<s.d.length&&s.d[i]<=d;i++)j=i;
return amt/s.v[j]*(pen?0.01:1);
}
function buildDiv(){
DV=[];AO=[];
const shares=(k,d)=>tx.reduce((a,t)=>a+(t.key===k&&t.d<=d?t.q:0),0);
AC.forEach(a=>{
const e=toEur(a.amt,a.cur,a.d);if(!isFinite(e))return;
if(a.k==="fee"||a.k==="int"){AO.push({k:a.k,d:a.d,e:e});return}
const s="D:"+a.isin,t=tx.find(x=>x.s===s),k=t?t.key:s;
DV.push({b:"Degiro",d:a.d,k:k,n:t?t.n:a.n,g:a.k==="div"?e:0,t:a.k==="tax"?e:0,sh:shares(k,a.d)});
});
SXD.forEach(a=>{
const k=kof(a.s);
DV.push({b:"Saxo",d:a.d,k:k,n:a.n,g:a.eur,t:0,sh:shares(k,a.d)});
});
DV.sort((p,q)=>p.d<q.d?-1:p.d>q.d?1:0);
}
function setLook(m){
if(m&&PALS[m])MODEV=m;
if(document.documentElement&&document.documentElement.setAttribute)document.documentElement.setAttribute("data-mode",MODEV);
ls.set("mode",MODEV);COL=PALS[MODEV].slice(0,6);PIEC=PALS[MODEV];
if(document.querySelectorAll)document.querySelectorAll("#themes button").forEach(b=>b.classList.toggle("on",b.getAttribute("data-mode")===MODEV));
if(rows.length)render(G.syms,[],G.warn);
}
function betaStats(r,b){
if(!r||!b||r.st<0||!b.idx||!r.idx)return null;
const L=days.length-1,a=Math.max(r.st,b.st>0?b.st:0),x=[],y=[];
for(let i=a+5;i<=L;i+=5){x.push(b.idx[i]/b.idx[i-5]-1);y.push(r.idx[i]/r.idx[i-5]-1)}
const N=x.length;if(N<12)return null;
const mx=x.reduce((s,v)=>s+v,0)/N,my=y.reduce((s,v)=>s+v,0)/N;
let c=0,vx=0,vy=0;for(let i=0;i<N;i++){const dx=x[i]-mx,dy=y[i]-my;c+=dx*dy;vx+=dx*dx;vy+=dy*dy}
if(!(vx>0&&vy>0))return null;
return {beta:c/vx,corr:c/Math.sqrt(vx*vy),vp:Math.sqrt(vy/(N-1)*52),vm:Math.sqrt(vx/(N-1)*52),n:N};
}
const BETA_TIP="Beta shows how strongly your portfolio moved with the benchmark: 1.00 means in step, below 1 smaller moves, above 1 bigger moves. It is calculated on weekly returns as correlation \u00d7 (your volatility \u00f7 the index volatility). So you can swing more than the index and still have a beta below 1 when much of your swing is unrelated to the index (single stocks, derivatives).";
function kpis(){
positions();
const ty=TAB==="r"||TAB==="p"?PT:"all",pl=ty==="all"?POSL:POSL.filter(r=>r.typ===ty),sfx=ty==="all"?"":" \u00b7 "+TYPS[ty];
const tv=pl.reduce((a,r)=>a+r.val,0),pr=pl.reduce((a,r)=>a+r.un+r.real+r.dv,0);
let tot=rows[0];
if(ty!=="all"){const ks=new Set(G.keys.filter(k=>typOf(k)===ty));if(ks.size){const q=twrr(ks,MODE);tot={idx:q.idx,st:q.st,held:q.held}}else tot=null}
const tw=tot?ret(tot,"Max"):null,cg=tot?cagr(tot):null,bm=actB(),bw=bm?ret(bm,"Max"):null,bs=bm?betaStats(tot,bm):null;
const sg=x=>x>=0?"pos":"neg";
ixSync(bm);
const tile=(l,v,sub,c)=>'<div class="kpi"><div class="kl">'+l+'</div><div class="kv'+(c?" "+c:"")+'">'+v+'</div><div class="ks">'+sub+'</div></div>';
const T=[];
T.push(tile("Total value"+sfx,eur(tv),"Holdings only, cash not included"));
T.push(tile("Total profit"+sfx,(pr>0?"+":"")+eur(pr),"Unrealised, realised and dividends, after costs",sg(pr)));
T.push(tile("Time-weighted return"+sfx,tw==null?"\u2013":pct1(tw),cg==null?"All time":"All time \u00b7 "+pct1(cg)+" per year",tw==null?"":sg(tw)));
{const ok=bm&&bw!=null&&tw!=null,d=ok?(tw-bw)*100:0;
T.push(tile("Against "+(bm?esc(bmLab(bm.name)):"index"),ok?(d>=0?"+":"-")+Math.abs(d).toFixed(1)+" points":"\u2013",ok?"You "+pct1(tw)+" \u00b7 index "+pct1(bw)+" (all time)":(bm?"No data for this period":"Pick an index to compare with"),ok?sg(d):""))}
if(bm)T.push(tile("Beta"+sfx+infoI(BETA_TIP),bs==null?"\u2013":bs.beta.toFixed(2),"vs "+esc(bmLab(bm.name))+(bs==null?" \u00b7 needs 12+ weeks":" \u00b7 corr. "+bs.corr.toFixed(2)+" \u00b7 volatility "+(bs.vp*100).toFixed(0)+"% vs "+(bs.vm*100).toFixed(0)+"%")));
return '<div class="kpis" style="--kc:'+T.length+'">'+T.join("")+"</div>";
}
const TABI={r:'<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>',p:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"/>',a:'<path d="M21 12a9 9 0 11-9-9v9z"/><path d="M15 3.5A9 9 0 0120.5 9H15z"/>',t:'<path d="M7 4L3 8l4 4"/><path d="M3 8h14"/><path d="M17 20l4-4-4-4"/><path d="M21 16H7"/>',d:'<circle cx="12" cy="12" r="9"/><path d="M9.5 10.5C10 9.4 11 9 12 9s2 .5 2 1.5-1 1.3-2 1.5-2 .6-2 1.5S11 15 12 15s2-.4 2.5-1.5"/><path d="M12 7.5V9M12 15v1.5"/>',w:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',u:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0"/><path d="M16 4.5a3.5 3.5 0 010 7M18 14.5a6.5 6.5 0 013.5 5.5"/>'};
const tabBtn=(k,l)=>'<button data-tab="'+k+'" title="'+l+'"'+(TAB===k?' class="on"':"")+'><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+TABI[k]+'</svg><span class="tl">'+l+'</span></button>';
const tabsHtml=()=>'<div class="tabs"><div class="sec">Overview</div>'+tabBtn("r","Returns")+tabBtn("p","Positions")+tabBtn("a","Analysis")+'<div class="sec">Activity</div>'+tabBtn("t","Transactions")+tabBtn("d","Dividends")+'<div class="sec">Planning</div>'+tabBtn("w","Wealth builder")+'<div class="sec">Admin</div>'+tabBtn("u","Users")+'</div>'+pfChips();
let SEC={},SECL=false;try{SEC=JSON.parse(ls.get("sect")||"{}")}catch(e){}
const etfSec=n=>/INFORMATION TECH|INFO TECH|TECHNOLG|TECHNOLOGY/i.test(n)?"Technology":/DEFEN[CS]E/i.test(n)?"Industrials":/PRIVATE EQUITY/i.test(n)?"Financial Services":"ETFs (broad market)";
const sectorOf=x=>x.typ==="Derivative"?"Derivatives":x.typ==="ETF"?etfSec(x.n):(SEC[x.k]!==undefined?SEC[x.k]:"Loading...");
async function loadSectors(){
const need=POSL.filter(r=>!r.o&&r.typ==="Stock"&&SEC[r.k]===undefined).map(r=>r.k);
for(let i=0;i<need.length;i+=6){
await Promise.allSettled(need.slice(i,i+6).map(async k=>{
try{
const r=await fetch(PROXY+"/?q="+encodeURIComponent(k)),j=await r.json();
const q=(j.quotes||[]).find(x=>x.symbol&&x.symbol.toUpperCase()===k.toUpperCase());
SEC[k]=(q&&(q.sectorDisp||q.sector))||"Unknown";
}catch(e){SEC[k]="Unknown"}
}));
}
ls.set("sect",JSON.stringify(SEC));
if(TAB==="a"&&rows.length)render(G.syms,[],G.warn);
}
let PIEC=PALS.light;
let PIED=null;
function pie(items){
const tot=items.reduce((a,x)=>a+x.val,0);
if(tot<=0){PIED=null;return '<p class="mu">Nothing to show.</p>'}
let ang=-Math.PI/2,g="",lg="";
PIED={t1:"Total",t2:eur(tot)};
items.forEach((x,i)=>{
const f=x.val/tot,a1=ang+f*2*Math.PI,c=PIEC[i%PIEC.length],pc=(f*100).toFixed(1)+"%",nm=x.name.length>18?x.name.slice(0,17)+"…":x.name;
const am=(ang+a1)/2,at=' class="sl" data-n="'+esc(nm)+'" data-v="'+eur(x.val)+'" data-p="'+pc+'" data-c="'+c+'" data-dx="'+(Math.cos(am)*8).toFixed(2)+'" data-dy="'+(Math.sin(am)*8).toFixed(2)+'" data-t0="'+(ang+Math.PI/2).toFixed(5)+'" data-t1="'+(a1+Math.PI/2).toFixed(5)+'"';
if(f>=0.9999)g+='<circle cx="100" cy="100" r="64" fill="none" stroke="'+c+'" stroke-width="32"'+at+'/>';
else{
const R=80,r=48,P=(rr,an)=>(100+rr*Math.cos(an)).toFixed(2)+" "+(100+rr*Math.sin(an)).toFixed(2),lf=f>0.5?1:0;
g+='<path d="M'+P(R,ang)+'A'+R+' '+R+' 0 '+lf+' 1 '+P(R,a1)+'L'+P(r,a1)+'A'+r+' '+r+' 0 '+lf+' 0 '+P(r,ang)+'Z" fill="'+c+'" style="stroke:var(--card)" stroke-width="1.5"'+at+'/>';
}
ang=a1;
lg+='<tr><td><b style="color:'+c+'">●</b> '+esc(x.name)+'</td><td>'+eur(x.val)+'</td><td>'+pc+'</td></tr>';
});
return '<div style="display:flex;flex-wrap:wrap;gap:24px;align-items:center"><svg data-pie="1" viewBox="0 0 200 200" style="width:290px;max-width:100%;overflow:visible">'+g+'<text id="pt1" x="100" y="92" text-anchor="middle" font-size="9.5" style="fill:var(--mu)" pointer-events="none">Total</text><text id="pt2" x="100" y="110" text-anchor="middle" font-size="14" font-weight="600" style="fill:var(--fg)" pointer-events="none">'+eur(tot)+'</text><text id="pt3" x="100" y="125" text-anchor="middle" font-size="10" style="fill:var(--mu)" pointer-events="none"></text></svg><div class="sc" style="flex:1;min-width:260px"><table>'+lg+'</table></div></div>';
}
const nameOf=k=>ser[k]?ser[k].name:((tx.find(t=>t.key===k)||{}).n||k);
function allocation(){
const L=days.length-1,it=[];
POSL.filter(r=>r.val>0.5).forEach(r=>{
const k=r.k,sh={};
tx.forEach(t=>{if(t.key===k)sh[t.b]=(sh[t.b]||0)+(t.opt?t.q:t.qa)});
const br={};
if(r.o){const t0=tx.find(t=>t.key===k);br[t0?t0.b:"Saxo"]=r.val}
else{const tot=Object.values(sh).reduce((a,v)=>a+Math.max(0,v),0);for(const b in sh)if(sh[b]>0&&tot>0)br[b]=r.val*sh[b]/tot}
let cur=ser[k]?ser[k].cur:((tx.find(t=>t.key===k)||{}).cur||"EUR");
if(cur==="GBp"||cur==="GBX")cur="GBP";
it.push({k:k,n:r.n,typ:r.typ,val:r.val,cur:cur||"EUR",br:br});
});
const grp=f=>{const m={};it.forEach(x=>{const k=f(x);m[k]=(m[k]||0)+x.val});return Object.keys(m).map(k=>({name:k,val:m[k]})).sort((a,b)=>b.val-a.val)};
let items;
if(ALV==="h"){
const srt=it.slice().sort((a,b)=>b.val-a.val).map(x=>({name:x.n,val:x.val}));
items=srt.slice(0,12);const rest=srt.slice(12);
if(rest.length)items.push({name:"Other ("+rest.length+")",val:rest.reduce((a,x)=>a+x.val,0)});
}else if(ALV==="t")items=grp(x=>TYPN[x.typ]);
else if(ALV==="s"){
items=grp(sectorOf);
const need=it.filter(x=>x.typ==="Stock"&&SEC[x.k]===undefined);
if(need.length&&!SECL){SECL=true;loadSectors().finally(()=>{SECL=false})}
}
else if(ALV==="c")items=grp(x=>x.cur);
else{const m={};it.forEach(x=>{for(const b in x.br)m[b]=(m[b]||0)+x.br[b]});items=Object.keys(m).map(k=>({name:k,val:m[k]})).sort((a,b)=>b.val-a.val)}
const B=[["h","Holdings"],["t","Type"],["s","Sector"],["c","Currency"],["b","Broker"]].map(z=>'<button data-alv="'+z[0]+'"'+(ALV===z[0]?' class="on"':"")+'>'+z[1]+'</button>').join("");
return '<div class="card"><h2>Allocation</h2>'+B+'<p class="mu">Current value of what you hold, in euro. Currency is the currency the instrument is listed in. Derivatives are valued at cost.'+(ALV==="s"?' Sectors come from Yahoo Finance for stocks. ETFs are shown as broad funds unless their name is clearly one sector (technology, defence, private equity), because a look-through into the fund\'s holdings is not available.':'')+'</p>'+pie(items)+'</div>';
}
function contrib(a){
const T=rows[0].idx,base=a<0?100:T[a],C={},pos={},bas={},pvk={};let k=0;
for(let i=0;i<days.length;i++){
const Bk={},Sk={};
while(k<tx.length&&tx[k].di<=i){
const t=tx[k],s=t.key;k++;
const f=MODE?t.fc:t.fg,buy=t.q>0;
if(!isFinite(f))continue;
if(buy)Bk[s]=(Bk[s]||0)+f;else Sk[s]=(Sk[s]||0)+f;
const q0=pos[s]||0;
if(t.opt){const q1=q0+t.q;if((q0>=0&&buy)||(q0<=0&&!buy))bas[s]=(bas[s]||0)+(buy?f:-f);else if(q0!==0)bas[s]=(bas[s]||0)*(q1/q0);pos[s]=q1}
else pos[s]=q0+t.qa;
if(Math.abs(pos[s])<1e-9){pos[s]=0;bas[s]=0}
}
for(const s in G.ex)if(G.ex[s]===i&&pos[s]){pos[s]=0;bas[s]=0}
let den=0;for(const s in pvk)den+=pvk[s];for(const s in Bk)den+=Bk[s];
const w=(i>0?T[i-1]:100)/base,ks=new Set([...Object.keys(pos),...Object.keys(pvk),...Object.keys(Bk),...Object.keys(Sk)]);
ks.forEach(s=>{
const v=P[s]?(pos[s]||0)*P[s][i]:(bas[s]||0),num=v+(Sk[s]||0)-(Bk[s]||0)-(pvk[s]||0);
if(i>a&&den>0)C[s]=(C[s]||0)+num/den*w;
pvk[s]=v;
});
}
return C;
}
function contribCard(){
const L=days.length-1,a=CTF==="Max"?-1:Math.max(-1,iStart(CTF)),C=contrib(a);
const T=rows[0].idx,base=a<0?100:T[a],tot=(T[L]/base-1)*100;
const list=Object.keys(C).map(k=>({k:k,n:nameOf(k),c:C[k]*100,typ:typOf(k)})).filter(x=>Math.abs(x.c)>=0.005).sort((x,y)=>y.c-x.c);
const mx=Math.max(0.01,...list.map(x=>Math.abs(x.c)));
const B=TFA().map(t=>'<button data-ctf="'+t+'"'+(t===CTF?' class="on"':"")+'>'+t+'</button>').join("");
const sum=list.reduce((x,y)=>x+y.c,0),by={};list.forEach(x=>{by[x.typ]=(by[x.typ]||0)+x.c});
let h='<div class="card"><h2>Contribution to your return</h2>'+B+'<div class="cs"><div><span>Return of the period</span><b class="'+(tot>=0?"pos":"neg")+'">'+pct1(tot/100)+'</b></div>'+["ETF","Stock","Derivative"].filter(t=>by[t]!==undefined).map(t=>'<div><span>'+({ETF:"ETFs",Stock:"Stocks",Derivative:"Derivatives"})[t]+'</span><b class="'+(by[t]>=0?"pos":"neg")+'">'+(by[t]>0?"+":"")+by[t].toFixed(1)+' pts</b></div>').join("")+'</div>';
h+='<div class="sc"><table><tr><th>Instrument</th><th>Contribution (points)</th><th style="width:45%"></th></tr>';
["ETF","Stock","Derivative"].forEach(ty=>{const lg=list.filter(x=>x.typ===ty);if(!lg.length)return;h+='<tr><td colspan="3" class="grp">'+TYPN[ty]+'</td></tr>';lg.forEach(x=>{
const w=(Math.abs(x.c)/mx*100).toFixed(0);
h+='<tr><td><a href="#" data-det="'+esc(x.k)+'">'+esc(x.n)+'</a></td><td class="'+(x.c>=0?"pos":"neg")+'">'+(x.c>0?"+":"")+x.c.toFixed(2)+'</td><td><div style="background:'+(x.c>=0?"var(--pos)":"var(--neg)")+';height:8px;width:'+w+'%"></div></td></tr>';
});});
h+='<tr><td><b>Total</b></td><td><b>'+(sum>0?"+":"")+sum.toFixed(2)+'</b></td><td></td></tr></table></div>';
return h+'<p class="mu">A contribution is how many percentage points of your portfolio\'s time-weighted return came from one holding: its gain, weighted by how large it was in the portfolio at the time. The contributions add up to the total return of the period (small differences come from rounding and tiny contributions left out). Holdings that were bought and sold within the period are included.</p></div>';
}
const dvl=b=>b.length===7?MN[+b.slice(5)-1].slice(0,3)+(DVS==="fc"?" '"+b.slice(2,4):""):b;
const dvt=b=>b.length===7?MN[+b.slice(5)-1]+" "+b.slice(0,4):b;
function txRows(){
const R=[];
tx.forEach(t=>{
const buy=t.q>0,fee=isFinite(t.cs)&&isFinite(t.g)?(buy?t.cs-t.g:t.g-t.cs):NaN;
R.push({d:t.d,ty:buy?"Buy":"Sell",n:nameOf(t.key),k:t.key,b:t.b,q:+Math.abs(t.q).toFixed(4),px:isFinite(t.px)?f2(t.px)+" "+(t.cur||""):"\u2013",a:isFinite(t.cs)?(buy?-1:1)*t.cs:NaN,f:fee,o:R.length});
});
const M={};
DV.forEach(e=>{const key=e.k+"|"+e.d,o=M[key]=M[key]||{d:e.d,n:e.n,k:e.k,b:e.b,g:0,t:0,sh:0};o.g+=e.g;o.t+=e.t;if(e.sh>o.sh)o.sh=e.sh});
Object.keys(M).forEach(key=>{
const o=M[key];
if(o.g)R.push({d:o.d,ty:"Dividend",n:o.n,k:o.k,b:o.b,q:o.sh>0?+o.sh.toFixed(4):null,px:o.sh>0?"\u20ac"+f2(o.g/o.sh)+"/sh":"\u2013",a:o.g+o.t,f:-o.t,o:R.length});
else if(o.t)R.push({d:o.d,ty:"Tax",n:o.n,k:o.k,b:o.b,q:null,px:"\u2013",a:o.t,f:NaN,o:R.length});
});
AO.forEach(a=>R.push({d:a.d,ty:a.k==="fee"?"Fee":"Interest",n:a.k==="fee"?"Account fees":"Account interest",k:null,b:"Degiro",q:null,px:"\u2013",a:a.e,f:NaN,o:R.length}));
return R;
}
const TXSW=v=>'<div class="seg"><button data-txv="table"'+(v==="table"?' class="on"':"")+'>Table</button><button data-txv="chart"'+(v==="chart"?' class="on"':"")+'>Bought &amp; sold</button><button data-txv="gain"'+(v==="gain"?' class="on"':"")+'>Gain / loss</button></div>';
const TXC=()=>MODEV==="dark"?["#4f8cff","#2f9e75"]:["#1d4ed8","#15803d"];
const txBS=()=>txRows().filter(r=>(r.ty==="Buy"||r.ty==="Sell")&&isFinite(r.a)&&r.a!==0);
const txKey=d=>TXS==="all"?d.slice(0,4):d.slice(0,7);
function txChart(){
const R=txBS(),yrs=[...new Set(R.map(r=>r.d.slice(0,4)))].sort();
if(!(TXS==="all"||yrs.includes(TXS)))TXS=yrs[yrs.length-1]||"all";
let h='<div class="card"><h2>Transactions</h2><div class="dvc"><div class="seg">'+yrs.map(y=>'<button data-txp="'+y+'"'+(TXS===y?' class="on"':"")+'>'+y+'</button>').join("")+'<button data-txp="all"'+(TXS==="all"?' class="on"':"")+'>All time</button></div>'+TXSW("chart")+'</div>';
if(!R.length)return h+'<p class="mu">No buys or sells to show yet.</p></div>';
const keys=[],m={};
if(TXS==="all"){const y1=Math.max(+yrs[yrs.length-1],+(days[days.length-1]||"0").slice(0,4));for(let y=+yrs[0];y<=y1;y++)keys.push(String(y))}
else for(let i=1;i<=12;i++)keys.push(TXS+"-"+String(i).padStart(2,"0"));
R.forEach(r=>{const b=txKey(r.d);if(!keys.includes(b))return;const o=m[b]=m[b]||{B:0,S:0,nb:0,ns:0};if(r.ty==="Buy"){o.B+=-r.a;o.nb++}else{o.S+=r.a;o.ns++}});
const W=CD.dv.W,H=CD.dv.H,pl=54,pr=8,pt=22,pb=42,n=keys.length,SER=[["B","Bought",TXC()[0],"nb"],["S","Sold",TXC()[1],"ns"]];
let mx=Math.max(1,...keys.map(b=>Math.max((m[b]||{}).B||0,(m[b]||{}).S||0)));
const raw=mx/4,pw=Math.pow(10,Math.floor(Math.log10(raw))),fr=raw/pw,step=(fr<=1?1:fr<=2?2:fr<=2.5?2.5:fr<=5?5:10)*pw;
mx=Math.ceil(mx/step-1e-9)*step;
const ys=v=>H-pb-v*(H-pt-pb)/mx,bw=(W-pl-pr)/n,w=Math.min(bw*0.34,40);
let g="";
for(let v=0;v<=mx+step/1000;v+=step){const y=ys(v).toFixed(1);g+='<line class="gl" x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y+'" y2="'+y+'" stroke="currentColor" opacity="'+(v?".08":".4")+'"/><text x="'+(pl-7)+'" y="'+(+y+4)+'" font-size="11" text-anchor="end" fill="currentColor">'+ekc(v)+'</text>'}
let tb=0,ts=0;
keys.forEach((b,i)=>{
const o=m[b]||{B:0,S:0,nb:0,ns:0},cx=pl+i*bw+bw/2,nt=o.B-o.S;tb+=o.B;ts+=o.S;
g+='<rect class="dvh" x="'+(pl+i*bw).toFixed(1)+'" y="'+pt+'" width="'+bw.toFixed(1)+'" height="'+(H-pt)+'" fill="transparent" data-tk="'+b+'"/>';
SER.forEach((sr,j)=>{
const v=o[sr[0]],cnt=o[sr[3]];if(v<=0)return;
const x=j?cx+1:cx-w-1,y1=ys(v);
g+='<rect class="dvb" x="'+x.toFixed(1)+'" y="'+y1.toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+Math.max(0.5,ys(0)-y1).toFixed(1)+'" rx="2" fill="'+sr[2]+'" data-c="'+sr[2]+'" data-n="'+sr[1]+'" data-v="'+e2(v)+'" data-b="'+dvt(b)+'" data-x="'+dvt(b)+' \u00b7 '+cnt+' trade'+(cnt===1?"":"s")+' \u00b7 net invested '+(nt>=0?"+":"\u2212")+e2(Math.abs(nt))+'" data-tk="'+b+'" data-ts="'+sr[0]+'"/>';
if(n<=6)g+='<text x="'+(x+w/2).toFixed(1)+'" y="'+(y1-5).toFixed(1)+'" font-size="10" text-anchor="middle" fill="currentColor">'+ekc(v)+'</text>';
});
g+='<text x="'+cx.toFixed(1)+'" y="'+(H-6)+'" font-size="11" text-anchor="middle" fill="currentColor">'+dvl(b)+'</text>';
if(o.B||o.S)g+='<text x="'+cx.toFixed(1)+'" y="'+(H-22)+'" font-size="10" font-weight="600" text-anchor="middle" style="fill:'+(nt>=0?TXC()[0]:TXC()[1])+'">'+(nt>=0?"+":"\u2212")+ekc(Math.abs(nt))+'</text>';
});
g+='<circle cx="'+(pl+4)+'" cy="8" r="4" fill="'+TXC()[0]+'"/><text x="'+(pl+12)+'" y="12" font-size="11" style="fill:var(--fg)">Bought</text><circle cx="'+(pl+68)+'" cy="8" r="4" fill="'+TXC()[1]+'"/><text x="'+(pl+76)+'" y="12" font-size="11" style="fill:var(--fg)">Sold</text>';
g+='<text x="'+(W-pr)+'" y="12" font-size="11" text-anchor="end" style="fill:var(--mu)">Bought '+e2(tb)+' \u00b7 sold '+e2(ts)+' \u00b7 net invested '+(tb-ts>=0?"+":"\u2212")+e2(Math.abs(tb-ts))+'</text><g id="dvt" visibility="hidden" pointer-events="none"></g>';
return h+'<svg class="dv" viewBox="0 0 '+W+' '+H+'">'+g+'</svg><p class="mu">Amounts are the cash paid or received in euro, including trading costs. The figure above each period is net invested (bought minus sold). Click a bar to see the trades behind it.</p></div>';
}
function openTx(b,sr){
const R=txBS().filter(r=>txKey(r.d)===b).sort((x,y)=>x.d<y.d?-1:x.d>y.d?1:x.o-y.o),bo=R.filter(r=>r.ty==="Buy").reduce((a,r)=>a-r.a,0),so=R.filter(r=>r.ty==="Sell").reduce((a,r)=>a+r.a,0);
let h='<p class="mu">Bought <b>'+e2(bo)+'</b> \u00b7 sold <b>'+e2(so)+'</b> \u00b7 net invested <b>'+(bo-so>=0?"+":"\u2212")+e2(Math.abs(bo-so))+'</b> \u00b7 '+R.length+' trade'+(R.length===1?"":"s")+'</p><div class="sc"><table><tr><th>Date</th><th>Type</th><th>Instrument</th><th>Broker</th><th>Shares</th><th>Price</th><th>Amount</th></tr>';
R.forEach(r=>{const c=r.ty==="Buy"?TXC()[0]:TXC()[1];h+='<tr style="background:color-mix(in srgb,'+c+' 11%,transparent)'+(sr&&(sr==="B")===(r.ty==="Buy")?";font-weight:700":"")+'"><td style="box-shadow:inset 3px 0 0 '+c+'">'+fd(r.d)+'</td><td style="text-align:left"><b style="color:'+c+'">\u25cf</b> '+(r.ty==="Buy"?"Bought":"Sold")+'</td><td style="text-align:left">'+esc(r.n)+'</td><td>'+esc(r.b)+'</td><td>'+sh(r.q)+'</td><td>'+r.px+'</td><td>'+e2(Math.abs(r.a))+'</td></tr>'});
h+='</table></div>';
showModal("Bought & sold \u00b7 "+dvt(b),h);
}
let GV="tot",GD=false;
function txGain(){
const C=TXC(),neg=MODEV==="dark"?"#e8786f":"#b42318",amb="#d9962b",W=CD.dv.W,H=CD.dv.H,pl=54,pr=8,pt=22,pb=28,sp=GV==="split";
let h='<div class="card"><h2>Transactions</h2><div class="dvc"><div><span class="seg"><button data-gv="tot"'+(!sp?' class="on"':"")+'>Total</button><button data-gv="split"'+(sp?' class="on"':"")+'>Realised / unrealised</button></span> <button data-gd="1"'+(GD?' class="on"':"")+'>Dividends</button></div>'+TXSW("gain")+'</div>';
if(!days.length)return h+'<p class="mu">No data to show yet.</p></div>';
const y0=+days[0].slice(0,4),y1=+days[days.length-1].slice(0,4),R=txRows(),Y=[],RY={},by={};
tx.forEach(t=>{(by[t.key]=by[t.key]||[]).push(t)});
for(const k in by){const o=isOpt(k);let q=0,cost=0;by[k].forEach(t=>{const a=o?t.q:t.qa,c=isFinite(t.cs)?t.cs:t.g,yy=String(t.d).slice(0,4);let r=0;
if(a>0){q+=a;cost+=c}else if(q>0){const f=Math.min(1,-a/q);r=c-cost*f;cost-=cost*f;q+=a}else r=c;
if(isFinite(r))RY[yy]=(RY[yy]||0)+r})}
for(let y=y0;y<=y1;y++){
const yk=String(y);let ib=-1,ia=-1;
for(let i=0;i<days.length;i++){const yy=days[i].slice(0,4);if(yy<=yk)ib=i;if(yy<yk)ia=i}
const X=ia>=0?valueAt(ia):0,V=ib>=0?valueAt(ib):0;let net=0;
tx.forEach(t=>{if(t.di>ia&&t.di<=ib&&isFinite(t.fc))net+=(t.q>0?1:-1)*t.fc});
const dv=R.filter(r=>(r.ty==="Dividend"||r.ty==="Tax")&&r.d.slice(0,4)===yk&&isFinite(r.a)).reduce((a,r)=>a+r.a,0),tg=V-X-net,re=RY[yk]||0;
Y.push({y:yk,re:re,un:tg-re,dv:dv,g:tg+(GD?dv:0)});
}
const S=sp?[["Realised",C[0],"re"],["Unrealised",C[1],"un"]].concat(GD?[["Dividends",amb,"dv"]]:[]):[["Total",null,"g"]];
const n=Y.length,k=S.length,tot=sp?null:Y.reduce((a,o)=>a+o.g,0),vals=[];Y.forEach(o=>S.forEach(x=>vals.push(o[x[2]])));
let mn=Math.min(0,...vals),mx=Math.max(0,...vals);if(mx===mn)mx=mn+1;
const raw=(mx-mn)/4,pw=Math.pow(10,Math.floor(Math.log10(raw))),fr=raw/pw,step=(fr<=1?1:fr<=2?2:fr<=2.5?2.5:fr<=5?5:10)*pw;
mn=Math.floor(mn/step+1e-9)*step;mx=Math.ceil(mx/step-1e-9)*step;
const ys=v=>pt+(mx-v)*(H-pt-pb)/(mx-mn),bw=(W-pl-pr)/n,gw=Math.min(bw*0.7,sp?90:56),w=gw/k*(k>1?0.9:1),z=ys(0),lab=v=>(v<0?"\u2212":"")+ekc(Math.abs(v)),sg=v=>(v>=0?"+":"\u2212")+e2(Math.abs(v));
let g="";
for(let v=mn;v<=mx+step/1000;v+=step){const y=ys(v).toFixed(1);g+='<line class="gl" x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y+'" y2="'+y+'" stroke="currentColor" opacity="'+(Math.abs(v)<step/1000?".4":".08")+'"/><text x="'+(pl-7)+'" y="'+(+y+4)+'" font-size="11" text-anchor="end" fill="currentColor">'+lab(v)+'</text>'}
Y.forEach((o,i)=>{
const cx=pl+i*bw+bw/2;
g+='<rect class="dvh" x="'+(pl+i*bw).toFixed(1)+'" y="'+pt+'" width="'+bw.toFixed(1)+'" height="'+(H-pt)+'" fill="transparent"/>';
S.forEach((x,j)=>{const v=o[x[2]],c=x[1]||(v>=0?C[1]:neg),bx=cx-gw/2+j*gw/k+(gw/k-w)/2,y1=ys(v),top=Math.min(y1,z),ht=Math.max(1,Math.abs(y1-z));
g+='<rect class="dvb" x="'+bx.toFixed(1)+'" y="'+top.toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+ht.toFixed(1)+'" rx="2" fill="'+c+'" data-c="'+c+'" data-n="'+(sp?x[0]:(v>=0?"Gain":"Loss"))+'" data-v="'+e2(v)+'" data-b="'+o.y+'" data-x="'+o.y+(sp?'':(GD?' \u00b7 incl. dividends '+e2(o.dv):' \u00b7 excl. dividends'))+'"/>';
if(n*k<=8)g+='<text x="'+(bx+w/2).toFixed(1)+'" y="'+(v>=0?y1-5:y1+13).toFixed(1)+'" font-size="10" text-anchor="middle" fill="currentColor">'+(v>=0?"+":"")+lab(v)+'</text>'});
g+='<text x="'+cx.toFixed(1)+'" y="'+(H-8)+'" font-size="11" text-anchor="middle" fill="currentColor">'+o.y+'</text>';
});
let lx=pl+4;
(sp?S.map(x=>[x[0],x[1]]):[["Gain",C[1]],["Loss",neg]]).forEach(x=>{g+='<circle cx="'+lx+'" cy="8" r="4" fill="'+x[1]+'"/><text x="'+(lx+8)+'" y="12" font-size="11" style="fill:var(--fg)">'+x[0]+'</text>';lx+=x[0].length*6.5+30});
const T=sp?S.map(x=>x[0]+" "+sg(Y.reduce((a,o)=>a+o[x[2]],0))).join(" \u00b7 "):"Total "+sg(tot);
g+='<text x="'+(W-pr)+'" y="12" font-size="11" text-anchor="end" style="fill:var(--mu)">'+T+'</text><g id="dvt" visibility="hidden" pointer-events="none"></g>';
return h+'<svg class="dv" viewBox="0 0 '+W+' '+H+'">'+g+'</svg><p class="mu">Per calendar year, for your whole portfolio, trading costs included. <b>Realised</b> is profit or loss on shares you sold. <b>Unrealised</b> is the change during the year in the gain or loss on shares you still hold. Dividends are net of tax and only counted when switched on. The latest year runs to your last price date. Idle cash is not included.</p></div>';
}
function transactions(){
if(TXV==="chart")return txChart();
if(TXV==="gain")return txGain();
let R=txRows();
const sum=ty=>R.filter(r=>r.ty===ty).reduce((a,r)=>a+(isFinite(r.a)?r.a:0),0);
const bought=-sum("Buy"),sold=sum("Sell"),dv=sum("Dividend")+sum("Tax");
R=R.filter(r=>TXF==="all"||(TXF==="Other"?["Tax","Fee","Interest"].includes(r.ty):r.ty===TXF));
R.sort((x,y)=>(x.d<y.d?-1:x.d>y.d?1:x.o-y.o)*TXO);
const F=[["all","All"],["Buy","Buys"],["Sell","Sells"],["Dividend","Dividends"],["Other","Fees, interest, other"]];
let h='<div class="card"><h2>Transactions</h2><div class="dvc"><div>'+F.map(f=>'<button data-txf="'+f[0]+'"'+(TXF===f[0]?' class="on"':"")+'>'+f[1]+'</button>').join("")+' &nbsp; <button data-txo="1">'+(TXO<0?"Newest first \u2193":"Oldest first \u2191")+'</button></div>'+TXSW("table")+'</div>';
h+='<p class="mu">'+R.length+' shown \u00b7 bought '+eur(bought)+' \u00b7 sold '+eur(sold)+' \u00b7 dividends net of tax '+eur(dv)+'. Click a column header to sort.</p>';
h+='<div class="sc"><table class="tx"><colgroup><col style="width:15%"><col style="width:8%"><col style="width:25%"><col style="width:8%"><col style="width:8%"><col style="width:13%"><col style="width:12%"><col style="width:11%"></colgroup><tr><th>Date</th><th>Type</th><th>Instrument</th><th>Broker</th><th>Shares</th><th>Price</th><th>Amount</th><th>Costs / tax</th></tr>';
R.forEach(r=>{
h+='<tr><td data-s="'+r.d.replace(/-/g,"")+'">'+fd(r.d)+'</td><td><span class="pill p-'+r.ty+'">'+r.ty+'</span></td><td><span class="ti" title="'+esc(r.n)+'">'+(r.k?'<a href="#" data-det="'+esc(r.k)+'">'+esc(r.n)+'</a>':esc(r.n))+'</span></td><td>'+r.b+'</td><td>'+(r.q==null?"\u2013":sh(r.q))+'</td><td>'+r.px+'</td><td>'+(isFinite(r.a)?(r.a>0?"+":"")+e2(r.a):"\u2013")+'</td><td>'+(isFinite(r.f)&&Math.abs(r.f)>=0.005?e2(r.f):"\u2013")+'</td></tr>';
});
return h+'</table></div><p class="mu">Amounts are cash in euro: negative is money spent on a buy, positive is money received. For dividends the amount is the net cash received and the last column is the tax withheld; for trades it is trading costs including currency conversion where known.</p></div>';
}
let USR=[];try{USR=JSON.parse(ls.get("users")||"[]")}catch(e){}
const saveUsers=()=>ls.set("users",JSON.stringify(USR));
function users(){
const n=USR.length,pro=USR.filter(u=>u.plan==="Pro").length,act=USR.filter(u=>u.status==="Active").length;
const tile=(l,v,t)=>'<div class="kpi"><div class="kl">'+l+'</div><div class="kv">'+v+'</div><div class="ks">'+t+'</div></div>';
const sel=(o,v,id,f)=>'<select data-uid="'+id+'" data-uf="'+f+'">'+o.map(x=>'<option'+(x===v?" selected":"")+'>'+x+'</option>').join("")+'</select>';
let h='<div class="card"><h2>Users</h2><div class="kpis" style="--kc:4">'+tile("Total users",n,"In this browser")+tile("Free",n-pro,"Basic access")+tile("Pro",pro,"Paid plan")+tile("Active",act,"Not suspended")+'</div>';
h+='<div class="uf"><input id="uem" type="email" placeholder="name@company.com" autocomplete="off"><input id="unm" placeholder="Name" autocomplete="off"><select id="upl2"><option>Free</option><option>Pro</option></select><button class="go" data-ua="1">Add user</button></div>';
h+='<div class="sc"><table><tr><th>Name</th><th>Email</th><th>Plan</th><th>Status</th><th>Joined</th><th></th></tr>';
if(!n)h+='<tr><td colspan="6" class="mu" style="text-align:left">No users yet. Add a test user to see how plans and statuses will look.</td></tr>';
USR.forEach(u=>{h+='<tr><td>'+esc(u.name||"\u2013")+'</td><td style="text-align:left">'+esc(u.email)+'</td><td>'+sel(["Free","Pro"],u.plan,u.id,"plan")+'</td><td>'+sel(["Active","Suspended"],u.status,u.id,"status")+'</td><td>'+fd(u.joined)+'</td><td><button class="ib" data-ud="'+u.id+'" title="Remove user" aria-label="Remove user">&#10005;</button></td></tr>'});
return h+'</table></div><p class="mu">This list is stored in this browser only, so it is a placeholder. Once you add a login and a backend (for example Supabase or Firebase), this tab reads the real user table, and the plan decides what each user can open behind the paywall.</p></div>';
}
function dvEvents(){
if(DVS==="fc"){
const last=days[days.length-1];if(!last)return [];
let y=+last.slice(0,4),mo=+last.slice(5,7)+1;if(mo>12){mo=1;y++}
const from=(y-1)+"-"+String(mo).padStart(2,"0")+"-01",held={};
POSL.forEach(r=>{if(r.q>0&&!r.o)held[r.k]=r.q});
const out=[];
DV.forEach(e=>{if(e.d<from||e.d>last||!held[e.k])return;const f=e.sh>0?held[e.k]/e.sh:1,d=new Date(e.d+"T00:00:00Z");d.setUTCFullYear(d.getUTCFullYear()+1);out.push({d:d.toISOString().slice(0,10),k:e.k,n:e.n,b:e.b,g:e.g*f,t:e.t*f,sh:held[e.k]})});
return out;
}
return DV.filter(e=>DVS==="all"||e.d.slice(0,4)===DVS);
}
function dvOrder(){const t={};DV.forEach(e=>{t[e.k]=(t[e.k]||0)+e.g+e.t});return Object.keys(t).sort((a,b)=>t[b]-t[a])}
const dvCol=(k,o)=>PIEC[Math.min(o.indexOf(k),12)%PIEC.length];
function dvData(){
const E=dvEvents(),m={},nm={},pk=d=>DVS==="all"?d.slice(0,4):d.slice(0,7);
E.forEach(e=>{const n=e.g+e.t;if(!n)return;const b=pk(e.d);m[b]=m[b]||{};m[b][e.k]=(m[b][e.k]||0)+n;nm[e.k]=e.n});
if(!Object.keys(m).length)return null;
const keys=[];
if(DVS==="all"){const ys=DV.map(e=>+e.d.slice(0,4)),y1=Math.max(...ys,+(days[days.length-1]||"0").slice(0,4));for(let y=Math.min(...ys);y<=y1;y++)keys.push(String(y))}
else if(DVS==="fc"){const l=days[days.length-1];let y=+l.slice(0,4),mo=+l.slice(5,7);for(let i=0;i<12;i++){mo++;if(mo>12){mo=1;y++}keys.push(y+"-"+String(mo).padStart(2,"0"))}}
else for(let i=1;i<=12;i++)keys.push(DVS+"-"+String(i).padStart(2,"0"));
return {m:m,nm:nm,keys:keys,order:dvOrder()};
}
function divChart(){
const D=dvData();
if(!D)return '<p class="mu">'+(DVS==="fc"?"No dividends in the last 12 months from holdings you still own, so there is nothing to project.":"No dividends in this period.")+'</p>';
const m=D.m,nm=D.nm,keys=D.keys,order=D.order,n=keys.length,W=CD.dv.W,H=CD.dv.H,pl=54,pr=8,pt=22,pb=28,fc=DVS==="fc";
const cl=k=>dvCol(k,order);
const tots=keys.map(b=>Object.values(m[b]||{}).reduce((a,v)=>a+Math.max(0,v),0));
let mx=Math.max(4,...tots);
const raw=mx/4,pw=Math.pow(10,Math.floor(Math.log10(raw))),fr=raw/pw,step=(fr<=1?1:fr<=2?2:fr<=2.5?2.5:fr<=5?5:10)*pw;
mx=Math.ceil(mx/step-1e-9)*step;
const ys=v=>H-pb-v*(H-pt-pb)/mx,bw=(W-pl-pr)/n,w=Math.min(bw*0.62,64),ev=n>16?2:1;
let g="";
for(let v=0;v<=mx+step/1000;v+=step){const y=ys(v).toFixed(1);g+='<line class="gl" x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y+'" y2="'+y+'" stroke="currentColor" opacity="'+(v?".08":".4")+'"/><text x="'+(pl-7)+'" y="'+(+y+4)+'" font-size="11" text-anchor="end" fill="currentColor">'+(HIDE?"":eur(v))+'</text>'}
keys.forEach((b,i)=>{
const x=pl+i*bw+(bw-w)/2;let cum=0;
g+='<rect class="dvh" x="'+(pl+i*bw).toFixed(1)+'" y="'+pt+'" width="'+bw.toFixed(1)+'" height="'+(H-pt)+'" fill="transparent" data-dk="'+b+'"/>';
order.forEach(k=>{
const v=Math.max(0,(m[b]||{})[k]||0);if(v<=0)return;
const y1=ys(cum+v),h=ys(cum)-y1;
g+='<rect class="dvb" x="'+x.toFixed(1)+'" y="'+y1.toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+Math.max(0.5,h).toFixed(1)+'" rx="2" fill="'+cl(k)+'"'+(fc?' fill-opacity=".26" stroke-dasharray="4 3" style="stroke:'+cl(k)+'" stroke-width="1.3"':' style="stroke:var(--card)" stroke-width=".8"')+' data-c="'+cl(k)+'" data-n="'+esc(nm[k]||k)+'" data-v="'+e2(v)+'" data-b="'+dvt(b)+'" data-t="'+e2(tots[i])+'" data-f="'+(fc?1:0)+'" data-dk="'+b+'" data-ki="'+esc(k)+'"/>';
cum+=v;
});
if(n<=16&&tots[i]>0)g+='<text x="'+(x+w/2).toFixed(1)+'" y="'+(ys(tots[i])-5).toFixed(1)+'" font-size="10" text-anchor="middle" fill="currentColor">'+(HIDE?"":eur2(tots[i]))+'</text>';
if((n-1-i)%ev===0)g+='<text x="'+(x+w/2).toFixed(1)+'" y="'+(H-8)+'" font-size="11" text-anchor="middle" fill="currentColor">'+dvl(b)+'</text>';
});
g+='<text x="'+(W-pr)+'" y="12" font-size="11" text-anchor="end" style="fill:var(--mu)">'+(fc?"Estimated net, next 12 months: ":"Net dividends: ")+e2(tots.reduce((a,v)=>a+v,0))+'</text>';
if(fc)g+='<text x="'+pl+'" y="12" font-size="11" font-weight="600" style="fill:#d9962b">ESTIMATE \u00b7 based on your last 12 months</text>';
g+='<g id="dvt" visibility="hidden" pointer-events="none"></g>';
return '<svg class="dv" viewBox="0 0 '+W+' '+H+'">'+g+'</svg>'+(fc?'<p class="mu">Forecast: the dividends you received in the last 12 months from holdings you still own, repeated in the same month next year and scaled to the number of shares you hold today. It is an estimate, not a promise: companies can raise, cut or skip a dividend.</p>':"");
}
function divTable(){
const B={};
DV.forEach(e=>{const b=DVM==="m"?e.d.slice(0,7):e.d.slice(0,4),o=B[b]=B[b]||{g:0,t:0,c:0,v:{}};o.g+=e.g;o.t+=e.t;if(e.g>0)o.c++;o.v[e.n]=(o.v[e.n]||0)+e.g+e.t});
const ks=Object.keys(B).sort().reverse();if(!ks.length)return "";
let h='<h2>Detail per '+(DVM==="m"?"month":"year")+'</h2><div class="sc"><table><tr><th>'+(DVM==="m"?"Month":"Year")+'</th><th>Payments</th><th>Gross</th><th>Tax</th><th>Net</th><th>Paid by</th></tr>';
ks.forEach(b=>{
const o=B[b],who=Object.keys(o.v).sort((x,y)=>o.v[y]-o.v[x]).map(k=>esc(k)+' <span class="mu">'+e2(o.v[k])+'</span>').join(", ");
h+='<tr><td data-s="'+b.replace("-","")+'">'+(DVM==="m"?MN[+b.slice(5)-1]+" "+b.slice(0,4):b)+'</td><td>'+o.c+'</td><td>'+e2(o.g)+'</td><td>'+e2(o.t)+'</td><td><b>'+e2(o.g+o.t)+'</b></td><td style="white-space:normal;text-align:left;min-width:220px">'+who+'</td></tr>';
});
return h+'</table></div>';
}
function wealth(){
if(WB.start==null)WB.start=Math.round(POSL.reduce((a,r)=>a+r.val,0));
const inf=infoI,f=(k,l,t)=>'<label class="wf"><span>'+l+(t?inf(t):"")+'</span><input type="'+(HIDE&&["start","monthly","income"].includes(k)?"password":"number")+'" step="any" data-w="'+k+'" value="'+WB[k]+'"></label>',age=WB.mode==="age";
let h='<div class="card"><h2>Wealth builder</h2><button data-wm="age"'+(age?' class="on"':"")+'>Retirement age</button><button data-wm="years"'+(age?"":' class="on"')+'>Future value</button>';
h+='<div class="wg">'+f("age","Current age")+f("start","Starting capital (\u20ac)")+f("monthly","Monthly contribution (\u20ac)")+f("grow","Annual contribution increase (%)")+f("ret","Expected annual return (%)")+f("infl","Annual inflation (%)")
+(age?f("income","Target monthly income (today\u2019s \u20ac)"):'<label class="wf"><span>Investment horizon: <b id="wby">'+WB.years+'</b> years</span><input type="range" min="1" max="50" step="1" data-w="years" value="'+WB.years+'"></label>')+f("wr","Withdrawal rate (%)","The share of your capital you withdraw each year once retired. At 4%, a capital of \u20ac1,000,000 pays \u20ac40,000 per year (about \u20ac3,333 per month). Your target capital is your wanted yearly income divided by this rate: a lower rate is safer but needs more capital, a higher rate lets you retire sooner but risks running out.")+'</div>';
h+='<p><label><input type="checkbox" data-w="real"'+(WB.real?" checked":"")+'> Show in today\u2019s euros (inflation-adjusted)</label>'+inf("Prices rise over time, so \u20ac100,000 in 25 years buys less than \u20ac100,000 today. Ticked: every amount is converted to today\u2019s purchasing power using the inflation rate above, which makes results easier to compare with your wanted income. Unticked: nominal euros, the actual amounts you would see at that date.")+'</p>';
return h+'<p class="mu">Starting capital is prefilled with your current portfolio value. The estimate assumes a constant yearly return, monthly contributions, no taxes or fees, and that retirement means your capital reaches the amount where the withdrawal rate gives your wanted income. From that moment contributions stop (there is no income left to invest) and you withdraw your target income every month, rising with inflation; the chart shows the capital running down. Real markets fluctuate; this is an illustration, not advice.</p></div><div class="card"><h2>Projection</h2><div id="wbo"></div></div>';
}
function wbCalc(T,ret){
const rm=Math.pow(1+WB.ret/100,1/12)-1,inf=WB.infl/100,wr=Math.max(0.1,WB.wr)/100,inc=WB.income*12;
let bal=WB.start,con=WB.start,m=WB.monthly,hit=null,hb=null,hc=null,wd=0,wdr=0;const pts=[{bal:bal,con:con,wd:0,wdr:0}];
const tg=mo=>inc*Math.pow(1+inf,mo/12)/wr;
if(bal>=tg(0)){hit=0;hb=bal;hc=con}
for(let mo=1;mo<=T*12;mo++){
const retired=ret&&hit!=null;
if(retired){const f=Math.pow(1+inf,mo/12),w=Math.min(bal*(1+rm),inc/12*f);bal=bal*(1+rm)-w;wd+=w;wdr+=w/f}
else{bal=bal*(1+rm)+m;con+=m}
if(hit==null&&bal>=tg(mo)){hit=mo;hb=bal;hc=con}
if(mo%12===0){pts.push({bal:bal,con:con,wd:wd,wdr:wdr});if(!retired)m*=1+WB.grow/100}
}
return {pts:pts,hit:hit,hb:hb,hc:hc,tg:tg};
}
function wbUpdate(){
const el=$("wbo");if(!el||!POSL)return;
const age=WB.mode==="age",inf=WB.infl/100,wr=Math.max(0.1,WB.wr)/100,inc=WB.income*12,a0=Math.round(WB.age);
const T=age?Math.max(1,Math.min(70,100-a0)):Math.max(1,Math.min(60,Math.round(WB.years)));
const A=wbCalc(T,age),fr=y=>WB.real?Math.pow(1+inf,-y):1,hit=age&&A.hit!=null;
let n=T;if(hit){const hy=A.hit/12;n=Math.min(T,Math.max(2,Math.ceil(hy+Math.max(10,hy*0.4))))}
const pts=A.pts.slice(0,n+1),tot=pts.map((p,i)=>p.bal*fr(i)),cn=pts.map((p,i)=>p.con*fr(i));
const tgt=age?pts.map((p,i)=>WB.real?inc/wr:A.tg(i*12)):null;
const E=hit?{b:A.hb,c:A.hc,y:A.hit/12}:{b:A.pts[T].bal,c:A.pts[T].con,y:T},ef=fr(E.y);
const tile=(l,v,s)=>'<div class="kpi"><div class="kl">'+l+'</div><div class="kv">'+v+'</div><div class="ks">'+s+'</div></div>';
const ym=mo=>Math.floor(mo/12)+" y "+(mo%12)+" m",gr=(E.b-E.c)*ef;
let t;
if(age){
t=(hit?tile("Retirement age",Math.floor((a0*12+A.hit)/12)+" y "+((a0*12+A.hit)%12)+" m","in "+ym(A.hit)):tile("Retirement age","Not reached","by age 100 with these numbers"))
+(hit?tile("Capital needed",eur(WB.real?inc/wr:A.tg(A.hit)),eur(WB.income)+" per month at "+WB.wr+"% withdrawal"):tile("Capital at age 100",eur(E.b*ef),"target "+eur(WB.real?inc/wr:A.tg(T*12))))
+tile("Total invested",eur(E.c*ef),"including starting capital")+tile("Growth",eur(gr),(E.b>0?((E.b-E.c)/E.b*100).toFixed(0):0)+"% of the final amount");
}else{
t=tile("Value after "+T+" years",eur(E.b*ef),"at age "+(a0+T))+tile("Total invested",eur(E.c*ef),"including starting capital")
+tile("Growth",eur(gr),"\u00d7"+(E.c>0?(E.b/E.c).toFixed(2):"\u2013")+" on what you put in")+tile("Monthly income",eur(E.b*ef*wr/12),"at "+WB.wr+"% withdrawal"+(WB.real?" (today\u2019s \u20ac)":""));
}
const Wd=700,H=300,pl=56,pr=16,pt=26,pb=28,raw0=Math.max(1,...tot)*1.08,raw=raw0/4,pw=Math.pow(10,Math.floor(Math.log10(raw))),q=raw/pw,step=(q<=1?1:q<=2?2:q<=2.5?2.5:q<=5?5:10)*pw,mx=Math.ceil(raw0/step-1e-9)*step;
const xs=i=>pl+i*(Wd-pl-pr)/n,ys=v=>H-pb-v*(H-pt-pb)/mx,pp=(arr,j)=>arr.map((v,i)=>xs(i).toFixed(1)+","+ys(v).toFixed(1)).join(j);
const ek=v=>HIDE?"":v>=1e6?"\u20ac"+(+(v/1e6).toFixed(2))+"M":v>=1e3?"\u20ac"+Math.round(v/1e3)+"k":"\u20ac"+Math.round(v);
let g='<defs><linearGradient id="wbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ac);stop-opacity:.42"/><stop offset="1" style="stop-color:var(--ac);stop-opacity:.05"/></linearGradient></defs>';
for(let v=0;v<=mx+step/1000;v+=step){const y=ys(v).toFixed(1);g+='<line class="gl" x1="'+pl+'" x2="'+(Wd-pr)+'" y1="'+y+'" y2="'+y+'" stroke="currentColor" opacity="'+(v?".07":".35")+'"/><text x="'+(pl-8)+'" y="'+(+y+4)+'" font-size="11" text-anchor="end" fill="currentColor">'+ek(v)+'</text>'}
const base=ys(0).toFixed(1),cr=cn.map((v,i)=>xs(i).toFixed(1)+","+ys(v).toFixed(1)).reverse().join("L");
g+='<path d="M'+xs(0).toFixed(1)+","+base+"L"+pp(cn,"L")+"L"+xs(n).toFixed(1)+","+base+'Z" fill="currentColor" opacity=".09"/>';
g+='<path d="M'+pp(tot,"L")+"L"+cr+'Z" fill="url(#wbg)"/>';
g+='<polyline class="ln" style="stroke:var(--ac)" stroke-linejoin="round" points="'+pp(tot," ")+'"/><polyline class="ln" style="stroke:var(--mu);stroke-width:1.3;stroke-dasharray:2 4" stroke-linecap="round" points="'+pp(cn," ")+'"/>';
if(tgt){const ty=Math.max(pt,ys(tgt[n]));g+='<polyline class="ln" style="stroke:'+PIEC[1]+';stroke-width:1.4;stroke-dasharray:6 4" points="'+tgt.map((v,i)=>xs(i).toFixed(1)+","+Math.max(pt,ys(v)).toFixed(1)).join(" ")+'"/><text x="'+(Wd-pr-2)+'" y="'+(ty-6).toFixed(1)+'" font-size="11" text-anchor="end" style="fill:'+PIEC[1]+'">Capital needed '+ek(tgt[n])+'</text>'}
if(hit){g+='<rect x="'+xs(A.hit/12).toFixed(1)+'" y="'+pt+'" width="'+(Wd-pr-xs(A.hit/12)).toFixed(1)+'" height="'+(H-pt-pb)+'" style="fill:'+PIEC[1]+'" opacity=".07"/><text x="'+(Wd-pr-6)+'" y="'+(pt+16)+'" font-size="10.5" font-weight="600" text-anchor="end" style="fill:var(--fg)">Retired: withdrawing</text><text x="'+(Wd-pr-6)+'" y="'+(pt+30)+'" font-size="10.5" text-anchor="end" style="fill:var(--fg)">'+eur(WB.real?WB.income:WB.income*Math.pow(1+inf,A.hit/12))+' per month</text><text x="'+(Wd-pr-6)+'" y="'+(pt+44)+'" font-size="10.5" text-anchor="end" style="fill:var(--mu)">no new contributions</text>';const x=xs(A.hit/12),lb="Retire at "+Math.floor((a0*12+A.hit)/12),w2=lb.length*6.4+18,px2=Math.max(pl,Math.min(Wd-pr-w2,x-w2/2));
g+='<line class="gl" x1="'+x.toFixed(1)+'" x2="'+x.toFixed(1)+'" y1="'+(pt-4)+'" y2="'+(H-pb)+'" stroke="currentColor" opacity=".35" stroke-dasharray="3 3"/><circle cx="'+x.toFixed(1)+'" cy="'+ys(E.b*ef).toFixed(1)+'" r="5" style="fill:var(--ac);stroke:var(--card)" stroke-width="2"/><rect x="'+px2.toFixed(1)+'" y="3" width="'+w2.toFixed(0)+'" height="17" rx="8.5" style="fill:var(--ac)"/><text x="'+(px2+w2/2).toFixed(1)+'" y="15" font-size="11" font-weight="600" text-anchor="middle" style="fill:var(--onac)">'+lb+'</text>'}
const ts=n<=10?1:n<=20?2:n<=40?5:10;
for(let i=0;i<=n;i+=ts)g+='<text x="'+xs(i).toFixed(1)+'" y="'+(H-8)+'" font-size="11" text-anchor="middle" fill="currentColor">'+(a0+i)+'</text>';
g+='<line id="wbl" y1="'+pt+'" y2="'+(H-pb)+'" stroke="currentColor" opacity=".5" visibility="hidden"/><g id="wbt" visibility="hidden" pointer-events="none"></g>';
el.innerHTML='<div class="kpis">'+t+'</div><svg class="ch" viewBox="0 0 '+Wd+' '+H+'">'+g+'</svg><div class="lg"><span><b style="color:var(--ac)">\u25cf</b> Total value</span><span><b style="color:var(--mu)">\u25cf</b> Invested</span><span><b style="color:var(--ac);opacity:.4">\u25cf</b> Growth</span>'+(tgt?'<span><b style="color:'+PIEC[1]+'">\u25cf</b> Capital needed</span>':"")+(hit?'<span><b style="color:'+PIEC[1]+';opacity:.5">\u25a0</b> Retired: withdrawing, no new contributions</span>':"")+'<span class="mu">'+(WB.real?"Today\u2019s euros":"Nominal euros")+'</span></div>';
const sv=el.querySelector("svg"),cl=$("wbl"),tg=$("wbt");
const hv=ev=>{
const r=sv.getBoundingClientRect(),sc=Math.min(r.width/Wd,r.height/H),x=(ev.clientX-r.left-(r.width-Wd*sc)/2)/sc,i=Math.max(0,Math.min(n,Math.round((x-pl)*n/(Wd-pl-pr)))),px=xs(i);
cl.setAttribute("x1",px);cl.setAttribute("x2",px);cl.setAttribute("visibility","visible");
const R=[["Total value",tot[i],"var(--ac)",1],["Invested",cn[i],"var(--mu)",1],["Growth",tot[i]-cn[i],"var(--ac)",.4]];if(tgt)R.push(["Capital needed",tgt[i],PIEC[1],1]);if(hit&&i*12>A.hit)R.push(["Withdrawn so far",WB.real?pts[i].wdr:pts[i].wd,PIEC[1],.5]);
const T2=R.map(a=>[a[0],eur(a[1]),a[2],a[3]]),title="Age "+(a0+i)+" \u00b7 year "+i+(hit&&i*12>A.hit?" \u00b7 retired":""),mc=Math.max(title.length,...T2.map(l=>l[0].length+l[1].length+3)),w=Math.min(Wd-20,mc*6.6+34),h=17*(T2.length+1)+8;
let bx=px+12;if(bx+w>Wd-pr)bx=px-w-12;if(bx<pl)bx=pl;
let sx='<rect x="'+bx.toFixed(1)+'" y="'+(pt+4)+'" width="'+w.toFixed(0)+'" height="'+h+'" rx="5" style="fill:var(--card);stroke:var(--bd)" stroke-width=".8"/><text x="'+(bx+8).toFixed(1)+'" y="'+(pt+19)+'" font-size="12" font-weight="600" style="fill:var(--fg)">'+title+'</text>';
T2.forEach((l,k)=>{const y=pt+19+17*(k+1);sx+='<circle cx="'+(bx+11).toFixed(1)+'" cy="'+(y-4)+'" r="3.5" style="fill:'+l[2]+'" opacity="'+l[3]+'"/><text x="'+(bx+20).toFixed(1)+'" y="'+y+'" font-size="12" style="fill:var(--fg)">'+l[0]+'  <tspan font-weight="700">'+esc(l[1])+'</tspan></text>'});
sx+='<circle cx="'+px.toFixed(1)+'" cy="'+ys(tot[i]).toFixed(1)+'" r="4.5" style="fill:var(--ac);stroke:var(--card)" stroke-width="2"/><circle cx="'+px.toFixed(1)+'" cy="'+ys(cn[i]).toFixed(1)+'" r="3.5" style="fill:var(--mu);stroke:var(--card)" stroke-width="1.5"/>';
tg.innerHTML=sx;tg.setAttribute("visibility","visible");
};
sv.addEventListener("pointermove",hv);sv.addEventListener("pointerdown",hv);
sv.addEventListener("pointerleave",()=>{cl.setAttribute("visibility","hidden");tg.setAttribute("visibility","hidden")});
fit();
}
function analysis(){positions();return allocation()+contribCard()}
function dividends(){
if(!DV.length&&!AO.length)return '<div class="card"><h2>Dividends</h2><p class="mu">No dividend rows found. Load your Degiro account statement (and your Saxo file) and press Calculate.</p></div>';
const last=days[days.length-1],cd=new Date(last+"T00:00:00Z");cd.setUTCFullYear(cd.getUTCFullYear()-1);
const cut=cd.toISOString().slice(0,10),yr={},ins={};
DV.forEach(e=>{
const y=e.d.slice(0,4);yr[y]=yr[y]||{g:0,t:0};yr[y].g+=e.g;yr[y].t+=e.t;
const o=ins[e.k]=ins[e.k]||{n:e.n,g:0,t:0,c:0,last:"",dps:null,l12:0};
o.g+=e.g;o.t+=e.t;
if(e.g>0){o.c++;if(e.d>=o.last){o.last=e.d;o.dps=e.sh>0?e.g/e.sh:null}}
if(e.d>cut)o.l12+=e.g;
});
const pos={};POSL.forEach(r=>{pos[r.k]=r});
const G0=DV.reduce((a,e)=>a+e.g,0),T0=DV.reduce((a,e)=>a+e.t,0),L12=DV.filter(e=>e.d>cut).reduce((a,e)=>a+e.g+e.t,0);
const nb={};DV.forEach(e=>{if(e.g>0){(nb[e.b]=nb[e.b]||{n:0,g:0}).n++;nb[e.b].g+=e.g}});
const brokerLine=Object.keys(nb).map(b=>b+": "+nb[b].n+" payments, "+eur(nb[b].g)+" gross").join(" · ")||"no dividends found";
const hl=POSL.filter(r=>r.q>0&&!r.o),hv=hl.reduce((a,r)=>a+r.val,0),hc=hl.reduce((a,r)=>a+r.avg*r.q,0),h12=hl.reduce((a,r)=>a+((ins[r.k]||{}).l12||0),0);
const yt=(l,v,sb)=>'<div class="kpi"><div class="kl">'+l+'</div><div class="kv">'+v+'</div><div class="ks">'+sb+'</div></div>';
const tiles='<div class="kpis" style="--kc:4">'+yt("Dividend yield (12M)",hv>0?(h12/hv*100).toFixed(2)+"%":"\u2013","Gross, on current value of holdings")+yt("Yield on cost",hc>0?(h12/hc*100).toFixed(2)+"%":"\u2013","Gross, on what you paid")+yt("Net received (12M)",eur(L12),"Last 12 months")+yt("Net received (total)",eur(G0+T0),"Gross "+eur(G0)+" \u00b7 tax "+eur(T0))+"</div>";
let h='<div class="card"><h2>Dividends</h2>'+tiles;
const topH=h;h="";
const list=Object.keys(ins).map(k=>({k:k,o:ins[k]})).sort((a,b)=>(b.o.g+b.o.t)-(a.o.g+a.o.t));
h+='<div class="sc"><table><tr><th>Instrument</th><th>Payments</th><th>Gross</th><th>Tax</th><th>Net</th><th>Last per share</th><th>Yield (12M)</th><th>Yield on cost</th></tr>';
["ETF","Stock"].forEach(ty=>{
const lg=list.filter(x=>(typOf(x.k)==="Derivative"?"Stock":typOf(x.k))===ty).sort((m,n)=>byName(m.o.n,n.o.n));
if(lg.length)h+='<tr><td colspan="8" class="grp">'+TYPN[ty]+'</td></tr>';
lg.forEach(x=>{
const o=x.o,p=pos[x.k],held=p&&p.q>0,cost=held?p.avg*p.q:0;
h+='<tr><td>'+esc(o.n)+'</td><td>'+o.c+'</td><td>'+eur(o.g)+'</td><td>'+eur(o.t)+'</td><td>'+eur(o.g+o.t)+'</td><td>'+(o.dps==null?"–":"€"+f2(o.dps))+'</td><td>'+(held&&p.val>0?(o.l12/p.val*100).toFixed(1)+"%":"–")+'</td><td>'+(held&&cost>0?(o.l12/cost*100).toFixed(1)+"%":"–")+'</td></tr>';
});
});
h+='</table></div><p class="mu">Yields use gross dividends of the last 12 months against the current value or the cost of what you still hold. Per-share amounts are in euro and use the shares you held on the payment date.</p>';
const instH=h,yrs=[...new Set(DV.map(e=>e.d.slice(0,4)))].sort().reverse();
if(!(DVS==="all"||DVS==="fc"||yrs.includes(DVS)))DVS=yrs[0]||"all";
const ctl='<div class="dvc">'+(DVT==="chart"?'<div><span class="seg">'+yrs.slice().reverse().map(y=>'<button data-dvp="'+y+'"'+(DVS===y?' class="on"':"")+'>'+y+'</button>').join("")+'<button data-dvp="all"'+(DVS==="all"?' class="on"':"")+'>All time</button><button data-dvp="fc"'+(DVS==="fc"?' class="on"':"")+'>Forecast</button></span>'+(DVS==="fc"?' <span class="pill p-Dividend">Estimate</span>':"")+'</div>':"<div></div>")+'<div class="seg"><button data-dvt="chart"'+(DVT==="chart"?' class="on"':"")+'>Chart</button><button data-dvt="inst"'+(DVT==="inst"?' class="on"':"")+'>Per instrument</button></div></div>';
h=topH+ctl+(DVT==="inst"?instH:divChart())+'<p class="mu">By broker: '+brokerLine+'. Saxo dividends come from the dividend rows in your Saxo file.</p></div>';
if(DBG&&AO.length){
const f=AO.filter(a=>a.k==="fee").reduce((a,e)=>a+e.e,0),it=AO.filter(a=>a.k==="int").reduce((a,e)=>a+e.e,0);
const U=POSL.reduce((a,r)=>a+r.un,0),R=POSL.reduce((a,r)=>a+r.real,0);
h+='<div class="card"><h2>Reconciliation with Degiro</h2><div class="sc"><table><tr><td>Profit on trades (realised and unrealised, trading costs included)</td><td>'+eur(U+R)+'</td></tr><tr><td>Net dividends</td><td>'+eur(G0+T0)+'</td></tr><tr><td>Transaction tax and connection fees</td><td>'+eur(f)+'</td></tr><tr><td>Interest</td><td>'+eur(it)+'</td></tr><tr><td><b>Total result</b></td><td><b>'+eur(U+R+G0+T0+f+it)+'</b></td></tr></table></div><p class="mu">Compare the total with the result Degiro shows. Small differences come from exchange rates and from products without price data.</p></div>';
}
return h;
}
const pct1=v=>v==null?"–":(v>0?"+":"")+(v*100).toFixed(1)+"%";
const eur2=v=>"€"+(Math.abs(v)<10?v.toFixed(2):v.toFixed(0));
function detailView(k){
const back='<button data-back="1">← Back to overview</button>';
const T=tx.filter(t=>t.key===k);
if(!T.length)return '<div class="card">'+back+'<p>No trades found for this instrument in the current view.</p></div>';
const o=!!T[0].opt,x=ser[k],name=x?x.name:T[0].n,L=days.length-1;
let q=0,cost=0,real=0,bought=0;const R=[];
T.forEach(t=>{
const a=o?t.q:t.qa,c=isFinite(t.cs)?t.cs:t.g;let r=null;
if(a>0){q+=a;cost+=c;bought+=c}
else if(q>0){const f=Math.min(1,-a/q);r=c-cost*f;real+=r;cost-=cost*f;q+=a}
else{r=c;real+=c}
if(Math.abs(q)<1e-9){q=0;cost=0}
R.push({t:t,q:q,r:r});
});
if(o&&G.ex[k]!==undefined&&q>0){real-=cost;cost=0;q=0}
const px=o?0:P[k][L],val=o?cost:q*px,un=q>0?val-cost:0;
const D=DV.filter(e=>e.k===k),dn=D.reduce((a,e)=>a+e.g+e.t,0);
const row=rows.find(r=>r.k===k),tot=real+un;
let h='<div class="card">'+back+'<h2 style="margin-top:12px">'+esc(name)+'</h2><p class="mu">'+esc(o?"Derivative or product without price data (carried at cost until sold)":(x&&x.type||"")+" · "+k+" · "+(x&&x.cur||""))+'</p>';
h+='<div class="sc"><table><tr><th>Shares now</th><th>Avg buy</th><th>Price now</th><th>Value</th><th>Unrealised</th><th>Realised (sales)</th><th>Dividends (net)</th><th>Total profit</th></tr><tr><td>'+sh(+q.toFixed(4))+'</td><td>'+(q>0&&!o?"€"+f2(cost/q):"–")+'</td><td>'+(o?"–":"€"+f2(px))+'</td><td>'+eur(val)+'</td>'+pc(un)+pc(real)+pc(dn)+pc(tot+dn)+'</tr></table></div>';
h+='<p>Money bought in total: <b>'+eur(bought)+'</b>. Result on the money invested: <b>'+(bought>0?pct1(tot/bought):"–")+'</b>'+(D.length?' (<b>'+pct1((tot+dn)/bought)+'</b> with dividends)':'')+'. The time-weighted return in the next table follows the price path, so the two figures can differ.</p>';
if(row){
h+='<div class="sc"><table><tr><th></th>'+VTs().map(t=>"<th>"+t+"</th>").join("")+(CU?"<th>Custom</th>":"")+"<th>CAGR (all)</th></tr><tr><td>Time-weighted return</td>"+VTs().map(t=>cell(ret(row,t))).join("")+(CU?cell(ret(row,"C")):"")+cell(cagr(row))+"</tr></table></div>";
}
h+='</div>';
if(!o&&G.DR[k]){
let x0=DTF==="Max"?T[0].di:Math.max(0,iStart(DTF));
if(x0>=L)x0=Math.max(0,L-1);
const v=[];for(let i=x0;i<=L;i++)v.push(P[k][i]/G.DR[k][i]);
const marks=T.filter(t=>t.di>=x0).map(t=>({i:t.di,v:t.g/Math.max(1e-9,Math.abs(t.qa)),c:t.q>0?"#16a34a":"#dc2626"}));
h+='<div class="card"><h2>Price and your trades</h2>'+TFA().map(t=>'<button data-dtf="'+t+'"'+(t===DTF?' class="on"':"")+'>'+t+'</button>').join("")+lineChart([{name:"Price (€)",a:x0,v:v}],x0,L,eur2,false,marks)+'<p class="mu"><b style="color:#16a34a">●</b> buys <b style="color:#dc2626">●</b> sells. Prices are euro-converted closes.</p></div>';
}
h+='<div class="card"><h2>Trades</h2><div class="sc"><table><tr><th>Date</th><th>Broker</th><th>Type</th><th>Shares in file</th><th>Shares today</th><th>Price</th><th>Amount (€)</th><th>Costs (€)</th><th>Position after</th><th>Realised (€)</th></tr>';
R.forEach(z=>{
const t=z.t,buy=t.q>0,fee=isFinite(t.cs)&&isFinite(t.g)?(buy?t.cs-t.g:t.g-t.cs):NaN,qa=o?t.q:t.qa;
h+='<tr><td>'+fd(t.d)+'</td><td>'+t.b+'</td><td>'+(buy?"Buy":"Sell")+(t.fix?" *":"")+(t.free?" †":"")+'</td><td>'+sh(+Math.abs(t.q).toFixed(4))+'</td><td>'+(Math.abs(qa-t.q)>1e-9?sh(+Math.abs(qa).toFixed(4)):"=")+'</td><td>'+(isFinite(t.px)?f2(t.px)+" "+esc(t.cur||""):"–")+'</td><td>'+(isFinite(t.cs)?eur((buy?-1:1)*t.cs):"–")+'</td><td>'+(isFinite(fee)?eur(fee):"–")+'</td><td>'+sh(+z.q.toFixed(4))+'</td>'+(z.r==null?'<td></td>':pc(z.r))+'</tr>';
});
h+='</table></div><p class="mu">* share count re-derived from the trade value (price history did not match). † shares received at (almost) zero price, valued at market price. "Shares today" is on the basis of the current share count, after splits.</p></div>';
if(D.length){
h+='<div class="card"><h2>Dividends</h2><div class="sc"><table><tr><th>Date</th><th>Broker</th><th>Gross</th><th>Tax</th><th>Net</th><th>Per share</th></tr>';
D.forEach(e=>{h+='<tr><td>'+fd(e.d)+'</td><td>'+e.b+'</td><td>'+eur(e.g)+'</td><td>'+eur(e.t)+'</td><td>'+eur(e.g+e.t)+'</td><td>'+(e.sh>0&&e.g>0?"€"+f2(e.g/e.sh):"–")+'</td></tr>'});
h+='</table></div></div>';
}
return h;
}
function toTxD(t){
const r=parseTable(t.replace(/^\uFEFF/,"")).filter(x=>x.length>5);
if(!r.length)throw new Error("No table found in the Degiro text.");
const h=r[0].map(x=>x.trim().toLowerCase()),ix=n=>h.indexOf(n);
const iD=ix("datum"),iTm=ix("tijd"),iP=ix("product"),iI=ix("isin"),iM=ix("uitvoeringsplaats"),iQ=ix("aantal"),iK=ix("koers"),iE=ix("waarde eur"),iW=ix("wisselkoers"),iT=ix("totaal eur");
if(iD<0||iI<0||iQ<0||iK<0)throw new Error("Degiro columns not found. The first line must contain Datum, ISIN, Aantal and Koers.");
const a=[];
for(const x of r.slice(1)){
const d=pd(x[iD]),q=num(x[iQ]);
if(!d||!x[iI]||!isFinite(q)||q===0)continue;
a.push({d:d,tm:iTm>=0?(x[iTm]||"").trim():"",s:"D:"+x[iI].trim(),n:(x[iP]||x[iI]).trim(),q:q,px:num(x[iK]),c:iT>=0?num(x[iT]):NaN,rt:iW>=0?num(x[iW]):NaN,cur:(x[iK+1]||"").trim(),ge:iE>=0?Math.abs(num(x[iE])):NaN,eurc:true,mic:iM>=0?(x[iM]||"").trim():"",b:"Degiro"});
}
return a;
}
const MICSUF={XBRU:".BR",XPAR:".PA",XAMS:".AS",XETR:".DE",XMIL:".MI",XNAS:"",XNYS:"",ARCX:"",XLON:".L",XSWX:".SW",XMAD:".MC",XHEL:".HE",XSTO:".ST",XCSE:".CO",XOSL:".OL",XASX:".AX",XTSE:".TO"};
function pickQuote(qs,mic,isin){
const q=qs.filter(x=>x.symbol&&(x.quoteType==="EQUITY"||x.quoteType==="ETF"));
if(!q.length)return null;
const suf=MICSUF[mic];
let m=suf!==undefined?q.find(x=>suf===""?!x.symbol.includes("."):x.symbol.endsWith(suf)):null;
if(!m&&/^(US|CA)/.test(isin))m=q.find(x=>!x.symbol.includes("."));
if(!m)m=q.find(x=>!x.symbol.endsWith(".L"));
return (m||q[0]).symbol;
}
async function resolveIsins(list){
const todo=list.filter(s=>!ov[s]&&!IS[s]);
for(let i=0;i<todo.length;i+=6){
msg("Looking up symbols "+Math.min(i+6,todo.length)+" of "+todo.length+"...");
await Promise.allSettled(todo.slice(i,i+6).map(async s=>{
const r=await fetch(PROXY+"/?q="+encodeURIComponent(s.slice(2))),j=await r.json();
const t=tx.find(x=>x.s===s),sym=pickQuote(j.quotes||[],t&&t.mic,s.slice(2));
if(sym)IS[s]=sym;
}));
}
ls.set("isin",JSON.stringify(IS));
}
async function fetchAll(keys){
const todo=[...new Set(keys)].filter(k=>!SC[k]);
for(let i=0;i<todo.length;i+=6){
const part=todo.slice(i,i+6);
msg("Loading prices "+Math.min(i+6,todo.length)+" of "+todo.length+"...");
const r=await Promise.allSettled(part.map(getSeries));
part.forEach((k,j)=>{if(r[j].status==="fulfilled")SC[k]=r[j].value});
}
}
const NICE=[1,1.5,1.67,2,2.5,3,4,5,6,6.67,7,8,9];
function snap(f){
const e0=Math.floor(Math.log10(f));
for(let e=e0;e<=e0+1;e++){const c=Math.pow(10,e);if(Math.abs(Math.log(f/c))<0.2)return c}
let best=f,bd=0.12;
for(let e=e0-1;e<=e0+1;e++)for(const m of NICE){const c=m*Math.pow(10,e),d=Math.abs(Math.log(f/c));if(d<bd){bd=d;best=c}}
return best;
}
async function run(){
IG={};
const text=$("txt").value.trim(),textD=$("txtD").value.trim(),textA=$("txtA").value.trim();
if(!text&&!textD){msg("Paste or load your transactions first.");return}
try{tx=[...(text?toTx(text):[]),...(textD?toTxD(textD):[])];AC=textA?toAcc(textA):[]}catch(e){msg(e.message);return}
tx.sort((p,q)=>p.d<q.d?-1:p.d>q.d?1:(p.tm||"")<(q.tm||"")?-1:(p.tm||"")>(q.tm||"")?1:(p.q>0?0:1)-(q.q>0?0:1));
ls.set("tx",text);ls.set("txd",textD);ls.set("txa",textA);ls.set("bm",$("bm").value);
BV=$("bv").value;ls.set("bv",BV);
if(BV!=="all"){tx=tx.filter(t=>t.b===BV);AC=AC.filter(a=>a.b===BV);SXD=SXD.filter(a=>a.b===BV)}
if(!tx.length){msg("No buy or sell rows found for this view.");return}
SK=[...new Set(tx.filter(t=>ov[t.s]==="-").map(t=>t.s))];
tx=tx.filter(t=>!SK.includes(t.s));
await resolveIsins([...new Set(tx.filter(t=>t.s.startsWith("D:")).map(t=>t.s))]);
UNR.clear();
const unres=[...new Set(tx.filter(t=>t.s.startsWith("D:")&&!ov[t.s]&&!IS[t.s]).map(t=>t.s))],pre=[];
if(unres.length){
unres.forEach(s=>UNR.add(s));
pre.push(unres.length+" Degiro product(s) have no Yahoo price data (turbos, warrants, options or delisted shares). Their results count from your trades only, carried at cost until sold: "+[...new Set(tx.filter(t=>UNR.has(t.s)).map(t=>t.n))].join(", ")+".");
}
if(!tx.length){msg("Nothing left to calculate.");return}
const syms=[...new Set(tx.map(t=>t.s))],eq=syms.filter(s=>!isOpt(s)),keys=syms.map(kof);
let bms=$("bm").value.split(",").map(x=>x.trim()).filter(Boolean);
const warn=[...pre];
msg("Loading prices...");rows=[];ser={};
let need=[...new Set([...eq.map(map),...bms])];
const bad=[];
await fetchAll(need);
need.forEach(k=>{if(SC[k])ser[k]=SC[k];else bad.push(k)});
{const eqk=eq.map(map),badB=bad.filter(k=>bms.includes(k)&&!eqk.includes(k));if(badB.length&&badB.length===bad.length){warn.push("Benchmark not found at Yahoo and left out: "+badB.join(", ")+".");bms=bms.filter(b=>!badB.includes(b));need=need.filter(k=>!badB.includes(k));bad.length=0}}
if(bad.length){msg("Could not load: "+bad.join(", "));G={syms,keys,bms,warn};render(syms,bad,[]);return}
const cur=[...new Set([...need.map(k=>ser[k].cur),...tx.map(t=>t.cur),...AC.map(a=>a.cur)].map(c=>c==="GBp"||c==="GBX"?"GBP":c).filter(c=>c&&c!=="EUR"))];
await fetchAll(cur.map(c=>"EUR"+c+"=X"));
FX={};cur.forEach(c=>{const fx=SC["EUR"+c+"=X"];if(fx)FX[c]=fx;else warn.push("No exchange rate for "+c+"; those holdings are not converted to euro.")});
const first=tx[0].d,set=new Set();
need.forEach(k=>ser[k].d.forEach(d=>{if(d>=first)set.add(d)}));
days=[...set].sort();
if(days.length<2){msg("Not enough price data after your first transaction.");return}
const F={},DR={};P={};
cur.forEach(c=>{if(FX[c])F[c]=align(FX[c])});
need.forEach(k=>{
const x=ser[k],a=align(x),cl=align(x,x.cv),pen=x.cur==="GBp"||x.cur==="GBX",c=pen?"GBP":x.cur;
DR[k]=a.map((v,i)=>cl[i]>0?v/cl[i]:1);
P[k]=(c&&c!=="EUR"&&F[c])?a.map((v,i)=>v*(pen?0.01:1)/F[c][i]):a;
});
const fxE=(c,di)=>F[c]?1/F[c][di]:NaN;
tx.forEach(t=>{
t.key=kof(t.s);t.opt=isOpt(t.s);
let di=days.findIndex(d=>d>=t.d);if(di<0)di=days.length-1;t.di=di;
const m=t.opt?100:1,gi=Math.abs(t.q)*t.px*m,ci=Math.abs(t.c);
let r=1,cs=ci;
if(t.cur&&t.cur!=="EUR"){
const e=fxE(t.cur,di);
if(t.rt>0){const a=t.rt,b=1/t.rt;r=isFinite(e)?(Math.abs(a-e)<=Math.abs(b-e)?a:b):a}else r=isFinite(e)?e:1;
if(!t.eurc&&isFinite(ci)&&Math.abs(ci-gi)<=Math.abs(ci-gi*r))cs=ci*r;
}
const g=isFinite(t.ge)?t.ge:gi*r,dr=t.opt?1:DR[t.key][di];
t.g=g;t.cs=cs;t.fg=g*dr;t.fc=(isFinite(cs)?cs:g)*dr;
t.qa=t.opt?t.q:t.q*(ser[t.key].sp||[]).reduce((a,e)=>e.d>t.d?a*e.f:a,1);
if(!t.opt){
const pr=P[t.key][di],ref=isFinite(t.fc)?t.fc:t.fg,m0=Math.abs(t.qa)*pr;
if(t.px>0&&ref>0&&pr>0&&(m0/ref>8||m0/ref<0.125)){t.f0=(t.fg/pr)/Math.abs(t.q);t.qa=(t.q>0?1:-1)*Math.abs(t.q)*snap(t.f0);t.fix=1}
}
if(!t.opt&&t.q>0){const mv=t.qa*P[t.key][di];if(mv>0&&t.fc<0.3*mv){t.fg=mv;t.fc=mv;t.g=mv/dr;t.cs=mv/dr;t.free=1}}
});
const g2={};
tx.forEach(t=>{if(t.fix)(g2[t.key]=g2[t.key]||[]).push(t)});
for(const k in g2){
const L2=g2[k],fs=L2.map(t=>t.f0).sort((a,b)=>a-b);
if(fs[fs.length-1]/fs[0]<1.7){const c=snap(fs[Math.floor(fs.length/2)]);L2.forEach(t=>{t.qa=(t.q>0?1:-1)*Math.abs(t.q)*c})}
}
const fxd=tx.filter(t=>t.fix);
if(fxd.length)warn.push("Share counts were re-derived from the trade value (the share data and price history did not match, for example after a reverse split) for: "+[...new Set(fxd.map(t=>t.n))].join(", ")+".");
const fr=tx.filter(t=>t.free);
if(fr.length)warn.push(fr.length+" buy(s) at (almost) zero price, such as spin-offs or transfers, were valued at that day's market price: "+[...new Set(fr.map(t=>t.n))].join(", ")+".");
const ex={},last=days[days.length-1];
syms.filter(isOpt).forEach(s=>{const e=optExp(s);if(e&&e<=last){const i=days.findIndex(d=>d>=e);if(i>=0)ex[s]=i}});
const q={};tx.forEach(x=>{q[x.s]=(q[x.s]||0)+x.q});
const neg=Object.keys(q).filter(s=>!isOpt(s)&&q[s]<-1e-9);
if(neg.length)warn.push("Sells exceed purchases for: "+neg.join(", ")+". Your export may be missing earlier buys or transfers.");
if($("txtA").value.trim()&&!AC.length)warn.push("The account statement was read, but no dividend or cost rows were found for this view. Check that the View menu is not set to Saxo only.");
try{buildDiv()}catch(e){warn.push("Dividends could not be read: "+e.message)}
G={syms,keys,bms,ex,warn,DR};
calc();
}
function calc(){
const syms=G.syms,keys=G.keys,bms=G.bms,nm={};
tx.forEach(t=>{nm[t.s]=t.n});rows=[];
const all=twrr(new Set(keys),MODE);
rows.push({name:"Total portfolio",idx:all.idx,st:all.st,chart:true,held:all.held,ks:new Set(keys)});
const grp=f=>new Set(keys.filter(f));
const gs=[["ETFs",grp(k=>typOf(k)==="ETF")],["Stocks",grp(k=>typOf(k)==="Stock")],["Derivatives",grp(k=>typOf(k)==="Derivative")]].filter(g=>g[1].size);
if(gs.length>1)gs.forEach(g=>{if(g[0]==="Derivatives")return;const r=twrr(g[1],MODE);rows.push({name:g[0],idx:r.idx,st:r.st,chart:g[0]!=="Derivatives",held:r.held,ks:g[1]})});
bms.forEach(b=>rows.push({name:b,idx:P[b],st:0,chart:true,kind:"b"}));
const seen=new Set();
syms.forEach(s=>{const k=kof(s);if(seen.has(k))return;seen.add(k);const r=twrr(new Set([k]),MODE);rows.push({name:ser[k]?ser[k].name:nm[s],idx:r.idx,st:r.st,chart:false,k:k,held:r.held,ks:new Set([k]),typ:typOf(k),open:(Math.abs(tx.reduce((a,t)=>a+(t.key===k?(t.opt?t.q:t.qa):0),0))>1e-6&&G.ex[k]===undefined)})});
msg("Done. "+tx.length+" trades, "+fd(days[0])+" to "+fd(days[days.length-1])+"."+($("txtA").value.trim()?" Dividend payments found: "+DV.filter(e=>e.g>0).length+".":""));
render(syms,[],G.warn);
try{$("setup").open=false}catch(e){}
}
$("out").addEventListener("change",e=>{if(e.target.id==="dvs"){DVS=e.target.value;render(G.syms,[],G.warn)}if(e.target.id==="bmsel"){let v=e.target.value;if(v==="__other"){v=(prompt("Yahoo Finance symbol of an index or ETF, for example ^GDAXI or EXSA.DE")||"").trim();if(!v){render(G.syms,[],G.warn);return}}BMA=v;ls.set("bma",v);if(!bmList().includes(v)){$("bm").value=bmList().concat(v).join(", ");bmChips();run().catch(x=>msg("Error: "+x.message))}else render(G.syms,[],G.warn)}if(e.target.id==="mode"){MODE=+e.target.value;calc()}if(e.target.id==="d0"||e.target.id==="d1"){if($("d0").value)CF=$("d0").value;if($("d1").value)CT=$("d1").value;render(G.syms,[],G.warn)}});
$("run").onclick=()=>run().catch(e=>msg("Error: "+e.message));
$("clr").onclick=()=>{ls.del("tx");ls.del("txd");ls.del("txa");ls.del("ov");ls.del("isin");ls.del("bm");ov={};IS={};SC={};$("txt").value="";$("txtD").value="";$("txtA").value="";$("out").innerHTML="";msg("Saved data cleared.")};
$("fileD").onchange=e=>{
const f=e.target.files[0];if(!f)return;
const r=new FileReader();r.onload=()=>{$("txtD").value=r.result;run().catch(x=>msg("Error: "+x.message))};r.readAsText(f);
};
$("fileA").onchange=e=>{const f=e.target.files[0];if(f)fileToText(f,t=>{$("txtA").value=t;run().catch(x=>msg("Error: "+x.message))})};
$("bv").onchange=()=>run().catch(x=>msg("Error: "+x.message));
$("file").onchange=e=>{
const f=e.target.files[0];if(!f)return;
const r=new FileReader();
if(/\.xls[xm]?$/i.test(f.name)){
if(typeof XLSX==="undefined"){msg("Excel reader failed to load. Refresh the page, or paste the rows instead.");return}
r.onload=()=>{
try{
const wb=XLSX.read(r.result,{type:"array"});
const a=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,raw:false,defval:""});
$("txt").value=a.map(row=>row.map(c=>String(c).replace(/[\t\r\n]+/g," ")).join("\t")).join("\n");
run().catch(x=>msg("Error: "+x.message));
}catch(x){msg("Could not read the Excel file: "+x.message)}
};
r.readAsArrayBuffer(f);
}else{
r.onload=()=>{$("txt").value=r.result;run().catch(x=>msg("Error: "+x.message))};
r.readAsText(f);
}
};
$("out").addEventListener("click",e=>{
const t=e.target.getAttribute&&e.target.getAttribute("data-tf"),m=e.target.getAttribute&&e.target.getAttribute("data-vm");
const tbe=e.target.closest&&e.target.closest("[data-tab]"),tb=tbe&&tbe.getAttribute("data-tab");
const dt=e.target.getAttribute&&e.target.getAttribute("data-det"),bk=e.target.getAttribute&&e.target.getAttribute("data-back");
if(tb){TAB=tb;DET=null;render(G.syms,[],G.warn)}
if(dt){e.preventDefault();DET=dt;render(G.syms,[],G.warn);window.scrollTo(0,0)}
if(bk){DET=null;render(G.syms,[],G.warn)}
const av=e.target.getAttribute&&e.target.getAttribute("data-alv"),cz=e.target.getAttribute&&e.target.getAttribute("data-ctf");
if(av){ALV=av;render(G.syms,[],G.warn)}
if(cz){CTF=cz;render(G.syms,[],G.warn)}
const pz=e.target.getAttribute&&e.target.getAttribute("data-ptf");
if(pz){PTF=pz;render(G.syms,[],G.warn)}
const dz=e.target.getAttribute&&e.target.getAttribute("data-dtf");
if(dz){DTF=dz;render(G.syms,[],G.warn)}
if(t){TF=t;render(G.syms,[],G.warn)}
if(m){VM=m;render(G.syms,[],G.warn)}
});
$("out").addEventListener("change",e=>{if(e.target.id==="cu"){CU=e.target.checked;render(G.syms,[],G.warn)}});
$("dbg").onchange=()=>{DBG=$("dbg").checked;if(rows.length)render(G.syms,[],G.warn)};
$("out").addEventListener("click",e=>{const th=e.target.closest&&e.target.closest("th.srt");if(th)sortClick(th)});
let DVH=null;
const hov=e=>{
let sl=e.target.closest&&e.target.closest(".sl");const p1=$("pt1"),psv=e.target.closest&&e.target.closest("svg[data-pie]");
if(!sl&&psv){
const rc=psv.getBoundingClientRect(),k=200/Math.min(rc.width,rc.height),dx=((e.clientX-rc.left)-rc.width/2)*k,dy=((e.clientY-rc.top)-rc.height/2)*k,rr=Math.hypot(dx,dy);
if(rr>=18&&rr<=102){const t=(Math.atan2(dy,dx)+Math.PI/2+2*Math.PI)%(2*Math.PI);sl=[...psv.querySelectorAll(".sl")].find(z=>t>=+z.getAttribute("data-t0")&&t<+z.getAttribute("data-t1"))||null}
}
if(p1&&PIED){
const t2=$("pt2"),t3=$("pt3");
document.querySelectorAll(".sl").forEach(z=>{if(z!==sl){z.style.transform="";z.style.filter="";z.style.opacity=sl?".5":""}});
if(sl){
const c=sl.getAttribute("data-c");
sl.style.transform="translate("+sl.getAttribute("data-dx")+"px,"+sl.getAttribute("data-dy")+"px) scale(1.05)";
sl.style.filter="drop-shadow(0 3px 9px "+c+"aa)";sl.style.opacity="1";
if(sl.nextElementSibling&&sl.nextElementSibling.classList.contains("sl"))sl.parentNode.insertBefore(sl,p1);
p1.textContent=sl.getAttribute("data-n");t2.textContent=sl.getAttribute("data-v");t3.textContent=sl.getAttribute("data-p");
p1.style.fill=t2.style.fill=t3.style.fill=c;
}else{
p1.textContent=PIED.t1;t2.textContent=PIED.t2;t3.textContent="";
p1.style.fill="var(--mu)";t2.style.fill="var(--fg)";t3.style.fill="var(--mu)";
}
}
const db=e.target.closest&&e.target.closest(".dvb"),dr=$("dvr");
const dh=db||null;if(dh!==DVH){DVH=dh;document.querySelectorAll(".dvb").forEach(z=>{if(z===dh){z.style.filter="drop-shadow(0 0 7px "+z.getAttribute("data-c")+"aa)";z.style.opacity="1";z.style.transform="scaleX(1.08)"}else{z.style.filter="";z.style.transform="";z.style.opacity=dh?".45":""}})}
const dg=$("dvt");
if(dg){
if(db){
const x0=+db.getAttribute("x"),y0=+db.getAttribute("y"),w0=+db.getAttribute("width"),h0=+db.getAttribute("height"),c=db.getAttribute("data-c"),nme=db.getAttribute("data-n"),vv=db.getAttribute("data-v"),pt0=db.getAttribute("data-t"),ti=db.getAttribute("data-x")||db.getAttribute("data-b")+(db.getAttribute("data-f")==="1"?" \u00b7 estimate":"")+" \u00b7 total "+pt0,nn=nme.length>32?nme.slice(0,31)+"\u2026":nme;
const W=CD.dv.W,H=CD.dv.H,w=Math.min(W-12,Math.max(nn.length*6.5+32,vv.length*9+24,ti.length*5.6+24)),h=58;
let x=x0+w0+10;if(x+w>W-6)x=x0-w-10;if(x<4)x=4;
const y=Math.min(Math.max(4,y0+h0/2-h/2),H-30-h);
dg.innerHTML='<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+w.toFixed(0)+'" height="'+h+'" rx="6" style="fill:var(--card);stroke:'+c+'" stroke-width="1.2"/><circle cx="'+(x+12).toFixed(1)+'" cy="'+(y+15).toFixed(1)+'" r="4" fill="'+c+'"/><text x="'+(x+21).toFixed(1)+'" y="'+(y+19).toFixed(1)+'" font-size="12" font-weight="600" style="fill:var(--fg)">'+esc(nn)+'</text><text x="'+(x+12).toFixed(1)+'" y="'+(y+38).toFixed(1)+'" font-size="15" font-weight="700" style="fill:var(--fg)">'+esc(vv)+'</text><text x="'+(x+12).toFixed(1)+'" y="'+(y+53).toFixed(1)+'" font-size="10.5" style="fill:var(--mu)">'+esc(ti)+'</text>';
dg.setAttribute("visibility","visible");
}else dg.setAttribute("visibility","hidden");
}
const sv=e.target.closest&&e.target.closest("svg.ch");
if(!sv){CH.forEach((c,i)=>{const t=$("tg"+i),l=$("cur"+i);if(t)t.setAttribute("visibility","hidden");if(l)l.setAttribute("visibility","hidden")});return}
const n=sv.getAttribute("data-c"),c=CH[+n];if(!c)return;
const r=sv.getBoundingClientRect(),sc=Math.min(r.width/c.W,r.height/(c.H||336)),x=(e.clientX-r.left-(r.width-c.W*sc)/2)/sc;
const i=Math.max(c.x0,Math.min(c.L,Math.round(c.x0+(x-c.pl)*(c.L-c.x0)/(c.W-c.pl-c.pr))));
const px=c.pl+(i-c.x0)*(c.W-c.pl-c.pr)/(c.L-c.x0),ln=$("cur"+n),tg=$("tg"+n);
ln.setAttribute("x1",px);ln.setAttribute("x2",px);ln.setAttribute("visibility","visible");
const ys=v=>c.H-c.pb-(v-c.mn)*(c.H-c.pt-c.pb)/(c.mx-c.mn);
const L2=c.S.map((s,k)=>({n:s.name.length>30?s.name.slice(0,29)+"…":s.name,t:i>=s.a?c.fmt(s.v[i-s.a]):"–",col:COL[k%COL.length],v:i>=s.a?s.v[i-s.a]:null}));
const title=fd(days[i]),mc=Math.max(title.length,...L2.map(l=>l.n.length+l.t.length+3));
const w=Math.min(c.W-20,mc*6.6+32),h=17*(L2.length+1)+8;
let bx=px+12;if(bx+w>c.W-c.pr)bx=px-w-12;if(bx<c.pl)bx=c.pl;
let g='<rect x="'+bx.toFixed(1)+'" y="'+(c.pt+4)+'" width="'+w.toFixed(0)+'" height="'+h+'" rx="5" style="fill:var(--card);stroke:var(--bd)" stroke-width=".8"/>';
g+='<text x="'+(bx+8).toFixed(1)+'" y="'+(c.pt+4+15)+'" font-size="12" font-weight="600" style="fill:var(--fg)">'+title+'</text>';
L2.forEach((l,k)=>{
const y=c.pt+4+15+17*(k+1);
g+='<circle cx="'+(bx+11).toFixed(1)+'" cy="'+(y-4)+'" r="3.5" fill="'+l.col+'"/><text x="'+(bx+20).toFixed(1)+'" y="'+y+'" font-size="12" style="fill:var(--fg)">'+esc(l.n)+'  <tspan font-weight="700">'+esc(l.t)+'</tspan></text>';
if(l.v!=null)g+='<circle cx="'+px.toFixed(1)+'" cy="'+ys(l.v).toFixed(1)+'" r="5" fill="'+l.col+'" style="stroke:var(--card)" stroke-width="2"/>';
});
tg.innerHTML=g;tg.setAttribute("visibility","visible");
};
$("out").addEventListener("pointermove",hov);$("out").addEventListener("pointerdown",hov);
function showModal(t,h){
let m=$("dm");
if(!m){m=document.createElement("div");m.className="modal";m.id="dm";m.hidden=true;m.innerHTML='<div class="card mcard"><div class="mhead"><h2 id="dmt"></h2><button class="ib" id="dmc" title="Close" aria-label="Close">&#10005;</button></div><div id="dmb"></div></div>';document.body.appendChild(m);m.addEventListener("click",e=>{if(e.target===m||e.target.closest("#dmc"))m.hidden=true});document.addEventListener("keydown",e=>{if(e.key==="Escape")m.hidden=true})}
$("dmt").textContent=t;$("dmb").innerHTML=h;m.hidden=false;
}
function openDiv(b,ki){
const E=dvEvents().filter(e=>(e.g+e.t)!==0&&(DVS==="all"?e.d.slice(0,4):e.d.slice(0,7))===b),M={};
E.forEach(e=>{const key=e.k+"|"+e.d,o=M[key]=M[key]||{d:e.d,k:e.k,n:e.n,b:e.b,g:0,t:0};o.g+=e.g;o.t+=e.t});
const L=Object.values(M).sort((x,y)=>x.d<y.d?-1:x.d>y.d?1:x.n.localeCompare(y.n));
L.forEach(o=>{if(o.g!==0||o.skip)return;const p=L.find(q=>q!==o&&!q.skip&&q.k===o.k&&q.g>0&&Math.abs(new Date(q.d)-new Date(o.d))<=10*864e5);if(p){p.t+=o.t;o.skip=true}});
const R=L.filter(o=>!o.skip),g=R.reduce((a,r)=>a+r.g,0),t=R.reduce((a,r)=>a+r.t,0),od=dvOrder();
let h='<p class="mu">'+R.length+' payment'+(R.length===1?"":"s")+' \u00b7 net <b>'+e2(g+t)+'</b>'+(DVS==="fc"?" \u00b7 estimate based on the last 12 months":"")+'</p><div class="sc"><table><tr><th>Date</th><th>Instrument</th><th>Broker</th><th>Gross</th><th>Tax</th><th>Net</th></tr>';
R.forEach(r=>{const c=dvCol(r.k,od);h+='<tr style="background:color-mix(in srgb,'+c+' 11%,transparent)'+(r.k===ki?";font-weight:700":"")+'"><td style="box-shadow:inset 3px 0 0 '+c+'">'+fd(r.d)+'</td><td style="text-align:left"><b style="color:'+c+'">\u25cf</b> '+esc(r.n)+'</td><td>'+esc(r.b)+'</td><td>'+e2(r.g)+'</td><td>'+e2(r.t)+'</td><td><b>'+e2(r.g+r.t)+'</b></td></tr>'});
h+='<tr><td><b>Total</b></td><td></td><td></td><td><b>'+e2(g)+'</b></td><td><b>'+e2(t)+'</b></td><td><b>'+e2(g+t)+'</b></td></tr></table></div>';
showModal("Dividends \u00b7 "+dvt(b),h);
}
$("out").addEventListener("click",e=>{const r=e.target.closest&&e.target.closest("[data-dk]");if(r)openDiv(r.getAttribute("data-dk"),r.getAttribute("data-ki"))});
$("out").addEventListener("change",e=>{
const s=e.target.getAttribute&&e.target.getAttribute("data-s");
if(s){ov[s]=e.target.value.trim();ls.set("ov",JSON.stringify(ov));run().catch(x=>msg("Error: "+x.message))}
});
$("out").addEventListener("click",e=>{
const a=n=>e.target.getAttribute&&e.target.getAttribute(n);
const vt=a("data-vt"),dvt2=a("data-dvt"),dvp=a("data-dvp"),txv=a("data-txv"),txp=a("data-txp"),dm=a("data-dvm"),tf=a("data-txf"),to=a("data-txo"),pfv=a("data-pf"),wm=a("data-wm"),pbv=a("data-pb"),ptv=a("data-pt");
if(vt){VT=VT.includes(vt)?VT.filter(x=>x!==vt):[...VT,vt];ls.set("vt",JSON.stringify(VT));render(G.syms,[],G.warn)}
if(dm){DVM=dm;render(G.syms,[],G.warn)}
if(dvt2){DVT=dvt2;render(G.syms,[],G.warn)}
if(dvp){DVS=dvp;render(G.syms,[],G.warn)}
if(txv){TXV=txv;render(G.syms,[],G.warn)}
const tg=e.target.closest&&e.target.closest("[data-gv],[data-gd]");if(tg){if(tg.hasAttribute("data-gv"))GV=tg.getAttribute("data-gv");else GD=!GD;render(G.syms,[],G.warn)}
if(txp){TXS=txp;render(G.syms,[],G.warn)}
if(pbv){PB=pbv;ls.set("pb",PB);render(G.syms,[],G.warn)}
if(ptv){PT=ptv;ls.set("pt",PT);render(G.syms,[],G.warn)}
if(pfv){PF=pfv;ls.set("pf",PF);render(G.syms,[],G.warn)}
if(wm){WB.mode=wm;ls.set("wb",JSON.stringify(WB));render(G.syms,[],G.warn)}
if(tf){TXF=tf;render(G.syms,[],G.warn)}
if(to){TXO=-TXO;delete SORTS["Transactions|0"];render(G.syms,[],G.warn)}
});
$("out").addEventListener("input",e=>{
const k=e.target.getAttribute&&e.target.getAttribute("data-w");if(!k)return;
WB[k]=e.target.type==="checkbox"?e.target.checked:(parseFloat(e.target.value)||0);
if(k==="years"&&$("wby"))$("wby").textContent=WB.years;
ls.set("wb",JSON.stringify(WB));wbUpdate();
});
document.documentElement.setAttribute("data-design","nebula");
const EYE='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>',EYE_OFF='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.9 17.9A10.9 10.9 0 0112 19C5 19 1 12 1 12a18.5 18.5 0 015.1-5.9M9.9 5.1A10.4 10.4 0 0112 5c7 0 11 7 11 7a18.6 18.6 0 01-2.2 3.2M14.1 14.1a3 3 0 11-4.2-4.2"/><path d="M1 1l22 22"/></svg>';
function setHide(v){
HIDE=v;ls.set("hide",v?"1":"0");if(v&&VM==="v")VM="p";
if(v)document.documentElement.setAttribute("data-hide","1");else document.documentElement.removeAttribute("data-hide");
$("hid").classList.toggle("on",v);$("hid").innerHTML=v?EYE_OFF:EYE;$("hid").title=v?"Show amounts":"Hide amounts";
if(rows.length)render(G.syms,[],G.warn);
}
$("hid").onclick=()=>setHide(!HIDE);setHide(HIDE);
let WT=ls.get("wt")||"val",WMENU=false;
const WK={"Time-weighted return (TWRR)":"twrr","Comparison":"cmp","Portfolio over time":"val","Positions":"pos","Transactions":"tx","Dividends":"chart","Detail per month":"detail","Detail per year":"detail","Per instrument":"inst","Allocation":"alloc","Contribution to your return":"contrib","Users":"users","Wealth builder":"inputs","Projection":"result"};
const WKD={"Price and your trades":"dchart","Trades":"trades","Dividends":"ddiv"};
function layout(){
const out=$("out");if(!out||!out.firstElementChild)return;
const kids=[...out.children],kp=kids.find(e=>e.classList.contains("kpis")),tabs=kids.find(e=>e.classList.contains("tabs")),pfc=kids.find(e=>e.classList.contains("tfc")&&e.querySelector("[data-pf]"));
const side=document.createElement("aside");side.id="side";
{const sb=document.createElement("button");sb.type="button";sb.className="sbt";sb.id="sbt";const c=document.documentElement.getAttribute("data-sb")==="c";sb.title=c?"Expand sidebar":"Collapse sidebar";sb.setAttribute("aria-label",sb.title);sb.innerHTML='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>';side.appendChild(sb)}
if(tabs){tabs.querySelectorAll("button").forEach(b=>b.setAttribute("data-i",{r:"\u2197",t:"\u21c4",d:"%",a:"\u25d1",w:"\u221e"}[b.getAttribute("data-tab")]||""));side.appendChild(tabs)}
if(pfc)side.appendChild(pfc);
const view=document.createElement("div");view.id="view";view.className="v-"+(DET?"det":TAB);
const warn=[];
kids.forEach(e=>{if(e===kp||e===tabs||e===pfc)return;if(e.classList.contains("card"))view.appendChild(e);else if(e.textContent.trim())warn.push(e.innerHTML)});
const foot=document.createElement("div");foot.className="sfoot";
foot.innerHTML=(warn.length?'<details class="note"><summary>Notes ('+warn.length+')</summary>'+warn.join("<br>")+'</details>':"")+"Data stays in this browser &middot; v5.6";
side.appendChild(foot);
while(out.firstChild)out.removeChild(out.firstChild);
out.appendChild(side);if(kp)out.appendChild(kp);out.appendChild(view);
const cards=[...view.querySelectorAll(":scope>.card")];
cards.forEach((c,i)=>{const h=c.querySelector("h2"),t=h?h.textContent.trim():"",key=DET?(i===0?"head":WKD[t]):WK[t];c.setAttribute("data-w",key||"x");if(key)c.style.gridArea=key});
if(TAB==="r"&&!DET){
const cv=view.querySelector('[data-w=val]'),cc=view.querySelector('[data-w=cmp]'),ps=[[cv,"val","Portfolio over time"],[cc,"cmp","Comparison"]].filter(p=>p[0]);
if(ps.length){
if(!ps.some(p=>p[1]===WT))WT=ps[0][1];
const w=document.createElement("div");w.className="card";w.setAttribute("data-w","charts");w.style.gridArea="charts";
const tb=document.createElement("div");tb.className="wtabs";
tb.innerHTML=ps.map(p=>'<button data-wt="'+p[1]+'"'+(p[1]===WT?' class="on"':"")+'>'+p[2]+'</button>').join("");w.appendChild(tb);
ps.forEach(p=>{const pane=document.createElement("div");pane.className="wpane"+(p[1]===WT?" on":"");pane.setAttribute("data-p",p[1]);const c=p[0],h=c.querySelector("h2");if(h)h.remove();while(c.firstChild)pane.appendChild(c.firstChild);w.appendChild(pane);c.remove()});
view.appendChild(w);
}
}
function noteify(c,min){
const ks=[...c.children],isC=k=>k.classList.contains("sc")||(k.matches&&k.matches("svg.ch,svg.dv"))||(k.querySelector&&k.querySelector("svg.ch,svg.dv,svg[data-pie]")),mi=ks.findIndex(isC);
const ns=ks.filter((k,i)=>k.tagName==="P"&&k.classList.contains("mu")&&k.textContent.length>min&&(mi<0||i>mi));
if(ns.length){const d=document.createElement("details");d.className="note";d.innerHTML="<summary>Notes</summary>";ns.forEach(n=>d.appendChild(n));c.appendChild(d)}
}
view.querySelectorAll(".wpane").forEach(p=>noteify(p,1));
const tw=view.querySelector("[data-w=twrr]");
if(tw){const h=tw.querySelector("h2"),ks=[...tw.children],si=ks.findIndex(k=>k.classList.contains("sc")),ctl=ks.slice(ks.indexOf(h)+1,si);
if(h&&ctl.length&&si>0){const hd=document.createElement("div");hd.className="whead";const d=document.createElement("details");d.className="wmenu";d.innerHTML="<summary>Options</summary>";const pp=document.createElement("div");pp.className="wpop";ctl.forEach(x=>pp.appendChild(x));d.appendChild(pp);if(WMENU)d.open=true;tw.insertBefore(hd,h);hd.appendChild(h);hd.appendChild(d)}}
view.querySelectorAll(":scope>.card").forEach(c=>{
if(!c.querySelector(".wpane"))noteify(c,90);
const b=document.createElement("div");b.className="wbody";while(c.firstChild)b.appendChild(c.firstChild);c.appendChild(b);
});
}
function fit(){
const v=$("view");if(!v)return;
const small=window.innerWidth<=900;
v.querySelectorAll(":scope>.card").forEach(c=>{
const b=c.firstElementChild;if(!b||!b.classList.contains("wbody"))return;
const fl=[...b.querySelectorAll("svg:not(.ic),.sc")];
if(small){fl.forEach(e=>{e.style.height="";e.style.maxHeight=""});return}
fl.forEach(e=>{if(e.tagName==="svg")e.style.height="0px";else e.style.maxHeight="0px"});
const cs=getComputedStyle(c),free=c.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)-b.offsetHeight,h=Math.max(50,Math.floor(free));
fl.forEach(e=>{if(e.tagName==="svg")e.style.height=h+"px";else e.style.maxHeight=h+"px"});
});
reflow(small);
}
function reflow(small){
const sw=(svg,k,fn)=>{
const r=svg.getBoundingClientRect();if(r.width<50)return;
const W=Math.round(r.width),H=small?Math.max(200,Math.round(W*.55)):Math.round(r.height);
if(H<80||(Math.abs(W-CD[k].W)<3&&Math.abs(H-CD[k].H)<3))return;
CD[k]={W:W,H:H};fn();
};
document.querySelectorAll("svg.ch[data-c]").forEach(svg=>{
const id=+svg.getAttribute("data-c"),c=CH[id];if(!c)return;
sw(svg,"ch",()=>{
const t=document.createElement("div");t.innerHTML=lineChart(c.S,c.x0,c.L,c.fmt,c.zero,c.marks,id);
const n=t.querySelector("svg");if(n){n.style.height=svg.style.height;svg.replaceWith(n)}
});
});
document.querySelectorAll("svg.dv").forEach(svg=>{
sw(svg,"dv",()=>{
const t=document.createElement("div");t.innerHTML=TAB==="t"?(TXV==="gain"?txGain():txChart()):divChart();
const n=t.querySelector("svg.dv");if(n){n.style.height=svg.style.height;svg.replaceWith(n)}
});
});
}
let fitT=0;window.addEventListener("resize",()=>{clearTimeout(fitT);fitT=setTimeout(fit,60)});
document.addEventListener("toggle",e=>{if(e.target.classList&&e.target.classList.contains("wmenu"))WMENU=e.target.open;fit()},true);
$("out").addEventListener("click",e=>{
const wt=e.target.getAttribute&&e.target.getAttribute("data-wt");
if(wt){WT=wt;ls.set("wt",wt);document.querySelectorAll("[data-wt]").forEach(b=>b.classList.toggle("on",b.getAttribute("data-wt")===wt));document.querySelectorAll(".wpane").forEach(p=>p.classList.toggle("on",p.getAttribute("data-p")===wt));fit()}
});
$("aprb").onclick=()=>{$("apr").hidden=!$("apr").hidden};
document.addEventListener("click",e=>{if(!e.target.closest(".pw"))$("apr").hidden=true});
const bmList=()=>$("bm").value.split(",").map(x=>x.trim()).filter(Boolean);
function ixCur(){const b=actB();return b?b.name:(BMA||bmList()[0]||"IWDA.AS")}
function ixSync(b){const n=b?b.name:ixCur(),l=$("ixl");if(l)l.textContent=bmLab(n);const p=$("ixp");if(p&&!p.hidden)ixList()}
function ixList(){const cur=ixCur(),ex=[...new Set(rows.filter(r=>r.kind==="b").map(r=>r.name).concat(bmList()))].filter(n=>!BMP.some(p=>p[0]===n));
$("ixp").innerHTML='<div class="ps">Compare with</div>'+BMP.map(p=>[p[0],p[1]]).concat(ex.map(n=>[n,bmLab(n)])).map(p=>'<button type="button" class="ixo'+(p[0]===cur?' on':'')+'" data-ix="'+esc(p[0])+'"><span>'+esc(p[1])+'</span><i>'+(p[0][0]==="^"?"price index":"incl. dividends")+'</i></button>').join("")+'<button type="button" class="ixo" data-ix="__other"><span>Other symbol\u2026</span></button>'}
function ixPick(v){if(v==="__other"){v=(prompt("Yahoo Finance symbol of an index or ETF, for example ^GDAXI or EXSA.DE")||"").trim();if(!v)return}
BMA=v;ls.set("bma",v);$("ixp").hidden=true;const only=bmList().length===1&&bmList()[0]===v;$("bm").value=v;if(only)render(G.syms,[],G.warn);else run().catch(x=>msg("Error: "+x.message))}
$("ixb").onclick=()=>{const p=$("ixp");$("apr").hidden=true;p.hidden=!p.hidden;if(!p.hidden)ixList()};
$("ixp").addEventListener("click",e=>{const o=e.target.closest&&e.target.closest("[data-ix]");if(o)ixPick(o.getAttribute("data-ix"))});
document.addEventListener("click",e=>{if(!e.target.closest("#ixw"))$("ixp").hidden=true});
$("aprb").addEventListener("click",()=>{$("ixp").hidden=true});
ixSync(null);
$("upl").onclick=()=>{$("setup").hidden=false};
{const tp=document.createElement("div");tp.id="tip";tp.hidden=true;document.body.appendChild(tp);
const show=e=>{const i=e.target.closest&&e.target.closest(".inf");if(!i)return;tp.textContent=i.getAttribute("data-tip");tp.hidden=false;const r=i.getBoundingClientRect(),w=tp.offsetWidth,h=tp.offsetHeight;tp.style.left=Math.min(Math.max(8,r.left+r.width/2-w/2),window.innerWidth-w-8)+"px";let y=r.top-h-8;if(y<8)y=r.bottom+8;tp.style.top=y+"px"};
const hide=e=>{if(e.target.closest&&e.target.closest(".inf")&&(e.type!=="pointerout"||e.pointerType==="mouse"))tp.hidden=true};
document.addEventListener("pointerover",show);document.addEventListener("pointerout",hide);document.addEventListener("focusin",show);document.addEventListener("focusout",hide)}
$("out").addEventListener("click",e=>{const r=e.target.closest&&e.target.closest("[data-tk]");if(r)openTx(r.getAttribute("data-tk"),r.getAttribute("data-ts"))});
$("out").addEventListener("pointerleave",()=>{const d=$("dvt");if(d)d.setAttribute("visibility","hidden")});
$("mclose").onclick=()=>{$("setup").hidden=true};
$("setup").addEventListener("click",e=>{if(e.target===$("setup"))$("setup").hidden=true});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("setup").hidden=true;$("apr").hidden=true;$("ixp").hidden=true}});
$("run").addEventListener("click",()=>{$("setup").hidden=true});
$("out").addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("[data-ua],[data-ud]");if(!t)return;
if(t.hasAttribute("data-ua")){const em=$("uem").value.trim().toLowerCase(),nm=$("unm").value.trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){msg("Enter a valid email address.");return}if(USR.some(u=>u.email===em)){msg("That email is already in the list.");return}USR.push({id:Date.now().toString(36),email:em,name:nm,plan:$("upl2").value,status:"Active",joined:new Date().toISOString().slice(0,10)})}
else USR=USR.filter(u=>u.id!==t.getAttribute("data-ud"));
saveUsers();render(G.syms,[],G.warn)});
$("out").addEventListener("change",e=>{const el=e.target,id=el.getAttribute&&el.getAttribute("data-uid");if(!id)return;const u=USR.find(x=>x.id===id);if(!u)return;if(el.getAttribute("data-uf")==="plan")u.plan=el.value;else u.status=el.value;saveUsers();render(G.syms,[],G.warn)});
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#sbt");if(!b)return;const R=document.documentElement,c=R.getAttribute("data-sb")==="c";if(c)R.removeAttribute("data-sb");else R.setAttribute("data-sb","c");ls.set("sb",c?"":"c");b.title=c?"Collapse sidebar":"Expand sidebar";b.setAttribute("aria-label",b.title);setTimeout(fit,0)});
if(ls.get("sb")==="c")document.documentElement.setAttribute("data-sb","c");
document.documentElement.setAttribute("data-kpi","a");
if(!(ls.get("tx")||ls.get("txd")))$("setup").hidden=false;
$("themes").addEventListener("click",e=>{const m=e.target.getAttribute&&e.target.getAttribute("data-mode");if(m)setLook(m)});
setLook(ls.get("mode")||"dark");
if(ls.get("tx")||ls.get("txd")){$("txtA").value=ls.get("txa")||"";$("txt").value=ls.get("tx")||"";$("txtD").value=ls.get("txd")||"";if(ls.get("bv"))$("bv").value=ls.get("bv");if(ls.get("bm")){const L=ls.get("bm").split(",").map(x=>x.trim()).filter(Boolean);$("bm").value=(L.includes(BMA)?BMA:L[0])||"IWDA.AS"}ixSync(null);run().catch(e=>msg("Error: "+e.message))}
