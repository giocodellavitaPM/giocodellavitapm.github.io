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
  const fy=T9.b[T9.b.length-2][2]-.055,hwF=(T9.b[T9.b.length-2][3]+T9.b[T9.b.length-1][3])/2;for(const s of[-1,1]){LL.push({g:new THREE.SphereGeometry(.05,12,8),c:'#fffaf0',p:[len-.035,fy,s*(hwF-.085)],s:[.5,.5,1.05]},{g:tdBox(.012,.008,.1),c:'#dff3ff',p:[len-.03,fy-.03,s*(hwF-.085)]});B.push({g:tdBox(.03,.062,.13),c:'#1b1e23',p:[len-.05,fy,s*(hwF-.085)]});LL.push({g:tdBox(.025,.045,.16),c:'#e3141c',p:[rear+.012,T9.b[1][2]-.07,s*(W2-.12)]});
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
  const [c,g]=tdCan(512,256),sk=lk.skin||'#f1c9a5';g.scale(2,2);g.fillStyle=sk;g.fillRect(0,0,256,128);
  // la faccia guarda verso +x, che nella sfera è al centro della texture (u=0.5)
  const rg=(x,y,r,col,a)=>{const G=g.createRadialGradient(x,y,0,x,y,r);G.addColorStop(0,col);G.addColorStop(1,'rgba(0,0,0,0)');g.globalAlpha=a;g.fillStyle=G;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.globalAlpha=1};
  // ombre morbide: guance, orbite degli occhi, sotto il naso e il mento; luce su fronte e naso
  rg(128-30,72,22,shade(sk,.7),.35);rg(128+30,72,22,shade(sk,.7),.35);rg(128,104,24,shade(sk,.72),.35);
  const ey=58,young=lk.age==='baby'||lk.age==='kid';
  for(const s of[-1,1])rg(128+s*13,ey-1,10,shade(sk,.72),.45);
  rg(128,40,26,'#ffffff',.12);rg(128,68,6,'#ffffff',.18);
  const iris=['#5a3a1e','#2f6b8f','#3d6b3a','#3a2a1c'][(sk.charCodeAt(2)+(lk.hair||'').charCodeAt(3))%4]||'#4a3020';
  for(const s of[-1,1]){const ex=128+s*13,ew=young?5.2:4.6,eh=young?3.4:2.6;
    g.save();g.beginPath();g.moveTo(ex-ew,ey);g.quadraticCurveTo(ex,ey-eh*1.6,ex+ew,ey);g.quadraticCurveTo(ex,ey+eh*1.2,ex-ew,ey);g.closePath();g.fillStyle='#f4f1ea';g.fill();g.clip();
    const ig=g.createRadialGradient(ex,ey+.2,.4,ex,ey+.2,young?3:2.5);ig.addColorStop(0,shade(iris,1.25));ig.addColorStop(1,shade(iris,.7));g.fillStyle=ig;g.beginPath();g.arc(ex,ey+.2,young?3:2.5,0,7);g.fill();
    g.fillStyle='#0d0b0a';g.beginPath();g.arc(ex,ey+.2,1.1,0,7);g.fill();g.fillStyle='rgba(0,0,0,.25)';g.fillRect(ex-ew,ey-eh*1.6,ew*2,1.6);g.restore();
    g.fillStyle='rgba(255,255,255,.9)';g.fillRect(ex+.7,ey-1.1,1,1);
    // palpebra e ciglia
    g.strokeStyle=lk.f?'#1b1412':shade(sk,.45);g.lineWidth=lk.f?1.3:.9;g.beginPath();g.moveTo(ex-ew-.3,ey+.2);g.quadraticCurveTo(ex,ey-eh*1.65,ex+ew+.3,ey-.2);g.stroke();
    g.strokeStyle=shade(sk,.78);g.lineWidth=.7;g.beginPath();g.moveTo(ex-ew*.8,ey-eh*1.6-1.4);g.quadraticCurveTo(ex,ey-eh*2.2-1.2,ex+ew*.8,ey-eh*1.6-1.4);g.stroke();
    // sopracciglia
    g.strokeStyle=shade(lk.hair||'#3a2a1c',.8);g.lineWidth=lk.f?1.3:2.1;g.lineCap='round';g.beginPath();g.moveTo(ex-s*5.5,ey-6.5+(lk.f?0:.6));g.quadraticCurveTo(ex-s*.5,ey-9.2,ex+s*6,ey-6.8);g.stroke();
    g.fillStyle='rgba(215,110,100,.13)';g.beginPath();g.ellipse(ex+s*3,ey+12,6,4,0,0,7);g.fill()}
  // naso: ombra laterale, punta e narici
  g.strokeStyle=shade(sk,.86);g.lineWidth=.8;g.beginPath();g.moveTo(125.5,64);g.quadraticCurveTo(124.5,72,124.5,75.5);g.stroke();
  rg(128,75,4.5,shade(sk,.75),.5);g.fillStyle=shade(sk,.55);for(const s of[-1,1]){g.beginPath();g.ellipse(128+s*2.6,77.4,1.3,.8,0,0,7);g.fill()}
  // bocca: labbro sopra, labbro sotto e la riga
  const lip=lk.f?'#b9545a':shade(sk,.74);g.fillStyle=lip;g.beginPath();g.moveTo(121,86);g.quadraticCurveTo(125,83.4,128,84.6);g.quadraticCurveTo(131,83.4,135,86);g.quadraticCurveTo(128,87,121,86);g.fill();
  g.fillStyle=lk.f?'#c9636a':shade(sk,.82);g.beginPath();g.moveTo(122,86.3);g.quadraticCurveTo(128,91.5,134,86.3);g.quadraticCurveTo(128,87.2,122,86.3);g.fill();
  g.strokeStyle=shade(sk,.5);g.lineWidth=.8;g.beginPath();g.moveTo(121.5,86);g.quadraticCurveTo(128,87.3,134.5,86);g.stroke();
  rg(128,94,5,shade(sk,.8),.35);
  if(lk.age==='old'){g.strokeStyle=shade(sk,.75);g.lineWidth=1;for(const s of[-1,1]){g.beginPath();g.moveTo(128+s*22,ey-2);g.lineTo(128+s*25,ey+2);g.stroke()}}
  if(!lk.f&&(lk.age==='adult'||lk.age==='old')&&(sk.charCodeAt(3)+(lk.hair||'').length)%3===0){g.fillStyle=lk.hair||'#3a2a1c';g.globalAlpha=.35;g.beginPath();g.ellipse(128,94,22,12,0,0,7);g.fill();g.globalAlpha=1}
  g.fillStyle=shade(sk,.88);for(const s of[-1,1]){g.beginPath();g.ellipse(128+s*58,64,6,10,0,0,7);g.fill()}
  const m=new THREE.MeshLambertMaterial({map:tdTex(c)});return tdFaceC[k]=m}
let tdHeadG=null;
const r9=(y,cut)=>y>cut&&y<cut+.016?1.12:1; // la manica è un po' più larga del braccio
// capelli: un guscio appena più grande della testa; sotto l'attaccatura i punti rientrano dentro la testa
function tdHairGeo(st,f,hy){const g=new THREE.SphereGeometry(.085,34,26),P=g.attributes.position,v=new THREE.Vector3();
  const fr=st==='bald'?.75:f?.42:.5,bk=st==='bald'?.2:f?-.5:-.42,sd=st==='bald'?.55:f?.05:.2;
  for(let i=0;i<P.count;i++){v.fromBufferAttribute(P,i).divideScalar(.085);const dx=v.x,dz=Math.abs(v.z),line=dx>=0?sd+(fr-sd)*dx*dx/(dx*dx+dz*dz+1e-6):sd+(bk-sd)*dx*dx/(dx*dx+dz*dz+1e-6);
    const k=v.y>line?1.075+.05*Math.max(0,v.y)*(f?.6:1):v.y>line-.15?1.075-(line-v.y)/.15*.17:.9;
    P.setXYZ(i,v.x*.085*.92*k,v.y*.085*1.1*k*(v.y>0?1.02:1),v.z*.085*.86*k)}
  g.computeVertexNormals();g.translate(-.003,hy+.003,0);return g}
