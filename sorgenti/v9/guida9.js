/* ===== v86: 📱 il telefono diventa il volante (app «Guida Gioco della Vita PM» in /guida/) =====
   Impostazioni → 🎮 Impostazioni guida → 📱 Collega al telefono. Collegamento diretto (WebRTC, PeerJS) col codice di 6 numeri.
   Il telefono manda {s:sterzo -1..1, g:acceleratore 0..1, b:freno 0..1}; il gioco risponde {v:velocità, c:in auto?, n:nome veicolo}. */
const GD9={peer:null,conn:null,st:'off',s:0,g:0,b:0,t:0,set:0,tries:0,err:''};
const GD9_URL='https://giocodellavitapm.github.io/guida/';
const gd9LS=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){return null}};
function gd9Lib(L){return new Promise((ok,ko)=>{const go=i=>{if(i>=L.length)return ko(new Error('lib'));const s=document.createElement('script');s.src=L[i];s.onload=ok;s.onerror=()=>{s.remove();go(i+1)};document.head.appendChild(s)};go(0)})}
function gd9Code(nuovo){let c=gd9LS('vita_gd9code');if(nuovo||!/^\d{6}$/.test(c||'')){c=String(100000+Math.floor(Math.random()*900000));gd9LS('vita_gd9code',c)}return c}
const gd9Live=()=>!!(GD9.conn&&GD9.conn.open&&performance.now()-GD9.t<700);
const gd9Sens=()=>({1:.75,2:1.1,3:1.5})[+gd9LS('vita_gd9sens')||2]||1.1;
async function gd9Start(quiet){if(GD9.peer&&!GD9.peer.destroyed)return gd9Ui();GD9.st='wait';GD9.err='';gd9Ui();
  try{if(typeof Peer==='undefined')await gd9Lib(['lib/peerjs.min.js','https://giocodellavitapm.github.io/lib/peerjs.min.js','https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js'])}catch(e){GD9.st='err';GD9.err='Non riesco a caricare il collegamento: controlla internet.';return gd9Ui()}
  const c=gd9Code(),p=new Peer('gdvpm9-'+c,Object.assign({debug:0},window.GD9_CFG||{}));GD9.peer=p;
  p.on('open',()=>{GD9.st=GD9.conn&&GD9.conn.open?'on':'ready';GD9.tries=0;gd9Ui()});
  p.on('connection',cn=>{const old=GD9.conn;GD9.conn=cn;if(old&&old!==cn)try{old.close()}catch(e){}
    cn.on('open',()=>{GD9.st='on';GD9.t=performance.now();gd9LS('vita_gd9auto','1');try{toast('📱🚗 Telefono collegato! Adesso è il tuo volante: destra accelera, sinistra frena, giralo per sterzare.')}catch(e){}gd9Ui()});
    cn.on('data',d=>{if(!d||typeof d!=='object')return;const n=(x,a,b)=>Math.max(a,Math.min(b,+x||0));GD9.s=n(d.s,-1,1);GD9.g=n(d.g,0,1);GD9.b=n(d.b,0,1);GD9.t=performance.now()});
    const bye=()=>{if(GD9.conn!==cn)return;GD9.conn=null;GD9.st=GD9.peer&&!GD9.peer.destroyed?'ready':'off';gd9Rel();try{toast('📱 Il telefono si è scollegato.')}catch(e){}gd9Ui()};cn.on('close',bye);cn.on('error',bye)});
  p.on('disconnected',()=>{if(!p.destroyed)setTimeout(()=>{try{if(!p.destroyed&&p.disconnected)p.reconnect()}catch(e){}},2000)});
  p.on('error',e=>{const t=e&&e.type;if(t==='peer-unavailable')return;
    if(t==='unavailable-id'){try{p.destroy()}catch(x){}GD9.peer=null;GD9.tries++;if(GD9.tries>3)gd9Code(true);setTimeout(()=>gd9Start(true),3000);GD9.st='wait';return gd9Ui()}
    if(t==='browser-incompatible'){GD9.st='err';GD9.err='Questo browser non permette il collegamento: prova con Chrome.';try{p.destroy()}catch(x){}GD9.peer=null;return gd9Ui()}
    GD9.st='err';GD9.err='Problema di rete: riprovo tra poco…';gd9Ui();try{p.destroy()}catch(x){}GD9.peer=null;setTimeout(()=>{if(!GD9.peer&&gd9LS('vita_gd9auto')!=='0')gd9Start(true)},5000)})}
