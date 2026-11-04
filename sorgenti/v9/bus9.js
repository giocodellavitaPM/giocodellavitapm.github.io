/* ================= v9: gli autobus arancioni della città (lunghi, con i finestrini e il numero della linea) ================= */
if(typeof TD_CARS!=='undefined')TD_CARS.autobus={wr:.15,b:[[-1.26,.17,.9,.33],[-1.24,.13,.97,.37],[-1.1,.12,.99,.375],[1.1,.12,.99,.375],[1.24,.13,.97,.37],[1.27,.17,.9,.33]],
  g:[[-1.16,.5,.86,.388],[-1.1,.5,.87,.388],[1.1,.5,.87,.388],[1.16,.5,.86,.388]],noRoof:1};
const BUS9={L:[],col:'#ee7a1e'};
(function(){if(typeof TRAF==='undefined')return;TRAF.forEach((c,i)=>{if(i%9===4){c.bus9=1;c.t9='autobus';c.col=BUS9.col;BUS9.L.push(c)}})})();
// la parte 3D: il furgone "lungo" più vetri davanti e dietro, la porta, il tetto bianco e il display della linea
if(typeof tdCarGeo==='function'){const _g=tdCarGeo;tdCarGeo=function(type,col){const r=_g.apply(this,arguments);if(type!=='autobus')return r;try{const B=r.matte,LL=r.lights;
  B.push({g:tdBox(.02,.38,.62),c:'#1a2630',p:[1.272,.68,0]},{g:tdBox(.02,.3,.58),c:'#1a2630',p:[-1.262,.7,0]},{g:tdBox(2.3,.04,.6),c:'#f4f4f0',p:[0,.995,0]});
  [-.6,.2].forEach(x=>B.push({g:tdBox(.5,.08,.36),c:'#d9dcdf',p:[x,1.03,0]}));
  [[.95,'#1a2630'],[-.15,'#1a2630']].forEach(([x,c])=>B.push({g:tdBox(.42,.68,.006),c,p:[x,.47,.382]},{g:tdBox(.005,.66,.008),c:'#9aa0a6',p:[x,.47,.386]}));
  B.push({g:tdBox(2.3,.05,.006),c:'#ffffff',p:[0,.3,.377]},{g:tdBox(2.3,.05,.006),c:'#ffffff',p:[0,.3,-.377]});
  LL.push({g:tdBox(.015,.07,.4),c:'#ffb020',p:[1.28,.905,0]});return r}catch(e){return r}}}
// in 2D: il tetto bianco con le prese d'aria, il parabrezza e le strisce
{const _d=drawCarAt;drawCarAt=function(x,y,ang,col,stop,sh){if(col!==BUS9.col||sh)return _d.apply(this,arguments);let me=null;for(const c of BUS9.L){const [bx,by]=carXY(c);if(Math.abs(bx-x)<.05&&Math.abs(by-y)<.05){me=c;break}}
  if(!me)return _d.apply(this,arguments);const c=cx,L=T*2.6,Wc=27;c.save();c.translate(x*T,y*T);c.rotate(ang);
  c.fillStyle='rgba(0,0,0,.25)';rr(c,-L/2+3,-Wc/2+4,L,Wc,6);c.fill();c.fillStyle=col;rr(c,-L/2,-Wc/2,L,Wc,6);c.fill();
  c.fillStyle='#f4f4f0';rr(c,-L/2+5,-Wc/2+3,L-12,Wc-6,4);c.fill();c.fillStyle='#d2d6da';c.fillRect(-L*.28,-6,22,12);c.fillRect(L*.08,-6,22,12);
  c.fillStyle='#1a2630';rr(c,L/2-7,-Wc/2+2,6,Wc-4,2);c.fill();c.fillRect(-L/2+1,-Wc/2+4,3,Wc-8);
  c.fillStyle=stop?'#ff3b30':'#8a1c1c';c.fillRect(-L/2,-Wc/2+2,2,4);c.fillRect(-L/2,Wc/2-6,2,4);c.fillStyle='#fff6cc';c.fillRect(L/2-2,-Wc/2+2,2,4);c.fillRect(L/2-2,Wc/2-6,2,4);
  c.restore();c.save();c.translate(x*T,y*T);c.font='14px system-ui';c.textAlign='center';c.fillText('🚌',0,-Wc/2-4);c.restore()}}
