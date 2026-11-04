/* ================= v9: un posto per ogni lavoro, lo stadio con la partita, garage e hangar ================= */
const WORKAT={cameriere:'pizzeria',pizzaiolo:'pizzeria',commesso:'centro',cuoco:'ristorante',meccanico:'officina',elettricista:'elettrica',impiegato:'azienda',allenatore:'stadio',polizia:'questura',pompiere:'pompieri',programmatore:'techlab',infermiere:'ospedale',insegnante:'scuola',commercialista:'studiocomm',avvocato:'studiolegale',ingegnere:'ingegneria',veterinario:'veterinario',medico:'ospedale',astronauta:'spazio',calciatore:'stadio'};
const WORKTXT={cameriere:'Hai servito venti tavoli senza far cadere niente! 🍽️',pizzaiolo:'Hai sfornato trenta pizze! 🍕',commesso:'Hai aiutato tanti clienti alla cassa! 🛍️',cuoco:'I clienti fanno i complimenti allo chef! 👨‍🍳',meccanico:'Hai riparato tre macchine! 🔧',elettricista:'Hai sistemato l\'impianto della luce! ⚡',impiegato:'Hai finito tutte le pratiche! 📁',allenatore:'La squadra si è allenata benissimo! 📋',polizia:'Hai aiutato i cittadini e tenuto la città sicura! 🚓',pompiere:'Hai spento un incendio e salvato un gattino! 🚒',programmatore:'Il tuo programma funziona al primo colpo! 💻',infermiere:'Hai curato tanti pazienti! 🩺',insegnante:'Hai fatto una lezione bellissima! 📚',commercialista:'I conti tornano al centesimo! 📊',avvocato:'Hai vinto la causa in tribunale! ⚖️',ingegnere:'Il progetto del ponte è pronto! 📐',veterinario:'Hai curato un cagnolino e un gatto! 🐾',medico:'Hai visitato tanti pazienti! 🩺',astronauta:'Sei andat'+'o in orbita intorno alla Terra! 🚀',calciatore:'Allenamento perfetto con la squadra! ⚽'};
const workAt=()=>S.job?(WORKAT[S.job.id]||'azienda'):null;
PA.lavorasodo.ok=()=>!!S.job&&S.scene===workAt();
{const _r=PA.lavorasodo.run;PA.lavorasodo.run=()=>{const r=_r();return (S.job&&S.job.id==='astronauta'?`Sei andat${o()} in orbita intorno alla Terra! 🚀`:(WORKTXT[S.job.id]||''))+' '+r}}
{const _fn=furnNo;furnNo=function(a){if(a==='lavorasodo'){if(!S.job)return 'Qui lavora chi è assunto. Cerca lavoro allo sportello degli uffici! 💼';const b=BUILD.find(x=>x.id===workAt());return `Questo non è il tuo posto di lavoro: tu lavori ${b?b.ic+' '+b.n:'altrove'}. 📍`}return _fn(a)}}
GODEST.lavoro=()=>({to:workAt()||'ufficio',furn:'lavorasodo'});
{const _ub=PLACES.ufficio.body;PLACES.ufficio.body=()=>{const h=_ub();if(!S.job)return h;const b=BUILD.find(x=>x.id===workAt());
  return `<div class="row"><div class="t"><b>📍 Il tuo posto di lavoro</b><span>${b?b.ic+' '+b.n:''}</span></div><button class="btn hot" data-gowork="1">📍 Vai</button></div>`+h}}
PLACES.ufficio.sub=()=>S.job?`Lavori come ${jobName(S.job).toLowerCase()} · qui cambi lavoro`:'Sportello lavoro: qui ti fai assumere';

