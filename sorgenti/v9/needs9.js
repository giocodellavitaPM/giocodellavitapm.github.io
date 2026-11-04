/* ===== v9: bisogni con il conto alla rovescia, orologio della giornata, lavoro ===== */
const NEEDS=[{k:'mangia',ic:'🍽️',n:'Mangiare',t:600,acts:['sheet:cucina','sheet:frigo','sheet:dispensa','pappa','merenda'],cnt:['pizza','gelato','merenda'],dove:'Frigorifero o fornelli di casa, pizzeria, gelateria',furn:'sheet:frigo'},
 {k:'bevi',ic:'🥤',n:'Bere',t:600,acts:['sheet:frigo','sheet:cucina','merenda','pappa','denti'],cnt:['gelato'],dove:'Frigorifero o lavandino',furn:'sheet:frigo'},
 {k:'bagno',ic:'🚽',n:'Andare in bagno',t:2700,acts:['bagno'],cnt:[],dove:'Il water di casa',furn:'bagno'},
 {k:'lavati',ic:'🛁',n:'Lavarti (fare il bagno)',t:3600,acts:['bagnetto','denti','idro9'],cnt:[],dove:'Vasca da bagno o lavandino',furn:'bagnetto'},
 {k:'dormi',ic:'😴',n:'Dormire',t:5400,acts:['sheet:letto','lettone'],cnt:[],dove:'Il tuo letto',furn:'sheet:letto'}];
const needsOn=()=>S&&S.alive&&S.age>=6&&!(S.flags&&S.flags.noNeeds);
function needFill(k){S.need=S.need||{};const N=NEEDS.find(x=>x.k===k);if(N)S.need[k]=N.t}
function needReset(){NEEDS.forEach(N=>needFill(N.k))}
function needsTick(dt){if(!needsOn()){return}S.need=S.need||{};if(!$('veil').hidden||ui.flying||document.hidden)return;
  NEEDS.forEach(N=>{if(S.need[N.k]==null)S.need[N.k]=N.t;const was=S.need[N.k];S.need[N.k]-=dt;const v=S.need[N.k];
    if(was>60&&v<=60)toast(`${N.ic} Attento! Devi ${N.n.toLowerCase()} entro 1 minuto, se no perdi un anno di vita!`);
    if(v<=0){S.lifeLost=(S.lifeLost||0)+1;S.need[N.k]=N.t;add('sal',-6);add('fel',-4);const m=`${N.ic} Non hai fatto in tempo a ${N.n.toLowerCase()}: perdi un anno di vita! ❤️‍🩹 (Anni persi: ${S.lifeLost})`;log(m);save();updateHud();toast(m)}});
  ui.nT=(ui.nT||0)+dt;if(ui.nT>5){ui.nT=0;save()}}
{const _uf=useFurn;useFurn=function(f){const a=f&&f.act||'';NEEDS.forEach(N=>{if(N.acts.includes(a))needFill(N.k)});return _uf(f)}}
{const _c=count;count=function(k,n){NEEDS.forEach(N=>{if(N.cnt.includes(k))needFill(N.k)});return _c(k,n)}}
{const _au=ageUp;ageUp=function(){_au();needReset();S.clock=7*60}}
{const _ce=checkEnd;checkEnd=function(){const a=S.age;S.age=a+(S.lifeLost||0);try{return _ce()}finally{S.age=a}}}
// orologio: 1 secondo vero = 1 minuto nel gioco
const hhmm=m=>{m=((Math.floor(m)%1440)+1440)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0')};
function clockTick(dt){if(!S||!S.alive)return;if(S.clock==null)S.clock=7*60;if(!$('veil').hidden||ui.flying)return;S.clock=(S.clock+dt)%1440}
const fmtS=s=>{s=Math.max(0,Math.ceil(s));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),z=String(s%60).padStart(2,'0');return h?h+':'+String(m).padStart(2,'0')+':'+z:m+':'+z};
const fmtH=m=>{m=Math.round(m);const h=Math.floor(m/60),mm=m%60;return h?`${h} ${h===1?'ora':'ore'}${mm?' e '+mm+' minuti':''}`:`${mm} minuti`};
function workInfo(){const J=S.job;if(!J)return null;const da=(J.da!=null?J.da:8)*60,a=(J.a!=null?J.a:17)*60,now=S.clock||0;
  const inShift=a>da?(now>=da&&now<a):(now>=da||now<a);let wait=da-now;if(wait<0)wait+=1440;return {da,a,inShift,wait,left:(a-now+1440)%1440}}
PLACES.bisogni9={sub:()=>'Cose da fare ogni giorno',body:()=>{
  if(S.age<6)return `<p class="note">Sei piccol${o()}: a mangiare, bere e dormire ci pensano mamma e papà! 👨‍👩‍👧</p>`;
  if(S.flags.noNeeds)return `<p class="note">I bisogni sono spenti dal pannello segreto. 🤫</p>`;
  return `<p class="note">Se il tempo finisce perdi <b>un anno di vita</b>! Il tempo passa solo mentre giochi.</p>`+NEEDS.map(N=>{const v=(S.need||{})[N.k]??N.t,r=v<60;
    return `<div class="row"><div class="t"><b>${N.ic} ${N.n} entro <span style="color:${r?'#e5484d':'inherit'}">${fmtS(v)}</span></b><span>${N.dove}</span><div style="height:6px;border-radius:4px;background:#e5e7eb;margin-top:4px;overflow:hidden"><div style="height:100%;width:${Math.max(0,Math.min(100,v/N.t*100))}%;background:${r?'#e5484d':v<N.t*.4?'#f5a700':'#2bb673'}"></div></div></div><button class="btn ${r?'hot':''}" data-need9="${N.k}">Vai</button></div>`}).join('')+
    `<p class="note">❤️‍🩹 Anni di vita persi: <b>${S.lifeLost||0}</b></p>`}};
