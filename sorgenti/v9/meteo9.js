/* ================= v9: il meteo — ogni tanto piove (in 2D e in 3D), le strade diventano bagnate ================= */
const MT9={r:0,tg:0,left:0,hour:-1,ann:0};
function meteoTick(dt){if(!S||!S.alive)return;const h=Math.floor((S.clock||0)/60);
  if(h!==MT9.hour){const first=MT9.hour<0;MT9.hour=h;
    if(MT9.left>0){MT9.left--;if(MT9.left<=0){MT9.tg=0;if(MT9.r>.2&&S.scene==='citta')toast(MT9.snow?'🌤️ Ha smesso di nevicare!':'🌤️ Ha smesso di piovere!')}}
    else if(!first&&MT9.tg===0){const s=typeof stagione==='function'?stagione():'autunno',p={autunno:.08,inverno:.06,primavera:.07,estate:.03}[s]||.05;
      if(Math.random()<p){MT9.tg=.55+Math.random()*.45;MT9.left=1+Math.floor(Math.random()*3);MT9.ann=1;MT9.snow=s==='inverno'&&Math.random()<.6}}}
  MT9.r+=(MT9.tg-MT9.r)*Math.min(1,dt*.35);if(MT9.tg===0&&MT9.r<.01){MT9.r=0;MT9.snow=false}
  if(MT9.ann&&MT9.r>.25&&S.scene==='citta'&&!isBusy()){MT9.ann=0;toast(MT9.snow?'❄️ Nevica! La città diventa tutta bianca. Che bello! ⛄':'🌧️ Piove! Le strade sono bagnate: se vuoi, entra in un negozio. ☔')}}
{const _s=step;step=function(dt){const r=_s(dt);try{meteoTick(dt)}catch(e){}return r}}
// 2D: gocce che cadono e un velo grigio
{const _dr=draw;draw=function(t){_dr(t);if(!S||S.scene!=='citta'||ui.mg||MT9.r<=.02)return;if(typeof tdActive==='function'&&tdActive())return;
  const k=MT9.r,tt=performance.now()/1000;cx.save();cx.setTransform(DPR*ZOOM9,0,0,DPR*ZOOM9,0,0);
  if(MT9.snow){cx.fillStyle=`rgba(236,242,250,${(.26*k).toFixed(3)})`;cx.fillRect(0,0,VW,VH);cx.fillStyle='#ffffff';const n=Math.floor(140*k);
    for(let i=0;i<n;i++){const sx=(i*0.6180339)%1,sy=(i*0.7548776)%1,sp=40+((i*37)%7)*12,r=1.2+((i*13)%5)*.5,x=((sx*(VW+40)+Math.sin(tt*.8+i)*18+tt*14)%(VW+40)+VW+40)%(VW+40)-20,y=(sy*(VH+40)+tt*sp)%(VH+40)-20;cx.globalAlpha=.65+.35*((i*7)%3)/2;cx.beginPath();cx.arc(x,y,r,0,7);cx.fill()}
    cx.globalAlpha=1;cx.restore();return}
  cx.fillStyle=`rgba(38,50,68,${(.2*k).toFixed(3)})`;cx.fillRect(0,0,VW,VH);
  cx.strokeStyle=`rgba(205,218,238,${(.5*k).toFixed(3)})`;cx.lineWidth=1.1;cx.beginPath();const n=Math.floor(170*k);
  for(let i=0;i<n;i++){const sx=(i*0.6180339)%1,sy=(i*0.7548776)%1,sp=520+((i*37)%9)*40,x=(sx*(VW+60)+tt*70)%(VW+60)-30,y=(sy*(VH+60)+tt*sp)%(VH+60)-30;cx.moveTo(x,y);cx.lineTo(x-3,y+13)}
  cx.stroke();cx.fillStyle=`rgba(225,234,248,${(.4*k).toFixed(3)})`;
  for(let i=0;i<n/2;i++){const f=Math.floor(tt*5+i*.37),x=((i*131.7+f*53.3)%VW+VW)%VW,y=((i*71.3+f*97.1)%VH+VH)%VH,a=(tt*5+i*.37)%1;cx.globalAlpha=1-a;cx.beginPath();cx.ellipse(x,y,1+a*4,.6+a*2,0,0,7);cx.fill()}
  cx.globalAlpha=1;cx.restore()}}
