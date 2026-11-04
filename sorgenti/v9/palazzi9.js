/* ================= v9: palazzi come nel manuale: grattacieli, condomini, ville e case a schiera più veri ================= */
function pz9Side(o){const d0=(o.doors&&o.doors[0])||[o.x+o.w/2,o.y+o.h],[ex,ey]=d0;return ey>=o.y+o.h?'s':ey<o.y?'n':ex<o.x?'w':'e'}
function pz9Put(o,side){return (geo,mat,lx,y,out,cast)=>{const m=new THREE.Mesh(geo,mat);let px,pz,ry;
  if(side==='s'){px=o.x+lx;pz=o.y+o.h+out;ry=0}else if(side==='n'){px=o.x+lx;pz=o.y-out;ry=Math.PI}else if(side==='w'){px=o.x-out;pz=o.y+lx;ry=-Math.PI/2}else{px=o.x+o.w+out;pz=o.y+lx;ry=Math.PI/2}
  m.position.set(px,y,pz);m.rotation.y=ry;if(cast)m.castShadow=true;tdSt(m);return m}}
const PAL9={};
function pz9Tower(o,H){const r=seeded(o.x*71+o.y*29+5),cx=o.x+o.w/2,cz=o.y+o.h/2;
  // montanti verticali e fasce dei piani su tutti e quattro i lati: il vetro non è più una superficie piatta
  const fin=tdMat(r()<.5?'#c9d0d6':'#3a4148'),band=tdMat('#aeb6bd');
  const faces=[['s',o.w],['n',o.w],['e',o.h],['w',o.h]];
  for(const [sd,len] of faces){const put=pz9Put(o,sd);for(let i=1;i<len;i++)put(tdBox(.05,H-.2,.06),fin,i,H/2,.03);for(let k=3;k<o.F;k+=3)put(tdBox(len+.02,.07,.07),band,len/2,k,.035)}
  // gradoni in alto: uno o due blocchi più stretti sopra il tetto
  const mat=tdFacade(o.wall,o.frame,true);let top=H,w=o.w,d=o.h;const tiers=o.F>=11?2:1;
  for(let t=0;t<tiers;t++){w=Math.max(1.6,w-(.8+r()*.8));d=Math.max(1.6,d-(.8+r()*.8));const fl=2+(r()*3|0),h=fl*1.0;const g=new THREE.BoxGeometry(w,h,d);tdUV(g,w,h,d);
    const m=new THREE.Mesh(g,[mat,mat,tdMat('#6a7077'),tdMat('#6a7077'),mat,mat]);m.position.set(cx,top+h/2,cz);m.castShadow=true;tdSt(m);
    const p=new THREE.Mesh(tdBox(w+.1,.12,d+.1),tdMat('#8c949b'));p.position.set(cx,top+.06,cz);tdSt(p);top+=h}
  // corona: telaio sul tetto, oppure tetto inclinato a punta
  if(r()<.55){const cm=tdMat('#d8dde1');[[w,.08,.08,0,d/2],[w,.08,.08,0,-d/2],[.08,.08,d,w/2,0],[.08,.08,d,-w/2,0]].forEach(([a,b,c,dx,dz])=>{const m=new THREE.Mesh(tdBox(a,b,c),cm);m.position.set(cx+dx,top+.9,cz+dz);tdSt(m)});
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>{const m=new THREE.Mesh(tdBox(.08,.9,.08),cm);m.position.set(cx+sx*w/2,top+.45,cz+sz*d/2);tdSt(m)})}
  else{const c=new THREE.Mesh(new THREE.ConeGeometry(Math.min(w,d)*.62,1.2,4),tdMat('#4f5a64'));c.position.set(cx,top+.6,cz);c.rotation.y=Math.PI/4;c.castShadow=true;tdSt(c)}
  // antenna con luce rossa (di notte lampeggia)
  const ah=1.2+r()*1.6,a=new THREE.Mesh(new THREE.CylinderGeometry(.025,.04,ah,6),tdMat('#5a6068'));a.position.set(cx+(r()-.5)*w*.4,top+ah/2,cz+(r()-.5)*d*.4);tdSt(a);
  (PAL9.tips=PAL9.tips||[]).push([a.position.x,top+ah+.04,a.position.z]);
  // terrazza con ringhiera di vetro su un lato del primo gradone
  if(r()<.6){const gl=PAL9.glassM||(PAL9.glassM=new THREE.MeshLambertMaterial({color:0x9fc4d8,transparent:true,opacity:.35,depthWrite:false}));const m=new THREE.Mesh(tdBox(o.w-.1,.35,.03),gl);m.position.set(cx,H+.3,o.y+o.h-.05);tdSt(m)}
  // ingresso con pensilina di vetro e colonne
  const side=pz9Side(o),put=pz9Put(o,side),along=side==='s'||side==='n'?o.w:o.h,dl=(()=>{const [ex,ey]=(o.doors&&o.doors[0])||[o.x+o.w/2,o.y+o.h];return side==='s'||side==='n'?ex-o.x+.5:ey-o.y+.5})();
  put(tdBox(2.0,.06,.9),PAL9.glassM||tdMat('#9fc4d8'),Math.max(1,Math.min(along-1,dl)),1.15,.45,true);[-.9,.9].forEach(k=>put(tdBox(.07,1.15,.07),tdMat('#c9d0d6'),Math.max(1,Math.min(along-1,dl))+k,.575,.85))}
