/* ================= vista 3D in terza persona (come GTA 5) ================= */
const TD={on:(()=>{try{return localStorage.getItem('vita_td9')!=='0'}catch(e){return true}})(),ok:typeof THREE!=='undefined',fail:false,
  hq:(()=>{try{return localStorage.getItem('vita_td9q')!=='0'}catch(e){return true}})(),envMats:[],signMats:[],yaw:-Math.PI/2,rot:0,manT:0,chunks:new Map(),pool:new Map(),cars:[],loot:[],scId:null,pick:[],winMats:[],t:0};
function tdSupported(sc){if(!sc||ui.air||ui.flying)return false;if(sc.id==='citta')return true;return !!(sc.t&&sc.furn&&!sc.outdoor&&sc.id!=='stadio')}
function tdActive(){return TD.on&&TD.ok&&!TD.fail&&!TD.lost&&S&&S.alive&&tdSupported(curSc())}
const tdC=c=>new THREE.Color(c).convertSRGBToLinear();
const tdMC={};function tdMat(c,o){const k=c+(o?JSON.stringify(o):'');return tdMC[k]||(tdMC[k]=new THREE.MeshLambertMaterial(Object.assign({color:tdC(c)},o||{})))}
const tdGC={};function tdBox(w,h,d,ty,tx){const k=[w,h,d,ty||0,tx||0]+'';if(!tdGC[k]){const g=new THREE.BoxGeometry(w,h,d);g.translate(tx||0,ty||0,0);tdGC[k]=g}return tdGC[k]}
function tdTex(c,rep){const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=4;if(rep){t.wrapS=t.wrapT=THREE.RepeatWrapping}return t}
function tdCan(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return [c,c.getContext('2d')]}
function tdMix(a,b,k){return new THREE.Color(a).lerp(new THREE.Color(b),Math.max(0,Math.min(1,k)))}

/* disegna un pezzo di mondo con le funzioni 2D del gioco e lo copia in una texture */
function tdBake(ox,oy,wT,hT,px,fn){
  const [out,og]=tdCan(wT*px,hT*px),cw=cv.width,ch=cv.height,sx=Math.max(1,Math.floor(cw/px)),sy=Math.max(1,Math.floor(ch/px)),s=px/T;
  for(let ty=0;ty<hT;ty+=sy)for(let tx=0;tx<wT;tx+=sx){
    cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,cw,ch);cx.textAlign='center';cx.textBaseline='middle';
    cx.setTransform(s,0,0,s,-(ox+tx)*px,-(oy+ty)*px);
    try{fn(ox+tx,oy+ty,ox+Math.min(wT,tx+sx)-1,oy+Math.min(hT,ty+sy)-1)}catch(e){console.error(e)}
    const w=Math.min(sx,wT-tx)*px,h=Math.min(sy,hT-ty)*px;og.drawImage(cv,0,0,w,h,tx*px,ty*px,w,h)}
  cv.width=cv.width;return out}

/* ---------- facciate con finestre (si accendono di notte) ---------- */
const tdFT={};
function tdFacade(wall,frame,glass){
  const k=wall+frame+(glass?'g':'');if(tdFT[k])return tdFT[k];
  const [c,g]=tdCan(256,256),[e,ge]=tdCan(256,256),r=seeded(k.length*97+wall.charCodeAt(1)*13);
  g.fillStyle=wall;g.fillRect(0,0,256,256);ge.fillStyle='#000';ge.fillRect(0,0,256,256);
  for(let i=0;i<900;i++){g.fillStyle=`rgba(${r()<.5?0:255},${r()<.5?0:255},${r()<.5?0:255},${r()*.05})`;g.fillRect(r()*256,r()*256,2+r()*3,2+r()*3)}
  for(let fy=0;fy<4;fy++)for(let fx=0;fx<4;fx++){const X=fx*64,Y=fy*64;
    if(glass){const gr=g.createLinearGradient(X,Y,X+64,Y+64);gr.addColorStop(0,'#3d6f8f');gr.addColorStop(.5,'#7fb2cc');gr.addColorStop(1,'#2c5068');g.fillStyle=gr;g.fillRect(X+3,Y+3,58,58);g.fillStyle=frame;g.fillRect(X,Y,64,3);g.fillRect(X,Y,3,64)}
    else{g.fillStyle='rgba(0,0,0,.18)';g.fillRect(X,Y+60,64,4);g.fillStyle=frame;g.fillRect(X+14,Y+12,36,40);g.fillStyle='#4f6e82';g.fillRect(X+18,Y+16,28,32);
      g.fillStyle='rgba(255,255,255,.22)';g.fillRect(X+18,Y+16,10,32);g.fillStyle=frame;g.fillRect(X+31,Y+16,2,32);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(X+12,Y+52,40,3)}
    if(r()<.45){ge.fillStyle=r()<.5?'#ffd48a':'#ffe9b8';glass?ge.fillRect(X+3,Y+3,58,58):ge.fillRect(X+18,Y+16,28,32)}}
  const m=new (glass?THREE.MeshStandardMaterial:THREE.MeshLambertMaterial)(Object.assign({map:tdTex(c,1),emissive:tdC('#ffcf88'),emissiveMap:tdTex(e,1),emissiveIntensity:0},glass?{metalness:.55,roughness:.12}:{}));if(glass)TD.envMats.push(m);
  TD.winMats.push(m);return tdFT[k]=m}
function tdUV(geo,w,h,d){const uv=geo.attributes.uv;for(let i=0;i<uv.count;i++){const f=Math.floor(i/4);let su=1,sv=1;
  if(f<2){su=d/4;sv=h/4}else if(f>3){su=w/4;sv=h/4}else{su=w;sv=d}uv.setXY(i,uv.getX(i)*su,uv.getY(i)*sv)}uv.needsUpdate=true}
function tdGable(w,d,hr){const a=w/2,b=d/2,P=[-a,0,b,a,0,b,a,hr,0,-a,0,b,a,hr,0,-a,hr,0, a,0,-b,-a,0,-b,-a,hr,0,a,0,-b,-a,hr,0,a,hr,0, a,0,b,a,0,-b,a,hr,0, -a,0,-b,-a,0,b,-a,hr,0];
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.computeVertexNormals();return g}
// insegne al neon (come Vice City): di notte brillano
const TD_NEON=['#ff3ea5','#29e6ff','#ffd23a','#7cff5a','#b26bff','#ff7a2e'];
function tdSign(txt,w){const [c,g]=tdCan(512,112),nc=TD_NEON[[...txt].reduce((a,ch)=>a+ch.charCodeAt(0),0)%TD_NEON.length];g.fillStyle='rgba(12,12,20,.94)';rr(g,4,4,504,104,22);g.fill();
  g.shadowColor=nc;g.shadowBlur=16;g.strokeStyle=nc;g.lineWidth=6;rr(g,10,10,492,92,18);g.stroke();
  g.textAlign='center';g.textBaseline='middle';let fs=58;g.font=`800 ${fs}px "Baloo 2",system-ui`;while(g.measureText(txt).width>460&&fs>20){fs-=2;g.font=`800 ${fs}px "Baloo 2",system-ui`}
  g.shadowBlur=22;g.fillStyle=nc;g.fillText(txt,256,60);g.shadowBlur=0;g.fillStyle='#fff';g.globalAlpha=.85;g.fillText(txt,256,60);
  const mt=new THREE.MeshBasicMaterial({map:tdTex(c),transparent:true});TD.signMats.push(mt);return new THREE.Mesh(new THREE.PlaneGeometry(w,w*112/512),mt)}

/* ---------- cielo con le nuvole e grattacieli lontani ---------- */
function tdSky(sc){const [c,g]=tdCan(1024,512),gr=g.createLinearGradient(0,0,0,256);gr.addColorStop(0,'#2f6fc4');gr.addColorStop(.7,'#8fc0e8');gr.addColorStop(1,'#d9e9f4');g.fillStyle=gr;g.fillRect(0,0,1024,256);g.fillStyle='#d9e9f4';g.fillRect(0,256,1024,256);
  const r=seeded(5);for(let i=0;i<90;i++){const x=r()*1024,y=30+r()*200,s=14+r()*50*(y/200);for(let k=0;k<7;k++){const gx=x+(r()-.5)*s*2.4,gy=y+(r()-.5)*s*.35,rad=s*(.35+r()*.5),rg=g.createRadialGradient(gx,gy,0,gx,gy,rad);rg.addColorStop(0,'rgba(255,255,255,.6)');rg.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=rg;g.fillRect(gx-rad,gy-rad,rad*2,rad*2)}}
  const m=new THREE.Mesh(new THREE.SphereGeometry(170,32,16),new THREE.MeshBasicMaterial({map:tdTex(c),side:THREE.BackSide,fog:false,depthWrite:false}));m.renderOrder=-1;sc.add(m);return m}
function tdSkyline(sc){const types=[[4,18,4],[5,26,5],[3,13,6],[6,34,6],[4,22,7],[7,15,5]],mats=[tdFacade('#4f7d9c','#cfd8de',true),tdFacade('#6d7f8c','#d9dee2',true),tdFacade('#b9a58c','#6d6152',false),tdFacade('#8d939a','#4d5257',false)];
  const L=[],r=seeded(321),add=(x,z)=>L.push([x,z,r()*types.length|0,r()*mats.length|0]);
  for(let x=-30;x<W+30;x+=7+r()*5){add(x,-12-r()*30);add(x,H+12+r()*30)}for(let z=-10;z<H+10;z+=7+r()*5){add(-12-r()*30,z);add(W+12+r()*30,z)}
  for(let i=0;i<40;i++)add(W*.55+(r()-.5)*70,-45-r()*40);
  const o3=new THREE.Object3D();types.forEach((t,ti)=>mats.forEach((m,mi)=>{const P=L.filter(q=>q[2]===ti&&q[3]===mi);if(!P.length)return;const g=new THREE.BoxGeometry(...t);tdUV(g,t[0],t[1],t[2]);g.translate(0,t[1]/2,0);
    const mm=m.clone();mm.fog=false;mm.color=tdC('#c4d3df');TD.winMats.push(mm);const im=new THREE.InstancedMesh(g,mm,P.length);P.forEach(([x,z],i)=>{o3.position.set(x,0,z);o3.updateMatrix();im.setMatrixAt(i,o3.matrix)});sc.add(im)}))}
function tdEnv(){if(TD.safe){TD.env=null;return}try{tdEnv0()}catch(e){console.warn('env',e);TD.env=null}}
function tdEnv0(){const pm=new THREE.PMREMGenerator(TD.R),es=new THREE.Scene();es.add(new THREE.Mesh(new THREE.SphereGeometry(50,32,16),new THREE.MeshBasicMaterial({map:TD.sky.material.map,side:THREE.BackSide})));
  const gr=new THREE.Mesh(new THREE.PlaneGeometry(300,300),new THREE.MeshBasicMaterial({color:tdC('#4c514c')}));gr.rotation.x=-Math.PI/2;gr.position.y=-3;es.add(gr);
  const r=seeded(9);for(let i=0;i<40;i++){const a=r()*Math.PI*2,d=18+r()*20,h=4+r()*14,b=new THREE.Mesh(new THREE.BoxGeometry(4,h,4),new THREE.MeshBasicMaterial({color:tdMix('#5d7d96','#c9b79c',r())}));b.position.set(Math.cos(a)*d,h/2-3,Math.sin(a)*d);es.add(b)}
  TD.env=pm.fromScene(es,0).texture;pm.dispose()}
