/* ================= v9: il telefono 📱 (tasto P), la pausa (ESC) e il salto (barra spaziatrice) ================= */
const PH9={app:null,conv:null,notes:[],lastMsg:0,callT:0};
{const st=document.createElement('style');st.textContent=`
#ph9,#ps9{--soft:#8fd9ad;--neon:#20ff75}
#ph9{position:fixed;inset:0;z-index:35;display:grid;place-items:center;background:rgba(0,4,2,.6);padding:12px}
#ph9 .ph{width:min(360px,100%);height:min(680px,100%);background:#020403;border:3px solid var(--neon);border-radius:34px;box-shadow:0 0 24px rgba(32,255,117,.7),inset 0 0 14px rgba(32,255,117,.2);display:flex;flex-direction:column;overflow:hidden;color:#eafff2}
#ph9 .ph.in{animation:phIn .25s ease-out}
@keyframes phIn{from{transform:translateY(30px) scale(.96);opacity:.3}to{transform:none;opacity:1}}
#ph9 .sb{display:flex;justify-content:space-between;align-items:center;padding:10px 20px 6px;font:800 14px var(--f-body);color:var(--neon)}
#ph9 .sb .nt{width:90px;height:20px;border-radius:12px;background:#000;border:1px solid #143021}
#ph9 .scr{flex:1;overflow:auto;padding:6px 14px 14px;-webkit-overflow-scrolling:touch}
#ph9 .bar9{display:flex;gap:10px;align-items:center;padding:6px 14px 10px;border-bottom:1px solid rgba(32,255,117,.3)}
#ph9 .bar9 h3{flex:1;margin:0;font:800 20px var(--f-disp);color:var(--neon);text-shadow:0 0 8px rgba(32,255,117,.7)}
#ph9 .bk{border:1.5px solid var(--neon);background:#0b1610;color:var(--neon);border-radius:12px;width:40px;height:36px;font-size:18px;font-weight:900}
#ph9 .big9{font:900 54px var(--f-disp);text-align:center;color:#fff;text-shadow:0 0 16px rgba(32,255,117,.9);margin:16px 0 0;font-variant-numeric:tabular-nums}
#ph9 .dt9{text-align:center;color:var(--soft);font-weight:700;margin-bottom:16px}
#ph9 .grid9{display:grid;grid-template-columns:repeat(3,1fr);gap:14px 8px}
#ph9 .app9{border:0;background:none;color:#eafff2;display:grid;justify-items:center;gap:5px;font:700 12px var(--f-body);position:relative}
#ph9 .app9 i{font-style:normal;width:62px;height:62px;border-radius:18px;display:grid;place-items:center;font-size:30px;background:linear-gradient(160deg,#10261a,#040806);border:2px solid var(--neon);box-shadow:0 0 10px rgba(32,255,117,.5);transition:transform .12s,box-shadow .12s}
#ph9 .app9:hover i,#ph9 .app9:active i{transform:scale(1.08);box-shadow:0 0 20px rgba(32,255,117,1)}
#ph9 .app9 b{position:absolute;top:-4px;right:8px;background:#ff5d6c;color:#fff;border-radius:99px;font-size:11px;padding:0 6px;line-height:18px}
#ph9 .li9{display:flex;gap:10px;align-items:center;width:100%;text-align:left;padding:10px;margin:0 0 8px;border-radius:14px;background:#0b1610;border:1.5px solid rgba(32,255,117,.4);color:#eafff2;font:600 15px var(--f-body)}
#ph9 .li9:hover{border-color:var(--neon);box-shadow:0 0 10px rgba(32,255,117,.5)}
#ph9 .li9 .av9{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font-size:22px;background:#13241a;border:1.5px solid var(--neon);flex:none}
#ph9 .li9 .tx{flex:1;min-width:0}#ph9 .li9 .tx small{display:block;color:var(--soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}
#ph9 .li9 .un{background:var(--neon);color:#021008;border-radius:99px;font:800 12px var(--f-body);padding:1px 8px}
#ph9 .bub{max-width:82%;padding:8px 12px;border-radius:16px;margin:6px 0;font-size:15px;overflow-wrap:anywhere}
#ph9 .bub.th{background:#122019;border:1px solid rgba(32,255,117,.4)}#ph9 .bub.me{background:#0f5a30;margin-left:auto}
#ph9 .rep{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
#ph9 .rep button,#ph9 .nb{border:1.5px solid var(--neon);background:#0b1610;color:#eafff2;border-radius:99px;padding:7px 12px;font:700 14px var(--f-body)}
#ph9 .nb.hot{background:var(--neon);color:#021008}
#ph9 .card9{border:1.5px solid var(--neon);border-radius:16px;padding:12px;margin:0 0 10px;background:linear-gradient(160deg,#0b1a11,#030605);box-shadow:0 0 10px rgba(32,255,117,.35)}
#ph9 .card9 .k{color:var(--soft);font-weight:700;font-size:13px}#ph9 .card9 .v{font:900 30px var(--f-disp);color:#fff;text-shadow:0 0 10px rgba(32,255,117,.8);font-variant-numeric:tabular-nums}
#ph9 .call9{text-align:center;padding-top:40px}#ph9 .call9 .av9{width:100px;height:100px;margin:0 auto 12px;border-radius:50%;display:grid;place-items:center;font-size:52px;border:3px solid var(--neon);box-shadow:0 0 20px rgba(32,255,117,.8);animation:neonP 1.2s infinite}
#ps9{position:fixed;inset:0;z-index:36;display:grid;place-items:center;background:rgba(0,4,2,.78);backdrop-filter:blur(3px)}
#ps9 .in{width:min(340px,92%);padding:22px;border-radius:24px;background:#020403;border:3px solid var(--neon);box-shadow:0 0 26px rgba(32,255,117,.7);display:grid;gap:10px;text-align:center}
#ps9 h2{font:900 40px var(--f-disp);color:var(--neon);text-shadow:0 0 18px rgba(32,255,117,.9);margin:0 0 6px;letter-spacing:4px}
#ps9 button{border:1.5px solid var(--neon);background:#0b1610;color:#eafff2;border-radius:14px;padding:12px;font:800 16px var(--f-body);transition:box-shadow .15s}
#ps9 button:hover{box-shadow:0 0 14px rgba(32,255,117,.8)}#ps9 button.go{background:var(--neon);color:#021008}
#lb9{position:fixed;z-index:5;left:max(10px,env(safe-area-inset-left,0px));top:42%;display:flex;flex-direction:column;gap:8px}
#jmp9{width:44px;height:44px;border-radius:14px;border:2px solid var(--neon);background:linear-gradient(160deg,#0b1610,#030605);color:var(--neon);font:900 10px var(--f-body);box-shadow:0 0 10px rgba(32,255,117,.45);touch-action:manipulation;line-height:1.05;padding:0}
#jmp9:active{background:var(--neon);color:#021008}
`;document.head.appendChild(st)}
// pulsanti nuovi in alto: telefono e pausa
// (a sinistra, a metà schermo: in alto non c'è più posto)
{const col=document.createElement('div');col.id='lb9';const p=document.createElement('button');p.className='ib';p.id='phoneBtn';p.type='button';p.setAttribute('aria-label','Telefono');p.textContent='📱';p.hidden=true;
  const z=document.createElement('button');z.className='ib';z.id='pauseBtn';z.type='button';z.setAttribute('aria-label','Pausa');z.textContent='⏸';col.appendChild(p);col.appendChild(z);document.body.appendChild(col)
  const j=document.createElement('button');j.id='jmp9';j.type='button';j.innerHTML='⤒<br>Salta';j.hidden=true;col.appendChild(j)}
