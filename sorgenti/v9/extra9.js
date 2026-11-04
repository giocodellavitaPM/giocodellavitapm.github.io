/* ================= v9: più case, la macchina che arriva subito, i mezzi uno sotto l'altro, concessionaria moto ================= */
const isMine=id=>id==='casamia'||/^casa[2-6]$/.test(id);
const houseK=k=>S&&S.houses&&S.houses[k-2];
for(let k=2;k<=6;k++){const b=BUILD.find(x=>x.id==='casa'+k);
  Object.defineProperty(b,'n',{get:()=>{const h=houseK(k);return h?`Casa ${k} · ${h.n}`:'Casa in vendita'}});
  Object.defineProperty(b,'ic',{get:()=>{const h=houseK(k);return h?h.ic:'🪧'}});
  Object.defineProperty(b,'wall',{get:()=>{const h=houseK(k);return (h&&HCOL[h.id]||['#ddd6c8'])[0]}});
  Object.defineProperty(b,'roof',{get:()=>{const h=houseK(k);return (h&&HCOL[h.id]||[0,'#9aa3b5'])[1]}});
  SCENE_N['casa'+k]=`nella tua casa numero ${k}`;PLACE_ART['casa'+k]=`alla casa ${k}`;
}
{const _eb=enterBuilding;enterBuilding=function(id){
  const m=/^casa([2-6])$/.exec(id);
  if(m&&!houseK(+m[1])){ui.walk=null;return toast(S.age<18?'🪧 Questa casa è in vendita! Da grande la potrai comprare all\'agenzia case. 🔑':(S.house?'🪧 È in vendita! All\'agenzia case puoi comprarla: diventa un\'altra casa tua. 🔑':'🪧 È in vendita! Prima compra la tua prima casa all\'agenzia. 🔑'))}
  return _eb(id)}}
function compraAltra(id){
  const c=CASE.find(x=>x.id===id);if(!c||!S.house)return;S.houses=S.houses||[];
  if(S.houses.length>=5)return toast('Hai già 6 case: sei il re del mattone! 👑');
  if(!canPay(c.p))return toast('Non hai abbastanza soldi. 💸');
  money(-c.p);S.houses.push({id:c.id,n:c.n,ic:c.ic,p:c.p});add('fel',c.fel);const k=S.houses.length+1;
  const m=`Hai comprato la Casa ${k}: ${c.n} ${c.ic}! La trovi sulla mappa 🗺️, in alto a destra.`;log(m);save();updateHud();refreshSheet();toast(m);
}
{const _ab=PLACES.agenzia.body;PLACES.agenzia.body=()=>{let h=_ab();if(S.age<18||!S.house)return h;const L=S.houses||[];
  h+=`<div class="h3">🏘️ Le tue case</div><div class="row"><div class="t"><b>${S.house.ic} Casa 1 · ${esc(S.house.n)}</b><span>Ci abiti tu</span></div></div>`+L.map((x,i)=>`<div class="row"><div class="t"><b>${x.ic} Casa ${i+2} · ${esc(x.n)}</b><span>Comprata a ${eur(x.p)}</span></div></div>`).join('');
  if(L.length<5)h+=`<div class="h3">🔑 Compra un'altra casa (Casa ${L.length+2})</div>`+CASE.map(c=>{const ok=canPay(c.p);return `<div class="row"><div class="t"><b>${c.ic} ${c.n}</b><span>${eur(c.p)}</span></div><button class="btn ${ok?'hot':''}" data-casa2="${c.id}" ${ok?'':'disabled'}>Compra</button></div>`}).join('');
  return h}}

// i mezzi: un bottone per ognuno, uno sotto l'altro
{const _br=bestRide;bestRide=function(){if(S&&S.rideSel&&S.items.some(i=>i.id===S.rideSel)){const d=ALLITEMS.find(x=>x.id===S.rideSel);if(d&&d.ride)return d}return _br()}}
function myRides(){const seen=new Set(),L=[];S.items.forEach(i=>{if(seen.has(i.id))return;const d=ALLITEMS.find(x=>x.id===i.id);if(d&&d.ride){seen.add(i.id);L.push(d)}});
  const rank=d=>isCar(d.id)?0:d.veh?1:2;return L.sort((a,b)=>rank(a)-rank(b)||b.speed-a.speed)}