function pz9Condo(o,H){const r=seeded(o.x*41+o.y*67+9),side=pz9Side(o),put=pz9Put(o,side),along=side==='s'||side==='n'?o.w:o.h;
  // basamento in pietra (piano terra più scuro e robusto)
  const stone=tdMat(['#b9b1a3','#a9a39a','#c7bba6','#8f8b85'][(r()*4)|0]);
  for(const [sd,len] of [['s',o.w],['n',o.w],['e',o.h],['w',o.h]]){const p=pz9Put(o,sd);p(tdBox(len+.04,.42,.04),stone,len/2,.21,.02)}
  // gradini, citofono e lampada accanto al portone
  const [ex,ey]=(o.doors&&o.doors[0])||[o.x+o.w/2,o.y+o.h],dl=side==='s'||side==='n'?ex-o.x+.5:ey-o.y+.5;
  put(tdBox(.9,.06,.3),stone,dl,.03,.15);put(tdBox(.8,.06,.18),stone,dl,.09,.09);
  put(tdBox(.09,.16,.03),tdMat('#c9ced3'),dl+.5,.55,.02);put(tdBox(.07,.1,.07),tdMat('#fff3c9',{emissive:tdC('#ffd98a'),emissiveIntensity:.6}),dl-.5,.95,.04);
  // pluviali agli angoli e scala esterna antincendio su qualche palazzo alto
  const pv=tdMat('#7c8086');put(tdBox(.05,H,.05),pv,.08,H/2,.03);put(tdBox(.05,H,.05),pv,along-.08,H/2,.03);
  if(o.F>=5&&r()<.3){const sd2=side==='s'?'e':side==='n'?'w':side==='e'?'n':'s',p2=pz9Put(o,sd2),len=sd2==='s'||sd2==='n'?o.w:o.h,iron=tdMat('#2e3236');
    for(let k=1;k<o.F;k++){p2(tdBox(1.1,.04,.45),iron,len/2,k,.23);p2(tdBox(1.1,.3,.02),iron,len/2,k+.17,.45)}p2(tdBox(.04,o.F-1,.04),iron,len/2-.55,(o.F)/2,.45);p2(tdBox(.04,o.F-1,.04),iron,len/2+.55,(o.F)/2,.45)}}
