/* ================= come in GTA: sali sulle macchine per strada… ma arriva la polizia ================= */
const JK={pol:null,far:0,t:0,car:null,el:null};
if(typeof TD_CARS!=='undefined'){TD_CARS.polizia=Object.assign({},TD_CARS.berlina,{pol:1});TD_CARS.polizia2=Object.assign({},TD_CARS.berlina,{pol:2})}
const JK_CANT=()=>!S||S.scene!=='citta'||S.drive||S.famDrive||S.ride||S.age<8||(S.escort&&S.escort.to)||ui.carPlan;
function jackNear(){if(JK_CANT())return -1;let b=-1,bd=1.7;TRAF.forEach((c,i)=>{const [x,y]=carXY(c),d=Math.hypot(x-S.pos.x,y-S.pos.y);if(d<bd){bd=d;b=i}});return b}
function jackStart(i){
  const c=TRAF[i];if(!c)return;const [x,y]=carXY(c);TRAF.splice(i,1);JK.car=c;
  S.famDrive={ang:c.o==='h'?(c.d>0?0:Math.PI):(c.d>0?Math.PI/2:-Math.PI/2),v:0,par:null,jack:{col:c.col,t9:c.t9||'berlina'}};
  S.pos={x,y};S.ride=false;ui.walk=null;updateHud();
  const who=['«Ehi! Quella è la mia macchina!»','«Fermati! Torna qui con la mia auto!»','«Aiuto! Chiamo la polizia!»'][Math.floor(Math.random()*3)];
  toast(`🚗 Sei salit${o()} su una macchina che non è tua! Il proprietario urla: ${who} 🚨 Arriva la polizia: scappa o ti fanno la multa!`);
  jackWanted();
}
function jackWanted(){if(JK.pol)return;JK.far=0;JK.t=0;
  // la volante parte da una strada a una certa distanza
  const px=Math.floor(S.pos.x),py=Math.floor(S.pos.y);let best=null;
  for(let k=0;k<400&&!best;k++){const a=Math.random()*Math.PI*2,r=11+Math.random()*6,x=Math.floor(px+Math.cos(a)*r),y=Math.floor(py+Math.sin(a)*r);if(x>1&&y>1&&x<W-2&&y<H-2&&at(x,y)===1)best=[x+.5,y+.5]}
  if(!best)best=[S.pos.x+12,S.pos.y];JK.pol={x:best[0],y:best[1],ang:0,path:[],rt:0}}
// strada più corta fino a te (la polizia con la sirena può andare in tutte e due le corsie)
function jackRoute(sx,sy,tx,ty){const prev=new Int32Array(W*H).fill(-1),q=[sy*W+sx];prev[q[0]]=q[0];let qi=0,hit=-1;
  while(qi<q.length&&qi<9000){const c=q[qi++],x=c%W,y=(c/W)|0;if(Math.abs(x-tx)+Math.abs(y-ty)<=2){hit=c;break}
    for(const [mx,my] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+mx,ny=y+my;if(nx<0||ny<0||nx>=W||ny>=H||at(nx,ny)!==1)continue;const k=ny*W+nx;if(prev[k]!==-1)continue;prev[k]=c;q.push(k)}}
  if(hit<0)return [];const p=[];let c=hit;while(prev[c]!==c){p.unshift([c%W+.5,((c/W)|0)+.5]);c=prev[c]}return p}
function jackTick(dt){
  const P=JK.pol;if(!P)return;if(S.scene!=='citta'){jackClear();return}
  P.rt-=dt;if(P.rt<=0||!P.path.length){P.rt=.7;P.path=jackRoute(Math.floor(P.x),Math.floor(P.y),Math.floor(S.pos.x),Math.floor(S.pos.y))}
  const d=Math.hypot(S.pos.x-P.x,S.pos.y-P.y);JK.t+=dt;
  if(JK.t<3){}else if(P.path.length){const [tx,ty]=P.path[0],dx=tx-P.x,dy=ty-P.y,l=Math.hypot(dx,dy),sp=(S.famDrive?5.4:4.2)*dt;if(l<=sp){P.x=tx;P.y=ty;P.path.shift()}else{P.x+=dx/l*sp;P.y+=dy/l*sp;P.ang=Math.atan2(dy,dx)}}
  else if(d<4){const sp=4*dt;P.x+=(S.pos.x-P.x)/d*sp*.6;P.y+=(S.pos.y-P.y)/d*sp*.6}
  JK.far=d>20?JK.far+dt:0;
  if(d<1.4)return jackCaught();
  if(JK.far>10||JK.t>120){jackClear();toast('😅 La polizia ha perso le tue tracce! Le sirene si allontanano…')}
}
function jackClear(){JK.pol=null;JK.far=0;JK.t=0;jackHud()}
function jackGiveBack(){const c=JK.car;JK.car=null;if(c){c.p=Math.random()*((c.o==='h'?W:H)-6)+3;c.stop=false;TRAF.push(c)}}
function jackOut(force){
  const d=S.famDrive;if(!d||!d.jack)return false;if(!force&&Math.abs(d.v)>.5){toast('Prima fermati! Togli il dito un attimo.');return true}
  let best=null;const px=S.pos.x,py=S.pos.y;
  for(let y=Math.floor(py)-3;y<=Math.floor(py)+3;y++)for(let x=Math.floor(px)-3;x<=Math.floor(px)+3;x++){const v=at(x,y);if(!(v===2||v===6||v===7||v===0)||drivable(x+.5,y+.5))continue;const dd=Math.hypot(x+.5-px,y+.5-py);if(!best||dd<best[2])best=[x+.5,y+.5,dd]}
  if(!best&&!force){toast('Qui non puoi scendere: accosta vicino al marciapiede.');return true}
  S.famDrive=null;if(best)S.pos={x:best[0],y:best[1]};jackGiveBack();updateHud();
  if(!force)toast(JK.pol?'🚶 Sei scesa dalla macchina… ma la polizia ti cerca ancora! 🚨'.replace('scesa','sces'+o()):'🚶 Hai lasciato la macchina: tornerà al suo proprietario.');
  return true}
