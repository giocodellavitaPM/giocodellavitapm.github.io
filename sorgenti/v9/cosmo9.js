/* ===== v9: la Base spaziale: compri un razzo e voli nello spazio ===== */
room('base9',12,8,'#1d2340','#252c4f','#2e3760',[fu('plant',1,6,1,1),fu('plant',10,6,1,1),fu('counter',4,4,4,1,'sheet:base9','Banco dei razzi')]);
SCENE_N.base9='alla Base spaziale';SCENE_DO.base9='Al banco compri un razzo e poi voli nello spazio!';
// [id, icona, nome, prezzo, velocità, colore]
const RAZZI=[['r1','🚀','Razzo piccolo',40e6,1,'#e5484d'],['r2','🚀','Razzo per famiglie',80e6,1.2,'#f5a700'],['r3','🛸','Navicella veloce',150e6,1.45,'#2bb673'],
 ['r4','🛰️','Shuttle',300e6,1.7,'#5ec8ff'],['r5','🚀','Razzo gigante',1e9,2,'#9b5de5'],['r6','🌟','Astronave stellare',10e9,2.6,'#ffd23f'],['r7','💎','Astronave di diamante',100e9,3.2,'#c8f7ff']];
const rocS=()=>S.razzi9||(S.razzi9={own:[],vis:{}});
function razzoBuy(id){const r=RAZZI.find(x=>x[0]===id),st=rocS();if(!r||st.own.includes(id))return;if(!canPay(r[3]))return toast('Non hai abbastanza soldi. 💸');
  money(-r[3]);st.own.push(id);count('compra');add('fel',6);const m=`🚀 Hai comprato: ${r[2]}! Tocca «Vola nello spazio» per partire!`;log(m);save();updateHud();refreshSheet();toast(m)}
function razzoAll(){const st=rocS(),L=RAZZI.filter(r=>!st.own.includes(r[0])),c=L.reduce((a,r)=>a+r[3],0);if(!L.length)return;if(!canPay(c))return toast('Non hai abbastanza soldi. 💸');money(-c);L.forEach(r=>st.own.push(r[0]));add('fel',8);save();updateHud();refreshSheet();toast(`🚀 Hai comprato tutti i razzi per ${fmtE(c)}!`)}
PLACES.base9={sub:()=>'Compra un razzo e vola!',body:()=>{const st=rocS(),L=RAZZI.filter(r=>!st.own.includes(r[0])),c=L.reduce((a,r)=>a+r[3],0),n=Object.keys(st.vis).length;
  let h=`<p class="note">🧑‍🚀 Benvenut${S.sex==='f'?'a':'o'} alla Base spaziale! Compra un razzo e poi <b>vola nello spazio</b>: visita la Luna, Marte, Giove, Saturno e gli altri pianeti! I razzi più cari sono più veloci. Hai ${fmtE(wealth())}.</p>`;
  if(L.length)h+=`<div class="row" style="border:3px solid #f5a700;background:#fff6dd"><div class="t"><b>🛍️ Compra tutti i razzi</b><span>${L.length} razzi · ${fmtE(c)}</span></div><button class="btn ${canPay(c)?'hot':''}" data-razzo9="all" ${canPay(c)?'':'disabled'}>Compra</button></div>`;
  if(st.own.length)h+=`<div class="h3">🚀 I tuoi razzi · pianeti visitati ${n}/${COSMO.length}</div>`+RAZZI.filter(r=>st.own.includes(r[0])).map(r=>`<div class="row"><div class="t"><b>${r[1]} ${r[2]}</b><span>Velocità ${'⚡'.repeat(Math.round(r[4]*2))}</span></div><button class="btn hot" data-vola9="${r[0]}">🚀 Vola nello spazio</button></div>`).join('');
  if(L.length)h+=`<div class="h3">🏪 Razzi da comprare</div>`+L.map(r=>`<div class="row"><div class="t"><b>${r[1]} ${r[2]}</b><span>Velocità ${'⚡'.repeat(Math.round(r[4]*2))}</span></div><button class="btn ${canPay(r[3])?'hot':''}" data-razzo9="${r[0]}" ${canPay(r[3])?'':'disabled'}>Compra ${fmtE(r[3])}</button></div>`).join('');
  return h}};
SHEET_T.base9=['🚀','Base spaziale'];
document.addEventListener('click',e=>{const b=e.target.closest('[data-razzo9],[data-vola9]');if(!b)return;if(b.dataset.razzo9)return b.dataset.razzo9==='all'?razzoAll():razzoBuy(b.dataset.razzo9);
  const r=RAZZI.find(x=>x[0]===b.dataset.vola9);if(!r)return;closeSheet();ui.razzo9=r;mgOpen('cosmo',`${r[1]} Spazio`,'cosmo9')});