SHEET_T.bisogni9=['🍎','Mangia, bevi e…'];
PLACES.lavoro9={sub:()=>'🕗 Adesso sono le '+hhmm(S.clock||0),body:()=>{const w=workInfo();
  if(!S.job)return `<p class="note">${S.age<16?'Sei ancora piccol'+o()+' per lavorare: per ora vai a scuola! 🎒':'Non hai ancora un lavoro: cercalo allo sportello degli uffici. 💼'}</p>`+(S.age>=16?`<button class="btn hot" data-gowork9="uff" style="width:100%">📍 Vai agli uffici</button>`:'');
  return `<div class="row"><div class="t"><b>💼 ${esc(jobName(S.job))}</b><span>Orario: dalle ${hhmm(w.da)} alle ${hhmm(w.a)}</span></div></div>`+
    `<p class="note" style="font-size:18px">${w.inShift?`⏰ <b>Sei in orario di lavoro!</b> Vai subito: finisci alle ${hhmm(w.a)} (tra ${fmtH(w.left)}).`:`Il lavoro inizia tra <b>${fmtH(w.wait)}</b>, alle ${hhmm(w.da)}.`}</p><button class="btn hot" data-gowork9="job" style="width:100%">📍 Vai al lavoro</button>`}};
SHEET_T.lavoro9=['💼','Il tuo lavoro'];
document.addEventListener('click',e=>{const b=e.target.closest('[data-need9],[data-gowork9],#needBtn9,#workBtn9,#clock9');if(!b)return;
  if(b.id==='needBtn9')return openPlace('bisogni9');if(b.id==='workBtn9'||b.id==='clock9')return openPlace('lavoro9');
  if(b.dataset.gowork9){closeSheet();if(b.dataset.gowork9==='uff'){toast('📍 Ti porto agli uffici!');return goPlace('ufficio')}const to=workAt();ui.goFurn={sc:to,furn:'lavorasodo'};toast('📍 Ti porto al lavoro!');return goPlace(to)}
  const N=NEEDS.find(x=>x.k===b.dataset.need9);if(!N)return;closeSheet();const H=HOME();
  if(N.k==='mangia'&&S.scene!==H&&S.scene!=='citta'&&S.money>=5){money(-5);needFill('mangia');needFill('bevi');save();updateHud();return toast('🥪 Ti compri un panino e una bottiglietta d\'acqua: 5 €. Buono!')}
  ui.goFurn={sc:H,furn:N.furn};toast(`📍 Ti porto a casa: ${N.dove.split(',')[0].toLowerCase()}!`);if(S.scene===H){goFurnTick()}else goPlace(H)});
(function(){const hb=$('helpBtn');if(!hb)return;
  hb.insertAdjacentHTML('afterend','<button class="ib" id="needBtn9" type="button" aria-label="Mangia, bevi e bagno" style="position:relative">🍎<span id="needBadge9" style="position:absolute;right:-6px;bottom:-8px;background:#2bb673;color:#fff;font:800 10px system-ui;border-radius:8px;padding:1px 5px;white-space:nowrap" hidden></span></button><button class="ib" id="workBtn9" type="button" aria-label="Il lavoro" style="position:relative">💼<span id="workBadge9" style="position:absolute;right:-6px;bottom:-8px;background:#3b6fe0;color:#fff;font:800 10px system-ui;border-radius:8px;padding:1px 5px;white-space:nowrap" hidden></span></button>');
  const ck=document.createElement('button');ck.id='clock9';ck.type='button';ck.style.cssText='position:fixed;z-index:5;left:max(12px,env(safe-area-inset-left,0px));bottom:calc(30px + env(safe-area-inset-bottom,0px));background:rgba(31,37,64,.88);color:#fff;border:2px solid #fff;border-radius:14px;padding:6px 10px;font:900 18px monospace;box-shadow:0 3px 0 rgba(0,0,0,.25)';document.body.appendChild(ck);
  setInterval(()=>{if(!S)return;const busy=!!ui.sheet||!!ui.chatNpc||!$('veil').hidden;ck.hidden=busy||!S.alive||(ui.air&&S.scene==='citta');
    const now=S.clock||0,day=now>=6*60&&now<20*60;ck.textContent=(day?'☀️ ':'🌙 ')+hhmm(now);
    const nb=$('needBadge9');if(nb){if(!needsOn()){nb.hidden=true}else{const m=Math.min(...NEEDS.map(N=>(S.need||{})[N.k]??N.t));nb.textContent=fmtS(m);nb.style.background=m<60?'#e5484d':m<120?'#f5a700':'#2bb673';nb.hidden=false}}
    const wb=$('workBadge9');if(wb){const w=S.job&&workInfo();if(!w)wb.hidden=true;else{wb.textContent=w.inShift?'ORA!':Math.floor(w.wait/60)+'h'+String(Math.round(w.wait%60)).padStart(2,'0');wb.style.background=w.inShift?'#e5484d':'#3b6fe0';wb.hidden=false}}
    if(ui.sheet&&(ui.sheet.id==='bisogni9'||ui.sheet.id==='lavoro9'||ui.sheet.type==='place'&&(ui.sheet.id==='bisogni9'||ui.sheet.id==='lavoro9'))){const sc=$('sheet')&&$('sheet').querySelector('.bd'),top=sc?sc.scrollTop:0;renderSheet();const s2=$('sheet')&&$('sheet').querySelector('.bd');if(s2)s2.scrollTop=top}},1000)})();
{const _st=step;step=function(dt){if(S&&S.alive){needsTick(dt);clockTick(dt)}return _st(dt)}}