function tdHuman(lk){
  const g=new THREE.Group(),legs=[],arms=[],sk=tdC(lk.skin||'#f1c9a5'),sh=tdC(lk.shirt||'#4a5d7e'),pa=tdC(lk.pants||'#333c55'),hc=tdC(lk.hair||'#3a2a1c'),h9=((lk.shirt||'').charCodeAt(2)||0)+((lk.pants||'').charCodeAt(3)||0),shoe=tdC(['#25211e','#f2f2ee','#5a3a24','#1d2a44','#f2f2ee'][h9%5]),sole=tdC(h9%5===2?'#2a201a':'#f6f6f2'),f=!!lk.f,L=.31;
  const vc=(tdVCM||(tdVCM=new THREE.MeshLambertMaterial({vertexColors:true})));
  // gambe (coscia → caviglia) e scarpe
  for(const s of[-1,1]){const p=new THREE.Group();p.position.set(0,L,s*.052);
    const lg=tdLoft(tdKeys([[0,.052,.05],[-.12,.045,.042],[-.17,.036,.036],[-.27,.03,.03],[-.3,.028,.028]],14).map(([y,rx,rz])=>({p:y,cy:0,rx,ry:rz,n:2})),12,(t,sa,ca,r)=>lk.skirt&&r.p>-.17?tdC(lk.skirt):(lk.skirt&&r.p<=-.17?sk:pa.clone().multiplyScalar(1-.18*(-r.p/.3)+(ca>.6&&r.p<-.02&&r.p>-.16?.06:0))),'y');
    const sg=new THREE.SphereGeometry(.04,12,8);sg.scale(1.75,.62,1);sg.translate(.022,-L+.02,0);tdPaint(sg,shoe);const so=new THREE.SphereGeometry(.041,12,6);so.scale(1.8,.22,1.06);so.translate(.022,-L+.007,0);tdPaint(so,sole);
    const m=new THREE.Mesh(tdGeoMerge([[lg,tdI],[sg,tdI],[so,tdI]]),vc);m.castShadow=true;p.add(m);g.add(p);legs.push(p)}
  // busto: fianchi, vita, petto, spalle
  const tk=f?[[L-.03,.07,.11],[L+.06,.058,.09],[L+.12,.06,.092],[L+.19,.068,.1],[L+.24,.06,.112],[L+.262,.052,.102],[L+.28,.04,.078],[L+.293,.03,.044]]:[[L-.03,.068,.105],[L+.06,.06,.095],[L+.13,.066,.1],[L+.2,.07,.112],[L+.245,.064,.122],[L+.268,.055,.112],[L+.285,.042,.085],[L+.298,.03,.045]];
  const tor=tdLoft(tdKeys(tk,26).map(([y,rx,rz])=>({p:y,cy:0,rx,ry:rz,n:2.05})),20,(t,sa,ca,r)=>{const b=r.p<L+.035?(lk.skirt?tdC(lk.skirt):pa):Math.abs(r.p-(L+.035))<.007?tdC('#2a221c'):sh;return b.clone().multiplyScalar(.86+.18*Math.min(1,Math.max(0,(r.p-L+.03)/.33))-(Math.abs(sa)>.85?.05:0))},'y');
  const nk=tdPaint(new THREE.CylinderGeometry(.028,.032,.06,10),sk);nk.translate(0,L+.3,0);
  const col9=new THREE.TorusGeometry(.033,.008,6,16);col9.rotateX(Math.PI/2);col9.scale(1,1,.9);col9.translate(0,L+.296,0);tdPaint(col9,sh.clone().multiplyScalar(.82));
  const parts=[[tor,tdI],[nk,tdI],[col9,tdI]];
  if(lk.skirt){const sk2=tdPaint(new THREE.CylinderGeometry(.1,.15,.17,14,1,true),tdC(lk.skirt));sk2.translate(0,L-.06,0);parts.push([sk2,tdI])}
  const body=new THREE.Mesh(tdGeoMerge(parts),vc);body.castShadow=true;g.add(body);
  // braccia: manica + avambraccio + mano
  for(const s of[-1,1]){const p=new THREE.Group();p.position.set(0,L+.255,s*.122);
    const short=(lk.shirt||'').length%2===0,cut=short?-.08:-.2;const ar=tdLoft(tdKeys([[0,.031,.031],[-.1,.026,.027],[-.2,.021,.022],[-.235,.02,.02]],20).map(([y,rx,rz])=>({p:y,cy:0,rx:rx*(r9(y,cut)),ry:rz*(r9(y,cut)),n:2})),12,(t,sa,ca,r)=>r.p>cut?sh.clone().multiplyScalar(r.p>cut+.012?1:.85):sk,'y');
    const sp9=tdPaint(new THREE.SphereGeometry(.03,12,8),sh);sp9.scale(.9,.62,.8);sp9.translate(0,-.012,-s*.02);
    const hd=tdPaint(new THREE.SphereGeometry(.027,10,8),sk);hd.scale(1,1.25,.8);hd.translate(0,-.26,0);
    const m=new THREE.Mesh(tdGeoMerge([[ar,tdI],[hd,tdI],[sp9,tdI]]),vc);m.castShadow=true;p.add(m);p.rotation.x=s*.06;g.add(p);arms.push(p)}
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

/* ---------- strade come in GTA: cestini, idranti, cassette, fermate del bus ---------- */
function tdProps(sc){
  const G=new THREE.Group();sc.add(G);const bins=[],hyd=[],box=[],stops=[];
  const busy=new Set();LAMPS.forEach(([x,y])=>busy.add(Math.floor(x)+','+Math.floor(y)));BENCHES.forEach(([x,y])=>busy.add(x+','+y));
  const corner=(x,y)=>RX.some(c=>x>=c-2&&x<=c+3)&&RY.some(r=>y>=r-2&&y<=r+3);
  let lastStop=-99,lastY=-99;
  for(let y=2;y<H-2;y++)for(let x=2;x<W-2;x++){if(at(x,y)!==2||corner(x,y)||busy.has(x+','+y)||(typeof inMZ==='function'&&inMZ(x,y)))continue;
    const d=at(x,y+1)===1?[0,1]:at(x,y-1)===1?[0,-1]:at(x+1,y)===1?[1,0]:at(x-1,y)===1?[-1,0]:null;if(!d)continue;
    const bk=at(x-d[0],y-d[1]);if(bk===6||at(x+d[1],y+d[0])===6||at(x-d[1],y-d[0])===6)continue;
    const r=h9r(x,y,3),px=x+.5+d[0]*.3,pz=y+.5+d[1]*.3;
    if(r<.08)bins.push([px,pz]);else if(r<.11)hyd.push([px,pz]);else if(r<.14)box.push([px,pz,d,r<.125]);
    else if(r<.2&&bk!==4&&stops.every(q=>Math.abs(q[0]-.5-x)+Math.abs(q[1]-.5-y)>10)){stops.push([x+.5,y+.5,d]);lastStop=x;lastY=y}}
  const o3=new THREE.Object3D(),put=(im,i,x,y,z,ry)=>{o3.position.set(x,y,z);o3.rotation.set(0,ry||0,0);o3.scale.set(1,1,1);o3.updateMatrix();im.setMatrixAt(i,o3.matrix)};
  const add=(geo,mat,L,f)=>{if(!L.length)return;const im=new THREE.InstancedMesh(geo,mat,L.length);L.forEach((p,i)=>f(im,i,p));im.castShadow=true;im.receiveShadow=true;G.add(im)};
  // cestini (verdi o grigi) con il coperchio
  add(new THREE.CylinderGeometry(.085,.075,.34,10).translate(0,.17,0),tdMat('#30473a'),bins,(im,i,[x,z])=>put(im,i,x,0,z));
  add(new THREE.CylinderGeometry(.092,.092,.035,10).translate(0,.35,0),tdMat('#1e2b24'),bins,(im,i,[x,z])=>put(im,i,x,0,z));
  // idranti rossi
  add(new THREE.CylinderGeometry(.04,.05,.2,8).translate(0,.1,0),tdMat('#c3312b'),hyd,(im,i,[x,z])=>put(im,i,x,0,z));
  add(new THREE.SphereGeometry(.045,8,6,0,Math.PI*2,0,Math.PI/2).translate(0,.2,0),tdMat('#c3312b'),hyd,(im,i,[x,z])=>put(im,i,x,0,z));
  add(tdBox(.13,.03,.03,.13),tdMat('#a32823'),hyd,(im,i,[x,z])=>put(im,i,x,0,z,1));
  // cassette delle lettere (rosse) e dei giornali (blu)
  const bx=box.filter(b=>b[3]),bn=box.filter(b=>!b[3]),ry=d=>d[0]?Math.PI/2:0;
  add(tdBox(.16,.34,.14,.17),tdMat('#c42b26'),bx,(im,i,[x,z,d])=>put(im,i,x,0,z,ry(d)));
  add(tdBox(.18,.3,.16,.15),tdMat('#2453a8'),bn,(im,i,[x,z,d])=>put(im,i,x,0,z,ry(d)));
  // fermate del bus: tetto, vetro dietro, panchina, palo con il cartello
  if(stops.length){const S2=stops.map(([x,z,d])=>[x-d[0]*.08,z-d[1]*.08,d]),ang=d=>d[0]?Math.PI/2:0,bk=(d,k)=>[d[0]*k,d[1]*k];
    add(tdBox(1.3,.04,.5,1.12),tdMat('#2b3036'),S2,(im,i,[x,z,d])=>put(im,i,x,0,z,ang(d)));
    add(tdBox(1.25,.85,.02,.62),new THREE.MeshLambertMaterial({color:tdC('#a9c8dc'),transparent:true,opacity:.42}),S2,(im,i,[x,z,d])=>{const [a,b]=bk(d,-.22);put(im,i,x+a,0,z+b,ang(d))});
    add(tdBox(.04,1.1,.04,.55),tdMat('#2b3036'),[...S2.map(s=>[s,-.6]),...S2.map(s=>[s,.6])],(im,i,[[x,z,d],o])=>{const [a,b]=bk(d,-.22);put(im,i,x+a+(d[0]?0:o),0,z+b+(d[0]?o:0),0)});
    add(tdBox(.9,.05,.22,.26),tdMat('#8a5a32'),S2,(im,i,[x,z,d])=>{const [a,b]=bk(d,-.08);put(im,i,x+a,0,z+b,ang(d))});
    add(tdBox(.03,1.45,.03,.72),tdMat('#3a3d41'),S2,(im,i,[x,z,d])=>{const [a,b]=bk(d,.28);put(im,i,x+a+(d[0]?0:.75),0,z+b+(d[0]?.75:0),0)});
    add(tdBox(.22,.22,.03,1.38),tdMat('#2a6fd1'),S2,(im,i,[x,z,d])=>{const [a,b]=bk(d,.28);put(im,i,x+a+(d[0]?0:.75),0,z+b+(d[0]?.75:0),ang(d))})}
  TD.props={bins:bins.length,hyd:hyd.length,box:box.length,stops:stops.length,st:stops.slice(0,8)};
}
{const _b=tdBuildCity;tdBuildCity=function(){const r=_b.apply(this,arguments);try{tdProps(TD.city.sc)}catch(e){console.warn('props',e)}return r}}
/* ---------- lampeggianti della polizia: luce blu e rossa che illumina la strada ---------- */
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d(scn,dt,city);
  const P=typeof JK!=='undefined'&&JK.pols&&JK.pols.length&&city?JK.pols.reduce((a,b)=>Math.hypot(a.x-S.pos.x,a.y-S.pos.y)<Math.hypot(b.x-S.pos.x,b.y-S.pos.y)?a:b):null;
  if(P){if(!TD.polL){TD.polL=new THREE.PointLight(0x3a6bff,0,7,1.4)}if(TD.polL.parent!==scn)scn.add(TD.polL);const b=(TD.time*4|0)%2;TD.polL.color.setHex(b?0x3a6bff:0xff3030);TD.polL.intensity=1.6;TD.polL.position.set(P.x,1.1,P.y)}
  else if(TD.polL&&TD.polL.intensity){TD.polL.intensity=0}
  // fumetto 💬 sopra chi ti vuole parlare
  {const c=typeof DLG!=='undefined'&&DLG.cand,n=c&&NPCS.find(x=>x.id===c.id);if(n&&n.scene===S.scene){if(!TD.talkS){TD.talkS=new THREE.Sprite(tdEmoji('💬'));TD.talkS.scale.set(.32,.32,1)}if(TD.talkS.parent!==scn)scn.add(TD.talkS);TD.talkS.visible=true;TD.talkS.position.set(n.x,1.05+Math.sin(TD.time*4)*.04,n.y)}else if(TD.talkS)TD.talkS.visible=false}
  return r}}

