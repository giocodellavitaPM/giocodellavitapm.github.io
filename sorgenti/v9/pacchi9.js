/* ================= v9: 20 pacchi segreti nascosti in città (come i "pacchetti nascosti" di GTA) ================= */
const PK9={L:null,pool:[],intro:0};
function pkList(){if(PK9.L)return PK9.L;const seen=new Uint8Array(W*H),q=[],x0=Math.floor(DRIVEWAY.x),y0=Math.floor(DRIVEWAY.y);seen[y0*W+x0]=1;q.push(y0*W+x0);
  for(let i=0;i<q.length;i++){const c=q[i],x=c%W,y=(c/W)|0;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(nx<1||ny<1||nx>=W-1||ny>=H-1)continue;const k=ny*W+nx;if(seen[k])continue;const v=at(nx,ny);if(v===3||v===4||v===5||v===11||v===12)continue;seen[k]=1;q.push(k)}}
  const C=[];for(const k of q){const x=k%W,y=(k/W)|0,v=at(x,y);if((v===0||v===6||v===7)&&x>2&&y>3&&x<W-3&&y<H-3&&!inMZ(x,y)&&Math.hypot(x-x0,y-y0)>8&&!BUILD.some(b=>Math.abs(b.dx-x)<2&&Math.abs(b.dy-y)<2))C.push([x,y])}
  const r=seeded(2024),L=[];let n=0;while(L.length<20&&n++<20000&&C.length){const c=C[Math.floor(r()*C.length)];if(L.every(([a,b])=>Math.abs(a-c[0])+Math.abs(b-c[1])>=14))L.push(c)}
  return PK9.L=L}
const pkFound=i=>(S.pk9||[]).includes(i);
function pkDing(){try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const ac=(typeof RD9!=='undefined'&&RD9.ac)||(RD9.ac=new A());const t=ac.currentTime;
  [[880,0],[1175,.09],[1568,.18]].forEach(([f,d])=>{const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(0,t+d);g.gain.linearRampToValueAtTime(.12,t+d+.01);g.gain.exponentialRampToValueAtTime(.001,t+d+.35);o.connect(g);g.connect(ac.destination);o.start(t+d);o.stop(t+d+.4)})}catch(e){}}
function pkTick(dt){if(!S||!S.alive||S.scene!=='citta'||ui.mg||ui.flying||S.age<4)return;const L=pkList();
  if(!S.pkIntro&&!isBusy()&&(PK9.intro+=dt)>25){const t=$('toast');if(!t||t.hidden){S.pkIntro=1;toast('📦 In città sono nascosti 20 pacchi segreti! Cercali nei parchi e nelle piazze. Se non li trovi, chiedi alla gente: «hai visto un pacco segreto?»')}}
  for(let i=0;i<L.length;i++){if(pkFound(i))continue;const [x,y]=L[i];if(Math.hypot(x+.5-S.pos.x,y+.5-S.pos.y)<.75){S.pk9=(S.pk9||[]).concat(i);const n=S.pk9.length;
    if(n>=L.length){money(5000);add('fel',10);if(typeof gtaPassed==='function')gtaPassed('TUTTI I PACCHI!','Hai trovato tutti i 20 pacchi segreti: +5.000 € 🏆');else toast('🏆 Hai trovato tutti i pacchi segreti! +5.000 €')}
    else{money(100);add('fel',2);toast(`📦 Pacco segreto trovato! ${n}/${L.length} · +100 € 🎉`);pkDing()}
    save();updateHud();break}}}
{const _s=step;step=function(dt){const r=_s(dt);try{pkTick(dt)}catch(e){}return r}}
// in 2D: una scatola che saltella con il punto di domanda
{const _dc=drawCity;drawCity=function(t,x0,y0,x1,y1){_dc.apply(this,arguments);try{if(S.age<4||ui.td9bake)return;const L=pkList(),tt=performance.now()/1000;
  L.forEach(([x,y],i)=>{if(pkFound(i)||x<x0-1||x>x1+1||y<y0-1||y>y1+1)return;const X=(x+.5)*T,Y=(y+.5)*T,b=Math.sin(tt*3+i)*3;
    cx.fillStyle='rgba(0,0,0,.22)';cx.beginPath();cx.ellipse(X,Y+9,10,3.5,0,0,7);cx.fill();
    const g=cx.createRadialGradient(X,Y-4+b,2,X,Y-4+b,20);g.addColorStop(0,'rgba(120,255,140,.45)');g.addColorStop(1,'rgba(120,255,140,0)');cx.fillStyle=g;cx.beginPath();cx.arc(X,Y-4+b,20,0,7);cx.fill();
    cx.fillStyle='#b9824a';cx.fillRect(X-8,Y-12+b,16,15);cx.fillStyle='#d9a36a';cx.fillRect(X-8,Y-12+b,16,5);cx.fillStyle='#2fbf57';cx.fillRect(X-1.5,Y-12+b,3,15);
    cx.fillStyle='#fff';cx.font='900 11px system-ui';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('?',X+5,Y-3+b)})}catch(e){}}}
