/* ===== v9: grafica stile GTA: texture sporche, ombre lunghe, palme, notte con luci, colori da film, minimappa ===== */
// numero a caso ma sempre uguale per ogni casella (seeded() con semi vicini dà numeri quasi uguali: oggetti tutti in fila)
const h9r=(x,y,k)=>{let h=Math.imul(x|0,374761393)+Math.imul(y|0,668265263)+Math.imul((k|0)+1,1103515245);h=Math.imul(h^(h>>>13),1274126177);h^=h>>>16;return (h>>>0)/4294967296};
// texture più realistiche: asfalto scuro con crepe e macchie, marciapiedi di cemento, erba secca
function gtaTex(sz,seed,f){const c=document.createElement('canvas');c.width=c.height=sz;const g=c.getContext('2d'),r=seeded(seed);f(g,r,sz);return cx.createPattern(c,'repeat')}
function gtaNoise(g,r,sz,cols,n,a0,a1){for(let i=0;i<n;i++){g.fillStyle=cols[Math.floor(r()*cols.length)];g.globalAlpha=a0+r()*(a1-a0);g.fillRect(r()*sz,r()*sz,1+r()*1.5,1+r()*1.5)}g.globalAlpha=1}
{const _p=pats;pats=function(){if(PAT.gta)return;_p();PAT.gta=1;
  PAT.asphalt=gtaTex(256,71,(g,r,s)=>{g.fillStyle='#3c3e42';g.fillRect(0,0,s,s);gtaNoise(g,r,s,['#2c2e31','#4b4e52','#55585c','#26282a','#5e6064'],9000,.25,.7);
    for(let i=0;i<5;i++){const x=r()*s,y=r()*s,rad=10+r()*26,gr=g.createRadialGradient(x,y,1,x,y,rad);gr.addColorStop(0,'rgba(10,10,12,.35)');gr.addColorStop(1,'rgba(10,10,12,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,rad,0,7);g.fill()}
    g.strokeStyle='rgba(18,18,20,.55)';g.lineWidth=1;for(let i=0;i<6;i++){let x=r()*s,y=r()*s;g.beginPath();g.moveTo(x,y);for(let k=0;k<6;k++){x+=(r()-.5)*22;y+=(r()-.5)*22;g.lineTo(x,y)}g.stroke()}
    for(let i=0;i<3;i++){g.fillStyle=`rgba(${r()<.5?'70,72,76':'34,35,38'},.35)`;g.fillRect(r()*s,r()*s,20+r()*40,14+r()*30)}});
  PAT.walk=gtaTex(256,72,(g,r,s)=>{g.fillStyle='#a19d95';g.fillRect(0,0,s,s);gtaNoise(g,r,s,['#8f8b84','#b2aea6','#7d7a74','#c1bdb5'],7000,.2,.6);
    for(let i=0;i<9;i++){const x=r()*s,y=r()*s,rad=4+r()*14,gr=g.createRadialGradient(x,y,1,x,y,rad);gr.addColorStop(0,'rgba(60,55,45,.22)');gr.addColorStop(1,'rgba(60,55,45,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,rad,0,7);g.fill()}
    for(let i=0;i<25;i++){g.fillStyle='rgba(40,40,40,.35)';g.beginPath();g.arc(r()*s,r()*s,1+r()*1.2,0,7);g.fill()}});
  PAT.grass=gtaTex(256,73,(g,r,s)=>{g.fillStyle='#6a8a3c';g.fillRect(0,0,s,s);
    for(let i=0;i<10;i++){const x=r()*s,y=r()*s,rad=20+r()*40,gr=g.createRadialGradient(x,y,1,x,y,rad);gr.addColorStop(0,r()<.5?'rgba(150,150,70,.35)':'rgba(40,70,25,.35)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,rad,0,7);g.fill()}
    for(let i=0;i<5200;i++){g.fillStyle=['#4f6e2a','#7d9b48','#5d7d33','#93a356','#3f5c22','#a59a5a'][Math.floor(r()*6)];g.globalAlpha=.3+r()*.5;g.fillRect(r()*s,r()*s,1,2+r()*3)}g.globalAlpha=1;
    for(let i=0;i<6;i++){g.fillStyle='rgba(120,95,60,.3)';g.beginPath();g.ellipse(r()*s,r()*s,3+r()*6,2+r()*4,r()*3,0,7);g.fill()}});
  PAT.stone=gtaTex(256,74,(g,r,s)=>{g.fillStyle='#bdb6a8';g.fillRect(0,0,s,s);gtaNoise(g,r,s,['#a8a194','#cec7b9','#9a9387'],6000,.2,.55);g.strokeStyle='rgba(80,72,60,.35)';g.lineWidth=1.2;
    for(let y=0;y<=s;y+=32){g.beginPath();g.moveTo(0,y);g.lineTo(s,y);g.stroke();for(let x=(y/32%2)*32;x<=s;x+=64){g.beginPath();g.moveTo(x,y);g.lineTo(x,y+32);g.stroke()}}
    for(let i=0;i<8;i++){const x=r()*s,y=r()*s,rad=6+r()*16,gr=g.createRadialGradient(x,y,1,x,y,rad);gr.addColorStop(0,'rgba(70,60,45,.2)');gr.addColorStop(1,'rgba(70,60,45,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,rad,0,7);g.fill()}});
  PAT.gravel=gtaTex(256,75,(g,r,s)=>{g.fillStyle='#b4a27e';g.fillRect(0,0,s,s);gtaNoise(g,r,s,['#9c8a66','#c9b893','#8a7856','#d8c9a6'],9000,.3,.8)});
}}
// ombre lunghe dei palazzi (il sole basso, come nei film)
function gtaShadow(x,y,w,h,k){const X=x*T,Y=y*T,W=w*T,H=h*T,s=T*k;cx.fillStyle='rgba(8,10,20,.26)';cx.beginPath();cx.moveTo(X+W,Y);cx.lineTo(X+W+s,Y+s*.7);cx.lineTo(X+W+s,Y+H+s*.7);cx.lineTo(X+s,Y+H+s*.7);cx.lineTo(X,Y+H);cx.closePath();cx.fill()}
{const _dc=drawCity;drawCity=function(t,x0,y0,x1,y1){_dc(t,x0,y0,x1,y1);
  if(!ui.td9bake)BUILD.forEach(b=>{if(b.x+b.w+3<x0||b.x>x1+1||b.y+b.h+3<y0||b.y-2>y1)return;gtaShadow(b.x,b.y,b.w,b.h,b.w*b.h>200?2.6:b.h>=5?1.4:.9)});
  if(!ui.td9bake)APTS.forEach(a=>{if(a.x+a.w+3<x0||a.x>x1+1||a.y+a.h+3<y0||a.y-2>y1)return;gtaShadow(a.x,a.y,a.w,a.h,1.2+(a.floors||a.h)*.18)});
  // tombini e strisce gialle in mezzo alla strada
  for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){if(at(x,y)!==1)continue;const r=h9r(x,y,1);if(r<.025){const X=x*T+T/2,Y=y*T+T/2;cx.fillStyle='#2a2b2d';cx.beginPath();cx.arc(X,Y,7,0,7);cx.fill();cx.strokeStyle='#5a5c60';cx.lineWidth=1.5;cx.stroke();cx.beginPath();cx.moveTo(X-5,Y);cx.lineTo(X+5,Y);cx.moveTo(X,Y-5);cx.lineTo(X,Y+5);cx.stroke()}}
}}
// palme (Los Santos!) al posto di alcuni alberi
function drawPalm(x,y){const X=x*T+T/2,Y=y*T+T/2,r=seeded(x*51+y*17),lean=(r()-.5)*14,h=46+r()*14;
  cx.fillStyle='rgba(0,0,0,.22)';cx.beginPath();cx.ellipse(X+18,Y+10,20,7,.3,0,7);cx.fill();
  cx.strokeStyle='#7a5c3c';cx.lineWidth=6;cx.lineCap='round';cx.beginPath();cx.moveTo(X,Y+12);cx.quadraticCurveTo(X+lean*.3,Y-h*.5,X+lean,Y-h);cx.stroke();
  cx.strokeStyle='rgba(60,40,20,.5)';cx.lineWidth=6;for(let i=1;i<7;i++){const t=i/7,px=X+lean*t*t,py=Y+12-(h+12)*t;cx.beginPath();cx.moveTo(px-3,py);cx.lineTo(px+3,py);cx.stroke()}cx.lineCap='butt';
  const tx=X+lean,ty=Y-h;for(let i=0;i<8;i++){const a=i/8*Math.PI*2+r()*.3,L=22+r()*8;cx.strokeStyle=i%2?'#2f6b2a':'#3f8a35';cx.lineWidth=5;cx.beginPath();cx.moveTo(tx,ty);cx.quadraticCurveTo(tx+Math.cos(a)*L*.6,ty+Math.sin(a)*L*.4-8,tx+Math.cos(a)*L,ty+Math.sin(a)*L*.7+4);cx.stroke()}
  cx.fillStyle='#5a3e22';cx.beginPath();cx.arc(tx,ty,4,0,7);cx.fill()}
{const _dt=drawTree;drawTree=function(x,y){if(S&&S.scene==='citta'&&((Math.imul(x+7,73856093)^Math.imul(y+3,19349663))>>>0)%1000<300)return drawPalm(x,y);return _dt(x,y)}}
// notte con le luci dei lampioni e dei fari, e il tramonto arancione
function gtaDark(){const h=((S&&S.clock)||420)/60;if(h>=20.5||h<5.5)return .5;if(h>=18.5)return (h-18.5)/2*.5;if(h<7)return (7-h)/1.5*.5;return 0}
function gtaSunset(){const h=((S&&S.clock)||420)/60;return h>=16.5&&h<20.5?Math.sin((h-16.5)/4*Math.PI)*.16:h>=5.5&&h<8?Math.sin((h-5.5)/2.5*Math.PI)*.1:0}
{const _dr=draw;draw=function(t){_dr(t);if(!S||S.scene!=='citta'||ui.mg)return;const d=gtaDark(),ss=gtaSunset();if(d<=0&&ss<=0)return;
  cx.save();cx.setTransform(DPR*ZOOM9,0,0,DPR*ZOOM9,0,0);
  if(ss>0){cx.fillStyle=`rgba(255,120,40,${ss})`;cx.fillRect(0,0,VW,VH)}
  if(d>0){cx.fillStyle=`rgba(6,10,32,${d})`;cx.fillRect(0,0,VW,VH);cx.globalCompositeOperation='lighter';cx.translate(-Math.round(cam.x),-Math.round(cam.y));const k=d/.5;
    // luci realistiche viste dall'alto: pozze di luce morbide e allungate, fari a cono
    const pool=(X,Y,rx,ry,col,al)=>{cx.save();cx.translate(X,Y);cx.scale(1,ry/rx);const g=cx.createRadialGradient(0,0,0,0,0,rx);g.addColorStop(0,col+(al*k).toFixed(3)+')');g.addColorStop(.45,col+(al*.45*k).toFixed(3)+')');g.addColorStop(1,col+'0)');cx.fillStyle=g;cx.beginPath();cx.arc(0,0,rx,0,7);cx.fill();cx.restore()};
    const beam=(X,Y,a,len,w0,w1,al)=>{cx.save();cx.translate(X,Y);cx.rotate(a);const g=cx.createLinearGradient(0,0,len,0);g.addColorStop(0,`rgba(255,246,214,${(al*k).toFixed(3)})`);g.addColorStop(1,'rgba(255,246,214,0)');cx.fillStyle=g;cx.beginPath();cx.moveTo(0,-w0/2);cx.lineTo(len,-w1/2);cx.quadraticCurveTo(len+12,0,len,w1/2);cx.lineTo(0,w0/2);cx.closePath();cx.fill();cx.restore()};
    const vis=(X,Y,m)=>!(X<cam.x-m||X>cam.x+VW+m||Y<cam.y-m||Y>cam.y+VH+m);
    LAMPS.forEach(([x,y])=>{const X=x*T,Y=y*T;if(!vis(X,Y,120))return;pool(X+12,Y+4,58,34,'rgba(255,196,120,',.30);pool(X+9,Y-42,7,7,'rgba(255,236,190,',.9)});
    const car=(x,y,a)=>{const X=x*T,Y=y*T;if(!vis(X,Y,140))return;const c=Math.cos(a),s2=Math.sin(a),px=-s2,py=c;
      for(const sd of[-1,1]){beam(X+c*30+px*sd*9,Y+s2*30+py*sd*9,a,105,6,46,.26);pool(X-c*31+px*sd*9,Y-s2*31+py*sd*9,9,6,'rgba(255,40,30,',.55)}};
    TRAF.forEach(cc=>{const [x,y]=carXY(cc);car(x,y,cc.o==='h'?(cc.d>0?0:Math.PI):(cc.d>0?Math.PI/2:-Math.PI/2))});
    if(S.drive)car(S.pos.x,S.pos.y,S.drive.ang);else if(S.famDrive)car(S.pos.x,S.pos.y,S.famDrive.ang);else if(S.ride&&ui.car)car(S.pos.x,S.pos.y,ui.car.ang||0);
    BUILD.forEach(b=>{const X=(b.dx+.5)*T,Y=b.dy*T;if(!vis(X,Y,80))return;pool(X,Y+8,40,20,'rgba(255,200,130,',.32)});
  }cx.restore()}}
// colori da film: più contrasto, vignettatura scura ai bordi
(function(){const st=document.createElement('style');st.textContent=`#world{filter:contrast(1.1) saturate(1.15) brightness(.97)}
 #gtafx9{position:fixed;inset:0;pointer-events:none;z-index:1;background:radial-gradient(ellipse at 50% 50%,rgba(0,0,0,0) 55%,rgba(0,0,0,.42) 100%),linear-gradient(180deg,rgba(255,190,110,.06),rgba(30,50,110,.08))}
 #mm9{position:fixed;z-index:5;left:max(12px,env(safe-area-inset-left,0px));bottom:calc(14px + env(safe-area-inset-bottom,0px));width:150px;height:150px;border-radius:14px;border:3px solid #111;box-shadow:0 4px 14px rgba(0,0,0,.5);background:#1b1d22;overflow:hidden;cursor:pointer}
 #mm9 canvas{display:block;width:100%;height:100%}#mm9bars{position:absolute;left:0;right:0;bottom:0;height:8px;display:flex;gap:2px;background:#111}#mm9bars i{display:block;height:100%}
 #hMoney,#hBank{font-family:'Anton','Oswald',Impact,system-ui!important;letter-spacing:.5px;color:#7cf07a!important;background:rgba(10,12,16,.72)!important;border-color:#111!important;text-shadow:0 2px 0 #0a3a10,0 0 2px #000;font-size:18px!important;font-weight:400!important}
 #hBank{color:#8fd0ff!important;text-shadow:0 2px 0 #0a2540,0 0 2px #000}
 @media(max-width:480px){#mm9{width:112px;height:112px}}`;document.head.appendChild(st);
 const ln=document.createElement('link');ln.rel='stylesheet';ln.href='https://fonts.googleapis.com/css2?family=Anton&display=swap';document.head.appendChild(ln);
 const fx=document.createElement('div');fx.id='gtafx9';document.body.appendChild(fx);
 const mm=document.createElement('div');mm.id='mm9';mm.title='Mappa';mm.innerHTML='<canvas width="300" height="300"></canvas><div id="mm9bars"><i style="background:#3fbf4a"></i><i style="background:#3f8fe0"></i></div>';document.body.appendChild(mm);
 mm.addEventListener('click',()=>{if(typeof openMap==='function')openMap()});})();
// la minimappa (il radar di GTA)
let mmT=0;
let mm9Rot=0;function mmXY(bx,by){const W=300,R=34,k=W/(R*2),dx=(bx-S.pos.x)*k,dy=(by-S.pos.y)*k,r=mm9Rot||0,c=Math.cos(r),s=Math.sin(r);return [W/2+dx*c-dy*s,W/2+dx*s+dy*c]}
function gtaMini(){const box=$('mm9');if(!box)return;const show=S&&S.alive&&S.scene==='citta'&&!ui.mg&&!ui.flying;box.hidden=!show;const ck=$('clock9');if(ck)ck.style.bottom=show?`calc(${box.offsetHeight+24}px + env(safe-area-inset-bottom,0px))`:'calc(30px + env(safe-area-inset-bottom,0px))';if(!show)return;
  // in 3D la mappa gira con la telecamera (come il radar di GTA): davanti a te è sempre in alto
  const c=box.querySelector('canvas').getContext('2d'),W=300,R=34,px=S.pos.x,py=S.pos.y,k=W/(R*2),td3=typeof tdActive==='function'&&tdActive()&&typeof TD!=='undefined'&&TD.me,rot=td3?-Math.PI/2-TD.yaw:0;mm9Rot=rot;
  c.fillStyle='#2a2d33';c.fillRect(0,0,W,W);c.save();c.translate(W/2,W/2);c.rotate(rot);c.translate(-W/2,-W/2);
  const col={1:'#8a8d93',2:'#5a5d63',3:'#3d7fb8',4:'#43474f',5:'#2f4a24',6:'#4f6b3a',7:'#6f6a60',8:'#7a5040'},RR=rot?Math.ceil(R*1.45):R;
  for(let y=Math.floor(py-RR);y<=py+RR;y++)for(let x=Math.floor(px-RR);x<=px+RR;x++){const v=at(x,y);if(v==null)continue;const cc=col[v]||(v===0||v===11?'#3e5a2e':null);if(!cc)continue;c.fillStyle=cc;c.fillRect((x-px+R)*k,(y-py+R)*k,k+.6,k+.6)}
  c.restore();try{if(typeof gpsDraw==='function')gpsDraw(c)}catch(e){}
  const blip=(bx,by,e,s)=>{const [X,Y]=mmXY(bx,by);if(X<-10||X>W+10||Y<-10||Y>W+10)return;c.font=(s||30)+'px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(e,X,Y)};
  BUILD.forEach(b=>{if(b.id==='casamia')blip(b.dx+.5,b.dy-1,'🏠',34);else if(['centro','biz9','base9','museo9','inv9','mbanca9','tutto9'].includes(b.id))blip(b.dx+.5,b.dy-1,b.ic,22)});
  c.save();c.translate(W/2,W/2);const a=td3?TD.me.a+Math.PI/2+rot:S.drive?S.drive.ang+Math.PI/2:{u:0,d:Math.PI,l:-Math.PI/2,r:Math.PI/2}[S.face]||0;c.rotate(a);c.fillStyle='#fff';c.strokeStyle='#111';c.lineWidth=3;c.beginPath();c.moveTo(0,-16);c.lineTo(11,12);c.lineTo(0,6);c.lineTo(-11,12);c.closePath();c.fill();c.stroke();c.restore();
  {let nx=Math.sin(rot),ny=-Math.cos(rot);const m=Math.max(Math.abs(nx),Math.abs(ny));nx=nx/m*(W/2-18);ny=Math.min(W/2-34,ny/m*(W/2-18));c.fillStyle='rgba(0,0,0,.6)';c.beginPath();c.arc(W/2+nx,W/2+ny,15,0,7);c.fill();c.fillStyle='#fff';c.font='900 18px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText('N',W/2+nx,W/2+ny+1)}
  const bars=box.querySelectorAll('#mm9bars i');if(bars.length===2){bars[0].style.width=Math.max(4,S.st.sal)/2+'%';bars[1].style.width=Math.max(4,S.st.fel)/2+'%'}}
{const _st=step;step=function(dt){const r=_st(dt);mmT+=dt;if(mmT>.2){mmT=0;try{gtaMini()}catch(e){}}return r}}
