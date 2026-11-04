/* ===== v9: più varietà in città (case diverse, alberi diversi) ===== */
APTS.forEach((a,i)=>{const r=seeded(a.x*977+a.y*131+i*7919);r();r();const v=r();
  a.sty=v<.38?'pal':v<.6?'villa':v<.74?'torre':v<.88?'colori':'mattoni';
  if(a.sty==='villa'||a.sty==='colori')a.shop=null;
  if(a.sty==='mattoni'){a.col=['#a65a3e','#b2654a','#9a5038'][Math.floor(r()*3)];a.flat=false}
  if(a.sty==='torre'){a.glass=['#5f86a3','#4f8a8b','#6c7fa8','#7a8f9e'][Math.floor(r()*4)];a.fl=3+Math.floor(r()*4)}
  if(a.sty==='villa'){a.col=['#f3e3c3','#f6d6d6','#dfe8f3','#e5f0d8','#fbe8b0','#ffffff'][Math.floor(r()*6)];a.roof=['#a24f37','#5d6b74','#6b4a3a','#3e6f73','#8c3b3b'][Math.floor(r()*5)];a.pool=a.w>=6&&r()<.5;a.swing=!a.pool&&r()<.5}
  if(a.sty==='colori')a.pal=Array.from({length:6},()=>['#e5484d','#f5a700','#3b6fe0','#2bb673','#9b5de5','#ff8fab','#00b4d8','#ff7a1a'][Math.floor(r()*8)]);
});
function drawVilla(a){const X=a.x*T,Y=a.y*T,Wd=a.w*T,Hd=a.h*T,c=cx;
  // giardino con siepe
  c.fillStyle='#7fb069';c.fillRect(X,Y,Wd,Hd);c.fillStyle='#8cbd74';for(let k=0;k<12;k++){const r=seeded(a.x*31+a.y*7+k);c.fillRect(X+r()*Wd,Y+r()*Hd*.4,3,3)}
  c.fillStyle='#4f7d3a';c.fillRect(X,Y,Wd,6);c.fillRect(X,Y,6,Hd);c.fillRect(X+Wd-6,Y,6,Hd);
  if(a.pool){const pw=Math.min(Wd-30,110),px=X+Wd-pw-14;c.fillStyle='#e8e2d4';c.fillRect(px-4,Y+12,pw+8,40);c.fillStyle='#4fc3e8';c.fillRect(px,Y+16,pw,32);c.fillStyle='rgba(255,255,255,.45)';c.fillRect(px+6,Y+22,pw*.4,3);c.fillRect(px+pw*.5,Y+34,pw*.3,3)}
  else if(a.swing){const sx=X+Wd-60;c.strokeStyle='#7a5a3a';c.lineWidth=3;c.beginPath();c.moveTo(sx,Y+52);c.lineTo(sx+10,Y+14);c.lineTo(sx+40,Y+14);c.lineTo(sx+50,Y+52);c.stroke();c.strokeStyle='#555';c.lineWidth=1;c.beginPath();c.moveTo(sx+20,Y+14);c.lineTo(sx+20,Y+38);c.moveTo(sx+30,Y+14);c.lineTo(sx+30,Y+38);c.stroke();c.fillStyle='#e5484d';c.fillRect(sx+17,Y+38,16,4)}
  // fiori
  for(let k=0;k<5;k++){c.fillStyle=['#ff8fab','#f5a700','#fff','#e5484d','#9b5de5'][k];c.beginPath();c.arc(X+14+k*9,Y+20+(k%2)*6,3,0,7);c.fill()}
  // casetta
  const hw=Math.min(Wd-24,Math.max(110,Wd*.75)),hx=X+(Wd-hw)/2,hh=Math.min(Hd*.62,120),hy=Y+Hd-hh;
  c.fillStyle='rgba(0,0,0,.18)';c.fillRect(hx+8,hy+10,hw,hh);
  const rf=hh*.42;c.fillStyle=a.col;c.fillRect(hx,hy+rf,hw,hh-rf);
  c.fillStyle=a.roof;c.beginPath();c.moveTo(hx-8,hy+rf+2);c.lineTo(hx+hw*.18,hy);c.lineTo(hx+hw*.82,hy);c.lineTo(hx+hw+8,hy+rf+2);c.closePath();c.fill();
  c.strokeStyle='rgba(0,0,0,.18)';c.lineWidth=1;for(let yy=hy+6;yy<hy+rf;yy+=7){c.beginPath();c.moveTo(hx-8+(rf-(yy-hy))*.0,yy);c.lineTo(hx+hw+8,yy);c.stroke()}
  c.fillStyle='#7a6a5e';c.fillRect(hx+hw*.7,hy-14,12,18);c.fillStyle='#5a4a40';c.fillRect(hx+hw*.7-2,hy-16,16,4);
  const wy=hy+rf+10,dx=X+Wd/2-11;
  [hx+14,hx+hw-34].forEach(wx=>{c.fillStyle='#ece8de';c.fillRect(wx-2,wy-2,24,22);c.fillStyle='#7fa6b8';c.fillRect(wx,wy,20,18);c.fillStyle='#ece8de';c.fillRect(wx+9,wy,2,18);c.fillStyle='#4f7d3a';c.fillRect(wx-2,wy+18,24,5);c.fillStyle='#ff8fab';c.fillRect(wx+2,wy+17,4,3);c.fillRect(wx+14,wy+17,4,3)});
  c.fillStyle='#d9d3c6';c.fillRect(dx-3,Y+Hd-36,28,36);c.fillStyle=a.roof;c.fillRect(dx,Y+Hd-33,22,33);c.fillStyle='#f5d26b';c.beginPath();c.arc(dx+17,Y+Hd-16,2,0,7);c.fill();
  c.fillStyle='#c9b79a';c.fillRect(dx,Y+Hd-2,22,2);
}
function drawTorre(a){const X=a.x*T,Wd=a.w*T,Hd=a.h*T,extra=Math.min(a.fl*T*.5,T*.9),Y=a.y*T-extra,HH=Hd+extra,c=cx;
  c.fillStyle='rgba(0,0,0,.22)';c.fillRect(X+14,Y+18,Wd,HH);
  const g=c.createLinearGradient(X,0,X+Wd,0);g.addColorStop(0,shade(a.glass,1.15));g.addColorStop(.5,a.glass);g.addColorStop(1,shade(a.glass,.75));c.fillStyle=g;c.fillRect(X,Y,Wd,HH);
  c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=1;for(let x=X+12;x<X+Wd;x+=16){c.beginPath();c.moveTo(x,Y+8);c.lineTo(x,Y+HH-36);c.stroke()}
  for(let y=Y+14;y<Y+HH-36;y+=14){c.beginPath();c.moveTo(X,y);c.lineTo(X+Wd,y);c.stroke()}
  c.fillStyle='rgba(255,255,255,.18)';c.beginPath();c.moveTo(X+Wd*.15,Y);c.lineTo(X+Wd*.4,Y);c.lineTo(X+Wd*.1,Y+HH*.6);c.lineTo(X,Y+HH*.6);c.lineTo(X,Y+HH*.3);c.closePath();c.fill();
  c.fillStyle='#3a3f44';c.fillRect(X-2,Y-6,Wd+4,8);c.fillRect(X+Wd/2-1,Y-30,2,26);c.fillStyle='#e5484d';c.beginPath();c.arc(X+Wd/2,Y-31,3,0,7);c.fill();
  const gy=a.y*T+Hd-36;c.fillStyle='#2f3337';c.fillRect(X,gy,Wd,36);c.fillStyle='#9fc3d6';c.fillRect(X+4,gy+6,Wd-8,28);c.fillStyle='#2f3337';for(let x=X+20;x<X+Wd-8;x+=22)c.fillRect(x,gy+6,2,28);
  if(a.shop){c.fillStyle='#2f2c29';c.font='600 9px Georgia,serif';c.textAlign='center';const tw=c.measureText(a.shop).width+8;c.fillRect(X+Wd/2-tw/2,gy-6,tw,12);c.fillStyle='#f3efe6';c.fillText(a.shop,X+Wd/2,gy+3)}
}
function drawColori(a){const X=a.x*T,Y=a.y*T,Wd=a.w*T,Hd=a.h*T,c=cx,n=Math.max(2,Math.round(Wd/55)),w=Wd/n;
  c.fillStyle='rgba(0,0,0,.2)';c.fillRect(X+12,Y+14,Wd,Hd);
  for(let i=0;i<n;i++){const hx=X+i*w,top=Y+(i%2?10:0),col=a.pal[i%a.pal.length];
    c.fillStyle=col;c.fillRect(hx,top+16,w,Y+Hd-top-16);
    c.fillStyle=shade(col,.7);c.beginPath();c.moveTo(hx-1,top+18);c.lineTo(hx+w/2,top);c.lineTo(hx+w+1,top+18);c.closePath();c.fill();
    for(let y=top+26;y<Y+Hd-44;y+=30){c.fillStyle='#fff';c.fillRect(hx+w/2-9,y-2,18,22);c.fillStyle='#5f7b88';c.fillRect(hx+w/2-7,y,14,18);c.fillStyle='#2f6b3a';c.fillRect(hx+w/2-13,y,4,18);c.fillRect(hx+w/2+9,y,4,18)}
    c.fillStyle='#5a3b26';c.fillRect(hx+w/2-8,Y+Hd-30,16,30);c.fillStyle='rgba(255,255,255,.7)';c.fillRect(hx+w/2-10,Y+Hd-32,20,2)}
}
{const _dp=drawPalazzo;drawPalazzo=function(a){
  if(a.sty==='villa')return drawVilla(a);if(a.sty==='torre')return drawTorre(a);if(a.sty==='colori')return drawColori(a);
  _dp(a);if(a.sty==='mattoni'){const c=cx,X=a.x*T,Y=a.y*T,Wd=a.w*T;c.strokeStyle='rgba(255,255,255,.12)';c.lineWidth=1;for(let y=Y+Math.round(a.h*T*.3)+4,k=0;y<Y+a.h*T-40;y+=6,k++){c.beginPath();c.moveTo(X,y);c.lineTo(X+Wd,y);c.stroke()}}}}
{const _dt=drawTree;drawTree=function(x,y){const rr=seeded(x*7919+y*131+17);rr();rr();const v=rr();if(v<.4)return _dt(x,y);
  const X=x*T+T/2,Y=y*T+T/2,c=cx;c.fillStyle='rgba(0,0,0,.22)';c.beginPath();c.ellipse(X+8,Y+12,14,6,0,0,7);c.fill();
  if(v<.58){// pino
    c.fillStyle='#5b4430';c.fillRect(X-3,Y,6,14);[['#24502f',22,0],['#2d5f37',17,-12],['#3a7343',12,-23]].forEach(([col,r,dy])=>{c.fillStyle=col;c.beginPath();c.moveTo(X-r,Y+4+dy);c.lineTo(X,Y-18+dy);c.lineTo(X+r,Y+4+dy);c.closePath();c.fill()});return}
  if(v<.72){// cipresso
    c.fillStyle='#2f5530';c.beginPath();c.ellipse(X,Y-14,8,26,0,0,7);c.fill();c.fillStyle='#3d6b3c';c.beginPath();c.ellipse(X-2,Y-18,4,18,0,0,7);c.fill();return}
  c.fillStyle='#5b4430';c.fillRect(X-3,Y,6,14);
  const pink=v<.86,base=pink?['#e889a8','#f3a6bf','#ffc4d6']:['#3f7a35','#4d8a3f','#5a9a4a'];
  [[0,-8,16],[-9,-12,11],[9,-13,10],[0,-18,9]].forEach(([dx,dy,r],i)=>{c.fillStyle=base[i%3];c.beginPath();c.arc(X+dx,Y+dy,r,0,7);c.fill()});
  c.fillStyle=pink?'#fff':'#f5a700';for(let k=0;k<7;k++){const r=seeded(x*13+y*17+k);c.beginPath();c.arc(X-12+r()*24,Y-22+r()*18,pink?1.6:2.6,0,7);c.fill()}
}}

