/* ================= v9: il cielo più vero: nuvole grandi che si muovono piano e stormi di uccelli che passano (3D) ================= */
const CL9={g:null,b:null,bt:20};
function tdCloudTex(seed){const [c,g]=tdCan(256,128),r=seeded(seed),bl=[];
  for(let i=0;i<14;i++){const x=40+r()*176,y=58+r()*30-Math.sin((x-40)/176*Math.PI)*26,rad=18+r()*26*Math.sin((x-40)/176*Math.PI+.3);bl.push([x,y,rad])}
  // prima l'ombra grigia sotto, poi il bianco sopra: sembrano nuvole "gonfie"
  for(const [x,y,rad] of bl){const rg=g.createRadialGradient(x,y+rad*.35,rad*.2,x,y+rad*.35,rad*1.05);rg.addColorStop(0,'rgba(170,182,198,.85)');rg.addColorStop(1,'rgba(170,182,198,0)');g.fillStyle=rg;g.beginPath();g.arc(x,y+rad*.35,rad*1.05,0,7);g.fill()}
  for(const [x,y,rad] of bl){const rg=g.createRadialGradient(x-rad*.2,y-rad*.3,rad*.1,x,y,rad);rg.addColorStop(0,'rgba(255,255,255,1)');rg.addColorStop(.65,'rgba(250,251,253,.9)');rg.addColorStop(1,'rgba(240,244,250,0)');g.fillStyle=rg;g.beginPath();g.arc(x,y,rad,0,7);g.fill()}
  const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;return t}
function tdClouds(){if(CL9.g)return CL9.g;const G=new THREE.Group(),T3=[11,23,37].map(tdCloudTex),r=seeded(77),M=[];
  for(let i=0;i<18;i++){const m=new THREE.SpriteMaterial({map:T3[i%3],transparent:true,depthWrite:false,fog:false,opacity:.92});M.push(m);const s=new THREE.Sprite(m),a=i/18*Math.PI*2+r()*.25,R=150,el=.1+r()*.3,w=55+r()*55;
    s.position.set(Math.cos(a)*R,Math.tan(el)*R+4,Math.sin(a)*R);s.scale.set(w,w/2,1);s.renderOrder=-1;G.add(s)}
  G.userData.M=M;return CL9.g=G}
// uccellini: due disegni (ali su, ali giù) che si alternano
function tdBirdMats(){if(CL9.bm)return CL9.bm;CL9.bm=[0,1].map(k=>{const [c,g]=tdCan(64,32);g.strokeStyle='#22262c';g.lineWidth=4;g.lineCap='round';g.lineJoin='round';g.beginPath();
  if(k){g.moveTo(4,10);g.quadraticCurveTo(18,4,32,16);g.quadraticCurveTo(46,4,60,10)}else{g.moveTo(6,26);g.quadraticCurveTo(18,18,32,16);g.quadraticCurveTo(46,18,58,26)}g.stroke();
  const t=new THREE.CanvasTexture(c);return new THREE.SpriteMaterial({map:t,transparent:true,depthWrite:false,fog:false})});return CL9.bm}
function tdBirds(){const G=new THREE.Group(),n=5+Math.floor(Math.random()*4),M=tdBirdMats();for(let i=0;i<n;i++){const s=new THREE.Sprite(M[0]);const row=Math.ceil(i/2),side=i%2?1:-1;s.position.set(-row*1.3,Math.random()*.4,side*row*1.1);s.scale.set(1.1,.55,1);s.userData.ph=Math.random()*6;G.add(s)}return G}
{const _l=tdLight;tdLight=function(){const r=_l.apply(this,arguments);try{const C=TD.city,G=tdClouds(),t=TD.time||0,d=Math.min(1,gtaDark()/.5),dt=Math.min(.25,Math.max(0,t-(CL9.lt==null?t:CL9.lt)));CL9.lt=t;if(G.parent!==C.sc)C.sc.add(G);
  G.position.copy(TD.cam.position);G.position.y=0;G.rotation.y=t*.006;const col=TD.sky.material.color;G.userData.M.forEach(m=>{m.color.copy(col);m.opacity=.92-.55*d});
  // uno stormo ogni tanto, solo di giorno
  if(CL9.b){const B=CL9.b,u=B.userData;u.t+=dt;B.position.x+=u.vx*dt;B.position.z+=u.vz*dt;B.children.forEach((s,i)=>{s.material=CL9.bm[((t*7+s.userData.ph)|0)%2];s.position.y=Math.sin(t*2+s.userData.ph)*.25});
    if(u.t>u.life||d>.4){C.sc.remove(B);CL9.b=null;CL9.bt=40+Math.random()*50}}
  else if(d<.3&&!ui.mg){CL9.bt-=dt;if(CL9.bt<=0){const B=tdBirds(),a=Math.random()*Math.PI*2,me=TD.me,sp=4.5;B.position.set(me.x-Math.cos(a)*45,14+Math.random()*8,me.y-Math.sin(a)*45);B.rotation.y=-a;
    B.userData={vx:Math.cos(a)*sp,vz:Math.sin(a)*sp,t:0,life:22};C.sc.add(B);CL9.b=B}}}catch(e){}return r}}
