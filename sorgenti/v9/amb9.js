/* ================= v9: la città è viva come in GTA: ogni tanto passa un'ambulanza o i pompieri con la sirena + lo schermo grigio quando ti prende la polizia ================= */
const AM9={c:null,t:0,cd:70,K:null,au:null,save:null};
const AM9_K={amb:{t9:['ambulanza','ambulanza2'],col:'#f4f5f1',ic:'🚑',f:[440,587]},fire:{t9:['pompieri','pompieri2'],col:'#c81d25',ic:'🚒',f:[392,523]}};
if(typeof TD_CARS!=='undefined'){TD_CARS.ambulanza=Object.assign({},TD_CARS.furgone,{amb:1});TD_CARS.ambulanza2=Object.assign({},TD_CARS.furgone,{amb:2});
  TD_CARS.pompieri=Object.assign({},TD_CARS.furgone,{fire:1});TD_CARS.pompieri2=Object.assign({},TD_CARS.furgone,{fire:2})}
// il modellino 3D: il furgone bianco con la striscia rossa e la croce, o rosso con la scala, e i lampeggianti blu sul tetto
if(typeof tdCarGeo==='function'){const _g=tdCarGeo;tdCarGeo=function(type,col){const T9=TD_CARS[type]||{};if(!T9.amb&&!T9.fire)return _g.apply(this,arguments);
  const r=_g('furgone',T9.amb?'#f4f5f1':'#c81d25'),B=r.matte,LL=r.lights,on=(T9.amb||T9.fire)===1,W2=.35;
  [-1,1].forEach(s=>{B.push({g:tdBox(1.32,.06,.006),c:T9.amb?'#d62828':'#f2f2ee',p:[-.16,.36,s*(W2+.002)]});
    if(T9.amb){B.push({g:tdBox(.22,.065,.006),c:'#d62828',p:[-.38,.58,s*(W2+.002)]},{g:tdBox(.065,.22,.006),c:'#d62828',p:[-.38,.58,s*(W2+.002)]})}
    LL.push({g:tdBox(.05,.05,.06),c:(s>0)===on?'#3a7bff':'#0a1a3a',p:[-.88,.74,s*.26]})});
  LL.push({g:tdBox(.12,.05,.13),c:on?'#3a7bff':'#0a1a3a',p:[.34,.81,.08]},{g:tdBox(.12,.05,.13),c:on?'#0a1a3a':'#3a7bff',p:[.34,.81,-.08]});
  if(T9.fire){[-.13,.13].forEach(z=>B.push({g:tdBox(1.45,.03,.03),c:'#c9ced3',p:[-.2,.83,z]}));for(let x=-.88;x<=.46;x+=.13)B.push({g:tdBox(.025,.025,.26),c:'#c9ced3',p:[x,.83,0]})}
  return r}}
function amSound(d){try{if(d<0||document.hidden||!S||S.scene!=='citta'){if(AM9.au){const {o,g,ac}=AM9.au;AM9.au=null;g.gain.setTargetAtTime(0,ac.currentTime,.1);setTimeout(()=>{try{o.stop()}catch(e){}},600)}return}
  const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const ac=JK.ac||(JK.ac=new A());
  if(!AM9.au){const o=ac.createOscillator(),f=ac.createBiquadFilter(),g=ac.createGain();o.type='square';f.type='lowpass';f.frequency.value=1500;g.gain.value=0;o.connect(f);f.connect(g);g.connect(ac.destination);o.start();AM9.au={o,g,ac}}
  const {o,g}=AM9.au,F=AM9.K.f,k=Math.max(0,1-d/30);o.frequency.setTargetAtTime(F[(performance.now()/650|0)%2],ac.currentTime,.004);g.gain.setTargetAtTime(.045*k*k,ac.currentTime,.12)}catch(e){}}
