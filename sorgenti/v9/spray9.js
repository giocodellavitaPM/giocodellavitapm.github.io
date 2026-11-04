/* ================= v9: la carrozzeria come in GTA (porti la macchina presa all'officina: colore nuovo e la polizia non ti riconosce più) + il tachimetro ================= */
const SP9={zone:null,busy:0,el:null,sp:null,kmh:0};
const SP9_COL=['#e63946','#f4a261','#2a9d8f','#ffd23a','#7b2cbf','#f1f3f5','#1d3557','#3a86ff','#ff006e','#8ac926','#222831','#ff7f11'];
// il punto della strada davanti all'officina dove ti devi fermare
function spZone(){if(SP9.zone)return SP9.zone;const d=destXY('officina');if(!d)return null;const r=nearRoad(d[0],d[1]);if(!r.length)return null;
  let x=0,y=0;r.forEach(a=>{x+=a[0]+.5;y+=a[1]+.5});return SP9.zone={x:x/r.length,y:y/r.length,tiles:r}}
const spCan=()=>!!(S&&S.alive&&S.scene==='citta'&&S.famDrive&&S.famDrive.jack&&JK.pols.length);
function spSound(){try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const ac=JK.ac||(JK.ac=new A());if(ac.state==='suspended')ac.resume();
  const n=ac.sampleRate*1.3|0,buf=ac.createBuffer(1,n,ac.sampleRate),d=buf.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(i<n*.08?i/(n*.08):1-(i-n*.08)/(n*.92));
  const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();f.type='bandpass';f.frequency.value=5200;f.Q.value=.7;g.gain.value=.12;s.buffer=buf;s.connect(f);f.connect(g);g.connect(ac.destination);s.start()}catch(e){}}
function spStart(){const d=S.famDrive;SP9.busy=1;d.v=0;jackClear();spSound();
  let e=SP9.el;if(!e){e=SP9.el=document.createElement('div');e.id='sp9';e.style.cssText='position:fixed;inset:0;z-index:58;background:#05060a;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;color:#fff;font:800 24px "Baloo 2",system-ui;text-align:center;pointer-events:none;opacity:0;transition:opacity .45s';document.body.appendChild(e)}
  e.innerHTML='<div style="font-size:64px">🎨</div><div>Pssssssh…</div><div style="font:600 15px system-ui;opacity:.8">Il meccanico rivernicia la macchina</div>';e.style.display='flex';requestAnimationFrame(()=>e.style.opacity='1');
  setTimeout(()=>{try{const j=S.famDrive&&S.famDrive.jack;if(j){const L=SP9_COL.filter(c=>c!==j.col);j.col=L[Math.floor(Math.random()*L.length)];if(JK.car)JK.car.col=j.col}
    jackClear();const pay=S.money>=100;if(pay)money(-100);S.spray9=(S.spray9||0)+1;updateHud();
    e.style.opacity='0';jkBig('RIVERNICIATA! 🎨','#ff6bd6');
    toast(pay?'🔧 Il meccanico: «Ecco fatto, colore nuovo! La polizia non ti riconosce più.» 🎨 (100 €)':'🔧 Il meccanico: «Colore nuovo! Questa volta te lo faccio gratis… ma poi riportala al suo proprietario!» 🎨')}catch(err){}
    setTimeout(()=>{SP9.busy=0;e.style.display='none'},500)},1500)}
function spTick(){if(SP9.busy||!spCan())return;const z=spZone();if(!z)return;if(Math.hypot(S.pos.x-z.x,S.pos.y-z.y)<1.9)spStart()}
{const _s=step;step=function(dt){const r=_s(dt);try{spTick();spMeter()}catch(e){}return r}}
{const _c=carMove;carMove=function(st,dt,maxV){if(SP9.busy){st.v=0;return false}return _c.apply(this,arguments)}}
{const _d=doAction;doAction=function(){if(SP9.busy)return;return _d.apply(this,arguments)}}
// la scritta della polizia ricorda l'officina
{const _h=jackHud;jackHud=function(){const r=_h.apply(this,arguments);try{if(JK.el&&!JK.el.hidden&&spCan())JK.el.style.fontSize=innerWidth<400?'12px':'14px';JK.el.insertAdjacentHTML('beforeend','<div style="font:600 11px system-ui;opacity:.9;margin-top:2px;text-align:center">🎨 oppure vai all\'Officina 🔧 a cambiare colore!</div>')}catch(e){}return r}}
// il navigatore porta all'officina quando ti cerca la polizia
{const _g=gpsCalc;gpsCalc=function(dt){_g(dt);try{if(GPS9.route||!spCan())return;const z=spZone();if(!z)return;GPS9.goal=[z.x-.5,z.y-.5];SP9.rt=(SP9.rt||0)-dt;if(SP9.rt>0&&SP9.route){GPS9.route=SP9.route;return}SP9.rt=.6;
  const fx=Math.floor(S.pos.x),fy=Math.floor(S.pos.y),st=at(fx,fy)===1?[[fx,fy]]:nearRoad(fx,fy),r=st.length?roadRoute(st,z.tiles):null;SP9.route=GPS9.route=r?[[S.pos.x-.5,S.pos.y-.5],...r]:null}catch(e){}}}
