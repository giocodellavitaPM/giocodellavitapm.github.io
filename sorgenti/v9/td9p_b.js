/* ================= macchine e persone realistiche (forme morbide, dettagli) ================= */
// "loft": una forma fatta di anelli ovali uno dopo l'altro (come si modellano carrozzerie e corpi)
function tdLoft(R,M,col,ax){const P=[],C=[],I=[],c=new THREE.Color(),Nr=R.length,ring=M+1;
  R.forEach((r,i)=>{for(let j=0;j<=M;j++){const a=j/M*Math.PI*2,ca=Math.cos(a),sa=Math.sin(a),e=2/(r.n||2),X=(r.x0||0)+r.rx*Math.sign(ca)*Math.pow(Math.abs(ca),e),Y=r.cy+(sa<0&&r.ryb!=null?r.ryb:r.ry)*Math.sign(sa)*Math.pow(Math.abs(sa),e);
    if(ax==='x')P.push(r.p,Y,X);else P.push(X,r.p,(r.z0||0)+Y*(r.zk||1));c.copy(col(i/(Nr-1),sa,ca,r,Y));C.push(c.r,c.g,c.b)}});
  for(let i=0;i<Nr-1;i++)for(let j=0;j<M;j++){const a=i*ring+j,b=a+ring;if(ax==='x')I.push(a,a+1,b,b,a+1,b+1);else I.push(a,b,a+1,b,b+1,a+1)}
  [0,Nr-1].forEach((ri,k)=>{const r=R[ri],ci=P.length/3;if(ax==='x')P.push(r.p,r.cy,r.x0||0);else P.push(r.x0||0,r.p,(r.z0||0)+r.cy*(r.zk||1));c.copy(col(k,0,0,r,r.cy));C.push(c.r,c.g,c.b);
    for(let j=0;j<M;j++){const a=ri*ring+j;(k===0)===(ax==='x')?I.push(ci,a+1,a):I.push(ci,a,a+1)}});
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('color',new THREE.Float32BufferAttribute(C,3));g.setIndex(I);g.computeVertexNormals();return g}
// interpola dei punti chiave [x, ...valori] per avere tanti anelli lisci
function tdKeys(K,n){const out=[];for(let i=0;i<n;i++){const x=K[0][0]+(K[K.length-1][0]-K[0][0])*i/(n-1);let k=0;while(k<K.length-2&&x>K[k+1][0])k++;const a=K[k],b=K[k+1],t=Math.max(0,Math.min(1,(x-a[0])/(b[0]-a[0]||1))),s=t*t*(3-2*t);
  out.push(a.map((v,j)=>j?v+(b[j]-v)*s:x))}return out}
function tdGeoMerge(L){let n=0;const G=L.map(([g,m])=>{const gg=g.index?g.toNonIndexed():g;n+=gg.attributes.position.count;return [gg,m]});const P=new Float32Array(n*3),N=new Float32Array(n*3),C=new Float32Array(n*3),v=new THREE.Vector3();let o=0;
  G.forEach(([g,m])=>{const nm=new THREE.Matrix3().getNormalMatrix(m),p=g.attributes.position,q=g.attributes.normal,c=g.attributes.color;for(let i=0;i<p.count;i++,o++){v.fromBufferAttribute(p,i).applyMatrix4(m);P.set([v.x,v.y,v.z],o*3);v.fromBufferAttribute(q,i).applyMatrix3(nm).normalize();N.set([v.x,v.y,v.z],o*3);C.set([c.getX(i),c.getY(i),c.getZ(i)],o*3)}});
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setAttribute('normal',new THREE.BufferAttribute(N,3));g.setAttribute('color',new THREE.BufferAttribute(C,3));g.computeBoundingSphere();return g}
const tdI=typeof THREE!=='undefined'?new THREE.Matrix4():null;