// stadio visto da fuori
function drawStadio(){
  const b=BUILD.find(x=>x.id==='stadio'),c=cx,X=b.x*T,Y=b.y*T,Wd=b.w*T,Hd=b.h*T,t=performance.now(),cxm=X+Wd/2,cym=Y+Hd/2-T;
  c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(cxm+12,cym+16,Wd/2,Hd/2-T,0,0,7);c.fill();
  c.fillStyle='#cfd5dd';c.beginPath();c.ellipse(cxm,cym,Wd/2,Hd/2-T,0,0,7);c.fill();
  [['#3b6fe0',.97],['#e5e7eb',.9],['#e5484d',.83],['#e5e7eb',.76]].forEach(([col,k])=>{c.fillStyle=col;c.beginPath();c.ellipse(cxm,cym,Wd/2*k,(Hd/2-T)*k,0,0,7);c.fill()});
  const pw=Wd*.52,ph=Hd*.42;c.fillStyle='#5fae4a';c.fillRect(cxm-pw/2,cym-ph/2,pw,ph);c.fillStyle='rgba(255,255,255,.07)';for(let i=0;i<10;i+=2)c.fillRect(cxm-pw/2+i*pw/10,cym-ph/2,pw/10,ph);
  c.strokeStyle='#fff';c.lineWidth=3;c.strokeRect(cxm-pw/2+8,cym-ph/2+8,pw-16,ph-16);c.beginPath();c.moveTo(cxm,cym-ph/2+8);c.lineTo(cxm,cym+ph/2-8);c.stroke();c.beginPath();c.arc(cxm,cym,ph*.16,0,7);c.stroke();
  [-1,1].forEach(s=>{c.strokeRect(s<0?cxm-pw/2+8:cxm+pw/2-8-pw*.12,cym-ph*.22,pw*.12,ph*.44)});
  // le luci
  [[X+T,Y+T*.5],[X+Wd-T,Y+T*.5],[X+T,Y+Hd-T*3],[X+Wd-T,Y+Hd-T*3]].forEach(([lx,ly])=>{c.fillStyle='#7c8188';c.fillRect(lx-3,ly,6,T*2);c.fillStyle='#fff9d6';rr(c,lx-16,ly-14,32,16,3);c.fill();c.fillStyle='rgba(255,249,214,.25)';c.beginPath();c.arc(lx,ly-6,26+Math.sin(t/400)*2,0,7);c.fill()});
  // ingresso e insegna
  const fy=Y+Hd-T*1.6;c.fillStyle='#e8edf5';c.fillRect(X+T*8,fy,Wd-T*16,T*1.6);c.fillStyle='#1f2540';rr(c,cxm-90,fy-14,180,28,8);c.fill();c.fillStyle='#fff';c.font='800 15px "Atkinson Hyperlegible",system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText('🏟️ STADIO',cxm,fy);
  c.fillStyle='#3a3f44';c.fillRect(cxm-34,Y+Hd-56,68,56);c.fillStyle='#bfe0ef';c.fillRect(cxm-31,Y+Hd-53,30,53);c.fillRect(cxm+1,Y+Hd-53,30,53);
  (b.doors||[]).forEach(([dx,dy])=>{if(dx<b.x){const DY=dy*T;c.fillStyle='#1f2540';rr(c,X+4,DY-4,96,22,6);c.fill();c.fillStyle='#fff';c.font='800 11px "Atkinson Hyperlegible",system-ui';c.textAlign='left';c.fillText('⬅ INGRESSO',X+12,DY+7)}
    else if(dy<b.y){const DX=dx*T+T/2;c.fillStyle='#1f2540';rr(c,DX-60,Y+4,120,22,6);c.fill();c.fillStyle='#fff';c.font='800 11px "Atkinson Hyperlegible",system-ui';c.textAlign='center';c.fillText('⬆ INGRESSO',DX,Y+15)}});
  c.textAlign='center';
}
// mobili nuovi
{const _d=drawFurn9;drawFurn9=function(fu,X,Y,w,h,t,box){const c=cx;
  if(fu.k==='crowd'){c.fillStyle='#8d96a3';c.fillRect(X,Y-T*.6,w,h+T*.6);const hype=ui.match&&ui.match.flash>0?6:2;
    for(let r=0;r<3;r++){c.fillStyle=r%2?'#7c8591':'#9aa3b0';c.fillRect(X,Y-T*.6+r*(h+T*.6)/3,w,3);
      for(let i=0;i<fu.w*3;i++){const px=X+8+i*T/3,py=Y-T*.35+r*(h+T*.6)/3+Math.sin(t/180+i*1.7+r)*hype;c.fillStyle=['#e5484d','#3b6fe0','#f5a700','#ffffff','#16a34a','#9b5de5'][(i*7+r*3)%6];c.fillRect(px-5,py+6,10,8);c.fillStyle=['#f1c27d','#e0ac69','#8d5524','#ffdbac'][(i+r)%4];c.beginPath();c.arc(px,py+2,5,0,7);c.fill()}}return}
  if(fu.k==='rocket'){const mx=X+w/2;c.fillStyle='#e5484d';c.beginPath();c.moveTo(mx,Y-T*1.2);c.lineTo(mx+18,Y-T*.4);c.lineTo(mx-18,Y-T*.4);c.closePath();c.fill();box(mx-18,Y-T*.4,36,h+T*.2,'#f4f6f8',6);
    c.fillStyle='#7fd0f0';c.beginPath();c.arc(mx,Y+T*.5,9,0,7);c.fill();c.fillStyle='#e5484d';c.beginPath();c.moveTo(mx-18,Y+h-20);c.lineTo(mx-34,Y+h);c.lineTo(mx-18,Y+h);c.fill();c.beginPath();c.moveTo(mx+18,Y+h-20);c.lineTo(mx+34,Y+h);c.lineTo(mx+18,Y+h);c.fill();
    c.fillStyle='#1f2540';c.font='700 10px system-ui';c.textAlign='center';c.fillText('ITALIA',mx,Y+T*1.6);return}
  if(fu.k==='gdoor'){box(X+3,Y+3,w-6,h-6,'#9aa3b5',6);c.fillStyle='#000';c.font='22px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(fu.emo||'🚗',X+w/2,Y+h/2+1);return}
  return _d(fu,X,Y,w,h,t,box)}}

// ===== la partita allo stadio =====
const PITCH={x0:1.7,x1:38.3,y0:4.6,y1:24.4,g0:11.1,g1:14.9};
function teamLook(i,team){const r=seeded(900+i*31+team*7);return lookFor('calc'+team+i,r()<.3,22+Math.floor(r()*10),{shirt:team?'#e5484d':'#3b6fe0',pants:'#ffffff'})}
function startMatch(){
  const m=ui.match={t:180,score:[0,0],pause:2.5,flash:0,over:false,face:[1,0],pp:null,stealCd:0,
    ball:{x:20,y:14.5,vx:0,vy:0,own:null,cd:0,last:null},
    pl:[...[[13,9],[13,20],[22,14.5]].map((b,i)=>({team:0,bx:b[0],by:b[1]})),{team:0,gk:1,bx:2.8,by:13},...[[27,9],[27,20],[31,14.5],[24,12]].map((b,i)=>({team:1,bx:b[0],by:b[1]})),{team:1,gk:1,bx:37.2,by:13}]};
  m.pl.forEach((p,i)=>{p.look=teamLook(i,p.team);p.dir='d';p.ph=0;p.cd=0;p.hold=0});
  kickoff(m);
  toast('⚽ Partita! A sinistra trascina il dito per correre, a destra trascina per passare o tirare. Tasti: frecce e barra spaziatrice.');
}
function kickoff(m){m.pl.forEach(p=>{p.x=p.bx;p.y=p.by});m.ball={x:20,y:14.5,vx:0,vy:0,own:null,cd:0,last:null};S.pos={x:18.6,y:14.5};S.face='r';m.pause=Math.max(m.pause,1.5)}
function kickBall(from,dx,dy,sp){const m=ui.match,b=m.ball,l=Math.hypot(dx,dy)||1;b.own=null;b.vx=dx/l*sp;b.vy=dy/l*sp;b.cd=.12;b.last=from;b.lastCd=.45}
function matchTick(dt){
  const m=ui.match;if(!m)return;if(S.scene!=='stadio'){ui.match=null;return}
  if(m.flash>0)m.flash-=dt;if(m.over)return;
  if(m.pause>0){m.pause-=dt;m.pp={x:S.pos.x,y:S.pos.y};return}
  m.t-=dt;if(m.t<=0){matchEnd();return}
  const b=m.ball,me=S.pos;
  if(m.pp){const vx=(me.x-m.pp.x)/dt,vy=(me.y-m.pp.y)/dt,l=Math.hypot(vx,vy);if(l>.6)m.face=[vx/l,vy/l]}m.pp={x:me.x,y:me.y};
  if(b.cd>0)b.cd-=dt;if(b.lastCd>0)b.lastCd-=dt;if(m.stealCd>0)m.stealCd-=dt;
  const free=b.own==null;
  // la palla
  if(b.own==='me'){b.x=me.x+m.face[0]*.5;b.y=me.y+.15+m.face[1]*.4;b.vx=b.vy=0}
  else if(typeof b.own==='number'){const p=m.pl[b.own],dir=p.team?-1:1;b.x=p.x+(p.gk?dir*.5:dir*.45);b.y=p.y+.15;b.vx=b.vy=0}
  else{b.x+=b.vx*dt;b.y+=b.vy*dt;const f=Math.exp(-1.5*dt);b.vx*=f;b.vy*=f;
    if(b.y<PITCH.y0){b.y=PITCH.y0;b.vy=Math.abs(b.vy)*.6}if(b.y>PITCH.y1){b.y=PITCH.y1;b.vy=-Math.abs(b.vy)*.6}
    const inMouth=b.y>PITCH.g0&&b.y<PITCH.g1;
    if(b.x>PITCH.x1){if(inMouth)return goal(0);b.x=PITCH.x1;b.vx=-Math.abs(b.vx)*.6}
    if(b.x<PITCH.x0){if(inMouth)return goal(1);b.x=PITCH.x0;b.vx=Math.abs(b.vx)*.6}}
  const sp=Math.hypot(b.vx,b.vy),near=(p,r)=>Math.hypot(p.x-b.x,p.y-.15-b.y)<r;
  // chi prende la palla
  if(b.own==null&&b.cd<=0){
    if(Math.hypot(me.x-b.x,me.y+.15-b.y)<.65&&!(b.last==='me'&&b.lastCd>0)&&sp<16)b.own='me';
    else m.pl.forEach((p,i)=>{if(b.own!=null||p.cd>0||(b.last===i&&b.lastCd>0))return;
      if(p.gk){if(near(p,.95)&&(sp<6||Math.random()<(sp>15?.35:.6))){b.own=i;p.hold=.9}else if(near(p,.95)){p.cd=.6}}
      else if(near(p,.55)&&sp<13){b.own=i;p.hold=.5+Math.random()*.8}})}
  // ti rubano la palla
  if(b.own==='me'&&m.stealCd<=0)m.pl.forEach((p,i)=>{if(b.own!=='me'||p.team!==1||p.gk)return;if(Math.hypot(p.x-me.x,p.y-me.y)<.6&&Math.random()<1.3*dt){b.own=i;p.hold=.6;m.stealCd=1.2;toast('😮 Ti hanno rubato la palla!')}});
  // movimento dei giocatori
  const chase=t=>{let best=null,bd=1e9;m.pl.forEach((p,i)=>{if(p.team!==t||p.gk)return;const d=Math.hypot(p.x-b.x,p.y-b.y);if(d<bd){bd=d;best=i}});return [best,bd]};
  const [c1]=chase(1),[c0,d0]=chase(0),meD=Math.hypot(me.x-b.x,me.y-b.y);
  m.pl.forEach((p,i)=>{
    if(p.cd>0)p.cd-=dt;let tx=p.bx,ty=p.by,v=p.team?3.0:3.3;
    if(p.gk){tx=p.bx;ty=Math.max(11.6,Math.min(14.6,b.y));v=2.6}
    else{tx=p.bx+(b.x-20)*.45;ty=p.by+(b.y-14.5)*.25;
      if(b.own===i){tx=p.team?2:38;ty=13+Math.sin(i+m.t)*2;v=p.team?2.6:2.9}
      else if(p.team===1&&i===c1&&b.own!==i&&!(typeof b.own==='number'&&m.pl[b.own].team===1)){tx=b.x;ty=b.y;v=3.1}
      else if(p.team===0&&i===c0&&b.own==null&&d0<meD){tx=b.x;ty=b.y}}
    const dx=tx-p.x,dy=ty-p.y,l=Math.hypot(dx,dy);
    if(l>.05){const s=Math.min(l,v*dt);p.x+=dx/l*s;p.y+=dy/l*s;p.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'l':'r'):(dy<0?'u':'d');p.ph+=dt*10;p.mv=1}else p.mv=0;
    p.x=Math.max(1.6,Math.min(38.4,p.x));p.y=Math.max(4.4,Math.min(24.6,p.y));
    // con la palla: passa o tira
    if(b.own===i){p.hold-=dt;if(p.hold<=0){
      if(p.gk){const mates=m.pl.map((q,j)=>[q,j]).filter(([q])=>q.team===p.team&&!q.gk);const tgt=p.team===0&&Math.random()<.6?{x:me.x,y:me.y}:pick(mates)[0];kickBall(i,tgt.x-p.x,tgt.y-p.y,12)}
      else if(p.team===1){if(p.x<11||Math.random()<.15)kickBall(i,1-p.x,PITCH.g0+.6+Math.random()*2.6-p.y,13+Math.random()*4);else if(Math.random()<.35){const q=pick(m.pl.filter(q=>q.team===1&&!q.gk&&q!==p));kickBall(i,q.x-p.x,q.y-p.y,10)}else p.hold=.4}
      else{if(p.x>29)kickBall(i,39-p.x,PITCH.g0+.6+Math.random()*2.6-p.y,14+Math.random()*4);else kickBall(i,me.x+m.face[0]*1.2-p.x,me.y-p.y,11)}}}
  });
}
function goal(team){const m=ui.match;m.score[team]++;m.flash=2.2;m.pause=2.4;
  toast(team===0?'⚽ GOOOL! Che gol! 🎉':'😩 Gol degli avversari… dai che recuperiamo!');if(team===0){add('fel',2)}
  setTimeout(()=>{if(ui.match===m)kickoff(m)},1200)}