function jackCaught(){
  const inCar=S.famDrive&&S.famDrive.jack;jackClear();if(inCar)jackOut(true);
  S.st&&(S.stole9=(S.stole9||0)+1);
  multa(inCar?'hai preso una macchina che non era tua! La macchina torna al suo proprietario.':'prima hai preso una macchina che non era tua!',300);
  if(S.age<14)toast('👮 L\'agente Sara: «Le macchine degli altri non si prendono! Stavolta ti lascio andare.»');
}
function jackHud(){
  if(!JK.el){JK.el=document.createElement('div');JK.el.id='wanted9';JK.el.style.cssText='position:fixed;left:50%;top:calc(env(safe-area-inset-top,0px) + 200px);transform:translateX(-50%);z-index:30;background:rgba(15,20,40,.86);color:#fff;font:700 14px system-ui;padding:6px 12px;border-radius:14px;pointer-events:none;box-shadow:0 2px 8px #0005;white-space:nowrap';document.body.appendChild(JK.el)}
  const on=!!JK.pol&&S&&S.scene==='citta';JK.el.hidden=!on;JK.el.style.display=on?'block':'none';
  if(on){const b=(performance.now()/300|0)%2;JK.el.innerHTML=`<span style="color:${b?'#4d8bff':'#ff4d4d'}">🚨</span> La polizia ti cerca! ⭐⭐ <span style="opacity:.75;font-weight:500">${JK.far>0?'Stai scappando…':'Scappa lontano!'}</span>`}}
{const _s=step;step=function(dt){_s(dt);if(!S||!S.alive)return;const busy=isBusy();
  if(!busy)jackTick(dt);jackHud();
  if(!busy&&!S.famDrive&&!S.drive){const i=jackNear();if(i>=0&&(!near||near.type!=='npc')){near={type:'jack',ic:'🚗',label:'Prendi la macchina',sub:'Come in GTA… ma arriva la polizia! 🚨'};const ab=$('actBtn');ab.hidden=false;ab.innerHTML=`${near.ic} ${near.label}<small>${esc(near.sub)}</small>`}}
  if(S.famDrive&&S.famDrive.jack&&!busy){const ab=$('actBtn');ab.innerHTML=`🚪 Scendi<small>Lascia la macchina</small>`}}}
{const _d=doAction;doAction=function(){if(S&&S.famDrive&&S.famDrive.jack)return jackOut();if(near&&near.type==='jack'){const i=jackNear();if(i>=0)return jackStart(i)}return _d()}}
{const _p=drawPlayer;drawPlayer=function(t){
  if(S.famDrive&&S.famDrive.jack){const j=S.famDrive.jack;drawCarAt(S.pos.x,S.pos.y,S.famDrive.ang,j.col,!S.moving,{suv:'suv',furgone:'van',sportiva:'sport',utilitaria:'city'}[j.t9]||'wagon')}else _p(t);
  const P=JK.pol;if(P&&S.scene==='citta'){drawCarAt(P.x,P.y,P.ang,'#f4f6f8',false,'wagon');const b=(performance.now()/180|0)%2,X=P.x*T,Y=P.y*T,g=cx.createRadialGradient(X,Y,2,X,Y,40);
    g.addColorStop(0,b?'rgba(80,140,255,.85)':'rgba(255,70,70,.85)');g.addColorStop(1,'rgba(0,0,0,0)');cx.fillStyle=g;cx.beginPath();cx.arc(X,Y,40,0,7);cx.fill();
    cx.font='18px system-ui';cx.textAlign='center';cx.fillText('🚓',X,Y-22)}}}
/* sul computer: Ctrl + Alt + Maiuscolo + V apre subito il pannello segreto di Viola */
addEventListener('keydown',e=>{if(e.ctrlKey&&e.altKey&&e.shiftKey&&e.code==='KeyV'&&S&&S.alive&&$('screen').hidden){e.preventDefault();e.stopPropagation();if(ui.chatNpc)closeChat();cheatReply({id:'asi1'},'maldi')}},true);
// con la macchina presa per strada niente multe (rosso compreso): paghi solo se ti prende la polizia
{const _m=multa;multa=function(why,amt){if(S&&S.famDrive&&S.famDrive.jack&&!ui.jackFine)return;return _m(why,amt)}}
{const _c=jackCaught;jackCaught=function(){ui.lastFine=-1e9;ui.jackFine=1;try{_c()}finally{ui.jackFine=0}}}
