/* ================= v9: le novità dell'aggiornamento del mese ================= */
const NOV9={k:'2026-11',t:'Novità di novembre',l:[
  ['👶','Nascita più bella','Scegli carattere e stagione, poi guardi la scena della tua nascita.'],
  ['👤','Il tuo account','Entra con Google o con l\'email: la partita si salva online e la ritrovi su ogni computer e telefono.'],
  ['💻','Computer o telefono','Su computer vedi soldi in tasca e in banca accanto al tuo nome.'],
  ['🏙️','Città più grande','Viali con alberi, palazzi con più dettagli, ville, grattacieli e piazze più larghe.'],
  ['🚦','Strade vere','Semafori, rotonde, STOP, frecce, incidenti e luci della macchina.'],
  ['🎨','11 colori','Nel telefono, in Impostazioni, scegli il colore che ti piace di più.']]};
function nov9Html(){return `<div class="nv9l">${NOV9.l.map(([i,t,d])=>`<div><i>${i}</i><span><b>${t}</b><small>${d}</small></span></div>`).join('')}</div>`}
{const st=document.createElement('style');st.id='nov9s';st.textContent=`
#nov9{position:fixed;inset:0;z-index:59;display:grid;place-items:center;background:rgba(2,6,12,.7);backdrop-filter:blur(5px);padding:16px}
#nov9 .bx{width:min(440px,100%);max-height:88vh;overflow:auto;background:#07110c;border:2px solid #3fd98a;border-radius:22px;padding:18px;color:#eafff2;box-shadow:0 0 30px rgba(63,217,138,.35)}
#nov9 h2{margin:0 0 2px;font:900 22px var(--f-disp);text-align:center}#nov9 p{margin:0 0 12px;text-align:center;color:#8fd9ad;font-weight:700}
.nv9l{display:grid;gap:8px}.nv9l div{display:flex;gap:10px;align-items:flex-start;background:rgba(63,217,138,.07);border-radius:14px;padding:9px 11px}
.nv9l i{font-style:normal;font-size:24px;line-height:1.2}.nv9l b{display:block;font-size:14px}.nv9l small{display:block;color:#a9d8bd;font-weight:600;font-size:12.5px;line-height:1.35}
#nov9 .go{display:block;width:100%;margin-top:14px;border:0;border-radius:14px;padding:13px;background:#3fd98a;color:#04140a;font:900 16px var(--f-body);cursor:pointer}
html.tn9 #nov9 .bx{background:#fff;color:#1f2540;border-color:#2e9e5b}html.tn9 #nov9 p{color:#2e7a52}html.tn9 .nv9l div{background:#f1f8f4}html.tn9 .nv9l small{color:#5b6280}html.tn9 #nov9 .go{background:#2e9e5b;color:#fff}
`;document.head.appendChild(st)}
function nov9Show(){if($('nov9'))return;const d=document.createElement('div');d.id='nov9';d.innerHTML=`<div class="bx"><div style="text-align:center;font-size:44px">🆕</div><h2>${NOV9.t}</h2><p>Il gioco si è aggiornato! Ecco cosa c'è di nuovo:</p>${nov9Html()}<button class="go" type="button">Fantastico, gioca! ▶</button></div>`;
  document.body.appendChild(d);const x=()=>{d.remove();try{localStorage.setItem('vita_nov9',NOV9.k)}catch(e){}};d.querySelector('.go').onclick=x;d.onclick=e=>{if(e.target===d)x()}}
function nov9Maybe(n){let s='';try{s=localStorage.getItem('vita_nov9')||''}catch(e){}if(s===NOV9.k)return;if(navigator.webdriver&&!window.NOV9T)return;
  if($('acc9w')||$('nasc9')){if((n||0)<200)setTimeout(()=>nov9Maybe((n||0)+1),1500);return}nov9Show()}
{const _g=startGame;startGame=function(){const r=_g.apply(this,arguments);try{setTimeout(nov9Maybe,2500)}catch(e){}return r}}
// chi nasce adesso non ha bisogno delle novità: le segna come già viste
{const _n=newLife;newLife=function(){const r=_n.apply(this,arguments);try{localStorage.setItem('vita_nov9',NOV9.k)}catch(e){}return r}}
PHX9.nov9={t:'🆕 Novità',h:()=>`<div class="scr"><p style="margin:0 0 10px;color:var(--soft)">${NOV9.t}: ecco cosa c'è di nuovo nel gioco.</p>${nov9Html()}</div>`};
{const _a=phApps;phApps=function(){const L=_a.apply(this,arguments),i=L.findIndex(x=>x[0]==='set');L.splice(i<0?L.length:i,0,['nov9','🆕','Novità']);return L}}
