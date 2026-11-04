/* --- Marina di Lido grande: sfondo, strade e macchine --- */
function drawOutdoor9(sc,t){
  const c=cx,W2=sc.w*T;pats();
  const sky=c.createLinearGradient(0,0,0,T*1.2);sky.addColorStop(0,'#8fc8ea');sky.addColorStop(1,'#cfe8f5');c.fillStyle=sky;c.fillRect(0,0,W2,T*1.2);
  c.fillStyle='#7aa6b8';c.beginPath();c.ellipse(W2*.2,T*1.2,T*4,T*.5,0,Math.PI,0);c.fill();c.fillStyle='#8fb4c2';c.beginPath();c.ellipse(W2*.7,T*1.2,T*6,T*.4,0,Math.PI,0);c.fill();
  const sea=c.createLinearGradient(0,T*1.2,0,T*7);sea.addColorStop(0,'#2f7fb0');sea.addColorStop(1,'#56b6d8');c.fillStyle=sea;c.fillRect(0,T*1.2,W2,T*5.8);
  c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=2;for(let r=0;r<10;r++){const yy=T*1.6+r*T*.55,ph=t/900+r;c.beginPath();for(let x=0;x<=W2;x+=22){const yv=yy+Math.sin(x/40+ph)*3;x?c.lineTo(x,yv):c.moveTo(x,yv)}c.stroke()}
  const wet=c.createLinearGradient(0,T*7,0,T*8);wet.addColorStop(0,'#c9b688');wet.addColorStop(1,'#e2cf9c');c.fillStyle=wet;c.fillRect(0,T*7,W2,T);
  c.fillStyle='rgba(255,255,255,.75)';c.beginPath();c.moveTo(0,T*7);for(let x=0;x<=W2;x+=16)c.lineTo(x,T*7+5+Math.sin(x/30+t/500)*4);c.lineTo(W2,T*7);c.closePath();c.fill();
  c.fillStyle='#ecd9a6';c.fillRect(0,T*8,W2,T*6);
  const r=seeded(9);c.fillStyle='rgba(160,130,80,.25)';for(let i=0;i<1000;i++)c.fillRect(r()*W2,T*8+r()*T*6,2,2);
  c.fillStyle=PAT.stone||'#d8d1c2';c.fillRect(0,T*14,W2,T*2);c.fillStyle='#b7ae9c';c.fillRect(0,T*14,W2,4);
  const pav=(y0,y1)=>{c.fillStyle='#cfc6b5';c.fillRect(0,T*y0,W2,T*(y1-y0));c.strokeStyle='rgba(120,110,95,.2)';c.lineWidth=1;for(let y=y0;y<y1;y++)for(let x=0;x<sc.w;x++)c.strokeRect(x*T+.5+(y%2)*T/2,y*T+.5,T,T)};
  pav(16,23);pav(25,30);pav(32,33);pav(42,49);
  MROAD.forEach(ry=>{c.fillStyle=PAT.asphalt;c.fillRect(0,T*ry,W2,T*2);c.fillStyle='rgba(255,255,255,.8)';for(let x=0;x<W2;x+=40)c.fillRect(x+6,T*(ry+1)-1.5,22,3);
    c.fillStyle='#b7ae9c';c.fillRect(0,T*ry-3,W2,3);c.fillRect(0,T*(ry+2),W2,3);
    MCROSS.filter(q=>q[2]===ry).forEach(([a,b])=>{c.fillStyle='#f4f1ea';const n=(b-a+1)*2;for(let k=0;k<n;k++)c.fillRect(T*a+6+k*T/2,T*ry+4,T/2-10,T*2-8)})});
  // il parco
  c.fillStyle=PAT.grass;c.fillRect(0,T*33,W2,T*9);c.fillStyle='#e6dfcd';c.fillRect(T*28,T*33,T*4,T*9);c.fillRect(0,T*41,W2,T);c.fillRect(T*16,T*37,T*24,T);
  c.fillStyle=PAT.asphalt;c.fillRect(0,T*49,W2,T*2);
  const dx=sc.door.x*T;c.fillStyle='rgba(31,37,64,.92)';rr(c,dx-60,T*50+6,T+120,26,8);c.fill();c.fillStyle='#fff';c.font='700 12px "Atkinson Hyperlegible",system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText('✈️ Aeroporto · si torna a casa',dx+T/2,T*50+19);
  // cartelli
  c.fillStyle='rgba(31,37,64,.85)';rr(c,T*30-70,T*22+8,140,22,6);c.fill();c.fillStyle='#fff';c.fillText('🏖️ Spiaggia ↑   🌳 Parco ↓',T*30,T*22+19);
  mareCars9(sc,t);
}
const MCARS9=[{x:3,l:0,col:'#e5484d',sh:'city'},{x:30,l:0,col:'#f4f6f8',sh:'wagon'},{x:9,l:1,col:'#3b6fe0',sh:'suv'},{x:44,l:1,col:'#f5a700',sh:'cabrio'},
  {x:20,l:2,col:'#16a34a',sh:'van'},{x:50,l:2,col:'#9b5de5',sh:'city'},{x:12,l:3,col:'#2f2c29',sh:'sport'},{x:38,l:3,col:'#e98aa8',sh:'city'}];