/* ===== v9: codice segreto, ancora altre cose ===== */
{const _m=multa;multa=function(why,amt){if(!(S.flags&&S.flags.mutaMulte)||S.flags.nomulte)return _m(why,amt);
  if(performance.now()-(ui.lastFine||0)<5000)return;ui.lastFine=performance.now();if(S.age<14)return;money(-amt);S.multe=(S.multe||0)+1;log(`Multa di ${eur(amt)}: ${why}`);save();updateHud()}}
{const _cr=cheatReply;cheatReply=function(n,t){const r=_cr(n,t);if(r&&ui.cheat)Object.assign(ui.cheat,{multeNotif:!(S.flags.mutaMulte),needs:!S.flags.noNeeds,voti:false,scout:!!S.flags.scout,ora:Math.floor((S.clock||420)/60),pnome:S.partner?S.partner.nome:'',knomi:S.kids.map(k=>k.nome),lifeLost:S.lifeLost||0});return r}}
{const _cb=cheatBody;cheatBody=function(){const c=ui.cheat;if(!c)return '';const h=_cb(),i=h.lastIndexOf('<button class="btn hot" type="button" data-cheatgo');
  const sec=t=>`<div class="h3" style="margin-top:18px;padding-top:10px;border-top:2px dashed var(--line)">${t}</div>`,yn=(k,v)=>`<div class="seg"><button type="button" class="sw" data-cset="${k}:1" aria-pressed="${!!v}">Sì</button><button type="button" class="sw" data-cset="${k}:0" aria-pressed="${!v}">No</button></div>`,chip=(k,v,lbl,on)=>`<button type="button" class="sw" data-cset="${k}:${v}" aria-pressed="${on}">${(on?'✓ ':'')+lbl}</button>`;
  let x=sec('👮 Multe')+`<div class="field"><label>Ti arriva la notifica quando prendi una multa?</label>${yn('multeNotif',c.multeNotif)}<p class="note">Se scegli «No», le multe le paghi lo stesso, ma senza il messaggio.</p></div>`;
  x+=sec('🍎 Bisogni')+`<div class="field"><label>Mangiare, bere, bagno e dormire con il tempo?</label>${yn('needs',c.needs)}</div>`+`<div class="field"><label>❤️‍🩹 Anni di vita persi</label><div style="display:flex;align-items:center;gap:10px"><button type="button" class="btn alt" data-cset="lifeLost:-1">−</button><b style="font-size:24px;min-width:40px;text-align:center">${c.lifeLost}</b><button type="button" class="btn alt" data-cset="lifeLost:+1">+</button></div></div>`;
  x+=sec('🕗 Ora del giorno')+`<div class="field"><select id="chOra" style="${CIN}">${Array.from({length:24},(_,hh)=>`<option value="${hh}" ${hh===c.ora?'selected':''}>${String(hh).padStart(2,'0')}:00</option>`).join('')}</select></div>`;
  x+=sec('📚 Scuola e sport')+`<div class="field"><div class="seg wrap">${chip('voti',1,'🔟 Tutti 10 a scuola',c.voti)}${chip('scout',1,'⚽ Notato dall\'osservatore (calciatore)',c.scout)}</div></div>`;
  if(c.partner||c.knomi.length)x+=sec('✏️ Nomi della famiglia')+(c.partner?`<div class="field"><label for="chPn">Nome ${c.married?(c.sex==='f'?'di tuo marito':'di tua moglie'):'della persona che ami'}</label><input id="chPn" maxlength="20" value="${esc(c.pnome||'')}" style="${CIN}"></div>`:'')+c.knomi.map((k,j)=>`<div class="field"><label for="chKn${j}">Nome del figlio ${j+1}</label><input id="chKn${j}" maxlength="20" value="${esc(k)}" style="${CIN}"></div>`).join('');
  return i<0?h+x:h.slice(0,i)+x+h.slice(i)}}
{const _ck=cheatKeep;cheatKeep=function(){_ck();const c=ui.cheat;if(!c)return;const o2=$('chOra');if(o2)c.ora=+o2.value;const pn=$('chPn');if(pn)c.pnome=pn.value;(c.knomi||[]).forEach((_,j)=>{const e=$('chKn'+j);if(e)c.knomi[j]=e.value})}}
{const _cs=cheatSet;cheatSet=function(v){const c=ui.cheat,k=v.slice(0,v.indexOf(':')),x=v.slice(v.indexOf(':')+1);
  if(['multeNotif','needs','voti','scout','lifeLost'].includes(k)){cheatKeep();if(k==='multeNotif'||k==='needs')c[k]=x==='1';else if(k==='lifeLost')c.lifeLost=Math.max(0,c.lifeLost+(+x));else c[k]=!c[k];
    const sc=$('sheet')&&$('sheet').querySelector('.bd'),top=sc?sc.scrollTop:0;renderSheet();const s2=$('sheet')&&$('sheet').querySelector('.bd');if(s2)s2.scrollTop=top;return}
  return _cs(v)}}
{const _cg=cheatGo;cheatGo=function(){const c=ui.cheat;if(!c)return _cg();cheatKeep();const ex={...c,knomi:[...(c.knomi||[])]};_cg();
  S.flags.mutaMulte=ex.multeNotif?0:1;S.flags.noNeeds=ex.needs?0:1;if(ex.needs&&!S.need)needReset();S.lifeLost=ex.lifeLost;S.clock=ex.ora*60;
  if(ex.voti){S.voti=[10,10,10];S.lastVoto=10;S.bestVoto=10;S.studied=true}if(ex.scout)S.flags.scout=true;else delete S.flags.scout;
  if(S.partner&&ex.pnome&&ex.pnome.trim()){S.partner.nome=ex.pnome.trim();if(S.amore)S.amore.nome=S.partner.nome}
  ex.knomi.forEach((nm,j)=>{if(S.kids[j]&&nm&&nm.trim())S.kids[j].nome=nm.trim()});syncNpcs();save();updateHud()}}

