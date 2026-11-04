/* ===== v9: minigiochi veri (go-kart, bowling, basket, ritmo, pong, rigori, salti, nuoto) ===== */
const MGACT={gokart9:['kart','🏎️ Go-kart'],bowling9:['bowling','🎳 Bowling'],basket9:['basket','🏀 Basket'],karaoke9:['ritmo','🎤 Karaoke'],musica9:['ritmo','🎸 Suona a tempo'],
  pingpong9:['pong','🏓 Ping pong'],tennis9:['pong','🎾 Tennis'],calcio9:['rigori','⚽ Rigori'],salta9:['salti','🤸 Tappeto elastico'],skate9:['salti','🛹 Skate'],arrampica9:['salti','🧗 Arrampicata'],
  tuffo9:['nuoto','🏊 Nuoto'],nuota9:['nuoto','🏊‍♂️ Nuoto'],scivolo9:['nuoto','🌊 Nuoto']};
const MG={};let MGW=0,MGH=0,MGX=null;
function mgOpen(type,title,act){if(ui.mg)return;const el=document.createElement('div');el.id='mg9';
  el.style.cssText='position:fixed;inset:0;z-index:80;background:#14182b;touch-action:none;user-select:none;-webkit-user-select:none';
  el.innerHTML=`<canvas id="mgc" style="position:absolute;inset:0;width:100%;height:100%"></canvas>
   <div style="position:absolute;left:0;right:0;top:calc(8px + env(safe-area-inset-top,0px));display:flex;align-items:center;gap:8px;padding:0 10px;pointer-events:none">
    <div style="background:#fff;border:3px solid #1f2540;border-radius:14px;padding:4px 12px;font:900 17px system-ui;color:#1f2540">${title}</div>
    <div id="mgScore" style="background:#1f2540;color:#7CFFB2;border-radius:12px;padding:5px 10px;font:900 16px monospace;margin-left:auto"></div>
    <button id="mgX" type="button" style="pointer-events:auto;width:42px;height:42px;border-radius:12px;border:3px solid #1f2540;background:#fff;font:900 20px system-ui">✕</button></div>
   <div id="mgMsg" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:rgba(255,253,247,.97);border:3px solid #1f2540;border-radius:22px;padding:18px 20px;text-align:center;max-width:min(360px,88vw);font:700 17px system-ui;color:#1f2540;box-shadow:0 6px 0 #1f2540" hidden></div>`;
  document.body.appendChild(el);const cv2=el.querySelector('#mgc');
  const fit=()=>{const d=Math.min(2,devicePixelRatio||1);MGW=innerWidth;MGH=innerHeight;cv2.width=MGW*d;cv2.height=MGH*d;MGX=cv2.getContext('2d');MGX.setTransform(d,0,0,d,0,0)};fit();
  ui.mg={type,title,act,t:0,score:0,over:false,ptr:{down:false,x:0,y:0,sx:0,sy:0,t0:0},keys:{},fit,el};
  const P=ui.mg.ptr;
  cv2.addEventListener('pointerdown',e=>{e.preventDefault();try{cv2.setPointerCapture(e.pointerId)}catch(_){}Object.assign(P,{down:true,x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,t0:performance.now()});const g=MG[ui.mg.type];if(g.down&&!ui.mg.over&&!ui.mg.wait)g.down(ui.mg,P)});
  cv2.addEventListener('pointermove',e=>{P.x=e.clientX;P.y=e.clientY});
  const up=e=>{if(!P.down)return;P.down=false;P.x=e.clientX;P.y=e.clientY;const g=MG[ui.mg.type];if(g.up&&!ui.mg.over&&!ui.mg.wait)g.up(ui.mg,P)};
  cv2.addEventListener('pointerup',up);cv2.addEventListener('pointercancel',up);
  el.querySelector('#mgX').addEventListener('click',()=>mgClose(false));
  el.addEventListener('click',e=>{const b=e.target.closest('[data-mgdo]');if(!b)return;if(b.dataset.mgdo==='again'){const t=ui.mg.type,ti=ui.mg.title,a=ui.mg.act;mgClose(true);mgOpen(t,ti,a)}else mgClose(true)});
  addEventListener('resize',fit);
  MG[type].init(ui.mg);const _h=MG[type].help;mgMsg(typeof _h==='function'?_h(ui.mg):_h,'Via! ▶️',()=>{ui.mg.wait=false});ui.mg.wait=true;
  let last=performance.now();const loop=t=>{if(!ui.mg||ui.mg.el!==el)return;const dt=Math.min(.04,(t-last)/1000);last=t;const m=ui.mg;
    if(!m.wait&&!m.over){m.t+=dt;MG[m.type].tick(m,dt)}MGX.clearRect(0,0,MGW,MGH);MG[m.type].draw(m,MGX);$('mgScore').textContent=MG[m.type].hud(m);requestAnimationFrame(loop)};requestAnimationFrame(loop)}
function mgMsg(html,btn,cb){const b=$('mgMsg');b.innerHTML=`<div style="margin-bottom:12px;line-height:1.35">${html}</div><button type="button" class="btn hot" id="mgGo" style="font-size:19px;padding:10px 22px">${btn}</button>`;b.hidden=false;
  $('mgGo').onclick=()=>{b.hidden=true;cb&&cb()}}
function mgEnd(text,stars){const m=ui.mg;if(!m||m.over)return;m.over=true;const st=['kart','bowling','basket','pong','rigori','salti','nuoto','forza'].includes(m.type)?'spo':['quiz','memory','biliardo'].includes(m.type)?'int':'fel';
  add('fel',2+stars*2);add(st,1+stars);log(`${m.title}: ${text}`);save();updateHud();
  const b=$('mgMsg');b.innerHTML=`<div style="font-size:34px">${'⭐'.repeat(stars)}${'☆'.repeat(3-stars)}</div><div style="margin:8px 0 14px;line-height:1.35">${text}</div><div style="display:flex;gap:10px;justify-content:center"><button type="button" class="btn hot" data-mgdo="again" style="font-size:17px">🔁 Ancora</button><button type="button" class="btn alt" data-mgdo="out" style="font-size:17px">Esci</button></div>`;b.hidden=false}
