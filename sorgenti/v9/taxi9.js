/* ================= v9: le corse in taxi come in GTA: quando guidi la tua macchina qualcuno ti fa segno 🙋, lo porti dove vuole e ti paga ================= */
const TX9={p:null,go:null,cd:25,rt:0,route:null,spr:null};
const TX9_WHO=[['🙋‍♀️','la signora Anna',1,45],['🙋‍♂️','il signor Paolo',0,50],['🙋‍♀️','Giulia',1,22],['🧓','nonno Beppe',0,75],['👩‍⚕️','la dottoressa Neri',1,40,{shirt:'#ffffff'}],['👨‍🍳','il cuoco Luigi',0,35,{shirt:'#ffffff'}],['👵','nonna Lina',1,78],['🧑‍🎓','lo studente Marco',0,20]];
const txCap=s=>s.charAt(0).toUpperCase()+s.slice(1);
function txCar(){return !!(S&&S.alive&&S.age>=18&&S.scene==='citta'&&!ui.mg&&!ui.flying&&!S.drive&&((S.famDrive&&!S.famDrive.jack)||(S.ride&&typeof bestRide==='function'&&isCar((bestRide()||{}).id))))}
const txV=()=>Math.abs(S.famDrive?S.famDrive.v||0:(ui.car||{}).v||0);
const txFree=()=>!(JK.pols&&JK.pols.length)&&!(typeof MX9!=='undefined'&&MX9.on)&&!isBusy();
// chi chiama il taxi sta sul marciapiede vicino alla strada, un po' più avanti di te
function txSpawn(){const px=S.pos.x,py=S.pos.y,ang=S.famDrive?S.famDrive.ang:(ui.car||{}).ang||0;let best=null,bs=-1e9;
  for(let k=0;k<320;k++){const a=ang+(Math.random()-.5)*2.6,r=8+Math.random()*10,x=Math.floor(px+Math.cos(a)*r),y=Math.floor(py+Math.sin(a)*r);
    if(x<3||y<3||x>=W-3||y>=H-3||at(x,y)!==2)continue;const rd=[[1,0],[-1,0],[0,1],[0,-1]].find(([dx,dy])=>at(x+dx,y+dy)===1&&!inBox(x+dx+.5,y+dy+.5));if(!rd)continue;
    const s=-Math.abs(r-12)+Math.random()*3;if(s>bs){bs=s;best={x:x+.5,y:y+.5,rx:x+rd[0],ry:y+rd[1]}}}
  if(!best)return false;const w=TX9_WHO[Math.floor(Math.random()*TX9_WHO.length)];TX9.p=Object.assign(best,{ic:w[0],nm:w[1],t:0,lk:lookFor('taxi'+w[1],!!w[2],w[3],w[4])});TX9.route=null;TX9.rt=0;
  toast(`🚕 ${txCap(w[1])} ti fa segno ${w[0]}: vuole un passaggio! Segui la strada viola e fermati lì vicino.`);return true}
function txPick(){const P=TX9.p,from=[P.rx,P.ry];TX9.p=null;
  const L=BUILD.filter(b=>!['casa','casamia','citta'].includes(b.id)&&!/^casa\d/.test(b.id)).map(b=>[b,destXY(b.id)]).filter(([b,d])=>d&&Math.hypot(d[0]-from[0],d[1]-from[1])>15&&Math.hypot(d[0]-from[0],d[1]-from[1])<45).map(([b,d])=>[b,d,nearRoad(d[0],d[1])]).filter(a=>a[2].length);
  if(!L.length){toast(`🙂 ${txCap(P.nm)}: «Ah no, scusa, ho cambiato idea!»`);TX9.cd=30;return}
  const [b,d,tl]=L[Math.floor(Math.random()*L.length)];let x=0,y=0;tl.forEach(a=>{x+=a[0]+.5;y+=a[1]+.5});
  const dist=Math.abs(d[0]-from[0])+Math.abs(d[1]-from[1]),max=Math.round(22+dist*1.25),pay=Math.round(15+dist*1.1);
  TX9.go={ic:P.ic,nm:P.nm,to:b.ic+' '+b.n,x:x/tl.length,y:y/tl.length,tiles:tl,t:0,max,pay,warn:0};TX9.route=null;TX9.rt=0;tipT=0;
  toast(`🚕 ${txCap(P.nm)} sale in macchina: «Mi porti a ${b.ic} ${b.n}? Hai ${max} secondi!» ⏱️`)}