/* ===== v9: i figli (e gli animali) ti seguono ===== */
const folIds=()=>(S.follow=(S.follow||[]).filter(id=>NPCS.some(n=>n.id===id)));
function followTick(dt){const L=folIds();if(!L.length)return;
  ui.trail9=ui.trail9||[];const tr=ui.trail9,l=tr[tr.length-1];
  if(!l||Math.hypot(l[0]-S.pos.x,l[1]-S.pos.y)>.12)tr.push([S.pos.x,S.pos.y]);while(tr.length>90)tr.shift();
  const base=S.escort?1:0;
  L.forEach((id,i)=>{const n=NPCS.find(x=>x.id===id);if(!n)return;n.fol=1;n.path=null;n.leave=0;n.inCar=false;
    const want=.85*(i+1+base);
    if(n.scene!==S.scene||S.drive){n.scene=S.scene;n.x=S.pos.x;n.y=S.pos.y+.6;ui.trail9=[[S.pos.x,S.pos.y]];return}
    let k=tr.length-1,acc=0;while(k>0&&acc<want){acc+=Math.hypot(tr[k][0]-tr[k-1][0],tr[k][1]-tr[k-1][1]);k--}
    const [tx,ty]=tr[k]||[S.pos.x,S.pos.y+.6],dx=tx-n.x,dy=ty-n.y,d=Math.hypot(dx,dy);
    if(d>.05&&acc>=want*.9){const sp=Math.min(d,(speedNow()*1.2)*dt);n.x+=dx/d*sp;n.y+=dy/d*sp;n.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'l':'r'):(dy<0?'u':'d');n.ph+=dt*10;n.tx=1}else n.tx=null;
    if(d>5){n.x=tx;n.y=ty}})}
{const _nt=npcTick;npcTick=function(dt){NPCS.forEach(n=>{n.fol=S.follow&&S.follow.includes(n.id)?1:0});_nt(dt);followTick(dt)}}
function toggleFollow(id){const n=NPCS.find(x=>x.id===id);if(!n)return;S.follow=S.follow||[];const i=S.follow.indexOf(id);
  if(i>=0){S.follow.splice(i,1);n.fol=0;sendHome(n);toast(`${n.name} torna a casa. Ciao! 👋🏠`)}
  else{S.follow.push(id);ui.trail9=[];toast(n.animal?`🐾 ${n.name} ti segue! Portalo dove vuoi.`:`👣 ${n.name} ti segue! Portal${S.kids[n.kid]&&S.kids[n.kid].f?'a':'o'} dove vuoi: al parco, a mangiare un gelato, al cinema…`)}
  save();if(ui.chatNpc)renderChat()}
{const _rc=renderChat;renderChat=function(){_rc();const n=NPCS.find(x=>x.id===ui.chatNpc),q=document.querySelector('#chat .quick');if(!n||!q||!(n.role==='figlio'||n.role==='pet'))return;
  const on=(S.follow||[]).includes(n.id);q.insertAdjacentHTML('afterbegin',`<button data-fol9="${n.id}" style="background:${on?'#ffe1d6':'#d9f5e6'};font-weight:800">${on?'🏠 Torna a casa':'👣 Seguimi'}</button>`)}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-fol9]');if(b){e.preventDefault();toggleFollow(b.dataset.fol9)}});
// anche il marito / la moglie ti può seguire
{const _rc2=renderChat;renderChat=function(){_rc2();const n=NPCS.find(x=>x.id===ui.chatNpc),q=document.querySelector('#chat .quick');if(!n||!q||n.role!=='amore'||!S.partner||document.querySelector('#chat [data-fol9]'))return;
  const on=(S.follow||[]).includes(n.id);q.insertAdjacentHTML('afterbegin',`<button data-fol9="${n.id}" style="background:${on?'#ffe1d6':'#d9f5e6'};font-weight:800">${on?'🏠 Torna a casa':'👣 Vieni con me'}</button>`)}}

/* ===== v9: in aereo scegli chi viene con te ===== */
function compList(){const L=[];if(S.partner&&NPCS.some(n=>n.id==='amore'))L.push({id:'amore',ic:S.married?'💍':'💘',n:(S.married?(S.amore.f?'Tua moglie ':'Tuo marito '):'')+S.partner.nome});
  S.kids.forEach((k,i)=>L.push({id:'kid'+i,ic:S.age-k.nato<3?'👶':k.f?'👧':'👦',n:(k.f?'Tua figlia ':'Tuo figlio ')+k.nome}));
  S.pets.forEach((p,i)=>L.push({id:'pet'+i,ic:p.tipo==='cane'?'🐶':'🐱',n:(p.tipo==='cane'?'Il cane ':'Il gatto ')+p.nome}));return L}
function compPicker(){const L=compList();if(!L.length)return '';S.tripWith=(S.tripWith||[]).filter(id=>L.some(c=>c.id===id));const all=L.every(c=>S.tripWith.includes(c.id));
  return `<div class="h3">👨‍👩‍👧 Chi viene con te?</div><div class="seg wrap"><button type="button" class="sw" data-com9="*" aria-pressed="${all}">⭐ Tutti</button>${L.map(c=>`<button type="button" class="sw" data-com9="${c.id}" aria-pressed="${S.tripWith.includes(c.id)}">${c.ic} ${esc(c.n)}</button>`).join('')}</div><p class="note">${S.tripWith.length?'Con te: '+L.filter(c=>S.tripWith.includes(c.id)).map(c=>c.ic).join(' '):'Parti da sol'+o()+'. Tocca chi vuoi portare!'}</p>`}
function comNames(){const L=compList().filter(c=>S.tripWith&&S.tripWith.includes(c.id));return L.length?L.map(c=>c.n.replace(/^(Tua moglie|Tuo marito|Tua figlia|Tuo figlio|Il cane|Il gatto) /,'')).join(', '):''}
function takeComp(){(S.tripWith||[]).forEach(id=>{S.follow=S.follow||[];if(!S.follow.includes(id))S.follow.push(id)});ui.trail9=[]}
{const _gb=PLACES.gate.body;PLACES.gate.body=()=>{const h=_gb();return S.tripBooked&&!S.tripBooked.fam?compPicker()+h:h}}
{const _bp=boardPlane;boardPlane=function(){const tb=S.tripBooked;if(tb&&!tb.fam)takeComp();const w=comNames();_bp();if(tb&&!tb.fam&&w)setTimeout(()=>toast('✈️ In vacanza con te: '+w+'! 🏖️'),4600)}}
PLACES.volo9={sub:()=>'Prepara il volo',body:()=>{const a=AEREI.find(x=>x.id===ui.volaId)||AEREI[0];return compPicker()+`<button class="btn hot" type="button" data-vola9="1" style="width:100%;font-size:20px;padding:12px;margin-top:12px">${a.ic} Decolla!</button>`}};
SHEET_T.volo9=['🛫','Si parte!'];
{const _v=vola;vola=function(id){if(!S.lic.pilota)return _v(id);if(!compList().length)return _v(id);ui.volaId=id;openPlace('volo9')}}
function volaGo(){const id=ui.volaId,a=AEREI.find(x=>x.id===id);closeSheet();if(!a)return;takeComp();const w=comNames();
  fly('il cielo sopra '+S.city,()=>{},()=>{add('fel',6+(w?4:0));const m=`${a.ic} Che volo${w?' con '+w:''}! Avete visto ${S.city} dall'alto: le case sembrano piccolissime e lo stadio è un puntino verde! ☁️`;log(m);save();updateHud();toast(m)})}