function matchEnd(){
  const m=ui.match;m.over=true;const [a,b]=m.score,win=a>b,draw=a===b,pro=S.job&&(S.job.id==='calciatore'||S.job.id==='allenatore');
  add('spo',3);add('fel',win?8:draw?3:-1);count('sport');let premio=0;if(pro&&win){premio=20000;money(premio)}
  save();updateHud();
  ui.result={ic:win?'🏆':draw?'🤝':'😅',title:win?'Hai vinto la partita!':draw?'Pareggio!':'Hai perso, ma ci rifaremo!',text:`Risultato: Noi ${a} - ${b} Loro.${premio?`\n\nPremio partita per la vittoria: ${eur(premio)}! 💶`:''}\n\nTocca il tabellone per giocare un'altra partita.`,chips:[]};renderModal();
}
function doKick(dx,dy,len){
  const m=ui.match;if(!m||m.over||m.pause>0)return;const b=m.ball;
  if(b.own!=='me'){if(Math.hypot(S.pos.x-b.x,S.pos.y+.15-b.y)<1&&b.own==null)b.own='me';else return}
  if(len<90){let best=null,bc=.5;m.pl.forEach((p,i)=>{if(p.team||p.gk)return;const vx=p.x-S.pos.x,vy=p.y-S.pos.y,l=Math.hypot(vx,vy),cs=(vx*dx+vy*dy)/(l*Math.hypot(dx,dy));if(cs>bc){bc=cs;best=p}});
    if(best){kickBall('me',best.x-S.pos.x,best.y-S.pos.y,Math.min(14,7+Math.hypot(best.x-S.pos.x,best.y-S.pos.y)*.6));return}}
  kickBall('me',dx,dy,Math.min(21,8+len/16));
}
// dito a destra = calcio
addEventListener('pointerdown',e=>{if(e.target!==cv||!ui.match||ui.match.over||S.scene!=='stadio'||ui.sheet||ui.chatNpc||ui.result)return;if(e.clientX<innerWidth*.5)return;
  ui.kick={id:e.pointerId,x:e.clientX,y:e.clientY,cx:e.clientX,cy:e.clientY};e.stopImmediatePropagation();e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(_){}},true);