// ---- ombre delle nuvole che scorrono sulla città (di giorno) e l'arcobaleno dopo la pioggia
function tdCloudShadow(){if(CL9.sh)return CL9.sh;const [c,g]=tdCan(256,256),r=seeded(99);g.fillStyle='#000';g.fillRect(0,0,256,256);
  for(let i=0;i<9;i++){const x=r()*256,y=r()*256,R=30+r()*45;for(const [dx,dy] of [[0,0],[256,0],[-256,0],[0,256],[0,-256]]){const rg=g.createRadialGradient(x+dx,y+dy,R*.2,x+dx,y+dy,R);rg.addColorStop(0,'rgba(255,255,255,.9)');rg.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=rg;g.fillRect(x+dx-R,y+dy-R,R*2,R*2)}}
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;const m=new THREE.MeshBasicMaterial({color:0x000000,alphaMap:t,transparent:true,opacity:0,depthWrite:false,fog:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
  const me=new THREE.Mesh(new THREE.PlaneGeometry(90,90),m);me.rotation.x=-Math.PI/2;me.position.y=.018;me.renderOrder=1;me.frustumCulled=false;return CL9.sh=me}
function tdRainbow(){if(CL9.rbM)return CL9.rbM;const g=new THREE.RingGeometry(46,58,96,7,0,Math.PI),P=g.attributes.position,C=[],cols=['#8b3dff','#3d5bff','#2fb6e8','#3ddc84','#ffe14d','#ff9f1c','#ff3b3b'].map(tdC);
  for(let i=0;i<P.count;i++){const rr=Math.hypot(P.getX(i),P.getY(i)),k=Math.max(0,Math.min(6,Math.round((rr-46)/12*6)));C.push(cols[k].r,cols[k].g,cols[k].b)}g.setAttribute('color',new THREE.Float32BufferAttribute(C,3));
  const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({vertexColors:true,transparent:true,opacity:0,depthWrite:false,fog:false,side:THREE.DoubleSide}));m.renderOrder=-1;return CL9.rbM=m}
function clRainbowTick(dt){const r=typeof MT9!=='undefined'?MT9.r:0,day=gtaDark()<.12;if(r>.3&&!MT9.snow)CL9.wet=1;
  if(CL9.wet&&r<.06){CL9.wet=0;if(day&&S&&S.scene==='citta'){CL9.rb=90;toast('🌈 Ha smesso di piovere ed è uscito l\'arcobaleno! Guarda il cielo!')}}
  if(CL9.rb>0)CL9.rb-=dt;CL9.rbA=(CL9.rbA||0)+((CL9.rb>0&&day?1:0)-(CL9.rbA||0))*Math.min(1,dt*.6)}
{const _s=step;step=function(dt){const r=_s(dt);try{clRainbowTick(dt)}catch(e){}return r}}
{const _l=tdLight;tdLight=function(){const r=_l.apply(this,arguments);try{const C=TD.city,t=TD.time||0,d=Math.min(1,gtaDark()/.5),rain=typeof MT9!=='undefined'?MT9.r:0,me=TD.me;
  const sh=tdCloudShadow();if(sh.parent!==C.sc)C.sc.add(sh);const Sz=90,rp=2,wx=.55,wz=.3,px=Math.round(me.x),pz=Math.round(me.y);sh.position.x=px;sh.position.z=pz;
  const tx=sh.material.alphaMap;tx.repeat.set(rp,rp);tx.offset.set((px-Sz/2)/Sz*rp-wx*t*rp/Sz,-(pz+Sz/2)/Sz*rp+wz*t*rp/Sz);sh.material.opacity=.3*(1-d)*(1-Math.min(1,rain*1.5))*(TD.R&&TD.hq===false?0:1);sh.visible=sh.material.opacity>.01;
  const rb=tdRainbow(),a=CL9.rbA||0;if(a>.01){if(rb.parent!==C.sc)C.sc.add(rb);const v=new THREE.Vector3(-9,0,-6).normalize();rb.position.copy(TD.cam.position).addScaledVector(v,140);rb.position.y=-6;rb.lookAt(TD.cam.position.x,-6,TD.cam.position.z);rb.material.opacity=.42*a}
  else if(rb.parent)rb.parent.remove(rb)}catch(e){}return r}}
// in 2D: un arcobaleno leggero sopra la città
{const _dr=draw;draw=function(t){_dr.apply(this,arguments);try{const a=CL9.rbA||0;if(a<.02||!S||S.scene!=='citta'||ui.mg)return;if(typeof tdActive==='function'&&tdActive())return;
  const c=cx;c.save();c.setTransform(DPR*ZOOM9,0,0,DPR*ZOOM9,0,0);const X=VW*.5,Y=VH*.62,R=Math.max(VW,VH)*.62;['#ff3b3b','#ff9f1c','#ffe14d','#3ddc84','#2fb6e8','#3d5bff','#8b3dff'].forEach((col,i)=>{c.strokeStyle=col;c.globalAlpha=.16*a;c.lineWidth=10;c.beginPath();c.arc(X,Y,R-i*10,Math.PI*1.08,Math.PI*1.92);c.stroke()});c.restore()}catch(e){}}}