function renderRides(){
  let el=$('rideList');if(!el){el=document.createElement('div');el.id='rideList';const hd=$('hud');hd.parentNode.insertBefore(el,hd)}
  const rb=$('rideBtn');if(rb)rb.hidden=true;
  const show=S&&S.alive!==false&&S.scene==='citta'&&!S.drive&&!S.famDrive&&!ui.sheet&&!ui.chatNpc&&$('hud')&&!$('hud').hidden&&(!$('veil')||$('veil').hidden);const L=show?myRides():[];
  if(!L.length){el.hidden=true;el.dataset.k='';return}
  const cur=S.ride?bestRide():null,ib=document.querySelector('.iconbtns');
  const key=L.map(d=>d.id).join()+'|'+(cur?cur.id:'')+'|'+innerWidth;if(!el.hidden&&el.dataset.k===key)return;el.dataset.k=key;el.hidden=false;
  if(ib){const r=ib.getBoundingClientRect();el.style.top=(r.bottom+8)+'px';el.style.maxHeight=Math.max(120,innerHeight-r.bottom-200)+'px'}el.style.overflowY='auto';el.style.overflowX='hidden';el.style.padding='3px 4px 3px 6px';el.style.pointerEvents='auto';el.style.right='max(10px, env(safe-area-inset-right,0px))';el.style.left='auto';el.style.zIndex=6
  el.innerHTML=L.map(d=>`<button class="ib${cur&&cur.id===d.id?' on':''}" data-ridesel="${d.id}" aria-label="${esc(d.n)}" aria-pressed="${!!(cur&&cur.id===d.id)}" title="${esc(d.n)}">${d.ic}</button>`).join('');
}
{const _uh=updateHud;updateHud=function(){_uh();try{renderRides()}catch(e){}}}
setInterval(()=>{try{renderRides()}catch(e){}},300);
function rideSel(id){
  const d=ALLITEMS.find(x=>x.id===id);if(!d)return;const cur=S.ride?bestRide():null;
  if(cur&&isCar(cur.id)){carOut(cur);if(S.ride)return;if(cur.id===id)return}
  else if(cur&&cur.id===id){S.ride=false;updateHud();return toast('Scendi e vai a piedi. 🚶')}
  S.rideSel=id;
  if(isCar(id)){S.ride=false;return carIn(d)}
  if(CASCO_RIDE.includes(id)&&!hasCasco()){if(S.age<18)return toast('⛑️ La mamma dice: «Senza casco non si sale!» Compralo al negozio di bici o al centro commerciale (35 €).');ui.noCasco=4}
  S.ride=true;updateHud();toast(`Sali: ${d.ic} ${d.n}! Vai più veloce.`);
}
// chiami la macchina e arriva subito: sali al volante sulla strada più vicina
{const _ci=carIn;carIn=function(rb){
  if(S.scene!=='citta')return;
  if(S.parked&&Math.hypot(S.parked.x-S.pos.x,S.parked.y-S.pos.y)>3)S.parked=null;
  if(!S.parked){let ok=false;const px=Math.floor(S.pos.x),py=Math.floor(S.pos.y);
    for(let y=py-3;y<=py+3&&!ok;y++)for(let x=px-3;x<=px+3;x++)if(drivable(x+.5,y+.5)&&!inBox(x+.5,y+.5)){ok=true;break}
    if(!ok){let best=null;for(let y=Math.max(1,py-30);y<=Math.min(H-2,py+30);y++)for(let x=Math.max(1,px-30);x<=Math.min(W-2,px+30);x++){if(!drivable(x+.5,y+.5)||inBox(x+.5,y+.5))continue;const dd=Math.abs(x-px)+Math.abs(y-py);if(!best||dd<best[2])best=[x,y,dd]}
      if(best){S.pos={x:best[0]+.5,y:best[1]+.5}}}}
  return _ci(rb)}}

