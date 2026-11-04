/* ================= v9: una scuola per edificio (elementari, medie, superiori) + università con esami ================= */
{const b=BUILD.find(x=>x.id==='scuola');if(b)b.n='Scuola elementare'}
function schoolBld(){const t=S&&S.school&&S.school.tipo;return t==='medie'?'medie9':t==='asilo'?'asilo':(t&&t!=='elementari')?'sup9':'scuola'}
const SCH9={medie9:{n:'Scuola media',art:'alla scuola media'},sup9:{n:'Scuola superiore',art:'alla scuola superiore'}};
// le aule nuove sono come quella della scuola (stessi banchi, lavagna e cortile)
for(const id of ['medie9','sup9']){const s0=SC.scuola;SC[id]=Object.assign({},s0,{id,t:s0.t.slice(),sol:s0.sol.slice(),furn:s0.furn.map(f=>Object.assign({},f,f.act==='sheet:scuola'?{act:'sheet:'+id}:{})),door:Object.assign({},s0.door)})}
let SCH9_ok=false;
function sch9Init(){if(SCH9_ok)return;SCH9_ok=true;
  // le scuole sono state spostate: se eri rimasto in un punto dove adesso c'è un palazzo, ti sposto sul marciapiede
  try{if(S&&S.scene==='citta'&&at(Math.floor(S.pos.x),Math.floor(S.pos.y))===4){let best=null;for(let r=1;r<8&&!best;r++)for(let y=-r;y<=r&&!best;y++)for(let x=-r;x<=r;x++){const X=Math.floor(S.pos.x)+x,Y=Math.floor(S.pos.y)+y,v=at(X,Y);if(v===2||v===6){best=[X+.5,Y+.5];break}}if(best)S.pos={x:best[0],y:best[1]}}}catch(e){}
  const cp=(o,v)=>{try{if(o&&o.scuola!=null){o.medie9=v?v.medie9:o.scuola;o.sup9=v?v.sup9:o.scuola}}catch(e){}};
  try{cp(PLACE_ART,{medie9:'alla scuola media',sup9:'alla scuola superiore'})}catch(e){}
  try{cp(SCENE_N,{medie9:'alla scuola media',sup9:'alla scuola superiore'})}catch(e){}
  try{cp(SCENE_DO)}catch(e){}try{cp(FLOOR)}catch(e){}try{REAL.medie9=['#d9c9a8','#3b5f8a'];REAL.sup9=['#d6d0c4','#5a3a6a']}catch(e){}
  try{SHEET_T.medie9=['🏫','Scuola media'];SHEET_T.sup9=['🎓','Scuola superiore']}catch(e){}
  try{for(const k in GODEST){const g=GODEST[k];if(g===scuolaDove)GODEST[k]=()=>S.uni?{to:'uni',furn:'studia'}:{to:schoolBld(),furn:'studia'};else if(g&&typeof g==='object'&&g.to==='scuola'){delete g.to;Object.defineProperty(g,'to',{get:()=>schoolBld()==='asilo'?'scuola':schoolBld(),enumerable:true})}}}catch(e){}
}
// il posto della scuola: se non è il tuo edificio, ti dice dove andare
{const P=PLACES.scuola,_b=P.body,_s=P.sub;
  P.body=(...a)=>{const me=S.scene,my=schoolBld();if(inSchool()&&['scuola','medie9','sup9'].includes(me)&&me!==my&&my!=='asilo'){const nb=BUILD.find(b=>b.id===my);return `<p class="note">Quest'anno la tua scuola è la <b>${nb?nb.n.toLowerCase():'tua scuola'}</b>: è in un altro edificio! 🏫</p><button class="btn hot" data-go9="${my}">📍 Portami lì</button>`}
    if(!inSchool()&&me==='medie9')return `<p class="note">Qui si fanno le medie, dagli 11 ai 13 anni (3 anni). Alla fine c'è l'esame per la licenza media. 🎓</p>`;
    if(!inSchool()&&me==='sup9')return `<p class="note">Qui si fanno le superiori: liceo, istituto tecnico o professionale (5 anni). Alla fine c'è la maturità. 🎓</p>`+(S.edu===1&&!S.school?paBtn('iscriviSup'):'');
    return _b(...a)};
  P.sub=(...a)=>{if(S.scene==='scuola'&&schoolBld()!=='scuola')return 'Scuola elementare';if(S.scene==='medie9'&&!(S.school&&S.school.tipo==='medie'))return 'Scuola media';if(S.scene==='sup9'&&schoolBld()!=='sup9')return 'Scuola superiore';return _s(...a)};
  PLACES.medie9=P;PLACES.sup9=P}