/* ===== v9: nel garage tocchi un mezzo e parti ===== */
{const _og=openGarage;openGarage=function(){_og();const sc=SC.garagemio;if(!sc||S.scene!=='garagemio')return;
  sc.furn.forEach(f=>{const it=S.items.find(i=>i.n===f.label);if(!it)return;
    if(f.k==='car'){f.k='mycar9';f.cid=it.id;f.act='guida9:'+it.id;f.label='Guida: '+it.n}
    else if(f.k==='vshow'){f.act='guida9:'+it.id;f.label='Guida: '+it.n}});
  if(typeof rebuildSol==='function')rebuildSol(sc)}}
PLACES.guida9={sub:()=>'Si parte?',body:()=>{const d=ALLITEMS.find(x=>x.id===ui.guidaId);if(!d)return '';
  return `<div style="text-align:center;font-size:64px;margin:6px 0">${d.ic}</div><p class="note" style="text-align:center;font-size:20px"><b>Vuoi guidare: ${esc(d.n)}?</b></p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><button class="btn hot" data-guida9="si" style="font-size:20px;padding:12px">✅ Sì</button><button class="btn alt" data-guida9="no" style="font-size:20px;padding:12px">❌ No</button></div>`}};
SHEET_T.guida9=['🔑','Il tuo mezzo'];
function guidaFuori(id){const d=ALLITEMS.find(x=>x.id===id);if(!d)return;const L=LIC[d.lic];
  if(d.lic&&!S.lic[d.lic])return toast(`🪪 Per guidarlo serve la patente: ${L?L.n:d.lic}. La prendi in concessionaria!`);
  const b=BUILD.find(x=>x.id==='casamia');S.scene='citta';S.pos={x:b.dx+.5,y:b.dy+1.5};S.face='d';S.ride=false;S.parked=null;ui.walk=null;ui.car=null;syncNpcs();
  rideSel(id);save();updateHud();if(!isCar(id))toast(`${d.ic} Esci dal garage con: ${d.n}! Brum brum!`)}
{const _uf=useFurn;useFurn=function(f){const a=f&&f.act||'';if(a.startsWith('guida9:')){ui.guidaId=a.slice(7);return openPlace('guida9')}return _uf(f)}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-guida9]');if(!b)return;closeSheet();if(b.dataset.guida9==='si')guidaFuori(ui.guidaId)});
{const _d=drawFurn9;drawFurn9=function(fu,X,Y,w,h,t,box){if(fu.k==='mycar9'){const c=cx;c.save();c.setTransform(c.getTransform());drawCarAt((X+w/2)/T,(Y+h/2)/T,0,myCarCol(fu.cid),false,SHAPE[fu.cid]);c.restore();
  c.fillStyle='rgba(31,37,64,.8)';c.font='700 10px system-ui';const tw=c.measureText(fu.label.replace('Guida: ','')).width+10;rr(c,X+w/2-tw/2,Y+h-4,tw,14,5);c.fill();c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.fillText(fu.label.replace('Guida: ',''),X+w/2,Y+h+3);return}
  return _d(fu,X,Y,w,h,t,box)}}
(function(){const st=document.createElement('style');st.textContent='@media (max-width:480px){.iconbtns{gap:4px}.iconbtns .ib{width:38px;height:38px;font-size:19px;border-radius:12px}}@media (max-width:360px){.iconbtns .ib{width:34px;height:34px;font-size:17px}}';document.head.appendChild(st)})();

