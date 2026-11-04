/* ================= v9: il viaggio vero, con l'aeroporto ================= */
Object.assign(PLACES,{
 checkin:{sub:()=>'Biglietti e valigie',body:()=>{const tb=S.tripBooked;
   return tb?`<div class="row"><div class="t"><b>🎫 Carta d'imbarco</b><span>Volo AZ 214 per Marina di Lido · Gate 3 · ${tb.fam?'posti 12A, 12B, 12C':'posto 7A'}</span></div><span class="tag ok">✓ Pronta</span></div>
     <div class="row"><div class="t"><b>🧳 Valigie</b><span>Pesate e caricate sul nastro</span></div><span class="tag ok">✓ Imbarcate</span></div>
     <p class="note">Adesso vai al <b>Gate 3</b> (in fondo a destra) e sali sull'aereo! ✈️</p>`
     :`<p class="note">Per partire serve il biglietto: prenotalo all'agenzia viaggi, in città. 🎫</p>`}},
 gate:{sub:()=>'Gate 3 · Marina di Lido',body:()=>S.tripBooked?`<div class="row"><div class="t"><b>✈️ Volo per Marina di Lido</b><span>Imbarco aperto: allacciate le cinture!</span></div><button class="btn hot" data-board="1">Sali sull'aereo</button></div>`
   :`<p class="note">Nessun volo prenotato. I biglietti si comprano all'agenzia viaggi! 🎫</p>`},
});
Object.assign(SHEET_T,{checkin:['🎫','Check-in'],gate:['🛫','Gate d\'imbarco']});
PA.pescaMare={n:'Pesca dal molo',d:'Con la canna da pesca',en:1,ok:()=>S.age>=3,run:()=>{add('fel',4);add('int',1);return pick(['Aspetti… aspetti… e abbocca un pesciolino argentato! Lo guardi e lo ributti in mare. 🐟','Hai pescato una vecchia scarpa! 😂 La butti nel cestino.','Un granchio si attacca all\'amo! Lo liberi sugli scogli. 🦀'])}};
PA.pesceMare={n:'Frittura di pesce',d:'12 €',en:0,ok:()=>S.age>=2,run:()=>{if(!(ui.parPay||parNear()&&S.age<14)){if(!canPay(12))return null;money(-12)}add('fel',4);add('sal',1);return 'Un cono di frittura di calamari e gamberetti, con il limone! 🦐🍋'}};
PA.calcioMare={n:'Gioca a pallone',d:'Con i bambini del posto',en:1,ok:()=>S.age>=3,run:()=>{add('fel',4);add('spo',2);count('sport');return pick(['Partita in spiaggia con i bambini del posto: segni un gol! ⚽','Fai una partita a beach volley: che schiacciata! 🏐','Giochi a calcio sul campetto del parco: 3 a 2 per la tua squadra! ⚽'])}};
PA.scivoloMare={n:'Scivolo al parchetto',d:'',en:0,ok:()=>S.age<=12,run:()=>{add('fel',3);return 'Wiii! Ti tuffi giù dallo scivolo del parchetto al mare! 🛝'}};
function bookTrip(){
  const kid=S.age<18&&S.home==='genitori';if(S.done.trip||S.tripBooked)return;
  if(!kid){if(!canPay(600))return toast('Non hai abbastanza soldi. 💸');money(-600)}
  S.done.trip=1;S.tripBooked={fam:kid,wait:4};closeSheet();save();updateHud();
  toast(`🎫 Biglietti prenotati! ${kid?'Il papà paga. ':''}Tra poco arriva la notifica del volo…`);
}
function notifState(){
  const tb=S&&S.tripBooked;if(!tb||S.trip||tb.wait>0)return null;
  if(S.scene==='aeroporto')return null;
  if(S.escort&&S.escort.to==='aeroporto')return null;
  if(S.drive||S.famDrive)return null;
  return '✈️ <b>Il volo per Marina di Lido è pronto!</b><small>Tocca qui per andare all\'aeroporto</small>';
}
function notifTick(dt){
  const tb=S.tripBooked;if(tb&&tb.wait>0&&!isBusy())tb.wait-=dt;
  const el=$('notif');if(!el)return;const h=isBusy()?null:notifState();
  if(!h){if(!el.hidden)el.hidden=true;return}
  if(el.hidden||el.dataset.h!==h){el.innerHTML=h;el.dataset.h=h;el.hidden=false}
}
function notifTap(){
  const tb=S.tripBooked;if(!tb)return;$('notif').hidden=true;ui.walk=null;
  if(tb.fam){const id=S.escort&&S.escort.id||'papa';S.escort={id,to:'aeroporto',fly:1};
    toast(`${ParName(id)}: «Le valigie sono in macchina! Andiamo all'aeroporto!» 🧳🚗`);startEscortWalk();return}
  if(S.scene!=='citta')exitBuilding();const b=BUILD.find(x=>x.id==='aeroporto');
  toast('🧳 Vai all\'aeroporto! È in basso a destra sulla mappa 🗺️.');walkTo(b.dx,b.dy,{enter:'aeroporto'});
}
// lo schermo diventa tutto nero: sei in volo
function fly(dest,mid,done){
  const el=$('fly');ui.flying=true;closeSheet();el.querySelector('p').textContent=`In volo verso ${dest}…`;el.hidden=false;el.style.opacity=0;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{el.style.opacity=1}));
  setTimeout(()=>{mid();},1200);
  setTimeout(()=>{el.style.opacity=0},3600);
  setTimeout(()=>{el.hidden=true;ui.flying=false;done()},4400);
}
function boardPlane(){
  const tb=S.tripBooked;closeSheet();if(!tb)return toast('Per partire serve il biglietto: prenota all\'agenzia viaggi! 🎫');
  const fam=tb.fam;S.tripBooked=null;
  fly('Marina di Lido',()=>{
    S.trip={fam};S.escort=null;S.drive=null;S.famDrive=null;if(!fam)S.carOut=false;S.ride=false;ui.walk=null;S.scene='mare';S.pos={x:SC.mare.door.x+.5,y:SC.mare.h-1.7};S.face='u';
    count('vacanza');add('fel',8);if(!S.visited.mare){S.visited.mare=1;count('nuovo')}syncNpcs();save();updateHud();
  },()=>{ui.result={ic:'🛬',title:'Atterrati a Marina di Lido!',text:`${fam?'Tu, la mamma e il papà scendete dall\'aereo':'Scendi dall\'aereo'}: c'è il sole e si sente l'odore del mare! 🌊 Qui c'è una cittadina tutta da scoprire: la piazza con la fontana, i negozi, la strada (attraversa sulle strisce!), il parchetto e in fondo la spiaggia con gli ombrelloni. L'Hotel Belvedere è sul lungomare. 🏖️`,chips:[]};renderModal()});
}
function flyHome(){
  if(!S.trip)return;const fam=S.trip.fam;
  fly(S.city,()=>{
    S.trip=null;S.scene='aeroporto';S.pos={x:17.5,y:6.4};S.face='d';ui.walk=null;S.escort=fam?{id:'papa',to:null}:null;syncNpcs();save();updateHud();
  },()=>{ui.result={ic:'🛬',title:'Bentornat'+o()+' a '+S.city+'!',text:fam?'Atterrati! Il papà prende le valigie dal nastro: «Andiamo a prendere la macchina e torniamo a casa!» 🧳🚗':'Atterrat'+o()+'! Prendi la valigia e torni in città. 🧳',chips:[]};renderModal();
    if(fam){S.escort={id:'papa',to:'casa',fly:1};startEscortWalk()}});
}
// l'aeroporto visto da fuori: vetrate, torre di controllo e un aereo
function drawAeroporto(){
  const b=BUILD.find(x=>x.id==='aeroporto'),c=cx,X=b.x*T,Y=b.y*T,Wd=b.w*T,Hd=b.h*T,t=performance.now();
  c.fillStyle='rgba(0,0,0,.2)';c.fillRect(X+12,Y+14,Wd+10,Hd);
  // pista e aereo dietro
  c.fillStyle='#5a606e';c.fillRect(X+10,Y-40,Wd-140,34);c.fillStyle='#f4f1ea';for(let x=X+20;x<X+Wd-150;x+=40)c.fillRect(x,Y-24,22,3);
  const px=X+90+((t/40)%(Wd-260)),py=Y-30;
  c.fillStyle='#f4f6f8';rr(c,px,py-9,150,20,10);c.fill();c.fillStyle='#e5484d';c.fillRect(px+20,py+2,120,4);
  c.fillStyle='#dfe4ea';c.beginPath();c.moveTo(px+60,py);c.lineTo(px+90,py);c.lineTo(px+70,py-34);c.lineTo(px+56,py-34);c.closePath();c.fill();
  c.beginPath();c.moveTo(px+60,py+8);c.lineTo(px+90,py+8);c.lineTo(px+70,py+34);c.lineTo(px+56,py+34);c.closePath();c.fill();
  c.fillStyle='#3b6fe0';c.beginPath();c.moveTo(px+4,py-8);c.lineTo(px+22,py-8);c.lineTo(px+4,py-34);c.closePath();c.fill();
  c.fillStyle='#5f7b88';for(let i=0;i<8;i++)c.fillRect(px+32+i*12,py-4,6,5);c.fillStyle='#1f2540';c.beginPath();c.moveTo(px+140,py-6);c.lineTo(px+150,py+1);c.lineTo(px+140,py+1);c.closePath();c.fill();
  // terminal
  const ty=Y+44;c.fillStyle='#e8eef4';c.fillRect(X,ty,Wd,Hd-44);
  const g=c.createLinearGradient(0,ty+20,0,Y+Hd);g.addColorStop(0,'#7fb3d1');g.addColorStop(1,'#a9d0e4');c.fillStyle=g;c.fillRect(X+10,ty+24,Wd-20,Hd-74);
  c.fillStyle='rgba(255,255,255,.35)';for(let x=X+20;x<X+Wd-20;x+=90){c.beginPath();c.moveTo(x,Y+Hd-50);c.lineTo(x+30,ty+24);c.lineTo(x+46,ty+24);c.lineTo(x+16,Y+Hd-50);c.closePath();c.fill()}
  c.fillStyle='#d7dbe2';for(let x=X+10;x<=X+Wd-10;x+=44)c.fillRect(x-1.5,ty+24,3,Hd-74);
  // tetto a onda
  c.fillStyle='#4a5a73';c.beginPath();c.moveTo(X-10,ty+26);c.quadraticCurveTo(X+Wd*.25,ty-20,X+Wd*.5,ty+6);c.quadraticCurveTo(X+Wd*.75,ty+30,X+Wd+10,ty-4);c.lineTo(X+Wd+10,ty+14);c.quadraticCurveTo(X+Wd*.75,ty+44,X+Wd*.5,ty+22);c.quadraticCurveTo(X+Wd*.25,ty-2,X-10,ty+40);c.closePath();c.fill();
  // torre di controllo
  const tx=X+Wd-70;c.fillStyle='#d7dbe2';c.fillRect(tx,Y-90,26,140);c.fillStyle='#4a5a73';c.beginPath();c.moveTo(tx-16,Y-90);c.lineTo(tx+42,Y-90);c.lineTo(tx+34,Y-120);c.lineTo(tx-8,Y-120);c.closePath();c.fill();
  c.fillStyle='#7fd0f0';c.fillRect(tx-8,Y-116,50,18);c.fillStyle='#e5484d';c.fillRect(tx+12,Y-136,2,16);c.fillStyle=(t/500|0)%2?'#ff4d4d':'#7a1f1f';c.beginPath();c.arc(tx+13,Y-138,3,0,7);c.fill();
  // insegna e porte scorrevoli
  c.fillStyle='#1f2540';rr(c,X+Wd/2-90,ty+30,180,24,6);c.fill();c.fillStyle='#fff';c.font='800 14px "Atkinson Hyperlegible",system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText('✈️ AEROPORTO',X+Wd/2,ty+42.5);
  const dX=b.dx*T+T/2;c.fillStyle='#3a3f44';c.fillRect(dX-30,Y+Hd-50,60,50);c.fillStyle='#bfe0ef';c.fillRect(dX-27,Y+Hd-47,26,47);c.fillRect(dX+1,Y+Hd-47,26,47);
  c.fillStyle='#b9b2a2';c.fillRect(X-6,Y+Hd-4,Wd+12,6);
}
// mobili dell'aeroporto
function drawFurn9(fu,X,Y,w,h,t,box){
  const c=cx;
  switch(fu.k){
   case 'vshow':box(X+3,Y+h-12,w-6,10,'#c9ced6',4);c.fillStyle='rgba(0,0,0,.12)';c.beginPath();c.ellipse(X+w/2,Y+h-12,w/2-6,5,0,0,7);c.fill();c.fillStyle='#000';c.font=(fu.w>2?40:32)+'px system-ui';c.textAlign='center';c.textBaseline='alphabetic';c.fillText(fu.emo||'🚲',X+w/2,Y+h-12);break;
   case 'checkin':for(let i=0;i<fu.w;i+=2){box(X+i*T+4,Y+4,T*2-8,h-6,'#d7dbe2',4);c.fillStyle='#3b6fe0';c.fillRect(X+i*T+4,Y+4,T*2-8,6);c.fillStyle='#1f2540';c.fillRect(X+i*T+T-12,Y-16,24,16);c.fillStyle='#7ee0c3';c.font='700 8px system-ui';c.textAlign='center';c.fillText((i/2+1)+'',X+i*T+T,Y-8);
     c.fillStyle='#2f2c29';c.fillRect(X+i*T+T*2-14,Y+16,10,h-20)}break;
   case 'gate':box(X+4,Y+6,w-8,h-8,'#d7dbe2',4);c.fillStyle='#1f2540';rr(c,X+w/2-40,Y-34,80,22,4);c.fill();c.fillStyle='#f5a700';c.font='800 11px "Atkinson Hyperlegible",system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText('GATE 3 ✈️',X+w/2,Y-23);
     c.fillStyle='#4a5a73';c.fillRect(X+w-10,Y-60,10,h+56);c.fillRect(X+w-10,Y-60,40,10);break;
   case 'board':box(X+4,Y-14,w-8,h+4,'#1f2540',4);c.font='700 8px "Atkinson Hyperlegible",system-ui';c.textAlign='left';c.textBaseline='middle';
     [['PARTENZE',''],['Marina di Lido','GATE 3'],['Roma','GATE 1'],['Parigi','GATE 5']].forEach(([a,b2],i)=>{c.fillStyle=i?'#f5a700':'#7ee0c3';c.fillText(a,X+12,Y-6+i*9);c.textAlign='right';c.fillText(b2,X+w-12,Y-6+i*9);c.textAlign='left'});c.textAlign='center';break;
   case 'planewin':{c.fillStyle='#4a5a73';c.fillRect(X+2,Y-30,w-4,h+22);const g=c.createLinearGradient(0,Y-26,0,Y+h-12);g.addColorStop(0,'#8fc8ea');g.addColorStop(1,'#cfe8f5');c.fillStyle=g;c.fillRect(X+6,Y-26,w-12,h+14);
     const px=X+10+((t/30+X)%(w+60))-60;c.save();c.beginPath();c.rect(X+6,Y-26,w-12,h+14);c.clip();c.fillStyle='#f4f6f8';rr(c,px,Y-4,70,10,5);c.fill();c.fillStyle='#e5484d';c.beginPath();c.moveTo(px+2,Y-4);c.lineTo(px+12,Y-4);c.lineTo(px+2,Y-16);c.closePath();c.fill();c.fillStyle='#dfe4ea';c.fillRect(px+30,Y,16,10);c.restore();
     c.fillStyle='#d7dbe2';for(let x=X+6;x<X+w;x+=T)c.fillRect(x-1,Y-26,2,h+14);break}
   default:return false;
  }
  return true;
}
