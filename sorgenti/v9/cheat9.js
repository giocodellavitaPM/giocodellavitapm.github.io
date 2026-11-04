/* ================= v9: il codice segreto di Viola (pannello impostazioni) ================= */
const CHEAT_RE=/(viva ?no|codice segreto|maldi)/;
function cheatReply(n,t){
  if(n.id!=='asi1'||!CHEAT_RE.test(t))return null;
  const J=S.job;
  ui.cheat={name:S.name,sex:S.sex,age:S.age,hair:Object.keys(HAIR).find(k=>HAIR[k]===S.look.hair)||'castani',skin:Math.max(0,SKIN.indexOf(S.look.skin)),shirt:Math.max(0,SHIRT.indexOf(S.look.shirt)),city:S.city,money:Math.round(S.money),surname:S.surname,bank:S.bank==null?null:Math.round(S.bank),st:{...S.st},lic:{...S.lic},cityW:CITYW,energy:0,home:S.home,mic:!!S.flags.mic,
    job:J?J.id:'',sal:J?J.sal:0,da:J&&J.da!=null?J.da:8,a:J&&J.a!=null?J.a:17,anni:J?J.anni:(S.yearsWorked||0),lauree:lauList(),diploma:(S.edu||0)>=2,
    partner:!!S.partner,married:!!S.married,kids:S.kids.length,cani:S.pets.filter(p=>p.tipo==='cane').length,gatti:S.pets.filter(p=>p.tipo==='gatto').length,house:S.house?S.house.id:''};
  setTimeout(()=>{closeChat();ui.sheet={type:'cheat'};renderSheet()},900);
  return {r:'🤫 Shhh… hai detto la parola segreta! Ti apro il pannello segreto. 🔓'};
}
const CIN='width:100%;box-sizing:border-box;padding:10px 12px;border-radius:12px;border:2px solid var(--line);font-size:16px';
function cheatBody(){
  const c=ui.cheat;if(!c)return '';
  const chip=(k,v,lbl,on)=>`<button type="button" class="sw" data-cset="${k}:${v}" aria-pressed="${on}">${lbl}</button>`;
  const sec=(t)=>`<div class="h3" style="margin-top:18px;padding-top:10px;border-top:2px dashed var(--line)">${t}</div>`;
  const num=(id,lbl,v,min,max)=>`<div class="field"><label for="${id}">${lbl}</label><input id="${id}" type="number" min="${min}" max="${max}" value="${v}" style="${CIN}"></div>`;
  const plus=(k,lbl,v)=>`<div class="field"><label>${lbl}</label><div style="display:flex;align-items:center;gap:10px"><button type="button" class="btn alt" data-cset="${k}:-1">−</button><b style="font-size:24px;min-width:40px;text-align:center">${v}</b><button type="button" class="btn alt" data-cset="${k}:+1">+</button></div></div>`;
  const hrs=(id,v)=>`<select id="${id}" style="${CIN}">${Array.from({length:24},(_,h)=>`<option value="${h}" ${h===v?'selected':''}>${String(h).padStart(2,'0')}:00</option>`).join('')}</select>`;
  const adult=c.age>=18;
  let h=`<p class="note">🔓 Pannello segreto! Cambia quello che vuoi e poi premi «Salva» in fondo.</p>`;
  h+=sec('👤 Chi sei')+`<div class="field"><label for="chName">Nome</label><input id="chName" maxlength="20" value="${esc(c.name)}" style="${CIN}"></div>
  <div class="field"><label for="chSur">Cognome</label><input id="chSur" maxlength="20" value="${esc(c.surname||'')}" style="${CIN}"></div>
  <div class="field"><label>Sei…</label><div class="seg">${chip('sex','m','Un maschio',c.sex==='m')}${chip('sex','f','Una femmina',c.sex==='f')}</div></div>
  <div class="field"><label>Età</label><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><button type="button" class="btn alt" data-cset="age:-10">−10</button><button type="button" class="btn alt" data-cset="age:-1">−1</button><b style="font-size:28px;min-width:60px;text-align:center">${c.age}</b><button type="button" class="btn alt" data-cset="age:+1">+1</button><button type="button" class="btn alt" data-cset="age:+10">+10</button></div></div>
  <div class="field"><label for="chCity">Città dove vivi</label><select id="chCity" style="${CIN}">${CITTA.map(x=>`<option ${x===c.city?'selected':''}>${x}</option>`).join('')}</select></div>`;
  h+=sec('🎨 Aspetto')+`<div class="field"><label>Capelli</label><div class="seg wrap">${Object.keys(HAIR).map(k=>chip('hair',k,`<span class="dot" style="background:${HAIR[k]}"></span>${k}`,c.hair===k)).join('')}</div></div>
  <div class="field"><label>Pelle</label><div class="seg wrap">${SKIN.map((x,i)=>chip('skin',i,`<span class="dot" style="background:${x}"></span>`,c.skin===i)).join('')}</div></div>
  <div class="field"><label>Maglietta</label><div class="seg wrap">${SHIRT.map((x,i)=>chip('shirt',i,`<span class="dot" style="background:${x}"></span>`,c.shirt===i)).join('')}</div></div>`;
  h+=sec('💶 Soldi')+`<p class="note">Puoi mettere fino a <b>5 quintilioni</b> (5 con 30 zeri) in tasca e in banca!</p><button type="button" class="btn hot" id="chMaxSoldi" style="width:100%;margin-bottom:8px">💰 Prendi tutto: 5 quintilioni in tasca e 5 in banca</button>`+num('chMoney','Soldi in tasca (sopra)',c.money,0,5e30)+num('chBank','Soldi in banca (sotto)',c.bank||0,0,5e30);
  h+=sec('📊 Come stai')+STATS.map(([k,n,col])=>`<div class="field"><label for="chSt_${k}">${n}: <b id="chStv_${k}">${Math.round(c.st[k])}</b></label><input id="chSt_${k}" type="range" min="0" max="100" value="${Math.round(c.st[k])}" style="width:100%;accent-color:${col}" oninput="document.getElementById('chStv_${k}').textContent=this.value"></div>`).join('')+
    `<div class="field"><div class="seg wrap">${chip('energy',1,'⚡ Energia piena',!!c.energy)}</div></div>`;
  if(c.age>=19)h+=sec('🎓 Studi')+`<div class="field"><div class="seg wrap">${chip('diploma',1,'📜 Diploma',c.diploma)}</div></div>
    <div class="field"><label>Lauree (puoi averne quante vuoi)</label><div class="seg wrap">${Object.entries(FAC).map(([k,f])=>chip('lau',k,(c.lauree.includes(k)?'🎓 ':'')+f.n,c.lauree.includes(k))).join('')}</div></div>`;
  if(c.age>=16)h+=sec('💼 Lavoro')+`<div class="field"><label for="chJob">Che lavoro fai</label><select id="chJob" style="${CIN}"><option value="">Nessun lavoro</option>${JOBS.map(j=>`<option value="${j.id}" ${c.job===j.id?'selected':''}>${esc(jobName(j))}</option>`).join('')}</select></div>`+
    (c.job?num('chSal','Stipendio all\'anno (€)',c.sal||(JOBS.find(j=>j.id===c.job)||{}).sal||0,0,10000000)+`<div class="field"><label>Orario di lavoro</label><div style="display:flex;gap:8px;align-items:center"><span>dalle</span>${hrs('chDa',c.da)}<span>alle</span>${hrs('chA',c.a)}</div></div>`+num('chAnni','Da quanti anni lavori lì',c.anni,0,60)+`<p class="note">L'orario va rispettato: lo vedi negli uffici quando vai alla tua scrivania. 🕗</p>`:'');
  if(adult)h+=sec('🏠 Casa')+`<div class="field"><label>Dove vivi</label><div class="seg wrap">${chip('home','genitori','Con mamma e papà',c.home==='genitori')}${chip('home','affitto','In affitto',c.home==='affitto')}${chip('home','casa','Casa tua',c.home==='casa')}</div></div>
    <div class="field"><label>La tua casa</label><div class="seg wrap">${chip('house','','Nessuna',!c.house)}${CASE.map(x=>chip('house',x.id,x.ic+' '+x.n,c.house===x.id)).join('')}</div></div>`;
  if(adult)h+=sec('❤️ Famiglia')+`<div class="field"><div class="seg wrap">${chip('partner',1,'💘 Fidanzat'+(c.sex==='f'?'a':'o'),c.partner)}${chip('married',1,'💍 Sposat'+(c.sex==='f'?'a':'o'),c.married)}</div></div>`+plus('kids','👶 Figli (massimo 4)',c.kids);
  h+=sec('🐾 Animali')+plus('cani','🐶 Cani',c.cani)+plus('gatti','🐱 Gatti',c.gatti)+`<p class="note">Al massimo 3 animali in tutto.</p>`;
  h+=sec('🪪 Patenti')+`<div class="field"><div class="seg wrap">${Object.entries(LIC).map(([k,L])=>chip('lic',k,(c.lic[k]?'✓ ':'')+L.n,!!c.lic[k])).join('')}</div></div>`;
  h+=sec('🎤 Microfono')+`<div class="field"><div class="seg wrap">${chip('mic',1,(c.mic?'✓ ':'')+'🎤 Microfono nelle chat',c.mic)}</div><p class="note">Se lo accendi, nelle chat c'è il bottone 🎤 per parlare invece di scrivere.</p></div>`;
  h+=sec('🏙️ Città')+`<div class="field"><label>Quanto è grande la città</label><div class="seg wrap">${[[180,'Grande'],[270,'Gigante'],[360,'Enorme']].map(([w,l])=>chip('cityW',w,l+(w===CITYW?' (adesso)':''),c.cityW===w)).join('')}</div><p class="note">Se cambi la grandezza, il gioco si ricarica e ti ritrovi a casa.</p></div>`;
  return h+`<button class="btn hot" type="button" data-cheatgo="1" style="width:100%;font-size:20px;padding:12px;margin-top:14px">💾 Salva</button>`;
}
function cheatKeep(){const c=ui.cheat,v=id=>{const e=$(id);return e?e.value:null};
  const nm=v('chName'),ct=v('chCity'),mo=v('chMoney'),su=v('chSur'),bk=v('chBank'),jb=v('chJob'),sl=v('chSal'),da=v('chDa'),a=v('chA'),an=v('chAnni');
  if(nm!=null)c.name=nm;if(ct!=null)c.city=ct;if(mo!=null)c.money=Math.max(0,Math.min(5e30,+mo||0));if(su!=null)c.surname=su;if(bk!=null)c.bank=Math.max(0,Math.min(5e30,+bk||0));
  if(jb!=null){if(jb!==c.job){c.job=jb;c.sal=(JOBS.find(j=>j.id===jb)||{}).sal||0}else if(sl!=null)c.sal=Math.max(0,Math.min(1e7,+sl||0))}
  if(da!=null)c.da=+da;if(a!=null)c.a=+a;if(an!=null)c.anni=Math.max(0,Math.min(60,+an||0));
  STATS.forEach(([k])=>{const r=$('chSt_'+k);if(r)c.st[k]=+r.value})}