addEventListener('pointermove',e=>{const k=ui.kick;if(!k||e.pointerId!==k.id)return;k.cx=e.clientX;k.cy=e.clientY;e.stopImmediatePropagation()},true);
addEventListener('pointerup',e=>{const k=ui.kick;if(!k||e.pointerId!==k.id)return;ui.kick=null;e.stopImmediatePropagation();const dx=e.clientX-k.x,dy=e.clientY-k.y,l=Math.hypot(dx,dy);if(l>18)doKick(dx,dy,l)},true);
addEventListener('pointercancel',e=>{if(ui.kick&&e.pointerId===ui.kick.id)ui.kick=null},true);
addEventListener('keydown',e=>{if(!ui.match||S.scene!=='stadio'||ui.sheet||ui.chatNpc)return;if(e.code==='Space'||e.code==='KeyK'){e.preventDefault();e.stopImmediatePropagation();const f=ui.match.face;doKick(f[0],f[1],e.shiftKey?60:200)}else if(e.code==='KeyP'){e.stopImmediatePropagation();const f=ui.match.face;doKick(f[0],f[1],40)}},true);
function matchDs(ds){
  const m=ui.match;
  m.pl.forEach(p=>ds.push({y:p.y,f:()=>{const X=p.x*T,Y=p.y*T+12;drawHuman(cx,X,Y,p.look,p.dir,p.ph,!!p.mv);if(p.gk){cx.fillStyle=p.team?'#f5a700':'#16a34a';cx.fillRect(X-9,Y-40,18,5)}}}));
  const b=m.ball;ds.push({y:b.y+.05,f:()=>{const X=b.x*T,Y=b.y*T+12;cx.fillStyle='rgba(0,0,0,.25)';cx.beginPath();cx.ellipse(X,Y+6,8,3,0,0,7);cx.fill();cx.fillStyle='#fff';cx.beginPath();cx.arc(X,Y,7.5,0,7);cx.fill();cx.strokeStyle='#1f2540';cx.lineWidth=1.5;cx.stroke();cx.fillStyle='#1f2540';cx.beginPath();cx.arc(X,Y,2.8,0,7);cx.fill();[0,1.26,2.51,3.77,5.03].forEach(a=>{cx.beginPath();cx.arc(X+Math.cos(a)*5.6,Y+Math.sin(a)*5.6,1.6,0,7);cx.fill()})}});
  if(b.own==='me')ds.push({y:S.pos.y-.01,f:()=>{cx.strokeStyle='#ffde59';cx.lineWidth=3;cx.beginPath();cx.ellipse(S.pos.x*T,S.pos.y*T+14,16,6,0,0,7);cx.stroke()}});
}
function drawMatchHud(){
  const m=ui.match,c=cx,mm=Math.max(0,Math.ceil(m.t)),txt=`🔵 Noi ${m.score[0]} - ${m.score[1]} Loro 🔴   ⏱️ ${Math.floor(mm/60)}:${String(mm%60).padStart(2,'0')}`;
  c.font='800 16px "Baloo 2",system-ui';const w=c.measureText(txt).width+28;c.fillStyle='rgba(31,37,64,.9)';rr(c,VW/2-w/2,112,w,32,16);c.fill();c.fillStyle='#fff';c.textAlign='center';c.textBaseline='middle';c.fillText(txt,VW/2,128.5);
  if(m.flash>0){c.font='900 54px "Baloo 2",system-ui';c.fillStyle='rgba(255,222,89,'+Math.min(1,m.flash)+')';c.strokeStyle='rgba(31,37,64,'+Math.min(1,m.flash)+')';c.lineWidth=6;c.strokeText('GOOOL!',VW/2,VH*.42);c.fillText('GOOOL!',VW/2,VH*.42)}
  else if(m.pause>0&&!m.over){c.font='900 34px "Baloo 2",system-ui';c.fillStyle='#fff';c.strokeStyle='#1f2540';c.lineWidth=5;c.strokeText('Pronti… via! ⚽',VW/2,VH*.42);c.fillText('Pronti… via! ⚽',VW/2,VH*.42)}
  const k=ui.kick;if(k){c.strokeStyle='rgba(255,222,89,.9)';c.lineWidth=5;c.beginPath();c.moveTo(k.x,k.y);c.lineTo(k.cx,k.cy);c.stroke();c.fillStyle='rgba(255,222,89,.9)';c.beginPath();c.arc(k.cx,k.cy,8,0,7);c.fill()}
  if(!m.over){c.font='700 12px "Atkinson Hyperlegible",system-ui';c.fillStyle='rgba(255,255,255,.85)';c.fillText('⬅ corri          tira / passa ➡',VW/2,VH-62)}
}
PLACES.stadio={sub:()=>'Il campo di calcio grande',body:()=>{const m=ui.match;return (m&&!m.over?`<p class="note">Partita in corso: Noi ${m.score[0]} - ${m.score[1]} Loro.</p>`:'')+`<button class="btn hot" data-match9="1" style="width:100%;font-size:18px;padding:12px">▶️ ${m&&!m.over?'Ricomincia la partita':'Gioca una partita'}</button><p class="note">Tu sei nella squadra blu 🔵 e attacchi verso destra. Trascina il dito a sinistra dello schermo per correre; a destra trascina per passare (corto) o tirare (lungo).${S.job&&S.job.id==='calciatore'?' Da calciatore professionista ogni vittoria ti dà un premio! 💶':''}</p>`}};
{const _eb=enterBuilding;enterBuilding=function(id){const r=_eb(id);if(id==='stadio'&&S.scene==='stadio')setTimeout(startMatch,300);return r}}
{const _xb=exitBuilding;exitBuilding=function(){ui.match=null;ui.kick=null;
  if(S.scene==='garagemio'){S.scene='casamia';S.pos={x:13.5,y:13.4};S.face='u';ui.walk=null;save();updateHud();return}
  if(S.scene==='hangar'){openGarage();return}
  return _xb()}}

