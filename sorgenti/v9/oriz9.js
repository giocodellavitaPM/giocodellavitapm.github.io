/* ================= v9: il gioco in orizzontale (telefono girato): pulsanti al posto giusto + un avviso se il telefono è dritto ================= */
{const st=document.createElement('style');st.textContent=`
@media (orientation:landscape) and (max-height:520px){
  #lb9{top:calc(10px + env(safe-area-inset-top,0px));left:calc(max(10px,env(safe-area-inset-left,0px)) + 338px);flex-direction:row}
  .me{max-width:330px}
  .tip{top:calc(70px + env(safe-area-inset-top,0px))}
  .toast{top:calc(70px + env(safe-area-inset-top,0px))}
  #ph9 .ph{width:min(620px,100%);height:100%}
  #ph9 .big9{font-size:38px;margin-top:4px}#ph9 .dt9{margin-bottom:8px}
  #ph9 .grid9{grid-template-columns:repeat(6,1fr)}#ph9 .big9{display:none}
  .sheet{max-height:88%}
}
#gira9{position:fixed;inset:0;z-index:70;display:grid;place-items:center;background:rgba(0,4,2,.88);padding:20px;text-align:center;color:#eafff2}
#gira9 .in{max-width:320px;border:2px solid var(--neon,#3fd98a);border-radius:22px;padding:22px;background:#020403;box-shadow:0 0 18px rgba(63,217,138,.5)}
#gira9 .ic{font-size:64px;display:inline-block;animation:gira9 2s ease-in-out infinite}@keyframes gira9{0%,30%{transform:rotate(0)}60%,100%{transform:rotate(90deg)}}
#gira9 b{display:block;font:900 22px var(--f-disp);color:var(--neon,#3fd98a);margin:10px 0 6px}
#gira9 button{margin-top:14px;border:1.5px solid var(--neon,#3fd98a);background:#0b1610;color:var(--neon,#3fd98a);border-radius:12px;padding:10px 16px;font:800 15px var(--f-body)}
@media (orientation:landscape){#gira9{display:none}}
`;document.head.appendChild(st)}
// quando inizi a giocare col telefono dritto, una volta ti dice di girarlo (e se il telefono lo permette lo gira da solo)
let GI9=0;
function giraTry(){try{if(screen.orientation&&screen.orientation.lock)screen.orientation.lock('landscape').catch(()=>{})}catch(e){}}
function giraShow(){if(GI9||(navigator.webdriver&&!window.GIRA9T)||innerWidth>=innerHeight||innerWidth>820||!S||!S.alive||!$('screen').hidden)return;GI9=1;const d=document.createElement('div');d.id='gira9';
  d.innerHTML='<div class="in"><span class="ic">📱</span><b>Gira il telefono!</b>Il gioco è fatto per stare in orizzontale: si vede tutto più grande, come in GTA.<br><button type="button">Ok</button></div>';
  document.body.appendChild(d);d.querySelector('button').onclick=()=>{giraTry();d.remove()};addEventListener('resize',()=>{if(innerWidth>innerHeight&&d.isConnected)d.remove()})}
{const _s=step;step=function(dt){const r=_s(dt);try{if(!GI9)giraShow()}catch(e){}return r}}
document.addEventListener('pointerdown',giraTry,{once:true});