function mgClose(){const m=ui.mg;if(!m)return;removeEventListener('resize',m.fit);m.el.remove();ui.mg=null}
addEventListener('keydown',e=>{if(!ui.mg)return;ui.mg.keys[e.key]=true;const g=MG[ui.mg.type];if(g.key&&!ui.mg.over&&!ui.mg.wait)g.key(ui.mg,e.key);if([' ','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))e.preventDefault()},true);
addEventListener('keyup',e=>{if(ui.mg)ui.mg.keys[e.key]=false},true);
{const _st=step;step=function(dt){if(ui.mg)return;return _st(dt)}}
{const _uf=useFurn;useFurn=function(f){const a=f&&f.act||'';if(MGACT[a]){const [t,ti]=MGACT[a];return mgOpen(t,ti,a)}return _uf(f)}}
const mgEmo=(c,e,x,y,s,rot)=>{c.save();c.translate(x,y);if(rot)c.rotate(rot);c.fillStyle='#000';c.font=s+'px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(e,0,0);c.restore()};
const mgRR=(c,x,y,w,h,r)=>{c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()};

/* ---------- GO-KART ---------- */
MG.kart={help:'🏎️ <b>3 giri di pista!</b><br>Tieni il dito sullo schermo: il kart va verso il tuo dito.<br>Sul computer: frecce ⬆️ ⬅️ ➡️.<br>Se esci dalla pista vai piano!',
 trk(){const cx=MGW/2,cy=MGH/2+20,rx=Math.max(110,MGW/2-50),ry=Math.max(150,MGH/2-110);return {cx,cy,rx,ry,w:Math.min(90,Math.min(rx,ry)*.45)}},
 pos(T,th,off){return [T.cx+Math.cos(th)*(T.rx+off),T.cy+Math.sin(th)*(T.ry+off)]},
 init(m){const T=this.trk();m.T=T;const [x,y]=this.pos(T,Math.PI/2,0);m.me={x,y,ang:Math.PI,v:0,prog:0,lth:Math.PI/2};
  m.ai=[['#e5484d',.98,-T.w*.25],['#2bb673',.93,T.w*.25],['#9b5de5',.88,0]].map(([col,sp,off],i)=>({col,sp,off,th:Math.PI/2+.12*(i+1),prog:.12*(i+1)}));m.laps=3;m.place=0},
 tick(m,dt){const T=m.T,me=m.me,P=m.ptr,K=m.keys;let acc=0,turn=0;
  if(P.down){const ta=Math.atan2(P.y-me.y,P.x-me.x);let d=ta-me.ang;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;turn=Math.max(-1,Math.min(1,d*2));acc=1}
  if(K.ArrowLeft)turn=-1;if(K.ArrowRight)turn=1;if(K.ArrowUp)acc=1;if(K.ArrowDown)acc=-1;
  const nx=(me.x-T.cx)/T.rx,ny=(me.y-T.cy)/T.ry,r=Math.hypot(nx,ny),half=T.w/2/Math.min(T.rx,T.ry),on=Math.abs(r-1)<half;
  const max=on?260:110;me.ang+=turn*3*dt*(.4+Math.min(1,Math.abs(me.v)/150));me.v+=acc>0?240*dt:acc<0?-300*dt:-120*dt;me.v=Math.max(-60,Math.min(max,me.v));if(!on&&me.v>max)me.v-=400*dt;
  me.x+=Math.cos(me.ang)*me.v*dt;me.y+=Math.sin(me.ang)*me.v*dt;me.x=Math.max(10,Math.min(MGW-10,me.x));me.y=Math.max(60,Math.min(MGH-10,me.y));
  const th=Math.atan2((me.y-T.cy)/T.ry,(me.x-T.cx)/T.rx);let d=th-me.lth;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;me.prog+=d/(2*Math.PI);me.lth=th;
  const R=(T.rx+T.ry)/2;m.ai.forEach(a=>{const sp=a.sp*230/R;a.th+=sp*dt;a.prog+=sp*dt/(2*Math.PI)});
  if(me.prog>=m.laps){const place=1+m.ai.filter(a=>a.prog>=m.laps).length;const st=place===1?3:place===2?2:1;mgEnd(place===1?`🏆 Hai vinto la gara! Primo posto in ${m.t.toFixed(1)} secondi!`:`Sei arrivat${o()} ${place}° su 4! Riprova per vincere! 🏁`,st)}
  else if(m.ai.every(a=>a.prog>=m.laps+.6))mgEnd('Gli altri sono arrivati tutti… sei ultim'+o()+'! Riprova! 🏁',1)},
 draw(m,c){const T=m.T;c.fillStyle='#4f8a3c';c.fillRect(0,0,MGW,MGH);
  c.strokeStyle='#3a3f44';c.lineWidth=T.w;c.beginPath();c.ellipse(T.cx,T.cy,T.rx,T.ry,0,0,7);c.stroke();
  c.setLineDash([14,14]);c.strokeStyle='#e5484d';c.lineWidth=5;c.beginPath();c.ellipse(T.cx,T.cy,T.rx+T.w/2,T.ry+T.w/2,0,0,7);c.stroke();c.strokeStyle='#fff';c.beginPath();c.ellipse(T.cx,T.cy,T.rx-T.w/2,T.ry-T.w/2,0,0,7);c.stroke();c.setLineDash([]);
  for(let i=0;i<8;i++){c.fillStyle=i%2?'#fff':'#111';c.fillRect(T.cx-4+(i%2)*4,T.cy+T.ry-T.w/2+Math.floor(i/2)*(T.w/4),4,T.w/4)}
  mgEmo(c,'🌳',T.cx-T.rx*.4,T.cy,40);mgEmo(c,'🏁',T.cx,T.cy+T.ry-T.w/2-26,30);mgEmo(c,'👏',T.cx+T.rx*.4,T.cy,34);
  m.ai.forEach(a=>{const [x,y]=this.pos(T,a.th,a.off);this.kart(c,x,y,a.th+Math.PI/2,a.col)});this.kart(c,m.me.x,m.me.y,m.me.ang,'#f5a700',true)},
 kart(c,x,y,ang,col,me){c.save();c.translate(x,y);c.rotate(ang);c.fillStyle='rgba(0,0,0,.25)';c.fillRect(-13,-8,28,18);c.fillStyle='#111';c.fillRect(-12,-11,7,4);c.fillRect(-12,7,7,4);c.fillRect(6,-11,7,4);c.fillRect(6,7,7,4);
  c.fillStyle=col;mgRR(c,-13,-8,26,16,5);c.fill();c.fillStyle=me?'#1f2540':'#333';c.beginPath();c.arc(-1,0,5,0,7);c.fill();c.restore();if(me){c.fillStyle='#fff';c.font='900 11px system-ui';c.textAlign='center';c.fillText('TU',x,y-18)}},
 hud(m){return `Giro ${Math.min(m.laps,Math.floor(Math.max(0,m.me.prog))+1)}/${m.laps}`}};

/* ---------- BOWLING ---------- */
MG.bowling={help:'🎳 <b>Bowling!</b><br>Trascina il dito <b>in su</b> e lascia: la palla va dove la tiri.<br>Più veloce trascini, più forte va!<br>Hai 3 turni con 2 tiri ciascuno.',
 init(m){m.frame=1;m.shot=1;m.tot=0;this.rack(m);this.reset(m)},
 lane(){const w=Math.min(220,MGW*.6);return {x:MGW/2-w/2,w,top:90,bot:MGH-40}},
 rack(m){const L=this.lane(),cx=MGW/2,y0=L.top+50,sp=L.w/6;m.pins=[];for(let r=0;r<4;r++)for(let i=0;i<=r;i++)m.pins.push({x:cx+(i-r/2)*sp,y:y0+(3-r)*sp*.85,vx:0,vy:0,down:false})},
 reset(m){const L=this.lane();m.ball={x:MGW/2,y:L.bot-30,vx:0,vy:0,go:false};m.wait2=0},
 up(m,P){if(m.ball.go)return;const dx=P.x-P.sx,dy=P.y-P.sy;if(dy>-30)return;const dtm=Math.max(.08,(performance.now()-P.t0)/1000),sp=Math.min(900,Math.max(380,Math.hypot(dx,dy)/dtm*.6));const l=Math.hypot(dx,dy);m.ball.spin=(Math.random()-.5)*120;m.ball.vx=dx/l*sp;m.ball.vy=dy/l*sp;m.ball.go=true},
 key(m,k){if(k===' '&&!m.ball.go){m.ball.vx=(Math.random()-.5)*60;m.ball.vy=-700;m.ball.go=true}if(k==='ArrowLeft'&&!m.ball.go)m.ball.x-=12;if(k==='ArrowRight'&&!m.ball.go)m.ball.x+=12},
 tick(m,dt){const L=this.lane(),b=m.ball;
  if(!b.go&&m.ptr.down){b.x=Math.max(L.x+16,Math.min(L.x+L.w-16,m.ptr.sx))}
  if(b.go){b.vx+=(b.spin||0)*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.x<L.x+12||b.x>L.x+L.w-12){b.vx=0;b.x=Math.max(L.x+12,Math.min(L.x+L.w-12,b.x))}
   m.pins.forEach(p=>{if(!p.down&&Math.hypot(p.x-b.x,p.y-b.y)<24){p.down=true;const a=Math.atan2(p.y-b.y,p.x-b.x);p.vx=Math.cos(a)*260+b.vx*.3;p.vy=Math.sin(a)*260+b.vy*.3}});}
  m.pins.forEach(p=>{if(!p.down)return;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.96;p.vy*=.96;m.pins.forEach(q=>{if(!q.down&&q!==p&&Math.hypot(q.x-p.x,q.y-p.y)<20&&Math.hypot(p.vx,p.vy)>40){q.down=true;q.vx=p.vx*.7+(q.x-p.x)*4;q.vy=p.vy*.7+(q.y-p.y)*4}})});
  if(b.go&&b.y<L.top-20){m.wait2+=dt;if(m.wait2>1){const n=m.pins.filter(p=>p.down&&!p.gone).length;m.pins.forEach(p=>{if(p.down)p.gone=true});m.tot+=n;const all=m.pins.every(p=>p.gone);
    m.flash=(all&&m.shot===1?'STRIKE! 🎉':all?'SPARE! 👏':n+' birilli!');m.ft=1.4;
    if(all||m.shot===2){m.frame++;m.shot=1;if(m.frame>3){const st=m.tot>=25?3:m.tot>=16?2:1;return mgEnd(`Hai buttato giù ${m.tot} birilli su 30! ${st===3?'Campione! 🏆':''}`,st)}this.rack(m)}else m.shot=2;this.reset(m)}}
  if(m.ft)m.ft=Math.max(0,m.ft-dt)},
 draw(m,c){const L=this.lane();c.fillStyle='#2b2040';c.fillRect(0,0,MGW,MGH);c.fillStyle='#1b1b1b';c.fillRect(L.x-18,L.top-30,L.w+36,L.bot-L.top+60);
  const g=c.createLinearGradient(L.x,0,L.x+L.w,0);g.addColorStop(0,'#c9965e');g.addColorStop(.5,'#e6bb83');g.addColorStop(1,'#c9965e');c.fillStyle=g;c.fillRect(L.x,L.top-30,L.w,L.bot-L.top+60);
  c.strokeStyle='rgba(0,0,0,.08)';for(let x=L.x;x<L.x+L.w;x+=L.w/12){c.beginPath();c.moveTo(x,L.top-30);c.lineTo(x,L.bot+30);c.stroke()}
  for(let i=0;i<5;i++)mgEmo(c,'▲',L.x+L.w*(i+1)/6,L.bot-120,12);
  m.pins.forEach(p=>{if(p.gone)return;c.save();c.translate(p.x,p.y);if(p.down)c.rotate(Math.atan2(p.vy,p.vx));c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(2,4,9,6,0,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.ellipse(0,0,p.down?12:9,9,0,0,7);c.fill();c.fillStyle='#e5484d';c.fillRect(-9,-2,18,3);c.restore()});
  const b=m.ball;c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.arc(b.x+3,b.y+4,15,0,7);c.fill();const bg=c.createRadialGradient(b.x-5,b.y-5,2,b.x,b.y,16);bg.addColorStop(0,'#7aa7ff');bg.addColorStop(1,'#1f3c8a');c.fillStyle=bg;c.beginPath();c.arc(b.x,b.y,15,0,7);c.fill();
  if(!b.go){c.fillStyle='rgba(255,255,255,.85)';c.font='800 14px system-ui';c.textAlign='center';c.fillText('⬆️ trascina in su',MGW/2,L.bot+20)}
  if(m.ft){c.fillStyle='#fff';c.font='900 34px system-ui';c.textAlign='center';c.fillText(m.flash,MGW/2,MGH/2)}},
 hud(m){return `Turno ${Math.min(3,m.frame)}/3 · 🎳 ${m.tot}`}};

/* ---------- BASKET ---------- */
MG.basket={help:'🏀 <b>Tiri a canestro!</b><br>Trascina il dito <b>in su verso il canestro</b> e lascia.<br>Più lungo trascini, più forte tiri.<br>Hai 40 secondi!',
 init(m){m.hoop={x:MGW/2,y:150,dir:1};m.made=0;m.tries=0;m.fo=m.act==='fontana9';this.reset(m)},
 reset(m){m.ball={x:MGW/2,y:MGH-110,go:false,t:0}},
 up(m,P){const b=m.ball;if(b.go)return;const dx=P.x-P.sx,dy=P.y-P.sy;if(dy>-25)return;const pw=Math.min(1.5,Math.abs(dy)/(MGH*.3));
  const dist=b.y-m.hoop.y;b.tx=b.x+dx/Math.abs(dy)*dist;b.ty=b.y-dist*pw;b.sx=b.x;b.sy=b.y;b.go=true;b.t=0;m.tries++},
 key(m,k){if(k===' '&&!m.ball.go){const b=m.ball;b.tx=m.hoop.x+(Math.random()-.5)*60;b.ty=m.hoop.y+(Math.random()-.5)*50;b.sx=b.x;b.sy=b.y;b.go=true;b.t=0;m.tries++}},
 tick(m,dt){const h=m.hoop;if(m.made>=3&&!m.fo){h.x+=h.dir*(60+m.made*8)*dt;if(h.x<80||h.x>MGW-80)h.dir*=-1}
  const b=m.ball;if(b.go){b.t+=dt/.9;if(b.t>=1){const ok=Math.abs(b.tx-h.x)<38&&Math.abs(b.ty-h.y)<45;if(ok){m.made++;m.flash=m.fo?'Desiderio! ✨':'CANESTRO! 🎉';m.ft=1}else{m.flash=b.ty<h.y-45?'Troppo forte!':b.ty>h.y+45?'Troppo piano!':'Fuori!';m.ft=.9}this.reset(m)}}
  if(m.ft)m.ft=Math.max(0,m.ft-dt);if(m.t>=40){const st=m.made>=10?3:m.made>=5?2:1;mgEnd(m.fo?`Hai fatto centro ${m.made} volte su ${m.tries}: ${m.made} desideri! ✨`:`Hai fatto ${m.made} canestri su ${m.tries} tiri!`,st)}},
 draw(m,c){if(m.fo)return this.drawFo(m,c);c.fillStyle='#d9a066';c.fillRect(0,0,MGW,MGH);c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=4;c.beginPath();c.arc(MGW/2,90,MGW*.42,0,Math.PI);c.stroke();c.strokeRect(MGW/2-70,60,140,200);
  const h=m.hoop;c.fillStyle='#fff';c.fillRect(h.x-55,h.y-80,110,70);c.strokeStyle='#e5484d';c.lineWidth=4;c.strokeRect(h.x-25,h.y-55,50,40);c.strokeStyle='#ff6a1a';c.lineWidth=6;c.beginPath();c.ellipse(h.x,h.y,34,10,0,0,7);c.stroke();
  c.strokeStyle='rgba(255,255,255,.8)';c.lineWidth=1.5;for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(h.x+i*10,h.y+4);c.lineTo(h.x+i*6,h.y+36);c.stroke()}
  const b=m.ball;let x=b.x,y=b.y,s=1;if(b.go){const t=b.t;x=b.sx+(b.tx-b.sx)*t;y=b.sy+(b.ty-b.sy)*t-Math.sin(t*Math.PI)*140;s=1-t*.45}
  c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(b.go?b.sx+(b.tx-b.sx)*b.t:x,(b.go?b.sy+(b.ty-b.sy)*b.t:y)+22,18*s,6*s,0,0,7);c.fill();mgEmo(c,'🏀',x,y,46*s);
  if(!b.go){c.fillStyle='#1f2540';c.font='800 14px system-ui';c.textAlign='center';c.fillText('⬆️ trascina verso il canestro',MGW/2,MGH-40)}
  if(m.ft){c.fillStyle='#1f2540';c.font='900 30px system-ui';c.textAlign='center';c.fillText(m.flash,MGW/2,MGH/2)}},
 hud(m){return `${m.fo?'🪙':'🏀'} ${m.made} · ⏱️ ${Math.max(0,Math.ceil(40-m.t))}`}};

/* ---------- RITMO (karaoke e musica) ---------- */
MG.ritmo={help:'🎶 <b>A tempo di musica!</b><br>Le note scendono nelle 3 corsie.<br>Tocca la corsia giusta quando la nota arriva sulla <b>linea gialla</b>.<br>Sul computer: tasti A S D. Dura 35 secondi!',
 init(m){m.notes=[];m.next=1;m.hit=0;m.miss=0;m.combo=0;m.flash=[0,0,0];m.words=['La','la','là','Oh','yeah','♪','Na','na','Ue','oh']},
 lanes(){const w=Math.min(110,MGW/3.4);return [0,1,2].map(i=>MGW/2+(i-1)*w)},
 hitY(){return MGH-150},
 press(m,i){const y=this.hitY();let best=null;m.notes.forEach(n=>{if(n.l===i&&!n.done&&Math.abs(n.y-y)<55&&(!best||Math.abs(n.y-y)<Math.abs(best.y-y)))best=n});
  if(best){best.done=true;m.hit++;m.combo++;m.flash[i]=.3;m.word=m.words[m.hit%m.words.length];m.wt=.5}else{m.combo=0}},
 down(m,P){const L=this.lanes(),w=L[1]-L[0];const i=Math.round((P.x-L[0])/w);if(i>=0&&i<=2)this.press(m,i)},
 key(m,k){const i='asd'.indexOf(k.toLowerCase());if(i>=0)this.press(m,i);if(k==='ArrowLeft')this.press(m,0);if(k==='ArrowDown')this.press(m,1);if(k==='ArrowRight')this.press(m,2)},
 tick(m,dt){const sp=230+m.t*4;m.next-=dt;if(m.next<=0&&m.t<33){m.notes.push({l:Math.floor(Math.random()*3),y:80,done:false});m.next=Math.max(.35,.8-m.t*.012)}
  m.notes.forEach(n=>{n.y+=sp*dt;if(!n.done&&n.y>this.hitY()+60){n.done=true;n.miss=true;m.miss++;m.combo=0}});m.notes=m.notes.filter(n=>n.y<MGH+40);
  m.flash=m.flash.map(f=>Math.max(0,f-dt));if(m.wt)m.wt=Math.max(0,m.wt-dt);
  if(m.t>=35){const tot=m.hit+m.miss,p=tot?m.hit/tot:0;const st=p>.85?3:p>.6?2:1;mgEnd(`Hai preso ${m.hit} note su ${tot}! ${st===3?'Il pubblico è in delirio! 👏👏':'Bella esibizione!'}`,st)}},
 draw(m,c){const g=c.createLinearGradient(0,0,0,MGH);g.addColorStop(0,'#2b1650');g.addColorStop(1,'#0e1430');c.fillStyle=g;c.fillRect(0,0,MGW,MGH);
  for(let i=0;i<6;i++){c.fillStyle=`hsla(${(m.t*60+i*60)%360},90%,60%,.18)`;c.beginPath();c.moveTo(MGW*i/5,0);c.lineTo(MGW*i/5-80,MGH);c.lineTo(MGW*i/5+40,MGH);c.closePath();c.fill()}
  const L=this.lanes(),w=L[1]-L[0],hy=this.hitY(),cols=['#ff5d8f','#5ec8ff','#7CFFB2'];
  L.forEach((x,i)=>{c.fillStyle=`rgba(255,255,255,${.06+m.flash[i]})`;c.fillRect(x-w/2+4,70,w-8,MGH-70)});
  c.fillStyle='#f5d26b';c.fillRect(L[0]-w/2,hy-3,w*3,6);
  m.notes.forEach(n=>{if(n.done&&!n.miss)return;c.globalAlpha=n.miss?.3:1;c.fillStyle=cols[n.l];c.beginPath();c.arc(L[n.l],n.y,24,0,7);c.fill();mgEmo(c,'♪',L[n.l],n.y,26);c.globalAlpha=1});
  L.forEach((x,i)=>{c.strokeStyle=cols[i];c.lineWidth=4;c.beginPath();c.arc(x,hy,28,0,7);c.stroke()});
  mgEmo(c,m.title.includes('Karaoke')?'🎤':'🎸',MGW/2,MGH-60,50);
  if(m.wt){c.fillStyle='#fff';c.font='900 34px system-ui';c.textAlign='center';c.fillText(m.word+'! 🎵',MGW/2,MGH/2-40)}
  if(m.combo>=5){c.fillStyle='#f5d26b';c.font='900 22px system-ui';c.textAlign='center';c.fillText('Combo x'+m.combo+' 🔥',MGW/2,110)}},
 hud(m){return `🎵 ${m.hit} · ⏱️ ${Math.max(0,Math.ceil(35-m.t))}`}};

/* ---------- PONG (ping pong e tennis) ---------- */
MG.pong={help:'🏓 <b>Partita!</b><br>Muovi il dito a destra e a sinistra: la tua racchetta (in basso) lo segue.<br>Sul computer: frecce ⬅️ ➡️.<br>Vince chi arriva prima a 5 punti!',
 init(m){m.me=0;m.cpu=0;m.px=MGW/2;m.cx=MGW/2;this.serve(m,1)},
 court(){const w=Math.min(360,MGW-30),h=Math.min(MGH-160,620);return {x:MGW/2-w/2,y:(MGH-h)/2+30,w,h}},
 serve(m,dir){const C=this.court();m.b={x:MGW/2,y:C.y+C.h/2,vx:(Math.random()-.5)*160,vy:dir*240};m.pause=.8},
 tick(m,dt){const C=this.court(),K=m.keys;if(m.ptr.down)m.px=m.ptr.x;if(K.ArrowLeft)m.px-=420*dt;if(K.ArrowRight)m.px+=420*dt;const pw=70;m.px=Math.max(C.x+pw/2,Math.min(C.x+C.w-pw/2,m.px));
  if(m.pause>0){m.pause-=dt;return}const b=m.b;b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.x<C.x+8||b.x>C.x+C.w-8){b.vx*=-1;b.x=Math.max(C.x+8,Math.min(C.x+C.w-8,b.x))}
  const cs=170+m.me*25;m.cx+=Math.max(-cs*dt,Math.min(cs*dt,b.x-m.cx));
  const py=C.y+C.h-24,cy=C.y+24;
  if(b.vy>0&&b.y>py-10&&b.y<py+10&&Math.abs(b.x-m.px)<pw/2+8){b.vy=-Math.min(620,Math.abs(b.vy)*1.07);b.vx=(b.x-m.px)*7}
  if(b.vy<0&&b.y<cy+10&&b.y>cy-10&&Math.abs(b.x-m.cx)<pw/2+8){b.vy=Math.min(620,Math.abs(b.vy)*1.05);b.vx=(b.x-m.cx)*6+(Math.random()-.5)*80}
  if(b.y>C.y+C.h+20){m.cpu++;this.serve(m,-1)}if(b.y<C.y-20){m.me++;m.flash=.8;this.serve(m,1)}if(m.flash)m.flash=Math.max(0,m.flash-dt);
  if(m.me>=5||m.cpu>=5){const win=m.me>=5;mgEnd(win?`Hai vinto ${m.me} a ${m.cpu}! 🏆`:`Hai perso ${m.me} a ${m.cpu}. La prossima la vinci tu!`,win?(m.cpu<=2?3:2):1)}},
 draw(m,c){const C=this.court(),ten=m.title.includes('Tennis');c.fillStyle=ten?'#3e8e5a':'#2b2f3a';c.fillRect(0,0,MGW,MGH);c.fillStyle=ten?'#c4663f':'#2f6fb0';c.fillRect(C.x,C.y,C.w,C.h);
  c.strokeStyle='#fff';c.lineWidth=3;c.strokeRect(C.x,C.y,C.w,C.h);c.beginPath();c.moveTo(C.x-10,C.y+C.h/2);c.lineTo(C.x+C.w+10,C.y+C.h/2);c.lineWidth=ten?4:6;c.stroke();if(!ten){c.lineWidth=1.5;c.beginPath();c.moveTo(MGW/2,C.y);c.lineTo(MGW/2,C.y+C.h);c.stroke()}
  const pw=70,py=C.y+C.h-24,cy=C.y+24;c.fillStyle='#e5484d';mgRR(c,m.px-pw/2,py-6,pw,12,6);c.fill();c.fillStyle='#1f2540';mgRR(c,m.cx-pw/2,cy-6,pw,12,6);c.fill();
  const b=m.b;c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.arc(b.x+3,b.y+5,7,0,7);c.fill();c.fillStyle=ten?'#d7f542':'#fff';c.beginPath();c.arc(b.x,b.y,7,0,7);c.fill();
  c.fillStyle='#fff';c.font='800 13px system-ui';c.textAlign='center';c.fillText('TU',m.px,py+24);c.fillText('AVVERSARIO',m.cx,cy-14);
  if(m.flash){c.font='900 30px system-ui';c.fillText('PUNTO! 🎉',MGW/2,C.y+C.h/2-20)}},
 hud(m){return `Tu ${m.me} - ${m.cpu}`}};

/* ---------- RIGORI ---------- */
MG.rigori={help:'⚽ <b>Rigori!</b><br>Trascina il dito <b>verso la porta</b>, dove vuoi tirare, e lascia.<br>Il portiere si tuffa: tira negli angoli!<br>5 tiri.',
 init(m){m.shots=0;m.goals=0;this.reset(m)},
 goal(){const w=Math.min(300,MGW-60);return {x:MGW/2-w/2,y:120,w,h:110}},
 reset(m){const G=this.goal();m.ball={x:MGW/2,y:MGH-150,go:false,t:0};m.kp={x:MGW/2,dive:0,tx:MGW/2};m.res=null},
 up(m,P){const b=m.ball;if(b.go||m.res)return;const dx=P.x-P.sx,dy=P.y-P.sy;if(dy>-25)return;const G=this.goal();b.tx=b.x+dx/Math.abs(dy)*(b.y-G.y-G.h/2);b.ty=G.y+G.h*.5-Math.min(1,Math.abs(dy)/(MGH*.5))*G.h*.6;b.sx=b.x;b.sy=b.y;b.go=true;b.t=0;
  m.kp.tx=Math.random()<.45?b.tx+(Math.random()-.5)*40:G.x+20+Math.random()*(G.w-40)},
 key(m,k){if(k===' ')this.up(m,{x:m.ptr.sx+(Math.random()-.5)*200,y:m.ptr.sy-200,sx:m.ptr.sx,sy:m.ptr.sy})},
 tick(m,dt){const G=this.goal(),b=m.ball,k=m.kp;if(!b.go&&!m.res){k.x=MGW/2+Math.sin(m.t*2)*30}
  if(b.go){b.t+=dt/.55;k.x+=(k.tx-k.x)*Math.min(1,dt*6);if(b.t>=1){b.go=false;const inG=b.tx>G.x+8&&b.tx<G.x+G.w-8&&b.ty>G.y;const saved=Math.abs(b.tx-k.x)<38&&b.ty>G.y+20;
    m.shots++;if(inG&&!saved){m.goals++;m.res='GOL! ⚽🎉'}else m.res=saved?'Parata! 🧤':'Fuori! 😬';m.rt=1.3;b.x=b.tx;b.y=b.ty}}
  if(m.res){m.rt-=dt;if(m.rt<=0){if(m.shots>=5){const st=m.goals>=5?3:m.goals>=3?2:1;return mgEnd(`Hai segnato ${m.goals} rigori su 5!`,st)}this.reset(m)}}},
 draw(m,c){c.fillStyle='#3a8a3f';c.fillRect(0,0,MGW,MGH);for(let y=0;y<MGH;y+=60){c.fillStyle='rgba(255,255,255,.05)';c.fillRect(0,y,MGW,30)}
  const G=this.goal();c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=1;for(let x=G.x;x<=G.x+G.w;x+=14){c.beginPath();c.moveTo(x,G.y);c.lineTo(x,G.y+G.h);c.stroke()}for(let y=G.y;y<=G.y+G.h;y+=14){c.beginPath();c.moveTo(G.x,y);c.lineTo(G.x+G.w,y);c.stroke()}
  c.strokeStyle='#fff';c.lineWidth=6;c.beginPath();c.moveTo(G.x,G.y+G.h);c.lineTo(G.x,G.y);c.lineTo(G.x+G.w,G.y);c.lineTo(G.x+G.w,G.y+G.h);c.stroke();c.lineWidth=3;c.strokeRect(G.x-40,G.y+G.h,G.w+80,90);
  c.fillStyle='#fff';c.beginPath();c.arc(MGW/2,MGH-150,4,0,7);c.fill();
  const k=m.kp;c.fillStyle='#f5a700';mgRR(c,k.x-16,G.y+G.h-62,32,44,8);c.fill();c.fillStyle='#e8b98a';c.beginPath();c.arc(k.x,G.y+G.h-70,11,0,7);c.fill();c.fillStyle='#f5a700';c.fillRect(k.x-34,G.y+G.h-56,68,9);mgEmo(c,'🧤',k.x-36,G.y+G.h-52,18);mgEmo(c,'🧤',k.x+36,G.y+G.h-52,18);
  const b=m.ball;let x=b.x,y=b.y,s=1;if(b.go){x=b.sx+(b.tx-b.sx)*b.t;y=b.sy+(b.ty-b.sy)*b.t;s=1-b.t*.4}mgEmo(c,'⚽',x,y,36*s);
  if(!b.go&&!m.res){c.fillStyle='#fff';c.font='800 14px system-ui';c.textAlign='center';c.fillText('⬆️ trascina verso la porta',MGW/2,MGH-90)}
  if(m.res){c.fillStyle='#fff';c.font='900 34px system-ui';c.textAlign='center';c.fillText(m.res,MGW/2,MGH/2+20)}
  for(let i=0;i<5;i++)mgEmo(c,i<m.shots?(i<m.goals?'✅':'❌'):'⚪',MGW/2+(i-2)*30,MGH-40,20)},
 hud(m){return `⚽ ${m.goals}/${m.shots}`}};

/* ---------- SALTI (skate, tappeto elastico, arrampicata) ---------- */
MG.salti={help:'🤸 <b>Salta gli ostacoli!</b><br>Tocca lo schermo (o premi spazio) per saltare.<br>Prendi le ⭐ e non sbattere contro gli ostacoli: hai 3 vite ❤️.<br>Dura 40 secondi!',
 init(m){m.y=0;m.vy=0;m.obs=[];m.stars=[];m.next=1.2;m.lives=3;m.st=0;m.dist=0;m.inv=0;m.ic=m.title.includes('Skate')?'🛹':m.title.includes('Arramp')?'🧗':m.title.includes('Cavallo')?'🏇':'🤸';m.obsE=m.ic==='🏇'?['🪵','🚧','🪨','🌵']:null},
 jump(m){if(m.y<=0.01){m.vy=m.title.includes('elastico')?720:620}else if(!m.dj){m.dj=true;m.vy=520}},
 down(m){this.jump(m)},key(m,k){if(k===' '||k==='ArrowUp')this.jump(m)},
 ground(){return MGH-160},
 tick(m,dt){const sp=260+m.t*5;m.dist+=sp*dt;m.vy-=1500*dt;m.y=Math.max(0,m.y+m.vy*dt);if(m.y<=0){m.vy=0;m.dj=false}
  m.next-=dt;if(m.next<=0){m.obs.push({x:MGW+30,e:(m.obsE||['🪨','📦','🚧','🌵'])[Math.floor(Math.random()*4)],h:40});if(Math.random()<.7)m.stars.push({x:MGW+30+Math.random()*120,y:90+Math.random()*120});m.next=.9+Math.random()*1.1}
  m.obs.forEach(o=>o.x-=sp*dt);m.stars.forEach(s=>s.x-=sp*dt);const px=90;if(m.inv)m.inv=Math.max(0,m.inv-dt);
  m.obs.forEach(o=>{if(!o.hit&&Math.abs(o.x-px)<28&&m.y<o.h){o.hit=true;if(!m.inv){m.lives--;m.inv=1}}});
  m.stars.forEach(s=>{if(!s.got&&Math.abs(s.x-px)<30&&Math.abs(s.y-(m.y+30))<34){s.got=true;m.st++}});
  m.obs=m.obs.filter(o=>o.x>-40);m.stars=m.stars.filter(s=>s.x>-40&&!s.got);
  if(m.lives<=0)return mgEnd(`Ops, hai finito le vite! Hai preso ${m.st} stelle ⭐.`,m.st>=8?2:1);if(m.t>=40){const st=m.st>=12?3:m.st>=6?2:1;mgEnd(`Ce l'hai fatta! ${m.st} stelle ⭐ e ${Math.round(m.dist/40)} metri!`,st)}},
 draw(m,c){const g=c.createLinearGradient(0,0,0,MGH);g.addColorStop(0,'#7cc4f5');g.addColorStop(1,'#d6efff');c.fillStyle=g;c.fillRect(0,0,MGW,MGH);
  for(let i=0;i<4;i++){const x=((i*300-m.dist*.2)%(MGW+300)+MGW+300)%(MGW+300)-150;mgEmo(c,'☁️',x,80+i*30,60)}
  const gy=this.ground();c.fillStyle=m.ic==='🧗'?'#8a7a6a':'#6fbf5a';c.fillRect(0,gy,MGW,MGH-gy);c.fillStyle='rgba(0,0,0,.08)';for(let x=-(m.dist%40);x<MGW;x+=40)c.fillRect(x,gy,20,8);
  m.obs.forEach(o=>mgEmo(c,o.e,o.x,gy-20,44));m.stars.forEach(s=>mgEmo(c,'⭐',s.x,gy-s.y,30));
  c.globalAlpha=m.inv&&Math.floor(m.t*12)%2?.4:1;c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(90,gy+4,20-m.y/30,5,0,0,7);c.fill();mgEmo(c,m.ic,90,gy-26-m.y,52);if(m.ic==='🛹')mgEmo(c,'🧒',90,gy-62-m.y,40);c.globalAlpha=1;
  c.fillStyle='#1f2540';c.font='800 15px system-ui';c.textAlign='center';c.fillText(m.ic==='🏇'?'Tocca per saltare le staccionate! 🐴':'Tocca per saltare! (2 volte = doppio salto)',MGW/2,MGH-60)},
 hud(m){return `${'❤️'.repeat(Math.max(0,m.lives))} ⭐${m.st} ⏱️${Math.max(0,Math.ceil(40-m.t))}`}};

/* ---------- NUOTO ---------- */
MG.nuoto={help:'🏊 <b>Gara di nuoto: 50 metri!</b><br>Tocca <b>a sinistra</b> e <b>a destra</b> dello schermo, una volta per parte, più veloce che puoi!<br>Sul computer: frecce ⬅️ ➡️ alternate.',
 init(m){m.me=0;m.v=0;m.last=null;m.ai=[.9,1,1.08].map(s=>({p:0,s:s*(3.6+Math.random()*.4)}))},
 stroke(m,side){if(m.last===side){m.v=Math.max(0,m.v-1);return}m.last=side;m.v=Math.min(9,m.v+1.6);m.splash=.25;m.side=side},
 down(m,P){this.stroke(m,P.x<MGW/2?'l':'r')},key(m,k){if(k==='ArrowLeft')this.stroke(m,'l');if(k==='ArrowRight')this.stroke(m,'r')},
 tick(m,dt){m.v=Math.max(0,m.v-2.4*dt);m.me+=m.v*dt;m.ai.forEach(a=>a.p+=a.s*dt*(.9+Math.random()*.2));if(m.splash)m.splash=Math.max(0,m.splash-dt);
  if(m.me>=50){const pl=1+m.ai.filter(a=>a.p>=50).length;mgEnd(pl===1?`🥇 Primo posto! 50 metri in ${m.t.toFixed(1)} secondi!`:`Sei arrivat${o()} ${pl}°! Bracciate più veloci!`,pl===1?3:pl===2?2:1)}
  else if(m.ai.every(a=>a.p>=50)&&m.t>4)mgEnd('Gli altri sono già arrivati… riprova! 🏊',1)},
 draw(m,c){c.fillStyle='#e8e2d4';c.fillRect(0,0,MGW,MGH);const top=100,bot=MGH-120,lw=(MGW-40)/4;
  const g=c.createLinearGradient(0,top,0,bot);g.addColorStop(0,'#3fb4e8');g.addColorStop(1,'#1f7fb8');c.fillStyle=g;c.fillRect(20,top,MGW-40,bot-top);
  for(let i=1;i<4;i++){for(let y=top;y<bot;y+=16){c.fillStyle=(y/16)%2?'#e5484d':'#fff';c.fillRect(20+i*lw-3,y,6,10)}}
  c.fillStyle='#fff';c.fillRect(20,top+12,MGW-40,3);c.fillRect(20,bot-14,MGW-40,3);
  const Y=p=>bot-30-(bot-top-60)*Math.min(1,p/50);
  m.ai.forEach((a,i)=>{const x=20+lw*(i+.5)+(i>=1?lw:0);mgEmo(c,'🏊',x,Y(a.p),36)});
  const mx=20+lw*1.5;mgEmo(c,'🏊‍♂️',mx,Y(m.me),44);if(m.splash){c.fillStyle='rgba(255,255,255,.8)';c.beginPath();c.arc(mx+(m.side==='l'?-20:20),Y(m.me)+10,8,0,7);c.fill()}
  c.fillStyle='#1f2540';c.font='900 16px system-ui';c.textAlign='center';c.fillText('TU',mx,Y(m.me)+34);
  c.fillStyle='rgba(31,37,64,.12)';c.fillRect(0,bot,MGW/2-4,MGH-bot);c.fillRect(MGW/2+4,bot,MGW/2,MGH-bot);c.fillStyle='#1f2540';c.font='900 20px system-ui';c.fillText('⬅️ TOCCA',MGW/4,bot+60);c.fillText('TOCCA ➡️',MGW*3/4,bot+60)},
 hud(m){return `${Math.min(50,Math.floor(m.me))} / 50 m`}};

/* ===== v9b: tutte le altre cose del giardino diventano giochi ===== */
Object.assign(MGACT,{cinema9:['prendi','🍿 Cinema'],orto9:['prendi','🥕 Orto'],uova9:['prendi','🥚 Pollaio'],chef9:['prendi','🍕 Pizzaiolo'],bbq9:['prendi','🌭 Grigliata'],barca9:['prendi','🛶 Barca'],cuccia9:['prendi','🐶 Animali'],
  fuochi9:['tocca','🎆 Fuochi'],acquario9:['tocca','🐠 Acquario'],stelle9:['tocca','🔭 Stelle'],serra9:['tocca','🌺 Serra'],relax9:['tocca','😎 Relax'],idro9:['tocca','🛁 Bollicine'],sauna9:['tocca','🧖 Sauna'],panorama9:['tocca','📸 Panorama'],ruota9:['tocca','🎡 Ruota'],albero9:['tocca','🌳 Albero'],
  segreto9:['memory','🗝️ Segreto'],bunker9:['memory','🛡️ Rifugio'],biliardo9:['biliardo','🎱 Biliardo'],palestra9:['forza','💪 Palestra'],libro9:['quiz','📚 Quiz'],cavallo9:['salti','🏇 Cavallo'],fontana9:['basket','⛲ Fontana']});
{const h=MG.basket.help;MG.basket.help=m=>m.fo?'⛲ <b>Fontana dei desideri!</b><br>Trascina il dito <b>in su verso la fontana</b> e lascia: lanci la monetina 🪙.<br>Ogni centro è un desiderio! Hai 40 secondi.':h}
{const h=MG.salti.help;MG.salti.help=m=>m.ic==='🏇'?'🏇 <b>Galoppa nel prato!</b><br>Tocca lo schermo (o premi spazio) per saltare staccionate e tronchi.<br>Prendi le ⭐: hai 3 vite ❤️ e 40 secondi!':h}
MG.basket.drawFo=function(m,c){c.fillStyle='#cfc6b4';c.fillRect(0,0,MGW,MGH);c.strokeStyle='rgba(0,0,0,.08)';c.lineWidth=2;for(let y=0;y<MGH;y+=36)for(let x=(y/36%2)*30;x<MGW;x+=60)c.strokeRect(x,y,60,36);
  const h=m.hoop;c.fillStyle='#9a9286';c.beginPath();c.ellipse(h.x,h.y+6,86,32,0,0,7);c.fill();c.fillStyle='#4fb3e8';c.beginPath();c.ellipse(h.x,h.y,74,24,0,0,7);c.fill();
  c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=2;for(let i=0;i<3;i++){const r=((m.t*30+i*25)%75);c.beginPath();c.ellipse(h.x,h.y,r,r/3,0,0,7);c.stroke()}
  for(let i=0;i<Math.min(m.made,14);i++)mgEmo(c,'🪙',h.x-50+(i*37)%100,h.y-6+(i*13)%14,14);mgEmo(c,'⛲',h.x,h.y-46,84);
  const b=m.ball;let x=b.x,y=b.y,s=1;if(b.go){const t=b.t;x=b.sx+(b.tx-b.sx)*t;y=b.sy+(b.ty-b.sy)*t-Math.sin(t*Math.PI)*140;s=1-t*.45}mgEmo(c,'🪙',x,y,40*s);
  if(!b.go){c.fillStyle='#1f2540';c.font='800 14px system-ui';c.textAlign='center';c.fillText('⬆️ lancia la monetina nella fontana',MGW/2,MGH-40)}
  if(m.ft){c.fillStyle='#1f2540';c.font='900 30px system-ui';c.textAlign='center';c.fillText(m.flash,MGW/2,MGH/2)}};
const mgPop=(c,f)=>{c.font='900 22px system-ui';c.textAlign='center';c.textBaseline='middle';c.lineWidth=4;c.strokeStyle='#1f2540';c.fillStyle=f.bad?'#ff6b6b':'#ffe066';c.strokeText(f.s,f.x,f.y);c.fillText(f.s,f.x,f.y)};
const mgSky=(c,a,b)=>{const g=c.createLinearGradient(0,0,0,MGH);g.addColorStop(0,a);g.addColorStop(1,b);c.fillStyle=g;c.fillRect(0,0,MGW,MGH)};
const mgWrap=(c,t,x,y,w,lh)=>{const W=t.split(' ');let l='',n=0;W.forEach(p=>{const tt=l?l+' '+p:p;if(c.measureText(tt).width>w&&l){c.fillText(l,x,y+n*lh);n++;l=p}else l=tt});c.fillText(l,x,y+n*lh);return n+1};

/* ---------- PRENDI AL VOLO (cinema, orto, uova, pizza, grigliata, barca, cane) ---------- */
const PRTH={cinema9:{bg:'cinema',c:'🪣',g:['🍿','🍿','🥤','🍫'],b:['🧅'],v:'popcorn',h:'Prendi i <b>popcorn</b> 🍿 col secchiello mentre guardi il film!<br>Attento alle cipolle 🧅!'},
  orto9:{bg:'prato',c:'🧺',g:['🍅','🥕','🍓','🥬','🌽'],b:['🐛'],v:'verdure e frutti',h:'Raccogli <b>pomodori, carote e fragole</b> nel cestino!<br>Non prendere i bruchi 🐛!'},
  uova9:{bg:'pollaio',c:'🧺',g:['🥚'],b:['🪨'],v:'uova',h:'Le galline fanno le uova: prendile tutte nel cestino 🧺!<br>Niente sassi 🪨!'},
  chef9:{bg:'cucina',c:'🍕',g:['🍅','🧀','🍄','🌿'],b:['🧦','🥾'],v:'ingredienti',h:'Fai la pizza più buona: prendi <b>pomodoro, mozzarella e funghi</b>!<br>Niente calzini 🧦 o scarpe 🥾!'},
  bbq9:{bg:'prato',c:'🍽️',g:['🌭','🌽','🍖','🍔'],b:['🔥'],v:'cose buone',h:'Prendi salsicce e pannocchie col piatto!<br>Non toccare il fuoco 🔥!'},
  barca9:{bg:'lago',c:'🛶',g:['🦆','🐟','🐸'],b:['🪨','🪵'],v:'amici del lago',h:'Guida la barca: prendi le paperelle 🦆 e i pesci 🐟!<br>Evita sassi 🪨 e tronchi 🪵!'},
  cuccia9:{bg:'prato',c:'🐶',g:['🦴','🍖','🎾'],b:['🛁'],v:'premietti',h:'Il tuo cane ha fame: prendi ossi 🦴 e palline 🎾!<br>Ma scappa dal bagnetto 🛁!'}};
MG.prendi={help:m=>`${m.title.split(' ')[0]} <b>Prendi al volo!</b><br>${m.T.h}<br>Muovi il dito, il mouse o le frecce ⬅️ ➡️.<br>Hai 3 vite ❤️ e 40 secondi!`,
 init(m){m.T=PRTH[m.act]||PRTH.orto9;m.ptr.x=MGW/2;m.cx=MGW/2;m.it=[];m.next=.6;m.got=0;m.lives=3;m.fx=[];if(m.T.bg==='pollaio')m.hens=[0,1,2].map(i=>({x:MGW*(i+1)/4,d:i%2?1:-1}))},
 cy(){return MGH-95},
 tick(m,dt){const K=m.keys,P=m.ptr;if(K.ArrowLeft)P.x-=480*dt;if(K.ArrowRight)P.x+=480*dt;P.x=Math.max(30,Math.min(MGW-30,P.x));m.cx+=(P.x-m.cx)*Math.min(1,dt*14);
  if(m.hens)m.hens.forEach(h=>{h.x+=h.d*70*dt;if(h.x<40||h.x>MGW-40)h.d*=-1});
  m.next-=dt;if(m.next<=0){const bad=Math.random()<.2+Math.min(.12,m.t*.004),L=bad?m.T.b:m.T.g,x=m.hens?m.hens[Math.floor(Math.random()*3)].x:30+Math.random()*(MGW-60);
   m.it.push({x,y:m.hens?135:70,vy:150+m.t*5+Math.random()*70,e:L[Math.floor(Math.random()*L.length)],bad,r:Math.random()*6});m.next=Math.max(.32,.75-m.t*.01)}
  const cy=this.cy();m.it.forEach(i=>{i.y+=i.vy*dt;if(!i.done&&i.y>cy-36&&i.y<cy+22&&Math.abs(i.x-m.cx)<48){i.done=true;if(i.bad){m.lives--;m.hurt=.6;m.fx.push({x:i.x,y:cy-44,t:.8,s:'Ahi! 😖',bad:1})}else{m.got++;m.fx.push({x:i.x,y:cy-44,t:.6,s:'+1'})}}});
  m.it=m.it.filter(i=>!i.done&&i.y<MGH+30);m.fx.forEach(f=>{f.t-=dt;f.y-=40*dt});m.fx=m.fx.filter(f=>f.t>0);if(m.hurt)m.hurt=Math.max(0,m.hurt-dt);
  if(m.lives<=0)return mgEnd(`Hai finito le vite… ma hai preso ${m.got} ${m.T.v}!`,m.got>=15?2:1);
  if(m.t>=40){const st=m.got>=28?3:m.got>=14?2:1;mgEnd(st>1?`Bravissim${o()}! Hai preso ${m.got} ${m.T.v}! ${st===3?'🏆':''}`:`Hai preso ${m.got} ${m.T.v}. Riprova per prenderne di più!`,st)}},
 draw(m,c){this.bg(m,c);m.it.forEach(i=>mgEmo(c,i.e,i.x,i.y,40,Math.sin(m.t*3+i.r)*.3));
  const cy=this.cy();c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(m.cx,cy+28,36,8,0,0,7);c.fill();c.globalAlpha=m.hurt&&Math.floor(m.t*14)%2?.4:1;mgEmo(c,m.T.c,m.cx,cy,64);c.globalAlpha=1;m.fx.forEach(f=>mgPop(c,f))},
 bg(m,c){const k=m.T.bg;
  if(k==='cinema'){c.fillStyle='#1a1020';c.fillRect(0,0,MGW,MGH);const sw=Math.min(MGW-40,520),sx=MGW/2-sw/2,sy=70,sh=sw*.42,hu=m.t*30%360;
   const g=c.createLinearGradient(sx,0,sx+sw,0);g.addColorStop(0,`hsl(${hu},60%,60%)`);g.addColorStop(1,`hsl(${(hu+80)%360},60%,45%)`);c.fillStyle='#000';c.fillRect(sx-6,sy-6,sw+12,sh+12);c.fillStyle=g;c.fillRect(sx,sy,sw,sh);
   c.save();c.beginPath();c.rect(sx,sy,sw,sh);c.clip();mgEmo(c,'🌴',sx+sw*.15,sy+sh*.6,sh*.45);mgEmo(c,'☀️',sx+sw*.85,sy+sh*.25,sh*.25);mgEmo(c,'🦖',sx+sw*(.5+.36*Math.sin(m.t*.8)),sy+sh*.65,sh*.5);c.restore();
   c.fillStyle='rgba(255,255,230,.05)';c.beginPath();c.moveTo(MGW/2-20,MGH);c.lineTo(sx,sy+sh);c.lineTo(sx+sw,sy+sh);c.lineTo(MGW/2+20,MGH);c.fill();
   c.fillStyle='#5a1a2a';for(let r=0;r<2;r++)for(let x=r*30-30;x<MGW+60;x+=60){mgRR(c,x+4,MGH-64+r*36,52,44,10);c.fill()}return}
  if(k==='lago'){mgSky(c,'#5cc0e8','#1f78b4');c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=3;for(let y=((m.t*80)%50)-50;y<MGH;y+=50)for(let x=0;x<MGW;x+=70){c.beginPath();c.arc(x+(y/50%2)*35,y,14,Math.PI*1.1,Math.PI*1.9);c.stroke()}
   c.fillStyle='#4f8a3c';c.fillRect(0,0,22,MGH);c.fillRect(MGW-22,0,22,MGH);for(let y=((m.t*80)%120)-120;y<MGH;y+=120){mgEmo(c,'🌾',12,y,26);mgEmo(c,'🌳',MGW-12,y+60,30)}return}
  if(k==='cucina'){c.fillStyle='#e9f4f7';c.fillRect(0,0,MGW,MGH);c.strokeStyle='#bcd7de';c.lineWidth=2;for(let y=0;y<MGH;y+=34)for(let x=0;x<MGW;x+=34)c.strokeRect(x,y,34,34);
   c.fillStyle='#8a5a3b';c.fillRect(0,MGH-60,MGW,60);c.fillStyle='#b5523b';mgRR(c,MGW-110,70,90,80,14);c.fill();c.fillStyle='#ffb347';c.beginPath();c.arc(MGW-65,120,18+Math.sin(m.t*8)*3,Math.PI,0);c.fill();mgEmo(c,'👨‍🍳',50,110,46);return}
  mgSky(c,'#8fd3ff','#e6f6ff');mgEmo(c,'☀️',MGW-50,90,46);c.fillStyle='#6fbf5a';c.fillRect(0,MGH-130,MGW,130);c.fillStyle='rgba(0,0,0,.06)';for(let x=0;x<MGW;x+=26)c.fillRect(x,MGH-130,12,130);
  if(k==='pollaio'){c.fillStyle='#8a5a3b';c.fillRect(0,150,MGW,10);m.hens.forEach(h=>mgEmo(c,'🐔',h.x,124,52));mgEmo(c,'🏚️',40,MGH-160,50)}
  else if(m.act==='bbq9'){c.fillStyle='#333';mgRR(c,20,MGH-210,110,16,6);c.fill();mgEmo(c,'🔥',75,MGH-222,30)}else mgEmo(c,'🌳',40,MGH-165,60)},
 hud(m){return `${'❤️'.repeat(Math.max(0,m.lives))} ${m.T.g[0]}${m.got} ⏱️${Math.max(0,Math.ceil(40-m.t))}`}};

/* ---------- TOCCA VELOCE (fuochi, acquario, stelle, serra, bolle, foto, ruota, albero) ---------- */
const TOTH={fuochi9:{bg:'notte',e:['🎇'],mv:'pop',fx:'boom',v:'fuochi',h:'Tocca le scintille 🎇 per far esplodere i <b>fuochi d\'artificio</b>!'},
  acquario9:{bg:'acqua',e:['🐟','🐠','🐡'],b:['🦈'],mv:'side',v:'pesciolini',h:'Tocca i pesciolini 🐠 per dargli da mangiare!<br>Non disturbare lo squalo 🦈!'},
  stelle9:{bg:'notte',e:['⭐','🌠','🪐'],mv:'pop',v:'stelle',h:'Guarda nel telescopio e tocca le <b>stelle</b> ⭐ prima che spariscano!'},
  serra9:{bg:'serra',e:['🥀'],to:'🌺',mv:'pop',v:'fiori annaffiati',h:'Tocca i fiori appassiti 🥀 per annaffiarli: diventano bellissimi 🌺!'},
  relax9:{bg:'sole',e:['bolla'],mv:'up',v:'bolle',h:'Relax sul lettino… e intanto scoppia le <b>bolle di sapone</b>!'},
  idro9:{bg:'acqua',e:['bolla'],mv:'up',v:'bollicine',h:'Scoppia tutte le <b>bollicine</b> dell\'idromassaggio!'},
  sauna9:{bg:'sauna',e:['bolla'],mv:'up',v:'nuvolette',h:'Scoppia le <b>nuvolette di vapore</b> della sauna!'},
  panorama9:{bg:'citta',e:['🐦','🦋','🎈'],mv:'side',fx:'foto',v:'foto',h:'Fai le foto 📸 a uccellini, farfalle e palloncini: toccali!'},
  ruota9:{bg:'ruota',e:['🎈'],mv:'up',v:'palloncini',h:'Dalla ruota panoramica scoppia i <b>palloncini</b> 🎈!'},
  albero9:{bg:'albero',e:['🍎','🍐','🍊'],b:['🐝'],mv:'pop',v:'frutti',h:'Raccogli la frutta dall\'albero: tocca 🍎 🍐 🍊!<br>Non toccare le api 🐝!'}};
MG.tocca={help:m=>`${m.title.split(' ')[0]} <b>Tocca veloce!</b><br>${m.T.h}<br>Hai 35 secondi!`,
 init(m){m.T=TOTH[m.act]||TOTH.stelle9;m.tg=[];m.next=.3;m.got=0;m.fx=[];m.parts=[];m.sky=[...Array(40)].map((_,i)=>[(i*97)%101/101,(i*53)%89/89])},
 can(){return {x:MGW/2,y:MGH*.4,r:Math.min(MGW*.44,MGH*.28)}},
 spawn(m){const T=m.T,bad=T.b&&Math.random()<.2,L=bad?T.b:T.e,t={e:L[Math.floor(Math.random()*L.length)],bad,s:48+Math.random()*16,life:0,max:1.7-Math.min(.6,m.t*.016),vx:0,vy:0};
  if(T.mv==='up'){t.x=40+Math.random()*(MGW-80);t.y=MGH+30;t.vx=(Math.random()-.5)*30;t.vy=-(70+Math.random()*60+m.t*2);t.max=99}
  else if(T.mv==='side'){const l=Math.random()<.5;t.x=l?-30:MGW+30;t.y=110+Math.random()*(MGH-240);t.vx=(l?1:-1)*(90+Math.random()*80+m.t*2);t.max=99}
  else if(T.bg==='albero'){const C=this.can(),a=Math.random()*7,r=Math.sqrt(Math.random())*C.r*.8;t.x=C.x+Math.cos(a)*r;t.y=C.y+Math.sin(a)*r*.8;t.s=44}
  else if(m.act==='stelle9'){const a=Math.random()*7,r=Math.sqrt(Math.random())*Math.min(MGW,MGH)*.5;t.x=MGW/2+Math.cos(a)*r;t.y=MGH/2+Math.sin(a)*r}
  else{t.x=40+Math.random()*(MGW-80);t.y=110+Math.random()*(MGH-260)}
  m.tg.push(t)},
 down(m,P){let hit=null,bd=1e9;m.tg.forEach(t=>{const d=Math.hypot(t.x-P.x,t.y-P.y);if(!t.done&&d<t.s*.8&&d<bd){bd=d;hit=t}});if(!hit)return;hit.done=true;
  if(hit.bad){m.got=Math.max(0,m.got-2);m.fx.push({x:hit.x,y:hit.y,t:.8,s:'-2 😬',bad:1});return}
  m.got++;m.fx.push({x:hit.x,y:hit.y-20,t:.6,s:'+1'});if(m.T.to)m.parts.push({x:hit.x,y:hit.y,e:m.T.to,t:1.2});if(m.T.bg==='albero')m.parts.push({x:hit.x,y:hit.y,e:hit.e,t:1,vx:0,vy:-60});
  if(m.T.fx==='boom'||hit.e==='bolla'){const n=m.T.fx==='boom'?20:8,hu=Math.random()*360;for(let i=0;i<n;i++){const a=i/n*Math.PI*2,v=(m.T.fx==='boom'?170:70)*(.6+Math.random()*.6);m.parts.push({x:hit.x,y:hit.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:.9,col:`hsl(${hu+i*9},95%,65%)`})}}
  if(m.T.fx==='foto')m.snap=.18},
 key(m,k){if(k===' '){const t=m.tg.find(t=>!t.done&&!t.bad&&t.x>0&&t.x<MGW&&t.y>0&&t.y<MGH);if(t)this.down(m,{x:t.x,y:t.y})}},
 tick(m,dt){m.next-=dt;if(m.next<=0&&m.t<34){this.spawn(m);m.next=Math.max(.35,.8-m.t*.012)}
  m.tg.forEach(t=>{t.life+=dt;t.x+=t.vx*dt;t.y+=t.vy*dt;if(m.T.mv==='up')t.x+=Math.sin(t.life*3)*20*dt});
  m.tg=m.tg.filter(t=>!t.done&&t.life<t.max&&t.y>-60&&t.x>-60&&t.x<MGW+60);
  m.parts.forEach(p=>{p.t-=dt;if(p.vx!==undefined){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=(p.e?400:60)*dt}else p.y-=20*dt});m.parts=m.parts.filter(p=>p.t>0);
  m.fx.forEach(f=>{f.t-=dt;f.y-=40*dt});m.fx=m.fx.filter(f=>f.t>0);if(m.snap)m.snap=Math.max(0,m.snap-dt);
  if(m.t>=35){const st=m.got>=30?3:m.got>=15?2:1;mgEnd(`Hai preso ${m.got} ${m.T.v}! ${st===3?'Fantastico! 🏆':'Bravissim'+o()+'!'}`,st)}},
 bubble(c,x,y,r,sauna){c.save();if(sauna){c.fillStyle='rgba(255,255,255,.75)';[[0,0,1],[-.6,.2,.7],[.6,.2,.7],[0,.4,.7]].forEach(([a,b,k])=>{c.beginPath();c.arc(x+a*r,y+b*r,r*k*.7,0,7);c.fill()})}
  else{const g=c.createRadialGradient(x-r*.35,y-r*.35,r*.1,x,y,r);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(.5,'rgba(190,230,255,.25)');g.addColorStop(1,'rgba(160,120,255,.55)');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,7);c.fill();c.strokeStyle='rgba(255,255,255,.8)';c.lineWidth=2;c.stroke()}c.restore()},
 draw(m,c){this.bg(m,c);const T=m.T;
  m.tg.forEach(t=>{const k=T.mv==='pop'?Math.min(1,t.life*6)*(t.life>t.max-.3?Math.max(0,(t.max-t.life)/.3):1):1;if(k<=0)return;
   if(t.e==='bolla')return this.bubble(c,t.x,t.y,t.s*.45,T.bg==='sauna');
   c.save();c.translate(t.x,t.y);if(t.vx>0)c.scale(-1,1);c.globalAlpha=Math.max(.2,k);mgEmo(c,t.e,0,Math.sin(t.life*4)*4,t.s*(.6+.4*k));c.restore()});
  m.parts.forEach(p=>{if(p.e){c.globalAlpha=Math.min(1,p.t);mgEmo(c,p.e,p.x,p.y,40);c.globalAlpha=1}else{c.fillStyle=p.col||'rgba(255,255,255,.8)';c.globalAlpha=Math.min(1,p.t*1.5);c.beginPath();c.arc(p.x,p.y,4,0,7);c.fill();c.globalAlpha=1}});
  m.fx.forEach(f=>mgPop(c,f));if(m.snap){c.fillStyle=`rgba(255,255,255,${m.snap*4})`;c.fillRect(0,0,MGW,MGH)}
  if(T.bg==='notte'&&m.act==='stelle9'){c.fillStyle='rgba(0,0,0,.55)';const R=Math.min(MGW,MGH)*.62;c.beginPath();c.rect(0,0,MGW,MGH);c.moveTo(MGW/2+R,MGH/2);c.arc(MGW/2,MGH/2,R,0,Math.PI*2,true);c.fill('evenodd');c.strokeStyle='#1f2540';c.lineWidth=10;c.beginPath();c.arc(MGW/2,MGH/2,R,0,Math.PI*2);c.stroke()}},
 bg(m,c){const k=m.T.bg,W=MGW,H=MGH;
  if(k==='notte'){mgSky(c,'#0b1030','#26215a');c.fillStyle='#fff';m.sky.forEach(([a,b],i)=>{c.globalAlpha=.4+.4*Math.sin(m.t*2+i);c.fillRect(a*W,b*H*.8,2,2)});c.globalAlpha=1;mgEmo(c,'🌙',W-60,100,44);
   c.fillStyle='#141a33';c.beginPath();c.moveTo(0,H);for(let x=0;x<=W;x+=40)c.lineTo(x,H-70-((x*7)%50));c.lineTo(W,H);c.fill();return}
  if(k==='acqua'){mgSky(c,m.act==='idro9'?'#7fe0f0':'#3fa9df',m.act==='idro9'?'#38a8c8':'#11507f');if(m.act==='idro9'){c.fillStyle='#fff';c.fillRect(0,H-40,W,40);return}
   c.fillStyle='#e8d29a';c.fillRect(0,H-70,W,70);for(let i=0;i<6;i++)mgEmo(c,i%2?'🌿':'🪨',30+i*(W-60)/5,H-90,50);mgEmo(c,'🐚',W*.35,H-40,26);return}
  if(k==='serra'){mgSky(c,'#dff5e3','#b8e6c1');c.strokeStyle='rgba(255,255,255,.9)';c.lineWidth=4;for(let x=0;x<W;x+=80){c.beginPath();c.moveTo(x,0);c.lineTo(x,H);c.stroke()}for(let y=60;y<H;y+=110){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke()}
   c.fillStyle='#7a5236';c.fillRect(0,H-60,W,60);for(let x=30;x<W;x+=70)mgEmo(c,'🪴',x,H-80,40);mgEmo(c,'🚿',W-50,90,40);return}
  if(k==='sauna'){c.fillStyle='#b77b4a';c.fillRect(0,0,W,H);c.strokeStyle='rgba(0,0,0,.15)';c.lineWidth=3;for(let y=0;y<H;y+=28){c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke()}c.fillStyle='#8a5a33';c.fillRect(0,H-130,W,26);c.fillRect(0,H-60,W,26);mgEmo(c,'🪣',50,H-150,34);return}
  if(k==='citta'){mgSky(c,'#ffc988','#9ad3ff');c.fillStyle='#5a6b8a';for(let x=0,i=0;x<W;x+=46,i++){const h=80+((i*37)%120);c.fillRect(x,H-h-40,40,h+40);c.fillStyle='#ffe59a';for(let y=H-h-30;y<H-50;y+=22)c.fillRect(x+8,y,8,10),c.fillRect(x+24,y,8,10);c.fillStyle='#5a6b8a'}c.fillStyle='#3d4a63';c.fillRect(0,H-40,W,40);return}
  if(k==='ruota'){mgSky(c,'#7cc4f5','#dff1ff');const cx=W/2,cy=H*.45,R=Math.min(W*.4,H*.3),a0=m.t*.3;c.strokeStyle='#c0c8d6';c.lineWidth=5;c.beginPath();c.arc(cx,cy,R,0,7);c.stroke();
   for(let i=0;i<8;i++){const a=a0+i*Math.PI/4;c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);c.stroke();c.fillStyle=`hsl(${i*45},70%,60%)`;mgRR(c,cx+Math.cos(a)*R-14,cy+Math.sin(a)*R,28,22,6);c.fill()}
   c.strokeStyle='#8a94a6';c.lineWidth=8;c.beginPath();c.moveTo(cx-R*.5,H-40);c.lineTo(cx,cy);c.lineTo(cx+R*.5,H-40);c.stroke();c.fillStyle='#6fbf5a';c.fillRect(0,H-40,W,40);return}
  mgSky(c,'#8fd3ff','#e6f6ff');mgEmo(c,'☀️',W-50,80,46);c.fillStyle='#6fbf5a';c.fillRect(0,H-110,W,110);
  if(k==='albero'){const C=this.can();c.fillStyle='#7a5236';c.fillRect(C.x-22,C.y,44,H-110-C.y+10);c.fillStyle='#3f9a46';[[0,0,1],[-.55,.15,.7],[.55,.15,.7],[0,-.45,.7]].forEach(([a,b,s])=>{c.beginPath();c.arc(C.x+a*C.r,C.y+b*C.r,C.r*s,0,7);c.fill()});
   c.fillStyle='#8a5a3b';c.fillRect(C.x+C.r*.35,C.y+C.r*.2,C.r*.5,C.r*.35);c.fillStyle='#c0392b';c.beginPath();c.moveTo(C.x+C.r*.3,C.y+C.r*.22);c.lineTo(C.x+C.r*.6,C.y);c.lineTo(C.x+C.r*.9,C.y+C.r*.22);c.fill();mgEmo(c,'🧺',W*.2,H-80,44)}
  else{c.fillStyle='#4fb3e8';mgRR(c,20,H-100,W*.45,50,20);c.fill();mgEmo(c,'⛱️',W*.72,H-150,70);mgEmo(c,'😎',W*.72,H-80,40)}},
 hud(m){return `${m.T.e[0]==='bolla'?'💦':m.T.e[0]} ${m.got} · ⏱️ ${Math.max(0,Math.ceil(35-m.t))}`}};

/* ---------- MEMORY (stanza segreta, rifugio) ---------- */
const MEMTH={segreto9:['🗝️','💎','👑','🪙','📜','🔮','🧸','🎁'],bunker9:['🔦','🥫','🧭','🎲','🧃','🔋','📻','🗺️']};
MG.memory={help:m=>`${m.title.split(' ')[0]} <b>Memory!</b><br>${m.act==='bunker9'?'Nel rifugio ci sono tante scorte nascoste.':'Hai trovato la stanza segreta piena di tesori!'}<br>Tocca due carte: se sono uguali restano girate.<br>Trova tutte le 8 coppie con meno mosse possibili!`,
 init(m){const E=MEMTH[m.act]||MEMTH.segreto9,a=[...E,...E];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}m.cards=a.map(e=>({e,up:false,ok:false,f:0}));m.sel=[];m.moves=0;m.pairs=0;m.hold=0},
 grid(){const s=Math.min((MGW-30)/4,(MGH-190)/4,120);return {s,x:MGW/2-s*2,y:Math.max(80,(MGH-s*4)/2+30)}},
 down(m,P){if(m.hold>0)return;const G=this.grid(),cx=Math.floor((P.x-G.x)/G.s),cy=Math.floor((P.y-G.y)/G.s);if(cx<0||cx>3||cy<0||cy>3)return;this.flip(m,cy*4+cx)},
 flip(m,i){const k=m.cards[i];if(!k||k.up||k.ok||m.hold>0)return;k.up=true;m.sel.push(i);if(m.sel.length===2){m.moves++;const [a,b]=m.sel.map(j=>m.cards[j]);if(a.e===b.e){a.ok=b.ok=true;m.pairs++;m.sel=[];m.flash=.7}else m.hold=.8}},
 tick(m,dt){m.cards.forEach(k=>{k.f+=((k.up||k.ok?1:0)-k.f)*Math.min(1,dt*12)});if(m.hold>0){m.hold-=dt;if(m.hold<=0){m.sel.forEach(j=>m.cards[j].up=false);m.sel=[]}}if(m.flash)m.flash=Math.max(0,m.flash-dt);
  if(m.pairs>=8){m.endT=(m.endT||0)+dt;if(m.endT>.6){const st=m.moves<=14?3:m.moves<=22?2:1;mgEnd(`Hai trovato tutte le coppie in ${m.moves} mosse e ${Math.round(m.t)} secondi! ${st===3?'Che memoria! 🧠':''}`,st)}}},
 draw(m,c){const bk=m.act==='bunker9';if(bk){mgSky(c,'#4a5160','#2b2f38');c.strokeStyle='rgba(255,255,255,.06)';c.lineWidth=2;for(let y=0;y<MGH;y+=50)for(let x=(y/50%2)*40;x<MGW;x+=80)c.strokeRect(x,y,80,50)}
  else{mgSky(c,'#3a2416','#1c120b');c.fillStyle='#5b3a22';for(let x=0;x<MGW;x+=70){c.fillRect(x+4,0,62,MGH)}c.fillStyle='rgba(0,0,0,.25)';for(let y=60;y<MGH;y+=90)c.fillRect(0,y,MGW,8);mgEmo(c,'🕯️',30,90,30);mgEmo(c,'🕯️',MGW-30,90,30)}
  const G=this.grid();m.cards.forEach((k,i)=>{const x=G.x+(i%4)*G.s+G.s/2,y=G.y+Math.floor(i/4)*G.s+G.s/2,w=(G.s-10)*Math.abs(Math.cos(k.f*Math.PI)),h=G.s-10,front=k.f>.5;
   c.fillStyle='rgba(0,0,0,.3)';mgRR(c,x-w/2+3,y-h/2+4,w,h,12);c.fill();c.fillStyle=front?(k.ok?'#d9ffe6':'#fffdf7'):(bk?'#5e8a5a':'#b5523b');mgRR(c,x-w/2,y-h/2,w,h,12);c.fill();
   c.strokeStyle=k.ok?'#2bb673':'#1f2540';c.lineWidth=3;c.stroke();if(w>10){c.save();c.translate(x,y);c.scale(Math.max(.05,w/(G.s-10)),1);mgEmo(c,front?k.e:'❓',0,2,G.s*.48);c.restore()}});
  if(m.flash){c.fillStyle='#ffe066';c.strokeStyle='#1f2540';c.lineWidth=5;c.font='900 30px system-ui';c.textAlign='center';c.strokeText('Coppia! ✨',MGW/2,G.y-22);c.fillText('Coppia! ✨',MGW/2,G.y-22)}},
 hud(m){return `🃏 ${m.pairs}/8 · mosse ${m.moves}`}};

