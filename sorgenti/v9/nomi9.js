/* ================= v9: nomi degli account tutti diversi, il codice segreto contato, l'account nella pausa, pulsanti più pronti, installa l'app ================= */
// ---------- nomi unici: se "Gianni" c'è già, ti propone "Gianni.13" ----------
const nm9Key=n=>String(n||'').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9._-]+/g,'').slice(0,40);
const nm9Ok=()=>!navigator.webdriver||window.NM9T;
const nm9T=(pr,ms)=>Promise.race([pr,new Promise((_,ko)=>setTimeout(()=>ko(new Error('lento')),ms))]);
function nm9Db(){return nm9T(cl9Load().then(o=>o.db||OL9.db),6000)}
async function nm9Free(n){const k=nm9Key(n);if(!k)return {ok:false,k};try{const db=await nm9Db();const g=await nm9T(db.collection('nomi').doc(k).get(),5000);return {ok:!g.exists,k}}catch(e){return {ok:true,k,off:1}}}
async function nm9Suggest(n){const base=String(n).trim().slice(0,14);for(let i=0;i<5;i++){const s=base+'.'+(2+Math.floor(Math.random()*98));const r=await nm9Free(s);if(r.ok)return s}return base+'.'+(100+Math.floor(Math.random()*900))}
async function nm9Take(n,tipo,uid){const k=nm9Key(n);if(!k)return {k:null};try{const db=await nm9Db();const d={nome:String(n).trim().slice(0,30),tipo,creato:firebase.firestore.FieldValue.serverTimestamp()};if(uid)d.uid=uid;await nm9T(db.collection('nomi').doc(k).set(d),5000);return {k}}
  catch(e){return {k:null,taken:e&&e.code==='permission-denied'}}}
function nm9Busy(on){document.querySelectorAll('[data-acc-add],[data-cl9do="reg"]').forEach(b=>{b.disabled=!!on;b.style.opacity=on?.6:''})}
async function nm9Check(name){const r=await nm9Free(name);if(r.ok)return r.off?'off':true;const sug=await nm9Suggest(name);
  toast(`🙈 Il nome «${String(name).trim()}» c'è già: l'ha preso un altro giocatore. Prova con «${sug}»!`);
  document.querySelectorAll('#acc9nm,[data-cl9nm]').forEach(i=>{if(i.value.trim()&&nm9Key(i.value)===nm9Key(name))i.value=sug});return false}
// account solo su questo dispositivo
{const _add=ACC9.add;ACC9.add=function(name,ic){const nm=String(name||'').trim().slice(0,18);if(!nm||!nm9Ok()||ACC9._nm9)return _add.apply(this,arguments);
  nm9Busy(1);(async()=>{try{const ck=await nm9Check(nm);if(!ck)return;const t=ck==='off'?{k:null}:await nm9Take(nm,'locale');if(!t.k&&t.taken){await nm9Check(nm);return}
      ACC9._nm9=1;let a;try{a=_add.call(ACC9,nm,ic)}finally{ACC9._nm9=0}
      if(a&&t.k){const o=ACC9.d(),x=o.list.find(z=>z.id===a.id);if(x){x.reg=t.k;ACC9.w(o)}}
      if(a&&!acc9Busy){const box=$('acc9st');if(box)acc9Start(box);if(ui.ph9&&typeof phRender==='function')phRender();const w=$('acc9w');if(w&&w.dataset.p9)acc9Pausa()}}
    finally{nm9Busy(0)}})();return null}}
// account online con email: il nome deve essere libero
{const _do=cl9Do;cl9Do=async function(kind,root){if(kind!=='reg'||!nm9Ok())return _do.apply(this,arguments);
  const q=s=>root.querySelector(s),nm=((q('[data-cl9nm]')||{}).value||'').trim(),ok=q('[data-cl9ok]');if(!nm||(ok&&!ok.checked))return _do.apply(this,arguments);
  nm9Busy(1);try{const ck=await nm9Check(nm);if(!ck)return;const t=ck==='off'?{k:null}:await nm9Take(nm,'online');if(!t.k&&t.taken){await nm9Check(nm);return}}finally{nm9Busy(0)}
  return _do.apply(this,arguments)}}
// gli account di prima: se il loro nome è ancora libero lo prenotano
setTimeout(async()=>{if(!nm9Ok()||!navigator.onLine)return;try{const o=ACC9.d();let ch=0;for(const a of o.list){if(a.fb||a.reg)continue;const r=await nm9Free(a.n);if(r.off)return;if(r.ok){const t=await nm9Take(a.n,'locale');a.reg=t.k||'-'}else a.reg='-';ch=1}
  if(ch){const o2=ACC9.d();o.list.forEach(a=>{const x=o2.list.find(z=>z.id===a.id);if(x&&a.reg)x.reg=a.reg});ACC9.w(o2)}}catch(e){}},9000);