function txText(){if(TX9.go){const g=TX9.go,s=Math.max(0,Math.ceil(g.max-g.t));return `🚕 Porta ${g.nm} a ${g.to} · ⏱️ ${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`}
  if(TX9.p)return `🚕 ${txCap(TX9.p.nm)} ${TX9.p.ic} aspetta il taxi: fermati vicino!`;return ''}
function txDone(g){TX9.go=null;tipT=0;const bonus=g.max-g.t>g.max/2?10:0,tot=g.pay+bonus;money(tot);add('fel',3);S.taxi9=(S.taxi9||0)+1;save();updateHud();TX9.cd=25;
  if(typeof gtaPassed==='function')gtaPassed('CORSA COMPLETATA!',`${txCap(g.nm)} ti paga ${tot} €${bonus?' (con la mancia!)':''} 🚕`);else toast(`🚕 Corsa fatta! +${tot} €`)}
function txTick(dt){if(!S||!S.alive)return;
  if(!txCar()){const g=TX9.go;if(g){if(S.scene==='citta'&&Math.hypot(S.pos.x-g.x,S.pos.y-g.y)<3.6)txDone(g);else{TX9.go=null;tipT=0;toast('🚕 Il passeggero scende: «Grazie lo stesso, vado a piedi!»')}}
    if(TX9.p){TX9.p.t+=dt;if(S.scene!=='citta'||TX9.p.t>70)TX9.p=null}return}
  if(ui.mg||isBusy())return;const tip=$('tip');
  if(TX9.go){const g=TX9.go;g.t+=dt;if(tip&&tip.textContent!==txText())tip.textContent=txText();
    if(Math.hypot(S.pos.x-g.x,S.pos.y-g.y)<2.4&&txV()<.8)return txDone(g);
    if(!g.warn&&g.max-g.t<10){g.warn=1;toast('⏰ Mancano 10 secondi! Il passeggero ha fretta!')}
    if(g.t>=g.max){TX9.go=null;tipT=0;TX9.cd=35;toast(`⏰ Troppo tardi! ${txCap(g.nm)} scende: «Vado a piedi, ciao!»`)}return}
  if(TX9.p){const P=TX9.p;P.t+=dt;if(tip&&tip.textContent!==txText())tip.textContent=txText();
    if(Math.hypot(S.pos.x-(P.rx+.5),S.pos.y-(P.ry+.5))<2.1&&txV()<.8){txPick();return}
    if(P.t>70||Math.hypot(S.pos.x-P.x,S.pos.y-P.y)>45){TX9.p=null;tipT=0;TX9.cd=40}return}
  if(!txFree())return;TX9.cd-=dt;if(TX9.cd<=0&&txV()>1){if(!txSpawn())TX9.cd=8}}
{const _s=step;step=function(dt){const r=_s(dt);try{txTick(dt);
  // in macchina il suggerimento in alto non si aggiornava più: ora sì
  if(S&&S.alive&&S.scene==='citta'&&!S.drive&&(S.famDrive||(S.ride&&isCar((bestRide()||{}).id)))&&!isBusy()){tipT-=dt;if(tipT<=0){tipT=6;$('tip').textContent=hintText()}}}catch(e){}return r}}
{const _h=hintText;hintText=function(){const t=txCar()?txText():'';return t||_h.apply(this,arguments)}}
// il navigatore: prima da chi aspetta, poi dove vuole andare
{const _g=gpsCalc;gpsCalc=function(dt){_g(dt);try{if(GPS9.route||!txCar()||!(TX9.p||TX9.go))return;const g=TX9.go,ends=g?g.tiles:[[TX9.p.rx,TX9.p.ry]];GPS9.goal=g?[g.x-.5,g.y-.5]:[TX9.p.rx,TX9.p.ry];
  TX9.rt-=dt;if(TX9.rt>0&&TX9.route){GPS9.route=TX9.route;return}TX9.rt=.6;const fx=Math.floor(S.pos.x),fy=Math.floor(S.pos.y),st=at(fx,fy)===1?[[fx,fy]]:nearRoad(fx,fy),r=st.length?roadRoute(st,ends):null;
  TX9.route=GPS9.route=r?[[S.pos.x-.5,S.pos.y-.5],...r]:null}catch(e){}}}
