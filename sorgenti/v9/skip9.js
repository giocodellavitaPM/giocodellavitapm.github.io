/* ===== v9: «Salta i primi 5 anni» — si chiede con una richiesta che arriva nella Posta dell'app account; l'amministratrice lo attiva dall'app degli account ===== */
function sk9Acc(){try{const c=ACC9.cur();if(!c)return null;return {n:c.n,fb:!!c.fb,uid:c.fb&&OL9.user?OL9.user.uid:null,mail:c.fb&&OL9.user?OL9.user.email:null,reg:c.reg&&c.reg!=='-'?c.reg:null}}catch(e){return null}}
async function sk9Has(){const a=sk9Acc();if(!a||!nm9Ok())return false;const db=await nm9Db();let g=null;
  if(a.fb&&a.uid)g=await nm9T(db.collection('utenti').doc(a.uid).get(),6000);else if(a.reg)g=await nm9T(db.collection('nomi').doc(a.reg).get(),6000);
  if(g&&g.exists&&g.data().salta5){const v=+g.data().salta5Soldi;return {soldi:isFinite(v)&&v>0?Math.round(v):0}}return false}
function sk9Open(){if($('sk9')||!S)return;const e=document.createElement('div');e.id='sk9';const a=sk9Acc();
  e.innerHTML=`<div class="in" role="dialog" aria-label="Salta i primi 5 anni"><div style="font-size:44px">⏩</div><h2>Saltare i primi 5 anni?</h2>
  <p>I primi 5 anni li fanno soprattutto mamma e papà. Con questa <b>funzione speciale</b> parti subito da 5 anni.</p><div id="sk9s"><p>⏳ Controllo il tuo account…</p></div>
  <button type="button" data-x>Chiudi</button></div>`;
  e.addEventListener('click',ev=>{if(ev.target===e||ev.target.closest('[data-x]'))e.remove()});e.addEventListener('keydown',ev=>{ev.stopPropagation();if(ev.key==='Escape')e.remove()});
  document.body.appendChild(e);const box=e.querySelector('#sk9s');
  const ask=()=>{if(!a){box.innerHTML=`<p>Prima crea il tuo account (basta il nome): pausa → ⚙️ Impostazioni → 👤 Il tuo account. Poi torna qui e manda la richiesta!</p>`;return}
    let sent=0;try{sent=+localStorage.getItem('vita_sk9req_'+(a.uid||a.reg||a.n))||0}catch(e){}
    if(sent&&Date.now()-sent<7*864e5){box.innerHTML=`<p class="ml"><b>📩 Richiesta inviata!</b></p><p>Aspetta la risposta: quando la funzione viene attivata sul tuo account (<b>${esc(a.n)}</b>), torna qui e premi il pulsante per saltare.</p>`;return}
    box.innerHTML=`<p>Manda una richiesta: scrivi <b>quanti soldi vuoi avere sul conto</b> quando arrivi a 5 anni. Arriva con il nome del tuo account: <b>${esc(a.n)}</b>.</p>
     <input id="sk9p" type="number" min="0" max="999999999" inputmode="numeric" placeholder="Quanti € sul conto a 5 anni?" aria-label="Quanti euro vuoi sul conto a 5 anni"><textarea id="sk9m" maxlength="300" rows="2" placeholder="Messaggio (se vuoi)" aria-label="Messaggio"></textarea>
     <button type="button" class="go" data-sk9send>📩 Invia la richiesta</button><p id="sk9e" class="sm"></p>`;
    const sb=box.querySelector('[data-sk9send]'),ip=box.querySelector('#sk9p');ip.focus();
    sb.onclick=async ev=>{ev.stopPropagation();const pr=ip.value.trim(),ms=box.querySelector('#sk9m').value.trim(),er=box.querySelector('#sk9e');if(!pr||!(+pr>=0)){er.textContent='✏️ Scrivi quanti euro vuoi sul conto.';ip.focus();return}
      sb.disabled=true;sb.textContent='⏳ Invio…';try{const db=await nm9Db();const d={tipo:'salta5',nome:String(a.n).slice(0,40),acc:a.fb?'u':'n',id:String(a.fb?a.uid||'':a.reg||'').slice(0,80),prezzo:(Math.round(+pr)+' €').slice(0,30),creato:firebase.firestore.FieldValue.serverTimestamp(),letto:false};if(ms)d.msg=ms.slice(0,300);
        await nm9T(db.collection('richieste').add(d),8000);try{localStorage.setItem('vita_sk9req_'+(a.uid||a.reg||a.n),String(Date.now()))}catch(e){}ask()}
      catch(e){sb.disabled=false;sb.textContent='📩 Invia la richiesta';er.textContent='⚠️ Non sono riuscito a inviarla. Controlla internet e riprova.'}}};
  sk9Has().then(ok=>{if(!$('sk9'))return;if(!ok)return ask();const soldi=ok.soldi||0;
    box.innerHTML=S.age<5?`<p class="ml"><b>✅ Il tuo account ha la funzione!</b></p>${soldi?`<p>A 5 anni avrai <b>${soldi.toLocaleString('it-IT')} €</b> sul conto in banca.</p>`:''}<button type="button" class="go" data-sk9go>⏩ Salta a 5 anni</button>`:`<p class="ml"><b>✅ Il tuo account ha la funzione!</b></p><p>Hai già ${S.age} anni: la potrai usare nella tua prossima vita, appena nasci.</p>`;
    const g=box.querySelector('[data-sk9go]');if(g)g.onclick=ev=>{ev.stopPropagation();try{setAge(5);add('fel',5);if(soldi)S.bank=soldi;save();updateHud();renderModal();e.remove();toast('⏩ Hai saltato i primi 5 anni: adesso hai 5 anni e vai all\'asilo!'+(soldi?' Sul conto hai '+soldi.toLocaleString('it-IT')+' €! 🏦':''))}catch(err){}}}).catch(()=>{if($('sk9'))ask()})}
{const st=document.createElement('style');st.textContent=`#sk9{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);display:grid;place-items:center;padding:16px}
#sk9 .in{max-width:380px;width:100%;max-height:92vh;overflow:auto;box-sizing:border-box;background:#06110b;color:#eafff2;border:2px solid var(--neon,#3fd98a);border-radius:20px;padding:20px;text-align:center;display:flex;flex-direction:column;gap:10px;font-size:16px}
#sk9 #sk9s{display:flex;flex-direction:column;gap:10px}#sk9 h2{margin:0;font-size:22px}#sk9 p{margin:0;line-height:1.4}#sk9 .ml{font-size:17px;word-break:break-all;color:var(--neon,#3fd98a)}
#sk9 .go,#sk9 button{display:block;border-radius:14px;padding:12px;font:inherit;font-weight:800;cursor:pointer;text-decoration:none;border:1.5px solid var(--neon,#3fd98a);background:transparent;color:#eafff2}
#sk9 input,#sk9 textarea{font:inherit;font-size:16px;padding:10px 12px;border-radius:12px;border:1.5px solid var(--neon,#3fd98a);background:#050a07;color:#eafff2;-webkit-user-select:text;user-select:text;resize:none}#sk9 .sm{font-size:14px;color:#ffb3b3;min-height:0}
#sk9 .cv9{max-height:240px;overflow:auto;display:flex;flex-direction:column;gap:6px;text-align:left}#sk9 .cv9 div{padding:8px 11px;border-radius:14px;max-width:85%;white-space:pre-wrap;word-break:break-word;font-size:15px}#sk9 .cv9 .io{align-self:flex-end;background:#0f3a24}#sk9 .cv9 .lui{align-self:flex-start;background:#1b2a22;border:1px solid var(--neon,#3fd98a)}#sk9 .cv9 b{display:block;font-size:12px;color:var(--neon,#3fd98a)}
#sk9 .go{background:var(--neon,#3fd98a);color:#021008}`;document.head.appendChild(st)}
// appena nasci (una volta per vita)
{const _sg=startGame;startGame=function(){const r=_sg.apply(this,arguments);try{if(S&&S.age<1&&!S.sk9){S.sk9=1;const go=n=>{try{if(!S||S.age>=1)return;if(ui.result||$('nasc9')||$('acc9w')||$('nov9')){if(n<200)setTimeout(()=>go(n+1),1200);return}sk9Open()}catch(e){}};setTimeout(()=>go(0),1800)}}catch(e){}return r}}
// nelle Impostazioni
{const _pr=phRender;phRender=function(){const r=_pr.apply(this,arguments);try{if(PH9.app==='set'){const sc=document.querySelector('#ph9 .scr');if(sc&&!$('sk9b')){const b=document.createElement('button');b.id='sk9b';b.className='li9';
  b.innerHTML='<span class="av9">⏩</span><span class="tx"><b>Salta i primi 5 anni</b><small>Funzione speciale · tocca per saperne di più</small></span>';b.onclick=ev=>{ev.stopPropagation();sk9Open()};sc.insertBefore(b,sc.firstChild)}}}catch(e){}return r}}