// il fianco dell'autobus è piatto: con la vernice lucida delle macchine rifletteva una striscia chiara lunga lunga; qui la vernice è più opaca
{const _c=tdCar;tdCar=function(col,type){const g=_c.apply(this,arguments);try{if(type==='autobus'){const m=g.children[0];if(m&&m.material===tdPaintM){if(!TD.busM){TD.busM=tdPaintM.clone();TD.busM.metalness=.12;TD.busM.roughness=.62}m.material=TD.busM}}}catch(e){}return g}}
// ---- le fermate (le stesse del 3D): l'autobus si ferma qualche secondo, e tu puoi salire e scegliere dove andare
function busStops9(){if(BUS9.stops)return BUS9.stops;const L=[],busy=new Set();LAMPS.forEach(([x,y])=>busy.add(Math.floor(x)+','+Math.floor(y)));BENCHES.forEach(([x,y])=>busy.add(x+','+y));
  const corner=(x,y)=>RX.some(c=>x>=c-2&&x<=c+3)&&RY.some(r=>y>=r-2&&y<=r+3);let lx=-99,ly=-99;
  for(let y=2;y<H-2;y++)for(let x=2;x<W-2;x++){if(at(x,y)!==2||corner(x,y)||busy.has(x+','+y)||(typeof inMZ==='function'&&inMZ(x,y)))continue;
    const d=at(x,y+1)===1?[0,1]:at(x,y-1)===1?[0,-1]:at(x+1,y)===1?[1,0]:at(x-1,y)===1?[-1,0]:null;if(!d)continue;const bk=at(x-d[0],y-d[1]);if(bk===6||at(x+d[1],y+d[0])===6||at(x-d[1],y-d[0])===6)continue;
    const r=h9r(x,y,3);if(r>=.14&&r<.2&&bk!==4&&L.every(q=>Math.abs(q.x-.5-x)+Math.abs(q.y-.5-y)>10)){L.push({x:x+.5,y:y+.5,d});lx=x;ly=y}}
  return BUS9.stops=L}
// in mezzo al traffico: l'autobus che passa davanti a una fermata dalla sua parte si ferma 4 secondi
function busLaneStop(c,p0){const [x,y]=carXY(c),p1=c.p,lo=Math.min(p0,p1)-.15,hi=Math.max(p0,p1)+.15;if(Math.abs(p1-p0)>4)return null;
  for(const s of busStops9()){if(c.o==='h'){if(!s.d[1])continue;const lane=s.d[1]<0?1:-1;if(c.d!==lane||Math.abs(s.y+s.d[1]-y)>.6||s.x<lo||s.x>hi)continue;return s}
    else{if(!s.d[0])continue;const lane=s.d[0]<0?-1:1;if(c.d!==lane||Math.abs(s.x+s.d[0]-x)>.6||s.y<lo||s.y>hi)continue;return s}}return null}
{const _t=trafficTick;trafficTick=function(dt){const keep=BUS9.L.filter(c=>c.dwell>0).map(c=>[c,c.p]),pre=new Map(BUS9.L.map(c=>[c,c.p]));const r=_t.apply(this,arguments);try{
  keep.forEach(([c,p])=>{c.p=p;c.stop=true;c.dwell-=dt;if(c.dwell<=0){c.dwell=0;c.left=1.2}});
  BUS9.L.forEach(c=>{if(c.dwell>0)return;if(c.left>0){c.left-=dt;return}if(c.t9!=='autobus')return;const s=busLaneStop(c,pre.get(c));if(s){c.dwell=4;c.atStop=s;c.p=c.o==='h'?s.x:s.y;c.stop=true}})}catch(e){}return r}}
// salire sull'autobus alla fermata
const busNearStop=()=>{if(!S||S.scene!=='citta'||S.age<6||S.drive||S.famDrive||S.ride||(S.escort&&S.escort.to))return null;let b=null,bd=1.25;for(const s of busStops9()){const d=Math.hypot(s.x-S.pos.x,s.y-S.pos.y);if(d<bd){bd=d;b=s}}return b};
{const _f=findNear;findNear=function(){const r=_f.apply(this,arguments);try{const s=busNearStop();if(r&&!(s&&r.type==='npc'&&(n=>n&&Math.hypot(n.x-S.pos.x,n.y-S.pos.y)>Math.hypot(s.x-S.pos.x,s.y-S.pos.y)+.15)(NPCS.find(n=>n.id===r.id))))return r;if(s)return {type:'bus9',ic:'🚌',label:'Prendi l\'autobus',sub:S.age<10?'I bambini viaggiano gratis!':'Biglietto 2 €'}}catch(e){}return r}}
{const _d=doAction;doAction=function(){if(near&&near.type==='bus9'){busPick();return}return _d.apply(this,arguments)}}
function busPick(){let e=$('bus9pick');if(!e){e=document.createElement('div');e.id='bus9pick';e.style.cssText='position:fixed;inset:0;z-index:57;background:rgba(10,14,28,.55);display:flex;align-items:flex-end;justify-content:center';document.body.appendChild(e);
    e.addEventListener('click',ev=>{const b=ev.target.closest('[data-bus]');if(ev.target===e||ev.target.closest('[data-busx]')){e.style.display='none';ui.bus9=0;return}if(b){e.style.display='none';ui.bus9=0;busGo(b.dataset.bus)}})}
  const here=busNearStop(),L=BUILD.filter(b=>b.ic&&destXY(b.id)&&!/^casa\d/.test(b.id)).map(b=>{const d=destXY(b.id);return [b,here?Math.hypot(d[0]-here.x,d[1]-here.y):0]}).filter(a=>a[1]>8).sort((a,b)=>a[0].n.localeCompare(b[0].n));
  e.innerHTML=`<div style="background:#fffdf7;width:min(560px,100%);max-height:78vh;border-radius:22px 22px 0 0;padding:14px 14px calc(14px + env(safe-area-inset-bottom,0px));box-shadow:0 -6px 24px #0006;display:flex;flex-direction:column">
   <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><span style="font-size:34px">🚌</span><div style="flex:1"><div style="font:800 19px 'Baloo 2',system-ui;color:#1f2540">Dove vuoi andare?</div><div style="font:500 13px system-ui;color:#555">${S.age<10?'I bambini viaggiano gratis!':'Biglietto: 2 €'} · l'autobus ti lascia alla fermata più vicina</div></div><button data-busx style="border:0;background:#eee;border-radius:12px;width:40px;height:40px;font-size:18px">✕</button></div>
   <div style="overflow:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px">${L.map(([b,d])=>`<button data-bus="${b.id}" style="text-align:left;border:2px solid #e6dfcf;background:#fff;border-radius:14px;padding:9px 10px;font:700 14px system-ui;color:#1f2540">${b.ic} ${esc(b.n)}<div style="font:500 11px system-ui;color:#777">${Math.max(2,Math.round(d/6))} min</div></button>`).join('')}</div></div>`;
  e.style.display='flex';ui.bus9=2}