function gd9Stop(){gd9LS('vita_gd9auto','0');try{GD9.conn&&GD9.conn.close()}catch(e){}try{GD9.peer&&GD9.peer.destroy()}catch(e){}GD9.conn=null;GD9.peer=null;GD9.st='off';gd9Rel();gd9Ui()}
function gd9Rel(){if(GD9.set){ui.gas=false;ui.brake=false;GD9.set=0}}
// acceleratore e freno dal telefono
setInterval(()=>{try{if(gd9Live()&&carNow9()){ui.pedMode=true;ui.gas=GD9.g>.25;ui.brake=GD9.b>.25&&!ui.gas;GD9.set=1}else gd9Rel()}catch(e){}},30);
// lo sterzo: giri il telefono come un volante
{const _ci=carInput;carInput=function(){const v=_ci.apply(this,arguments);try{if(!gd9Live()||!carNow9())return v;if(typeof inputDir==='function'&&inputDir())return v;
  const st=S.drive&&S.drive.man?S.drive:ui.car;if(!st)return v;let o=GD9.s;if(Math.abs(o)<.05)return null;const a=(st.ang||0)+o*gd9Sens();return [Math.cos(a),Math.sin(a)]}catch(e){return v}}}
// al telefono: velocità e se sei in macchina
setInterval(()=>{try{if(!GD9.conn||!GD9.conn.open)return;const inC=carNow9(),st=S&&(S.drive&&S.drive.man?S.drive:ui.car);
  GD9.conn.send({v:inC&&st?Math.round(Math.abs(st.v||0)*12):0,c:inC?1:0,n:inC&&S.ride?String((bestRide()||{}).n||''):''})}catch(e){}},250);
// se l'ultima volta eri collegato, il gioco si rimette in attesa da solo (così il telefono si ricollega)
setTimeout(()=>{if(gd9LS('vita_gd9auto')==='1')gd9Start(true)},4000);
// ---- la finestra «🎮 Impostazioni guida»
function gd9Open(){if($('gd9'))return gd9Ui();const e=document.createElement('div');e.id='gd9';e.addEventListener('click',ev=>{if(ev.target===e)gd9Close()});document.body.appendChild(e);gd9Ui()}
function gd9Close(){const e=$('gd9');if(e)e.remove()}
function gd9Ui(){const e=$('gd9');if(!e)return;const c=gd9Code(),link=GD9_URL+'?c='+c,sens=+gd9LS('vita_gd9sens')||2,st=GD9.st;
  const stato=st==='on'?'<p class="g9ok">🟢 Telefono collegato! Sali in macchina e guida col telefono.</p>':st==='ready'?'<p class="g9w">✅ Pronto! Ora apri l\'app sul telefono e scrivi il codice.</p>':st==='wait'?'<p class="g9w">⏳ Preparo il collegamento…</p>':st==='err'?`<p class="g9e">⚠️ ${esc(GD9.err||'Qualcosa non va.')}</p>`:'';
  e.innerHTML=`<div class="in" role="dialog" aria-label="Impostazioni guida"><div style="font-size:44px">🎮</div><h2>Impostazioni guida</h2>
   <div class="g9b"><b>💻 Sul computer</b><small>Muovi il mouse per sterzare: tasto DESTRO accelera, SINISTRO frena. Vanno bene anche le freccette.</small></div>
   <div class="g9b"><b>📱 Collega al telefono</b><small>Il tuo telefono diventa un volante! Lo tieni in orizzontale: a destra l'acceleratore, a sinistra il freno, e lo giri per sterzare. Funziona con macchine, moto, camion e tutti i veicoli a motore.</small>
    ${st==='off'?'<button class="go" data-g9="on">📱 Collega al telefono</button>':`
    <ol><li>Sul telefono apri <b>giocodellavitapm.github.io/guida</b> oppure inquadra il quadrato qui sotto.</li><li>Installa l'app <b>«Guida Gioco della Vita PM»</b> (la prima volta).</li><li>Scrivi questo codice e premi Collega:</li></ol>
    <div class="g9c">${c.slice(0,3)} ${c.slice(3)}</div><div class="g9q" id="gd9q"></div>${stato}
    <div class="g9r"><button data-g9="new">🔄 Nuovo codice</button><button data-g9="off">🔌 Scollega</button></div>`}</div>
   <div class="g9b"><b>🎯 Sterzo del telefono</b><small>Quanto gira la macchina quando giri il telefono</small><div class="g9r">${[[1,'Piano'],[2,'Normale'],[3,'Forte']].map(([k,t])=>`<button data-g9s="${k}" ${k===sens?'class="on"':''}>${t}</button>`).join('')}</div></div>
   <button data-g9="x">Chiudi</button></div>`;
  e.querySelectorAll('[data-g9]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();const k=b.dataset.g9;if(k==='x')return gd9Close();if(k==='on'){gd9LS('vita_gd9auto','1');return gd9Start()}if(k==='off')return gd9Stop();
    if(k==='new'){gd9Code(true);try{GD9.conn&&GD9.conn.close()}catch(x){}try{GD9.peer&&GD9.peer.destroy()}catch(x){}GD9.peer=null;GD9.conn=null;GD9.tries=0;gd9Start()}});
  e.querySelectorAll('[data-g9s]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();gd9LS('vita_gd9sens',b.dataset.g9s);gd9Ui()});
  const q=$('gd9q');if(q)gd9Qr(q,link)}