/* ---------- grana fine dell'asfalto e dei marciapiedi: nitidi anche da vicino ---------- */
function tdGrainTex(){if(TD.grainT)return TD.grainT;const N=128,[c,g]=tdCan(N,N),d=g.createImageData(N,N),r=seeded(909);
  for(let i=0;i<N*N;i++){const v=118+(r()-.5)*70+(r()<.04?(r()-.5)*120:0);d.data[i*4]=d.data[i*4+1]=d.data[i*4+2]=Math.max(0,Math.min(255,v));d.data[i*4+3]=255}
  g.putImageData(d,0,0);g.globalAlpha=.18;g.strokeStyle='#000';for(let k=0;k<6;k++){g.lineWidth=.6+r();g.beginPath();let x=r()*N,y=r()*N;g.moveTo(x,y);for(let j=0;j<6;j++){x+=(r()-.5)*24;y+=(r()-.5)*24;g.lineTo(x,y)}g.stroke()}
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;return TD.grainT=t}
function tdGrain(m){const gt=tdGrainTex();m.customProgramCacheKey=()=>'grain9';
  m.onBeforeCompile=sh=>{sh.uniforms.grainT={value:gt};sh.fragmentShader=sh.fragmentShader.replace('void main() {','uniform sampler2D grainT;\nvoid main() {').replace('#include <map_fragment>','#include <map_fragment>\n  {float gr=texture2D(grainT,vUv*40.).r,gr2=texture2D(grainT,vUv*170.+.37).r;vec3 cc=diffuseColor.rgb;float sat=max(cc.r,max(cc.g,cc.b))-min(cc.r,min(cc.g,cc.b));float k=mix(.42,.18,smoothstep(.04,.14,sat));diffuseColor.rgb*=mix(1.,gr*2.1,.3)*mix(1.,gr2*2.1,k);}')}}
/* ---------- dentro le case: il cartello USCITA non copre la vista ---------- */
{const _r=tdRender;tdRender=function(t){if(TD.fadeU&&TD.cam&&TD.me){TD.fadeU.uC.value.copy(TD.cam.position);TD.fadeU.uP.value.set(TD.me.x,.75,TD.me.y)}const e=TD.exitSign;if(e&&TD.room&&TD.cam){const dx=TD.cam.position.x-e.position.x,dz=TD.cam.position.z-e.position.z;e.visible=Math.hypot(dx,dz)>2.2&&TD.cam.position.z<e.position.z-.4}return _r(t)}}

/* ---------- palazzi più veri: cornicione, balconi, condizionatori, vetrine, serbatoi e antenne sui tetti ---------- */
{const _b=tdBuilding;tdBuilding=function(grp,o){const H=_b(grp,o);try{tdBuildExtra(o,H)}catch(e){}return H}}
function tdBuildExtra(o,H){if(o.b&&(o.b.custom||o.b.id==='stadio'))return;const r=seeded(o.x*37+o.y*91+o.w),F=o.F|0;
  const d0=(o.doors&&o.doors[0])||[o.x+o.w/2,o.y+o.h];const [ex,ey]=d0;
  // lato della facciata principale (dove c'è la porta)
  let side=ey>=o.y+o.h?'s':ey<o.y?'n':ex<o.x?'w':'e';
  const put=(geo,mat,lx,y,out,rot)=>{const m=new THREE.Mesh(geo,mat);let px,pz,ry;
    if(side==='s'){px=o.x+lx;pz=o.y+o.h+out;ry=0}else if(side==='n'){px=o.x+lx;pz=o.y-out;ry=Math.PI}else if(side==='w'){px=o.x-out;pz=o.y+lx;ry=-Math.PI/2}else{px=o.x+o.w+out;pz=o.y+lx;ry=Math.PI/2}
    m.position.set(px,y,pz);m.rotation.y=ry+(rot||0);m.castShadow=true;tdSt(m);return m};
  const along=side==='s'||side==='n'?o.w:o.h;
  if(!o.glass){
    // cornicione sopra il piano terra, tutto intorno
    const cm=tdMat(shade(o.wall,.82));[[o.w+.08,.07,.08,o.x+o.w/2,o.y+o.h+.02],[o.w+.08,.07,.08,o.x+o.w/2,o.y-.02],[.08,.07,o.h+.08,o.x-.02,o.y+o.h/2],[.08,.07,o.h+.08,o.x+o.w+.02,o.y+o.h/2]].forEach(([w,h,d,x,z])=>{const m=new THREE.Mesh(tdBox(w,h,d),cm);m.position.set(x,1.02,z);tdSt(m)});
    // balconi sulla facciata
    if(F>=3&&!o.gable&&r()<.75){const sl=tdMat(shade(o.wall,.7)),rl=tdMat(r()<.5?'#2e3236':'#f1efe9'),every=r()<.5?2:1;
      for(let k=1;k<F;k++)for(let i=0;i<Math.floor(along);i++){if(i%every!==(k%2&&every===2?1:0))continue;if(r()<.25)continue;const lx=i+.5;if(lx<.4||lx>along-.4)continue;
        put(tdBox(.78,.05,.3),sl,lx,k*1.0+.12,.15);put(tdBox(.78,.26,.025),rl,lx,k*1.0+.27,.29)}}
    // condizionatori sotto qualche finestra
    const acm=tdMat('#d6d8da');for(let k=1;k<F;k++)for(let i=0;i<Math.floor(along);i++)if(r()<.12)put(tdBox(.3,.2,.16),acm,i+.5+(r()-.5)*.2,k*1.0+.3,.08);
    // vetrina al piano terra per i negozi
    if(o.sign&&!o.b){const gm=tdMat('#2a3d4c',{emissive:tdC('#ffcf8a'),emissiveIntensity:0});if(!TD.winMats.includes(gm))TD.winMats.push(gm);const w2=Math.max(.6,along-1.6);[.5,along-.5-w2/2].length;
      put(new THREE.PlaneGeometry(Math.min(w2,along*.42),.6),gm,along*.25,.5,.015);put(new THREE.PlaneGeometry(Math.min(w2,along*.42),.6),gm,along*.75,.5,.015)}
  }
  // sui tetti piatti: serbatoi d'acqua e antenne
  if(!o.gable){const tm=tdMat('#8b8f93'),am=tdMat('#4a4d52');if(r()<.45){const t=new THREE.Mesh(new THREE.CylinderGeometry(.28,.28,.5,10),tm);t.position.set(o.x+.6+r()*(o.w-1.2),H+.35,o.y+.6+r()*(o.h-1.2));t.castShadow=true;tdSt(t)}
    if(r()<.5){const a=new THREE.Mesh(tdBox(.03,.9,.03,.45),am);a.position.set(o.x+.4+r()*(o.w-.8),H+.1,o.y+.4+r()*(o.h-.8));tdSt(a);const c=new THREE.Mesh(tdBox(.4,.03,.03),am);c.position.set(a.position.x,H+.8,a.position.z);tdSt(c)}}
}