function tdSun(sc){const [c,g]=tdCan(128,128),rg=g.createRadialGradient(64,64,0,64,64,64);rg.addColorStop(0,'rgba(255,255,255,1)');rg.addColorStop(.18,'rgba(255,248,225,1)');rg.addColorStop(.4,'rgba(255,220,160,.35)');rg.addColorStop(1,'rgba(255,200,140,0)');g.fillStyle=rg;g.fillRect(0,0,128,128);
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tdTex(c),fog:false,depthWrite:false,transparent:true}));s.scale.set(40,40,1);s.renderOrder=-1;sc.add(s);return s}
// luce da film: bagliore (bloom), colori caldi, bordi scuri
function tdPostInit(){const R=TD.R;if(TD.pp&&TD.pp.main)['main','a','b'].forEach(k=>TD.pp[k].dispose());
  const g2=R.capabilities.isWebGL2,hf=g2||!!R.extensions.get('OES_texture_half_float');TD.hf=hf;
  const o=()=>({type:hf?THREE.HalfFloatType:THREE.UnsignedByteType,minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter});
  const main=TD.hq&&g2&&THREE.WebGLMultisampleRenderTarget?new THREE.WebGLMultisampleRenderTarget(1,1,o()):new THREE.WebGLRenderTarget(1,1,o());
  const a=new THREE.WebGLRenderTarget(1,1,Object.assign(o(),{depthBuffer:false})),b=new THREE.WebGLRenderTarget(1,1,Object.assign(o(),{depthBuffer:false}));
  if(!TD.pp){const V='varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',sm=(u,f)=>new THREE.ShaderMaterial({uniforms:u,vertexShader:V,fragmentShader:f,depthTest:false,depthWrite:false});
    const q=new THREE.Mesh(new THREE.PlaneGeometry(2,2));q.frustumCulled=false;const ps=new THREE.Scene();ps.add(q);
    TD.pp={quad:q,scene:ps,cam:new THREE.OrthographicCamera(-1,1,1,-1,0,1),
      bright:sm({t:{value:null},th:{value:1}},'uniform sampler2D t;uniform float th;varying vec2 vUv;void main(){vec3 c=texture2D(t,vUv).rgb;float l=max(c.r,max(c.g,c.b));gl_FragColor=vec4(c*smoothstep(th,th+.7,l),1.);}'),
      blur:sm({t:{value:null},d:{value:new THREE.Vector2()}},'uniform sampler2D t;uniform vec2 d;varying vec2 vUv;void main(){vec3 c=texture2D(t,vUv).rgb*.227;c+=(texture2D(t,vUv+d*1.385).rgb+texture2D(t,vUv-d*1.385).rgb)*.316;c+=(texture2D(t,vUv+d*3.231).rgb+texture2D(t,vUv-d*3.231).rgb)*.07;gl_FragColor=vec4(c,1.);}'),
      fin:sm({t:{value:null},bl:{value:null},bs:{value:.8},ex:{value:1.05},warm:{value:.3},vig:{value:.4}},`uniform sampler2D t;uniform sampler2D bl;uniform float bs;uniform float ex;uniform float warm;uniform float vig;varying vec2 vUv;
vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}
void main(){vec3 c=texture2D(t,vUv).rgb+texture2D(bl,vUv).rgb*bs;c=aces(c*ex);c=pow(c,vec3(1./2.2));
  float l=dot(c,vec3(.299,.587,.114));c=mix(vec3(l),c,1.22);c=mix(c,c*vec3(1.07,1.,.9),warm);c+=vec3(-.02,.005,.03)*(1.-l)*(1.-l);
  c=(c-.5)*1.13+.5;vec2 q=vUv-.5;c*=1.-vig*dot(q,q)*2.;gl_FragColor=vec4(clamp(c,0.,1.),1.);}`)}}
  Object.assign(TD.pp,{main,a,b});tdPostSize()}
function tdPostSize(){if(!TD.pp||!TD.pp.main)return;const v=new THREE.Vector2();TD.R.getDrawingBufferSize(v);TD.pp.main.setSize(v.x,v.y);const w=Math.max(1,v.x>>2),h=Math.max(1,v.y>>2);TD.pp.a.setSize(w,h);TD.pp.b.setSize(w,h)}
function tdPost(scn){if(TD.safe||!TD.pp||!TD.pp.main){TD.R.setRenderTarget(null);TD.R.render(scn,TD.cam);return}const R=TD.R,P=TD.pp,q=P.quad,pass=(m,tg)=>{q.material=m;R.setRenderTarget(tg);R.render(P.scene,P.cam)};
  R.setRenderTarget(P.main);R.render(scn,TD.cam);
  if(TD.hq){P.bright.uniforms.t.value=P.main.texture;P.bright.uniforms.th.value=TD.hf?1.15:.85;pass(P.bright,P.a);const w=P.a.width,h=P.a.height;
    for(let i=0;i<2;i++){P.blur.uniforms.t.value=P.a.texture;P.blur.uniforms.d.value.set((1+i*1.5)/w,0);pass(P.blur,P.b);P.blur.uniforms.t.value=P.b.texture;P.blur.uniforms.d.value.set(0,(1+i*1.5)/h);pass(P.blur,P.a)}}
  const F=P.fin.uniforms;F.t.value=P.main.texture;F.bl.value=P.a.texture;F.bs.value=TD.hq?.5:0;pass(P.fin,null)}
// palma vera: tronco curvo, foglie che scendono, noci di cocco
function tdPalmGeo(){if(TD.palmG)return TD.palmG;const parts=[],lean=.35,top=new THREE.Vector3(lean,2.15,0);
  const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,0),new THREE.Vector3(.04,.8,0),new THREE.Vector3(.16,1.5,0),top]);
  parts.push({g:new THREE.TubeGeometry(curve,7,.055,6),c:'#8a6a48'});
  for(let i=0;i<10;i++){const L=.95+(i%3)*.12,g=new THREE.PlaneGeometry(1,.26,5,1),p=g.attributes.position;
    for(let k=0;k<p.count;k++){const u=p.getX(k)+.5,w=p.getY(k)*(1-u*.75);p.setXYZ(k,u*L,.05*u-.62*u*u*L,w)}g.computeVertexNormals();
    parts.push({g,c:i%2?'#2f7a2c':'#3f9a3a',p:[top.x,top.y,top.z],r:[(i%2?.25:-.25),i/10*Math.PI*2,0]})}
  const cocoG=new THREE.SphereGeometry(.055,6,4);for(let i=0;i<3;i++)parts.push({g:cocoG,c:'#5a3e1e',p:[top.x+Math.cos(i*2.1)*.07,top.y-.07,Math.sin(i*2.1)*.07]});
  const m=tdCM(parts,true);TD.palmG=m.geometry;return TD.palmG}
/* ---------- la città ---------- */
// i pezzi fermi vengono uniti in pochi blocchi, così anche il telefono va veloce
function tdSub(g,gr){const idx=g.index.array.slice(gr.start,gr.start+gr.count),n=new THREE.BufferGeometry();['position','normal','uv'].forEach(k=>{const a=g.attributes[k];if(!a)return;const o=new Float32Array(idx.length*a.itemSize);idx.forEach((v,i)=>{for(let j=0;j<a.itemSize;j++)o[i*a.itemSize+j]=a.array[v*a.itemSize+j]});n.setAttribute(k,new THREE.BufferAttribute(o,a.itemSize))});return n}
function tdSt(mesh){mesh.updateMatrix();const mats=[].concat(mesh.material),g=mesh.geometry,key=m=>m.uuid+'|'+Math.floor(mesh.position.x/32)+','+Math.floor(mesh.position.z/32),push=(m,gg)=>{const k=key(m);if(!TD.batch.has(k))TD.batch.set(k,{m,L:[]});TD.batch.get(k).L.push([gg,mesh.matrix.clone()])};
  if(mats.length===1)push(mats[0],g.index?g.toNonIndexed():g);else g.groups.forEach(gr=>push(mats[gr.materialIndex],tdSub(g,gr)))}
function tdFlush(grp){const v=new THREE.Vector3();for(const {m,L} of TD.batch.values()){let n=0;L.forEach(([g])=>n+=g.attributes.position.count);const P=new Float32Array(n*3),N=new Float32Array(n*3),U=new Float32Array(n*2);let o=0;
  L.forEach(([g,mx])=>{const nm=new THREE.Matrix3().getNormalMatrix(mx),p=g.attributes.position,q=g.attributes.normal,u=g.attributes.uv;for(let i=0;i<p.count;i++,o++){v.fromBufferAttribute(p,i).applyMatrix4(mx);P.set([v.x,v.y,v.z],o*3);v.fromBufferAttribute(q,i).applyMatrix3(nm).normalize();N.set([v.x,v.y,v.z],o*3);if(u)U.set([u.getX(i),u.getY(i)],o*2)}});
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setAttribute('normal',new THREE.BufferAttribute(N,3));g.setAttribute('uv',new THREE.BufferAttribute(U,2));g.computeBoundingSphere();
  const me=new THREE.Mesh(g,m);me.castShadow=me.receiveShadow=true;grp.add(me)}TD.batch.clear()}
const TD_GLASS=['centro','aeroporto','banca','ufficio','azienda','techlab','ingegneria','studiolegale','studiocomm','ospedale','inv9','biz9','torri9','film9','lab9','fatt9','jet9','luna9','base9','museo9','scud9'];
function tdBuilding(grp,o){ // o:{x,y,w,h,F,wall,frame,roof,glass,gable,doors,sign,b}
  const H=o.F*1.0+.15,mat=tdFacade(o.wall,o.frame,o.glass),roofM=tdMat(o.roof),geo=new THREE.BoxGeometry(o.w,H,o.h);tdUV(geo,o.w,H,o.h);
  const m=new THREE.Mesh(geo,[mat,mat,o.gable?tdMat(shade(o.wall,.8)):tdMat(shade(o.roof,.75)),roofM,mat,mat]);m.position.set(o.x+o.w/2,H/2,o.y+o.h/2);m.castShadow=m.receiveShadow=true;m.userData.b=o.b;tdSt(m);TD.bb.push({box:new THREE.Box3(new THREE.Vector3(o.x,0,o.y),new THREE.Vector3(o.x+o.w,H,o.y+o.h)),b:o.b});
  if(o.gable){const long=o.w>=o.h,rg=tdGable((long?o.w:o.h)+.3,(long?o.h:o.w)+.3,Math.min(1.3,(long?o.h:o.w)*.38)),r=new THREE.Mesh(rg,tdMat(o.roof));r.position.set(o.x+o.w/2,H,o.y+o.h/2);if(!long)r.rotation.y=Math.PI/2;r.castShadow=true;tdSt(r)}
  else{const pm=tdMat(shade(o.roof,.6)),t=.12;[[o.w,t,0,o.h/2-t/2],[o.w,t,0,-o.h/2+t/2],[t,o.h,o.w/2-t/2,0],[t,o.h,-o.w/2+t/2,0]].forEach(([w,d,dx,dz])=>{const p=new THREE.Mesh(new THREE.BoxGeometry(w,.18,d),pm);p.position.set(o.x+o.w/2+dx,H+.09,o.y+o.h/2+dz);tdSt(p)});
    const r=seeded(o.x*13+o.y*7);for(let i=0;i<Math.min(4,1+(o.w*o.h/30|0));i++){const ac=new THREE.Mesh(tdBox(.5,.3,.4),tdMat('#9aa0a6'));ac.position.set(o.x+.6+r()*(o.w-1.2),H+.15,o.y+.6+r()*(o.h-1.2));ac.castShadow=true;tdSt(ac)}}
  const dm=tdMat(o.glass?'#22394a':'#4a3426',{emissive:tdC('#ffb766'),emissiveIntensity:0});if(!TD.winMats.includes(dm))TD.winMats.push(dm);
  (o.doors||[]).forEach(([ex,ey],i)=>{let px,pz,ry;
    if(ey>=o.y+o.h){px=ex+.5;pz=o.y+o.h+.012;ry=0}else if(ey<o.y){px=ex+.5;pz=o.y-.012;ry=Math.PI}else if(ex<o.x){px=o.x-.012;pz=ey+.5;ry=-Math.PI/2}else{px=o.x+o.w+.012;pz=ey+.5;ry=Math.PI/2}
    const fr=new THREE.Mesh(tdBox(.78,.95,.04),tdMat(shade(o.frame,.8)));fr.position.set(px,.475,pz);fr.rotation.y=ry;tdSt(fr);
    const d=new THREE.Mesh(new THREE.PlaneGeometry(.62,.85),dm);d.position.set(px+Math.sin(ry)*.025,.425,pz+Math.cos(ry)*.025);d.rotation.y=ry;tdSt(d);
    const aw=new THREE.Mesh(tdBox(.95,.06,.35),tdMat(o.roof));aw.position.set(px+Math.sin(ry)*.17,1.0,pz+Math.cos(ry)*.17);aw.rotation.y=ry;aw.castShadow=true;tdSt(aw);
    if(i===0&&o.sign){const sw=Math.min(o.w*.85,3.2,Math.max(1.6,o.w*.6)),s=tdSign(o.sign,sw);s.position.set(px+Math.sin(ry)*.03,Math.min(H-.25,1.45),pz+Math.cos(ry)*.03);s.rotation.y=ry;
      if(ry===0)s.position.x=Math.max(o.x+sw/2+.05,Math.min(o.x+o.w-sw/2-.05,px));grp.add(s)}});
  return H}
