/* ================= v9: la casa nuova si vede in città ================= */
const famCasaC=()=>S&&S.famHouse?FAMCASE.find(c=>c.id===S.famHouse):null;
(function(){const b=BUILD.find(x=>x.id==='casa');
  Object.defineProperty(b,'n',{get:()=>{const c=famCasaC();if(S&&S.home!=='genitori')return 'Casa dei genitori';return c?'Casa tua · '+c.n:'Casa tua'}});
  Object.defineProperty(b,'ic',{get:()=>{const c=famCasaC();if(S&&S.home!=='genitori')return '👨‍👩‍👦';return c?c.ic:'🏠'}});
  Object.defineProperty(b,'roof',{get:()=>{const c=famCasaC();return c?c.col[1]:'#d9534f'}});
})();
// giardino a sinistra della casa: piscina o orto (non ci si cammina sopra)
const GARDEN={x0:1,x1:3,y0:4,y1:7},GARDEN0={};
function houseTiles(){
  const k=S&&S.famHouse,solid=k==='villa'||k==='cascina';
  for(let y=GARDEN.y0;y<=GARDEN.y1;y++)for(let x=GARDEN.x0;x<=GARDEN.x1;x++){const i=y*W+x;if(GARDEN0[i]==null)GARDEN0[i]=at(x,y);setT(x,y,solid?12:GARDEN0[i])}
}
function plate(dx,dY){const c=cx,label=S?'Famiglia '+S.surname:'Casa';c.font='600 9px Georgia,serif';const tw=c.measureText(label).width+16,sx=dx*T+T/2-tw/2;
  c.fillStyle='#efe9da';c.fillRect(sx,dY-14,tw,12);c.fillStyle='#3b3a36';c.textAlign='center';c.textBaseline='middle';c.fillText(label,sx+tw/2,dY-7.5)}