/* ---------- macchine ---------- */
// [x, sotto, sopra, mezza larghezza] della carrozzeria e [x, cintura, tetto, mezza larghezza] dei vetri
const TD_CARS={
 berlina:{wr:.13,b:[[-.82,.15,.3,.27],[-.8,.12,.37,.31],[-.7,.1,.39,.32],[-.4,.09,.4,.325],[.1,.09,.39,.325],[.4,.09,.36,.32],[.62,.1,.33,.31],[.78,.12,.29,.29],[.83,.15,.23,.25]],
   g:[[-.62,.38,.39,.265],[-.42,.385,.55,.255],[-.25,.385,.57,.26],[.02,.38,.57,.26],[.22,.375,.46,.28],[.37,.37,.38,.295]]},
 suv:{wr:.15,b:[[-.83,.18,.38,.29],[-.8,.15,.44,.33],[-.6,.14,.46,.34],[.2,.14,.46,.34],[.55,.14,.44,.335],[.75,.16,.4,.32],[.84,.19,.33,.28]],
   g:[[-.78,.45,.47,.29],[-.73,.46,.69,.285],[.2,.46,.7,.285],[.42,.45,.53,.3],[.5,.44,.47,.31]]},
 sportiva:{wr:.13,b:[[-.85,.13,.27,.29],[-.82,.1,.33,.34],[-.6,.09,.35,.355],[-.2,.09,.32,.36],[.2,.09,.29,.36],[.55,.09,.26,.345],[.8,.1,.22,.31],[.87,.13,.18,.26]],
   g:[[-.5,.32,.34,.25],[-.32,.325,.44,.245],[-.1,.32,.455,.245],[.08,.31,.4,.26],[.25,.29,.31,.29]],spoiler:1},
 utilitaria:{wr:.12,b:[[-.66,.15,.36,.28],[-.64,.12,.41,.31],[-.5,.1,.42,.315],[.2,.1,.4,.315],[.45,.11,.37,.305],[.62,.13,.32,.29],[.68,.16,.25,.25]],
   g:[[-.6,.4,.42,.27],[-.55,.41,.6,.265],[0,.41,.61,.265],[.2,.4,.45,.28],[.27,.39,.41,.29]]},
 furgone:{wr:.14,b:[[-.9,.18,.74,.33],[-.88,.15,.78,.35],[.4,.15,.78,.35],[.55,.15,.73,.35],[.78,.16,.5,.33],[.9,.2,.38,.29]],
   g:[[.4,.5,.52,.32],[.45,.51,.74,.315],[.56,.51,.72,.32],[.7,.5,.51,.33]],noRoof:1},
};
TD_CARS.taxi=Object.assign({},TD_CARS.berlina,{taxi:1});
const TD_CARTYPES=['berlina','berlina','suv','utilitaria','sportiva','berlina','suv','furgone','taxi','utilitaria','sportiva'];
let tdPaintM=null,tdMatteM=null;
function tdCarGeo(type,col){
  const T9=TD_CARS[type]||TD_CARS.berlina,paint=type==='taxi'?'#f2c21a':col,pc=tdC(paint),dark=tdC('#0d1217'),trim=tdC('#1b1d20'),chrome=tdC('#c9ced3');
  const body=tdKeys(T9.b,34).map(([x,yb,yt,hw])=>({p:x,cy:(yb+yt)/2,ry:(yt-yb)/2,rx:hw,n:5}));
  const bodyG=tdLoft(body,28,()=>pc,'x');
  const pil=T9.pil||[];
  const gl=tdKeys(T9.g,22).map(([x,yb,yt,hw])=>({p:x,cy:yb,ry:(yt-yb),ryb:.04,rx:hw,n:5}));
  const glG=tdLoft(gl,24,()=>dark,'x');
  const L=[[bodyG,tdI],[glG,tdI]];
  // tetto in tinta sopra i vetri (solo sulla parte piatta)
  if(!T9.noRoof){const G=T9.g,top=Math.max(...G.map(k=>k[2])),rk=G.filter(k=>k[2]>top-.03),x0=rk[0][0]-.05,x1=rk[rk.length-1][0]+.04;
    const rf=tdKeys([[x0-.02,top-.05,top-.03,G[1][3]*.7],[x0+.03,top-.04,top+.004,G[1][3]*.93],[x1-.03,top-.04,top+.004,rk[rk.length-1][3]*.93],[x1+.02,top-.05,top-.03,rk[rk.length-1][3]*.7]],14).map(([x,yb,yt,hw])=>({p:x,cy:(yb+yt)/2,ry:(yt-yb)/2,rx:hw,n:6}));
    L.push([tdLoft(rf,24,()=>pc,'x'),tdI])}
  const B=[],LL=[],o3=new THREE.Object3D(),at=(g,p,r,s)=>{o3.position.set(...p);o3.rotation.set(...(r||[0,0,0]));o3.scale.set(...(s||[1,1,1]));o3.updateMatrix();return o3.matrix.clone()};
  const len=T9.b[T9.b.length-1][0],rear=T9.b[0][0],W2=Math.max(...T9.b.map(k=>k[3])),hgt=T9.b[2][2];
  // ruote: gomma + cerchio + mozzo
  const wx=[rear*.62,len*.66],wr=T9.wr||.13,wz=W2-.05;
  wx.forEach(x=>[-1,1].forEach(s=>{B.push({g:new THREE.CylinderGeometry(wr,wr,.11,20),c:'#141414',p:[x,wr,s*wz],r:[Math.PI/2,0,0]},
      {g:new THREE.CylinderGeometry(wr+.03,wr+.03,.004,20,1,false,Math.PI/2,Math.PI),c:'#060708',p:[x,wr,s*(W2+.004)],r:[Math.PI/2,0,0]});
    L.push([tdPaint(new THREE.CylinderGeometry(wr*.64,wr*.64,.115,16),chrome),at(null,[x,wr,s*wz],[Math.PI/2,0,0])],[tdPaint(new THREE.CylinderGeometry(wr*.22,wr*.22,.12,8),tdC('#2a2d31')),at(null,[x,wr,s*(wz+.003)],[Math.PI/2,0,0])]);
    for(let k=0;k<5;k++)L.push([tdPaint(new THREE.BoxGeometry(.014,wr*1.15,.012),tdC('#5d6267')),at(null,[x,wr,s*(wz+.06)],[0,0,k/5*Math.PI*2])])}));
  // fari, luci dietro, griglia, targhe, specchietti
  const fy=T9.b[T9.b.length-2][2]-.06;for(const s of[-1,1]){LL.push({g:new THREE.SphereGeometry(.05,10,8),c:'#fffaf0',p:[len-.03,fy,s*(W2-.1)],s:[.5,.7,1.5]},{g:tdBox(.025,.045,.16),c:'#e3141c',p:[rear+.012,T9.b[1][2]-.07,s*(W2-.12)]});
    const gf=T9.g[T9.g.length-1];L.push([tdPaint(tdBox(.05,.035,.06),pc),at(null,[gf[0]-.05,gf[1]+.03,s*(gf[3]+.05)])])}
  B.push({g:tdBox(.02,.05,T9.b[T9.b.length-1][3]*1.4),c:'#16181a',p:[len-.012,(T9.b[T9.b.length-1][1]+T9.b[T9.b.length-1][2])/2+.02,0]},{g:tdBox(.015,.06,.2),c:'#f2f2ee',p:[rear-.005,.2,0]},{g:tdBox(.015,.05,.2),c:'#f2f2ee',p:[len+.005,.17,0]});
  // linee delle portiere
  const belt=T9.g[0][1],dy=(belt+.13)/2,dh=belt-.16;
  const dl=type==='furgone'?[.42]:type==='sportiva'?[.1]:[-.14,.26];dl.forEach(x=>[-1,1].forEach(s=>B.push({g:tdBox(.007,dh,.006),c:'#14161a',p:[x,dy,s*(W2-.002)]},{g:tdBox(.05,.012,.008),c:'#9aa0a6',p:[x-.09,belt-.05,s*(W2-.004)]})));
  const sy=T9.b[1][2];if(T9.spoiler)L.push([tdPaint(tdBox(.14,.02,W2*1.75),tdC('#121416')),at(null,[rear+.08,sy+.08,0])],[tdPaint(tdBox(.03,.08,.03),tdC('#121416')),at(null,[rear+.1,sy+.035,.2])],[tdPaint(tdBox(.03,.08,.03),tdC('#121416')),at(null,[rear+.1,sy+.035,-.2])]);
  const ry=Math.max(...T9.g.map(k=>k[2]));if(T9.taxi){L.push([tdPaint(tdBox(.2,.07,.1),tdC('#fffbe8')),at(null,[-.1,ry+.04,0])]);LL.push({g:tdBox(.18,.045,.105),c:'#fff2a0',p:[-.1,ry+.04,0]})}
  if(T9.pol){const a=T9.pol===1;LL.push({g:tdBox(.1,.045,.1),c:a?'#3a7bff':'#0a1a3a',p:[-.1,ry+.025,.065]},{g:tdBox(.1,.045,.1),c:a?'#3a0a0a':'#ff3030',p:[-.1,ry+.025,-.065]});
    [-1,1].forEach(s=>B.push({g:tdBox(1,.05,.006),c:'#1d3f9a',p:[0,(belt+.13)/2+.02,s*(W2-.001)]}))}
  return {paint:tdGeoMerge(L),matte:B,lights:LL}}
