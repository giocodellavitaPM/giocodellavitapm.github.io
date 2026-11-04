/* ================= v9: motorino e moto si guidano sulla strada come la macchina (sali in sella, giri, parcheggi). Bici, skate, pattini e monopattini restano come prima ================= */
// tutti i mezzi a motore (moto, scooter, quad, trattori, pick-up, furgoni, camion, autobus) ora vanno sulla strada come la macchina
const MOT9={};
ALLITEMS.forEach(i=>{if(!i||!i.veh||!i.ride||SHAPE[i.id]||(typeof AEREI!=='undefined'&&AEREI.includes(i)))return;
  const big=['furgone','camion','tir','autobus','trattore','trattoregr','trattorino'].includes(i.id);SHAPE[i.id]=i.g==='moto'||i.id==='motorino'||i.id==='moto'?'moto':big?'van':'suv';MOT9[i.id]=SHAPE[i.id]==='moto'?'moto':big?'furgone':'suv'});
const isMoto9=id=>!!id&&SHAPE[id]==='moto';
const rideMoto9=()=>{try{return !!(S&&S.ride&&!S.drive&&!S.famDrive&&isMoto9((bestRide()||{}).id))}catch(e){return false}};
// che modello 3D usare per un mezzo tuo (anche parcheggiato)
function tdTypeOf9(id,me){if(isMoto9(id))return me?'moto9':'moto9p';if(id==='taxi9')return 'taxi';if(MOT9[id])return MOT9[id];return {sportiva:'sportiva',camper:'furgone',autousata:'utilitaria',autonuova:'berlina',suv:'suv',monovolume:'furgone',utilitaria:'utilitaria',elettrica:'utilitaria'}[id]||'berlina'}
{const _t=tdMyType;tdMyType=function(){try{if(!S.drive&&!S.famDrive&&S.ride){const r=bestRide();if(r&&(MOT9[r.id]||r.id==='taxi9'))return tdTypeOf9(r.id,1)}}catch(e){}return _t.apply(this,arguments)}}

// sali in sella: serve il casco se sei piccolo, e i messaggi parlano di moto e non di macchina
let mtT9=0;
{const _ci=carIn;carIn=function(rb){if(rb&&isMoto9(rb.id)){if(S.age<18&&typeof hasCasco==='function'&&!hasCasco())return toast('⛑️ La mamma dice: «Senza casco non si sale!» Compralo al negozio di bici o al centro commerciale (35 €).');mtT9=performance.now()}
  const r=_ci.apply(this,arguments);if(rb&&isMoto9(rb.id)&&S.ride)toast(`${rb.ic||'🏍️'} Sei in sella! Trascina il dito dove vuoi andare: la moto piega in curva e va avanti. Al rosso ci si ferma! 🚦`);return r}}
{const _co=carOut;carOut=function(rb){if(rideMoto9())mtT9=performance.now();return _co.apply(this,arguments)}}
{const _to=toast;toast=function(m){try{if(typeof m==='string'&&(rideMoto9()||performance.now()-mtT9<600))m=m.replace(/la tua macchina/g,'la tua moto').replace(/la macchina/g,'la moto').replace(/La macchina/g,'La moto').replace(/in macchina/g,'in moto').replace(/macchina/g,'moto').replace(/al volante/g,'in sella').replace(/🚗/g,'🏍️')}catch(e){}return _to.call(this,m)}}