// concessionaria delle moto
const MOTO9=[
 {id:'minimoto',n:'Minimoto',ic:'🏍️',p:800,age:8,up:100,fel:10,speed:1.6,g:'moto'},
 {id:'scooter125',n:'Scooter 125',ic:'🛵',p:3500,age:16,lic:'a',up:350,fel:10,speed:2.1,g:'moto'},
 {id:'enduro',n:'Moto da enduro',ic:'🏍️',p:7000,age:16,lic:'a',up:650,fel:12,speed:2.4,g:'moto'},
 {id:'naked',n:'Moto naked 600',ic:'🏍️',p:9000,age:18,lic:'a',up:800,fel:13,speed:2.7,g:'moto'},
 {id:'motoelettrica',n:'Moto elettrica',ic:'🏍️',p:12000,age:18,lic:'a',up:300,fel:13,speed:2.7,g:'moto'},
 {id:'sidecar',n:'Moto con il sidecar',ic:'🏍️',p:15000,age:18,lic:'a',up:900,fel:14,speed:2.3,g:'moto'},
 {id:'chopper',n:'Moto americana',ic:'🏍️',p:22000,age:18,lic:'a',up:1300,fel:16,speed:2.6,g:'moto'},
 {id:'motogp',n:'Moto da corsa',ic:'🏍️',p:35000,age:18,lic:'a',up:2000,fel:20,speed:3.3,g:'moto'},
];
MOTO9.forEach(v=>{v.veh=true;v.ride=true;VEICOLI.push(v);ALLITEMS.push(v);CASCO_RIDE.push(v.id)});
PLACES.motoshop={sub:()=>'Solo moto: scooter, cross, corsa…',body:()=>(S.age<14?`<p class="note">Da piccolo puoi già guidare la minimoto (con il casco ⛑️)! Le altre sono per i grandi.</p>`:`<p class="note">Per le moto grandi serve la Patente A: la prendi alla scuola guida.</p>`)+itemRows(VEICOLI.filter(v=>v.g==='moto').sort((a,b)=>a.p-b.p))+`<div class="h3">⛑️ Sicurezza</div>`+itemRows(SHOP.filter(i=>i.id==='casco'))};
SCENE_N.motoshop='alla concessionaria moto';PLACE_ART.motoshop='alla concessionaria moto';
PLACE_KW.unshift(['motoshop',/(concessionaria (di |delle )?moto|negozio (di |delle )?moto)/]);
document.addEventListener('click',e=>{const b=e.target.closest('[data-casa2],[data-ridesel]');if(!b)return;if(b.dataset.casa2)compraAltra(b.dataset.casa2);else rideSel(b.dataset.ridesel)});

// patenti delle moto: AM, A1, A2 e A
LIC.a.n='Patente A1 (moto fino a 125)';
const LIC0={...LIC};for(const k in LIC)delete LIC[k];
Object.assign(LIC,{am:LIC0.am,a:LIC0.a,a2:{n:'Patente A2 (moto medie)',age:18,p:700},af:{n:'Patente A (tutte le moto)',age:20,p:900},b:LIC0.b,c:LIC0.c,d:LIC0.d});
['naked','motoelettrica','sidecar'].forEach(id=>VEICOLI.find(v=>v.id===id).lic='a2');
['superbike','chopper','motogp'].forEach(id=>VEICOLI.find(v=>v.id===id).lic='af');
const LICMOTO=['am','a','a2','af'];
function licRows(keys){return keys.map(k=>{const L=LIC[k],has=S.lic[k],okA=S.age>=L.age,tried=S.done['lic_'+k];
  return `<div class="row"><div class="t"><b>${L.n}</b><span>${has?'Ce l\'hai ✓':`Dai ${L.age} anni · esame ${eur(L.p)}`}</span></div>${has?'<span class="tag ok">✓ Presa</span>':`<button class="btn ${okA&&!tried?'hot':''}" data-lic="${k}" ${!okA||tried?'disabled':''}>${tried?'Tra un anno':'Fai l\'esame'}</button>`}</div>`}).join('')}
PLACES.patentiMoto={sub:()=>'Patentino e patenti A1, A2 e A',body:()=>`<p class="note">🏍️ Qui fai l'esame per guidare le moto: patentino a 14 anni, A1 a 16, A2 a 18 e la A per tutte le moto a 20.</p>`+licRows(LICMOTO)};
SHEET_T.patentiMoto=['🪪','Scuola guida moto'];
{const _mb=PLACES.motoshop.body;PLACES.motoshop.body=()=>_mb()+`<div class="h3">🪪 Patenti delle moto</div>`+licRows(LICMOTO)}
// la mappa resta grande come prima: si scorre di lato
function mapScroll(){const w=$('mmWrap');if(!w)return;let px=S.pos.x;if(S.scene!=='citta'){const b=BUILD.find(x=>x.id===S.scene);if(b)px=b.dx}w.scrollLeft=Math.max(0,px/W*w.scrollWidth-w.clientWidth/2)}