function cheatSet(v){
  cheatKeep();const c=ui.cheat,i=v.indexOf(':'),k=v.slice(0,i),x=v.slice(i+1);
  if(k==='age')c.age=Math.max(0,Math.min(99,c.age+(+x)));else if(k==='lic')c.lic[x]=!c.lic[x];
  else if(['energy','partner','married','diploma','mic'].includes(k)){c[k]=!c[k];if(k==='married'&&c.married)c.partner=true;if(k==='partner'&&!c.partner)c.married=false}
  else if(k==='lau'){const i=c.lauree.indexOf(x);i>=0?c.lauree.splice(i,1):c.lauree.push(x)}
  else if(k==='kids')c.kids=Math.max(0,Math.min(4,c.kids+(+x)));
  else if(k==='cani'||k==='gatti'){c[k]=Math.max(0,c[k]+(+x));while(c.cani+c.gatti>3)c[k]--}
  else if(k==='cityW')c.cityW=+x;else if(k==='skin'||k==='shirt')c[k]=+x;else c[k]=x;
  const sc=$('sheet')&&$('sheet').querySelector('.bd'),top=sc?sc.scrollTop:0;renderSheet();const sc2=$('sheet')&&$('sheet').querySelector('.bd');if(sc2)sc2.scrollTop=top;
}
function setAge(v){
  S.age=v;S.done={};S.relYr={};S.voti=[];S.studied=false;S.escort=null;S.drive=null;S.famDrive=null;S.carOut=false;S.ride=false;S.trip=null;S.tripBooked=null;S.uni=null;S.pending=null;
  S.school=v>=3&&v<=5?{tipo:'asilo',anno:v-2}:v>=6&&v<=10?{tipo:'elementari',anno:v-5}:v>=11&&v<=13?{tipo:'medie',anno:v-10}:v>=14&&v<=18?{tipo:'liceo',anno:Math.min(5,v-13)}:null;
  S.edu=v>=19?Math.max(S.edu||0,2):v>=14?Math.max(S.edu||0,1):0;if(v>=19&&!S.diploma)S.diploma='liceo';
  if(v<18){S.home='genitori';S.job=null}
  S.scene=HOME();S.pos={x:3.5,y:5.5};S.face='d';
  pickParLoc();newMissions();syncNpcs();
}
function cheatGo(){
  cheatKeep();const c=ui.cheat;if(!c)return;
  S.name=(c.name||'').trim()||S.name;if(c.sex!==S.sex)S.look.style=c.sex==='f'?'long':'short';S.sex=c.sex;S.look.hair=HAIR[c.hair];S.look.skin=SKIN[c.skin];S.look.shirt=SHIRT[c.shirt];S.city=c.city;S.money=c.money;S.surname=(c.surname||'').trim()||S.surname;if(c.bank!=null&&(S.bank!=null||c.bank>0))S.bank=c.bank;STATS.forEach(([k])=>S.st[k]=Math.max(0,Math.min(100,c.st[k])));S.lic={...S.lic,...c.lic};if(c.energy)S.energy=EN_MAX;
  const ageCh=c.age!==S.age;if(ageCh)setAge(c.age);
  // lavoro, studi, casa, famiglia, animali
  if(S.age>=16){if(!c.job){if(S.job)S.yearsWorked=Math.max(S.yearsWorked||0,c.anni);S.job=null}else{const j=JOBS.find(x=>x.id===c.job);S.job={id:j.id,m:j.m,f:j.f,sal:c.sal||j.sal,anni:c.anni,da:c.da,a:c.a};S.yearsWorked=Math.max(S.yearsWorked||0,c.anni)}}
  if(S.age>=19){if(c.diploma){S.edu=Math.max(S.edu||0,2);S.diploma=S.diploma||'liceo'}if(c.lauree.length){S.edu=3;S.lauree=[...c.lauree];S.laurea=c.lauree.includes(S.laurea)?S.laurea:c.lauree[c.lauree.length-1]}else{S.lauree=[];if(S.edu>=3){S.edu=2;S.laurea=null}}}
  if(S.age>=18){const hc=CASE.find(x=>x.id===c.house);if(!hc){S.house=null;if(c.home==='casa')c.home='affitto'}else if(!S.house||S.house.id!==hc.id)S.house={id:hc.id,n:hc.n,ic:hc.ic,p:hc.p,mutuo:0,rata:0};
    if(c.home!==S.home&&!(c.home==='casa'&&!S.house)){S.home=c.home;homeMoved()}
    if(c.partner&&!S.partner)S.partner={nome:(S.amore&&S.amore.nome)||pick(S.sex==='f'?NOMI_M:NOMI_F),anni:0};if(!c.partner){S.partner=null;S.married=false}else S.married=!!c.married;
    while(S.kids.length<c.kids){const f=chance(.5);S.kids.push({nome:pick(f?NOMI_F:NOMI_M),f,nato:Math.max(18,S.age-R(0,Math.min(12,S.age-18)))})}S.kids.length=Math.min(S.kids.length,c.kids)}
  const cani=S.pets.filter(p=>p.tipo==='cane'),gatti=S.pets.filter(p=>p.tipo==='gatto');
  while(cani.length<c.cani)cani.push({tipo:'cane',nome:pick(['Fido','Briciola','Pallino','Rex','Luna','Biscotto'])});while(gatti.length<c.gatti)gatti.push({tipo:'gatto',nome:pick(['Micio','Tigre','Fuffi','Neve','Pepe','Minù'])});
  S.pets=[...cani.slice(0,c.cani),...gatti.slice(0,c.gatti)];
  S.flags.mic=!!c.mic;
  syncNpcs();
  if(c.cityW!==CITYW){try{localStorage.setItem('vita_cityW',c.cityW)}catch(e){}S.scene=HOME();S.pos={x:3.5,y:5.5};S.escort=null;S.drive=null;S.famDrive=null;S.parked=null;S.carOut=false;ui.cheat=null;save();toast('🏙️ Sto costruendo la città nuova…');ui.cheatReload=1;setTimeout(()=>location.reload(),700);return}
  ui.cheat=null;closeSheet();save();updateHud();
  toast(`🔓 Fatto! ${ageCh?`Adesso hai ${S.age} ${S.age===1?'anno':'anni'} e sei a casa.`:'Impostazioni cambiate.'}`);
}
// la chat con Viola si cancella sempre: così nessuno vede il codice segreto
// nella chat di Viola si cancella solo il codice segreto (e la sua risposta): il resto resta salvato
function cleanViola(){const L=S&&S.chats&&S.chats.asi1;if(!L)return;const out=[];let skip=false;
  for(const m of L){if(m.from==='me'&&CHEAT_RE.test(norm(m.t))){skip=true;continue}if(skip&&(m.from==='them'||m.from==='fx')){continue}skip=false;out.push(m)}
  while(out.length&&out[out.length-1].from==='sep')out.pop();L.length=0;out.forEach(m=>L.push(m))}
{const _oc=openChat;openChat=function(id){if(id==='asi1')cleanViola();return _oc(id)}}
{const _cc=closeChat;closeChat=function(){if(ui.chatNpc==='asi1'&&S&&S.chats){cleanViola();save()}return _cc()}}

