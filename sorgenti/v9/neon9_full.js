/* ================= v9: interfaccia nera e verde neon (stile tecnologico) + i soldi che "saltano fuori" quando guadagni ================= */
{const st=document.createElement('style');st.id='neon9';st.textContent=`
:root{--ink:#eafff2;--soft:#8fd9ad;--card:#060b08;--line:#1d3b29;--chip:#0d1912;--accent:#20ff75;--accent-ink:#021008;--neon:#20ff75;--neon2:#7dffb0;
  --good:#3dff8a;--bad:#ff5d6c;--teal:#20ff75;color-scheme:dark}
@keyframes neonP{0%,100%{box-shadow:0 0 8px rgba(32,255,117,.45),inset 0 0 6px rgba(32,255,117,.12)}50%{box-shadow:0 0 14px rgba(32,255,117,.75),inset 0 0 8px rgba(32,255,117,.2)}}
.me,.pill,.ib,.modal,.card,.notif,.sheet,#minimap,.toast,.tip,.actbtn,.td9b{border-color:var(--neon)!important;box-shadow:0 0 10px rgba(32,255,117,.45),inset 0 0 6px rgba(32,255,117,.12)!important}
.me,.pill,.ib,.card,.modal,.notif{background:linear-gradient(160deg,#0b1610,#030605)!important;color:var(--ink)}
.me .age{color:var(--neon);text-shadow:0 0 10px rgba(32,255,117,.8);font-variant-numeric:tabular-nums;letter-spacing:.5px}
.me .age small{color:var(--soft)}
.me .av{background:#0d1912;border-color:var(--neon)}
.pill{font-family:var(--f-disp);font-size:17px;letter-spacing:.3px;color:#fff;text-shadow:0 0 6px rgba(32,255,117,.6)}
.pill.neg{color:var(--bad);text-shadow:none}
.ib{color:#fff;transition:transform .15s,box-shadow .15s}.ib:hover,.ib:active{transform:scale(1.08);box-shadow:0 0 18px rgba(32,255,117,.9)!important}
.ib[aria-pressed="true"]{background:#0f5a30!important}
.badge{background:var(--neon);color:#021008;box-shadow:0 0 6px var(--neon)}
.minis i,.prog,.bar{background:#13241a!important}
.tip{background:rgba(3,8,5,.88)!important;border:1.5px solid var(--neon);color:#dfffe9}
.toast{background:rgba(3,8,5,.94)!important;border:2px solid var(--neon);color:#eafff2;text-shadow:0 0 6px rgba(32,255,117,.35);animation:neonIn .25s ease-out}
@keyframes neonIn{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%)}}
.sheet{background:linear-gradient(180deg,#07100b,#020403)!important;border-top:2px solid var(--neon)!important}
.sheet .hd{border-bottom:1px solid rgba(32,255,117,.35)}
.sheet .hd h2,.modal h2,.h3,.year .y{color:var(--neon);text-shadow:0 0 10px rgba(32,255,117,.55)}
.x{background:#0d1912!important;border-color:var(--neon)!important;color:var(--neon)}
.btn{background:#0b1a11;color:#eafff2;border:1.5px solid var(--neon);box-shadow:0 0 6px rgba(32,255,117,.35);transition:box-shadow .15s,transform .1s}
.btn:hover{box-shadow:0 0 14px rgba(32,255,117,.8)}.btn:active{transform:scale(.97)}
.btn.alt{background:#081109;color:var(--ink);border:1.5px solid rgba(32,255,117,.55)}
.btn.hot,.choices .go{background:var(--neon)!important;color:#021008!important;border-color:var(--neon)!important;box-shadow:0 0 12px rgba(32,255,117,.8)}
.choices button{background:#0b1610;border-color:rgba(32,255,117,.45);color:var(--ink)}.choices button:hover{border-color:var(--neon);box-shadow:0 0 10px rgba(32,255,117,.6)}
.tab{background:#081109;border-color:rgba(32,255,117,.45);color:var(--ink)}.tab[aria-selected="true"]{background:var(--neon);color:#021008;border-color:var(--neon)}
.note,.tag,.chip,.summary div{background:#0d1912;color:var(--ink)}
.en{background:#163322;color:#bfffd6}
.msg.them{background:#122019;color:#eafff2;border:1px solid rgba(32,255,117,.35)}
.msg.me{background:#0f5a30;color:#fff}
.quick button,.seg button{background:#0b1610;border-color:rgba(32,255,117,.45);color:var(--ink)}
.seg button[aria-pressed="true"]{background:#0f5a30;border-color:var(--neon)}
.say input,.field input,.field select{background:#050a07!important;color:#eafff2!important;border-color:var(--neon)!important}
.veil{background:rgba(0,4,2,.7)}
.notif{color:var(--ink)}
.actbtn{background:linear-gradient(160deg,#20ff75,#0fbf55)!important;color:#021008!important;border-color:#bfffd6!important;box-shadow:0 0 18px rgba(32,255,117,.85)!important}
.pad{background:rgba(3,8,5,.35)}.pad button{background:rgba(6,12,8,.88);color:var(--neon);border-color:var(--neon);box-shadow:0 0 6px rgba(32,255,117,.4)}.pad button.on{background:var(--neon);color:#021008}
.screen{background:radial-gradient(ellipse at 50% 0%,#0f3a22 0%,#050a07 55%,#000 100%)!important;color:var(--ink)}
.screen h1{color:var(--neon)!important;text-shadow:0 0 18px rgba(32,255,117,.9),0 0 2px #fff!important}
.td9b{background:rgba(3,8,5,.82)!important;color:var(--neon)!important;border:2px solid var(--neon)!important}
#clock9,#spd9{background:rgba(3,8,5,.9)!important;border:2px solid var(--neon)!important;box-shadow:0 0 10px rgba(32,255,117,.5)!important;color:#eafff2!important}
.fly{background:#000}
/* soldi che saltano fuori */
.mon9{position:fixed;z-index:31;pointer-events:none;font:900 22px var(--f-disp);color:var(--neon);text-shadow:0 0 10px rgba(32,255,117,.9),0 2px 0 #000;animation:mon9 1.5s ease-out forwards;white-space:nowrap}
.mon9.neg{color:#ff5d6c;text-shadow:0 0 10px rgba(255,93,108,.8),0 2px 0 #000}
@keyframes mon9{0%{opacity:0;transform:translateY(6px) scale(.7)}15%{opacity:1;transform:translateY(0) scale(1.15)}100%{opacity:0;transform:translateY(-46px) scale(1)}}
.pill.pulse9{animation:pul9 .6s ease-out}@keyframes pul9{40%{transform:scale(1.12);box-shadow:0 0 22px rgba(32,255,117,1)!important}}
@media (prefers-reduced-motion:reduce){.mon9{animation:none;opacity:0}}
`;document.head.appendChild(st)}
const NE9={m:null,b:null};
function neFloat(el,d){if(!el||el.hidden||!d)return;const r=el.getBoundingClientRect(),f=document.createElement('div');f.className='mon9'+(d<0?' neg':'');f.textContent=(d>0?'+':'−')+eur(Math.abs(d));
  f.style.left=Math.max(4,Math.min(innerWidth-160,r.left-20))+'px';f.style.top=(r.bottom+2)+'px';document.body.appendChild(f);setTimeout(()=>f.remove(),1600);
  if(d>0){el.classList.remove('pulse9');void el.offsetWidth;el.classList.add('pulse9')}}
{const _u=updateHud;updateHud=function(){const r=_u.apply(this,arguments);try{if(S&&S.alive){const m=Math.round(S.money),b=S.bank==null?null:Math.round(S.bank);
  // solo i cambi "veri" (non la prima volta, e non i numeri enormi del codice segreto)
  if(NE9.m!=null&&m!==NE9.m&&Math.abs(m-NE9.m)<1e9)neFloat($('hMoney'),m-NE9.m);if(NE9.b!=null&&b!=null&&b!==NE9.b&&Math.abs(b-NE9.b)<1e9)neFloat($('hBank'),b-NE9.b);NE9.m=m;NE9.b=b}else{NE9.m=NE9.b=null}}catch(e){}return r}}
