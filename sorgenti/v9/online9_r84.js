/* ================= v9: account online (Firebase): Google o email e password ================= */
const FB9CFG={apiKey:"AIzaSyBJRUlGK_ArYn2K_pJ0ePChTUC3gkikwgY",authDomain:"gioco-della-vita-pm.firebaseapp.com",projectId:"gioco-della-vita-pm",storageBucket:"gioco-della-vita-pm.firebasestorage.app",messagingSenderId:"83815479634",appId:"1:83815479634:web:86220d0844b898c5e1628b"};
const OL9={user:null,p:null,t:0,busy:0,err:''};
function cl9Js(u){return new Promise((ok,ko)=>{const s=document.createElement('script');s.src=u;s.onload=ok;s.onerror=ko;document.head.appendChild(s)})}
function cl9Load(){if(OL9.p)return OL9.p;OL9.p=(async()=>{if(!window.firebase||!firebase.firestore){for(const f of ['app','auth','firestore']){try{await cl9Js('fb/firebase-'+f+'-compat.js')}catch(e){await cl9Js('https://cdn.jsdelivr.net/npm/firebase@10.14.1/firebase-'+f+'-compat.js')}}}
    if(!firebase.apps.length)firebase.initializeApp(FB9CFG);OL9.auth=firebase.auth();OL9.db=firebase.firestore();
    try{const rr=await OL9.auth.getRedirectResult();if(rr&&rr.user){OL9.user=rr.user;await cl9After(rr.user)}}catch(e){}
    await new Promise(r=>{let d=0;OL9.auth.onAuthStateChanged(u=>{OL9.user=u;cl9Ui();if(!d){d=1;r()}})});return OL9})();
  OL9.p.catch(()=>{OL9.p=null});return OL9.p}
const cl9Id=u=>'fb_'+u.uid,cl9Nm=u=>u.displayName||(u.email||'').split('@')[0]||'Giocatore';
function cl9Err(e){const c=(e&&e.code)||'';return ({'auth/invalid-email':'L\'email non è scritta bene','auth/missing-password':'Scrivi la password','auth/weak-password':'La password deve avere almeno 6 caratteri','auth/email-already-in-use':'C\'è già un account con questa email: premi Entra','auth/invalid-credential':'Email o password sbagliate','auth/wrong-password':'Password sbagliata','auth/user-not-found':'Non c\'è un account con questa email: premi Registrati','auth/too-many-requests':'Troppi tentativi: aspetta un po\' e riprova','auth/popup-closed-by-user':'Hai chiuso la finestra di Google','auth/network-request-failed':'Niente internet: riprova','auth/unauthorized-domain':'Questo indirizzo non è ancora autorizzato in Firebase','auth/configuration-not-found':'Gli account online non sono ancora attivi: riprova più tardi','auth/operation-not-allowed':'Questo tipo di accesso non è ancora attivo in Firebase','auth/requires-recent-login':'Per sicurezza esci, rientra e riprova'})[c]||('Qualcosa non va ('+(c||'errore')+')')}
// salva la partita online (al massimo ogni 20 secondi)
async function cl9Push(force,raw,old){const u=OL9.user;if(!u||!OL9.db)return;const now=Date.now();
  if(!force&&now-OL9.t<20000){clearTimeout(OL9.tm);OL9.tm=setTimeout(()=>cl9Push(true),20000-(now-OL9.t)+50);return}OL9.t=now;
  if(raw===undefined)raw=localStorage.getItem(LS);let s=null;try{s=JSON.parse(raw||'null')}catch(e){}
  const F=firebase.firestore.FieldValue,data={nome:cl9Nm(u),email:u.email||'',accesso:((u.providerData||[])[0]||{}).providerId==='google.com'?'Google':'Email',ultimo:F.serverTimestamp(),
    personaggio:s&&s.name?{nome:s.name+' '+(s.surname||''),eta:s.age|0,citta:s.city||'',vivo:!!s.alive,soldi:Math.round((s.money||0)+(s.bank||0)),fa:(()=>{try{return (S&&S.name===s.name)?stageText():''}catch(e){return ''}})()}:null};
  if(raw&&raw.length<900000)data.salvataggio=raw;if(old===null)data.creato=F.serverTimestamp();
  try{await OL9.db.collection('utenti').doc(u.uid).set(data,{merge:true});localStorage.setItem('vita_cl9t_'+u.uid,String(Date.now()))}catch(e){console.warn('cl9 push',e)}}
