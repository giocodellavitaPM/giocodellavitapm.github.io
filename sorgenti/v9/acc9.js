/* ================= v9: account dei giocatori (salvati in questo browser) ================= */
const ACC9={IC:['🦁','🐯','🐼','🦊','🐸','🐵','🦄','🐶','🐱','🐧','🚀','⚽'],
  d(){try{const o=JSON.parse(localStorage.getItem('vita_acc9')||'null');if(o&&Array.isArray(o.list))return o}catch(e){}return {list:[],cur:null}},
  w(o){try{localStorage.setItem('vita_acc9',JSON.stringify(o))}catch(e){}},
  cur(){const o=this.d();return o.list.find(a=>a.id===o.cur)||null},
  // salva la partita di adesso nello spazio dell'account attuale
  stash(){const o=this.d();if(!o.cur)return;try{if(S)save();const v=localStorage.getItem(LS);if(v)localStorage.setItem('vita_sv9_'+o.cur,v);else localStorage.removeItem('vita_sv9_'+o.cur)}catch(e){}},
  add(name,ic){name=String(name||'').trim().slice(0,18);if(!name){toast('✏️ Scrivi un nome per l\'account');return null}
    const o=this.d(),a={id:'a'+Date.now().toString(36)+Math.floor(Math.random()*1e4),n:name,ic:ic||pick(this.IC),t:Date.now()};
    if(!o.list.length){o.list.push(a);o.cur=a.id;this.w(o);this.stash();toast(`👤 Account di ${name} creato! Il gioco si ricorda di te.`);return a}
    this.stash();o.list.push(a);o.cur=a.id;this.w(o);try{localStorage.removeItem(LS)}catch(e){}acc9Go();return a},
  use(id){const o=this.d();if(o.cur===id)return;this.stash();o.cur=id;this.w(o);try{const v=localStorage.getItem('vita_sv9_'+id);if(v)localStorage.setItem(LS,v);else localStorage.removeItem(LS)}catch(e){}acc9Go()},
  newGame(){this.stash();try{localStorage.removeItem(LS)}catch(e){}const o=this.d();if(o.cur){try{localStorage.removeItem('vita_sv9_'+o.cur)}catch(e){}}acc9Go()},
  del(id){const o=this.d();o.list=o.list.filter(a=>a.id!==id);try{localStorage.removeItem('vita_sv9_'+id)}catch(e){}if(o.cur===id){o.cur=o.list[0]?o.list[0].id:null;this.w(o);try{const v=o.cur&&localStorage.getItem('vita_sv9_'+o.cur);if(v)localStorage.setItem(LS,v);else localStorage.removeItem(LS)}catch(e){}acc9Go();return}this.w(o)},
  info(id){try{const s=JSON.parse(localStorage.getItem(id===this.d().cur?LS:'vita_sv9_'+id)||'null');if(s&&s.name)return `${s.name}, ${s.age} ann${s.age===1?'o':'i'}${s.alive?'':' · vita finita'}`}catch(e){}return 'Nessuna partita ancora'}};
let acc9Busy=0;function acc9Go(){acc9Busy=1;S=null;setTimeout(()=>location.reload(),350)}
// codice per portare la partita su un altro computer o telefono
async function acc9Code(){if(S)save();const raw=localStorage.getItem(LS)||'';if(!raw)return '';try{const cs=new Blob([raw]).stream().pipeThrough(new CompressionStream('gzip'));const b=new Uint8Array(await new Response(cs).arrayBuffer());let s='';for(let i=0;i<b.length;i+=8192)s+=String.fromCharCode.apply(null,b.subarray(i,i+8192));return 'VITA1:'+btoa(s)}catch(e){return 'VITA0:'+btoa(unescape(encodeURIComponent(raw)))}}
async function acc9Read(code){code=String(code||'').trim().replace(/\s+/g,'');let raw='';
  if(code.startsWith('VITA1:')){const bin=atob(code.slice(6)),b=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)b[i]=bin.charCodeAt(i);raw=await new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream('gzip'))).text()}
  else if(code.startsWith('VITA0:'))raw=decodeURIComponent(escape(atob(code.slice(6))));else throw 0;
  const s=JSON.parse(raw);if(!s||!s.st||!s.name)throw 0;return raw}