function tdBuildCity(){
  const sc=new THREE.Scene(),grp=new THREE.Group();sc.add(grp);TD.pick=TD.cityPick=[];TD.bb=[];TD.batch=new Map();
  sc.fog=new THREE.Fog(0xbcd6ea,16,46);sc.background=new THREE.Color(0xbcd6ea);TD.sky=tdSky(sc);TD.sunS=tdSun(sc);tdSkyline(sc);tdEnv();sc.environment=TD.env;
  const base=new THREE.Mesh(new THREE.PlaneGeometry(W+80,H+80),tdMat('#5f7f44'));base.rotation.x=-Math.PI/2;base.position.set(W/2,-.02,H/2);base.receiveShadow=true;sc.add(base);TD.pick.push(base);
  const cov=new Uint8Array(W*H),mark=(x,y,w,h)=>{for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)if(i>=0&&j>=0&&i<W&&j<H)cov[j*W+i]=1};
  const mostly4=(x,y,w,h)=>{let n=0,k=0;for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++){n++;if(at(i,j)===4)k++}return k>=n*.5};
  BUILD.forEach(b=>{if(!mostly4(b.x,b.y,b.w,b.h))return;mark(b.x,b.y,b.w,b.h);
    const glass=TD_GLASS.includes(b.id)||b.w*b.h>150,big=b.w*b.h;
    const F=b.id==='centro'?4:b.id==='stadio'?2:b.id==='aeroporto'?2:Math.max(2,Math.min(7,1+Math.round(Math.min(b.w,b.h)/1.6)+(glass?2:0)));
    const gable=!glass&&b.w<=8&&b.h<=6;
    tdBuilding(grp,{x:b.x,y:b.y,w:b.w,h:b.h,F,wall:b.wall||'#e9dcc6',frame:glass?'#c9d3da':shade(b.roof||'#888',.9),roof:b.roof||'#8a8f96',glass,gable,doors:b.doors||[[b.dx,b.dy]],sign:(b.ic?b.ic+' ':'')+b.n,b})});
  APTS.forEach(a=>{if(!mostly4(a.x,a.y,a.w,a.h))return;mark(a.x,a.y,a.w,a.h);const v=a.sty==='villa',rr9=seeded(a.x*7+a.y*13),tw=!v&&a.w*a.h>=12&&rr9()<.35,F=v?2:tw?9+(rr9()*7|0):4+(rr9()*5|0);
    tdBuilding(grp,{x:a.x,y:a.y,w:a.w,h:a.h,F,wall:tw?['#3e6f8e','#5b7f99','#41525e','#6b8fa8'][rr9()*4|0]:(a.col||'#e8d8c8'),frame:tw?'#c9d3da':(a.shut||'#5a6a5a'),roof:a.roof||'#6b6f74',glass:tw,gable:v,doors:[[a.dx,a.dy]],sign:a.shop&&typeof a.shop==='string'?a.shop:null});
    if(a.shop&&a.aw){const aw=new THREE.Mesh(tdBox(a.w*.9,.08,.6),tdMat(a.aw));aw.position.set(a.x+a.w/2,1.05,a.y+a.h+.3);tdSt(aw)}});
  if(mostly4(CHIESA.x,CHIESA.y,CHIESA.w,CHIESA.h)){if(!BUILD.some(b=>b.x===CHIESA.x&&b.y===CHIESA.y)){mark(CHIESA.x,CHIESA.y,CHIESA.w,CHIESA.h);tdBuilding(grp,{x:CHIESA.x,y:CHIESA.y,w:CHIESA.w,h:CHIESA.h,F:2,wall:'#efe6d2',frame:'#9b8b6a',roof:'#b5533c',gable:true,doors:[]})}
    const tw=new THREE.Mesh(tdBox(1.4,4.2,1.4,2.1),tdMat('#efe6d2'));tw.position.set(CHIESA.x+CHIESA.w-.8,0,CHIESA.y+.8);tdSt(tw);
    const cn=new THREE.Mesh(new THREE.ConeGeometry(1.05,1.3,4),tdMat('#b5533c'));cn.position.set(CHIESA.x+CHIESA.w-.8,4.85,CHIESA.y+.8);cn.rotation.y=Math.PI/4;tdSt(cn)}
  tdFlush(grp);
  // blocchi rimasti (muretti, case piccole)
  const left=[];for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(map[y*W+x]===4&&!cov[y*W+x])left.push([x,y]);
  if(left.length){const im=new THREE.InstancedMesh(tdBox(1,1.3,1,.65),tdFacade('#d8cfbf','#7d7468'),left.length),o3=new THREE.Object3D();left.forEach(([x,y],i)=>{o3.position.set(x+.5,0,y+.5);o3.updateMatrix();im.setMatrixAt(i,o3.matrix)});im.castShadow=im.receiveShadow=true;grp.add(im)}
  // alberi e palme
  const trees=[],palms=[],seen=new Set(),isPalm=(x,y)=>((Math.imul(x+7,73856093)^Math.imul(y+3,19349663))>>>0)%1000<300;TREES.forEach(([x,y])=>{seen.add(x+','+y);(isPalm(x,y)?palms:trees).push([x,y])});
  for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(map[y*W+x]===5&&!seen.has(x+','+y))(isPalm(x,y)?palms:trees).push([x,y]);
  const o3=new THREE.Object3D(),setM=(im,i,x,y,z,sx,sy,sz,ry,rz)=>{o3.position.set(x,y,z);o3.scale.set(sx,sy,sz);o3.rotation.set(0,ry||0,rz||0);o3.updateMatrix();im.setMatrixAt(i,o3.matrix)};
  if(trees.length){const tr=new THREE.InstancedMesh(new THREE.CylinderGeometry(.05,.09,.85,8).translate(0,.42,0),tdFadeNear(new THREE.MeshLambertMaterial({color:tdC('#5b4430')}),'trunk9'),trees.length),
    fo=new THREE.InstancedMesh(tdLeafGeo(),tdLeafMat(),trees.length*3);let k=0;
    trees.forEach(([x,y],i)=>{const r=seeded(x*97+y*13),s=.85+r()*.4;setM(tr,i,x+.5,0,y+.5,s,s,s);
      [[0,1.05,0,1],[.22,.85,.1,.7],[-.18,1.3,-.08,.62]].forEach(([dx,dy,dz,ss])=>{setM(fo,k,x+.5+dx*s,dy*s,y+.5+dz*s,ss*s,ss*s*.9,ss*s,r()*3);fo.setColorAt(k++,tdMix('#2f5a25','#5d8e3e',r()))})});
    tr.castShadow=fo.castShadow=true;grp.add(tr,fo)}
  for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){if(map[y*W+x]!==0)continue;const n4=[at(x+1,y),at(x-1,y),at(x,y+1),at(x,y-1)],r=h9r(x,y,2);
    if(n4.includes(2)&&!n4.includes(4)&&r<.07)palms.push([x,y]);else if(n4.includes(4)&&r<.22)TD.bush=(TD.bush||[]).concat([[x,y]])}
  if(palms.length){const geo=tdPalmGeo(),im=new THREE.InstancedMesh(geo,tdFadeNear(new THREE.MeshLambertMaterial({vertexColors:true,side:THREE.DoubleSide}),'palm9'),palms.length);
    palms.forEach(([x,y],i)=>{const r=seeded(x*51+y*17),s=.85+r()*.35;setM(im,i,x+.5,0,y+.5,s,s*(.9+r()*.3),s,r()*6.28)});im.castShadow=true;grp.add(im)}
  if(TD.bush&&TD.bush.length){const B=TD.bush,im=new THREE.InstancedMesh(tdLeafGeo(.32),tdLeafMat(),B.length);
    B.forEach(([x,y],i)=>{const r=seeded(x*29+y*83);setM(im,i,x+.5+(r()-.5)*.3,.18,y+.5+(r()-.5)*.3,1+r()*.4,.7+r()*.3,1+r()*.4,r()*3);im.setColorAt(i,tdMix('#2e5a22','#4f8a34',r()))});im.castShadow=true;grp.add(im);TD.bush=null}
  // lampioni
  TD.lampHead=new THREE.MeshLambertMaterial({color:tdC('#fff3c9'),emissive:tdC('#ffd98a'),emissiveIntensity:0});
  {const L=LAMPS,po=new THREE.InstancedMesh(new THREE.CylinderGeometry(.025,.035,1.6,5).translate(0,.8,0),tdMat('#2f3337'),L.length),
    ar=new THREE.InstancedMesh(tdBox(.3,.03,.03,0,.15),tdMat('#2f3337'),L.length),hd=new THREE.InstancedMesh(tdBox(.18,.05,.1),TD.lampHead,L.length);
    L.forEach(([x,y],i)=>{setM(po,i,x,0,y,1,1,1);setM(ar,i,x,1.58,y,1,1,1);setM(hd,i,x+.28,1.55,y,1,1,1)});po.castShadow=true;grp.add(po,ar,hd)}
  // semafori
  {const P=[];RX.forEach(c=>RY.forEach(r=>{if(inMZ(c,r)||window.SEM9)return;[[c-.15,r-.15,'v'],[c+2.15,r+2.15,'v'],[c-.15,r+2.15,'h'],[c+2.15,r-.15,'h']].forEach(p=>P.push(p))}));
    const po=new THREE.InstancedMesh(new THREE.CylinderGeometry(.03,.035,1.75,6).translate(0,.875,0),tdMat('#3a3d41'),P.length),am=new THREE.InstancedMesh(new THREE.CylinderGeometry(.018,.018,1,5).rotateZ(Math.PI/2).translate(.5,0,0),tdMat('#3a3d41'),P.length),
      hd=new THREE.InstancedMesh(tdBox(.07,.2,.07,-.1),tdMat('#e0b021'),P.length),li=new THREE.InstancedMesh(new THREE.SphereGeometry(.026,8,6),new THREE.MeshBasicMaterial({color:0xffffff}),P.length*2);
    P.forEach(([x,y,ax],i)=>{const cX=RX.find(c=>Math.abs(x-(c+1))<2.5),cY=RY.find(r=>Math.abs(y-(r+1))<2.5),tx=ax==='v'?(cX!=null?cX+1:x):x,tz=ax==='h'?(cY!=null?cY+1:y):y,dx=tx-x,dz=tz-y,L=Math.max(.3,Math.hypot(dx,dz)*.8),ry=-Math.atan2(dz,dx),ln=Math.hypot(dx,dz)||1,ex=x+dx/ln*L,ez=y+dz/ln*L;
      setM(po,i,x,0,y,1,1,1);setM(am,i,x,1.7,y,L,1,1,ry);setM(hd,i,ex,1.68,ez,1,1,1);setM(li,i*2,ex+.04,1.5,ez,1,1,1);setM(li,i*2+1,ex,1.5,ez+.04,1,1,1)});
    po.castShadow=am.castShadow=hd.castShadow=true;grp.add(po,am,hd,li);TD.sem={P,li};li.material.color.setScalar(1.5)}
  // panchine
  {const B=BENCHES,bm=new THREE.InstancedMesh(tdBox(.8,.08,.28,.25),tdMat('#8a5a32'),B.length),bl=new THREE.InstancedMesh(tdBox(.7,.25,.06,.125),tdMat('#3a3a3a'),B.length);B.forEach(([x,y],i)=>{setM(bm,i,x+.5,0,y+.5,1,1,1);setM(bl,i,x+.5,0,y+.5,1,1,1)});grp.add(bm,bl)}
  // luci
  const hemi=new THREE.HemisphereLight(0xdfefff,0x6b5a45,.7),sun=new THREE.DirectionalLight(0xffffff,1.1);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);
  Object.assign(sun.shadow.camera,{left:-16,right:16,top:16,bottom:-16,near:1,far:60});sun.shadow.bias=-.0008;sc.add(hemi,sun,sun.target);
  TD.pts=[0,1,2,3].map(()=>{const p=new THREE.PointLight(0xffc874,0,6,1.6);sc.add(p);return p});
  TD.city={sc,hemi,sun,ground:new THREE.Group()};sc.add(TD.city.ground);TD.chunks.clear();
}
const TD_CH=16;
// asfalto bagnato: le parti scure riflettono il cielo
function tdRough(img){const S2=128,[c,g]=tdCan(S2,S2);g.drawImage(img,0,0,S2,S2);const d=g.getImageData(0,0,S2,S2),a=d.data;
  for(let i=0;i<a.length;i+=4){const l=(a[i]*.3+a[i+1]*.59+a[i+2]*.11)/255,sat=Math.max(a[i],a[i+1],a[i+2])-Math.min(a[i],a[i+1],a[i+2]),wet=l<.42&&sat<40?1:0,v=255*(.95-.5*wet);a[i]=a[i+1]=a[i+2]=v}
  g.putImageData(d,0,0);const t=new THREE.CanvasTexture(c);return t}
