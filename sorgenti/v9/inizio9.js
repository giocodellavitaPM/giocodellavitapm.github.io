/* ================= v9: schermata iniziale più bella e più completa, e la scena della nascita ================= */
{const st=document.createElement('style');st.id='inizio9';st.textContent=`
#screen.st9{background:linear-gradient(180deg,#0b1030 0%,#1d2a5c 38%,#5b3f78 62%,#e0846a 82%,#f6c27a 100%)!important}
#screen.st9 .in{position:relative;z-index:2;padding-bottom:30px}
#sky9{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
#sky9 .star{position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;animation:tw9 3s ease-in-out infinite}
@keyframes tw9{0%,100%{opacity:.25}50%{opacity:1}}
#sky9 .moon{position:absolute;right:9%;top:7%;width:54px;height:54px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fffbe6,#f3e3a2 60%,#d9c27a);box-shadow:0 0 40px rgba(255,240,180,.55)}
@media (max-width:520px){#sky9 .moon{width:34px;height:34px;right:5%;top:2.5%;opacity:.85}}
#sky9 .cl{position:absolute;height:22px;border-radius:30px;background:rgba(255,255,255,.12);filter:blur(2px);animation:cl9 linear infinite}
@keyframes cl9{from{transform:translateX(-30vw)}to{transform:translateX(130vw)}}
#sky9 svg{position:absolute;left:0;right:0;bottom:0;width:100%;height:42%}
#screen.st9 h1{font-size:52px!important;line-height:1;margin:6px 0 0;background:linear-gradient(90deg,#7dffb3,#3fd98a,#bff7ff);-webkit-background-clip:text;background-clip:text;color:transparent!important;text-shadow:none!important;filter:drop-shadow(0 0 14px rgba(63,217,138,.55))}
#screen.st9 .tag9{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
#screen.st9 .tag9 span{background:rgba(5,12,8,.65);border:1px solid rgba(63,217,138,.45);color:#dfffe9;border-radius:99px;padding:4px 10px;font:800 12px var(--f-body)}
#screen.st9 .life9{display:flex;align-items:flex-end;justify-content:space-between;gap:4px;margin:14px 0 4px;padding:10px 12px;border-radius:18px;background:rgba(5,12,8,.6);border:1px solid rgba(63,217,138,.35)}
#screen.st9 .life9 div{display:grid;justify-items:center;gap:2px;font:800 10px var(--f-body);color:#bfe9cf;flex:1;position:relative}
#screen.st9 .life9 div b{font-size:24px;animation:hop9 2.4s ease-in-out infinite}
#screen.st9 .life9 div:not(:last-child)::after{content:'';position:absolute;right:-6px;top:14px;width:12px;height:2px;background:rgba(63,217,138,.6)}
@keyframes hop9{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
#screen.st9 #prev{width:96px!important;height:120px!important;background:radial-gradient(circle at 50% 30%,#f6fbff,#cfe7f7)!important;animation:hop9 2.6s ease-in-out infinite}
.dice9{border:1.5px solid var(--neon,#3fd98a);background:#0b1610;color:#fff;border-radius:12px;width:44px;height:44px;font-size:22px;cursor:pointer;flex:none;align-self:flex-end}
.dice9:active{transform:rotate(30deg) scale(.95)}
.ch9{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
.ch9 button{display:flex;gap:8px;align-items:center;text-align:left;border-radius:14px;padding:9px 10px;border:1.5px solid rgba(63,217,138,.32);background:#0b1610;color:#eafff2;font:700 13px var(--f-body);cursor:pointer}
.ch9 button small{display:block;color:#8fd9ad;font-weight:700;font-size:11px}
.ch9 button[aria-pressed="true"]{border-color:#3fd98a;background:#0f5a30;box-shadow:0 0 12px rgba(63,217,138,.45)}
.ch9 button i{font-style:normal;font-size:22px}
html.tn9 .ch9 button,html.tn9 .dice9{background:#fff;color:#1f2540;border-color:#d6d9e6}html.tn9 .ch9 button small{color:#5b6280}html.tn9 .ch9 button[aria-pressed="true"]{background:#e3f6ea;border-color:#2e9e5b}
#born{position:relative;overflow:hidden}#born::after{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.35) 50%,transparent 70%);transform:translateX(-100%);animation:sh9 2.8s ease-in-out infinite}
@keyframes sh9{60%,100%{transform:translateX(100%)}}
/* scena della nascita */
#nasc9{position:fixed;inset:0;z-index:90;display:grid;place-items:center;background:radial-gradient(ellipse at 50% 30%,#22336e 0%,#0c1233 60%,#05070f 100%);color:#fff;text-align:center;overflow:hidden;cursor:pointer;opacity:0;transition:opacity .6s}
#nasc9.on{opacity:1}#nasc9.out{opacity:0}
#nasc9 .st{position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;animation:tw9 2.5s infinite}
#nasc9 .bx{position:relative;z-index:2;max-width:440px;padding:20px}
#nasc9 .l1{font:800 18px var(--f-body);color:#cfe0ff;opacity:0;transform:translateY(10px);transition:all .8s}
#nasc9 .bb{font-size:84px;margin:10px 0;opacity:0;transform:scale(.4);transition:all .9s cubic-bezier(.2,1.6,.4,1)}
#nasc9 .l2{font:900 34px var(--f-disp);line-height:1.1;opacity:0;transition:all .8s;background:linear-gradient(90deg,#ffd6e8,#fff,#c9f7ff);-webkit-background-clip:text;background-clip:text;color:transparent}
#nasc9 .card{margin-top:16px;padding:14px 16px;border-radius:18px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.22);font:700 14px var(--f-body);line-height:1.6;opacity:0;transform:translateY(12px);transition:all .8s;text-align:left;color:#eef3ff}
#nasc9 .go{margin-top:18px;opacity:0;transition:opacity .8s;font:900 18px var(--f-disp);padding:12px 26px;border-radius:99px;border:2px solid #3fd98a;background:#0b1610;color:#3fd98a;box-shadow:0 0 16px rgba(63,217,138,.5);cursor:pointer}
#nasc9.s1 .l1,#nasc9.s2 .bb,#nasc9.s3 .l2,#nasc9.s4 .card,#nasc9.s5 .go{opacity:1;transform:none}
#nasc9 .cf{position:absolute;top:-12px;width:8px;height:12px;border-radius:2px;animation:cf9 linear forwards}
@keyframes cf9{to{transform:translateY(110vh) rotate(720deg)}}
#nasc9 .skip{position:absolute;bottom:14px;right:16px;font:700 12px var(--f-body);color:#9fb0d8}
`;document.head.appendChild(st)}
const CHAR9=[['curioso','🔍','Curios@','Impari più in fretta','int'],['simpatico','😄','Simpatic@','Fai amicizia facilmente','sim'],['sportivo','⚽','Sportiv@','Corri e giochi meglio','spo'],['allegro','🌈','Allegr@','Sei sempre di buon umore','fel']];
const SEAS9=[['primavera','🌸','Primavera'],['estate','☀️','Estate'],['autunno','🍂','Autunno'],['inverno','❄️','Inverno']];
ui.st9=ui.st9||{car:'curioso',sea:['inverno','inverno','primavera','primavera','primavera','estate','estate','estate','autunno','autunno','autunno','inverno'][new Date().getMonth()]};
function st9G(t){return (ui.sex==='f'?t.replace(/@/g,'a'):t.replace(/@/g,'o'))}
function st9Sky(){if($('sky9'))return;const d=document.createElement('div');d.id='sky9';let h='<div class="moon"></div>';
  for(let i=0;i<70;i++)h+=`<i class="star" style="left:${Math.random()*100}%;top:${Math.random()*55}%;animation-delay:${(Math.random()*3).toFixed(2)}s;opacity:${(.3+Math.random()*.7).toFixed(2)}"></i>`;
  for(let i=0;i<4;i++)h+=`<i class="cl" style="top:${8+i*11}%;width:${120+Math.random()*160}px;animation-duration:${40+i*14}s;animation-delay:-${(Math.random()*40).toFixed(1)}s"></i>`;
  // profilo della città con le finestre accese
  let s='<svg viewBox="0 0 1000 300" preserveAspectRatio="none">',x=0,r=seeded(4242);
  while(x<1000){const w=40+r()*70,hh=60+r()*200,y=300-hh,c=['#0b1024','#121a38','#0e1530'][(r()*3)|0];s+=`<rect x="${x}" y="${y}" width="${w}" height="${hh}" fill="${c}"/>`;
    for(let wy=y+10;wy<290;wy+=16)for(let wx=x+6;wx<x+w-8;wx+=12)if(r()<.38)s+=`<rect x="${wx}" y="${wy}" width="6" height="8" fill="${r()<.8?'#ffd98a':'#9fe7ff'}" opacity="${(.5+r()*.5).toFixed(2)}"/>`;
    if(r()<.25)s+=`<rect x="${x+w/2-1}" y="${y-24}" width="2" height="24" fill="#2a3358"/><circle cx="${x+w/2}" cy="${y-26}" r="3" fill="#ff5a5a"><animate attributeName="opacity" values="1;.2;1" dur="1.6s" repeatCount="indefinite"/></circle>`;x+=w+2+r()*6}
  s+='<rect x="0" y="292" width="1000" height="8" fill="#060914"/></svg>';d.innerHTML=h+s;$('screen').prepend(d)}
{const _s=showStart;showStart=function(){const r=_s.apply(this,arguments);try{const sc=$('screen');sc.classList.add('st9');st9Sky();
  const h1=sc.querySelector('h1');if(h1&&!sc.querySelector('.tag9')){if(!/PM/.test(h1.textContent))h1.insertAdjacentHTML('beforeend',' <span style="font-size:.6em;opacity:.9">PM</span>');const p=h1.parentNode;
    p.insertAdjacentHTML('beforeend','<div class="tag9"><span>🏙️ Città enorme in 3D</span><span>🚗 Guida e semafori</span><span>📱 Telefono</span><span>💼 Lavori e case</span><span>❤️ Famiglia e amici</span></div><div class="life9"><div><b>👶</b>Nasci</div><div><b>🧒</b>Scuola</div><div><b>🧑‍🎓</b>Studi</div><div><b>👩‍💼</b>Lavoro</div><div><b>🏡</b>Casa</div><div><b>👴</b>Nonno</div></div>')}
  // nome a caso con il dado
  const nm=$('nm');if(nm&&!$('dice9')){const b=document.createElement('button');b.type='button';b.id='dice9';b.className='dice9';b.title='Un nome a caso';b.textContent='🎲';nm.parentNode.parentNode.appendChild(b);
    b.onclick=ev=>{ev.stopPropagation();nm.value=pick(ui.sex==='f'?NOMI_F:NOMI_M);nm.focus()}}
  // carattere e stagione di nascita, prima del pulsante Nasci
  const born=$('born');if(born&&!$('ch9')){const box=document.createElement('div');box.id='ch9';box.innerHTML=
    `<div class="field"><label>Che carattere hai?</label><div class="ch9">${CHAR9.map(([k,ic,n,d])=>`<button type="button" data-ch9="${k}" aria-pressed="${ui.st9.car===k}"><i>${ic}</i><span>${st9G(n)}<small>${d}</small></span></button>`).join('')}</div></div>
     <div class="field" style="margin-top:12px"><label>In che stagione nasci?</label><div class="ch9" style="grid-template-columns:repeat(4,1fr)">${SEAS9.map(([k,ic,n])=>`<button type="button" data-se9="${k}" aria-pressed="${ui.st9.sea===k}" style="justify-content:center;flex-direction:column;gap:2px"><i>${ic}</i><span style="font-size:12px">${n}</span></button>`).join('')}</div></div>`;
    born.parentNode.insertBefore(box,born);
    box.onclick=ev=>{const c=ev.target.closest('[data-ch9]'),s=ev.target.closest('[data-se9]');if(c){ui.st9.car=c.dataset.ch9;box.querySelectorAll('[data-ch9]').forEach(b=>b.setAttribute('aria-pressed',b===c))}if(s){ui.st9.sea=s.dataset.se9;box.querySelectorAll('[data-se9]').forEach(b=>b.setAttribute('aria-pressed',b===s))}ev.stopPropagation()}}
  born&&(born.innerHTML='Nasci! 👶✨')}catch(e){console.warn('inizio9',e)}return r}}