async function acc9Import(code){try{const raw=await acc9Read(code),s=JSON.parse(raw);ACC9.stash();const o=ACC9.d(),a={id:'a'+Date.now().toString(36),n:s.name,ic:pick(ACC9.IC),t:Date.now()};o.list.push(a);o.cur=a.id;ACC9.w(o);localStorage.setItem(LS,raw);toast(`✅ Partita di ${s.name} caricata!`);acc9Go()}catch(e){toast('❌ Codice non valido: controlla di averlo copiato tutto')}}
{const st=document.createElement('style');st.id='acc9s';st.textContent=`
.acc9{display:grid;gap:8px}
.acc9 .row{display:flex;gap:8px;align-items:center;border-radius:14px;padding:8px 10px;border:1.5px solid rgba(63,217,138,.32);background:#0b1610;color:#eafff2}
.acc9 .row.on{border-color:#3fd98a;background:#0f5a30}
.acc9 .row i{font-style:normal;font-size:26px}.acc9 .row span{flex:1;min-width:0;font:800 14px var(--f-body)}.acc9 .row small{display:block;color:#8fd9ad;font-weight:700;font-size:11px}
.acc9 button.b{border-radius:12px;padding:8px 12px;border:0;background:#3fd98a;color:#04140a;font:900 13px var(--f-body);cursor:pointer;white-space:nowrap}
.acc9 button.b.alt{background:transparent;color:inherit;border:1.5px solid rgba(63,217,138,.45)}
.acc9 .mk{display:flex;gap:8px}.acc9 input,.acc9 textarea{flex:1;min-width:0;border-radius:12px;border:1.5px solid rgba(63,217,138,.4);background:#050a07;color:#eafff2;padding:9px 10px;font:700 14px var(--f-body)}
.acc9 textarea{min-height:70px;font:600 11px monospace;word-break:break-all;width:100%;box-sizing:border-box}
html.tn9 .acc9 .row{background:#fff;color:#1f2540;border-color:#d6d9e6}html.tn9 .acc9 .row.on{background:#e3f6ea;border-color:#2e9e5b}html.tn9 .acc9 .row small{color:#5b6280}
html.tn9 .acc9 input,html.tn9 .acc9 textarea{background:#fff;color:#1f2540;border-color:#d6d9e6}html.tn9 .acc9 button.b{background:#2e9e5b;color:#fff}html.tn9 .acc9 button.b.alt{background:#fff;color:#1f2540;border-color:#d6d9e6}
#acc9w{position:fixed;inset:0;z-index:60;display:grid;place-items:center;background:rgba(2,6,12,.72);backdrop-filter:blur(6px);padding:16px}
#acc9w .bx{width:min(420px,100%);max-height:90vh;overflow:auto;background:#07110c;border:2px solid #3fd98a;border-radius:22px;padding:18px;color:#eafff2;box-shadow:0 0 30px rgba(63,217,138,.35);text-align:center}
#acc9w h2{margin:4px 0 2px;font:900 24px var(--f-disp)}#acc9w p{margin:0 0 12px;color:#8fd9ad;font-weight:700}
#acc9w .acc9{text-align:left}#acc9w .big{width:100%;padding:13px;font-size:17px;margin:6px 0 4px}
html.tn9 #acc9w .bx{background:#fff;color:#1f2540;border-color:#2e9e5b}html.tn9 #acc9w p{color:#5b6280}
`;document.head.appendChild(st)}
function acc9List(full){const o=ACC9.d();return o.list.filter(a=>!a.fb||a.id===o.cur).map(a=>`<div class="row${a.id===o.cur?' on':''}"><i>${a.ic}</i><span>${esc(a.n)}<small>${a.id===o.cur?'Questo sei tu adesso · ':''}${esc(ACC9.info(a.id))}</small></span>${a.id===o.cur?'':`<button type="button" class="b" data-acc-use="${a.id}">Gioca</button>`}${full?`<button type="button" class="b alt" data-acc-del="${a.id}" title="Cancella">🗑️</button>`:''}</div>`).join('')}
function acc9Make(lbl){return `<div class="mk"><input id="acc9nm" maxlength="18" placeholder="Il tuo nome" autocomplete="off"><button type="button" class="b" data-acc-add="1">${lbl||'Crea'}</button></div>`}
function acc9Bind(root){root.querySelectorAll('[data-acc-use]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();ACC9.use(b.dataset.accUse)});
  root.querySelectorAll('[data-acc-del]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();const a=ACC9.d().list.find(x=>x.id===b.dataset.accDel);if(a&&confirm(`Vuoi cancellare l'account di ${a.n} e la sua partita?`))ACC9.del(a.id);if(!acc9Busy&&typeof phRender==='function'&&ui.ph9)phRender()});
  root.querySelectorAll('[data-acc-add]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();const i=root.querySelector('#acc9nm');const a=ACC9.add(i&&i.value);if(a&&!acc9Busy){const box=$('acc9st');if(box)acc9Start(box);if(ui.ph9)phRender()}});
  root.querySelectorAll('#acc9nm,textarea').forEach(i=>i.onkeydown=ev=>ev.stopPropagation());
  root.querySelectorAll('[data-acc-new]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();if(!S||!S.alive||confirm('Vuoi cominciare una vita nuova? La partita di adesso di questo account si cancella.'))ACC9.newGame()});
  root.querySelectorAll('[data-acc-x]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();const w=$('acc9w');if(w)w.remove()});
  root.querySelectorAll('[data-acc-code]').forEach(b=>b.onclick=async ev=>{ev.stopPropagation();const t=root.querySelector('#acc9code');const c=await acc9Code();if(!c){toast('Non c\'è ancora una partita da copiare');return}if(t){t.value=c;t.select()}try{await navigator.clipboard.writeText(c);toast('📋 Codice copiato! Incollalo sull\'altro computer o telefono')}catch(_){toast('📋 Copia il codice qui sotto')}});
  root.querySelectorAll('[data-acc-imp]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();const t=root.querySelector('#acc9code');acc9Import(t&&t.value)})}
// riquadro account nella schermata iniziale
function acc9Start(box){const o=ACC9.d(),c=ACC9.cur();
  box.innerHTML=`<label>👤 Il tuo account</label><div class="acc9"><div style="font-weight:700;opacity:.85">Vuoi aggiungere il tuo account? Così il gioco si ricorda di te ogni volta.</div><div data-cl9></div>
    <b style="font-size:13px;margin-top:4px">📱 Oppure un account solo su questo dispositivo:</b>${acc9List(0)}${acc9Make(o.list.length?'+ Nuovo':'Crea')}
    <details><summary style="cursor:pointer;font-weight:800;font-size:13px">📲 Hai un codice da un altro computer o telefono?</summary><div class="acc9" style="margin-top:8px"><textarea id="acc9code" placeholder="Incolla qui il codice della tua partita"></textarea><button type="button" class="b" data-acc-imp="1">Carica la mia partita</button></div></details></div>`;
  acc9Bind(box);if(typeof cl9Ui==='function')cl9Ui();const nm=$('nm');if(c&&nm&&!nm._acc9){nm._acc9=1}}
{const _s=showStart;showStart=function(){const r=_s.apply(this,arguments);try{const ref=$('dv9')||$('ch9')||$('born');const card=document.querySelector('#screen .card');if(card&&!$('acc9st')){const d=document.createElement('div');d.id='acc9st';d.className='field';card.insertBefore(d,card.firstChild);acc9Start(d)}}catch(e){console.warn('acc9',e)}return r}}
// quando riapri il gioco: "c'è già un account, vuoi continuare o giocare uno nuovo?"
let acc9Shown=0;
function acc9Welcome(){if(acc9Shown||$('acc9w'))return;acc9Shown=1;const c=ACC9.cur();if(!c){let sk=0;try{sk=+localStorage.getItem('vita_acc9skip')||0}catch(e){}if(Date.now()-sk<3*864e5&&!window.ACC9T)return;
  const w=document.createElement('div');w.id='acc9w';w.innerHTML=`<div class="bx"><div style="font-size:52px">👤</div><h2>Vuoi aggiungere il tuo account?</h2><p>Così il gioco si ricorda di te e ritrovi la tua partita su ogni computer e telefono.</p>
    <div class="acc9"><div data-cl9></div></div><button type="button" class="b alt big" data-acc-x="1" style="border-radius:14px;background:transparent;color:inherit;border:1.5px solid rgba(63,217,138,.45);font:800 15px var(--f-body);cursor:pointer">▶ Non ora, continua a giocare</button></div>`;
  document.body.appendChild(w);acc9Bind(w);if(typeof cl9Ui==='function')cl9Ui();w.querySelector('[data-acc-x]').addEventListener('click',()=>{try{localStorage.setItem('vita_acc9skip',String(Date.now()))}catch(e){}});w.onclick=ev=>{if(ev.target===w)w.remove()};return}const w=document.createElement('div');w.id='acc9w';
  w.innerHTML=`<div class="bx"><div style="font-size:52px">${c.ic}</div><h2>Bentornat${S&&S.sex==='f'?'a':'o'}, ${esc(c.n)}!</h2><p>C'è già il tuo account: ${esc(ACC9.info(c.id))}</p>
    <button type="button" class="b big" data-acc-x="1" style="border-radius:14px;border:0;background:#3fd98a;color:#04140a;font:900 17px var(--f-body);cursor:pointer">▶ Continua da dove avevi lasciato</button>
    <div class="acc9" style="margin-top:12px">${ACC9.d().list.filter(a=>!a.fb).length>(c.fb?0:1)?'<b style="font-size:13px">Oppure gioca con un altro account:</b>'+acc9List(0):''}
    <div data-cl9></div><b style="font-size:13px">Sei un'altra persona? Crea il tuo account:</b>${acc9Make('+ Nuovo')}<button type="button" class="b alt" data-acc-new="1">✨ Gioca una vita nuova con ${esc(c.n)}</button></div></div>`;
  document.body.appendChild(w);acc9Bind(w);if(typeof cl9Ui==='function')cl9Ui();w.onclick=ev=>{if(ev.target===w)w.remove()}}
{const _g=startGame;startGame=function(){const r=_g.apply(this,arguments);try{if(!acc9Shown&&(!navigator.webdriver||window.ACC9T))setTimeout(acc9Welcome,300);acc9Shown=acc9Shown||(navigator.webdriver&&!window.ACC9T)?1:acc9Shown}catch(e){}return r}}
{const _sv=save;save=function(){if(acc9Busy)return;return _sv.apply(this,arguments)}}
// app Account nel telefono
PHX9.acc9={t:'👤 Account',h:()=>{const c=ACC9.cur();return `<div class="scr"><div class="acc9">${c?'':'<p style="margin:0;color:var(--soft)">Non hai ancora un account. Creane uno: così il gioco si ricorda di te!</p>'}<div data-cl9></div>${acc9List(1)}<b>Nuovo account sul dispositivo</b>${acc9Make('Crea')}
  ${c?`<button type="button" class="b alt" data-acc-new="1">✨ Vita nuova con ${esc(c.n)}</button>`:''}
  <b style="margin-top:8px">📲 Gioca su un altro computer o telefono</b><p style="margin:0;color:var(--soft);font-size:13px">Copia il codice della tua partita e incollalo nel gioco sull'altro dispositivo (schermata iniziale o qui).</p>
  <button type="button" class="b" data-acc-code="1">📋 Copia il codice della mia partita</button><textarea id="acc9code" placeholder="…oppure incolla qui un codice"></textarea><button type="button" class="b alt" data-acc-imp="1">Carica la partita dal codice</button></div></div>`},on(e){acc9Bind(e);if(typeof cl9Ui==='function')cl9Ui()}};
{const _a=phApps;phApps=function(){const L=_a.apply(this,arguments),i=L.findIndex(x=>x[0]==='set');L.splice(i<0?L.length:i,0,['acc9','👤','Account']);return L}}
