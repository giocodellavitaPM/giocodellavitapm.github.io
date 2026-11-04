/* ================= v9: con tre stelle arriva l'elicottero della polizia col faro (come in GTA) + i botti quando sbatti con la macchina ================= */
const HE9={on:false,x:0,y:0,h:3.6,a:0,t:0,out:0,au:null,sp:[]};
const he3D=()=>typeof TD!=='undefined'&&TD.R&&TD.R.domElement.style.display==='block';
function heSound(on){try{if(on){if(HE9.au)return;const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const ac=JK.ac||(JK.ac=new A());if(ac.state==='suspended')ac.resume();
    const n=ac.sampleRate,buf=ac.createBuffer(1,n,n),d=buf.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;
    const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain(),lfo=ac.createOscillator(),lg=ac.createGain(),out=ac.createGain();s.buffer=buf;s.loop=true;f.type='lowpass';f.frequency.value=420;
    lfo.type='square';lfo.frequency.value=11;lg.gain.value=.5;g.gain.value=.5;lfo.connect(lg);lg.connect(g.gain);out.gain.value=0;out.gain.linearRampToValueAtTime(.09,ac.currentTime+1.5);
    s.connect(f);f.connect(g);g.connect(out);out.connect(ac.destination);s.start();lfo.start();HE9.au={s,lfo,out,ac}}
  else if(HE9.au){const {s,lfo,out,ac}=HE9.au;HE9.au=null;out.gain.cancelScheduledValues(ac.currentTime);out.gain.setValueAtTime(out.gain.value,ac.currentTime);out.gain.linearRampToValueAtTime(0,ac.currentTime+1.2);setTimeout(()=>{try{s.stop();lfo.stop()}catch(e){}},1400)}}catch(e){}}
document.addEventListener('visibilitychange',()=>{if(document.hidden)heSound(false);else if(HE9.on&&!HE9.out)heSound(true)});
function heTick(dt){
  const want=!!(S&&S.alive&&S.scene==='citta'&&JK.stars>=3&&JK.pols.length);
  if(want&&!HE9.on){const a=Math.random()*7;Object.assign(HE9,{on:true,out:0,t:0,x:S.pos.x+Math.cos(a)*16,y:S.pos.y+Math.sin(a)*16,a:a+Math.PI});heSound(true);toast('🚁 Arriva l\'elicottero della polizia! Ti illumina con il faro!')}
  if(!HE9.on)return;if(!want&&!HE9.out){HE9.out=.01;heSound(false)}
  HE9.t+=dt;let tx,ty;
  if(HE9.out){HE9.out+=dt;tx=HE9.x+Math.cos(HE9.a)*40;ty=HE9.y+Math.sin(HE9.a)*40;if(HE9.out>5||S.scene!=='citta'){HE9.on=false;return}}
  else if(he3D()){const f=[Math.cos(TD.yaw||0),Math.sin(TD.yaw||0)],s=Math.sin(HE9.t*.45)*3.2;tx=S.pos.x+f[0]*10-f[1]*s;ty=S.pos.y+f[1]*10+f[0]*s}
  else{tx=S.pos.x+Math.cos(HE9.t*.6)*3.2;ty=S.pos.y+Math.sin(HE9.t*.6)*2.2-1.2}
  const dx=tx-HE9.x,dy=ty-HE9.y,l=Math.hypot(dx,dy),mv=Math.min(l,Math.max(2,l*1.6)*dt*(HE9.out?3:1));
  if(l>.01){HE9.x+=dx/l*mv;HE9.y+=dy/l*mv}HE9.v=mv/Math.max(dt,1e-3);
  const fa=HE9.out?Math.atan2(dy,dx):Math.atan2(S.pos.y-HE9.y,S.pos.x-HE9.x);HE9.a+=wrapA(fa-HE9.a)*Math.min(1,dt*2)}