// marciapiedi in rilievo: il bordino di pietra lungo la strada
let tdCurbM=null;
function tdCurbs(m,x0,y0,w,h){const E=[];for(let y=y0;y<y0+h;y++)for(let x=x0;x<x0+w;x++){if(at(x,y)!==2)continue;
    if(at(x,y+1)===1)E.push([x+.5,y+1-.03,0]);if(at(x,y-1)===1)E.push([x+.5,y+.03,0]);if(at(x+1,y)===1)E.push([x+1-.03,y+.5,1]);if(at(x-1,y)===1)E.push([x+.03,y+.5,1])}
  if(!E.length)return;if(!tdCurbM)tdCurbM=tdMat('#a9a59c');const im=new THREE.InstancedMesh(tdBox(1,.07,.07,.035),tdCurbM,E.length),o3=new THREE.Object3D();
  E.forEach(([x,z,v],i)=>{o3.position.set(x-(x0+w/2),-(z-(y0+h/2)),0);o3.rotation.set(Math.PI/2,v?Math.PI/2:0,0);o3.updateMatrix();im.setMatrixAt(i,o3.matrix)});im.receiveShadow=true;m.add(im)}
// un pezzo di terra (16×16 caselle) disegnato con la mappa 2D; quello dove sei tu è disegnato più fine
function tdChunkBuild(a,b,px){const C=TD.city,w=Math.min(TD_CH,W-a*TD_CH),h=Math.min(TD_CH,H-b*TD_CH);
  const img=tdBake(a*TD_CH,b*TD_CH,w,h,px,(x0,y0,x1,y1)=>{cx.fillStyle='#78a253';cx.fillRect(x0*T,y0*T,(x1-x0+1)*T,(y1-y0+1)*T);ui.td9bake=1;try{drawCity(0,x0,y0,x1,y1);if(x0<=12&&y0<=11)drawHouseGround()}finally{ui.td9bake=0}});
  const tx=tdTex(img);tx.anisotropy=8;const rg=tdRough(img),gm=new THREE.MeshStandardMaterial({map:tx,roughnessMap:rg,roughness:1,metalness:0,envMapIntensity:TD.envK||1});tdGrain(gm);TD.envMats.push(gm);const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),gm);
  tdCurbs(m,a*TD_CH,b*TD_CH,w,h);m.rotation.x=-Math.PI/2;m.position.set(a*TD_CH+w/2,0,b*TD_CH+h/2);m.receiveShadow=true;m.userData.hi=px>32;
  C.ground.add(m);TD.cityPick.push(m);return m}
function tdChunkFree(m){const C=TD.city;C.ground.remove(m);m.geometry.dispose();m.material.map.dispose();m.material.roughnessMap.dispose();const ei=TD.envMats.indexOf(m.material);if(ei>=0)TD.envMats.splice(ei,1);m.material.dispose();m.children.forEach(c=>c.dispose&&c.dispose());const q=TD.cityPick.indexOf(m);if(q>=0)TD.cityPick.splice(q,1)}
function tdChunks(){
  const pcx=Math.floor(S.pos.x/TD_CH),pcy=Math.floor(S.pos.y/TD_CH),want=[],hiOK=TD.hq&&!TD.lowMem;
  // sostituisce un pezzo già fatto con uno nuovo (prima fa il nuovo, poi toglie il vecchio: niente buchi)
  const swap=(k,px)=>{const [a,b]=k.split(',').map(Number),old=TD.chunks.get(k),m=tdChunkBuild(a,b,px);TD.chunks.set(k,m);if(old)tdChunkFree(old)};
  if(TD.chunks.size){const ck=pcx+','+pcy,cm=TD.chunks.get(ck);
    if(hiOK&&cm&&!cm.userData.hi){swap(ck,64);return}
    for(const [k,m] of TD.chunks){if(!m.userData.hi)continue;const [a,b]=k.split(',').map(Number);if(!hiOK||Math.max(Math.abs(a-pcx),Math.abs(b-pcy))>=1){swap(k,32);return}}}
  for(let j=-2;j<=2;j++)for(let i=-2;i<=2;i++){const a=pcx+i,b=pcy+j;if(a<0||b<0||a*TD_CH>=W||b*TD_CH>=H)continue;const k=a+','+b;if(!TD.chunks.has(k))want.push([Math.hypot(i,j),a,b,k])}
  want.sort((p,q)=>p[0]-q[0]).slice(0,TD.chunks.size?1:9).forEach(([,a,b,k])=>TD.chunks.set(k,tdChunkBuild(a,b,32)));
  for(const [k,m] of TD.chunks){const [a,b]=k.split(',').map(Number);if(Math.abs(a-pcx)>3||Math.abs(b-pcy)>3){tdChunkFree(m);TD.chunks.delete(k)}}
}