document.addEventListener('click',e=>{const b=e.target.closest('[data-com9],[data-vola9]');if(!b)return;
  if(b.dataset.vola9)return volaGo();const id=b.dataset.com9,L=compList();S.tripWith=S.tripWith||[];
  if(id==='*'){S.tripWith=L.every(c=>S.tripWith.includes(c.id))?[]:L.map(c=>c.id)}else{const i=S.tripWith.indexOf(id);i>=0?S.tripWith.splice(i,1):S.tripWith.push(id)}
  save();refreshSheet()});

/* ===== v9: ancora più cose nel codice segreto ===== */
{const _cr=cheatReply;cheatReply=function(n,t){const r=_cr(n,t);if(r&&ui.cheat)Object.assign(ui.cheat,{garage:!!S.flags.garage,pista:!!S.flags.pista,turbo:!!S.flags.turbo,allveh:false,allaria:false,zaino:false,amici:false,vacanza:false,follow:[...(S.follow||[])],noup:false});return r}}
{const _cb=cheatBody;cheatBody=function(){const c=ui.cheat;if(!c)return '';let h=_cb();const i=h.lastIndexOf('<button class="btn hot" type="button" data-cheatgo');
  const chip=(k,v,lbl,on)=>`<button type="button" class="sw" data-cset="${k}:${v}" aria-pressed="${on}">${(on?'✓ ':'')+lbl}</button>`,sec=t=>`<div class="h3" style="margin-top:18px;padding-top:10px;border-top:2px dashed var(--line)">${t}</div>`,adult=c.age>=18;
  let x='';
  if(adult)x+=sec('🚗 Garage e pista')+`<div class="field"><div class="seg wrap">${chip('garage',1,'🚗 Garage interno',c.garage)}${chip('pista',1,'🛩️ Pista ed eliporto',c.pista)}</div><p class="note">Servono una casa tua. La pista si raggiunge dal garage.</p></div>`;
  x+=sec('🎁 Regali')+`<div class="field"><div class="seg wrap">${chip('allveh',1,'🚙 Tutte le macchine, moto e bici',c.allveh)}${adult?chip('allaria',1,'✈️ Tutti gli aerei ed elicotteri',c.allaria):''}${chip('zaino',1,'🎒 Zaino pieno di cose',c.zaino)}${chip('noup',1,'🆓 Niente spese per i mezzi',c.noup)}</div></div>`;
  x+=sec('⚡ Superpoteri')+`<div class="field"><div class="seg wrap">${chip('turbo',1,'🏃 Corri velocissimo',c.turbo)}${chip('amici',1,'❤️ Tutti ti vogliono bene',c.amici)}</div></div>`;
  x+=sec('🏖️ Vacanza')+`<div class="field"><div class="seg wrap">${chip('vacanza',1,'🎫 Biglietto per il mare pronto',c.vacanza)}</div></div>`;
  const L=compList();if(L.length)x+=sec('👣 Chi ti segue')+`<div class="field"><div class="seg wrap">${L.map(m=>chip('fol',m.id,m.ic+' '+esc(m.n),c.follow.includes(m.id))).join('')}</div></div>`;
  return i<0?h+x:h.slice(0,i)+x+h.slice(i)}}
{const _cs=cheatSet;cheatSet=function(v){const c=ui.cheat,k=v.slice(0,v.indexOf(':')),x=v.slice(v.indexOf(':')+1);
  if(['garage','pista','turbo','allveh','allaria','zaino','amici','vacanza','noup','fol'].includes(k)){cheatKeep();
    if(k==='fol'){const i=c.follow.indexOf(x);i>=0?c.follow.splice(i,1):c.follow.push(x)}else{c[k]=!c[k];if(k==='pista'&&c.pista)c.garage=true;if(k==='garage'&&!c.garage)c.pista=false}
    const sc=$('sheet')&&$('sheet').querySelector('.bd'),top=sc?sc.scrollTop:0;renderSheet();const sc2=$('sheet')&&$('sheet').querySelector('.bd');if(sc2)sc2.scrollTop=top;return}
  return _cs(v)}}
{const _cg=cheatGo;cheatGo=function(){const c=ui.cheat;if(!c)return _cg();const ex={...c,follow:[...(c.follow||[])]};_cg();
  if(S.age>=18&&S.house){S.flags.garage=ex.garage?1:0;S.flags.pista=ex.pista&&ex.garage?1:0}
  S.flags.turbo=ex.turbo?1:0;
  const give=it=>{if(!S.items.some(i=>i.id===it.id)){S.everItems[it.id]=true;S.items.push({id:it.id,n:it.n,ic:it.ic,p:it.p,up:ex.noup?0:(it.up||0),veh:!!it.veh,speed:it.speed||0})}};
  if(ex.allveh)ALLITEMS.filter(i=>(i.veh||i.ride)&&!AEREI.includes(i)).forEach(give);
  if(ex.allaria&&S.age>=18){AEREI.forEach(give);S.lic.pilota=1}
  if(ex.noup)S.items.forEach(i=>{if(i.veh)i.up=0});
  if(ex.zaino)Object.keys(LOOT).slice(0,12).forEach(k=>{if(!S.inv.includes(k))S.inv.push(k)});
  if(ex.amici)NPCS.forEach(n=>{S.rel[n.id]=100});
  if(ex.vacanza&&!S.tripBooked&&!S.trip){S.done.trip=0;S.tripBooked={fam:S.age<18&&S.home==='genitori',wait:0}}
  S.follow=ex.follow.filter(id=>NPCS.some(n=>n.id===id));ui.trail9=[];
  save();updateHud()}}
{const _sn=speedNow;speedNow=function(){const s=_sn();return S&&S.flags&&S.flags.turbo?s*1.8:s}}

/* ===== v9: codice segreto per entrare nelle tue case ===== */
const myHouseIds=()=>[...(S.house?['casamia']:[]),...(S.houses||[]).map((_,i)=>'casa'+(i+2))];
const hName=id=>{const x=BUILD.find(q=>q.id===id);return x?(typeof x.n==='function'?x.n():x.n):'casa tua'};
function keypad(title,sub,cb){let v='';const el=document.createElement('div');el.id='kp9';
  el.style.cssText='position:fixed;inset:0;z-index:60;background:rgba(20,22,40,.55);display:flex;align-items:center;justify-content:center;padding:16px';
  const draw=()=>{el.innerHTML=`<div style="background:var(--card,#fff);border-radius:24px;padding:18px;width:min(320px,100%);box-shadow:0 10px 40px rgba(0,0,0,.35);text-align:center;font-family:inherit">
   <div style="font-size:20px;font-weight:800">${title}</div><div style="font-size:14px;opacity:.75;margin:4px 0 10px">${sub}</div>
   <div style="font-size:34px;letter-spacing:12px;font-weight:900;background:#1f2540;color:#7CFFB2;border-radius:12px;padding:8px 0;min-height:48px;font-family:monospace">${v.replace(/./g,'●')||'&nbsp;'}</div>
   <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px">${[1,2,3,4,5,6,7,8,9,'⌫',0,'✓'].map(k=>`<button type="button" data-kp="${k}" style="font-size:24px;font-weight:800;padding:12px 0;border-radius:14px;border:2px solid #d5d8de;background:${k==='✓'?'#2bb673':k==='⌫'?'#ffe1d6':'#f4f5f8'};color:${k==='✓'?'#fff':'#1f2540'}">${k}</button>`).join('')}</div>
   <button type="button" data-kp="x" style="margin-top:10px;background:none;border:0;font-size:15px;text-decoration:underline;color:inherit">Annulla</button></div>`};
  draw();document.body.appendChild(el);ui.walk=null;
  el.addEventListener('click',e=>{const b=e.target.closest('[data-kp]');if(!b)return;const k=b.dataset.kp;
    if(k==='x'){el.remove();return cb(null)}if(k==='⌫')v=v.slice(0,-1);else if(k==='✓'){if(v.length<1)return;el.remove();return cb(v)}else if(v.length<8)v+=k;draw()})}
function setHouseCode(id,again){const nm=hName(id);
  keypad('🔐 Scegli il codice',`Il codice segreto per entrare in ${nm} (da 1 a 8 numeri)`,v=>{if(v==null){if(!S.codes||!S.codes[id])toast('Va bene: '+nm+' resta senza codice. Puoi metterlo all\'agenzia case.');return}
    keypad('🔐 Riscrivilo','Scrivi di nuovo lo stesso codice per conferma',w=>{if(w==null)return;if(w!==v){toast('❌ I due codici sono diversi: riprova!');return setHouseCode(id)}
      S.codes=S.codes||{};S.codes[id]=v;save();toast('🔐 Codice salvato! Per entrare in '+nm+' dovrai scrivere '+v.replace(/./g,'●')+'. Non dirlo a nessuno! 🤫')})})}
{const _cc=compraCasa;compraCasa=function(id,m){const had=!!S.house;_cc(id,m);if(!had&&S.house)setTimeout(()=>setHouseCode('casamia'),400)}}
{const _ca=compraAltra;compraAltra=function(id){const n=(S.houses||[]).length;_ca(id);if((S.houses||[]).length>n)setTimeout(()=>setHouseCode('casa'+(S.houses.length+1)),400)}}
{const _eb=enterBuilding;enterBuilding=function(id){const code=S.codes&&S.codes[id];
  if(!code||ui.kpOk===id||S.scene!=='citta'||!myHouseIds().includes(id)||ui.flying)return _eb(id);
  if(document.getElementById('kp9'))return;
  keypad('🔒 '+(hName(id)),'Scrivi il codice per aprire la porta',v=>{if(v==null)return;
    if(v!==code){toast('❌ Codice sbagliato! La porta resta chiusa. 🔒');return}
    toast('🔓 Codice giusto! Benvenut'+o()+' a casa!');ui.kpOk=id;try{_eb(id)}finally{ui.kpOk=null}})}}
{const _ab=PLACES.agenzia.body;PLACES.agenzia.body=()=>{const h=_ab(),L=myHouseIds();if(S.age<18||!L.length)return h;
  return h+`<div class="h3">🔐 Codici delle tue case</div>`+L.map(id=>`<div class="row"><div class="t"><b>${esc(hName(id))}</b><span>${S.codes&&S.codes[id]?'Codice: '+S.codes[id].replace(/./g,'●'):'Senza codice: chiunque può entrare'}</span></div><button class="btn" data-code9="${id}">${S.codes&&S.codes[id]?'Cambia':'Metti codice'}</button></div>`).join('')}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-code9]');if(b){closeSheet();setHouseCode(b.dataset.code9)}});

