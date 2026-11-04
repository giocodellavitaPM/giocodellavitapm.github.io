/* ================= v9: strade più vere: niente persone o auto che si attraversano, cartelli stradali e frecce sull'asfalto ================= */
// ingombro di una macchina del traffico (rettangolo lungo la strada)
function st9Hit(c,px,py,pad){const [x,y]=carXY(c),h=c.o==='h',L=.92+pad,Wd=.46+pad;
  if(c.ang9!=null&&c.tvK){const ca=Math.cos(c.ang9),sa=Math.sin(c.ang9),rx=px-x,ry=py-y;return Math.abs(rx*ca+ry*sa)<L&&Math.abs(-rx*sa+ry*ca)<Wd}
  return h?Math.abs(px-x)<L&&Math.abs(py-y)<Wd:Math.abs(px-x)<Wd&&Math.abs(py-y)<L}
const st9Any=(px,py,pad)=>{for(const c of TRAF)if(st9Hit(c,px,py,pad))return true;return false};
// a piedi: non si passa attraverso le macchine (vale anche per le persone del gioco)
{const _f=freeIn;freeIn=function(sc,px,py){const r=_f.apply(this,arguments);if(!r||!S||S.scene!=='citta'||(sc&&sc.id&&sc.id!=='citta'))return r;
  try{if(S.drive||S.ride||S.famDrive)return r;if(!st9Any(px,py,.26))return true;
    // se sei già vicinissimo a una macchina (ti è arrivata addosso) puoi sempre allontanarti
    const me=Math.abs(px-S.pos.x)<.4&&Math.abs(py-S.pos.y)<.4;if(me&&st9Any(S.pos.x,S.pos.y,.26)){let d0=9,d1=9;for(const c of TRAF){const [x,y]=carXY(c);d0=Math.min(d0,Math.hypot(S.pos.x-x,S.pos.y-y));d1=Math.min(d1,Math.hypot(px-x,py-y))}return d1>=d0}
    return false}catch(e){return r}}}
const STR9={wt:0,bt:0};
// in macchina: urti veri anche di lato e in curva (la tua auto è lunga, non un puntino)
{const _cm=carMove;carMove=function(st,dt,maxV){const x0=S.pos.x,y0=S.pos.y,v0=st.v||0;const r=_cm.apply(this,arguments);
  try{if(S.scene!=='citta')return r;const ca=Math.cos(st.ang||0),sa=Math.sin(st.ang||0);
    const hit=(X,Y)=>{for(const k of [-.55,0,.55]){const px=X+ca*k,py=Y+sa*k;if(st9Any(px,py,.3))return true}return false};
    if(hit(S.pos.x,S.pos.y)&&!hit(x0,y0)){S.pos.x=x0;S.pos.y=y0;st.v=0;
      if(Math.abs(v0)>2.2&&performance.now()-STR9.bt>2500){STR9.bt=performance.now();toast('💥 Bump! Hai urtato un\'altra macchina: vai piano e tieni la distanza.');try{if(navigator.vibrate)navigator.vibrate(60)}catch(_){}}
      return false}}catch(e){}return r}}