/* ---------- chiome degli alberi e cespugli: tante foglie, ombra sotto, luce sopra ---------- */
function tdLeafGeo(R){R=R||.5;const k='leaf'+R;if(TD[k])return TD[k];const g=new THREE.IcosahedronGeometry(R,1),P=g.attributes.position,v=new THREE.Vector3(),C=[];const r=seeded(Math.round(R*100));
  const bumps=[...Array(9)].map(()=>new THREE.Vector3(r()-.5,r()-.5,r()-.5).normalize());
  for(let i=0;i<P.count;i++){v.fromBufferAttribute(P,i);const n=v.clone().normalize();let b=0;bumps.forEach(q=>{b+=Math.max(0,n.dot(q)-.55)*.9});const jit=(Math.sin(v.x*37+v.y*11)*Math.cos(v.z*29)+1)*.05;
    v.multiplyScalar(1+b*.5+jit-.06);if(n.y<-.3)v.y*=.75;P.setXYZ(i,v.x,v.y,v.z);const l=.62+.38*(n.y*.5+.5)+jit;C.push(l,l*1.02,l*.95)}
  g.setAttribute('color',new THREE.Float32BufferAttribute(C,3));g.computeVertexNormals();tdSmoothN(g);return TD[k]=g}
/* normali morbide su geometrie non indicizzate (stessa posizione = stessa normale) */
function tdSmoothN(g){const P=g.attributes.position,N=g.attributes.normal,acc=new Map(),key=i=>(P.getX(i)*1e3|0)+','+(P.getY(i)*1e3|0)+','+(P.getZ(i)*1e3|0);
  for(let i=0;i<P.count;i++){const k=key(i);let a=acc.get(k);if(!a)acc.set(k,a=[0,0,0]);a[0]+=N.getX(i);a[1]+=N.getY(i);a[2]+=N.getZ(i)}
  for(let i=0;i<P.count;i++){const a=acc.get(key(i)),l=Math.hypot(a[0],a[1],a[2])||1;N.setXYZ(i,a[0]/l,a[1]/l,a[2]/l)}N.needsUpdate=true}
/* texture a ciuffi di foglie */
function tdLeafTex(){if(TD.leafT)return TD.leafT;const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d'),r=seeded(4242);
  g.fillStyle='#8a8a8a';g.fillRect(0,0,128,128);
  for(let i=0;i<520;i++){const x=r()*128,y=r()*128,a=r()*6.28,l=3+r()*5,v=110+r()*145|0;g.fillStyle=`rgb(${v},${v},${v})`;
    for(const ox of [-128,0,128])for(const oy of [-128,0,128]){g.save();g.translate(x+ox,y+oy);g.rotate(a);g.beginPath();g.ellipse(0,0,l,l*.45,0,0,6.28);g.fill();g.restore()}}
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3,2);t.anisotropy=4;return TD.leafT=t}
/* le chiome vicine alla telecamera o davanti al giocatore diventano trasparenti */
function tdFadeNear(m,key){if(!TD.fadeU)TD.fadeU={uP:{value:new THREE.Vector3(0,-99,0)},uC:{value:new THREE.Vector3()}};m.customProgramCacheKey=()=>key;m.onBeforeCompile=sh=>{sh.uniforms.uP9=TD.fadeU.uP;sh.uniforms.uC9=TD.fadeU.uC;
  sh.vertexShader=sh.vertexShader.replace('void main() {','varying float vCamD;varying vec3 vW9;\nvoid main() {').replace('#include <project_vertex>','#include <project_vertex>\n  vCamD=-mvPosition.z;\n  #ifdef USE_INSTANCING\n  vW9=(modelMatrix*instanceMatrix*vec4(transformed,1.)).xyz;\n  #else\n  vW9=(modelMatrix*vec4(transformed,1.)).xyz;\n  #endif');
  sh.fragmentShader=sh.fragmentShader.replace('void main() {','varying float vCamD;varying vec3 vW9;uniform vec3 uP9,uC9;\nvoid main() {\n  {float dd=fract(sin(dot(floor(gl_FragCoord.xy),vec2(12.9898,78.233)))*43758.5453);float a=1.;if(vCamD<1.6)a=(vCamD-.7)/.9;\n   vec3 ab=uP9-uC9;float L=dot(ab,ab);if(L>.01){float h=clamp(dot(vW9-uC9,ab)/L,0.,1.);if(h<.97){float q=length(vW9-uC9-ab*h);a=min(a,(q-.45)/.5);}}\n   if(a<1.&&(a<0.||dd>a))discard;}')};return m}
function tdLeafMat(){return tdFadeNear(new THREE.MeshLambertMaterial({vertexColors:true,map:tdLeafTex()}),'leaf9')}

/* ---------- di notte: pozze di luce dei lampioni, fari delle macchine, luna e stelle ---------- */
function tdGlowTex(){if(TD.glowT)return TD.glowT;const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),gr=g.createRadialGradient(32,32,0,32,32,32);
  gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.35,'rgba(255,255,255,.55)');gr.addColorStop(.7,'rgba(255,255,255,.15)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,64,64);return TD.glowT=new THREE.CanvasTexture(c)}
function tdBeamTex(){if(TD.beamT)return TD.beamT;const c=document.createElement('canvas');c.width=128;c.height=64;const g=c.getContext('2d'),im=g.createImageData(128,64);
  for(let y=0;y<64;y++)for(let x=0;x<128;x++){const u=x/127,v=Math.abs(y-31.5)/32,w=.25+.75*u,a=Math.max(0,1-v/w)*Math.pow(1-u,1.4)*Math.min(1,u*8);const k=(y*128+x)*4;im.data[k]=im.data[k+1]=im.data[k+2]=255;im.data[k+3]=a*255|0}
  g.putImageData(im,0,0);return TD.beamT=new THREE.CanvasTexture(c)}
function tdNightM(tex,col){const m=new THREE.MeshBasicMaterial({map:tex,color:tdC(col),transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2});(TD.nightMs=TD.nightMs||[]).push(m);return m}
{const _c=tdCar;tdCar=function(col,type){const g=_c(col,type);try{if(!TD.beamM)TD.beamM=tdNightM(tdBeamTex(),'#fff1c8');if(!TD.beamG)TD.beamG=new THREE.PlaneGeometry(2.2,1.3).rotateX(-Math.PI/2);
  const bb=new THREE.Box3().setFromObject(g),b=new THREE.Mesh(TD.beamG,TD.beamM);b.position.set(bb.max.x+1.05,.03,0);b.renderOrder=2;g.add(b)}catch(e){}return g}}
function tdNight(sc){
  const L=LAMPS,m=tdNightM(tdGlowTex(),'#ffb764'),im=new THREE.InstancedMesh(new THREE.PlaneGeometry(2.8,2.8).rotateX(-Math.PI/2),m,L.length),o=new THREE.Object3D();
  L.forEach(([x,y],i)=>{o.position.set(x+.28,.07,y);o.updateMatrix();im.setMatrixAt(i,o.matrix)});im.renderOrder=2;sc.add(im);
  // stelle
  const r=seeded(777),P=[];for(let i=0;i<500;i++){const a=r()*6.283,e=.08+Math.pow(r(),.7)*1.4;P.push(Math.cos(a)*Math.cos(e)*150,Math.sin(e)*150,Math.sin(a)*Math.cos(e)*150)}
  const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.Float32BufferAttribute(P,3));
  TD.starM=new THREE.PointsMaterial({color:0xffffff,size:1.6,sizeAttenuation:false,transparent:true,opacity:0,fog:false,depthWrite:false});TD.stars=new THREE.Points(sg,TD.starM);TD.stars.frustumCulled=false;sc.add(TD.stars);
  // luna
  {const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d'),gr=g.createRadialGradient(64,64,20,64,64,64);gr.addColorStop(0,'rgba(255,250,230,.55)');gr.addColorStop(1,'rgba(255,250,230,0)');g.fillStyle=gr;g.fillRect(0,0,128,128);
    g.fillStyle='#fbf6e4';g.beginPath();g.arc(64,64,22,0,6.283);g.fill();g.fillStyle='rgba(180,175,160,.45)';[[56,58,5],[70,70,4],[66,52,3],[58,72,3]].forEach(([x,y,q])=>{g.beginPath();g.arc(x,y,q,0,6.283);g.fill()});
    TD.moon=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,opacity:0,fog:false,depthWrite:false}));TD.moon.scale.set(16,16,1);sc.add(TD.moon)}}
{const _b=tdBuildCity;tdBuildCity=function(){const r=_b.apply(this,arguments);try{tdNight(TD.city.sc)}catch(e){console.warn('night',e)}return r}}
{const _l=tdLight;tdLight=function(){_l.apply(this,arguments);const d=Math.min(1,gtaDark()/.5),k=d>.15?Math.min(1,(d-.15)/.4):0;
  (TD.nightMs||[]).forEach(m=>m.opacity=k*(m===TD.beamM?.55:.5));
  if(TD.stars){TD.stars.position.copy(TD.cam.position);TD.starM.opacity=k*.9}
  if(TD.moon){TD.moon.position.copy(TD.cam.position).add(new THREE.Vector3(-70,60,-90));TD.moon.material.opacity=k}}}

