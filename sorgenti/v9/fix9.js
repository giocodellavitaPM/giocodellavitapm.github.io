/* ================= v9: sistemazioni varie ================= */
// quando cambi età (anche dal pannello segreto) il suggerimento si aggiorna subito
{const _a=setAge;setAge=function(v){const r=_a(v);try{tipT=0}catch(e){}return r}}
// il suggerimento in alto (e l'avviso della polizia) stanno sempre sotto i bottoni, anche quando c'è il conto in banca
let fix9T=0;
function fix9Layout(){const h=document.querySelector('.hud');if(!h||h.hidden)return;let bot=0;h.querySelectorAll('*').forEach(e=>{if(e.offsetParent===null)return;const r=e.getBoundingClientRect();if(r.height&&r.bottom>bot)bot=r.bottom});if(!bot)return;
  const tip=$('tip');if(tip)tip.style.top=Math.round(bot+8)+'px';
  const vis=e=>e&&!e.hidden&&e.getBoundingClientRect().height>0&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden';const w=$('wanted9');const tb=vis(tip)?tip.getBoundingClientRect().bottom:bot;if(w)w.style.top=Math.round(tb+8)+'px';
  // l'avviso (toast) va sotto il suggerimento e sotto le stelle della polizia, così non si sovrappongono
  const t=$('toast');if(t){let tb2=tb;if(vis(w))tb2=Math.max(tb2,w.getBoundingClientRect().bottom);t.style.top=Math.round(tb2+8)+'px'}}
{const _t=toast;toast=function(m){const r=_t.apply(this,arguments);try{fix9Layout()}catch(e){}return r}}
{const _s=step;step=function(dt){const r=_s(dt);fix9T-=dt;if(fix9T<=0){fix9T=.4;try{fix9Layout();fix9Unstuck()}catch(e){}}return r}}
// se un salvataggio vecchio ti lascia dentro un albero nuovo, ti sposto accanto (e anche gli oggetti da raccogliere)
function fix9Free(x,y){for(let r=1;r<4;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){const v=at(x+dx,y+dy);if(v===0||v===2||v===6||v===7)return [x+dx,y+dy]}return null}
function fix9Unstuck(){if(!S||S.scene!=='citta')return;
  if(typeof NPCS!=='undefined')NPCS.forEach(n=>{if(n.scene!=='citta'||n.path&&n.path.length)return;const x=Math.floor(n.x),y=Math.floor(n.y);if(at(x,y)!==5)return;const f=fix9Free(x,y);if(!f)return;n.x=f[0]+.5;n.y=f[1]+.5;n.tx=null;if(n.hx!=null&&at(Math.floor(n.hx),Math.floor(n.hy))===5){n.hx=f[0];n.hy=f[1]}});if(S.loot&&S.loot.some(l=>at(Math.floor(l.x),Math.floor(l.y))===5))S.loot=S.loot.filter(l=>at(Math.floor(l.x),Math.floor(l.y))!==5);
  if(S.drive||S.famDrive)return;const x=Math.floor(S.pos.x),y=Math.floor(S.pos.y);if(at(x,y)!==5)return;
  for(let r=1;r<4;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){const v=at(x+dx,y+dy);if(v===0||v===2||v===6||v===7){S.pos={x:x+dx+.5,y:y+dy+.5};return}}}

// più alberi veri in città (nel parco e sui prati): si vedono sia in 2D che in 3D e non ci si passa attraverso
(function fix9Trees(){let n=0;const near=(x,y,L,r)=>L.some(([a,b])=>Math.abs(a-x)<=r&&Math.abs(b-y)<=r);
  const doors=BUILD.map(b=>[b.dx,b.dy]),inP=(P,x,y)=>x>P.x&&x<P.x+P.w-1&&y>P.y&&y<P.y+P.h-1;
  for(let y=2;y<H-2;y++)for(let x=2;x<W-2;x++){if(at(x,y)!==0)continue;let ok=true;for(let dy=-1;dy<=1&&ok;dy++)for(let dx=-1;dx<=1;dx++){const v=at(x+dx,y+dy);if(v===6||v===7||v===8||v===4||v===11||v===12||v===3){ok=false;break}}
    if(!ok||near(x,y,doors,2)||near(x,y,BENCHES,1)||near(x,y,GATES,2)||(Math.abs(x-7)<=4&&y>=6&&y<=13)||(typeof inMZ==='function'&&inMZ(x,y)))continue;
    if(typeof LAMPS!=='undefined'&&LAMPS.some(([a,b])=>Math.abs(a-x-.5)<1.2&&Math.abs(b-y-.5)<1.2))continue;
    const park=[PARK,PARK2].some(P=>inP(P,x,y)),r=h9r(x,y,4);
    if(park?r<.6:r<.22){setT(x,y,5);TREES.push([x,y]);n++}}
  fix9Trees.n=n})();
// se tocchi il bottone proprio mentre cambi stanza, il bottone vecchio non fa niente (prima dava errore)
{const _d=doAction;doAction=function(){if(near&&near.type==='furn'){const sc=curSc();if(!sc||!sc.furn||!sc.furn[near.i]){near=null;return}}return _d.apply(this,arguments)}}
// quando completi un compito o un obiettivo: scritta grande come in GTA ("MISSIONE COMPIUTA!") e una piccola musichetta
function gtaPassed(title,sub){let e=$('gta9pass');if(!e){e=document.createElement('div');e.id='gta9pass';e.style.cssText='position:fixed;left:0;right:0;top:36%;text-align:center;z-index:61;pointer-events:none;transition:opacity .5s,transform .5s;opacity:0';
    e.innerHTML='<div class="t" style="font:900 44px \'Baloo 2\',system-ui;letter-spacing:1px;color:#ffd23a;text-shadow:0 4px 0 #000,-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000,0 0 22px rgba(0,0,0,.6)"></div><div class="s" style="font:800 22px \'Baloo 2\',system-ui;color:#fff;text-shadow:0 3px 0 #000,-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000;margin-top:2px;padding:0 16px"></div>';document.body.appendChild(e)}
  e.querySelector('.t').textContent=title;e.querySelector('.s').textContent=sub||'';e.style.opacity='1';e.style.transform='scale(1.06)';clearTimeout(e._t);e._t=setTimeout(()=>{e.style.opacity='0';e.style.transform='scale(1)'},2300);
  try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const ac=(typeof JK!=='undefined'&&JK.ac)||(window._ac9=window._ac9||new A());if(typeof JK!=='undefined')JK.ac=ac;if(ac.state==='suspended')ac.resume();
    [[523,0],[659,.12],[784,.24],[1047,.38]].forEach(([f,d])=>{const o=ac.createOscillator(),g=ac.createGain(),t=ac.currentTime+d;o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.06,t+.02);g.gain.exponentialRampToValueAtTime(.0005,t+(d>.3?.6:.25));o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+.7)})}catch(e){}}
{const _c=checkGoals;checkGoals=function(){if(!S||!S.alive)return _c.apply(this,arguments);const m0=S.miss.filter(m=>m.ok).length,g0=Object.keys(S.goals||{}).length,mo=S.money;
  const r=_c.apply(this,arguments);try{const m1=S.miss.filter(m=>m.ok).length,g1=Object.keys(S.goals||{}).length,gain=S.money-mo;
    if(g1>g0)gtaPassed('OBIETTIVO RAGGIUNTO!',gain>0?'+'+eur(gain):'');else if(m1>m0)gtaPassed('MISSIONE COMPIUTA!',gain>0?'+'+eur(gain):'')}catch(e){}return r}}