function busGo(id){const d=destXY(id),b=BUILD.find(x=>x.id===id);if(!d||!b)return;const here=busNearStop();let best=null,bd=1e9;for(const s of busStops9()){const k=Math.hypot(s.x-d[0]-.5,s.y-d[1]-.5);if(k<bd&&(!here||s!==here)){bd=k;best=s}}if(!best)return;
  const pay=S.age>=10;if(pay&&S.money<2&&!(typeof parCovers==='function'&&parCovers(2))){toast('🎫 Non hai abbastanza soldi per il biglietto (2 €).');return}if(pay)money(-2);
  const min=Math.max(4,Math.round(Math.hypot(best.x-S.pos.x,best.y-S.pos.y)/6));let f=$('bus9fade');if(!f){f=document.createElement('div');f.id='bus9fade';f.style.cssText='position:fixed;inset:0;z-index:58;background:#0b1020;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;font:800 22px "Baloo 2",system-ui;text-align:center;pointer-events:none;opacity:0;transition:opacity .4s;padding:20px';document.body.appendChild(f)}
  f.innerHTML=`<div style="font-size:60px">🚌</div><div>Sei sull'autobus…</div><div style="font:600 15px system-ui;opacity:.85">Prossima fermata: ${b.ic} ${esc(b.n)}</div>`;f.style.display='flex';requestAnimationFrame(()=>f.style.opacity='1');ui.bus9=1;
  setTimeout(()=>{try{S.pos={x:best.x,y:best.y};ui.walk=null;ui.mark=null;S.clock=(S.clock||0)+min;S.bus9=(S.bus9||0)+1;if(typeof TD!=='undefined')TD.snap=1;updateHud();save()}catch(e){}
    f.style.opacity='0';setTimeout(()=>{f.style.display='none';ui.bus9=0},450);toast(`🚏 Sei arrivat${o()} alla fermata vicino a ${b.ic} ${b.n}! (${min} minuti di viaggio${pay?' · biglietto 2 €':''})`)},1900)}
{const _b=isBusy;isBusy=function(){return _b.apply(this,arguments)||!!ui.bus9}}
// in 2D: il palo blu della fermata
{const _dc=drawCity;drawCity=function(t,x0,y0,x1,y1){_dc.apply(this,arguments);try{if(ui.td9bake||S.scene!=='citta')return;const c=cx;for(const s of busStops9()){if(s.x<x0-1||s.x>x1+2||s.y<y0-1||s.y>y1+2)continue;const X=(s.x+(s.d[0]?0:.42))*T,Y=(s.y+(s.d[0]?.42:0)+.15)*T;
  c.fillStyle='#2b3036';c.fillRect(X-1.5,Y-26,3,26);c.fillStyle='#1d5fd0';c.beginPath();c.arc(X,Y-28,9,0,7);c.fill();c.strokeStyle='#fff';c.lineWidth=2;c.stroke();c.fillStyle='#fff';c.font='900 10px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText('BUS',X,Y-27.5)}}catch(e){}}}
// sulla minimappa le fermate vicine
{const _g=gtaMini;gtaMini=function(){const r=_g.apply(this,arguments);try{const box=$('mm9');if(box&&!box.hidden&&S.scene==='citta'&&!(typeof rdInCar==='function'&&rdInCar())){const c=box.querySelector('canvas').getContext('2d');
  for(const s of busStops9()){if(Math.abs(s.x-S.pos.x)>32||Math.abs(s.y-S.pos.y)>32)continue;const [X,Y]=mmXY(s.x,s.y);if(X<8||Y<8||X>292||Y>292)continue;c.fillStyle='#1d5fd0';c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();c.arc(X,Y,8,0,7);c.fill();c.stroke()}}}catch(e){}return r}}