/* ===== v9: ogni lavoro ha il suo orario vero ===== */
const JOBHRS={cameriere:[18,23,'Tutte le sere, quando la gente va a cena'],commesso:[9,17,'Il negozio è aperto di giorno'],pizzaiolo:[17,23,'Le pizze si fanno la sera'],cuoco:[17,23,'In cucina per la cena'],meccanico:[8,17,'In officina tutto il giorno'],elettricista:[8,16,'Dalla mattina presto'],impiegato:[9,17,'In ufficio'],
 allenatore:[15,19,'Allenamenti del pomeriggio'],polizia:[8,14,'Un turno di 6 ore'],pompiere:[8,20,'Un turno lungo di 12 ore, pronti a correre!'],programmatore:[9,18,'Al computer'],infermiere:[7,14,'Turno della mattina in ospedale'],insegnante:[8,13,'Le lezioni sono la mattina'],
 commercialista:[9,18,'In studio'],avvocato:[9,19,'In studio e in tribunale'],ingegnere:[9,18,'In studio e nei cantieri'],veterinario:[9,19,'Visite agli animali'],medico:[8,16,'Visite in ospedale'],astronauta:[6,12,'Addestramento spaziale'],calciatore:[10,13,'Allenamento con la squadra allo stadio']};
function setJobHrs(J){const h=JOBHRS[J&&J.id];if(h){J.da=h[0];J.a=h[1]}}
setInterval(()=>{if(S&&S.job&&S.job.da==null)setJobHrs(S.job)},1000);
{const _ck=cheatKeep;cheatKeep=function(){const c=ui.cheat,old=c&&c.job;_ck();if(c&&c.job&&c.job!==old){const h=JOBHRS[c.job];if(h){c.da=h[0];c.a=h[1]}}}}
{const _cr=cheatReply;cheatReply=function(n,t){const r=_cr(n,t);if(r&&ui.cheat&&S.job&&S.job.da==null){const h=JOBHRS[S.job.id];if(h){ui.cheat.da=h[0];ui.cheat.a=h[1]}}return r}}
{const _lb=PLACES.lavoro9.body;PLACES.lavoro9.body=()=>{let h=_lb();const J=S.job,x=J&&JOBHRS[J.id];if(x)h=h.replace('</span></div></div>',` · ${((J.a-J.da+24)%24)} ore, tutti i giorni<br>${x[2]}</span></div></div>`);return h}}

/* ===== v9: cibo e bevande nello zaino ===== */
const FOOD=[{k:'pasta',n:'Pasta al pomodoro',ic:'🍝',m:1,p:4},{k:'pizza9',n:'Pizza',ic:'🍕',m:1,p:6},{k:'panino',n:'Panino',ic:'🥪',m:1,p:3},{k:'mela',n:'Mela',ic:'🍎',m:1,p:1},{k:'banana9',n:'Banana',ic:'🍌',m:1,p:1},
 {k:'hamburger',n:'Hamburger',ic:'🍔',m:1,p:5},{k:'insalata',n:'Insalata',ic:'🥗',m:1,p:4},{k:'yogurt',n:'Yogurt',ic:'🥣',m:1,p:1},{k:'biscotti9',n:'Biscotti',ic:'🍪',m:1,p:2},{k:'cornetto',n:'Cornetto',ic:'🥐',m:1,p:1},
 {k:'acqua',n:'Acqua',ic:'💧',b:1,p:1},{k:'coca',n:'Coca-cola',ic:'🥤',b:1,p:2},{k:'succo9',n:'Succo di frutta',ic:'🧃',b:1,p:2},{k:'latte9',n:'Latte',ic:'🥛',b:1,m:1,p:1},{k:'aranciata',n:'Aranciata',ic:'🍊',b:1,p:2},{k:'te',n:'Tè freddo',ic:'🧋',b:1,p:2}];
const FRIGO9=['mela','yogurt','acqua','latte9','pasta','succo9','panino'];
function foodN(){S.food=S.food||{mela:2,acqua:2,panino:1};return S.food}
function addFood(k,n){const F=foodN();F[k]=(F[k]||0)+(n||1)}
function eatFood(k){const F=foodN(),f=FOOD.find(x=>x.k===k);if(!f||!F[k])return;F[k]--;if(!F[k])delete F[k];
  if(f.m)needFill('mangia');if(f.b)needFill('bevi');add('fel',2);if(f.m)add('sal',1);
  const m=f.b&&!f.m?`${f.ic} Bevi: ${f.n}. Gluglu, che sete avevi!`:`${f.ic} Mangi: ${f.n}. Gnam, buonissimo!${f.b?' (E hai anche bevuto!)':''}`;save();updateHud();refreshSheet();toast(m)}