const phOK=()=>S&&S.alive&&S.age>=11;
const phClock=()=>{const c=Math.floor(S&&S.clock||0);return String(Math.floor(c/60)).padStart(2,'0')+':'+String(c%60).padStart(2,'0')};
// i contatti veri della tua vita
function phContacts(){if(!S)return[];const L=[['mamma','👩','Mamma',S.mamma],['papa','👨','Papà',S.papa],['bff','🧒','Migliore amic'+(S.bffF?'a':'o'),S.bff]];
  if(S.partner)L.push(['partner','💞',S.married?(S.sex==='f'?'Marito':'Moglie'):'Amore',S.partner.nome]);
  (S.kids||[]).forEach((k,i)=>{if(S.age-k.nato>=8)L.push(['kid'+i,k.f?'👧':'👦',k.f?'Figlia':'Figlio',k.nome])});
  if(S.job)L.push(['capo','💼','Il capo','Ufficio']);return L.map(([id,ic,rol,nm])=>({id,ic,rol,nm:nm||rol}))}
// messaggi che possono arrivare (con le risposte)
function phPool(c){const a=S.age,P=[];
  if(c.id==='mamma'||c.id==='papa'){P.push(['Ciao tesoro! Com\'è andata oggi? 😊',['Benissimo! 😄','Così così…','Te lo racconto dopo!'],['Sono contenta! ❤️','Dai, domani andrà meglio! 💪','Va bene, a dopo! 😘']]);
    P.push(['Ricordati di mangiare la frutta! 🍎',['Sì, promesso!','Ma uffa… 😅'],['Bravo! 🥰','Ah ah, fa bene alla salute!']]);
    if(a<18)P.push(['Hai fatto i compiti? 📚',['Sì, tutti!','Li faccio adesso'],['Che bravo! 🌟','Ok, poi riposati un po\'!']]);
    else P.push(['Vieni a cena domenica? 🍝',['Certo! 😋','Questa volta non posso'],['Evviva, preparo le lasagne!','Va bene, la prossima volta allora! ❤️']])}
  if(c.id==='bff'){P.push(['Ehi! Ci vediamo al parco? ⚽',['Sì, arrivo!','Oggi no, scusa'],['Grande! 🙌','Ok, domani allora!']]);P.push(['Hai visto che bella giornata? ☀️',['Sì, bellissima!','Io sto dentro a giocare 🎮'],['Andiamo a fare un giro! 🚲','Ah ah, mandami una foto!']]);
    P.push(['Sai che ho trovato un pacco segreto in città? 📦',['Dove?!','Io ne ho trovati tanti!'],['Cerca vicino ai palazzi alti! 😉','Sei un campione! 🏆']])}
  if(c.id==='partner'){P.push(['Ti penso! 💞',['Anche io! ❤️','Ci vediamo stasera?'],['🥰','Sì! Prenoto la pizza 🍕']])}
  if(c.id.startsWith('kid')){P.push(['Ciao! Mi vieni a prendere dopo? 🎒',['Certo!','Oggi viene il nonno'],['Evviva! 😄','Ok! Ciao! 👋']])}
  if(c.id==='capo'){P.push(['Ottimo lavoro questa settimana! 👏',['Grazie mille!','Faccio del mio meglio'],['Continua così! 💼','Si vede! 👍']])}
  return P}