function tdPaint(g,c){const n=g.attributes.position.count,a=new Float32Array(n*3);for(let i=0;i<n;i++)a.set([c.r,c.g,c.b],i*3);g.setAttribute('color',new THREE.BufferAttribute(a,3));return g}
const tdCarCache={};
function tdCar(col,type){if(type===true)type='sportiva';if(!type||!TD_CARS[type])type='berlina';
  if(!tdPaintM){tdPaintM=new THREE.MeshStandardMaterial({vertexColors:true,metalness:.5,roughness:.24});TD.envMats.push(tdPaintM);tdMatteM=new THREE.MeshLambertMaterial({vertexColors:true});TD.carLightM=TD.carLightM||new THREE.MeshBasicMaterial({vertexColors:true})}
  const k=type+col;let P=tdCarCache[k];if(!P){const r=tdCarGeo(type,col);P=tdCarCache[k]={paint:r.paint,matte:tdCM(r.matte,true,tdMatteM).geometry,lights:tdCM(r.lights,false,TD.carLightM).geometry}}
  const g=new THREE.Group(),a=new THREE.Mesh(P.paint,tdPaintM),b=new THREE.Mesh(P.matte,tdMatteM),c=new THREE.Mesh(P.lights,TD.carLightM);a.castShadow=b.castShadow=true;g.add(a,b,c);return g}

