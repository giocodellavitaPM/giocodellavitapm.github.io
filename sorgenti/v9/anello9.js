/* ================= v9: la grande strada ad anello intorno alla città. Le strade non finiscono più contro gli alberi:
   arrivano tutte sull'anello, che gira intorno alla città con quattro grandi curve e ti riporta dentro ================= */
var RG9M=13;            // quanto si può andare fuori dalla città (in caselle) con la telecamera
const RG9={O:7,R:12,cars:[],g3:[],stubs:null};
// distanza (con il segno) dalla linea in mezzo all'anello: un rettangolo con gli angoli molto arrotondati
function rg9D(px,py){const O=RG9.O,R=RG9.R,cx0=W/2,cy0=H/2,hx=W/2+O,hy=H/2+O,qx=Math.abs(px-cx0)-(hx-R),qy=Math.abs(py-cy0)-(hy-R);
  return Math.hypot(Math.max(qx,0),Math.max(qy,0))+Math.min(Math.max(qx,qy),0)-R}
// le strade della città che arrivano al bordo continuano fino all'anello
function rg9S(x,y,dx,dy){const v=map[y*W+x];if(v===1)return 1;if(v===2&&(map[(y+dy)*W+x+dx]===1||map[(y-dy)*W+x-dx]===1))return 2;return 0}
// cosa c'è fuori dalla mappa: anello, pezzi di strada che lo raggiungono, prato e poi alberi
function out9(x,y){try{const O=RG9.O,sd=rg9D(x+.5,y+.5),d=Math.abs(sd);let sv=0;
  if(x>=1&&x<W-1&&y<0&&y>=-O)sv=rg9S(x,1,1,0);else if(x>=1&&x<W-1&&y>=H&&y<H+O)sv=rg9S(x,H-2,1,0);
  else if(y>=1&&y<H-1&&x<0&&x>=-O)sv=rg9S(1,y,0,1);else if(y>=1&&y<H-1&&x>=W&&x<W+O)sv=rg9S(W-2,y,0,1);
  if(d<1||sv===1)return 1;if(d<2||sv===2)return 2;return sd<0||d<6?0:5}catch(e){return 5}}

// il percorso dell'anello: dato un punto s (in caselle, girando in senso orario) dà posizione e direzione
function rg9P(s){const O=RG9.O,R=RG9.R,x0=-O,x1=W+O,y0=-O,y1=H+O,Lh=x1-x0-2*R,Lv=y1-y0-2*R,A=Math.PI*R/2,P=2*Lh+2*Lv+4*A;
  s=((s%P)+P)%P;const arc=(cx0,cy0,a0,t)=>{const a=a0+t/R;return {x:cx0+R*Math.cos(a),y:cy0+R*Math.sin(a),tx:-Math.sin(a),ty:Math.cos(a)}};
  if(s<Lh)return {x:x0+R+s,y:y0,tx:1,ty:0};s-=Lh;if(s<A)return arc(x1-R,y0+R,-Math.PI/2,s);s-=A;
  if(s<Lv)return {x:x1,y:y0+R+s,tx:0,ty:1};s-=Lv;if(s<A)return arc(x1-R,y1-R,0,s);s-=A;
  if(s<Lh)return {x:x1-R-s,y:y1,tx:-1,ty:0};s-=Lh;if(s<A)return arc(x0+R,y1-R,Math.PI/2,s);s-=A;
  if(s<Lv)return {x:x0,y:y1-R-s,tx:0,ty:-1};s-=Lv;return arc(x0+R,y0+R,Math.PI,s)}
const rg9Len=()=>{const O=RG9.O,R=RG9.R;return 2*(W+2*O-2*R)+2*(H+2*O-2*R)+2*Math.PI*R};
// i pezzi di strada (e marciapiede) che uniscono la città all'anello: [x, y, larghezza, altezza, tipo]
function rg9Stubs(){if(RG9.stubs)return RG9.stubs;const L=[],O=RG9.O;
  for(let x=1;x<W-1;x++){const a=rg9S(x,1,1,0),b=rg9S(x,H-2,1,0);if(a)L.push([x,-O,1,O,a]);if(b)L.push([x,H,1,O,b])}
  for(let y=1;y<H-1;y++){const a=rg9S(1,y,0,1),b=rg9S(W-2,y,0,1);if(a)L.push([-O,y,O,1,a]);if(b)L.push([W,y,O,1,b])}
  return RG9.stubs=L}