/* ---------- stanze più vere: pavimento con grana, piante negli angoli, luce calda ---------- */
{const _r=tdBuildRoom;tdBuildRoom=function(sc){const r=_r.apply(this,arguments);try{tdRoomExtra(sc)}catch(e){console.warn('room',e)}return r}}
function tdRoomExtra(sc){const R=TD.room;if(!R)return;const S3=R.sc,fl=S3.children.find(o=>o.isMesh&&o.geometry.type==='PlaneGeometry'&&o.material.map===R.tex);if(fl)tdGrain(fl.material);
  const isW=(x,y)=>x<0||y<0||x>=sc.w||y>=sc.h||sc.t[y*sc.w+x]===9,busy=(x,y)=>sc.furn.some(f=>x>=f.x-.5&&x<f.x+f.w+.5&&y>=f.y-.5&&y<f.y+f.h+.5)||(Math.abs(x-sc.door.x)<2&&y>sc.h-4);
  const spots=[];const tryC=(x0,y0,dx,dy)=>{for(let k=0;k<4;k++){const x=x0+dx*k,y=y0+dy*k;if(!isW(x,y)&&isW(x-dx,y)&&!busy(x,y)){spots.push([x+.5-dx*.12,y+.5-dy*.12]);return}}};
  tryC(1,2,1,0);tryC(sc.w-2,2,-1,0);tryC(1,sc.h-2,1,0);tryC(sc.w-2,sc.h-2,-1,0);
  if(spots.length){const pot=new THREE.InstancedMesh(new THREE.CylinderGeometry(.13,.1,.26,12).translate(0,.13,0),tdMat('#b5643c'),spots.length),
    lf=new THREE.InstancedMesh(tdLeafGeo(.24),tdLeafMat(),spots.length*2),o=new THREE.Object3D();
    spots.forEach(([x,y],i)=>{o.position.set(x,0,y);o.scale.set(1,1,1);o.rotation.set(0,0,0);o.updateMatrix();pot.setMatrixAt(i,o.matrix);
      [[0,.48,0,1],[.05,.7,.03,.7]].forEach(([dx,dy,dz,s],k)=>{o.position.set(x+dx,dy,y+dz);o.scale.set(s,s*1.15,s);o.rotation.set(0,i+k,0);o.updateMatrix();lf.setMatrixAt(i*2+k,o.matrix);lf.setColorAt(i*2+k,tdC(k?'#4d8a3a':'#3a7030'))})});
    pot.castShadow=lf.castShadow=true;S3.add(pot,lf)}
  // ombre morbide sul pavimento lungo i muri e intorno ai mobili (la stanza sembra più vera)
  {if(!TD.aoT){const c=document.createElement('canvas');c.width=4;c.height=64;const g=c.getContext('2d'),gr=g.createLinearGradient(0,0,0,64);gr.addColorStop(0,'rgba(0,0,0,.42)');gr.addColorStop(.45,'rgba(0,0,0,.14)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,4,64);TD.aoT=new THREE.CanvasTexture(c)}
   const P=[],U=[],D=.4,y0=.004,strip=(ax,az,bx,bz,nx,nz,d)=>{const cx=ax+nx*d,cz=az+nz*d,ex=bx+nx*d,ez=bz+nz*d;P.push(ax,y0,az,bx,y0,bz,ex,y0,ez,ax,y0,az,ex,y0,ez,cx,y0,cz);U.push(0,1,1,1,1,0,0,1,1,0,0,0)};
   const fl=(x,y)=>x>=0&&y>=0&&x<sc.w&&y<sc.h&&!isW(x,y);
   for(let y=0;y<sc.h;y++)for(let x=0;x<sc.w;x++){if(!isW(x,y))continue;if(fl(x,y+1))strip(x,y+1,x+1,y+1,0,1,D);if(fl(x,y-1))strip(x+1,y,x,y,0,-1,D);if(fl(x+1,y))strip(x+1,y+1,x+1,y,1,0,D);if(fl(x-1,y))strip(x,y,x,y+1,-1,0,D)}
   sc.furn.forEach(f=>{if(f.walk)return;const d=.22,a=f.x+.03,b=f.y+.03,c=f.x+f.w-.03,e=f.y+f.h-.03;strip(a,e,c,e,0,1,d);strip(c,b,a,b,0,-1,d);strip(c,e,c,b,1,0,d);strip(a,b,a,e,-1,0,d)});
   if(P.length){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));
     const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({map:TD.aoT,transparent:true,depthWrite:false,color:0x000000,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));m.renderOrder=1;S3.add(m)}}
  // una luce calda al centro della stanza
  const pl=new THREE.PointLight(0xffe2b0,.35,Math.max(sc.w,sc.h)*1.1);pl.position.set(sc.w/2,R.WH+.6,sc.h/2);S3.add(pl)}

/* ---------- guida: la macchina si inclina in curva e in frenata, la visuale si allarga con la velocità ---------- */
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{tdCarFeel(dt)}catch(e){}return r}}
function tdCarFeel(dt){const me=TD.me,c=me&&me.car&&TD.cars.find(c=>c.g.parent&&Math.abs(c.g.position.x-me.x)<.01&&Math.abs(c.g.position.z-me.y)<.01);
  if(!c||dt<=0){TD.cf=null;return}const a=-c.g.rotation.y;let F=TD.cf;if(!F||F.g!==c.g){if(!F)TD.yaw=a;F=TD.cf={g:c.g,a,x:me.x,y:me.y,v:0,roll:0,pitch:0}}
  const v=Math.hypot(me.x-F.x,me.y-F.y)/dt,da=wrapA(a-F.a)/dt,acc=(v-F.v)/dt;F.a=a;F.x=me.x;F.y=me.y;F.vs=(F.vs||0)+(v-(F.vs||0))*Math.min(1,dt*4);F.v=v;
  const tr=Math.max(-.075,Math.min(.075,-da*.03*Math.min(1,F.vs/2.5))),tp=Math.max(-.035,Math.min(.035,acc*.006));
  F.roll+=(tr-F.roll)*Math.min(1,dt*5);F.pitch+=(tp-F.pitch)*Math.min(1,dt*4);c.g.rotation.order='YXZ';c.g.rotation.x=F.roll;c.g.rotation.z=F.pitch}
{const _c=tdCamera;tdCamera=function(dt,city){_c.apply(this,arguments);const C=TD.cam,base=C.aspect<1?72:58,tg=base+(TD.me&&TD.me.car&&TD.cf?Math.min(9,(TD.cf.vs||0)*1.6):0);
  const f=C.fov+(tg-C.fov)*Math.min(1,dt*2.5);if(Math.abs(f-C.fov)>.02){C.fov=f;C.updateProjectionMatrix()}}}

/* ---------- velocità: palme e alberi divisi a zone; le zone lontane (nella nebbia) non si disegnano ---------- */
function tdSplitInst(root){const skip=new Set();Object.values(TD).forEach(v=>{if(v&&v.isInstancedMesh)skip.add(v)});if(TD.sem&&TD.sem.li)skip.add(TD.sem.li);(TD.cityPick||[]).forEach(o=>skip.add(o));
  const list=[];root.traverse(o=>{if(!o.isInstancedMesh||skip.has(o)||o.count<40)return;const g=o.geometry,t=(g.index?g.index.count:g.attributes.position.count)/3*o.count;if(t>20000)list.push(o)});
  TD.cullL=TD.cullL||[];const m4=new THREE.Matrix4(),v=new THREE.Vector3(),col=new THREE.Color(),CH=32;
  list.forEach(o=>{const g=o.geometry;if(!g.boundingSphere)g.computeBoundingSphere();const gr=g.boundingSphere.radius+g.boundingSphere.center.length(),B=new Map();
    for(let i=0;i<o.count;i++){o.getMatrixAt(i,m4);v.setFromMatrixPosition(m4);const k=Math.floor(v.x/CH)+','+Math.floor(v.z/CH);if(!B.has(k))B.set(k,[]);B.get(k).push(i)}
    if(B.size<2||!o.parent)return;const par=o.parent;
    B.forEach(ids=>{const g2=new THREE.BufferGeometry();g2.index=g.index;for(const k in g.attributes)g2.attributes[k]=g.attributes[k];g2.groups=g.groups;
      const n=new THREE.InstancedMesh(g2,o.material,ids.length),bx=new THREE.Box3();let sM=1;
      ids.forEach((id,j)=>{o.getMatrixAt(id,m4);n.setMatrixAt(j,m4);v.setFromMatrixPosition(m4);bx.expandByPoint(v);sM=Math.max(sM,m4.getMaxScaleOnAxis());if(o.instanceColor){o.getColorAt(id,col);n.setColorAt(j,col)}});
      const sp=new THREE.Sphere();bx.getBoundingSphere(sp);sp.radius+=gr*sM;g2.boundingSphere=sp;
      n.castShadow=o.castShadow;n.receiveShadow=o.receiveShadow;n.renderOrder=o.renderOrder;n.position.copy(o.position);n.quaternion.copy(o.quaternion);n.scale.copy(o.scale);
      par.add(n);TD.cullL.push(n)});
    par.remove(o)})}
{const _b=tdBuildCity;tdBuildCity=function(){const r=_b.apply(this,arguments);try{tdSplitInst(TD.city.sc)}catch(e){console.warn('split',e)}return r}}
// anche i pezzi fermi della città (palazzi uniti a blocchi, marciapiedi...) lontani nella nebbia non si disegnano
function tdStaticCull(root){const L=TD.cullS=[],v=new THREE.Vector3();root.updateMatrixWorld(true);root.traverse(o=>{if(!o.isMesh||o.isInstancedMesh)return;const ms=[].concat(o.material);if(ms.some(m=>m.fog===false))return;
  const g=o.geometry;if(!g.boundingSphere)g.computeBoundingSphere();const bs=g.boundingSphere;if(!bs||bs.radius>40)return;v.copy(bs.center).applyMatrix4(o.matrixWorld);L.push([o,v.x,v.z,bs.radius*o.matrixWorld.getMaxScaleOnAxis()])})}
{const _b=tdBuildCity;tdBuildCity=function(){const r=_b.apply(this,arguments);try{tdStaticCull(TD.city.sc)}catch(e){console.warn('scull',e)}return r}}
{const _r=tdRender;tdRender=function(t){if(TD.cullL&&TD.cam&&(TD.t%6===0)){const c=TD.cam.position;TD.cullL.forEach(n=>{const s=n.geometry.boundingSphere,d=Math.hypot(s.center.x-c.x,s.center.z-c.z)-s.radius;n.visible=n.userData.grass?TD.hq&&d<26:d<52});(TD.cullS||[]).forEach(([o,x,z,r])=>{o.visible=Math.hypot(x-c.x,z-c.z)-r<52})}return _r(t)}}

