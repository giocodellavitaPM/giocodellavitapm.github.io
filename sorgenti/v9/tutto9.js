/* ===== v9: il negozietto "Prendi tutto" fuori dal centro commerciale ===== */
room('tutto9',10,8,'#efe9dc','#e4ddce','#f3e3c4',[
  fu('shelf',1,2,3,1),fu('shelf',6,2,3,1),fu('freezer',1,5,2,1),fu('shelf',8,5,1,2),fu('counter',4,4,3,1,'sheet:tutto9','Cassa')]);
SCENE_N.tutto9='al negozietto Prendi tutto';SCENE_DO.tutto9='Alla cassa puoi prendere tutto il centro commerciale, o un reparto alla volta!';
// i reparti: g=cose del centro commerciale, f=cibo e bevande (nello zaino), s=oggetti grandi
const TUTTO9=[
 ['cibo','🍝','Cibo',{f:FOOD.filter(x=>!x.b).map(x=>x.k)}],
 ['bevande','🥤','Bevande',{f:FOOD.filter(x=>x.b).map(x=>x.k)}],
 ['casa','🛋️','Cose per la casa',{g:['m_casa','m_fiori']}],
 ['telefoni','📱','Telefoni',{g:['m_tel'],s:['telefono']}],
 ['tech','💻','Cose tecnologiche',{g:['m_video'],s:['computer','console']}],
 ['giochi','🧸','Giocattoli',{g:['m_lego','m_peluche','m_costumi'],c:['giochi']}],
 ['vestiti','👟','Vestiti, scarpe e gioielli',{g:['m_scarpe','m_gioielli','m_ottica','m_profumi']}],
 ['scuola','📚','Libri e scuola',{g:['m_libri','m_carto']}],
 ['dolci','🍭','Dolci',{g:['m_dolci']}],
 ['musica','🎸','Musica',{g:['m_musica']}],
 ['animali','🐶','Per gli animali',{g:['m_pet']}]];
const F3=3; // quante porzioni di ogni cibo
function tuttoList(r){const D=r[3],L=[];
  (D.f||[]).forEach(k=>{const f=FOOD.find(x=>x.k===k);if(f)L.push({t:'f',k,ic:f.ic,p:f.p*F3})});
  (D.g||[]).forEach(g=>(GOODS[g]||[]).forEach(([it,p])=>{if(LOOT[it]&&!L.some(x=>x.t==='g'&&x.k===it))L.push({t:'g',k:it,ic:LOOT[it].ic,p})}));
  (D.c||[]).forEach(g=>(CSHOP[g]||[]).forEach(([it,p])=>{if(LOOT[it]&&!L.some(x=>x.k===it))L.push({t:'g',k:it,ic:LOOT[it].ic,p})}));
  (D.s||[]).forEach(id=>{const it=ALLITEMS.find(x=>x.id===id);if(it&&!S.items.some(x=>x.id===id))L.push({t:'s',k:id,ic:it.ic,p:it.p})});return L}
const tuttoP=L=>L.reduce((a,x)=>a+x.p,0);
function tuttoTake(L){L.forEach(x=>{if(x.t==='f')addFood(x.k,F3);else if(x.t==='g')S.inv.push(x.k);else{const it=ALLITEMS.find(y=>y.id===x.k);if(it&&!S.items.some(y=>y.id===it.id)){S.everItems[it.id]=true;S.items.push({id:it.id,n:it.n,ic:it.ic,p:it.p,up:it.up||0,veh:!!it.veh,speed:it.speed||0});add('fel',it.fel||0);if(it.int)add('int',it.int)}}})}
function tuttoBuy(k){const R=k==='tutto'?TUTTO9:TUTTO9.filter(r=>r[0]===k);if(!R.length)return;const L=R.flatMap(tuttoList),p=tuttoP(L);
  if(!L.length)return toast('Hai già tutto! 😄');if(!canPay(p))return toast('Non hai abbastanza soldi. 💸');
  money(-p);tuttoTake(L);count('compra');add('fel',k==='tutto'?10:3);
  const m=k==='tutto'?`🛍️ Hai preso TUTTO il centro commerciale per ${eur(p)}! Il cibo e le bevande sono nello zaino.`:`${R[0][1]} Hai preso tutto il reparto ${R[0][2].toLowerCase()} per ${eur(p)}! È nello zaino.`;
  log(m);save();updateHud();refreshSheet();toast(m)}
PLACES.tutto9={sub:()=>'Il negozietto del centro commerciale',body:()=>{const all=TUTTO9.flatMap(tuttoList),pa=tuttoP(all);
  return `<p class="note">Qui trovi <b>tutte le cose del centro commerciale</b>. Prendi tutto in una volta, oppure un reparto alla volta! Hai ${eur(wealth())}.</p>
  <div class="row" style="border:3px solid #f5a700;background:#fff6dd"><div class="t"><b>🛍️ Prendi tutto</b><span>Tutto il centro commerciale: ${all.length} cose · ${eur(pa)}</span></div><button class="btn ${all.length&&canPay(pa)?'hot':''}" data-tutto9="tutto" ${all.length&&canPay(pa)?'':'disabled'}>Prendi tutto</button></div>
  <div class="h3">🏷️ Reparti</div>`+TUTTO9.map(r=>{const L=tuttoList(r),p=tuttoP(L),ok=L.length&&canPay(p);
   return `<div class="row"><div class="t"><b>${r[1]} ${r[2]}</b><span>${L.length?L.map(x=>x.ic).join('')+' · '+eur(p):'Hai già tutto ✓'}</span></div><button class="btn ${ok?'hot':''}" data-tutto9="${r[0]}" ${ok?'':'disabled'}>Compra tutto</button></div>`}).join('')}};
SHEET_T.tutto9=['🛍️','Prendi tutto'];
document.addEventListener('click',e=>{const b=e.target.closest('[data-tutto9]');if(b)tuttoBuy(b.dataset.tutto9)});
