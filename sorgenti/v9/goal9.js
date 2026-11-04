/* ================= v9: tocchi un obiettivo e il gioco ti porta lì ================= */
const scuolaDove=()=>S.uni?{to:'uni',furn:'studia'}:{to:'scuola',furn:'studia'};
const GODEST={
 nanna:{to:'casa',furn:'sheet:letto'},merenda:{to:'casa',furn:'merenda'},tv:{to:'casa',furn:'videogiochi'},aiuta:{to:'casa',furn:'aiuta'},
 leggi:{to:'casa',furn:'leggi'},zaino:{to:'casa',furn:'sheet:scrivania'},compiti:{to:'casa',furn:'sheet:scrivania'},
 bagno:{to:'casa',furn:'bagno'},bagnetto:{to:'casa',furn:'bagnetto'},denti:{to:'casa',furn:'denti'},dispensa:{to:'casa',furn:'sheet:dispensa'},cucina:{to:'casa',furn:'sheet:cucina'},
 usa:{fn:()=>{ui.ioTab='zaino';ui.sheet={type:'io'};renderSheet();toast('🎒 Ecco il tuo zaino: tocca una cosa per usarla!')}},
 abbraccio:{par:'mamma'},storia:{par:'mamma'},regalo:{par:'mamma'},chiedi:{par:'mamma'},accompagna:{par:'mamma'},giocapapa:{par:'papa'},barz:{par:'papa'},
 figli:{to:'casa'},parla:{to:'parco'},giocaamico:{to:'parco'},cane:{to:'parco'},
 opere:{to:'museo',furn:'opera:gioconda'},dino:{to:'museo',furn:'opera:dino'},curiosita:{to:'museo'},guida:{to:'museo'},inglese:{to:'scuola'},
 bibleggi:{to:'biblioteca'},prestito:{to:'biblioteca',furn:'sheet:biblioteca'},compralibro:{to:'biblioteca',furn:'sheet:biblioteca'},
 film:{to:'cinema',furn:'sheet:cinema'},teatro:{to:'cinema',furn:'sheet:cinema'},
 asilo:{to:'asilo',furn:'giocattoli'},disegna:{to:'asilo'},canta:{to:'asilo'},nido:{to:'nido'},
 materiale:{to:'negozio',furn:'sheet:negozio'},compra:{to:'negozio',furn:'sheet:negozio'},
 studia:scuolaDove,verifica:{fn:()=>startQuiz('verif')},belvoto:{fn:()=>startQuiz('verif')},interroga:{fn:()=>startQuiz('interr')},ricreazione:{to:'scuola',furn:'ricreazione'},
 sport:{to:'campo'},partita:{to:'campo',furn:'partita'},nuoto:{to:'piscina',furn:'nuota'},
 gelato:{to:'gelateria'},lavoretto:{to:'gelateria',furn:'lavoretto'},pizza:{to:'pizzeria',furn:'sheet:pizzeria'},
 spesa:{to:'supermercato',furn:'sheet:supermercato'},latte:{to:'supermercato',furn:'sheet:supermercato'},
 banca:{to:'banca',furn:'sheet:banca'},risparmia:{to:'banca',furn:'sheet:banca'},
 pediatra:{to:'ospedale'},visita:{to:'ospedale',furn:'visita'},volontariato:{to:'ospedale',furn:'volontariato'},
 candidati:{to:'ufficio',furn:'sheet:ufficio'},lavoro:{to:'ufficio',furn:'lavorasodo'},
 ciuccio:{to:'centro'},giocattolo:{to:'centro',furn:'sheet:c_giochi'},centro:{to:'centro'},casco:{to:'centro',furn:'sheet:c_sport'},
 revisione:{to:'auto',furn:'sheet:auto'},edicola:{to:'edicola',furn:'sheet:edicola'},
 vacanza:()=>S.tripBooked?{fn:notifTap}:{to:'agenzia',furn:'sheet:viaggi'},
 entra:()=>{const b=KIDPLACES.find(p=>!(S.visitYr||{})[p]&&p!==S.scene);return b?{to:b}:null},
 nuovo:()=>{const b=BUILD.map(x=>x.id).find(p=>!S.visited[p]&&SC[p]&&!(S.age<14&&(p==='uni'||p==='ufficio')));return b?{to:b}:null},
 strisce:{fn:()=>toast('🚦 Vai sulle strisce pedonali vicino a un semaforo e attraversa quando il semaforo delle macchine è rosso!')},
};
// ci vai da sol*: niente mamma e papà, cammini veloce fino al posto
function goPlace(to){
  if(S.scene===to)return true;
  if(S.escort){const n=NPCS.find(x=>x.id===S.escort.id);S.escort=null;if(n)parentLeave(n.id)}
  if(S.scene!=='citta')exitBuilding();
  const d=destXY(to);if(!d){if(SC[to])enterBuilding(to);return true}
  if(walkToDest(to,d)){if(ui.walk)ui.walk.go=1}else if(SC[to])enterBuilding(to);
  return false;
}
function goMission(k){
  const m=S.miss.find(x=>x.k===k);closeSheet();if(!m||m.ok)return;
  if(S.drive||S.famDrive)return toast('Prima arriviamo! Poi ci andiamo. 🚗');
  if(S.trip)return toast('Sei in vacanza! Questo obiettivo lo fai quando torni a casa. 🏖️');
  ui.goFurn=null;ui.goNpc=null;ui.goLead=null;ui.walk=null;ui.idle=0;
  if(S.age<5&&mdest(k)){const M=mdest(k);
    if(M.now){const n=NPCS.find(x=>x.id===M.now);ui.goNpc=M.now;ui.goNpcTry=8;ui.leadTask={place:n?n.scene:S.scene,ks:[k],par:M.now,now:1};toast(`📍 Vai ${M.now==='mamma'?'dalla mamma':'dal papà'} e premi «${LEADLBL[k]||'Gioca'}»! 👆`);return findPar(M.now)}
    if(M.furn){ui.goFurn={sc:HOME(),furn:M.furn,lead:k};toast('📍 Ti porto a casa!');goPlace(HOME());return}
    if(M.to&&!M.to.startsWith('npc:')){const b=BUILD.find(x=>x.id===M.to)||{ic:'📍',n:'il parco'};ui.goLead={k,to:M.to};toast(`📍 Ti porto ${PLACE_ART[M.to]||'lì'}: ${b.ic} ${b.n}!`);goPlace(M.to);return}
  }
  const G=GODEST[k],D=typeof G==='function'?G():G;
  if(!D)return toast('Questo obiettivo lo puoi fare dove vuoi! 😊');
  if(D.fn)return D.fn();
  if(D.par){ui.goNpc=D.par;ui.goNpcTry=8;toast(`📍 Ti porto ${D.par==='mamma'?'dalla mamma':'dal papà'}: poi chiediglielo tu! 💬`);return findPar(D.par)}
  const to=D.to==='casa'?HOME():D.to,b=BUILD.find(x=>x.id===to)||{ic:'📍',n:'il parco'};ui.goFurn=D.furn?{sc:to,furn:D.furn}:null;
  if(S.scene===to){if(!D.furn)toast('Sei già nel posto giusto! 😊');return}
  toast(`📍 Ti porto ${PLACE_ART[to]||'lì'}: ${b.ic} ${b.n}!`);goPlace(to);
}
// arrivato nel posto, cammina fino al mobile giusto (ma il bottone lo premi tu)
function goFurnTick(){
  const gn=ui.goNpc;if(gn&&ui.chatNpc)ui.goNpc=null;
  else if(gn&&!isBusy()&&!ui.walk&&!S.drive){const n=NPCS.find(x=>x.id===gn);
    if(!n||n.scene!==S.scene||(ui.goNpcTry=(ui.goNpcTry||1)-1)<0){ui.goNpc=null}
    else if(Math.hypot(n.x-S.pos.x,n.y-S.pos.y)<=2.2){ui.goNpc=null;openChat(n.id)}
    else{let ok=false;for(const [ox,oy] of [[0,1],[1,0],[-1,0],[0,-1]])if(walkTo(Math.floor(n.x)+ox,Math.floor(n.y)+oy,{npc:n.id})){ok=true;break}if(!ok)ui.goNpc=null}}
  const gl=ui.goLead;if(gl&&!isBusy()&&!ui.walk&&S.scene===gl.to){ui.goLead=null;const r=leadDo(gl.to,'mamma');if(r)toast(r)}
  const g=ui.goFurn;if(!g||isBusy()||ui.walk||S.drive||(S.escort&&S.escort.to))return;
  if(S.scene!==g.sc){if(S.scene!=='citta')ui.goFurn=null;return}
  ui.goFurn=null;const sc=curSc(),i=sc.furn.findIndex(f=>f.act===g.furn);if(i<0)return;const fu=sc.furn[i];
  const cand=[];for(let x=fu.x-1;x<=fu.x+fu.w;x++)for(let y=fu.y-1;y<=fu.y+fu.h;y++)if(!solid(x,y))cand.push([x,y,Math.hypot(x+.5-S.pos.x,y+.5-S.pos.y)]);
  cand.sort((a,b)=>a[2]-b[2]);for(const [x,y] of cand)if(walkTo(x,y,{})){if(g.lead){ui.leadTask={place:S.scene,ks:[g.lead],par:'mamma',furn:1};toast(`👉 Eccoci! Premi «${LEADLBL[g.lead]||fu.label||'Usa'}»! 👆`)}else toast(`👉 Eccoci! Premi il bottone qui sotto: «${fu.label||'Usa'}»`);return}
}
// mappa: elenco di tutte le persone, tocchi e vai da loro
const ROLEIC={mamma:'👩',papa:'👨',amico:'🧒',compagno:'🧒',nonna:'👵',nonno:'👴',vigile:'👮',maestra:'👩‍🏫',prof:'🧑‍🏫',educatrice:'👩‍🍼',dottoressa:'🩺',infermiere:'🩺',cane:'🐶',bagnino:'🛟',pizzaiolo:'🍕',gelataio:'🍦',parroco:'⛪',hostess:'✈️',pilota:'✈️',bancario:'🏦',direttore:'🏦',venditore:'🚗',agente:'🔑',agente2:'🧳',edicolante:'📰',amore:'💘'};
function peopleBody(){
  const park=n=>n.x>=PARK.x&&n.x<PARK.x+PARK.w&&n.y>=PARK.y&&n.y<PARK.y+PARK.h;
  const where=n=>{if(n.scene==='via'||n.hide)return '🚶 in giro per la città';if(n.scene==='citta')return park(n)?'🌳 al parco':'🏙️ in città';const b=BUILD.find(b=>b.id===n.scene)||SCN[n.scene]||{ic:'📍',n:n.scene};return b.ic+' '+b.n};
  const rank=n=>n.id==='mamma'?0:n.id==='papa'?1:n.role==='amico'?2:3;
  const L=NPCS.filter(n=>(n.scene==='mare')===(S.scene==='mare')).slice().sort((a,b)=>rank(a)-rank(b)||a.name.localeCompare(b.name)),q=ui.pplQ||'';
  return `<input id="pplQ" type="search" placeholder="🔍 Cerca una persona…" value="${esc(q)}" autocomplete="off" style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:14px;border:2px solid var(--line);font-size:16px;margin-bottom:8px">
    <p class="note">${L.length} persone${S.scene==='mare'?' a Marina di Lido':' in città'}. Tocca una persona e ci vai da sol${o()}: quando arrivi le puoi parlare. 💬</p><div id="pplL" style="display:grid;gap:6px">`+L.map(n=>`<button class="btn alt" data-findnpc="${n.id}" data-nm="${esc(norm(n.name+' '+(n.role||'')))}" style="text-align:left;white-space:normal${q&&!norm(n.name+' '+(n.role||'')).includes(norm(q))?';display:none':''}">${(n.role==='nonno'||n.role==='nonna')?(n.look&&n.look.f?'👵':'👴'):ROLEIC[n.role]||(n.animal?'🐾':(n.look&&n.look.f?'👩':'🧑'))} <b>${esc(n.name)}</b> · ${esc(where(n))}</button>`).join('')+`</div>`;
}
document.addEventListener('input',e=>{if(e.target.id!=='pplQ')return;ui.pplQ=e.target.value;const q=norm(ui.pplQ);document.querySelectorAll('#pplL [data-nm]').forEach(b=>b.style.display=!q||b.dataset.nm.includes(q)?'':'none')});
// vai da una persona (anche se è in giro): la raggiungi e si apre la chat
function goToNpc(id){
  const n=NPCS.find(x=>x.id===id);if(!n)return;
  if(n.scene==='via'||n.hide){n.scene='citta';n.hide=0;n.path=null;const d=pick(DOORS);n.x=d.x+.5;n.y=d.y+.5}
  ui.goNpc=id;ui.goNpcTry=8;ui.mapTab=null;findPar(id);
}