function phConv(id){S.ph9=S.ph9||{c:{}};return S.ph9.c[id]=S.ph9.c[id]||{m:[],u:0,q:null}}
function phUnread(){if(!S||!S.ph9)return 0;let n=0;for(const k in S.ph9.c)n+=S.ph9.c[k].u||0;return n}
function phNew(){const C=phContacts();if(!C.length)return;const c=pick(C),P=phPool(c);if(!P.length)return;const [txt,rep,ans]=pick(P),cv=phConv(c.id);
  cv.m.push({t:0,x:txt});if(cv.m.length>30)cv.m.splice(0,cv.m.length-30);cv.u=(cv.u||0)+1;cv.q={rep,ans};phBadge();toast(`💬 Nuovo messaggio da ${c.rol}: «${txt.slice(0,40)}»`);save()}
function phBadge(){const b=$('phoneBtn');if(!b)return;const n=phUnread();b.innerHTML='📱'+(n?`<span class="badge">${n}</span>`:'')}
// ogni tanto arriva un messaggio (solo mentre giochi)
{const _s=step;step=function(dt){if(ui.pause9)return;const r=_s(dt);try{if(phOK()&&!isBusy()){PH9.lastMsg+=dt;if(PH9.lastMsg>140+Math.random()*80){PH9.lastMsg=0;phNew()}}
  const b=$('phoneBtn');if(b){const sh=phOK()&&$('screen').hidden;if(b.hidden===sh)b.hidden=!sh;if(sh&&b.dataset.n!==String(phUnread())){b.dataset.n=phUnread();phBadge()}}
  jpTick(dt)}catch(e){}return r}}
{const _b=isBusy;isBusy=function(){return _b()||!!ui.ph9||!!ui.pause9}}
// le notifiche: tutto quello che il gioco ti dice resta nel telefono
{const _t=toast;toast=function(m){try{PH9.notes.unshift([S?phClock():'',String(m)]);if(PH9.notes.length>40)PH9.notes.length=40}catch(e){}return _t.apply(this,arguments)}}
function phOpen(app){if(!phOK()){toast(S&&S.alive?'📱 Il telefono lo avrai verso gli 11 anni!':'📱');return}if(ui.sheet||ui.chatNpc||S.pending||ui.result)return;ui.ph9=1;PH9.app=app||null;PH9.conv=null;phRender()}
function phClose(){ui.ph9=0;const e=$('ph9');if(e)e.remove();phBadge();updateHud()}
function phRender(){let e=$('ph9');if(!e){e=document.createElement('div');e.id='ph9';document.body.appendChild(e);e.addEventListener('click',ev=>{if(ev.target===e)phClose()})}
  const A=PH9.app,top=`<div class="sb"><span>${phClock()}</span><span class="nt"></span><span>📶 🔋</span></div>`;let h='';
  const bar=t=>`<div class="bar9"><button class="bk" data-ph="home" aria-label="Indietro">‹</button><h3>${t}</h3><button class="bk" data-ph="close" aria-label="Chiudi">✕</button></div>`;
  if(!A){const n=phUnread();h=`<div class="scr"><div class="big9">${phClock()}</div><div class="dt9">${esc(S.name)} · ${S.age} anni</div><div class="grid9">`+
    [['msg','💬','Messaggi',n],['call','📞','Chiamate'],['cont','👥','Contatti'],['bank','💳','Banca'],['map','🗺️','Mappa'],['miss','🎯','Missioni'],['note','🔔','Notifiche'],['set','⚙️','Impostazioni'],['close','⏻','Chiudi']]
    .map(([k,ic,t,b])=>`<button class="app9" data-ph="${k}"><i>${ic}</i>${t}${b?`<b>${b}</b>`:''}</button>`).join('')+'</div></div>'}
  else if(A==='msg'&&PH9.conv){const c=phContacts().find(q=>q.id===PH9.conv)||{ic:'👤',rol:'',nm:''},cv=phConv(PH9.conv);cv.u=0;
    h=bar(c.ic+' '+esc(c.rol))+`<div class="scr" id="ph9s">${cv.m.length?cv.m.map(m=>`<div class="bub ${m.t?'me':'th'}">${esc(m.x)}</div>`).join(''):'<p style="color:var(--soft)">Nessun messaggio. Scrivi tu!</p>'}`+
      `<div class="rep">${(cv.q?cv.q.rep:['Ciao! 👋','Come stai?','Ti voglio bene ❤️']).map((r,i)=>`<button data-rep="${i}">${esc(r)}</button>`).join('')}</div></div>`}
  else if(A==='msg'||A==='cont'){h=bar(A==='msg'?'💬 Messaggi':'👥 Contatti')+'<div class="scr">'+phContacts().map(c=>{const cv=phConv(c.id),l=cv.m[cv.m.length-1];
    return `<button class="li9" data-cv="${c.id}"><span class="av9">${c.ic}</span><span class="tx"><b>${esc(c.rol)}</b><small>${A==='msg'?(l?esc(l.x):'Nessun messaggio'):esc(c.nm)}</small></span>${cv.u?`<span class="un">${cv.u}</span>`:''}${A==='cont'?'<span>📞</span>':''}</button>`}).join('')+'</div>'}
  else if(A==='call'){if(PH9.calling){const c=PH9.calling;h=bar('📞 Chiamata')+`<div class="scr call9"><div class="av9">${c.ic}</div><h3 style="color:#fff;margin:0">${esc(c.rol)}</h3><p id="ph9c" style="color:var(--soft);font-weight:700">Sto chiamando…</p><button class="nb hot" data-ph="hang" style="margin-top:20px">📵 Riattacca</button></div>`}
    else h=bar('📞 Chiamate')+'<div class="scr">'+phContacts().map(c=>`<button class="li9" data-call="${c.id}"><span class="av9">${c.ic}</span><span class="tx"><b>${esc(c.rol)}</b><small>${esc(c.nm)}</small></span><span>📞</span></button>`).join('')+'</div>'}
  else if(A==='bank'){const b=S.bank;h=bar('💳 Banca')+`<div class="scr"><div class="card9"><div class="k">💶 Soldi in tasca</div><div class="v">${eur(S.money)}</div></div>`+
    (b==null?`<div class="card9"><div class="k">🏦 Conto in banca</div><p style="margin:6px 0 0">Non hai ancora un conto. Vai in <b>Banca</b> in città per aprirlo!</p></div>`:
    `<div class="card9"><div class="k">🏦 Conto in banca</div><div class="v">${eur(b)}</div></div><div class="k" style="color:var(--soft);font-weight:700;margin:4px 0">Metti in banca</div><div class="rep">${[10,50,100,'tutto'].map(v=>`<button data-dep="${v}">+ ${v==='tutto'?'Tutto':eur(v)}</button>`).join('')}</div>
    <div class="k" style="color:var(--soft);font-weight:700;margin:12px 0 4px">Prendi dalla banca</div><div class="rep">${[10,50,100,'tutto'].map(v=>`<button data-wd="${v}">− ${v==='tutto'?'Tutto':eur(v)}</button>`).join('')}</div>`)+'</div>'}
  else if(A==='note'){h=bar('🔔 Notifiche')+'<div class="scr">'+(PH9.notes.length?PH9.notes.map(([t,m])=>`<div class="li9" style="display:block"><small style="color:var(--neon);font-weight:800">${t}</small><div>${esc(m)}</div></div>`).join(''):'<p style="color:var(--soft)">Nessuna notifica per ora.</p>')+'</div>'}
  else if(A==='set'){const on=typeof tdActive==='function'&&tdActive(),q=typeof TD!=='undefined'&&TD.hq;h=bar('⚙️ Impostazioni')+`<div class="scr">
    <button class="li9" data-set="v"><span class="av9">🎥</span><span class="tx"><b>Vista</b><small>${on?'3D da dietro (come GTA)':'Dall\'alto (mappa)'} · tocca per cambiare</small></span></button>
    <button class="li9" data-set="q"><span class="av9">${q?'✨':'⚡'}</span><span class="tx"><b>Grafica</b><small>${q?'Al massimo: luci, riflessi e ombre':'Leggera: più veloce'} · tocca per cambiare</small></span></button>
    <button class="li9" data-set="s"><span class="av9">💾</span><span class="tx"><b>Salva la partita</b><small>Il gioco salva anche da solo</small></span></button></div>`}
  const fst=!e.dataset.o;e.dataset.o=1;e.innerHTML=`<div class="ph${fst?' in':''}" role="dialog" aria-label="Telefono">${top}${h}</div>`;const sc=$('ph9s');if(sc)sc.scrollTop=1e5;
  e.querySelectorAll('[data-ph]').forEach(b=>b.onclick=()=>{const k=b.dataset.ph;
    if(k==='close')return phClose();if(k==='home'){if(PH9.app==='msg'&&PH9.conv){PH9.conv=null}else PH9.app=null;PH9.calling=null;return phRender()}
    if(k==='hang'){PH9.calling=null;return phRender()}
    if(k==='map'||k==='miss'){phClose();setTimeout(()=>$(k==='map'?'mapBtn':'goalBtn').click(),30);return}
    PH9.app=k;PH9.conv=null;phRender()});
  e.querySelectorAll('[data-cv]').forEach(b=>b.onclick=()=>{PH9.app='msg';PH9.conv=b.dataset.cv;phRender();phBadge()});
  e.querySelectorAll('[data-rep]').forEach(b=>b.onclick=()=>{const cv=phConv(PH9.conv),i=+b.dataset.rep,q=cv.q;cv.m.push({t:1,x:b.textContent});cv.q=null;phRender();
    const who=PH9.conv;setTimeout(()=>{const c2=phConv(who);c2.m.push({t:0,x:q?q.ans[i]||'😊':pick(['😊','Ciao! ❤️','Tutto bene, grazie!','Che bello sentirti! 😄'])});if(ui.ph9&&PH9.conv===who)phRender();else{c2.u=(c2.u||0)+1;phBadge()}try{add('fel',1);updateHud()}catch(_){}save()},1100)});
  e.querySelectorAll('[data-call]').forEach(b=>b.onclick=()=>{const c=phContacts().find(q=>q.id===b.dataset.call);PH9.calling=c;phRender();
    const L={mamma:['Pronto? Ciao amore mio! Che bello sentirti! ❤️','Ciao! Stai bene? Copriti che fa freddo! 🧣'],papa:['Ehi campione! Tutto bene? 💪','Ciao! Stasera guardiamo la partita insieme? ⚽'],bff:['Ehi! Ci vediamo dopo? 😄','Ciao! Ho appena finito di giocare, tu che fai?'],partner:['Ciao! Mi mancavi! 💞'],capo:['Pronto, ufficio. Tutto bene, ci vediamo domani! 💼']};
    PH9.callT=setTimeout(()=>{const p=$('ph9c');if(p&&PH9.calling===c){p.style.color='#eafff2';p.textContent='«'+pick(L[c.id]||['Ciao! Che bello sentirti! 😊'])+'»';try{add('fel',1);updateHud()}catch(_){}}},1600)});
  const mv=(d)=>{if(S.bank==null)return;d=Math.round(d);if(d>0&&d>S.money)d=Math.max(0,Math.floor(S.money));if(d<0&&-d>S.bank)d=-Math.max(0,Math.floor(S.bank));if(!d){toast('Non ci sono abbastanza soldi.');return}
    S.money-=d;S.bank+=d;updateHud();save();toast(d>0?`🏦 Hai messo ${eur(d)} in banca`:`💶 Hai preso ${eur(-d)} dalla banca`);phRender()};
  e.querySelectorAll('[data-dep]').forEach(b=>b.onclick=()=>mv(b.dataset.dep==='tutto'?S.money:+b.dataset.dep));
  e.querySelectorAll('[data-wd]').forEach(b=>b.onclick=()=>mv(-(b.dataset.wd==='tutto'?S.bank:+b.dataset.wd)));
  e.querySelectorAll('[data-set]').forEach(b=>b.onclick=()=>{const k=b.dataset.set;if(k==='s'){save();toast('💾 Partita salvata!');return}
    const id=k==='v'?'td9v':'td9q',el=$(id);if(!el){toast('La vista 3D non c\'è su questo telefono.');return}ui.ph9=0;try{el.onclick()}catch(_){}ui.ph9=1;setTimeout(phRender,60)})}