/* ---------- cartelli stradali e frecce sull'asfalto (3D) ---------- */
function st9Tex(k){const [c,g]=tdCan(128,128);g.lineJoin='round';const C=64;
  const circ=(fill,ring,rw)=>{g.beginPath();g.arc(C,C,58,0,Math.PI*2);g.fillStyle=ring;g.fill();g.beginPath();g.arc(C,C,58-rw,0,Math.PI*2);g.fillStyle=fill;g.fill()};
  const txt=(t,col,sz,y)=>{g.fillStyle=col;g.font=`900 ${sz}px Arial,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(t,C,y||C+3)};
  if(k==='lim'){circ('#fff','#d0221b',13);txt('50','#111',54)}
  else if(k==='lim30'){circ('#fff','#d0221b',13);txt('30','#111',54)}
  else if(k==='sosta'){circ('#1f56b8','#d0221b',13);g.strokeStyle='#d0221b';g.lineWidth=12;g.beginPath();g.moveTo(26,26);g.lineTo(102,102);g.stroke()}
  else if(k==='acc'){circ('#d0221b','#d0221b',0);g.fillStyle='#fff';g.fillRect(22,54,84,20)}
  else if(k==='rot'){circ('#1f56b8','#fff',4);g.strokeStyle='#fff';g.lineWidth=10;g.beginPath();g.arc(C,C,30,.3,Math.PI*1.9);g.stroke();g.fillStyle='#fff';g.beginPath();g.moveTo(C+30,C-24);g.lineTo(C+44,C+2);g.lineTo(C+16,C+2);g.fill()}
  else if(k==='park'){g.fillStyle='#fff';g.fillRect(4,4,120,120);g.fillStyle='#1f56b8';g.fillRect(10,10,108,108);txt('P','#fff',86,C+6)}
  else if(k==='ped'){g.fillStyle='#fff';g.fillRect(4,4,120,120);g.fillStyle='#1f56b8';g.fillRect(10,10,108,108);g.fillStyle='#fff';g.beginPath();g.moveTo(C,18);g.lineTo(112,108);g.lineTo(16,108);g.closePath();g.fill();txt('🚶','#111',46,C+20)}
  else if(k==='uni'){g.fillStyle='#fff';g.fillRect(4,4,120,120);g.fillStyle='#1f56b8';g.fillRect(10,10,108,108);g.fillStyle='#fff';g.fillRect(52,46,24,64);g.beginPath();g.moveTo(C,14);g.lineTo(98,52);g.lineTo(30,52);g.fill()}
  else if(k==='prec'){g.beginPath();g.moveTo(8,14);g.lineTo(120,14);g.lineTo(C,118);g.closePath();g.fillStyle='#d0221b';g.fill();g.beginPath();g.moveTo(28,26);g.lineTo(100,26);g.lineTo(C,100);g.closePath();g.fillStyle='#fff';g.fill()}
  else if(k==='stop'){g.beginPath();for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;g.lineTo(C+60*Math.cos(a),C+60*Math.sin(a))}g.closePath();g.fillStyle='#fff';g.fill();g.beginPath();for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;g.lineTo(C+54*Math.cos(a),C+54*Math.sin(a))}g.closePath();g.fillStyle='#d0221b';g.fill();txt('STOP','#fff',36)}
  else if(k==='freccia'||k==='frecciaD'){g.fillStyle='#f4f4ee';g.fillRect(56,40,16,84);g.beginPath();g.moveTo(C,4);g.lineTo(96,44);g.lineTo(32,44);g.fill();
    if(k==='frecciaD'){g.fillRect(64,74,34,14);g.beginPath();g.moveTo(124,81);g.lineTo(96,60);g.lineTo(96,102);g.fill()}}
  const t=new THREE.CanvasTexture(c);t.anisotropy=4;return t}
function st9Dir(nm){const [c,g]=tdCan(256,96);g.fillStyle='#fff';g.fillRect(0,0,256,96);g.fillStyle='#14713d';g.fillRect(5,5,246,86);g.fillStyle='#fff';g.font='800 34px Arial,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(nm,128,50);const t=new THREE.CanvasTexture(c);t.anisotropy=4;return t}
function st9Build(sc){if(!sc||typeof RX==='undefined')return;const G=new THREE.Group();G.name='strade9';sc.add(G);
  const poleG=new THREE.CylinderGeometry(.025,.025,1.5,6);poleG.translate(0,.75,0);const poleM=tdMat('#8d939b');
  const plate=new THREE.PlaneGeometry(.42,.42),back=tdMat('#9aa0a6'),dirG=new THREE.PlaneGeometry(.9,.34);
  const mats={},M=k=>mats[k]||(mats[k]=new THREE.MeshBasicMaterial({map:st9Tex(k),transparent:true,alphaTest:.3,side:THREE.FrontSide}));
  const backG=new THREE.PlaneGeometry(.4,.4);
  const free2=(x,y)=>{const v=at(Math.floor(x),Math.floor(y));return v===2||v===6||v===7||v===8};
  const kinds=['lim','ped','prec','sosta','park','lim30','stop','rot','uni','acc'];const places=['Centro','Ospedale','Scuola','Stazione','Parco','Spiaggia','Stadio','Municipio'];
  let n=0,poles=[];
  const sign=(x,z,th,k,dirTxt)=>{if(!free2(x,z))return;for(const [px,pz] of poles)if(Math.hypot(px-x,pz-z)<.6)return;poles.push([x,z]);
    const p=new THREE.Mesh(poleG,poleM);p.position.set(x,0,z);G.add(p);
    let m;if(dirTxt){const tm=new THREE.MeshBasicMaterial({map:st9Dir(dirTxt)});m=new THREE.Mesh(dirG,tm);m.position.set(x,1.32,z)}else{m=new THREE.Mesh(plate,M(k));m.position.set(x,1.3,z)}
    m.rotation.y=th;G.add(m);const b=new THREE.Mesh(backG,back);b.position.copy(m.position);b.rotation.y=th+Math.PI;b.position.x-=Math.sin(th)*.004;b.position.z-=Math.cos(th)*.004;if(!dirTxt)G.add(b);n++};
  // un cartello per ogni strada che arriva a un incrocio, sul marciapiede a destra
  RX.forEach((cx,ix)=>RY.forEach((cy,iy)=>{
    const A=[[1,0],[-1,0],[0,1],[0,-1]];A.forEach(([dx,dz],ai)=>{
      const h=dx!==0,centre=h?cy+1:cx+1,start=h?(dx>0?cx:cx+2):(dz>0?cy:cy+2),along=start-(h?dx:dz)*1.25,rx=-dz,rz=dx;
      const x=h?along:centre+rx*1.45,z=h?centre+rz*1.45:along,th=Math.atan2(-dx,-dz);
      let k=kinds[(ix*7+iy*3+ai*5)%kinds.length];if(k==='acc'||k==='stop'||k==='prec')k=['lim','ped','park','lim30'][(ix+iy+ai)%4];if(!sem9Has(ix,iy))k=sem9Kind(ix,iy)==='rot'?(ai%2?'prec':'rot'):(h?'prec':'stop');
      sign(x,z,th,k);
      // ogni tanto un cartello verde con le indicazioni
      if((ix+iy+ai)%4===0){const a2=along-(h?dx:dz)*2.2;sign(h?a2:centre+rx*1.45,h?centre+rz*1.45:a2,th,null,places[(ix*4+iy+ai)%places.length]+(ai%2?' ➜':' ⬆'))}
    })}));
  // frecce bianche sull'asfalto prima di ogni incrocio, una per corsia
  const arG=new THREE.PlaneGeometry(.55,.95);arG.rotateX(-Math.PI/2);const am={f:new THREE.MeshBasicMaterial({map:st9Tex('freccia'),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2}),d:new THREE.MeshBasicMaterial({map:st9Tex('frecciaD'),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2})};
  let na=0;RX.forEach((cx,ix)=>RY.forEach((cy,iy)=>{[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dz],ai)=>{const h=dx!==0,lane=h?(dx>0?cy+1.5:cy+.5):(dz>0?cx+.5:cx+1.5),start=h?(dx>0?cx:cx+2):(dz>0?cy:cy+2),along=start-(h?dx:dz)*2.6;
      const x=h?along:lane,z=h?lane:along;const v=at(Math.floor(x),Math.floor(z));if(v!==1)return;
      const m=new THREE.Mesh(arG,(ix+iy+ai)%2?am.d:am.f);m.position.set(x,.03,z);m.rotation.y=Math.atan2(-dx,-dz);m.renderOrder=2;G.add(m);na++})}));
  TD.st9={n,na}}
{const _b=tdBuildCity;tdBuildCity=function(){const r=_b.apply(this,arguments);try{st9Build(TD.city&&TD.city.sc)}catch(e){console.warn('strade9',e)}return r}}

/* ---------- semafori solo a metà degli incroci; negli altri STOP e precedenza ---------- */
window.SEM9=1;
const sem9Has=(ix,iy)=>(ix+iy)%2===0;
// che tipo di incrocio: semaforo, rotatoria o STOP
const sem9Kind=(ix,iy)=>sem9Has(ix,iy)?'sem':ix%2===0?'rot':'stop';
function sem9Idx(x,y){return [RX.findIndex(c=>x>=c-1.5&&x<c+3.5),RY.findIndex(r=>y>=r-1.5&&y<r+3.5)]}
{const _l=lightAt;lightAt=function(x,y,ax){const [ix,iy]=sem9Idx(x,y);if(ix>=0&&iy>=0&&!sem9Has(ix,iy))return 'g';return _l.apply(this,arguments)}}
// senza semaforo i pedoni attraversano quando non arriva nessuna macchina
{const _p=pedOK;pedOK=function(x,y){const [ix,iy]=sem9Idx(x+.5,y+.5);if(ix>=0&&iy>=0&&!sem9Has(ix,iy))return !st9Any(x+.5,y+.5,1.6);return _p.apply(this,arguments)}}
// semafori dritti su un palo, con tre luci grandi (rosso, giallo, verde) rivolte verso chi arriva
function sem9Build(sc){const P=[];RX.forEach((cx,ix)=>RY.forEach((cy,iy)=>{if(!sem9Has(ix,iy)||(typeof inMZ==='function'&&inMZ(cx,cy)))return;
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dz])=>{const h=dx!==0,centre=h?cy+1:cx+1,rx=-dz,rz=dx;
      // uno prima dell'incrocio a destra e uno dall'altra parte, ben visibile da lontano
      for(const [st,lat] of [[h?(dx>0?cx:cx+2):(dz>0?cy:cy+2),1.25],[h?(dx>0?cx+2:cx):(dz>0?cy+2:cy),1.25]]){const along=st+(st===(h?(dx>0?cx:cx+2):(dz>0?cy:cy+2))?-(h?dx:dz)*.15:(h?dx:dz)*.25);
        P.push({x:h?along:centre+rx*lat,z:h?centre+rz*lat:along,th:Math.atan2(-dx,-dz),ax:h?'h':'v',cx:cx+1,cy:cy+1})}})}));
  const G=new THREE.Group();sc.add(G);const n=P.length;
  const po=new THREE.InstancedMesh(new THREE.CylinderGeometry(.035,.04,1.95,6).translate(0,.975,0),tdMat('#25282c'),n);
  const hb=new THREE.InstancedMesh(new THREE.BoxGeometry(.2,.56,.12).translate(0,0,0),tdMat('#141618'),n);
  const vis=new THREE.InstancedMesh(new THREE.BoxGeometry(.26,.62,.02),tdMat('#e0b021'),n);
  const lm=new THREE.InstancedMesh(new THREE.CircleGeometry(.068,16),new THREE.MeshBasicMaterial({color:0xffffff,toneMapped:false}),n*3);
  const m=new THREE.Matrix4(),q=new THREE.Quaternion(),e=new THREE.Euler(),sc1=new THREE.Vector3(1,1,1),v=new THREE.Vector3();
  P.forEach((p,i)=>{e.set(0,p.th,0);q.setFromEuler(e);const fx=Math.sin(p.th),fz=Math.cos(p.th);
    m.compose(v.set(p.x,0,p.z),q,sc1);po.setMatrixAt(i,m);
    m.compose(v.set(p.x+fx*.04,1.72,p.z+fz*.04),q,sc1);hb.setMatrixAt(i,m);
    m.compose(v.set(p.x-fx*.03,1.72,p.z-fz*.03),q,sc1);vis.setMatrixAt(i,m);
    [0.17,0,-0.17].forEach((dy,k)=>{m.compose(v.set(p.x+fx*.105,1.72+dy,p.z+fz*.105),q,sc1);lm.setMatrixAt(i*3+k,m);lm.setColorAt(i*3+k,new THREE.Color(0x222222))})});
  po.castShadow=hb.castShadow=true;G.add(po,hb,vis,lm);TD.sem9={P,lm,t:-1}}
function sem9Tick(){const S9=TD.sem9;if(!S9||TD.time-S9.t<.2)return;S9.t=TD.time;const on={r:new THREE.Color(3,.25,.18),y:new THREE.Color(3,2.1,.2),g:new THREE.Color(.3,3,.9)},off=new THREE.Color(.13,.12,.11),K=['r','y','g'];
  S9.P.forEach((p,i)=>{const st=lightAt(p.cx,p.cy,p.ax);K.forEach((k,j)=>S9.lm.setColorAt(i*3+j,k===st?on[k]:off))});S9.lm.instanceColor.needsUpdate=true}
{const _b=tdBuildCity;tdBuildCity=function(){const r=_b.apply(this,arguments);try{sem9Build(TD.city&&TD.city.sc)}catch(e){console.warn('sem9',e)}return r}}
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{if(city)sem9Tick()}catch(e){}return r}}

/* ---------- il traffico rispetta STOP, precedenze e rotatorie ---------- */
{const _t=trafficTick;trafficTick=function(dt){const pre=TRAF.map(c=>[c,c.p]);const r=_t.apply(this,arguments);try{
  for(const [c,p0] of pre){if(!TRAF.includes(c)||c.dwell>0)continue;const [x,y]=carXY(c),h=c.o==='h',nb=nextBoxDist(c.o,c.d,x,y);
    if(c.sw>0){c.sw-=dt;c.p=p0;c.stop=true;continue}
    if(!nb){continue}const bx=h?nb.c+1:x,by=h?y:nb.c+1,[ix,iy]=sem9Idx(bx,by);if(ix<0||iy<0)continue;const k=sem9Kind(ix,iy),key=ix+','+iy;
    if(k==='stop'&&!h&&nb.d<1.6&&nb.d>.9&&c.sb!==key&&c.p!==p0){c.sb=key;c.sw=.9;c.p=p0;c.stop=true;continue}
    if(nb.d>3)c.sb=null;
    // rotatoria e precedenza: si rallenta prima di entrare
    if((k==='rot'||(k==='stop'&&h))&&nb.d<2.2&&c.p!==p0){c.p=p0+(c.p-p0)*.55}
    if(k==='rot'&&inBox(x,y)&&c.p!==p0){c.p=p0+(c.p-p0)*.7}
  }}catch(e){}return r}}
/* ---------- in 2D: rotatorie dipinte, linee e scritte STOP, cartelli al posto dei semafori tolti ---------- */
{const _dc=drawCity;drawCity=function(t,x0,y0,x1,y1){_dc.apply(this,arguments);try{if(S.scene!=='citta')return;const c=cx;
  RX.forEach((rx,ix)=>RY.forEach((ry,iy)=>{if(rx<x0-3||rx>x1+3||ry<y0-3||ry>y1+3)return;const k=sem9Kind(ix,iy);if(k==='sem')return;const X=(rx+1)*T,Y=(ry+1)*T;
    if(k==='rot'){c.fillStyle='rgba(240,240,232,.95)';c.beginPath();c.arc(X,Y,T*.42,0,7);c.fill();c.fillStyle='#5c9a4a';c.beginPath();c.arc(X,Y,T*.32,0,7);c.fill();
      c.strokeStyle='rgba(240,240,232,.8)';c.lineWidth=2;c.setLineDash([6,5]);c.beginPath();c.arc(X,Y,T*.85,0,7);c.stroke();c.setLineDash([]);c.lineWidth=1}
    else{c.fillStyle='rgba(240,240,232,.92)';c.fillRect(rx*T,(ry-.12)*T,T,4);c.fillRect((rx+1)*T,(ry+2.04)*T,T,4);
      c.font='900 11px Arial';c.textAlign='center';c.textBaseline='middle';c.save();c.translate((rx+.5)*T,(ry-.55)*T);c.rotate(Math.PI);c.fillText('STOP',0,0);c.restore();c.fillText('STOP',(rx+1.5)*T,(ry+2.6)*T)}}))}catch(e){}}}
{const _s=drawSemaforo;drawSemaforo=function(x,y,ax){try{const [ix,iy]=sem9Idx(x,y);if(ix>=0&&iy>=0&&!sem9Has(ix,iy)){const k=sem9Kind(ix,iy),c=cx,X=x*T,Y=y*T;
    c.fillStyle='#8d939b';c.fillRect(X-1.2,Y-30,2.4,31);
    if(k==='rot'){c.fillStyle='#fff';c.beginPath();c.arc(X,Y-36,8,0,7);c.fill();c.fillStyle='#1f56b8';c.beginPath();c.arc(X,Y-36,7,0,7);c.fill();c.strokeStyle='#fff';c.lineWidth=1.6;c.beginPath();c.arc(X,Y-36,3.6,.4,5.6);c.stroke();c.lineWidth=1}
    else if(ax==='v'){c.fillStyle='#fff';c.beginPath();for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;c.lineTo(X+8.5*Math.cos(a),Y-36+8.5*Math.sin(a))}c.fill();c.fillStyle='#d0221b';c.beginPath();for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;c.lineTo(X+7.4*Math.cos(a),Y-36+7.4*Math.sin(a))}c.fill();c.fillStyle='#fff';c.font='900 5px Arial';c.textAlign='center';c.textBaseline='middle';c.fillText('STOP',X,Y-36)}
    else{c.fillStyle='#d0221b';c.beginPath();c.moveTo(X-9,Y-43);c.lineTo(X+9,Y-43);c.lineTo(X,Y-28);c.fill();c.fillStyle='#fff';c.beginPath();c.moveTo(X-5.5,Y-40.5);c.lineTo(X+5.5,Y-40.5);c.lineTo(X,Y-32);c.fill()}
    return}}catch(e){}return _s.apply(this,arguments)}}
/* ---------- in 3D: rotatorie dipinte sull'asfalto e semafori per i pedoni (omino rosso e verde) ---------- */
function sem9Man(){const [c,g]=tdCan(64,96);g.fillStyle='#0b0c0d';g.fillRect(0,0,64,96);g.fillStyle='#fff';g.beginPath();g.arc(32,18,9,0,7);g.fill();g.fillRect(24,30,16,30);g.fillRect(24,58,6,28);g.fillRect(34,58,6,28);g.fillRect(16,32,6,22);g.fillRect(42,32,6,22);const t=new THREE.CanvasTexture(c);return t}
{const _b=tdBuildCity;tdBuildCity=function(){const r=_b.apply(this,arguments);try{const sc=TD.city&&TD.city.sc;if(!sc)return r;const G=new THREE.Group();sc.add(G);
  const ring=new THREE.RingGeometry(.3,.42,40);ring.rotateX(-Math.PI/2);const disk=new THREE.CircleGeometry(.3,32);disk.rotateX(-Math.PI/2);const dash=new THREE.RingGeometry(.82,.86,48,1);dash.rotateX(-Math.PI/2);
  const wm=new THREE.MeshBasicMaterial({color:0xeeeee6,polygonOffset:true,polygonOffsetFactor:-3}),gm=tdMat('#5c9a4a',{polygonOffset:true,polygonOffsetFactor:-3});
  RX.forEach((rx,ix)=>RY.forEach((ry,iy)=>{if(sem9Kind(ix,iy)!=='rot')return;const a=new THREE.Mesh(ring,wm),b=new THREE.Mesh(disk,gm),d=new THREE.Mesh(dash,wm);a.position.set(rx+1,.035,ry+1);b.position.set(rx+1,.06,ry+1);d.position.set(rx+1,.034,ry+1);G.add(a,b,d)}));
  // omini per chi attraversa, sugli stessi pali dei semafori
  const S9=TD.sem9;if(S9){const n=S9.P.length,pm=new THREE.InstancedMesh(new THREE.PlaneGeometry(.15,.22),new THREE.MeshBasicMaterial({map:sem9Man(),toneMapped:false}),n),bx=new THREE.InstancedMesh(new THREE.BoxGeometry(.17,.25,.08),tdMat('#141618'),n);
    const m=new THREE.Matrix4(),q=new THREE.Quaternion(),e=new THREE.Euler(),one=new THREE.Vector3(1,1,1),v=new THREE.Vector3();
    S9.P.forEach((p,i)=>{const dx=Math.round(-Math.sin(p.th)),dz=Math.round(-Math.cos(p.th)),th=Math.atan2(dz,-dx),fx=Math.sin(th),fz=Math.cos(th);e.set(0,th,0);q.setFromEuler(e);
      m.compose(v.set(p.x+fx*.03,1.05,p.z+fz*.03),q,one);bx.setMatrixAt(i,m);m.compose(v.set(p.x+fx*.075,1.05,p.z+fz*.075),q,one);pm.setMatrixAt(i,m);pm.setColorAt(i,new THREE.Color(.3,.3,.3))});
    G.add(bx,pm);S9.pm=pm}}catch(e){console.warn('rot9',e)}return r}}
{const _k=sem9Tick;sem9Tick=function(){const S9=TD.sem9,t0=S9&&S9.t;_k.apply(this,arguments);try{if(!S9||!S9.pm||S9.t===t0)return;const R=new THREE.Color(3,.3,.2),Gc=new THREE.Color(.3,3,1);
  S9.P.forEach((p,i)=>S9.pm.setColorAt(i,lightAt(p.cx,p.cy,p.ax)==='r'?Gc:R));S9.pm.instanceColor.needsUpdate=true}catch(e){}}}
/* ---------- la tua macchina: luci dei freni quando freni, frecce quando giri, luce bianca in retromarcia ---------- */
{const _cm=carMove;carMove=function(st,dt,maxV){const v0=st.v||0,a0=st.ang||0;const r=_cm.apply(this,arguments);try{const v=st.v||0;STR9.brk=(Math.abs(v)<Math.abs(v0)-.02&&Math.abs(v0)>.3)||!!ui.brake;STR9.rev=v<-.05;const w=dt>0?wrapA((st.ang||0)-a0)/dt:0;STR9.turn=Math.abs(w)>.5&&Math.abs(v)>.3?Math.sign(w):0;STR9.mt=performance.now()}catch(e){}return r}}
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{if(!city||!TD.me||!TD.me.car||!TD.cars)return r;const c=TD.cars.find(c=>c&&c.g.parent&&Math.abs(c.g.position.x-S.pos.x)<.02&&Math.abs(c.g.position.z-S.pos.y)<.02);if(!c)return r;
  const B=tdBrakeFor(c.g),fresh=performance.now()-STR9.mt<300;if(B)B.visible=B.visible||(fresh&&STR9.brk);
  let I=c.g.userData.ind9;if(!I&&B){const sp=B.children.filter((o,i)=>i%2===0).map(o=>o.position);if(sp.length===2){const om=new THREE.MeshBasicMaterial({color:new THREE.Color(3,1.4,.1),toneMapped:false}),wm=new THREE.MeshBasicMaterial({color:new THREE.Color(2.5,2.5,2.5),toneMapped:false}),gq=new THREE.BoxGeometry(.03,.05,.07);
    I=c.g.userData.ind9={L:[],R:[],W:[]};sp.forEach(p=>{const side=p.z<0?'L':'R';[[p.x,p.z*1.12],[-p.x,p.z*1.12]].forEach(([x,z])=>{const m=new THREE.Mesh(gq,om);m.position.set(x,p.y+.05,z);m.visible=false;c.g.add(m);I[side].push(m)});const w=new THREE.Mesh(gq,wm);w.position.set(p.x,p.y-.05,p.z*.7);w.visible=false;c.g.add(w);I.W.push(w)})}}
  if(I){const blink=(performance.now()/350|0)%2===0,t=fresh?STR9.turn:0;I.L.forEach(m=>m.visible=blink&&t<0);I.R.forEach(m=>m.visible=blink&&t>0);I.W.forEach(m=>m.visible=fresh&&STR9.rev)}}catch(e){}return r}}

/* ---------- la tua auto in 3D: il modello giusto per la macchina che hai, e i fari che illuminano la strada di notte ---------- */
function tdMyType(){try{if(S.drive)return 'suv';const r=bestRide(),id=r&&r.id;return {sportiva:'sportiva',camper:'furgone',autousata:'utilitaria',autonuova:'berlina'}[id]||'berlina'}catch(e){return 'berlina'}}
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{const me=TD.me,dark=typeof gtaDark==='function'?gtaDark()/.5:0;
  if(!TD.hl9){const L=new THREE.SpotLight(0xfff1d6,0,9,.55,.55,1.2);TD.hl9=L;TD.hl9t=new THREE.Object3D();L.target=TD.hl9t}
  const L=TD.hl9;if(city&&me&&me.car&&dark>.15){if(L.parent!==scn){scn.add(L);scn.add(TD.hl9t)}const a=me.a,ca=Math.cos(a),sa=Math.sin(a);L.position.set(me.x+ca*.75,.45,me.y+sa*.75);TD.hl9t.position.set(me.x+ca*5,0,me.y+sa*5);L.intensity=2.6*Math.min(1,dark)}
  else if(L.intensity){L.intensity=0}
  if(TD.brkH&&!TD.brkH.o9){TD.brkH.o9=1;TD.brkH.opacity=.4}}catch(e){}return r}}
