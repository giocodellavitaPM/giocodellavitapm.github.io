/* ================= v9: interrogazioni e verifiche con domande vere ================= */
const NUMW=['zero','uno','due','tre','quattro','cinque','sei','sette','otto','nove','dieci','undici','dodici','tredici','quattordici','quindici','sedici','diciassette','diciotto','diciannove'];
function numIt(n){if(n<20)return NUMW[n];if(n===100)return 'cento';const D=['','','venti','trenta','quaranta','cinquanta','sessanta','settanta','ottanta','novanta'],d=Math.floor(n/10),u=n%10;
  if(n>100)return String(n);let w=D[d];if(u===1||u===8)w=w.slice(0,-1);return w+(u?NUMW[u]:'')}
const numRe=n=>new RegExp('(^|[^0-9])'+n+'($|[^0-9])|\\b'+numIt(n)+'\\b');
function mathQ(){
  const a=S.age,ri=(x,y)=>x+Math.floor(Math.random()*(y-x+1));let q,n;
  if(a<=7){if(chance(.6)){const x=ri(2,10),y=ri(1,10);q=`quanto fa ${x} + ${y}?`;n=x+y}else{const x=ri(6,20),y=ri(1,x-1);q=`quanto fa ${x} - ${y}?`;n=x-y}}
  else if(a<=10){const k=ri(0,2);if(k===0){const x=ri(2,10),y=ri(2,10);q=`quanto fa ${x} × ${y}?`;n=x*y}else if(k===1){const x=ri(11,60),y=ri(5,39);q=`quanto fa ${x} + ${y}?`;n=x+y}else{const y=ri(2,9),n0=ri(2,9);q=`quanto fa ${y*n0} : ${y}?`;n=n0}}
  else{const k=ri(0,2);if(k===0){const x=ri(11,25),y=ri(3,9);q=`quanto fa ${x} × ${y}?`;n=x*y}else if(k===1){const p=[10,20,25,50][ri(0,3)],b=[100,200,40,80][ri(0,3)];q=`quanto è il ${p}% di ${b}?`;n=b*p/100}else{const y=ri(3,12),n0=ri(3,12);q=`quanto fa ${y*n0} : ${y}?`;n=n0}}
  return {m:'matematica',q:q[0].toUpperCase()+q.slice(1),re:numRe(n),a:String(n)};
}
// [età minima, materia, domanda, risposta giusta (regex), risposta da dire]
const QBANK=[
 [6,'scienze','Quante zampe ha un cane?',/\b(4|quattro)\b/,'4'],[6,'italiano','Qual è il contrario di grande?',/piccol/,'piccolo'],
 [6,'scienze','Quanti giorni ha una settimana?',/\b(7|sette)\b/,'7'],[6,'geografia','Di che colore è il cielo quando c\'è il sole?',/(azzurr|blu|celest)/,'azzurro'],
 [6,'scienze','Quale animale fa "miao"?',/gatt/,'il gatto'],[6,'scienze','Qual è la stagione più calda?',/estate/,'l\'estate'],
 [6,'italiano','Qual è il plurale di "gatto"?',/gatti/,'gatti'],[6,'scienze','Quanti mesi ha un anno?',/\b(12|dodici)\b/,'12'],
 [6,'italiano','Quante sono le vocali?',/\b(5|cinque)\b/,'5'],[6,'inglese','Come si dice "cane" in inglese?',/\bdog\b/,'dog'],
 [6,'inglese','Come si dice "gatto" in inglese?',/\bcat\b/,'cat'],[6,'inglese','Come si dice "rosso" in inglese?',/\bred\b/,'red'],
 [7,'italiano','Qual è il contrario di caldo?',/fredd/,'freddo'],[7,'scienze','Quante zampe ha un ragno?',/\b(8|otto)\b/,'8'],
 [7,'inglese','Come si dice "mela" in inglese?',/apple/,'apple'],[7,'inglese','Come si dice "grazie" in inglese?',/thank/,'thank you'],
 [7,'geografia','Qual è la capitale d\'Italia?',/roma/,'Roma'],[7,'scienze','Quante zampe ha un insetto?',/\b(6|sei)\b/,'6'],
 [8,'italiano','Qual è il plurale di "uovo"?',/\buova\b/,'uova'],[8,'italiano','"Cane" è un nome, un verbo o un aggettivo?',/\bnome\b/,'un nome'],
 [8,'geografia','Qual è il fiume più lungo d\'Italia?',/\bpo\b/,'il Po'],[8,'geografia','Come si chiama il vulcano della Sicilia?',/etna/,'l\'Etna'],
 [8,'scienze','La balena è un pesce o un mammifero?',/mammifer/,'un mammifero'],[8,'scienze','Qual è il pianeta rosso?',/marte/,'Marte'],
 [8,'storia','Chi ha scoperto l\'America?',/colomb/,'Cristoforo Colombo'],[8,'storia','Chi ha fondato Roma, secondo la leggenda?',/romolo/,'Romolo (e Remo)'],
 [8,'inglese','Come si dice "libro" in inglese?',/\bbook\b/,'book'],[8,'inglese','Come si dice "giallo" in inglese?',/yellow/,'yellow'],
 [9,'geografia','Qual è la montagna più alta d\'Italia?',/bianco/,'il Monte Bianco'],[9,'geografia','Quanti sono i continenti?',/\b(7|sette|6|sei)\b/,'7 (o 6, dipende da come si contano)'],
 [9,'geografia','Qual è la capitale della Francia?',/parigi/,'Parigi'],[9,'scienze','A quanti gradi bolle l\'acqua?',/\b(100|cento)\b/,'100 gradi'],
 [9,'scienze','Qual è il pianeta più grande del sistema solare?',/giove/,'Giove'],[9,'storia','Chi ha dipinto la Gioconda?',/leonardo/,'Leonardo da Vinci'],
 [9,'italiano','Qual è il femminile di "attore"?',/attrice/,'attrice'],[9,'italiano','Qual è il plurale di "uomo"?',/uomini/,'uomini'],
 [10,'storia','In che anno Colombo è arrivato in America?',/1492/,'1492'],[10,'geografia','Quante regioni ha l\'Italia?',/\b(20|venti)\b/,'20'],
 [10,'scienze','Qual è il pianeta più vicino al Sole?',/mercurio/,'Mercurio'],[10,'scienze','Quale gas respiriamo per vivere?',/ossigen/,'l\'ossigeno'],
 [11,'storia','Chi è stato il primo imperatore romano?',/augusto|ottaviano/,'Augusto'],[11,'storia','In che anno è nata l\'Italia unita?',/1861/,'1861'],
 [11,'geografia','Qual è la capitale della Germania?',/berlino/,'Berlino'],[11,'geografia','Qual è la capitale della Spagna?',/madrid/,'Madrid'],
 [12,'storia','In che anno è nata la Repubblica Italiana?',/1946/,'1946'],[12,'scienze','Qual è la formula dell\'acqua?',/h ?2 ?o/,'H₂O'],
 [12,'italiano','Chi ha scritto la Divina Commedia?',/dante/,'Dante Alighieri'],[13,'scienze','Qual è l\'organo che pompa il sangue?',/cuore/,'il cuore'],
];
function makeQs(nq){
  const pool=QBANK.filter(q=>S.age>=q[0]).map(([_,m,q,re,a])=>({m,q,re,a})),out=[];
  while(out.length<nq){if(chance(.4)||!pool.length)out.push(mathQ());else{const i=Math.floor(Math.random()*pool.length);out.push(pool.splice(i,1)[0])}}
  return out;
}
const VMAP={interr:[4,6,8,10],verif:[4,5,6,7,9,10]};
function quizEnd(n,qz,v,extra){
  ui.quiz=null;const verif=qz.type==='verif';S.voti=S.voti||[];S.voti.push(v);S.bestVoto=Math.max(S.bestVoto||0,v);
  count(verif?'verifica':'interroga');if(v>=8)count('belvoto');add('fel',v>=8?5:v>=6?1:-4);if(v>=7){add('int',2);S.studied=true}
  log(`${verif?'Verifica':'Interrogazione'} con ${n.name}: ${v}`);save();updateHud();
  const com=v>=10?'Perfetto! Bravissim'+o()+'! 🌟':v>=8?'Molto bene, complimenti! 👏':v>=6?'Sufficiente. Puoi fare ancora meglio! 👍':'Insufficiente… a casa ripassa e fai i compiti! 📚';
  if(extra&&/studiato/.test(extra))return {r:extra+' A casa ripassa bene! 📚',fx:`Voto: ${v}`};
  return {r:`${extra?extra+' ':''}${verif?'Ho corretto la tua verifica':'Bene, abbiamo finito'}: ti metto ${v}. ${com}`,fx:`Voto: ${v}`};
}
function quizReply(n,t){
  if(n.role!=='maestra'&&n.role!=='prof')return null;
  const qz=ui.quiz&&ui.quiz.n===n.id?ui.quiz:null,noStud=/(non ho studiato|non ho ripassato|non so niente|non ho fatto i compiti)/.test(t);
  if(qz){
    if(noStud)return quizEnd(n,qz,4,'Ah, non hai studiato… Mi dispiace, ma allora è 4. 😕');
    const cur=qz.qs[qz.i],ok=cur.re.test(t)&&!/^(non lo so|boh|non so)$/.test(t);if(ok)qz.ok++;
    const fb=ok?pick(['Giusto! 👍','Esatto! ✅','Brav'+o()+', giusto!','Perfetto! ✅']):`No, la risposta giusta era: ${cur.a}.`;
    qz.i++;
    if(qz.i>=qz.qs.length)return quizEnd(n,qz,VMAP[qz.type][qz.ok],fb);
    const nx=qz.qs[qz.i];return {r:`${fb} ${qz.type==='verif'?'Esercizio':'Domanda'} ${qz.i+1} di ${qz.qs.length} (${nx.m}): ${nx.q}`};
  }
  const wantI=/(interrog)/.test(t),wantV=/(verific|compito in classe)/.test(t);
  if(!wantI&&!wantV){if(noStud)return {r:'Male! Per oggi ti salvo, ma domani ti interrogo! Studia bene. 📚'};return null}
  if(S.age<6)return {r:'Le interrogazioni si fanno dalla prima elementare! Per ora giochiamo e disegniamo. 🎨'};
  if(!inSchool()&&S.scene!=='scuola')return {r:'Le interrogazioni si fanno a scuola, in classe! 🏫'};
  const type=wantV?'verif':'interr';
  if(noStud){ui.quiz={n:n.id,type,qs:[],i:0,ok:0};return quizEnd(n,ui.quiz,4,'Non hai studiato? Allora non posso che metterti 4. La prossima volta studia! 😕')}
  const qs=makeQs(type==='verif'?5:3);ui.quiz={n:n.id,type,qs,i:0,ok:0};
  return {r:`${type==='verif'?'Va bene! Prendi un foglio e una penna: ecco la verifica, 5 esercizi. Scrivi le risposte qui sotto.':'Va bene, vieni alla lavagna! Ti faccio 3 domande.'} ✏️ ${type==='verif'?'Esercizio':'Domanda'} 1 di ${qs.length} (${qs[0].m}): ${qs[0].q}`};
}
PA.interroga={n:'Fatti interrogare',d:'Il prof ti fa 3 domande alla lavagna',en:0,ok:()=>inSchool()&&!S.uni,run:()=>''};
// tocchi «Vai» su interrogazione o verifica: il prof ti fa subito le domande
function startQuiz(type){
  closeSheet();
  if(!inSchool()||S.uni)return toast('Le interrogazioni si fanno a scuola, quando sei iscritt'+o()+'! 🏫');
  if(S.scene!=='scuola'){ui.goQuiz=type;toast('📍 Ti porto a scuola dal prof!');goPlace('scuola');return}
  const n=NPCS.find(x=>x.scene==='scuola'&&(x.role==='prof'||x.role==='maestra')&&!x.hide)||NPCS.find(x=>x.role==='prof'||x.role==='maestra');
  if(!n)return toast('Il prof oggi non c\'è!');
  if(n.scene!=='scuola'){n.scene='scuola';n.x=S.pos.x+1;n.y=S.pos.y-1}
  openChat(n.id);say(type==='verif'?'Mi fa la verifica?':'Mi interroga?');
}
function quizTick(){const q=ui.goQuiz;if(q&&S.scene==='scuola'&&!ui.walk&&!isBusy()){ui.goQuiz=null;startQuiz(q)}}
PA.verifica.d='Il prof ti dà 5 esercizi e poi mette il voto';PA.verifica.ok=()=>inSchool()&&!S.uni;
