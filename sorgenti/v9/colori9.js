/* ================= v9: tanti colori per i menu, più impostazioni e più app nel telefono ================= */
const COL9=[['neon','Verde','#3fd98a'],['azzurro','Azzurro','#3fb8ff'],['blu','Blu','#6f8bff'],['viola','Viola','#b383ff'],['rosa','Rosa','#ff6fc8'],['rosso','Rosso','#ff5d5d'],
  ['arancio','Arancione','#ff9d42'],['giallo','Giallo','#ffd84a'],['oro','Oro','#e0b45a'],['ghiaccio','Ghiaccio','#cfe3ee'],['normale','Normale','#ffffff']];
function col9Hex(k){const c=COL9.find(x=>x[0]===k);return c?c[2]:'#3fd98a'}
function col9Rgb(h){const n=parseInt(h.slice(1),16);return [n>>16&255,n>>8&255,n&255]}
function col9Mix(h,t,a){const A=col9Rgb(h),B=col9Rgb(t);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*a).toString(16).padStart(2,'0')).join('')}
// ricolora tutti gli stili del gioco che usano il verde neon
function col9Apply(k){const hex=k==='normale'?'#3fd98a':col9Hex(k),rgb=col9Rgb(hex).join(','),R=[
    [/#3fd98a/gi,hex],[/63,217,138/g,rgb],[/#8fe8b6/gi,col9Mix(hex,'#ffffff',.45)],[/#bfffd6/gi,col9Mix(hex,'#ffffff',.65)],[/#26a866/gi,col9Mix(hex,'#000000',.25)],
    [/#0f5a30/gi,col9Mix(hex,'#000000',.68)],[/#8fd9ad/gi,col9Mix(hex,'#9aa3a0',.45)],[/#1d3b29/gi,col9Mix(hex,'#000000',.8)],[/#163322/gi,col9Mix(hex,'#000000',.82)],[/#5fe39c/gi,col9Mix(hex,'#ffffff',.2)]];
  document.querySelectorAll('style').forEach(st=>{if(st.id==='col9')return;if(st._o9==null){const t=st.textContent;if(!/3fd98a|63,217,138/i.test(t))return;st._o9=t}let t=st._o9;if(hex!=='#3fd98a')for(const [a,b] of R)t=t.replace(a,b);if(st.textContent!==t)st.textContent=t});
  const st=$('neon9');if(st)st.disabled=k==='normale';document.documentElement.classList.toggle('tn9',k==='normale')}
phTema=function(){try{const t=localStorage.getItem('vita_tema9')||'neon';return COL9.some(c=>c[0]===t)?t:'neon'}catch(e){return 'neon'}};
phSetTema=function(t){try{localStorage.setItem('vita_tema9',t)}catch(e){}col9Apply(t);const c=COL9.find(x=>x[0]===t);toast(t==='normale'?'⚪ Stile normale (bianco) attivato':`🎨 Colore ${c?c[1]:''} attivato`)};
// altre impostazioni (si ricordano anche se chiudi il gioco)
const SET9={k:{g:'tg',m:'nomap',o:'noclk',r:'dx'},on(k){try{return localStorage.getItem('vita_s9_'+k)==='1'}catch(e){return false}},
  flip(k){const v=!this.on(k);try{localStorage.setItem('vita_s9_'+k,v?'1':'0')}catch(e){}this.apply();toast(v?'✅ Fatto!':'↩️ Come prima')},
  apply(){const d=document.documentElement;['tg','nomap','noclk','dx'].forEach(k=>d.classList.toggle('s9'+k,this.on(k)))}};
{const st=document.createElement('style');st.id='col9';st.textContent=`
#ph9 .col9{display:grid;grid-template-columns:repeat(auto-fill,minmax(64px,1fr));gap:8px;margin-top:8px}
#ph9 .col9 button{display:grid;justify-items:center;gap:4px;background:none;border:0;color:inherit;font:700 10px var(--f-body);padding:4px 0;cursor:pointer}
#ph9 .col9 i{width:30px;height:30px;border-radius:50%;background:#050806;border:3px solid var(--c);box-shadow:0 0 10px var(--c)}
#ph9 .col9 button.on i{outline:3px solid #fff;outline-offset:2px}
html.s9tg .sheet,html.s9tg .modal,html.s9tg #ph9 .scr,html.s9tg .toast,html.s9tg .tip{zoom:1.12}
html.s9nomap #minimap{display:none!important}
html.s9noclk #clock9{display:none!important}
html.s9dx #lb9{left:auto!important;right:max(10px,env(safe-area-inset-right,0px))}
#ph9 .note9{width:100%;min-height:220px;background:#050a07;color:#eafff2;border:1.5px solid var(--neon,#3fd98a);border-radius:14px;padding:10px;font:600 15px var(--f-body);resize:vertical;box-sizing:border-box}
html.tn9 #ph9 .note9{background:#fff;color:#1f2540}
#ph9 .crono9{font:900 52px var(--f-disp);text-align:center;font-variant-numeric:tabular-nums;margin:26px 0 16px}
#tor9{position:fixed;inset:0;pointer-events:none;z-index:4;background:radial-gradient(circle at 50% 55%,rgba(255,250,215,.45) 0,rgba(255,250,215,.12) 22%,transparent 42%)}
`;document.head.appendChild(st)}
// app nuove nel telefono
const PHX9={
  notes:{t:'📝 Note',h:()=>`<div class="scr"><p style="color:var(--soft);margin:0 0 8px">Scrivi quello che vuoi ricordare: la lista della spesa, i compiti, i tuoi sogni…</p><textarea class="note9" id="ph9note" placeholder="Scrivi qui…">${esc((S.ph9&&S.ph9.note)||'')}</textarea></div>`,
    on(){const t=$('ph9note');if(!t)return;t.onkeydown=ev=>ev.stopPropagation();t.oninput=()=>{S.ph9=S.ph9||{};S.ph9.note=t.value.slice(0,2000);clearTimeout(t._s);t._s=setTimeout(save,600)}}},
  torcia:{t:'🔦 Torcia',h:()=>{const on=!!$('tor9');return `<div class="scr" style="text-align:center"><div style="font-size:96px;margin-top:20px;filter:${on?'drop-shadow(0 0 22px #fff6c8)':'grayscale(1)'}">🔦</div><p>${on?'La torcia è accesa: di notte vedi meglio!':'La torcia è spenta.'}</p><button class="nb hot" data-tor="1" style="padding:12px 26px">${on?'Spegni':'Accendi'}</button></div>`},
    on(e){const b=e.querySelector('[data-tor]');if(b)b.onclick=()=>{const t=$('tor9');if(t)t.remove();else{const d=document.createElement('div');d.id='tor9';document.body.appendChild(d)}phRender()}}},
  crono:{t:'⏱️ Cronometro',h:()=>{const c=PHX9.c,ms=c.run?c.acc+performance.now()-c.t0:c.acc,s=ms/1000;return `<div class="scr" style="text-align:center"><div class="crono9" id="ph9cr">${String(Math.floor(s/60)).padStart(2,'0')}:${(s%60).toFixed(1).padStart(4,'0')}</div><div style="display:flex;gap:10px;justify-content:center"><button class="nb hot" data-cr="go" style="padding:12px 22px">${c.run?'Ferma':'Via!'}</button><button class="nb" data-cr="0" style="padding:12px 22px">Azzera</button></div><p style="color:var(--soft);margin-top:16px">Sfida: quanto ci metti a correre fino al parco?</p></div>`},
    on(e){e.querySelectorAll('[data-cr]').forEach(b=>b.onclick=()=>{const c=PHX9.c;if(b.dataset.cr==='0'){c.run=0;c.acc=0}else if(c.run){c.acc+=performance.now()-c.t0;c.run=0}else{c.t0=performance.now();c.run=1}phRender()});
      clearInterval(PHX9.c.iv);PHX9.c.iv=setInterval(()=>{const el=$('ph9cr');if(!el||PH9.app!=='crono'){clearInterval(PHX9.c.iv);return}const c=PHX9.c,s=(c.run?c.acc+performance.now()-c.t0:c.acc)/1000;el.textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+(s%60).toFixed(1).padStart(4,'0')},100)}},
  radio:{t:'📻 Radio',h:()=>{const on=typeof RD9!=='undefined'&&RD9.on;return `<div class="scr" style="text-align:center"><div style="font-size:90px;margin-top:16px">📻</div><p>${on?'Musica accesa 🎶':'La radio è spenta.'}</p><button class="nb hot" data-rd="1" style="padding:12px 26px">${on?'Cambia stazione / spegni':'Accendi la musica'}</button><p style="color:var(--soft);margin-top:14px">Puoi usarla anche in macchina con il tasto 📻.</p></div>`},
    on(e){const b=e.querySelector('[data-rd]');if(b)b.onclick=()=>{try{const r=typeof RD9!=='undefined'&&RD9.el;if(r&&r.onclick)r.onclick();else if(typeof rdStart==='function'){RD9.on=1;rdStart()}}catch(_){}setTimeout(phRender,80)}}},
  bussola:{t:'📍 Dove sono',h:()=>{const a=(S&&S.drive&&S.drive.ang!=null)?S.drive.ang:0,deg=Math.round(((a*180/Math.PI)+450)%360);return `<div class="scr" style="text-align:center"><div style="font-size:24px;margin-top:20px">N</div><div style="font-size:96px;line-height:1">🧭</div><p>Sei in ${esc(S.city||'città')}, vicino a <b>${esc(st9Near())}</b>.</p></div>`}},
};
PHX9.c={run:0,acc:0,t0:0};
function st9Near(){let b=null,bd=1e9;try{for(const B of BUILD){const d=Math.hypot(B.dx-S.pos.x,B.dy-S.pos.y);if(d<bd){bd=d;b=B}}}catch(e){}return b?b.n:'casa'}
{const _a=phApps;phApps=function(n){const L=_a.apply(this,arguments),i=L.findIndex(x=>x[0]==='set');L.splice(i<0?L.length:i,0,['notes','📝','Note'],['torcia','🔦','Torcia'],['crono','⏱️','Cronometro'],['radio','📻','Radio'],['bussola','📍','Dove sono']);return L}}
// applica subito colore e impostazioni salvate
try{col9Apply(phTema());SET9.apply()}catch(e){}