/* ---------- acqua vera nei laghetti: si muove, riflette il cielo, bordo di pietra ---------- */
function tdWater(sc){const P=[],B=[];for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(map[y*W+x]!==3)continue;P.push(x,.035,y,x,.035,y+1,x+1,.035,y+1,x,.035,y,x+1,.035,y+1,x+1,.035,y);
    [[0,-1],[0,1],[-1,0],[1,0]].forEach(([dx,dy])=>{const v=at(x+dx,y+dy);if(v===3)return;B.push(dx?[x+(dx>0?1:0),y+.5,.12,1.12]:[x+.5,y+(dy>0?1:0),1.12,.12])})}
  if(!P.length)return;const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));const N=[];for(let i=0;i<P.length/3;i++)N.push(0,1,0);g.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));
  const m=new THREE.MeshStandardMaterial({color:tdC('#1b5470'),roughness:.12,metalness:.1,transparent:true,opacity:.93,envMapIntensity:1});TD.waterU={value:0};TD.envMats.push(m);
  m.customProgramCacheKey=()=>'water9';m.onBeforeCompile=sh=>{sh.uniforms.uTw=TD.waterU;sh.vertexShader=sh.vertexShader.replace('void main() {','varying vec3 vWp9;\nvoid main() {').replace('#include <project_vertex>','#include <project_vertex>\n  vWp9=(modelMatrix*vec4(transformed,1.0)).xyz;');
    sh.fragmentShader=sh.fragmentShader.replace('void main() {','varying vec3 vWp9;uniform float uTw;\nvoid main() {').replace('#include <normal_fragment_maps>','#include <normal_fragment_maps>\n  {vec2 q=vWp9.xz;float t=uTw;vec3 n2=normalize(vec3(sin(q.x*3.1+t*1.3)*.04+sin(q.y*5.7-t*1.9)*.03+sin((q.x+q.y)*9.0+t*2.6)*.015,1.0,cos(q.y*3.3+t*1.1)*.04+cos(q.x*6.3+t*.8)*.028));normal=normalize((viewMatrix*vec4(n2,0.0)).xyz);}')};
  const w=new THREE.Mesh(g,m);w.receiveShadow=true;sc.add(w);
  if(B.length){const im=new THREE.InstancedMesh(tdBox(1,.09,1),tdMat('#b9b2a4'),B.length),o=new THREE.Object3D();B.forEach(([x,z,sx,sz],i)=>{o.position.set(x,.045,z);o.scale.set(sx,1,sz);o.updateMatrix();im.setMatrixAt(i,o.matrix)});im.castShadow=im.receiveShadow=true;im.frustumCulled=false;sc.add(im)}}
{const _b=tdBuildCity;tdBuildCity=function(){const r=_b.apply(this,arguments);try{tdWater(TD.city.sc)}catch(e){console.warn('water',e)}return r}}
{const _r=tdRender;tdRender=function(t){if(TD.waterU)TD.waterU.value=TD.time||0;return _r(t)}}

/* ---------- ciuffi d'erba e fiori sui prati (divisi a zone, quelli lontani non si disegnano) ---------- */
function tdTuftTex(fl){const k=fl?'tuftF':'tuftG';if(TD[k])return TD[k];const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),r=seeded(fl?77:55);
  for(let i=0;i<26;i++){const x=6+r()*52,h=22+r()*36,b=r()*8-4,v=fl?0:r();g.strokeStyle=`rgb(${92+v*40|0},${150+v*45|0},${58+v*25|0})`;g.lineWidth=2+r()*2;g.beginPath();g.moveTo(x,64);g.quadraticCurveTo(x+b*.5,64-h*.6,x+b,64-h);g.stroke()}
  if(fl){const cols=['#ffd23a','#ff6fa8','#ffffff','#b48cff','#ff8a3a'];for(let i=0;i<6;i++){const x=10+r()*44,y=8+r()*26;g.fillStyle=cols[i%cols.length];for(let a=0;a<5;a++){g.beginPath();g.arc(x+Math.cos(a*1.257)*3,y+Math.sin(a*1.257)*3,2.6,0,7);g.fill()}g.fillStyle='#ffcf33';g.beginPath();g.arc(x,y,1.8,0,7);g.fill()}}
  const t=new THREE.CanvasTexture(c);return TD[k]=t}
function tdGrass(sc){const geo=new THREE.PlaneGeometry(.3,.19,1,1).translate(0,.095,0),g2=geo.clone().rotateY(Math.PI/2),P=[];
  const merged=new THREE.BufferGeometry();{const A=geo.toNonIndexed(),Bq=g2.toNonIndexed(),cat=k=>{const a=A.attributes[k].array,b=Bq.attributes[k].array,o=new Float32Array(a.length+b.length);o.set(a);o.set(b,a.length);return o};
    merged.setAttribute('position',new THREE.BufferAttribute(cat('position'),3));merged.setAttribute('uv',new THREE.BufferAttribute(cat('uv'),2));const N=new Float32Array(merged.attributes.position.count*3);for(let i=1;i<N.length;i+=3)N[i]=1;merged.setAttribute('normal',new THREE.BufferAttribute(N,3))}const CH=32,B=new Map(),r=seeded(2024);
  for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){if(map[y*W+x]!==0||inMZ(x,y))continue;const q=r();if(q>.45)continue;const n=1+(q<.15?2:q<.3?1:0);
    for(let k=0;k<n;k++){const px=x+.12+r()*.76,pz=y+.12+r()*.76,fl=r()<.18,key=Math.floor(px/CH)+','+Math.floor(pz/CH)+(fl?'f':'g');if(!B.has(key))B.set(key,[]);B.get(key).push([px,pz,.7+r()*.6,r()*3.14])}}
  const mats={g:new THREE.MeshLambertMaterial({map:tdTuftTex(0),alphaTest:.5,side:THREE.DoubleSide}),f:new THREE.MeshLambertMaterial({map:tdTuftTex(1),alphaTest:.5,side:THREE.DoubleSide})},o=new THREE.Object3D();
  TD.cullL=TD.cullL||[];B.forEach((L,key)=>{const im=new THREE.InstancedMesh(merged,mats[key.slice(-1)],L.length),bx=new THREE.Box3(),v=new THREE.Vector3();
    L.forEach(([x,z,s,a],i)=>{o.position.set(x,0,z);o.rotation.set(0,a,0);o.scale.set(s,s,s);o.updateMatrix();im.setMatrixAt(i,o.matrix);bx.expandByPoint(v.set(x,0,z))});
    const g3=new THREE.BufferGeometry();g3.index=merged.index;for(const k in merged.attributes)g3.attributes[k]=merged.attributes[k];const sp=new THREE.Sphere();bx.getBoundingSphere(sp);sp.radius+=.5;g3.boundingSphere=sp;im.geometry=g3;
    im.receiveShadow=true;im.userData.grass=1;sc.add(im);TD.cullL.push(im)})}
{const _b=tdBuildCity;tdBuildCity=function(){const r=_b.apply(this,arguments);try{tdGrass(TD.city.sc)}catch(e){console.warn('grass',e)}return r}}
// camminata più vera: il passo segue la strada fatta (niente piedi che scivolano), parte e si ferma piano,
// il corpo va su e giù e ondeggia, di corsa si piega in avanti; da fermi respirano muovendo appena le braccia
{const _p=tdPlace;tdPlace=function(e,x,y,moving,ph,dir,dt,scn){const ox=e.px,oy=e.py;_p.apply(this,arguments);
  try{if(!e.legs||!e.legs.length||!e.arms||!e.arms.length)return;
    const d=ox==null?0:Math.min(.5,Math.hypot(x-ox,y-oy)),sc=e.g.scale.x||1,sp=dt>0?d/dt:0;
    e.sp9=(e.sp9||0)+(Math.min(sp,9)-(e.sp9||0))*Math.min(1,dt*6);
    e.wk=(e.wk||0)+((moving&&e.sp9>.12?1:0)-(e.wk||0))*Math.min(1,dt*7);
    const run=Math.min(1,Math.max(0,(e.sp9-2.2)/1.6)),stride=(1.05+.55*run)*sc;
    e.wp=(e.wp||0)+d/stride*Math.PI*2;
    const k=e.wk,p=e.wp,sw=Math.sin(p)*(.48+.32*run)*k,t=performance.now()/1000;if(e.ib9==null)e.ib9=Math.random()*6;
    const idle=(1-k)*(.02+.02*Math.sin(t*1.6+e.ib9));
    e.legs.forEach((l,i)=>l.rotation.z=i%2?sw:-sw);
    e.arms.forEach((a,i)=>a.rotation.z=(i%2?-sw:sw)*(.8+.35*run)+idle);
    e.g.rotation.order='YZX';e.g.rotation.x=Math.sin(p)*.028*k;e.g.rotation.z=-(.025+.08*run)*k;
    e.g.position.y=Math.abs(Math.cos(p))*(.016+.022*run)*k*sc}catch(err){}}}
