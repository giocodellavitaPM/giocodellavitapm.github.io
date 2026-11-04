/* ================= v9: città più ariosa: persone e auto in proporzione (strade e piazze sembrano più larghe), viali con aiuola verde in mezzo ================= */
// in città le persone e le macchine sono un po' più piccole rispetto alle strade e ai palazzi: tutto sembra più largo e più vero
const VL9={k:.8,on(){try{return localStorage.getItem('vita_s9_prop')!=='0'}catch(e){return true}}};
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{const k=city&&VL9.on()?VL9.k:1;
  const fix=g=>{if(!g)return;if(g.userData.bs9==null)g.userData.bs9=g.scale.x;const t=g.userData.bs9*k;if(Math.abs(g.scale.x-t)>1e-4)g.scale.setScalar(t)};
  if(TD.pool)for(const e of TD.pool.values())fix(e&&e.g);if(TD.cars)TD.cars.forEach(c=>c&&fix(c.g))}catch(e){}return r}}
// la telecamera si avvicina un po', in proporzione
{const _c=tdCamera;tdCamera=function(dt,city){const me=TD.me;if(!city||!me||!VL9.on())return _c.apply(this,arguments);
  const z=TD.cz|0,CZ=typeof TD_CZ!=='undefined'?TD_CZ:null;if(!CZ)return _c.apply(this,arguments);const o=CZ[z];if(!o)return _c.apply(this,arguments);
  const k=me.car?.84:.86,sv=[o[0],o[1]];o[0]*=k;o[1]*=k;try{return _c.apply(this,arguments)}finally{o[0]=sv[0];o[1]=sv[1]}}}

/* ---------- i viali: due strade principali in orizzontale e due in verticale, con l'aiuola in mezzo ---------- */
const VIALI9={h:[RY[1],RY[4]].filter(v=>v!=null),v:[RX[2],RX[6]].filter(v=>v!=null)};
const vlIsBox=(x,y)=>inBox(x,y);
// pezzi di aiuola: dove la strada continua dritta, lontano dagli incroci e dalle strisce
function vlSegs(){if(VL9.segs)return VL9.segs;const S2=[];
  const run=(o,c)=>{const L=o==='h'?W:H,cross=o==='h'?RX:RY;let a=null;
    for(let i=0;i<=L;i++){const ok=i<L&&(o==='h'?at(i,c)===1&&at(i,c+1)===1:at(c,i)===1&&at(c+1,i)===1)&&!cross.some(k=>i>=k-2&&i<=k+3)&&!(typeof inMZ==='function'&&(o==='h'?inMZ(i,c):inMZ(c,i)));
      if(ok&&a==null)a=i;if(!ok&&a!=null){if(i-a>=3)S2.push({o,c,a:a+.3,b:i-.3});a=null}}};
  VIALI9.h.forEach(c=>run('h',c));VIALI9.v.forEach(c=>run('v',c));return VL9.segs=S2}
const vlOnMedian=(x,y,pad)=>{for(const s of vlSegs()){if(s.o==='h'){if(x>s.a-pad&&x<s.b+pad&&Math.abs(y-(s.c+1))<.11+pad)return s}else if(y>s.a-pad&&y<s.b+pad&&Math.abs(x-(s.c+1))<.11+pad)return s}return null};
// in macchina non si passa sopra l'aiuola (si gira agli incroci, come nella realtà)
{const _cm=carMove;carMove=function(st,dt,maxV){const x0=S.pos.x,y0=S.pos.y,v0=st.v||0;const r=_cm.apply(this,arguments);try{if(S.scene!=='citta')return r;
  const ca=Math.cos(st.ang||0),sa=Math.sin(st.ang||0),hit=(X,Y)=>[-.5,0,.5].some(k=>vlOnMedian(X+ca*k,Y+sa*k,.26));
  if(hit(S.pos.x,S.pos.y)&&!hit(x0,y0)){S.pos.x=x0;S.pos.y=y0;st.v=0;if(Math.abs(v0)>2&&performance.now()-(VL9.bt||0)>3000){VL9.bt=performance.now();toast('🌳 C\'è l\'aiuola in mezzo al viale: per girare vai fino all\'incrocio!')}return false}}catch(e){}return r}}