// ✉️ Scrivici: chat con chi ha creato il gioco. I messaggi vanno nella Posta dell'app account; le risposte arrivano in risposte/{acc_id}
const PM9={m:[],codice:'30052013',t:0};
function pm9Key(){const a=sk9Acc();if(a&&a.fb&&a.uid)return {acc:'u',id:a.uid,n:a.n};if(a&&a.reg)return {acc:'n',id:a.reg,n:a.n};let d='x';try{d=localStorage.getItem('vita_dev9');if(!d){d=Math.random().toString(36).slice(2,12);localStorage.setItem('vita_dev9',d)}}catch(e){}return {acc:'d',id:d,n:a?a.n:(S&&S.name)||'Senza account'}}
const pm9LS=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}};
function pm9On(){return pm9LS('vita_pm9on')==='1'}
function pm9Mine(){try{return JSON.parse(pm9LS('vita_pm9mine')||'[]')}catch(e){return []}}
async function pm9Send(x){const k=pm9Key(),db=await nm9Db();const d={tipo:'chat',nome:String(k.n||'?').slice(0,40),acc:k.acc,id:String(k.id).slice(0,80),msg:String(x).slice(0,500),creato:firebase.firestore.FieldValue.serverTimestamp(),letto:false};
  await nm9T(db.collection('richieste').add(d),8000);const L=pm9Mine();L.push({x:String(x).slice(0,500),ts:Date.now(),io:1});pm9LS('vita_pm9mine',JSON.stringify(L.slice(-40)))}