// mobili veri in 3D: tavoli e banchi con le gambe, sedie a scuola, piante vere nel vaso, divani con lo schienale,
// scaffali pieni di prodotti e librerie piene di libri; le stanze bianche non sono più "accecanti"
const TD_LEGS=new Set(['table','sdesk','mydesk','pcdesk','desk2','scrivania','rtable','desk','bench','exambed','hbed']);
function tdShelfTex(kind){TD.shT=TD.shT||{};if(TD.shT[kind])return TD.shT[kind];const [c,g]=tdCan(128,128),r=seeded(kind==='book'?77:55),bk=kind==='book';
  g.fillStyle=bk?'#6e4526':'#d9d4ca';g.fillRect(0,0,128,128);
  for(let row=0;row<3;row++){const y0=5+row*41,hh=34;g.fillStyle=bk?'#3a2412':'#8d8a84';g.fillRect(0,y0+hh,128,5);let x=3;
    while(x<123){const w=bk?3+Math.floor(r()*5):9+Math.floor(r()*9),h=bk?hh-Math.floor(r()*9):hh-5-Math.floor(r()*11),ww=Math.min(w,124-x);
      g.fillStyle=['#e5484d','#3b6fe0','#16a34a','#f5a700','#9b5de5','#f97316','#0ea5e9','#be123c','#f4f1ea'][Math.floor(r()*9)];g.fillRect(x,y0+hh-h,ww,h);
      g.fillStyle=bk?'rgba(255,255,255,.35)':'rgba(255,255,255,.6)';if(bk)g.fillRect(x+1,y0+hh-h+4,Math.max(1,ww-2),1.5);else{g.fillRect(x+2,y0+hh-h+3,ww-4,3);g.fillStyle='rgba(0,0,0,.18)';g.fillRect(x+ww-2,y0+hh-h,2,h)}
      x+=w+1}}
  g.fillStyle='rgba(0,0,0,.28)';g.fillRect(0,0,3,128);g.fillRect(125,0,3,128);g.fillRect(0,0,128,4);
  return TD.shT[kind]=tdTex(c,true)}
function tdFurn3D(sc){const R=TD.room;if(!R)return;const S3=R.sc,inv=new THREE.MeshBasicMaterial({colorWrite:false,depthWrite:false}),parts=[],leaves=[],palms=[];
  const isW=(x,y)=>x<0||y<0||x>=sc.w||y>=sc.h||sc.t[y*sc.w+x]===9,legG=new THREE.CylinderGeometry(.022,.017,1,6).translate(0,.5,0);
  const metal=new Set(['pcdesk','desk2','sdesk','exambed','hbed']);
  S3.children.slice().forEach(m=>{const i=m.userData.fu;if(i==null||!m.isMesh||!m.geometry.parameters||m.geometry.type!=='BoxGeometry')return;const f=sc.furn[i];if(!f)return;
    const h=TD_FH[f.k]!=null?TD_FH[f.k]:.42,P=m.geometry.parameters,bw=P.width,bd=P.depth,cx=m.position.x,cz=m.position.z;
    if(TD_LEGS.has(f.k)){const th=Math.min(.055,h*.22),lc=metal.has(f.k)?'#5b6068':'#4f3523';m.scale.y=th/h;m.position.y=h-th/2;
      const ix=bw/2-.06,iz=bd/2-.06;[[-ix,-iz],[ix,-iz],[-ix,iz],[ix,iz]].forEach(([dx,dz])=>parts.push({g:legG,c:lc,p:[cx+dx,0,cz+dz],s:[1,h-th,1]}));
      if(bw>2.2)[[0,-iz],[0,iz]].forEach(([dx,dz])=>parts.push({g:legG,c:lc,p:[cx+dx,0,cz+dz],s:[1,h-th,1]}));
      if(f.k==='sdesk'||f.k==='mydesk'){const uv=m.geometry.attributes.uv,pos=m.geometry.attributes.position;
        for(let v=8;v<12;v++){const ux=(pos.getX(v)+bw/2)/bw,uz=(pos.getZ(v)+bd/2)/bd;uv.setXY(v,(f.x+(5+ux*(T*f.w-10))/T)/sc.w,1-(f.y+(6+uz*(T*f.h-20))/T)/sc.h)}uv.needsUpdate=true;
        const sz=cz+bd/2+.2,sb=new THREE.BoxGeometry(.3,.035,.27),bb=new THREE.BoxGeometry(.3,.24,.03),cc=f.k==='mydesk'?'#e5484d':'#3b6fe0';
        parts.push({g:sb,c:cc,p:[cx,.2,sz]},{g:bb,c:cc,p:[cx,.35,sz+.13],r:[-.08,0,0]});[[-.12,-.11],[.12,-.11],[-.12,.11],[.12,.11]].forEach(([dx,dz])=>parts.push({g:legG,c:'#5b6068',p:[cx+dx,0,sz+dz],s:[.8,.19,.8]}))}
      return}
    if(f.k==='ctable'){m.material=inv;m.castShadow=false;const top=new THREE.CylinderGeometry(Math.min(bw,bd)/2,Math.min(bw,bd)/2,.04,22);
      parts.push({g:top,c:'#f4f2ee',p:[cx,h-.02,cz]},{g:legG,c:'#8a8f98',p:[cx,0,cz],s:[1.6,h-.04,1.6]},{g:new THREE.CylinderGeometry(.13,.15,.025,16),c:'#8a8f98',p:[cx,.012,cz]});return}
    if(f.k==='plant'){m.material=inv;m.castShadow=false;parts.push({g:new THREE.CylinderGeometry(.15,.11,.3,12),c:'#b5643c',p:[cx,.15,cz]},{g:new THREE.CylinderGeometry(.135,.135,.02,12),c:'#4a3424',p:[cx,.3,cz]});
      leaves.push([cx,.5,cz,1.05,i],[cx+.06,.74,cz-.03,.75,i+1],[cx-.07,.64,cz+.05,.7,i+2]);return}
    if(f.k==='palm'){m.material=inv;m.castShadow=false;palms.push([cx,cz,i]);return}
    if(f.k==='sofa'){const back=isW(f.x,f.y-1)||!isW(f.x,f.y+f.h)?-1:1,sh2=.18,col='#'+m.material[0].color.clone().convertLinearToSRGB().getHexString();
      m.scale.y=sh2/h;m.position.y=sh2/2;parts.push({g:new THREE.BoxGeometry(bw,.26,.14),c:shade(col,.92),p:[cx,.28,cz+back*(bd/2-.07)]});
      if(bw>=.9)[-1,1].forEach(s=>parts.push({g:new THREE.BoxGeometry(.12,.14,bd),c:shade(col,.95),p:[cx+s*(bw/2-.06),.25,cz]}));
      parts.push({g:new THREE.BoxGeometry(.18,.12,.06),c:shade(col,1.25),p:[cx-bw/4,.24,cz+back*(bd/2-.17)],r:[back*.35,0,.1]});return}
    if(f.k==='shelf'||f.k==='bookshelf'||f.k==='gshelf'){const k=f.k==='bookshelf'?'book':'prod';TD.shM=TD.shM||{};const sm=TD.shM[k]||(TD.shM[k]=new THREE.MeshLambertMaterial({map:tdShelfTex(k)}));
      const uv=m.geometry.attributes.uv;for(let v=0;v<24;v++){if(v>=8&&v<16)continue;const L=v<8?bd:bw;uv.setX(v,uv.getX(v)*Math.max(1,Math.round(L)))}uv.needsUpdate=true;
      const M=m.material.slice();[0,1,4,5].forEach(j=>M[j]=sm);m.material=M}});
  if(parts.length){const cm=tdCM(parts,true);cm.receiveShadow=true;S3.add(cm)}
  if(leaves.length){const lf=new THREE.InstancedMesh(tdLeafGeo(.26),tdLeafMat(),leaves.length),o=new THREE.Object3D();
    leaves.forEach(([x,y,z,s,k],j)=>{o.position.set(x,y,z);o.rotation.set(0,k*1.7,0);o.scale.set(s,s*1.15,s);o.updateMatrix();lf.setMatrixAt(j,o.matrix);lf.setColorAt(j,tdC(['#3a7030','#4d8a3a','#2f6a32'][j%3]))});lf.castShadow=true;S3.add(lf)}
  if(palms.length){const im=new THREE.InstancedMesh(tdPalmGeo(),new THREE.MeshLambertMaterial({vertexColors:true,side:THREE.DoubleSide}),palms.length),o=new THREE.Object3D();
    palms.forEach(([x,z,k],j)=>{o.position.set(x,0,z);o.rotation.set(0,k*2.3,0);o.scale.setScalar(.62);o.updateMatrix();im.setMatrixAt(j,o.matrix)});im.castShadow=true;S3.add(im)}
  // esposizione: nelle stanze col pavimento chiaro abbassiamo un po' la luce
  try{const im=R.img,d=im.getContext('2d').getImageData(0,0,im.width,im.height).data;let s=0,n=0;for(let k=0;k<d.length;k+=4*97){s+=(.299*d[k]+.587*d[k+1]+.114*d[k+2])/255;n++}
    const lum=n?s/n:.5;R.lum=lum;R.ex9=lum>.55?Math.max(.8,1.05-.7*(lum-.55)):1.05}catch(e){}}
{const _r=tdRoomExtra;tdRoomExtra=function(sc){_r.apply(this,arguments);try{tdFurn3D(sc)}catch(e){console.warn('mobili3d',e)}}}
{const _pp=tdPost;tdPost=function(scn){try{if(TD.room&&scn===TD.room.sc&&TD.room.ex9&&TD.pp)TD.pp.fin.uniforms.ex.value=TD.room.ex9}catch(e){}return _pp.apply(this,arguments)}}
// più varietà tra le persone (come i passanti di GTA): zainetti per bambini e ragazzi, cappellini, borse a tracolla
{const _h=tdHuman;tdHuman=function(lk){const r=_h.apply(this,arguments);try{const ag=lk.age;if(ag==='baby'||!r||!r.g)return r;const h=hsh(JSON.stringify(lk)),f=!!lk.f,g=r.g,L=.31,dL=L*(ag==='kid'?.06:.14);
  const cols=['#e5484d','#2d6cdf','#16a34a','#f5a700','#1f2540','#9b5de5','#f97316'],head=g.children.find(o=>o.isMesh&&o.geometry===tdHeadG);
  if((ag==='kid'||ag==='teen')&&h%10<7){const c=cols[(h>>>4)%cols.length],y=L+dL+.165;
    const bp=tdCM([{g:new THREE.BoxGeometry(.1,.18,.17),c,p:[-.1,y,0]},{g:new THREE.BoxGeometry(.04,.08,.12),c:shade(c,.78),p:[-.155,y-.04,0]},{g:new THREE.BoxGeometry(.03,.012,.15),c:shade(c,.6),p:[-.1,y+.095,0]},
      {g:new THREE.BoxGeometry(.016,.2,.022),c:'#26262b',p:[-.035,y+.02,.075],r:[0,0,-.15]},{g:new THREE.BoxGeometry(.016,.2,.022),c:'#26262b',p:[-.035,y+.02,-.075],r:[0,0,-.15]}],true);g.add(bp)}
  else if(!f&&(ag==='adult'||ag==='teen')&&(h>>>3)%10<2&&head){const c=cols[(h>>>9)%cols.length],cg=new THREE.SphereGeometry(.101,18,9,0,Math.PI*2,0,Math.PI/2);cg.scale(1,.95,.97);
    const cap=tdCM([{g:cg,c,p:[0,.012,0]},{g:new THREE.CylinderGeometry(.103,.103,.012,18),c:shade(c,.85),p:[0,.014,0]},{g:new THREE.BoxGeometry(.085,.009,.12),c:shade(c,.8),p:[.098,.012,0],r:[0,0,-.16]},{g:new THREE.SphereGeometry(.012,8,6),c:shade(c,.7),p:[0,.108,0]}],true);head.add(cap)}
  if(f&&(ag==='adult'||ag==='old')&&(h>>>6)%10<3&&r.arms&&r.arms[0]){const c=['#7a4a2a','#1f1f22','#b0322a','#c99a6a'][(h>>>8)%4],a=r.arms[0];
    const bag=tdCM([{g:new THREE.BoxGeometry(.075,.065,.032),c,p:[0,-.2,-.035]},{g:new THREE.BoxGeometry(.006,.17,.006),c:shade(c,.7),p:[.025,-.1,-.03]},{g:new THREE.BoxGeometry(.006,.17,.006),c:shade(c,.7),p:[-.025,-.1,-.03]},{g:new THREE.BoxGeometry(.02,.012,.034),c:'#d9b44a',p:[0,-.172,-.035]}],true);a.add(bag)}
  }catch(e){}return r}}
