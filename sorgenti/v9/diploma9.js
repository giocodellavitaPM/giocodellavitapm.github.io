/* ===== v9: "Prendi il diploma": all'ultimo anno di ogni scuola fai un esame di 5 domande ===== */
// [domanda, risposta giusta, sbagliata, sbagliata]
const DIPQ={
 materna:[['Di che colore è il sole? ☀️','Giallo','Blu','Verde'],['Quante zampe ha un cane? 🐶','4','2','6'],['Quanto fa 1 + 1?','2','3','1'],['Che verso fa la mucca? 🐮','Muuu','Bau bau','Miao'],
  ['Quale animale vola?','🐦 Uccellino','🐟 Pesce','🐢 Tartaruga'],['Con cosa ti lavi i denti? 🦷','Spazzolino','Forchetta','Matita'],['Di che colore è l\'erba? 🌱','Verde','Rossa','Viola'],
  ['Quante dita hai in una mano? ✋','5','3','10'],['Qual è un frutto?','🍎 Mela','🚗 Macchina','🧦 Calzino'],['Dove vive il pesce? 🐠','Nell\'acqua','Sull\'albero','Nel cielo'],
  ['Cosa usi quando piove? 🌧️','☂️ Ombrello','🕶️ Occhiali da sole','🩱 Costume'],['Quale forma è rotonda?','⚪ Cerchio','⬛ Quadrato','🔺 Triangolo'],['Che verso fa il gatto? 🐱','Miao','Beee','Qua qua'],
  ['Quanto fa 2 + 1?','3','4','2'],['Di notte in cielo c\'è…','🌙 La luna','🌈 L\'arcobaleno','☀️ Il sole forte']],
 elementari:[['Quanto fa 5 × 3?','15','12','18'],['Qual è la capitale d\'Italia?','Roma','Milano','Napoli'],['Quanti giorni ha una settimana?','7','5','10'],['Il plurale di "cane" è…','cani','canes','cana'],
  ['Quanto fa 100 − 30?','70','60','80'],['Quale di questi è un mammifero?','🐋 Balena','🦈 Squalo','🐧 Pinguino'],['In quale stagione cadono le foglie? 🍂','Autunno','Estate','Primavera'],
  ['Quanti mesi ha un anno?','12','10','14'],['Quanto fa 8 × 7?','56','54','48'],['Il contrario di "alto" è…','basso','grande','lungo'],['Su quale pianeta viviamo? 🌍','Terra','Marte','Luna'],
  ['Quanto fa 9 + 8?','17','16','18'],['Quante ore ha un giorno?','24','12','60'],['Nella frase "Il gatto corre", "corre" è un…','verbo','nome','aggettivo'],['Quanti lati ha un triangolo?','3','4','5']],
 medie:[['Qual è il fiume più lungo d\'Italia?','Po','Tevere','Arno'],['Quanto fa 12 × 12?','144','124','142'],['Chi ha scritto la Divina Commedia?','Dante Alighieri','Alessandro Manzoni','Giacomo Leopardi'],
  ['Qual è la radice quadrata di 81?','9','8','7'],['Qual è la capitale della Francia?','Parigi','Londra','Berlino'],['In che anno Colombo arrivò in America?','1492','1592','1392'],
  ['Qual è la formula dell\'acqua?','H₂O','CO₂','O₂'],['Quanto è il 25% di 200?','50','25','75'],['In "Il gatto mangia il pesce", il soggetto è…','il gatto','mangia','il pesce'],
  ['Quanti lati ha un esagono?','6','5','8'],['Qual è il pianeta più grande del Sistema solare?','Giove','Saturno','Terra'],['Quanto è l\'area di un rettangolo 5 × 4?','20','9','18'],
  ['In quale continente si trova l\'Egitto?','Africa','Asia','Europa'],['Chi ha dipinto la Gioconda?','Leonardo da Vinci','Michelangelo','Raffaello'],['Qual è il monte più alto delle Alpi?','Monte Bianco','Etna','Vesuvio']],
 superiori:[['Chi ha formulato la teoria della relatività?','Albert Einstein','Isaac Newton','Galileo Galilei'],['In che anno iniziò la Prima guerra mondiale?','1914','1918','1939'],
  ['Qual è l\'unità di misura della forza?','Newton','Joule','Watt'],['Quanto fa 2 alla quinta?','32','25','64'],['Chi ha scritto "I promessi sposi"?','Alessandro Manzoni','Giovanni Verga','Giovanni Pascoli'],
  ['Qual è la capitale del Giappone?','Tokyo','Pechino','Seul'],['In che anno è nata la Repubblica Italiana?','1946','1861','1918'],['Qual è il simbolo chimico dell\'oro?','Au','Ag','Fe'],
  ['Quanto va veloce la luce, più o meno?','300.000 km al secondo','300 km al secondo','3.000 km al secondo'],['Se 2x + 4 = 10, quanto vale x?','3','2','7'],
  ['Dove si trova il DNA nelle cellule?','Nel nucleo','Nella pelle','Nelle unghie'],['Chi ha scoperto la penicillina?','Alexander Fleming','Louis Pasteur','Alessandro Volta'],
  ['Che lingua si parla in Brasile?','Portoghese','Spagnolo','Inglese'],['In che anno è nato il Regno d\'Italia?','1861','1946','1815'],['Quanto vale il seno di 90°?','1','0','0,5']],
 uni:[['Che cosa studia la macroeconomia?','L\'economia di un intero paese','Una sola azienda','Le monete antiche'],['Quale organo pompa il sangue?','Il cuore','Il fegato','I polmoni'],
  ['Con quale linguaggio si fanno le pagine web?','HTML','Excel','PDF'],['Da quale anno è in vigore la Costituzione italiana?','1948','1946','1960'],['Qual è la derivata di x²?','2x','x','x³'],
  ['Quante ossa ha un adulto?','206','106','306'],['Chi ha scritto "Il Principe"?','Niccolò Machiavelli','Dante Alighieri','Francesco Petrarca'],
  ['Che cos\'è il PIL?','Il valore di ciò che un paese produce','Una tassa','Un tipo di moneta'],['Il codice binario usa le cifre…','0 e 1','1 e 2','da 0 a 9'],
  ['Il teorema di Pitagora vale per i triangoli…','rettangoli','equilateri','di ogni tipo'],['Quale formula è la legge di Ohm?','V = R × I','E = mc²','F = m × a'],
  ['Quante camere ha il Parlamento italiano?','Due','Una','Tre'],['Quanto fa il logaritmo in base 10 di 1000?','3','10','100'],['Un "equino" è un…','Cavallo','Bue','Gatto'],['Che cos\'è un neurone?','Una cellula del cervello','Un osso','Un muscolo']]};