const pm9Txt=m=>(m.si===true||m.si==='si'?'✅ Sì! ':m.si===false||m.si==='no'?'❌ No. ':'')+(m.x||'');
async function pm9Load(quiet){if(!nm9Ok()||!navigator.onLine||!S)return;try{const db=await nm9Db();
  try{const c=await nm9T(db.collection('config').doc('chat').get(),6000);if(c.exists&&c.data().codice)PM9.codice=String(c.data().codice).replace(/\s+/g,'')}catch(e){}
  const k=pm9Key(),g=await nm9T(db.collection('risposte').doc(k.acc+'_'+k.id).get(),6000);PM9.m=g.exists&&Array.isArray(g.data().m)?g.data().m:[];
  const sk='vita_pm9seen_'+k.acc+'_'+k.id,seen=+pm9LS(sk)||0,nuovi=PM9.m.length-seen;
  if(nuovi>0){pm9LS(sk,String(PM9.m.length));if(PM9.m.length)pm9LS('vita_pm9on','1');
    try{const cv=phConv('pm9');PM9.m.slice(seen).forEach(m=>cv.m.push({t:0,x:pm9Txt(m)}));if(cv.m.length>30)cv.m.splice(0,cv.m.length-30);cv.u=(cv.u||0)+nuovi;phBadge();save()}catch(e){}
    if(!quiet)toast(`📨 ${nuovi>1?'Hai '+nuovi+' messaggi nuovi':'Hai un messaggio nuovo'} da chi ha creato il gioco! Leggi in ⚙️ Impostazioni → ✉️ Scrivici${typeof phOK==='function'&&phOK()?' o nel 📱 telefono':''}.`);
    const b=$('sk9w');if(b)b.querySelector('small').textContent='📨 Hai messaggi nuovi!'}}catch(e){}}