$('phoneBtn')&&($('phoneBtn').onclick=()=>phOpen());
// ---- pausa
function psOpen(){if(!S||!S.alive||!$('screen').hidden||ui.pause9)return;if(ui.ph9)phClose();ui.pause9=1;const e=document.createElement('div');e.id='ps9';
  e.innerHTML=`<div class="in" role="dialog" aria-label="Pausa"><h2>PAUSA</h2><button class="go" data-p="go">▶ Riprendi</button>${phOK()?'<button data-p="ph">📱 Telefono</button>':''}<button data-p="map">🗺️ Mappa</button><button data-p="miss">🎯 Missioni</button>${phOK()?'<button data-p="set">⚙️ Impostazioni</button>':''}<button data-p="save">💾 Salva la partita</button></div>`;
  document.body.appendChild(e);e.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{const k=b.dataset.p;if(k==='save'){save();toast('💾 Partita salvata!');return}psClose();
    if(k==='ph')phOpen();if(k==='set')phOpen('set');if(k==='map')$('mapBtn').click();if(k==='miss')$('goalBtn').click()})}
function psClose(){ui.pause9=0;const e=$('ps9');if(e)e.remove()}
$('pauseBtn')&&($('pauseBtn').onclick=()=>psOpen());
// ---- salto
const JP9={t:-1};
function jpCan(){return S&&S.alive&&!isBusy()&&!ui.mg&&!ui.match&&!ui.air&&!S.famDrive&&!S.drive&&!(typeof rdInCar==='function'&&rdInCar())&&!S.ride&&S.age>=2&&$('screen').hidden}
function jump(){if(!jpCan()||JP9.t>=0)return;JP9.t=0}
function jpH(){return JP9.t<0?0:Math.sin(Math.PI*Math.min(1,JP9.t/.55))}
function jpTick(dt){if(JP9.t>=0){JP9.t+=dt;if(JP9.t>.55)JP9.t=-1}const b=$('jmp9');if(b){const sh=jpCan()&&!ui.sheet;if(b.hidden===sh)b.hidden=!sh}}
$('jmp9').onclick=e=>{e.preventDefault();jump()};
{const _d=drawPlayer;drawPlayer=function(t){const h=jpH();if(!h)return _d.apply(this,arguments);cx.save();cx.translate(0,-h*T*.55);try{return _d.apply(this,arguments)}finally{cx.restore()}}}
if(typeof tdDynamic==='function'){const _d=tdDynamic;tdDynamic=function(scn,dt,city){const r=_d.apply(this,arguments);try{const h=jpH();if(h){const e=TD.pool.get('_me');if(e&&e.g)e.g.position.y=h*.42}}catch(e){}return r}}
// ---- tasti: P telefono, ESC pausa, SPAZIO salto
addEventListener('keydown',e=>{if(!S||!S.alive)return;const tg=e.target&&e.target.tagName;if(tg==='INPUT'||tg==='TEXTAREA'||tg==='SELECT')return;
  if(e.key==='Escape'){if(ui.ph9){phClose();e.preventDefault();return}if(ui.pause9){psClose();e.preventDefault();return}if(!isBusy()&&!ui.mg){psOpen();e.preventDefault()}return}
  if((e.key==='p'||e.key==='P')&&!e.ctrlKey&&!e.metaKey&&!e.altKey){if(ui.ph9)phClose();else if(!isBusy()&&!ui.mg)phOpen();return}
  if(e.code==='Space'&&!e.repeat&&jpCan()){e.preventDefault();jump()}});
