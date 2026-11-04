/* ================= v9: interfaccia nera con verde neon delicato in tutte le finestre; scheda di Pietro pulita e un solo riquadro "Soldi totali" ================= */
{const st=document.createElement('style');st.id='neon9';st.textContent=`
:root{--ink:#eafff2;--soft:#8fd9ad;--card:#060b08;--line:#1d3b29;--chip:#0d1912;--accent:#3fd98a;--accent-ink:#021008;--neon:#3fd98a;--neon2:#8fe8b6;
  --good:#5fe39c;--bad:#ff5d6c;--teal:#3fd98a;color-scheme:dark}
@keyframes neonP{0%,100%{box-shadow:0 0 8px rgba(63,217,138,0.32),inset 0 0 6px rgba(63,217,138,0.08)}50%{box-shadow:0 0 14px rgba(63,217,138,0.52),inset 0 0 8px rgba(63,217,138,0.14)}}
.me,.pill,.ib,.modal,.card,.notif,.sheet,#minimap,.toast,.tip,.actbtn,.td9b{border-color:var(--neon)!important;box-shadow:0 0 10px rgba(63,217,138,0.32),inset 0 0 6px rgba(63,217,138,0.08)!important}
.me,.pill,.ib,.card,.modal,.notif{background:linear-gradient(160deg,#0b1610,#030605)!important;color:var(--ink)}
.me .age{color:var(--neon);text-shadow:0 0 10px rgba(63,217,138,0.56);font-variant-numeric:tabular-nums;letter-spacing:.5px}
.me .age small{color:var(--soft)}
.me .av{background:#0d1912;border-color:var(--neon)}
.pill{font-family:var(--f-disp);font-size:17px;letter-spacing:.3px;color:#fff;text-shadow:0 0 6px rgba(63,217,138,0.42)}
.pill.neg{color:var(--bad);text-shadow:none}
.ib{color:#fff;transition:transform .15s,box-shadow .15s}.ib:hover,.ib:active{transform:scale(1.08);box-shadow:0 0 18px rgba(63,217,138,0.63)!important}
.ib[aria-pressed="true"]{background:#0f5a30!important}
.badge{background:var(--neon);color:#021008;box-shadow:0 0 6px var(--neon)}
.minis i,.prog,.bar{background:#13241a!important}
.tip{background:rgba(3,8,5,.88)!important;border:1.5px solid var(--neon);color:#dfffe9}
.toast{background:rgba(3,8,5,.94)!important;border:2px solid var(--neon);color:#eafff2;text-shadow:0 0 6px rgba(63,217,138,0.24);animation:neonIn .25s ease-out}
@keyframes neonIn{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%)}}
.sheet{background:linear-gradient(180deg,#07100b,#020403)!important;border-top:2px solid var(--neon)!important}
.sheet .hd{border-bottom:1px solid rgba(63,217,138,0.24)}
.sheet .hd h2,.modal h2,.h3,.year .y{color:var(--neon);text-shadow:0 0 10px rgba(63,217,138,0.39)}
.x{background:#0d1912!important;border-color:var(--neon)!important;color:var(--neon)}
.btn{background:#0b1a11;color:#eafff2;border:1.5px solid var(--neon);box-shadow:0 0 6px rgba(63,217,138,0.24);transition:box-shadow .15s,transform .1s}
.btn:hover{box-shadow:0 0 14px rgba(63,217,138,0.56)}.btn:active{transform:scale(.97)}
.btn.alt{background:#081109;color:var(--ink);border:1.5px solid rgba(63,217,138,0.39)}
.btn.hot,.choices .go{background:var(--neon)!important;color:#021008!important;border-color:var(--neon)!important;box-shadow:0 0 12px rgba(63,217,138,0.56)}
.choices button{background:#0b1610;border-color:rgba(63,217,138,0.32);color:var(--ink)}.choices button:hover{border-color:var(--neon);box-shadow:0 0 10px rgba(63,217,138,0.42)}
.tab{background:#081109;border-color:rgba(63,217,138,0.32);color:var(--ink)}.tab[aria-selected="true"]{background:var(--neon);color:#021008;border-color:var(--neon)}
.note,.tag,.chip,.summary div{background:#0d1912;color:var(--ink)}
.en{background:#163322;color:#bfffd6}
.msg.them{background:#122019;color:#eafff2;border:1px solid rgba(63,217,138,0.24)}
.msg.me{background:#0f5a30;color:#fff}
.quick button,.seg button{background:#0b1610;border-color:rgba(63,217,138,0.32);color:var(--ink)}
.seg button[aria-pressed="true"]{background:#0f5a30;border-color:var(--neon)}
.say input,.field input,.field select{background:#050a07!important;color:#eafff2!important;border-color:var(--neon)!important}
.veil{background:rgba(0,4,2,.7)}
.notif{color:var(--ink)}
.actbtn{background:linear-gradient(160deg,#3fd98a,#26a866)!important;color:#021008!important;border-color:#bfffd6!important;box-shadow:0 0 18px rgba(63,217,138,0.59)!important}
.pad{background:rgba(3,8,5,.35)}.pad button{background:rgba(6,12,8,.88);color:var(--neon);border-color:var(--neon);box-shadow:0 0 6px rgba(63,217,138,0.28)}.pad button.on{background:var(--neon);color:#021008}
.screen{background:radial-gradient(ellipse at 50% 0%,#0f3a22 0%,#050a07 55%,#000 100%)!important;color:var(--ink)}
.screen h1{color:var(--neon)!important;text-shadow:0 0 18px rgba(63,217,138,0.63),0 0 2px #fff!important}
.td9b{background:rgba(3,8,5,.82)!important;color:var(--neon)!important;border:2px solid var(--neon)!important}
#clock9,#spd9{background:rgba(3,8,5,.9)!important;border:2px solid var(--neon)!important;box-shadow:0 0 10px rgba(63,217,138,0.35)!important;color:#eafff2!important}
.fly{background:#000}

/* i pulsanti che premi: neri con la scritta verde */
.btn,.btn.alt,.btn.hot,.choices .go,.actbtn{background:linear-gradient(160deg,#0b1610,#030605)!important;color:var(--neon)!important;border:1.5px solid var(--neon)!important;text-shadow:0 0 6px rgba(63,217,138,0.35);box-shadow:0 0 6px rgba(63,217,138,0.24)!important}
.btn:active,.choices .go:active,.actbtn:active{background:var(--neon)!important;color:#021008!important;text-shadow:none}
.actbtn small{color:#bfffd6}.btn:disabled{opacity:.45}
/* finestre fatte con colori scritti a mano (bianchi/crema): diventano nere */
.sheet [style*="background:#fff"],.sheet [style*="background: #fff"],.sheet [style*="background:#fffdf7"],.sheet [style*="background:#f"],.modal [style*="background:#f"],.sheet [style*="background:white"]{background:#0b1610!important;color:#eafff2!important}
.sheet [style*="color:#1f2540"],.modal [style*="color:#1f2540"],.sheet [style*="color:#333"],.sheet [style*="color:#222"]{color:#eafff2!important}
`;document.head.appendChild(st)}
/* parti che valgono con tutti e due gli stili (neon e normale) */
{const st=document.createElement('style');st.id='neon9b';st.textContent=`
/* scheda di Pietro: solo nome ed età */
#hStage,#hMinis{display:none!important}
.me .nm b{font-size:20px;letter-spacing:.3px}
#hBank,#hMoney{display:none!important}
#hTot9{display:block;margin-top:3px;font:900 19px var(--f-disp);color:var(--ink);white-space:nowrap;font-variant-numeric:tabular-nums;line-height:1.1}
#hTot9 small{display:block;font:800 9px var(--f-body);letter-spacing:1.2px;color:var(--soft);text-shadow:none}#hTot9.neg{color:#ff7b86}
#hMoney{font-size:18px;padding:4px 12px;line-height:1.15}#hMoney small{display:block;font:800 10px var(--f-body);letter-spacing:1.2px;color:var(--soft);text-shadow:none}
html:not(.tn9) #hTot9{text-shadow:0 0 6px rgba(63,217,138,.5);color:#fff}
html.tn9 #jmp9{background:#fff;color:#1f2540;border-color:#d6d9e6;box-shadow:0 2px 6px rgba(0,0,0,.15)}
`;document.head.appendChild(st)}
// un solo riquadro con tutti i soldi (in tasca + in banca)
{const nm=document.querySelector('#meBtn .nm');if(nm&&!$('hTot9')){const t=document.createElement('span');t.id='hTot9';nm.appendChild(t)}}
{const _u=updateHud;updateHud=function(){const r=_u.apply(this,arguments);try{if(S){const tot=Math.round(S.money+(S.bank||0)),m=$('hTot9');if(m){m.innerHTML=`💰 ${eur(tot)}<small>SOLDI TOTALI</small>`;m.classList.toggle('neg',tot<0);m.title=`In tasca ${eur(S.money)}`+(S.bank!=null?` · In banca ${eur(S.bank)}`:'')}}}catch(e){}return r}}