// in 2D: striscia verde con il bordo grigio al posto della linea gialla
{const _dc=drawCity;drawCity=function(t,x0,y0,x1,y1){_dc.apply(this,arguments);try{if(S.scene!=='citta')return;const c=cx;
  for(const s of vlSegs()){if(s.o==='h'){if(s.c<y0-2||s.c>y1+2||s.b<x0-1||s.a>x1+1)continue;const X=s.a*T,Y=(s.c+1)*T,L=(s.b-s.a)*T;c.fillStyle='#b9b2a4';c.fillRect(X,Y-6,L,12);c.fillStyle='#5f9a48';c.fillRect(X+2,Y-4,L-4,8);
      c.fillStyle='#3f7a35';for(let k=s.a+1;k<s.b-.5;k+=2){c.beginPath();c.arc(k*T,Y,5,0,7);c.fill()}}
    else{if(s.c<x0-2||s.c>x1+2||s.b<y0-1||s.a>y1+1)continue;const X=(s.c+1)*T,Y=s.a*T,L=(s.b-s.a)*T;c.fillStyle='#b9b2a4';c.fillRect(X-6,Y,12,L);c.fillStyle='#5f9a48';c.fillRect(X-4,Y+2,8,L-4);
      c.fillStyle='#3f7a35';for(let k=s.a+1;k<s.b-.5;k+=2){c.beginPath();c.arc(X,k*T,5,0,7);c.fill()}}}}catch(e){}}}
// in 3D: cordolo, prato, cespugli e alberelli lungo il viale
{const _b=tdBuildCity;tdBuildCity=function(){const r=_b.apply(this,arguments);try{const sc=TD.city&&TD.city.sc;if(!sc)return r;const G=new THREE.Group();sc.add(G);const segs=vlSegs();if(!segs.length)return r;
  const kerb=new THREE.InstancedMesh(new THREE.BoxGeometry(1,.1,.22).translate(0,.05,0),tdMat('#b9b2a4'),segs.length),grass=new THREE.InstancedMesh(new THREE.BoxGeometry(1,.02,.17).translate(0,.11,0),tdMat('#5f9a48'),segs.length);
  const o=new THREE.Object3D(),bush=[],tree=[];
  segs.forEach((s,i)=>{const L=s.b-s.a,m=(s.a+s.b)/2;if(s.o==='h'){o.position.set(m,0,s.c+1);o.rotation.set(0,0,0)}else{o.position.set(s.c+1,0,m);o.rotation.set(0,Math.PI/2,0)}o.scale.set(L,1,1);o.updateMatrix();kerb.setMatrixAt(i,o.matrix);grass.setMatrixAt(i,o.matrix);
    for(let k=s.a+.6;k<s.b-.3;k+=1.1){const p=s.o==='h'?[k,s.c+1]:[s.c+1,k];if(Math.round(k*10)%4===0)tree.push(p);else bush.push(p)}});
  G.add(kerb,grass);
  const bm=new THREE.InstancedMesh(new THREE.SphereGeometry(.1,8,6),tdMat('#3f7a35'),bush.length);bush.forEach(([x,z],i)=>{o.position.set(x,.15,z);o.rotation.set(0,i,0);o.scale.set(1.2,.8,.75);o.updateMatrix();bm.setMatrixAt(i,o.matrix)});G.add(bm);
  if(tree.length){const tr=new THREE.InstancedMesh(new THREE.CylinderGeometry(.025,.035,.9,6).translate(0,.45,0),tdMat('#6b4a2f'),tree.length),cr=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.26,1),tdMat('#4c8a3c'),tree.length);
    tree.forEach(([x,z],i)=>{o.position.set(x,.1,z);o.rotation.set(0,0,0);o.scale.set(1,1,1);o.updateMatrix();tr.setMatrixAt(i,o.matrix);o.position.set(x,1.05,z);o.rotation.set(0,i*1.3,0);o.scale.set(.75,1,.75);o.updateMatrix();cr.setMatrixAt(i,o.matrix)});tr.castShadow=cr.castShadow=true;G.add(tr,cr)}
  kerb.receiveShadow=grass.receiveShadow=true;TD.vl9={segs:segs.length,bush:bush.length,tree:tree.length}}catch(e){console.warn('viali9',e)}return r}}

