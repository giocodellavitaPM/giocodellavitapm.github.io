/* ================= v9: missioni a tempo come in GTA (consegne): chiedi a Totò, Gino, Beppe o Rosa «hai una missione?» ================= */
const MX9={on:false};
const MX9_K={pizzaiolo:{ic:'🍕',what:'la pizza',fail:'la pizza si è raffreddata!',by:'Totò'},gelataio:{ic:'🍦',what:'il gelato',fail:'il gelato si è sciolto!',by:'Gino'},
  edicolante:{ic:'📰',what:'il giornale',fail:'il cliente è uscito di casa!',by:'Beppe'},cassiera:{ic:'🛒',what:'la spesa',fail:'il cliente ha dovuto uscire!',by:'Rosa'}};
function mxStart(n){const K=MX9_K[n.role];if(!K)return null;if(MX9.on)return {r:`Prima finisci la consegna che stai facendo! ${MX9.ic} ⏱️`};if(S.age<7)return {r:'Sei ancora un po\' piccol'+o()+' per le consegne. Torna quando sarai più grande! 😊'};
  const from=destXY(n.scene)||[Math.floor(S.pos.x),Math.floor(S.pos.y)],L=BUILD.filter(b=>!['casa','casamia',n.scene].includes(b.id)&&!/^casa\d/.test(b.id)).map(b=>[b,destXY(b.id)]).filter(([b,d])=>d&&Math.hypot(d[0]-from[0],d[1]-from[1])>14&&Math.hypot(d[0]-from[0],d[1]-from[1])<42);
  if(!L.length)return null;const [b,d]=L[Math.floor(Math.random()*L.length)],dist=Math.abs(d[0]-from[0])+Math.abs(d[1]-from[1]),max=Math.round(25+dist*1.15),pay=Math.round(20+dist*1.2);
  Object.assign(MX9,{on:true,ic:K.ic,K,to:b.id,name:b.ic+' '+b.n,goal:d,t:0,max,pay,warn:0});
  setTimeout(()=>{try{closeChat()}catch(e){}toast(`${K.ic} Missione! Porta ${K.what} a ${b.ic} ${b.n} in ${max} secondi. Segui la strada viola sulla mappa! ⏱️`)},1400);
  return {r:`Grazie! Porta ${K.what} a ${b.ic} ${b.n}, presto presto! Hai ${max} secondi. ${K.ic}⏱️`}}
function mxText(){const s=Math.max(0,Math.ceil(MX9.max-MX9.t));return `${MX9.ic} Porta ${MX9.K.what} a ${MX9.name} · ⏱️ ${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`}
function mxTick(dt){if(!MX9.on||!S||!S.alive)return;if(ui.mg||isBusy())return;MX9.t+=dt;const tip=$('tip');if(tip&&tip.textContent!==mxText())tip.textContent=mxText();
  const d=MX9.goal,arr=S.scene===MX9.to||(S.scene==='citta'&&Math.hypot(d[0]+.5-S.pos.x,d[1]+.5-S.pos.y)<1.7);
  if(arr){MX9.on=false;money(MX9.pay);add('fel',4);S.mx9=(S.mx9||0)+1;save();updateHud();tipT=0;if(typeof gtaPassed==='function')gtaPassed('MISSIONE COMPIUTA!',`Consegna fatta in tempo! +${MX9.pay} € ${MX9.ic}`);else toast(`✅ Consegna fatta! +${MX9.pay} €`);return}
  if(!MX9.warn&&MX9.max-MX9.t<10){MX9.warn=1;toast('⏰ Mancano 10 secondi! Corri!')}
  if(MX9.t>=MX9.max){MX9.on=false;tipT=0;toast(`⏰ Tempo scaduto: ${MX9.K.fail} Torna da ${MX9.K.by} e riprova: «hai una missione?»`)}}
{const _s=step;step=function(dt){const r=_s(dt);try{mxTick(dt)}catch(e){}return r}}
{const _h=hintText;hintText=function(){return MX9.on?mxText():_h.apply(this,arguments)}}
// la strada viola e la colonna gialla portano alla consegna
{const _g=gpsCalc;gpsCalc=function(dt){_g(dt);try{if(!MX9.on||GPS9.route||!S||S.scene!=='citta')return;const d=MX9.goal;GPS9.goal=d;MX9.rt=(MX9.rt||0)-dt;if(MX9.rt>0&&MX9.route){GPS9.route=MX9.route;return}MX9.rt=.6;
  const fx=Math.floor(S.pos.x),fy=Math.floor(S.pos.y),car=typeof rdInCar==='function'&&rdInCar();let r=null;
  if(car){const st=at(fx,fy)===1?[[fx,fy]]:nearRoad(fx,fy),en=nearRoad(d[0],d[1]);r=st.length&&en.length?roadRoute(st,en):null}
  if(!r){let s=null;for(let k=0;k<4&&!s;k++)for(let yy=fy-k;yy<=fy+k&&!s;yy++)for(let xx=fx-k;xx<=fx+k;xx++)if(walkOK(xx,yy)){s=[xx,yy];break}if(s)r=bfs(s[0],s[1],d[0],d[1])}
  MX9.route=r?[[S.pos.x-.5,S.pos.y-.5],...r]:null;GPS9.route=MX9.route}catch(e){}}}
