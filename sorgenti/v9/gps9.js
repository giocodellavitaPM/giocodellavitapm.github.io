/* ================= v9: il navigatore come in GTA: la strada da fare colorata sulla minimappa e una colonna di luce gialla dove devi arrivare ================= */
const GPS9={t:0,route:null,goal:null,key:''};
function gpsCalc(dt){GPS9.t-=dt;if(!S||!S.alive||S.scene!=='citta'||ui.mg||ui.flying){GPS9.route=null;GPS9.goal=null;return}
  const fx=Math.floor(S.pos.x),fy=Math.floor(S.pos.y);
  if(ui.walk&&ui.walk.path&&ui.walk.path.length){const P=ui.walk.path,L=P[P.length-1];GPS9.route=[[S.pos.x-.5,S.pos.y-.5],...P];GPS9.goal=ui.mark?[ui.mark.x-.5,ui.mark.y-.5]:L;return}
  const d=S.drive;
  if(d&&d.goal){if(!d.man&&d.path&&d.path.length){GPS9.route=[[S.pos.x-.5,S.pos.y-.5],...d.path];GPS9.goal=d.goal;return}
    if(GPS9.t>0&&GPS9.key===d.goal+'')return;GPS9.t=.6;GPS9.key=d.goal+'';
    const st=at(fx,fy)===1?[[fx,fy]]:nearRoad(fx,fy),r=st.length?roadRoute(st,d.ends&&d.ends.length?d.ends:[d.goal]):null;GPS9.route=r?[[S.pos.x-.5,S.pos.y-.5],...r]:null;GPS9.goal=d.goal;return}
  GPS9.route=null;GPS9.goal=null}
{const _s=step;step=function(dt){const r=_s(dt);try{gpsCalc(dt)}catch(e){GPS9.route=null}return r}}
// sulla minimappa: la linea viola della strada da fare e la bandierina
function gpsDraw(c){try{if(typeof pkMini==='function')pkMini(c)}catch(e){}const R=GPS9.route;if(!R||R.length<2)return;c.save();c.lineJoin='round';c.lineCap='round';
  const pts=R.map(([x,y])=>mmXY(x+.5,y+.5));for(const [w,col] of [[13,'rgba(20,10,40,.75)'],[7,'#c45cff']]){c.strokeStyle=col;c.lineWidth=w;c.beginPath();pts.forEach(([X,Y],i)=>i?c.lineTo(X,Y):c.moveTo(X,Y));c.stroke()}
  c.restore();if(GPS9.goal){const [X,Y]=mmXY(GPS9.goal[0]+.5,GPS9.goal[1]+.5),W=300,cl=v=>Math.max(16,Math.min(W-16,v));c.font='30px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText('🏁',cl(X),cl(Y))}}
// in 3D: colonna di luce gialla (si vede da lontano, anche attraverso la nebbia) e un anello per terra
function tdGpsBeacon(){if(TD.gpsB)return TD.gpsB;const [c,g]=tdCan(4,128),gr=g.createLinearGradient(0,0,0,128);gr.addColorStop(0,'rgba(255,205,40,0)');gr.addColorStop(.5,'rgba(255,205,40,.42)');gr.addColorStop(1,'rgba(255,215,70,.8)');g.fillStyle=gr;g.fillRect(0,0,4,128);
  const t=new THREE.CanvasTexture(c),G=new THREE.Group(),m=new THREE.MeshBasicMaterial({map:t,transparent:true,depthWrite:false,side:THREE.DoubleSide,fog:false});t.encoding=THREE.sRGBEncoding;
  const col=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,6,24,1,true),m);col.position.y=3;col.renderOrder=4;
  const ring=new THREE.Mesh(new THREE.RingGeometry(.36,.5,32),new THREE.MeshBasicMaterial({color:0xffd23a,transparent:true,opacity:.85,depthWrite:false,fog:false,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.03;
  G.add(col,ring);G.userData.ring=ring;return TD.gpsB=G}
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{const g=GPS9.goal,B=tdGpsBeacon();
  if(city&&g&&Math.hypot(g[0]+.5-S.pos.x,g[1]+.5-S.pos.y)>.9){if(B.parent!==scn)scn.add(B);B.position.set(g[0]+.5,0,g[1]+.5);const k=1+Math.sin((TD.time||0)*4)*.08;B.userData.ring.scale.set(k,k,k);B.children[0].material.opacity=.8+Math.sin((TD.time||0)*2.5)*.15}
  else if(B.parent)B.parent.remove(B)}catch(e){}return r}}
