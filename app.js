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
const BMN={"IWDA.AS":"World (MSCI World)","VWCE.DE":"All-World (FTSE)","CSPX.AS":"S&P 500","^STOXX50E":"Euro Stoxx 50","^NDX":"Nasdaq 100"};
const bmLab=n=>BMN[n]||n;
const BMP=[["IWDA.AS","World"],["VWCE.DE","All-World"],["CSPX.AS","S&P 500"],["^STOXX50E","Euro Stoxx 50"],["^NDX","Nasdaq 100"]];
const ekc=v=>HIDE?"":v>=1e6?"\u20ac"+(+(v/1e6).toFixed(2))+"M":v>=1e3?"\u20ac"+Math.round(v/1e3)+"k":"\u20ac"+Math.round(v);
const actB=()=>{const L=rows.filter(r=>r.kind==="b");return L.find(r=>r.name===BMA)||L[0]};
let VT=["1D","1M","YTD","1Y","Max"],DVM="m",DVS="",DVT="chart",BMA=ls.get("bma")||"",TXV="table",TXS="",TXF="all",TXO=-1;try{const v=JSON.parse(ls.get("vt")||"null");if(v&&v.length)VT=v}catch(e){}
if(BMA==="VUAA.AS"){BMA="CSPX.AS";ls.set("bma",BMA)}{const b0=ls.get("bm");if(b0&&b0.indexOf("VUAA.AS")>=0)ls.set("bm",b0.split("VUAA.AS").join("CSPX.AS"))}
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
const pfChips=()=>TAB!=="r"&&TAB!=="p"?"":'<div class="tfc"><span class="mu">Show: </span>'+[["all","All positions"],["open","Open positions"],["closed","Closed positions"]].map(z=>'<button data-pf="'+z[0]+'"'+(PF===z[0]?' class="on"':"")+'>'+z[1]+'</button>').join("")+'<span class="mu" style="flex-basis:100%">Type: </span>'+[["all","All types"],["ETF","ETFs"],["Stock","Stocks"],["Derivative","Derivatives"]].map(z=>'<button data-pt="'+z[0]+'"'+(PT===z[0]?' class="on"':"")+'>'+z[1]+'</button>').join("")+'</div>';
function subRow(){
const ks=new Set(G.keys.filter(k=>pf(k)));if(!ks.size)return null;
const r=twrr(ks,MODE);return {name:(PT==="all"?"Total portfolio":"Total "+TYPS[PT])+(PF==="all"?"":" ("+(PF==="open"?"open":"closed")+" positions)"),idx:r.idx,st:r.st,held:r.held};
}
const e2=v=>HIDE?"\u20ac\u2022\u2022\u2022":(v<0?"-":"")+"\u20ac"+(Math.abs(v)).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
const ysym=s=>{const p=s.split(":");return p[0]+(SUF[(p[1]||"").toLowerCase()]||"")};
const map=s=>ov[s]||IS[s]||ysym(s);
function parseTable(t){
const ls0=t.split(/\r?\n/).filter(z=>z.trim()).slice(0,20);
const d=["\t",";",","].map(c=>[c,Math.max(0,...ls0.map(z=>z.split(c).length))]).sort((a,b)=>b[1]-a[1])[0][0];
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
/* ---- language-independent import helpers: headers are matched by meaning (many languages), then by content ---- */
const NRM=s=>String(s==null?"":s).toLowerCase().replace(/\u00f8/g,"o").replace(/\u00e6/g,"ae").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9@:]+/g," ").trim();
const MONP={jan:0,ene:0,gen:0,feb:1,fev:1,mar:2,mrt:2,maa:2,mrz:2,apr:3,avr:3,abr:3,may:4,mai:4,mei:4,mag:4,jun:5,giu:5,jul:6,lug:6,aug:7,aou:7,ago:7,sep:8,set:8,oct:9,okt:9,ott:9,out:9,nov:10,dec:11,dez:11,dic:11};
let DATEORD="dmy";
function monthOf(w){w=NRM(w);if(/^juil/.test(w))return 6;if(/^juin/.test(w))return 5;return MONP[w.slice(0,3)]}
function ymd(y,m,d){if(y<100)y+=y<70?2000:1900;if(m<0||m>11||d<1||d>31)return null;return new Date(Date.UTC(y,m,d)).toISOString().slice(0,10)}
function pd(s){
s=String(s).trim();
if(/^\d{5}(\.\d+)?$/.test(s))return new Date(Date.UTC(1899,11,30)+Math.floor(+s)*864e5).toISOString().slice(0,10);
let m=s.match(/^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})(?!\d)/);
if(m)return ymd(+m[1],+m[2]-1,+m[3]);
m=s.match(/^(\d{1,2})[-\/ .]+([^\d\s\-\/.]+)\.?[-\/ .]+(\d{2,4})(?!\d)/);
if(m){const mo=monthOf(m[2]);return mo===undefined?null:ymd(+m[3],mo,+m[1])}
m=s.match(/^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{2,4})(?!\d)/);
if(m)return DATEORD==="mdy"?ymd(+m[3],+m[1]-1,+m[2]):ymd(+m[3],+m[2]-1,+m[1]);
return null;
}
function guessOrder(vals){
let a=0,b=0;
for(const v of vals){const m=String(v).trim().match(/^(\d{1,2})[-\/.](\d{1,2})[-\/.]\d{2,4}/);if(m){if(+m[1]>12)a++;if(+m[2]>12)b++}}
return b>a?"mdy":"dmy";
}
const colFind=(h,test)=>h.findIndex(x=>test(x));
function colByContent(rows,test,minr){
const n=Math.min(rows.length,300);let best=-1,bs=0;
const w=Math.max(...rows.slice(0,40).map(x=>x.length),0);
for(let c=0;c<w;c++){let k=0,tot=0;for(let i=0;i<n;i++){const v=(rows[i][c]||"").trim();if(!v)continue;tot++;if(test(v))k++}
if(tot>2&&k/tot>(minr||0.6)&&k>bs){bs=k;best=c}}
return best;
}
const BUYW=/^(koop|kopen|buy|bought|achat|acheter|kauf|kaufen|compra|comprar|acquisto|acquista|compro|kob|kop|kjop|ostaa)$/,SELLW=/^(verkoop|verkopen|sell|sold|vente|vendre|vend|verkauf|verkaufen|venta|vender|vendita|vendi|salg|salj|myy)$/;
const SX_DATE=/^(transactiedatum|transaction date|trade date|handelsdatum|transaktionsdatum|transaktionsdato|handelsdato|date de transaction|date transaction|fecha de transaccion|fecha transaccion|data transazione|data operazione|data da transacao|datum|date|fecha|data|dato)$/;
const SX_SYM=/(symbool|symbol|symbole|simbolo)/,SX_ACT=/^(acties|event|evenement|ereignis|evento|actie|actions|action|aktionen|aktion|acciones|accion|azioni|azione|handlinger|handlingar|acoes|acao)$/;
const SX_RATE=/(omrekeningskoers|conversion rate|taux de conversion|umrechnungskurs|tipo de cambio|tasso di cambio|wisselkoers|exchange rate|fx rate|valutakurs)/;
const SX_CUR=/(currency|valuta|devise|wahrung|moneda|divisa|valuuta)/,SX_AMT=/^(aantal|amount|montant|betrag|importe|importo|bedrag|belop|beloeb|belopp)$/;
function toTx(t){
const r=parseTable(t.replace(/^\uFEFF/,"")).filter(x=>x.length>3);
if(!r.length)throw new Error("No table found in the text.");
IG={};SXD=[];
/* header row = the row (among the first 40) that matches most of the expected column meanings */
let hi=0,hs=-1;
r.slice(0,40).forEach((x,i)=>{const n=x.map(NRM);const sc=(n.some(c=>SX_DATE.test(c))?1:0)+(n.some(c=>SX_SYM.test(c))?1:0)+(n.some(c=>SX_ACT.test(c))?1:0);if(sc>hs){hs=sc;hi=i}});
if(hs<2)hi=0;
const h=r[hi].map(NRM),body=r.slice(hi+1);
let iD=colFind(h,x=>SX_DATE.test(x)),iS=colFind(h,x=>SX_SYM.test(x)&&/instru|strument|^symbo/.test(x)||/^(symbol|symbool)$/.test(x));
if(iS<0)iS=colFind(h,x=>SX_SYM.test(x));
let iA=colFind(h,x=>SX_ACT.test(x));
if(iD<0)iD=colByContent(body,v=>pd(v)!==null);
if(iS<0)iS=colByContent(body,v=>/^[A-Za-z0-9.\-_]+:[A-Za-z]{3,6}$/.test(v),0.15);
if(iA<0)iA=colByContent(body,v=>/^\s*\S+\s+-?[\d.,]+\s*@\s*[\d.,]+/.test(v),0.15);
if(iD<0||iS<0||iA<0)throw new Error("The columns were not recognised. The file needs a date, an instrument symbol (like ASML:xams) and an action text (like Buy 10 @ 600). Please check that you exported the Saxo transactions report.");
DATEORD=guessOrder(body.map(x=>x[iD]));
TXDBG={c:[h[iD],h[iS],h[iA]],s:body.length?[body[0][iD],body[0][iS],body[0][iA]].map(z=>String(z||"").slice(0,30)):[]};
const iN=colFind(h,x=>/^(instrument|instrumento|strumento|instrumenter)$/.test(x)),iT=colFind(h,x=>/^(type|typ|tipo|soort|art)$/.test(x)),iR=colFind(h,x=>SX_RATE.test(x));
let iV=colFind(h,x=>SX_CUR.test(x)&&/instru|strument/.test(x));
if(iV<0){const cands=h.map((_,c)=>c).filter(c=>c!==iA&&body.filter(x=>/^[A-Z]{3}$/.test((x[c]||"").trim())).length>body.length*0.6);let bd=0;cands.forEach(c=>{const d=new Set(body.map(x=>(x[c]||"").trim())).size;if(d>bd){bd=d;iV=c}});}
let iC=colFind(h,x=>SX_AMT.test(x));
if(iC<0){/* no amount header: take the numeric column whose size matches quantity x price most often */
const tr=body.map(x=>{const m=(x[iA]||"").match(/^\s*\S+\s+(-?[\d.,]+)\s*@\s*([\d.,]+)/);return m?{x:x,v:Math.abs(num(m[1])*num(m[2]))}:null}).filter(Boolean);
let bs=0;h.forEach((_,c)=>{if(c===iA||c===iR)return;let k=0;tr.forEach(z=>{const a=Math.abs(num(z.x[c]));if(isFinite(a)&&a>0&&z.v>0&&a/z.v>0.4&&a/z.v<2.5)k++});if(tr.length&&k>bs&&k/tr.length>0.6){bs=k;iC=c}});
}
const a=[];
for(const x of body){
const act=(x[iA]||"").trim(),d=pd(x[iD]);
const m=act.match(/^\s*(\S+)\s+(-?[\d.,]+)\s*@\s*([\d.,]+)/);
if(d&&x[iS]&&/dividend|dividende|dividendo/i.test(NRM(act))&&!m){const am=iC>=0?num(x[iC]):NaN,rr=iR>=0?num(x[iR]):NaN;if(isFinite(am))SXD.push({k:"div",d:d,s:x[iS].trim(),n:(x[iN>=0?iN:iS]||x[iS]).trim(),eur:am*(rr>0?rr:1),b:"Saxo"})}
if(!m||!d||!x[iS]){const kk=((iT>=0?x[iT]:"")+" | "+act.replace(/[-\d.,@]+/g,"").trim()).slice(0,60);IG[kk]=(IG[kk]||0)+1;continue}
const w=NRM(m[1]),qn=num(m[2]),cash=iC>=0?num(x[iC]):NaN;
let sell;
if(SELLW.test(w))sell=true;else if(BUYW.test(w))sell=false;
else if(qn<0)sell=true;
else if(isFinite(cash)&&cash!==0)sell=cash>0;
else sell=false;
if(!SELLW.test(w)&&!BUYW.test(w)){const kk="Unknown action word: "+m[1];IG[kk]=(IG[kk]||0)+1}
a.push({d:d,s:x[iS].trim(),n:(x[iN>=0?iN:iS]||x[iS]).trim(),q:(sell?-1:1)*Math.abs(qn),px:num(m[3]),c:cash,rt:iR>=0?num(x[iR]):NaN,cur:iV>=0?(x[iV]||"").trim():"",b:"Saxo"});
}
a.sort((p,q)=>p.d<q.d?-1:p.d>q.d?1:0);
return a;
}
const BMALT={"CSPX.AS":["VUAA.DE","SXR8.DE","^GSPC"]};
async function getSeries(sym){try{return await getSeries0(sym)}catch(e){const al=BMALT[sym];if(!al)throw e;for(const a of al){try{return await getSeries0(a)}catch(x){}}throw e}}
async function getSeries0(sym){
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
function lineChart(S,x0,L,fmt,zero,marks,rid,dx,evs){
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
(evs||[]).forEach(e=>{const X=xs(e.i).toFixed(1),rt=xs(e.i)<W*0.72;g+='<line x1="'+X+'" x2="'+X+'" y1="'+pt+'" y2="'+(H-pb)+'" stroke="currentColor" opacity=".4" stroke-dasharray="4 4"/><text x="'+(+X+(rt?6:-6))+'" y="'+(pt+12)+'" font-size="11.5" font-weight="600" text-anchor="'+(rt?"start":"end")+'" fill="currentColor" opacity=".85">'+esc(e.label)+'</text>'});
[...new Set((dx?[0,.25,.5,.75,1]:[0,.5,1]).map(f=>Math.round(x0+(L-x0)*f)))].forEach((i,k)=>{g+='<text x="'+xs(i).toFixed(1)+'" y="'+(H-7)+'" font-size="12" text-anchor="'+(i===x0?"start":i===L?"end":"middle")+'" fill="currentColor">'+((dx&&i!==x0&&i!==L)?MN[+dx[i].slice(5,7)-1].slice(0,3)+" '"+dx[i].slice(2,4):fd((dx||days)[i]))+'</text>'});
g+='<line id="cur'+id+'" y1="'+pt+'" y2="'+(H-pb)+'" stroke="currentColor" opacity=".55" visibility="hidden"/><g id="tg'+id+'" visibility="hidden" pointer-events="none"></g>';
CH[id]={S:S,x0:x0,L:L,dx:dx,fmt:fmt,zero:zero,marks:marks,pl:pl,pr:pr,W:W,H:H,pt:pt,pb:pb,mn:mn,mx:mx};
const lg=S.map((s,k)=>'<span><b style="color:'+COL[k%COL.length]+'">●</b> '+esc(s.name)+'</span>').join("");
return '<svg class="ch" data-c="'+id+'" viewBox="0 0 '+W+' '+H+'">'+g+'</svg><div class="lg">'+lg+'</div>'+(TAB==="r"?'<div class="mu">Drag across the chart to measure a period.</div>':'<div class="mu">Hover over the chart, or touch and drag on a phone, to see the values. Drag across the chart (hold and drag on a phone) to measure a period.</div>');
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
const o=isOpt(s);let q=0,cost=0,real=0,bg=0,sc=0,qb=0;
by[s].forEach(t=>{
const a=o?t.q:t.qa,c=MODE&&isFinite(t.cs)?t.cs:t.g;
if(a>0){q+=a;cost+=c;bg+=c;qb+=a}
else if(q>0){const f=Math.min(1,-a/q);real+=c-cost*f;sc+=cost*f;cost-=cost*f;q+=a}
else real+=c;
});
if(Math.abs(q)<1e-9){q=0;cost=0}
if(o&&G.ex[s]!==undefined&&q>0){real-=cost;sc+=cost;cost=0;q=0}
const k=s,px=o?0:P[k][L],val=o?cost:q*px;
out.push({k:s,n:(o?by[s][0].n:ser[k].name),q:q,avg:q>0?cost/q:(qb>0?bg/qb:0),qb:qb,px:px,val:val,un:q>0?val-cost:0,real:real,o:o,dv:dvk[s]||0,typ:typOf(s),bg:bg,sc:sc,loc:locCalc(s,by[s])});
}
POSL=out;OPS=new Set(out.filter(r=>r.q>0).map(r=>r.k));const vis=out.filter(r=>pf(r.k));
const tv=vis.reduce((a,r)=>a+r.val,0);
let h='<div class="card"><div class="ph"><h2>Positions</h2><div class="seg">'+[["1","Costs included"],["0","Costs excluded"]].map(z=>'<button data-pcm="'+z[0]+'"'+(String(MODE)===z[0]?' class="on"':"")+'>'+z[1]+'</button>').join("")+'</div></div><div class="sc"><table><tr><th>Instrument</th><th>Shares</th><th>Avg buy</th><th>Price now</th><th>Value</th><th>Weight</th><th>Unrealised</th><th>% unrealised'+infoI("Unrealised gain as a percentage of what the shares you still hold cost you (value now divided by cost, minus 1).")+'</th><th>Realised (sales)</th><th>% realised'+infoI("Profit or loss on shares you sold, as a percentage of what those sold shares cost you.")+'</th><th>Dividends</th><th>% dividends'+infoI("Net dividends received as a percentage of everything you ever bought of this holding.")+'</th><th>Total</th><th>% total'+infoI("Unrealised plus realised plus dividends, as a percentage of everything you ever bought of this holding.")+'</th></tr>';
["ETF","Stock","Derivative"].forEach(ty=>{
const g=vis.filter(r=>r.typ===ty).sort((a,b)=>byName(a.n,b.n));
if(!g.length)return;
h+='<tr><td colspan="14" class="grp">'+TYPN[ty]+'</td></tr>';
g.forEach(r=>{
const Lc=LOC&&r.loc;
h+='<tr><td><a href="#" data-det="'+esc(r.k)+'">'+esc(r.n)+'</a></td><td>'+sh(+r.q.toFixed(4))+'</td><td>'+(r.o||!(r.q>0||r.qb>0)?"–":Lc?lc2(Lc.avg,Lc.cur):"€"+f2(r.avg))+'</td><td>'+(r.o?"–":Lc?lc2(Lc.px,Lc.cur):"€"+f2(r.px))+'</td><td>'+(Lc?lc0(Lc.val,Lc.cur):eur(r.val))+'</td><td class="wt">'+(tv>0?(r.val/tv*100).toFixed(1)+'%<div class="wb"><i style="width:'+Math.min(100,r.val/tv*300).toFixed(0)+'%"></i></div>':"–")+"</td>"+(Lc?pcsL(Lc.un,Lc.cu,Lc.cur)+pcsL(Lc.real,Lc.sc,Lc.cur)+pcsL(Lc.dv,Lc.bg,Lc.cur)+pcsL(Lc.un+Lc.real+Lc.dv,Lc.bg,Lc.cur):pcs(r.un,r.q>0?r.val-r.un:0)+pcs(r.real,r.sc)+pcs(r.dv,r.bg)+pcs(r.un+r.real+r.dv,r.bg))+"</tr>";
});
});
const U=vis.reduce((a,r)=>a+r.un,0),R=vis.reduce((a,r)=>a+r.real,0),Dv=vis.reduce((a,r)=>a+r.dv,0),Cu=vis.reduce((a,r)=>a+(r.q>0?r.val-r.un:0),0),Sc=vis.reduce((a,r)=>a+r.sc,0),Bg=vis.reduce((a,r)=>a+r.bg,0);
h+='<tr><td><b>Total</b></td><td></td><td></td><td></td><td><b>'+eur(tv)+'</b></td><td></td>'+pcs(U,Cu)+pcs(R,Sc)+pcs(Dv,Bg)+pcs(U+R+Dv,Bg)+"</tr></table></div>";
return h+'<p class="mu"><b>Realised (sales)</b> is the profit or loss on shares you sold, after trading costs. <b>Dividends</b> are not part of it: they have their own column (net of withholding tax) and are added in <b>Total</b>. Amounts are in euro, use the average-cost method, and options and other derivatives are carried at cost until sold or expired. Shares are shown on today\'s basis, so a reverse split lowers the count. The % columns show each result relative to its base; hover the i icons in the headers for the base used.</p>'+(LOC?'<p class="mu">Each position is shown in the currency it trades in. Totals stay in €.</p>':'')+'</div>';
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
function fitCols(tb,hr){
if(tb.classList.contains("tx"))return;
const n=[...hr.cells].reduce((s,c)=>s+(c.colSpan||1),0);if(n<3)return;
const old=tb.querySelector("colgroup");if(old)old.remove();
const f=n<=4?32:n<=7?24:n<=10?18:14,o=((100-f)/(n-1)).toFixed(3)+"%",cg=document.createElement("colgroup");
for(let i=0;i<n;i++){const c=document.createElement("col");c.style.width=i?o:f+"%";cg.appendChild(c)}
tb.insertBefore(cg,tb.firstChild);tb.classList.add("fx");tb.style.minWidth=(150+(n-1)*96)+"px";tb.style.maxWidth=(240+(n-1)*120)+"px";
}
function enhanceTables(){
if(!document.querySelectorAll)return;
document.querySelectorAll("#out table").forEach(tb=>{
const hr=[...tb.rows].find(r=>r.querySelector("th"));if(!hr)return;
fitCols(tb,hr);
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
function render(syms,bad,warn){renderBase(syms,bad,warn);enhanceTables();layout();wbUpdate();fit();dvFitAll()}
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
h+='<div class="card"><h2>'+(PB==="stock"?"Stock performance":"My performance (TWRR)")+'</h2><p class="mu">Costs: <select id="mode"><option value="1"'+(MODE?" selected":"")+'>included</option><option value="0"'+(MODE?"":" selected")+'>excluded</option></select></p><div class="tfc"><span class="mu">Periods shown: </span>'+TFA().map(t=>'<button data-vt="'+t+'"'+(VTs().includes(t)?' class="on"':"")+'>'+t+'</button>').join("")+'<label class="cpl"><input type="checkbox" id="cu" style="width:auto"'+(CU?" checked":"")+'> Custom period</label>'+(CU?'<input type="date" id="d0" style="width:auto" value="'+CF+'"> <span class="mu">to</span> <input type="date" id="d1" style="width:auto" value="'+CT+'">':"")+'</div><div class="tfc"><span class="mu">Basis: </span>'+[["me","My performance (TWRR)"],["stock","Stock performance"]].map(z=>'<button data-pb="'+z[0]+'"'+(PB===z[0]?' class="on"':"")+'>'+z[1]+'</button>').join("")+'</div><div class="sc"><table><tr><th>Instrument</th>'+VTs().map(t=>"<th>"+t+"</th>").join("")+(CU?"<th>Custom</th>":"")+"<th>CAGR (all)</th></tr>";
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
const h=r[0].map(NRM),body=r.slice(1);
let iD=colFind(h,x=>/^(datum|date|fecha|data)$/.test(x));
if(iD<0)iD=colByContent(body,v=>pd(v)!==null);
let iO=colFind(h,x=>/^(omschrijving|description|beschreibung|descripcion|descrizione|descricao)$/.test(x));
if(iO<0){let bl=0;h.forEach((_,c)=>{const L=body.slice(0,100).reduce((s,x)=>s+(x[c]||"").length,0);if(L>bl&&c!==iD){bl=L;iO=c}})}
const iP=colFind(h,x=>/^(product|produkt|produit|producto|prodotto|produto)$/.test(x));
let iI=colFind(h,x=>/(^| )isin( |$)/.test(x));
if(iI<0)iI=colByContent(body,v=>ISINRE.test(v),0.1);
let iM=colFind(h,x=>/^(mutatie|change|mutations?|mutationen|veranderung|cambio|variazione|variacion|alteracao|movimento|variation|mouvements?|movimientos?|bewegung)$/.test(x));
if(iM<0)iM=h.findIndex((_,c)=>c>iO&&body.filter(x=>/^[A-Z]{3}$/.test((x[c]||"").trim())).length>body.length*0.5);
if(iD<0||iO<0||iM<0)throw new Error("The account statement columns were not recognised. This needs the Degiro Account statement export (date, description, change).");
DATEORD=guessOrder(body.map(x=>x[iD]));
const a=[];
for(const x of body){
const d=pd(x[iD]),amt=num(x[iM+1]),o=NRM(x[iO]||"");
if(!d||!isFinite(amt))continue;
let k=null,sub="";
if(/(dividend|dividende|dividendo|dividendi)/.test(o)&&/(tax|belasting|steuer|impot|impuesto|imposta|imposto|withholding|bronbelasting)/.test(o))k="tax";
else if(/^(dividend|dividende|dividendo|dividendi|dividenden)$/.test(o))k="div";
else if(/(transactiebelasting|transaction tax|transaktionssteuer|taxe sur les transactions|impuesto sobre transacciones|imposta sulle transazioni|imposto sobre transacoes|beurstaks|beurstaksen|taxe sur les operations de bourse)/.test(o)){k="fee";sub="tt"}
else if(/(aansluitingskosten|connection fee|anschlussgebuhr|frais de connexion|tarifa de conexion|costi di connessione|taxa de ligacao)/.test(o)){k="fee";sub="conn"}
else if(/^(rente|interest|zinsen|interets|interes|interessi|juros)$/.test(o)||/(flatex interest|cash interest|credit interest)/.test(o))k="int";
if(k)a.push({k:k,d:d,isin:iI>=0?(x[iI]||"").trim():"",n:iP>=0?(x[iP]||"").trim():"",cur:(x[iM]||"EUR").trim()||"EUR",amt:amt,sub:sub,b:"Degiro"});
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
if(a.k==="fee"||a.k==="int"){if(Math.abs(e)>=0.005)AO.push({k:a.k,d:a.d,e:e,sub:a.sub||"",n:a.n||""});return}
const s="D:"+a.isin,t=tx.find(x=>x.s===s),k=t?t.key:s;
DV.push({b:"Degiro",d:a.d,k:k,n:t?t.n:a.n,g:a.k==="div"?e:0,t:a.k==="tax"?e:0,sh:shares(k,a.d)});
});
SXD.forEach(a=>{
const k=kof(a.s);
DV.push({b:"Saxo",d:a.d,k:k,n:a.n,g:a.eur,t:0,sh:shares(k,a.d)});
});
DV.sort((p,q)=>p.d<q.d?-1:p.d>q.d?1:0);
/* a tax line on a date without a dividend is a correction of an earlier dividend: net it against that dividend and drop the line */
const byK={};DV.forEach(e=>{if(e.b==="Degiro"&&e.g>0)(byK[e.k]=byK[e.k]||[]).push(e)});
DV=DV.filter(e=>{
if(e.b!=="Degiro"||e.g!==0||!e.t)return true;
const L=byK[e.k]||[];
if(L.some(x=>x.d===e.d))return true;
const prev=L.filter(x=>x.d<e.d).sort((p,q)=>p.d<q.d?1:-1)[0];
if(!prev)return true;
prev.t+=e.t;return false;
});
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
const tile=(l,v,sub,c)=>'<div class="kpi"><div class="kl">'+l+(sub?infoI(sub):"")+'</div><div class="kv'+(c?" "+c:"")+'">'+v+'</div></div>';
const T=[];
T.push(tile("Total value"+sfx,eur(tv),"Holdings only, cash not included"));
T.push(tile("Total profit"+sfx,(pr>0?"+":"")+eur(pr),"Unrealised, realised and dividends, after costs",sg(pr)));
T.push(tile("Time-weighted return"+sfx,tw==null?"\u2013":pct1(tw),cg==null?"All time":"All time \u00b7 "+pct1(cg)+" per year",tw==null?"":sg(tw)));
{const ok=bm&&bw!=null&&tw!=null,d=ok?(tw-bw)*100:0;
T.push(tile("Against "+(bm?esc(bmLab(bm.name)):"index"),ok?(d>=0?"+":"-")+Math.abs(d).toFixed(1)+" points":"\u2013",ok?"You "+pct1(tw)+" \u00b7 index "+pct1(bw)+" (all time)":(bm?"No data for this period":"Pick an index to compare with"),ok?sg(d):""))}
if(bm)T.push(tile("Beta"+sfx,bs==null?"\u2013":bs.beta.toFixed(2),"vs "+bmLab(bm.name)+(bs==null?" \u00b7 needs 12+ weeks":" \u00b7 corr. "+bs.corr.toFixed(2)+" \u00b7 volatility "+(bs.vp*100).toFixed(0)+"% vs "+(bs.vm*100).toFixed(0)+"%")+". "+BETA_TIP));
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
AO.forEach(a=>{if(Math.abs(a.e)<0.005)return;const nm=a.k!=="fee"?"Account interest":a.sub==="tt"?"Transaction tax":a.sub==="conn"?"Connection fees":"Account fees";R.push({d:a.d,ty:a.k==="fee"?"Fee":"Interest",n:nm+(a.k==="fee"&&a.sub==="tt"&&a.n?" \u00b7 "+a.n:""),k:null,b:"Degiro",q:null,px:"\u2013",a:a.e,f:NaN,o:R.length})});
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
let h='<div class="card"><h2>Transactions<span class="cnt">'+R.length+'</span></h2><div class="dvc"><div>'+F.map(f=>'<button data-txf="'+f[0]+'"'+(TXF===f[0]?' class="on"':"")+'>'+f[1]+'</button>').join("")+'</div><div class="stats"><span>Bought <b>'+eur(bought)+'</b></span><span>Sold <b>'+eur(sold)+'</b></span><span>Dividends, net <b>'+eur(dv)+'</b></span></div>'+TXSW("table")+'</div>';
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
function extPx(k){
const x=ser[k],c0=x.cur,pen=c0==="GBp"||c0==="GBX",c=pen?"GBP":c0,fx=(c&&c!=="EUR"&&FX[c])?FX[c]:null,v=[];let j=0,last=fx?fx.v[0]:1;
for(let i=0;i<x.d.length;i++){const d=x.d[i];if(fx)while(j<fx.d.length&&fx.d[j]<=d){last=fx.v[j];j++}const p=x.cv[i];v.push(fx?p*(pen?0.01:1)/last:p)}
return {d:x.d,v:v};
}
function tfStart(tf,dx,first){
if(tf==="Max")return dx[0];
if(tf==="Hold")return first<dx[0]?dx[0]:first;
const e=new Date(dx[dx.length-1]+"T00:00:00Z");
if(tf==="YTD")return (e.getUTCFullYear()-1)+"-12-31";
if(tf==="1D")return dx[Math.max(0,dx.length-2)];
if(tf==="1W")e.setUTCDate(e.getUTCDate()-7);else e.setUTCMonth(e.getUTCMonth()-({"1M":1,"3M":3,"6M":6,"1Y":12,"3Y":36,"5Y":60}[tf]||0));
return e.toISOString().slice(0,10);
}
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
const pv=v=>'<b class="'+(v>=0?"pos":"neg")+'">'+(v>0?"+":"")+eur(v)+'</b>',pp=v=>v==null?'<b class="mu">\u2013</b>':'<b class="'+(v>=0?"pos":"neg")+'">'+(v>0?"+":"")+(v*100).toFixed(1)+"%</b>";
h+='<div class="dk"><div class="dkh">Position</div><div><span>Shares now</span><b>'+sh(+q.toFixed(4))+'</b></div><div><span>Avg buy</span><b>'+(q>0&&!o?"\u20ac"+f2(cost/q):"\u2013")+'</b></div><div><span>Price now</span><b>'+(o?"\u2013":"\u20ac"+f2(px))+'</b></div><div><span>Value</span><b>'+eur(val)+'</b></div><div class="dkh">Profit</div><div><span>Unrealised</span>'+pv(un)+'</div><div><span>Realised (sales)</span>'+pv(real)+'</div><div><span>Dividends (net)</span>'+pv(dn)+'</div><div><span>Total profit</span>'+pv(tot+dn)+'</div></div>';
h+='<div class="dk"><div class="dkh">Return on money invested</div><div><span>Invested in total</span><b>'+eur(bought)+'</b></div><div><span>Result'+(D.length?' (incl. dividends)':'')+'</span>'+(bought>0?pp(D.length?(tot+dn)/bought:tot/bought):'<b class="mu">\u2013</b>')+'</div></div>';
if(row){
h+='<div class="dk dkr"><div class="dkh">Time-weighted return <span class="tip" tabindex="0"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg><span class="tt">Time-weighted return follows the price path and ignores when you added money, so it can differ from the result on the money invested. CAGR (all) is the same return as a yearly rate since your first buy.</span></span></div>'+VTs().map(t=>'<div><span>'+t+'</span>'+pp(ret(row,t))+'</div>').join("")+(CU?'<div><span>Custom</span>'+pp(ret(row,"C"))+'</div>':"")+'<div><span>CAGR (all)</span>'+pp(cagr(row))+'</div></div>';
}
h+='</div>';
if(!o&&ser[k]&&ser[k].d.length>1){
const X=extPx(k),dx=X.d,LL=dx.length-1,first=T[0].d,sd=tfStart(DTF,dx,first),di2=d=>{let i=0;for(let j=0;j<dx.length&&dx[j]<=d;j++)i=j;return i};
let x0=sd?di2(sd):0;if(x0>=LL)x0=Math.max(0,LL-1);
const v=X.v.slice(x0),marks=T.filter(t=>t.d>=dx[x0]).map(t=>({i:di2(t.d),v:t.g/Math.max(1e-9,Math.abs(t.qa)),c:t.q>0?"#16a34a":"#dc2626"})),evs=[];
const lim=new Date(dx[LL]+"T00:00:00Z");lim.setUTCFullYear(lim.getUTCFullYear()-10);lim.setUTCDate(lim.getUTCDate()+20);
const isIpo=dx[0]>lim.toISOString().slice(0,10),fb=di2(first);
if(isIpo&&x0===0)evs.push({i:0,label:"Listed "+fd(dx[0])});
if(first>dx[0]&&fb>x0&&fb<LL)evs.push({i:fb,label:"First buy"});
const tfs=TFS.filter(t=>t==="Max"?true:tfStart(t,dx,first)>=dx[0]),btn=t=>'<button data-dtf="'+t+'"'+(t===DTF?' class="on"':"")+'>'+t+'</button>',ho='<button data-dtf="Hold"'+(DTF==="Hold"?' class="on"':"")+'>Holding period</button>';
h+='<div class="card"><h2>Price and your trades</h2><div class="dtf">'+tfs.filter(t=>t!=="Max").map(btn).join("")+btn("Max")+ho+'</div>'+lineChart([{name:"Price (\u20ac)",a:x0,v:v}],x0,LL,eur2,false,marks,undefined,dx,evs)+'<p class="mu"><b style="color:#16a34a">\u25cf</b> buys <b style="color:#dc2626">\u25cf</b> sells. '+(isIpo?'Listed on '+fd(dx[0])+' (first available price). ':(DTF==="Max"?'Showing up to 10 years of history. ':''))+'Prices are euro-converted closes.</p></div>';
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
const ISINRE=/^[A-Z]{2}[A-Z0-9]{9}[0-9]$/;
function toTxD(t){
const r=parseTable(t.replace(/^\uFEFF/,"")).filter(x=>x.length>5);
if(!r.length)throw new Error("No table found in the Degiro text.");
const h=r[0].map(NRM),body=r.slice(1),has=(x,re)=>re.test(x);
let iI=colFind(h,x=>x==="isin"||/(^| )isin( |$)/.test(x));
if(iI<0)iI=colByContent(body,v=>ISINRE.test(v),0.1);
let iD=colFind(h,x=>/^(datum|date|fecha|data)$/.test(x));
if(iD<0)iD=colByContent(body,v=>pd(v)!==null);
const iTm=colFind(h,x=>/^(tijd|time|uhrzeit|heure|hora|ora)$/.test(x)),iP=colFind(h,x=>/^(product|produkt|produit|producto|prodotto|produto)$/.test(x));
let iM=colFind(h,x=>/(uitvoerings|venue|ausfuhr|execution|ejecucion|esecuzione|execucao)/.test(x));
let iQ=colFind(h,x=>/^(aantal|quantity|anzahl|quantite|numero|cantidad|quantita|quantidade|number)$/.test(x));
let iK=colFind(h,x=>/^(koers|price|kurs|cours|precio|quotazione|prezzo|preco|cotacao)$/.test(x));
if(iI>=0){if(iM<0)iM=iI+2;if(iQ<0)iQ=iI+3;if(iK<0)iK=iI+4}
let iE=colFind(h,x=>/(waarde|value|wert|valeur|valor|valore)/.test(x)&&/eur/.test(x)&&!/(lokal|local|locale)/.test(x));
let iW=colFind(h,x=>/(wisselkoers|exchange rate|wechselkurs|taux de change|tipo de cambio|tasso di cambio|taxa de cambio)/.test(x));
let iT=colFind(h,x=>/(totaal|total|gesamt|totale)/.test(x)&&/eur/.test(x));
/* unknown language: Degiro always uses the same column order, so fall back to the position next to the ISIN column when that column holds numbers */
const numCol=c=>{const v=body.map(x=>(x[c]||"").trim()).filter(Boolean);return v.length>0&&v.filter(z=>isFinite(num(z))).length/v.length>0.8};
if(iI>=0){if(iE<0&&numCol(iI+8))iE=iI+8;if(iW<0&&iI+9<h.length&&body.some(x=>isFinite(num(x[iI+9]))))iW=iI+9;if(iT<0&&numCol(iI+11))iT=iI+11}
if(iD<0||iI<0||iQ<0||iK<0)throw new Error("The Degiro columns were not recognised. This needs the Degiro Transactions export (date, product, ISIN, quantity, price). The Account statement goes in the other box.");
DATEORD=guessOrder(body.map(x=>x[iD]));
const a=[];
for(const x of body){
const d=pd(x[iD]),q=num(x[iQ]);
if(!d||!ISINRE.test((x[iI]||"").trim())&&!(x[iI]||"").trim()||!isFinite(q)||q===0)continue;
a.push({d:d,tm:iTm>=0?(x[iTm]||"").trim():"",s:"D:"+x[iI].trim(),n:((iP>=0?x[iP]:"")||x[iI]).trim(),q:q,px:num(x[iK]),c:iT>=0?num(x[iT]):NaN,rt:iW>=0?num(x[iW]):NaN,cur:(x[iK+1]||"").trim(),ge:iE>=0?Math.abs(num(x[iE])):NaN,eurc:true,mic:iM>=0?(x[iM]||"").trim():"",b:"Degiro"});
}
return a;
}
function toTxA(t){
/* Degiro account statement: every buy and sell is a row like "Buy 5 @ 107.84 USD" (any language), so one file is enough */
const r=parseTable(t.replace(/^\uFEFF/,"")).filter(x=>x.length>5);
if(!r.length)return [];
const h=r[0].map(NRM),body=r.slice(1);
let iD=colFind(h,x=>/^(datum|date|fecha|data)$/.test(x));
if(iD<0)iD=colByContent(body,v=>pd(v)!==null);
let iO=colFind(h,x=>/^(omschrijving|description|beschreibung|descripcion|descrizione|descricao)$/.test(x));
if(iO<0){let bl=0;h.forEach((_,c)=>{const L=body.slice(0,100).reduce((p,x)=>p+(x[c]||"").length,0);if(L>bl&&c!==iD){bl=L;iO=c}})}
const iTm=colFind(h,x=>/^(tijd|time|uhrzeit|heure|hora|ora)$/.test(x)),iP=colFind(h,x=>/^(product|produkt|produit|producto|prodotto|produto)$/.test(x));
let iI=colFind(h,x=>/(^| )isin( |$)/.test(x));
if(iI<0)iI=colByContent(body,v=>ISINRE.test(v),0.1);
let iM=colFind(h,x=>/^(mutatie|change|mutations?|mutationen|veranderung|cambio|variazione|variacion|alteracao|movimento|variation|mouvements?|movimientos?|bewegung)$/.test(x));
if(iM<0)iM=h.findIndex((_,c)=>c>iO&&body.filter(x=>/^[A-Z]{3}$/.test((x[c]||"").trim())).length>body.length*0.5);
const iX=colFind(h,x=>/^(fx|wisselkoers|wechselkurs|taux de change|tipo de cambio|tasso di cambio|taxa de cambio)$/.test(x));
let iR=colFind(h,x=>/order/.test(x));
if(iR<0)iR=colByContent(body,v=>/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-/i.test(v),0.05);
if(iD<0||iO<0||iM<0||iI<0)return [];
DATEORD=guessOrder(body.map(x=>x[iD]));
const TRD=/^\s*(\S+)\s+(-?[\d.,]+)\s*(?:@|zu je|a|\u00e0)\s*(-?[\d.,]+)\s*([A-Za-z]{3})?\s*$/,FEE=/(kost|cost|fee|frais|gebuhr|tarif|costi|custo|courtage|commission)/,fees={};
if(iR>=0)body.forEach(x=>{const id=(x[iR]||"").trim(),o=NRM(x[iO]||""),a=num(x[iM+1]);if(!id||!isFinite(a)||a>=0||(x[iM]||"").trim()!=="EUR")return;if(TRD.test(x[iO]||"")||/(dividend|dividende|dividendo|dividendi|tax|belasting|steuer|impot)/.test(o))return;if(FEE.test(o))fees[id]=(fees[id]||0)+Math.abs(a)});
const alt=z=>{const v=[num(z)],w=parseFloat(z.replace(/[.,](?=\d{3}(?!\d))/g,""));if(isFinite(w)&&w!==v[0])v.push(w);return v};
const a=[];
for(const x of body){
const m=TRD.exec(x[iO]||"");if(!m)continue;
const d=pd(x[iD]),isin=(x[iI]||"").trim(),amt=num(x[iM+1]);
if(!d||!ISINRE.test(isin)||!isFinite(amt))continue;
/* thousands separator or decimal? pick the reading where quantity x price matches the cash amount */
let q=NaN,px=NaN,bd=1e18;
alt(m[2]).forEach(a1=>alt(m[3]).forEach(b1=>[1,100].forEach(mu=>{const e=Math.abs(Math.abs(a1*b1*mu)-Math.abs(amt));if(e<bd){bd=e;q=a1;px=b1}})));
if(!isFinite(q)||q===0||!isFinite(px))continue;
const w=NRM(m[1]),sell=SELLW.test(w)?true:BUYW.test(w)?false:amt>0;
const cc=(x[iM]||"").trim().toUpperCase(),pc=(m[4]||cc).toUpperCase(),fx=iX>=0?num(x[iX]):NaN,fee=iR>=0?(fees[(x[iR]||"").trim()]||0):0;
let ge=NaN,c=NaN;
if(cc==="EUR"){ge=Math.abs(amt);c=ge+(sell?-fee:fee)}
else if(fx>0&&fx<5000){ge=Math.abs(amt)/fx;c=ge+(sell?-fee:fee)}
a.push({d:d,tm:iTm>=0?(x[iTm]||"").trim():"",s:"D:"+isin,n:((iP>=0?x[iP]:"")||isin).trim(),q:(sell?-1:1)*Math.abs(q),px:px,c:c,rt:fx>0?fx:NaN,cur:pc,ge:ge,eurc:true,mic:"",b:"Degiro"});
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
if(!text&&!textD&&!textA){msg("Paste or load your transactions first.");return}
try{tx=[...(text?toTx(text):[]),...(textD?toTxD(textD):(textA?toTxA(textA):[]))];AC=textA?toAcc(textA):[]}catch(e){msg(e.message);return}
tx.sort((p,q)=>p.d<q.d?-1:p.d>q.d?1:(p.tm||"")<(q.tm||"")?-1:(p.tm||"")>(q.tm||"")?1:(p.q>0?0:1)-(q.q>0?0:1));
ls.set("tx",text);ls.set("txd",textD);ls.set("txa",textA);ls.set("bm",$("bm").value);
BV=$("bv").value;ls.set("bv",BV);
if(BV&&BV!=="all"){const BS=BV.split(",");tx=tx.filter(t=>BS.includes(t.b));AC=AC.filter(a=>BS.includes(a.b));SXD=SXD.filter(a=>BS.includes(a.b))}
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
if($("txtA").value.trim()&&!AC.length)warn.push("The account statement was read, but no dividend or cost rows were found for this view. Check that the View menu includes the broker of this statement.");
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
$("clr").onclick=()=>{ls.del("tx");ls.del("txd");ls.del("txa");ls.del("ov");ls.del("isin");ls.del("bm");ov={};IS={};SC={};$("txt").value="";$("txtD").value="";$("txtA").value="";FILES=[];renderFiles();$("out").innerHTML="";msg("Saved data cleared.")};
$("bv").onchange=()=>run().catch(x=>msg("Error: "+x.message));
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
document.querySelectorAll(".sl").forEach(z=>{if(z!==sl){z.classList.remove("ph");z.style.transform="";z.style.filter="";z.style.opacity=sl?".5":""}});
if(sl){
const c=sl.getAttribute("data-c");sl.classList.add("ph");
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
const title=fd((c.dx||days)[i]),mc=Math.max(title.length,...L2.map(l=>l.n.length+l.t.length+3));
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
/* ---- Show / Type: dropdowns in the top bar (same look as the index picker) ---- */
function pfHead(on){
const tools=document.querySelector("header.top .tools"),old=$("pfw");
if(!on||!tools){if(old)old.remove();return}
const SH=[["all","All positions"],["open","Open positions"],["closed","Closed positions"]],TY=[["all","All types"],["ETF","ETFs"],["Stock","Stocks"],["Derivative","Derivatives"]];
const chev='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
const dd=(attr,lab,cur,L)=>'<div class="pw"><button type="button" class="ixb" data-dd="1"><span class="ixk">'+lab+'</span><span>'+(L.find(z=>z[0]===cur)||L[0])[1]+'</span>'+chev+'</button><div class="pop pfp" hidden><div class="ps">'+lab+'</div>'+L.map(z=>'<button type="button" class="ixo'+(z[0]===cur?" on":"")+'" data-'+attr+'="'+z[0]+'"><span>'+z[1]+'</span></button>').join("")+'</div></div>';
let w=old;if(!w){w=document.createElement("div");w.id="pfw";w.className="pfw";tools.insertBefore(w,tools.firstChild)}
w.innerHTML=dd("pf","Show",PF,SH)+dd("pt","Type",PT,TY);
}
document.addEventListener("click",e=>{
const w=e.target.closest&&e.target.closest("#pfw");
document.querySelectorAll("#pfw .pop").forEach(p=>{if(!w||!p.parentNode.contains(e.target))p.hidden=true});
if(!w)return;
const b=e.target.closest("[data-dd]");
if(b){const p=b.parentNode.querySelector(".pop"),h=!p.hidden;document.querySelectorAll("#pfw .pop").forEach(x=>x.hidden=true);$("ixp").hidden=true;$("apr").hidden=true;p.hidden=h;return}
const o=e.target.closest("[data-pf],[data-pt]");if(!o)return;
if(o.hasAttribute("data-pf")){PF=o.getAttribute("data-pf");ls.set("pf",PF)}else{PT=o.getAttribute("data-pt");ls.set("pt",PT)}
render(G.syms,[],G.warn);
});
function layout(){
const out=$("out");if(!out||!out.firstElementChild)return;
const kids=[...out.children],kp=kids.find(e=>e.classList.contains("kpis")),tabs=kids.find(e=>e.classList.contains("tabs")),pfc=kids.find(e=>e.classList.contains("tfc")&&e.querySelector("[data-pf]"));
const side=document.createElement("aside");side.id="side";
{const sb=document.createElement("button");sb.type="button";sb.className="sbt";sb.id="sbt";const c=document.documentElement.getAttribute("data-sb")==="c";sb.title=c?"Expand sidebar":"Collapse sidebar";sb.setAttribute("aria-label",sb.title);sb.innerHTML='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>';side.appendChild(sb)}
if(tabs){tabs.querySelectorAll("button").forEach(b=>b.setAttribute("data-i",{r:"\u2197",t:"\u21c4",d:"%",a:"\u25d1",w:"\u221e"}[b.getAttribute("data-tab")]||""));side.appendChild(tabs)}
pfHead(!!pfc);
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
dvFix();
}
function applyZoom(){const W=window.innerWidth,H=window.innerHeight;let z=W<=900?1:Math.min(W/1920,H/940);z=Math.round(Math.max(.65,Math.min(1.3,z))*100)/100;document.documentElement.style.setProperty("--z",z)}
{const m=$("setup");if(m&&m.parentNode!==document.body)document.body.appendChild(m)}
applyZoom();
let fitT=0;window.addEventListener("resize",()=>{applyZoom();clearTimeout(fitT);fitT=setTimeout(fit,60)});
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
$("ixp").innerHTML='<div class="ps">Compare with</div>'+BMP.map(p=>[p[0],p[1]]).concat(ex.map(n=>[n,bmLab(n)])).map(p=>'<button type="button" class="ixo'+(p[0]===cur?' on':'')+'" data-ix="'+esc(p[0])+'"><span>'+esc(p[1])+'</span><i class="tk">'+esc(p[0])+'</i></button>').join("")+'<button type="button" class="ixo" data-ix="__other"><span>Other symbol\u2026</span></button>'}
function ixPick(v){if(v==="__other"){v=(prompt("Yahoo Finance symbol of an index or ETF, for example ^GDAXI or EXSA.DE")||"").trim();if(!v)return}
BMA=v;ls.set("bma",v);$("ixp").hidden=true;const only=bmList().length===1&&bmList()[0]===v;$("bm").value=v;if(only)render(G.syms,[],G.warn);else run().catch(x=>msg("Error: "+x.message))}
$("ixb").onclick=()=>{const p=$("ixp");$("apr").hidden=true;p.hidden=!p.hidden;if(!p.hidden)ixList()};
$("ixp").addEventListener("click",e=>{const o=e.target.closest&&e.target.closest("[data-ix]");if(o)ixPick(o.getAttribute("data-ix"))});
document.addEventListener("click",e=>{if(!e.target.closest("#ixw"))$("ixp").hidden=true});
$("aprb").addEventListener("click",()=>{$("ixp").hidden=true});
ixSync(null);
$("upl").onclick=()=>{if(typeof openSetup==="function")openSetup();else $("setup").hidden=false};
{const tp=document.createElement("div");tp.id="tip";tp.hidden=true;document.body.appendChild(tp);
const show=e=>{const i=e.target.closest&&e.target.closest(".inf");if(!i)return;tp.textContent=i.getAttribute("data-tip");tp.hidden=false;const r=i.getBoundingClientRect(),w=tp.offsetWidth,h=tp.offsetHeight;tp.style.left=Math.min(Math.max(8,r.left+r.width/2-w/2),window.innerWidth-w-8)+"px";let y=r.top-h-8;if(y<8)y=r.bottom+8;tp.style.top=y+"px"};
const hide=e=>{if(e.target.closest&&e.target.closest(".inf")&&(e.type!=="pointerout"||e.pointerType==="mouse"))tp.hidden=true};
document.addEventListener("pointerover",show);document.addEventListener("pointerout",hide);document.addEventListener("focusin",show);document.addEventListener("focusout",hide)}
$("out").addEventListener("click",e=>{const r=e.target.closest&&e.target.closest("[data-tk]");if(r)openTx(r.getAttribute("data-tk"),r.getAttribute("data-ts"))});
$("out").addEventListener("pointerleave",()=>{const d=$("dvt");if(d)d.setAttribute("visibility","hidden")});
$("mclose").onclick=()=>{$("setup").hidden=true};
$("setup").addEventListener("click",e=>{if(e.target===$("setup"))$("setup").hidden=true});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("setup").hidden=true;$("apr").hidden=true;$("ixp").hidden=true;$("bkp").hidden=true;document.querySelectorAll("#pfw .pop").forEach(p=>p.hidden=true)}});
$("run").addEventListener("click",()=>{$("setup").hidden=true});
$("out").addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("[data-ua],[data-ud]");if(!t)return;
if(t.hasAttribute("data-ua")){const em=$("uem").value.trim().toLowerCase(),nm=$("unm").value.trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){msg("Enter a valid email address.");return}if(USR.some(u=>u.email===em)){msg("That email is already in the list.");return}USR.push({id:Date.now().toString(36),email:em,name:nm,plan:$("upl2").value,status:"Active",joined:new Date().toISOString().slice(0,10)})}
else USR=USR.filter(u=>u.id!==t.getAttribute("data-ud"));
saveUsers();render(G.syms,[],G.warn)});
$("out").addEventListener("change",e=>{const el=e.target,id=el.getAttribute&&el.getAttribute("data-uid");if(!id)return;const u=USR.find(x=>x.id===id);if(!u)return;if(el.getAttribute("data-uf")==="plan")u.plan=el.value;else u.status=el.value;saveUsers();render(G.syms,[],G.warn)});
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#sbt");if(!b)return;const R=document.documentElement,c=R.getAttribute("data-sb")==="c";if(c)R.removeAttribute("data-sb");else R.setAttribute("data-sb","c");ls.set("sb",c?"":"c");b.title=c?"Collapse sidebar":"Expand sidebar";b.setAttribute("aria-label",b.title);setTimeout(fit,0)});
if(ls.get("sb")==="c")document.documentElement.setAttribute("data-sb","c");
document.documentElement.setAttribute("data-kpi","a");
if(!(ls.get("tx")||ls.get("txd")||ls.get("txa")))$("setup").hidden=false;
$("themes").addEventListener("click",e=>{const m=e.target.getAttribute&&e.target.getAttribute("data-mode");if(m)setLook(m)});
setLook(ls.get("mode")||"dark");
if(ls.get("tx")||ls.get("txd")||ls.get("txa")){$("txtA").value=ls.get("txa")||"";$("txt").value=ls.get("tx")||"";$("txtD").value=ls.get("txd")||"";if(ls.get("bv"))$("bv").value=ls.get("bv");if(ls.get("bm")){const L=ls.get("bm").split(",").map(x=>x.trim()).filter(Boolean);$("bm").value=(L.includes(BMA)?BMA:L[0])||"IWDA.AS"}ixSync(null);run().catch(e=>msg("Error: "+e.message))}

