/* ================= v9: dialoghi migliori + le persone vengono a parlarti (domande, indovinelli, barzellette) ================= */
const DLG={t:40+Math.random()*30,el:null,cand:null,hide:0};
const DLG_NOTALK=['cane','pet','bebe','figlio'];
const RIDDLES9=[['Ha i denti ma non morde. Cos\'è?',/pettin/,'il pettine'],['Più è grande, meno si vede. Cos\'è?',/buio/,'il buio'],['Ha le lancette ma non ha le mani. Cos\'è?',/orolog/,'l\'orologio'],
 ['Cade sempre ma non si fa mai male. Cos\'è?',/pioggia|acqua/,'la pioggia'],['Ha un occhio solo ma non vede. Cos\'è?',/ago/,'l\'ago'],['Ha le foglie ma non è un albero. Cos\'è?',/libro|quadern/,'il libro'],
 ['Più ne togli e più diventa grande. Cos\'è?',/buca/,'la buca'],['Ha la testa e la coda ma non ha il corpo. Cos\'è?',/moneta/,'la moneta'],['Corre sempre ma non ha le gambe. Cos\'è?',/fium|acqua|tempo/,'il fiume'],
 ['Si rompe se lo nomini. Cos\'è?',/silenzio/,'il silenzio']];
const GKQ9=[['Qual è la capitale d\'Italia?',/roma/,'Roma'],['Quante zampe ha un ragno?',/\b8\b|otto/,'8'],['Di che colore sono le foglie in estate?',/verd/,'verdi'],['Qual è il pianeta dove viviamo?',/terra/,'la Terra'],
 ['Quanti giorni ha una settimana?',/\b7\b|sette/,'7'],['Che animale fa le uova e dice coccodè?',/gallin/,'la gallina'],['Qual è il mare più grande del mondo?',/pacific/,'l\'oceano Pacifico'],['Quante stagioni ci sono in un anno?',/\b4\b|quattro/,'4'],
 ['Qual è il fiume più lungo d\'Italia?',/\bpo\b/,'il Po'],['Chi ha dipinto la Gioconda?',/leonardo|da vinci/,'Leonardo da Vinci'],['Quanti mesi ci sono in un anno?',/\b12\b|dodici/,'12'],['Che cosa bevono le piante?',/acqua/,'l\'acqua']];
const FAVOLE9=['C\'era una volta una tartaruga che sfidò una lepre a una gara. La lepre corse velocissima… e poi si addormentò! La tartaruga, piano piano, arrivò prima. Morale: chi va piano va sano e va lontano! 🐢',
 'C\'era una volta un piccolo drago che non sapeva sputare il fuoco, solo bolle di sapone. Gli altri draghi ridevano… ma quando il villaggio prese fuoco, le sue bolle d\'acqua lo spensero tutto! Da quel giorno fu il drago più famoso. 🐉🫧',
 'C\'era una volta una formica che lavorava tutta l\'estate e una cicala che cantava. In inverno la cicala aveva freddo e fame, e la formica la fece entrare: insieme passarono un inverno bellissimo, tra canzoni e briciole! 🐜🎶',
 'C\'era una volta un bambino che trovò una chiave d\'oro nel parco. Provò tutte le porte della città… e alla fine aprì la porta della biblioteca: dentro c\'erano mille storie da leggere! 🔑📚'];
const CURIO9=['Lo sapevi che i polpi hanno tre cuori? 🐙','Lo sapevi che una giraffa dorme solo un paio d\'ore al giorno? 🦒','Lo sapevi che il miele non scade mai? Ne hanno trovato di buono nelle piramidi! 🍯','Lo sapevi che le stelle marine non hanno il cervello? ⭐',
 'Lo sapevi che il cuore batte circa 100.000 volte al giorno? ❤️','Lo sapevi che sulla Luna non c\'è vento, e le impronte degli astronauti sono ancora lì? 🌙','Lo sapevi che i delfini si chiamano per nome con dei fischi? 🐬','Lo sapevi che le formiche non dormono mai come noi? 🐜'];
