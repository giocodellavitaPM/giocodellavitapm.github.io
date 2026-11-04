/* ================= v9: il lavoro da TASSISTA: ti danno il taxi giallo della ditta, giri per la città e porti i passeggeri dove vogliono ================= */
JOBS.splice(3,0,{id:'tassista',m:'Tassista',f:'Tassista',sal:21000,min:18,req:s=>!!(s.lic&&s.lic.b),rt:'Patente B (auto)'});
if(typeof JOBHRS!=='undefined')JOBHRS.tassista=[8,20,'Giri per la città con il taxi giallo e porti le persone dove vogliono'];
if(typeof WORKAT!=='undefined')WORKAT.tassista='auto';
if(typeof WORKTXT!=='undefined')WORKTXT.tassista='Hai lavato e controllato il taxi: è pronto per le corse! 🚕';
if(typeof JOBDESC!=='undefined')JOBDESC.tassista='Faccio il tassista: porto le persone in giro per la città con il mio taxi giallo! 🚕';
// il taxi della ditta: non si compra, te lo danno quando ti assumono
ALLITEMS.push({id:'taxi9',n:'Taxi della ditta',ic:'🚕',p:0,age:18,lic:'b',up:0,fel:0,veh:true,speed:2.5,ride:true,job9:1});
SHAPE.taxi9='city';
const isTassista9=()=>!!(S&&S.job&&S.job.id==='tassista');
const inTaxi9=()=>{try{return !!(S&&S.ride&&!S.drive&&!S.famDrive&&(bestRide()||{}).id==='taxi9')}catch(e){return false}};
function tx9Sync(){if(!S||!S.items)return;const has=S.items.some(i=>i.id==='taxi9');
  if(isTassista9()&&!has){S.items.push({id:'taxi9',n:'Taxi della ditta',ic:'🚕',p:0,up:0,veh:true,speed:2.5,col:'#f2c21a'});save()}
  else if(!isTassista9()&&has){if(inTaxi9()){S.ride=false;ui.car=null}if(S.parked&&S.parked.id==='taxi9')S.parked=null;if(S.rideSel==='taxi9')S.rideSel=null;S.items=S.items.filter(i=>i.id!=='taxi9');save();updateHud()}}
setInterval(()=>{try{tx9Sync()}catch(e){}},1500);
// vai al lavoro = sali sul taxi
function tx9Start(){tx9Sync();if(S.scene!=='citta'){toast('🚕 Esci in strada: il tuo taxi giallo ti aspetta! Poi premi di nuovo «Vai al lavoro».');return}
  const d=ALLITEMS.find(x=>x.id==='taxi9');if(inTaxi9())return toast('🚕 Sei già sul taxi! Gira per la città: chi alza la mano 🙋 vuole un passaggio.');
  if(S.ride&&isCar((bestRide()||{}).id))carOut(bestRide());if(S.ride&&!isCar((bestRide()||{}).id))S.ride=false;
  S.rideSel='taxi9';if(S.parked&&S.parked.id!=='taxi9')S.parked=null;carIn(d);if(inTaxi9()){TX9.cd=Math.min(TX9.cd,4);toast('🚕 Sei sul tuo taxi! Gira per la città: chi alza la mano 🙋 vuole un passaggio. Ogni corsa ti paga!')}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-gowork9="job"],[data-gowork]');if(!b||!isTassista9())return;e.stopPropagation();e.preventDefault();try{closeSheet()}catch(_){}tx9Start()},true);
// per il tassista i passeggeri arrivano più spesso; in moto invece nessuno ti chiede il taxi
{const _c=txCar;txCar=function(){if(typeof rideMoto9==='function'&&rideMoto9())return false;return _c.apply(this,arguments)}}
{const _d=txDone;txDone=function(g){const r=_d.apply(this,arguments);if(isTassista9()&&inTaxi9()){TX9.cd=6;S.done=S.done||{};S.tx9oggi=(S.tx9oggi||0)+1}return r}}
{const _t=txTick;txTick=function(dt){if(isTassista9()&&inTaxi9()&&!TX9.p&&!TX9.go&&TX9.cd>8)TX9.cd=8;return _t.apply(this,arguments)}}
// sul taxi c'è la scritta TAXI anche in 2D
{const _d=drawCarAt;drawCarAt=function(x,y,ang,col,stop,sh){const r=_d.apply(this,arguments);try{if(col==='#f2c21a'&&sh==='city'){const c=cx;c.save();c.translate(x*T,y*T);c.rotate(ang);c.fillStyle='#fffbe8';rr(c,-7,-4.5,12,9,2);c.fill();c.fillStyle='#1f2540';c.font='800 6px system-ui';c.textAlign='center';c.textBaseline='middle';c.rotate(Math.PI/2);c.fillText('TAXI',0,1);c.restore()}}catch(e){}return r}}
