/* ===== v9: chat migliore — si risponde a QUALUNQUE domanda, senza mai dire "chiedilo a qualcun altro" ===== */
const KB9=[
// --- animali: perché / quanto ---
[/giraff.*(collo|alta|alte)|(collo).*giraff/,"Le giraffe hanno il collo lungo per arrivare alle foglie più alte degli alberi, dove gli altri animali non arrivano! Una giraffa può essere alta quasi 6 metri. 🦒"],
[/zebr.*(strisce|righe)|(strisce|righe).*zebr/,"Le strisce della zebra confondono i leoni quando il branco corre, e tengono lontane le mosche! Ogni zebra ha strisce diverse, come un'impronta digitale. 🦓"],
[/elefant.*(proboscide|naso)|proboscide/,"La proboscide è il naso dell'elefante, ma la usa anche come mano: prende il cibo, beve e si fa la doccia! 🐘"],
[/elefant.*(pes|grand|quant)/,"Un elefante africano pesa circa 6.000 chili, come 4 macchine! È l'animale di terra più grande. 🐘"],
[/(cammell|dromedari).*(gobb)|gobba/,"Nella gobba il cammello non tiene acqua ma grasso: è la sua riserva di energia per i viaggi nel deserto! 🐪"],
[/gatt.*(fusa|ronfa)|fanno le fusa/,"I gatti fanno le fusa quando sono tranquilli e contenti, ma a volte anche per calmarsi. È un rumore che fanno con la gola! 🐈"],
[/gatt.*(vedono|buio|notte)/,"I gatti vedono benissimo al buio perché dietro gli occhi hanno uno strato che riflette la luce, come uno specchio! 🐈‍⬛"],
[/(cane|cani).*(scodinzol|coda)/,"Il cane scodinzola quando è felice o emozionato: la coda è il suo modo di parlare! 🐶"],
[/(cane|cani).*(naso|annus|odor|fiuto)/,"Il naso del cane è circa 10.000 volte più bravo del nostro: per questo i cani aiutano a trovare le persone e le cose! 🐶"],
[/pesc.*(respir|acqua)|come respirano i pesci/,"I pesci respirano con le branchie: prendono l'ossigeno che è sciolto nell'acqua. 🐟"],
[/pesc.*(dorm)/,"Sì, anche i pesci dormono! Stanno quasi fermi, ma con gli occhi aperti, perché non hanno le palpebre. 🐠"],
[/balen.*(grand|pes|lung|quant)|animale piu grande/,"L'animale più grande di sempre è la balenottera azzurra: lunga fino a 30 metri, più di un autobus e mezzo! 🐋"],
[/balen.*(pesce|mammifer)|delfin.*(pesce|mammifer)/,"Balene e delfini non sono pesci: sono mammiferi, respirano aria e allattano i piccoli! 🐬"],
[/delfin/,"I delfini sono intelligentissimi: si chiamano tra loro con dei fischi, quasi come dei nomi! 🐬"],
[/(squal)/,"Gli squali esistono da più di 400 milioni di anni, prima dei dinosauri! E i denti che perdono ricrescono sempre. 🦈"],
[/\b(polpo|polpi|piovr)/,"Il polpo ha 8 braccia, 3 cuori e il sangue blu! E può cambiare colore per nascondersi. 🐙"],
[/(ghepard|animale piu veloce)/,"L'animale più veloce sulla terra è il ghepardo: arriva a 110 chilometri all'ora, come una macchina in autostrada! 🐆"],
[/(leon).*(re|ruggi|criniera)|re della foresta/,"Il leone si chiama re della savana per la sua criniera e il ruggito, che si sente fino a 8 chilometri di distanza! 🦁"],
[/(tigre)/,"La tigre è il gatto più grande del mondo e, a differenza dei gatti di casa, le piace nuotare! 🐯"],
[/(orso|orsi).*(letarg|invern|dorm)/,"D'inverno l'orso va in letargo: dorme per mesi nella tana e vive del grasso che ha messo in autunno! 🐻"],
[/(orso polare|orsi polari)/,"L'orso polare sembra bianco, ma la sua pelle è nera e i peli sono trasparenti! Così prende il calore del sole. 🐻‍❄️"],
[/(pinguin)/,"I pinguini sono uccelli, ma non volano: in compenso nuotano velocissimi! Vivono soprattutto vicino al Polo Sud. 🐧"],
[/(uccell).*(vola|volano)|come vola(no)? gli uccelli/,"Gli uccelli volano perché hanno ossa leggere, piene d'aria, e ali con le piume che spingono l'aria verso il basso. 🐦"],
[/(api|ape).*(miele)|come si fa il miele/,"Le api prendono il nettare dai fiori, lo portano all'alveare e lo trasformano in miele. Per un vasetto servono migliaia di fiori! 🐝"],
[/(formich)/,"Le formiche sono fortissime: possono sollevare oggetti 50 volte più pesanti di loro! 🐜"],
[/(ragn).*(ragnatel)|ragnatel/,"Il ragno fa la ragnatela con un filo di seta che esce dalla sua pancia. Quel filo è più resistente dell'acciaio! 🕷️"],
[/(farfall)/,"La farfalla prima è un bruco, poi si chiude nel bozzolo e dopo qualche settimana esce con le ali! Si chiama metamorfosi. 🦋"],
[/\b(rana|rane|girin)/,"Le rane nascono girini, con la coda, e vivono nell'acqua. Poi crescono le zampe e diventano rane! 🐸"],
[/(tartarug).*(vive|vivono|anni|vecch)/,"Le tartarughe giganti possono vivere più di 150 anni! 🐢"],
[/(camaleont)/,"Il camaleonte cambia colore per comunicare e scaldarsi, e può muovere gli occhi uno indipendente dall'altro! 🦎"],
[/(dinosaur).*(estint|spari|morti|finit)/,"I dinosauri sono scomparsi circa 66 milioni di anni fa, quando un enorme asteroide è caduto sulla Terra. Ma gli uccelli sono i loro discendenti! 🦖"],
[/(dinosaur).*(grand|grosso)|dinosauro piu grande/,"Uno dei dinosauri più grandi era l'Argentinosauro: lungo circa 35 metri! Il T-Rex era lungo 12 metri. 🦕"],
[/(t rex|tirannosaur)/,"Il T-Rex aveva denti grandi come banane e un morso fortissimo, ma braccine cortissime! 🦖"],
[/(dinosaur)/,"I dinosauri sono vissuti per più di 160 milioni di anni! Il più famoso è il T-Rex. 🦖"],
[/(mucca|mucche).*(latte)|da dove viene il latte/,"Il latte lo fanno le mucche quando hanno il vitellino. I contadini le mungono ogni giorno! 🐄"],
[/(gallin).*(uov)|da dove vengono le uova/,"Le uova le fanno le galline: una gallina può fare quasi un uovo al giorno! 🐔"],
[/(cavall).*(dorm|in piedi)/,"I cavalli possono dormire in piedi, perché le loro zampe si bloccano come un lucchetto! 🐴"],
[/(gufo|gufi|civett)/,"Il gufo può girare la testa quasi tutta intorno, e caccia di notte senza fare rumore! 🦉"],
[/(pappagall).*(parl)/,"I pappagalli imitano i suoni che sentono, anche le parole! Alcuni ne imparano più di cento. 🦜"],
[/(lumac)/,"Le lumache hanno migliaia di dentini piccolissimi e si portano la casa sulla schiena! 🐌"],
[/(serpent).*(ved|sent|lingua)/,"Il serpente tira fuori la lingua per \"annusare\" l'aria: così sente gli odori! 🐍"],
[/(animale piu lento|bradip)/,"Il bradipo è lentissimo: si muove così piano che sul suo pelo crescono perfino delle alghe! 🦥"],
[/(koala)/,"I koala dormono fino a 20 ore al giorno e mangiano solo foglie di eucalipto! 🐨"],
[/(canguro|canguri)/,"Il canguro tiene il cucciolo in una tasca sulla pancia e salta fino a 9 metri! 🦘"],
[/(quanto|quanti anni) viv.*(gatt)/,"Un gatto vive in media 15 anni, e alcuni arrivano anche a 20! 🐈"],
[/(quanto|quanti anni) viv.*(cane|cani)/,"Un cane vive di solito tra i 10 e i 15 anni: i cani piccoli vivono un po' di più dei cani grandi! 🐶"],
[/(quanto|quanti anni) viv.*(elefant)/,"Un elefante può vivere 60-70 anni! 🐘"],
[/(quanto|quanti anni) viv.*(cavall)/,"Un cavallo vive circa 25-30 anni! 🐴"],
[/(quanto|quanti anni) viv.*(pesc)/,"Un pesciolino rosso, se curato bene, può vivere più di 10 anni! 🐠"],
[/(quanto|quanti anni) viv.*(coniglio|criceto)/,"Un coniglio vive circa 8-10 anni, un criceto solo 2 o 3! 🐹"],
[/(quanto|quanti anni) viv.*(person|uomo|uomini|nonn)|quanto vive una persona/,"In Italia le persone vivono in media più di 80 anni! E alcune arrivano a 100. 👵"],
[/(animale|essere) (che vive )?piu (a lungo|vecchio)/,"Alcuni squali della Groenlandia vivono più di 300 anni! 🦈"],
// --- corpo umano ---
[/(cuore).*(batt|quant|serve|grand)/,"Il cuore pompa il sangue in tutto il corpo e batte circa 100.000 volte al giorno! È grande più o meno come il tuo pugno. ❤️"],
[/(ossa|osso).*(quant|corpo)|quante ossa/,"Un adulto ha 206 ossa! I bambini ne hanno di più, perché alcune poi si uniscono crescendo. 🦴"],
[/(osso piu piccolo|osso piu lungo)/,"L'osso più lungo è il femore, nella coscia. Il più piccolo è la staffa, dentro l'orecchio: è grande come un chicco di riso! 🦴"],
[/(denti).*(quant|latte|cadono|cade)|denti da latte/,"I bambini hanno 20 denti da latte, che cadono verso i 6 anni. Poi crescono quelli definitivi: da grande ne avrai 32! 🦷"],
[/(sbadigl)/,"Si sbadiglia quando si è stanchi o annoiati: serve anche a rinfrescare il cervello! E vedere qualcuno che sbadiglia fa sbadigliare anche te. 🥱"],
[/(singhiozz)/,"Il singhiozzo è un piccolo salto del diaframma, il muscolo che ci fa respirare. Di solito passa da solo bevendo un po' d'acqua! 💧"],
[/(starnut)/,"Lo starnuto serve a buttare fuori polvere e microbi dal naso. Esce velocissimo, a più di 100 chilometri all'ora! 🤧"],
[/(sogn).*(perche|come|cosa sono)|perche sogniamo/,"I sogni sono come film che il cervello fa mentre dormi: riordina le cose che hai vissuto durante il giorno. 💭"],
[/(perche|quanto).*(dormire|dormiamo)|quante ore.*dorm/,"Dormire serve al corpo per riposare e al cervello per ricordare le cose imparate. Un bambino dovrebbe dormire 9-11 ore a notte! 😴"],
[/(cervello)/,"Il cervello comanda tutto il corpo: pensieri, movimenti, ricordi. Pesa circa un chilo e mezzo e funziona anche mentre dormi! 🧠"],
[/(sangue).*(rosso|colore)/,"Il sangue è rosso per il ferro che c'è dentro, che trasporta l'ossigeno in tutto il corpo! 🩸"],
[/(pelle d oca)/,"La pelle d'oca viene quando hai freddo o un'emozione forte: i peli si alzano per tenerti più caldo! 🥶"],
[/(lacrim|piangiam|perche si piange)/,"Le lacrime puliscono gli occhi, e quando siamo tristi o felicissimi aiutano a sfogare l'emozione. Piangere va benissimo! 💧"],
[/(capelli|unghie).*(cresc)/,"I capelli crescono circa 1 centimetro al mese, le unghie un po' più piano! 💇"],
[/(muscol).*(quant)|quanti muscoli/,"Nel corpo abbiamo più di 600 muscoli! Per sorridere ne usiamo una decina. 😄"],
[/(occhi).*(colore|azzurr|marron)/,"Il colore degli occhi dipende da una sostanza, la melanina, e si eredita da mamma e papà! 👀"],
[/(vitamin)/,"Le vitamine sono piccoli aiutanti che il corpo prende dal cibo, soprattutto da frutta e verdura. Ci tengono forti e sani! 🍎"],
[/(febbre)/,"La febbre è il corpo che si scalda per combattere i microbi. Serve riposo, acqua e, se serve, la dottoressa! 🌡️"],
[/(lavar).*(mani)|perche.*mani/,"Ci si lava le mani per mandare via i microbi, che sono piccolissimi e non si vedono. Bastano acqua e sapone per 20 secondi! 🧼"],
[/perche.*(fare|faccio|fanno) i compiti|a cosa servono i compiti/,"I compiti servono ad allenare il cervello, come la palestra per i muscoli! Ripetendo a casa, le cose imparate a scuola restano in testa. 🧠💪"],
[/(lavar|spazzol).*(denti)|perche.*denti/,"I denti si lavano per togliere i resti di cibo: se no i batteri fanno le carie! Due minuti, almeno due volte al giorno. 🪥"],
[/(ombelico)/,"L'ombelico è il punto dove eri attaccato alla mamma con il cordone, quando eri nella sua pancia! 👶"],
[/(gatt).*(miagol)|perche.*miagol/,"I gatti miagolano soprattutto per parlare con noi umani: tra loro gatti adulti quasi non miagolano! Così ci chiedono cibo, coccole o di aprire la porta. 🐈"],
[/(cane|cani).*(abbai)|perche.*abbai/,"I cani abbaiano per avvisare, per salutare o quando sono emozionati: è il loro modo di parlare! 🐶"],
[/perche.*(andare|vado|si va|andiamo) a scuola|a cosa serve la scuola/,"A scuola si impara a leggere, scrivere, contare e tante cose sul mondo, e si conoscono gli amici! Tutto quello che impari adesso ti servirà per fare il lavoro che sogni. 🎒📚"],
[/perche.*(mangiare|mangio|mangiamo) (la )?(verdur|frutta)|perche.*verdura/,"Frutta e verdura sono piene di vitamine: ti fanno crescere forte, ti aiutano a non ammalarti e danno energia per giocare! 🥦🍎"],
[/perche.*(andare a dormire|devo dormire|vado a letto|a letto presto)/,"Mentre dormi il corpo cresce e il cervello mette in ordine tutto quello che hai imparato! Per questo i bambini devono dormire tanto. 😴"],
[/perche.*(lavar|fare il bagno|doccia)/,"Lavarsi manda via sporco e microbi, così non ci si ammala e si profuma! 🧼"],
[/(pes|quanto pesa).*(luna)|luna.*(pesa)/,"La Luna pesa tantissimo: 73 miliardi di miliardi di tonnellate! Però è 81 volte più leggera della Terra. 🌙"],
[/(pes|quanto pesa).*(terra|pianeta)/,"La Terra pesa circa 6 mila miliardi di miliardi di tonnellate: un numero con 21 zeri! 🌍"],
[/(quanto e grande|quanto e grossa|grandezza).*(luna)/,"La Luna è circa 4 volte più piccola della Terra: il suo diametro è di 3.474 chilometri! 🌙"],
[/(quanto e grande|quanto e grossa).*(terra)|giro della terra/,"Il giro della Terra è lungo circa 40.000 chilometri! In macchina, senza mai fermarsi, ci vorrebbero quasi 3 settimane. 🌍"],
[/(come si fa|come si prepara|ricetta).*(torta)/,"Per una torta semplice: mescoli 3 uova con lo zucchero, aggiungi farina, latte, un po' di burro e il lievito, poi in forno a 180 gradi per 40 minuti. Con un adulto vicino, mi raccomando! 🍰"],
[/(come si fa|come si prepara).*(pizza)/,"Per la pizza si impasta farina, acqua, lievito e sale, si lascia lievitare qualche ora, poi si stende e si mettono pomodoro e mozzarella. In forno caldissimo! 🍕"],
[/(come si fa|come si prepara).*(pupazzo di neve)/,"Fai una palla di neve e falla rotolare finché diventa grande: è la pancia! Poi una più piccola per la testa, una carota per il naso e due sassolini per gli occhi. ⛄"],
[/(come si fa|come si costruisce).*(aere|aeroplan).*(carta)/,"Piega un foglio a metà per lungo, poi piega gli angoli in alto verso il centro, ripiega ancora verso il centro e apri le ali. Pronto a volare! ✈️"],
[/(panda)/,"I panda mangiano quasi solo bambù, anche 12 ore al giorno! Vivono nelle montagne della Cina. 🐼"],
[/(fuoco).*(cald|brucia|perche)|perche il fuoco/,"Il fuoco è caldo perché quando la legna brucia libera l'energia che aveva dentro, sotto forma di luce e calore. Con il fuoco non si gioca mai! 🔥"],
[/(notte).*(buia|scura|buio)|perche di notte e buio/,"Di notte è buio perché la nostra parte di Terra è girata dall'altra parte rispetto al Sole! Intanto, dall'altra parte del mondo, è giorno. 🌍🌙"],
[/(motore).*(funziona|come)|come funziona.*motore/,"Il motore della macchina brucia un po' di benzina in piccoli cilindri: lo scoppio spinge dei pistoni su e giù, che fanno girare le ruote! Quelli elettrici invece usano una batteria e una calamita. 🚗"],
[/(perche|come mai).*(persone|nonn|animali|si) (muoiono|muore)|perche si muore/,"Tutti gli esseri viventi nascono, crescono, diventano vecchi e un giorno muoiono: è il ciclo della vita. Fa tristezza, ma chi ci vuole bene resta sempre nel nostro cuore. 💛"],
[/perche (ho|abbiamo) il naso|a cosa serve il naso/,"Il naso serve a respirare e a sentire gli odori! Riscalda l'aria e la pulisce dalla polvere prima che arrivi ai polmoni. 👃"],
[/perche (ho|abbiamo) le orecchie|a cosa servono le orecchie/,"Le orecchie servono a sentire i suoni e anche a tenere l'equilibrio! 👂"],
[/(dove|come) si (compra|prende|trova) un (cane|gatto|cucciolo)/,"Un cucciolo si può adottare al canile o al gattile, dove tanti animali aspettano una famiglia! Ma ricorda: un animale è per sempre e va curato ogni giorno. 🐶"],
[/\b(chi e il re|c e un re|il re d italia)\b/,"In Italia non c'è più un re dal 1946: c'è il Presidente della Repubblica! In altri paesi, come l'Inghilterra, invece c'è ancora un re. 👑"],
[/quanto costa una casa/,"Dipende tanto da dove si trova e da quanto è grande: un appartamento può costare centinaia di migliaia di euro! Per questo si risparmia per tanti anni o si fa un mutuo. 🏠"],
[/(perche).*(obbedire|ubbidire|ascoltare i genitori|ascoltare la mamma)/,"Perché mamma e papà hanno più esperienza e vogliono proteggerti! Ma va benissimo anche dire con gentilezza cosa ne pensi tu. 💛"],
// --- natura e scienza ---
[/(cielo).*(blu|azzurro)|perche il cielo/,"Il cielo è blu perché la luce del sole si sparpaglia nell'aria, e la luce blu si sparpaglia più di tutte! Al tramonto invece diventa arancione. 🌅"],
[/(arcobalen)/,"L'arcobaleno appare quando il sole illumina le goccioline di pioggia: la luce si divide in 7 colori, rosso, arancione, giallo, verde, azzurro, indaco e viola! 🌈"],
[/\b(tuon|fulmin|lampi\b|lampo\b)/,"Il fulmine è una gigantesca scintilla elettrica tra le nuvole. Il tuono è il suo rumore: arriva dopo perché il suono è più lento della luce! ⚡"],
[/(pioggia|piove).*(perche|come|da dove)|perche piove|come si forma la pioggia/,"L'acqua del mare e dei fiumi evapora col sole, sale in cielo e forma le nuvole. Quando le gocce diventano pesanti, cadono: è la pioggia! 🌧️"],
[/(nuvol).*(fatt|cosa sono|perche|bianch)/,"Le nuvole sono fatte di tantissime goccioline d'acqua piccolissime che galleggiano nell'aria! ☁️"],
[/(neve).*(fatt|perche|come)|fiocch/,"La neve è acqua che gela dentro le nuvole e diventa cristalli di ghiaccio. Ogni fiocco ha 6 punte ed è diverso dagli altri! ❄️"],
[/(vento).*(perche|come|cos)/,"Il vento è aria che si muove: l'aria calda sale e quella fredda corre a prendere il suo posto! 🌬️"],
[/(mare).*(salat)/,"Il mare è salato perché i fiumi portano lì i sali delle rocce, e quando l'acqua evapora il sale resta nel mare! 🌊"],
[/(onde).*(mare)|perche ci sono le onde/,"Le onde le fa soprattutto il vento che soffia sull'acqua! 🌊"],
[/(maree?)\b.*(alta|bassa|perche)/,"Le maree le fa la Luna: con la sua forza tira l'acqua del mare, che sale e scende due volte al giorno! 🌊"],
[/(vulcan)/,"Un vulcano è una montagna da cui esce la lava, roccia così calda da essere liquida! In Italia ci sono l'Etna e il Vesuvio. 🌋"],
[/(terremot)/,"Il terremoto succede quando i grandi pezzi della crosta terrestre si muovono e si scontrano. Se capita, ci si mette sotto un tavolo! 🏠"],
[/(foglie).*(cadono|autunno|gialle|cambiano)/,"In autunno gli alberi smettono di nutrire le foglie per risparmiare energia per l'inverno: le foglie diventano gialle e rosse e cadono! 🍂"],
[/(foglie).*(verdi)|piante.*(verdi)/,"Le foglie sono verdi per la clorofilla, che usa la luce del sole per fare il cibo della pianta! 🌿"],
[/(piante|alberi).*(respir|ossigen|mangiano|crescono)|fotosintesi/,"Le piante prendono luce, acqua e anidride carbonica e producono il loro cibo e l'ossigeno che respiriamo. Si chiama fotosintesi! 🌳"],
[/(albero piu (alto|vecchio))/,"L'albero più alto del mondo è una sequoia in California: è alto 115 metri, come un palazzo di 38 piani! 🌲"],
[/(acqua).*(bolle|bollire|gradi)|a quanti gradi/,"L'acqua bolle a 100 gradi e diventa ghiaccio a 0 gradi! 💧"],
[/(ghiaccio).*(galleggi)/,"Il ghiaccio galleggia perché quando l'acqua gela si allarga ed è più leggera dell'acqua liquida! 🧊"],
[/(calamit)/,"La calamita attira il ferro grazie a una forza invisibile, il magnetismo. Anche la Terra è una calamita gigante, per questo funziona la bussola! 🧲"],
[/(gravita|perche le cose cadono|forza di gravita)/,"Le cose cadono per la gravità: la Terra tira tutto verso di sé. Per questo restiamo coi piedi per terra! 🍎"],
[/(elettricit|corrente)/,"L'elettricità è il movimento di particelle piccolissime, gli elettroni, nei fili. Accende luci, computer e telefoni! Non si toccano mai le prese. ⚡"],
[/\b(eco)\b|perche c e l eco/,"L'eco è la tua voce che rimbalza su una parete o una montagna e torna indietro! 🏔️"],
[/(luce).*(veloc)|velocita della luce/,"La luce è la cosa più veloce che esiste: 300.000 chilometri al secondo! In un secondo fa 7 volte il giro della Terra. 💡"],
[/(suono).*(veloc)/,"Il suono nell'aria va a circa 340 metri al secondo: molto più piano della luce! 🔊"],
[/(petrolio)/,"Il petrolio si è formato in milioni di anni da piccoli esseri marini sepolti sotto terra. Da lui si fa la benzina! ⛽"],
[/(inquinament|riciclo|raccolta differenziata)/,"Per inquinare meno si può fare la raccolta differenziata, spegnere le luci e andare a piedi o in bici quando si può! ♻️"],
// --- spazio ---
[/(sole).*(cald|grand|lontan|cos e|stella)|il sole e una stella/,"Il Sole è una stella! È così grande che dentro ci starebbero un milione di Terre, ed è lontano 150 milioni di chilometri. ☀️"],
[/(luna).*(lontan|distanz)/,"La Luna è lontana circa 384.000 chilometri: in macchina ci vorrebbero più di 5 mesi senza mai fermarsi! 🌙"],
[/(luna).*(cambia|forma|fasi|mezza)/,"La Luna sembra cambiare forma perché il Sole ne illumina pezzi diversi mentre gira intorno alla Terra: sono le fasi lunari! 🌓"],
[/(chi).*(luna).*(prim|andato|sbarcato)|primo uomo sulla luna/,"Il primo uomo sulla Luna è stato Neil Armstrong, nel 1969! 👨‍🚀🌕"],
[/(cosa c e|cosa ce|che cosa c e) (nello|nell) spazio|(nello|nell) spazio cosa/,"Nello spazio ci sono stelle, pianeti, lune, comete, asteroidi e miliardi di galassie! E non c'è aria: per questo gli astronauti hanno la tuta. 🚀🌌"],
[/(pianet).*(quant|sono|nomi)|quanti pianeti/,"I pianeti del Sistema Solare sono 8: Mercurio, Venere, Terra, Marte, Giove, Saturno, Urano e Nettuno! 🪐"],
[/(pianeta piu grande|\bgiove\b)/,"Giove è il pianeta più grande: dentro ci starebbero più di 1.300 Terre! Ha una tempesta gigante chiamata Grande Macchia Rossa. 🪐"],
[/(saturno|anelli)/,"Saturno ha degli anelli bellissimi, fatti di pezzi di ghiaccio e roccia! 🪐"],
[/\b(marte)\b/,"Marte si chiama pianeta rosso perché è coperto di polvere di ferro arrugginita! Ci sono dei robot che lo esplorano. 🔴"],
[/(pianeta piu piccolo|mercurio)/,"Mercurio è il pianeta più piccolo e il più vicino al Sole! ☀️"],
[/(pianeta piu caldo|\bvenere\b)/,"Venere è il pianeta più caldo, ancora più di Mercurio, perché ha nuvole che tengono dentro il calore! 🔥"],
[/(stell).*(quant|cosa sono|perche brill|lontan)/,"Le stelle sono soli lontanissimi! Nel cielo ce ne sono miliardi e miliardi, più dei granelli di sabbia di tutte le spiagge. ✨"],
[/(come|da dove) (nascono|arrivano|vengono) i bambini|come nasce un bambino|come sono nato|come sono nata/,"I bambini crescono nella pancia della mamma per 9 mesi: all'inizio sono piccolissimi, come un semino, poi diventano grandi abbastanza per nascere! 👶❤️"],
[/(stell)/,"Le stelle sono enormi palle di gas caldissimo, come il Sole, ma così lontane che le vediamo piccolissime! Brillano perché producono luce e calore. ✨"],
[/(stella cadente|stelle cadenti)/,"Le stelle cadenti sono sassolini dello spazio che bruciano entrando nell'aria. Si vedono tante il 10 agosto, la notte di San Lorenzo! 🌠"],
[/(terra).*(gira|ruota|giorno e notte)|perche c e la notte|giorno e la notte/,"La Terra gira su se stessa in 24 ore: dove guarda il Sole è giorno, dall'altra parte è notte! 🌍"],
[/(stagion).*(perche|come)|perche.*(estate|inverno)/,"Le stagioni ci sono perché la Terra è un po' inclinata: girando intorno al Sole, a volte riceviamo più luce (estate) e a volte meno (inverno)! 🌞"],
[/(astronaut).*(mangia|dorm|bagno|galleggi)/,"Nello spazio gli astronauti galleggiano: dormono in sacchi attaccati alla parete e mangiano cibo in buste, così le briciole non volano via! 👩‍🚀"],
[/(buco nero|buchi neri)/,"Un buco nero è un posto nello spazio con una gravità così forte che neanche la luce riesce a scappare! 🕳️"],
[/\b(alien|extraterrestr|ufo)\b/,"Nessuno ha mai trovato gli alieni, ma gli scienziati li cercano: l'universo è così grande che chissà! 👽"],
// --- geografia e monumenti ---
[/(torre eiffel)/,"La Torre Eiffel è a Parigi ed è alta 330 metri! È stata costruita nel 1889 ed è fatta di ferro. 🗼"],
[/(torre di pisa|torre pendente)/,"La Torre di Pisa pende perché il terreno sotto è morbido e ha ceduto mentre la costruivano! È alta circa 56 metri. 🇮🇹"],
[/(colosseo)/,"Il Colosseo è a Roma ed è stato costruito quasi 2.000 anni fa! Ci entravano 50.000 persone a vedere i gladiatori. 🏛️"],
[/(duomo di milano|madonnina)/,"Il Duomo di Milano ha più di 3.000 statue e in cima, sulla guglia più alta, c'è la Madonnina d'oro! ⛪"],
[/(piramid)/,"Le piramidi d'Egitto hanno più di 4.500 anni! Erano le tombe dei faraoni e la più grande era alta 146 metri. 🔺"],
[/(muraglia cinese|grande muraglia)/,"La Grande Muraglia cinese è lunga più di 20.000 chilometri! Fu costruita per difendersi dai nemici. 🧱"],
[/(statua della liberta)/,"La Statua della Libertà è a New York ed è un regalo della Francia agli Stati Uniti! È alta 93 metri con il piedistallo. 🗽"],
[/(grattacielo piu alto|palazzo piu alto|edificio piu alto)/,"Il palazzo più alto del mondo è il Burj Khalifa, a Dubai: è alto 828 metri! 🏙️"],
[/(montagna piu alta d italia|monte bianco)/,"La montagna più alta d'Italia è il Monte Bianco, 4.808 metri! È al confine con la Francia. 🏔️"],
[/(montagna piu alta|everest)/,"La montagna più alta del mondo è l'Everest, in Asia: 8.849 metri! 🏔️"],
[/(fiume piu lungo d italia|il po\b|fiume po)/,"Il fiume più lungo d'Italia è il Po: 652 chilometri, dalle Alpi fino al mare Adriatico! 🏞️"],
[/(fiume piu lungo)/,"I fiumi più lunghi del mondo sono il Nilo, in Africa, e il Rio delle Amazzoni, in America: più di 6.000 chilometri! 🏞️"],
[/(lago piu grande d italia|lago di garda)/,"Il lago più grande d'Italia è il Lago di Garda! 🏞️"],
[/(oceano piu grande|pacifico)/,"L'oceano più grande è il Pacifico: è più grande di tutte le terre del mondo messe insieme! 🌊"],
[/(oceani).*(quant)|quanti oceani/,"Gli oceani sono 5: Pacifico, Atlantico, Indiano, Artico e Antartico! 🌊"],
[/(continent).*(quant)|quanti continenti/,"I continenti sono 6 (o 7, se dividi le Americhe): Europa, Asia, Africa, America, Oceania e Antartide! 🌍"],
[/(paese piu grande|stato piu grande|nazione piu grande)/,"Il paese più grande del mondo è la Russia! L'Italia è circa 57 volte più piccola. 🗺️"],
[/(paese piu piccolo|stato piu piccolo|vaticano)/,"Il paese più piccolo del mondo è la Città del Vaticano, che è dentro Roma! 🇻🇦"],
[/(deserto piu grande|sahara)/,"Il deserto caldo più grande è il Sahara, in Africa: è grande quasi come tutta l'Europa! 🏜️"],
[/(regioni).*(italia|quant)|quante regioni/,"L'Italia ha 20 regioni! La più grande è la Sicilia, la più piccola la Valle d'Aosta. 🇮🇹"],
[/(abitanti|persone).*(mondo|terra)|quante persone ci sono/,"Sulla Terra vivono più di 8 miliardi di persone! 🌍"],
[/(abitanti|persone).*(italia)|quanti italiani/,"In Italia vivono circa 59 milioni di persone! 🇮🇹"],
[/(bandiera).*(italia|italiana)/,"La bandiera italiana è verde, bianca e rossa: il tricolore! 🇮🇹"],
[/(lombardia).*(capoluogo|capitale)/,"Il capoluogo della Lombardia è Milano! 🏙️"],
[/(polo nord|polo sud)/,"Ai poli fa freddissimo! Al Polo Nord c'è un mare ghiacciato con gli orsi polari, al Polo Sud un continente di ghiaccio con i pinguini. 🧊"],
// --- storia e inventori ---
[/(chi).*(inventat|invent).*(lampadin)|lampadina/,"La lampadina che si usa per tanti anni l'ha resa famosa Thomas Edison, nel 1879! 💡"],
[/(chi).*(invent).*(telefono)|chi ha inventato il telefono/,"Il telefono lo hanno inventato Antonio Meucci, un italiano, e Alexander Graham Bell! 📞"],
[/(chi).*(invent).*(radio)/,"La radio l'ha inventata Guglielmo Marconi, un italiano! 📻"],
[/(chi).*(invent).*(pila|batteria)/,"La pila l'ha inventata Alessandro Volta, di Como! Per questo si dice \"volt\". 🔋"],
[/(chi).*(invent).*(aere)|fratelli wright/,"Il primo aereo a motore l'hanno fatto volare i fratelli Wright, nel 1903! ✈️"],
[/(chi).*(invent).*(ruota)/,"La ruota è stata inventata più di 5.000 anni fa, in Mesopotamia! 🛞"],
[/(chi).*(invent).*(pizza)/,"La pizza è nata a Napoli! La margherita ha i colori della bandiera: rosso, bianco e verde. 🍕"],
[/(chi).*(invent).*(internet|computer)/,"Il computer e internet li hanno inventati tanti scienziati insieme, nel Novecento. Il web l'ha inventato Tim Berners-Lee nel 1989! 💻"],
[/(cristoforo colombo|chi ha scoperto l america)/,"Cristoforo Colombo, un navigatore di Genova, arrivò in America nel 1492! ⛵"],
[/(leonardo da vinci)/,"Leonardo da Vinci era un genio: pittore della Gioconda, inventore e scienziato. Disegnava perfino macchine volanti, 500 anni fa! 🎨"],
[/(galileo)/,"Galileo Galilei puntò il cannocchiale verso il cielo e scoprì le lune di Giove! 🔭"],
[/(einstein)/,"Albert Einstein era uno scienziato famosissimo: ha scoperto come funzionano lo spazio e il tempo! 🧠"],
[/(gioconda|monna lisa)/,"La Gioconda l'ha dipinta Leonardo da Vinci ed è al museo del Louvre, a Parigi! 🖼️"],
[/(romani|antica roma|giulio cesare)/,"Gli antichi Romani costruirono strade, acquedotti e il Colosseo! Giulio Cesare fu uno dei loro capi più famosi. 🏛️"],
[/(chi ha fondato roma|romolo)/,"Secondo la leggenda Roma l'ha fondata Romolo nel 753 avanti Cristo, cresciuto con il fratello Remo da una lupa! 🐺"],
[/(cavalier|castell).*(medioevo)|medioevo/,"Nel Medioevo c'erano castelli, cavalieri con l'armatura e re e regine! 🏰"],
[/(garibaldi|unita d italia)/,"L'Italia è diventata un unico paese nel 1861! Giuseppe Garibaldi con i suoi Mille aiutò molto. 🇮🇹"],
[/(egizi|faraon|mummi)/,"Gli antichi Egizi costruirono le piramidi e scrivevano con i geroglifici, piccoli disegni! 🏺"],
// --- scuola, numeri, tempo ---
[/(giorni).*(settimana)/,"I giorni della settimana sono 7: lunedì, martedì, mercoledì, giovedì, venerdì, sabato e domenica! 📅"],
[/(mesi).*(anno)|quanti mesi/,"I mesi dell'anno sono 12, da gennaio a dicembre! 📅"],
[/(giorni).*(anno)|quanti giorni ha un anno/,"Un anno ha 365 giorni, e 366 negli anni bisestili, ogni 4 anni! 📅"],
[/(ore).*(giorno)|quante ore ha un giorno/,"Un giorno ha 24 ore, un'ora ha 60 minuti e un minuto ha 60 secondi! ⏰"],
[/(minuti).*(ora)/,"Un'ora ha 60 minuti! ⏰"],
[/(lettere).*(alfabeto)|alfabeto/,"L'alfabeto italiano ha 21 lettere; con J, K, W, X e Y diventano 26! 🔤"],
[/(numero piu grande|qual e l ultimo numero|numeri finiscono)/,"I numeri non finiscono mai: puoi sempre aggiungere 1! Si dice che sono infiniti. ♾️"],
[/(pi greco)/,"Il pi greco è circa 3,14: serve a calcolare quanto è lungo un cerchio! ⭕"],
[/(tabellin)/,"Le tabelline si imparano un po' alla volta: per esempio 7 per 8 fa 56! Cantarle aiuta a ricordarle. 🎵"],
[/(stagioni).*(quant|quali|sono)/,"Le stagioni sono 4: primavera, estate, autunno e inverno! 🌸☀️🍂❄️"],
[/(colori).*(primari)/,"I colori primari sono rosso, giallo e blu: mescolandoli si fanno tutti gli altri! 🎨"],
[/(blu e giallo|giallo e blu)/,"Blu e giallo insieme fanno il verde! 🎨"],
[/(rosso e giallo|giallo e rosso)/,"Rosso e giallo insieme fanno l'arancione! 🎨"],
[/(rosso e blu|blu e rosso)/,"Rosso e blu insieme fanno il viola! 🎨"],
[/(bianco e nero|nero e bianco)/,"Bianco e nero insieme fanno il grigio! 🎨"],
[/(lingue).*(mondo|quant)/,"Nel mondo si parlano circa 7.000 lingue! La più parlata è l'inglese, e poi il cinese. 🗣️"],
[/(come si dice).*(inglese)/,"In inglese \"ciao\" si dice \"hello\", \"grazie\" si dice \"thank you\" e \"gatto\" si dice \"cat\"! Quale parola vuoi sapere? 🇬🇧"],
// --- sport, cibo, feste, tecnologia ---
[/(calciator).*(squadra)|quanti giocatori.*calcio/,"Una squadra di calcio ha 11 giocatori in campo, compreso il portiere! ⚽"],
[/(olimpiad)/,"Le Olimpiadi si fanno ogni 4 anni e i 5 cerchi colorati rappresentano i continenti uniti! 🥇"],
[/(mondiali).*(italia|vinto)|quanti mondiali/,"L'Italia ha vinto 4 Mondiali di calcio: nel 1934, 1938, 1982 e 2006! 🏆"],
[/(pasta).*(come si fa|fatta)|come si fa la pasta/,"La pasta si fa con farina di grano e acqua, a volte con le uova! 🍝"],
[/(pane).*(come si fa|fatto)|come si fa il pane/,"Il pane si fa con farina, acqua, sale e lievito: il lievito lo fa gonfiare! 🍞"],
[/(gelato).*(come si fa|fatto|inventat)/,"Il gelato si fa con latte, zucchero e frutta o cioccolato, mescolati mentre si raffreddano! 🍦"],
[/(cioccolat).*(come si fa|da dove|fatto)/,"Il cioccolato si fa con i semi di cacao, che crescono su un albero dei paesi caldi! 🍫"],
[/(pomodor).*(frutta|verdura)/,"Per gli scienziati il pomodoro è un frutto, perché ha i semi dentro! In cucina però lo usiamo come verdura. 🍅"],
[/(babbo natale)/,"Babbo Natale vive al Polo Nord con le renne e gli elfi, e la notte di Natale porta i regali ai bambini buoni! 🎅"],
[/(befana)/,"La Befana arriva il 6 gennaio sulla scopa e lascia dolci nella calza ai bambini buoni… e carbone a quelli birichini! 🧹"],
[/(pasqua)/,"A Pasqua si regalano le uova di cioccolato con la sorpresa dentro! 🥚"],
[/(halloween)/,"Ad Halloween, il 31 ottobre, ci si traveste e si dice \"dolcetto o scherzetto\"! 🎃"],
[/(carnevale)/,"A Carnevale ci si mette la maschera, si lanciano coriandoli e si mangiano le chiacchiere! 🎭"],
[/(quando e natale|natale e il)/,"Natale è il 25 dicembre! 🎄"],
[/(come funziona).*(telefono|cellulare)/,"Il telefono trasforma la voce in onde invisibili che viaggiano nell'aria fino a un'antenna, e poi al telefono del tuo amico! 📱"],
[/(come funziona).*(internet)/,"Internet è una rete enorme di computer collegati tra loro con cavi e onde: così le informazioni girano per tutto il mondo in un attimo! 🌐"],
[/(come vola|perche vola).*(aere)/,"L'aereo vola perché le ali sono fatte in modo che l'aria spinga verso l'alto mentre i motori lo fanno andare veloce! ✈️"],
[/(robot)/,"I robot sono macchine che seguono le istruzioni di un programma. Alcuni puliscono casa, altri esplorano Marte! 🤖"],
[/(arcobaleno|unicorn)/,"Gli unicorni sono animali delle favole, con un corno magico! Non esistono davvero, ma sono bellissimi da disegnare. 🦄"],
[/(drago|draghi)/,"I draghi esistono solo nelle storie! Però esiste il drago di Komodo, una lucertola gigante lunga 3 metri. 🐉"],
[/(fantasm)/,"I fantasmi esistono solo nelle storie per fare un po' di paura! Non c'è niente da temere. 👻"],
[/(mostri).*(esistono|sotto il letto)/,"I mostri non esistono! Sotto il letto al massimo ci sono calzini persi. 😄"],
];
// parole: risposta a "cos'è X"
const DIZ9={
 sole:"è la stella più vicina a noi, che ci dà luce e calore ☀️",luna:"è il satellite della Terra: ci gira intorno in circa un mese 🌙",
 vulcano:"è una montagna da cui esce la lava 🌋",isola:"è un pezzo di terra circondato dall'acqua 🏝️",penisola:"è una terra circondata dall'acqua su tre lati, come l'Italia 🇮🇹",
 fiume:"è acqua che scorre dalla montagna fino al mare 🏞️",lago:"è una grande distesa d'acqua dolce circondata da terra 🏞️",
 democrazia:"è quando il popolo sceglie chi governa, votando 🗳️",tasse:"sono i soldi che tutti danno allo Stato per pagare scuole, ospedali e strade 🏫",
 banca:"è il posto dove si tengono i soldi al sicuro 🏦",mutuo:"è un prestito della banca per comprare la casa, da restituire un po' ogni mese 🏠",
 stipendio:"sono i soldi che si guadagnano lavorando, ogni mese 💶",pensione:"sono i soldi che si ricevono da anziani, dopo aver lavorato tanti anni 👵",
 virus:"è un microbo piccolissimo che può farci ammalare 🦠",batteri:"sono esseri piccolissimi: alcuni ci fanno bene, altri ci fanno ammalare 🦠",
 dna:"è come il libretto di istruzioni del corpo, dentro ogni cellula 🧬",cellula:"è il mattoncino piccolissimo di cui sono fatti tutti gli esseri viventi 🔬",
 atomo:"è il pezzettino più piccolo della materia: tutto è fatto di atomi ⚛️",ossigeno:"è il gas dell'aria che respiriamo per vivere 🌬️",
 fotosintesi:"è il modo in cui le piante fanno il loro cibo con la luce del sole 🌿",gravita:"è la forza che tira le cose verso terra 🍎",
 pianeta:"è un grande corpo rotondo che gira intorno a una stella, come la Terra 🌍",galassia:"è un gruppo enorme di miliardi di stelle: la nostra si chiama Via Lattea 🌌",
 robot:"è una macchina che fa cose da sola seguendo un programma 🤖",computer:"è una macchina che fa calcoli velocissimi e ci aiuta a scrivere, giocare e studiare 💻",
 internet:"è la rete che collega tutti i computer del mondo 🌐",app:"è un programma che usi sul telefono o sul tablet 📱",
 museo:"è un posto dove si conservano opere d'arte e oggetti antichi 🖼️",biblioteca:"è un posto pieno di libri che puoi leggere o prendere in prestito 📚",
 sindaco:"è chi guida il comune, cioè la città 🏛️",presidente:"è chi rappresenta tutto il paese 🇮🇹",
 amicizia:"è voler bene a qualcuno, aiutarsi e divertirsi insieme 💛",felicita:"è quella sensazione bella che ti fa sorridere dentro 😊",
 coraggio:"è fare una cosa giusta anche quando un po' hai paura 💪",pazienza:"è saper aspettare senza arrabbiarsi 🐢",
 rispetto:"è trattare gli altri come vorresti essere trattato tu 🤝",gentilezza:"è fare cose belle per gli altri 💐",
 noia:"è quando non sai cosa fare… ma è proprio lì che nascono le idee migliori! 💡",
 matematica:"è la materia dei numeri, delle forme e dei calcoli 🔢",storia:"è la materia che racconta cosa è successo nel passato 🏛️",
 geografia:"è la materia che studia la Terra, i paesi, i fiumi e le montagne 🗺️",scienze:"è la materia che studia la natura, gli animali e il corpo 🔬",
 dinosauro:"è un grande rettile vissuto milioni di anni fa 🦖",mammifero:"è un animale che allatta i suoi piccoli, come noi, i cani e le balene 🐄",
 rettile:"è un animale con le squame, come i serpenti, le lucertole e le tartarughe 🦎",anfibio:"è un animale che vive sia in acqua che sulla terra, come la rana 🐸",
 insetto:"è un piccolo animale con sei zampe, come l'ape e la formica 🐜",oceano:"è un mare enorme, grandissimo 🌊",deserto:"è un posto dove non piove quasi mai 🏜️",
 arcobaleno:"è un arco di 7 colori che appare quando c'è sole e pioggia insieme 🌈",terremoto:"è quando la terra trema 🏠",uragano:"è una tempesta enorme con vento fortissimo 🌀",
 calamita:"è un oggetto che attira il ferro 🧲",bussola:"è uno strumento con un ago che indica sempre il nord 🧭",telescopio:"è un tubo con le lenti per guardare le stelle lontane 🔭",
 microscopio:"è uno strumento per vedere le cose piccolissime 🔬",fossile:"è il resto di un animale o di una pianta antichissima rimasto nella roccia 🦴",
 euro:"è la moneta che usiamo in Italia e in tanti paesi d'Europa 💶","carta d identita":"è il documento che dice chi sei 🪪",patente:"è il permesso per guidare, che si prende dopo un esame 🚗",
 vaccino:"è una medicina che insegna al corpo a difendersi da una malattia 💉",allergia:"è quando il corpo reagisce troppo a una cosa, come il polline 🤧",
 compleanno:"è il giorno in cui sei nato: ogni anno si festeggia con la torta! 🎂",
 emoji:"sono le faccine e i disegnini che si usano nei messaggi 😄",
};
// gioco: persona "estesa" di ogni personaggio (sempre uguale per la stessa persona)
function pers9(n){const h=hsh((n.id||'x')+'#9'+(n.name||'')),pe=persona(n),f=!!(n.look&&n.look.f),grp=n.look?n.look.age:'adult',o=f?'a':'o',P=(a,k)=>a[((h>>>k)+k)%a.length];
  const adult=!(grp==='kid'||grp==='baby'||grp==='teen')&&pe.age>=22,par=n.role==='mamma'||n.role==='papa';
  const nk=par?1:adult?(h%4===0?0:1+(h>>>3)%3):0,kids=[];for(let i=0;i<nk;i++){const kf=((h>>>(5+i))&1)===1;kids.push({f:kf,n:P(kf?NOMI_F:NOMI_M,6+i*3)})}
  return Object.assign({},pe,{f,o,grp,adult,par,kids,
    sposat:par?true:adult&&h%5!==0,coniuge:n.role==='mamma'?S.papa:n.role==='papa'?S.mamma:P(f?NOMI_M:NOMI_F,8),
    pet:P(['un gatto che si chiama Micio','un cane che si chiama Fido','un pesciolino rosso che si chiama Bolla','un coniglio che si chiama Batuffolo','una tartaruga che si chiama Lenta','nessun animale, però mi piacerebbe un cane','un pappagallo che si chiama Pippo'],10),
    film:P(['i film di animazione con i pesciolini','i film di avventura con i pirati','i film comici, quelli che fanno ridere tanto','i film di fantascienza con le astronavi','i cartoni con gli animali che parlano'],12),
    music:P(['la musica pop','le canzoni italiane','la musica classica, tipo Mozart','il rock','le canzoni dei cartoni'],14),
    stag:P(['la primavera, con i fiori','l\'estate, per il mare','l\'autunno, con le foglie colorate','l\'inverno, per la neve e il Natale'],16),
    mat:P(['matematica','storia','scienze','geografia','arte','educazione fisica','musica','italiano'],18),
    libro:P(['Pinocchio','Il Piccolo Principe','Harry Potter','Matilde','Il GGG','Le avventure di Tom Sawyer','Alice nel Paese delle Meraviglie'],20),
    sogno:P(['fare il giro del mondo','vedere l\'aurora boreale','imparare a suonare il pianoforte','salire su una mongolfiera','aprire una pasticceria','vedere le balene dal vivo'],22),
    paura:P(['i ragni','il buio','i temporali forti','le altezze','i cani grandi','le montagne russe'],24),
    giorno:1+((h>>>4)%28),madre:P(NOMI_F,26),padre:P(NOMI_M,27)})}