/* ---------- in 2D: l'anello disegnato liscio, con le curve vere ---------- */
function rg9Path(c,k){const O=RG9.O,R=RG9.R;rr(c,(-O-k)*T,(-O-k)*T,(W+2*O+2*k)*T,(H+2*O+2*k)*T,(R+k)*T)}
{const _dc=drawCity;drawCity=function(t,x0,y0,x1,y1){_dc.apply(this,arguments);try{if(ui.td9bake||!S||S.scene!=='citta')return;const O=RG9.O;
    if(x0>O+3&&y0>O+3&&x1<W-O-4&&y1<H-O-4)return;const c=cx;c.save();
    c.lineJoin='round';c.strokeStyle=PAT.walk||'#b8b3a8';c.lineWidth=4*T;rg9Path(c,0);c.stroke();
    rg9Stubs().forEach(([x,y,w,h,v])=>{if(v===2){c.fillStyle=PAT.walk||'#b8b3a8';c.fillRect(x*T,y*T,w*T,h*T)}});
    rg9Stubs().forEach(([x,y,w,h,v])=>{if(v===1){c.fillStyle=PAT.asphalt||'#57595d';c.fillRect(x*T,y*T,w*T,h*T)}});
    c.strokeStyle='#8f8a80';c.lineWidth=2.5;rg9Path(c,2-.03);c.stroke();rg9Path(c,-2+.03);c.stroke();
    c.strokeStyle=PAT.asphalt||'#57595d';c.lineWidth=2*T;rg9Path(c,0);c.stroke();
    c.strokeStyle='rgba(255,255,255,.75)';c.lineWidth=2;rg9Path(c,.86);c.stroke();rg9Path(c,-.86);c.stroke();
    c.strokeStyle='#e0b83a';c.lineWidth=3;c.setLineDash([T*.55,T*.45]);rg9Path(c,0);c.stroke();c.setLineDash([]);
    // le macchine che girano sull'anello
    RG9.cars.forEach(k=>{const p=rg9Car(k);if(p[0]<x0-3||p[0]>x1+3||p[1]<y0-3||p[1]>y1+3)return;drawCarAt(p[0],p[1],p[2],k.col,k.stop)});
    c.restore()}catch(e){}}}
// la telecamera 2D ora può andare anche fuori dalla città, sull'anello

/* ---------- le macchine sull'anello: vanno a destra, come in Italia, e si fermano se c'è qualcuno davanti ---------- */
(function(){const r=seeded(919),P=rg9Len();for(let i=0;i<12;i++)RG9.cars.push({s:r()*P,d:i%2?1:-1,v:2.2+r()*1.2,col:CAR_COL[Math.floor(r()*CAR_COL.length)],t9:['berlina','suv','utilitaria','sportiva','taxi','furgone'][i%6],stop:false})})();
function rg9Car(k){const p=rg9P(k.s),tx=p.tx*k.d,ty=p.ty*k.d;return [p.x-ty*.5,p.y+tx*.5,Math.atan2(ty,tx)]}
function rg9Tick(dt){if(!S||S.scene!=='citta'||dt<=0)return;const pos=RG9.cars.map(rg9Car);
  RG9.cars.forEach((k,i)=>{const [x,y,a]=pos[i],ca=Math.cos(a),sa=Math.sin(a),ahead=(ox,oy,len,wd)=>{const rx=ox-x,ry=oy-y,al=rx*ca+ry*sa,pe=Math.abs(-rx*sa+ry*ca);return al>0&&al<len&&pe<wd};
    let stop=ahead(S.pos.x,S.pos.y,1.9,.8);if(!stop)for(let j=0;j<pos.length&&!stop;j++)if(j!==i&&RG9.cars[j].d===k.d&&ahead(pos[j][0],pos[j][1],2.4,.45))stop=true;
    k.stop=stop;if(!stop)k.s+=k.d*k.v*dt})}
{const _t=trafficTick;trafficTick=function(dt){const r=_t.apply(this,arguments);try{rg9Tick(dt)}catch(e){}return r}}
// la tua macchina non passa attraverso quelle dell'anello
{const _m=carMove;carMove=function(st,dt,maxV){try{if(S.pos.x<4||S.pos.y<4||S.pos.x>W-4||S.pos.y>H-4){const v=st.v||0;if(Math.abs(v)>.02){const ca=Math.cos(st.ang),sa=Math.sin(st.ang),sg=Math.sign(v);
      for(const k of RG9.cars){const [ox,oy]=rg9Car(k),rx=ox-S.pos.x,ry=oy-S.pos.y,al=(rx*ca+ry*sa)*sg,pe=Math.abs(-rx*sa+ry*ca);if(al>0&&al<1.6&&pe<.75){st.v=0;return false}}}}}catch(e){}return _m.apply(this,arguments)}}