// soldi senza limite (fino a 5 quintilioni) e nomi corti per i numeri giganti
document.addEventListener('click',e=>{if(!e.target.closest('#chMaxSoldi'))return;['chMoney','chBank'].forEach(id=>{const i=$(id);if(i){i.value='5e30';i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}))}});toast('💰 5 quintilioni in tasca e 5 in banca! Tocca Salva per tenerli.')});
const BIGN=[[1e30,'quintilioni'],[1e27,'quadriliardi'],[1e24,'quadrilioni'],[1e21,'triliardi'],[1e18,'trilioni'],[1e15,'biliardi'],[1e12,'bilioni'],[1e9,'miliardi']];
function eurBig(n){const a=Math.abs(n),b=BIGN.find(x=>a>=x[0]);if(!b)return eur(n);const v=n/b[0];return (v>=100?Math.round(v):Math.round(v*10)/10).toLocaleString('it-IT')+' '+b[1]+' €'}
{const _u=updateHud;updateHud=function(){const r=_u.apply(this,arguments);if(S){if(Math.abs(S.money)>=1e9)$('hMoney').textContent='💶 '+eurBig(S.money);if(S.bank!=null&&Math.abs(S.bank)>=1e9)$('hBank').textContent='🏦 '+eurBig(S.bank)}return r}}