/* ===== v9: acceleratore e freno quando guidi ===== */
{const _cm=carMove;carMove=function(st,dt,maxV){
  if(!ui.pedMode)return _cm(st,dt,maxV);
  const iv=carInput();st.v=st.v||0;
  if(iv){const ta=Math.atan2(iv[1],iv[0]);let df=wrapA(ta-st.ang);if(st.v<-.1)df=wrapA(ta-st.ang);if(Math.abs(st.v)>.1||ui.gas)st.ang=wrapA(st.ang+Math.max(-2.8*dt,Math.min(2.8*dt,df))*(st.v<0?-1:1))}
  if(!ui.brake)st.rv=0;
  if(ui.gas)st.v=st.v<0?Math.min(0,st.v+14*dt):Math.min(maxV*1.25,st.v+4.2*dt);
  else if(ui.brake){if(st.v>0){st.v=Math.max(0,st.v-14*dt);st.rv=0}else{st.rv=(st.rv||0)+dt;if(st.rv>.6)st.v=Math.max(-2.6,st.v-3*dt)}}
  else st.v=st.v>0?Math.max(0,st.v-1.6*dt):Math.min(0,st.v+3*dt);
  if(Math.abs(st.v)<.02)return false;
  const ca=Math.cos(st.ang),sa=Math.sin(st.ang),sg=Math.sign(st.v),ahead=(ox,oy,len,wd)=>{const rx=ox-S.pos.x,ry=oy-S.pos.y,al=(rx*ca+ry*sa)*sg,pe=Math.abs(-rx*sa+ry*ca);return al>0&&al<len&&pe<wd};
  for(const c of TRAF){const [ox,oy]=carXY(c);if(ahead(ox,oy,1.6,.75)){if(st.v>4)toast('💥 Attento! Hai quasi tamponato una macchina: frena prima!');st.v=0;return false}}
  for(const n of NPCS)if(n.scene==='citta'&&!n.inCar&&!n.hide&&ahead(n.x,n.y,1.1,.55)){st.v=0;return false}
  const nx=S.pos.x+ca*st.v*dt,ny=S.pos.y+sa*st.v*dt,f=.78*sg,ok=(x,y)=>drivable(x,y)&&drivable(x+ca*f,y+sa*f);
  const was=inBox(S.pos.x,S.pos.y);
  if(ok(nx,ny)){S.pos.x=nx;S.pos.y=ny}else if(ok(nx,S.pos.y))S.pos.x=nx;else if(ok(S.pos.x,ny))S.pos.y=ny;else{st.v=0;return false}
  if(!was&&inBox(S.pos.x,S.pos.y)&&st.v>1){const ax=Math.abs(ca)>Math.abs(sa)?'h':'v';if(lightAt(S.pos.x,S.pos.y,ax)==='r')multa(`sei passat${o()} con il semaforo rosso!`,167)}
  return true}}
(function(){const el=document.createElement('div');el.id='ped9';el.hidden=true;
  el.style.cssText='position:fixed;right:12px;bottom:92px;z-index:30;display:flex;gap:10px;align-items:flex-end;user-select:none;-webkit-user-select:none;touch-action:none';
  el.innerHTML=`<div id="kmh9" style="position:absolute;right:0;top:-46px;background:#1f2540;color:#7CFFB2;font:900 18px monospace;padding:4px 10px;border-radius:10px;white-space:nowrap">0 km/h</div>
   <button type="button" data-ped="brake" style="width:74px;height:62px;border-radius:14px;border:3px solid #7a1c18;background:linear-gradient(#ff6b5e,#c9302c);color:#fff;font:900 15px system-ui;box-shadow:0 4px 0 #7a1c18">🛑<br>FRENO</button>
   <button type="button" data-ped="gas" style="width:64px;height:92px;border-radius:14px;border:3px solid #17663e;background:linear-gradient(#5ee39a,#21a35f);color:#fff;font:900 13px system-ui;box-shadow:0 4px 0 #17663e">⚡<br>ACCE-<br>LERA</button>`;
  document.body.appendChild(el);
  const set=(k,v)=>{ui[k]=v;if(v)ui.pedMode=true;const b=el.querySelector(`[data-ped="${k}"]`);if(b)b.style.transform=v?'translateY(3px) scale(.96)':''};
  el.addEventListener('pointerdown',e=>{const b=e.target.closest('[data-ped]');if(!b)return;e.preventDefault();e.stopPropagation();try{b.setPointerCapture(e.pointerId)}catch(_){}set(b.dataset.ped,true)},true);
  ['pointerup','pointercancel','lostpointercapture'].forEach(t=>el.addEventListener(t,e=>{const b=e.target.closest('[data-ped]');if(b)set(b.dataset.ped,false)},true));
  addEventListener('keydown',e=>{if(!el.hidden&&(e.key==='Shift'||e.key==='z'||e.key==='Z'))set('gas',true);if(!el.hidden&&(e.key==='x'||e.key==='X'))set('brake',true)});
  addEventListener('keyup',e=>{if(e.key==='Shift'||e.key==='z'||e.key==='Z')set('gas',false);if(e.key==='x'||e.key==='X')set('brake',false)});
  setInterval(()=>{if(!S)return;const inCar=!isBusy()&&$('veil').hidden&&((S.drive&&S.drive.man)||(S.ride&&S.scene==='citta'&&isCar((bestRide()||{}).id)));
    if(el.hidden!==!inCar)el.hidden=!inCar;if(!inCar){ui.gas=ui.brake=false;return}
    const st=S.drive&&S.drive.man?S.drive:ui.car;const v=st?Math.abs(st.v||0):0;$('kmh9').textContent=(st&&st.v<-.05?'R ':'')+Math.round(v*14)+' km/h'},120)})();

/* ===== v9: il codice segreto, ancora più cose ===== */
{const _cr=cheatReply;cheatReply=function(n,t){const r=_cr(n,t);if(r&&ui.cheat)Object.assign(ui.cheat,{tele:'',maxst:false,allic:false,nomulte:!!S.flags.nomulte,allcase:false,nobill:!!S.flags.nobill,anno:0});return r}}
{const _cb=cheatBody;cheatBody=function(){const c=ui.cheat;if(!c)return '';let h=_cb();const i=h.lastIndexOf('<button class="btn hot" type="button" data-cheatgo');
  const chip=(k,v,lbl,on)=>`<button type="button" class="sw" data-cset="${k}:${v}" aria-pressed="${on}">${(on?'✓ ':'')+lbl}</button>`,sec=t=>`<div class="h3" style="margin-top:18px;padding-top:10px;border-top:2px dashed var(--line)">${t}</div>`,adult=c.age>=18;
  const pl=BUILD.filter(b=>!b.hidden).map(b=>[b.id,(b.ic||'')+' '+(typeof b.n==='function'?b.n():b.n)]);
  let x=sec('🚀 Teletrasporto')+`<div class="field"><label for="chTele">Dove vuoi andare subito?</label><select id="chTele" style="${CIN}"><option value="">Resta qui</option>${pl.map(([id,n])=>`<option value="${id}" ${c.tele===id?'selected':''}>${esc(n)}</option>`).join('')}</select></div>`;
  x+=sec('🌟 Trucchi veloci')+`<div class="field"><div class="seg wrap">${chip('maxst',1,'💯 Tutto al massimo',c.maxst)}${chip('allic',1,'🪪 Tutte le patenti',c.allic)}${chip('nomulte',1,'👮 Niente multe',c.nomulte)}${chip('nobill',1,'🧾 Niente bollette e spese',c.nobill)}${adult?chip('allcase',1,'🏘️ 6 case (tutte le più belle)',c.allcase):''}</div></div>`;
  x+=sec('⏩ Salta anni')+`<div class="field"><div class="seg wrap">${[0,1,5,10].map(n=>chip('anno',n,n?'+'+n+(n===1?' anno':' anni')+' (vivili veloce)':'No',c.anno===n)).join('')}</div><p class="note">Gli anni passano davvero: scuola, lavoro e famiglia vanno avanti.</p></div>`;
  return i<0?h+x:h.slice(0,i)+x+h.slice(i)}}
{const _ck=cheatKeep;cheatKeep=function(){_ck();const e=$('chTele');if(e&&ui.cheat)ui.cheat.tele=e.value}}
{const _cs=cheatSet;cheatSet=function(v){const c=ui.cheat,k=v.slice(0,v.indexOf(':')),x=v.slice(v.indexOf(':')+1);
  if(['maxst','allic','nomulte','allcase','nobill','anno'].includes(k)){cheatKeep();if(k==='anno')c.anno=+x;else c[k]=!c[k];
    const sc=$('sheet')&&$('sheet').querySelector('.bd'),top=sc?sc.scrollTop:0;renderSheet();const sc2=$('sheet')&&$('sheet').querySelector('.bd');if(sc2)sc2.scrollTop=top;return}
  return _cs(v)}}
{const _cg=cheatGo;cheatGo=function(){const c=ui.cheat;if(!c)return _cg();cheatKeep();const ex={...c};_cg();
  S.flags.nomulte=ex.nomulte?1:0;S.flags.nobill=ex.nobill?1:0;
  if(ex.maxst){STATS.forEach(([k])=>S.st[k]=100);S.energy=EN_MAX}
  if(ex.allic)Object.keys(LIC).forEach(k=>{if(S.age>=(LIC[k].age||0))S.lic[k]=1});
  if(ex.allcase&&S.age>=18){const best=[...CASE].sort((a,b)=>b.p-a.p);if(!S.house){const h=best[0];S.house={id:h.id,n:h.n,ic:h.ic,p:h.p,mutuo:0,rata:0}}S.houses=S.houses||[];let j=0;while(S.houses.length<5){const h=best[j++%best.length];S.houses.push({id:h.id,n:h.n,ic:h.ic,p:h.p})}}
  for(let n=0;n<(ex.anno||0)&&S.alive;n++){S.pending=null;ui.result=null;try{ageUp()}catch(e){break}}if(ex.anno&&ex.tele)S.pending=null
  if(ex.anno){ui.result=null;syncNpcs()}
  if(ex.tele){S.escort=null;S.drive=null;S.famDrive=null;if(S.scene!=='citta')S.scene='citta';const b=BUILD.find(q=>q.id===ex.tele);if(b){S.pos={x:b.dx+.5,y:b.dy+1.5};ui.kpOk=b.id;try{enterBuilding(b.id)}finally{ui.kpOk=null}toast('🚀 Teletrasporto!')}}
  save();updateHud();if(ex.anno)renderModal()}}
{const _m=multa;multa=function(w,a){if(S.flags&&S.flags.nomulte)return;return _m(w,a)}}
{const _b=bills;bills=function(a){if(S.flags&&S.flags.nobill)return;return _b(a)}}