// in 2D: la moto vista dall'alto, con te sopra col casco
function drawMoto9(x,y,ang,col,stop,rider){const c=cx,L=T*1.02,w=11;c.save();c.translate(x*T,y*T);c.rotate(ang);c.scale(1.3,1.3);
  c.fillStyle='rgba(0,0,0,.2)';rr(c,-L/2+2,-w/2+3,L,w,5);c.fill();
  c.fillStyle='#17181a';rr(c,L/2-13,-3,12,6,3);c.fill();rr(c,-L/2+1,-3.5,13,7,3);c.fill();
  {const g=c.createLinearGradient(0,-w/2,0,w/2);g.addColorStop(0,shade(col,1.25));g.addColorStop(.5,col);g.addColorStop(1,shade(col,.7));c.fillStyle=g}
  rr(c,-L/2+9,-w/2+1,L-20,w-2,4);c.fill();c.fillStyle='#24262a';rr(c,-L*.18,-3.2,L*.26,6.4,3);c.fill();
  c.strokeStyle='#2b2d31';c.lineWidth=2.4;c.lineCap='round';c.beginPath();c.moveTo(L/2-12,-9);c.lineTo(L/2-12,9);c.stroke();
  c.fillStyle='#fff6d0';c.beginPath();c.arc(L/2-2,0,2.4,0,7);c.fill();c.fillStyle=stop?'#ff3b30':'#8c2f2f';c.fillRect(-L/2,-2,2.2,4);
  if(rider){let lk={};try{lk=playerLook()||{}}catch(e){}
    c.fillStyle=lk.shirt||'#4a5d7e';c.beginPath();c.ellipse(-L*.04,0,6,10,0,0,7);c.fill();
    c.strokeStyle=lk.skin||'#f1c9a5';c.lineWidth=3;c.beginPath();c.moveTo(-L*.02,-8);c.lineTo(L/2-13,-8.5);c.moveTo(-L*.02,8);c.lineTo(L/2-13,8.5);c.stroke();
    const hg=c.createRadialGradient(L*.04,-2,1,L*.02,0,7.5);hg.addColorStop(0,'#ffffff');hg.addColorStop(.35,col);hg.addColorStop(1,shade(col,.55));c.fillStyle=hg;c.beginPath();c.arc(L*.02,0,7,0,7);c.fill();
    c.fillStyle='rgba(20,28,40,.85)';c.beginPath();c.arc(L*.02,0,7,-.9,.9);c.lineTo(L*.02+3,0);c.fill()}
  c.restore()}
{const _d=drawCarAt;drawCarAt=function(x,y,ang,col,stop,sh){if(sh!=='moto')return _d.apply(this,arguments);
  const me=S&&S.ride&&S.scene==='citta'&&Math.abs(x-S.pos.x)<.01&&Math.abs(y-S.pos.y)<.01;return drawMoto9(x,y,ang,col,stop,me)}}

