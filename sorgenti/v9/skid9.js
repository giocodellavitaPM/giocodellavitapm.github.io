/* ================= v9: le sgommate come in GTA: se curvi forte o inchiodi le gomme fischiano e lasciano i segni neri sull'asfalto ================= */
const SK9={L:[],last:null,on:0,au:null,max:360};
function skSound(k){try{if(k<=0&&!SK9.au)return;const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const ac=JK.ac||(JK.ac=new A());
  if(!SK9.au){const n=ac.sampleRate,buf=ac.createBuffer(1,n,n),d=buf.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();
    s.buffer=buf;s.loop=true;f.type='bandpass';f.frequency.value=1900;f.Q.value=7;g.gain.value=0;s.connect(f);f.connect(g);g.connect(ac.destination);s.start();SK9.au={s,g,f,ac}}
  const {g,f}=SK9.au;g.gain.setTargetAtTime(document.hidden?0:.11*Math.min(1,k),ac.currentTime,.05);f.frequency.setTargetAtTime(1700+400*Math.min(1,k),ac.currentTime,.1)}catch(e){}}
// le due ruote dietro: lasciano un pezzetto di striscia ogni volta che la macchina si muove sgommando
function skWheels(ang){const ca=Math.cos(ang),sa=Math.sin(ang),bx=S.pos.x-ca*.52,by=S.pos.y-sa*.52;return [[bx-sa*.27,by+ca*.27],[bx+sa*.27,by-ca*.27]]}
function skAdd(ang){const W=skWheels(ang),now=performance.now();if(SK9.last){for(let i=0;i<2;i++){const a=SK9.last[i],b=W[i];if(Math.hypot(b[0]-a[0],b[1]-a[1])>1.2)continue;SK9.L.push({a,b,t:now})}
    if(SK9.L.length>SK9.max)SK9.L.splice(0,SK9.L.length-SK9.max);SK9.dirty=1}SK9.last=W}
{const _c=carMove;carMove=function(st,dt,maxV){const a0=st.ang,v0=Math.abs(st.v||0),r=_c.apply(this,arguments);try{
  if(S.scene!=='citta'||dt<=0){SK9.on=0;SK9.last=null;return r}const v=Math.abs(st.v||0),w=Math.abs(wrapA(st.ang-a0))/dt,acc=(v-v0)/dt,inp=!!(ui.gas||ui.brake||carInput());
  const turn=v>3.2?w*v:0,brake=v0>3.2&&acc<-7.5&&inp&&v>.3,k=Math.max((turn-9)/6,brake?1:0);
  if(r&&k>0){SK9.on=Math.min(1,k);skAdd(st.ang)}else{SK9.on=0;SK9.last=null}}catch(e){}return r}}
{const _s=step;step=function(dt){const r=_s(dt);try{skSound(S&&S.alive&&S.scene==='citta'?SK9.on:0);const now=performance.now();if(SK9.L.length&&now-SK9.L[0].t>30000){SK9.L=SK9.L.filter(s=>now-s.t<30000);SK9.dirty=1}}catch(e){}return r}}
// in 2D: i segni neri sotto le macchine, che piano piano spariscono
{const _dc=drawCity;drawCity=function(t,x0,y0,x1,y1){_dc.apply(this,arguments);try{if(!SK9.L.length||S.scene!=='citta')return;const c=cx,now=performance.now();c.save();c.lineCap='round';c.lineWidth=5;
  for(const s of SK9.L){const k=1-(now-s.t)/30000;if(k<=0)continue;c.strokeStyle=`rgba(18,18,20,${(.42*k).toFixed(3)})`;c.beginPath();c.moveTo(s.a[0]*T,s.a[1]*T);c.lineTo(s.b[0]*T,s.b[1]*T);c.stroke()}c.restore()}catch(e){}}}
// in 3D: tante strisce sottili appoggiate sull'asfalto (una sola geometria, si aggiorna solo quando cambia)
function tdSkid(){if(TD.skid)return TD.skid;const n=SK9.max,g=new THREE.BufferGeometry(),P=new Float32Array(n*4*3),C=new Float32Array(n*4*3).fill(1),I=[];for(let i=0;i<n;i++){const k=i*4;I.push(k,k+1,k+2,k+2,k+1,k+3)}
  g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setAttribute('color',new THREE.BufferAttribute(C,3));g.setIndex(I);
  // si moltiplica il colore dell'asfalto: bianco = niente segno, grigio scuro = segno nero (così ogni striscia può sbiadire da sola)
  const m=new THREE.MeshBasicMaterial({vertexColors:true,transparent:true,blending:THREE.MultiplyBlending,side:THREE.DoubleSide,depthWrite:false,fog:false,toneMapped:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2});
  const me=new THREE.Mesh(g,m);me.frustumCulled=false;me.renderOrder=1;return TD.skid=me}
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{const M=tdSkid();if(!city||!SK9.L.length){if(M.parent)M.parent.remove(M);return r}if(M.parent!==scn)scn.add(M);
  const now=performance.now();if(!SK9.dirty&&now-(SK9.up||0)<1000)return r;SK9.dirty=0;SK9.up=now;const P=M.geometry.attributes.position,C=M.geometry.attributes.color;
  for(let i=0;i<SK9.max;i++){const s=SK9.L[i],k=i*4;if(!s){for(let j=0;j<4;j++){P.setXYZ(k+j,0,-9,0);C.setXYZ(k+j,1,1,1)}continue}
    const dx=s.b[0]-s.a[0],dy=s.b[1]-s.a[1],l=Math.hypot(dx,dy)||1,nx=-dy/l*.05,ny=dx/l*.05,al=1-.62*Math.max(0,1-(now-s.t)/30000);
    P.setXYZ(k,s.a[0]+nx,.013,s.a[1]+ny);P.setXYZ(k+1,s.a[0]-nx,.013,s.a[1]-ny);P.setXYZ(k+2,s.b[0]+nx,.013,s.b[1]+ny);P.setXYZ(k+3,s.b[0]-nx,.013,s.b[1]-ny);for(let j=0;j<4;j++)C.setXYZ(k+j,al,al,al*1.02)}
  P.needsUpdate=true;C.needsUpdate=true}catch(e){}return r}}
// i tasti 📯 e 📻 non devono coprire i pedali FRENO/ACCELERA: quando ci sono, salgono sopra; e il contachilometri piccolo lascia il posto al tachimetro rotondo
function skLayout(){const ped=$('ped9'),on=!!(ped&&!ped.hidden&&ped.offsetWidth),k=$('kmh9');let bot='';
  if(on){const r=ped.getBoundingClientRect();bot=Math.round(innerHeight-r.top+(k&&k.style.display!=='none'&&k.offsetWidth?54:12))+'px'}
  for(const id of ['radio9','horn9']){const b=$(id);if(!b)continue;const want=bot||'calc(108px + env(safe-area-inset-bottom,0px))';if(b._bot!==want){b._bot=want;b.style.bottom=want}}
  const sp=$('spd9'),show=!(sp&&!sp.hidden);if(k&&(k.style.display!=='none')!==show)k.style.display=show?'':'none'}
{const _s=step;step=function(dt){const r=_s(dt);try{const now=performance.now();if(now-(SK9.lt||0)>200){SK9.lt=now;skLayout()}}catch(e){}return r}}