/* ---------- dentro le case e i negozi ---------- */
const TD_FH={bed:.26,bigbed:.28,crib:.45,wardrobe:.95,bookshelf:.95,fridge:.8,fridgeS:.85,freezer:.45,stove:.42,sink:.42,wc:.22,tub:.28,washer:.42,dispensa:.85,highchair:.42,table:.36,rtable:.36,ctable:.36,tv:.5,sofa:.3,broom:.6,toybox:.28,scrivania:.36,plant:.55,shopfront:1.1,fountain:.35,bench:.22,counter:.45,easel:.7,cupboard:.8,piano:.5,slide:.6,blackboard:.95,desk:.36,sdesk:.34,mydesk:.36,lab:.42,globe:.45,hoop:1.3,ball:.16,lectern:.5,goal:.7,scoreboard:1.2,shelf:.85,gshelf:.75,pcdesk:.4,cooler:.7,desk2:.36,exambed:.36,scale:.35,xray:.85,hbed:.36,wheelchair:.35,chairs:.28,vending:.95,safe:.7,lockers:.95,atm:.85,rope:.35,showcar:.5,moto:.45,vshow:.45,kids:.3,dino:1.3,statue:1.1,vetrina:.5,seats:.32,popcorn:.6,produce:.42,cassa:.45,cart:.4,oven:.6,pool:.03,altar:.45,candles:.5,magrack:.65,car:.5,rocket:2,crowd:.6,board:.95,checkin:.45,gate:.45,gdoor:1,field:.02,pond:.02,rug:.01};
function tdBuildRoom(sc){
  const S3=new THREE.Scene(),WH=1.6,px=32;TD.pick=[];const pick=TD.pick;S3.background=new THREE.Color(0x1d1a17);
  const img=tdBake(0,0,sc.w,sc.h,px,()=>{cx.fillStyle='#2b2825';cx.fillRect(0,0,sc.w*T,sc.h*T);drawRoom(sc,0);
    sc.furn.filter(f=>f.walk).forEach(f=>drawFurn(f,0));sc.furn.filter(f=>!f.walk).sort((a,b)=>a.y-b.y).forEach(f=>drawFurn(f,0));
    if(sc.zone)Object.values(ZONES).filter(Z=>Z.sc===(/^casa(mia|[2-6])$/.test(sc.id)?'casa':sc.id)&&Z.n()).forEach(Z=>drawZoneLabel(Z))});
  const tex=tdTex(img);tex.anisotropy=8;const data=img.getContext('2d').getImageData(0,0,img.width,img.height).data;
  const avg=(x,y,w,h)=>{let r=0,g=0,b=0,n=0;for(let j=y*px;j<(y+h)*px;j+=3)for(let i=x*px;i<(x+w)*px;i+=3){const k=(j*img.width+i)*4;if(data[k+3]<10)continue;r+=data[k];g+=data[k+1];b+=data[k+2];n++}return n?'#'+[r,g,b].map(v=>(v/n|0).toString(16).padStart(2,'0')).join(''):'#888888'};
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(sc.w,sc.h),new THREE.MeshLambertMaterial({map:tex}));fl.rotation.x=-Math.PI/2;fl.position.set(sc.w/2,0,sc.h/2);fl.receiveShadow=true;S3.add(fl);TD.pick.push(fl);
  const isW=(x,y)=>x>=0&&y>=0&&x<sc.w&&y<sc.h&&sc.t[y*sc.w+x]===9;
  // muri: solo le facce che si vedono
  const [wc,wg]=tdCan(64,128);wg.fillStyle=sc.wall;wg.fillRect(0,0,64,128);for(let i=0;i<300;i++){wg.fillStyle=`rgba(0,0,0,${Math.random()*.04})`;wg.fillRect(Math.random()*64,Math.random()*128,3,3)}
  wg.fillStyle='#6b5240';wg.fillRect(0,118,64,10);wg.fillStyle='rgba(255,255,255,.25)';wg.fillRect(0,117,64,1.5);wg.fillStyle='rgba(0,0,0,.08)';wg.fillRect(0,0,64,6);
  const P=[],N=[],U=[],quad=(a,b,c,d,n)=>{P.push(...a,...b,...c,...a,...c,...d);for(let i=0;i<6;i++)N.push(...n);U.push(0,0,1,0,1,1,0,0,1,1,0,1)};
  const TP=[],TN=[];
  for(let y=0;y<sc.h;y++)for(let x=0;x<sc.w;x++){if(!isW(x,y))continue;
    TP.push(x,WH,y,x,WH,y+1,x+1,WH,y+1,x,WH,y,x+1,WH,y+1,x+1,WH,y);for(let i=0;i<6;i++)TN.push(0,1,0);
    const inb=(i,j)=>i>=0&&j>=0&&i<sc.w&&j<sc.h;
    if(inb(x,y+1)&&!isW(x,y+1))quad([x,0,y+1],[x+1,0,y+1],[x+1,WH,y+1],[x,WH,y+1],[0,0,1]);
    if(inb(x,y-1)&&!isW(x,y-1))quad([x+1,0,y],[x,0,y],[x,WH,y],[x+1,WH,y],[0,0,-1]);
    if(inb(x+1,y)&&!isW(x+1,y))quad([x+1,0,y+1],[x+1,0,y],[x+1,WH,y],[x+1,WH,y+1],[1,0,0]);
    if(inb(x-1,y)&&!isW(x-1,y))quad([x,0,y],[x,0,y+1],[x,WH,y+1],[x,WH,y],[-1,0,0])}
  const wgeo=new THREE.BufferGeometry();wgeo.setAttribute('position',new THREE.Float32BufferAttribute(P,3));wgeo.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));wgeo.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));
  const wm=new THREE.Mesh(wgeo,tdSee(new THREE.MeshLambertMaterial({map:tdTex(wc)})));wm.castShadow=wm.receiveShadow=true;S3.add(wm);TD.walls=wm;
  const tgeo=new THREE.BufferGeometry();tgeo.setAttribute('position',new THREE.Float32BufferAttribute(TP,3));tgeo.setAttribute('normal',new THREE.Float32BufferAttribute(TN,3));S3.add(new THREE.Mesh(tgeo,tdSee(new THREE.MeshLambertMaterial({color:tdC('#5f5750')}))));
  // finestre sul muro di fondo
  const used=new Set();sc.furn.forEach(f=>{if(f.y<=2)for(let x=f.x;x<f.x+f.w;x++)used.add(x)});
  const winM=new THREE.MeshBasicMaterial({color:tdC('#cfe6f5')});
  for(let x=2;x<sc.w-2;x+=3){if(used.has(x)||used.has(x+1)||isW(x,2)||isW(x+1,2)||!isW(x,1))continue;const w=new THREE.Mesh(new THREE.PlaneGeometry(1.5,.62),winM);w.position.set(x+1,.95,2.01);S3.add(w);
    const f=new THREE.Mesh(tdBox(1.6,.05,.08),tdMat('#efebe2'));f.position.set(x+1,.62,2.03);S3.add(f)}
  // mobili
  const topM=new THREE.MeshLambertMaterial({map:tex});
  sc.furn.forEach((f,i)=>{if(f.walk)return;let y0=f.y,y1=f.y+f.h;while(y0<y1&&[...Array(f.w)].every((_,k)=>isW(f.x+k,y0)))y0++;
    if(y0>=y1){ // quadro o lavagna appesa al muro
      const g=new THREE.PlaneGeometry(f.w,Math.min(1.1,f.h*.6)),uv=g.attributes.uv;for(let k=0;k<uv.count;k++)uv.setXY(k,(f.x+uv.getX(k)*f.w)/sc.w,1-(f.y+(1-uv.getY(k))*f.h)/sc.h);
      const m=new THREE.Mesh(g,topM);m.position.set(f.x+f.w/2,.85,f.y+f.h+.02);m.userData.fu=i;S3.add(m);TD.pick.push(m);return}
    const h=TD_FH[f.k]!=null?TD_FH[f.k]:.42,d=y1-y0,g=new THREE.BoxGeometry(f.w-.06,h,d-.06),uv=g.attributes.uv,pos=g.attributes.position,cxm=f.x+f.w/2,czm=y0+d/2;
    for(let k=8;k<12;k++)uv.setXY(k,(cxm+pos.getX(k))/sc.w,1-(czm+pos.getZ(k))/sc.h);uv.needsUpdate=true;
    const sm=tdMat(shade(f.c&&/^#/.test(f.c)?f.c:avg(f.x,y0,f.w,d),.82)),m=new THREE.Mesh(g,[sm,sm,topM,sm,sm,sm]);
    m.position.set(cxm,h/2,czm);m.castShadow=m.receiveShadow=true;m.userData.fu=i;S3.add(m);TD.pick.push(m)});
  // soffitto, porta d'uscita, luci
  const out=new THREE.Mesh(new THREE.PlaneGeometry(1,WH),new THREE.MeshBasicMaterial({color:tdC('#e9f4ff')}));out.position.set(sc.door.x+.5,WH/2,sc.h-.02);out.rotation.y=Math.PI;S3.add(out);
  const ex=tdSign('🚪 USCITA',1.3);ex.position.set(sc.door.x+.5,WH-.2,sc.h-1+.02);S3.add(ex);ex.material.color=tdC('#c9ffd6');TD.exitSign=ex;
  const hemi=new THREE.HemisphereLight(0xfff7ea,0x6d5a48,.85),sun=new THREE.DirectionalLight(0xfff1dc,.55);sun.position.set(sc.w*.3,6,sc.h*.8);sun.target.position.set(sc.w/2,0,sc.h/2);
  sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);const r=Math.max(sc.w,sc.h)*.7;Object.assign(sun.shadow.camera,{left:-r,right:r,top:r,bottom:-r,near:.5,far:30});sun.shadow.bias=-.001;
  S3.add(hemi,sun,sun.target);TD.pts=[];if(TD.env)S3.environment=TD.env;
  TD.room={sc:S3,id:sc.id,WH,tex,img,pick};
}
function tdFreeRoom(){const R=TD.room;if(!R)return;R.sc.traverse(o=>{if(o.geometry&&!Object.values(tdGC).includes(o.geometry))o.geometry.dispose();if(o.material){[].concat(o.material).forEach(m=>{if(Object.values(tdMC).includes(m))return;if(m.map&&m.map!==R.tex)m.map.dispose();m.dispose()})}});R.tex.dispose();TD.room=null}