// dopo l'accesso: prende la partita online, oppure porta online quella di adesso
async function cl9After(u){try{localStorage.setItem('vita_cl9','1')}catch(e){}let d;try{const g=await OL9.db.collection('utenti').doc(u.uid).get();d=g.exists?g.data():null}catch(e){d=undefined}
  const id=cl9Id(u),o=ACC9.d();ACC9.stash();let a=o.list.find(x=>x.id===id);if(!a){a={id,n:cl9Nm(u),ic:'☁️',t:Date.now(),fb:1};o.list.push(a)}else a.n=cl9Nm(u);
  let raw=(d&&d.salvataggio)||localStorage.getItem('vita_sv9_'+id)||localStorage.getItem(LS)||null;o.cur=id;ACC9.w(o);
  try{if(raw)localStorage.setItem(LS,raw);else localStorage.removeItem(LS)}catch(e){}
  await cl9Push(true,raw,d===undefined?undefined:d);toast(`☁️ Sei entrato come ${cl9Nm(u)}! La partita si salva online.`);acc9Go()}
async function cl9Do(kind,root){const q=s=>root.querySelector(s),em=(q('[data-cl9em]')||{}).value||'',pw=(q('[data-cl9pw]')||{}).value||'',nm=((q('[data-cl9nm]')||{}).value||'').trim(),ok=q('[data-cl9ok]');
  if((kind==='google'||kind==='reg')&&ok&&!ok.checked){toast('☑️ Prima metti la spunta: chiedi a mamma o papà!');ok.closest('label').classList.add('cl9warn');return}
  if(kind==='reg'&&!nm){toast('✏️ Scrivi il tuo nome');return}
  OL9.busy=1;cl9Ui();try{await cl9Load();let r;
    if(kind==='google'){const pr=new firebase.auth.GoogleAuthProvider();pr.setCustomParameters({prompt:'select_account'});try{r=await OL9.auth.signInWithPopup(pr)}catch(e){if(e&&(e.code==='auth/popup-blocked'||e.code==='auth/operation-not-supported-in-this-environment')){await OL9.auth.signInWithRedirect(pr);return}throw e}}
    else if(kind==='reg'){r=await OL9.auth.createUserWithEmailAndPassword(em.trim(),pw);await r.user.updateProfile({displayName:nm})}
    else if(kind==='in'){r=await OL9.auth.signInWithEmailAndPassword(em.trim(),pw)}
    else if(kind==='reset'){if(!em.trim()){toast('✏️ Scrivi prima la tua email');OL9.busy=0;cl9Ui();return}await OL9.auth.sendPasswordResetEmail(em.trim());toast('📧 Ti ho mandato un\'email per cambiare la password');OL9.busy=0;cl9Ui();return}
    else if(kind==='out'){await cl9Out();return}
    else if(kind==='del'){if(!confirm('Vuoi cancellare per sempre il tuo account online e la partita salvata?')){OL9.busy=0;cl9Ui();return}const u=OL9.user;await OL9.db.collection('utenti').doc(u.uid).delete();await u.delete();cl9Forget(u);toast('🗑️ Account online cancellato');acc9Go();return}
    if(r&&r.user){OL9.user=r.user;await cl9After(r.user)}}
  catch(e){OL9.busy=0;OL9.err=e&&e.code?cl9Err(e):'Gli account online funzionano sul sito del gioco';cl9Ui();toast('⚠️ '+OL9.err)}}
