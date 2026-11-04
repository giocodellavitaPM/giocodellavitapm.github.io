/* ================= v9: il telefono 📱 (tasto P), la pausa (ESC) e il salto (barra spaziatrice) ================= */
const PH9={app:null,conv:null,notes:[],lastMsg:0,callT:0};
{const st=document.createElement('style');st.textContent=`
#ph9,#ps9{--soft:#8fd9ad;--neon:#3fd98a}
#ph9{position:fixed;inset:0;z-index:35;display:grid;place-items:center;background:rgba(0,4,2,.6);padding:12px}
#ph9 .ph{width:min(360px,100%);height:min(680px,100%);background:#020403;border:3px solid var(--neon);border-radius:34px;box-shadow:0 0 24px rgba(63,217,138,0.49),inset 0 0 14px rgba(63,217,138,0.14);display:flex;flex-direction:column;overflow:hidden;color:#eafff2}
#ph9 .ph.in{animation:phIn .25s ease-out}
@keyframes phIn{from{transform:translateY(30px) scale(.96);opacity:.3}to{transform:none;opacity:1}}
#ph9 .sb{display:flex;justify-content:space-between;align-items:center;padding:10px 20px 6px;font:800 14px var(--f-body);color:var(--neon)}
#ph9 .sb .nt{width:90px;height:20px;border-radius:12px;background:#000;border:1px solid #143021}
#ph9 .scr{flex:1;overflow:auto;padding:6px 14px 14px;-webkit-overflow-scrolling:touch}
#ph9 .bar9{display:flex;gap:10px;align-items:center;padding:6px 14px 10px;border-bottom:1px solid rgba(63,217,138,0.21)}
#ph9 .bar9 h3{flex:1;margin:0;font:800 20px var(--f-disp);color:var(--neon);text-shadow:0 0 8px rgba(63,217,138,0.49)}
#ph9 .bk{border:1.5px solid var(--neon);background:#0b1610;color:var(--neon);border-radius:12px;width:40px;height:36px;font-size:18px;font-weight:900}
#ph9 .big9{font:900 54px var(--f-disp);text-align:center;color:#fff;text-shadow:0 0 16px rgba(63,217,138,0.63);margin:16px 0 0;font-variant-numeric:tabular-nums}
#ph9 .dt9{text-align:center;color:var(--soft);font-weight:700;margin-bottom:16px}
#ph9 .grid9{display:grid;grid-template-columns:repeat(4,1fr);gap:12px 4px}
#ph9 .pages9{display:flex;flex-direction:column;gap:12px}#ph9 .pages9::-webkit-scrollbar{display:none}
#ph9 .pg9{align-content:start;padding:4px 2px}
#ph9 .dots9{display:none;justify-content:center;gap:7px;margin-top:10px}#ph9 .dots9 i{width:8px;height:8px;border-radius:50%;background:#1d3b29}#ph9 .dots9 i.on{background:var(--neon);box-shadow:0 0 6px var(--neon)}
#ph9 .app9{border:0;background:none;color:#eafff2;display:grid;justify-items:center;align-content:start;gap:4px;font:700 11px var(--f-body);position:relative}
#ph9 .app9 i{font-style:normal;width:46px;height:46px;border-radius:14px;display:grid;place-items:center;font-size:22px;background:linear-gradient(160deg,#10261a,#040806);border:2px solid var(--neon);box-shadow:0 0 10px rgba(63,217,138,0.35);transition:transform .12s,box-shadow .12s}
#ph9 .app9:hover i,#ph9 .app9:active i{transform:scale(1.08);box-shadow:0 0 20px rgba(63,217,138,0.7)}
#ph9 .app9 b{position:absolute;top:-4px;right:8px;background:#ff5d6c;color:#fff;border-radius:99px;font-size:11px;padding:0 6px;line-height:18px}
#ph9 .li9{display:flex;gap:10px;align-items:center;width:100%;text-align:left;padding:10px;margin:0 0 8px;border-radius:14px;background:#0b1610;border:1.5px solid rgba(63,217,138,0.28);color:#eafff2;font:600 15px var(--f-body)}
#ph9 .li9:hover{border-color:var(--neon);box-shadow:0 0 10px rgba(63,217,138,0.35)}
#ph9 .li9 .av9{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font-size:22px;background:#13241a;border:1.5px solid var(--neon);flex:none}
#ph9 .li9 .tx{flex:1;min-width:0}#ph9 .li9 .tx small{display:block;color:var(--soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}
#ph9 .li9 .un{background:var(--neon);color:#021008;border-radius:99px;font:800 12px var(--f-body);padding:1px 8px}
#ph9 .bub{max-width:82%;padding:8px 12px;border-radius:16px;margin:6px 0;font-size:15px;overflow-wrap:anywhere}
#ph9 .bub.th{background:#122019;border:1px solid rgba(63,217,138,0.28)}#ph9 .bub.me{background:#0f5a30;margin-left:auto}
#ph9 .rep{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
#ph9 .rep button,#ph9 .nb{border:1.5px solid var(--neon);background:#0b1610;color:#eafff2;border-radius:99px;padding:7px 12px;font:700 14px var(--f-body)}
#ph9 .nb.hot{background:var(--neon);color:#021008}
#ph9 .card9{border:1.5px solid var(--neon);border-radius:16px;padding:12px;margin:0 0 10px;background:linear-gradient(160deg,#0b1a11,#030605);box-shadow:0 0 10px rgba(63,217,138,0.24)}
#ph9 .card9 .k{color:var(--soft);font-weight:700;font-size:13px}#ph9 .card9 .v{font:900 30px var(--f-disp);color:#fff;text-shadow:0 0 10px rgba(63,217,138,0.56);font-variant-numeric:tabular-nums}
#ph9 .call9{text-align:center;padding-top:40px}#ph9 .call9 .av9{width:100px;height:100px;margin:0 auto 12px;border-radius:50%;display:grid;place-items:center;font-size:52px;border:3px solid var(--neon);box-shadow:0 0 20px rgba(63,217,138,0.56);animation:neonP 1.2s infinite}
#ps9{position:fixed;inset:0;z-index:36;display:grid;place-items:center;background:rgba(0,4,2,.78);backdrop-filter:blur(3px)}
#ps9 .in{width:min(340px,92%);padding:22px;border-radius:24px;background:#020403;border:3px solid var(--neon);box-shadow:0 0 26px rgba(63,217,138,0.49);display:grid;gap:10px;text-align:center}
#ps9 h2{font:900 40px var(--f-disp);color:var(--neon);text-shadow:0 0 18px rgba(63,217,138,0.63);margin:0 0 6px;letter-spacing:4px}
#ps9 button{border:1.5px solid var(--neon);background:#0b1610;color:#eafff2;border-radius:14px;padding:12px;font:800 16px var(--f-body);transition:box-shadow .15s}
#ps9 button:hover{box-shadow:0 0 14px rgba(63,217,138,0.56)}#ps9 button.go{background:var(--neon);color:#021008}
#lb9{position:fixed;z-index:5;left:max(10px,env(safe-area-inset-left,0px));top:42%;display:flex;flex-direction:column;gap:8px}
#jmp9{width:44px;height:44px;border-radius:14px;border:2px solid var(--neon);background:linear-gradient(160deg,#0b1610,#030605);color:var(--neon);font:900 10px var(--f-body);box-shadow:0 0 10px rgba(63,217,138,0.32);touch-action:manipulation;line-height:1.05;padding:0}
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
  if(S.job)L.push(['capo','💼','Il capo','Ufficio']);((S.ph9&&S.ph9.num)||[]).forEach(q=>L.push([q.id,q.ic,q.rol,q.nm]));return L.map(([id,ic,rol,nm])=>({id,ic,rol,nm:nm||rol}))}
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
  if(c.id.startsWith('n_')){P.push(['Ciao! Sono '+c.rol+'. Che bello che ci siamo conosciuti! 😊',['Ciao! Anche per me!','Ci vediamo in giro!'],['Evviva! 🙌','Certo! A presto! 👋']]);P.push(['Ehi, che fai di bello oggi?',['Gioco in città','Vado a scuola / al lavoro'],['Divertiti! 😄','Buona giornata allora! ☀️']])}
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
  document.body.classList.toggle('ph9mv',!!(phOK()&&$('screen').hidden));
  // se hai fame o sete lo vedi anche sul pulsante del telefono
  const nb=$('needBadge9'),pb=$('phoneBtn');if(pb){const u=!!(nb&&!nb.hidden&&/e5484d|f5a700/i.test(nb.style.background));if(pb.dataset.u!==String(u)){pb.dataset.u=u;pb.classList.toggle('need9',u)}}
  jpTick(dt)}catch(e){}return r}}
{const _b=isBusy;isBusy=function(){return _b()||!!ui.ph9||!!ui.pause9}}
// le notifiche: tutto quello che il gioco ti dice resta nel telefono
{const _t=toast;toast=function(m){try{PH9.notes.unshift([S?phClock():'',String(m)]);if(PH9.notes.length>40)PH9.notes.length=40}catch(e){}return _t.apply(this,arguments)}}
function phOpen(app){if(!phOK()){toast(S&&S.alive?'📱 Il telefono lo avrai verso gli 11 anni!':'📱');return}if(ui.sheet||ui.chatNpc||S.pending||ui.result)return;ui.ph9=1;PH9.app=app||null;PH9.conv=null;phRender()}
function phClose(){ui.ph9=0;const e=$('ph9');if(e)e.remove();phBadge();updateHud()}
function phRender(){let e=$('ph9');if(!e){e=document.createElement('div');e.id='ph9';document.body.appendChild(e);e.addEventListener('click',ev=>{if(ev.target===e)phClose()})}
  const A=PH9.app,top=`<div class="sb"><span>${phClock()}</span><span class="nt"></span><span>📶 🔋</span></div>`;let h='';
  const bar=t=>`<div class="bar9"><button class="bk" data-ph="home" aria-label="Indietro">‹</button><h3>${t}</h3><button class="bk" data-ph="close" aria-label="Chiudi">✕</button></div>`;
  if(!A){const n=phUnread();h=`<div class="scr"><div class="big9">${phClock()}</div><div class="dt9">${esc(S.name)} · ${S.age} anni</div><div class="pages9" id="ph9pg">`+
    (()=>{const L=phApps(n),P=[];for(let i=0;i<L.length;i+=12)P.push(L.slice(i,i+12));PH9.np=P.length;return P.map(pg=>'<div class="grid9 pg9">'+pg.map(([k,ic,t,b])=>`<button class="app9" data-ph="${k}"><i>${ic}</i>${t}${b?`<b>${b}</b>`:''}</button>`).join('')+'</div>').join('')})()+
    `</div><div class="dots9">${Array.from({length:PH9.np},(_,i)=>`<i class="${i===(PH9.pg||0)?'on':''}"></i>`).join('')}</div></div>`}
  else if(A==='msg'&&PH9.conv){const c=phContacts().find(q=>q.id===PH9.conv)||{ic:'👤',rol:'',nm:''},cv=phConv(PH9.conv);cv.u=0;
    h=bar(c.ic+' '+esc(c.rol))+`<div class="scr" id="ph9s">${cv.m.length?cv.m.map(m=>`<div class="bub ${m.t?'me':'th'}">${esc(m.x)}</div>`).join(''):'<p style="color:var(--soft)">Nessun messaggio. Scrivi tu!</p>'}`+
      `<div class="rep">${(cv.q?cv.q.rep:['Ciao! 👋','Come stai?','Ti voglio bene ❤️']).map((r,i)=>`<button data-rep="${i}">${esc(r)}</button>`).join('')}</div></div><div class="say9"><input id="ph9in" maxlength="200" autocomplete="off" placeholder="Scrivi un messaggio…" aria-label="Scrivi un messaggio"><button data-send="1" aria-label="Invia">➤</button></div>`}
  else if(A==='msg'||A==='cont'){h=bar(A==='msg'?'💬 Messaggi':'👥 Contatti')+'<div class="scr">'+phContacts().map(c=>{const cv=phConv(c.id),l=cv.m[cv.m.length-1];
    return `<button class="li9" data-cv="${c.id}"><span class="av9">${c.ic}</span><span class="tx"><b>${esc(c.rol)}</b><small>${A==='msg'?(l?esc(l.x):'Nessun messaggio'):esc(c.nm)}</small></span>${cv.u?`<span class="un">${cv.u}</span>`:''}${A==='cont'?'<span>📞</span>':''}</button>`}).join('')+'</div>'}
  else if(A==='call'){if(PH9.calling){const c=PH9.calling;h=bar('📞 Chiamata')+`<div class="scr call9"><div class="av9">${c.ic}</div><h3 style="color:#fff;margin:0">${esc(c.rol)}</h3><p id="ph9c" style="color:var(--soft);font-weight:700">Sto chiamando…</p><button class="nb hot" data-ph="hang" style="margin-top:20px">📵 Riattacca</button></div>`}
    else h=bar('📞 Chiamate')+'<div class="scr">'+phContacts().map(c=>`<button class="li9" data-call="${c.id}"><span class="av9">${c.ic}</span><span class="tx"><b>${esc(c.rol)}</b><small>${esc(c.nm)}</small></span><span>📞</span></button>`).join('')+'</div>'}
  else if(A==='bank'){const b=S.bank;h=bar('💳 Banca')+`<div class="scr"><div class="card9"><div class="k">💶 Soldi in tasca</div><div class="v">${eur(S.money)}</div></div>`+
    (b==null?`<div class="card9"><div class="k">🏦 Conto in banca</div><p style="margin:6px 0 0">Non hai ancora un conto. Vai in <b>Banca</b> in città per aprirlo!</p></div>`:
    `<div class="card9"><div class="k">🏦 Conto in banca</div><div class="v">${eur(b)}</div></div><div class="k" style="color:var(--soft);font-weight:700;margin:4px 0">Metti in banca</div><div class="rep">${[10,50,100,'tutto'].map(v=>`<button data-dep="${v}">+ ${v==='tutto'?'Tutto':eur(v)}</button>`).join('')}</div>
    <div class="k" style="color:var(--soft);font-weight:700;margin:12px 0 4px">Prendi dalla banca</div><div class="rep">${[10,50,100,'tutto'].map(v=>`<button data-wd="${v}">− ${v==='tutto'?'Tutto':eur(v)}</button>`).join('')}</div>`)+'</div>'}
  else if(A==='nav'){const q=(PH9.navQ||'').toLowerCase(),L=BUILD.filter(b=>b.n&&(!q||b.n.toLowerCase().includes(q))).slice().sort((x,y)=>x.n.localeCompare(y.n));
    h=bar('🧭 Mappe GPS')+`<div class="scr">${PH9.nav?`<div class="card9"><div class="k">Stai andando a</div><div style="font:900 20px var(--f-disp);color:#fff">${esc(PH9.nav.n)}</div><div class="rep"><button data-navx="1">✖ Ferma il navigatore</button></div></div>`:''}
      <input id="ph9nq" value="${esc(PH9.navQ||'')}" placeholder="🔍 Dove vuoi andare?" style="width:100%;font:inherit;font-size:16px;padding:10px 12px;border-radius:14px;border:1.5px solid var(--neon);background:#050a07;color:#eafff2;margin-bottom:10px">
      ${S.scene!=='citta'?'<p style="color:var(--soft)">Il navigatore funziona quando sei in città: esci e la strada compare sulla cartina!</p>':''}
      ${L.map(b=>`<button class="li9" data-nav="${b.id}"><span class="av9">${b.ic||'📍'}</span><span class="tx"><b>${esc(b.n)}</b><small>${S.scene==='citta'?Math.round(Math.abs(b.dx-S.pos.x)+Math.abs(b.dy-S.pos.y))+' passi':''}</small></span><span>➤</span></button>`).join('')||'<p style="color:var(--soft)">Nessun posto con questo nome.</p>'}</div>`}
  else if(A==='meteo'){const r=typeof MT9!=='undefined'?MT9.r||0:0,sn=typeof MT9!=='undefined'&&MT9.snow,c=S.clock||0,night=c<6*60||c>=20*60,
      w=r>.3?(sn?['🌨️','Nevica','Fuori è tutto bianco: copriti bene!']:['🌧️','Piove','Prendi l\'ombrello!']):r>.06?(sn?['🌥️','Nuvoloso','Forse nevica tra poco…']:['🌦️','Nuvoloso','Potrebbe piovere tra poco.']):night?['🌙','Sereno','Una bella notte stellata.']:['☀️','Sole','Bella giornata: perfetta per uscire!'];
    h=bar('🌦️ Meteo')+`<div class="scr" style="text-align:center"><div style="font-size:90px;margin-top:20px">${w[0]}</div><div class="big9" style="margin-top:0">${w[1]}</div><div class="dt9">${esc(S.city||'')} · ${phClock()}</div><div class="card9">${w[2]}</div></div>`}
  else if(A==='calc'){const v=PH9.calc||'0';h=bar('🧮 Calcolatrice')+`<div class="scr"><div class="card9" style="text-align:right"><div class="v" id="ph9cv" style="font-size:34px;overflow-wrap:anywhere">${esc(v)}</div></div><div class="grid9" style="grid-template-columns:repeat(4,1fr);gap:8px">`+
    ['7','8','9','÷','4','5','6','×','1','2','3','−','0','.','C','+','='].map(k=>`<button class="nb${k==='='?' hot':''}" data-ck="${k}" style="padding:14px 0;font-size:20px;border-radius:14px${k==='='?';grid-column:span 4':''}">${k}</button>`).join('')+'</div></div>'}
  else if(A==='note'){h=bar('🔔 Notifiche')+'<div class="scr">'+(PH9.notes.length?PH9.notes.map(([t,m])=>`<div class="li9" style="display:block"><small style="color:var(--neon);font-weight:800">${t}</small><div>${esc(m)}</div></div>`).join(''):'<p style="color:var(--soft)">Nessuna notifica per ora.</p>')+'</div>'}
  else if(A==='set'){const on=typeof tdActive==='function'&&tdActive(),q=typeof TD!=='undefined'&&TD.hq;h=bar('⚙️ Impostazioni')+`<div class="scr">
    <button class="li9" data-set="v"><span class="av9">🎥</span><span class="tx"><b>Vista</b><small>${on?'3D da dietro (come GTA)':'Dall\'alto (mappa)'} · tocca per cambiare</small></span></button>
    <button class="li9" data-set="q"><span class="av9">${q?'✨':'⚡'}</span><span class="tx"><b>Grafica</b><small>${q?'Al massimo: luci, riflessi e ombre':'Leggera: più veloce'} · tocca per cambiare</small></span></button>
    <div class="li9" style="display:block"><b>🎨 Colore dei menu</b><small style="display:block;color:var(--soft)">Scegli il colore che ti piace di più</small><div class="col9">${COL9.map(([k,n,c])=>`<button data-col="${k}" class="${phTema()===k?'on':''}" title="${n}" aria-label="${n}" style="--c:${c}"><i></i><span>${n}</span></button>`).join('')}</div></div>
    <button class="li9" data-set="c"><span class="av9">🏙️</span><span class="tx"><b>Grandezza della città</b><small>${{180:'Normale',270:'Grande',360:'Enorme'}[CITYW]||CITYW} · tocca per cambiare (il gioco si ricarica)</small></span></button>
    <button class="li9" data-set="p"><span class="av9">📏</span><span class="tx"><b>Proporzioni vere in 3D</b><small>${VL9.on()?'Sì: strade e piazze più larghe':'No, come prima'} · tocca per cambiare</small></span></button>
    <button class="li9" data-set="a"><span class="av9">👤</span><span class="tx"><b>Il tuo account</b><small>${ACC9.cur()?esc(ACC9.cur().n)+' · cambia o aggiungi':'Aggiungi il tuo account'}</small></span></button>
    <button class="li9" data-set="d"><span class="av9">${DV9.pc()?'💻':'📱'}</span><span class="tx"><b>Modalità</b><small>${DV9.pc()?'Computer: soldi accanto al nome':'Telefono: schermo pulito'} · tocca per cambiare</small></span></button>
    <button class="li9" data-set="g"><span class="av9">🔠</span><span class="tx"><b>Scritte grandi</b><small>${SET9.on('tg')?'Sì, più grandi':'No, normali'} · tocca per cambiare</small></span></button>
    <button class="li9" data-set="m"><span class="av9">🗺️</span><span class="tx"><b>Cartina in basso</b><small>${SET9.on('nomap')?'Nascosta':'Visibile'} · tocca per cambiare</small></span></button>
    <button class="li9" data-set="o"><span class="av9">🕒</span><span class="tx"><b>Orologio sullo schermo</b><small>${SET9.on('noclk')?'Nascosto':'Visibile'} · tocca per cambiare</small></span></button>
    <button class="li9" data-set="r"><span class="av9">🔀</span><span class="tx"><b>Tasti a destra</b><small>${SET9.on('dx')?'Telefono e Salta a destra':'Telefono e Salta a sinistra'} · tocca per cambiare</small></span></button>
    <button class="li9" data-set="s"><span class="av9">💾</span><span class="tx"><b>Salva la partita</b><small>Il gioco salva anche da solo</small></span></button></div>`}
  if(A&&PHX9[A]&&!h)h=bar(PHX9[A].t)+PHX9[A].h();
  const fst=!e.dataset.o;e.dataset.o=1;e.innerHTML=`<div class="ph${fst?' in':''}" role="dialog" aria-label="Telefono">${top}${h}</div>`;const sc=$('ph9s');if(sc)sc.scrollTop=1e5;const pg=$('ph9pg');if(pg){pg.scrollLeft=(PH9.pg||0)*pg.clientWidth;pg.onscroll=()=>{const k=Math.round(pg.scrollLeft/Math.max(1,pg.clientWidth));if(k!==PH9.pg){PH9.pg=k;e.querySelectorAll('.dots9 i').forEach((d,i)=>d.classList.toggle('on',i===k))}}}
  e.querySelectorAll('[data-ph]').forEach(b=>b.onclick=()=>{const k=b.dataset.ph;
    if(k==='close')return phClose();if(k==='home'){if(PH9.app==='msg'&&PH9.conv){PH9.conv=null}else PH9.app=null;PH9.calling=null;return phRender()}
    if(k==='hang'){PH9.calling=null;return phRender()}
    if(['me','zaino','fam','diario'].includes(k)){phClose();setTimeout(()=>{ui.ioTab=k==='me'?'stat':k;openIo()},30);return}
    if(PH9_BT[k]){phClose();setTimeout(()=>{const t=$(PH9_BT[k]);if(t)t.click()},30);return}
    PH9.app=k;PH9.conv=null;phRender()});
  e.querySelectorAll('[data-ck]').forEach(b=>b.onclick=()=>{const k=b.dataset.ck;let v=PH9.calc||'0';
    if(k==='C')v='0';else if(k==='='){try{const ex=v.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-');if(!/^[0-9.+\-*/ ]+$/.test(ex))throw 0;const r=Function('return ('+ex+')')();v=isFinite(r)?String(Math.round(r*1e6)/1e6):'Errore'}catch(_){v='Errore'}}
    else v=(v==='0'||v==='Errore')&&!'+−×÷.'.includes(k)?k:v+k;PH9.calc=v.slice(0,18);phRender()});
  e.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>{const B=BUILD.find(x=>x.id===b.dataset.nav);if(!B)return;PH9.nav={id:B.id,n:(B.ic?B.ic+' ':'')+B.n,x:B.dx,y:B.dy};PH9.navR=null;phClose();toast('🧭 Navigatore: la strada per '+PH9.nav.n+' è sulla cartina in basso!')});
  e.querySelectorAll('[data-navx]').forEach(b=>b.onclick=()=>{PH9.nav=null;phRender()});
  {const nq=$('ph9nq');if(nq){nq.onkeydown=ev=>ev.stopPropagation();nq.oninput=()=>{PH9.navQ=nq.value;const pos=nq.selectionStart;phRender();const n2=$('ph9nq');if(n2){n2.focus();try{n2.setSelectionRange(pos,pos)}catch(_){}}}}}
  e.querySelectorAll('[data-col]').forEach(b=>b.onclick=()=>{phSetTema(b.dataset.col);phRender()});
  if(A&&PHX9[A]&&PHX9[A].on)try{PHX9[A].on(e)}catch(_){}
  e.querySelectorAll('[data-cv]').forEach(b=>b.onclick=()=>{PH9.app='msg';PH9.conv=b.dataset.cv;phRender();phBadge()});
  const snd=()=>{const i=$('ph9in');if(!i)return;const v=i.value.trim();if(!v)return;const who=PH9.conv,cv=phConv(who);cv.m.push({t:1,x:v});cv.q=null;phRender();setTimeout(()=>{const ip=$('ph9in');if(ip)ip.focus()},20);
    setTimeout(()=>{const c2=phConv(who);c2.m.push({t:0,x:phReply(who,v)});if(ui.ph9&&PH9.conv===who){const ip0=$('ph9in'),keep=ip0&&ip0.value,foc=ip0&&document.activeElement===ip0;phRender();const ip=$('ph9in');if(ip){if(keep)ip.value=keep;if(foc)ip.focus()}}else{c2.u=(c2.u||0)+1;phBadge()}try{add('fel',1);updateHud()}catch(_){}save()},1300)};
  const sb=e.querySelector('[data-send]');if(sb)sb.onclick=snd;const ii=$('ph9in');if(ii)ii.onkeydown=ev=>{ev.stopPropagation();if(ev.key==='Enter'){ev.preventDefault();snd()}};
  e.querySelectorAll('[data-rep]').forEach(b=>b.onclick=()=>{const cv=phConv(PH9.conv),i=+b.dataset.rep,q=cv.q;cv.m.push({t:1,x:b.textContent});cv.q=null;phRender();
    const who=PH9.conv;setTimeout(()=>{const c2=phConv(who);c2.m.push({t:0,x:q?q.ans[i]||'😊':pick(['😊','Ciao! ❤️','Tutto bene, grazie!','Che bello sentirti! 😄'])});if(ui.ph9&&PH9.conv===who)phRender();else{c2.u=(c2.u||0)+1;phBadge()}try{add('fel',1);updateHud()}catch(_){}save()},1100)});
  e.querySelectorAll('[data-call]').forEach(b=>b.onclick=()=>{const c=phContacts().find(q=>q.id===b.dataset.call);PH9.calling=c;phRender();
    const L={mamma:['Pronto? Ciao amore mio! Che bello sentirti! ❤️','Ciao! Stai bene? Copriti che fa freddo! 🧣'],papa:['Ehi campione! Tutto bene? 💪','Ciao! Stasera guardiamo la partita insieme? ⚽'],bff:['Ehi! Ci vediamo dopo? 😄','Ciao! Ho appena finito di giocare, tu che fai?'],partner:['Ciao! Mi mancavi! 💞'],capo:['Pronto, ufficio. Tutto bene, ci vediamo domani! 💼']};
    PH9.callT=setTimeout(()=>{const p=$('ph9c');if(p&&PH9.calling===c){p.style.color='#eafff2';p.textContent='«'+pick(L[c.id]||['Ciao! Che bello sentirti! 😊'])+'»';try{add('fel',1);updateHud()}catch(_){}}},1600)});
  const mv=(d)=>{if(S.bank==null)return;d=Math.round(d);if(d>0&&d>S.money)d=Math.max(0,Math.floor(S.money));if(d<0&&-d>S.bank)d=-Math.max(0,Math.floor(S.bank));if(!d){toast('Non ci sono abbastanza soldi.');return}
    S.money-=d;S.bank+=d;updateHud();save();toast(d>0?`🏦 Hai messo ${eur(d)} in banca`:`💶 Hai preso ${eur(-d)} dalla banca`);phRender()};
  e.querySelectorAll('[data-dep]').forEach(b=>b.onclick=()=>mv(b.dataset.dep==='tutto'?S.money:+b.dataset.dep));
  e.querySelectorAll('[data-wd]').forEach(b=>b.onclick=()=>mv(-(b.dataset.wd==='tutto'?S.bank:+b.dataset.wd)));
  e.querySelectorAll('[data-set]').forEach(b=>b.onclick=()=>{const k=b.dataset.set;if(k==='s'){save();toast('💾 Partita salvata!');return}if(k==='t'){phSetTema(phTema()==='neon'?'normale':'neon');phRender();return}if(k==='a'){PH9.app='acc9';phRender();return}if(k==='d'){DV9.set(DV9.pc()?'tel':'pc');phRender();return}if(SET9.k[k]){SET9.flip(SET9.k[k]);phRender();return}if(k==='p'){try{localStorage.setItem('vita_s9_prop',VL9.on()?'0':'1')}catch(_){}toast(VL9.on()?'📏 Proporzioni vere attivate':'↩️ Proporzioni come prima');phRender();return}if(k==='c'){const n={180:270,270:360,360:180}[CITYW]||270;try{localStorage.setItem('vita_cityW',n)}catch(_){}S.scene=HOME();S.pos={x:3.5,y:5.5};S.escort=null;S.drive=null;S.famDrive=null;S.parked=null;S.carOut=false;save();toast('🏙️ Sto costruendo la città nuova…');setTimeout(()=>location.reload(),900);return}
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

// le cose che prima erano in alto adesso stanno nel telefono (dagli 11 anni; da piccolo restano in alto)
const PH9_BT={map:'mapBtn',miss:'goalBtn',help:'helpBtn',need:'needBtn9',work:'workBtn9'};
function phApps(n){const vis=id=>{const e=$(id);return e&&!e.hidden},gb=$('goalBtn'),gt=gb&&gb.querySelector('.badge'),nb=$('needBadge9');
  const L=[['msg','💬','Messaggi',n],['call','📞','Chiamate'],['cont','👥','Contatti'],['miss','🎯','Obiettivi',gt?gt.textContent:''],['help','❓','Domande']];
  if(vis('needBtn9'))L.push(['need','🍎','Mangia e bevi',nb&&!nb.hidden?nb.textContent:'']);if(vis('workBtn9'))L.push(['work','💼','Lavoro']);
  L.push(['bank','💳','Banca'],['nav','🧭','Mappe GPS'],['map','🗺️','Mappa'],['me','👤','Profilo'],['zaino','🎒','Zaino'],['fam','❤️','Famiglia'],['diario','📜','Diario'],['meteo','🌦️','Meteo'],['calc','🧮','Calcolatrice'],['note','🔔','Notifiche'],['set','⚙️','Impostazioni'],['close','⏻','Chiudi']);return L}
{const st=document.createElement('style');st.textContent=`body.ph9mv #helpBtn,body.ph9mv #needBtn9,body.ph9mv #workBtn9,body.ph9mv #goalBtn,body.ph9mv #mapBtn{display:none!important}
#phoneBtn.need9::after{content:'🍎';position:absolute;right:-8px;bottom:-8px;font-size:14px;background:#e5484d;border-radius:99px;padding:0 3px;line-height:18px}
#ph9 .app9 b{background:#0f5a30;border:1px solid var(--neon)}`;document.head.appendChild(st)}

// risposta a quello che scrivi tu (semplice e gentile)
function phReply(id,v){const t=v.toLowerCase(),par=id==='mamma'||id==='papa',has=(...w)=>w.some(x=>t.includes(x));
  if(has('come stai','come va','tutto bene'))return pick(['Tutto bene, grazie! E tu? 😊','Benissimo! Oggi è una bella giornata ☀️']);
  if(has('ti voglio bene','ti amo','mi manchi','❤'))return pick(['Anche io ti voglio tanto bene! ❤️','Tantissimo! 🥰']);
  if(has('fame','mangi','pizza','cena','pranzo','merenda'))return pick(par?['Ti preparo qualcosa di buono! 🍝','Stasera pizza? 🍕']:['Gnam! Andiamo a mangiare una pizza? 🍕','Anche io ho fame! 😋']);
  if(has('compiti','scuola','verifica','interrogazione','esame'))return pick(['Studia un pochino ogni giorno e andrà benissimo! 📚','Forza, ce la fai! 💪']);
  if(has('giochi','giocare','parco','calcio','usciamo','vieni'))return pick(par?['Va bene, ma torna per cena! 😉','Certo, divertiti!']:['Sì! Ci vediamo al parco! ⚽','Arrivo subito! 🏃']);
  if(has('soldi','euro','€','paghetta'))return pick(par?['Risparmia un po\' e mettili in banca! 🏦','Te li sei meritati? 😄']:['Io sto risparmiando per una bici nuova! 🚲']);
  if(has('grazie'))return pick(['Prego! 😊','Di niente! ❤️']);
  if(has('ciao ciao','a dopo','buonanotte','notte'))return pick(['A dopo! 👋','Buonanotte, sogni d\'oro! 🌙']);
  if(has('ciao','salve','buongiorno','buonasera','hey','ehi'))return pick(par?['Ciao tesoro! 😘','Ciao amore! Come stai?']:['Ciao! 😄','Ehi! Che bello sentirti!']);
  if(t.includes('?'))return pick(['Bella domanda! Ne parliamo a voce dopo 😊','Mmm… fammi pensare! 🤔','Sì, certo!']);
  return pick(['Ah, che bello! 😄','Ok! 👍','Davvero? Raccontami di più!','Ah ah, simpatico! 😂','Va bene! 😊'])}
{const st=document.createElement('style');st.textContent=`#ph9 .say9{display:flex;gap:8px;padding:8px 12px 14px;border-top:1px solid rgba(63,217,138,0.21)}
#ph9 .say9 input{flex:1;min-width:0;font:inherit;font-size:16px;padding:10px 12px;border-radius:14px;border:1.5px solid var(--neon);background:#050a07;color:#eafff2;-webkit-user-select:text;user-select:text}
#ph9 .say9 input:focus-visible{outline:2px solid var(--neon);outline-offset:1px}
#ph9 .say9 button{width:46px;border-radius:14px;border:1.5px solid var(--neon);background:var(--neon);color:#021008;font-size:20px;font-weight:900}`;document.head.appendChild(st)}

// il navigatore del telefono: la strada viola sulla cartina in basso, fino a quando arrivi
{const _g=gpsCalc;gpsCalc=function(dt){_g(dt);try{const N=PH9.nav;if(!N||GPS9.route||!S||S.scene!=='citta')return;
  if(Math.abs(S.pos.x-N.x)+Math.abs(S.pos.y-N.y)<3.2){PH9.nav=null;PH9.navR=null;toast('🧭 Sei arrivato: '+N.n+'!');return}
  PH9.navT=(PH9.navT||0)-dt;if(PH9.navT>0&&PH9.navR){GPS9.route=[[S.pos.x-.5,S.pos.y-.5],...PH9.navR.slice(PH9.navI||0)];GPS9.goal=[N.x-.5,N.y-.5];return}PH9.navT=.8;
  const fx=Math.floor(S.pos.x),fy=Math.floor(S.pos.y),st=at(fx,fy)===1?[[fx,fy]]:nearRoad(fx,fy),en=nearRoad(Math.floor(N.x),Math.floor(N.y)),r=st.length&&en.length?roadRoute(st,en):null;
  PH9.navR=r;PH9.navI=0;GPS9.route=r?[[S.pos.x-.5,S.pos.y-.5],...r]:null;GPS9.goal=[N.x-.5,N.y-.5]}catch(e){}}}
// chiedere il numero di telefono alle persone che incontri
const PH9_ASK='📱 Mi dai il tuo numero?';
{const _q=quickFor;quickFor=function(n){const r=_q.apply(this,arguments);try{if(phOK()&&n&&!['mamma','papa'].includes(n.role)&&!phHasNum(n.id)&&Array.isArray(r))return r.concat([PH9_ASK])}catch(e){}return r}}
function phHasNum(id){const n=NPCS.find(x=>x.id===id);if(n&&[S.bff,S.mamma,S.papa,S.partner&&S.partner.nome].includes(n.name))return true;return !!(S.ph9&&S.ph9.num&&S.ph9.num.some(q=>q.id==='n_'+id))}
{const _say=say;say=function(text){try{const n=NPCS.find(x=>x.id===ui.chatNpc);if(n&&phOK()&&/numer|telefon|cellulare/i.test(text)&&!['mamma','papa'].includes(n.role)){
  ui.chat.push({from:'me',t:text.trim()});if(phHasNum(n.id))ui.chat.push({from:'them',t:'Ce l\'hai già nel telefono! Scrivimi quando vuoi 📱'});
  else{const num='3'+String(Math.floor(h9r(n.id.length,(n.name||'').length,7)*90+10))+' '+String(100+Math.floor(Math.random()*900))+' '+String(1000+Math.floor(Math.random()*9000));
    S.ph9=S.ph9||{c:{}};S.ph9.num=S.ph9.num||[];S.ph9.num.push({id:'n_'+n.id,ic:'🙂',rol:n.name,nm:num});
    ui.chat.push({from:'them',t:`Certo! Ecco il mio numero: ${num} 📱`});ui.chat.push({from:'fx',t:'📱 '+n.name+' è nei tuoi contatti: puoi chiamare e mandare messaggi!'})}
  save();updateHud();renderChat();return}}catch(e){}return _say.apply(this,arguments)}}

// stile dei menu: neon (nero e verde) oppure normale (bianco come prima)
function phTema(){try{return localStorage.getItem('vita_tema9')||'neon'}catch(e){return 'neon'}}
function phSetTema(t){try{localStorage.setItem('vita_tema9',t)}catch(e){}const st=$('neon9');if(st)st.disabled=t!=='neon';document.documentElement.classList.toggle('tn9',t!=='neon');toast(t==='neon'?'🟢 Stile neon attivato':'⚪ Stile normale attivato')}
{const st=$('neon9');if(st)st.disabled=phTema()!=='neon';document.documentElement.classList.toggle('tn9',phTema()!=='neon')}
// la scritta grande "Obiettivo raggiunto" non copre il telefono, e niente soldi che saltano fuori
{const _g=gtaPassed;gtaPassed=function(t,sub){if(ui.ph9)return;return _g.call(this,t,'')}}
{const _o=phOpen;phOpen=function(){const r=_o.apply(this,arguments);const g=$('gta9pass');if(g&&ui.ph9){g.style.opacity='0'}return r}}