// il carattere dà una piccola spinta all'inizio
{const _n=newLife;newLife=function(){const r=_n.apply(this,arguments);try{const c=CHAR9.find(x=>x[0]===ui.st9.car);if(c&&S.st){S.st[c[4]]=Math.min(100,(S.st[c[4]]||0)+10)}S.car9=ui.st9.car;S.sea9=ui.st9.sea;S.peso9=(2.8+Math.random()*1.2).toFixed(1).replace('.',',')}catch(e){}return r}}
// la scena della nascita, prima di cominciare a giocare
function nasc9Show(){if($('nasc9'))return;const d=document.createElement('div');d.id='nasc9';const s=SEAS9.find(x=>x[0]===S.sea9)||SEAS9[3],nato=S.sex==='f'?'È nata':'È nato',c=CHAR9.find(x=>x[0]===S.car9);
  let stars='';for(let i=0;i<60;i++)stars+=`<i class="st" style="left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${(Math.random()*2.5).toFixed(2)}s"></i>`;
  d.innerHTML=stars+`<div class="bx"><div class="l1">${s[1]} Una notte di ${s[2].toLowerCase()} a ${esc(S.city||'')}…</div><div class="bb">👶</div><div class="l2">${nato} ${esc(S.name)} ${esc(S.surname||'')}!</div>
    <div class="card">👩 Mamma <b>${esc(S.mamma)}</b> e 👨 papà <b>${esc(S.papa)}</b> ti stringono forte.<br>⚖️ Peso: <b>${S.peso9} kg</b> · ${s[1]} Stagione: <b>${s[2]}</b><br>${c?c[1]+' Carattere: <b>'+st9G(c[2])+'</b> — '+c[3].toLowerCase():''}<br>🏙️ Benvenut${S.sex==='f'?'a':'o'} al mondo: la tua vita comincia adesso!</div>
    <button class="go" type="button">Inizia a vivere ▶</button></div><div class="skip">tocca per continuare</div>`;
  document.body.appendChild(d);requestAnimationFrame(()=>d.classList.add('on'));
  const T=[[300,'s1'],[1300,'s2'],[2300,'s3'],[3300,'s4'],[4200,'s5']];const tm=T.map(([t,k])=>setTimeout(()=>d.classList.add(k),t));
  setTimeout(()=>{const cols=['#ff6fb5','#ffd84a','#3fd98a','#6fb8ff','#ffffff','#ff9d42'];for(let i=0;i<70;i++){const e=document.createElement('i');e.className='cf';e.style.cssText=`left:${Math.random()*100}%;background:${cols[i%cols.length]};animation-duration:${2.5+Math.random()*2.5}s;animation-delay:${(Math.random()*1.2).toFixed(2)}s`;d.appendChild(e)}},2300);
  let step=0;const end=()=>{tm.forEach(clearTimeout);d.classList.add('out');setTimeout(()=>d.remove(),650)};
  d.onclick=ev=>{if(ev.target.closest('.go')||d.classList.contains('s5'))return end();tm.forEach(clearTimeout);T.forEach(([,k])=>d.classList.add(k))};
  setTimeout(()=>{if(d.isConnected)end()},14000)}
{const _g=startGame;startGame=function(){const r=_g.apply(this,arguments);try{if(S&&S.age===0&&!S.nasc9&&!navigator.webdriver){S.nasc9=1;save();nasc9Show()}else if(S&&S.age===0&&!S.nasc9&&window.NASC9T){S.nasc9=1;nasc9Show()}}catch(e){}return r}}
// quando si esce dalla schermata iniziale il cielo animato si toglie
{const _g=startGame;startGame=function(){try{const k=$('sky9');if(k)k.remove();$('screen').classList.remove('st9')}catch(e){}return _g.apply(this,arguments)}}