function foodRows(){const F=foodN(),L=FOOD.filter(f=>F[f.k]);
  let h=`<div class="h3">🍎 Cibo e bevande</div>`;
  if(!L.length)return h+`<p class="note">Non hai niente da mangiare o da bere! Compra qualcosa al supermercato 🛒 o prendilo dal frigo di casa. 🧊</p>`;
  return h+L.map(f=>`<div class="row"><div class="t"><b>${f.ic} ${f.n}${F[f.k]>1?' ×'+F[f.k]:''}</b><span>${f.m&&f.b?'Mangi e bevi':f.b?'Da bere':'Da mangiare'}</span></div><button class="btn hot" data-eat9="${f.k}">${f.b&&!f.m?'🥤 Bevi':'🍽️ Mangia'}</button></div>`).join('')}
{const _ir=invRows;invRows=function(){return foodRows()+`<div class="h3">🎒 Le altre cose</div>`+_ir()}}
{const _sb=PLACES.supermercato.body;PLACES.supermercato.body=()=>{const h=_sb();if(S.age<6)return h;
  return h+`<div class="h3">🎒 Cibo e bevande per lo zaino</div>`+FOOD.map(f=>{const ok=canPay(f.p);return `<div class="row"><div class="t"><b>${f.ic} ${f.n}</b><span>${eur(f.p)}${foodN()[f.k]?' · nello zaino: '+foodN()[f.k]:''}</span></div><button class="btn ${ok?'hot':''}" data-buyfood9="${f.k}" ${ok?'':'disabled'}>Compra</button></div>`}).join('')}}
{const _fb=PLACES.frigo.body;PLACES.frigo.body=()=>{const h=_fb();if(S.age<6)return h;
  return `<div class="h3">🧊 Prendi dal frigo e metti nello zaino</div>`+FRIGO9.map(k=>{const f=FOOD.find(x=>x.k===k);return `<div class="row"><div class="t"><b>${f.ic} ${f.n}</b><span>Gratis, è di casa tua${foodN()[k]?' · nello zaino: '+foodN()[k]:''}</span></div><button class="btn hot" data-takefood9="${k}">Prendi</button></div>`}).join('')+h}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-eat9],[data-buyfood9],[data-takefood9],[data-zaino9]');if(!b)return;
  if(b.dataset.eat9)return eatFood(b.dataset.eat9);
  if(b.dataset.zaino9){closeSheet();ui.ioTab='zaino';return openIo()}
  if(b.dataset.buyfood9){const f=FOOD.find(x=>x.k===b.dataset.buyfood9);if(!f||!canPay(f.p))return toast('Non hai abbastanza soldi. 💸');money(-f.p);addFood(f.k);save();updateHud();refreshSheet();return toast(`${f.ic} ${f.n} nello zaino! 🎒`)}
  const f=FOOD.find(x=>x.k===b.dataset.takefood9);if(!f)return;addFood(f.k);save();refreshSheet();toast(`${f.ic} ${f.n} nello zaino! 🎒`)});
{const _bb=PLACES.bisogni9.body;PLACES.bisogni9.body=()=>{const h=_bb();if(S.age<6||S.flags.noNeeds)return h;const F=foodN(),n=Object.values(F).reduce((a,b)=>a+b,0);
  return `<button class="btn hot" data-zaino9="1" style="width:100%;margin-bottom:10px">🎒 Apri lo zaino: mangia e bevi (${n} ${n===1?'cosa':'cose'})</button>`+h}}
NEEDS[0].dove='Cibo nello zaino 🎒, frigo di casa, pizzeria';NEEDS[1].dove='Bevande nello zaino 🎒, frigo o lavandino';

/* ===== v9: la lista resta dov'era quando compri o prendi ===== */
{const _rs=renderSheet;renderSheet=function(){const s=ui.sheet,key=s?(s.type+'|'+(s.id||'')+'|'+(ui.ioTab||'')+'|'+(ui.mapTab||'')):'';const bd=$('sheet')&&$('sheet').querySelector('.bd'),top=bd&&!$('sheet').hidden&&ui.lastSheetKey===key?bd.scrollTop:0;
  _rs();ui.lastSheetKey=key;if(top){const b2=$('sheet')&&$('sheet').querySelector('.bd');if(b2)b2.scrollTop=top}}}
{const _cs=closeSheet;closeSheet=function(){ui.lastSheetKey='';return _cs()}}

/* ===== v9: casa, ancora più cose e «Prendi tutto» ===== */
UPG2.push(
 {k:'piscinacoperta',n:'Piscina coperta riscaldata',ic:'🏊‍♂️',p:120000,d:'Per nuotare anche d\'inverno'},
 {k:'acquario',n:'Acquario gigante',ic:'🐠',p:15000,d:'Pesci colorati e una tartaruga'},
 {k:'biblioteca9',n:'Biblioteca di casa',ic:'📚',p:8000,d:'Mille libri e fumetti'},
 {k:'musica',n:'Sala musica',ic:'🎸',p:12000,d:'Chitarra, batteria e pianoforte'},
 {k:'karaoke',n:'Karaoke',ic:'🎤',p:3000,d:'Per cantare a squarciagola'},
 {k:'bowling',n:'Pista da bowling',ic:'🎳',p:70000,d:'Strike!'},
 {k:'pingpong',n:'Tavolo da ping pong',ic:'🏓',p:900,d:'Sfide all\'ultimo punto'},
 {k:'biliardo',n:'Biliardo',ic:'🎱',p:6000,d:'Come i professionisti'},
 {k:'skatepark',n:'Mini skatepark',ic:'🛹',p:25000,d:'Rampe e salti'},
 {k:'arrampicata',n:'Parete da arrampicata',ic:'🧗',p:14000,d:'Fino in cima!'},
 {k:'gokart',n:'Pista dei go-kart',ic:'🏎️',p:90000,d:'Gare in giardino'},
 {k:'osservatorio',n:'Osservatorio con telescopio',ic:'🔭',p:30000,d:'Per guardare le stelle e la Luna'},
 {k:'serra',n:'Serra con i fiori',ic:'🌺',p:7000,d:'Fiori tutto l\'anno'},
 {k:'pollaio',n:'Pollaio',ic:'🐔',p:2500,d:'Uova fresche ogni mattina'},
 {k:'canile',n:'Cuccia di lusso per gli animali',ic:'🐶',p:3000,d:'Per il tuo cane e il tuo gatto'},
 {k:'cucinapro',n:'Cucina da chef',ic:'👨‍🍳',p:35000,d:'Forno a legna per la pizza'},
 {k:'cantina',n:'Stanza dei giochi segreta',ic:'🗝️',p:20000,d:'Con un passaggio nascosto dietro la libreria'},
 {k:'bunker',n:'Rifugio sotterraneo',ic:'🛡️',p:150000,d:'Con le scorte di cibo'},
 {k:'fuochi',n:'Fuochi d\'artificio',ic:'🎆',p:2000,d:'Per fare festa in giardino'},
 {k:'ruota',n:'Ruota panoramica',ic:'🎡',p:500000,d:'Nel tuo giardino!'});