async function gd9Qr(box,link){try{if(typeof qrcode==='undefined')await gd9Lib(['lib/qrcode.js','https://giocodellavitapm.github.io/lib/qrcode.js','https://unpkg.com/qrcode-generator@1.4.4/qrcode.js']);const q=qrcode(0,'M');q.addData(link);q.make();
  box.innerHTML=q.createSvgTag({cellSize:4,margin:2,scalable:true})+`<small>${esc(link)}</small>`}catch(e){box.innerHTML=`<small>${esc(link)}</small>`}}
// in ⚙️ Impostazioni (telefono del gioco) e nella Pausa
{const _pr=phRender;phRender=function(){const r=_pr.apply(this,arguments);try{if(PH9.app==='set'){const sc=document.querySelector('#ph9 .scr');if(sc&&!$('gd9b')){const b=document.createElement('button');b.id='gd9b';b.className='li9';
  b.innerHTML='<span class="av9">🎮</span><span class="tx"><b>Impostazioni guida</b><small>📱 Collega al telefono: diventa il tuo volante</small></span>';b.onclick=ev=>{ev.stopPropagation();gd9Open()};const w=$('sk9w')||$('sk9b');w?w.after(b):sc.insertBefore(b,sc.firstChild)}}}catch(e){}return r}}
{const _po=psOpen;psOpen=function(){const r=_po.apply(this,arguments);try{const i=document.querySelector('#ps9 .in');if(i&&!i.querySelector('[data-gd9p]')){const b=document.createElement('button');b.dataset.gd9p='1';b.textContent='🎮 Impostazioni guida';
  b.onclick=()=>{try{psClose()}catch(e){}gd9Open()};const sv=i.querySelector('[data-p="save"]');sv?i.insertBefore(b,sv):i.appendChild(b)}}catch(e){}return r}}
{const st=document.createElement('style');st.textContent=`#gd9{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);display:grid;place-items:center;padding:16px}
#gd9 .in{max-width:400px;width:100%;max-height:92vh;overflow:auto;box-sizing:border-box;background:#06110b;color:#eafff2;border:2px solid var(--neon,#3fd98a);border-radius:20px;padding:20px;text-align:center;display:flex;flex-direction:column;gap:10px;font-size:15px}
#gd9 h2{margin:0;font-size:22px}#gd9 .g9b{background:#0b1a12;border-radius:16px;padding:12px;text-align:left;display:flex;flex-direction:column;gap:6px}#gd9 .g9b small{color:#9cc9ad;font-weight:600;line-height:1.35}
#gd9 ol{margin:4px 0;padding-left:20px;line-height:1.4}#gd9 .g9c{font:900 34px/1 monospace;letter-spacing:4px;text-align:center;color:var(--neon,#3fd98a);margin:4px 0}
#gd9 .g9q{display:flex;flex-direction:column;align-items:center;gap:4px}#gd9 .g9q svg{width:170px;height:170px;background:#fff;border-radius:10px}#gd9 .g9q small{word-break:break-all;text-align:center}
#gd9 .g9r{display:flex;gap:6px;flex-wrap:wrap}#gd9 .g9r button{flex:1}#gd9 button{border-radius:14px;padding:11px;font:inherit;font-weight:800;cursor:pointer;border:1.5px solid var(--neon,#3fd98a);background:transparent;color:#eafff2}
#gd9 button.go,#gd9 button.on{background:var(--neon,#3fd98a);color:#021008}#gd9 .g9ok{color:var(--neon,#3fd98a);font-weight:800;margin:0;text-align:center}#gd9 .g9w{color:#ffd166;font-weight:800;margin:0;text-align:center}#gd9 .g9e{color:#ff7b86;font-weight:800;margin:0;text-align:center}`;document.head.appendChild(st)}