document.addEventListener('click',e=>{const b=e.target.closest('[data-go9]');if(!b)return;closeSheet();goPlace(b.dataset.go9)});
// prof e compagni stanno nella scuola dove vai tu
function sch9Npcs(){const my=schoolBld();if(my==='asilo')return;for(const n of NPCS){if((n.role==='prof'||n.role==='compagno'||n.role==='maestra')&&(n.scene==='scuola'||n.scene==='medie9'||n.scene==='sup9')&&n.scene!==my&&!(n.role==='maestra'&&my!=='scuola'))n.scene=my}}
{const _s=step;step=function(dt){sch9Init();if(S&&S.alive)sch9Npcs();return _s(dt)}}
// interrogazioni e verifiche: nella tua scuola
startQuiz=function(type){
  closeSheet();const my=schoolBld();
  if(!inSchool()||S.uni)return toast('Le interrogazioni si fanno a scuola, quando sei iscritt'+o()+'! 🏫');
  if(S.scene!==my){ui.goQuiz=type;toast('📍 Ti porto a scuola dal prof!');goPlace(my);return}
  sch9Npcs();const n=NPCS.find(x=>x.scene===my&&(x.role==='prof'||x.role==='maestra')&&!x.hide)||NPCS.find(x=>x.role==='prof'||x.role==='maestra');
  if(!n)return toast('Il prof oggi non c\'è!');
  if(n.scene!==my){n.scene=my;n.x=S.pos.x+1;n.y=S.pos.y-1}
  openChat(n.id);say(type==='verif'?'Mi fa la verifica?':'Mi interroga?')};
quizTick=function(){const q=ui.goQuiz;if(q&&S.scene===schoolBld()&&!ui.walk&&!isBusy()){ui.goQuiz=null;startQuiz(q)}};
// il diploma: elementari, medie e superiori ognuno nel suo edificio

