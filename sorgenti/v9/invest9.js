/* ===== v9: Investimenti: compri cose che salgono e scendono di prezzo ===== */
room('inv9',12,8,'#eef3ea','#e2eadc','#dfe9d6',[fu('plant',1,6,1,1),fu('plant',10,6,1,1),fu('shelf',1,2,3,1),fu('shelf',8,2,3,1),fu('counter',4,4,4,1,'sheet:inv9','Sportello degli investimenti')]);
SCENE_N.inv9='agli Investimenti';SCENE_DO.inv9='Allo sportello investi i tuoi soldi: oro, diamanti, azioni e tanto altro. I prezzi salgono e scendono!';
// [id, icona, nome, prezzo iniziale, quanto cambia, rischio]
const INV9=[['oro','🥇','Oro',100,.012,'basso'],['argento','🥈','Argento',20,.02,'basso'],['case','🏘️','Case e terreni',500,.015,'basso'],['diamanti','💎','Diamanti',800,.03,'medio'],
 ['quadri','🖼️','Quadri famosi',2000,.04,'medio'],['auto','🚗','Auto d\'epoca',300,.035,'medio'],['fossili','🦖','Fossili di dinosauro',1500,.05,'medio'],['francobolli','✉️','Francobolli rari',10,.05,'medio'],
 ['pizzaSpA','🍕','Azioni Pizza Mondiale',50,.06,'alto'],['giochi','🧸','Azioni Giocattoli & Co',40,.07,'alto'],['tech','💻','Azioni Super Computer',120,.08,'alto'],['razzi','🚀','Azioni Razzi Spaziali',200,.1,'alto'],
 ['figurine','🃏','Figurine rarissime',5,.12,'altissimo'],['robot','🤖','Azioni Robot del Futuro',60,.12,'altissimo']];
const invS=()=>{const s=S.inv9||(S.inv9={p:{},h:{},q:{},c:{},t:0});INV9.forEach(x=>{if(s.p[x[0]]==null){s.p[x[0]]=x[3];s.h[x[0]]=[x[3]]}});return s};
const invVal=k=>{const s=invS();return (s.q[k]||0)*s.p[k]};
const invTot=()=>INV9.reduce((a,x)=>a+invVal(x[0]),0);
const gauss=()=>{let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};
function invTick(){const s=invS();INV9.forEach(([k,,,p0,vol])=>{let p=s.p[k]*Math.exp(vol*.35+vol*gauss());p=Math.max(p0*.05,p);s.p[k]=p;const h=s.h[k];h.push(p);if(h.length>24)h.shift()})}
{const _st=step;step=function(dt){if(S&&S.alive&&!ui.flying&&$('veil').hidden){const s=invS();s.t+=dt;if(s.t>=30){s.t=0;invTick();if(ui.sheet&&ui.sheet.id==='inv9')refreshSheet()}}return _st(dt)}}
function invBuy(k,amt){const s=invS(),x=INV9.find(y=>y[0]===k);if(!x)return;if(amt==='meta')amt=Math.floor(wealth()/2);amt=Math.round(+amt);if(amt<1)return;if(!canPay(amt))return toast('Non hai abbastanza soldi. 💸');
  money(-amt);s.q[k]=(s.q[k]||0)+amt/s.p[k];s.c[k]=(s.c[k]||0)+amt;add('int',1);save();updateHud();refreshSheet();toast(`📈 Hai investito ${fmtE(amt)} in ${x[1]} ${x[2]}!`)}
function invSell(k){const s=invS(),x=INV9.find(y=>y[0]===k);if(!x||!s.q[k])return;const v=Math.round(invVal(k)),g=v-(s.c[k]||0);money(v);s.q[k]=0;s.c[k]=0;add('fel',g>0?3:0);
  const m=g>=0?`💰 Hai venduto ${x[1]} ${x[2]} per ${fmtE(v)}: hai guadagnato ${fmtE(g)}! 🎉`:`Hai venduto ${x[1]} ${x[2]} per ${fmtE(v)}: hai perso ${fmtE(-g)}. 😕 Succede: i prezzi scendono e salgono!`;log(m);save();updateHud();refreshSheet();toast(m)}