OUT_K.push('piscinacoperta','acquario','biblioteca9','musica','karaoke','bowling','pingpong','biliardo','skatepark','arrampicata','gokart','osservatorio','serra','pollaio','canile','cucinapro','cantina','bunker','fuochi','ruota');
const UPGEMO={piscinacoperta:['🏊‍♂️','nuota9','Nuota al caldo'],acquario:['🐠','acquario9','Guarda i pesci'],biblioteca9:['📚','libro9','Leggi un libro'],musica:['🎸','musica9','Suona'],karaoke:['🎤','karaoke9','Canta al karaoke'],bowling:['🎳','bowling9','Gioca a bowling'],pingpong:['🏓','pingpong9','Ping pong'],biliardo:['🎱','biliardo9','Biliardo'],skatepark:['🛹','skate9','Fai un salto con lo skate'],arrampicata:['🧗','arrampica9','Arrampicati'],gokart:['🏎️','gokart9','Gara di go-kart'],osservatorio:['🔭','stelle9','Guarda le stelle'],serra:['🌺','serra9','Annaffia i fiori'],pollaio:['🐔','uova9','Raccogli le uova'],canile:['🐶','cuccia9','Coccola gli animali'],cucinapro:['👨‍🍳','chef9','Cucina una pizza'],cantina:['🗝️','segreto9','Apri il passaggio segreto'],bunker:['🛡️','bunker9','Entra nel rifugio'],fuochi:['🎆','fuochi9','Accendi i fuochi'],ruota:['🎡','ruota9','Giro sulla ruota panoramica']};
Object.assign(GACT,{nuota9:['Vasche su vasche nell\'acqua calda! 🏊‍♂️','spo',4],acquario9:['Un pesce pagliaccio ti saluta dal vetro! 🐠','fel',3],libro9:['Leggi un fumetto bellissimo. 📚','int',3],musica9:['Suoni la batteria a tutto volume! 🥁🎸','fel',4],karaoke9:['Canti la tua canzone preferita! 🎤🎶','fel',4],bowling9:['STRIKE! Tutti i birilli giù! 🎳','fel',5],pingpong9:['Vinci 11 a 9 a ping pong! 🏓','spo',2],biliardo9:['Imbuchi tre palle in un colpo! 🎱','int',2],skate9:['Che salto sulla rampa! 🛹','spo',3],arrampica9:['Arrivi in cima alla parete! 🧗','spo',4],gokart9:['Primo posto alla gara di go-kart! 🏁🏎️','fel',6],stelle9:['Vedi i crateri della Luna e gli anelli di Saturno! 🔭🪐','int',4],serra9:['Annaffi i fiori: che profumo! 🌺','fel',2],uova9:['Raccogli 4 uova fresche! 🥚','sal',2],cuccia9:['Coccole per tutti gli animali! 🐶🐱','fel',4],chef9:['Pizza nel forno a legna: buonissima! 🍕','sal',3],segreto9:['Sposti un libro… e la libreria si apre! Una stanza segreta piena di giochi! 🗝️','fel',6],bunker9:['Nel rifugio è tutto in ordine: scorte, torce e giochi da tavolo. 🛡️','int',2],fuochi9:['BOOM! Fuochi d\'artificio colorati nel cielo! 🎆','fel',6],ruota9:['Dalla ruota panoramica vedi tutta la città! 🎡','fel',6]});
{const _og=openGiardino;openGiardino=function(){_og();const sc=SC.giardino9;if(!sc||S.scene!=='giardino9')return;
  const L=Object.keys(UPGEMO).filter(k=>hasH(k));if(!L.length)return;const W=sc.w;let y=Math.max(...sc.furn.map(f=>f.y+f.h),9)+1;const per=Math.max(3,Math.floor((W-4)/3));
  const H2=Math.max(sc.h,y+Math.ceil(L.length/per)*2+3),F=sc.furn.slice();L.forEach((k,i)=>{const [e,a,l]=UPGEMO[k],f=fu('emo9',2+(i%per)*3,y+Math.floor(i/per)*2,1,1,a,l);f.emo=e;F.push(f)});
  room('giardino9',W,H2,sc.floor||'#7fb069',sc.floor2||'#78a862',sc.wall||'#cfe8f5',F);S.pos={x:Math.floor(W/2)+.5,y:H2-1.6}}}