// in 3D: una moto vera (ruote, serbatoio, sella, manubrio, faro) e tu seduto sopra col casco
const tdMotoC9={};
function tdMoto9(col,rider){const g=new THREE.Group(),vc=tdVCM||(tdVCM=new THREE.MeshLambertMaterial({vertexColors:true}));
  if(!tdPaintM){try{tdCar(col,'berlina')}catch(e){}}
  const k=col;let P=tdMotoC9[k];
  if(!P){const pc=tdC(col),B=[],L=[],LL=[],o3=new THREE.Object3D(),at=(p,r,s)=>{o3.position.set(...p);o3.rotation.set(...(r||[0,0,0]));o3.scale.set(...(s||[1,1,1]));o3.updateMatrix();return o3.matrix.clone()};
    // ruote
    [.36,-.36].forEach(x=>{B.push({g:new THREE.TorusGeometry(.11,.042,10,22),c:'#141414',p:[x,.15,0]},{g:new THREE.CylinderGeometry(.075,.075,.05,16),c:'#9aa0a6',p:[x,.15,0],r:[Math.PI/2,0,0]},{g:new THREE.CylinderGeometry(.025,.025,.08,8),c:'#2a2d31',p:[x,.15,0],r:[Math.PI/2,0,0]})});
    // telaio, motore, scarico
    B.push({g:tdBox(.36,.14,.12),c:'#3a3d42',p:[-.02,.26,0]},{g:tdBox(.08,.08,.1),c:'#55595f',p:[.1,.2,0]},{g:new THREE.CylinderGeometry(.025,.03,.42,10),c:'#c9ced3',p:[-.2,.2,.08],r:[0,0,Math.PI/2+.12]});
    // forcella e manubrio
    [-1,1].forEach(s=>B.push({g:new THREE.CylinderGeometry(.016,.016,.42,8),c:'#b9bec4',p:[.31,.34,s*.045],r:[0,0,.32]}));
    B.push({g:new THREE.CylinderGeometry(.014,.014,.42,8),c:'#202226',p:[.25,.55,0],r:[Math.PI/2,0,0]});[-1,1].forEach(s=>B.push({g:new THREE.CylinderGeometry(.02,.02,.07,8),c:'#111',p:[.25,.55,s*.2],r:[Math.PI/2,0,0]}));
    // carrozzeria colorata: serbatoio, codino, parafanghi, cupolino
    L.push([tdPaint(new THREE.SphereGeometry(.12,16,12),pc),at([.12,.4,0],[0,0,-.12],[1.25,.62,.8])],
      [tdPaint(tdBox(.26,.06,.12),pc),at([-.24,.4,0],[0,0,.18])],
      [tdPaint(new THREE.SphereGeometry(.13,14,8,0,Math.PI*2,0,Math.PI/2),pc),at([.36,.2,0],[0,0,0],[1,.45,.5])],
      [tdPaint(new THREE.SphereGeometry(.13,14,8,0,Math.PI*2,0,Math.PI/2),pc),at([-.38,.21,0],[0,0,0],[1,.4,.5])],
      [tdPaint(new THREE.SphereGeometry(.08,12,10),pc),at([.33,.5,0],[0,0,-.4],[1.1,1,1.15])]);
    B.push({g:tdBox(.26,.05,.13),c:'#1d1e21',p:[-.07,.45,0],r:[0,0,.05]});
    LL.push({g:new THREE.SphereGeometry(.04,12,8),c:'#fffaf0',p:[.4,.5,0],s:[.6,1,1]},{g:tdBox(.02,.03,.07),c:'#e3141b',p:[-.38,.44,0]});
    P=tdMotoC9[k]={paint:tdGeoMerge(L),matte:tdCM(B,true,tdMatteM).geometry,lights:tdCM(LL,false,TD.carLightM).geometry}}
  const a=new THREE.Mesh(P.paint,tdPaintM),b=new THREE.Mesh(P.matte,tdMatteM),c=new THREE.Mesh(P.lights,TD.carLightM);a.castShadow=b.castShadow=true;g.add(a,b,c);
  if(TD.beamM&&TD.beamG){const bm=new THREE.Mesh(TD.beamG,TD.beamM);bm.scale.set(.6,1,.5);bm.position.set(1.05,.03,0);bm.renderOrder=2;g.add(bm)}
  if(rider){try{const lk=playerLook(),h=tdHuman(lk);h.g.position.set(-.1,.16,0);
      (h.legs||[]).forEach(l=>{l.rotation.z=1.05});(h.arms||[]).forEach(a=>{a.rotation.z=1.1});
      const head=h.g.children.find(o=>o.isMesh&&o.geometry===tdHeadG);
      if(head){const hm=new THREE.Mesh(new THREE.SphereGeometry(.104,20,14,0,Math.PI*2,0,Math.PI*.62),new THREE.MeshStandardMaterial({color:tdC(col),metalness:.3,roughness:.3}));hm.position.copy(head.position);hm.position.y+=.012;hm.scale.copy(head.scale);
        const vs=new THREE.Mesh(new THREE.SphereGeometry(.107,16,10,-.9,1.8,Math.PI*.3,Math.PI*.3),new THREE.MeshStandardMaterial({color:0x1b2430,metalness:.6,roughness:.15}));vs.position.copy(hm.position);vs.scale.copy(head.scale);h.g.add(hm,vs)}
      h.g.traverse(o=>{if(o.isMesh)o.castShadow=true});g.add(h.g);g.userData.rider9=h}catch(e){}}
  g.userData.moto9=1;return g}
{const _c=tdCar;tdCar=function(col,type){if(type==='moto9'||type==='moto9p')return tdMoto9(col,type==='moto9');return _c.apply(this,arguments)}}
// in curva la moto piega verso l'interno (la macchina invece si inclina un pochino verso fuori)
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{const F=TD.cf;if(F&&F.g&&F.g.userData.moto9){F.g.rotation.x=-F.roll*5;F.g.rotation.z=F.pitch*.5}}catch(e){}return r}}