/* ---------- università: esami orali (interrogazioni) e scritti (verifiche) per ogni facoltà ---------- */
const UNIQ={
 medicina:[['Quante ossa ha più o meno il corpo di un adulto?','206','52','1000'],['Quale organo pompa il sangue?','Il cuore','Il fegato','Lo stomaco'],['Dove si trovano i polmoni?','Nel torace','Nella pancia','Nella testa'],['A cosa servono i globuli rossi?','Portano l\'ossigeno','Fanno digerire','Fanno crescere i capelli'],['Qual è la temperatura normale del corpo?','Circa 36,5 °C','Circa 42 °C','Circa 30 °C'],['Che cosa misura il fonendoscopio?','Il battito del cuore e il respiro','La febbre','Il peso'],['Quale organo pulisce il sangue e fa la pipì?','I reni','Il cuore','I polmoni'],['Il cervello si trova…','Nella testa','Nella pancia','Nel ginocchio']],
 infermieristica:[['Cosa si usa per misurare la febbre?','Il termometro','Il righello','La bilancia'],['Prima di curare un paziente cosa si fa?','Ci si lavano le mani','Si mangia','Si dorme'],['Dove si misura la pressione?','Al braccio','Al naso','Al piede'],['Cos\'è una flebo?','Un liquido che va nella vena','Un cerotto','Una pillola'],['Il cuore di un adulto batte circa…','70 volte al minuto','5 volte al minuto','500 volte al minuto']],
 veterinaria:[['Il veterinario cura…','Gli animali','Le macchine','I computer'],['Quante zampe ha un ragno?','8','6','4'],['La mucca è un…','Mammifero','Pesce','Uccello'],['Cosa mangia il coniglio?','Verdure e fieno','Carne','Sassi'],['Il cavallo dorme spesso…','In piedi','Appeso','Sott\'acqua']],
 informatica:[['Che cos\'è un algoritmo?','Una serie di istruzioni','Un tipo di computer','Un virus'],['Quanto fa 1 + 1 in binario?','10','2','11'],['Che cosa fa la CPU?','Fa i calcoli','Raffredda','Stampa'],['La RAM è…','La memoria veloce del computer','Lo schermo','Il mouse'],['Cos\'è un bug?','Un errore nel programma','Un insetto vero','Un tasto']],
 ingegneria:[['Quanto fa 25 × 4?','100','90','125'],['L\'unità di misura della forza è…','Il newton','Il litro','Il grammo'],['Un triangolo ha angoli che sommano a…','180°','360°','90°'],['Quale materiale si usa per i ponti moderni?','Acciaio e cemento','Carta','Gelato'],['La velocità si misura in…','Metri al secondo','Chili','Gradi']],
 economia:[['Cos\'è l\'inflazione?','Quando i prezzi aumentano','Quando si risparmia','Un tipo di banca'],['La moneta dell\'Italia è…','L\'euro','Il dollaro','La sterlina'],['Cosa fa una banca?','Custodisce e presta soldi','Vende pane','Ripara auto'],['Cos\'è un bilancio?','Il conto di entrate e uscite','Un gioco','Una legge'],['Se compro a 10 e vendo a 15 guadagno…','5','25','10']],
 giurisprudenza:[['La legge più importante d\'Italia è…','La Costituzione','Il codice della strada','Il menù'],['Chi decide nei processi?','Il giudice','Il cuoco','Il postino'],['In Italia si vota dai…','18 anni','10 anni','30 anni'],['Il Parlamento fa…','Le leggi','Le pizze','Le partite'],['Chi difende l\'imputato?','L\'avvocato','Il medico','Il pompiere']],
 lettere:[['Chi ha scritto i Promessi sposi?','Alessandro Manzoni','Dante Alighieri','Giovanni Pascoli'],['Un sonetto ha…','14 versi','3 versi','100 versi'],['Chi ha scritto la Divina Commedia?','Dante Alighieri','Petrarca','Leopardi'],['Il latino era la lingua degli…','Antichi romani','Egizi','Cinesi'],['"L\'infinito" è una poesia di…','Giacomo Leopardi','Ugo Foscolo','Manzoni']],
 motorie:[['Quanti giocatori ha una squadra di calcio in campo?','11','5','20'],['Prima di correre bisogna…','Riscaldarsi','Dormire','Mangiare tanto'],['Una maratona è lunga circa…','42 km','5 km','100 km'],['Quale muscolo lavora di più quando corri?','Le gambe','Le orecchie','Il naso'],['Le Olimpiadi si fanno ogni…','4 anni','10 anni','anno']],
};
function uniQs(fac,n){const pool=[...(UNIQ[fac]||UNIQ.economia)],qs=[];while(qs.length<n&&pool.length){const q=pool.splice(Math.floor(Math.random()*pool.length),1)[0],opts=q.slice(1).map((t,i)=>({t,ok:i===0}));for(let i=opts.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[opts[i],opts[j]]=[opts[j],opts[i]]}qs.push({q:q[0],opts})}return qs}
function uniQStart(type){if(!S.uni)return toast('Prima iscriviti all\'università! 🏛️');if(S.scene!=='uni'){closeSheet();toast('📍 Ti porto all\'università!');goPlace('uni');return}
  ui.uq9={type,qs:uniQs(S.uni.fac,type==='verif'?5:3),i:0,ok:0,ans:null};openPlace('uniq9')}
function uniQAnswer(k){const E=ui.uq9;if(!E||E.ans!=null||E.done)return;const q=E.qs[E.i];E.ans=k;if(q.opts[k].ok){E.ok++;toast('✅ Giusto!')}else toast('❌ Era: '+q.opts.find(o=>o.ok).t);refreshSheet();
  setTimeout(()=>{if(ui.uq9!==E)return;E.ans=null;E.i++;if(E.i>=E.qs.length)uniQEnd(E);refreshSheet()},1300)}
function uniQEnd(E){E.done=true;const N=E.qs.length,r=E.ok/N;E.voto=r>=1?31:r>=.8?28:r>=.66?26:r>=.6?22:r>=.5?18:0;E.pass=E.voto>=18;
  const u=S.uni;u.voti=u.voti||[];if(E.pass){u.voti.push(Math.min(30,E.voto));S.studied=true;add('int',2);add('fel',E.voto>=28?6:3)}else add('fel',-3);
  count(E.type==='verif'?'verifica':'interroga');if(E.voto>=27)count('belvoto');
  log(`${E.type==='verif'?'Esame scritto':'Esame orale'} di ${FAC[u.fac].n}: ${E.pass?(E.voto>30?'30 e lode':E.voto+'/30'):'non superato'}`);save();updateHud()}