function upgLeft(){return UPG2.filter(u=>!hasH(u.k))}
function buyAllUpg(){const L=upgLeft();let tot=0;const ord=L.filter(u=>!u.need).concat(L.filter(u=>u.need));const can=[];
  for(const u of ord){if(u.need&&!hasH(u.need)&&!can.some(c=>c.k===u.need))continue;can.push(u);tot+=u.p}
  if(!can.length)return toast('Hai già tutto! 🎉');if(!canPay(tot))return toast(`Per prendere tutto servono ${eur(tot)}. 💸`);
  money(-tot);can.forEach(u=>{S.flags['u_'+u.k]=1});add('fel',10);const m=`Hai preso tutto: ${can.length} cose per casa tua, per ${eur(tot)}! 🎉 Le trovi nel giardino.`;log(m);save();updateHud();refreshSheet();toast(m)}
{const _ab=PLACES.agenzia.body;PLACES.agenzia.body=()=>{let h=_ab();if(S.age<18||!S.house)return h;const L=upgLeft().filter(u=>!u.need||hasH(u.need)||upgLeft().some(x=>x.k===u.need)),tot=L.reduce((a,u)=>a+u.p,0);
  const btn=L.length?`<div class="row" style="background:#fff4d6;border-radius:14px;padding:10px"><div class="t"><b>🛍️ Prendi tutto (${L.length} cose)</b><span>Tutte le cose per casa tua in un colpo solo</span></div><button class="btn ${canPay(tot)?'hot':''}" data-upgall9="1" ${canPay(tot)?'':'disabled'}>${eur(tot)}</button></div>`:`<p class="note">🎉 Hai già tutte le cose per casa tua!</p>`;
  return h.replace('<div class="h3">✨ Ancora più cose per casa tua</div>','<div class="h3">✨ Ancora più cose per casa tua</div>'+btn)}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-upgall9]');if(b)buyAllUpg()});

/* ===== v9: vendi le case una alla volta ===== */
PA.vendiCasa.ok=()=>false;
const sellVal=h=>Math.round(h.p*1.05)-(h.mutuo?Math.round(h.rata*h.mutuo*0.75):0);
function vendiUna(id){const ids=myHouseIds(),i=ids.indexOf(id);if(i<0)return;const h=id==='casamia'?S.house:S.houses[i-1];if(!h)return;const v=sellVal(h);
  const oldCodes={...(S.codes||{})};money(v);
  if(id==='casamia'){if(S.houses&&S.houses.length){const n=S.houses.shift();S.house={id:n.id,n:n.n,ic:n.ic,p:n.p,mutuo:0,rata:0}}else{S.house=null;if(S.home==='casa')S.home='affitto';S.flags.garage=0;S.flags.pista=0}}
  else S.houses.splice(i-1,1);
  // i codici seguono le case che restano
  const left=ids.filter(x=>x!==id),nc={};left.forEach((old,j)=>{const nid=j===0&&S.house?'casamia':'casa'+(j+1);if(oldCodes[old])nc[nid]=oldCodes[old]});S.codes=nc;
  if(/^casa(mia|[2-6])$/.test(S.scene)||['garagemio','hangar','giardino9'].includes(S.scene)){const b=BUILD.find(x=>x.id==='agenzia');S.scene='citta';if(b)S.pos={x:b.dx+.5,y:b.dy+1.5}}
  if(typeof homeMoved==='function'&&!S.house)homeMoved();
  const m=`Hai venduto: ${h.ic} ${h.n} e incassato ${eur(v)}! 🔑`;log(m);syncNpcs();save();updateHud();refreshSheet();toast(m)}
{const _ab=PLACES.agenzia.body;PLACES.agenzia.body=()=>{const h=_ab();if(S.age<18||!S.house)return h;const ids=myHouseIds();
  const rows=`<div class="h3">🔑 Le tue case: vendi quella che vuoi</div>`+ids.map((id,j)=>{const x=id==='casamia'?S.house:S.houses[j-1];return `<div class="row"><div class="t"><b>Casa ${j+1} · ${x.ic} ${esc(x.n)}</b><span>La vendi a ${eur(sellVal(x))}${x.mutuo?' (togli il mutuo che resta)':''}</span></div><button class="btn alt" data-vendi9="${id}">Vendi</button></div>`}).join('');
  const k='<div class="h3">✨ Ancora più cose per casa tua</div>',i=h.indexOf('<div class="h3">🔑 Compra un\'altra casa');return i>=0?h.slice(0,i)+rows+h.slice(i):h.includes(k)?h.replace(k,rows+k):h+rows}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-vendi9]');if(!b)return;if(b.dataset.c9!=='1'){b.dataset.c9='1';b.textContent='Sicuro?';b.classList.add('hot');setTimeout(()=>{if(b.isConnected){b.dataset.c9='';b.textContent='Vendi';b.classList.remove('hot')}},3000);return}vendiUna(b.dataset.vendi9)});

// via 'andare in bagno' e 'lavarti': restano mangiare, bere e dormire
for(let i=NEEDS.length-1;i>=0;i--)if(['bagno','lavati'].includes(NEEDS[i].k))NEEDS.splice(i,1);