/* ---------- BILIARDO ---------- */
MG.biliardo={help:'🎱 <b>Biliardo!</b><br>Trascina il dito <b>all\'indietro</b>, come una fionda, e lascia: la palla bianca parte dall\'altra parte.<br>Più tiri lungo, più forte va.<br>Manda le 6 palle colorate in buca con 10 tiri!',
 tab(){const w=Math.min(MGW-36,400),h=Math.min(MGH-170,w*1.8);return {x:MGW/2-w/2,y:(MGH-h)/2+36,w,h,r:Math.max(10,Math.min(14,w/26))}},
 init(m){const T=this.tab(),r=T.r;m.T=T;m.cue={x:T.x+T.w/2,y:T.y+T.h*.78,vx:0,vy:0,c:'#ffffff'};const cols=['#f5c518','#2f6fe0','#e5484d','#7a3fb0','#f08a24','#2bb673'];m.balls=[m.cue];let k=0;
  for(let row=0;row<3;row++)for(let i=0;i<=row;i++)m.balls.push({x:T.x+T.w/2+(i-row/2)*r*2.1,y:T.y+T.h*.3-row*r*1.85,vx:0,vy:0,c:cols[k++],n:k});
  m.shots=10;m.inb=0;m.pk=[[0,0],[1,0],[0,.5],[1,.5],[0,1],[1,1]].map(([a,b])=>({x:T.x+a*T.w,y:T.y+b*T.h}))},
 moving(m){return m.balls.some(b=>!b.in&&Math.hypot(b.vx,b.vy)>4)},
 shoot(m,dx,dy,pw){if(this.moving(m)||m.shots<=0||m.cue.in)return;const l=Math.hypot(dx,dy)||1,v=180+pw*1100;m.cue.vx=dx/l*v;m.cue.vy=dy/l*v;m.shots--;m.shot=true;m.potNow=0},
 up(m,P){const dx=P.sx-P.x,dy=P.sy-P.y,l=Math.hypot(dx,dy);if(l<15)return;this.shoot(m,dx,dy,Math.min(1,l/(MGH*.35)))},
 key(m,k){if(k!==' ')return;const t=m.balls.filter(b=>b!==m.cue&&!b.in).sort((a,b)=>Math.hypot(a.x-m.cue.x,a.y-m.cue.y)-Math.hypot(b.x-m.cue.x,b.y-m.cue.y))[0];if(t)this.shoot(m,t.x-m.cue.x,t.y-m.cue.y,.6)},
 tick(m,dt){const T=m.T,r=T.r,B=m.balls.filter(b=>!b.in);const n=4,h=dt/n;
  for(let s=0;s<n;s++){B.forEach(b=>{b.x+=b.vx*h;b.y+=b.vy*h;const sp=Math.hypot(b.vx,b.vy),ns=Math.max(0,sp*Math.pow(.5,h)-160*h);if(ns<8){b.vx=b.vy=0}else{b.vx*=ns/sp;b.vy*=ns/sp}});
   for(let i=0;i<B.length;i++)for(let j=i+1;j<B.length;j++){const a=B[i],b=B[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d>0&&d<2*r){const nx=dx/d,ny=dy/d,o2=(2*r-d)/2;a.x-=nx*o2;a.y-=ny*o2;b.x+=nx*o2;b.y+=ny*o2;
     const p=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny;if(p>0){a.vx-=p*nx;a.vy-=p*ny;b.vx+=p*nx;b.vy+=p*ny}}}
   B.forEach(b=>{if(b.in)return;if(m.pk.some(p=>Math.hypot(p.x-b.x,p.y-b.y)<r*2)){b.in=true;b.vx=b.vy=0;if(b===m.cue){m.flash='Bianca in buca! 😅';m.ft=1.2}else{m.inb++;m.potNow++;m.flash='In buca! 🎉';m.ft=1}return}
    if(b.x<T.x+r){b.x=T.x+r;b.vx=Math.abs(b.vx)*.85}if(b.x>T.x+T.w-r){b.x=T.x+T.w-r;b.vx=-Math.abs(b.vx)*.85}if(b.y<T.y+r){b.y=T.y+r;b.vy=Math.abs(b.vy)*.85}if(b.y>T.y+T.h-r){b.y=T.y+T.h-r;b.vy=-Math.abs(b.vy)*.85}})}
  if(m.ft)m.ft=Math.max(0,m.ft-dt);
  if(m.shot&&!this.moving(m)){m.shot=false;if(m.cue.in){m.cue.in=false;m.cue.x=T.x+T.w/2;m.cue.y=T.y+T.h*.78;m.cue.vx=m.cue.vy=0}if(m.potNow>=2){m.flash='Doppietta! 🤩';m.ft=1.2}
   if(m.inb>=6)return mgEnd(`Tutte e 6 le palle in buca con ${10-m.shots} tiri! Campione! 🏆`,3);if(m.shots<=0){const st=m.inb>=4?2:1;mgEnd(`Hai mandato in buca ${m.inb} palle su 6!`,st)}}},
 draw(m,c){const T=m.T,r=T.r;c.fillStyle='#2b2040';c.fillRect(0,0,MGW,MGH);c.fillStyle='#6b3d1f';mgRR(c,T.x-20,T.y-20,T.w+40,T.h+40,18);c.fill();c.fillStyle='#1f8a4c';c.fillRect(T.x,T.y,T.w,T.h);
  c.strokeStyle='rgba(255,255,255,.15)';c.lineWidth=2;c.beginPath();c.moveTo(T.x,T.y+T.h*.78);c.lineTo(T.x+T.w,T.y+T.h*.78);c.stroke();
  m.pk.forEach(p=>{c.fillStyle='#111';c.beginPath();c.arc(p.x,p.y,r*1.6,0,7);c.fill()});
  const cue=m.cue,P=m.ptr;if(P.down&&!this.moving(m)&&!m.over&&!m.wait&&!cue.in){const dx=P.sx-P.x,dy=P.sy-P.y,l=Math.hypot(dx,dy);if(l>10){const ux=dx/l,uy=dy/l,pw=Math.min(1,l/(MGH*.35));
   c.setLineDash([8,8]);c.strokeStyle='rgba(255,255,255,.8)';c.lineWidth=2;c.beginPath();c.moveTo(cue.x,cue.y);c.lineTo(cue.x+ux*(80+pw*220),cue.y+uy*(80+pw*220));c.stroke();c.setLineDash([]);
   c.strokeStyle='#d9a066';c.lineWidth=7;c.lineCap='round';c.beginPath();c.moveTo(cue.x-ux*(r+6+pw*50),cue.y-uy*(r+6+pw*50));c.lineTo(cue.x-ux*(r+190+pw*50),cue.y-uy*(r+190+pw*50));c.stroke();c.lineCap='butt';
   c.fillStyle=`hsl(${120-pw*120},90%,55%)`;c.fillRect(T.x,T.y+T.h+26,T.w*pw,8)}}
  m.balls.forEach(b=>{if(b.in)return;c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.arc(b.x+2,b.y+3,r,0,7);c.fill();const g=c.createRadialGradient(b.x-r*.4,b.y-r*.4,1,b.x,b.y,r);g.addColorStop(0,'#fff');g.addColorStop(.35,b.c);g.addColorStop(1,b.c);c.fillStyle=g;c.beginPath();c.arc(b.x,b.y,r,0,7);c.fill();
   if(b.n){c.fillStyle='#fff';c.beginPath();c.arc(b.x,b.y,r*.45,0,7);c.fill();c.fillStyle='#111';c.font=`900 ${Math.round(r*.7)}px system-ui`;c.textAlign='center';c.textBaseline='middle';c.fillText(b.n,b.x,b.y+1)}});
  for(let i=0;i<6;i++){const b=m.balls[i+1];c.fillStyle=b.in?b.c:'rgba(255,255,255,.15)';c.beginPath();c.arc(MGW/2+(i-2.5)*28,T.y-34,9,0,7);c.fill()}
  if(!P.down&&!this.moving(m)&&!m.over){c.fillStyle='#fff';c.font='800 14px system-ui';c.textAlign='center';c.textBaseline='alphabetic';c.fillText('Trascina all\'indietro e lascia 🎯',MGW/2,T.y+T.h+44)}
  if(m.ft){c.fillStyle='#ffe066';c.strokeStyle='#1f2540';c.lineWidth=5;c.font='900 30px system-ui';c.textAlign='center';c.textBaseline='middle';c.strokeText(m.flash,MGW/2,MGH/2);c.fillText(m.flash,MGW/2,MGH/2)}},
 hud(m){return `🎱 ${m.inb}/6 · tiri ${m.shots}`}};

