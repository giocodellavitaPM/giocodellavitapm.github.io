/* ================= v9: la radio in macchina (come in GTA): musica inventata dal gioco, 3 stazioni ================= */
const RD9={on:true,st:0,ac:null,g:null,iv:null,t:0,step:0,el:null,nb:null,was:false};
try{const v=JSON.parse(localStorage.getItem('radio9')||'null');if(v){RD9.on=!!v.on;RD9.st=Math.min(2,v.st|0)}}catch(e){}
const RD9_ST=[
  {n:'📻 Radio Vita FM',bpm:112,prog:[[0,4,7],[7,11,14],[9,12,16],[5,9,12]],root:60,lead:'triangle',bass:'sine',drum:1,lv:.035},
  {n:'🎸 Rock Città',bpm:128,prog:[[0,7,12],[5,12,17],[7,14,19],[3,10,15]],root:52,lead:'square',bass:'square',drum:2,lv:.014},
  {n:'🌴 Mare Lounge',bpm:86,prog:[[2,5,9,12],[7,11,14,17],[0,4,7,11],[9,12,16,19]],root:57,lead:'sine',bass:'triangle',drum:0,lv:.04}];
const rdF=m=>440*Math.pow(2,(m-69)/12);
function rdNote(t,f,dur,type,vol){const ac=RD9.ac,o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.012);g.gain.exponentialRampToValueAtTime(.0004,t+dur);o.connect(g);g.connect(RD9.g);o.start(t);o.stop(t+dur+.05)}
function rdNoise(t,dur,vol,hp){const ac=RD9.ac;if(!RD9.nb){const b=ac.createBuffer(1,ac.sampleRate*.4|0,ac.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;RD9.nb=b}
  const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();s.buffer=RD9.nb;f.type='highpass';f.frequency.value=hp;g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0004,t+dur);s.connect(f);f.connect(g);g.connect(RD9.g);s.start(t);s.stop(t+dur+.02)}
function rdKick(t,vol){const ac=RD9.ac,o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(42,t+.13);g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0004,t+.2);o.connect(g);g.connect(RD9.g);o.start(t);o.stop(t+.22)}
function rdSched(){const ac=RD9.ac,P=RD9_ST[RD9.st],e8=60/P.bpm/2,sc=[0,2,4,7,9,12,14,16];
  while(RD9.t<ac.currentTime+.3){const t=RD9.t,k=RD9.step,bar=Math.floor(k/8)%4,ch=P.prog[bar],e=k%8,k32=k%32;
    if(e===0)ch.forEach(n=>rdNote(t,rdF(P.root+n),e8*7.6,'sine',.02));
    if(e%2===0)rdNote(t,rdF(P.root-12+ch[0]+(e===4?7:0)),e8*1.8,P.bass,P.bass==='square'?.025:.06);
    const r=Math.abs(Math.sin((k32+1)*12.9898+RD9.st*78.233)*43758.5453)%1;
    if(r<.6)rdNote(t,rdF(P.root+12+(r<.3?ch[Math.floor(r*10)%ch.length]:sc[Math.floor(r*97)%sc.length])),e8*(r<.25?1.9:.95),P.lead,P.lv);
    if(P.drum){if(e===0||e===4||(P.drum===2&&e===7))rdKick(t,.24);if(e===2||e===6)rdNoise(t,.13,.07,1400);rdNoise(t,.03,.03,7000)}else if(e%4===2)rdNoise(t,.06,.018,6000);
    RD9.t+=e8;RD9.step++}}
function rdStart(){if(RD9.iv)return;const A=window.AudioContext||window.webkitAudioContext;if(!A)return;
  try{const ac=RD9.ac||(RD9.ac=(typeof JK!=='undefined'&&JK.ac)||new A());if(ac.state==='suspended')ac.resume();
    RD9.g=ac.createGain();RD9.g.gain.value=0;RD9.g.connect(ac.destination);RD9.g.gain.setTargetAtTime(.55,ac.currentTime,.4);RD9.t=ac.currentTime+.12;RD9.step=0;
    RD9.iv=setInterval(()=>{try{rdSched()}catch(e){}},70)}catch(e){}}
function rdStop(){if(!RD9.iv)return;clearInterval(RD9.iv);RD9.iv=null;const g=RD9.g;RD9.g=null;try{g.gain.setTargetAtTime(0,RD9.ac.currentTime,.12);setTimeout(()=>{try{g.disconnect()}catch(e){}},900)}catch(e){}}
function rdSave(){try{localStorage.setItem('radio9',JSON.stringify({on:RD9.on,st:RD9.st}))}catch(e){}}
function rdBtn(){if(RD9.el)return RD9.el;const b=document.createElement('button');b.id='radio9';b.type='button';b.textContent='📻';b.title='Radio';
  b.style.cssText='position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:calc(108px + env(safe-area-inset-bottom,0px));z-index:31;width:54px;height:54px;border-radius:50%;border:3px solid #1f2540;background:#fffdf7;font-size:26px;box-shadow:0 4px 0 rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center';
  b.hidden=true;b.addEventListener('click',e=>{e.stopPropagation();if(!RD9.on){RD9.on=true;RD9.st=0}else if(RD9.st<RD9_ST.length-1){RD9.st++}else RD9.on=false;rdSave();rdStop();
    toast(RD9.on?RD9_ST[RD9.st].n+' 🎶 (tocca 📻 per cambiare)':'📻 Radio spenta');rdBtnLook()});document.body.appendChild(b);return RD9.el=b}
