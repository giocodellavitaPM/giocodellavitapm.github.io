/* ================= v9: persone più varie in 3D (come in GTA): giacche aperte sopra la maglia e occhiali da sole ================= */
const GT9_TK={f:[[.34,.077,.117],[.37,.065,.097],[.43,.067,.099],[.5,.075,.107],[.55,.067,.119],[.572,.059,.109],[.59,.047,.085],[.603,.036,.05]],
  m:[[.34,.075,.112],[.37,.067,.102],[.44,.073,.107],[.51,.077,.119],[.555,.071,.129],[.578,.062,.119],[.595,.049,.092],[.608,.036,.052]]};
const GT9_JC=['#2b2f38','#5a4632','#33415c','#6b6f76','#7a2e2e','#2f4a3a','#c9b48a','#1f2540'];
{const _h=tdHuman;tdHuman=function(lk){const r=_h.apply(this,arguments);try{const ag=lk.age;if(!r||!r.g||ag==='baby'||ag==='kid')return r;
  const h=hsh('g9'+JSON.stringify(lk)),f=!!lk.f,g=r.g,head=g.children.find(o=>o.isMesh&&o.geometry===tdHeadG),vc=tdVCM||(tdVCM=new THREE.MeshLambertMaterial({vertexColors:true}));
  // occhiali da sole
  if(head&&!lk.glasses&&h%100<17){const P=[];for(const s of[-1,1]){const e=new THREE.SphereGeometry(.0195,12,8);e.scale(.32,.8,1.15);P.push({g:e,c:'#0f1114',p:[.079,.013,s*.029]})}
    P.push({g:new THREE.BoxGeometry(.006,.006,.02),c:'#0f1114',p:[.083,.017,0]});for(const s of[-1,1])P.push({g:new THREE.BoxGeometry(.07,.006,.006),c:'#0f1114',p:[.046,.017,s*.071]});head.add(tdCM(P,false))}
  // giacca aperta: solo con le maniche lunghe
  const long=(lk.shirt||'').length%2===1;if(!long||(h>>>5)%100>=30||lk.skirt&&f&&(h>>>7)%2)return r;
  const jc=tdC(GT9_JC[hsh('jc'+(lk.shirt||'')+(lk.hair||'')+(lk.skin||'')+(lk.pants||''))%GT9_JC.length]),sh=tdC(lk.shirt||'#4a5d7e');if(Math.abs(jc.r-sh.r)+Math.abs(jc.g-sh.g)+Math.abs(jc.b-sh.b)<.12)return r;
  const K=GT9_TK[f?'f':'m'].map(([y,rx,rz])=>[y,rx,rz]),jk=tdLoft(tdKeys(K,22).map(([y,rx,rz])=>({p:y,cy:0,rx,ry:rz,n:2.05})),64,(t,sa,ca,rr)=>{
    const open=ca>.94&&rr.p<.585,k=.84+.2*Math.min(1,Math.max(0,(rr.p-.34)/.27))-(Math.abs(sa)>.85?.05:0);return (open?sh:(ca>.9&&rr.p<.585?jc.clone().multiplyScalar(.7):jc)).clone().multiplyScalar(k)},'y');
  const jm=new THREE.Mesh(jk,vc);jm.castShadow=true;g.add(jm);
  // le maniche diventano del colore della giacca
  const near=(C,i,c,k)=>Math.abs(C.getX(i)-c.r*k)<.012&&Math.abs(C.getY(i)-c.g*k)<.012&&Math.abs(C.getZ(i)-c.b*k)<.012;
  (r.arms||[]).forEach(a=>a.children.forEach(m=>{if(!m.isMesh||!m.geometry.attributes.color)return;const C=m.geometry.attributes.color;
    for(let i=0;i<C.count;i++)for(const k of [1,.85])if(near(C,i,sh,k)){C.setXYZ(i,jc.r*k,jc.g*k,jc.b*k);break}C.needsUpdate=true}))}catch(e){}return r}}
