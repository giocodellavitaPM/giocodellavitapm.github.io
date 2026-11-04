/* ================= v9: le macchine girano agli incroci (a destra o a sinistra), e curvano piano piano invece di girarsi di colpo ================= */
const TV9={turns:0};
const tvAng=c=>c.o==='h'?(c.d>0?0:Math.PI):(c.d>0?Math.PI/2:-Math.PI/2);
function tvBox(x,y){let bc=null,br=null;for(const c of RX)if(x>=c&&x<c+2){bc=c;break}if(bc==null)return null;for(const r of RY)if(y>=r&&y<r+2){br=r;break}return br==null?null:[bc,br]}
const tvRoad=(x,y)=>{const X=Math.floor(x),Y=Math.floor(y);return at(X,Y)===1&&!(typeof inMZ==='function'&&inMZ(X,Y))};
// la strada nuova esiste davvero ed è libera?
function tvCanTurn(c,o2,d2,bc,br,L2,along){if(o2==='v'){const y0=d2>0?br+2:br-1;for(let k=0;k<3;k++)if(!tvRoad(L2,y0+d2*k))return false}
  else{const x0=d2>0?bc+2:bc-1;for(let k=0;k<3;k++)if(!tvRoad(x0+d2*k,L2))return false}
  for(const o of TRAF){if(o===c||o.o!==o2||o.d!==d2||o.road!==(o2==='v'?bc:br))continue;if(Math.abs(o.p-along)<1.9)return false}return true}
{const _t=trafficTick;trafficTick=function(dt){const pre=TRAF.map(c=>[c,c.o,c.p,c.d]);const r=_t.apply(this,arguments);try{
  for(const [c,o0,p0,d0] of pre){if(!TRAF.includes(c))continue;if(c.o!==o0||c.d!==d0||c.dwell>0){c.tvK=null;continue}const [x,y]=carXY(c),B=tvBox(x,y);
    if(!B){c.tvK=null;continue}const [bc,br]=B,key=bc+','+br;
    if(c.tvK!==key){c.tvK=key;const q=Math.random();c.tvW=q<.55?0:q<.775?1:-1}
    if(!c.tvW)continue;const h=c.o==='h',d2=c.tvW,o2=h?'v':'h',L2=h?(d2>0?bc:bc+1)+.5:(d2>0?br+1:br)+.5;
    if((p0-L2)*(c.p-L2)>0||p0===c.p)continue;c.tvW=0;
    const along=h?y:x;if(!tvCanTurn(c,o2,d2,bc,br,L2,along))continue;
    c.o=o2;c.road=h?bc:br;c.d=d2;c.p=along;if(typeof roadSeg==='function')roadSeg(c);TV9.turns++}
  // l'angolo "vero" della macchina gira piano piano verso la direzione nuova
  TRAF.forEach(c=>{const a=tvAng(c);if(c.ang9==null){c.ang9=a;return}const df=wrapA(a-c.ang9);c.ang9=Math.abs(df)<.01?a:wrapA(c.ang9+df*Math.min(1,dt*7))})}catch(e){}return r}}
// in 2D: la macchina disegnata con l'angolo che gira piano
{const _d=drawCarAt;drawCarAt=function(x,y,ang,col,stop,sh){try{if(S&&S.scene==='citta'&&!sh)for(const c of TRAF){if(c.ang9==null||c.col!==col)continue;const [cx0,cy0]=carXY(c);if(cx0===x&&cy0===y){ang=c.ang9;break}}}catch(e){}return _d.call(this,x,y,ang,col,stop,sh)}}
// in 3D: idem (le prime macchine della lista sono quelle del traffico, nello stesso ordine)
{const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{if(city){let i=0;for(const c of TRAF){const [x,y]=carXY(c);if(Math.abs(x-S.pos.x)<34&&Math.abs(y-S.pos.y)<34){const e=TD.cars[i++];if(e&&c.ang9!=null)e.g.rotation.y=-c.ang9}}}}catch(e){}return r}}
// se stai in mezzo alla strada le macchine che aspettano suonano il clacson (bip bip!)
function tvHonk(){try{const A=window.AudioContext||window.webkitAudioContext;if(!A||document.hidden)return;const ac=JK.ac||(JK.ac=new A());if(ac.state==='suspended')ac.resume();const t=ac.currentTime;
  [[0,.16],[.22,.3]].forEach(([a,b])=>{const o=ac.createOscillator(),o2=ac.createOscillator(),g=ac.createGain();o.type=o2.type='square';o.frequency.value=392;o2.frequency.value=494;g.gain.setValueAtTime(0,t+a);g.gain.linearRampToValueAtTime(.05,t+a+.02);g.gain.setValueAtTime(.05,t+b-.03);g.gain.linearRampToValueAtTime(0,t+b);
    o.connect(g);o2.connect(g);g.connect(ac.destination);o.start(t+a);o2.start(t+a);o.stop(t+b+.02);o2.stop(t+b+.02)})}catch(e){}}
{const _t=trafficTick;trafficTick=function(dt){const r=_t.apply(this,arguments);try{if(!S||S.scene!=='citta'||S.famDrive||S.drive||S.ride||isBusy())return r;const now=performance.now();
  for(const c of TRAF){if(!c.stop){c.hk=0;continue}const [x,y]=carXY(c),h=c.o==='h',al=h?(S.pos.x-x)*c.d:(S.pos.y-y)*c.d,pe=h?Math.abs(S.pos.y-y):Math.abs(S.pos.x-x);
    if(al>0&&al<2.1&&pe<.8){c.hk=(c.hk||0)+dt;if(c.hk>1.8&&now-(TV9.hk||0)>3500){TV9.hk=now;c.hk=0;tvHonk();if(now-(TV9.ht||0)>25000){TV9.ht=now;toast('🚗 Bip bip! Sei in mezzo alla strada: spostati sul marciapiede!')}}}else c.hk=0}}catch(e){}return r}}