function cl9Forget(u){const id=cl9Id(u),o=ACC9.d();o.list=o.list.filter(a=>a.id!==id);try{localStorage.removeItem('vita_sv9_'+id);localStorage.removeItem('vita_cl9');if(o.cur===id){o.cur=null;localStorage.removeItem(LS)}}catch(e){}ACC9.w(o)}
async function cl9Out(){const u=OL9.user;if(!u)return;try{if(S)save();await cl9Push(true)}catch(e){}await OL9.auth.signOut();cl9Forget(u);toast('👋 Sei uscito dal tuo account');acc9Go()}
// il riquadro "account online" (schermata iniziale, bentornato, telefono)
function cl9Html(){const u=OL9.user;if(u)return `<div class="cl9in">☁️ Sei entrato come <b>${esc(cl9Nm(u))}</b><small>${esc(u.email||'')} · la partita si salva online e la ritrovi su ogni computer e telefono</small>
    <div class="mk"><button type="button" class="b alt" data-cl9do="out">Esci</button><button type="button" class="b alt" data-cl9do="del" title="Cancella l'account online">🗑️ Cancella</button></div></div>`;
  return `<div class="cl9box"><b>☁️ Account online</b><small>Così ritrovi la tua partita su ogni computer e telefono.</small>
    <button type="button" class="b g9" data-cl9do="google"><span class="gG">G</span> Accedi con Google</button>
    <div class="or9">oppure con email e password</div>
    <input data-cl9nm maxlength="24" placeholder="Il tuo nome (solo per registrarti)" autocomplete="name">
    <input data-cl9em type="email" placeholder="La tua email" autocomplete="email">
    <input data-cl9pw type="password" placeholder="Password (almeno 6 caratteri)" autocomplete="current-password">
    <label class="ok9"><input type="checkbox" data-cl9ok> Ho più di 14 anni, oppure mamma o papà sono d'accordo. <a href="privacy.html" target="_blank" rel="noopener">Privacy</a></label>
    <div class="mk"><button type="button" class="b" data-cl9do="in">Entra</button><button type="button" class="b alt" data-cl9do="reg">Registrati</button></div>
    <a href="#" class="fg9" data-cl9do="reset">Ho dimenticato la password</a>${OL9.busy?'<div class="or9">⏳ Un attimo…</div>':''}${OL9.err?`<div class="er9">⚠️ ${esc(OL9.err)}</div>`:''}</div>`}