PLACES.uniq9={sub:()=>ui.uq9&&S.uni?`${FAC[S.uni.fac].n} · ${ui.uq9.type==='verif'?'esame scritto':'esame orale'}`:'',body:()=>{const E=ui.uq9;if(!E)return '<p class="note">Nessun esame in corso.</p>';
  if(E.done)return `<div style="text-align:center;padding:10px 4px"><div style="font-size:60px">${E.pass?'🎓':'📚'}</div><div class="h3" style="margin:6px 0">${E.pass?'Esame superato: '+(E.voto>30?'30 e lode! 🌟':E.voto+'/30'):'Esame non superato… riprova!'}</div><p class="note">Risposte giuste: <b>${E.ok} su ${E.qs.length}</b></p><div style="margin-top:12px"><button class="btn hot" data-uq9="close">${E.pass?'Evviva!':'Ok'}</button></div></div>`;
  const q=E.qs[E.i];return `<p class="note">${E.type==='verif'?'Esame scritto':'Il professore ti interroga'} · domanda ${E.i+1} di ${E.qs.length} · giuste: ${E.ok} ${'⭐'.repeat(E.ok)}</p><div class="h3" style="font-size:20px;margin:8px 0 14px">${esc(q.q)}</div>`+
    q.opts.map((op,k)=>{const st=E.ans==null?'':op.ok?'background:#2fb36b;color:#fff;border-color:#2fb36b':k===E.ans?'background:#e5484d;color:#fff;border-color:#e5484d':'opacity:.55';return `<button class="btn" style="display:block;width:100%;margin:8px 0;padding:14px;font-size:18px;text-align:left;${st}" data-uq9a="${k}" ${E.ans!=null?'disabled':''}>${esc(op.t)}</button>`}).join('')}};
SHEET_T.uniq9=['🏛️','Esame all\'università'];
document.addEventListener('click',e=>{const a=e.target.closest('[data-uq9a]');if(a){uniQAnswer(+a.dataset.uq9a);return}const b=e.target.closest('[data-uq9]');if(!b)return;const k=b.dataset.uq9;if(k==='close'){ui.uq9=null;closeSheet()}else uniQStart(k)});
// nel posto dell'università: anni che mancano, interrogazioni e verifiche
{const P=PLACES.uni,_b=P.body;P.body=(...a)=>{if(!S.uni)return _b(...a);const u=S.uni,f=FAC[u.fac],fin=u.anno>f.d,left=f.d-u.anno+1,vv=u.voti||[];
  let h=`<div class="row"><div class="t"><b>${f.n} · ${f.d} anni</b><span>${fin?'Hai finito tutti gli anni: adesso fai la laurea! 🎓':`Sei al ${u.anno}° anno · ti laurei a ${S.age+left} anni`}${vv.length?' · media esami '+(vv.reduce((a,b)=>a+b,0)/vv.length).toFixed(1)+'/30':''}</span></div></div>`;
  h+=`<div class="row"><div class="t"><b>🗣️ Interrogazione (esame orale)</b><span>Il professore ti fa 3 domande di ${f.n.toLowerCase()}</span></div><button class="btn hot" data-uq9="interr">Vai</button></div>`;
  h+=`<div class="row"><div class="t"><b>📝 Verifica (esame scritto)</b><span>5 domande: più ne indovini, più è alto il voto</span></div><button class="btn hot" data-uq9="verif">Vai</button></div>`;
  return h+_b(...a)}}
// la laurea si prende solo quando hai finito tutti gli anni (medicina: 6 anni, quindi a 24 anni se inizi a 18)
dipLvl=function(){if(!S)return null;if(S.uni&&FAC[S.uni.fac])return S.uni.anno>FAC[S.uni.fac].d?'uni':null;const sc=S.school;if(!sc||!SCUOLE[sc.tipo])return null;if(sc.anno<SCUOLE[sc.tipo].d)return null;
  return sc.tipo==='asilo'?'materna':sc.tipo==='elementari'?'elementari':sc.tipo==='medie'?'medie':'superiori'};
uniYear=function(){
  if(!S.uni)return;const u=S.uni,f=FAC[u.fac];
  if(u.anno>f.d){log(`🎓 Hai finito ${f.n}: vai all'università e prendi la laurea!`);return}
  let p=0.3+S.st.int/160+(S.studied?0.3:0)-(S.slacked?0.25:0)-(S.job?0.2:0)+((u.voti||[]).length?.15:0);
  if(chance(Math.min(0.97,p))){u.anno++;u.voti=[];if(u.anno>f.d)log(`Hai superato tutti gli esami di ${f.n}! 🎉 Ora vai all'università a prendere la laurea. 🎓`);else log(`Esami dell'anno superati! Sei al ${u.anno}° anno di ${f.n}.`)}
  else{u.fc++;add('fel',-4);log(`Quest'anno qualche esame è andato male: sei fuori corso. Vai all'università e fai interrogazioni e verifiche!`)}
};