/* ===== v9: sul computer guidi col mouse (destro accelera, sinistro frena) ===== */
const carNow9=()=>!!(S&&!isBusy()&&$('veil').hidden&&!ui.sheet&&!ui.chatNpc&&((S.drive&&S.drive.man)||(S.ride&&S.scene==='citta'&&isCar((bestRide()||{}).id))));
addEventListener('pointermove',e=>{if(e.pointerType==='mouse')ui.mAim={x:e.clientX,y:e.clientY}},true);
addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.target!==cv||!carNow9())return;e.stopImmediatePropagation()},true);
addEventListener('mousedown',e=>{if(e.target!==cv||!carNow9())return;e.preventDefault();ui.pedMode=true;ui.mouseDrive=true;if(e.button===2)ui.gas=true;else if(e.button===0)ui.brake=true},true);
addEventListener('mouseup',e=>{if(e.button===2)ui.gas=false;else if(e.button===0)ui.brake=false},true);
cv.addEventListener('contextmenu',e=>e.preventDefault());
{const _ci=carInput;carInput=function(){const v=_ci();if(v||!ui.mouseDrive||!ui.pedMode||!ui.mAim||!carNow9())return v;
  const px=S.pos.x*T-cam.x,py=S.pos.y*T-cam.y,dx=ui.mAim.x-px,dy=ui.mAim.y-py,d=Math.hypot(dx,dy);return d<24?null:[dx/d,dy/d]}}
setInterval(()=>{const c=carNow9();if(c&&!ui.mHint&&matchMedia('(pointer:fine)').matches){ui.mHint=1;toast('🖱️ Sul computer: muovi il mouse per sterzare, tasto DESTRO accelera, tasto SINISTRO frena!')}if(!c){ui.mouseDrive=false;if(ui.mHint===1&&!S.ride)ui.mHint=0}},500);

/* ===== v9: tante case diverse, giardino, piscina, aggiungi garage e pista ===== */
function houseTags(c){const t=[`📏 ${c.mq} m²`,`🏢 ${c.pi} ${c.pi===1?'piano':'piani'}`];if(c.pool)t.push('🏊 piscina');else if(c.garden)t.push('🌳 giardino (senza piscina)');if(c.terrazza)t.push('🌇 terrazza');if(c.tennis)t.push('🎾 tennis');if(c.lago)t.push('🛶 lago');if(c.cavalli)t.push('🐴 cavalli');if(c.torri)t.push('🏰 torri');return t.join(' · ')}
const myCase=()=>S&&S.house?CASE.find(c=>c.id===S.house.id):null;
document.addEventListener('click',e=>{const b=e.target.closest('[data-addon9]');if(!b)return;const [id,k]=b.dataset.addon9.split(':');ui.addon9=ui.addon9||{};const a=ui.addon9[id]=ui.addon9[id]||{};a[k]=!a[k];if(k==='p'&&a.p)a.g=true;if(k==='g'&&!a.g)a.p=false;refreshSheet()});
{const _cc=compraCasa;compraCasa=function(id,m){const had=!!S.house;const ad=(ui.addon9||{})[id]||{};_cc(id,m);
  if(!had&&S.house){const parts=[];if(ad.g){if(canPay(40000)){money(-40000);S.flags.garage=1;parts.push('🚗 garage')}else toast('Per il garage non bastano i soldi: lo puoi aggiungere dopo all\'agenzia.')}
    if(ad.p&&S.flags.garage){if(canPay(250000)){money(-250000);S.flags.pista=1;parts.push('🛩️ pista ed eliporto')}else toast('Per la pista non bastano i soldi: la puoi aggiungere dopo all\'agenzia.')}
    if(parts.length){log('Insieme alla casa hai comprato: '+parts.join(' e ')+'!');save();updateHud();setTimeout(()=>toast('Con la casa hai anche: '+parts.join(' e ')+'! 🎉'),3200)}ui.addon9={}}}}
// la porta in casa: garage, giardino, pista
PLACES.porta9={sub:()=>'Dove vuoi andare?',body:()=>{const c=myCase()||{},row=(ic,n,d,k,ok)=>`<div class="row"><div class="t"><b>${ic} ${n}</b><span>${d}</span></div><button class="btn ${ok?'hot':''}" data-porta9="${k}" ${ok?'':'disabled'}>Vai</button></div>`;
  const outd=c.garden||c.pool||c.terrazza;
  return row('🌳',c.terrazza&&!c.garden?'La terrazza':'Il giardino',outd?houseTags(c):'Questa casa non ha giardino: compra una casa più grande!','g',!!outd)+
    row('🚗','Il garage',S.flags.garage?'Le tue macchine, moto e bici':'Non ce l\'hai: lo aggiungi all\'agenzia case','c',!!S.flags.garage)+
    row('🛩️','Pista ed eliporto',S.flags.pista?'I tuoi aerei ed elicotteri':'Non ce l\'hai: la aggiungi all\'agenzia case','p',!!S.flags.pista)}};
SHEET_T.porta9=['🚪','Porta di casa tua'];
document.addEventListener('click',e=>{const b=e.target.closest('[data-porta9]');if(!b)return;closeSheet();const k=b.dataset.porta9;if(k==='g')openGiardino();else if(k==='c')openGarage();else openHangar()});
function openGiardino(){const c=myCase();if(!c)return;const terr=c.terrazza&&!c.garden,w=c.pool&&(c.tennis||c.lago||c.cavalli)?28:22,h=14,F=[];
  const em=(x,y,e,act,lbl)=>{const f=fu('emo9',x,y,1,1,act||null,lbl||null);f.emo=e;F.push(f)};
  if(c.pool)F.push(fu('pool9',2,2,8,5,'tuffo9','Tuffati in piscina'));
  if(c.tennis)F.push(fu('court9',w-11,2,9,6,'tennis9','Gioca a tennis'));
  else if(c.lago)F.push(fu('lake9',w-11,1,10,7,'barca9','Giro in barchetta'));
  if(c.cavalli){em(w-4,10,'🐴','cavallo9','Fai un giro a cavallo');em(w-6,11,'🐎','cavallo9','Fai un giro a cavallo');em(w-3,8,'🏚️')}
  if(c.pool){em(2,8,'🏖️','relax9','Lettino al sole');em(4,8,'🏖️','relax9','Lettino al sole')}
  if(terr){em(w-3,2,'🔭','panorama9','Guarda il panorama');em(1,2,'🪴');em(w-2,6,'🪴')}
  else{em(c.pool?12:3,9,'🍖','bbq9','Fai una grigliata');em(1,11,'🌳');em(w-2,1,'🌳');em(c.pool?14:6,3,'🌷');em(c.pool?11:9,2,'⛲','fontana9','Lancia una monetina')}
  if(c.torri){em(1,1,'🏰');em(w-2,12,'🏰')}
  room('giardino9',w,h,terr?'#c9ccd2':'#7fb069',terr?'#bfc2c8':'#78a862',terr?'#bfe0f5':'#cfe8f5',F);
  S.scene='giardino9';S.pos={x:Math.floor(w/2)+.5,y:h-1.6};S.face='u';ui.walk=null;save();updateHud();
  toast(c.pool?'🏊 Il tuo giardino con la piscina!':terr?'🌇 La tua terrazza: che panorama!':'🌳 Il tuo giardino!')}
