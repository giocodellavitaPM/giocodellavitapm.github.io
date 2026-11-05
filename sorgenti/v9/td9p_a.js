/* ================= macchine e persone realistiche (forme morbide, dettagli) ================= */
// "loft": una forma fatta di anelli ovali uno dopo l'altro (come si modellano carrozzerie e corpi)
function tdLoft(R,M,col,ax){const P=[],C=[],I=[],c=new THREE.Color(),Nr=R.length,ring=M+1;
  R.forEach((r,i)=>{for(let j=0;j<=M;j++){const a=j/M*Math.PI*2,ca=Math.cos(a),sa=Math.sin(a),e=2/(r.n||2),X=(r.x0||0)+r.rx*Math.sign(ca)*Math.pow(Math.abs(ca),e),Y=r.cy+r.ry*Math.sign(sa)*Math.pow(Math.abs(sa),e);
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
const tdI=new THREE.Matrix4();

/* ---------- macchine ---------- */
// [x, sotto, sopra, mezza larghezza] della carrozzeria e [x, cintura, tetto, mezza larghezza] dei vetri
const TD_CARS={
 berlina:{b:[[-.82,.17,.33,.3],[-.79,.13,.42,.35],[-.68,.11,.45,.37],[-.4,.1,.46,.375],[.1,.1,.455,.375],[.42,.1,.43,.37],[.64,.11,.4,.36],[.78,.13,.34,.34],[.83,.17,.26,.29]],
   g:[[-.55,.44,.47,.3],[-.42,.45,.62,.29],[-.25,.45,.66,.3],[.1,.45,.665,.3],[.3,.44,.5,.32],[.38,.43,.45,.33]],pil:[-.42,-.08,.3]},
 suv:{b:[[-.83,.2,.42,.33],[-.8,.17,.52,.37],[-.6,.16,.55,.385],[.2,.16,.55,.385],[.55,.16,.53,.38],[.75,.18,.47,.36],[.84,.22,.38,.32]],
   g:[[-.78,.53,.56,.33],[-.72,.54,.8,.32],[.2,.54,.81,.32],[.42,.53,.62,.34],[.5,.52,.55,.35]],pil:[-.72,-.22,.22,.45]},
 sportiva:{b:[[-.85,.15,.3,.33],[-.82,.12,.38,.39],[-.6,.1,.4,.41],[-.2,.1,.37,.42],[.2,.1,.33,.42],[.55,.1,.29,.4],[.8,.12,.25,.36],[.87,.15,.2,.3]],
   g:[[-.5,.37,.39,.3],[-.32,.375,.52,.29],[-.1,.37,.535,.29],[.08,.36,.47,.31],[.25,.34,.36,.34]],pil:[-.32,.12],spoiler:1},
 utilitaria:{b:[[-.66,.17,.4,.32],[-.64,.13,.47,.35],[-.5,.11,.48,.36],[.2,.11,.46,.36],[.45,.12,.42,.35],[.62,.14,.36,.33],[.68,.18,.28,.28]],
   g:[[-.6,.46,.5,.31],[-.55,.47,.7,.3],[.0,.47,.71,.3],[.2,.46,.52,.32],[.27,.45,.47,.33]],pil:[-.55,-.15,.2]},
 furgone:{b:[[-.9,.2,.82,.37],[-.88,.17,.86,.39],[.4,.17,.86,.39],[.55,.17,.8,.39],[.78,.18,.55,.37],[.9,.22,.42,.33]],
   g:[[.4,.55,.58,.36],[.45,.56,.82,.355],[.56,.56,.8,.36],[.7,.55,.57,.37]],pil:[.45,.62],noRoof:1},
};
TD_CARS.taxi=Object.assign({},TD_CARS.berlina,{taxi:1});
const TD_CARTYPES=['berlina','berlina','suv','utilitaria','sportiva','berlina','suv','furgone','taxi','utilitaria','sportiva'];
let tdPaintM=null,tdMatteM=null;
function tdCarGeo(type,col){
  const T9=TD_CARS[type]||TD_CARS.berlina,paint=type==='taxi'?'#f2c21a':col,pc=tdC(paint),dark=tdC('#0d1217'),trim=tdC('#1b1d20'),chrome=tdC('#c9ced3');
  const body=tdKeys(T9.b,30).map(([x,yb,yt,hw])=>({p:x,cy:(yb+yt)/2,ry:(yt-yb)/2,rx:hw,n:4.2}));
  const bodyG=tdLoft(body,20,(t,sa,ca,r,Y)=>Y<.17?trim:pc,'x');
  const pil=T9.pil||[];
  const gl=tdKeys(T9.g,22).map(([x,yb,yt,hw])=>({p:x,cy:yb,ry:(yt-yb),rx:hw,n:3.2}));
  const glG=tdLoft(gl,20,(t,sa,ca,r,Y)=>{const top=sa>.86&&!T9.noRoof||(T9.noRoof&&sa>.6),pl=pil.some(px=>Math.abs(r.p-px)<.035);return (sa<-.05)?pc:(top||pl)?pc:dark},'x');
  const L=[[bodyG,tdI],[glG,tdI]],B=[],LL=[],o3=new THREE.Object3D(),at=(g,p,r,s)=>{o3.position.set(...p);o3.rotation.set(...(r||[0,0,0]));o3.scale.set(...(s||[1,1,1]));o3.updateMatrix();return o3.matrix.clone()};
  const len=T9.b[T9.b.length-1][0],rear=T9.b[0][0],W2=Math.max(...T9.b.map(k=>k[3])),hgt=T9.b[2][2];
  // ruote: gomma + cerchio + mozzo
  const wx=[rear*.62,len*.66];
  wx.forEach(x=>[-1,1].forEach(s=>{B.push({g:new THREE.CylinderGeometry(.15,.15,.13,18),c:'#151515',p:[x,.15,s*(W2-.045)],r:[Math.PI/2,0,0]},{g:new THREE.CylinderGeometry(.155,.155,.11,18),c:'#0c0c0c',p:[x,.15,s*(W2-.045)],r:[Math.PI/2,0,0]});
    L.push([tdPaint(new THREE.CylinderGeometry(.095,.095,.135,14),chrome),at(null,[x,.15,s*(W2-.045)],[Math.PI/2,0,0])],[tdPaint(new THREE.CylinderGeometry(.035,.035,.14,8),tdC('#2a2d31')),at(null,[x,.15,s*(W2-.04)],[Math.PI/2,0,0])]);
    for(let k=0;k<5;k++)L.push([tdPaint(new THREE.BoxGeometry(.012,.17,.02),tdC('#8c9297')),at(null,[x,.15,s*(W2-.045+.068*s*0)+s*.069],[0,0,k/5*Math.PI*2])])}));
  // fari, luci dietro, griglia, targhe, specchietti
  const fy=T9.b[T9.b.length-2][2]-.06;for(const s of[-1,1]){LL.push({g:new THREE.SphereGeometry(.05,10,8),c:'#fffaf0',p:[len-.03,fy,s*(W2-.1)],s:[.5,.7,1.5]},{g:tdBox(.025,.045,.16),c:'#e3141c',p:[rear+.012,T9.b[1][2]-.07,s*(W2-.12)]});
    L.push([tdPaint(tdBox(.05,.035,.06),pc),at(null,[T9.g[1][0]+.04,T9.g[0][1]+.05,s*(T9.g[1][3]+.06)])])}
  B.push({g:tdBox(.02,.07,W2*.9),c:'#16181a',p:[len-.005,.22,0]},{g:tdBox(.015,.06,.2),c:'#f2f2ee',p:[rear-.005,.2,0]},{g:tdBox(.015,.05,.2),c:'#f2f2ee',p:[len+.005,.17,0]},
    {g:tdBox(.03,.05,W2*1.6),c:'#1a1c1f',p:[len-.01,.14,0]},{g:tdBox(.03,.05,W2*1.6),c:'#1a1c1f',p:[rear+.01,.15,0]});
  // linee delle portiere
  const dl=type==='furgone'?[.45]:[-.12,.28];dl.forEach(x=>[-1,1].forEach(s=>B.push({g:tdBox(.008,.26,.006),c:'#14161a',p:[x,.3,s*(W2+.002)]})));
  if(T9.spoiler)L.push([tdPaint(tdBox(.18,.025,W2*1.7),tdC('#121416')),at(null,[rear+.1,.5,0])],[tdPaint(tdBox(.04,.11,.04),tdC('#121416')),at(null,[rear+.1,.43,.22])],[tdPaint(tdBox(.04,.11,.04),tdC('#121416')),at(null,[rear+.1,.43,-.22])]);
  if(T9.taxi){L.push([tdPaint(tdBox(.22,.08,.12),tdC('#fffbe8')),at(null,[-.1,.71,0])]);LL.push({g:tdBox(.2,.05,.125),c:'#fff2a0',p:[-.1,.71,0]})}
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
  for(const s of[-1,1]){const ex=128+s*13;g.fillStyle='#fbfbf8';g.beginPath();g.ellipse(ex,ey,young?6:5.2,young?4.4:3.4,0,0,7);g.fill();
    g.fillStyle=['#5a3a1e','#2f6b8f','#3d6b3a','#3a2a1c'][(sk.charCodeAt(2)+(lk.hair||'').charCodeAt(3))%4]||'#4a3020';g.beginPath();g.arc(ex,ey+.3,young?3.4:2.8,0,7);g.fill();g.fillStyle='#111';g.beginPath();g.arc(ex,ey+.3,1.4,0,7);g.fill();
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
  for(const s of[-1,1]){const p=new THREE.Group();p.position.set(0,L+.255,s*.13);
    const short=(lk.shirt||'').length%2===0;const ar=tdLoft(tdKeys([[0,.034,.034],[-.1,.03,.03],[-.2,.024,.024],[-.235,.022,.022]],9).map(([y,rx,rz])=>({p:y,cy:0,rx,ry:rz,n:2})),10,(t,sa,ca,r)=>r.p>(short?-.08:-.2)?sh:sk,'y');
    const hd=tdPaint(new THREE.SphereGeometry(.027,10,8),sk);hd.scale(1,1.25,.8);hd.translate(0,-.26,0);
    const m=new THREE.Mesh(tdGeoMerge([[ar,tdI],[hd,tdI]]),vc);m.castShadow=true;p.add(m);p.rotation.x=s*.06;g.add(p);arms.push(p)}
  // testa con la faccia e i capelli
  if(!tdHeadG){tdHeadG=new THREE.SphereGeometry(.085,24,18);tdHeadG.scale(.92,1.1,.86)}
  const hy=L+.395,head=new THREE.Mesh(tdHeadG,tdFaceMat(lk));head.position.y=hy;head.castShadow=true;g.add(head);
  const HP=[],st=lk.style||'short',hairCap=new THREE.SphereGeometry(.092,22,12,0,Math.PI*2,0,Math.PI*(st==='bald'?.25:.6));hairCap.scale(.96,1.1,.92);hairCap.rotateZ(.62);hairCap.translate(-.012,hy+.004,0);HP.push([tdPaint(hairCap,hc),tdI]);
  if(/long|coda|pony|tail/.test(st)){const b=tdLoft(tdKeys([[hy+.05,.085,.06],[hy-.05,.08,.05],[hy-.15,.065,.03]],6).map(([y,rz,rx])=>({p:y,cy:0,rx,ry:rz,n:2,x0:-.035})),12,()=>hc,'y');HP.push([b,tdI])}
  else if(st==='bun'){const b=tdPaint(new THREE.SphereGeometry(.042,10,8),hc);b.translate(-.075,hy+.06,0);HP.push([b,tdI])}
  else if(f){const b=tdLoft(tdKeys([[hy+.04,.085,.055],[hy-.04,.075,.045]],4).map(([y,rz,rx])=>({p:y,cy:0,rx,ry:rz,n:2,x0:-.03})),12,()=>hc,'y');HP.push([b,tdI])}
  if(lk.glasses){for(const s of[-1,1]){const r=new THREE.TorusGeometry(.014,.0025,6,14);r.rotateY(Math.PI/2);r.translate(.08,hy+.012,s*.028);HP.push([tdPaint(r,tdC('#151515')),tdI])}}
  const hm=new THREE.Mesh(tdGeoMerge(HP),vc);hm.castShadow=true;g.add(hm);
  const k={baby:.5,kid:.68,teen:.9,adult:1,old:.96}[lk.age]||1;g.scale.setScalar(k);if(lk.age==='baby'||lk.age==='kid'){head.scale.setScalar(1.18);hm.scale.setScalar(1.18);hm.position.y=-(hy*.18);head.position.y=hy}
  return {g,legs,arms}}