// luci dei freni: quando una macchina si ferma (al semaforo o in coda) i fanali dietro si accendono rossi forti
function tdBrakeSpec(lg){TD.brkS=TD.brkS||new Map();if(TD.brkS.has(lg))return TD.brkS.get(lg);let spec=null;
  const p=lg.attributes.position,c=lg.attributes.color;if(c){let red=0;for(let i=0;i<p.count;i++)if(c.getX(i)>.35&&c.getY(i)<.2)red+=p.getX(i)<0?-1:1;
    if(red){const sg=red<0?-1:1;let ex=sg<0?1e9:-1e9;for(let i=0;i<p.count;i++){const x=p.getX(i);if(sg<0?x<ex:x>ex)ex=x}
      const box={};for(let i=0;i<p.count;i++){if(Math.abs(p.getX(i)-ex)>.06)continue;const z=p.getZ(i),k=z<0?'a':'b',B=box[k]||(box[k]={z0:1e9,z1:-1e9,y0:1e9,y1:-1e9});B.z0=Math.min(B.z0,z);B.z1=Math.max(B.z1,z);B.y0=Math.min(B.y0,p.getY(i));B.y1=Math.max(B.y1,p.getY(i))}
      if(box.a&&box.b)spec=[box.a,box.b].map(B=>{const w=Math.min(.2,B.z1-B.z0+.012),h=Math.min(.12,B.y1-B.y0+.012);return {pl:new THREE.PlaneGeometry(w,h),hl:new THREE.PlaneGeometry(w*2.6,h*3.2),x:ex+sg*.011,hx:ex+sg*.021,y:(B.y0+B.y1)/2,z:(B.z0+B.z1)/2}})}}
  TD.brkS.set(lg,spec);return spec}
function tdBrakeFor(g){if(g.userData.brk!==undefined)return g.userData.brk;g.userData.brk=null;const lm=g.children.find(o=>o.isMesh&&o.material===TD.carLightM);if(!lm)return null;const spec=tdBrakeSpec(lm.geometry);if(!spec)return null;
  if(!TD.brkM){TD.brkM=new THREE.MeshBasicMaterial({color:new THREE.Color(2.2,.06,.04),side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2});const [hc,hg]=tdCan(64,64),gr=hg.createRadialGradient(32,32,2,32,32,31);gr.addColorStop(0,'rgba(255,60,40,.85)');gr.addColorStop(1,'rgba(255,30,20,0)');hg.fillStyle=gr;hg.fillRect(0,0,64,64);TD.brkH=new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(hc),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide})}
  const G=new THREE.Group();spec.forEach(q=>{const m=new THREE.Mesh(q.pl,TD.brkM),hm=new THREE.Mesh(q.hl,TD.brkH);m.position.set(q.x,q.y,q.z);hm.position.set(q.hx,q.y,q.z);m.rotation.y=hm.rotation.y=Math.PI/2;G.add(m,hm)});
  G.visible=false;g.add(G);return g.userData.brk=G}
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{if(city&&TD.cars){const now=performance.now()/1000;TD.cars.forEach(c=>{if(!c||!c.g.parent)return;const p=c.g.position;
  if(c.t9==null||now-c.t9>4){c.t9=now;c.px9=p.x;c.pz9=p.z;return}if(now-c.t9<.3)return;const v=Math.hypot(p.x-c.px9,p.z-c.pz9)/(now-c.t9);c.t9=now;c.px9=p.x;c.pz9=p.z;
  const B=tdBrakeFor(c.g);if(B)B.visible=v<.3})}}catch(e){}return r}}
// dopo aver "disegnato" un pezzo di terra, la tela 2D sopra al 3D resta sempre pulita (niente pezzi di mappa sul bordo)
{const _b=tdBake;tdBake=function(){const r=_b.apply(this,arguments);try{cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,cv.width,cv.height)}catch(e){}return r}}
{const _o=tdOverlay;tdOverlay=function(){try{cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,cv.width,cv.height)}catch(e){}return _o.apply(this,arguments)}}