SCN.giardino9={ic:'🌳',n:'Il tuo giardino'};
{const _xb=exitBuilding;exitBuilding=function(){if(S.scene==='giardino9'){S.scene='casamia';S.pos={x:13.5,y:13.4};S.face='u';ui.walk=null;save();updateHud();return}return _xb()}}
setTimeout(()=>{try{if(S&&S.scene==='giardino9')openGiardino()}catch(e){}},0);
const GACT={tuffo9:['Splash! Ti tuffi a bomba in piscina! 🏊💦','fel',6],tennis9:['Partita a tennis: vinci 6 a 4! 🎾','spo',4],barca9:['Fai un giro in barchetta sul lago: vedi le anatre! 🛶🦆','fel',5],cavallo9:['Galoppi nel prato con il tuo cavallo! 🐴','fel',6],relax9:['Ti sdrai sul lettino al sole. Che relax! 😎','fel',3],panorama9:['Dal telescopio vedi tutta la città, fino al mare! 🔭','int',2],bbq9:['Grigliata in giardino: salsicce e pannocchie! 🌽🍖','fel',4],fontana9:['Lanci una monetina nella fontana ed esprimi un desiderio… 🪙✨','fel',2]};
{const _uf=useFurn;useFurn=function(f){const a=f.act||'';
  if(a==='garage9'&&S.scene==='casamia')return openPlace('porta9');
  if(GACT[a]){const [m,st,v]=GACT[a];if(!useEn(1))return;add(st,v);add('fel',1);log(m);save();updateHud();ui.result={ic:'😄',title:'Che bello!',text:m,chips:[]};renderModal();return}
  return _uf(f)}}
{const _d=drawFurn9;drawFurn9=function(fu,X,Y,w,h,t,box){const c=cx;
  if(fu.k==='emo9'){c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(X+w/2,Y+h-6,14,5,0,0,7);c.fill();c.fillStyle='#000';c.font='34px system-ui';c.textAlign='center';c.textBaseline='alphabetic';c.fillText(fu.emo||'🌳',X+w/2,Y+h-6);return}
  if(fu.k==='pool9'){c.fillStyle='#e8e2d4';c.fillRect(X,Y,w,h);const g=c.createLinearGradient(0,Y,0,Y+h);g.addColorStop(0,'#7fdcf5');g.addColorStop(1,'#2a9fd6');c.fillStyle=g;c.fillRect(X+8,Y+8,w-16,h-16);c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=2;for(let k=0;k<5;k++){const yy=Y+16+k*(h-30)/4+Math.sin(t*2+k)*2;c.beginPath();c.moveTo(X+14,yy);c.bezierCurveTo(X+w*.35,yy-4,X+w*.65,yy+4,X+w-14,yy);c.stroke()}c.fillStyle='#c0c4ca';c.fillRect(X+w-26,Y+4,4,16);c.fillRect(X+w-16,Y+4,4,16);return}
  if(fu.k==='court9'){c.fillStyle='#3e8e5a';c.fillRect(X,Y,w,h);c.fillStyle='#c4663f';c.fillRect(X+8,Y+8,w-16,h-16);c.strokeStyle='#fff';c.lineWidth=2;c.strokeRect(X+12,Y+12,w-24,h-24);c.beginPath();c.moveTo(X+w/2,Y+8);c.lineTo(X+w/2,Y+h-8);c.moveTo(X+12,Y+h/2);c.lineTo(X+w-12,Y+h/2);c.stroke();c.fillStyle='#333';c.fillRect(X+w/2-1,Y+4,3,h-8);return}
  if(fu.k==='lake9'){const g=c.createRadialGradient(X+w/2,Y+h/2,10,X+w/2,Y+h/2,w/2);g.addColorStop(0,'#4fa3d1');g.addColorStop(1,'#2c6e99');c.fillStyle=g;c.beginPath();c.ellipse(X+w/2,Y+h/2,w/2,h/2,0,0,7);c.fill();c.fillStyle='#8a6a4f';c.fillRect(X+w/2-8,Y+h/2,16,h/2+4);c.font='30px system-ui';c.textAlign='center';c.fillText('🛶',X+w*.3,Y+h*.45);c.fillText('🦆',X+w*.7,Y+h*.35+Math.sin(t)*3);return}
  return _d(fu,X,Y,w,h,t,box)}}

/* ===== v9: migliora casa tua, tante cose in più ===== */
const UPG2=[
 {k:'garden',n:'Giardino',ic:'🌳',p:20000,d:'Prato, alberi, fontana e barbecue'},
 {k:'pool',n:'Piscina',ic:'🏊',p:60000,d:'Per tuffarti a bomba!'},
 {k:'idro',n:'Idromassaggio',ic:'🛁',p:15000,d:'Acqua calda con le bollicine'},
 {k:'scivolo',n:'Scivolo d\'acqua',ic:'🌊',p:25000,d:'Ti butti dritto in piscina (serve la piscina)',need:'pool'},
 {k:'trampolino',n:'Tappeto elastico',ic:'🤸',p:3000,d:'Salti altissimi'},
 {k:'alberello',n:'Casa sull\'albero',ic:'🌲',p:12000,d:'Il tuo rifugio segreto'},
 {k:'calcetto',n:'Campo da calcetto',ic:'⚽',p:45000,d:'Per giocare con gli amici'},
 {k:'tennis',n:'Campo da tennis',ic:'🎾',p:80000,d:'Terra rossa come i campioni'},
 {k:'basket',n:'Canestro da basket',ic:'🏀',p:2000,d:'Tiri liberi in giardino'},
 {k:'cavalli',n:'Stalla con i cavalli',ic:'🐴',p:150000,d:'Due cavalli tutti tuoi'},
 {k:'lago',n:'Laghetto con la barchetta',ic:'🛶',p:90000,d:'Con le anatre'},
 {k:'orto',n:'Orto',ic:'🥕',p:1500,d:'Pomodori, carote e fragole'},
 {k:'cinema',n:'Cinema in casa',ic:'🎬',p:35000,d:'Schermo gigante e popcorn'},
 {k:'palestra',n:'Palestra',ic:'🏋️',p:30000,d:'Pesi, tapis roulant e cyclette'},
 {k:'giochi',n:'Sala giochi',ic:'🕹️',p:20000,d:'Videogiochi, flipper e biliardino'},
 {k:'sauna',n:'Sauna',ic:'🧖',p:18000,d:'Per rilassarti al caldo'},
 {k:'pannelli',n:'Pannelli solari',ic:'☀️',p:25000,d:'Bollette più basse: −1.000 € all\'anno'},
 {k:'robot',n:'Robot aspirapolvere',ic:'🤖',p:800,d:'Pulisce da solo'},
 {k:'ascensore',n:'Ascensore',ic:'🛗',p:40000,d:'Niente più scale'},
 {k:'allarme',n:'Allarme e telecamere',ic:'🚨',p:5000,d:'Casa sicura'},
 {k:'eliporto2',n:'Secondo eliporto',ic:'🚁',p:120000,d:'Per due elicotteri (serve la pista)',need:'pista'}];
const hasH=k=>!!(((myCase()||{})[k])||(S.flags&&(S.flags['u_'+k]||S.flags[k])));
function buyUpg2(k){const u=UPG2.find(x=>x.k===k);if(!u||!S.house)return;if(hasH(k))return toast('Ce l\'hai già! ✓');
  if(u.need&&!hasH(u.need))return toast(u.need==='pool'?'Prima compra la piscina! 🏊':'Prima compra la pista per aerei! 🛩️');
  if(!canPay(u.p))return toast('Non hai abbastanza soldi. 💸');money(-u.p);S.flags['u_'+k]=1;add('fel',4);
  const m=`Hai aggiunto: ${u.ic} ${u.n}! Lo trovi in casa tua: tocca la porta in basso nel salotto e scegli «Il giardino».`;log(m);save();updateHud();refreshSheet();toast(m)}
{const _ab=PLACES.agenzia.body;PLACES.agenzia.body=()=>{const h=_ab();if(S.age<18||!S.house)return h;
  return h+`<div class="h3">✨ Ancora più cose per casa tua</div>`+UPG2.map(u=>{const has=hasH(u.k),ok=canPay(u.p)&&!has&&(!u.need||hasH(u.need));
    return `<div class="row"><div class="t"><b>${u.ic} ${u.n}</b><span>${has?'Ce l\'hai ✓':eur(u.p)+' · '+u.d}</span></div>${has?'<span class="tag ok">✓</span>':`<button class="btn ${ok?'hot':''}" data-upg2="${u.k}" ${ok?'':'disabled'}>Aggiungi</button>`}</div>`}).join('')}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-upg2]');if(b)buyUpg2(b.dataset.upg2)});
{const _b=bills;bills=function(a){if(S&&S.flags&&S.flags.u_pannelli&&a>=1000)a-=1000;return _b(a)}}
const OUT_K=['garden','pool','terrazza','tennis','lago','cavalli','idro','scivolo','trampolino','alberello','calcetto','basket','orto','cinema','palestra','giochi','sauna'];
const hasOut=()=>OUT_K.some(hasH);
openGiardino=function(){const c=myCase();if(!c)return;const terr=hasH('terrazza')&&!hasH('garden')&&!OUT_K.slice(3).some(hasH),F=[];
  const em=(x,y,e,act,lbl)=>{const f=fu('emo9',x,y,1,1,act||null,lbl||null);f.emo=e;F.push(f)};
  let x=2;const big=[];if(hasH('pool'))big.push(['pool9',8,5,'tuffo9','Tuffati in piscina']);if(hasH('tennis'))big.push(['court9',9,6,'tennis9','Gioca a tennis']);if(hasH('calcetto'))big.push(['court9',9,6,'calcio9','Partita a calcetto']);if(hasH('lago'))big.push(['lake9',10,6,'barca9','Giro in barchetta']);
  big.forEach(([k,w,h,a,l])=>{const f=fu(k,x,2,w,h,a,l);if(a==='calcio9')f.green=1;F.push(f);x+=w+2});
  const W=Math.max(22,x+1),H=16;
  const small=[];const add=(k,e,a,l)=>{if(hasH(k))small.push([e,a,l])};
  if(hasH('pool')){small.push(['🏖️','relax9','Lettino al sole'])}
  add('scivolo','🌊','scivolo9','Scivolo d\'acqua');add('idro','🛁','idro9','Idromassaggio');add('trampolino','🤸','salta9','Tappeto elastico');add('alberello','🌲','albero9','Casa sull\'albero');add('basket','🏀','basket9','Tiri a canestro');
  add('cavalli','🐴','cavallo9','Giro a cavallo');add('orto','🥕','orto9','Raccogli le verdure');add('cinema','🎬','cinema9','Guarda un film');add('palestra','🏋️','palestra9','Allenati');add('giochi','🕹️','giochi9','Gioca ai videogiochi');add('sauna','🧖','sauna9','Sauna');
  if(terr)small.push(['🔭','panorama9','Guarda il panorama']);else small.push(['🍖','bbq9','Fai una grigliata'],['⛲','fontana9','Lancia una monetina']);
  small.forEach(([e,a,l],i)=>em(2+(i%Math.floor((W-4)/3))*3,9+Math.floor(i/Math.floor((W-4)/3))*2,e,a,l));
  if(!terr){em(1,1,'🌳');em(W-2,1,'🌳');em(1,13,'🌷');em(W-2,13,'🌷')}else{em(1,1,'🪴');em(W-2,1,'🪴')}
  if(hasH('torri')){em(W-3,13,'🏰')}
  room('giardino9',W,H,terr?'#c9ccd2':'#7fb069',terr?'#bfc2c8':'#78a862',terr?'#bfe0f5':'#cfe8f5',F);
  S.scene='giardino9';S.pos={x:Math.floor(W/2)+.5,y:H-1.6};S.face='u';ui.walk=null;save();updateHud();
  toast(hasH('pool')?'🏊 Il tuo giardino con la piscina!':terr?'🌇 La tua terrazza: che panorama!':'🌳 Il tuo giardino!')};
