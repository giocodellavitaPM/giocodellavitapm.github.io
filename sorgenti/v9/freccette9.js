/* ================= v9: minigioco «🎯 Freccette» nella Sala giochi (usa mg9.js) ================= */
MGACT.freccette9=['freccette','🎯 Freccette'];
if(!ARCADE9.includes('freccette9'))ARCADE9.splice(1,0,'freccette9');
MG.freccette={help:'🎯 <b>Freccette!</b><br>Il mirino si muove da solo sul bersaglio.<br>Tocca lo schermo (o premi spazio) quando è sul <b>centro rosso</b>!<br>Hai 8 freccette: più vicino al centro, più punti.',
 R(){return Math.min(MGW*.38,(MGH-220)*.42,190)},
 C(){return {x:MGW/2,y:MGH/2+10}},
 init(m){m.n=0;m.pts=0;m.hits=[];m.last=null;m.cool=0;m.ph=Math.random()*6;m.sp=1},
 aim(m){const R=this.R(),C=this.C(),k=m.ph;return {x:C.x+Math.sin(k*1.3)*R*.85+Math.sin(k*3.7)*R*.12,y:C.y+Math.sin(k*2.1+1)*R*.7+Math.cos(k*4.3)*R*.1}},
 score(d,R){const r=d/R;return r<.07?50:r<.16?25:r<.35?20:r<.55?15:r<.75?10:r<1?5:0},
 throw(m){if(m.cool>0||m.n>=8)return;const a=this.aim(m),C=this.C(),R=this.R(),d=Math.hypot(a.x-C.x,a.y-C.y),p=this.score(d,R);
  m.hits.push({x:a.x,y:a.y,p});m.pts+=p;m.n++;m.last={p,t:0,x:a.x,y:a.y};m.cool=.45;m.sp=1+m.n*.12;
  if(m.n>=8)setTimeout(()=>{if(ui.mg!==m)return;const st=m.pts>=220?3:m.pts>=130?2:1;
   mgEnd(`${m.pts} punti con 8 freccette! ${m.hits.filter(h=>h.p===50).length?'🎯 Hai fatto centro '+m.hits.filter(h=>h.p===50).length+' volte!':'Prova a fare centro!'}`,st)},900)},
 down(m){this.throw(m)},key(m,k){if(k===' '||k==='Enter')this.throw(m)},
 tick(m,dt){m.ph+=dt*.9*m.sp;if(m.cool>0)m.cool-=dt;if(m.last)m.last.t+=dt},
 draw(m,c){const g=c.createLinearGradient(0,0,0,MGH);g.addColorStop(0,'#3b2a1e');g.addColorStop(1,'#5a3e2b');c.fillStyle=g;c.fillRect(0,0,MGW,MGH);
  c.fillStyle='rgba(255,255,255,.04)';for(let x=0;x<MGW;x+=48)c.fillRect(x,0,2,MGH);
  const C=this.C(),R=this.R();c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.arc(C.x+6,C.y+8,R*1.12,0,7);c.fill();
  c.fillStyle='#1d1d1f';c.beginPath();c.arc(C.x,C.y,R*1.12,0,7);c.fill();
  for(let i=0;i<20;i++){c.fillStyle=i%2?'#f3e6c4':'#1d1d1f';c.beginPath();c.moveTo(C.x,C.y);c.arc(C.x,C.y,R,i*Math.PI/10-Math.PI/20,(i+1)*Math.PI/10-Math.PI/20);c.closePath();c.fill()}
  [[.75,.55,'#2e9e5b','#c8373f'],[.35,.16,'#c8373f','#2e9e5b']].forEach(([a,b,c1,c2])=>{for(let i=0;i<20;i++){c.fillStyle=i%2?c1:c2;c.beginPath();c.arc(C.x,C.y,R*a,i*Math.PI/10-Math.PI/20,(i+1)*Math.PI/10-Math.PI/20);c.arc(C.x,C.y,R*b,(i+1)*Math.PI/10-Math.PI/20,i*Math.PI/10-Math.PI/20,true);c.closePath();c.fill()}});
  c.fillStyle='#2e9e5b';c.beginPath();c.arc(C.x,C.y,R*.16,0,7);c.fill();c.fillStyle='#e5484d';c.beginPath();c.arc(C.x,C.y,R*.07,0,7);c.fill();
  c.strokeStyle='rgba(200,200,200,.5)';c.lineWidth=1;[1,.75,.55,.35,.16].forEach(k=>{c.beginPath();c.arc(C.x,C.y,R*k,0,7);c.stroke()});
  m.hits.forEach(h=>{c.fillStyle='#ffd23f';c.strokeStyle='#1f2540';c.lineWidth=2;c.beginPath();c.arc(h.x,h.y,5,0,7);c.fill();c.stroke();c.strokeStyle='#ffd23f';c.lineWidth=3;c.beginPath();c.moveTo(h.x,h.y);c.lineTo(h.x+16,h.y-16);c.stroke()});
  if(m.n<8&&!m.over){const a=this.aim(m);c.strokeStyle='#7CFFB2';c.lineWidth=3;c.beginPath();c.arc(a.x,a.y,14,0,7);c.moveTo(a.x-22,a.y);c.lineTo(a.x+22,a.y);c.moveTo(a.x,a.y-22);c.lineTo(a.x,a.y+22);c.stroke()}
  if(m.last&&m.last.t<1){const L=m.last;c.globalAlpha=1-L.t;c.fillStyle=L.p>=50?'#ffd23f':L.p?'#fff':'#ff8a8a';c.font='900 30px system-ui';c.textAlign='center';c.fillText(L.p>=50?'CENTRO! +50':L.p?'+'+L.p:'Fuori!',L.x,L.y-30-L.t*40);c.globalAlpha=1}
  c.fillStyle='#ffe7c2';c.font='800 15px system-ui';c.textAlign='center';c.fillText('Tocca quando il mirino è sul centro rosso! 🎯',MGW/2,MGH-40);
  for(let i=0;i<8;i++)mgEmo(c,i<m.n?'·':'🎯',MGW/2-105+i*30,MGH-78,i<m.n?14:22)},
 hud(m){return `🎯 ${m.n}/8 · ${m.pts} punti`}};