/* ---------- persone ---------- */
const tdFaceC={};
function tdFaceMat(lk){const k=(lk.skin||'')+(lk.hair||'')+(lk.f?'f':'m')+(lk.age||'');if(tdFaceC[k])return tdFaceC[k];
  const [c,g]=tdCan(256,128),sk=lk.skin||'#f1c9a5';g.fillStyle=sk;g.fillRect(0,0,256,128);
  // la faccia guarda verso +x, che nella sfera è al centro della texture (u=0.5)
  const sh=shade(sk,.86);g.fillStyle=sh;g.globalAlpha=.35;g.beginPath();g.ellipse(128,92,26,14,0,0,7);g.fill();g.globalAlpha=1;
  const ey=58,young=lk.age==='baby'||lk.age==='kid';
  for(const s of[-1,1]){const ex=128+s*13;g.fillStyle='#fbfbf8';g.beginPath();g.ellipse(ex,ey,young?5.4:4.6,young?3.9:3,0,0,7);g.fill();
    g.fillStyle=['#5a3a1e','#2f6b8f','#3d6b3a','#3a2a1c'][(sk.charCodeAt(2)+(lk.hair||'').charCodeAt(3))%4]||'#4a3020';g.beginPath();g.arc(ex,ey+.3,young?3:2.4,0,7);g.fill();g.fillStyle='#111';g.beginPath();g.arc(ex,ey+.3,1.4,0,7);g.fill();
    g.fillStyle='rgba(255,255,255,.9)';g.fillRect(ex+.6,ey-1.4,1.2,1.2);
    g.strokeStyle=shade(lk.hair||'#3a2a1c',.85);g.lineWidth=lk.f?1.6:2.6;g.beginPath();g.moveTo(ex-6,ey-7+(lk.f?0:1));g.quadraticCurveTo(ex,ey-10,ex+6,ey-7);g.stroke();
    g.fillStyle='rgba(225,120,110,.18)';g.beginPath();g.ellipse(ex+s*2,ey+12,6,4,0,0,7);g.fill();
    if(lk.f){g.strokeStyle='#222';g.lineWidth=1.2;g.beginPath();g.moveTo(ex-5,ey-3);g.lineTo(ex+5,ey-3.5);g.stroke()}}
  g.fillStyle=shade(sk,.8);g.beginPath();g.moveTo(128,62);g.lineTo(124,76);g.quadraticCurveTo(128,79,132,76);g.closePath();g.fill();
  g.strokeStyle=lk.f?'#b8484f':shade(sk,.62);g.lineWidth=lk.f?3:2.2;g.lineCap='round';g.beginPath();g.moveTo(120,86);g.quadraticCurveTo(128,90,136,86);g.stroke();
  if(lk.age==='old'){g.strokeStyle=shade(sk,.75);g.lineWidth=1;for(const s of[-1,1]){g.beginPath();g.moveTo(128+s*22,ey-2);g.lineTo(128+s*25,ey+2);g.stroke()}}
  if(!lk.f&&(lk.age==='adult'||lk.age==='old')&&(sk.charCodeAt(3)+(lk.hair||'').length)%3===0){g.fillStyle=lk.hair||'#3a2a1c';g.globalAlpha=.35;g.beginPath();g.ellipse(128,94,22,12,0,0,7);g.fill();g.globalAlpha=1}
  g.fillStyle=shade(sk,.88);for(const s of[-1,1]){g.beginPath();g.ellipse(128+s*58,64,6,10,0,0,7);g.fill()}
  const m=new THREE.MeshLambertMaterial({map:tdTex(c)});return tdFaceC[k]=m}