const DIPN={materna:'Diploma della scuola materna',elementari:'Diploma delle elementari',medie:'Licenza media',superiori:'Diploma di maturità',uni:'Laurea'};
function dipLvl(){if(!S)return null;if(S.uni&&FAC[S.uni.fac]&&S.uni.anno>=FAC[S.uni.fac].d)return 'uni';const sc=S.school;if(!sc||!SCUOLE[sc.tipo])return null;if(sc.anno<SCUOLE[sc.tipo].d)return null;
  return sc.tipo==='asilo'?'materna':sc.tipo==='elementari'?'elementari':sc.tipo==='medie'?'medie':'superiori'}
function dipBox(levels){const l=dipLvl();if(!l||!levels.includes(l))return '';
  return `<div class="row" style="border:3px solid #f5a700;background:#fff6dd"><div class="t"><b>🎓 Prendi il diploma!</b><span>Sei all'ultimo anno: rispondi a 5 domande per prendere ${DIPN[l].toLowerCase().replace(/^l/,'la l').replace(/^d/,'il d')}. Ne bastano 3 giuste!</span></div><button class="btn hot" data-dip9="go">Prendi il diploma</button></div>`}
function dipStart(){const l=dipLvl();if(!l)return toast('Il diploma si prende all\'ultimo anno di scuola! 🎓');
  const pool=[...DIPQ[l]],qs=[];while(qs.length<5&&pool.length){const q=pool.splice(Math.floor(Math.random()*pool.length),1)[0],opts=q.slice(1).map((t,i)=>({t,ok:i===0}));for(let i=opts.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[opts[i],opts[j]]=[opts[j],opts[i]]}qs.push({q:q[0],opts})}
  ui.dip9={l,qs,i:0,ok:0,ans:null};openPlace('esame9')}
function dipAnswer(k){const E=ui.dip9;if(!E||E.ans!=null||E.done)return;const q=E.qs[E.i];E.ans=k;if(q.opts[k].ok){E.ok++;toast('✅ Giusto!')}else toast('❌ Era: '+q.opts.find(o=>o.ok).t);refreshSheet();
  setTimeout(()=>{if(ui.dip9!==E)return;E.ans=null;E.i++;if(E.i>=E.qs.length)dipEnd(E);refreshSheet()},1300)}