// i muri tra la telecamera e il personaggio diventano trasparenti, così lo vedi sempre
function tdSee(m){if(!TD.uP){TD.uP={value:new THREE.Vector3()};TD.uC={value:new THREE.Vector3()}}m.onBeforeCompile=sh=>{sh.uniforms.uP=TD.uP;sh.uniforms.uC=TD.uC;
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vW;').replace('#include <project_vertex>','#include <project_vertex>\nvW=(modelMatrix*vec4(transformed,1.0)).xyz;');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vW;uniform vec3 uP;uniform vec3 uC;').replace('void main() {','void main() {\n{vec3 d=uP-uC;float L=length(d);vec3 n=d/L;float t=dot(vW-uC,n);if(t>0.0&&t<L-0.15){vec3 q=uC+n*t;float rr=0.62*(t/L)+0.12,dq=length(vW-q);if(dq<rr){float dd=fract(sin(dot(floor(gl_FragCoord.xy),vec2(12.9898,78.233)))*43758.5453);if(dq<rr-.18||dd>(dq-rr+.18)/.18)discard;}}}')};return m}
/* ---------- persone, animali, macchine ---------- */
const tdCy={};function tdCyl(a,b,h,ty){const k=[a,b,h,ty]+'';if(!tdCy[k]){const g=new THREE.CylinderGeometry(a,b,h,14);g.translate(0,ty,0);tdCy[k]=g}return tdCy[k]}
const tdSph=new Map();function tdSphere(r){if(!tdSph.has(r))tdSph.set(r,new THREE.SphereGeometry(r,16,12));return tdSph.get(r)}
// ogni persona o macchina è fatta di pochi pezzi colorati uniti insieme (veloce anche sul telefono)
let tdVCM=null;
function tdCM(parts,cast,mat){if(!tdVCM)tdVCM=new THREE.MeshLambertMaterial({vertexColors:true});const o3=new THREE.Object3D(),v=new THREE.Vector3(),col=new THREE.Color();let n=0;
  const G=parts.map(q=>{const g=q.g.index?q.g.toNonIndexed():q.g;n+=g.attributes.position.count;return g});const P=new Float32Array(n*3),N=new Float32Array(n*3),C=new Float32Array(n*3);let o=0;
  parts.forEach((q,k)=>{const g=G[k];o3.position.set(...(q.p||[0,0,0]));o3.rotation.set(...(q.r||[0,0,0]));o3.scale.set(...(q.s||[1,1,1]));o3.updateMatrix();const nm=new THREE.Matrix3().getNormalMatrix(o3.matrix);col.copy(tdC(q.c));
    const p=g.attributes.position,nn=g.attributes.normal;for(let i=0;i<p.count;i++,o++){v.fromBufferAttribute(p,i).applyMatrix4(o3.matrix);P.set([v.x,v.y,v.z],o*3);v.fromBufferAttribute(nn,i).applyMatrix3(nm).normalize();N.set([v.x,v.y,v.z],o*3);C.set([col.r,col.g,col.b],o*3)}});
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setAttribute('normal',new THREE.BufferAttribute(N,3));g.setAttribute('color',new THREE.BufferAttribute(C,3));g.computeBoundingSphere();
  const m=new THREE.Mesh(g,mat||tdVCM);m.castShadow=cast!==false;return m}
let tdHair=null;
function tdHuman(lk){
  const g=new THREE.Group(),L=.3,legs=[],arms=[],sk=lk.skin||'#f1c9a5',sh=lk.shirt||'#4a5d7e',pa=lk.pants||'#333c55',hc=lk.hair||'#3a2a1c';
  for(const s of[-1,1]){const p=new THREE.Group();p.position.set(0,L,s*.05);p.add(tdCM([{g:tdCyl(.045,.036,L,-L/2),c:pa},{g:tdBox(.11,.045,.085,-L+.022,.015),c:'#2a2622'}]));g.add(p);legs.push(p)}
  for(const s of[-1,1]){const p=new THREE.Group();p.position.set(0,L+.25,s*.128);p.add(tdCM([{g:tdSphere(.036),c:sh},{g:tdCyl(.032,.026,.22,-.11),c:sh},{g:tdSphere(.029),c:sk,p:[0,-.24,0]}]));g.add(p);arms.push(p)}
  if(!tdHair)tdHair=new THREE.SphereGeometry(.094,12,8,0,Math.PI*2,0,Math.PI*.55);
  const hy=L+.3+.085,B=[{g:tdCyl(.115,.095,.27,0),c:sh,p:[0,L+.135,0],s:[.62,1,1]},{g:tdCyl(.098,.095,.05,0),c:pa,p:[0,L+.01,0],s:[.62,1,1]},{g:tdCyl(.03,.035,.05,0),c:sk,p:[0,L+.285,0]},
    {g:tdSphere(.088),c:sk,p:[0,hy,0],s:[1,1.08,.95]},{g:tdHair,c:hc,p:[-.008,hy+.008,0],r:[0,0,.25]}];
  if(lk.skirt)B.push({g:tdCyl(.1,.15,.16,0),c:lk.skirt,p:[0,L-.02,0]});
  if(lk.style==='bun')B.push({g:tdSphere(.045),c:hc,p:[-.08,hy+.05,0]});else if(/long|coda|pony|tail/.test(lk.style||''))B.push({g:tdCyl(.085,.07,.2,0),c:hc,p:[-.04,hy-.05,0],s:[.7,1,1]});
  B.push({g:tdBox(.025,.03,.025),c:shade(sk,.92),p:[.09,hy-.01,0]});
  for(const s of[-1,1])B.push({g:tdBox(.012,.022,.018),c:'#1d1d1d',p:[.085,hy+.012,s*.032]});
  if(lk.glasses)B.push({g:tdBox(.012,.03,.12),c:'#111111',p:[.09,hy+.012,0]});
  g.add(tdCM(B));const k={baby:.48,kid:.66,teen:.88,adult:1,old:.95}[lk.age]||1;g.scale.setScalar(k*.98);
  return {g,legs,arms}}
function tdAnimal(type,fur){const g=new THREE.Group(),f=fur||'#b07a45',d=shade(f,.8),legs=[];
  const B=[{g:tdBox(.34,.15,.15),c:f,p:[0,.2,0]},{g:tdBox(.14,.13,.13),c:f,p:[.2,.29,0]},{g:tdBox(.06,.05,.07),c:d,p:[.29,.27,0]},{g:tdBox(.14,.03,.03),c:f,p:[-.22,.27,0],r:[0,0,.6]}];
  for(const s of[-1,1])B.push({g:tdBox(.04,.07,.03),c:f,p:[.18,.38,s*.045]},{g:tdBox(.01,.02,.02),c:'#111111',p:[.27,.31,s*.035]});
  g.add(tdCM(B));[[.12,.05],[.12,-.05],[-.12,.05],[-.12,-.05]].forEach(([x,z])=>{const p=new THREE.Group();p.position.set(x,.14,z);p.add(tdCM([{g:tdBox(.04,.14,.04,-.07),c:f}],false));g.add(p);legs.push(p)});
  const k=/gatt|cat/.test(type)?.75:/cavall|horse|pony/.test(type)?2.2:/coniglio|criceto|uccell|pesc/.test(type)?.5:1;g.scale.setScalar(k);return {g,legs,arms:[]}}
let tdWheel=null,tdRim=null,tdCarM=null;const tdCG={};
function tdExt(pts,depth,bev){const sh=new THREE.Shape();pts.forEach(([x,y],i)=>i?sh.lineTo(x,y):sh.moveTo(x,y));sh.closePath();
  const g=new THREE.ExtrudeGeometry(sh,{depth,bevelEnabled:!!bev,bevelThickness:bev||0,bevelSize:bev||0,bevelSegments:2,curveSegments:1});g.translate(0,0,-depth/2);return g}
function tdCarParts(sport){const k=sport?'s':'n';if(tdCG[k])return tdCG[k];
  const body=sport?[[-.8,.13],[-.81,.33],[-.62,.38],[-.3,.5],[.06,.52],[.42,.35],[.8,.29],[.83,.17],[.76,.12]]:[[-.78,.12],[-.8,.37],[-.62,.42],[-.42,.44],[-.27,.65],[.14,.66],[.4,.45],[.77,.38],[.81,.2],[.75,.12]];
  const glass=sport?[[-.42,.42],[-.28,.485],[.04,.5],[.36,.36]]:[[-.58,.43],[-.38,.44],[-.25,.62],[.12,.63],[.36,.45]];
  const W=sport?.8:.74,cx0=glass.reduce((a,p)=>a+p[0],0)/glass.length,cy0=glass.reduce((a,p)=>a+p[1],0)/glass.length,gl=glass.map(([x,y])=>[cx0+(x-cx0)*1.04,cy0+(y-cy0)*1.04]);
  return tdCG[k]={b:tdExt(body,W,.035),g:tdExt(gl,W+.075),W}}
function tdCar(col,sport){if(!tdWheel){tdWheel=new THREE.CylinderGeometry(.15,.15,.13,14);tdRim=new THREE.CylinderGeometry(.095,.095,.14,10);tdCarM=new THREE.MeshStandardMaterial({vertexColors:true,metalness:.45,roughness:.22});TD.envMats.push(tdCarM);TD.carLightM=new THREE.MeshBasicMaterial({vertexColors:true})}
  const P=tdCarParts(sport),W=P.W,B=[{g:P.b,c:col},{g:P.g,c:'#121820'}];
  [[.5,1],[.5,-1],[-.5,1],[-.5,-1]].forEach(([x,s])=>{B.push({g:tdWheel,c:'#141414',p:[x,.15,s*(W/2-.02)],r:[Math.PI/2,0,0]},{g:tdRim,c:'#b8bec4',p:[x,.15,s*(W/2-.015)],r:[Math.PI/2,0,0]})});
  const LL=[];for(const s of[-1,1])LL.push({g:tdBox(.03,.06,.17),c:'#fff8dc',p:[sport?.82:.8,sport?.24:.3,s*(W/2-.12)]},{g:tdBox(.03,.05,.2),c:'#e3141c',p:[-.815,sport?.3:.33,s*(W/2-.13)]});
  B.push({g:tdBox(.02,.06,.18),c:'#f4f4f0',p:[-.82,.21,0]},{g:tdBox(.02,.05,.3),c:'#1a1a1a',p:[.83,.18,0]});
  if(sport)B.push({g:tdBox(.16,.025,W+.02),c:'#1a1a1a',p:[-.7,.5,0]},{g:tdBox(.04,.12,.04),c:'#1a1a1a',p:[-.68,.43,.22]},{g:tdBox(.04,.12,.04),c:'#1a1a1a',p:[-.68,.43,-.22]});
  const g=new THREE.Group();g.add(tdCM(B,true,tdCarM),tdCM(LL,false,TD.carLightM));return g}
function tdPoolGet(key,sig,make){let e=TD.pool.get(key);if(e&&e.sig!==sig){e.g.parent&&e.g.parent.remove(e.g);e=null}if(!e){e=Object.assign(make(),{sig,a:null,px:null,py:null});TD.pool.set(key,e)}e.seen=TD.t;return e}
function tdPlace(e,x,y,moving,ph,dir,dt,scn){
  if(e.g.parent!==scn)scn.add(e.g);
  let ta=e.a;if(e.px!=null){const dx=x-e.px,dy=y-e.py;if(Math.hypot(dx,dy)>.003)ta=Math.atan2(dy,dx)}
  if(ta==null)ta={r:0,d:Math.PI/2,l:Math.PI,u:-Math.PI/2}[dir]||Math.PI/2;
  if(e.a==null)e.a=ta;else e.a+=wrapA(ta-e.a)*Math.min(1,dt*12);
  e.px=x;e.py=y;e.g.position.set(x,0,y);e.g.rotation.y=-e.a;
  const sw=moving?Math.sin(ph||0)*.6:0;e.legs.forEach((l,i)=>l.rotation.z=(i%2?sw:-sw));e.arms.forEach((a,i)=>a.rotation.z=(i%2?-sw:sw)*.8)}
function tdNameSprite(txt){const [c,g]=tdCan(256,64);g.font='700 30px "Atkinson Hyperlegible",system-ui';const w=Math.min(250,g.measureText(txt).width+24);g.fillStyle='rgba(20,22,30,.82)';rr(g,128-w/2,8,w,46,14);g.fill();g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';g.fillText(txt,128,32);
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tdTex(c),depthTest:false,transparent:true}));s.scale.set(1,.25,1);s.renderOrder=9;return s}
const tdEmo={};function tdEmoji(ic){if(!tdEmo[ic]){const [c,g]=tdCan(96,96);g.font='72px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(ic,48,54);tdEmo[ic]=new THREE.SpriteMaterial({map:tdTex(c),transparent:true})}return tdEmo[ic]}

function tdDynamic(scn,dt,city){
  // persone
  sceneNpcs().forEach(n=>{if(n.hide)return;const sig=n.animal?'a'+n.animal+n.fur:JSON.stringify(n.look);const e=tdPoolGet(n.id,sig,()=>{const r=n.animal?tdAnimal(n.animal,n.fur):tdHuman(n.look);r.g.traverse(o=>o.userData.npc=n.id);return r});
    tdPlace(e,n.x,n.y,n.tx!=null,n.ph,n.dir,dt,scn)});
  const inCar=city&&(S.drive||S.famDrive||(S.ride&&isCar((bestRide()||{}).id)));
  if(!inCar){const lk=playerLook(),e=tdPoolGet('_me',JSON.stringify(lk),()=>tdHuman(lk));tdPlace(e,S.pos.x,S.pos.y,S.moving,S.ph,S.face,dt,scn)}
  for(const [k,e] of TD.pool)if(e.seen!==TD.t&&e.g.parent)e.g.parent.remove(e.g);
  // macchine
  const L=[];
  if(city){TRAF.forEach(c=>{const [x,y]=carXY(c);if(Math.abs(x-S.pos.x)<34&&Math.abs(y-S.pos.y)<34)L.push([x,y,c.o==='h'?(c.d>0?0:Math.PI):(c.d>0?Math.PI/2:-Math.PI/2),c.col,c.stop,0,c.t9||(c.t9=TD_CARTYPES[Math.floor(Math.random()*TD_CARTYPES.length)])])});
    if(!S.carOut&&!S.drive)L.push([DRIVEWAY.x,DRIVEWAY.y,Math.PI/2,famCar().col]);famParked().forEach(q=>L.push([q.x,q.y,Math.PI/2,q.c.col]));
    if(S.parked&&!S.ride)L.push([S.parked.x,S.parked.y,S.parked.ang,myCarCol(S.parked.id)]);
    if(typeof JK!=='undefined'&&JK.pols)JK.pols.forEach((P,i)=>L.push([P.x,P.y,P.ang,'#f4f6f8',0,0,((TD.time*4|0)+i)%2?'polizia':'polizia2']));if(S.drive)L.push([S.pos.x,S.pos.y,S.drive.ang,famCar().col,0,1]);else if(S.famDrive)L.push([S.pos.x,S.pos.y,S.famDrive.ang,S.famDrive.jack?S.famDrive.jack.col:famCar().col,0,1,S.famDrive.jack&&S.famDrive.jack.t9]);else if(inCar)L.push([S.pos.x,S.pos.y,(ui.car||{}).ang||0,myCarCol(bestRide().id),0,1])}
  L.forEach(([x,y,a,col,stop,me,ty],i)=>{const sp=ty||(me?tdMyType():'berlina'),kk=col+sp;let c=TD.cars[i];if(!c||c.col!==kk){if(c)c.g.parent&&c.g.parent.remove(c.g);c=TD.cars[i]={g:tdCar(col,sp),col:kk}}if(c.g.parent!==scn)scn.add(c.g);c.g.position.set(x,0,y);c.g.rotation.y=-a});
  for(let i=L.length;i<TD.cars.length;i++){const c=TD.cars[i];if(c.g.parent)c.g.parent.remove(c.g)}
  TD.me=inCar?{x:S.pos.x,y:S.pos.y,a:-TD.cars[L.length-1].g.rotation.y,car:true}:{x:S.pos.x,y:S.pos.y,a:(TD.pool.get('_me')||{}).a||0,car:false};
  // oggetti da raccogliere
  const LT=city?S.loot.filter(it=>Math.abs(it.x-S.pos.x)<30&&Math.abs(it.y-S.pos.y)<30):[];
  LT.forEach((it,i)=>{let s=TD.loot[i];const ic=(LOOT[it.k]||{}).ic||'⭐';if(!s){s=TD.loot[i]=new THREE.Sprite(tdEmoji(ic));s.scale.set(.42,.42,1)}s.material=tdEmoji(ic);if(s.parent!==scn)scn.add(s);s.position.set(it.x,.35+Math.sin(TD.time*3+i)*.06,it.y)});
  for(let i=LT.length;i<TD.loot.length;i++)if(TD.loot[i].parent)TD.loot[i].parent.remove(TD.loot[i]);
  // segnale giallo (come le missioni di GTA) e nome di chi è vicino
  if(!TD.mark){TD.mark=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.7,24,1,true),new THREE.MeshBasicMaterial({color:0xffd23a,transparent:true,opacity:.38,side:THREE.DoubleSide,depthWrite:false}));
    TD.arrow=new THREE.Mesh(new THREE.ConeGeometry(.12,.24,4),new THREE.MeshBasicMaterial({color:0xffd23a}));TD.arrow.rotation.x=Math.PI}
  let mk=null,ar=null;const sc=curSc();
  if(near&&near.type==='enter')mk=[near.ex+.5,near.ey+.5];
  else if(near&&near.type==='furn'&&sc.furn&&sc.furn[near.i]){const f=sc.furn[near.i];ar=[f.x+f.w/2,(TD_FH[f.k]||.42)+.35,f.y+f.h/2]}
  else if(near&&near.type==='npc'){const n=NPCS.find(n=>n.id===near.id);if(n){ar=[n.x,n.animal?.7:.95*({baby:.48,kid:.66,teen:.88,adult:1,old:.95}[(n.look||{}).age]||1)+.2,n.y];
    if(!TD.nm||TD.nm.id!==n.id){if(TD.nm)TD.nm.s.parent&&TD.nm.s.parent.remove(TD.nm.s);TD.nm={id:n.id,s:tdNameSprite(n.name)}}if(TD.nm.s.parent!==scn)scn.add(TD.nm.s);TD.nm.s.position.set(n.x,ar[1]+.28,n.y)}}
  if(!(near&&near.type==='npc')&&TD.nm&&TD.nm.s.parent)TD.nm.s.parent.remove(TD.nm.s);
  if(mk){if(TD.mark.parent!==scn)scn.add(TD.mark);TD.mark.position.set(mk[0],.35,mk[1]);TD.mark.scale.setScalar(1+Math.sin(TD.time*4)*.05)}else if(TD.mark.parent)TD.mark.parent.remove(TD.mark);
  if(ar){if(TD.arrow.parent!==scn)scn.add(TD.arrow);TD.arrow.position.set(ar[0],ar[1]+Math.sin(TD.time*5)*.05,ar[2]);TD.arrow.rotation.y+=dt*2}else if(TD.arrow.parent)TD.arrow.parent.remove(TD.arrow);
}