Object.assign(GACT,{calcio9:['Partita a calcetto con gli amici: segni una tripletta! ⚽','spo',4],scivolo9:['Wiiii! Giù dallo scivolo dritto in piscina! 🌊','fel',6],idro9:['Bollicine calde nell\'idromassaggio: che relax! 🛁','sal',3],salta9:['Salti altissimo sul tappeto elastico e fai una capriola! 🤸','spo',3],albero9:['Ti rifugi nella casa sull\'albero e leggi un fumetto. 🌲📖','fel',4],basket9:['Canestro da tre punti! 🏀','spo',3],orto9:['Raccogli pomodori, carote e fragole dal tuo orto! 🍅🥕🍓','sal',3],cinema9:['Popcorn e film sullo schermo gigante! 🍿🎬','fel',5],palestra9:['Un\'ora di allenamento: ti senti fortissim'+'o! 💪','spo',5],giochi9:['Partita ai videogiochi e al flipper! 🕹️','fel',5],sauna9:['Un po\' di caldo in sauna, poi una doccia fresca. 🧖','sal',3]});
PLACES.porta9.body=(()=>{const _pb=PLACES.porta9.body;return()=>{const h=_pb();if(hasOut()&&h.includes('data-porta9="g" disabled')){return h.replace('data-porta9="g" disabled','data-porta9="g"').replace('class="btn " data-porta9="g"','class="btn hot" data-porta9="g"')}return h}})();

/* ===== v9: codice segreto, pulsante «Torna a casa tua» ===== */
{const _cr=cheatReply;cheatReply=function(n,t){const r=_cr(n,t);if(r&&ui.cheat)ui.cheat.homeBtn=!!S.flags.homeBtn;return r}}
{const _cb=cheatBody;cheatBody=function(){const c=ui.cheat;if(!c)return '';const h=_cb(),i=h.lastIndexOf('<button class="btn hot" type="button" data-cheatgo');
  const x=`<div class="h3" style="margin-top:18px;padding-top:10px;border-top:2px dashed var(--line)">🏠 Pulsante veloce</div><div class="field"><div class="seg wrap"><button type="button" class="sw" data-cset="homeBtn:1" aria-pressed="${!!c.homeBtn}">${c.homeBtn?'✓ ':''}🏠 Pulsante «Torna a casa tua» in basso a destra</button></div><p class="note">Lo tocchi e sei subito a casa, da qualsiasi posto.</p></div>`;
  return i<0?h+x:h.slice(0,i)+x+h.slice(i)}}
{const _cs=cheatSet;cheatSet=function(v){if(v.startsWith('homeBtn:')){cheatKeep();ui.cheat.homeBtn=!ui.cheat.homeBtn;const sc=$('sheet')&&$('sheet').querySelector('.bd'),top=sc?sc.scrollTop:0;renderSheet();const sc2=$('sheet')&&$('sheet').querySelector('.bd');if(sc2)sc2.scrollTop=top;return}return _cs(v)}}
{const _cg=cheatGo;cheatGo=function(){const c=ui.cheat;const hb=c?!!c.homeBtn:null;_cg();if(hb!=null){S.flags.homeBtn=hb?1:0;save()}}}
function goHomeNow(){if(!S||!S.alive)return;closeSheet();if(ui.chatNpc)closeChat();S.escort=null;S.drive=null;S.famDrive=null;S.ride=false;S.carOut=false;ui.walk=null;ui.match=null;
  if(S.trip)return toast('Sei in vacanza! Per tornare prendi l\'aereo all\'aeroporto. ✈️');
  S.scene=HOME();const sc=SC[S.scene];S.pos={x:3.5,y:5.5};if(sc&&!free(S.pos.x,S.pos.y))S.pos={x:sc.door.x+.5,y:sc.h-1.6};S.face='d';syncNpcs();save();updateHud();toast('🏠 Eccoti a casa!')}
(function(){const b=document.createElement('button');b.id='home9';b.type='button';b.hidden=true;b.innerHTML='🏠<small style="display:block;font-size:11px;font-weight:800">Casa tua</small>';
  b.style.cssText='position:fixed;z-index:5;right:max(12px,env(safe-area-inset-right,0px));bottom:calc(118px + env(safe-area-inset-bottom,0px));width:72px;height:64px;border-radius:20px;border:3px solid var(--ink,#1f2540);background:#ffd166;font-size:26px;line-height:1;box-shadow:0 4px 0 rgba(31,37,64,.35);font-family:inherit;color:#1f2540';
  b.addEventListener('click',goHomeNow);document.body.appendChild(b);
  setInterval(()=>{if(!S)return;const p=$('ped9'),show=!!(S.flags&&S.flags.homeBtn)&&S.alive!==false&&!ui.sheet&&!ui.chatNpc&&$('veil').hidden&&!isBusy()&&(!p||p.hidden)&&S.scene!==HOME();if(b.hidden!==!show)b.hidden=!show},300)})();

/* ===== v9: volare davvero sopra la città ===== */
let ZOOM9=1;
const AIRK={mongolfiera:{max:2.5,acc:1.2,turn:1.2,hover:1,sz:56},aereo:{max:11,acc:3,turn:1.5,min:3.5,sz:58},elicottero:{max:8,acc:4,turn:2.6,hover:1,sz:58},jet:{max:16,acc:4.5,turn:1.3,min:5,sz:62}};
vola=function(id){const a=AEREI.find(x=>x.id===id);if(!a)return;if(!S.lic.pilota)return toast('🪪 Per volare serve il brevetto di pilota: lo prendi alla scuola guida in concessionaria!');
  ui.volaId=id;if(compList().length)return openPlace('volo9');startAir(id)};
volaGo=function(){const id=ui.volaId;closeSheet();takeComp();startAir(id)};
function startAir(id){const a=AEREI.find(x=>x.id===id);if(!a)return;const k=AIRK[id]||AIRK.aereo,h=BUILD.find(b=>b.id==='casamia')||BUILD[0];
  ui.air={id,ic:a.ic,n:a.n,k,alt:.05,talt:.45,ang:-Math.PI/2,v:k.min||0,t:0,with:comNames()};
  S.scene='citta';S.ride=false;S.escort=null;S.drive=null;S.famDrive=null;ui.walk=null;S.pos={x:h.dx+.5,y:h.dy+1.5};
  add('fel',4);log(`${a.ic} Sei decollat${o()} con: ${a.n}!`);save();updateHud();
  toast(`${a.ic} Decollo! Muovi il dito (o le frecce) per andare avanti, indietro e girare. ⬆️ SALI e ⬇️ SCENDI per l'altezza. 🛬 per atterrare.`)}