// 3D: righe di pioggia intorno alla telecamera, nebbia più vicina, cielo grigio, asfalto lucido e scuro
function tdRainMake(sc){const N=2200,P=new Float32Array(N*6),A=new Float32Array(N*2),r=seeded(4321);
  for(let i=0;i<N;i++){const x=(r()-.5)*26,y=r()*11,z=(r()-.5)*26;P.set([x,y,z,x,y,z],i*6);A[i*2]=0;A[i*2+1]=1}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setAttribute('tip',new THREE.BufferAttribute(A,1));
  const m=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uO:{value:0},uC:{value:new THREE.Vector3()}},transparent:true,depthWrite:false,
    vertexShader:'attribute float tip;uniform float uT;uniform vec3 uC;varying float vA;void main(){vec3 p=position;p.x=uC.x+mod(p.x-uC.x+13.0,26.0)-13.0+tip*0.05;p.z=uC.z+mod(p.z-uC.z+13.0,26.0)-13.0;p.y=mod(p.y-uT*12.0,11.0)-1.5+tip*0.42;vA=tip;gl_Position=projectionMatrix*viewMatrix*vec4(p,1.0);}',
    fragmentShader:'uniform float uO;varying float vA;void main(){gl_FragColor=vec4(0.8,0.86,0.94,uO*(0.2+0.8*vA));}'});
  const L=new THREE.LineSegments(g,m);L.frustumCulled=false;L.visible=false;L.renderOrder=3;sc.add(L);TD.rain=L}
{const _b=tdBuildCity;tdBuildCity=function(){const r=_b.apply(this,arguments);try{tdRainMake(TD.city.sc);tdSnowMake(TD.city.sc)}catch(e){console.warn('rain',e)}return r}}
// 3D: fiocchi di neve che scendono piano e ondeggiano
function tdSnowMake(sc){const N=2400,P=new Float32Array(N*3),R=new Float32Array(N),r=seeded(8765);for(let i=0;i<N;i++){P.set([(r()-.5)*26,r()*11,(r()-.5)*26],i*3);R[i]=r()}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setAttribute('rnd',new THREE.BufferAttribute(R,1));
  const m=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uO:{value:0},uC:{value:new THREE.Vector3()}},transparent:true,depthWrite:false,
    vertexShader:'attribute float rnd;uniform float uT;uniform vec3 uC;varying float vA;void main(){vec3 p=position;float t=uT*(0.6+rnd*0.5);p.x=uC.x+mod(p.x-uC.x+13.0+sin(t*1.3+rnd*20.0)*0.6,26.0)-13.0;p.z=uC.z+mod(p.z-uC.z+13.0+cos(t+rnd*9.0)*0.5,26.0)-13.0;p.y=mod(p.y-t*1.1,11.0)-1.0;vA=0.6+0.4*rnd;vec4 mv=viewMatrix*vec4(p,1.0);gl_PointSize=clamp((70.0+rnd*60.0)/-mv.z,2.0,16.0);gl_Position=projectionMatrix*mv;}',
    fragmentShader:'uniform float uO;varying float vA;void main(){vec2 c=gl_PointCoord-0.5;float d=length(c);if(d>0.5)discard;gl_FragColor=vec4(1.0,1.0,1.0,uO*vA*smoothstep(0.5,0.15,d));}'});
  const Pt=new THREE.Points(g,m);Pt.frustumCulled=false;Pt.visible=false;Pt.renderOrder=3;sc.add(Pt);TD.snow=Pt}
{const _l=tdLight;tdLight=function(){_l.apply(this,arguments);const k=MT9.r,C=TD.city;if(!C)return;
  const sn=!!MT9.snow;if(TD.snow){TD.snow.visible=sn&&k>.02;if(TD.snow.visible){const u=TD.snow.material.uniforms;u.uT.value=TD.time||0;u.uO.value=.95*k;u.uC.value.copy(TD.cam.position)}}
  TD.envMats.forEach(m=>{if(!m.roughnessMap)return;const w=sn?.34*k:0;if(w||m.userData.sn9){m.userData.sn9=w>0;m.emissive.setRGB(.86,.9,.96);m.emissiveIntensity=w}});
  if(TD.rain){TD.rain.visible=k>.02&&!sn;if(k>.02){const u=TD.rain.material.uniforms;u.uT.value=TD.time||0;u.uO.value=.7*k;u.uC.value.copy(TD.cam.position)}}
  if(!sn)TD.envMats.forEach(m=>{if(!m.roughnessMap)return;m.roughness=1-.42*k;m.color.setScalar(1-.22*k);m.envMapIntensity=(m.envMapIntensity||0)+.5*k});
  C.sc.fog.near=16-9*k;C.sc.fog.far=46-16*k;if(k<=.01)return;const grey=new THREE.Color(gtaDark()>.25?(sn?'#26303c':'#121822'):(sn?'#c9d3de':'#7f8a96'));grey.convertSRGBToLinear();
  C.sc.background.lerp(grey,.7*k);C.sc.fog.color.copy(C.sc.background);
  C.sun.intensity*=1-(sn?.45:.65)*k;C.hemi.intensity*=1-.15*k;if(TD.sky)TD.sky.material.color.lerp(new THREE.Color(gtaDark()>.25?'#10141c':(sn?'#d4dce6':'#8c96a2')),.75*k);
  if(TD.sunS)TD.sunS.material.color.multiplyScalar(1-k)}}