function mareCars9(sc,t){
  const dt=Math.min(.05,(t-(ui.mT||t))/1000);ui.mT=t;
  MCARS9.forEach(m=>{const ry=MROAD[m.l>>1],lane=m.l&1,dir=lane?1:-1,front=m.x+dir*1.1;
    let stop=MCROSS.some(([a,b,r])=>r===ry&&S.pos.x>=a-.4&&S.pos.x<=b+1.4&&S.pos.y>=ry-.7&&S.pos.y<=ry+2.7&&(dir>0?front<a&&front>a-2.4:front>b+1&&front<b+3.4));
    MCARS9.forEach(o=>{if(o!==m&&o.l===m.l){const d=(o.x-m.x)*dir;if(d>0&&d<2.4)stop=true}});
    m.v=stop?Math.max(0,(m.v||3)-12*dt):Math.min(3.2,(m.v||0)+3*dt);
    if(!isBusy())m.x+=dir*m.v*dt;if(m.x>sc.w+2)m.x=-2;if(m.x<-2)m.x=sc.w+2;
    drawCarAt(m.x,ry+.5+lane,lane?0:Math.PI,m.col,stop,m.sh)});
}
// mobili nuovi del mare
function drawFurnMare(fu,X,Y,w,h,t,box){
  const c=cx;
  switch(fu.k){
   case 'pier':c.fillStyle='#8a5a33';c.fillRect(X,Y,w,h);c.strokeStyle='rgba(0,0,0,.25)';for(let yy=Y;yy<Y+h;yy+=8){c.beginPath();c.moveTo(X,yy);c.lineTo(X+w,yy);c.stroke()}
     c.fillStyle='#5a3b26';for(let yy=Y;yy<=Y+h;yy+=T){c.fillRect(X-4,yy-3,6,10);c.fillRect(X+w-2,yy-3,6,10)}
     c.strokeStyle='#2f2c29';c.lineWidth=1.5;c.beginPath();c.moveTo(X+w-10,Y+12);c.lineTo(X+w+18,Y-14);c.stroke();c.beginPath();c.moveTo(X+w+18,Y-14);c.lineTo(X+w+20,Y+10+Math.sin(t/400)*3);c.stroke();c.lineWidth=1;break;
   case 'faro':{const fx=X+w/2;c.fillStyle='#8f8a80';c.beginPath();c.ellipse(fx,Y+h-6,w/2,10,0,0,7);c.fill();
     for(let i=0;i<5;i++){c.fillStyle=i%2?'#ffffff':'#c0392b';c.fillRect(fx-14+i*1.2,Y+h-10-(i+1)*24,28-i*2.4,24)}
     c.fillStyle='#2f2c29';c.fillRect(fx-12,Y+h-150,24,18);c.fillStyle=(t/600|0)%2?'#fff6a0':'#e8d27a';c.fillRect(fx-8,Y+h-146,16,10);c.fillStyle='#c0392b';c.beginPath();c.moveTo(fx-14,Y+h-150);c.lineTo(fx,Y+h-166);c.lineTo(fx+14,Y+h-150);c.closePath();c.fill();break}
   case 'volley':c.fillStyle='#8f8a80';c.fillRect(X,Y-26,4,h+22);c.fillRect(X+w-4,Y-26,4,h+22);c.strokeStyle='rgba(255,255,255,.9)';for(let i=0;i<4;i++){c.beginPath();c.moveTo(X+4,Y-24+i*5);c.lineTo(X+w-4,Y-24+i*5);c.stroke()}
     for(let x=X+4;x<X+w;x+=8){c.beginPath();c.moveTo(x,Y-24);c.lineTo(x,Y-9);c.stroke()}c.fillStyle='#f5a700';c.beginPath();c.arc(X+w/2+Math.sin(t/500)*40,Y-40-Math.abs(Math.sin(t/300))*20,6,0,7);c.fill();break;
   case 'pond':{c.fillStyle='#9a8f7a';rr(c,X-4,Y-4,w+8,h+8,30);c.fill();const g=c.createLinearGradient(0,Y,0,Y+h);g.addColorStop(0,'#5fb0d6');g.addColorStop(1,'#3a8fb8');c.fillStyle=g;rr(c,X,Y,w,h,26);c.fill();
     for(let i=0;i<3;i++){const dx2=X+40+i*90+Math.sin(t/1500+i)*30,dy2=Y+40+i*30;c.fillStyle='#f4f1ea';c.beginPath();c.ellipse(dx2,dy2,9,6,0,0,7);c.fill();c.beginPath();c.arc(dx2+7,dy2-6,4.5,0,7);c.fill();c.fillStyle='#f5a700';c.fillRect(dx2+10,dy2-7,5,2.5)}
     c.fillStyle='#3b8f4a';[[X+20,Y+h-14],[X+w-30,Y+16]].forEach(([a,b])=>{c.beginPath();c.ellipse(a,b,12,7,0,0,7);c.fill()});break}
   case 'field':{c.fillStyle='#4f9a3a';c.fillRect(X,Y,w,h);c.fillStyle='rgba(255,255,255,.08)';for(let x=X;x<X+w;x+=T*2)c.fillRect(x,Y,T,h);
     c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=2;c.strokeRect(X+6,Y+6,w-12,h-12);c.beginPath();c.moveTo(X+w/2,Y+6);c.lineTo(X+w/2,Y+h-6);c.stroke();c.beginPath();c.arc(X+w/2,Y+h/2,30,0,7);c.stroke();
     c.strokeRect(X+6,Y+h/2-30,24,60);c.strokeRect(X+w-30,Y+h/2-30,24,60);c.lineWidth=1;c.fillStyle='#f4f4f2';c.beginPath();c.arc(X+w/2+Math.sin(t/700)*80,Y+h/2+Math.cos(t/900)*40,6,0,7);c.fill();break}
  }
}