// i pianeti: [nome, emoji, x, y, raggio, colore, curiosità]
const COSMO=[['Luna','🌙',0,-900,70,'#cfd3da','Sulla Luna salti altissimo perché c\'è poca gravità!'],['Marte','🔴',1500,-1700,90,'#d9623b','Marte è rosso perché la sua sabbia ha tanta ruggine!'],
 ['Venere','🟡',-1700,-1300,95,'#e8c36a','Venere è il pianeta più caldo di tutti!'],['Mercurio','⚪',-2900,-300,55,'#a9a9a9','Mercurio è il pianeta più vicino al Sole.'],
 ['Giove','🟠',2700,-3600,190,'#d9a066','Giove è il pianeta più grande: ci starebbero dentro più di 1.000 Terre!'],['Saturno','🪐',-2400,-4400,160,'#e8d29a','Gli anelli di Saturno sono fatti di ghiaccio e sassi!'],
 ['Urano','🔵',600,-6000,120,'#8fe3ef','Urano gira tutto storto, sdraiato su un fianco!'],['Nettuno','🔷',-3600,-7000,115,'#3f6fe0','Su Nettuno soffiano i venti più forti del sistema solare!'],
 ['Plutone','🤍',3600,-8200,45,'#e9dccb','Plutone è piccolissimo: è un pianeta nano!'],['Sole','☀️',-4600,1800,260,'#ffcf3f','Il Sole è una stella! Non ti avvicinare troppo, scotta! 🔥']];