/* ---------- telecamera alle spalle (con i muri che non la attraversano) ---------- */
// 3 distanze della telecamera (come le viste di GTA): vicina, media, lontana
const TD_CZ=[[1,1],[1.5,1.7],[2.2,2.8]];TD.cz=(()=>{try{return Math.min(2,Math.max(0,+(localStorage.getItem('vita_td9z')||0)))}catch(e){return 0}})();
function tdSetZoom(z,quiet){TD.cz=(z+3)%3;try{localStorage.setItem('vita_td9z',String(TD.cz))}catch(e){}if(!quiet)toast(['🔭 Telecamera vicina','🔭 Telecamera media','🔭 Telecamera lontana: vedi più città!'][TD.cz])}
function tdCamera(dt,city){
  const me=TD.me,now=performance.now(),sc=curSc();
  if(keys.KeyQ)TD.rot=1;else if(keys.KeyR)TD.rot=-1;else if(!TD.btnRot)TD.rot=0;
  if(TD.rot){TD.yaw+=TD.rot*2.2*dt;TD.manT=now}
  else if((S.moving||me.car)&&now-TD.manT>(me.car?500:1200)){const df=wrapA(me.a-TD.yaw);if(me.car||Math.abs(df)<2.1)TD.yaw+=df*Math.min(1,dt*(me.car?5.5:1.6))}
  const rc=TD.rc||[3.1,3.2,1.2],cz=city?TD_CZ[TD.cz|0]||TD_CZ[0]:TD_CZ[0],dist=(me.car?2.75:city?2.9:rc[0])*cz[0],hgt=(me.car?.92:city?1.32:rc[1])*cz[1],f=[Math.cos(TD.yaw),Math.sin(TD.yaw)];
  const blocked=(x,y)=>city?at(Math.floor(x),Math.floor(y))===4:(x<-.5||y<-.5||x>sc.w+.5||y>sc.h+.5);
  let d=.3;while(d<dist&&!blocked(me.x-f[0]*(d+.18),me.y-f[1]*(d+.18)))d+=.06;
  const tx=me.x-f[0]*d,tz=me.y-f[1]*d,ty=me.car?hgt*(.6+.4*d/dist)+Math.max(0,1.8-d)*.9:city?hgt*(.55+.45*d/dist)+Math.max(0,1.4-d)*1.1:hgt,C=TD.cam;
  if(TD.snap){C.position.set(tx,ty,tz);TD.snap=0}else{const k=Math.min(1,dt*9);C.position.x+=(tx-C.position.x)*k;C.position.y+=(ty-C.position.y)*k;C.position.z+=(tz-C.position.z)*k}
  if(Math.hypot(C.position.x-tx,C.position.z-tz)>d*1.4+.4)C.position.set(tx,ty,tz);
  const ah=me.car?.6+3.6*Math.min(1,d/dist):city?1.7:rc[2];C.lookAt(me.x+f[0]*ah,me.car?.62:city?.62:.3,me.y+f[1]*ah);if(!TD.uP){TD.uP={value:new THREE.Vector3()};TD.uC={value:new THREE.Vector3()}}TD.uP.value.set(me.x,.45,me.y);TD.uC.value.copy(C.position)}

/* ---------- giorno, tramonto, notte ---------- */
function tdLight(){const C=TD.city,d=gtaDark()/.5,ss=gtaSunset()/.16,me=TD.me;
  const sky=tdMix('#bcd6ea','#f2b07a',ss*.8).lerp(new THREE.Color('#0b1531'),d);C.sc.background.copy(sky).convertSRGBToLinear();C.sc.fog.color.copy(C.sc.background);
  C.sun.intensity=1.25*(1-d)+.06;C.sun.color.copy(tdMix('#fff3e0','#ff9a4a',ss));C.hemi.intensity=.42*(1-d)+.16;C.hemi.color.copy(tdMix('#dfefff','#ffc59a',ss));
  TD.sky.position.copy(TD.cam.position);TD.sky.material.color.copy(tdMix('#ffffff','#ffb27a',ss*.7).lerp(new THREE.Color('#1a2340'),d*.92));
  C.sun.position.set(me.x+9,11,me.y+6);C.sun.target.position.set(me.x,0,me.y);
  const n=d>.15?1:0;TD.lampHead.emissiveIntensity=n*1.8;TD.winMats.forEach(m=>m.emissiveIntensity=d*.95);TD.envK=1-d*.85;TD.envMats.forEach(m=>m.envMapIntensity=TD.envK*(m.roughnessMap?.55:1));
  TD.signMats.forEach(m=>m.color.setScalar(1+d*.9));if(TD.carLightM)TD.carLightM.color.setScalar(1+d*1.4);
  {const v=new THREE.Vector3(9,11,6).normalize();TD.sunS.position.copy(TD.cam.position).addScaledVector(v,150);TD.sunS.material.color.setScalar((1-d)*4.5);TD.sunS.material.color.lerp(new THREE.Color(4,2.2,1.1),ss*(1-d));}
  if(TD.pp){const F=TD.pp.fin.uniforms;F.warm.value=.3+ss*.6;F.ex.value=.9+d*.3}
  if(n){const L=LAMPS.map(([x,y])=>[Math.hypot(x-me.x,y-me.y),x,y]).sort((a,b)=>a[0]-b[0]).slice(0,4);TD.pts.forEach((p,i)=>{p.intensity=L[i]?1.1*d:0;if(L[i])p.position.set(L[i][1]+.28,1.4,L[i][2])})}else TD.pts.forEach(p=>p.intensity=0);
  if(!TD.semT||TD.time-TD.semT>.3){TD.semT=TD.time;const {P,li}=TD.sem,col={r:new THREE.Color(0xff2a20),y:new THREE.Color(0xffc21a),g:new THREE.Color(0x2bff6a)};
    P.forEach(([x,y,ax],i)=>{const st=lightAt(x,y,ax==='v'?'h':'v');li.setColorAt(i*2,col[st]);li.setColorAt(i*2+1,col[st])});if(li.instanceColor)li.instanceColor.needsUpdate=true}}

/* ---------- il disegno di ogni fotogramma ---------- */
function tdResize(){if(!TD.R)return;TD.R.setSize(innerWidth,innerHeight,false);TD.cam.aspect=innerWidth/innerHeight;TD.cam.fov=TD.cam.aspect<1?72:58;TD.cam.updateProjectionMatrix();tdPostSize()}
function tdInit(){try{tdInit0()}catch(e){try{if(TD.R){TD.R.domElement.remove();TD.R.dispose();TD.R.forceContextLoss&&TD.R.forceContextLoss()}}catch(_){}TD.R=null;TD.city=null;TD.pp=null;removeEventListener('resize',tdResize);throw e}}
function tdInit0(){
  const R=new THREE.WebGLRenderer({antialias:false,powerPreference:'high-performance'});R.setPixelRatio(Math.min(TD.hq?1.5:1,devicePixelRatio||1));
  R.outputEncoding=THREE.LinearEncoding;R.toneMapping=THREE.NoToneMapping;R.shadowMap.enabled=TD.hq;R.shadowMap.type=THREE.PCFSoftShadowMap;
  const el=R.domElement;el.id='td9';el.style.cssText='position:fixed;inset:0;width:100%;height:100%;display:block;pointer-events:none;background:#000';cv.parentNode.insertBefore(el,cv);el.addEventListener('webglcontextlost',e=>{e.preventDefault();TD.lost=1},false);el.addEventListener('webglcontextrestored',()=>{TD.lost=0;TD.snap=1;TD.uiK=null},false);
  TD.R=R;TD.cam=new THREE.PerspectiveCamera(62,1,.05,220);tdPostInit();tdResize();addEventListener('resize',tdResize);tdBuildCity();TD.snap=1}
function tdPerf(dt){if(!TD.hq||TD.perfDone)return;TD.pf=(TD.pf||[]);if(dt>0)TD.pf.push(dt);if(TD.pf.length<150)return;TD.perfDone=1;const a=TD.pf.slice(30).sort((x,y)=>x-y),m=a[a.length>>1];
  if(m>.045){$('td9q').click();toast('⚡ Il telefono era lento: ho messo la grafica leggera. Tocca ⚡ per rimettere quella al massimo.')}}
