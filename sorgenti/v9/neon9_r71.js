/* ================= v9: tocchi neri e verde neon solo su alcune cose (barra in alto, orologio, pulsanti del 3D); il telefono e la pausa hanno il loro stile ================= */
{const st=document.createElement('style');st.id='neon9';st.textContent=`
:root{--neon:#20ff75}
.me,.pill,.ib,.td9b,#clock9,#spd9{border-color:var(--neon)!important;box-shadow:0 0 10px rgba(32,255,117,.45),inset 0 0 6px rgba(32,255,117,.12)!important}
.me,.pill,.ib{background:linear-gradient(160deg,#0b1610,#030605)!important;color:#eafff2}
.me .nm span{color:#8fd9ad}
.me .age{color:var(--neon);text-shadow:0 0 10px rgba(32,255,117,.8);font-variant-numeric:tabular-nums}
.me .age small{color:#8fd9ad}
.me .av{background:#0d1912;border-color:var(--neon)}
.minis i{background:#13241a!important}
.pill{font-family:var(--f-disp);font-size:17px;color:#fff;text-shadow:0 0 6px rgba(32,255,117,.6)}
.pill.neg{color:#ff5d6c;text-shadow:none}
.ib{color:#fff}.ib[aria-pressed="true"]{background:#0f5a30!important}
.badge{background:var(--neon);color:#021008}
.td9b{background:rgba(3,8,5,.82)!important;color:var(--neon)!important;border:2px solid var(--neon)!important}
#clock9,#spd9{background:rgba(3,8,5,.9)!important;border:2px solid var(--neon)!important;color:#eafff2!important}
/* i pulsanti che premi: neri con la scritta verde neon */
.btn,.btn.alt,.btn.hot,.choices .go,.actbtn{background:linear-gradient(160deg,#0b1610,#030605)!important;color:var(--neon)!important;border:2px solid var(--neon)!important;text-shadow:0 0 8px rgba(32,255,117,.75);box-shadow:0 0 8px rgba(32,255,117,.45)!important}
.btn:active,.choices .go:active,.actbtn:active{background:var(--neon)!important;color:#021008!important;text-shadow:none}
.actbtn small{color:#bfffd6}
.btn:disabled{opacity:.45}
`;document.head.appendChild(st)}