// chi ti dà le missioni
{const _p=dlgPre;dlgPre=function(n,raw,t){if(MX9_K[n.role]&&/(missione|lavoretto|consegn|ti posso aiutare|posso aiutarti|serve aiuto|hai bisogno)/.test(t)){const r=mxStart(n);if(r)return r}return _p(n,raw,t)}}
// la prima volta che entri da Totò, Gino, Beppe o Rosa ti dicono che c'è una missione
{const _e=enterBuilding;enterBuilding=function(id){const r=_e.apply(this,arguments);try{const n=NPCS.find(x=>x.scene===id&&MX9_K[x.role]);S.mxHint=S.mxHint||{};if(n&&S.age>=7&&!S.mxHint[id]&&!MX9.on){S.mxHint[id]=1;
  setTimeout(()=>toast(`${MX9_K[n.role].ic} ${n.name} cerca aiuto per le consegne! Chiedigli: «hai una missione?» (come in GTA: c'è il tempo!)`),1800)}}catch(e){}return r}}
// in 2D: la bandierina dove consegnare e una freccia arancione vicino a te che indica la strada
{const _dc=drawCity;drawCity=function(t,x0,y0,x1,y1){_dc.apply(this,arguments);try{if(!MX9.on||ui.td9bake||S.scene!=='citta')return;const g=MX9.goal,c=cx,X=(g[0]+.5)*T,Y=(g[1]+.5)*T;
  c.fillStyle='#2f2c29';c.fillRect(X-1.5,Y-34,3,36);for(let i=0;i<3;i++)for(let j=0;j<4;j++){c.fillStyle=(i+j)%2?'#ffffff':'#1f1f22';c.fillRect(X+1.5+j*5,Y-34+i*5,5,5)}
  const R=GPS9.route,tg=R&&R.length>3?R[3]:g,a=Math.atan2((tg[1]+.5)*T-S.pos.y*T,(tg[0]+.5)*T-S.pos.x*T);if(Math.hypot(X-S.pos.x*T,Y-S.pos.y*T)<70)return;
  c.save();c.translate(S.pos.x*T+Math.cos(a)*52,S.pos.y*T+Math.sin(a)*52);c.rotate(a);c.fillStyle='rgba(196,92,255,.95)';c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();c.moveTo(13,0);c.lineTo(-7,-9);c.lineTo(-2,0);c.lineTo(-7,9);c.closePath();c.fill();c.stroke();c.restore()}catch(e){}}}
