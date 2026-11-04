/* ================= v9: modalità Computer o Telefono ================= */
const DV9={get(){try{const v=localStorage.getItem('vita_dev9');if(v==='pc'||v==='tel')return v}catch(e){}return (matchMedia('(pointer:coarse)').matches||innerWidth<760)?'tel':'pc'},
  pc(){return this.get()==='pc'},
  set(v,q){try{localStorage.setItem('vita_dev9',v)}catch(e){}this.apply();if(!q)toast(v==='pc'?'💻 Modalità computer':'📱 Modalità telefono')},
  apply(){document.documentElement.classList.toggle('dv9pc',this.pc());dv9Upd()}};
{const st=document.createElement('style');st.id='dev9';st.textContent=`
.dv9{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.dv9 button{display:flex;gap:10px;align-items:center;border-radius:14px;padding:10px 12px;border:1.5px solid rgba(63,217,138,.32);background:#0b1610;color:#eafff2;font:700 14px var(--f-body);cursor:pointer;text-align:left}
.dv9 button i{font-style:normal;font-size:26px}.dv9 button small{display:block;color:#8fd9ad;font-size:11px}
.dv9 button[aria-pressed="true"]{border-color:#3fd98a;background:#0f5a30;box-shadow:0 0 12px rgba(63,217,138,.45)}
html.tn9 .dv9 button{background:#fff;color:#1f2540;border-color:#d6d9e6}html.tn9 .dv9 button small{color:#5b6280}html.tn9 .dv9 button[aria-pressed="true"]{background:#e3f6ea;border-color:#2e9e5b}
#pc9{display:none}
html.dv9pc #pc9{display:flex;position:fixed;z-index:6;gap:8px;pointer-events:none;top:12px;left:300px}
html.dv9pc #hTot9{display:none!important}#hSt9{display:none}html.dv9pc #hSt9{display:block;margin-top:3px;font:900 16px var(--f-disp);color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:190px}html.tn9.dv9pc #hSt9{color:var(--ink)}
#pc9 div{display:flex;flex-direction:column;justify-content:center;box-sizing:border-box;min-width:120px;max-width:230px;background:rgba(6,14,10,.82);border:1.5px solid rgba(63,217,138,.55);border-radius:16px;padding:9px 13px;color:#fff;box-shadow:0 0 14px rgba(63,217,138,.25);backdrop-filter:blur(6px)}
#pc9 small{display:block;font:800 10px var(--f-body);letter-spacing:1.3px;color:#8fd9ad;text-transform:uppercase}
#pc9 b{display:block;font:900 20px var(--f-disp);font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#pc9 .sc b{font-size:16px;white-space:normal}#pc9 b.neg{color:#ff7b86}
html.tn9 #pc9 div{background:rgba(255,255,255,.94);border-color:#d6d9e6;color:#1f2540;box-shadow:0 4px 14px rgba(0,0,0,.15)}html.tn9 #pc9 small{color:#5b6280}
`;document.head.appendChild(st)}
function dv9Eur(n){n=Math.round(n||0);const a=Math.abs(n);if(a<1e6)return eur(n);const f=(v,u)=>(n<0?'-':'')+(a/v).toLocaleString('it-IT',{maximumFractionDigits:1})+' '+u+' €';return a>=1e12?f(1e12,'mila mld'):a>=1e9?f(1e9,'mld'):f(1e6,'mln')}
function dv9Upd(){let p=$('pc9');if(!DV9.pc()||typeof S==='undefined'||!S||!S.name){if(p)p.innerHTML='';return}
  if(!p){p=document.createElement('div');p.id='pc9';document.body.appendChild(p)}
  let st='';try{st=stageText()}catch(e){}
  const nm=document.querySelector('#meBtn .nm');let hs=$('hSt9');if(nm&&!hs){hs=document.createElement('span');hs.id='hSt9';nm.appendChild(hs)}
  if(hs){const ic=S.age<3?'👶':S.school?'🎒':S.uni?'🎓':S.job?'💼':S.retired?'🏖️':'🔎';const t=ic+' '+st;if(hs.textContent!==t)hs.textContent=t}
  const me=$('meBtn');if(me){const r=me.getBoundingClientRect();if(r.width){p.style.left=Math.round(r.right+10)+'px';p.style.top=Math.round(r.top)+'px';p.style.height=Math.round(r.height)+'px'}}
  const m=Math.round(S.money||0);
  const h=`<div><small>💵 Soldi in tasca</small><b class="${m<0?'neg':''}">${dv9Eur(m)}</b></div>`+(S.bank!=null?`<div><small>🏦 Soldi in banca</small><b class="${S.bank<0?'neg':''}">${dv9Eur(S.bank)}</b></div>`:`<div><small>🏦 Soldi in banca</small><b style="opacity:.6;font-size:14px">Ancora nessun conto</b></div>`);
  if(p._h!==h){p.innerHTML=h;p._h=h}}
addEventListener('resize',()=>{try{dv9Upd()}catch(e){}});
{const _u=updateHud;updateHud=function(){const r=_u.apply(this,arguments);try{dv9Upd()}catch(e){}return r}}
// scelta all'inizio
{const _s=showStart;showStart=function(){const r=_s.apply(this,arguments);try{const ch=$('ch9')||$('born');if(ch&&!$('dv9')){const d=document.createElement('div');d.id='dv9';d.className='field';d.style.marginBottom='12px';
  const draw=()=>{const v=DV9.get();d.innerHTML=`<label>Dove giochi?</label><div class="dv9"><button type="button" data-dv="pc" aria-pressed="${v==='pc'}"><i>💻</i><span>Computer<small>Soldi accanto al nome</small></span></button><button type="button" data-dv="tel" aria-pressed="${v==='tel'}"><i>📱</i><span>Telefono<small>Schermo pulito</small></span></button></div>`};draw();
  ch.parentNode.insertBefore(d,ch);d.onclick=ev=>{const b=ev.target.closest('[data-dv]');if(b){DV9.set(b.dataset.dv,1);draw()}ev.stopPropagation()}}}catch(e){console.warn('dev9',e)}return r}}
try{DV9.apply()}catch(e){}