setTimeout(()=>{pm9Load();setInterval(()=>{if(!document.hidden)pm9Load()},180000)},8000);
function sk9Msg(){if($('sk9')||!S)return;const e=document.createElement('div');e.id='sk9';
  e.innerHTML=`<div class="in" role="dialog" aria-label="Scrivici"><div style="font-size:44px">✉️</div><h2>Scrivici!</h2><div id="sk9s">
  <p>Hai una domanda, un'idea o qualcosa da migliorare nel gioco? Scrivila qui: la leggiamo tutta, e la risposta arriva qui!</p><div class="cv9" id="sk9c"></div>
  <textarea id="sk9m" maxlength="500" rows="3" placeholder="Scrivi qui il tuo messaggio…" aria-label="Messaggio"></textarea>
  <button type="button" class="go" data-sk9send>📩 Invia</button><p id="sk9e" class="sm"></p></div><button type="button" data-x>Chiudi</button></div>`;
  e.addEventListener('click',ev=>{if(ev.target===e||ev.target.closest('[data-x]'))e.remove()});e.addEventListener('keydown',ev=>{ev.stopPropagation();if(ev.key==='Escape')e.remove()});
  document.body.appendChild(e);const box=e.querySelector('#sk9s'),ta=box.querySelector('#sk9m'),sb=box.querySelector('[data-sk9send]'),cv=box.querySelector('#sk9c');
  const draw=()=>{const L=[...pm9Mine(),...PM9.m.map(m=>({x:pm9Txt(m),ts:m.ts||0}))].sort((a,b)=>a.ts-b.ts).slice(-20);cv.hidden=!L.length;
    cv.innerHTML=L.map(m=>`<div class="${m.io?'io':'lui'}">${m.io?'':'<b>👑 Il creatore del gioco</b>'}${esc(m.x)}</div>`).join('');cv.scrollTop=cv.scrollHeight};
  draw();pm9Load(true).then(()=>{if($('sk9c'))draw()});const b=$('sk9w');if(b)b.querySelector('small').textContent='Domande, idee o cose da migliorare';
  sb.onclick=async ev=>{ev.stopPropagation();const ms=ta.value.trim(),er=box.querySelector('#sk9e');if(ms.length<2){er.textContent='✏️ Scrivi il tuo messaggio.';ta.focus();return}
    sb.disabled=true;sb.textContent='⏳ Invio…';try{await pm9Send(ms);ta.value='';er.textContent='';sb.disabled=false;sb.textContent='📩 Invia';draw();toast('✅ Messaggio inviato! Grazie 😊')}
    catch(err){sb.disabled=false;sb.textContent='📩 Invia';er.textContent='⚠️ Non sono riuscito a inviarlo. Controlla internet e riprova.'}}}