/* ---------- PALESTRA (forza) ---------- */
MG.forza={help:'🏋️ <b>Solleva il bilanciere!</b><br>Tocca lo schermo <b>velocissimo</b> (o premi spazio) per alzarlo fino alla linea verde ✅.<br>Ogni volta il peso diventa più pesante! Hai 30 secondi.',
 init(m){m.h=0;m.kg=10;m.reps=0;m.hold=0},
 push(m){if(m.hold>0)return;m.h=Math.min(1,m.h+Math.max(.06,.1-m.reps*.004));m.puff=.15},
 down(m){this.push(m)},key(m,k){if(k===' '||k==='ArrowUp')this.push(m)},
 tick(m,dt){if(m.hold>0){m.hold-=dt;if(m.hold<=0)m.h=0}else if(m.h>=1){m.reps++;m.kg+=5;m.hold=.8;m.flash=.8}else m.h=Math.max(0,m.h-(.2+m.reps*.035)*dt);if(m.flash)m.flash=Math.max(0,m.flash-dt);if(m.puff)m.puff=Math.max(0,m.puff-dt);
  if(m.t>=30){const st=m.reps>=6?3:m.reps>=3?2:1;mgEnd(m.reps?`Hai sollevato il bilanciere ${m.reps} volte, fino a ${m.kg-5} kg! 💪`:'Il bilanciere è pesante… tocca più veloce e ce la fai! 💪',st)}},
 draw(m,c){c.fillStyle='#d7dde6';c.fillRect(0,0,MGW,MGH);c.fillStyle='#bcd0e6';c.fillRect(20,70,MGW-40,MGH*.45);c.strokeStyle='#fff';c.lineWidth=3;c.strokeRect(20,70,MGW-40,MGH*.45);c.fillStyle='#3a3f4a';c.fillRect(0,MGH-120,MGW,120);
  mgEmo(c,'🏋️',50,MGH-150,40);mgEmo(c,'🚴',MGW-50,MGH-150,40);
  const cx=MGW/2,base=MGH-120,top=base-330,lo=base-150,y=lo-(lo-top)*m.h,bw=Math.min(MGW-60,300),pr=18+Math.min(30,m.reps*4);
  c.fillStyle='#e8b98a';c.beginPath();c.arc(cx,base-210,28,0,7);c.fill();c.fillStyle='#1f2540';c.beginPath();c.arc(cx-9,base-212,3,0,7);c.arc(cx+9,base-212,3,0,7);c.fill();
  c.strokeStyle='#1f2540';c.lineWidth=3;c.beginPath();if(m.h>.5||m.puff)c.arc(cx,base-198,8,0,Math.PI);else{c.moveTo(cx-8,base-196);c.lineTo(cx+8,base-196)}c.stroke();
  c.fillStyle='#e5484d';mgRR(c,cx-34,base-180,68,90,14);c.fill();c.fillStyle='#1f2540';c.fillRect(cx-30,base-92,24,90);c.fillRect(cx+6,base-92,24,90);
  c.strokeStyle='#e8b98a';c.lineWidth=12;c.lineCap='round';c.beginPath();c.moveTo(cx-30,base-170);c.lineTo(cx-bw*.28,y);c.moveTo(cx+30,base-170);c.lineTo(cx+bw*.28,y);c.stroke();c.lineCap='butt';
  c.fillStyle='#9aa3b2';c.fillRect(cx-bw/2,y-4,bw,8);[-1,1].forEach(s=>{c.fillStyle='#1f2540';mgRR(c,cx+s*(bw/2-14)-10,y-pr,20,pr*2,6);c.fill();c.fillStyle='#fff';c.font='900 11px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(m.kg,cx+s*(bw/2-14),y)});
  c.strokeStyle='#2bb673';c.lineWidth=4;c.setLineDash([10,8]);c.beginPath();c.moveTo(20,top);c.lineTo(MGW-20,top);c.stroke();c.setLineDash([]);
  const mx=MGW-26,mh=260;c.fillStyle='rgba(0,0,0,.2)';mgRR(c,mx-9,base-20-mh,18,mh,9);c.fill();c.fillStyle=m.h>.8?'#2bb673':'#f5a700';mgRR(c,mx-9,base-20-mh*m.h,18,mh*m.h,9);c.fill();
  if(m.flash){c.fillStyle='#ffe066';c.strokeStyle='#1f2540';c.lineWidth=5;c.font='900 32px system-ui';c.textAlign='center';c.strokeText('SU! 💪 +5 kg',MGW/2,top-30);c.fillText('SU! 💪 +5 kg',MGW/2,top-30)}
  c.fillStyle='#fff';c.font='800 15px system-ui';c.textAlign='center';c.textBaseline='alphabetic';c.fillText('👆 Tocca veloce veloce!',MGW/2,MGH-40)},
 hud(m){return `💪 ${m.reps} · ${m.kg} kg · ⏱️ ${Math.max(0,Math.ceil(30-m.t))}`}};

/* ---------- QUIZ (libro) ---------- */
MG.quiz={help:'📚 <b>Il libro dei quiz!</b><br>Leggi la domanda e tocca la risposta giusta.<br>8 domande: quante ne indovini?',
 init(m){m.n=0;m.ok=0;m.used=[];this.next(m)},
 next(m){m.res=null;m.pick=-1;let q=null;const sh=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  if(Math.random()>.35&&typeof QBANK!=='undefined'){const L=QBANK.filter(x=>x[0]<=Math.max(9,S.age+1)&&x[4].length<=24&&!m.used.includes(x[2]));if(L.length){const x=L[Math.floor(Math.random()*L.length)],num=/^\d+$/.test(x[4]);
    const W=num?[]:[...new Set(QBANK.filter(y=>y!==x&&y[1]===x[1]&&y[4].length<=24&&!/^\d+$/.test(y[4])&&!x[3].test(y[4].toLowerCase())).map(y=>y[4]))];
    if(num){const n=+x[4],w=new Set();while(w.size<2){const v=n+(Math.random()<.5?-1:1)*(1+Math.floor(Math.random()*3));if(v>0&&v!==n)w.add(String(v))}q={q:x[2],a:x[4],w:[...w]}}else if(W.length>=2)q={q:x[2],a:x[4],w:sh(W).slice(0,2)};if(q)m.used.push(x[2])}}
  if(!q){const M=mathQ(),n=+M.a,w=new Set();while(w.size<2){const v=n+(Math.random()<.5?-1:1)*(1+Math.floor(Math.random()*4));if(v>=0&&v!==n)w.add(String(v))}q={q:M.q,a:M.a,w:[...w]}}
  const op=sh([q.a,...q.w]);m.q=q.q;m.op=op;m.ci=op.indexOf(q.a)},
 btn(i){const w=Math.min(MGW-40,420),h=64;return {x:MGW/2-w/2,y:MGH*.42+i*(h+14),w,h}},
 pickI(m,i){if(m.res||i<0||i>2)return;m.pick=i;m.res=i===m.ci?'ok':'no';if(m.res==='ok')m.ok++;m.rt=1.3},
 down(m,P){for(let i=0;i<3;i++){const B=this.btn(i);if(P.x>B.x&&P.x<B.x+B.w&&P.y>B.y&&P.y<B.y+B.h)return this.pickI(m,i)}},
 key(m,k){if('123'.includes(k)&&k)this.pickI(m,+k-1)},
 tick(m,dt){if(m.res){m.rt-=dt;if(m.rt<=0){m.n++;if(m.n>=8){const st=m.ok>=7?3:m.ok>=5?2:1;return mgEnd(`Hai risposto giusto a ${m.ok} domande su 8! ${st===3?'Sei un genio! 🧠':'Leggi ancora e diventerai bravissim'+o()+'!'}`,st)}this.next(m)}}},
 draw(m,c){mgSky(c,'#fff4dc','#f3d9a6');mgEmo(c,'📖',MGW/2,105,54);
  const w=Math.min(MGW-40,440);c.fillStyle='#fffdf7';mgRR(c,MGW/2-w/2,140,w,MGH*.42-160,18);c.fill();c.strokeStyle='#1f2540';c.lineWidth=3;c.stroke();
  c.fillStyle='#1f2540';c.font='800 21px system-ui';c.textAlign='center';c.textBaseline='middle';mgWrap(c,m.q,MGW/2,175,w-30,28);
  m.op.forEach((t,i)=>{const B=this.btn(i);let col='#5ec8ff';if(m.res){if(i===m.ci)col='#2bb673';else if(i===m.pick)col='#e5484d';else col='#b9c2cf'}
   c.fillStyle='rgba(0,0,0,.25)';mgRR(c,B.x,B.y+5,B.w,B.h,16);c.fill();c.fillStyle=col;mgRR(c,B.x,B.y,B.w,B.h,16);c.fill();c.strokeStyle='#1f2540';c.lineWidth=3;c.stroke();
   c.fillStyle='#1f2540';c.font='900 20px system-ui';c.fillText(`${i+1}) ${t}`,MGW/2,B.y+B.h/2)});
  if(m.res){c.font='900 30px system-ui';c.fillStyle=m.res==='ok'?'#2bb673':'#e5484d';c.fillText(m.res==='ok'?'Giusto! 🎉':'Sbagliato! 😅',MGW/2,this.btn(2).y+110)}},
 hud(m){return `📚 ${Math.min(8,m.n+1)}/8 · ✅ ${m.ok}`}};

/* ---------- SALA GIOCHI: scegli il gioco ---------- */
const ARCADE9=['gokart9','bowling9','basket9','karaoke9','pingpong9','calcio9','skate9','nuota9','cinema9','fuochi9','segreto9','biliardo9','palestra9','libro9','cavallo9','orto9','acquario9','fontana9'];
PLACES.arcade9={sub:()=>'Scegli a cosa giocare!',body:()=>`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${ARCADE9.map(a=>`<button class="btn" data-arcade9="${a}" style="font-size:16px;padding:12px 6px">${MGACT[a][1]}</button>`).join('')}</div>`};
SHEET_T.arcade9=['🕹️','Sala giochi'];
{const _uf=useFurn;useFurn=function(f){if(f&&f.act==='giochi9')return openPlace('arcade9');return _uf(f)}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-arcade9]');if(!b)return;const a=b.dataset.arcade9;closeSheet();const [t,ti]=MGACT[a];mgOpen(t,ti,a)});