function bday9(){if(!S.bday9){const h=hsh((S.name||'')+(S.surname||'')+'bd');S.bday9={g:1+h%28,m:(h>>>5)%12}}return S.bday9}
const cap9=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
// risposte "personali" che hanno sempre la precedenza (non hanno effetti sul gioco)
function prio9(n,t){const p=pers9(n),par=p.par,o=p.o,a=S.age,kid=p.grp==='kid'||p.grp==='baby';let m;
  const pk=arr=>pickNo(n,arr);
  // fatti del giocatore
  if(/\b(quanti anni ho|che eta ho|la mia eta)\b/.test(t))return par?`Hai ${a} anni, amore! Come passa in fretta il tempo… 🥹`:`Hai ${a} anni${a<1?'… sei piccolissim'+(S.sex==='f'?'a':'o')+'!':'!'} 😊`;
  if(/\b(come mi chiamo|sai come mi chiamo|qual e il mio nome|ti ricordi il mio nome|il mio nome)\b/.test(t))return par?`Ti chiami ${S.name}! Il nome l'abbiamo scelto io e ${n.role==='mamma'?'papà':'la mamma'}. ❤️`:`Ti chiami ${S.name}! Come potrei dimenticarlo? 😄`;
  if(/\b(quanti soldi ho|quanto ho in banca|quanti euro ho|i miei soldi)\b/.test(t)){const w=Math.round(S.money||0),b=Math.round(S.bank||0);return `Hai ${w} € in tasca${b?` e ${b} € in banca`:''}! ${w+b>100?'Bravo a risparmiare! 💰':'Un po\' alla volta si mettono da parte! 🐷'}`}
  if(/\b(quando|che giorno) (e|e il|cade il) (il )?mio compleanno|quando compio gli anni|quando faccio gli anni/.test(t)){const b=bday9();return `Il tuo compleanno è il ${b.g} ${P_MESI[b.m]}! ${par?'Come potrei dimenticarlo? 🎂':'Me lo segno, così ti faccio gli auguri! 🎂'} Compirai ${a+1} anni.`}
  if(/\b(dove abito|dove vivo|in che citta (abito|vivo|sono))\b/.test(t)&&typeof S.city==='string')return `Abiti a ${S.city}! ${S.home==='genitori'?'Con mamma e papà.':'Nella tua casa.'} 🏠`;
  if(/\b(che lavoro faccio|qual e il mio lavoro)\b/.test(t)){const j=S.job&&typeof JOBS!=='undefined'&&JOBS.find(x=>x.id===S.job.id);return j?`Fai ${j.n||j.nome||'un lavoro importante'}! 💼`:a<19?'Tu vai ancora a scuola: il tuo lavoro è imparare! 📚':'Adesso non hai un lavoro: cercalo in agenzia! 💼'}
  if((m=t.match(/\bcome si chiama (?:la )?(?:mia|il mio|mio) (mamma|papa|madre|padre|migliore amic[oa])\b/))){const w=m[1];return /mamma|madre/.test(w)?(n.role==='mamma'?`Sono io, ${S.mamma}! 😄`:`Tua mamma si chiama ${S.mamma}!`):/papa|padre/.test(w)?(n.role==='papa'?`Sono io, ${S.papa}! 😄`:`Tuo papà si chiama ${S.papa}!`):`${cap9(S.bffF?'la tua migliore amica':'il tuo migliore amico')} è ${S.bff}! 🤝`}
  // amore dei genitori
  if(par&&/\b(mi vuoi bene|mi ami|ti voglio bene|ti amo|vuoi bene a me)\b/.test(t)){relGain(n,3);return pk([`Ti voglio bene più di ogni cosa al mondo, ${S.name}! ❤️`,'Tantissimo! Più delle stelle del cielo! 🌟❤️','Certo, amore mio! Sempre, anche quando faccio la voce grossa. 🤗'])}
  if(!par&&/\b(mi vuoi bene|ti voglio bene|siamo amici|sono tu[oa] amic[oa]|ti sto simpatic)\b/.test(t)){relGain(n,3);const r=S.rel[n.id]||0;return r>=40?pk(['Certo! Ti voglio un mondo di bene! 💛','Sei un'+(S.sex==='f'?'a':'')+' amic'+(S.sex==='f'?'a':'o')+' speciale per me! 🤗']):pk(['Sì, mi stai molto simpatic'+(S.sex==='f'?'a':'o')+'! Più parliamo e più diventiamo amici. 😊','Certo che sì! Sei proprio gentile. 💛'])}
  // famiglia del personaggio
  if(/\b(tuo figlio|tua figlia|tuoi figli|hai (dei |un |una )?(figli|figlio|figlia|bambini)|quanti figli)\b/.test(t)){
    if(par)return `${S.sex==='f'?'Mia figlia':'Mio figlio'} sei tu, ${S.name}! ${S.kids&&S.kids.length?'':'E sei il regalo più bello della mia vita. ❤️'}`;
    if(!p.kids.length)return kid?'Io? Sono ancora piccol'+o+', non ho figli! 😂 Ho però '+(p.fra?p.fra+(p.fra>1?' fratelli':' fratello'):'tanti amici')+'.':'No, non ho figli… ma ho '+p.pet+'! 😊';
    const ks=p.kids.map(k=>`${k.f?'una figlia':'un figlio'}, ${k.n}`),nm=p.kids.map(k=>k.n),nf=p.kids.filter(k=>k.f).length;return p.kids.length===1?`Sì, ho ${ks[0]}! ${p.kids[0].f?'È bravissima':'È bravissimo'} a ${P_HOB.kid[hsh(p.kids[0].n)%P_HOB.kid.length]}. 😊`:`Sì, ho ${p.kids.length} ${nf===p.kids.length?'figlie':'figli'}: ${nm.slice(0,-1).join(', ')} e ${nm[nm.length-1]}! Una bella famiglia. 😄`}
  if(/\b(tuo marito|tua moglie|sei sposat|hai (un )?(marito|moglie|fidanzat)|sei fidanzat)\b/.test(t)){
    if(kid)return pk(['Ma che dici! Sono piccol'+o+'! 😂','Bleah, i fidanzati! Io penso a giocare! 😝']);
    return p.sposat?`Sì! ${p.f?'Mio marito':'Mia moglie'} si chiama ${p.coniuge}. ${p.f?'È':'È'} una persona speciale. 💞`:'No, non sono sposat'+o+'. Per adesso sto bene così! 😊'}
  if(/\b(tua mamma|tua madre|tuo papa|tuo padre|i tuoi genitori|tua nonna|tuo nonno)\b/.test(t)){
    if(par&&/nonn/.test(t))return `I tuoi nonni ti adorano! Andiamo a trovarli presto. 👵👴`;
    if(par)return `${/mamma|madre/.test(t)?'Mia mamma si chiama '+p.madre:'Mio papà si chiama '+p.padre}: sono i tuoi nonni! Ti vogliono un mondo di bene. 👵👴`;
    return `${/mamma|madre/.test(t)?'Mia mamma si chiama '+p.madre:/papa|padre/.test(t)?'Mio papà si chiama '+p.padre:'I miei genitori si chiamano '+p.madre+' e '+p.padre}! ${kid?'Mi aspettano a casa per cena. 🍝':'Li vado a trovare ogni domenica. 😊'}`}
  if(/\b(hai (dei |un |una )?(fratell|sorell)|quanti fratelli|tuo fratello|tua sorella)\b/.test(t))return par?`Sì, ho ${p.fra?p.fra+(p.fra>1?' fratelli: sono i tuoi zii':' fratello: è tuo zio'):'una sorella: è tua zia'}! 😊`:p.fra?`Sì, ho ${p.fra} ${p.fra>1?'fratelli':'fratello'}! A volte litighiamo, ma ci vogliamo bene. 😄`:'No, sono figli'+o+' unic'+o+'! Però ho tanti cugini. 😊';
  if(/\b(hai (un |una |degli )?(animal|cane|gatto|pesce|cucciol)|hai animali)\b/.test(t))return `Ho ${p.pet}! 🐾`;
  // gusti
  if(/\b(film|cartone) preferit|che film ti piace|ti piacciono i film\b/.test(t))return `Mi piacciono ${p.film}! 🎬 E a te?`;
  if(/\b(musica|canzone|cantante) preferit|che musica ascolti|che musica ti piace/.test(t))return `Ascolto ${p.music}! 🎵 Tu cosa ascolti?`;
  if(/\bstagione preferit|che stagione ti piace/.test(t))return `Preferisco ${p.stag}! 🌸`;
  if(/\bmateria preferit|che materia ti piace/.test(t))return `${kid||p.grp==='teen'?'La mia':'Da piccol'+o+' la mia'} materia preferita ${kid||p.grp==='teen'?'è':'era'} ${p.mat}! 📚`;
  if(/\blibro preferit|che libro (ti piace|leggi)/.test(t))return `Il mio libro preferito è "${p.libro}"! 📖 L'hai letto?`;
  if(/\b(animale preferit|che animale ti piace)\b/.test(t))return `Adoro ${p.anim}! 🐾`;
  if(/\b(cibo preferit|piatto preferit|cosa ti piace mangiare|che cosa mangi)\b/.test(t))return `Il mio piatto preferito è ${p.cibo}! 😋`;
  if(/\b(sport preferit|che sport (fai|ti piace))\b/.test(t))return `Mi piace ${p.sport}! ${kid?'Lo faccio con i miei amici.':'Lo guardo e, quando posso, lo pratico.'} 🏅`;
  if(/\b(qual e il tuo sogno|cosa sogni|il tuo desiderio|cosa vorresti fare)\b/.test(t))return `Il mio sogno è ${p.sogno}! ✨ E il tuo?`;
  if(/\b(di cosa hai paura|hai paura di|cosa ti fa paura)\b/.test(t))return `Un po' mi fanno paura ${p.paura}… ma con un amico vicino ho meno paura! 😅`;
  if(/\b(quando (e|fai) il tuo compleanno|quando compi gli anni|il tuo compleanno)\b/.test(t))return par?`Il mio compleanno è il ${p.giorno} ${p.mese}! Mi fai un disegno? 🎂`:`Il ${p.giorno} ${p.mese}! Se vuoi, festeggiamo insieme. 🎂`;
  if(/\b(dove (abiti|vivi)|dov e casa tua)\b/.test(t))return par?'Abitiamo insieme, sciocchino! 😄🏠':kid?'Abito vicino alla scuola, in una casa con il giardino! 🏡':`Abito qui in città${typeof S.city==='string'?', a '+S.city:''}, in un appartamento vicino al parco! 🏠`;
  if(/\b(ti piace (il tuo|fare il|il) lavoro|sei content[oa] del tuo lavoro)\b/.test(t))return kid?'Il mio lavoro è andare a scuola… e giocare! 😂':par?`Sì, mi piace fare ${p.job.replace(/^(il|la|lo|l')\s?/,'')}! Ma la cosa più bella è tornare a casa da te. ❤️`:pk(['Sì, tanto! Ogni giorno conosco persone nuove, come te. 😊','Mi piace! A volte è faticoso, ma mi dà soddisfazione. 💪']);
  // piani: domani / ieri / weekend
  if((m=t.match(/\b(cosa|che cosa|che|dove) (fai|farai|facciamo|faremo|hai fatto|abbiamo fatto|hai mangiato|vai|andrai|andate|andiamo|sei andat[oa]) (?:di bello )?(domani|stasera|oggi pomeriggio|ieri|lunedi|martedi|mercoledi|giovedi|venerdi|sabato|domenica|nel (?:fine settimana|weekend)|il (?:fine settimana|weekend)|per natale|in vacanza|quest estate|d estate)\b/))){const q=m[3];
    if(q==='ieri')return /mangiat/.test(m[2])?`Ieri ho mangiato ${p.cibo}! 😋`:kid?pk(['Ieri ho giocato al parco e poi ho fatto i compiti! 🛝','Ieri sono andat'+o+' in bici con i miei amici! 🚲']):par?'Ieri? Ho lavorato, ho fatto la spesa e poi ho pensato a te! 😊':pk(['Ieri ho lavorato tanto, e la sera mi sono riposat'+o+' sul divano. 🛋️',`Ieri ho passato la serata a ${p.hob}! 😊`]);
    if(/stasera/.test(q))return par?pk(['Stasera ceniamo tutti insieme e poi leggiamo una storia! 📖','Stasera ti preparo '+p.cibo+'! 😋']):kid?'Stasera ceno e poi guardo un cartone! 📺':`Stasera vado a casa e mi rilasso: forse ${p.hob}. 😊`;
    if(/natale/.test(q))return 'A Natale facciamo l\'albero, il pranzo con tutta la famiglia e apriamo i regali! 🎄🎁';
    if(/vacanz|estate/.test(q))return pk(['Quest\'estate vado al mare! Costruirò castelli di sabbia. 🏖️','Vado in montagna a camminare nei boschi! 🏔️','Vorrei andare al lago, a fare il bagno! 🏞️']);
    if(/^(lunedi|martedi|mercoledi|giovedi|venerdi)$/.test(q))return par?`${cap9(q)} lavoro, e la sera stiamo insieme! 😊`:kid?`${cap9(q)} vado a scuola e poi ho ${p.sport.replace(/^(il|la|lo|l')\s?/,'')}! 🎒`:`${cap9(q)} lavoro, come sempre. Poi la sera mi dedico a ${p.hob}! 😊`;
    if(/sabato|domenica|weekend|fine settimana/.test(q))return par?pk(['Nel weekend andiamo al parco tutti insieme! 🌳','Domenica pranzo dai nonni! 🍝']):kid?pk(['Sabato vado a una festa di compleanno! 🎈','Nel weekend gioco tutto il giorno! ⚽']):pk([`Nel weekend mi riposo e mi dedico a ${p.hob}! 😊`,'Domenica faccio una gita in bicicletta! 🚲']);
    return par?pk(['Domani porto te a scuola e poi vado al lavoro! Il pomeriggio stiamo insieme. 😊','Domani faccio la spesa e preparo una sorpresa… ma non te la dico! 🤫']):kid?pk(['Domani vado a scuola, e dopo gioco al parco! 🎒','Domani ho la lezione di '+p.sport.replace(/^(il|la|lo|l')\s?/,'')+'! 🏅']):JOBDESC&&JOBDESC[n.role]?'Domani sono qui al lavoro, come sempre! Passa a trovarmi. 😊':pk([`Domani lavoro, poi la sera mi dedico a ${p.hob}! 😊`,'Domani ho una giornata piena, ma la sera mi riposo! 🛋️'])}
  // "chi è più forte, X o Y?"
  if((m=t.match(/chi e piu (\w+)(?: tra)?(?: un | una | il | la | lo | l )?([a-z ]{2,25}?) o (?:un |una |il |la |lo |l )?([a-z ]{2,25})\??$/))){const A=m[2].trim(),B=m[3].replace(/\?/g,'').trim(),c=hsh(A+B)%2?A:B,adj=m[1];
    if(/leone|tigre/.test(A+B)&&adj==='forte')return 'Secondo gli esperti la tigre è un po\' più grande e forte del leone! Ma il leone vive in gruppo, e in squadra è fortissimo. 🐯🦁';
    return pk([`Secondo me ${c}! Ma è una bella sfida. 😄`,`Io dico ${c}! Tu chi pensi che sia più ${adj}?`])}
  if(/\bchi e (piu|il piu|la piu) (\w+) (tra|fra) (me e te|te e me|noi)/.test(t))return par?'Tu, senza dubbio! Io ti ho insegnato tutto, ma tu stai già diventando più bravo di me! 😄❤️'.replace('bravo',S.sex==='f'?'brava':'bravo'):pk(['Tu, sicuramente! 😄','Mmm… pareggio! Facciamo una gara per scoprirlo? 🏁']);
  if(/\bqual e la cosa piu (bella|importante|preziosa)\b/.test(t))return par?'La cosa più bella del mondo? Sei tu! ❤️ E poi stare tutti insieme in famiglia.':'Per me la cosa più bella del mondo è stare con le persone a cui vuoi bene! ❤️ E per te?';
  if(/\bqual e la cosa piu (brutta|difficile)\b/.test(t))return 'Per me la cosa più difficile è dire «scusa» quando si sbaglia… ma è anche una cosa bellissima quando ci si riesce! 💛';
  if((m=t.match(/come si (?:dice|scrive) (?:la parola )?(?:il |la |lo |l |un |una )?([a-z]+) in inglese/))){const w=m[1],X={ciao:'hello',grazie:'thank you',prego:'you\'re welcome',si:'yes',no:'no',casa:'house',scuola:'school',amico:'friend',amica:'friend',mamma:'mum',papa:'dad',acqua:'water',sole:'sun',luna:'moon',rosso:'red',blu:'blue',verde:'green',giallo:'yellow',nero:'black',bianco:'white',uno:'one',due:'two',tre:'three',quattro:'four',cinque:'five',pane:'bread',latte:'milk',mela:'apple',libro:'book',macchina:'car',albero:'tree',fiore:'flower',uccello:'bird',pesce:'fish',cavallo:'horse',topo:'mouse',buongiorno:'good morning',buonanotte:'good night'},d=(typeof DICT!=='undefined'&&DICT.find(x=>x[0]===w));const en=d?d[1]:X[w];
    return en?`"${cap9(w)}" in inglese si dice "${en}"! 🇬🇧 Ripeti con me: ${en}!`:`"${cap9(w)}" in inglese non me lo ricordo a memoria! Però so che "gatto" si dice "cat" e "cane" si dice "dog". 🇬🇧`}
  if(/\b(cosa|che) (pensi|ne pensi) di me\b|\bti sono simpatic|\bcome ti sembro\b/.test(t))return par?'Penso che sei la cosa più bella che mi sia capitata! E sei bravo, curioso e simpatico. ❤️'.replace(/bravo/,'brav'+(S.sex==='f'?'a':'o')).replace(/curioso/,'curios'+(S.sex==='f'?'a':'o')).replace(/simpatico/,'simpatic'+(S.sex==='f'?'a':'o')):`Penso che sei proprio simpatic${S.sex==='f'?'a':'o'} e fai domande intelligenti! 😊`;
  if((m=t.match(/come (?:si diventa|faccio a diventare|posso diventare|si fa a diventare|si fa a fare) (?:un |una |il |la |lo |l )?([a-z ]{3,30}?)\s*\??$/))&&!/\b(tuo lavoro|come te)\b/.test(t)){const w=m[1];
    if(typeof JOB9!=='undefined')for(const [re,j] of JOB9)if(re.test(w)){const r=typeof jobPath9==='function'&&jobPath9(j);if(r)return r}
    if(/(ricc|famos|fort|bravo|brava|intelligent|grande)/.test(w))return `Per diventare ${w} ci vogliono impegno, pazienza e tanta voglia di imparare! Un pochino ogni giorno, e intanto divertiti. 💪`;
    return `Per diventare ${w} bisogna finire la scuola, poi fare un corso o un concorso apposta, e allenarsi tanto! Con impegno ce la puoi fare. 💪`}
  if(/\b(che gusto|quale gusto|che gelato) (mi consigli|e piu buono|prendo)|gusto preferit/.test(t))return n.role==='gelataio'?pickNo(n,['Ti consiglio il pistacchio: oggi è venuto buonissimo! 🍦','Prova fragola e cioccolato insieme: un classico! 🍓🍫','Il fiordilatte con la stracciatella non sbaglia mai! 🍦']):`Io prenderei ${pickNo(n,['cioccolato','fragola','pistacchio','nocciola','limone'])}! È il mio preferito. 🍦`;
  if(/\b(cosa vendi|cosa fai qui|di cosa ti occupi|cosa si fa qui|che cosa vendi)\b/.test(t)&&!par&&!kid){const d=JOBDESC[n.role];return d?(typeof d==='function'?d():d):`Faccio ${p.job}! Qui do una mano a chi passa. 😊`}
  // da grande
  if(/\b(cosa|che) (vuoi|farai|ti piacerebbe|vorresti) (fare )?(da grande|quando sarai grande)|che lavoro (vuoi|farai) (fare )?da grande/.test(t))return kid||p.grp==='teen'?`Da grande voglio ${p.sogno.replace(/^(fare|vedere|imparare|salire|aprire)/,m0=>m0)}… oppure fare ${pickNo(n,['l\'astronauta','il veterinario','la cuoca','il pompiere','la scienziata','il calciatore','la pittrice'])}! 🚀 E tu?`:par?`Io sono già grande! 😄 Il mio sogno adesso è vedere te felice. E magari ${p.sogno}! ✨`:`Io sono già grande! Da piccol${o} sognavo di fare ${pickNo(n,['l\'astronauta','il pilota','la ballerina','il cuoco','il veterinario'])}… ma il mio lavoro di adesso mi piace! E tu cosa vuoi fare? 😊`;
  // emozioni del giocatore
  if(/\b(ho paura|mi fa paura|mi fanno paura|sono spaventat)/.test(t))return par?'Vieni qui, ti abbraccio forte. 🤗 Io sono sempre vicino a te: accendiamo una lucina e la paura passa. ❤️':kid?'Anch\'io a volte ho paura! Però se stiamo insieme fa meno paura. Ti tengo la mano? 🤝':'È normale avere paura, capita a tutti! Respira piano piano: ci sono io qui con te. 💛';
  if(/\b(sono|mi sento) (triste|giu|sol[oa])\b|\bho pianto\b/.test(t))return par?'Oh, amore mio… 🫂 Vieni qui. Mi racconti cosa è successo? Insieme troviamo una soluzione. ❤️':kid?'Non essere triste! 🫂 Vuoi giocare con me? Così ti passa!':'Mi dispiace tanto. 🫂 Se ti va di raccontarmi cosa è successo, ti ascolto volentieri.';
  if(/\b(sono|mi sento) (arrabbiat[oa]|nervos[oa])\b/.test(t))return 'Capita! 😤 Prova a fare tre respiri profondi e a contare fino a dieci. Poi, se vuoi, mi racconti cosa ti ha fatto arrabbiare. 💛';
  // "meglio X o Y?"
  if((m=t.match(/(?:meglio|preferisci|ti piace di piu|cosa scegli|scegli) (?:il |la |lo |i |le |gli |l |un |una )?([a-z ]{2,25}?) o (?:il |la |lo |i |le |gli |l |un |una )?([a-z ]{2,25})\??$/))){const A=m[1].trim(),B=m[2].replace(/\?/g,'').trim(),c=hsh(n.id+A+B)%2?A:B;
    return pk([`Io scelgo ${c}! Mi piace di più. 😄 E tu?`,`Difficile… ma dico ${c}! 👍`,`${cap9(c)}, senza dubbio! 😁`])}
  // soldi in prestito (non genitori)
  if(!par&&/\b(mi presti|prestami|mi dai|mi regali) (\d+ )?(euro|soldi|€)/.test(t))return kid?pk(['Ho solo un paio di euro nel salvadanaio… li sto risparmiando per le figurine! 😅','Non ho soldi, sono piccol'+o+'! Però ti posso prestare una matita. ✏️']):'I soldi non si prestano così! Però puoi guadagnarli: aiutando, studiando e, da grande, lavorando. 💪';
  return null}
// risposte di sapere (fatti) e parole
function sapere9(n,t){
  for(const [re,ans] of KB9)if(re.test(t))return ans;
  if(typeof FACTS9!=='undefined')for(const [re,ans] of FACTS9)if(re.test(t))return typeof ans==='function'?ans():ans;
  const m=t.match(/^(?:ma |e |sai |mi dici )?(?:cos e|cosa e|che cos e|che cosa e|cosa vuol dire|cosa significa|che vuol dire)(?: la parola)? (?:un |una |il |la |lo |l |i |gli |le )?([a-z ]{2,30}?)\s*\??$/);
  if(m){const w=m[1].trim(),d=DIZ9[w]||DIZ9[w.replace(/i$/,'o')]||DIZ9[w.replace(/e$/,'a')];if(d)return `${cap9(w)} ${d}!`.replace('!!','!')}
  return null}
// risposta finale quando non si sa niente: mai rimandare ad altri
function fall9(n,t,raw){const p=pers9(n),o=p.o,pk=arr=>pickNo(n,arr),kid=p.grp==='kid'||p.grp==='baby',q=/\?\s*$/.test(raw.trim())||/^(perche|come|quando|dove|chi|cosa|che|quant|qual|sei|hai|ti|vuoi|puoi|posso|e vero|esiste)/.test(t);
  const stop=/^(perche|quando|quindi|allora|anche|sempre|tutto|tutti|molto|questo|questa|quello|quella|sono|siamo|hanno|fatto|essere|avere|come|cosa|dove|quanto|quanti|quante|secondo|piace|fare|fai|sai|vero)$/;
  const w=t.replace(/\?/g,'').split(' ').filter(x=>x.length>3&&!stop.test(x)),k=w.length?w[w.length-1]:'';
  let m;
  if((m=t.match(/^(?:ma )?perche (.{3,60})/))){const s=m[1].replace(/\?/g,'').trim();
    if(/(arrabbi|sgrid|urla|triste|piang|litig|offes|cattiv)/.test(s))return pk(['Quando qualcuno si arrabbia, di solito è perché è stanco o preoccupato, non perché non ti vuole bene. Parlarne con calma aiuta sempre! 💛','A volte le persone si arrabbiano perché hanno avuto una giornata difficile. Un abbraccio e due parole gentili fanno miracoli! 🤗']);
    if(/(mamma|papa|maestra|nonn|amic|bambin|persone|gente|adulti|grandi)/.test(s))return pk(['Perché ognuno ha i suoi motivi e il suo carattere! Il modo migliore per capirlo è parlarci insieme, con calma. 😊','Secondo me lo fanno per volerti bene e proteggerti, anche se a volte non sembra! 💛']);
    return pk([`Perché ${s}? Secondo me c'è un motivo naturale: nel mondo quasi tutto succede per una ragione, anche se non si vede subito! Tu che idea ti sei fatt${S.sex==='f'?'a':'o'}? 🤔`,/(animal|pianta|albero|fior|natura|cielo|mare|terra|acqua|sole|luna)/.test(s)?`Ottima domanda! In natura quasi tutto serve a qualcosa: secondo me è così perché aiuta a vivere meglio! 🌱`:`Secondo me è così perché ha un senso, anche se non si vede subito! Tu che idea ti sei fatt${S.sex==='f'?'a':'o'}? 🤔`,`Mmm, sinceramente non lo so di sicuro… però mi hai fatto venire la curiosità! Ci penso e poi ti dico. 😊`])}
  if(/^(sei|ti senti) /.test(t)){const neg=/(arrabbiat|triste|stanc|malat|cattiv|annoiat)/.test(t);return neg?pk(['No, per niente! Anzi, parlare con te mi mette di buon umore. 😊','Un pochino, ma ora che sei qui sto meglio! 💛']):pk(['Sì, direi proprio di sì! 😄','Un po\' sì! Grazie di averlo chiesto. 😊'])}
  if(/^(hai mai|sei mai)/.test(t))return pk(['Sì, una volta! È stato bellissimo. 😄','No, mai! Ma mi piacerebbe tanto. Tu sì?']);
  if(/^(vuoi|ti va)/.test(t))return pk(['Sì, volentieri! 😄','Certo, mi farebbe piacere! 🙌']);
  if(/^(puoi|potresti|mi aiuti)/.test(t))return pk(['Certo, ci provo! Dimmi cosa ti serve. 💪','Sì, se posso ti aiuto volentieri! 😊']);
  if(/^(posso|possiamo)/.test(t))return /(fuoco|coltell|da sol|di notte|scappare|strada)/.test(t)?'No, è pericoloso! Meglio di no. 😟':pk(['Sì, se è una cosa sicura, certo! 😊','Secondo me sì! Divertiti. 👍']);
  if(/^(e vero che|esiste|esistono)/.test(t))return pk(['Per quello che so io, sì! 😮','Mmm, ho sentito dire di sì!']);
  if(/^quant/.test(t))return pk([`Il numero preciso non lo so a memoria… ma secondo me ${/(anni|vive|dura)/.test(t)?'parecchi anni':'più di quanti pensi'}! 🔢`,`Non l'ho mai contato! Facciamo una stima: io dico tanti, ma tanti. 😄`]);
  if(/^dove/.test(t))return pk([k?`${cap9(k)}? Non ne sono sicur${o}, ma prova a guardare sulla cartina del telefono: la città è piena di posti! 🗺️`:'Guarda sulla cartina, la città è piena di posti! 🗺️']);
  if(/^quando/.test(t))return pk(['Presto, secondo me! Bisogna avere un pochino di pazienza. 😊','Non lo so il giorno preciso, ma arriverà! 📅']);
  if((m=t.match(/^come si (?:fa|fanno) (?:a )?(.{3,40})$/)))return pk([`Per ${m[1].replace(/\?/g,'').trim()} io farei così: prima guardi qualcuno di bravo, poi provi piano piano, e se sbagli riprovi. Si impara così! 💪`]);
  if(/^come/.test(t))return pk([`Secondo me si fa un passo alla volta: si prova, si sbaglia e si riprova! 💪`,`Non lo so di sicuro, ma io inizierei dalla cosa più facile e poi, piano piano, il resto! 😊`]);
  if(/^chi/.test(t))return pk(['Non lo so proprio! Tu lo conosci? Raccontami! 😊','Mmm, non mi viene in mente… ma sono curios'+o+'! Chi è?']);
  if(/^(cos e|cosa e|che cos e|cosa vuol dire|cosa significa)/.test(t))return `«${k||raw.trim()}»? Non conosco bene questa parola… me la spieghi tu? Così la imparo! 😊`;
  if(/^(cosa|che|qual)/.test(t))return pk([k?`Su «${k}» non ho una risposta sicura… ma mi piace che fai tante domande: è così che si diventa intelligenti! 🧠`:'Questa è difficile! Non ne sono sicur'+o+', ma mi piace che fai tante domande: è così che si diventa intelligenti! 🧠','Mmm, su questa non ho la risposta pronta! Però ci penso, e intanto ti dico la mia: secondo me la risposta giusta è quella più semplice. 😊']);
  if(q)return pk(['Secondo me sì! 😊','Io dico di sì! 👍','Mmm, ti rispondo sinceramente: non ne sono sicur'+o+', ma credo di sì. 😊']);
  return null}
function rispondi9(n,raw){const t=norm(raw);return prio9(n,t)||sapere9(n,t)||fall9(n,t,raw)}
// le risposte "deboli" o che rimandano ad altri vengono sostituite
const WEAK9=/Professor Ugo|biblioteca c'è un libro|signora Anna in biblioteca ha|Andiamo a cercarlo in biblioteca|Chiediamolo alla maestra|Prova a chiedere a mamma e papà|Bella domanda!( Tu|$| Secondo me è qui| Il numero)|Non lo so bene|^Boh|ne parliamo bene stasera|dipende da tante cose|Ci devo pensare|ci devo pensare|^Secondo me sì!$|Direi di no…|credo proprio di sì|Tu cosa (ne )?(dici|pensi|diresti)\??|parola difficile|in che senso\?|Stiamo diventando amici|Me lo chiedo anch|Quando sarai più grande capirai|Mmm, non lo so!|Mmm, non ne sono sicur|Forse perché sì|domanda da fare a mamma e papà|quando sarai un po' più grande|[Cc]hiedi(lo)? (alla|al) (maestra|prof|mamma|papà)/;
const STOP9=/^(perche|quando|quindi|allora|anche|sempre|tutto|tutti|molto|questo|questa|quello|quella|sono|siamo|hanno|fatto|essere|avere|come|cosa|dove|quanto|quanti|quante|quale|secondo|fare|fanno|sai|vero|devo|deve|posso|puoi|vuoi|dimmi|spiegami|qual|chi|che|una|uno|degli|delle|della|dello|nella|nello|sulla|sullo|tuoi|tuoi|mio|mia|tua|tuo)$/;
function isQ9(t,raw){return /\?\s*$/.test(raw.trim())||/^(perche|come|quanto|quanti|quante|quando|dove|chi|cosa|che cos|cos e|qual|esiste|esistono)\b/.test(t)}
const SAFE9=/(tempo|meteo|piove|nevica|ore|che ora|capitale|anni hai|ti chiami|chi sei|lavoro fai|\d|come stai|come va|stai bene|cosa fai|che fai|amic|ti piace|ti piacciono|costa|posso|mi (compri|porti|dai|presti|regali|aiuti|insegni|accompagni)|andiamo|vieni|giochiamo|missione|pacco|come si diventa|indovinell|barzellett|quiz|dove (e|si trova|sono|trovo)|dov e|come arrivo|come ci vado|aperto|chiuso|quanto manca|compit|interroga|voto|diploma|laurea|patente|scuola guida|lavoro|soldi|euro|banca|mutuo|casa|affitto|regalo|compleanno|festa|natale|ciao|buongiorno|buonasera|grazie|scusa|aiut|fame|sete|sonno|stanc)/;
function rel9(t,ans){const a=norm(ans||'');if(!a)return false;const ws=t.replace(/[?!]/g,'').split(' ').filter(x=>x.length>=4&&!STOP9.test(x));if(!ws.length)return true;
  return ws.some(w=>a.includes(w.slice(0,Math.max(4,w.length-2))))}
{const _r9=reply;reply=function(n,raw){const out=_r9.apply(this,arguments);try{
  if(!n||!out||typeof out.r!=='string'||['cane','pet','bebe'].includes(n.role))return out;
  const t=norm(raw);if(n.role==='figlio'&&S.kids&&S.kids[n.kid]&&S.age-S.kids[n.kid].nato<3)return out;
  const p=out.fx?null:prio9(n,t);if(p)return Object.assign({},out,{r:p});
  if(/\?\s*$/.test(raw.trim())||/^(perche|come|quanto|quanti|quante|quando|dove|chi|cosa|qual|cos e|che cos)/.test(t)){for(const [re,ans] of KB9)if(re.test(t)){if(out.r.indexOf(ans.slice(0,20))<0)return Object.assign({},out,{r:ans});break}}
  if(isQ9(t,raw)&&!SAFE9.test(t)&&!rel9(t,out.r)){const r=sapere9(n,t);if(r)return Object.assign({},out,{r})}
  if(WEAK9.test(out.r)){const r=sapere9(n,t)||fall9(n,t,raw);if(r)return Object.assign({},out,{r})}
 }catch(e){}return out}}
/* ---------- telefono: messaggi veri, a tono ---------- */
function phNpc9(id){let n=null;
  if(id.startsWith('n_'))n=NPCS.find(x=>x.id===id.slice(2));
  else if(id==='mamma'||id==='papa')n=NPCS.find(x=>x.role===id);
  if(n)return n;
  const kid=id.startsWith('kid')?S.kids[+id.slice(3)]:null;
  const f=id==='mamma'?true:id==='papa'?false:id==='bff'?!!S.bffF:id==='partner'?(S.partner&&S.partner.f!=null?!!S.partner.f:S.sex!=='f'):kid?!!kid.f:false;
  const name=id==='bff'?S.bff:id==='partner'?(S.partner&&S.partner.nome):kid?kid.nome:id==='capo'?'Il capo':id;
  const role=id==='bff'?'amico':id==='partner'?'amore':kid?'figlio':id;
  return {id:'ph_'+id,name,role,kid:kid?+id.slice(3):undefined,look:{f,age:id==='bff'?(S.age<13?'kid':S.age<19?'teen':'adult'):kid?(S.age-kid.nato<13?'kid':'teen'):'adult'}}}
const PH_INV9=[['cinema|film','al cinema','🎬'],['pizza|pizzeria','in pizzeria','🍕'],['gelato|gelateria','a prendere un gelato','🍦'],['parco|giardini','al parco','🌳'],['piscina|nuotare','in piscina','🏊'],['mare|spiaggia','al mare','🏖️'],['calcio|pallone|partita','a giocare a pallone','⚽'],['bici|bicicletta','a fare un giro in bici','🚲'],['centro|negozi|shopping','in centro','🛍️'],['museo','al museo','🖼️'],['festa','alla festa','🎉'],['casa mia|da me','a casa tua','🏠'],['giocare|gioco|videogioc','a giocare','🎮'],['passeggiata|giro','a fare un giro','🚶'],['cena|mangiare','a mangiare qualcosa','🍝']];
function phReply9(id,v){const n=phNpc9(id),t=norm(v),cv=phConv(id),p=pers9(n),o=p.o,par=id==='mamma'||id==='papa',kid=p.grp==='kid'||p.grp==='baby',pk=a=>pickNo(n,a),has=re=>re.test(t),me=S.name;
  const ctx=cv.ctx9=cv.ctx9||{};let m;
  // risposta al messaggio che ti avevano mandato loro
  const prev=cv.m.length>=2?cv.m[cv.m.length-2]:null;
  if(prev&&prev.t===0){const pool=phPool({id,rol:''}).find(x=>x[0]===prev.x);if(pool){
    if(/^(si|sisi|certo|ok|okay|va bene|volentieri|arrivo|dai|perche no|sicuro|benissimo|bene|tutti|si promesso)\b/.test(t))return pool[2][0];
    if(/^(no|nono|non posso|oggi no|non tanto|male|cosi cosi|uffa)\b/.test(t))return pool[2][1]||pool[2][0]}}
  if(!t)return pk(['😊','👍','❤️']);
  if(/^[\W\d_]+$/.test(v.replace(/\s/g,'')))return pk(['😄','Ahah 😂','❤️','😊👍']);
  // brutte parole
  if(has(/\b(stupid|scem|brutt|cretin|idiot|antipatic|ciccion)/))return 'Ehi, così mi fai rimanere male… 😕 Scrivimi una cosa gentile!';
  if(has(/\b(scusa|scusami|perdonami)\b/))return 'Tranquill'+(S.sex==='f'?'a':'o')+', è tutto a posto! 🤗';
  // dottoressa / dottore: salute
  if(/^(dottor|infermier)/.test(n.role||'')||id==='n_dottoressa'){
    const b=t.match(/(pancia|testa|gola|dente|denti|orecchio|occhio|schiena|gamba|braccio|piede|ginocchio|naso|tosse|raffreddor|febbre)/);
    if(b||has(/(male|dolore|sto male|malat|ferit|tagliat|caduto|caduta)/)){const w=b?b[1]:'';
      return w==='testa'?'Mi dispiace! 🤕 Bevi un bel bicchiere d\'acqua, riposati un po\' al buio e niente schermi per un po\'. Se tra qualche ora fa ancora male o hai la febbre, vieni in ambulatorio! 🩺'
       :w==='pancia'?'Povero pancino! 🤢 Mangia leggero, in bianco, e bevi a piccoli sorsi. Se peggiora vieni da me in ospedale. 🩺'
       :w==='gola'||w==='tosse'||w==='raffreddor'?'Bevi tè caldo con un cucchiaino di miele e copriti bene! 🍯 Se viene la febbre, riposo e vieni a farti vedere. 🩺'
       :w==='febbre'?'Con la febbre: riposo, tanta acqua e coperta! 🌡️ Fatti misurare la temperatura da un adulto e, se è alta, passa da me. 🩺'
       :/dent/.test(w)?'Ahi, il dente! 🦷 Sciacqua con acqua tiepida e lavati bene i denti. Poi ci vuole il dentista. 🪥'
       :/ginocchio|gamba|braccio|piede|caduto|caduta|ferit|tagliat/.test(t)?'Ahi! Lava la ferita con acqua, metti un cerotto e un po\' di ghiaccio se è gonfio. 🧊 Se non riesci a muoverlo, vieni subito in ospedale! 🩺'
       :'Mi dispiace che non stai bene! 😟 Dimmi dove ti fa male: testa, pancia, gola…? Intanto riposati e bevi acqua. 🩺'}
    if(has(/(sto meglio|passato|guarit|sto bene)/))return 'Che bella notizia! 🎉 Continua a riposare e a mangiare frutta e verdura. 🍎';
    if(has(/\bgrazie\b/))return 'Prego! Guarisci presto, e se serve scrivimi pure. 🩺💛';
    if(has(/(appuntamento|visita|quando posso venire|orari)/))return 'Vieni in ospedale quando vuoi durante il giorno: ti visito io! 🏥';
  }
  if(has(/\b(a che ora torni|quando torni|quando arrivi|a che ora arrivi)\b/))return pk(['Tra poco! Per cena sono a casa. 🍝','Verso le 7! ⏰']);
  {const qf=/\?/.test(v)||/^(perche|come|quanto|quanti|quante|chi|qual|cos e|che cos|cosa e)/.test(t);if(qf){for(const [re,ans] of KB9)if(re.test(t))return ans}}
  // inviti: cinema, pizza, parco…
  const inv=PH_INV9.find(([re])=>new RegExp('\\b('+re+')').test(t));
  if(inv&&has(/(andiamo|vieni|venite|ci vediamo|usciamo|facciamo|ti va|vuoi venire|andare|stasera|domani|oggi|sabato|domenica|insieme|ce la facciamo)/)){
    ctx.inv=inv[1];ctx.ic=inv[2];const when=has(/stasera/)?'stasera':has(/domani/)?'domani':has(/sabato/)?'sabato':has(/domenica/)?'domenica':'oggi';ctx.when=when;
    const ora=when==='stasera'?pk(['alle 8','alle 9','dopo cena, verso le 9']):pk(['alle 4','alle 3 e mezza','alle 5']);ctx.ora=ora;
    if(par)return S.age<12?pk([`Sì! Andiamo ${inv[1]} ${when==='oggi'?'oggi pomeriggio':when}, ti accompagno io! ${inv[2]}`,`Che bella idea! ${when==='stasera'?'Stasera':'Va bene,'} ${inv[1]} tutti insieme! ${inv[2]}❤️`]):`Va bene! Divertiti ${inv[1]}, e scrivimi quando arrivi! ${inv[2]}`;
    if(id==='capo')return 'Grazie dell\'invito! Magari dopo il lavoro. 😊';
    if(/cinema|film/.test(inv[0]))ctx.film=ctx.film||pk(['il nuovo film di animazione con i draghi','quello dei pirati','il film comico con il cane','il film sullo spazio']);
    return pk([`Sì!! Che bella idea! 🙌 Andiamo ${inv[1]} ${when}! Ci vediamo ${ora}?`,`Certo che vengo! ${inv[2]} ${cap9(when)} ${ora} va bene?`,`Evvai! ${inv[2]} Ci sto! ${cap9(when)} ${ora}, ok?`])+(ctx.film?` Potremmo vedere ${ctx.film}! 🎬`:'')}
  // dettagli dell'appuntamento già fissato
  if(ctx.inv){
    if(has(/(a che ora|che ora|quando|che orario)/))return `${cap9(ctx.ora||'alle 5')}! ⏰ Non fare tardi, eh! 😄`;
    if(has(/\b(dove|in che posto)\b/))return `Ci vediamo davanti all'ingresso, ${ctx.inv.replace(/^a (fare|giocare|prendere|mangiare)/,'per andare a $1')}! 📍`;
    if(has(/(che film|quale film|cosa vediamo)/))return `Io voterei per ${ctx.film||'il film di animazione nuovo'}! 🍿 Tu quale vorresti?`;
    if(has(/(chi (viene|c e)|viene anche|vengono)/))return pk(['Pensavo noi due, ma se vuoi chiamiamo anche qualcun altro! 😄','Vengono anche un paio di amici, così è più divertente! 🎉']);
    if(has(/\b(ok|va bene|perfetto|si|sisi|certo|daccordo|d accordo|ci sto)\b/)&&t.length<25)return pk([`Perfetto! Allora a ${ctx.when==='oggi'?'dopo':ctx.when}! 👋${ctx.ic||''}`,`Evviva, non vedo l'ora! ${ctx.ic||'😄'}`]);
    if(has(/\b(non posso|non riesco|annull|un altra volta|scusa)\b/)){const w=ctx.inv;ctx.inv=null;return `Peccato! 😕 Allora andiamo ${w} un'altra volta, va bene?`}
  }
  {const pr=prio9(n,t);if(pr)return pr}
  if(has(/^(veramente|davvero|sul serio|ma dai|davvero davvero)\b/)&&t.length<25)return pk(['Sì, davvero! 😄','Giuro! 🤞','Sì sì, proprio così! 😃']);
  if(has(/^(boh|mah|non so|non lo so|bho)\b/)&&t.length<20)return pk(['Ahah, nemmeno io! 😄 Che facciamo allora?','Tranquill'+(S.sex==='f'?'a':'o')+', ci pensiamo insieme! 🤔']);
  // saluti e stato d'animo
  if(has(/^(ciao|ehi|hey|salve|buongiorno|buonasera|hello)\b/)&&t.split(' ').length<=3)return par?pk([`Ciao ${me}! 😘 Tutto bene?`,'Ciao amore! Che bello leggerti! ❤️']):id==='capo'?'Buongiorno! Tutto bene? 💼':pk([`Ciao ${me}! 😄 Che fai?`,'Ehi! Che bello sentirti! 🙌','Ciao!! Stavo proprio pensando a te! 😊']);
  if(has(/\b(come stai|come va|tutto bene|stai bene)\b/))return pk([`Benissimo, grazie! ${kid?'Ho appena finito di giocare. ':''}E tu come stai? 😊`,`Tutto bene! ${par?'Sto preparando la cena. ':'Oggi è stata una bella giornata. '}E tu?`]);
  if(has(/^(bene|benissimo|tutto bene|alla grande|sto bene)\b/))return pk(['Sono content'+o+'! 😄','Che bello! 🌞','Grande! 💪']);
  if(has(/\b(sono|mi sento) (triste|giu|solo|sola)|\b(piango|ho pianto)\b/))return par?'Oh amore… 🫂 Vieni qui che ti abbraccio forte. Vuoi raccontarmi cosa è successo? Io ci sono sempre. ❤️':pk(['Mi dispiace… 🫂 Vuoi raccontarmi cosa è successo? Ti ascolto.','Ehi, ci sono io! 💛 Domani facciamo qualcosa di bello insieme, va bene?']);
  if(has(/\b(ho paura|mi fa paura|sono spaventat)/))return par?'Non avere paura, tesoro: io sono qui con te. Accendiamo una lucina e respiriamo piano insieme. 🌙❤️':'Tranquill'+(S.sex==='f'?'a':'o')+'! 💛 Respira piano piano. Se vuoi ti tengo compagnia qui in chat.';
  if(has(/\b(mi annoio|che noia|annoiat)/))return pk([`Facciamo qualcosa! Potresti ${p.hob}, oppure ci vediamo al parco! 🌳`,'Idea: disegna la cosa più strana che ti viene in mente e mandamela! 🎨','Io quando mi annoio vado in bici! 🚲 Vuoi venire?']);
  if(has(/\b(sono stanc|ho sonno)/))return par?'Allora a nanna presto stasera! 😴 Ti rimbocco le coperte.':'Riposati un po\'! 😴 Ci sentiamo dopo.';
  if(has(/\b(sono felice|sono content|evviva|che bello)\b/))return pk(['Che bello! Sono felice anch\'io! 🥳','Evviva! Mi fai sorridere! 😄']);
  if(has(/\b(ho vinto|ho preso (un )?(10|9|8|dieci|nove|otto|bel voto)|bel voto|sono stato promoss|sono stata promoss)/))return par?'Bravissim'+(S.sex==='f'?'a':'o')+'!!! 🎉 Sono così orgoglios'+o+' di te! Stasera festeggiamo! 🍰':pk(['Graaande!! 🏆 Sei fortissim'+(S.sex==='f'?'a':'o')+'!','Wow, complimenti!! 🎉']);
  if(has(/\b(ho preso (un )?(4|5|quattro|cinque|brutto voto)|brutto voto|ho sbagliato)/))return par?'Non ti preoccupare, capita a tutti! 💛 La prossima volta studiamo insieme e andrà meglio.':'Dai, capita! La prossima volta andrà meglio, ne sono sicur'+o+'! 💪';
  if(has(/\b(ti voglio bene|ti amo|mi manchi|ti adoro)\b|❤|💕|😘/))return par?pk(['Anch\'io ti voglio un mondo di bene! ❤️','Tantissimo, più di tutto! 🥰 Ci vediamo stasera.']):id==='partner'?pk(['Anche tu mi manchi! 💞 Non vedo l\'ora di vederti.','Ti amo anch\'io! 🥰']):pk(['Anch\'io ti voglio bene! 💛 Sei un'+(S.sex==='f'?'a':'')+' amic'+(S.sex==='f'?'a':'o')+' speciale.','Ooh, che carin'+(S.sex==='f'?'a':'o')+'! 🥰']);
  if(has(/\b(grazie)\b/))return pk(['Prego! 😊','Di niente! ❤️','Figurati! 😄']);
  if(has(/\b(buonanotte|notte|sogni d oro)\b/))return pk(['Buonanotte, sogni d\'oro! 🌙✨','Notte notte! 😴💤']);
  if(has(/\b(ciao ciao|a dopo|a domani|ci sentiamo|devo andare)\b/))return pk(['A dopo! 👋','Ciao ciao! 😘','Ci sentiamo! 👋']);
  if(has(/\b(cosa fai|che fai|che stai facendo|cosa stai facendo)\b/))return par?pk(['Sto preparando la cena! 🍝 Tu cosa fai?','Sto lavorando, ma per te ho sempre un minuto! 😊']):id==='capo'?'Sto preparando le riunioni di domani. 💼':kid?pk(['Sto giocando con i mattoncini! 🧱','Sto facendo i compiti… che noia! 📚']):pk([`Sto ${p.hob.replace(/^([a-z]+)re\b/,(x,y)=>y+'ndo').replace(/^anda/,'andando').replace(/arendo$/,'ando')}! 😊`,'Niente di speciale, mi riposo un po\'! 🛋️','Sono appena tornat'+o+' a casa! 🏠']);
  if(has(/\b(dove sei|dove stai)\b/))return par?'Sono a casa! Ti aspetto. 🏠':pk(['Sono a casa! 🏠','Sono al parco, vieni? 🌳','Sto tornando a casa! 🚶']);
  if(has(/\b(a che ora torni|quando torni|quando arrivi)\b/))return pk(['Tra poco! Per cena sono a casa. 🍝','Verso le 7! ⏰']);
  if(has(/\b(mi vieni a prendere|vieni a prendermi)\b/))return par?'Certo! Arrivo tra dieci minuti, aspettami davanti all\'ingresso. 🚗':'Arrivo! 🏃';
  if(has(/\b(ho fame|fame|cosa si mangia|cosa mangiamo|cena|pranzo|merenda)\b/))return par?pk([`Stasera ${p.cibo}! 😋`,'Ti preparo una bella merenda: pane e marmellata! 🍞']):pk(['Anch\'io ho fame! Prendiamo una pizza? 🍕','Gnam! Io mangerei '+p.cibo+'! 😋']);
  if(has(/\b(compiti|scuola|verifica|interrogazione|esame|studiare)\b/))return par?pk(['Prima i compiti e poi giochi, va bene? 📚 Se serve ti aiuto io!','Un pochino ogni giorno e vedrai che vai benissimo! 💪']):pk(['Anch\'io ho un sacco di compiti! 😩 Li facciamo insieme?','Forza, ce la fai! 💪 Poi mi racconti com\'è andata.']);
  if(has(/\b(soldi|euro|paghetta)\b/))return par?pk(['Ti meriti la paghetta se mi aiuti in casa! 😉','Mettili da parte nel salvadanaio! 🐷']):pk(['Io sto risparmiando per una bici nuova! 🚲','I soldi non li ho, ma le idee sì! 😄']);
  if(has(/\b(posso|mi lasci|mi fai) (uscire|andare|giocare|venire|stare)/))return par?(S.age<10?'Va bene, ma con un adulto vicino e torna per cena! 😉':'Va bene! Scrivimi quando arrivi. 📱'):'Certo! 😄';
  if(has(/(barzellett|fammi ridere|scherzo)/))return pk(['Sai perché il pomodoro non riesce a dormire? Perché l\'insalata… russa! 😂','Qual è il colmo per un elettricista? Fare le scintille a scuola! ⚡😂','Cosa fa un gatto sull\'albero? Il miao-tore! 😹']);
  if(has(/\b(ok|okay|va bene|daccordo|d accordo|perfetto|si|sisi)\b/)&&t.length<20)return pk(['👍','Perfetto! 😊','Ok! 😄']);
  if(has(/^(no|nono)\b/)&&t.length<15)return pk(['Va bene! 😊','Ok, come vuoi tu! 👍']);
  // ultima possibilità: il motore delle domande (senza effetti sul gioco)
  const r=prio9(n,t)||sapere9(n,t);if(r)return r;
  if(/\?/.test(v)||/^(perche|come|quando|dove|chi|cosa|che|quant|qual|sei|hai|ti|vuoi|puoi|posso)\b/.test(t))return fall9(n,t,v)||'Mmm, bella domanda! Ci penso un attimo e ti rispondo. 🤔';
  // racconti: risposta che riprende quello che hai scritto
  const w=t.split(' ').filter(x=>x.length>4&&!/^(perche|quando|quindi|allora|anche|sempre|tutto|tutti|molto|questo|questa|quello|quella|sono|siamo|hanno|fatto|essere|avere|oggi|domani)$/.test(x)),k=w.length?w[w.length-1]:'';
  if((m=t.match(/^(?:oggi )?(?:ho|abbiamo) (fatto|visto|giocato|mangiato|preso|vinto|comprato|trovato|incontrato|letto|disegnato|imparato) (.{2,40})$/)))return pk([`Che bello! Hai ${m[1]} ${m[2]}? Racconta, com'è stato? 😃`,`Wow! ${par?'Sono content'+o+' quando mi racconti queste cose! ❤️':'Anch\'io vorrei! 😄'}`]);
  return pk([k?`Ah, ${k}! Che bello, mi piace quando mi racconti le tue cose. 😊`:'Ahah, che forte! 😄',k?`Davvero? Dimmi di più su ${k}! 😃`:'Davvero? Dimmi di più! 😃',par?'Ti ascolto sempre volentieri, tesoro! ❤️':'Ahah, sei simpaticissim'+(S.sex==='f'?'a':'o')+'! 😂'])}
phReply=function(id,v){try{return phReply9(id,v)}catch(e){return 'Ok! 😊'}};
// più messaggi diversi che arrivano sul telefono
{const _pp9=phPool;phPool=function(c){const P=_pp9.apply(this,arguments);try{const a=S.age;
  if(c.id==='mamma'||c.id==='papa'){P.push(['Ti ho lasciato una sorpresa in cucina! 🍪',['Grazie!! ❤️','Cos\'è?'],['Di niente, amore! 😘','Biscotti appena sfornati! 🍪']]);P.push(['Stasera cosa vuoi per cena? 🍽️',['Pizza! 🍕','Pasta al pomodoro 🍝','Decidi tu!'],['Pizza sia! 🍕','Ottima scelta! 🍝','Allora sorpresa! 😉']]);
    P.push(['Ti voglio bene, '+S.name+'! ❤️',['Anch\'io! ❤️','Tantissimo! 🥰'],['🥰','❤️❤️❤️']]);if(a<14)P.push(['Hai messo la giacca? Fuori fa freschino! 🧥',['Sì!','Ops… no 😅'],['Bravo! 😊','Mettila subito, mi raccomando! 🧣']])}
  if(c.id==='bff'){P.push(['Ho imparato un trucco nuovo con la bici! 🚲 Te lo faccio vedere?',['Sì, fammi vedere!','Wow, insegnamelo!'],['Domani al parco! 😎','Va bene, ti insegno! 🙌']]);P.push(['Sai la barzelletta del pomodoro? 🍅',['No, raccontala!','Sì, fa ridere!'],['Perché il pomodoro non dorme? Perché l\'insalata russa! 😂','Ahah lo sapevo che la sapevi! 😂']]);
    P.push(['Ci vediamo al cinema stasera? 🎬',['Sì, che film vediamo?','Stasera non posso'],['Quello nuovo di animazione! 🍿 Alle 8!','Peccato, la prossima volta! 👋']]);P.push(['Ho una cosa bellissima da raccontarti! 😃',['Dimmi tutto!','Cosa?!'],['Ho visto un arcobaleno doppio! 🌈🌈','Ho trovato un pacco segreto! 📦']])}
  if(c.id==='partner'){P.push(['Stasera cenetta insieme? 🍝',['Sì! 😍','Prepari tu?'],['Evviva! Prenoto io. 💞','Sì, ti faccio una sorpresa! 😘']]);P.push(['Mi manchi! 💞',['Anche tu! ❤️','Ci vediamo presto!'],['🥰','Non vedo l\'ora! 😊']])}
  if(c.id.startsWith('kid')){P.push(['Ho preso un bel voto a scuola! 🌟',['Bravissimo!! 🎉','Sono fiero di te!'],['Grazie!! 😄','Ti voglio bene! ❤️']]);P.push(['Posso andare a casa di un amico? 🏠',['Sì, divertiti!','Oggi no, scusa'],['Evviva, grazie! 🙌','Uffa… va bene! 😅']])}
  if(c.id.startsWith('n_')){P.push(['Ti va di fare un giro in centro uno di questi giorni? 🛍️',['Sì, volentieri!','Magari più avanti'],['Fantastico! Ci sentiamo! 😄','Va bene, quando vuoi! 👋']]);P.push(['Ho pensato a te oggi: com\'è andata? 😊',['Benissimo!','Così così'],['Che bello! 🌞','Dai, domani va meglio! 💪']])}
  if(c.id==='capo'){P.push(['Domani c\'è una riunione alle 9. Ci sei? 📋',['Certo!','Arrivo puntuale'],['Perfetto, a domani! 💼','Ottimo! 👍']])}
 }catch(e){}return P}}