// il codice segreto detto alla mamma (o al papà) apre la chat diretta nel telefono
const pm9Code=raw=>String(raw||'').replace(/[\s.\/-]+/g,'')===PM9.codice;
function pm9Unlock(){const was=pm9On();pm9LS('vita_pm9on','1');try{const cv=phConv('pm9');if(!cv.m.length){cv.m.push({t:0,x:'Ciao! 👑 Sono chi ha creato il Gioco della Vita. Scrivimi qui quello che vuoi: ti rispondo appena posso!'});cv.u=(cv.u||0)+1;phBadge();save()}}catch(e){}return was}
{const _rp=reply;reply=function(n,raw){try{if(n&&(n.role==='mamma'||n.role==='papa')&&pm9Code(raw)){pm9Unlock();const tel=typeof phOK==='function'&&phOK(),m=n.role==='mamma';
  return {r:`🤫 Conosci il numero segreto! Ecco, ${tel?'adesso nel tuo 📱 telefono c\'è «👑 Il creatore del gioco»: scrivigli quando vuoi, ti risponde davvero!':'quando avrai il telefono troverai «👑 Il creatore del gioco». Intanto puoi scrivergli da ⚙️ Impostazioni → ✉️ Scrivici!'} ${m?'Mi raccomando, sii gentile! 😊':'Mi raccomando, educazione! 😉'}`}}}catch(e){}return _rp.apply(this,arguments)}}
{const _pc=phContacts;phContacts=function(){const L=_pc.apply(this,arguments);try{if(pm9On()&&!L.some(c=>c.id==='pm9'))L.unshift({id:'pm9',ic:'👑',rol:'Il creatore del gioco',nm:'Chat diretta'})}catch(e){}return L}}
{const _pr9=phReply;phReply=function(id,v){if(id==='pm9'){pm9Send(v).catch(()=>{});return '✓ Messaggio arrivato! Ti rispondo appena posso. 👑'}
  if((id==='mamma'||id==='papa')&&pm9Code(v)){pm9Unlock();return '🤫 Numero segreto giusto! Guarda nei contatti: c\'è «👑 Il creatore del gioco». Scrivigli pure!'}return _pr9.apply(this,arguments)}}
{const _pp=phPool;phPool=function(c){if(c&&c.id==='pm9')return [];return _pp.apply(this,arguments)}}
{const _pr=phRender;phRender=function(){const r=_pr.apply(this,arguments);try{if(PH9.app==='set'){const sc=document.querySelector('#ph9 .scr');if(sc&&!$('sk9w')){const b=document.createElement('button');b.id='sk9w';b.className='li9';
  b.innerHTML='<span class="av9">✉️</span><span class="tx"><b>Scrivici</b><small>Domande, idee o cose da migliorare</small></span>';b.onclick=ev=>{ev.stopPropagation();sk9Msg()};const s5=$('sk9b');s5?s5.after(b):sc.insertBefore(b,sc.firstChild)}}}catch(e){}return r}}