/* ---------- in 3D: asfalto, marciapiedi, righe, e una fila di alberi fuori dall'anello ---------- */
function rg9Ribbon(k0,k1,y,col){const N=Math.round(rg9Len()*1.2),P=[],I=[],C=[],c=tdC(col),pp=[];
  for(let i=0;i<=N;i++){const p=rg9P(i/N*rg9Len()),nx=-p.ty,ny=p.tx;pp.push(p);P.push(p.x+nx*k0,y,p.y+ny*k0,p.x+nx*k1,y,p.y+ny*k1);C.push(c.r,c.g,c.b,c.r,c.g,c.b);
    if(i<N){const a=i*2;I.push(a,a+1,a+2,a+1,a+3,a+2)}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('color',new THREE.Float32BufferAttribute(C,3));g.setIndex(I);g.computeVertexNormals();
  const n=g.attributes.normal;for(let i=0;i<n.count;i++)n.setXYZ(i,0,1,0);return g}
function rg9Build(sc){if(!sc)return;const G=new THREE.Group();G.name='anello9';sc.add(G);const M=new THREE.MeshLambertMaterial({vertexColors:true,side:THREE.DoubleSide});
  // a destra del verso orario c'è l'interno (verso la città)
  const parts=[[-2,2,.006,'#aaa59a'],[-1,1,.014,'#45474b'],[.84,.92,.02,'#e8e8e2'],[-.92,-.84,.02,'#e8e8e2'],[1.96,2.04,.03,'#8f8a80'],[-2.04,-1.96,.03,'#8f8a80']];
  parts.forEach(([a,b,y,c])=>{const m=new THREE.Mesh(rg9Ribbon(a,b,y,c),M);m.receiveShadow=true;G.add(m)});
  // pezzi di strada fino all'anello
  const st=rg9Stubs(),pl=new THREE.PlaneGeometry(1,1).rotateX(-Math.PI/2),o3=new THREE.Object3D();
  [[1,'#45474b',.016],[2,'#aaa59a',.008]].forEach(([v,c,y])=>{const L=st.filter(s=>s[4]===v);if(!L.length)return;const im=new THREE.InstancedMesh(pl,tdMat(c),L.length);
    L.forEach(([x,yy,w,h],i)=>{o3.position.set(x+w/2,y,yy+h/2);o3.scale.set(w,1,h);o3.updateMatrix();im.setMatrixAt(i,o3.matrix)});im.receiveShadow=true;G.add(im)});
  // riga gialla tratteggiata in mezzo
  const P=rg9Len(),nd=Math.floor(P/1.1),dm=new THREE.InstancedMesh(new THREE.PlaneGeometry(.55,.07).rotateX(-Math.PI/2),tdMat('#e0b021'),nd);
  for(let i=0;i<nd;i++){const p=rg9P(i*1.1);o3.position.set(p.x,.022,p.y);o3.rotation.set(0,-Math.atan2(p.ty,p.tx),0);o3.scale.set(1,1,1);o3.updateMatrix();dm.setMatrixAt(i,o3.matrix)}G.add(dm);
  // alberi fuori dall'anello e qualcuno nel prato verso la città
  const r=seeded(4242),TR=[];for(let s=0;s<P;s+=2.2){const p=rg9P(s),nx=-p.ty,ny=p.tx;TR.push([p.x-nx*(3.4+r()*2.5),p.y-ny*(3.4+r()*2.5),.8+r()*.5]);if(r()<.35)TR.push([p.x-nx*(6+r()*3),p.y-ny*(6+r()*3),.9+r()*.6]);
    if(r()<.18){const k=3+r()*1.6,x=p.x+nx*k,y=p.y+ny*k;if(Math.abs(rg9D(x,y))>2.6&&(x<-.5||y<-.5||x>W+.5||y>H+.5)&&!st.some(([a,b,w,h])=>x>a-1&&x<a+w+1&&y>b-1&&y<b+h+1))TR.push([x,y,.7+r()*.4])}}
  const tg=new THREE.CylinderGeometry(.07,.1,.7,7).translate(0,.35,0),cg=new THREE.SphereGeometry(.5,10,8).translate(0,1.05,0),ti=new THREE.InstancedMesh(tg,tdMat('#6b4a2e'),TR.length),ci=new THREE.InstancedMesh(cg,tdMat('#3f7a32'),TR.length),cc=new THREE.Color();
  TR.forEach(([x,y,s],i)=>{o3.position.set(x,0,y);o3.rotation.set(0,r()*6,0);o3.scale.set(s,s*(.9+r()*.3),s);o3.updateMatrix();ti.setMatrixAt(i,o3.matrix);ci.setMatrixAt(i,o3.matrix);cc.set(tdMix('#2f5a25','#5d8e3e',r()));ci.setColorAt(i,cc)});
  ti.castShadow=ci.castShadow=true;G.add(ti,ci);RG9.g=G}
{const _b=tdBuildCity;tdBuildCity=function(){const r=_b.apply(this,arguments);try{rg9Build(TD.city&&TD.city.sc)}catch(e){console.warn('anello9',e)}return r}}
// in 3D le macchine dell'anello
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{RG9.cars.forEach((k,i)=>{let e=RG9.g3[i];
    if(!city){if(e&&e.parent)e.parent.remove(e);return}
    const [x,y,a]=rg9Car(k);if(Math.abs(x-S.pos.x)>40||Math.abs(y-S.pos.y)>40){if(e&&e.parent)e.parent.remove(e);return}
    if(!e)e=RG9.g3[i]=tdCar(k.col,k.t9);if(e.parent!==scn)scn.add(e);e.position.set(x,0,y);e.rotation.y=-a})}catch(e){}return r}}