// sulla minimappa l'icona della carrozzeria
{const _g=gtaMini;gtaMini=function(){const r=_g.apply(this,arguments);try{const box=$('mm9');if(box&&!box.hidden&&S&&S.scene==='citta'&&S.famDrive&&S.famDrive.jack){const z=spZone();if(z){const c=box.querySelector('canvas').getContext('2d'),W2=300;let [X,Y]=mmXY(z.x,z.y);X=Math.max(18,Math.min(W2-18,X));Y=Math.max(18,Math.min(W2-18,Y));
  c.fillStyle='#ff6bd6';c.strokeStyle='#fff';c.lineWidth=3;c.beginPath();c.arc(X,Y,17,0,7);c.fill();c.stroke();c.font='20px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText('🎨',X,Y+1)}}}catch(e){}return r}}
// in 2D: il cartello della carrozzeria davanti all'officina
{const _d=drawCity;drawCity=function(){const r=_d.apply(this,arguments);try{if(ui.td9bake)return r;const z=spZone();if(!z)return r;const c=cx,t=performance.now()/1000;c.save();
  if(spCan()){c.strokeStyle=`rgba(255,107,214,${.55+.35*Math.sin(t*5)})`;c.lineWidth=5;c.setLineDash([10,7]);c.beginPath();c.arc(z.x*T,z.y*T,T*1.5,0,7);c.stroke();c.setLineDash([])}
  c.font='26px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText('🎨',z.x*T,(z.y-1.6)*T);c.restore()}catch(e){}return r}}
// il tachimetro: quando guidi una macchina, in basso, come nei videogiochi
function spSpeed(){if(!S||S.scene!=='citta')return null;if(S.famDrive)return S.famDrive.v||0;if(S.drive&&S.drive.man)return S.drive.v||0;
  if(S.ride&&typeof isCar==='function'&&isCar((bestRide()||{}).id)&&ui.car)return ui.car.v||0;return null}
function spMeter(){const v=spSpeed(),on=v!=null&&!isBusy()&&!ui.mg&&!ui.flying;let e=SP9.sp;
  if(!on){if(e&&!e.hidden)e.hidden=true;return}
  if(!e){e=SP9.sp=document.createElement('div');e.id='spd9';e.style.cssText='position:fixed;left:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 190px);z-index:24;width:92px;height:92px;pointer-events:none;filter:drop-shadow(0 2px 4px #0008)';
    e.innerHTML='<canvas width="184" height="184" style="width:92px;height:92px"></canvas>';document.body.appendChild(e)}
  const now=performance.now();if(!e._p||now-e._p>500){e._p=now;const ck=$('clock9');if(ck&&ck.offsetWidth){const r=ck.getBoundingClientRect();e.style.bottom=Math.round(innerHeight-r.top+8)+'px'}}
  e.hidden=false;const k=Math.round(Math.abs(v)*14);SP9.kmh+=(k-SP9.kmh)*.25;const kv=Math.round(SP9.kmh);if(e._k===kv)return;e._k=kv;
  const c=e.firstChild.getContext('2d'),R=92,a0=Math.PI*.75,a1=Math.PI*2.25,mx=100,ang=a0+(a1-a0)*Math.min(1,SP9.kmh/mx);c.clearRect(0,0,184,184);
  c.fillStyle='rgba(12,16,28,.82)';c.beginPath();c.arc(R,R,86,0,7);c.fill();c.lineWidth=4;c.strokeStyle='rgba(255,255,255,.25)';c.stroke();
  c.lineCap='round';c.lineWidth=10;c.strokeStyle='rgba(255,255,255,.12)';c.beginPath();c.arc(R,R,68,a0,a1);c.stroke();
  const g=c.createLinearGradient(20,0,164,0);g.addColorStop(0,'#3ddc84');g.addColorStop(.6,'#ffd23a');g.addColorStop(1,'#ff4d4d');c.strokeStyle=g;c.beginPath();c.arc(R,R,68,a0,Math.max(a0+.01,ang));c.stroke();
  c.lineWidth=3;c.strokeStyle='rgba(255,255,255,.7)';for(let i=0;i<=10;i++){const a=a0+(a1-a0)*i/10,l=i%5?6:12;c.beginPath();c.moveTo(R+Math.cos(a)*(56-l),R+Math.sin(a)*(56-l));c.lineTo(R+Math.cos(a)*56,R+Math.sin(a)*56);c.stroke()}
  c.strokeStyle='#ff5a3c';c.lineWidth=5;c.beginPath();c.moveTo(R,R);c.lineTo(R+Math.cos(ang)*60,R+Math.sin(ang)*60);c.stroke();c.fillStyle='#fff';c.beginPath();c.arc(R,R,8,0,7);c.fill();
  c.fillStyle='#fff';c.font='900 40px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(v<-.1?'R':kv,R,R+40);c.font='700 18px system-ui';c.fillStyle='rgba(255,255,255,.75)';c.fillText('km/h',R,R+70)}
// le scritte grandi (PRESO!, SEMINATI!, RIVERNICIATA!) stanno sempre su una riga sola
{const _b=jkBig;jkBig=function(txt){const r=_b.apply(this,arguments);try{const e=$('gta9big');if(e)e.style.fontSize=Math.min(54,Math.floor(Math.min(innerWidth,800)*1.55/Math.max(1,[...String(txt)].length)))+'px'}catch(e){}return r}}