function endAir(){const a=ui.air;if(!a)return;ui.air=null;ZOOM9=1;ui.airUp=ui.airDn=false;const w=a.with;
  if(S.flags.pista)openHangar();else{S.scene=HOME();S.pos={x:3.5,y:5.5}}
  const m=`${a.ic} Atterraggio perfetto!${w?' Con te: '+w+'.':''} Che bel volo sopra ${S.city}! ☁️`;log(m);add('fel',6);save();updateHud();ui.result={ic:'🛬',title:'Atterrat'+o()+'!',text:m,chips:[]};renderModal()}
{const _st=step;step=function(dt){const A=ui.air;if(!A||!S||S.scene!=='citta')return _st(dt);
  npcTick(dt);if(isBusy()){return}
  const k=A.k,iv=carInput();A.t+=dt;
  if(ui.airUp)A.talt=Math.min(1,A.talt+.45*dt);if(ui.airDn)A.talt=Math.max(0,A.talt-.45*dt);
  A.alt+=(A.talt-A.alt)*Math.min(1,dt*1.6);
  if(iv){const ta=Math.atan2(iv[1],iv[0]),df=wrapA(ta-A.ang);
    if(k.hover&&Math.abs(df)>2.4){A.v=Math.max(-k.max*.5,A.v-k.acc*dt)}
    else{A.ang=wrapA(A.ang+Math.max(-k.turn*dt,Math.min(k.turn*dt,df)));A.v=Math.min(k.max,A.v+k.acc*dt)}}
  else{const mn=k.min||0;A.v=A.v>mn?Math.max(mn,A.v-k.acc*.6*dt):A.v<mn?Math.min(mn,A.v+k.acc*dt):A.v}
  if(ui.gas)A.v=Math.min(k.max*1.2,A.v+k.acc*dt);if(ui.brake)A.v=Math.max(k.hover?-k.max*.5:(k.min||0),A.v-k.acc*1.5*dt);
  S.pos.x=Math.max(1,Math.min(W-2,S.pos.x+Math.cos(A.ang)*A.v*dt));S.pos.y=Math.max(1,Math.min(H-2,S.pos.y+Math.sin(A.ang)*A.v*dt));
  S.moving=A.v>.1;near=null;$('actBtn').hidden=true;$('tip').hidden=true;
  if(!k.min&&A.alt<.02&&A.talt<=0&&!ui.landAsk){ui.landAsk=1;setTimeout(()=>{ui.landAsk=0},4000);toast('Sei a terra: tocca 🛬 per scendere.')}}}
{const _dr=draw;draw=function(t){const A=ui.air;if(!A||!S||S.scene!=='citta'){ZOOM9=1;return _dr(t)}
  const Z=1-A.alt*.55,vw=VW,vh=VH;ZOOM9=Z;VW=vw/Z;VH=vh/Z;try{_dr(t)}finally{VW=vw;VH=vh;ZOOM9=1}
  const c=cx;c.setTransform(DPR,0,0,DPR,0,0);
  // ombra a terra e il mezzo
  const px=(S.pos.x*T-cam.x)*Z,py=(S.pos.y*T-cam.y)*Z,off=A.alt*90;
  c.fillStyle=`rgba(0,0,0,${.28-A.alt*.15})`;c.beginPath();c.ellipse(px+off*.6,py+off,22*Z+6,9*Z+3,0,0,7);c.fill();
  // nuvole quando sei in alto
  if(A.alt>.35){c.fillStyle=`rgba(255,255,255,${Math.min(.55,(A.alt-.35)*1.2)})`;for(let i=0;i<7;i++){const cxp=((i*263+A.t*18-S.pos.x*6)%(VW+300)+VW+300)%(VW+300)-150,cyp=((i*197-S.pos.y*6)%(VH+200)+VH+200)%(VH+200)-100;[[0,0,40],[30,6,30],[-30,8,28],[10,-14,26]].forEach(([dx,dy,r])=>{c.beginPath();c.arc(cxp+dx,cyp+dy,r,0,7);c.fill()})}}
  c.save();c.fillStyle='#000';c.globalAlpha=1;c.translate(px,py-8-A.alt*10);const sz=A.k.sz*(1+A.alt*.35);const ang=A.ang;
  if(A.id==='mongolfiera'){c.font=sz+'px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(A.ic,0,Math.sin(A.t*2)*3)}
  else{c.rotate(ang+(A.id==='elicottero'?0:Math.PI/4));if(A.id==='elicottero')c.scale(Math.cos(ang)<0?1:-1,1);c.font=sz+'px system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText(A.ic,0,0);
    if(A.id==='elicottero'){c.strokeStyle='rgba(40,40,40,.55)';c.lineWidth=3;const r=A.t*30;c.beginPath();c.moveTo(Math.cos(r)*30,-18+Math.sin(r)*6);c.lineTo(-Math.cos(r)*30,-18-Math.sin(r)*6);c.stroke()}}
  c.restore();
  // strumenti
  const alt=Math.round(A.alt*900),kmh=Math.round(Math.abs(A.v)*22);c.fillStyle='rgba(31,37,64,.85)';rr(c,12,VH-118,190,52,12);c.fill();c.fillStyle='#7CFFB2';c.font='800 15px monospace';c.textAlign='left';c.textBaseline='middle';
  c.fillText(`↕ ${alt} m`,24,VH-101);c.fillText(`➜ ${kmh} km/h${A.v<-.1?' (indietro)':''}`,24,VH-81)}}
// bottoni Sali / Scendi / Atterra
(function(){const el=document.createElement('div');el.id='air9';el.hidden=true;el.style.cssText='position:fixed;right:12px;bottom:calc(24px + env(safe-area-inset-bottom,0px));z-index:30;display:grid;gap:8px;user-select:none;-webkit-user-select:none;touch-action:none';
  const bs='width:84px;height:58px;border-radius:16px;border:3px solid #1f2540;font:900 15px system-ui;color:#fff;box-shadow:0 4px 0 #1f2540';
  el.innerHTML=`<button type="button" data-air="up" style="${bs};background:linear-gradient(#5ec8ff,#2f86d6)">⬆️<br>SALI</button><button type="button" data-air="dn" style="${bs};background:linear-gradient(#ffb15e,#e07a1f)">⬇️<br>SCENDI</button><button type="button" data-air="land" style="${bs};background:linear-gradient(#5ee39a,#21a35f)">🛬<br>ATTERRA</button>`;
  document.body.appendChild(el);
  const set=(k,v)=>{if(k==='up')ui.airUp=v;if(k==='dn')ui.airDn=v};
  el.addEventListener('pointerdown',e=>{const b=e.target.closest('[data-air]');if(!b)return;e.preventDefault();e.stopPropagation();const k=b.dataset.air;if(k==='land')return endAir();try{b.setPointerCapture(e.pointerId)}catch(_){}set(k,true);b.style.transform='scale(.95)'},true);
  ['pointerup','pointercancel','lostpointercapture'].forEach(t=>el.addEventListener(t,e=>{const b=e.target.closest('[data-air]');if(b){set(b.dataset.air,false);b.style.transform=''}},true));
  addEventListener('keydown',e=>{if(!ui.air)return;if(e.key==='q'||e.key==='Q'||e.key==='PageUp'||e.key==='+')ui.airUp=true;if(e.key==='e'||e.key==='E'||e.key==='PageDown'||e.key==='-')ui.airDn=true;if(e.key==='l'||e.key==='L')endAir()});
  addEventListener('keyup',e=>{if('qQ+'.includes(e.key)||e.key==='PageUp')ui.airUp=false;if('eE-'.includes(e.key)||e.key==='PageDown')ui.airDn=false});
  addEventListener('wheel',e=>{if(!ui.air)return;ui.air.talt=Math.max(0,Math.min(1,ui.air.talt+(e.deltaY<0?.08:-.08)))},{passive:true});
  setInterval(()=>{const on=!!(ui.air&&S&&S.scene==='citta'&&!ui.sheet&&$('veil').hidden);if(el.hidden!==!on)el.hidden=!on;if(ui.air&&S&&S.scene!=='citta'){ui.air=null}},200)})();
{const _ft=followTick;followTick=function(dt){if(ui.air)return;return _ft(dt)}}
{const _gh=goHomeNow;goHomeNow=function(){ui.air=null;return _gh()}}

{const _dp=drawPlayer;drawPlayer=function(t){if(ui.air&&S.scene==='citta')return;return _dp(t)}}

/* ===== v9: pulsante veloce «Seguitemi» / «Non seguitemi più» ===== */
(function(){const b=document.createElement('button');b.id='fol9';b.type='button';b.hidden=true;
  b.style.cssText='position:fixed;z-index:5;left:max(12px,env(safe-area-inset-left,0px));bottom:calc(118px + env(safe-area-inset-bottom,0px));padding:10px 14px;border-radius:18px;border:3px solid #1f2540;font:900 15px system-ui;box-shadow:0 4px 0 rgba(31,37,64,.35);color:#1f2540;max-width:220px';
  document.body.appendChild(b);
  const nearFam=()=>{const ids=compList().map(c=>c.id),F=S.follow||[];return NPCS.filter(n=>ids.includes(n.id)&&!F.includes(n.id)&&n.scene===S.scene&&!n.inCar&&!n.hide&&Math.hypot(n.x-S.pos.x,n.y-S.pos.y)<3)};
  b.addEventListener('click',()=>{const F=folIds();if(b.dataset.m==='stop'){F.slice().forEach(id=>{const n=NPCS.find(x=>x.id===id);if(n){n.fol=0;sendHome(n)}});S.follow=[];save();toast('👋 Va bene, tornano tutti a casa!')}
    else{const L=nearFam();S.follow=S.follow||[];L.forEach(n=>{if(!S.follow.includes(n.id))S.follow.push(n.id)});ui.trail9=[];save();toast('👣 Ti seguono: '+L.map(n=>n.name).join(', ')+'!')}});
  setInterval(()=>{if(!S||!S.alive){b.hidden=true;return}const busy=ui.sheet||ui.chatNpc||!$('veil').hidden||isBusy()||ui.air;if(busy){b.hidden=true;return}
    const F=folIds(),L=nearFam();let m='',txt='';
    if(L.length){m='go';txt='👣 Seguitemi'+(L.length===1?' ('+L[0].name.split(' ')[0]+')':'')}else if(F.length){m='stop';txt='🚫 Non seguitemi più'}
    if(!m){b.hidden=true;return}b.dataset.m=m;if(b.textContent!==txt)b.textContent=txt;b.style.background=m==='go'?'#d9f5e6':'#ffe1d6';b.hidden=false},300)})();