function cl9Ui(){document.querySelectorAll('[data-cl9]').forEach(el=>{const h=cl9Html();if(el._h===h)return;
  const keep={};el.querySelectorAll('input').forEach(i=>{const k=Object.keys(i.dataset)[0];if(k)keep[k]=i.type==='checkbox'?i.checked:i.value});
  el.innerHTML=h;el._h=h;el.querySelectorAll('input').forEach(i=>{const k=Object.keys(i.dataset)[0];if(k in keep){if(i.type==='checkbox')i.checked=keep[k];else i.value=keep[k]}i.onkeydown=ev=>{ev.stopPropagation();if(ev.key==='Enter'&&i.dataset.cl9pw!=null)cl9Do('in',el)}});
  el.querySelectorAll('[data-cl9do]').forEach(b=>b.onclick=ev=>{ev.preventDefault();ev.stopPropagation();cl9Do(b.dataset.cl9do,el)})})}
{const st=document.createElement('style');st.id='cl9s';st.textContent=`
.cl9box,.cl9in{display:grid;gap:7px;margin-top:6px;padding:12px;border-radius:16px;border:1.5px dashed rgba(63,217,138,.5);background:rgba(63,217,138,.06);text-align:left}
.cl9box small,.cl9in small{display:block;color:#8fd9ad;font-weight:700;font-size:12px}
.cl9box input:not([type=checkbox]){border-radius:12px;border:1.5px solid rgba(63,217,138,.4);background:#050a07;color:#eafff2;padding:10px;font:700 14px var(--f-body);min-width:0}
.cl9box button.g9,.acc9 .cl9box button.b.g9{display:flex;gap:10px;align-items:center;justify-content:center;background:#fff;color:#1f2540;border:0;border-radius:12px;padding:11px;font:900 15px var(--f-body);cursor:pointer}
.gG{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:conic-gradient(#ea4335 0 25%,#fbbc05 0 50%,#34a853 0 75%,#4285f4 0);color:#fff;font:900 14px sans-serif}
.or9{text-align:center;font-size:12px;font-weight:800;opacity:.75}.er9{color:#ff9aa2;font-weight:800;font-size:13px}
.ok9{display:flex;gap:8px;align-items:flex-start;font-size:12px;font-weight:700;line-height:1.35}.ok9 input{width:18px;height:18px;flex:none;margin:0}.ok9 a{color:#8fd9ad}.ok9.cl9warn{color:#ffd84a}
.fg9{font-size:12px;font-weight:800;color:#8fd9ad;text-align:center}
.cl9box .mk,.cl9in .mk{display:flex;gap:8px}.cl9box .mk .b,.cl9in .mk .b{flex:1}
.cl9box .b,.cl9in .b{border-radius:12px;padding:9px 12px;border:0;background:#3fd98a;color:#04140a;font:900 13px var(--f-body);cursor:pointer}
.cl9box .b.alt,.cl9in .b.alt{background:transparent;color:inherit;border:1.5px solid rgba(63,217,138,.45)}
html.tn9 .cl9box,html.tn9 .cl9in{background:#f4fbf7;border-color:#9fd3b4}html.tn9 .cl9box small,html.tn9 .cl9in small,html.tn9 .fg9,html.tn9 .ok9 a{color:#2e7a52}
html.tn9 .cl9box input:not([type=checkbox]){background:#fff;color:#1f2540;border-color:#d6d9e6}html.tn9 .cl9box button.g9{border:1.5px solid #d6d9e6}html.tn9 .cl9box .b{background:#2e9e5b;color:#fff}html.tn9 .cl9box .b.alt,html.tn9 .cl9in .b.alt{background:#fff;color:#1f2540;border-color:#d6d9e6}
`;document.head.appendChild(st)}
// salvataggio online automatico
{const _sv=save;save=function(){const r=_sv.apply(this,arguments);try{if(!acc9Busy&&OL9.user&&ACC9.d().cur===cl9Id(OL9.user))cl9Push(false)}catch(e){}return r}}
addEventListener('pagehide',()=>{try{if(OL9.user&&S&&!acc9Busy){save();cl9Push(true)}}catch(e){}});
// se avevi già fatto l'accesso: riprende la sessione e, se hai giocato su un altro dispositivo, carica la partita più nuova
try{if(localStorage.getItem('vita_cl9')==='1'||/apiKey=|mode=/.test(location.search))cl9Load().then(async()=>{const u=OL9.user;if(!u)return;const id=cl9Id(u);if(ACC9.d().cur!==id)return;
  try{const g=await OL9.db.collection('utenti').doc(u.uid).get();const d=g.exists?g.data():null;const loc=+localStorage.getItem('vita_cl9t_'+u.uid)||0,rem=d&&d.ultimo&&d.ultimo.toMillis?d.ultimo.toMillis():0;
    if(d&&d.salvataggio&&rem>loc+8000&&d.salvataggio!==localStorage.getItem(LS)){localStorage.setItem(LS,d.salvataggio);localStorage.setItem('vita_cl9t_'+u.uid,String(rem));toast('☁️ Carico la partita che hai giocato su un altro dispositivo…');acc9Go()}}catch(e){}}).catch(()=>{})}catch(e){}