function dipEnd(E){E.done=true;E.pass=E.ok>=3;if(!E.pass){add('fel',-3);log(`Esame per ${DIPN[E.l].toLowerCase()}: ${E.ok} risposte giuste su 5. Ripassa e riprova! 📚`);save();return}
  const l=E.l,voto=E.ok===5?10:E.ok===4?8:6;add('fel',8);
  if(l==='materna'){S.school={tipo:'elementari',anno:1};log('🎓 Hai preso il diploma della scuola materna! Adesso vai alle elementari. ✏️')}
  else if(l==='elementari'){S.school={tipo:'medie',anno:1};log(`🎓 Diploma delle elementari con ${voto}! Si passa alle medie. 🏫`)}
  else if(l==='medie'){S.edu=Math.max(S.edu||0,1);S.school=null;log(`🎓 Licenza media presa con ${voto===10?'10 e lode':voto}!`);E.pend='scelta_superiori'}
  else if(l==='superiori'){const mat=E.ok===5?100:E.ok===4?85:70;S.edu=Math.max(S.edu||0,2);S.diploma=S.school.tipo;S.school=null;log(`🎓 Maturità superata con ${mat}/100${mat===100?' e lode':''}! Ora hai il diploma.`);E.pend='dopo_diploma'}
  else{const u=S.uni,v=E.ok===5?110:E.ok===4?100:90;S.lauree=lauList();if(!S.lauree.includes(u.fac))S.lauree.push(u.fac);S.edu=3;S.laurea=u.fac;S.uni=null;add('fel',4);log(`🎓🌿 Laurea in ${FAC[u.fac].n} con ${v}/110${v===110?' e lode':''}! Ora cerca lavoro negli uffici.`)}
  count('diploma9');save();updateHud()}
PLACES.esame9={sub:()=>ui.dip9?DIPN[ui.dip9.l]:'',body:()=>{const E=ui.dip9;if(!E)return '<p class="note">Nessun esame in corso.</p>';
  if(E.done){const btn=E.pass?(E.pend?`<button class="btn hot" data-dip9="next">Avanti</button>`:`<button class="btn hot" data-dip9="close">Evviva!</button>`):`<button class="btn hot" data-dip9="go">Riprova</button>`;
    return `<div style="text-align:center;padding:10px 4px"><div style="font-size:64px">${E.pass?'🎓':'📚'}</div><div class="h3" style="margin:6px 0">${E.pass?'Promoss'+o()+'! Hai preso '+DIPN[E.l].toLowerCase().replace(/^l/,'la l').replace(/^d/,'il d')+'!':'Non ancora… riprova!'}</div>
      <p class="note">Risposte giuste: <b>${E.ok} su 5</b>${E.pass?'':' (ne servono 3)'}</p>${E.pass?'<div style="font-size:30px">🎉🎉🎉</div>':''}<div style="margin-top:12px">${btn}</div></div>`}
  const q=E.qs[E.i];return `<p class="note">Domanda ${E.i+1} di 5 · giuste finora: ${E.ok} ${'⭐'.repeat(E.ok)}</p><div class="h3" style="font-size:20px;margin:8px 0 14px">${esc(q.q)}</div>`+
    q.opts.map((op,k)=>{const st=E.ans==null?'':op.ok?'background:#2fb36b;color:#fff;border-color:#2fb36b':k===E.ans?'background:#e5484d;color:#fff;border-color:#e5484d':'opacity:.55';
      return `<button class="btn" style="display:block;width:100%;margin:8px 0;padding:14px;font-size:18px;text-align:left;${st}" data-dip9a="${k}" ${E.ans!=null?'disabled':''}>${esc(op.t)}</button>`}).join('')}};
SHEET_T.esame9=['🎓','Esame: prendi il diploma'];
document.addEventListener('click',e=>{const a=e.target.closest('[data-dip9a]');if(a){dipAnswer(+a.dataset.dip9a);return}const b=e.target.closest('[data-dip9]');if(!b)return;const k=b.dataset.dip9;
  if(k==='go')dipStart();else if(k==='close'){ui.dip9=null;closeSheet()}else if(k==='next'){const p=ui.dip9&&ui.dip9.pend;ui.dip9=null;closeSheet();if(p){S.pending=p;renderModal()}}});
[['asilo',['materna']],['scuola',['elementari','medie','superiori']],['uni',['uni']]].forEach(([id,L])=>{const P=PLACES[id];if(!P)return;const _b=P.body;P.body=(...a)=>dipBox(L)+_b(...a)});
// all'asilo: la maestra con il diploma
{const sc=SC.asilo;if(sc&&!sc.furn.some(f=>f.act==='sheet:asilo')){const ok=(x,y)=>x>0&&y>2&&x<sc.w-1&&y<sc.h-2&&sc.t[y*sc.w+x]===10&&!sc.sol[y*sc.w+x]&&Math.abs(x-sc.door.x)>2;
  let p=null;for(let y=sc.h-3;y>2&&!p;y--)for(let x=sc.w-2;x>sc.w/2&&!p;x--)if(ok(x,y)&&ok(x-1,y)&&ok(x,y-1)&&ok(x,y+1))p=[x,y];
  if(p){const f=fu('lectern',p[0],p[1],1,1,'sheet:asilo','Maestra: il diploma della materna');sc.furn.push(f);sc.sol[p[1]*sc.w+p[0]]=1}}}