function pz9Villa(o,H){const r=seeded(o.x*19+o.y*83+2),side=pz9Side(o),put=pz9Put(o,side),along=side==='s'||side==='n'?o.w:o.h;
  // persiane ai lati delle finestre
  const sh=tdMat(['#3f6b45','#6b4a2f','#2f5d8a','#8c3b3b','#e9e4d8'][(r()*5)|0]);
  for(let k=0;k<Math.max(1,o.F);k++)for(let i=0;i<Math.floor(along);i++){const lx=i+.5;if(lx<.6||lx>along-.6)continue;[-.33,.33].forEach(dx=>put(tdBox(.14,.5,.025),sh,lx+dx,k+.55,.02))}
  // portico: due colonne e tettoia davanti alla porta, gradino, lampada
  const [ex,ey]=(o.doors&&o.doors[0])||[o.x+o.w/2,o.y+o.h],dl=side==='s'||side==='n'?ex-o.x+.5:ey-o.y+.5,col=tdMat('#f1ece2');
  put(tdBox(1.3,.07,.7),tdMat(o.roof||'#8a5a3c'),dl,1.12,.35,true);[-.55,.55].forEach(k=>put(new THREE.CylinderGeometry(.05,.05,1.1,8),col,dl+k,.55,.62));put(tdBox(1.2,.05,.65),tdMat('#d6cfc2'),dl,.025,.33);
  // portone del garage su un lato della facciata
  const gx=dl>along/2?.95:along-.95;if(along>=3.2){put(new THREE.PlaneGeometry(1.2,.85),tdMat('#d9dcdf'),gx,.43,.012);const lm=tdMat('#b6babe');for(let k=1;k<5;k++)put(tdBox(1.18,.015,.01),lm,gx,k*.17,.018)}}
function pz9Row(o,H){const r=seeded(o.x*23+o.y*11+4),side=pz9Side(o),put=pz9Put(o,side),along=side==='s'||side==='n'?o.w:o.h;
  // case a schiera: ogni casetta ha il suo colore, la sua porta e il suo gradino, separate da lesene
  const n=Math.max(2,Math.round(along/2)),uw=along/n,tints=['#f2c9a0','#cfe0c3','#f4e3a1','#e9b8b0','#c9d9ea','#e6d3f0'],doors=['#7a3b2e','#2f5d8a','#3f6b45','#5a4636','#8c6d1f'];
  for(let u=0;u<n;u++){const c=u*uw+uw/2,tm=PAL9['t'+u%6]||(PAL9['t'+u%6]=new THREE.MeshLambertMaterial({color:tdC(tints[(u+(r()*6|0))%6]),transparent:true,opacity:.42,depthWrite:false}));
    put(new THREE.PlaneGeometry(uw-.06,H-.2),tm,c,(H-.2)/2,.008);if(u>0)put(tdBox(.08,H,.06),tdMat('#e8e2d6'),u*uw,H/2,.03);
    put(new THREE.PlaneGeometry(.42,.78),tdMat(doors[(u+(r()*5|0))%5]),c,.39,.014);put(tdBox(.5,.06,.22),tdMat('#bdb6a8'),c,.03,.11);put(tdBox(.3,.06,.06),tdMat('#2e3236'),c,.95,.04)}}
{const _b=tdBuilding;tdBuilding=function(grp,o){const H=_b.apply(this,arguments);try{if(o.b&&(o.b.custom||o.b.id==='stadio'||o.b.id==='aeroporto'))return H;
  if(o.glass&&o.F>=7)pz9Tower(o,H);else if(o.gable&&o.F<=2)pz9Villa(o,H);else if(!o.glass&&!o.gable&&!o.sign&&o.F<=5&&Math.max(o.w,o.h)>=5)pz9Row(o,H);else if(!o.glass&&!o.gable)pz9Condo(o,H)}catch(e){console.warn('palazzi9',e)}return H}}
// luci rosse sulle antenne dei grattacieli: lampeggiano piano di notte
{const _b=tdBuildCity;tdBuildCity=function(){PAL9.tips=[];const r=_b.apply(this,arguments);try{const sc=TD.city&&TD.city.sc,T2=PAL9.tips;if(sc&&T2.length){const im=new THREE.InstancedMesh(new THREE.SphereGeometry(.06,8,6),new THREE.MeshBasicMaterial({color:new THREE.Color(2.5,.2,.15),toneMapped:false}),T2.length),o=new THREE.Object3D();
  T2.forEach(([x,y,z],i)=>{o.position.set(x,y,z);o.updateMatrix();im.setMatrixAt(i,o.matrix)});sc.add(im);PAL9.tipM=im}}catch(e){console.warn('palazzi9',e)}return r}}
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{if(city&&PAL9.tipM){const dk=typeof gtaDark==='function'?gtaDark()/.5:0;PAL9.tipM.visible=dk>.1?(TD.time%1.6)<.8:true}}catch(e){}return r}}