/* ---- Bar charts (Bought & sold, Gain / loss, Dividends): readable on every screen size ----
   Up to 12 periods: fit to the width; when a period gets narrower than 44px the small value labels are dropped
   (exact values stay in the hover or touch box) and period names are thinned out.
   More than 12 periods that would get narrower than 48px: side scroll with the value axis pinned, opened at the latest data. */
var DV_MAXFIT=12,DV_SLOT=48,DV_AXIS=54,DV_NS="http://www.w3.org/2000/svg",dvBusy=false;
{const st=document.createElement("style");st.textContent=".dvfit{position:relative}.dvfit .dvsc{overflow-x:auto;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch}.dvfit svg.dv{max-width:none!important;touch-action:auto!important}.dvfit .dvax{position:absolute;left:0;top:0;pointer-events:none}";document.head.appendChild(st)}
function dvFitAll(){document.querySelectorAll("#out svg.dv").forEach(dvFit)}
function dvAxis(ns,host){
const old=host.querySelector(".dvax");if(old)host.removeChild(old);
const H=+ns.getAttribute("viewBox").split(/\s+/)[3],ax=document.createElementNS(DV_NS,"svg"),bg=document.createElementNS(DV_NS,"rect");
ax.setAttribute("viewBox","0 0 "+DV_AXIS+" "+H);ax.setAttribute("class","dvax");ax.setAttribute("aria-hidden","true");
ax.style.width=DV_AXIS+"px";ax.style.height=(parseFloat(ns.style.height)||H)+"px";
bg.setAttribute("width",DV_AXIS);bg.setAttribute("height",H);bg.style.fill="var(--card)";ax.appendChild(bg);
ns.querySelectorAll('text[text-anchor="end"]').forEach(e=>{if(+e.getAttribute("x")<=DV_AXIS)ax.appendChild(e.cloneNode(true))});
ax.style.color=getComputedStyle(ns).color;host.appendChild(ax);
}
function dvFit(svg){
if(!svg||svg.closest(".dvfit"))return;
const vb=(svg.getAttribute("viewBox")||"").split(/\s+/),W=+vb[2],H=+vb[3],n=svg.querySelectorAll("rect.dvh").length;
if(!n||!W)return;
if(n<=DV_MAXFIT||(W-62)/n>=DV_SLOT){
const slot=(W-62)/n;
if(slot<44)svg.querySelectorAll('text[font-size="10"]').forEach(e=>e.remove());
if(slot<34)[...svg.querySelectorAll('text[text-anchor="middle"][font-size="11"]')].filter(e=>+e.getAttribute("y")>=H-10).forEach((e,i)=>{if(i%2)e.remove()});
return;
}
const Wn=n*DV_SLOT+62,keep=CD.dv;CD.dv={W:Wn,H:H};
const t=document.createElement("div");let ns=null;
try{t.innerHTML=TAB==="t"?(TXV==="gain"?txGain():txChart()):divChart();ns=t.querySelector("svg.dv")}catch(e){ns=null}
if(!ns){CD.dv=keep;return}
if(window.DVFIT_NOSUM){const sm=ns.querySelector('text[text-anchor="end"][y="12"]');if(sm)sm.remove()}
ns.style.width=Wn+"px";ns.style.height=H+"px";
const host=document.createElement("div"),sc=document.createElement("div");
host.className="dvfit";sc.className="dvsc";host.setAttribute("data-vw",window.innerWidth);
svg.replaceWith(host);sc.appendChild(ns);host.appendChild(sc);dvAxis(ns,host);
let lx=0;ns.querySelectorAll("rect.dvb").forEach(r=>{lx=Math.max(lx,+r.getAttribute("x")+ +r.getAttribute("width"))});
sc.scrollLeft=lx?Math.max(0,lx+16-sc.clientWidth):sc.scrollWidth;
}
function dvFix(){
let again=false;
document.querySelectorAll(".dvfit").forEach(host=>{
if(host.getAttribute("data-vw")!==String(window.innerWidth)){again=true;return}
const ns=host.querySelector("svg.dv");if(!ns)return;
ns.style.width=(+ns.getAttribute("viewBox").split(/\s+/)[2])+"px";dvAxis(ns,host);
});
if(again&&!dvBusy&&G&&G.syms){dvBusy=true;setTimeout(()=>{try{render(G.syms,[],G.warn)}finally{dvBusy=false}},0)}
}