// sulla minimappa: solo quelli vicini (come un radar)
function pkMini(c){if(S.age<4)return;const L=pkList();L.forEach(([x,y],i)=>{if(pkFound(i)||Math.hypot(x-S.pos.x,y-S.pos.y)>14)return;const [X,Y]=mmXY(x+.5,y+.5);c.fillStyle='#2fbf57';c.strokeStyle='#0b3d1a';c.lineWidth=3;c.beginPath();c.arc(X,Y,9,0,7);c.fill();c.stroke();c.fillStyle='#fff';c.font='900 12px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText('?',X,Y+1)})}
// in 3D: pacco che gira su se stesso con una luce verde
function tdPkMesh(){if(!TD.pkG){const [c,g]=tdCan(64,64);g.fillStyle='#b9824a';g.fillRect(0,0,64,64);g.fillStyle='#a06c38';for(let i=0;i<40;i++)g.fillRect(Math.random()*64,Math.random()*64,2,2);g.fillStyle='#2fbf57';g.fillRect(27,0,10,64);
    g.fillStyle='#fff';g.font='900 30px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText('?',48,34);TD.pkM=new THREE.MeshLambertMaterial({map:tdTex(c),emissive:new THREE.Color(0x1a3a1a)});TD.pkG=new THREE.BoxGeometry(.26,.26,.26);
    const [c2,g2]=tdCan(64,64),gr=g2.createRadialGradient(32,32,2,32,32,31);gr.addColorStop(0,'rgba(140,255,150,.9)');gr.addColorStop(1,'rgba(140,255,150,0)');g2.fillStyle=gr;g2.fillRect(0,0,64,64);
    TD.pkS=new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c2),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})}
  const G=new THREE.Group(),m=new THREE.Mesh(TD.pkG,TD.pkM),s=new THREE.Sprite(TD.pkS);m.castShadow=true;s.scale.set(.9,.9,1);G.add(s,m);G.userData.box=m;return G}
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{let k=0;
  if(city&&S.age>=4){const L=pkList(),tt=TD.time||0;L.forEach(([x,y],i)=>{if(pkFound(i)||Math.abs(x-S.pos.x)>30||Math.abs(y-S.pos.y)>30)return;const G=PK9.pool[k]||(PK9.pool[k]=tdPkMesh());k++;if(G.parent!==scn)scn.add(G);
    G.position.set(x+.5,.32+Math.sin(tt*2.5+i)*.06,y+.5);G.userData.box.rotation.y=tt*1.6+i;G.userData.box.rotation.x=.25})}
  for(let j=k;j<PK9.pool.length;j++)if(PK9.pool[j].parent)PK9.pool[j].parent.remove(PK9.pool[j])}catch(e){}return r}}
// la gente ti dà un indizio
{const _p=dlgPre;dlgPre=function(n,raw,t){if(/(pacc|pacchi|pacchett)/.test(t)&&/(segret|nascost|visto|dove|trov)/.test(t)){const L=pkList(),open=L.map((p,i)=>[p,i]).filter(([p,i])=>!pkFound(i));
  if(!open.length)return {r:'Li hai trovati tutti e 20! Sei un vero detective! 🕵️🏆'};const [[[x,y]]]=open.sort((a,b)=>Math.hypot(a[0][0]-S.pos.x,a[0][1]-S.pos.y)-Math.hypot(b[0][0]-S.pos.x,b[0][1]-S.pos.y));
  const dx=x+.5-S.pos.x,dy=y+.5-S.pos.y,d=Math.hypot(dx,dy),dir='a '+['est','sud-est','sud','sud-ovest','ovest','nord-ovest','nord','nord-est'][((Math.round(Math.atan2(dy,dx)/(Math.PI/4))%8)+8)%8];
  const v=at(x,y),where=v===6?'su un vialetto del parco':v===7?'in una piazza':'su un prato';
  return {r:(d<10?'Fuochino! È proprio qui vicino, ':'Mi sembra di averne visto uno ')+dir+', '+where+'! 📦 (Ne hai trovati '+(S.pk9||[]).length+' su 20)'}}return _p(n,raw,t)}}