MG.cosmo={help:'🚀 <b>Vola nello spazio!</b><br>Tieni il dito sullo schermo: il razzo va verso il tuo dito.<br>Sul computer: frecce ⬆️ ⬅️ ➡️.<br>Segui la freccia gialla e atterra su tutti i pianeti! 🪐<br>Per tornare sulla Terra tocca ✕.',
 init(m){const r=ui.razzo9||RAZZI[0];m.r=r;m.x=0;m.y=0;m.a=-Math.PI/2;m.v=0;m.vis={...rocS().vis};m.stars=[...Array(160)].map((_,i)=>[((i*7919)%9000)-4500,((i*104729)%11000)-9000,1+(i%3)]);m.got=[...Array(30)].map((_,i)=>({x:((i*3571)%8000)-4000,y:-((i*2297)%9000),ok:false}));m.n=0},
 tick(m,dt){const P=m.ptr,K=m.keys,sp=m.r[4];let th=0,tu=0;
  if(P.down){const ta=Math.atan2(P.y-MGH/2,P.x-MGW/2);let d=ta-m.a;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;tu=Math.max(-1,Math.min(1,d*2.5));th=1}
  if(K.ArrowLeft)tu=-1;if(K.ArrowRight)tu=1;if(K.ArrowUp)th=1;if(K.ArrowDown)m.v*=1-2*dt;
  m.a+=tu*3*dt;m.v=th?Math.min(420*sp,m.v+300*sp*dt):Math.max(0,m.v-60*dt);m.x+=Math.cos(m.a)*m.v*dt;m.y+=Math.sin(m.a)*m.v*dt;m.fire=th;
  if(m.land>0){m.land-=dt}
  COSMO.forEach(p=>{const d=Math.hypot(p[2]-m.x,p[3]-m.y);if(d<p[4]+30){if(p[0]==='Sole'){if(!m.hot||m.hot<=0){m.flash='Scotta! 🔥 Allontanati dal Sole!';m.fact='';m.ft=1.5;m.hot=2}const a=Math.atan2(m.y-p[3],m.x-p[2]);m.x=p[2]+Math.cos(a)*(p[4]+32);m.y=p[3]+Math.sin(a)*(p[4]+32)}
    if(!m.vis[p[0]]){m.vis[p[0]]=1;rocS().vis[p[0]]=1;m.n++;add('int',2);add('fel',3);m.flash=`${p[1]} Sei su ${p[0]}!`;m.fact=p[6];m.ft=3.5;save()}}});
  if(m.hot>0)m.hot-=dt;
  m.got.forEach(g=>{if(!g.ok&&Math.hypot(g.x-m.x,g.y-m.y)<40){g.ok=true;m.st9=(m.st9||0)+1;add('fel',1)}});
  if(m.ft)m.ft=Math.max(0,m.ft-dt);
  if(Object.keys(m.vis).length>=COSMO.length&&!m.done){m.done=1;setTimeout(()=>{if(ui.mg===m)mgEnd(`Hai visitato tutti i ${COSMO.length} pianeti del sistema solare! Sei un vero astronauta! 🧑‍🚀🏆`,3)},2500)}},
 draw(m,c){c.fillStyle='#070b1f';c.fillRect(0,0,MGW,MGH);const ox=MGW/2-m.x,oy=MGH/2-m.y;
  m.stars.forEach(([x,y,s])=>{const k=s/3,X=((x+ox*k)%MGW+MGW)%MGW,Y=((y+oy*k)%MGH+MGH)%MGH;c.fillStyle=`rgba(255,255,255,${.3+k*.5})`;c.fillRect(X,Y,s,s)});
  {const X=ox,Y=oy;if(X>-300&&X<MGW+300&&Y>-300&&Y<MGH+300){const g=c.createRadialGradient(X-30,Y-30,10,X,Y,120);g.addColorStop(0,'#7fc8ff');g.addColorStop(.6,'#2f6fe0');g.addColorStop(1,'#1d3f8a');c.fillStyle=g;c.beginPath();c.arc(X,Y+260,120,0,7);c.fill();c.fillStyle='#4caf50';c.beginPath();c.arc(X-30,Y+240,40,0,7);c.arc(X+40,Y+290,30,0,7);c.fill();c.fillStyle='#fff';c.font='800 14px system-ui';c.textAlign='center';c.fillText('🌍 Terra',X,Y+400)}}
  COSMO.forEach(p=>{const X=p[2]+ox,Y=p[3]+oy,R=p[4];if(X<-R-80||X>MGW+R+80||Y<-R-80||Y>MGH+R+80)return;
   if(p[0]==='Sole'){const g=c.createRadialGradient(X,Y,R*.3,X,Y,R*1.6);g.addColorStop(0,'#fff6b0');g.addColorStop(.5,'#ffb020');g.addColorStop(1,'rgba(255,120,0,0)');c.fillStyle=g;c.beginPath();c.arc(X,Y,R*1.6,0,7);c.fill()}
   const g=c.createRadialGradient(X-R*.3,Y-R*.3,R*.1,X,Y,R);g.addColorStop(0,'#fff');g.addColorStop(.25,p[5]);g.addColorStop(1,'#222');c.fillStyle=g;c.beginPath();c.arc(X,Y,R,0,7);c.fill();
   if(p[0]==='Saturno'){c.strokeStyle='rgba(232,210,154,.8)';c.lineWidth=10;c.beginPath();c.ellipse(X,Y,R*1.7,R*.45,-.3,0,7);c.stroke()}
   c.fillStyle='#fff';c.font='800 15px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(`${p[0]}${m.vis[p[0]]?' ✅':''}`,X,Y+R+20)});
  m.got.forEach(g=>{if(!g.ok)mgEmo(c,'⭐',g.x+ox,g.y+oy,26)});
  // il razzo
  c.save();c.translate(MGW/2,MGH/2);c.rotate(m.a+Math.PI/2);if(m.fire){c.fillStyle='#ffb020';c.beginPath();c.moveTo(-8,22);c.lineTo(0,34+Math.random()*16);c.lineTo(8,22);c.fill()}
  c.fillStyle='#f2f4f8';c.beginPath();c.moveTo(0,-30);c.quadraticCurveTo(14,-10,11,22);c.lineTo(-11,22);c.quadraticCurveTo(-14,-10,0,-30);c.fill();c.fillStyle=m.r[5];c.beginPath();c.moveTo(0,-30);c.quadraticCurveTo(8,-22,9,-14);c.lineTo(-9,-14);c.quadraticCurveTo(-8,-22,0,-30);c.fill();
  c.beginPath();c.moveTo(-11,10);c.lineTo(-20,26);c.lineTo(-10,22);c.fill();c.beginPath();c.moveTo(11,10);c.lineTo(20,26);c.lineTo(10,22);c.fill();c.fillStyle='#5ec8ff';c.beginPath();c.arc(0,-4,5,0,7);c.fill();c.restore();
  // freccia verso il pianeta più vicino da visitare
  const nx=COSMO.filter(p=>!m.vis[p[0]]&&p[0]!=='Sole').sort((a,b)=>Math.hypot(a[2]-m.x,a[3]-m.y)-Math.hypot(b[2]-m.x,b[3]-m.y))[0];
  if(nx){const a=Math.atan2(nx[3]-m.y,nx[2]-m.x),R=Math.min(MGW,MGH)*.38;c.save();c.translate(MGW/2+Math.cos(a)*R,MGH/2+Math.sin(a)*R);c.rotate(a);c.fillStyle='#ffd23f';c.beginPath();c.moveTo(16,0);c.lineTo(-10,-11);c.lineTo(-10,11);c.fill();c.restore();
   c.fillStyle='#ffd23f';c.font='800 14px system-ui';c.textAlign='center';c.fillText(`➡️ ${nx[1]} ${nx[0]}: ${Math.round(Math.hypot(nx[2]-m.x,nx[3]-m.y)/10)} mila km`,MGW/2,MGH-40)}
  if(m.ft){c.font='900 26px system-ui';c.textAlign='center';c.lineWidth=5;c.strokeStyle='#1f2540';c.fillStyle='#ffe066';c.strokeText(m.flash,MGW/2,110);c.fillText(m.flash,MGW/2,110);
   if(m.fact){c.font='700 15px system-ui';c.fillStyle='#fff';mgWrap(c,m.fact,MGW/2,145,MGW-40,20)}}},
 hud(m){return `🪐 ${Object.keys(m.vis).length}/${COSMO.length} · ⭐${m.st9||0} · ${Math.round(m.v/4)} km/s`}};