/* ===== Language (EN / FR / NL), local currency, chart range, import guide ===== */
var I18N={"fr":{"Log in to <a href=\"https://www.saxoinvestor.be/login\" target=\"_blank\" rel=\"noopener\">Saxo</a>.":"Connectez-vous à <a href=\"https://www.saxoinvestor.be/login\" target=\"_blank\" rel=\"noopener\">Saxo</a>.","Go to <b>“All accounts”</b> and select the <b>“Transactions”</b> tab.":"Allez dans <b>“Tous les comptes”</b> et sélectionnez l’onglet <b>“Transactions”</b>.","Select the <b>“All time”</b> view.":"Sélectionnez la vue <b>“Tout”</b>.","Click the <b>“Export”</b> button, select <b>“Include details”</b> and click on <b>“Excel”</b>.":"Cliquez sur le bouton <b>“Exporter”</b>, cochez <b>“Inclure les détails”</b> et cliquez sur <b>“Excel”</b>.","Import the downloaded Excel here.":"Importez ici le fichier Excel téléchargé.","Select your country and log in at <a href=\"https://www.degiro.com/\" target=\"_blank\" rel=\"noopener\">Degiro</a>.":"Sélectionnez votre pays et connectez-vous sur <a href=\"https://www.degiro.com/\" target=\"_blank\" rel=\"noopener\">Degiro</a>.","Go to <b>“Inbox”</b>.":"Allez dans <b>“Boîte de réception”</b>.","Select the <b>“Account Statement”</b> tab and pick the period from or before your first deposit until today. Click the download button to export it as a CSV. It contains your trades, dividends, costs and interest.":"Sélectionnez l’onglet <b>“Relevé de compte”</b> et choisissez la période à partir de votre premier dépôt (ou avant) jusqu’à aujourd’hui. Cliquez sur le bouton de téléchargement pour l’exporter en CSV. Il contient vos transactions, dividendes, frais et intérêts.","(Optional) Select the <b>“Transactions”</b> tab and pick the period from or before your first deposit until today. Click the download button to export it as a CSV. It provides more accurate data for the exchange of each trade.":"(Facultatif) Sélectionnez l’onglet <b>“Transactions”</b> et choisissez la période à partir de votre premier dépôt (ou avant) jusqu’à aujourd’hui. Cliquez sur le bouton de téléchargement pour l’exporter en CSV. Il fournit des données plus précises sur la place de cotation de chaque transaction.","Costs included":"Frais inclus","Costs excluded":"Frais exclus","Remove":"Retirer","Saved data":"Données enregistrées","No trades found in this statement. Check that the period starts at your first deposit.":"Aucune transaction trouvée dans ce relevé. Vérifiez que la période commence à votre premier dépôt.","Pick the period from your <b>first deposit until today</b> and export it as <b>CSV</b> (or Excel). CSV keeps full precision. The language of the export does not matter.":"Choisissez la période de votre <b>premier dépôt à aujourd’hui</b> et exportez en <b>CSV</b> (ou Excel). Le CSV garde toute la précision. La langue de l’export n’a pas d’importance.","Drop that one file here: it contains your trades, dividends, costs and interest.":"Déposez ce seul fichier ici : il contient vos transactions, dividendes, frais et intérêts.","The separate Transactions file is optional; it only adds the exchange of each trade.":"Le fichier Transactions séparé est facultatif ; il ajoute seulement la place de cotation de chaque transaction.","% dividends":"% dividendes","% realised":"% réalisé","% total":"% total","% unrealised":"% latent","Active":"Actif","Activity":"Activité","Add user":"Ajouter","Admin":"Admin","Against World (MSCI World)":"Contre World (MSCI World)","All":"Tout","All positions":"Toutes les positions","All time":"Depuis le début","All types":"Tous les types","Allocation":"Répartition","Amount":"Montant","Analysis":"Analyse","Annual contribution increase (%)":"Hausse annuelle des versements (%)","Annual increase (%)":"Hausse annuelle (%)","Annual inflation (%)":"Inflation annuelle (%)","Appearance":"Apparence","Assumptions":"Hypothèses","Avg buy":"Prix d’achat moyen","Basic access":"Accès de base","Basis:":"Base :","Beta":"Bêta","Bought":"Acheté","Bought & sold":"Achats et ventes","Broker":"Courtier","Buy":"Achat","Buys":"Achats","CAGR":"TCAC","CAGR (all)":"TCAC (total)","Calculate":"Calculer","Capital needed":"Capital nécessaire","Chart":"Graphique","Clear saved data":"Effacer les données enregistrées","Close":"Fermer","Closed":"Clôturée","Closed positions":"Positions clôturées","Collapse sidebar":"Réduire le menu","Comparison":"Comparaison","Comparison index":"Indice de comparaison","Contribution":"Contribution","Contribution (points)":"Contribution (points)","Contribution to your return":"Contribution à votre rendement","Costs / tax":"Frais / taxes","Costs included":"Frais inclus","Costs excluded":"Frais exclus","Costs:":"Frais :","Currency":"Devise","Current age":"Âge actuel","Current value of what you hold, in euro. Currency is the currency the instrument is listed in. Derivatives are valued at cost.":"Valeur actuelle de ce que vous détenez, en euros. La devise est celle dans laquelle l’instrument est coté. Les produits dérivés sont valorisés au coût.","Custom period":"Période personnalisée","Dark":"Sombre","Data and settings":"Données et réglages","Date":"Date","Degiro only":"Degiro uniquement","Derivatives":"Dérivés","Dividend":"Dividende","Dividends":"Dividendes","Dividends, net":"Dividendes, nets","ETFs":"ETF","Email":"E-mail","Expected annual return (%)":"Rendement annuel attendu (%)","Expected return (%)":"Rendement attendu (%)","Fees, interest, other":"Frais, intérêts, autres","Forecast":"Prévision","Free":"Gratuit","Future value":"Valeur future","Gain":"Gain","Gain / loss":"Gain / perte","Gross":"Brut","Gross, on current value of holdings":"Brut, sur la valeur actuelle des positions","Gross, on what you paid":"Brut, sur ce que vous avez payé","Growth":"Croissance","Hide amounts":"Masquer les montants","Show amounts":"Afficher les montants","Holdings":"Positions détenues","Holdings only, cash not included":"Positions uniquement, liquidités non incluses","Holdings only, cash not included. Net invested is cumulative since your first trade; over the full period, the gap between the lines is your profit.":"Positions uniquement, liquidités non incluses. Le net investi est cumulé depuis votre première opération ; sur toute la période, l’écart entre les lignes est votre profit.","Holdings only, cash not included. The gap between the lines is your profit.":"Positions uniquement, liquidités non incluses. L’écart entre les lignes est votre profit.","In this browser":"Dans ce navigateur","Index":"Indice","Inflation (%)":"Inflation (%)","Instrument":"Instrument","Invested":"Investi","Joined":"Inscrit","Last per share":"Dernier par action","Light":"Clair","Load data and settings":"Charger les données et réglages","Load files, clear saved data":"Charger des fichiers, effacer les données","Loss":"Perte","Max":"Max","Method: time-weighted return of your invested part only (cash is not included), chained daily. Trades enter at their real price, costs can be switched on or off, non-euro holdings are converted to euro, and dividends count as reinvested in these returns (the cash received is on the Dividends tab).":"Méthode : rendement pondéré dans le temps de la partie investie uniquement (liquidités exclues), chaîné au jour le jour. Les opérations entrent à leur prix réel, les frais peuvent être inclus ou non, les positions hors euro sont converties en euros et les dividendes comptent comme réinvestis dans ces rendements (le cash reçu figure dans l’onglet Dividendes).","Mode":"Mode","Monthly":"Mensuel","Monthly contribution (€)":"Versement mensuel (€)","More":"Plus","My Portfolio":"Mon portefeuille","My performance (TWRR)":"Ma performance (TWRR)","Name":"Nom","Net":"Net","Net dividends received as a percentage of everything you ever bought of this holding.":"Dividendes nets reçus, en pourcentage de tout ce que vous avez acheté de cette position.","Net invested":"Net investi","Net received (total)":"Net reçu (total)","Newest first":"Plus récent d’abord","Oldest first":"Plus ancien d’abord","No users yet. Add a test user to see how plans and statuses will look.":"Aucun utilisateur. Ajoutez un utilisateur test pour voir les formules et statuts.","Nominal euros":"Euros nominaux","Not suspended":"Non suspendu","Notes":"Notes","Open":"Ouvertes","Open positions":"Positions ouvertes","Or paste the rows here, including the header line:":"Ou collez les lignes ici, avec la ligne d’en-tête :","Overview":"Aperçu","Paid by":"Versé par","Paid plan":"Formule payante","Payments":"Paiements","Payments per month":"Paiements par mois","Payments per year":"Paiements par an","Per calendar year, for your whole portfolio, trading costs included.":"Par année civile, pour tout votre portefeuille, frais de transaction inclus.","Per calendar year, trading costs included. Realised is profit or loss on shares you sold. Unrealised is the change in the gain or loss on shares you still hold. Idle cash is not included.":"Par année civile, frais de transaction inclus. Réalisé = profit ou perte sur les titres vendus. Latent = variation du gain ou de la perte sur les titres que vous détenez encore. Les liquidités inactives ne sont pas incluses.","Per instrument":"Par instrument","Performance":"Performance","Performance (%)":"Performance (%)","Periods shown:":"Périodes affichées :","Plan":"Formule","Planning":"Planification","Plans and access (admin)":"Formules et accès (admin)","Points of your time-weighted return that came from each holding. They add up to the return of the period.":"Points de votre rendement pondéré dans le temps provenant de chaque position. Leur somme donne le rendement de la période.","Portfolio over time":"Portefeuille dans le temps","Position":"Position","Positions":"Positions","Price":"Prix","Price now":"Cours actuel","Pro":"Pro","Profit or loss on shares you sold, as a percentage of what those sold shares cost you.":"Profit ou perte sur les titres vendus, en pourcentage de leur coût d’achat.","Projection":"Projection","Realised":"Réalisé","Realised (sales)":"Réalisé (ventes)","Realised / unrealised":"Réalisé / latent","Received":"Reçu","Retired: withdrawing":"Retraité : retraits","Retired: withdrawing, no new contributions":"Retraité : retraits, plus de versements","Retirement age":"Âge de la retraite","Retirement age and future value":"Âge de la retraite et valeur future","Return of the period":"Rendement de la période","Returns":"Rendements","Saxo":"Saxo","Saxo and Degiro combined":"Saxo et Degiro combinés","Saxo only":"Saxo uniquement","Sector":"Secteur","Sell":"Vente","Sells":"Ventes","Shares":"Actions","Show in today’s euros (inflation-adjusted)":"Afficher en euros d’aujourd’hui (ajusté de l’inflation)","Show:":"Afficher :","Sold":"Vendu","Starting capital (€)":"Capital de départ (€)","Starting capital is prefilled with your current portfolio value. The estimate assumes a constant yearly return, monthly contributions, no taxes or fees, and that retirement means your capital reaches the amount where the withdrawal rate gives your wanted income. From that moment contributions stop (there is no income left to invest) and you withdraw your target income every month, rising with inflation; the chart shows the capital running down. Real markets fluctuate; this is an illustration, not advice.":"Le capital de départ est prérempli avec la valeur actuelle de votre portefeuille. L’estimation suppose un rendement annuel constant, des versements mensuels, ni impôts ni frais, et que la retraite signifie que votre capital atteint le montant pour lequel le taux de retrait donne le revenu souhaité. À partir de là, les versements s’arrêtent et vous retirez chaque mois votre revenu cible, indexé sur l’inflation ; le graphique montre le capital qui diminue. Les marchés réels fluctuent ; ceci est une illustration, pas un conseil.","Starting capital is prefilled with your portfolio value. The estimate assumes a constant yearly return, monthly contributions, and no taxes or fees. Retirement means your capital reaches the amount where the withdrawal rate gives your wanted income.":"Le capital de départ est prérempli avec la valeur de votre portefeuille. L’estimation suppose un rendement annuel constant, des versements mensuels, ni impôts ni frais. La retraite signifie que votre capital atteint le montant pour lequel le taux de retrait donne le revenu souhaité.","Status":"Statut","Stock performance":"Performance des actions","Stocks":"Actions","Table":"Tableau","Target monthly income (today’s €)":"Revenu mensuel cible (€ d’aujourd’hui)","Target monthly income (€)":"Revenu mensuel cible (€)","Tax":"Impôt","The period follows the chart. Tap a row for all periods and CAGR. A dash means it was not held in that period. Dividends count as reinvested.":"La période suit le graphique. Touchez une ligne pour toutes les périodes et le TCAC. Un tiret signifie que la position n’était pas détenue à cette période. Les dividendes comptent comme réinvestis.","This list is stored in this browser only, so it is a placeholder. Once you add a login and a backend (for example Supabase or Firebase), this tab reads the real user table, and the plan decides what each user can open behind the paywall.":"Cette liste n’est stockée que dans ce navigateur ; c’est donc un espace réservé. Une fois une connexion et un backend ajoutés (par exemple Supabase ou Firebase), cet onglet lit la vraie table d’utilisateurs et la formule décide de ce que chacun peut ouvrir.","This list is stored in this browser only, so it is a placeholder. Once you add a login and a backend, this screen reads the real user table.":"Cette liste n’est stockée que dans ce navigateur ; c’est donc un espace réservé. Une fois une connexion et un backend ajoutés, cet écran lit la vraie table d’utilisateurs.","Time-weighted return":"Rendement pondéré dans le temps","Total":"Total","Total invested":"Total investi","Total portfolio":"Portefeuille total","Total portfolio (open positions)":"Portefeuille total (positions ouvertes)","Total profit":"Profit total","Total users":"Total des utilisateurs","Total value":"Valeur totale","Touch the chart for values by age":"Touchez le graphique pour voir les valeurs par âge","Transactions":"Transactions","Type":"Type","Type:":"Type :","Unrealised":"Latent","Unrealised plus realised plus dividends, as a percentage of everything you ever bought of this holding.":"Latent plus réalisé plus dividendes, en pourcentage de tout ce que vous avez acheté de cette position.","Unrealised, realised and dividends, after costs":"Latent, réalisé et dividendes, après frais","Users":"Utilisateurs","Value":"Valeur","Value (€)":"Valeur (€)","Value of holdings":"Valeur des positions","View":"Affichage","Wealth builder":"Simulateur de patrimoine","Weight":"Poids","Withdrawal rate (%)":"Taux de retrait (%)","World":"World","World (MSCI World)":"World (MSCI World)","World (MSCI World) (benchmark)":"World (MSCI World) (référence)","YTD":"YTD","Yearly":"Annuel","Yield on cost":"Rendement sur coût","You":"Vous","are not part of it: they have their own column (net of withholding tax) and are added in":"n’en font pas partie : elles ont leur propre colonne (nettes de retenue à la source) et sont ajoutées dans","excluded":"exclus","included":"inclus","including starting capital":"y compris le capital de départ","is profit or loss on shares you sold.":"est le profit ou la perte sur les titres vendus.","is the change during the year in the gain or loss on shares you still hold. Dividends are net of tax and only counted when switched on. The latest year runs to your last price date. Idle cash is not included.":"est la variation, pendant l’année, du gain ou de la perte sur les titres que vous détenez encore. Les dividendes sont nets d’impôt et comptés uniquement s’ils sont activés. La dernière année va jusqu’à votre dernière date de cours. Les liquidités inactives ne sont pas incluses.","is the profit or loss on shares you sold, after trading costs.":"est le profit ou la perte sur les titres vendus, après frais de transaction.","name@company.com":"nom@societe.com","no new contributions":"plus de versements","stocks":"actions","vs World":"vs World","Amounts are cash in euro: negative is money spent on a buy, positive is money received. For dividends the amount is the net cash received and the last column is the tax withheld; for trades it is trading costs including currency conversion where known.":"Les montants sont des liquidités en euros : négatif = argent dépensé pour un achat, positif = argent reçu. Pour les dividendes, le montant est le cash net reçu et la dernière colonne l’impôt retenu ; pour les opérations, ce sont les frais, conversion de devise comprise lorsqu’elle est connue.","Amounts are cash in euro: negative is money spent on a buy, positive is money received. For dividends the last figure is the tax withheld; for trades it is trading costs.":"Les montants sont des liquidités en euros : négatif = argent dépensé pour un achat, positif = argent reçu. Pour les dividendes, le dernier chiffre est l’impôt retenu ; pour les opérations, ce sont les frais.","Amounts are the cash paid or received in euro, including trading costs. The figure above each period is net invested (bought minus sold). Click a bar to see the trades behind it.":"Les montants sont le cash payé ou reçu en euros, frais inclus. Le chiffre au-dessus de chaque période est le net investi (achats moins ventes). Cliquez sur une barre pour voir les opérations.","Cash paid or received in euro, including trading costs. The figure above each period is net invested (bought minus sold).":"Cash payé ou reçu en euros, frais inclus. Le chiffre au-dessus de chaque période est le net investi (achats moins ventes).",". Amounts are in euro, use the average-cost method, and options and other derivatives are carried at cost until sold or expired. Shares are shown on today's basis, so a reverse split lowers the count. The % columns show each result relative to its base; hover the i icons in the headers for the base used.":". Les montants sont en euros, selon la méthode du coût moyen ; les options et autres dérivés sont comptés au coût jusqu’à la vente ou l’échéance. Les actions sont affichées sur la base actuelle : un regroupement d’actions réduit donc le nombre. Les colonnes % montrent chaque résultat par rapport à sa base ; survolez les icônes i des en-têtes pour voir la base.","A contribution is how many percentage points of your portfolio's time-weighted return came from one holding: its gain, weighted by how large it was in the portfolio at the time. The contributions add up to the total return of the period (small differences come from rounding and tiny contributions left out). Holdings that were bought and sold within the period are included.":"Une contribution indique combien de points de pourcentage du rendement pondéré dans le temps de votre portefeuille proviennent d’une position : son gain, pondéré par son poids dans le portefeuille à l’époque. Les contributions s’additionnent pour donner le rendement total de la période (de petits écarts viennent des arrondis et des très petites contributions omises). Les positions achetées et vendues pendant la période sont incluses.","Import your transactions":"Importez vos transactions","Where to find it":"Où le trouver","Drop your files here":"Déposez vos fichiers ici","or click to choose. We recognise which file is which.":"ou cliquez pour choisir. Nous reconnaissons chaque fichier.","Advanced: paste rows instead":"Avancé : coller les lignes à la place","Saxo transactions:":"Transactions Saxo :","Degiro transactions:":"Transactions Degiro :","Degiro account statement:":"Relevé de compte Degiro :","Coming soon":"Bientôt disponible","Your files stay in this browser.":"Vos fichiers restent dans ce navigateur.","Log in to SaxoTraderGO or SaxoInvestor and open <b>Accounts → Reports</b> (menu names can differ slightly per Saxo version).":"Connectez-vous à SaxoTraderGO ou SaxoInvestor et ouvrez <b>Comptes → Rapports</b> (les noms de menu peuvent varier légèrement selon la version de Saxo).","Choose the <b>Transactions</b> report and set the period from your <b>first trade until today</b>.":"Choisissez le rapport <b>Transactions</b> et réglez la période de votre <b>première opération à aujourd’hui</b>.","Export it as <b>Excel (.xlsx)</b> or <b>CSV</b>. The language of the export does not matter.":"Exportez-le en <b>Excel (.xlsx)</b> ou <b>CSV</b>. La langue de l’export n’a pas d’importance.","Dividends from Saxo are read from the same file.":"Les dividendes de Saxo sont lus dans le même fichier.","Log in to the Degiro website and open <b>Inbox → Account statement</b>.":"Connectez-vous au site Degiro et ouvrez <b>Boîte de réception → Relevé de compte</b>.","Pick the period from your <b>first deposit until today</b> and export it as <b>CSV</b>. CSV keeps full precision; Excel can round numbers.":"Choisissez la période de votre <b>premier dépôt à aujourd’hui</b> et exportez en <b>CSV</b>. Le CSV garde toute la précision ; Excel peut arrondir les nombres.","Also export <b>Inbox → Transactions</b> for the same period. Drop both files here: the Account statement gives dividends, costs and interest, the Transactions file gives exact trade prices and currency rates.":"Exportez aussi <b>Boîte de réception → Transactions</b> pour la même période. Déposez les deux fichiers ici : le relevé de compte donne dividendes, frais et intérêts, le fichier Transactions donne les prix exacts et les taux de change.","Saxo transactions":"Transactions Saxo","Degiro transactions":"Transactions Degiro","Degiro account statement":"Relevé de compte Degiro","Add the Degiro Transactions file too: trades cannot be built from the Account statement alone.":"Ajoutez aussi le fichier Transactions de Degiro : les opérations ne peuvent pas être reconstituées avec le seul relevé de compte.","Add the Degiro Account statement too to include dividends, costs and interest.":"Ajoutez aussi le relevé de compte Degiro pour inclure dividendes, frais et intérêts.","This file was not recognised. Check that it is a Saxo transactions report or a Degiro export.":"Ce fichier n’a pas été reconnu. Vérifiez qu’il s’agit d’un rapport de transactions Saxo ou d’un export Degiro.","Language":"Langue","€ (EUR)":"€ (EUR)","Local currency":"Devise locale","Local":"Locale","Incl. costs":"Frais incl.","Excl.":"Hors frais","Local currency shows prices, averages and results of each position in the currency it trades in. Portfolio totals stay in €.":"La devise locale affiche cours, moyennes et résultats de chaque position dans sa devise de cotation. Les totaux du portefeuille restent en €.","Each position is shown in the currency it trades in. Totals stay in €.":"Chaque position est affichée dans sa devise de cotation. Les totaux restent en €.","Hold and drag over the chart to measure a period.":"Maintenez puis faites glisser sur le graphique pour mesurer une période.","Drag across the chart to measure a period.":"Faites glisser sur le graphique pour mesurer une période.","Hover over the chart, or touch and drag on a phone, to see the values. Drag across the chart (hold and drag on a phone) to measure a period.":"Survolez le graphique, ou touchez et faites glisser sur mobile, pour voir les valeurs. Faites glisser sur le graphique (maintenez puis glissez sur mobile) pour mesurer une période.","Hover over the chart, or touch and drag on a phone, to see the values.":"Survolez le graphique, ou touchez et faites glisser sur mobile, pour voir les valeurs.","pts vs":"pts vs","Transaction tax":"Taxe sur les transactions","Connection fees":"Frais de connexion","Account fees":"Frais de compte","Account interest":"Intérêts du compte","Show more":"Afficher plus","total":"total","Costs":"Frais","Dividend yield (12M)":"Rendement du dividende (12 m)","Net received (12M)":"Net reçu (12 m)","Net dividends":"Dividendes nets","Last 12 months":"12 derniers mois","No positions in this selection.":"Aucune position dans cette sélection.","No transactions in this selection.":"Aucune transaction dans cette sélection.","Not enough data for this period.":"Pas assez de données pour cette période.","No portfolio loaded":"Aucun portefeuille chargé","Load data":"Charger les données","Loading your portfolio…":"Chargement de votre portefeuille…","Load your Saxo or Degiro export to get started. The data stays in this browser.":"Chargez votre export Saxo ou Degiro pour commencer. Les données restent dans ce navigateur.","Compare with":"Comparer avec","Other…":"Autre…","Remove":"Supprimer","Suspended":"Suspendu","Roll":"Roll","Fee":"Frais","Interest":"Intérêts","Included":"Inclus","Excluded":"Exclus","Currency:":"Devise :"},"nl":{"Log in to <a href=\"https://www.saxoinvestor.be/login\" target=\"_blank\" rel=\"noopener\">Saxo</a>.":"Log in bij <a href=\"https://www.saxoinvestor.be/login\" target=\"_blank\" rel=\"noopener\">Saxo</a>.","Go to <b>“All accounts”</b> and select the <b>“Transactions”</b> tab.":"Ga naar <b>“Alle rekeningen”</b> en selecteer het tabblad <b>“Transacties”</b>.","Select the <b>“All time”</b> view.":"Selecteer de weergave <b>“Alle tijd”</b>.","Click the <b>“Export”</b> button, select <b>“Include details”</b> and click on <b>“Excel”</b>.":"Klik op de knop <b>“Exporteren”</b>, selecteer <b>“Details opnemen”</b> en klik op <b>“Excel”</b>.","Import the downloaded Excel here.":"Importeer het gedownloade Excel-bestand hier.","Select your country and log in at <a href=\"https://www.degiro.com/\" target=\"_blank\" rel=\"noopener\">Degiro</a>.":"Selecteer je land en log in bij <a href=\"https://www.degiro.com/\" target=\"_blank\" rel=\"noopener\">Degiro</a>.","Go to <b>“Inbox”</b>.":"Ga naar <b>“Postvak”</b>.","Select the <b>“Account Statement”</b> tab and pick the period from or before your first deposit until today. Click the download button to export it as a CSV. It contains your trades, dividends, costs and interest.":"Selecteer het tabblad <b>“Rekeningoverzicht”</b> en kies de periode vanaf (of vóór) je eerste storting tot vandaag. Klik op de downloadknop om het als CSV te exporteren. Het bevat je transacties, dividenden, kosten en rente.","(Optional) Select the <b>“Transactions”</b> tab and pick the period from or before your first deposit until today. Click the download button to export it as a CSV. It provides more accurate data for the exchange of each trade.":"(Optioneel) Selecteer het tabblad <b>“Transacties”</b> en kies de periode vanaf (of vóór) je eerste storting tot vandaag. Klik op de downloadknop om het als CSV te exporteren. Het geeft nauwkeurigere gegevens over de beurs van elke transactie.","Costs included":"Kosten inbegrepen","Costs excluded":"Kosten uitgesloten","Remove":"Verwijderen","Saved data":"Opgeslagen gegevens","No trades found in this statement. Check that the period starts at your first deposit.":"Geen transacties gevonden in dit overzicht. Controleer of de periode start bij je eerste storting.","Pick the period from your <b>first deposit until today</b> and export it as <b>CSV</b> (or Excel). CSV keeps full precision. The language of the export does not matter.":"Kies de periode van je <b>eerste storting tot vandaag</b> en exporteer als <b>CSV</b> (of Excel). CSV behoudt alle precisie. De taal van de export maakt niet uit.","Drop that one file here: it contains your trades, dividends, costs and interest.":"Sleep dit ene bestand hierheen: het bevat je transacties, dividenden, kosten en rente.","The separate Transactions file is optional; it only adds the exchange of each trade.":"Het aparte Transactiebestand is optioneel; het voegt enkel de beurs van elke transactie toe.","% dividends":"% dividenden","% realised":"% gerealiseerd","% total":"% totaal","% unrealised":"% niet-gerealiseerd","Active":"Actief","Activity":"Activiteit","Add user":"Gebruiker toevoegen","Admin":"Beheer","Against World (MSCI World)":"Tegenover World (MSCI World)","All":"Alles","All positions":"Alle posities","All time":"Sinds begin","All types":"Alle types","Allocation":"Verdeling","Amount":"Bedrag","Analysis":"Analyse","Annual contribution increase (%)":"Jaarlijkse verhoging van de inleg (%)","Annual increase (%)":"Jaarlijkse verhoging (%)","Annual inflation (%)":"Jaarlijkse inflatie (%)","Appearance":"Weergave","Assumptions":"Aannames","Avg buy":"Gem. aankoop","Basic access":"Basistoegang","Basis:":"Basis:","Beta":"Bèta","Bought":"Gekocht","Bought & sold":"Gekocht en verkocht","Broker":"Broker","Buy":"Aankoop","Buys":"Aankopen","CAGR":"CAGR","CAGR (all)":"CAGR (totaal)","Calculate":"Berekenen","Capital needed":"Benodigd kapitaal","Chart":"Grafiek","Clear saved data":"Opgeslagen gegevens wissen","Close":"Sluiten","Closed":"Gesloten","Closed positions":"Gesloten posities","Collapse sidebar":"Menu inklappen","Comparison":"Vergelijking","Comparison index":"Vergelijkingsindex","Contribution":"Bijdrage","Contribution (points)":"Bijdrage (punten)","Contribution to your return":"Bijdrage aan uw rendement","Costs / tax":"Kosten / belasting","Costs included":"Kosten inbegrepen","Costs excluded":"Kosten niet inbegrepen","Costs:":"Kosten:","Currency":"Valuta","Current age":"Huidige leeftijd","Current value of what you hold, in euro. Currency is the currency the instrument is listed in. Derivatives are valued at cost.":"Huidige waarde van wat u bezit, in euro. Valuta is de valuta waarin het instrument noteert. Derivaten worden tegen kostprijs gewaardeerd.","Custom period":"Eigen periode","Dark":"Donker","Data and settings":"Gegevens en instellingen","Date":"Datum","Degiro only":"Alleen Degiro","Derivatives":"Derivaten","Dividend":"Dividend","Dividends":"Dividenden","Dividends, net":"Dividenden, netto","ETFs":"ETF’s","Email":"E-mail","Expected annual return (%)":"Verwacht jaarlijks rendement (%)","Expected return (%)":"Verwacht rendement (%)","Fees, interest, other":"Kosten, rente, overig","Forecast":"Prognose","Free":"Gratis","Future value":"Toekomstige waarde","Gain":"Winst","Gain / loss":"Winst / verlies","Gross":"Bruto","Gross, on current value of holdings":"Bruto, op de huidige waarde van uw posities","Gross, on what you paid":"Bruto, op wat u betaalde","Growth":"Groei","Hide amounts":"Bedragen verbergen","Show amounts":"Bedragen tonen","Holdings":"Posities","Holdings only, cash not included":"Alleen posities, cash niet inbegrepen","Holdings only, cash not included. Net invested is cumulative since your first trade; over the full period, the gap between the lines is your profit.":"Alleen posities, cash niet inbegrepen. Netto belegd is cumulatief sinds uw eerste transactie; over de volledige periode is het verschil tussen de lijnen uw winst.","Holdings only, cash not included. The gap between the lines is your profit.":"Alleen posities, cash niet inbegrepen. Het verschil tussen de lijnen is uw winst.","In this browser":"In deze browser","Index":"Index","Inflation (%)":"Inflatie (%)","Instrument":"Instrument","Invested":"Belegd","Joined":"Aangemeld","Last per share":"Laatste per aandeel","Light":"Licht","Load data and settings":"Gegevens en instellingen laden","Load files, clear saved data":"Bestanden laden, opgeslagen gegevens wissen","Loss":"Verlies","Max":"Max","Method: time-weighted return of your invested part only (cash is not included), chained daily. Trades enter at their real price, costs can be switched on or off, non-euro holdings are converted to euro, and dividends count as reinvested in these returns (the cash received is on the Dividends tab).":"Methode: tijdgewogen rendement van enkel uw belegde deel (zonder cash), dagelijks aaneengeschakeld. Transacties komen binnen aan hun werkelijke prijs, kosten kunnen aan of uit, posities in andere valuta’s worden naar euro omgerekend en dividenden tellen als herbelegd in deze rendementen (het ontvangen geld staat op het tabblad Dividenden).","Mode":"Modus","Monthly":"Maandelijks","Monthly contribution (€)":"Maandelijkse inleg (€)","More":"Meer","My Portfolio":"Mijn portefeuille","My performance (TWRR)":"Mijn prestatie (TWRR)","Name":"Naam","Net":"Netto","Net dividends received as a percentage of everything you ever bought of this holding.":"Ontvangen nettodividenden als percentage van alles wat u ooit van deze positie kocht.","Net invested":"Netto belegd","Net received (total)":"Netto ontvangen (totaal)","Newest first":"Nieuwste eerst","Oldest first":"Oudste eerst","No users yet. Add a test user to see how plans and statuses will look.":"Nog geen gebruikers. Voeg een testgebruiker toe om te zien hoe plannen en statussen eruitzien.","Nominal euros":"Nominale euro’s","Not suspended":"Niet geschorst","Notes":"Opmerkingen","Open":"Open","Open positions":"Open posities","Or paste the rows here, including the header line:":"Of plak de rijen hier, inclusief de koprij:","Overview":"Overzicht","Paid by":"Betaald door","Paid plan":"Betaald plan","Payments":"Betalingen","Payments per month":"Betalingen per maand","Payments per year":"Betalingen per jaar","Per calendar year, for your whole portfolio, trading costs included.":"Per kalenderjaar, voor uw hele portefeuille, transactiekosten inbegrepen.","Per calendar year, trading costs included. Realised is profit or loss on shares you sold. Unrealised is the change in the gain or loss on shares you still hold. Idle cash is not included.":"Per kalenderjaar, transactiekosten inbegrepen. Gerealiseerd is winst of verlies op verkochte aandelen. Niet-gerealiseerd is de wijziging van winst of verlies op aandelen die u nog bezit. Niet-geïnvesteerd cash is niet inbegrepen.","Per instrument":"Per instrument","Performance":"Prestatie","Performance (%)":"Prestatie (%)","Periods shown:":"Getoonde periodes:","Plan":"Plan","Planning":"Planning","Plans and access (admin)":"Plannen en toegang (beheer)","Points of your time-weighted return that came from each holding. They add up to the return of the period.":"Punten van uw tijdgewogen rendement die van elke positie kwamen. Samen vormen ze het rendement van de periode.","Portfolio over time":"Portefeuille in de tijd","Position":"Positie","Positions":"Posities","Price":"Koers","Price now":"Koers nu","Pro":"Pro","Profit or loss on shares you sold, as a percentage of what those sold shares cost you.":"Winst of verlies op verkochte aandelen, als percentage van wat die aandelen u kostten.","Projection":"Projectie","Realised":"Gerealiseerd","Realised (sales)":"Gerealiseerd (verkopen)","Realised / unrealised":"Gerealiseerd / niet-gerealiseerd","Received":"Ontvangen","Retired: withdrawing":"Gepensioneerd: opnemen","Retired: withdrawing, no new contributions":"Gepensioneerd: opnemen, geen nieuwe inleg","Retirement age":"Pensioenleeftijd","Retirement age and future value":"Pensioenleeftijd en toekomstige waarde","Return of the period":"Rendement van de periode","Returns":"Rendement","Saxo":"Saxo","Saxo and Degiro combined":"Saxo en Degiro samen","Saxo only":"Alleen Saxo","Sector":"Sector","Sell":"Verkoop","Sells":"Verkopen","Shares":"Aandelen","Show in today’s euros (inflation-adjusted)":"Tonen in euro’s van vandaag (inflatiegecorrigeerd)","Show:":"Tonen:","Sold":"Verkocht","Starting capital (€)":"Startkapitaal (€)","Starting capital is prefilled with your current portfolio value. The estimate assumes a constant yearly return, monthly contributions, no taxes or fees, and that retirement means your capital reaches the amount where the withdrawal rate gives your wanted income. From that moment contributions stop (there is no income left to invest) and you withdraw your target income every month, rising with inflation; the chart shows the capital running down. Real markets fluctuate; this is an illustration, not advice.":"Het startkapitaal is vooraf ingevuld met de huidige waarde van uw portefeuille. De raming veronderstelt een constant jaarrendement, maandelijkse inleg, geen belastingen of kosten, en dat pensioen betekent dat uw kapitaal het bedrag bereikt waarbij het opnamepercentage uw gewenste inkomen geeft. Vanaf dat moment stopt de inleg en neemt u elke maand uw doelinkomen op, meestijgend met de inflatie; de grafiek toont het slinkende kapitaal. Echte markten schommelen; dit is een illustratie, geen advies.","Starting capital is prefilled with your portfolio value. The estimate assumes a constant yearly return, monthly contributions, and no taxes or fees. Retirement means your capital reaches the amount where the withdrawal rate gives your wanted income.":"Het startkapitaal is vooraf ingevuld met de waarde van uw portefeuille. De raming veronderstelt een constant jaarrendement, maandelijkse inleg en geen belastingen of kosten. Pensioen betekent dat uw kapitaal het bedrag bereikt waarbij het opnamepercentage uw gewenste inkomen geeft.","Status":"Status","Stock performance":"Aandelenprestatie","Stocks":"Aandelen","Table":"Tabel","Target monthly income (today’s €)":"Doelinkomen per maand (€ van vandaag)","Target monthly income (€)":"Doelinkomen per maand (€)","Tax":"Belasting","The period follows the chart. Tap a row for all periods and CAGR. A dash means it was not held in that period. Dividends count as reinvested.":"De periode volgt de grafiek. Tik op een rij voor alle periodes en CAGR. Een streepje betekent dat de positie in die periode niet werd aangehouden. Dividenden tellen als herbelegd.","This list is stored in this browser only, so it is a placeholder. Once you add a login and a backend (for example Supabase or Firebase), this tab reads the real user table, and the plan decides what each user can open behind the paywall.":"Deze lijst wordt enkel in deze browser bewaard en is dus een tijdelijke invulling. Zodra u een login en backend toevoegt (bijvoorbeeld Supabase of Firebase), leest dit tabblad de echte gebruikerstabel en bepaalt het plan wat elke gebruiker kan openen.","This list is stored in this browser only, so it is a placeholder. Once you add a login and a backend, this screen reads the real user table.":"Deze lijst wordt enkel in deze browser bewaard en is dus een tijdelijke invulling. Zodra u een login en backend toevoegt, leest dit scherm de echte gebruikerstabel.","Time-weighted return":"Tijdgewogen rendement","Total":"Totaal","Total invested":"Totaal belegd","Total portfolio":"Totale portefeuille","Total portfolio (open positions)":"Totale portefeuille (open posities)","Total profit":"Totale winst","Total users":"Totaal gebruikers","Total value":"Totale waarde","Touch the chart for values by age":"Raak de grafiek aan voor waarden per leeftijd","Transactions":"Transacties","Type":"Type","Type:":"Type:","Unrealised":"Niet-gerealiseerd","Unrealised plus realised plus dividends, as a percentage of everything you ever bought of this holding.":"Niet-gerealiseerd plus gerealiseerd plus dividenden, als percentage van alles wat u ooit van deze positie kocht.","Unrealised, realised and dividends, after costs":"Niet-gerealiseerd, gerealiseerd en dividenden, na kosten","Users":"Gebruikers","Value":"Waarde","Value (€)":"Waarde (€)","Value of holdings":"Waarde van posities","View":"Weergave","Wealth builder":"Vermogensplanner","Weight":"Gewicht","Withdrawal rate (%)":"Opnamepercentage (%)","World":"World","World (MSCI World)":"World (MSCI World)","World (MSCI World) (benchmark)":"World (MSCI World) (benchmark)","YTD":"YTD","Yearly":"Jaarlijks","Yield on cost":"Rendement op kostprijs","You":"U","are not part of it: they have their own column (net of withholding tax) and are added in":"maken er geen deel van uit: ze hebben hun eigen kolom (netto na bronbelasting) en worden toegevoegd in","excluded":"niet inbegrepen","included":"inbegrepen","including starting capital":"inclusief startkapitaal","is profit or loss on shares you sold.":"is winst of verlies op verkochte aandelen.","is the change during the year in the gain or loss on shares you still hold. Dividends are net of tax and only counted when switched on. The latest year runs to your last price date. Idle cash is not included.":"is de wijziging tijdens het jaar van de winst of het verlies op aandelen die u nog bezit. Dividenden zijn netto na belasting en tellen enkel mee als ze aanstaan. Het laatste jaar loopt tot uw laatste koersdatum. Niet-geïnvesteerd cash is niet inbegrepen.","is the profit or loss on shares you sold, after trading costs.":"is de winst of het verlies op verkochte aandelen, na transactiekosten.","name@company.com":"naam@bedrijf.com","no new contributions":"geen nieuwe inleg","stocks":"aandelen","vs World":"t.o.v. World","Amounts are cash in euro: negative is money spent on a buy, positive is money received. For dividends the amount is the net cash received and the last column is the tax withheld; for trades it is trading costs including currency conversion where known.":"Bedragen zijn cash in euro: negatief is geld uitgegeven aan een aankoop, positief is ontvangen geld. Bij dividenden is het bedrag het netto ontvangen cash en de laatste kolom de ingehouden belasting; bij transacties zijn het de kosten, inclusief valutaomrekening waar bekend.","Amounts are cash in euro: negative is money spent on a buy, positive is money received. For dividends the last figure is the tax withheld; for trades it is trading costs.":"Bedragen zijn cash in euro: negatief is geld uitgegeven aan een aankoop, positief is ontvangen geld. Bij dividenden is het laatste cijfer de ingehouden belasting; bij transacties zijn het de kosten.","Amounts are the cash paid or received in euro, including trading costs. The figure above each period is net invested (bought minus sold). Click a bar to see the trades behind it.":"Bedragen zijn het betaalde of ontvangen cash in euro, kosten inbegrepen. Het cijfer boven elke periode is netto belegd (gekocht min verkocht). Klik op een balk om de transacties te zien.","Cash paid or received in euro, including trading costs. The figure above each period is net invested (bought minus sold).":"Betaald of ontvangen cash in euro, kosten inbegrepen. Het cijfer boven elke periode is netto belegd (gekocht min verkocht).",". Amounts are in euro, use the average-cost method, and options and other derivatives are carried at cost until sold or expired. Shares are shown on today's basis, so a reverse split lowers the count. The % columns show each result relative to its base; hover the i icons in the headers for the base used.":". Bedragen zijn in euro, volgens de gemiddelde-kostprijsmethode; opties en andere derivaten staan tegen kostprijs tot verkoop of vervaldag. Aandelen worden getoond op basis van vandaag, dus een omgekeerde split verlaagt het aantal. De %-kolommen tonen elk resultaat ten opzichte van zijn basis; houd de muis boven de i-icoontjes in de koppen voor de gebruikte basis.","A contribution is how many percentage points of your portfolio's time-weighted return came from one holding: its gain, weighted by how large it was in the portfolio at the time. The contributions add up to the total return of the period (small differences come from rounding and tiny contributions left out). Holdings that were bought and sold within the period are included.":"Een bijdrage geeft aan hoeveel procentpunten van het tijdgewogen rendement van uw portefeuille van één positie kwamen: haar winst, gewogen naar hoe groot ze toen in de portefeuille was. De bijdragen tellen op tot het totale rendement van de periode (kleine verschillen komen door afronding en weggelaten minieme bijdragen). Posities die in de periode werden gekocht en verkocht zijn inbegrepen.","Import your transactions":"Importeer uw transacties","Where to find it":"Waar vindt u het","Drop your files here":"Sleep uw bestanden hierheen","or click to choose. We recognise which file is which.":"of klik om te kiezen. We herkennen welk bestand welk is.","Advanced: paste rows instead":"Geavanceerd: plak in plaats daarvan de rijen","Saxo transactions:":"Saxo-transacties:","Degiro transactions:":"Degiro-transacties:","Degiro account statement:":"Degiro-rekeningoverzicht:","Coming soon":"Binnenkort","Your files stay in this browser.":"Uw bestanden blijven in deze browser.","Log in to SaxoTraderGO or SaxoInvestor and open <b>Accounts → Reports</b> (menu names can differ slightly per Saxo version).":"Meld u aan bij SaxoTraderGO of SaxoInvestor en open <b>Rekeningen → Rapporten</b> (menunamen kunnen per Saxo-versie licht verschillen).","Choose the <b>Transactions</b> report and set the period from your <b>first trade until today</b>.":"Kies het rapport <b>Transacties</b> en stel de periode in vanaf uw <b>eerste transactie tot vandaag</b>.","Export it as <b>Excel (.xlsx)</b> or <b>CSV</b>. The language of the export does not matter.":"Exporteer het als <b>Excel (.xlsx)</b> of <b>CSV</b>. De taal van de export maakt niet uit.","Dividends from Saxo are read from the same file.":"Dividenden van Saxo worden uit hetzelfde bestand gelezen.","Log in to the Degiro website and open <b>Inbox → Account statement</b>.":"Meld u aan op de Degiro-website en open <b>Postvak → Rekeningoverzicht</b>.","Pick the period from your <b>first deposit until today</b> and export it as <b>CSV</b>. CSV keeps full precision; Excel can round numbers.":"Kies de periode vanaf uw <b>eerste storting tot vandaag</b> en exporteer als <b>CSV</b>. CSV behoudt de volledige precisie; Excel kan getallen afronden.","Also export <b>Inbox → Transactions</b> for the same period. Drop both files here: the Account statement gives dividends, costs and interest, the Transactions file gives exact trade prices and currency rates.":"Exporteer ook <b>Postvak → Transacties</b> voor dezelfde periode. Sleep beide bestanden hierheen: het rekeningoverzicht geeft dividenden, kosten en rente, het transactiebestand geeft exacte koersen en wisselkoersen.","Saxo transactions":"Saxo-transacties","Degiro transactions":"Degiro-transacties","Degiro account statement":"Degiro-rekeningoverzicht","Add the Degiro Transactions file too: trades cannot be built from the Account statement alone.":"Voeg ook het Degiro-transactiebestand toe: transacties kunnen niet enkel uit het rekeningoverzicht worden opgebouwd.","Add the Degiro Account statement too to include dividends, costs and interest.":"Voeg ook het Degiro-rekeningoverzicht toe voor dividenden, kosten en rente.","This file was not recognised. Check that it is a Saxo transactions report or a Degiro export.":"Dit bestand werd niet herkend. Controleer of het een Saxo-transactierapport of een Degiro-export is.","Language":"Taal","€ (EUR)":"€ (EUR)","Local currency":"Lokale valuta","Local":"Lokaal","Incl. costs":"Incl. kosten","Excl.":"Excl.","Local currency shows prices, averages and results of each position in the currency it trades in. Portfolio totals stay in €.":"Lokale valuta toont koersen, gemiddelden en resultaten van elke positie in de valuta waarin ze noteert. Portefeuilletotalen blijven in €.","Each position is shown in the currency it trades in. Totals stay in €.":"Elke positie wordt getoond in de valuta waarin ze noteert. Totalen blijven in €.","Hold and drag over the chart to measure a period.":"Houd ingedrukt en sleep over de grafiek om een periode te meten.","Drag across the chart to measure a period.":"Sleep over de grafiek om een periode te meten.","Hover over the chart, or touch and drag on a phone, to see the values. Drag across the chart (hold and drag on a phone) to measure a period.":"Beweeg over de grafiek, of raak aan en sleep op een telefoon, om de waarden te zien. Sleep over de grafiek (houd ingedrukt en sleep op een telefoon) om een periode te meten.","Hover over the chart, or touch and drag on a phone, to see the values.":"Beweeg over de grafiek, of raak aan en sleep op een telefoon, om de waarden te zien.","pts vs":"pt t.o.v.","Transaction tax":"Beurstaks","Connection fees":"Aansluitingskosten","Account fees":"Rekeningkosten","Account interest":"Rente op rekening","Show more":"Meer tonen","total":"totaal","Costs":"Kosten","Dividend yield (12M)":"Dividendrendement (12 m)","Net received (12M)":"Netto ontvangen (12 m)","Net dividends":"Nettodividenden","Last 12 months":"Laatste 12 maanden","No positions in this selection.":"Geen posities in deze selectie.","No transactions in this selection.":"Geen transacties in deze selectie.","Not enough data for this period.":"Onvoldoende gegevens voor deze periode.","No portfolio loaded":"Geen portefeuille geladen","Load data":"Gegevens laden","Loading your portfolio…":"Uw portefeuille wordt geladen…","Load your Saxo or Degiro export to get started. The data stays in this browser.":"Laad uw Saxo- of Degiro-export om te beginnen. De gegevens blijven in deze browser.","Compare with":"Vergelijk met","Other…":"Andere…","Remove":"Verwijderen","Suspended":"Geschorst","Roll":"Roll","Fee":"Kosten","Interest":"Rente","Included":"Inbegrepen","Excluded":"Niet inbegrepen","Currency:":"Valuta:"}};
var LANG=ls.get("lang")||(/^nl/i.test(navigator.language||"")?"nl":/^fr/i.test(navigator.language||"")?"fr":"en"),LOC=ls.get("loc")==="1",TUSED=false,TBUSY=false,TMAP=new WeakMap();
const MEN=["January","February","March","April","May","June","July","August","September","October","November","December"],MAB=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MLF={fr:["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],nl:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"]};
const MLA={fr:["jan","fév","mar","avr","mai","juin","juil","août","sep","oct","nov","déc"],nl:["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"]};
const TPAT=[
[/^(\d[\d,]*) transactions?$/,(m,L)=>m[1]+(L==="fr"?" transactions":" transacties")],
[/^(\d+) payments?$/,(m,L)=>L==="fr"?m[1]+" paiement"+(m[1]==1?"":"s"):m[1]+" betaling"+(m[1]==1?"":"en")],
[/^(\d[\d.,]*) shares?$/,(m,L)=>m[1]+(L==="fr"?" actions":" aandelen")],
[/^(\d[\d.,]*) contracts?$/,(m,L)=>m[1]+(L==="fr"?" contrats":" contracten")],
[/^last (.+)\/sh$/,(m,L)=>(L==="fr"?"dernier ":"laatste ")+m[1]+(L==="fr"?"/action":"/aandeel")],
[/^since (\w{3}) (\d{4})$/,(m,L)=>(L==="fr"?"depuis ":"sinds ")+m[1]+" "+m[2]],
[/^CAGR (.+)$/,(m,L)=>(L==="fr"?"TCAC ":"CAGR ")+m[1]],
[/^vs (.+)$/,(m,L)=>(L==="fr"?"vs ":"t.o.v. ")+trRaw(m[1])],
[/^corr\. (.+)$/,(m,L)=>"corr. "+m[1]],
[/^volatility (.+)$/,(m,L)=>(L==="fr"?"volatilité ":"volatiliteit ")+m[1]],
[/^Show more \((\d+) left\)$/,(m,L)=>L==="fr"?"Afficher plus ("+m[1]+" restants)":"Meer tonen ("+m[1]+" resterend)"],
[/^(\d+) trades?$/,(m,L)=>m[1]+(L==="fr"?" opérations":" transacties")],
[/^(\d+) currenc(?:y|ies)$/,(m,L)=>m[1]+(L==="fr"?" devises":" valuta’s")],
[/^([\d,]+) rows?$/,(m,L)=>m[1]+(L==="fr"?" lignes":" rijen")],
[/^(\d+) dividends?$/,(m,L)=>m[1]+(L==="fr"?" dividendes":" dividenden")],
[/^(\d+) days?$/,(m,L)=>m[1]+(L==="fr"?" jours":" dagen")],
[/^(.+) pts vs (.+)$/,(m,L)=>m[1]+(L==="fr"?" pts vs ":" pt t.o.v. ")+trRaw(m[2])],
[/^Done\. (\d+) trades, (.+) to (.+?)\.( Dividend payments found: (\d+)\.)?$/,(m,L)=>(L==="fr"?"Terminé. "+m[1]+" opérations, du "+m[2]+" au "+m[3]+".":"Klaar. "+m[1]+" transacties, van "+m[2]+" tot "+m[3]+".")+(m[5]?(L==="fr"?" Paiements de dividendes trouvés : ":" Dividendbetalingen gevonden: ")+m[5]+".":"")]
];
function trPat(c){for(const p of TPAT){const m=c.match(p[0]);if(m)return p[1](m,LANG)}return c}
function trRaw(c){const D=I18N[LANG]||{};if(D[c]!==undefined)return D[c];const parts=c.split(" · ");if(parts.length>1)return parts.map(trRaw).join(" · ");return trPat(c)}
function monLoc(s){
if(LANG==="en")return s;
return s.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g,m=>MLF[LANG][MEN.indexOf(m)]).replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g,m=>MLA[LANG][MAB.indexOf(m)]);
}
function numLoc(s){
if(LANG==="en")return s;
const ts=LANG==="nl"?".":"\u202f";
return s.replace(/\d[\d,]*(?:\.\d+)?/g,(m,off,str)=>{
if(off>0&&/[\w.,]/.test(str[off-1]))return m;
if(!/^(\d{1,3}(,\d{3})+(\.\d+)?|\d+\.\d+)$/.test(m))return m;
const i=m.indexOf("."),a=i<0?m:m.slice(0,i),b=i<0?"":m.slice(i+1);
return a.replace(/,/g,ts)+(i<0?"":","+b);
});
}
function trStr(en){
if(LANG==="en")return en;
const m=en.match(/^(\s*)([\s\S]*?)(\s*)$/);if(!m[2])return en;
return m[1]+numLoc(monLoc(trRaw(m[2])))+m[3];
}
const T_=s=>LANG==="en"?s:((I18N[LANG]||{})[s]||s);
const TSKIP=/^(SCRIPT|STYLE|TEXTAREA|INPUT|CODE)$/,TATTR=["data-tip","title","placeholder","aria-label"];
function trText(n){
const t=n.nodeValue,rec=TMAP.get(n),en=rec&&rec.tr===t?rec.en:t,tr=trStr(en);
if(tr!==t)n.nodeValue=tr;
if(tr!==en||rec)TMAP.set(n,{en:en,tr:tr});
}
function trEl(e){
for(const a of TATTR){const v=e.getAttribute&&e.getAttribute(a);if(!v)continue;const o=e.__tr=e.__tr||{},rec=o[a],en=rec&&rec.tr===v?rec.en:v,tr=trStr(en);if(tr!==v)e.setAttribute(a,tr);if(tr!==en||rec)o[a]={en:en,tr:tr}}
}
function trNode(root){
if(!root)return;
if(root.nodeType===3){trText(root);return}
if(root.nodeType!==1||TSKIP.test(root.tagName))return;
trEl(root);
const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,{acceptNode:n=>n.nodeType===1&&TSKIP.test(n.tagName)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
let n;while(n=w.nextNode()){if(n.nodeType===3)trText(n);else trEl(n)}
}
const TMO=new MutationObserver(recs=>{
if(TBUSY||!TUSED)return;TBUSY=true;
try{recs.forEach(r=>{if(r.type==="characterData")trText(r.target);else r.addedNodes.forEach(trNode)})}finally{TMO.takeRecords();TBUSY=false}
});
TMO.observe(document.body,{childList:true,subtree:true,characterData:true});
function syncPrefs(){
document.querySelectorAll("#langs button").forEach(b=>b.classList.toggle("on",b.getAttribute("data-lang")===LANG));
document.querySelectorAll("#curs button").forEach(b=>b.classList.toggle("on",(b.getAttribute("data-loc")==="1")===LOC));
}
function repaint(){if(typeof window.mRefresh==="function")window.mRefresh();else if(rows.length&&G.syms)render(G.syms,[],G.warn);renderGuide()}
function setLang(l){
LANG=l;ls.set("lang",l);document.documentElement.lang=l;if(l!=="en")TUSED=true;
TBUSY=true;try{trNode(document.body)}finally{TMO.takeRecords();TBUSY=false}
syncPrefs();repaint();
}
function setLoc(v){LOC=!!v;ls.set("loc",LOC?"1":"0");syncPrefs();repaint()}
document.addEventListener("click",e=>{
const b=e.target.closest&&e.target.closest("#langs button,#curs button");if(!b)return;
if(b.hasAttribute("data-lang"))setLang(b.getAttribute("data-lang"));else setLoc(b.getAttribute("data-loc")==="1");
});

/* ---- local currency of each position (prices, averages and results in the currency it trades in) ---- */
const LSYM={USD:"$",GBP:"£",GBp:"p ",GBX:"p ",JPY:"¥",CHF:"CHF ",DKK:"kr ",SEK:"kr ",NOK:"kr ",CAD:"C$",AUD:"A$",HKD:"HK$",PLN:"zł ",CZK:"Kč ",EUR:"€"};
const lcs=c=>LSYM[c]!==undefined?LSYM[c]:c+" ";
const lc0=(v,c)=>HIDE?lcs(c)+"\u2022\u2022\u2022":(v<0?"-":"")+lcs(c)+Math.abs(v).toLocaleString("en-US",{maximumFractionDigits:0});
const lc2=(v,c)=>lcs(c)+f2(v);
const lcsg=(v,c)=>(v>0?"+":"")+lc0(v,c);
const pcsL=(v,b,c)=>{const k=v>=0?"pos":"neg",p=b>0.005?v/b*100:null;return '<td class="'+k+'" data-s="'+v.toFixed(2)+'">'+lcsg(v,c)+'</td><td class="'+k+' pp" data-s="'+(p==null?"":p.toFixed(2))+'">'+(p==null?"\u2013":pctf(p))+'</td>'};
function locCalc(s,list){
const x=ser[s];if(!x||!x.cur||x.cur==="EUR"||isOpt(s))return null;
const c0=x.cur,pen=c0==="GBp"||c0==="GBX",base=pen?"GBP":c0,pm=pen?100:1;
if(!FX[base])return null;
const L=days.length-1;let q=0,cost=0,real=0,bg=0,qb=0,sc=0;
for(const t of list){
const a=t.qa,buy=a>0;
let gl;
if(t.cur===c0)gl=Math.abs(t.q)*t.px;
else if(pen&&t.cur==="GBP")gl=Math.abs(t.q)*t.px*100;
else if(!pen&&(t.cur==="GBp"||t.cur==="GBX"))gl=Math.abs(t.q)*t.px/100;
else gl=t.g*fxAt(base,t.d)*pm;
const fe=MODE&&isFinite(t.cs)&&isFinite(t.g)?(buy?t.cs-t.g:t.g-t.cs):0,fl=fe*fxAt(base,t.d)*pm,c=buy?gl+fl:gl-fl;
if(a>0){q+=a;cost+=c;bg+=c;qb+=a}
else if(q>0){const f=Math.min(1,-a/q);real+=c-cost*f;sc+=cost*f;cost-=cost*f;q+=a}
else real+=c;
}
if(Math.abs(q)<1e-9){q=0;cost=0}
const px=P[s][L]*fxAt(base,days[L])*pm,val=q*px;
let dv=0;DV.forEach(e=>{if(e.k===s)dv+=(e.g+e.t)*fxAt(base,e.d)*pm});
return {cur:c0,avg:q>0?cost/q:(qb>0?bg/qb:0),px:px,val:val,un:q>0?val-cost:0,real:real,dv:dv,bg:bg,sc:sc,cu:q>0?cost:0};
}

/* ---- drag over a chart to measure a period (mouse: click and drag; touch: hold, then drag) ---- */
var RS=null,RSP=null;
{const st=document.createElement("style");st.textContent="svg.ch{-webkit-user-select:none;user-select:none}#rsr{position:absolute;z-index:6;pointer-events:none;background:var(--card);border:1px solid var(--bd);border-radius:12px;padding:8px 12px;box-shadow:0 6px 20px rgba(0,0,0,.35);font-size:.82rem;line-height:1.5;white-space:nowrap}#rsr .pos{color:var(--pos)}#rsr .neg{color:var(--neg)}#rsr .mu{color:var(--mu)}";document.head.appendChild(st)}
function rsIdx(sv,e){
const c=CH[+sv.getAttribute("data-c")];if(!c)return null;
const r=sv.getBoundingClientRect(),sc=Math.min(r.width/c.W,r.height/(c.H||336)),x=(e.clientX-r.left-(r.width-c.W*sc)/2)/sc;
return Math.max(c.x0,Math.min(c.L,Math.round(c.x0+(x-c.pl)*(c.L-c.x0)/(c.W-c.pl-c.pr))));
}
function rsClear(){const g=document.getElementById("rsg"),o=document.getElementById("rsr");if(g)g.remove();if(o)o.remove();RS=null}
function rsHideHover(n){const t=document.getElementById("tg"+n),l=document.getElementById("cur"+n);if(t)t.setAttribute("visibility","hidden");if(l)l.setAttribute("visibility","hidden")}
function rsDraw(){
if(!RS)return;
const sv=document.querySelector('svg.ch[data-c="'+RS.n+'"]'),c=CH[RS.n];
if(!sv||!c){RS=null;return}
const a=Math.min(RS.i1,RS.i2),b=Math.max(RS.i1,RS.i2),xs=i=>c.pl+(i-c.x0)*(c.W-c.pl-c.pr)/(c.L-c.x0);
let g=document.getElementById("rsg");if(g)g.remove();
g=document.createElementNS("http://www.w3.org/2000/svg","g");g.setAttribute("id","rsg");g.setAttribute("pointer-events","none");
g.innerHTML='<rect x="'+xs(a).toFixed(1)+'" y="'+c.pt+'" width="'+Math.max(1,xs(b)-xs(a)).toFixed(1)+'" height="'+(c.H-c.pt-c.pb)+'" style="fill:var(--ac)" opacity=".16"/><line x1="'+xs(a).toFixed(1)+'" x2="'+xs(a).toFixed(1)+'" y1="'+c.pt+'" y2="'+(c.H-c.pb)+'" style="stroke:var(--ac)" stroke-width="1.5"/><line x1="'+xs(b).toFixed(1)+'" x2="'+xs(b).toFixed(1)+'" y1="'+c.pt+'" y2="'+(c.H-c.pb)+'" style="stroke:var(--ac)" stroke-width="1.5"/>';
sv.appendChild(g);rsHideHover(RS.n);
const pctMode=c.fmt===pctf,L2=c.S.map((s,k)=>{
if(b<s.a)return null;
const f=i=>s.v[Math.max(0,i-s.a)],v1=f(Math.max(a,s.a)),v2=f(b);
const r=pctMode?((1+v2/100)/(1+v1/100)-1)*100:v2-v1;
return {n:s.name,col:COL[k%COL.length],r:r,t:pctMode?pctf(r):(r>0?"+":"")+c.fmt(r)};
}).filter(Boolean);
let h='<div class="mu">'+fd((c.dx||days)[a])+' \u2192 '+fd((c.dx||days)[b])+' \u00b7 '+(b-a)+' days</div>';
L2.forEach(l=>{h+='<div><b style="color:'+l.col+'">\u25CF</b> '+esc(l.n)+' <b class="'+(l.r>=0?"pos":"neg")+'">'+l.t+'</b></div>'});
if(pctMode&&L2.length===2){const d=L2[0].r-L2[1].r;h+='<div class="mu">'+(d>0?"+":"")+d.toFixed(1)+' pts vs '+esc(L2[1].n)+'</div>'}
let o=document.getElementById("rsr");
const par=sv.parentNode;par.style.position="relative";
if(!o){o=document.createElement("div");o.id="rsr";par.appendChild(o)}
o.innerHTML=h;
const pw=par.clientWidth,ow=o.offsetWidth,mid=(xs(a)+xs(b))/2/c.W*sv.clientWidth;
o.style.left=Math.max(4,Math.min(pw-ow-4,mid-ow/2))+"px";o.style.top="6px";
}
document.addEventListener("pointerdown",e=>{
const sv=e.target.closest&&e.target.closest("svg.ch");
if(!sv||e.button>0||!CH[+sv.getAttribute("data-c")]){if(RS&&!(e.target.closest&&e.target.closest("#rsr")))rsClear();return}
if(RS)rsClear();
const n=+sv.getAttribute("data-c"),i0=rsIdx(sv,e);
if(e.pointerType==="mouse")RSP={n:n,i0:i0,x:e.clientX,on:false,mouse:true};
else{RSP={n:n,i0:i0,x:e.clientX,y:e.clientY,on:false,mouse:false};RSP.timer=setTimeout(()=>{if(!RSP)return;RSP.on=true;RS={n:n,i1:i0,i2:i0};if(navigator.vibrate)navigator.vibrate(12);rsDraw()},380)}
});
document.addEventListener("pointermove",e=>{
if(RS&&!RSP)rsHideHover(RS.n);
if(!RSP)return;
if(!RSP.on){
if(!RSP.mouse){if(Math.hypot(e.clientX-RSP.x,e.clientY-(RSP.y||0))>10){clearTimeout(RSP.timer);RSP=null}return}
if(Math.abs(e.clientX-RSP.x)<4)return;RSP.on=true;RS={n:RSP.n,i1:RSP.i0,i2:RSP.i0};
}
const sv=document.querySelector('svg.ch[data-c="'+RSP.n+'"]');if(!sv)return;
RS.i2=rsIdx(sv,e);rsDraw();
});
document.addEventListener("touchmove",e=>{if(RSP&&RSP.on&&e.cancelable)e.preventDefault()},{passive:false});
const rsEnd=()=>{if(RSP){clearTimeout(RSP.timer);if(RSP.on&&RS&&RS.i1===RS.i2)rsClear();RSP=null}};
document.addEventListener("pointerup",rsEnd);document.addEventListener("pointercancel",rsEnd);

/* ---- import: one drop zone, the guide per broker, and a check of every file ---- */
const GUIDE={
saxo:{steps:['Log in to <a href="https://www.saxoinvestor.be/login" target="_blank" rel="noopener">Saxo</a>.','Go to <b>\u201cAll accounts\u201d</b> and select the <b>\u201cTransactions\u201d</b> tab.','Select the <b>\u201cAll time\u201d</b> view.','Click the <b>\u201cExport\u201d</b> button, select <b>\u201cInclude details\u201d</b> and click on <b>\u201cExcel\u201d</b>.'],note:""},
degiro:{steps:['Select your country and log in at <a href="https://www.degiro.com/" target="_blank" rel="noopener">Degiro</a>.','Go to <b>\u201cInbox\u201d</b>.','Select the <b>\u201cAccount Statement\u201d</b> tab and pick the period from or before your first deposit until today. Click the download button to export it as a CSV. It contains your trades, dividends, costs and interest.','(Optional) Select the <b>\u201cTransactions\u201d</b> tab and pick the period from or before your first deposit until today. Click the download button to export it as a CSV. It provides more accurate data for the exchange of each trade.'],note:""}
};
var GT=ls.get("gt")||"saxo";
function renderGuide(){
const st=document.getElementById("gsteps");if(!st)return;
document.querySelectorAll("#gtabs button[data-g]").forEach(b=>b.classList.toggle("on",b.getAttribute("data-g")===GT));
const g=GUIDE[GT];
st.innerHTML=g.steps.map(s=>"<li>"+T_(s)+"</li>").join("");
document.getElementById("gnote").textContent=g.note?T_(g.note):"";
}
function sheetRows(ws){
const ref=ws&&ws["!ref"];if(!ref)return [];
const rg=XLSX.utils.decode_range(ref),out=[];
for(let r=rg.s.r;r<=rg.e.r;r++){
const row=[];let any=false;
for(let c=rg.s.c;c<=rg.e.c;c++){
const z=ws[XLSX.utils.encode_cell({r:r,c:c})];let v="";
if(z){
if(z.t==="n"&&typeof z.v==="number"){v=(z.z&&XLSX.SSF.is_date(z.z)&&z.v>20000&&z.v<80000)?new Date(Date.UTC(1899,11,30)+Math.floor(z.v)*864e5).toISOString().slice(0,10):String(z.v)}
else v=z.w!=null?String(z.w):String(z.v==null?"":z.v);
}
v=v.replace(/[\t\r\n]+/g," ").replace(/"/g,"'");
if(v.trim())any=true;
row.push(v);
}
if(any)out.push(row);
}
return out;
}
function decodeBuf(b){
const u=new Uint8Array(b);
if(u[0]===255&&u[1]===254)return new TextDecoder("utf-16le").decode(u);
if(u[0]===254&&u[1]===255)return new TextDecoder("utf-16be").decode(u);
let s=new TextDecoder("utf-8").decode(u);
if(s.indexOf("\uFFFD")>=0)s=new TextDecoder("windows-1252").decode(u);
return s;
}
/* Saxo "Bookings" sheet: one row per fee/tax/amount of a trade, so it repeats every trade several times. Never read it as trades. */
function isBookSheet(a){const h=a.slice(0,5).reduce((p,x)=>p.concat(x),[]).map(v=>String(v).toLowerCase().replace(/[\s\u00a0_]+/g," ").trim());return h.some(v=>v==="amount type"||v==="eligible quantity"||v==="dividend per share"||v==="amount type id")}
function fmtRows(ws){return XLSX.utils.sheet_to_json(ws,{header:1,raw:false,defval:""}).map(x=>x.map(v=>String(v).replace(/[\t\r\n]+/g," ").replace(/"/g,"'"))).filter(x=>x.some(v=>v.trim()))}
function readFile(f){
return new Promise((res,rej)=>{
const r=new FileReader();
r.onerror=()=>rej(new Error("Could not read "+f.name));
r.onload=()=>{try{
const u=new Uint8Array(r.result),isX=/\.xls[xm]?$/i.test(f.name)||(u[0]===80&&u[1]===75)||(u[0]===208&&u[1]===207);
if(isX){
if(typeof XLSX==="undefined")throw new Error("The Excel reader failed to load. Refresh the page, or use a CSV file.");
/* every sheet is read two ways (exact values, and as displayed in Excel); the importer keeps whichever gives the most rows */
const wb=XLSX.read(r.result,{type:"array",cellNF:true});
const L=wb.SheetNames.map(n=>{const a=sheetRows(wb.Sheets[n]);return {n:n,a:a,k:a.reduce((p,x)=>p+x.filter(z=>z.trim()).length,0)}}).filter(z=>z.k>0&&!isBookSheet(z.a)).sort((p,q)=>q.k-p.k).slice(0,3);
const out=[];
L.forEach(z=>{out.push(z.a.map(x=>x.join("\t")).join("\n"));try{out.push(fmtRows(wb.Sheets[z.n]).map(x=>x.join("\t")).join("\n"))}catch(e){}});
res(out);
}else res([decodeBuf(r.result)]);
}catch(x){rej(x)}};
r.readAsArrayBuffer(f);
});
}
function sniff(text){
const rows=parseTable(text.replace(/^\uFEFF/,"")).filter(x=>x.length>3);
if(rows.length<2)return null;
const body=rows.slice(1),H=rows.slice(0,5).reduce((p,x)=>p.concat(x),[]).map(NRM);
const at=colByContent(body,v=>/^\s*\S+\s+-?[\d.,]+\s*@\s*[\d.,]+/.test(v),0.15),sym=colByContent(body,v=>/^[A-Za-z0-9.\-_]+:[A-Za-z]{3,6}$/.test(v),0.15),isin=colByContent(body,v=>ISINRE.test(v),0.1);
if(at>=0&&sym>=0)return "saxo";
if(isin<0&&!H.some(x=>/(^| )isin( |$)/.test(x)))return null;
const hasDesc=H.some(x=>/^(omschrijving|description|beschreibung|descripcion|descrizione|descricao|libelle)$/.test(x));
const trd=colByContent(body,v=>/^\s*\S+\s+-?[\d.,]+\s*(@|zu je)\s*[\d.,]+\s*[A-Za-z]{3}\s*$/.test(v),0.03);
const w=Math.max(...rows.slice(0,20).map(x=>x.length));let nc=0;
for(let c=0;c<w;c++){const v=body.slice(0,200).map(x=>(x[c]||"").trim()).filter(Boolean);if(v.length>2&&v.filter(z=>isFinite(num(z))).length/v.length>0.85)nc++}
return hasDesc||trd>=0||nc<5?"degiro-acc":"degiro-tx";
}
/* ---- loaded files: one entry per kind (a new file replaces the old one of the same kind), each can be removed ---- */
var FILES=[];
const FK={"saxo":["txt","Saxo transactions"],"degiro-tx":["txtD","Degiro transactions"],"degiro-acc":["txtA","Degiro account statement"]};
var TXDBG=null;
function fileInfo(k,t){
let info,n;
if(k==="saxo"){const a=toTx(t);info=[a.length+" trades",new Set(a.map(x=>x.cur||"EUR")).size+" currencies"].concat(SXD.length?[SXD.length+" dividends"]:[]);n=a.length+SXD.length;if(!a.length&&TXDBG)info.push("columns read: date \u201c"+TXDBG.c[0]+"\u201d, symbol \u201c"+TXDBG.c[1]+"\u201d, action \u201c"+TXDBG.c[2]+"\u201d; first row: "+TXDBG.s.join(" | "))}
else if(k==="degiro-tx"){const a=toTxD(t);info=[a.length+" trades",new Set(a.map(x=>x.cur||"EUR")).size+" currencies"];n=a.length}
else{const a=toAcc(t),tr=toTxA(t),dv=a.filter(x=>x.k==="div").length;info=[tr.length+" trades"].concat(dv?[dv+" dividends"]:[]);n=tr.length+a.length}
info.n=n;return info;
}
function syncFiles(){
Object.keys(FK).forEach(k=>{const L=FILES.filter(f=>f.kind===k);document.getElementById(FK[k][0]).value=L.length?L[L.length-1].text:""});
}
const INFO_SVG='<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>';
function recon(){
const dt=document.getElementById("txtD").value.trim(),ac=document.getElementById("txtA").value.trim();if(!dt||!ac)return null;
let A,B;try{B=toTxD(dt);A=toTxA(ac)}catch(e){return null}
const key=x=>x.d+"|"+x.s+"|"+Math.round(Math.abs(x.q)*1e4),cnt=L=>{const m={};L.forEach(x=>{const k=key(x);m[k]=(m[k]||0)+1});return m};
const ma=cnt(A),mb=cnt(B),miss=[],extra=[];
B.forEach(x=>{const k=key(x);if(ma[k]>0)ma[k]--;else miss.push(x)});
A.forEach(x=>{const k=key(x);if(mb[k]>0)mb[k]--;else extra.push(x)});
const d0=A.reduce((p,x)=>!p||x.d<p?x.d:p,""),early=miss.filter(x=>d0&&x.d<d0).length,rest=miss.filter(x=>!(d0&&x.d<d0));
let tip="Trades come from the Transactions file ("+B.length+"). The account statement ("+A.length+" trades) supplies dividends, costs and interest.";
if(early)tip+=" "+early+" trade"+(early>1?"s":"")+" date"+(early>1?"":"s")+" from before the statement starts ("+d0+"); that is normal.";
if(rest.length)tip+=" "+rest.length+" Transactions-file trade"+(rest.length>1?"s are":" is")+" not in the statement, for example "+rest.slice(0,3).map(x=>x.d+" "+String(x.n||x.s).slice(0,24)+" "+(x.q>0?"+":"")+x.q).join("; ")+".";
if(extra.length)tip+=" "+extra.length+" statement trade"+(extra.length>1?"s are":" is")+" not in the Transactions file.";
const warn=rest.length>0||extra.length>0;
return {warn:warn,s:warn?(rest.length+extra.length)+" trade"+(rest.length+extra.length>1?"s":"")+" differ between the two Degiro files":"Both Degiro files combined: trades from Transactions, dividends and costs from the statement",tip:tip};
}
function renderFiles(){
const out=document.getElementById("gres");if(!out)return;
const rm=i=>'<button class="gx" data-rm="'+i+'" title="'+T_("Remove")+'" aria-label="'+T_("Remove")+'">\u2715</button>';
let html=FILES.map((f,i)=>f.bad?'<div class="gl bad"><span>\u2715</span><b>'+esc(f.name)+'</b><span class="sep"> \u00B7 </span><span>'+esc(f.msg)+'</span>'+rm(i)+'</div>':'<div class="gl ok"><span>\u2713</span><b>'+FK[f.kind][1]+'</b>'+[f.name].concat(f.info||[]).map(p=>'<span class="sep"> \u00B7 </span><span>'+esc(p)+'</span>').join("")+rm(i)+'</div>').join("");
const sx=document.getElementById("txt").value.trim(),dt=document.getElementById("txtD").value.trim(),ac=document.getElementById("txtA").value.trim();
const wn=m=>'<div class="gl warn"><span>!</span><span>'+T_(m)+'</span></div>';
if(dt&&!ac)html+=wn("Add the Degiro Account statement too to include dividends, costs and interest.");
if(ac&&!dt){const f=FILES.filter(x=>x.kind==="degiro-acc").pop();if(f&&f.info&&/^0 trades/.test(f.info[0])&&!sx)html+=wn("No trades found in this statement. Check that the period starts at your first deposit.")}
const rc=recon();if(rc)html+='<div class="gl sm '+(rc.warn?"warn":"info")+'" tabindex="0">'+INFO_SVG+'<span>'+esc(rc.s)+'</span><span class="tt">'+esc(rc.tip)+'</span></div>';
out.innerHTML=html;
if(typeof bkRender==="function")bkRender();
}
async function loadFiles(files){
for(const f of files){
try{
const cands=await readFile(f);let best=null;
for(const t of cands){
let k=null;try{k=sniff(t)}catch(e){}
if(!k||!FK[k])continue;
let info=null;try{info=fileInfo(k,t)}catch(e){if(!best)best={err:e.message};continue}
if(!best||best.err||info.n>best.info.n)best={kind:k,text:t,info:info};
}
if(!best){FILES.push({bad:true,name:f.name,msg:T_("This file was not recognised. Check that it is a Saxo transactions report or a Degiro export.")});continue}
if(best.err){FILES.push({bad:true,name:f.name,msg:best.err});continue}
FILES=FILES.filter(z=>z.kind!==best.kind);
FILES.push({kind:best.kind,name:f.name,text:best.text,info:best.info});
}catch(x){FILES.push({bad:true,name:f.name,msg:x.message})}
}
syncFiles();renderFiles();
}
function initFiles(){
Object.keys(FK).forEach(k=>{const t=document.getElementById(FK[k][0]).value.trim();if(!t)return;let info=[];try{info=fileInfo(k,t)}catch(e){}FILES.push({kind:k,name:T_("Saved data"),text:t,info:info})});
renderFiles();
}
{const st=document.createElement("style");st.textContent="#gtabs{display:flex;gap:6px;margin:10px 0 14px}#gtabs button{margin:0}#gtabs button[disabled]{opacity:.45;cursor:default}.gcols{display:grid;grid-template-columns:1.1fr 1fr;gap:18px}@media(max-width:700px){.gcols{grid-template-columns:1fr}}.gh{letter-spacing:.08em;text-transform:uppercase;font-size:.75rem;margin-bottom:8px}#gsteps{margin:0;padding-left:20px;line-height:1.7}#gsteps li{margin-bottom:4px}.drop{display:flex;flex-direction:column;gap:4px;align-items:center;text-align:center;padding:22px 14px;border:1.5px dashed var(--bd);border-radius:14px;cursor:pointer}.drop.over{border-color:var(--ac);background:color-mix(in srgb,var(--ac) 10%,transparent)}.gl{display:flex;flex-wrap:wrap;gap:4px;align-items:baseline;margin-top:8px;padding:8px 10px;border-radius:10px;font-size:.9rem}.gl.ok{background:rgba(47,158,117,.14);color:#6fcfa6}.gl.warn{background:rgba(239,180,77,.14);color:#e9b95a}.gl.bad{background:rgba(239,100,90,.14);color:#f08a80}.gl .sep{opacity:.6}details.adv{margin-top:14px}details.adv summary{cursor:pointer;color:var(--mu)}details.adv textarea{margin-bottom:6px}.gl .gx{margin:0 0 0 auto;padding:0 6px;border:0;background:none;box-shadow:none;color:inherit;opacity:.7;cursor:pointer;font-size:.9rem;line-height:1.2}.gl .gx:hover{opacity:1}#gsteps a{color:#4f8cff;text-decoration:underline;font-weight:600}.ph{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:10px}.ph h2{margin:0}";document.head.appendChild(st)}
document.getElementById("gtabs").addEventListener("click",e=>{const b=e.target.closest("button[data-g]");if(!b||b.disabled)return;GT=b.getAttribute("data-g");ls.set("gt",GT);renderGuide();TBUSY=true;try{trNode(document.getElementById("gsteps"))}finally{TMO.takeRecords();TBUSY=false}});
const dz=document.getElementById("drop"),fx=document.getElementById("fileX");
fx.onchange=e=>{loadFiles([...e.target.files]);e.target.value=""};
["dragenter","dragover"].forEach(v=>dz.addEventListener(v,e=>{e.preventDefault();dz.classList.add("over")}));
["dragleave","drop"].forEach(v=>dz.addEventListener(v,e=>{e.preventDefault();dz.classList.remove("over")}));
dz.addEventListener("drop",e=>loadFiles([...e.dataTransfer.files]));
document.getElementById("gres").addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-rm]");if(!b)return;FILES.splice(+b.getAttribute("data-rm"),1);syncFiles();renderFiles()});
initFiles();
/* ---- broker view: multi-select dropdown, "All brokers" is the default ---- */
function bkAvail(){const o=[];FILES.forEach(f=>{if(f.bad)return;const n=f.kind==="saxo"?"Saxo":"Degiro",c=(f.info&&f.info[0])||"";let e=o.find(z=>z.n===n);if(!e)o.push({n:n,c:c});else if(f.kind==="degiro-tx"||!e.c)e.c=c||e.c});if(!o.length)["Saxo","Degiro"].forEach(n=>o.push({n:n,c:""}));return o}
function bkSel(){const v=$("bv").value;return !v||v==="all"?null:v.split(",").filter(Boolean)}
function bkRender(){
const av=bkAvail(),sel=bkSel(),ok=sel?sel.filter(n=>av.some(a=>a.n===n)):[],all=!ok.length;
const l=$("bkl");if(l)l.textContent=all?"All brokers":ok.join(" + ");
const p=$("bkp");if(!p)return;
p.innerHTML='<div class="ps">Brokers</div><button type="button" class="bko'+(all?" on":"")+'" data-bk="all"><span class="cb"></span><span>All brokers</span><i>'+av.length+'</i></button><div class="bks"></div>'+av.map(a=>'<button type="button" class="bko'+(!all&&ok.includes(a.n)?" on":"")+'" data-bk="'+a.n+'"><span class="cb"></span><span>'+a.n+'</span><i>'+esc(a.c)+'</i></button>').join("");
}
$("bkb").onclick=()=>{const p=$("bkp");p.hidden=!p.hidden;if(!p.hidden)bkRender()};
$("bkp").addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-bk]");if(!b)return;
const n=b.getAttribute("data-bk"),av=bkAvail().map(a=>a.n);let sel=(bkSel()||[]).filter(x=>av.includes(x));
if(n==="all")sel=[];else sel=sel.includes(n)?sel.filter(x=>x!==n):[...sel,n];
const all=!sel.length||sel.length>=av.length;$("bv").value=all?"all":sel.join(",");ls.set("bv",$("bv").value);bkRender();$("bv").dispatchEvent(new Event("change"))});
document.addEventListener("click",e=>{if(!e.target.closest("#bkw"))$("bkp").hidden=true});
function openSetup(){const m=$("setup"),k=document.querySelector("#out .kpis");let t=0;if(k&&k.offsetParent)t=Math.ceil(k.getBoundingClientRect().bottom)+12;m.style.setProperty("--mt",t+"px");m.classList.toggle("under",t>0);m.hidden=false;$("bkp").hidden=true;bkRender()}
$("out").addEventListener("click",e=>{
const b=e.target.closest&&e.target.closest("[data-pcm],[data-loc]");if(!b)return;
if(b.hasAttribute("data-pcm")){MODE=+b.getAttribute("data-pcm");calc()}else setLoc(b.getAttribute("data-loc")==="1");
});
renderGuide();syncPrefs();
document.documentElement.lang=LANG;
if(LANG!=="en"){TUSED=true;TBUSY=true;try{trNode(document.body)}finally{TMO.takeRecords();TBUSY=false}}