function invAll(kind){const s=invS();if(kind==='sell'){const v=Math.round(invTot()),g=v-INV9.reduce((a,x)=>a+(s.c[x[0]]||0),0);if(!v)return toast('Non hai investimenti da vendere.');money(v);INV9.forEach(x=>{s.q[x[0]]=0;s.c[x[0]]=0});save();updateHud();refreshSheet();return toast(`💰 Hai venduto tutto per ${fmtE(v)}! ${g>=0?'Guadagno: '+fmtE(g)+' 🎉':'Perdita: '+fmtE(-g)}`)}
  const tot=Math.floor(wealth()*(kind==='tutto'?1:.5));if(tot<INV9.length)return toast('Non hai abbastanza soldi. 💸');const each=Math.floor(tot/INV9.length);
  money(-each*INV9.length);INV9.forEach(x=>{s.q[x[0]]=(s.q[x[0]]||0)+each/s.p[x[0]];s.c[x[0]]=(s.c[x[0]]||0)+each});add('int',2);save();updateHud();refreshSheet();toast(`📈 Hai investito ${fmtE(each*INV9.length)} in tutte le ${INV9.length} cose!`)}
const spark=h=>{const mn=Math.min(...h),mx=Math.max(...h),r=mx-mn||1,pts=h.map((v,i)=>`${(i/(Math.max(1,h.length-1))*90).toFixed(1)},${(26-(v-mn)/r*24).toFixed(1)}`).join(' '),up=h[h.length-1]>=h[0];
  return `<svg width="90" height="28" viewBox="0 0 90 28" style="vertical-align:middle"><polyline points="${pts}" fill="none" stroke="${up?'#2bb673':'#e5484d'}" stroke-width="2.5" stroke-linejoin="round"/></svg>`};
PLACES.inv9={sub:()=>'I prezzi salgono e scendono!',body:()=>{const s=invS(),tot=invTot(),cost=INV9.reduce((a,x)=>a+(s.c[x[0]]||0),0),g=tot-cost,W=wealth(),AM=[1e3,1e6,1e9,1e12,1e15,1e18];
  let h=`<p class="note">📈 Qui <b>investi</b> i tuoi soldi: compri oro, diamanti, quadri, azioni… I prezzi cambiano ogni mezz'ora del gioco. Compra quando costano poco e <b>vendi quando salgono</b> per guadagnare! Attento: le cose a rischio alto possono anche scendere tanto. Hai ${fmtE(W)}.</p>`;
  h+=`<div class="row" style="border:3px solid #2bb673;background:#eafff2"><div class="t"><b>💼 I tuoi investimenti valgono ${fmtE(tot)}</b><span>${cost?(g>=0?'📈 Stai guadagnando '+fmtE(g):'📉 Stai perdendo '+fmtE(-g)):'Non hai ancora investito niente'}</span></div><button class="btn ${tot?'hot':''}" data-inv9="all:sell" ${tot?'':'disabled'}>💰 Vendi tutto</button></div>
  <div class="row" style="border:3px solid #f5a700;background:#fff6dd"><div class="t"><b>📊 Investi in tutto</b><span>Dividi i soldi tra tutte le ${INV9.length} cose</span></div><div style="display:flex;flex-direction:column;gap:4px"><button class="btn hot" data-inv9="all:meta" ${W>=28?'':'disabled'}>Metà dei soldi</button><button class="btn hot" data-inv9="all:tutto" ${W>=14?'':'disabled'}>Tutti i soldi</button></div></div>`;
  return h+INV9.map(([k,ic,n,,,risk])=>{const p=s.p[k],hh=s.h[k],ch=hh.length>1?(p/hh[hh.length-2]-1)*100:0,v=invVal(k),gk=v-(s.c[k]||0);
   const btns=AM.filter(a=>a<=W).slice(-3).map(a=>`<button class="btn hot" data-inv9="${k}:${a}">+ ${fmtE(a)}</button>`).join('')+(W>=2?`<button class="btn hot" data-inv9="${k}:meta">+ metà dei soldi</button>`:'');
   return `<div class="row" style="flex-wrap:wrap"><div class="t" style="min-width:60%"><b>${ic} ${n}</b><span>Prezzo ${fmtE(p)} ${ch>=0?'⬆️':'⬇️'} ${ch.toFixed(1)}% · rischio ${risk}${v?`<br>Hai: ${fmtE(v)} (${gk>=0?'+':'−'}${fmtE(Math.abs(gk))})`:''}</span></div>${spark(hh)}
    <div style="display:flex;flex-wrap:wrap;gap:4px;width:100%;margin-top:4px">${btns}${v?`<button class="btn alt" data-inv9="${k}:sell">💰 Vendi</button>`:''}</div></div>`}).join('')}};