// sulla minimappa la persona che aspetta
{const _g=gtaMini;gtaMini=function(){const r=_g.apply(this,arguments);try{const box=$('mm9');if(TX9.p&&box&&!box.hidden&&S.scene==='citta'){const c=box.querySelector('canvas').getContext('2d');let [X,Y]=mmXY(TX9.p.x,TX9.p.y);X=Math.max(16,Math.min(284,X));Y=Math.max(16,Math.min(284,Y));
  c.fillStyle='#ffd23a';c.strokeStyle='#1d1d1d';c.lineWidth=3;c.beginPath();c.arc(X,Y,16,0,7);c.fill();c.stroke();c.font='20px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText('🙋',X,Y+1)}}catch(e){}return r}}
// in 2D: la persona che fa ciao con il cartello TAXI
{const _dc=drawCity;drawCity=function(t,x0,y0,x1,y1){_dc.apply(this,arguments);try{if(!TX9.p||ui.td9bake||S.scene!=='citta')return;const P=TX9.p,c=cx,X=P.x*T,Y=P.y*T,b=Math.abs(Math.sin(performance.now()/260))*5;
  c.strokeStyle='rgba(255,210,58,.9)';c.lineWidth=4;c.setLineDash([8,6]);c.beginPath();c.arc((P.rx+.5)*T,(P.ry+.5)*T,T*.9,0,7);c.stroke();c.setLineDash([]);
  c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(X,Y+14,12,4,0,0,7);c.fill();c.font='30px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(P.ic,X,Y-6-b);
  c.fillStyle='#ffd23a';c.strokeStyle='#1d1d1d';c.lineWidth=2;c.fillRect(X-19,Y-44-b,38,15);c.strokeRect(X-19,Y-44-b,38,15);c.fillStyle='#1d1d1d';c.font='900 11px system-ui';c.fillText('TAXI',X,Y-36-b)}catch(e){}}}
// in 3D: la persona (un'immagine che saltella) con il cartello TAXI sopra
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{const P=TX9.p;
  if(city&&P){if(!TX9.spr||TX9.spr.ic!==P.nm){if(TX9.spr&&TX9.spr.g.parent)TX9.spr.g.parent.remove(TX9.spr.g);const g=new THREE.Group(),hu=tdHuman(P.lk),s=hu.g;s.scale.setScalar((P.lk.age==='old'?.95:1));
      const [c,x]=tdCan(128,48);x.fillStyle='#ffd23a';x.fillRect(0,0,128,48);x.strokeStyle='#1d1d1d';x.lineWidth=6;x.strokeRect(3,3,122,42);x.fillStyle='#1d1d1d';x.font='900 30px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText('TAXI',64,26);
      const tx=new THREE.CanvasTexture(c);tx.encoding=THREE.sRGBEncoding;const t2=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,depthWrite:false}));t2.scale.set(.5,.19,1);t2.position.y=1.3;g.add(s,t2);TX9.spr={g,s,t2,hu,ic:P.nm}}
    const S2=TX9.spr,tt=TD.time||0;if(S2.g.parent!==scn)scn.add(S2.g);S2.g.position.set(P.x,0,P.y);S2.s.rotation.y=-Math.atan2(P.ry+.5-P.y,P.rx+.5-P.x);
    // fa ciao con il braccio
    const A=S2.hu.arms;if(A&&A[1])A[1].rotation.x=-(2.55+Math.sin(tt*9)*.35);if(A&&A[0])A[0].rotation.x=.08;S2.t2.position.y=1.3+Math.sin(tt*3)*.04}
  else if(TX9.spr&&TX9.spr.g.parent)TX9.spr.g.parent.remove(TX9.spr.g)}catch(e){}return r}}