/* ---------- palazzi con più dettagli: davanzali, tende colorate sui negozi, vasi di fiori, pannelli solari, parapetti, comignoli e un po' di "vissuto" alla base ---------- */
{const _x=tdBuildExtra;tdBuildExtra=function(o,H){const r0=_x.apply(this,arguments);try{if(o.b&&(o.b.custom||o.b.id==='stadio'))return r0;const r=seeded(o.x*53+o.y*17+o.w*7+3),F=o.F|0;
  const d0=(o.doors&&o.doors[0])||[o.x+o.w/2,o.y+o.h],[ex,ey]=d0,side=ey>=o.y+o.h?'s':ey<o.y?'n':ex<o.x?'w':'e',along=side==='s'||side==='n'?o.w:o.h;
  const put=(geo,mat,lx,y,out,cast,tilt)=>{const m=new THREE.Mesh(geo,mat);let px,pz,ry;if(side==='s'){px=o.x+lx;pz=o.y+o.h+out;ry=0}else if(side==='n'){px=o.x+lx;pz=o.y-out;ry=Math.PI}else if(side==='w'){px=o.x-out;pz=o.y+lx;ry=-Math.PI/2}else{px=o.x+o.w+out;pz=o.y+lx;ry=Math.PI/2}
    m.position.set(px,y,pz);m.rotation.set(tilt||0,ry,0,'YXZ');if(cast)m.castShadow=true;tdSt(m);return m};
  if(!o.glass){
    // davanzali di pietra sotto le finestre dei piani alti
    const sm=tdMat('#e6e1d6');for(let k=1;k<Math.min(F,7);k++)for(let i=0;i<Math.floor(along);i++){const lx=i+.5;if(lx<.4||lx>along-.4||r()<.3)continue;put(tdBox(.5,.04,.09),sm,lx,k+.24,.045)}
    // vasi di fiori su qualche finestra
    const pots=['#d94b5a','#f2b632','#e96fb2','#ffffff'];for(let k=1;k<Math.min(F,5);k++)for(let i=0;i<Math.floor(along);i++){if(r()>.1)continue;const lx=i+.5;if(lx<.4||lx>along-.4)continue;put(tdBox(.4,.08,.08),tdMat('#8a5a3c'),lx,k+.3,.08);put(new THREE.SphereGeometry(.06,6,5),tdMat(pots[(r()*pots.length)|0]),lx-.1,k+.38,.08);put(new THREE.SphereGeometry(.06,6,5),tdMat('#4c8a3c'),lx+.1,k+.38,.08)}
    // un po' di "vissuto": fascia più scura alla base del muro
    if(r()<.7)put(new THREE.PlaneGeometry(along-.04,.22),(TD.stain9||(TD.stain9=new THREE.MeshLambertMaterial({color:0x000000,transparent:true,opacity:.12,depthWrite:false}))),along/2,.11,.006);
    // tende colorate sopra le vetrine dei negozi
    if(o.sign&&!o.b||(o.b&&!o.b.custom&&r()<.6)){const cols=['#c0392b','#1f6f8b','#2e7d32','#d4a017','#6a3d9a'],c=cols[(r()*cols.length)|0],aw=tdMat(c),aw2=tdMat('#f4f1e8');
      const w=Math.min(along*.4,2.2);[along*.25,along*.75].forEach((lx,j)=>{if(o.b&&j===0&&Math.abs(lx-(side==='s'||side==='n'?ex-o.x:ey-o.y))<.8)return;put(tdBox(w,.04,.42),aw,lx,1.02,.2,true,.32);put(tdBox(w,.07,.012),aw2,lx,.93,.41)})}
  }
  // tetti: parapetto, pannelli solari, impianti; sulle case con il tetto a punta un comignolo
  if(!o.gable){const pm=tdMat('#9a9690');[[o.w,.18,.06,o.x+o.w/2,o.y+.03],[o.w,.18,.06,o.x+o.w/2,o.y+o.h-.03],[.06,.18,o.h,o.x+.03,o.y+o.h/2],[.06,.18,o.h,o.x+o.w-.03,o.y+o.h/2]].forEach(([w,h,d,x,z])=>{const m=new THREE.Mesh(tdBox(w,h,d),pm);m.position.set(x,H+.09,z);tdSt(m)});
    if(r()<.5&&o.w>2.5&&o.h>2.5){const sp=tdMat('#1c2d4a',{emissive:tdC('#0a1630'),emissiveIntensity:.2}),fr=tdMat('#c9ced3');const n=Math.min(4,Math.floor(o.w/1.2));for(let i=0;i<n;i++){const m=new THREE.Mesh(tdBox(.9,.03,.55),sp);m.position.set(o.x+.8+i*1.05,H+.2,o.y+o.h*.35);m.rotation.x=-.35;tdSt(m);const f=new THREE.Mesh(tdBox(.04,.15,.04),fr);f.position.set(m.position.x,H+.08,m.position.z+.15);tdSt(f)}}
    if(r()<.6){const vm=tdMat('#b8bcc0'),v=new THREE.Mesh(tdBox(.5,.32,.4),vm);v.position.set(o.x+o.w-.7,H+.16,o.y+o.h-.7);v.castShadow=true;tdSt(v);const f=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.04,12),tdMat('#3c4046'));f.position.set(v.position.x,H+.34,v.position.z);tdSt(f)}}
  else if(r()<.8){const c=new THREE.Mesh(tdBox(.22,.6,.22),tdMat('#8c4a36'));c.position.set(o.x+o.w*(.25+r()*.5),H+.5,o.y+o.h*(.3+r()*.4));c.castShadow=true;tdSt(c)}
  }catch(e){}return r0}}