/* v85h: ⋯ sui contatti per cambiare il nome */
function nm9Get(id){return S&&S.ph9nm&&S.ph9nm[id]||''}
{const _pc=phContacts;phContacts=function(){const L=_pc.apply(this,arguments);return L.map(c=>{const n=nm9Get(c.id);return n?Object.assign({},c,{rol:n,nm:c.rol+(c.nm&&c.nm!==c.rol?' · '+c.nm:''),rol0:c.rol}):c})}}
function nm9Menu(id){const c=phContacts().find(q=>q.id===id);if(!c)return;const ph=$('ph9');if(!ph)return;const o=document.createElement('div');o.id='nm9';
  o.innerHTML=`<div class="nm9b"><b>${c.ic} ${esc(c.rol)}</b><small>✏️ Cambia nome</small><input id="nm9i" maxlength="24" autocomplete="off" value="${esc(nm9Get(id))}" placeholder="${esc(c.rol0||c.rol)}"><div class="nm9r"><button data-n9="ok" class="ok">💾 Salva</button>${nm9Get(id)?'<button data-n9="del">↩️ Nome originale</button>':''}<button data-n9="no">Annulla</button></div></div>`;
  o.addEventListener('click',ev=>{ev.stopPropagation();const k=ev.target.closest('[data-n9]');if(ev.target===o||(k&&k.dataset.n9==='no'))return o.remove();if(!k)return;S.ph9nm=S.ph9nm||{};
    if(k.dataset.n9==='ok'){const v=$('nm9i').value.trim().slice(0,24);if(v)S.ph9nm[id]=v;else delete S.ph9nm[id];toast(v?'✏️ Ora si chiama «'+v+'»':'↩️ Nome originale')}else{delete S.ph9nm[id];toast('↩️ Nome originale')}
    try{save()}catch(e){}o.remove();phRender()});
  ph.appendChild(o);setTimeout(()=>{const i=$('nm9i');if(i){i.focus();i.select()}},30);$('nm9i').addEventListener('keydown',e=>{if(e.key==='Enter')o.querySelector('[data-n9="ok"]').click()})}
{const _pr=phRender;phRender=function(){const r=_pr.apply(this,arguments);try{const ph=$('ph9');if(!ph)return r;
  ph.querySelectorAll('.li9[data-cv],.li9[data-call]').forEach(b=>{if(b.querySelector('.dt9m'))return;const id=b.dataset.cv||b.dataset.call;const d=document.createElement('span');d.className='dt9m';d.setAttribute('role','button');d.setAttribute('aria-label','Altre opzioni');d.textContent='⋯';
    d.addEventListener('click',ev=>{ev.stopPropagation();ev.preventDefault();nm9Menu(id)});b.appendChild(d)});
  if(PH9.app==='msg'&&PH9.conv){const br=ph.querySelector('.bar9');if(br&&!br.querySelector('.dt9m')){const d=document.createElement('button');d.className='bk dt9m';d.setAttribute('aria-label','Altre opzioni');d.textContent='⋯';const id=PH9.conv;d.addEventListener('click',ev=>{ev.stopPropagation();nm9Menu(id)});const x=br.querySelector('[data-ph="close"]');br.insertBefore(d,x)}}}catch(e){}return r}}
{const st=document.createElement('style');st.textContent=`#ph9 .dt9m{margin-left:auto;padding:4px 10px;border-radius:12px;font:900 20px/1 var(--f-body);color:#eafff2;cursor:pointer;flex:none}#ph9 .li9 .dt9m:hover{background:#13241a}#ph9 .bar9 .dt9m{margin-left:0}
#nm9{position:absolute;inset:0;z-index:50;background:rgba(0,0,0,.6);display:grid;place-items:center;padding:16px}#nm9 .nm9b{background:#0b1610;border:1.5px solid var(--neon);border-radius:18px;padding:16px;width:100%;max-width:300px;display:flex;flex-direction:column;gap:8px;color:#eafff2}#nm9 small{color:var(--soft);font-weight:700}#nm9 input{padding:10px;border-radius:12px;border:1.5px solid rgba(63,217,138,.4);background:#13241a;color:#fff;font-size:16px}#nm9 .nm9r{display:flex;gap:6px;flex-wrap:wrap}#nm9 .nm9r button{flex:1;padding:9px;border-radius:12px;border:1.5px solid rgba(63,217,138,.4);background:#13241a;color:#eafff2;font-weight:800;cursor:pointer}#nm9 .nm9r .ok{background:var(--neon);color:#021008}`;document.head.appendChild(st)}
/* v85i: modifiche dall'app account anche per chi ha solo il nome (nomi/{reg}.modifica) */
async function nm9Mod(){try{if(!nm9Ok()||!navigator.onLine||!S)return;const a=sk9Acc();if(!a||a.fb||!a.reg)return;const db=await nm9Db();
  const g=await nm9T(db.collection('nomi').doc(a.reg).get(),6000);if(!g||!g.exists)return;const d=g.data();if(!d.modifica||!d.modAdmin)return;
  const t=d.modAdmin.toMillis?d.modAdmin.toMillis():+d.modAdmin||0;const k='vita_nm9m_'+a.reg,seen=+pm9LS(k)||0;if(!t||t<=seen)return;
  if(S.pending||ui.result)return;const m=d.modifica;
  if(typeof m.age==='number'&&m.age!==S.age&&m.age>=0&&m.age<=110&&S.alive){try{setAge(Math.round(m.age))}catch(e){S.age=Math.round(m.age)}}
  try{updateHud()}catch(e){}const ap=()=>{if(m.sex==='m'||m.sex==='f')S.sex=m.sex;if(typeof m.money==='number')S.money=Math.round(m.money);if(typeof m.bank==='number')S.bank=Math.round(m.bank);if(m.bank===null)S.bank=null;
  if(m.name)S.name=String(m.name).slice(0,30);if(m.surname)S.surname=String(m.surname).slice(0,30);
  if(m.lic&&typeof m.lic==='object'){S.lic=S.lic||{};for(const x in m.lic)S.lic[x]=!!m.lic[x]}
  if(typeof m.multe==='number')S.multe=Math.max(0,Math.round(m.multe));if(typeof m.energy==='number'&&typeof EN_MAX!=='undefined')S.energy=Math.max(0,Math.min(EN_MAX,m.energy));
  if(m.st&&S.st)for(const x in m.st)if(x in S.st)S.st[x]=Math.max(0,Math.min(100,+m.st[x]||0))};
  ap();try{updateHud()}catch(e){}ap();pm9LS(k,String(t));updateHud();save();toast('✏️ La tua partita è stata aggiornata da chi ha creato il gioco!')}catch(e){}}