let tdHeadG=null;
// capelli: un guscio appena più grande della testa; sotto l'attaccatura i punti rientrano dentro la testa
function tdHairGeo(st,f,hy){const g=new THREE.SphereGeometry(.085,28,20),P=g.attributes.position,v=new THREE.Vector3();
  const fr=st==='bald'?.75:f?.42:.5,bk=st==='bald'?.2:f?-.5:-.42,sd=st==='bald'?.55:f?.05:.2;
  for(let i=0;i<P.count;i++){v.fromBufferAttribute(P,i).divideScalar(.085);const dx=v.x,dz=Math.abs(v.z),line=dx>=0?sd+(fr-sd)*dx*dx/(dx*dx+dz*dz+1e-6):sd+(bk-sd)*dx*dx/(dx*dx+dz*dz+1e-6);
    const k=v.y>line?1.075+.05*Math.max(0,v.y)*(f?.6:1):v.y>line-.12?1.075-(line-v.y)/.12*.17:.9;
    P.setXYZ(i,v.x*.085*.92*k,v.y*.085*1.1*k*(v.y>0?1.02:1),v.z*.085*.86*k)}
  g.computeVertexNormals();g.translate(-.003,hy+.003,0);return g}
function tdHuman(lk){
  const g=new THREE.Group(),legs=[],arms=[],sk=tdC(lk.skin||'#f1c9a5'),sh=tdC(lk.shirt||'#4a5d7e'),pa=tdC(lk.pants||'#333c55'),hc=tdC(lk.hair||'#3a2a1c'),shoe=tdC('#25211e'),f=!!lk.f,L=.31;
  const vc=(tdVCM||(tdVCM=new THREE.MeshLambertMaterial({vertexColors:true})));
  // gambe (coscia → caviglia) e scarpe
  for(const s of[-1,1]){const p=new THREE.Group();p.position.set(0,L,s*.052);
    const lg=tdLoft(tdKeys([[0,.052,.05],[-.12,.045,.042],[-.17,.036,.036],[-.27,.03,.03],[-.3,.028,.028]],8).map(([y,rx,rz])=>({p:y,cy:0,rx,ry:rz,n:2})),10,(t,sa,ca,r)=>lk.skirt&&r.p>-.17?tdC(lk.skirt):(lk.skirt&&r.p<=-.17?sk:pa),'y');
    const sg=new THREE.SphereGeometry(.04,10,8);sg.scale(1.75,.62,1);sg.translate(.022,-L+.018,0);tdPaint(sg,shoe);
    const m=new THREE.Mesh(tdGeoMerge([[lg,tdI],[sg,tdI]]),vc);m.castShadow=true;p.add(m);g.add(p);legs.push(p)}
  // busto: fianchi, vita, petto, spalle
  const tk=f?[[L-.03,.07,.11],[L+.06,.058,.09],[L+.12,.06,.092],[L+.19,.068,.1],[L+.25,.06,.115],[L+.275,.035,.06]]:[[L-.03,.068,.105],[L+.06,.06,.095],[L+.13,.066,.1],[L+.2,.07,.112],[L+.25,.062,.125],[L+.28,.035,.065]];
  const tor=tdLoft(tdKeys(tk,12).map(([y,rx,rz])=>({p:y,cy:0,rx,ry:rz,n:2.2})),14,(t,sa,ca,r)=>r.p<L+.035?(lk.skirt?tdC(lk.skirt):pa):Math.abs(r.p-(L+.035))<.008?tdC('#2a221c'):sh,'y');
  const nk=tdPaint(new THREE.CylinderGeometry(.028,.032,.06,10),sk);nk.translate(0,L+.3,0);
  const parts=[[tor,tdI],[nk,tdI]];
  if(lk.skirt){const sk2=tdPaint(new THREE.CylinderGeometry(.1,.15,.17,14,1,true),tdC(lk.skirt));sk2.translate(0,L-.06,0);parts.push([sk2,tdI])}
  const body=new THREE.Mesh(tdGeoMerge(parts),vc);body.castShadow=true;g.add(body);
  // braccia: manica + avambraccio + mano
  for(const s of[-1,1]){const p=new THREE.Group();p.position.set(0,L+.255,s*.122);
    const short=(lk.shirt||'').length%2===0;const ar=tdLoft(tdKeys([[0,.031,.031],[-.1,.026,.027],[-.2,.021,.022],[-.235,.02,.02]],9).map(([y,rx,rz])=>({p:y,cy:0,rx,ry:rz,n:2})),10,(t,sa,ca,r)=>r.p>(short?-.08:-.2)?sh:sk,'y');
    const hd=tdPaint(new THREE.SphereGeometry(.027,10,8),sk);hd.scale(1,1.25,.8);hd.translate(0,-.26,0);
    const m=new THREE.Mesh(tdGeoMerge([[ar,tdI],[hd,tdI]]),vc);m.castShadow=true;p.add(m);p.rotation.x=s*.06;g.add(p);arms.push(p)}
  // testa con la faccia e i capelli
  if(!tdHeadG){tdHeadG=new THREE.SphereGeometry(.085,24,18);tdHeadG.scale(.92,1.1,.86)}
  const hy=L+.395,head=new THREE.Mesh(tdHeadG,tdFaceMat(lk));head.position.y=hy;head.castShadow=true;g.add(head);
  const HP=[],st=lk.style||'short',hairCap=tdHairGeo(st,f,hy);HP.push([tdPaint(hairCap,hc),tdI]);
  if(/long|coda|pony|tail/.test(st)){const b=tdLoft(tdKeys([[hy+.05,.085,.06],[hy-.05,.08,.05],[hy-.15,.065,.03]],6).map(([y,rz,rx])=>({p:y,cy:0,rx,ry:rz,n:2,x0:-.035})),12,()=>hc,'y');HP.push([b,tdI])}
  else if(st==='bun'){const b=tdPaint(new THREE.SphereGeometry(.042,10,8),hc);b.translate(-.075,hy+.06,0);HP.push([b,tdI])}
  else if(f){const b=tdLoft(tdKeys([[hy+.04,.085,.055],[hy-.04,.075,.045]],4).map(([y,rz,rx])=>({p:y,cy:0,rx,ry:rz,n:2,x0:-.03})),12,()=>hc,'y');HP.push([b,tdI])}
  if(lk.glasses){for(const s of[-1,1]){const r=new THREE.TorusGeometry(.014,.0025,6,14);r.rotateY(Math.PI/2);r.translate(.08,hy+.012,s*.028);HP.push([tdPaint(r,tdC('#151515')),tdI])}}
  const hm=new THREE.Mesh(tdGeoMerge(HP),vc);hm.castShadow=true;g.add(hm);
  const k={baby:.5,kid:.68,teen:.9,adult:1,old:.96}[lk.age]||1;g.scale.setScalar(k);
  // proporzioni vere: gambe più lunghe e testa più piccola negli adulti (i bimbi hanno la testa più grande)
  const young=lk.age==='baby'||lk.age==='kid',dL=L*(young?.06:.14),ak=young?1.18:.86;
  legs.forEach(p=>{p.position.y+=dL;p.children[0].scale.y=(L+dL)/L});body.position.y=dL;arms.forEach(p=>p.position.y+=dL);
  head.scale.setScalar(ak);head.position.y=hy+dL-(1-ak)*.09;hm.scale.setScalar(ak);hm.position.y=head.position.y-hy*ak
  return {g,legs,arms}}