// ---------- il codice segreto: si conta chi lo usa e quante volte (lo vede l'amministratrice) ----------
function cd9Track(){try{S.codice9=(S.codice9||0)+1;save();if(!nm9Ok())return;const c=ACC9.cur();
  nm9Db().then(db=>{const F=firebase.firestore.FieldValue,inc=F.increment(1),ts=F.serverTimestamp();
    if(c&&c.fb&&OL9.user)return db.collection('utenti').doc(OL9.user.uid).set({codiceN:inc,codiceUltimo:ts},{merge:true});
    const k=c&&c.reg&&c.reg!=='-'?c.reg:c?nm9Key(c.n)+'~'+(c.id||'').slice(-5):'~anonimi';
    return db.collection('nomi').doc(k).set({nome:c?c.n:'Chi gioca senza account',tipo:c?'locale':'nessuno',codice:inc,codiceUltimo:ts},{merge:true})}).catch(()=>{})}catch(e){}}
{const _cr=cheatReply;cheatReply=function(n,t){const r=_cr.apply(this,arguments);if(r&&!ui.cd9t){ui.cd9t=1;setTimeout(()=>ui.cd9t=0,3000);cd9Track()}return r}}

// ---------- nella pausa: il tuo account (cambia, aggiungi, esci) ----------
function acc9Pausa(){const old=$('acc9w');if(old)old.remove();const c=ACC9.cur(),u=OL9.user;const w=document.createElement('div');w.id='acc9w';w.dataset.p9=1;
  w.innerHTML=`<div class="bx" style="text-align:left"><div style="text-align:center"><div style="font-size:46px">${c?c.ic:'👤'}</div><h2>${c?esc(c.n):'Nessun account'}</h2>
    <p>${c?(c.fb?'☁️ Account online: la partita si salva su internet':'📱 Account su questo dispositivo')+' · '+esc(ACC9.info(c.id)):'Crea un account: così il gioco si ricorda di te!'}</p></div>
    <div class="acc9"><div data-cl9></div>${ACC9.d().list.filter(a=>!a.fb).length?'<b style="font-size:13px">🔁 Cambia account:</b>'+acc9List(1):''}
    <b style="font-size:13px">➕ Aggiungi un account:</b>${acc9Make('+ Aggiungi')}
    ${c&&!c.fb?`<button type="button" class="b alt" data-acc-esci9="1">🚪 Esci dall'account</button>`:''}
    ${c?`<button type="button" class="b alt" data-acc-new="1">✨ Vita nuova con ${esc(c.n)}</button>`:''}</div>
    <button type="button" class="b big" data-acc-x="1" style="margin-top:12px;width:100%;border-radius:14px;border:0;background:#3fd98a;color:#04140a;font:900 16px var(--f-body);cursor:pointer">▶ Torna al gioco</button></div>`;
  document.body.appendChild(w);acc9Bind(w);if(typeof cl9Ui==='function')cl9Ui();w.onclick=ev=>{if(ev.target===w)w.remove()};
  const e9=w.querySelector('[data-acc-esci9]');if(e9)e9.onclick=ev=>{ev.stopPropagation();if(!confirm('Vuoi uscire dall\'account? La tua partita resta salvata: la ritrovi quando rientri.'))return;ACC9.stash();const o=ACC9.d();o.cur=null;ACC9.w(o);try{localStorage.removeItem(LS)}catch(_){}acc9Go()}}
{const _o=psOpen;psOpen=function(){const r=_o.apply(this,arguments);try{const e=$('ps9');if(e&&!e.querySelector('[data-p="acc9"]')){const b=document.createElement('button');b.dataset.p='acc9';b.textContent='👤 Account: cambia, aggiungi, esci';
    const ref=e.querySelector('[data-p="save"]');ref?ref.parentNode.insertBefore(b,ref):e.querySelector('.in').appendChild(b);b.onclick=ev=>{ev.stopPropagation();psClose();acc9Pausa()}}}catch(err){}return r}}

// ---------- pulsanti più pronti (niente attesa al tocco) e Firebase già pronto quando premi Google o Registrati ----------
{const st=document.createElement('style');st.textContent='button,.btn,.b,[data-p],[role=button],a{touch-action:manipulation;-webkit-tap-highlight-color:transparent}button:active,.btn:active,.b:active{transform:scale(.97);filter:brightness(1.08)}';document.head.appendChild(st)}
if(nm9Ok())setTimeout(()=>{try{if(navigator.onLine!==false)cl9Load().catch(()=>{})}catch(e){}},700);

// ---------- installa l'app (sul telefono e sul computer) ----------
const APP9={ev:null};
const app9Std=()=>{try{return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true}catch(e){return false}};
const app9IOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
addEventListener('beforeinstallprompt',e=>{e.preventDefault();APP9.ev=e;app9Btn()});
addEventListener('appinstalled',()=>{APP9.ev=null;app9Btn();toast('📲 App installata! La trovi tra le app del telefono o del computer.')});
function app9Can(){return !app9Std()&&(APP9.ev||app9IOS()||/^https:/.test(location.protocol)&&!/claude|usercontent/.test(location.host))}
function app9Btn(){let b=$('app9');const show=app9Can()&&!$('screen').hidden;if(!show){if(b)b.remove();return}
  if(!b){b=document.createElement('button');b.id='app9';b.type='button';b.innerHTML='📲 Installa l\'app';b.onclick=app9Go;const sc=$('screen'),tg=sc&&sc.querySelector('p');if(tg)tg.insertAdjacentElement('afterend',b);else document.body.appendChild(b)}}
async function app9Go(){if(APP9.ev){const e=APP9.ev;APP9.ev=null;e.prompt();try{await e.userChoice}catch(_){}app9Btn();return}
  const w=document.createElement('div');w.id='acc9w';w.innerHTML=`<div class="bx"><div style="font-size:46px">📲</div><h2>Installa l'app</h2>${app9IOS()?
    '<p>Su iPhone e iPad: premi il pulsante <b>Condividi</b> (il quadrato con la freccia in su) in basso, poi <b>«Aggiungi a Home»</b>.</p>':
    '<p>Apri il menu del browser (i tre puntini <b>⋮</b> in alto a destra) e premi <b>«Installa app»</b> oppure <b>«Aggiungi a schermata Home»</b>.</p>'}
    <button type="button" class="b big" data-acc-x="1" style="width:100%;border-radius:14px;border:0;background:#3fd98a;color:#04140a;font:900 16px var(--f-body);cursor:pointer">Ho capito</button></div>`;document.body.appendChild(w);acc9Bind(w);w.onclick=ev=>{if(ev.target===w)w.remove()}}
{const st=document.createElement('style');st.textContent='#app9{display:block;margin:2px 0 12px;position:relative;z-index:2;border:0;border-radius:999px;padding:10px 16px;background:#3fd98a;color:#04140a;font:900 15px var(--f-body,system-ui);box-shadow:0 4px 18px rgba(63,217,138,.45);cursor:pointer}';document.head.appendChild(st)}
setInterval(()=>{try{app9Btn()}catch(e){}},1000);
if('serviceWorker' in navigator&&/^https:/.test(location.protocol)&&/github\.io$/.test(location.host))navigator.serviceWorker.register('sw.js').catch(()=>{});
// l'Installa app c'è sempre: in fondo alle Impostazioni del telefono e in fondo al menu della pausa
function app9Li(){const st=app9Std();return `<button class="li9" data-app9="1"><span class="av9">📲</span><span class="tx"><b>${st?'App installata':'Installa l\'app'}</b><small>${st?'Stai già giocando con l\'app 👍':'Mettila sul telefono o sul computer: si apre come un\'app'}</small></span></button>`}
{const _r=phRender;phRender=function(){const r=_r.apply(this,arguments);try{if(PH9.app==='set'){const sc=document.querySelector('#ph9 .scr');if(sc&&!sc.querySelector('[data-app9]')){sc.insertAdjacentHTML('beforeend',app9Li());
  sc.querySelector('[data-app9]').onclick=ev=>{ev.stopPropagation();if(app9Std())return toast('📲 Stai già usando l\'app!');phClose();app9Go()}}}}catch(e){}return r}}
{const _o=psOpen;psOpen=function(){const r=_o.apply(this,arguments);try{const e=$('ps9');if(e&&!e.querySelector('[data-p="app9"]')){const b=document.createElement('button');b.dataset.p='app9';b.textContent=app9Std()?'📲 App installata':'📲 Installa l\'app';
  e.querySelector('.in').appendChild(b);b.onclick=ev=>{ev.stopPropagation();psClose();if(app9Std())return toast('📲 Stai già usando l\'app!');app9Go()}}}catch(err){}return r}}