function amEnd(){const c=AM9.c;if(c&&AM9.save){c.col=AM9.save.col;c.t9=AM9.save.t9}AM9.c=null;AM9.save=null;AM9.cd=110+Math.random()*120;amSound(-1)}
function amTick(dt){if(!S||!S.alive||S.scene!=='citta'||ui.mg){if(AM9.c)amEnd();return}
  if(AM9.c){const c=AM9.c;AM9.t+=dt;if(!TRAF.includes(c)){amEnd();return}c.t9=AM9.K.t9[(performance.now()/250|0)%2];const [x,y]=carXY(c),d=Math.hypot(x-S.pos.x,y-S.pos.y);
    if((AM9.t>40&&d>28)||AM9.t>120){amEnd();return}amSound(d);return}
  if(JK.pols&&JK.pols.length)return;AM9.cd-=dt;if(AM9.cd>0||isBusy())return;
  const L=TRAF.filter(c=>{const [x,y]=carXY(c),d=Math.hypot(x-S.pos.x,y-S.pos.y);return d>12&&d<24});if(!L.length){AM9.cd=10;return}
  const c=L[Math.floor(Math.random()*L.length)],K=AM9_K[Math.random()<.6?'amb':'fire'];AM9.c=c;AM9.K=K;AM9.t=0;AM9.save={col:c.col,t9:c.t9};c.col=K.col;c.t9=K.t9[0];
  if(!S.amb9){S.amb9=1;toast(`${K.ic} Senti la sirena? Sta passando ${K===AM9_K.amb?'un\'ambulanza':'il camion dei pompieri'}: in città c'è sempre qualcosa che succede!`)}}
{const _s=step;step=function(dt){const r=_s(dt);try{amTick(dt)}catch(e){}return r}}
document.addEventListener('visibilitychange',()=>{if(document.hidden)amSound(-1)});
// in 2D: le strisce, la croce o la scala e i lampeggianti blu
{const _p=drawCarAt;drawCarAt=function(x,y,a,col){const r=_p.apply(this,arguments);try{const C=AM9.c;if(!C||col!==AM9.K.col||ui.td9bake||S.scene!=='citta')return r;const [cx0,cy0]=carXY(C);if(Math.abs(cx0-x)>.05||Math.abs(cy0-y)>.05)return r;const c=cx,L=T*1.7,Wc=24,b=(performance.now()/180|0)%2;
  c.save();c.translate(x*T,y*T);c.rotate(a);if(AM9.K===AM9_K.amb){c.fillStyle='#d62828';c.fillRect(-L/2+4,-Wc/2+.5,L-8,3);c.fillRect(-L/2+4,Wc/2-3.5,L-8,3);c.fillRect(-L*.22-7,-2,14,4);c.fillRect(-L*.22-2,-7,4,14)}
  else{c.strokeStyle='#d9dde2';c.lineWidth=2;c.beginPath();c.moveTo(-L/2+5,-5);c.lineTo(L*.18,-5);c.moveTo(-L/2+5,5);c.lineTo(L*.18,5);for(let k=-L/2+8;k<L*.18;k+=7){c.moveTo(k,-5);c.lineTo(k,5)}c.stroke()}
  c.fillStyle=b?'#3a7bff':'#0f2a66';c.fillRect(L*.2,-Wc/2+4,6,Wc/2-4);c.fillStyle=b?'#0f2a66':'#3a7bff';c.fillRect(L*.2,0,6,Wc/2-4);c.restore();
  const X=x*T,Y=y*T,g=c.createRadialGradient(X,Y,2,X,Y,38);g.addColorStop(0,b?'rgba(80,140,255,.7)':'rgba(80,140,255,.25)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.beginPath();c.arc(X,Y,38,0,7);c.fill();
  c.font='18px system-ui';c.textAlign='center';c.fillText(AM9.K.ic,X,Y-22)}catch(e){}return r}}
// in 3D: di notte il lampeggiante blu illumina la strada
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{const C=AM9.c;if(!TD.amL){TD.amL=new THREE.PointLight(0x3a6bff,0,6,1.5)}
  if(city&&C){const [x,y]=carXY(C);if(TD.amL.parent!==scn)scn.add(TD.amL);TD.amL.intensity=(TD.time*4|0)%2?1.5:.2;TD.amL.position.set(x,1.2,y)}else if(TD.amL.intensity)TD.amL.intensity=0}catch(e){}return r}}
// PRESO! come in GTA: lo schermo diventa grigio per un attimo
{const _c=jackCaught;jackCaught=function(){const r=_c.apply(this,arguments);try{const els=[cv,typeof TD!=='undefined'&&TD.R&&TD.R.domElement].filter(Boolean);
  els.forEach(e=>{e.style.transition='filter .35s';e.style.filter='grayscale(1) contrast(1.12) brightness(.85)'});clearTimeout(AM9.gt);AM9.gt=setTimeout(()=>els.forEach(e=>{e.style.filter=''}),2600)}catch(e){}return r}}