function drawHouseGround(){
  const k=S&&S.famHouse,c=cx,X=GARDEN.x0*T,Y=GARDEN.y0*T,Wd=(GARDEN.x1-GARDEN.x0+1)*T,Hd=(GARDEN.y1-GARDEN.y0+1)*T,t=performance.now();
  if(k==='villa'){
    c.fillStyle='#d9d3c6';c.fillRect(X+2,Y+2,Wd-4,Hd-4);
    const g=c.createLinearGradient(0,Y,0,Y+Hd);g.addColorStop(0,'#62c3e6');g.addColorStop(1,'#2f95c4');c.fillStyle=g;c.fillRect(X+10,Y+10,Wd-20,Hd-20);
    c.strokeStyle='rgba(255,255,255,.45)';c.lineWidth=2;for(let i=0;i<5;i++){const yy=Y+24+i*28;c.beginPath();for(let x=X+12;x<=X+Wd-12;x+=10){const yv=yy+Math.sin(x/14+t/600+i)*2.5;x===X+12?c.moveTo(x,yv):c.lineTo(x,yv)}c.stroke()}
    c.strokeStyle='#c9ced4';c.lineWidth=3;c.beginPath();c.moveTo(X+Wd-30,Y+8);c.lineTo(X+Wd-30,Y+26);c.moveTo(X+Wd-20,Y+8);c.lineTo(X+Wd-20,Y+26);c.stroke();c.lineWidth=1;
    c.fillStyle='#f5a700';c.beginPath();c.arc(X+40,Y+Hd-50,9,0,7);c.fill();c.fillStyle='#e5484d';c.beginPath();c.arc(X+40,Y+Hd-50,9,0,Math.PI);c.fill();
  }else if(k==='cascina'){
    c.fillStyle='#7a5434';c.fillRect(X+4,Y+4,Wd-8,Hd-8);
    for(let r=0;r<5;r++){const yy=Y+16+r*30;c.fillStyle='#5f3f25';c.fillRect(X+8,yy+10,Wd-16,5);
      for(let x=X+16;x<X+Wd-12;x+=18){c.fillStyle=r%2?'#4f9a3a':'#2f7d32';c.beginPath();c.arc(x,yy+6,6,0,7);c.fill();if(r===1||r===3){c.fillStyle=r===1?'#e5484d':'#f08a24';c.beginPath();c.arc(x+2,yy+8,2.6,0,7);c.fill()}}}
    c.strokeStyle='#b8925f';c.lineWidth=2;c.strokeRect(X+3,Y+3,Wd-6,Hd-6);c.lineWidth=1;
  }
}
// galline e cose che stanno davanti (disegnate con la casa)
function houseExtras(b){
  const k=S.famHouse,c=cx,X=b.x*T,Y=b.y*T,Wd=b.w*T,Hd=b.h*T,roofH=Math.round(Hd*.5),fy=Y+roofH,dX=b.dx*T+T/2,t=performance.now();
  if(k==='villa'){
    [dX-44,dX+38].forEach(px=>{c.fillStyle='#f4f1ea';c.fillRect(px,fy+4,6,Hd-roofH-8);c.fillStyle='#d9d3c6';c.fillRect(px-2,fy+2,10,4)});
    c.fillStyle='#f6efe2';c.fillRect(dX-50,fy-4,100,8);
    c.fillStyle='#3b8f4a';[X+8,X+Wd-30].forEach(px=>{c.beginPath();c.arc(px+11,Y+Hd-6,11,0,7);c.fill()});
  }else if(k==='villetta'){
    const gx=X+Wd-T*1.6,gw=T*1.3,gh=Hd-roofH-10;c.fillStyle='#d7dbe2';c.fillRect(gx,Y+Hd-gh,gw,gh);c.strokeStyle='#9aa3b5';
    for(let i=1;i<6;i++){c.beginPath();c.moveTo(gx,Y+Hd-gh+i*gh/6);c.lineTo(gx+gw,Y+Hd-gh+i*gh/6);c.stroke()}
    c.fillStyle='#2f2c29';c.font='700 8px system-ui';c.textAlign='center';c.fillText('GARAGE',gx+gw/2,Y+Hd-gh-5);
    c.fillStyle='#3b8f4a';for(let x=X+4;x<X+T*2.6;x+=12){c.beginPath();c.arc(x+6,Y+Hd-4,7,0,7);c.fill()}
    c.fillStyle='#8a5a33';c.fillRect(X-24,Y+Hd-22,4,20);c.fillStyle='#c0392b';c.fillRect(X-30,Y+Hd-32,16,11);
  }else if(k==='cascina'){
    c.strokeStyle='#5a3b26';c.lineWidth=4;c.beginPath();c.moveTo(X,fy+20);c.lineTo(X+Wd,fy+20);c.moveTo(X+T*.5,fy);c.lineTo(X+T*.5,Y+Hd);c.moveTo(X+Wd-T*.5,fy);c.lineTo(X+Wd-T*.5,Y+Hd);c.stroke();c.lineWidth=1;
    c.fillStyle='#8a8378';c.fillRect(X+Wd-48,Y-34,16,30);for(let i=0;i<3;i++){c.fillStyle=`rgba(230,230,230,${.5-i*.12})`;c.beginPath();c.arc(X+Wd-40+Math.sin(t/700+i)*4,Y-42-i*12-(t/60%12),6+i*2,0,7);c.fill()}
    // galline che beccano
    for(let i=0;i<3;i++){const hx=X-T*1.6+i*30+Math.sin(t/900+i*2)*10,hy=Y+Hd+14+(i%2)*10,pk=Math.sin(t/180+i)>.6?3:0;
      c.fillStyle='#f4f1ea';c.beginPath();c.ellipse(hx,hy,8,6,0,0,7);c.fill();c.beginPath();c.arc(hx+6,hy-5+pk,4,0,7);c.fill();c.fillStyle='#e5484d';c.fillRect(hx+5,hy-10+pk,3,3);c.fillStyle='#f5a700';c.fillRect(hx+9,hy-5+pk,3,2)}
  }
}
// l'appartamento è in un palazzo alto con i balconi
function drawCondo(b){
  const C=famCasaC(),c=cx,X=b.x*T,Y=(b.y-2)*T,Wd=b.w*T,Hd=(b.h+2)*T,col=C.col[0];
  c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.moveTo(X+Wd,Y+6);c.lineTo(X+Wd+16,Y+20);c.lineTo(X+Wd+16,Y+Hd+8);c.lineTo(X+10,Y+Hd+8);c.lineTo(X,Y+Hd);c.closePath();c.fill();
  const g=c.createLinearGradient(0,Y,0,Y+Hd);g.addColorStop(0,shade(col,.9));g.addColorStop(1,col);c.fillStyle=g;c.fillRect(X,Y+14,Wd,Hd-14);
  c.fillStyle=shade(col,.62);c.fillRect(X-3,Y,Wd+6,16);c.fillStyle=shade(col,.78);c.fillRect(X+4,Y+4,Wd-8,8);c.fillStyle='#8f8a80';c.fillRect(X+14,Y-8,22,10);c.fillRect(X+Wd-40,Y-6,12,8);
  const floors=5,top=Y+26,nw=6,gap=Wd/nw;
  for(let f=0;f<floors;f++){const wy=top+f*34;
    for(let i=0;i<nw;i++){const wx=X+gap*i+gap/2-8;c.fillStyle='#ece8de';c.fillRect(wx-2,wy-2,20,24);c.fillStyle='#5f7b88';c.fillRect(wx,wy,16,20);c.fillStyle='rgba(255,255,255,.22)';c.fillRect(wx,wy,6,20);
      c.fillStyle='#5d6b74';if((i+f)%3)c.fillRect(wx-6,wy-1,4,22),c.fillRect(wx+18,wy-1,4,22);else c.fillRect(wx,wy,16,9)}
    if(f%2===1||f===0){c.fillStyle='rgba(60,55,50,.8)';for(const bx of [X+gap*.4,X+Wd-gap*2.4]){c.fillRect(bx,wy+20,gap*2,3);for(let k=0;k<9;k++)c.fillRect(bx+k*gap*2/8,wy+12,1.5,9)}
      if(f===1){c.fillStyle='#3b8f4a';c.beginPath();c.arc(X+gap*.6,wy+10,6,0,7);c.fill();c.fillStyle='#e5484d';c.beginPath();c.arc(X+gap*.6,wy+7,2.5,0,7);c.fill()}}}
  const gy=Y+Hd-42;c.fillStyle=shade(col,.82);c.fillRect(X,gy,Wd,42);c.fillStyle=shade(col,.68);c.fillRect(X,Y+Hd-5,Wd,5);
  const dX=b.dx*T+T/2-14;c.fillStyle='#d9d3c6';c.fillRect(dX-4,gy+4,36,38);c.fillStyle='#3a3f44';c.fillRect(dX,gy+8,28,34);c.fillStyle='#93aebb';c.fillRect(dX+3,gy+11,10,28);c.fillRect(dX+15,gy+11,10,28);
  c.fillStyle='#c9a54a';c.fillRect(dX+32,gy+14,6,10);
  for(let i=0;i<nw;i++){const wx=X+gap*i+gap/2-8;if(Math.abs(wx+8-(dX+14))<30)continue;c.fillStyle='#5f7b88';c.fillRect(wx,gy+12,16,18);c.fillStyle='#ece8de';c.fillRect(wx+7,gy+12,1.5,18)}
  plate(b.dx,gy+4);
}
/* --- tante macchine in famiglia --- */
const FAMMAX=4,FAMSPOT=[[5.6,8.9],[4.4,8.9],[3.2,8.9]];
function famCars(){if(!S)return [];if(!S.famCars)S.famCars=[S.famCar||{m:'familiare',col:'#2f5d8a'}];return S.famCars}
// le macchine parcheggiate davanti a casa (quella scelta sta nel vialetto)
function famParked(){const L=famCars(),sel=S.famSel||0,out=[];let k=0;L.forEach((c,i)=>{if(i===sel)return;const sp=FAMSPOT[k++];if(sp)out.push({i,c,x:sp[0],y:sp[1]})});return out}
function famCarNear(){
  if(Math.hypot(S.pos.x-DRIVEWAY.x,S.pos.y-DRIVEWAY.y)<2.2)return S.famSel||0;
  let best=-1,bd=1.4;famParked().forEach(p=>{const d=Math.hypot(S.pos.x-p.x,S.pos.y-p.y-.4);if(d<bd){bd=d;best=p.i}});return best;
}
function famGarage(){
  const L=famCars(),sel=S.famSel||0;
  return `<div class="h3">Le vostre macchine (${L.length}/${FAMMAX})</div>`+L.map((c,i)=>{const m=MODELS.find(x=>x.id===c.m)||{ic:'🚙',n:'Station wagon'};
    return `<div class="row"><div class="t"><b>${m.ic} ${m.n}</b><span><span style="display:inline-block;width:11px;height:11px;border-radius:6px;background:${c.col};border:1px solid #0003;vertical-align:-1px"></span> ${(CARCOLS.find(x=>x[1]===c.col)||['Blu'])[0]}${i===sel?' · è nel vialetto, pronta a partire':' · parcheggiata davanti a casa'}</span></div><button class="btn ${i===sel?'alt':'hot'}" data-famsel="${i}" ${i===sel?'disabled':''}>${i===sel?'Si usa questa':'Usiamo questa'}</button></div>`}).join('');
}
function famSel(i){if(!famCars()[i])return;S.famSel=i;const m=MODELS.find(x=>x.id===famCars()[i].m);save();refreshSheet();toast(`🔑 Adesso la macchina di famiglia è ${m?'la '+m.n.toLowerCase():'la station wagon'}: è nel vialetto!`)}