function rdBtnLook(){const b=rdBtn();b.style.opacity=RD9.on?'1':'.6';b.textContent=RD9.on?['📻','🎸','🌴'][RD9.st]:'🔇'}
function rdInCar(){return S&&S.alive&&S.scene==='citta'&&!ui.mg&&!ui.flying&&!!(S.famDrive||S.drive||(S.ride&&typeof bestRide==='function'&&isCar((bestRide()||{}).id)))}
{const _s=step;step=function(dt){const r=_s(dt);try{const car=rdInCar(),b=rdBtn();b.hidden=!car||isBusy();
  if(car&&!RD9.was){rdBtnLook();RD9.tt=RD9.on?4.5:0}RD9.was=car;if(car&&RD9.tt>0){RD9.tt-=dt;if(RD9.tt<=0){const t=$('toast');if(t&&!t.hidden)RD9.tt=1;else if(RD9.on)toast(RD9_ST[RD9.st].n+' 🎶 — tocca 📻 per cambiare stazione')}}
  if(car&&RD9.on&&!document.hidden)rdStart();else rdStop()}catch(e){}return r}}
document.addEventListener('visibilitychange',()=>{if(document.hidden)rdStop()});
// il clacson 📯: suona, e le persone vicine fanno un saltello
const HN9={el:null,t:0};
function hornPlay(){try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const ac=RD9.ac||(RD9.ac=(typeof JK!=='undefined'&&JK.ac)||new A());if(ac.state==='suspended')ac.resume();
  const t=ac.currentTime,f=ac.createBiquadFilter(),g=ac.createGain();f.type='lowpass';f.frequency.value=1600;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.09,t+.02);g.gain.setValueAtTime(.09,t+.36);g.gain.linearRampToValueAtTime(0,t+.45);f.connect(g);g.connect(ac.destination);
  [392,494].forEach(fr=>{const o=ac.createOscillator();o.type='square';o.frequency.value=fr;o.connect(f);o.start(t);o.stop(t+.48)})}catch(e){}}
function hornBtn(){if(HN9.el)return HN9.el;const b=document.createElement('button');b.id='horn9';b.type='button';b.textContent='📯';b.title='Clacson';
  b.style.cssText='position:fixed;right:calc(max(16px,env(safe-area-inset-right,0px)) + 64px);bottom:calc(108px + env(safe-area-inset-bottom,0px));z-index:31;width:54px;height:54px;border-radius:50%;border:3px solid #1f2540;background:#fffdf7;font-size:26px;box-shadow:0 4px 0 rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center';
  b.hidden=true;b.addEventListener('click',e=>{e.stopPropagation();if(performance.now()-HN9.t<500)return;HN9.t=performance.now();hornPlay();
    NPCS.forEach(n=>{if(n.scene==='citta'&&!n.hide&&Math.hypot(n.x-S.pos.x,n.y-S.pos.y)<4)n.jump9=performance.now()})});document.body.appendChild(b);return HN9.el=b}
{const _s=step;step=function(dt){const r=_s(dt);try{hornBtn().hidden=!rdInCar()||isBusy()}catch(e){}return r}}
if(typeof tdDynamic==='function'){const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{if(city){const now=performance.now();NPCS.forEach(n=>{if(!n.jump9)return;const k=(now-n.jump9)/450;const e=TD.pool.get(n.id);if(k>1){n.jump9=0;return}if(e)e.g.position.y=Math.sin(k*Math.PI)*.22})}}catch(e){}return r}}
// il rumore del motore (piano piano): più vai veloce, più il "brum" diventa acuto
const EN9={g:null};
function enSpeed(){const d=S.drive||S.famDrive||(S.ride&&ui.car);return d?Math.abs(d.v||0):0}
function enStop(){if(!EN9.g)return;const g=EN9.g,os=EN9.os;EN9.g=null;try{g.gain.setTargetAtTime(0,RD9.ac.currentTime,.1);setTimeout(()=>{try{os.forEach(o=>o.stop());g.disconnect()}catch(e){}},700)}catch(e){}}
function enTick(){if(!rdInCar()||document.hidden||ui.mg){enStop();return}
  const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const ac=RD9.ac||(RD9.ac=(typeof JK!=='undefined'&&JK.ac)||new A());if(ac.state==='suspended'){try{ac.resume()}catch(e){}return}
  if(!EN9.g){const g=ac.createGain(),f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=400;f.Q.value=2;g.gain.value=0;f.connect(g);g.connect(ac.destination);
    const o1=ac.createOscillator(),o2=ac.createOscillator();o1.type='sawtooth';o2.type='square';o1.frequency.value=34;o2.frequency.value=17;o1.connect(f);o2.connect(f);o1.start();o2.start();EN9.g=g;EN9.f=f;EN9.os=[o1,o2]}
  const k=Math.min(1,enSpeed()/6),t=ac.currentTime,fr=34+k*72;EN9.os[0].frequency.setTargetAtTime(fr,t,.08);EN9.os[1].frequency.setTargetAtTime(fr/2,t,.08);EN9.f.frequency.setTargetAtTime(260+k*760,t,.1);EN9.g.gain.setTargetAtTime(.016+.03*k,t,.15)}
{const _s=step;step=function(dt){const r=_s(dt);try{enTick()}catch(e){}return r}}
document.addEventListener('visibilitychange',()=>{if(document.hidden)enStop()});