// ---- i botti: se sbatti forte la macchina trema, si sente il colpo e escono le scintille
function heBoom(v,st,npc){const now=performance.now();if(now-(HE9.lb||0)<700)return;HE9.lb=now;
  try{const A=window.AudioContext||window.webkitAudioContext;if(A){const ac=JK.ac||(JK.ac=new A());if(ac.state==='suspended')ac.resume();const t=ac.currentTime,n=ac.sampleRate*.4|0,buf=ac.createBuffer(1,n,ac.sampleRate),d=buf.getChannelData(0);
    for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,npc?1:3);const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();s.buffer=buf;
    if(npc){f.type='bandpass';f.frequency.value=2600;f.Q.value=9;g.gain.value=.22}else{f.type='lowpass';f.frequency.value=900;g.gain.value=.35;const o=ac.createOscillator(),og=ac.createGain();o.frequency.setValueAtTime(95,t);o.frequency.exponentialRampToValueAtTime(38,t+.25);og.gain.setValueAtTime(.32,t);og.gain.exponentialRampToValueAtTime(.001,t+.3);o.connect(og);og.connect(ac.destination);o.start(t);o.stop(t+.32)}
    s.connect(f);f.connect(g);g.connect(ac.destination);s.start(t)}}catch(e){}
  if(npc){NPCS.forEach(n=>{if(n.scene==='citta'&&!n.hide&&Math.hypot(n.x-S.pos.x,n.y-S.pos.y)<2.2)n.jump9=now});return}
  const k=Math.min(1,v/6),sg=Math.sign(v)||1,fx=S.pos.x+Math.cos(st.ang)*.95*sg,fy=S.pos.y+Math.sin(st.ang)*.95*sg;HE9.shk={t:now,k};
  for(let i=0;i<14;i++){const a=st.ang+(sg>0?Math.PI:0)+(Math.random()-.5)*2.4,sp=1.5+Math.random()*2.5*k;HE9.sp.push({x:fx,y:fy,z:.35,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,vz:1+Math.random()*2,t:0,l:.35+Math.random()*.3})}
  if(navigator.vibrate)try{navigator.vibrate(60)}catch(e){}}
{const _c=carMove;carMove=function(st,dt,maxV){const v0=st.v||0,r=_c.apply(this,arguments);try{if(Math.abs(v0)>2.8&&st.v===0&&S.scene==='citta'&&(ui.gas||(!ui.brake&&carInput()))){const ca=Math.cos(st.ang),sa=Math.sin(st.ang),sg=Math.sign(v0);
  const npc=NPCS.some(n=>n.scene==='citta'&&!n.inCar&&!n.hide&&(()=>{const rx=n.x-S.pos.x,ry=n.y-S.pos.y,al=(rx*ca+ry*sa)*sg;return al>0&&al<1.3&&Math.abs(-rx*sa+ry*ca)<.6})());heBoom(v0,st,npc)}}catch(e){}return r}}
function heShake(){const s=HE9.shk;let tr='';if(s){const k=(performance.now()-s.t)/320;if(k>=1)HE9.shk=null;else{const a=(1-k)*7*s.k;tr=`translate(${((Math.random()-.5)*a).toFixed(1)}px,${((Math.random()-.5)*a).toFixed(1)}px) scale(1.03)`}}
  for(const el of [cv,typeof TD!=='undefined'&&TD.R&&TD.R.domElement])if(el&&el.style.transform!==tr)el.style.transform=tr}
{const _s=step;step=function(dt){const r=_s(dt);try{heTick(dt);HE9.sp.forEach(p=>{p.t+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;p.vz-=9*dt;if(p.z<.02){p.z=.02;p.vz*=-.3}});HE9.sp=HE9.sp.filter(p=>p.t<p.l);heShake()}catch(e){}return r}}
// ---- in 2D: l'elicottero visto dall'alto, con l'ombra, le pale che girano e il cerchio di luce del faro
{const _p=drawPlayer;drawPlayer=function(t){const r=_p.apply(this,arguments);try{if(S.scene!=='citta')return r;const c=cx;
  HE9.sp.forEach(p=>{const X=p.x*T,Y=(p.y-p.z*.5)*T;c.strokeStyle=`rgba(255,${190+Math.random()*60|0},80,${1-p.t/p.l})`;c.lineWidth=3;c.beginPath();c.moveTo(X,Y);c.lineTo(X-p.vx*4,Y-(p.vy-p.vz*.5)*4);c.stroke()});
  if(!HE9.on)return r;const X=HE9.x*T,Y=HE9.y*T,tt=performance.now()/1000;
  if(!HE9.out){c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(S.pos.x*T,S.pos.y*T,4,S.pos.x*T,S.pos.y*T,T*1.6);g.addColorStop(0,'rgba(255,250,215,.42)');g.addColorStop(1,'rgba(255,250,215,0)');c.fillStyle=g;c.beginPath();c.arc(S.pos.x*T,S.pos.y*T,T*1.6,0,7);c.fill();c.restore()}
  c.save();c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(X+T*1.3,Y+T*1.6,T*.9,T*.42,HE9.a,0,7);c.fill();
  c.translate(X,Y);c.rotate(HE9.a);c.fillStyle='#1f3b73';c.fillRect(-T*1.75,-4,T*1.3,8);c.fillRect(-T*1.8,-T*.32,8,T*.64);
  c.beginPath();c.ellipse(0,0,T*.72,T*.42,0,0,7);c.fill();c.fillStyle='#f4f6f8';c.beginPath();c.ellipse(-T*.12,0,T*.38,T*.24,0,0,7);c.fill();
  c.fillStyle='#9fd3ff';c.beginPath();c.ellipse(T*.42,0,T*.24,T*.3,0,-1.3,1.3);c.fill();
  const b=(tt*4|0)%2;c.fillStyle=b?'#3a7bff':'#ff3030';c.beginPath();c.arc(-T*.2,0,4,0,7);c.fill();
  c.rotate(tt*18);c.strokeStyle='rgba(30,30,40,.55)';c.lineWidth=5;c.lineCap='round';c.beginPath();c.moveTo(-T*1.3,0);c.lineTo(T*1.3,0);c.moveTo(0,-T*1.3);c.lineTo(0,T*1.3);c.stroke();
  c.fillStyle='rgba(40,40,50,.12)';c.beginPath();c.arc(0,0,T*1.3,0,7);c.fill();c.restore()}catch(e){}return r}}