// la gente commenta la pioggia
{const _p=dlgPre;dlgPre=function(n,raw,t){if(MT9.r>.2&&MT9.snow&&/(nev|fiocc|pupazz|freddo|palle di neve)/.test(t)&&!/^(perche|come mai)/.test(t))return {r:['Nevica! Facciamo un pupazzo di neve? ⛄','Che freddo! Metti la sciarpa e i guanti. 🧣🧤','Guarda i fiocchi: non ce n\'è uno uguale all\'altro! ❄️'][Math.floor(Math.random()*3)]};
  if(MT9.r>.2&&!MT9.snow&&/(piove|pioggia|ombrell|bagnat)/.test(t)&&!/^(perche|come mai)/.test(t))return {r:[ 'Sì, piove! Meno male che ho l\'ombrello. ☂️','Che acquazzone! Dopo magari esce l\'arcobaleno. 🌈','Piove! Saltiamo nelle pozzanghere? 😄💦'][Math.floor(Math.random()*3)]};return _p(n,raw,t)}}
// con la pioggia molte persone aprono l'ombrello (in 3D)
function tdUmbGeo(col){TD.umbG=TD.umbG||{};if(TD.umbG[col])return TD.umbG[col];
  const parts=[{g:new THREE.ConeGeometry(.3,.1,12),c:col,p:[.16,.99,.09]},{g:new THREE.SphereGeometry(.016,6,4),c:'#222428',p:[.16,1.045,.09]},{g:new THREE.CylinderGeometry(.006,.006,.58,5),c:'#2a2a2a',p:[.185,.72,.11],r:[.06,0,-.1]}];
  return TD.umbG[col]=tdCM(parts,true).geometry}
{const _h=tdHuman;tdHuman=function(lk){const r=_h.apply(this,arguments);r.human=true;return r}}
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{const on=city&&MT9.r>.3;
  for(const [k,e] of TD.pool){if(!e.human||k==='_me')continue;let h=0;for(let i=0;i<k.length;i++)h=(h*31+k.charCodeAt(i))>>>0;
    if(!on||h%10>=6||e.seen!==TD.t){if(e.umb)e.umb.visible=false;continue}
    if(!e.umb){const cols=['#d23b3b','#2f5fd0','#f2c230','#222428','#3fa35b','#e86fb0'];e.umb=new THREE.Mesh(tdUmbGeo(cols[h%6]),tdVCM);e.umb.castShadow=true;e.g.add(e.umb)}
    e.umb.visible=true;if(e.arms&&e.arms[1])e.arms[1].rotation.z=.9}}catch(e){}return r}}