SHEET_T.inv9=['📈','Investimenti'];
document.addEventListener('click',e=>{const b=e.target.closest('[data-inv9]');if(!b)return;const [k,a]=b.dataset.inv9.split(':');if(k==='all')return invAll(a);if(a==='sell')invSell(k);else invBuy(k,a)});
// codice segreto: super trucchi (gratis!)
const SUPER9=[['razzi','🚀','Tutti i razzi'],['pianeti','🪐','Tutti i pianeti visitati'],['aziende','💼','Tutte le aziende e lo spazio a 5 stelle'],['potenza','⚡','Tutto potenziato al massimo'],
 ['negozio','🛍️','Tutto il centro commerciale nello zaino'],['cibo','🍕','99 di ogni cibo e bevanda'],['borsa','📈','Investimenti alle stelle (prezzi ×10)'],['tesori','💎','Un po\' di ogni investimento (1 milione l\'uno)'],
 ['giochi','🎮','Tutti i giochi del giardino in casa'],['felice','😄','Felicità, salute e tutto a 100']];
function super9(k){const st=bizS();
  if(k==='razzi'){const r=rocS();RAZZI.forEach(x=>{if(!r.own.includes(x[0]))r.own.push(x[0])})}
  else if(k==='pianeti'){const r=rocS();COSMO.forEach(p=>r.vis[p[0]]=1)}
  else if(k==='aziende')BIZ.forEach(b=>{st.own[b[0]]=5})
  else if(k==='potenza')BIZ.forEach(b=>{st.own[b[0]]=st.own[b[0]]||5;st.pow[b[0]]=PWMAX})
  else if(k==='negozio')tuttoTake(TUTTO9.flatMap(tuttoList))
  else if(k==='cibo')FOOD.forEach(f=>{const F=foodN();F[f.k]=Math.max(F[f.k]||0,99)})
  else if(k==='borsa'){const s=invS();INV9.forEach(x=>{s.p[x[0]]*=10;s.h[x[0]].push(s.p[x[0]]);if(s.h[x[0]].length>24)s.h[x[0]].shift()})}
  else if(k==='tesori'){const s=invS();INV9.forEach(x=>{s.q[x[0]]=(s.q[x[0]]||0)+1e6/s.p[x[0]];s.c[x[0]]=(s.c[x[0]]||0)+1e6})}
  else if(k==='giochi'){S.flags=S.flags||{};Object.keys(UPGEMO).forEach(u=>S.flags['u_'+u]=1)}
  else if(k==='felice'){STATS.forEach(([s])=>S.st[s]=100);if(ui.cheat&&ui.cheat.st)STATS.forEach(([s])=>ui.cheat.st[s]=100);STATS.forEach(([s])=>{const i=$('chSt_'+s),v=$('chStv_'+s);if(i)i.value=100;if(v)v.textContent='100'})}
  const x=SUPER9.find(y=>y[0]===k);save();updateHud();toast(`${x[1]} Fatto: ${x[2]}!`)}
{const _cb=cheatBody;cheatBody=function(){const c=ui.cheat;if(!c)return '';const h=_cb(),i=h.lastIndexOf('<button class="btn hot" type="button" data-cheatgo');if(i<0)return h;
  const x=`<div style="border-top:2px dashed #e2dccf;margin:14px 0 6px"></div><div class="h3">🎁 Super trucchi (subito, gratis!)</div><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px">${SUPER9.map(([k,ic,n])=>`<button type="button" class="btn alt" data-super9="${k}" style="font-size:14px;padding:10px 6px;white-space:normal;min-width:0">${ic} ${n}</button>`).join('')}</div>`;
  return h.slice(0,i)+x+h.slice(i)}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-super9]');if(b)super9(b.dataset.super9)});