setTimeout(()=>{nm9Mod();setInterval(()=>{if(!document.hidden)nm9Mod()},180000)},6000);
/* v85j: chi ha creato il gioco (entra con la sua mail) ha il telefono da subito e legge/risponde ai giocatori dal telefono */
const PMA={ok:0,L:[],t:0,n0:null,pend:{}};
function pmAdm(){try{const u=OL9.user||(typeof firebase!=='undefined'&&firebase.apps&&firebase.apps.length&&firebase.auth?firebase.auth().currentUser:null);return !!(u&&String(u.email||'').toLowerCase()==='piemastro13@gmail.com')}catch(e){return false}}
const pmAms=t=>t&&t.toMillis?t.toMillis():+t||0;
function pmAtxt(r){return r.tipo==='salta5'?'⏩ Vuole saltare i primi 5 anni · a 5 anni vuole sul conto: '+(r.prezzo||'?')+(r.msg?'\n'+r.msg:''):r.tipo==='messaggio'?'✉️ '+(r.msg||''):(r.msg||'')}
async function pmALoad(){if(!pmAdm()||!OL9.db||!navigator.onLine||!S)return;try{const db=OL9.db;
  const [rq,rs]=await Promise.all([nm9T(db.collection('richieste').get(),8000),nm9T(db.collection('risposte').get(),8000)]);const R={};rs.docs.forEach(d=>R[d.id]=d.data());const G={};
  rq.docs.forEach(d=>{const r=d.data();if(!r.acc||!r.id)return;const k=r.acc+'_'+r.id;const g=G[k]=G[k]||{k,nome:r.nome||'?',acc:r.acc,id:r.id,m:[],pid:[]};g.nome=r.nome||g.nome;g.m.push({t:0,x:pmAtxt(r),ts:pmAms(r.creato),nl:!r.letto});if(!r.letto)g.pid.push(d.id)});
  Object.values(G).forEach(g=>{const sv=(R[g.k]||{}).m||[],ts=new Set(sv.map(y=>+y.ts));sv.forEach(y=>g.m.push({t:1,x:pm9Txt(y),ts:+y.ts||0}));PMA.pend[g.k]=(PMA.pend[g.k]||[]).filter(y=>!ts.has(y.ts)&&Date.now()-y.ts<600000);PMA.pend[g.k].forEach(y=>g.m.push({t:1,x:y.x,ts:y.ts}));g.m.sort((a,b)=>a.ts-b.ts);g.last=g.m.length?g.m[g.m.length-1].ts:0});
  PMA.L=Object.values(G).sort((a,b)=>b.last-a.last);PMA.ok=1;let nuovi=0,chi='';
  PMA.L.forEach(g=>{const id='pmA_'+g.k,cv=phConv(id),seen=+pm9LS('vita_pmAseen_'+g.k)||0;cv.m=g.m.map(y=>({t:y.t,x:y.x}));cv.q=null;const u=g.m.filter(y=>!y.t&&y.nl&&y.ts>seen).length;
    if(PH9.conv===id&&ui.ph9){pmAseen(g)}else{if(u>(cv.u||0)){nuovi+=u-(cv.u||0);chi=g.nome}cv.u=u}});
  if(PMA.n0!==null&&nuovi>0)toast('📩 '+(nuovi>1?nuovi+' messaggi nuovi dai giocatori':'Messaggio nuovo da '+chi)+': apri il 📱 telefono!');PMA.n0=1;
  try{phBadge();save()}catch(e){}if(ui.ph9&&(PH9.app==='msg'||PH9.app==='cont'||PH9.app==='call')){const ip=$('ph9in'),keep=ip&&ip.value;phRender();const i2=$('ph9in');if(i2&&keep)i2.value=keep}}catch(e){console.warn('pmA',e)}}