// ===== garage e hangar di casa tua =====
const AEREI=[{id:'mongolfiera',n:'Mongolfiera',ic:'🎈',p:30000,age:18,lic:'pilota',up:500,fel:10,g:'aria'},{id:'aereo',n:'Aereo da turismo',ic:'🛩️',p:250000,age:18,lic:'pilota',up:8000,fel:18,g:'aria'},{id:'elicottero',n:'Elicottero',ic:'🚁',p:450000,age:18,lic:'pilota',up:12000,fel:20,g:'aria'},{id:'jet',n:'Jet privato',ic:'✈️',p:4000000,age:18,lic:'pilota',up:90000,fel:30,g:'aria'}];
AEREI.forEach(a=>{a.veh=true;VEICOLI.push(a);ALLITEMS.push(a)});
LIC.pilota={n:'Brevetto di pilota (aerei ed elicotteri)',age:18,p:5000};
VGRP.push(['aria','✈️ Aerei ed elicotteri (serve la pista a casa tua)']);
{const _buy=buy;buy=function(id){if(AEREI.some(a=>a.id===id)&&!(S.flags&&S.flags.pista))return toast('✈️ Prima compra la pista per aerei e l\'eliporto per casa tua: all\'agenzia case!');return _buy(id)}}
const UPG=[{k:'garage',n:'Garage interno',ic:'🚗',p:40000,d:'Tutte le tue macchine, moto e bici in un garage dentro casa'},{k:'pista',n:'Pista per aerei ed eliporto',ic:'🛩️',p:250000,d:'Per far atterrare aerei ed elicotteri: si entra dal garage'}];
function buyUpg(k){const u=UPG.find(x=>x.k===k);if(!u||!S.house)return;if(k==='pista'&&!S.flags.garage)return toast('Prima compra il garage: la pista si raggiunge da lì! 🚗');if(!canPay(u.p))return toast('Non hai abbastanza soldi. 💸');
  money(-u.p);S.flags[k]=1;add('fel',8);const m=`Hai comprato: ${u.ic} ${u.n}! ${k==='garage'?'In casa tua, in basso nel salotto, c\'è la porta del garage.':'Ci arrivi dal garage di casa tua.'}`;log(m);save();updateHud();refreshSheet();toast(m)}
{const _ab=PLACES.agenzia.body;PLACES.agenzia.body=()=>{let h=_ab();if(S.age<18||!S.house)return h;
  return h+`<div class="h3">🛠️ Migliora casa tua</div>`+UPG.map(u=>{const has=S.flags[u.k],ok=canPay(u.p)&&!has;return `<div class="row"><div class="t"><b>${u.ic} ${u.n}</b><span>${has?'Ce l\'hai ✓':eur(u.p)+' · '+u.d}</span></div>${has?'<span class="tag ok">✓</span>':`<button class="btn ${ok?'hot':''}" data-upg="${u.k}" ${ok?'':'disabled'}>Compra</button>`}</div>`}).join('')}}