// ---- sulla minimappa
{const _g=gtaMini;gtaMini=function(){const r=_g.apply(this,arguments);try{const box=$('mm9');if(HE9.on&&box&&!box.hidden){const c=box.querySelector('canvas').getContext('2d');let [X,Y]=mmXY(HE9.x,HE9.y);X=Math.max(16,Math.min(284,X));Y=Math.max(16,Math.min(284,Y));c.font='26px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText('🚁',X,Y)}}catch(e){}return r}}
// ---- in 3D: il modellino dell'elicottero (bianco e blu), le pale, il faro con il cono di luce
function tdHeli(){if(TD.heli)return TD.heli;const G=new THREE.Group(),std=(c,o)=>new THREE.MeshStandardMaterial(Object.assign({color:tdC(c),metalness:.35,roughness:.45},o||{}));
  const bg=new THREE.SphereGeometry(.5,20,14);bg.scale(1.5,.78,.8);const col=[],P=bg.attributes.position,cN=tdC('#1f3b73'),cW=tdC('#f4f6f8');for(let i=0;i<P.count;i++){const c=P.getY(i)<-.06||(P.getY(i)<.08&&P.getX(i)<-.2)?cW:cN;col.push(c.r,c.g,c.b)}
  bg.setAttribute('color',new THREE.Float32BufferAttribute(col,3));const body=new THREE.Mesh(bg,std('#ffffff',{vertexColors:true}));body.castShadow=true;G.add(body);
  const gl=new THREE.Mesh(new THREE.SphereGeometry(.42,16,10,-Math.PI/2,Math.PI,0,Math.PI*.62),std('#3a6f8f',{metalness:.85,roughness:.06}));gl.rotation.z=-Math.PI/2.6;gl.position.set(.36,.04,0);gl.scale.set(1,1,1.05);G.add(gl);
  const nv=std('#1f3b73'),wt=std('#f4f6f8'),dk=std('#2a2d33',{metalness:.6,roughness:.5});
  const add=(geo,m,x,y,z,rx,ry,rz)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.rotation.set(rx||0,ry||0,rz||0);o.castShadow=true;G.add(o);return o};
  add(new THREE.CylinderGeometry(.06,.13,1.6,10),nv,-1.35,.12,0,0,0,Math.PI/2);add(new THREE.BoxGeometry(.34,.4,.04),wt,-2.1,.32,0);add(new THREE.BoxGeometry(.14,.03,.56),nv,-1.95,.14,0);
  [-.32,.32].forEach(z=>{add(new THREE.CylinderGeometry(.03,.03,1.45,6),dk,0,-.52,z,0,0,Math.PI/2);[-.32,.36].forEach(x=>add(new THREE.BoxGeometry(.035,.2,.035),dk,x,-.42,z*.9))});
  add(new THREE.CylinderGeometry(.06,.06,.2,8),dk,0,.44,0);
  const [tc,tg]=tdCan(256,48);tg.font='900 34px system-ui';tg.textAlign='center';tg.textBaseline='middle';tg.fillStyle='#fff';tg.fillText('POLIZIA',128,26);const tm=new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(tc),transparent:true,depthWrite:false});
  [1,-1].forEach(sd=>{const d=new THREE.Mesh(new THREE.PlaneGeometry(.78,.15),tm);d.position.set(-.12,.1,.4*sd);d.rotation.y=sd>0?0:Math.PI;G.add(d)});
  const rot=new THREE.Group();rot.position.set(0,.56,0);const bm=std('#1b1d22',{metalness:.5,roughness:.6});[0,Math.PI/2].forEach(a=>{const b=new THREE.Mesh(new THREE.BoxGeometry(2.7,.02,.11),bm);b.rotation.y=a;b.castShadow=true;rot.add(b)});
  const disc=new THREE.Mesh(new THREE.CircleGeometry(1.36,32),new THREE.MeshBasicMaterial({color:0x22242a,transparent:true,opacity:.14,depthWrite:false,side:THREE.DoubleSide}));disc.rotation.x=-Math.PI/2;rot.add(disc);G.add(rot);
  const tr=new THREE.Group();tr.position.set(-2.12,.34,.05);[0,Math.PI/2].forEach(a=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.03,.44,.05),bm);b.rotation.z=a;tr.add(b)});G.add(tr);
  const lr=new THREE.Mesh(new THREE.SphereGeometry(.05,8,6),new THREE.MeshBasicMaterial({color:0xff3030})),lb=new THREE.Mesh(new THREE.SphereGeometry(.06,8,6),new THREE.MeshBasicMaterial({color:0x3a7bff}));lr.position.set(-2.12,.54,0);lb.position.set(-.1,-.4,0);G.add(lr,lb);
  // il faro: un cono di luce dalla pancia dell'elicottero fino a te, e un cerchio luminoso per terra
  const cg=new THREE.CylinderGeometry(.07,1.05,1,28,1,true);cg.translate(0,-.5,0);const [bc,bg2]=tdCan(4,64),lg=bg2.createLinearGradient(0,0,0,64);lg.addColorStop(0,'#fff6d8');lg.addColorStop(1,'#4a4638');bg2.fillStyle=lg;bg2.fillRect(0,0,4,64);
  const cm=new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(bc),transparent:true,opacity:.12,blending:THREE.AdditiveBlending,depthWrite:false,fog:false});
  const cone=new THREE.Mesh(cg,cm);cone.renderOrder=5;const [cc,g2]=tdCan(128,128),rg=g2.createRadialGradient(64,64,4,64,64,64);rg.addColorStop(0,'rgba(255,248,215,1)');rg.addColorStop(.6,'rgba(255,248,215,.5)');rg.addColorStop(1,'rgba(255,248,215,0)');g2.fillStyle=rg;g2.fillRect(0,0,128,128);
  const spot=new THREE.Mesh(new THREE.CircleGeometry(1.15,32),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cc),transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false,fog:false}));spot.rotation.x=-Math.PI/2;spot.renderOrder=5;
  return TD.heli={G,rot,tr,lr,lb,cone,spot,cm}}