function tdRender(t){
  if(!TD.R)tdInit();else if(!TD.city)tdBuildCity();const sc=curSc(),city=sc.id==='citta',dt=Math.min(.05,(t-(TD.lt||t))/1000);TD.lt=t;TD.time=t/1000;TD.t++;if(!ui.mg)tdPerf(dt);
  if(TD.scId!==sc.id){TD.scId=sc.id;TD.snap=1;tdFreeRoom();if(!city){tdBuildRoom(sc);TD.yaw=-Math.PI/2}TD.pick=city?TD.cityPick:TD.room.pick}
  const scn=city?TD.city.sc:TD.room.sc;
  if(city)tdChunks();
  tdDynamic(scn,dt,city);if(TD.camFix){TD.cam.position.copy(TD.camFix.p);TD.cam.lookAt(TD.camFix.t)}else tdCamera(dt,city);if(city)tdLight();
  if(!city&&TD.pp){const F=TD.pp.fin.uniforms;F.warm.value=.18;F.ex.value=1.05}
  TD.R.domElement.style.display='block';if(!ui.mg)tdPost(scn)}
function tdOverlay(){
  cx.setTransform(DPR,0,0,DPR,0,0);cx.clearRect(0,0,VW,VH);cx.textAlign='center';cx.textBaseline='middle';const sc=curSc();
  if(ui.joy&&ui.joy.moved){const j=ui.joy,l=Math.hypot(j.x-j.ox,j.y-j.oy),k=Math.min(1,40/l);
    cx.strokeStyle='rgba(255,255,255,.75)';cx.lineWidth=3;cx.beginPath();cx.arc(j.ox,j.oy,40,0,7);cx.stroke();
    cx.fillStyle='rgba(255,255,255,.55)';cx.beginPath();cx.arc(j.ox+(j.x-j.ox)*k,j.oy+(j.y-j.oy)*k,18,0,7);cx.fill()}
  if(sc.id!=='citta'){const b=BUILD.find(x=>x.id===sc.id)||SCN[sc.id];if(b){cx.font='800 18px "Baloo 2",system-ui';const label=b.ic+' '+b.n,w=cx.measureText(label).width+28;
    cx.fillStyle='rgba(255,253,247,.95)';rr(cx,VW/2-w/2,VH-46,w,32,16);cx.fill();cx.strokeStyle='#1f2540';cx.lineWidth=2;cx.stroke();cx.fillStyle='#1f2540';cx.fillText(label,VW/2,VH-30)}}}
{const _dr=draw;draw=function(t){
  let on=false;try{on=tdActive()}catch(e){}
  // se il 3D si inceppa per un attimo non si spegne: riprova da solo (solo dopo tanti errori di fila torna la mappa, e poi riprova ancora)
  if(!on&&TD.fail&&TD.on&&TD.ok&&(TD.retry||0)<6&&performance.now()-(TD.failT||0)>3000){TD.fail=false;TD.retry=(TD.retry||0)+1;TD.errN=0;try{on=tdActive()}catch(e){}}
  if(on){try{tdRender(t);tdOverlay();tdUi();TD.errN=0;return}catch(e){console.error('3D',e);TD.lastErr=String(e&&e.message||e);TD.errN=(TD.errN||0)+1;if(TD.errN>=4){TD.fail=true;TD.failT=performance.now();td3Fallback()}else return}}
  if(TD.R)TD.R.domElement.style.display='none';tdUi();return _dr(t)}}

/* ---------- comandi: il joystick va nella direzione in cui guardi ---------- */
{const _jv=joyVec;joyVec=function(){const v=_jv();if(!tdActive())return v;let jx=0,jy=0;
  if(v)[jx,jy]=v;else{const K=c=>keys[c];if(K('ArrowUp')||K('KeyW'))jy-=1;if(K('ArrowDown')||K('KeyS'))jy+=1;if(K('ArrowLeft')||K('KeyA'))jx-=1;if(K('ArrowRight')||K('KeyD'))jx+=1;if(!jx&&!jy)return null;const l=Math.hypot(jx,jy);jx/=l;jy/=l}
  const f=[Math.cos(TD.yaw),Math.sin(TD.yaw)],r=[-f[1],f[0]];return [f[0]*-jy+r[0]*jx,f[1]*-jy+r[1]*jx]}}
{const _id=inputDir;inputDir=function(){return tdActive()?null:_id()}}
function tdPickAt(px,py){const rc=new THREE.Raycaster(),v=new THREE.Vector2(px/innerWidth*2-1,-(py/innerHeight)*2+1);rc.setFromCamera(v,TD.cam);
  const objs=[...TD.pick];TD.pool.forEach(e=>{if(e.g.parent)objs.push(e.g)});let hit=rc.intersectObjects(objs,true)[0];
  if(curSc().id==='citta'){const v=new THREE.Vector3();let best=null;(TD.bb||[]).forEach(q=>{if(rc.ray.intersectBox(q.box,v)){const d=v.distanceTo(rc.ray.origin);if(!best||d<best.d)best={d,b:q.b,p:v.clone()}}});
    if(best&&(!hit||best.d<hit.distance)){if(best.b)return {x:best.b.x+best.b.w/2,y:best.b.y+best.b.h/2};return {x:best.p.x,y:best.p.z}}}
  if(!hit)return null;
  let o=hit.object;while(o&&!o.userData.npc&&!o.userData.b&&o.userData.fu==null)o=o.parent;
  if(o&&o.userData.npc){const n=NPCS.find(n=>n.id===o.userData.npc);if(n)return {x:n.x,y:n.y+.4}}
  if(o&&o.userData.b){const b=o.userData.b;return {x:b.x+b.w/2,y:b.y+b.h/2}}
  if(o&&o.userData.fu!=null){const f=curSc().furn[o.userData.fu];return {x:f.x+f.w/2,y:f.y+f.h/2}}
  return {x:hit.point.x,y:hit.point.z}}
{const _tw=tapWorld;tapWorld=function(px,py){if(!tdActive())return _tw(px,py);const h=tdPickAt(px,py);if(!h)return;const ox=cam.x,oy=cam.y;cam.x=0;cam.y=0;try{_tw(h.x*T,h.y*T)}finally{cam.x=ox;cam.y=oy}}}

/* ---------- pulsanti: gira la telecamera e cambia vista ---------- */
function tdUi(){let el=$('td9ui');if(!el){el=document.createElement('div');el.id='td9ui';
    el.innerHTML='<button type="button" class="td9b" id="td9q" title="Qualità grafica"></button><button type="button" class="td9b" id="td9v" title="Cambia vista"></button><button type="button" class="td9b" id="td9z" title="Telecamera vicina o lontana">🔭</button><button type="button" class="td9b" id="td9l" title="Gira a sinistra">⟲</button><button type="button" class="td9b" id="td9r" title="Gira a destra">⟳</button>';document.body.appendChild(el);
    $('td9v').onclick=()=>{let act=false;try{act=tdActive()}catch(e){}
      // il tasto fa sempre quello che mostra: se vedi 🎥 accende il 3D (anche se prima si era inceppato), se vedi 🗺️ torna alla mappa
      if(!TD.ok){toast('🎥 La vista 3D si sta ancora caricando: riprova tra un attimo!');return}
      TD.on=!act;TD.fail=false;TD.errN=0;TD.retry=0;TD.lost=0;TD.told=0;TD.uiK=null;TD.snap=1;try{localStorage.setItem('vita_td9',TD.on?'1':'0')}catch(e){}toast(TD.on?'🎥 Vista 3D da dietro, come GTA!':'🗺️ Vista dall\'alto')};
    $('td9z').onclick=()=>tdSetZoom(TD.cz+1);addEventListener('wheel',e=>{if(!tdActive()||curSc().id!=='citta'||isBusy())return;const n=Math.max(0,Math.min(2,TD.cz+(e.deltaY>0?1:-1)));if(n!==TD.cz)tdSetZoom(n)},{passive:true});
    $('td9q').onclick=()=>{TD.hq=!TD.hq;try{localStorage.setItem('vita_td9q',TD.hq?'1':'0')}catch(e){}TD.uiK=null;if(TD.R){TD.R.setPixelRatio(Math.min(TD.hq?1.5:1,devicePixelRatio||1));TD.R.shadowMap.enabled=TD.hq;
      [TD.city&&TD.city.sc,TD.room&&TD.room.sc].forEach(sc=>sc&&sc.traverse(o=>{if(o.material)[].concat(o.material).forEach(m=>m.needsUpdate=true)}));tdPostInit();tdResize()}
      toast(TD.hq?'✨ Grafica al massimo: luci, riflessi e ombre!':'⚡ Grafica leggera: più veloce sul telefono')};
    [['td9l',1],['td9r',-1]].forEach(([id,d])=>{const b=$(id),go=e=>{e.preventDefault();TD.rot=d;TD.btnRot=1},st=()=>{TD.rot=0;TD.btnRot=0};b.addEventListener('pointerdown',go);['pointerup','pointerleave','pointercancel'].forEach(k=>b.addEventListener(k,st))})}
  const sc=S&&curSc(),show=TD.ok&&S&&S.alive&&sc&&tdSupported(sc)&&!isBusy()&&!ui.mg&&!S.drive;el.hidden=!show;if(!show)return;const on=tdActive();
  const k=(on?1:0)+(TD.hq?2:0)+(sc.id==='citta'?4:0);if(TD.uiK!==k){TD.uiK=k;$('td9v').textContent=on?'🗺️':'🎥';$('td9q').textContent=TD.hq?'✨':'⚡';$('td9l').hidden=$('td9r').hidden=$('td9q').hidden=!on;$('td9z').hidden=!on||sc.id!=='citta'}}
document.head.insertAdjacentHTML('beforeend',`<style>#td9ui{position:fixed;z-index:4;right:max(10px,env(safe-area-inset-right,0px));top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:10px}
#td9ui[hidden]{display:none}.td9b{width:48px;height:48px;border-radius:50%;background:rgba(14,16,24,.72);color:#fff;border:2px solid rgba(255,255,255,.55);font-size:22px;line-height:1;cursor:pointer;touch-action:none;box-shadow:0 3px 10px rgba(0,0,0,.4)}
.td9b[hidden]{display:none}.td9b:active{background:rgba(242,193,78,.85);color:#111}</style>`);

// il 3D si è inceppato: la prima volta passa alla grafica semplice (senza effetti) e riprova; se proprio non va lo dice sullo schermo
function td3Fallback(){try{if(!TD.safe){TD.safe=1;TD.hq=false;if(TD.R){const R=TD.R;R.shadowMap.enabled=false;R.setPixelRatio(1);R.outputEncoding=THREE.sRGBEncoding;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.05;R.setRenderTarget(null);[TD.city&&TD.city.sc,TD.room&&TD.room.sc].forEach(sc=>sc&&sc.traverse(o=>{if(o.material)[].concat(o.material).forEach(m=>m.needsUpdate=true)}));tdResize()}TD.uiK=null;toast('⚡ Il 3D si era bloccato: ho messo la grafica semplice e riprovo…');return}
  if((TD.retry||0)>=2&&!TD.told){TD.told=1;const e=TD.lastErr||'?',gl=/WebGL|context/i.test(e);
    toast(gl?'😕 Questo telefono non riesce ad aprire la vista 3D (WebGL spento). Prova con Chrome aggiornato.':'😕 La vista 3D non riesce a partire. Fai una foto a questo messaggio e mandala: «'+e.slice(0,90)+'»')}}catch(_){}}