function openGarage(){
  if(!S.flags.garage){toast('🚗 Qui ci va il garage! Compralo all\'agenzia case (Migliora casa tua).');return}
  const L=S.items.filter(i=>{const d=ALLITEMS.find(x=>x.id===i.id);return d&&(d.ride||d.veh)&&!AEREI.some(a=>a.id===i.id)});
  const cars=L.filter(i=>isCar(i.id)),oth=L.filter(i=>!isCar(i.id));const w=Math.max(20,Math.min(40,4*Math.ceil(cars.length/2)+4)),furn=[];
  cars.forEach((it,i)=>furn.push(fu('car',1+(i>>1)*4,i%2?5:2,3,2,null,it.n,myCarCol(it.id))));
  oth.forEach((it,i)=>{const f=fu('vshow',1+i*3,8,2,1,null,it.n);f.emo=it.ic;furn.push(f)});
  if(S.flags.pista){const f=fu('gdoor',w-3,8,1,1,'hangar9','Vai alla pista e all\'eliporto',null,true);f.emo='🛩️';furn.push(f)}
  room('garagemio',w,11,'#b9bcc2','#b1b4ba','#d5d8de',furn);
  S.scene='garagemio';S.pos={x:Math.floor(w/2)+.5,y:9.4};S.face='u';ui.walk=null;
  toast(L.length?`🚗 Il tuo garage: ${L.length} ${L.length===1?'mezzo':'mezzi'}!`:'🚗 Il tuo garage è vuoto: compra macchine, moto e bici!');save();updateHud();
}
function openHangar(){
  const L=S.items.filter(i=>AEREI.some(a=>a.id===i.id)),furn=[fu('runway',1,10,28,2,null,null,null,true),fu('helipad',2,3,3,3,null,null,null,true)];
  L.forEach((it,i)=>{const heli=it.id==='elicottero',f=fu('vshow',heli?2:7+i*5,heli?4:5,3,1,'vola9:'+it.id,'Vola con: '+it.n);f.emo=it.ic;furn.push(f)});
  room('hangar',30,15,'#9fb48c','#98ad86','#cfe3f2',furn);S.scene='hangar';S.pos={x:15.5,y:13.4};S.face='u';ui.walk=null;
  toast(L.length?'🛩️ La tua pista! Tocca un aereo per volare.':'🛩️ La pista è pronta: compra aerei ed elicotteri in concessionaria!');save();updateHud();
}
function vola(id){const a=AEREI.find(x=>x.id===id);if(!a)return;if(!S.lic.pilota)return toast('🪪 Per volare serve il brevetto di pilota: lo prendi alla scuola guida in concessionaria!');
  fly('il cielo sopra '+S.city,()=>{},()=>{add('fel',6);const m=`${a.ic} Che volo! Hai visto ${S.city} dall'alto: le case sembrano piccolissime e lo stadio è un puntino verde! ☁️`;log(m);save();updateHud();toast(m)})}
{const _uf=useFurn;useFurn=function(fu){const a=fu.act||'';if(a==='garage9')return openGarage();if(a==='hangar9')return openHangar();if(a.startsWith('vola9:'))return vola(a.slice(6));return _uf(fu)}}
// si salva anche dentro il garage: ricostruiscilo quando riapri il gioco
setTimeout(()=>{try{if(S&&S.scene==='garagemio')openGarage();else if(S&&S.scene==='hangar')openHangar()}catch(e){}},0);
{const _d=drawFurn9;drawFurn9=function(fu,X,Y,w,h,t,box){const c=cx;
  if(fu.k==='runway'){c.fillStyle='#4b5059';c.fillRect(X,Y,w,h);c.fillStyle='#f4f1ea';for(let x=X+20;x<X+w-30;x+=60)c.fillRect(x,Y+h/2-2,32,4);c.fillRect(X+6,Y+6,4,h-12);c.fillRect(X+w-10,Y+6,4,h-12);return}
  if(fu.k==='helipad'){c.fillStyle='#4b5059';c.beginPath();c.arc(X+w/2,Y+h/2,w/2-4,0,7);c.fill();c.strokeStyle='#f5a700';c.lineWidth=4;c.beginPath();c.arc(X+w/2,Y+h/2,w/2-12,0,7);c.stroke();c.fillStyle='#fff';c.font='900 40px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText('H',X+w/2,Y+h/2+2);return}
  return _d(fu,X,Y,w,h,t,box)}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-gowork],[data-match9],[data-upg]');if(!b)return;
  if(b.dataset.gowork){closeSheet();const to=workAt();ui.goFurn={sc:to,furn:'lavorasodo'};toast('📍 Ti porto al lavoro!');goPlace(to)}
  else if(b.dataset.match9){closeSheet();startMatch()}else if(b.dataset.upg)buyUpg(b.dataset.upg)});