function tdSparks(){if(TD.spk)return TD.spk;const n=48,g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(new Float32Array(n*3),3));
  const m=new THREE.PointsMaterial({color:0xffc864,size:.09,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,fog:false});const p=new THREE.Points(g,m);p.frustumCulled=false;p.renderOrder=6;return TD.spk=p}
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{
  const H=TD.heli;if(city&&HE9.on){const h=tdHeli(),now=performance.now()/1000;[h.G,h.cone,h.spot].forEach(o=>{if(o.parent!==scn)scn.add(o)});
    h.G.position.set(HE9.x,HE9.h+Math.sin(now*1.3)*.12,HE9.y);h.G.rotation.set(0,-HE9.a,0);h.G.rotateZ(-Math.min(.22,(HE9.v||0)*.03));h.rot.rotation.y+=dt*28;h.tr.rotation.z+=dt*40;
    const b=(now*4|0)%2;h.lb.material.color.setHex(b?0x3a7bff:0xff3030);h.lr.visible=(now*1.5%1)<.5;
    const dk=Math.min(1,gtaDark()/.5),src=new THREE.Vector3(.5,-.36,0);h.G.updateMatrixWorld(true);h.G.localToWorld(src);
    if(!HE9.out){const dst=new THREE.Vector3(S.pos.x,0,S.pos.y),dir=dst.clone().sub(src),len=dir.length();h.cone.visible=h.spot.visible=true;h.cone.position.copy(src);
      h.cone.quaternion.setFromUnitVectors(new THREE.Vector3(0,-1,0),dir.normalize());h.cone.scale.set(1,len,1);h.cm.opacity=.05+.16*dk;h.spot.position.set(S.pos.x,.05,S.pos.y);h.spot.material.opacity=.18+.34*dk}
    else h.cone.visible=h.spot.visible=false}
  else if(H)[H.G,H.cone,H.spot].forEach(o=>{if(o.parent)o.parent.remove(o)});
  const P=tdSparks();if(city&&HE9.sp.length){if(P.parent!==scn)scn.add(P);const a=P.geometry.attributes.position;for(let i=0;i<a.count;i++){const s=HE9.sp[i];if(s)a.setXYZ(i,s.x,s.z,s.y);else a.setXYZ(i,0,-50,0)}a.needsUpdate=true}
  else if(P.parent)P.parent.remove(P)}catch(e){}return r}}