const ASKME9=[['Che lavoro vuoi fare da grande?',(t,raw)=>{const j=JOBS.find(j=>t.includes(norm(j.m).split(' ')[0])||t.includes(norm(j.f).split(' ')[0]));return j?`${raw.trim().replace(/[.!]+$/,'')}? Bellissimo! Per fare ${j.m.toLowerCase()} serve: ${j.rt.toLowerCase()}. Ce la farai! 💪`:`Che bel sogno! Studia tanto e ce la farai! 💪`}],
 ['Qual è il tuo cibo preferito?',(t,raw)=>`Mmm, ${raw.trim().replace(/[.!]+$/,'').toLowerCase()}! Mi è venuta fame! 😋`],['Qual è il tuo colore preferito?',(t,raw)=>{const c=raw.trim().replace(/[.!]+$/,'').toLowerCase().replace(/^(il|lo|la|l'|i|gli|le)\s*/,'');if(!/(ross|blu|azzurr|verd|giall|aranc|viol|lilla|rosa|nero|nera|bianc|grig|marron|oro|argent|celest|fucsia|turchese|beige|arcobalen)/.test(t))return /^(non lo so|boh|nessuno|tutti)/.test(t)?'Va bene, sono belli tutti! Il mio è il verde, come i prati. 🌿':`${c.charAt(0).toUpperCase()+c.slice(1)}? Ma non è un colore! 😄 Dai, dimmi un colore: rosso, blu, verde…`;
   return `${c.charAt(0).toUpperCase()+c.slice(1)}? Bella scelta! Anche a me piace tanto! 🎨`}],
 ['Hai un animale a casa?',(t)=>/^(si|sisi|certo|ho)/.test(t)?'Che bello! Gli animali sono amici speciali. 🐾':'Magari un giorno ne avrai uno! Al parco a volte c\'è un cagnolino… 🐶'],
 ['Ti piace la scuola?',(t)=>/^(si|sisi|tanto|molto|certo|abbastanza)/.test(t)?'Bravo! A scuola si impara un sacco! 📚'.replace('Bravo','Bravissim'+o()):/^(no|non|poco|per niente|insomma|cosi)/.test(t)?'Un po\' di fatica, ma poi ti serve per fare il lavoro dei tuoi sogni! 💪':'Ah ah, simpatic'+o()+'! 😄 La scuola a volte è faticosa, ma si impara tanto!'],
 ['Qual è il tuo sport preferito?',(t,raw)=>`${raw.trim().replace(/[.!]+$/,'')}! Allenati e diventerai un campione! 🏆`],['Come ti trovi in questa città?',(t)=>/(bene|bell|mi piace|benissimo)/.test(t)?'Anche a me piace tanto! 😊':'Vedrai che ti piacerà sempre di più! 😊']];
function dlgMath(){const a=S.age;let x,y,op;if(a<7){x=R(1,5);y=R(1,4);op='+'}else if(a<11){if(chance(.5)){x=R(2,10);y=R(2,10);op='per'}else{x=R(10,50);y=R(5,40);op='+'}}else{if(chance(.5)){x=R(6,15);y=R(3,12);op='per'}else{x=R(50,200);y=R(10,49);op='-'}}
  const v=op==='+'?x+y:op==='-'?x-y:x*y;return [`Quanto fa ${x} ${op==='per'?'per':op==='+'?'più':'meno'} ${y}?`,new RegExp('\\b'+v+'\\b'),String(v)]}
// la persona ti fa una domanda e aspetta la risposta
function npcAsk(n,kind){const pk=a=>a[Math.floor(Math.random()*a.length)];
  if(kind==='barz'){ui.ask={yes:()=>({r:pk(BARZ)+' 😂'}),no:{r:'Va bene, te la racconto un\'altra volta! 😄'},any:t0=>/(dai|si|ok|vai|racconta)/.test(t0)?{r:pk(BARZ)+' 😂'}:null};ui.ask.yes={r:pk(BARZ)+' 😂'};return 'Ehi! Vuoi sentire una barzelletta? 😄'}
  if(kind==='me'){const [q,f]=pk(ASKME9);ui.ask={any:(t0,raw)=>{relGain(n,3);add('sim',1);return {r:f(t0,raw)}}};return q}
  const [q,re,ans]=kind==='riddle'?pk(RIDDLES9):kind==='gk'?pk(GKQ9):dlgMath();
  ui.ask={any:(t0)=>{if(/^(non lo so|boh|non so|dimmelo|mi arrendo|aiuto)/.test(t0))return {r:`Era: ${ans}! La prossima volta la indovini. 😉`};
    if(re.test(t0)){add('fel',2);add('int',1);relGain(n,4);count('quiz9');return {r:pick(['Esatto! Bravissim'+o()+'! 🌟','Giusto! Sei un genio! 🤩','Perfetto! Hai indovinato! 🎉']),fx:'Felicità +2 · Intelligenza +1'}}
    return {r:`Mmm, no! Era: ${ans}. Però ci hai provato! 😊`}}};
  return (kind==='riddle'?'Ti faccio un indovinello: ':kind==='gk'?'Una domanda per te: ':'Facciamo un gioco! ')+q}
// risposte migliori prima delle regole vecchie
function dlgPre(n,raw,t){const role=n.role,par=role==='mamma'||role==='papa',kid=n.look&&(n.look.age==='kid'||n.look.age==='baby'),fem=n.look&&n.look.f,oa=fem?'a':'o',has=re=>re.test(t),pk=a=>a[Math.floor(Math.random()*a.length)],pe=persona(n);
  if(/^[^aeiou ]{4,}$/.test(t)||/(asd|qwe|sdf|zxc|jkl|hjk|xyz)/.test(t)&&t.split(' ').length<=2)return {r:pk(['Non ho capito… puoi scriverlo in un altro modo? 😊','Eh? Mi sa che hai premuto tasti a caso! 😄 Dimmi pure.','Scusa, non ho capito bene. Ripeti?'])};
  if(/^(ma )?perche\??$/.test(t))return {r:pk(['Perché cosa? Spiegami meglio e ti rispondo! 🤔','Perché… bella domanda! Di cosa parli? 😊','Eh, perché sì! 😄 Scherzo: dimmi meglio cosa vuoi sapere.'])};
  {const m=t.match(/(?:sei|tu sei) (?:brav[oa]|forte|un campione|una campionessa) (?:a|ad|in|nel|nella|con il|col) (?:giocare a |fare )?(\w+)/)||t.match(/(?:sai|tu sai) (?:giocare|fare) (?:a |ad |il |la )?(\w+)/);
    if(m&&!/^(fare|giocare)$/.test(m[1])){const w=m[1],sport=/(calcio|pallone|basket|tennis|pallavolo|nuoto|nuotare|corsa|correre|bici|skate|pattin|sci)/.test(w);
      if(role==='coach'&&sport)return {r:`Brav${oa}? Sono l'allenatore! ⚽ Vieni al campo e ti insegno qualche trucco.`};
      ui.ask={yes:{r:'Allora un giorno facciamo una sfida! 😄🏆'},no:{r:'Ti insegno io! Basta allenarsi un po\' ogni giorno. 💪'}};
      return {r:(kid?pk([`A ${w}? Sì, me la cavo bene! 😎`,`A ${w}? Abbastanza! Mi alleno sempre.`]):pk([`A ${w}? Me la cavo! Da giovane ero fortissim${oa}. 😄`,`Un pochino! Mi piace tanto.`]))+' E tu sei brav'+o()+'?'}}}
  {const m=t.match(/(?:mi )?(?:presti|prestami|puoi prestarmi|mi dai|dammi) (?:il |lo |la |i |gli |le |un |uno |una |un po di |qualcosa)?\s*(\w*)/);
    if(m&&/(presti|prestami|prestarmi)/.test(t)){const w=m[1]&&!/^(qualcosa|niente)$/.test(m[1])?m[1]:'';relGain(n,1);
      return {r:w?(kid?(f=>`Certo, ti presto ${f?'la':'il'} ${w}! Ma poi me ${f?'la':'lo'} ridai, eh! 😄`)(/a$/.test(w)||/(gomma|penna|matita|palla|bici)/.test(w)):`Ecco qua! Trattal${/a$/.test(w)?'a':'o'} bene. 😉`):(kid?'Cosa ti serve? Una matita, una gomma, la palla…? 😊':'Cosa ti serve? Se posso, volentieri!')}}}
  if(has(/(ho paura|mi spavent|ho un po di paura|sono spaventat)/)){const cop=role==='vigile'||role==='agente'||role==='agente2';
    ui.ask={any:t0=>{relGain(n,3);add('fel',1);const k=t0.match(/(buio|mostr|fantasm|ladr|can|ragn|tuon|temporal|verific|interrogaz|compit|dottor|punture|acqua|mare|altezz|solo|sola|incub|lupo|strega)/);const w=k?k[1]:'';
      const R={buio:'Il buio è solo la notte che dorme! Una lucina accesa e passa tutto. 🌙',mostr:'I mostri non esistono: sono solo nelle storie! 😊',fantasm:'I fantasmi non esistono, promesso! 👻❌',ladr:'Ci pensa la polizia a fermare i ladri. Tu sei al sicuro! 👮',can:'I cani sono quasi sempre buoni: chiedi al padrone prima di accarezzarli. 🐶',ragn:'I ragnetti hanno più paura di te! 🕷️',tuon:'Il tuono è solo un gran rumore: dentro casa sei al sicuro. ⛈️',temporal:'Il temporale passa presto, e poi spunta l\'arcobaleno! 🌈',verific:'Se studi un pochino, la verifica va benissimo! 💪',interrogaz:'Respira, ripassa e vedrai che vai alla grande! 📚',compit:'Facciamoli un pezzetto alla volta: è più facile! ✏️',dottor:'Il dottore ti aiuta a stare bene! 🩺',punture:'La puntura fa solo un pizzichino e poi è finita! 💉',acqua:'Con i braccioli e un grande vicino, l\'acqua è divertente! 🏊',mare:'Al mare c\'è il bagnino che controlla tutti! 🏖️',altezz:'Non guardare giù e tieniti forte: ce la fai! 🧗',solo:'Non sei solo: ci sono tante persone che ti vogliono bene! 💛',sola:'Non sei sola: ci sono tante persone che ti vogliono bene! 💛',incub:'Gli incubi sono solo sogni brutti: quando ti svegli sono già finiti! 🌙',lupo:'Il lupo cattivo vive solo nelle favole! 🐺📖',strega:'Le streghe sono solo nelle favole! 🧙'};
      return {r:(R[w]||'Capisco… è normale avere un po\' di paura. Parlane con la mamma o il papà, ti aiuteranno! 💛')+(par?' E noi siamo sempre qui con te. ❤️':'')}}};
    return {r:par?'Vieni qui, ti abbraccio forte. 🤗 Di cosa hai paura?':cop?'Non avere paura, ci sono io! 👮‍♀️ Cosa ti spaventa?':'Non avere paura, va tutto bene! 💛 Di cosa hai paura?'}}
  if(/^(mi )?(puoi )?(aiuti|aiutami|aiutarmi|mi aiuti)( per favore| per piacere)?\??$/.test(t)||t==='aiuto'){
    const H={commessa:'Certo! Cosa ti serve? Per comprare qualcosa tocca il bancone. 🛒',cassiera:'Certo! Se vuoi pagare, vieni alla cassa. 🧾',cassiere:'Certo! Se vuoi pagare, vieni alla cassa. 🧾',gelataio:'Certo! Ti consiglio il pistacchio, è il più buono! 🍦 Costa solo 3 €.',pizzaiolo:'Certo! Per la pizza: pasta, pomodoro, mozzarella e forno caldissimo! 🍕',dottoressa:'Certo! Ti fa male qualcosa? Dimmi pure. 🩺',bibliotecaria:'Certo! Cerchi un libro? Le favole sono nello scaffale in basso. 📚',bagnino:'Certo! Ricorda: si nuota solo dove c\'è la bandiera verde. 🏊',edicolante:'Certo! Cerchi un giornalino o le figurine? 📰',nonna:'Ma certo, tesoro! Dimmi tutto. 💛',nonno:'Ma certo! Il nonno ti aiuta sempre. Dimmi! 👴'};
    if(role==='dottoressa'){const docAsk=()=>({no:{r:'Benissimo, allora sei san'+oa+' come un pesce! 🐟'},any:t0=>{const b=t0.match(/(pancia|testa|gola|dente|denti|ginocchio|gamba|braccio|piede|orecchio|occhio|schiena|mano|naso|dito)/);
        if(b){relGain(n,2);return {r:`Fammi vedere… ${b[1]}: niente di grave! Un po' di riposo, acqua e un bel sorriso. 🩺💛`}}if(/^si\b/.test(t0)){ui.ask=docAsk();return {r:'Dimmi dove ti fa male: pancia, testa, gola…? 🩺'}}return null}});ui.ask=docAsk()}
    if(role==='commessa'||role==='cassiera'||role==='cassiere')ui.ask={any:(t0,raw)=>{const w=raw.trim().replace(/[.!?]+$/,'');return w.length>1&&!/^(niente|nulla|no|si|ok|grazie|certo)\b/.test(t0)?{r:`${w.charAt(0).toUpperCase()+w.slice(1)}? Guarda sugli scaffali! Per comprare tocca il bancone. 🛒`}:null}};
    if(H[role])return {r:H[role]}}
  if(has(/(vuoi (essere|diventare) (il )?(mio|mia) (migliore )?amic|diventiamo amici|sei (il )?mio amico|sei (la )?mia amica|vuoi essere amic)/)){relGain(n,6);add('sim',1);return {r:role==='amico'?'Ma noi siamo già migliori amici! 💛':par?'Io sono di più: sono '+(role==='mamma'?'la tua mamma':'il tuo papà')+'! 💕':pk(['Certo! Da oggi siamo amici! 🤝','Sì, mi farebbe tanto piacere! 😊','Volentieri! Amici per sempre! 🤝'])}}
  {const m=t.match(/(?:giochiamo|giocare|gioca|facciamo) (?:a |ad )?(nascondino|acchiapparella|ce l hai|un due tre stella|campana|carte|scacchi|dama|palla|pallone|calcio|basket|tennis|uno|memory|mosca cieca)/);
    if(m){const g9=m[1];if(!kid&&!par&&!['amico','compagno','coach','amore'].includes(role))return {r:`A ${g9}? Mi piacerebbe, ma adesso devo andare! Al parco trovi tanti bambini con cui giocare. 😊`};
      add('fel',3);relGain(n,3);count('giocaamico');
      const R9={nascondino:'Sì! Conto io: 1, 2, 3… 10! Pronti o no, arrivo! 🙈 … Ti ho trovat'+o()+' dietro la panchina! Ora tocca a te contare! 😄',acchiapparella:'Ce l\'hai tu! 🏃 … Uff, sei velocissim'+o()+', non ti prendo mai! 😂','un due tre stella':'Un, due, tre… STELLA! ⭐ Ti ho visto muovere! Ah ah, torna indietro! 😄',scacchi:'Muovo il cavallo… e tu? ♞ Mmm, sei bravissim'+o()+', mi hai fatto scacco matto! 😮',carte:'Mescolo le carte… 🃏 Hai vinto tu! Facciamo la rivincita?',uno:'UNO! 🃏 Ah no, mi hai bloccato con il +4! 😂'};
      return {r:R9[g9]||`Evviva, giochiamo a ${g9}! ⚽ … Che partita! Hai vinto tu! 🏆`,fx:'Felicità +3'}}}
  if(has(/\bhai (un |una |dei |degli |delle )?(cane|gatto|animal|pesc|criceto|coniglio|cagnolin|gattin|tartarug)/)){if(par)return {r:S.pets.length?`Abbiamo ${S.pets.map(p=>p.nome).join(' e ')}, no? 🐾`:'No, ma magari un giorno ne prendiamo uno! 🐶'};
    const k=hsh(n.id)%3;return {r:[`Sì! Ho un cane che si chiama ${pk(['Rex','Fido','Pallino','Luna'])}. 🐶`,`Sì, ho un gatto dormiglione! 🐱`,`No, però mi piacciono tantissimo ${pe.anim}!`][k]}}
  if(has(/(hai fame|hai sete|cosa mangi stasera)/))return {r:has(/sete/)?'Un pochino! Adesso bevo un bel bicchiere d\'acqua. 💧':`Un po\' sì! Stasera mangio ${pe.cibo}. 😋`};
  if(has(/(oggi (e|compio) (il )?(mio )?compleanno|e il mio compleanno|compio (gli )?anni)/)){add('fel',2);relGain(n,4);ui.ask={any:t0=>{const m=t0.match(/\d+/);return m?{r:`${m[0]} anni! Che grande! Tanti auguri ancora! 🎉`}:null}};return {r:`Tanti auguri, ${S.name}! 🎂🎉 Quanti anni compi?`}}
  if(has(/(chi e (il|la) piu (fort|brav|bell|simpatic|intelligent)|chi e (il|la) migliore)/))return {r:pk(['Secondo me sei tu! 💪😄','Tu, ovviamente! 😎','Mmm… tu e io a pari merito! 😄'])};
  if(has(/(sei sposat|hai (la )?moglie|hai (il )?marito|sei fidanzat|hai (il )?fidanzat|hai (la )?fidanzat)/))return {r:par?(role==='mamma'?'Sì, con il papà! 💑':'Sì, con la mamma! 💑'):kid?'Ma no, sono piccol'+oa+'! 😂':[`Sì, da ${R(3,20)} anni! 💍`,'No, non ancora! 😊','Sì, e abbiamo anche un bambino! 👶'][hsh(n.id)%3]};
  {const m=t.match(/\bsai (nuotare|cantare|ballare|cucinare|guidare|disegnare|suonare|sciare|andare in bici|leggere|scrivere|contare|pattinare|fare la ruota)/);
    if(m){const v=m[1];ui.ask={yes:{r:'Bravissim'+o()+'! 👏'},no:{r:'Puoi imparare! Basta provare un po\' ogni giorno. 💪'}};return {r:(kid&&/guidare/.test(v)?'Ma no, sono troppo piccol'+oa+' per guidare! 😂':`Sì, so ${v} un pochino!`)+` E tu sai ${v}?`}}}
  if(has(/(mi sono fatt\w* male|mi fa male|ho la febbre|sto male|mi sono ferit|ho mal di)/)){if(par){add('sal',1);add('fel',2);return {r:'Oh no, fammi vedere! 🩹 Ecco un cerotto e un bacino: passa tutto! Se fa ancora male andiamo dalla dottoressa.',fx:'Salute +1'}}add('sim',1);return {r:'Oh no! 🩹 Vai all\'ospedale: la dottoressa ti cura subito. Se vuoi, apri la mappa 🗺️ e tocca l\'ospedale.'}}
  {const m=t.match(/ti piace (?:il |la |lo |l |giocare a |fare )?(calcio|basket|tennis|nuoto|pallavolo|danza|ciclismo|sci|rugby|pallone|nuotare|ballare)/);if(m){ui.ask={yes:{r:'Allora siamo in due! 😄'},no:{r:'Va bene, ognuno ha i suoi gusti! 😊'}};const ART9={calcio:'il calcio',basket:'il basket',tennis:'il tennis',nuoto:'il nuoto',pallavolo:'la pallavolo',danza:'la danza',ciclismo:'il ciclismo',sci:'lo sci',rugby:'il rugby',pallone:'giocare a pallone',nuotare:'nuotare',ballare:'ballare'};return {r:`Sì, ${ART9[m[1]]||m[1]} mi piace tantissimo! Io faccio ${pe.sport}. E a te piace?`}}}
  if(has(/(dove (posso )?trovar\w* (degli |nuovi )?amic|non ho amici|voglio (degli |nuovi )?amici|come (si )?trova\w* (gli )?amici)/)){relGain(n,4);return {r:'Al parco, a scuola e allo stadio trovi tanti amici! E poi… ci sono anch\'io! 😊'}}
  {const m=t.match(/(?:come (?:si )?divent\w*|come (?:si )?fa a (?:fare|diventare)|come faccio a (?:fare|diventare)|da grande (?:voglio|faro|vorrei) (?:fare )?|voglio fare|vorrei fare|voglio diventare|vorrei diventare)\s+(?:il |la |l |un |una |lo )?([a-z]+)/);
    if(m){const w=m[1].slice(0,5),j=JOBS.find(j=>norm(j.m).startsWith(w)||norm(j.f).startsWith(w)||norm(j.m).split(' ').some(x=>x.startsWith(w)));
      if(j){const lm=j.rt.match(/laurea in ([A-Za-zàè ]+)/i),fk=lm&&Object.keys(FAC).find(k=>norm(FAC[k].n)===norm(lm[1].split(/ o |,/)[0]));return {r:`Per fare ${(S.sex==='f'?j.f:j.m).toLowerCase()} serve: ${j.rt.toLowerCase()}${fk?` (l'università di ${FAC[fk].n} dura ${FAC[fk].d} anni)`:''}. Si comincia da ${j.min} anni. Ce la puoi fare! 💪`}}}}
  if(has(/(fammi|mi fai|chiedimi|fammi tu) (una |un )?(domanda|quiz)|facciamo un quiz|interrogami tu/))return {r:npcAsk(n,chance(.5)?'math':'gk')};
  if(has(/indovinell/))return {r:npcAsk(n,'riddle')};
  if(role!=='nonna'&&has(/(raccontami|mi racconti|racconta|dimmi) (una |la )?(storia|favola|fiaba)|una favola/)){add('fel',2);relGain(n,2);return {r:pk(FAVOLE9),fx:'Felicità +2'}}
  if(has(/(mi insegni|insegnami|dimmi una curiosita|dimmi una cosa (che non so|interessante)|sai una curiosita)/)){add('int',1);return {r:pk(CURIO9),fx:'Intelligenza +1'}}
  if(has(/(mi annoio|che noia|cosa (posso )?faccio|non so cosa fare|cosa possiamo fare)/))return {r:pk(['Perché non vai al luna park? Ci sono le giostre! 🎡','Vai allo zoo a vedere i leoni! 🦁','Che ne dici di una nuotata in piscina? 🏊','Al museo dei tesori ci sono cose incredibili! 🏛️','Prova a fare una partita allo stadio! ⚽','Vai al cinema: oggi danno un cartone bellissimo! 🍿'])};
  if(has(/(che ore sono|che ora e|sai che ore sono|mi dici l ora)/)&&S.clock!=null){const h=Math.floor(S.clock/60)%24,mi=Math.floor(S.clock%60);return {r:`Sono le ${String(h).padStart(2,'0')}:${String(mi).padStart(2,'0')}! ${h<6?'È notte fonda! 🌙':h<12?'È mattina. ☀️':h<18?'È pomeriggio. 🌤️':h<21?'È sera. 🌇':'È tardi, è quasi ora di dormire! 😴'}`}}
  if(!par&&has(/(andiamo|voglio andare|possiamo andare|portami) al mare/))return {r:'Al mare si va in aereo! Prenota il viaggio all\'agenzia, poi vai all\'aeroporto. 🏖️✈️'};
  if(has(/(come (si )?compr\w* (una |la )?(macchina|auto)|dove (si )?compr\w* (una |la )?(macchina|auto))/))return {r:S.age<18?'Le macchine si comprano alla concessionaria! Però la patente B si prende a 18 anni. 🚗':'Alla concessionaria, vicino alla scuola guida! Scegli il modello e il colore. 🚗'};
  return null}
// risposte "deboli" che non vogliono dire niente: la persona allora ti fa una domanda, così la chiacchierata continua
const DLG_WEAK=/(mi incuriosisci|non lo sapevo|che bello chiacchierare|sei simpatic|ah si\? forte|interessante! raccontami|hai proprio ragione|capisco! e poi|io invece oggi ho giocato|l avevo sentito anch|non ci avevo mai pensato|si, una volta! che ricordi)/i;
{const _r=reply;reply=function(n,raw){
  if(DLG_NOTALK.includes(n.role))return _r(n,raw);
  raw=String(raw).replace(/\bdov['’]\s*/gi,'dove ').replace(/\b(l|un|dell|all|nell|sull|quell)['’]\s*/gi,'$1o ');
  {const t=norm(raw),old=ui.ask;if(old&&/^(ma )?perche\??$/.test(t))return {r:pick(['Così, per sapere! 😊 Allora?','Perché sono curios'+(n.look&&n.look.f?'a':'o')+'! 😄 Allora?'])};
    const yn=/^(si|no|certo|ok|okay|va bene|dai|non|grazie|volentieri|magari|forse|boh|non lo so|ovvio|sicuro|esatto|giusto)\b/.test(t)||/^\d+$/.test(t);
    if(!old||(!old.any&&!yn)){try{const p=dlgPre(n,raw,t);if(p){if(ui.ask===old)ui.ask=null;ui.lastT=t;return p}}catch(e){console.warn('dialoghi',e)}}}
  const out=_r(n,raw);
  if(out&&out.r&&DLG_WEAK.test(norm(out.r))&&!ui.ask){const t=norm(raw),q=/\?\s*$/.test(raw.trim())||/^(chi|cosa|che|come|dove|quando|perche|quale|quanto|quanti)\b/.test(t);
    if(q){ui.ask={any:()=>({r:pick(['Hai ragione, non ci avevo pensato! 😊','Ecco, adesso lo so anch\'io! Grazie! 😄','Che intelligente che sei! 🤓'])})};return Object.assign({},out,{r:pick(['Bella domanda! Non lo so di preciso… tu cosa ne pensi? 🤔','Mmm, non ne sono sicur'+(n.look&&n.look.f?'a':'o')+'. Secondo te? 🤔'])})}
    return Object.assign({},out,{r:pick(['Ah, capito! ','Davvero? ','Che bello! '])+npcAsk(n,'me')})}
  return out}}

/* ---------- le persone vengono a parlarti ---------- */
const DLG_ROLES=['passante','amico','compagno','nonna','maestra','prof','mamma','papa','vigile','gelataio','commessa','coach','dottoressa','bibliotecaria','guida','pizzaiolo','cassiera','amore','educatrice','capo'];
function dlgBubble(){if(!DLG.el){const e=document.createElement('button');e.id='talk9';e.type='button';e.style.cssText='position:fixed;left:50%;transform:translateX(-50%);bottom:calc(212px + env(safe-area-inset-bottom,0px));z-index:31;background:#fffdf7;color:#1f2540;border:3px solid #1f2540;border-radius:20px;padding:10px 16px;font:800 16px "Baloo 2",system-ui;box-shadow:0 4px 0 rgba(0,0,0,.25);max-width:86vw;white-space:nowrap;overflow:hidden;text-overflow:ellipsis';e.hidden=true;
    e.addEventListener('click',()=>{const c=DLG.cand;e.hidden=true;DLG.cand=null;if(c)dlgStart(c.id,c.kind)});document.body.appendChild(e);DLG.el=e}return DLG.el}
function dlgStart(id,kind){const n=NPCS.find(x=>x.id===id);if(!n||isBusy())return;openChat(id);ui.ask=null;const line=npcAsk(n,kind);ui.chat.push({from:'them',t:line});renderChat()}
function dlgTick(dt){const e=dlgBubble();if(!S||!S.alive||isBusy()||S.drive||S.famDrive||ui.flying||ui.mg||(typeof JK!=='undefined'&&JK.pols&&JK.pols.length)){if(!e.hidden&&isBusy()){}return}
  if(DLG.cand){DLG.hide-=dt;const n=NPCS.find(x=>x.id===DLG.cand.id);if(DLG.hide<=0||!n||n.scene!==S.scene||Math.hypot(n.x-S.pos.x,n.y-S.pos.y)>9){e.hidden=true;DLG.cand=null}return}
  DLG.t-=dt;if(DLG.t>0)return;DLG.t=55+Math.random()*50;if(S.age<3)return;
  const L=NPCS.filter(n=>n.scene===S.scene&&!n.hide&&!n.inCar&&DLG_ROLES.includes(n.role)&&Math.hypot(n.x-S.pos.x,n.y-S.pos.y)<7);if(!L.length)return;
  const n=L[Math.floor(Math.random()*L.length)],kinds=S.age<6?['barz','me','math']:['barz','me','math','gk','riddle','me'],kind=kinds[Math.floor(Math.random()*kinds.length)];
  const txt={barz:'vuole raccontarti una barzelletta! 😄',me:'vuole chiederti una cosa! 💬',math:'ti fa un gioco con i numeri! 🔢',gk:'ha una domanda per te! ❓',riddle:'ha un indovinello per te! 🧩'}[kind];
  DLG.cand={id:n.id,kind};DLG.hide=14;e.textContent=`💬 ${n.name} ${txt}`;e.hidden=false}
{const _s=step;step=function(dt){const r=_s(dt);try{dlgTick(dt)}catch(e){}return r}}
// i lavori: ognuno dice il suo vero lavoro, "ti piace il tuo lavoro?", "hai figli?", "come si diventa medico?"
Object.assign(JOBDESC,{direttore:'Sono la direttrice della banca: controllo che i soldi di tutti siano al sicuro. 🏦',educatrice:'Faccio l\'educatrice al nido: gioco, canto e mi prendo cura dei bimbi piccoli. 🧸',
  venditore:'Vendo le macchine nuove qui in concessionaria! 🚗',agente2:'Lavoro all\'agenzia viaggi: organizzo le vacanze al mare e in montagna! ✈️',parroco:'Sono il parroco: mi prendo cura della chiesa e delle persone del quartiere. ⛪',
  edicolante:'Ho l\'edicola: vendo giornali, fumetti e figurine! 📰',hostess:'Sono un\'assistente di volo: accolgo i passeggeri e controllo che tutti viaggino sicuri. ✈️',pilota:'Sono il comandante: guido l\'aereo sopra le nuvole! ✈️'});
P_JOBS[4]='il meccanic#';P_JOBS[6]='il postin#';
const JOB9=[[/(dottor|dottoress|medic)/,'medico'],[/infermier/,'infermiere'],[/(maestr|insegnant|professor|\bprof\b)/,'insegnante'],[/(poliziott|polizia|carabinier|vigilessa|vigile urbano)/,'polizia'],[/(pompier|vigil[ei] del fuoco)/,'pompiere'],
  [/calciat/,'calciatore'],[/(cuoc[oa]|chef)/,'cuoco'],[/astronaut/,'astronauta'],[/veterinari/,'veterinario'],[/avvocat/,'avvocato'],[/ingegner/,'ingegnere'],[/(programmat|informatic)/,'programmatore'],[/pizzaiol/,'pizzaiolo'],
  [/commess/,'commesso'],[/camerier/,'cameriere'],[/meccanic/,'meccanico'],[/elettricist/,'elettricista'],[/impiegat/,'impiegato'],[/(allenat|\bmister\b)/,'allenatore'],[/commercialist/,'commercialista']];
const ROLEJOB9={dottoressa:'medico',maestra:'insegnante',prof:'insegnante',coach:'allenatore',pizzaiolo:'pizzaiolo',commessa:'commesso',cassiera:'commesso',cassiere:'commesso',capo:'impiegato',bancario:'commercialista',direttore:'commercialista',vigile:'polizia',gelataio:'cuoco',educatrice:'insegnante'};
function jobPath9(id){const j=JOBS.find(x=>x.id===id);if(!j)return null;const nm=jobName(j).toLowerCase(),fac=Object.keys(FAC).filter(k=>j.rt.includes(FAC[k].n)),extra=j.rt.split(' + ').slice(1).join(' e ');let s;
  if(id==='calciatore')s='allenati tantissimo (Sport almeno 75) e gioca nella squadra di calcio: se un osservatore ti nota prima dei 26 anni, diventi professionista! ⚽';
  else if(/^Laurea/.test(j.rt)&&fac.length&&id!=='programmatore')s=`finisci le superiori, poi a 18 anni vai all'università e scegli ${fac.map(k=>FAC[k].n).join(' o ')}${fac.length===1?` (dura ${FAC[fac[0]].d} anni: finisci a ${18+FAC[fac[0]].d} anni)`:''}${extra?`. Serve anche ${extra}`:''}. Con la laurea vai negli uffici a cercare lavoro! 🎓`;
  else if(j.rt==='Licenza media')s='basta finire le scuole medie: dai 16 anni chiedi lavoro negli uffici, dal Dottor Ferri! 🏢';
  else s=`serve ${j.rt.replace(/^Diploma tecnico o professionale/,'il diploma dell\'istituto tecnico o professionale').replace(/^Diploma professionale/,'il diploma dell\'istituto professionale').replace(/^Diploma/,'il diploma delle superiori').replace(/ \+ /g,' e ').replace(', o laurea',', oppure la laurea').replace(', o diploma',', oppure il diploma')}. Poi chiedi lavoro negli uffici, dal Dottor Ferri! 🏢`;
  return `Per diventare ${nm} ${s}`}
{const _p=dlgPre;dlgPre=function(n,raw,t){const role=n.role,ag=n.look&&n.look.age,kidN=ag==='kid'||ag==='baby'||ag==='teen',old=ag==='old',fem=n.look&&n.look.f,o=fem?'a':'o',par=role==='mamma'||role==='papa';
  if(/\bhai (dei |tanti |anche )?(figli|bambini|bimbi)\b/.test(t)){if(par)return {r:'Sì: te! Sei tu il mio tesoro. ❤️'};if(kidN)return {r:'Ma no, sono '+(fem?'una bambina':'un bambino')+' anche io! 😄'};
    if(role==='parroco')return {r:'No, ma tutto il quartiere è la mia grande famiglia! ⛪'};const h=hsh(n.id+'|f9');
    return {r:old?['Sì, tre figli e cinque nipotini! Mi riempiono di disegni. 🖍️','Sì, due figli ormai grandi e un nipotino piccolo piccolo!'][h%2]:['Sì, una bambina di 6 anni! Disegna tantissimo. 👧','Sì, due maschietti scatenati! 😄','Non ancora… ma un giorno mi piacerebbe tanto!','Sì, un bimbo piccolo che ride sempre! 👶'][h%4]}}
  if(/(ti piace (il tuo |fare il tuo |questo )?lavor|ti piace lavorare|sei content[oa] del tuo lavoro|ti diverti a lavorare)/.test(t)){
    if(par)return null;if(kidN)return {r:'Io vado ancora a scuola! Ma da grande voglio fare un lavoro bellissimo. 😄'};
    if(role==='nonna'||role==='nonno'||(old&&!JOBDESC[role]))return {r:'Adesso sono in pensione! Ma il mio lavoro mi piaceva tanto. 😊'};
    const why={maestra:'Vedere i bimbi che imparano a leggere è una magia!',prof:'Quando uno studente capisce una cosa difficile, sono felicissim'+o+'!',gelataio:'Il gelato fa sorridere tutti, anche i grandi!',dottoressa:'Aiutare chi sta male a guarire è bellissimo.',
      vigile:'Aiuto le persone ad attraversare e a non perdersi.',coach:'Quando la squadra segna un gol, salto di gioia!',pizzaiolo:'L\'odore della pizza appena sfornata è il migliore del mondo!',bagnino:'Lavoro al sole, vicino all\'acqua!',
      bibliotecaria:'Sto tutto il giorno in mezzo ai libri!',pilota:'Da lassù le città sembrano tutte piccoline!',hostess:'Viaggio in tutto il mondo!',educatrice:'I bimbi piccoli mi fanno ridere tutto il giorno!',guida:'Ogni quadro ha una storia da raccontare!',
      edicolante:'Leggo tutti i fumetti prima degli altri! 😄',parroco:'Ascolto le persone e le aiuto.',venditore:'Mi piace vedere la faccia felice di chi guida la macchina nuova!'};
    return {r:'Sì, tantissimo! '+(why[role]||'Ogni giorno imparo qualcosa di nuovo e aiuto le persone.')+' 😊'}}
  const named=(()=>{for(const [re,j] of JOB9)if(re.test(t))return j;return null})(),you=/(tuo lavoro|come te\b|il lavoro che fai)/.test(t);
  if(/(come si diventa|come (faccio a |posso |si fa a )?diventare|come divento|per diventare|cosa (devo|bisogna|serve|si deve) (fare |studiare )?per (fare|diventare)|cosa serve per|che scuola (devo fare|serve|bisogna fare)|(voglio|vorrei) (fare|diventare|essere))/.test(t)&&(named||you)){
    const id=named||ROLEJOB9[role];if(id){const p=jobPath9(id);if(p)return {r:p}}
    if(you&&JOBDESC[role])return {r:'Ci vogliono tanta passione e un po\' di pazienza! Quando sarai grande, negli uffici in città trovi tutti i lavori. 🏢'}}
  return _p(n,raw,t)}}
// hostess e comandante parlano anche d'altro (prima rispondevano sempre e solo del biglietto)
{const _sr=specialReply;specialReply=function(n,t){if((n.role==='hostess'||n.role==='pilota')&&!/(bigliett|vol[oa]|aere|parti|imbarc|valig|gate|check|viaggi|salire|salgo|bordo|quanto|alto|veloc|^ciao|buongiorno|salve|^\W*$)/.test(t)){
  const ch=cheatReply(n,t);if(ch)return ch;const qz=quizReply(n,t);if(qz)return qz;return null}return _sr.apply(this,arguments)}}
// curiosità vere per le domande dei bambini (chiunque le sa)
const FACTS9=[[/(aere).*(alto|veloc|in alto)|(alto|veloc).*(aere)/,'Un aereo vola a circa 10.000 metri, sopra le nuvole, e va a 800 chilometri all\'ora! ✈️'],
  [/luna.*(lontan|distan)|(lontan|distan).*luna/,'La Luna è lontana circa 384.000 chilometri: in macchina, senza mai fermarsi, ci vorrebbero più di 5 mesi! 🌙'],
  [/sole.*(grand|lontan|cald)|(grand|lontan|cald).*\bsole\b/,'Il Sole è enorme: dentro ci starebbero più di un milione di Terre! Ed è lontanissimo, 150 milioni di chilometri. ☀️'],
  [/quant[ei] stelle/,'Nel cielo ce ne sono miliardi e miliardi! Di notte, lontano dalle luci della città, se ne vedono migliaia. ✨'],
  [/dinosaur/,'I dinosauri sono vissuti tantissimo tempo fa, più di 65 milioni di anni fa! Il più grande era lungo come tre autobus. 🦕'],
  [/(perche|come mai).*cielo.*(blu|azzurr)/,'Il cielo è azzurro perché la luce del Sole rimbalza nell\'aria, e il blu rimbalza più di tutti gli altri colori! 💙'],
  [/(come|perche|come mai|cos e).*arcobalen|arcobalen.*(come|perche)/,'L\'arcobaleno nasce quando il sole illumina le goccioline di pioggia: ogni goccia divide la luce in sette colori! 🌈'],
  [/(quanti anni ha|quanto e vecchia) (la terra|il mondo)/,'La Terra ha circa 4 miliardi e mezzo di anni! 🌍'],
  [/animale piu veloce/,'Il ghepardo! Corre fino a 110 chilometri all\'ora. 🐆'],[/animale piu grande/,'La balenottera azzurra: è lunga come due autobus e mezzo! 🐋'],
  [/(montagna|monte) piu alt/,'L\'Everest, alto 8.849 metri! In Italia la montagna più alta è il Monte Bianco. 🏔️'],
  [/(perche|come mai).*mare.*salat/,'Il mare è salato perché i fiumi portano in mare i sali delle rocce, e quando l\'acqua evapora il sale resta lì! 🌊'],
  [/(quanto e grande|quanto e lunga il giro|giro) (de)?(l mondo|la terra)/,'Per fare il giro della Terra bisogna percorrere 40.000 chilometri! 🌍'],
  [/(perche|come mai).*(piove|pioggia)/,'Il sole scalda l\'acqua del mare, che sale in cielo e forma le nuvole. Quando le goccioline diventano pesanti… piove! 🌧️'],
  [/come si fa (la )?pizza/,'Farina, acqua, lievito e un pizzico di sale: si impasta, si lascia lievitare, si stende, poi pomodoro, mozzarella e… nel forno caldissimo! 🍕'],
  [/come si fa (il )?gelato/,'Latte, zucchero e panna (o frutta!), si mescola al freddo finché diventa cremoso. Gino della gelateria ne fa venti gusti! 🍦'],
  [/(come|perche) (volano|vola) (gli uccelli|un uccello)/,'Gli uccelli hanno le ossa vuote dentro, leggerissime, e le ali spingono l\'aria verso il basso: così salgono! 🐦'],
  [/(perche|come mai).*(notte|buio).*(arriva|viene|diventa)|(perche|come mai) (viene|arriva) (la notte|buio)/,'Perché la Terra gira su se stessa: quando la nostra parte non guarda più il Sole, da noi è notte! 🌍🌙']];
{const _p=dlgPre;dlgPre=function(n,raw,t){if(!(n.look&&n.look.age==='baby')&&/(\?|^(quant|come|perche|cos|dove|qual|chi))/.test(raw.trim().toLowerCase()+' '+t)){for(const [re,a] of FACTS9)if(re.test(t)){
    const kidN=n.look&&(n.look.age==='kid'||n.look.age==='teen'),k=FACTS9.findIndex(f=>f[1]===a);S.facts9=S.facts9||{};if(!S.facts9[k]){S.facts9[k]=1;add('int',1)}
    return {r:kidN?'Lo so! L\'ho studiato a scuola: '+a.charAt(0).toLowerCase()+a.slice(1):a}}}
  const ag=n.look&&n.look.age,kidN=ag==='kid'||ag==='baby'||ag==='teen',par=n.role==='mamma'||n.role==='papa';
  if(/quanti amici hai/.test(t))return {r:par?'Tanti! Ma la persona a cui voglio più bene sei tu. ❤️':kidN?'Tantissimi! Quelli di scuola, quelli del parco… e tu! 😄':'Non tantissimi, ma sono amici veri: ci conosciamo da quando eravamo piccoli! E tu?'};
  if(/chi e il tuo (migliore|miglior) amic/.test(t)){const fr=S.rel&&(S.rel[n.id]||0)>=60;return {r:par?(n.role==='mamma'?'Il papà, e poi tu! ❤️':'La mamma, e poi tu! ❤️'):fr?'Sei tu, ovvio! 🤝':kidN?'Un compagno di classe… ma anche tu stai diventando mi'+(n.look&&n.look.f?'a':'o')+' amic'+(S.sex==='f'?'a':'o')+'! 😄':'Un amico che conosco da quando eravamo bambini: giocavamo sempre a pallone insieme! ⚽'}}
  if(kidN&&/(tuo lavoro|il lavoro che fai)/.test(t)&&/(fare|diventare|serve)/.test(t))return {r:'Io non lavoro, vado a scuola! Per fare come me basta… fare i compiti! 😄📚'};
  if(!kidN&&!JOBDESC[n.role]&&!['mamma','papa'].includes(n.role)&&/(come si diventa|come (faccio a |posso )?diventare|cosa (devo|bisogna|serve) (fare |studiare )?per (fare|diventare)|cosa serve per)/.test(t)&&/(tuo lavoro|come te\b|il lavoro che fai)/.test(t)){
    const pj=persona(n).job;for(const [re,j] of JOB9)if(re.test(pj)){const p=jobPath9(j);if(p)return {r:p}}
    return {r:`Per fare ${pj.replace(/^(il|lo|la) /,'il ').replace(/^l /,'l\'')} serve tanto impegno: prima finisci la scuola, poi si impara lavorando! 💪`}}
  return _p(n,raw,t)}}
// alle domande "quanto / dove / come / quando…" non si risponde "sì" o "no"
{const _sm=smartReply;smartReply=function(n,t,raw,pe){const r=_sm.apply(this,arguments);try{
  if(r&&/^(Secondo me sì!|Mmm, secondo me sì|Dipende… tu cosa|Direi di no…|Bella domanda! Io credo proprio di sì|Boh! Tu cosa dici\?|Ci devo pensare un attimo…)/.test(r.r)){
    const m=t.match(/^(?:ma |e |senti |scusa |secondo te )?(quant[oaie]|come|dove|quando|chi|cosa|che|qual[e]?)\b/),f=n.look&&n.look.f,o=f?'a':'o';
    if(m){const w=m[1],pk=a=>a[Math.floor(Math.random()*a.length)];
      r.r=/^quant/.test(w)?pk(['Mmm, non lo so di preciso… ma secondo me tantissimi! Proviamo a contarli insieme? 🔢','Bella domanda! Il numero preciso lo sa il Professor Ugo, al museo. 📚'])
       :w==='dove'?pk(['Mmm, non ne sono sicur'+o+'… prova a guardare la mappa! 🗺️','Bella domanda! Secondo me è qui vicino: proviamo a cercarlo insieme?'])
       :w==='quando'?pk(['Non lo so di preciso… forse presto! 😊','Mmm, bisogna avere un po\' di pazienza!'])
       :w==='come'?pk(['Non lo so bene… ma secondo me si impara provando! 💪','Bella domanda! In biblioteca c\'è un libro che lo spiega.'])
       :w==='chi'?pk(['Mmm, non lo so! Secondo te chi è?','Bella domanda! Tu chi pensi che sia?'])
       :pk(['Bella domanda! Tu cosa ne pensi? 🤔','Mmm, ci devo pensare… tu cosa diresti?'])}}}catch(e){}return r}}
// "sei arrabbiato?", "dove sei nato?", "mi insegni a …?"
{const _p=dlgPre;dlgPre=function(n,raw,t){const f=n.look&&n.look.f,o=f?'a':'o',ag=n.look&&n.look.age,kidN=ag==='kid'||ag==='baby',par=n.role==='mamma'||n.role==='papa',pk=a=>a[Math.floor(Math.random()*a.length)];let m;
  if((m=t.match(/^(?:ma )?sei (arrabbiat|triste|felice|content|stanc|offes|annoiat)/))){const w=m[1];
    return {r:/arrabbiat|offes/.test(w)?(par?'Arrabbiat'+o+' con te? Ma no, tesoro! Ti voglio un mondo di bene. ❤️':'No, per niente! Sono content'+o+' di vederti. 😊'):/triste|annoiat/.test(w)?'No, sto bene! Adesso che sei qui ancora meglio. 😊 E tu come stai?':/stanc/.test(w)?'Un pochino… è stata una lunga giornata! 😅':'Sì, sono felice! Soprattutto adesso che ci sei tu. 😄'}}
  if(/dove sei nat|in che citta sei nat|di dove sei/.test(t)){const c=CITTA[hsh(n.id+'|n9')%CITTA.length];return {r:kidN?'Sono nat'+o+' qui in città, all\'ospedale della dottoressa Neri! E tu?':par?`Sono nat${o} a ${c}, ma casa mia è dove ci sei tu. ❤️`:`Sono nat${o} a ${c}! Poi mi sono trasferit${o} qui. E tu dove sei nat${S.sex==='f'?'a':'o'}?`}}
  if((m=t.match(/^(?:mi )?(?:insegni|insegnami|mi insegneresti) (?:a |ad )?(.{2,30})$/))){const w=m[1].replace(/[?!\s]+$/,''),pl=/nuot/.test(w)?['in piscina','🏊']:/legg|scriv/.test(w)?['in biblioteca','📚']:/guid/.test(w)?['all\'autoscuola, quando sarai grande','🚗']:/calcio|pallone|tirare/.test(w)?['al campo di calcio','⚽']:/cucin|pizza/.test(w)?['in cucina','👩‍🍳']:/disegn|dipinge/.test(w)?['al museo, guardando i quadri','🎨']:/bici/.test(w)?['al parco','🚲']:null;
    return {r:pl?`Certo! Per imparare a ${w} andiamo ${pl[0]}: un po' alla volta diventi bravissim${S.sex==='f'?'a':'o'}! ${pl[1]}`:pk([`Certo! A ${w} si impara un po' alla volta: proviamo insieme! 💪`,`Volentieri! Il segreto per imparare a ${w}? Provare, sbagliare e riprovare! 😊`])}}
  return _p(n,raw,t)}}