function pmAseen(g){pm9LS('vita_pmAseen_'+g.k,String(Date.now()));const cv=phConv('pmA_'+g.k);cv.u=0;const P=g.pid.splice(0);P.forEach(id=>{try{OL9.db.collection('richieste').doc(id).update({letto:true})}catch(e){}})}
setTimeout(()=>{pmALoad();setInterval(()=>{if(!document.hidden)pmALoad()},60000)},5000);
{const _c=phContacts;phContacts=function(){const L=_c.apply(this,arguments);if(!pmAdm()||!PMA.L.length)return L;
  return PMA.L.map(g=>({id:'pmA_'+g.k,ic:g.acc==='u'?'🧑‍💻':g.acc==='n'?'📱':'👻',rol:g.nome,nm:'Giocatore · '+(g.acc==='u'?'account':g.acc==='n'?'solo nome':'senza account')})).concat(L)}}
{const _r=phReply;phReply=function(id,v){if(String(id).indexOf('pmA_')===0){const k=id.slice(4),g=PMA.L.find(z=>z.k===k);if(g&&OL9.db){const msg={x:String(v).slice(0,500),si:'',ts:Date.now(),rid:'telefono'};(PMA.pend[k]=PMA.pend[k]||[]).push(msg);{const cv=phConv(id);if(!cv.m.slice(-3).some(y=>y.t===1&&y.x===msg.x)){cv.m.push({t:1,x:msg.x});setTimeout(()=>{if(ui.ph9&&PH9.conv===id)phRender()},0)}}
    OL9.db.collection('risposte').doc(k).set({m:firebase.firestore.FieldValue.arrayUnion(msg),nome:g.nome,agg:firebase.firestore.FieldValue.serverTimestamp()},{merge:true}).then(()=>{g.m.push({t:1,x:msg.x,ts:msg.ts});pmAseen(g)}).catch(e=>toast('⚠️ Messaggio non mandato: '+(e&&e.message||e)))}
    return null}return _r.apply(this,arguments)}}
{const _p=phPool;phPool=function(c){if(c&&String(c.id).indexOf('pmA_')===0)return [];return _p.apply(this,arguments)}}
{const _pr=phRender;phRender=function(){const r=_pr.apply(this,arguments);try{const id=PH9.conv||'';if(PH9.app==='msg'&&(id==='pm9'||id.indexOf('pmA_')===0)){const rp=document.querySelector('#ph9 .rep');if(rp)rp.remove();
  if(id.indexOf('pmA_')===0){const g=PMA.L.find(z=>'pmA_'+z.k===id);if(g&&(g.pid.length||phConv(id).u))pmAseen(g);const ip=$('ph9in');if(ip){ip.maxLength=500;ip.placeholder='Rispondi a '+(g?g.nome:'')+'…'}}}}catch(e){}return r}}
