/* ================= v9: domande al gioco ================= */
const HELP=[
 [/(guid|volante|guido io)/,()=>'🕹️ Quando sei in macchina con mamma o papà premi «Guido io» e trascini il dito: avanti, curve e retromarcia. Puoi anche avvicinarti a una macchina davanti a casa e premere «Guido io». Al semaforo rosso ci si ferma!'],
 [/(patent)/,()=>'🪪 La patente si prende alla scuola guida (nella concessionaria): il patentino a 14 anni, la patente A e B a 18. Tocca la lavagna della scuola guida.'],
 [/(soldi|guadagn|ricc|euro|paghetta)/,()=>'💶 Ogni obiettivo completato ti dà dei soldi 🎯. Da grande puoi lavorare negli uffici, o fare un lavoretto in gelateria o in pizzeria dai 16 anni. Se raccogli le monetine per terra guadagni qualcosina!'],
 [/(banca|conto|libretto|risparm)/,()=>'🏦 Dai 6 anni vai in banca e parla con la direttrice: ti apre il libretto di risparmio. I soldi in banca crescono un pochino ogni anno.'],
 [/(cas[ae] nuov|cambiare casa|compr\w* (una|la) casa|comprare (una|la) casa|villa|appartament)/,()=>'🏡 Vai all\'agenzia case e viaggi e dici alla signora Viola: «mio papà vuole comprare una casa». Scegli tu, e poi sulla mappa casa tua cambia!'],
 [/(macchin|auto)/,()=>'🚗 In concessionaria parla con il signor Gianni: «mio papà vuole comprare una macchina». Scegli modello e colore: potete avere fino a 4 macchine, parcheggiate davanti a casa.'],
 [/(vacanz|aereo|vol[oa]|aeroport|mare|isola|viaggi)/,()=>'✈️ All\'agenzia viaggi prenoti il volo. Poi arriva una notifica: toccala e vai all\'aeroporto (in basso a destra). Fai il check-in, vai al Gate 3 e sali sull\'aereo. Atterri a Marina di Lido: spiaggia, molo, parco e tanti negozi!'],
 [/(obiettiv|missio)/,()=>'🎯 Tocca il bersaglio in alto: ci sono gli obiettivi dell\'anno. Premi «📍 Vai» e il gioco ti porta dove si fanno. Se un obiettivo non ti piace, puoi cambiarlo 3 volte.'],
 [/(gli anni|crescer|diventare grande|anno dopo|compleanno|invecchi)/,()=>'🎂 Quando completi tutti gli obiettivi dell\'anno compi gli anni e diventi più grande. Ogni anno ci sono obiettivi nuovi!'],
 [/(interrog|verific|voto|voti|pagell)/,()=>'📝 A scuola tocca la lavagna e scegli «Fatti interrogare» (3 domande) o «Fai una verifica» (5 esercizi). Rispondi nella chat e il prof ti mette il voto. Se dici «non ho studiato» prendi 4!'],
 [/(scuola|asilo|nido|materna|universit)/,()=>'🏫 A 1 anno c\'è il nido, da 3 a 5 la scuola materna, dai 6 anni la scuola: elementari, medie e superiori. Dopo il diploma puoi andare all\'università.'],
 [/(lavor|mestier)/,()=>'💼 Dai 16 anni vai negli uffici e fai un colloquio. Poi vai alla tua scrivania per lavorare e guadagnare.'],
 [/(amic|fidanz|persone|parlare|chat)/,()=>'💬 Avvicinati a una persona e premi «Parla»: scrivi quello che vuoi. Nella mappa 🗺️, sezione 👥 Persone, trovi tutti: tocchi un nome e ci vai.'],
 [/(mamma|papa|genitori|accompagn)/,()=>'👨‍👩‍👦 Parla con la mamma o il papà e chiedi «mi porti al parco?» o «mi compri il gelato?». Ti accompagnano e a volte pagano loro!'],
 [/(fame|mangi|cucin|frigo|merenda)/,()=>'🍝 A casa, in cucina, ci sono il frigo, la dispensa e i fornelli: puoi prendere da mangiare e cucinare tante ricette.'],
 [/(dottor|medic|ospedal|malat|salute)/,()=>'🩺 All\'ospedale c\'è la dottoressa Neri per le visite. In farmacia trovi cerotti e medicine.'],
 [/(dorm|nanna|letto|stanc|energia)/,()=>'😴 Vai nella tua cameretta e tocca il letto per riposare.'],
 [/(zaino|oggett|regal)/,()=>'🎒 Tocca la tua faccina in alto a sinistra e poi «Zaino»: lì ci sono le cose che hai. Puoi usarle o regalarle alle persone in chat.'],
 [/(compr|negoz|centro commerciale|spesa|gelat|pizz)/,()=>'🛍️ Entra nei negozi e tocca il bancone. Il centro commerciale ha giocattoli, sport, elettronica, vestiti e il bar. Da piccolo chiedi alla mamma: «mi compri…?»'],
 [/(cane|cagnolin|animal)/,()=>'🐶 Il cagnolino è al parco: vai da lui e fai amicizia!'],
 [/(semafor|multa|strisce|attravers)/,()=>'🚦 Si attraversa sulle strisce quando il semaforo delle macchine è rosso. Se passi col rosso in macchina prendi la multa!'],
 [/(bollett)/,()=>'📬 Le bollette (luce, gas, acqua…) arrivano a casa ogni tanto. Le pagano mamma e papà; da grande le paghi tu.'],
 [/(salva|salvatagg|perdo|ricominci|nuova vita)/,()=>'💾 Il gioco si salva da solo. Se vuoi ricominciare, tocca la tua faccina in alto e poi «✨ Nuova vita».'],
 [/(figurin|edicola|giornal)/,()=>'📰 All\'edicola compri le figurine per l\'album e il giornale.'],
 [/(chiesa|candel)/,()=>'⛪ In chiesa puoi accendere una candela e parlare con Don Franco.'],
 [/(piscin|nuot)/,()=>'🏊 In piscina tocca la vasca per nuotare (l\'ingresso costa 5 €).'],
 [/(museo|dinosaur|bibliotec|libr)/,()=>'🖼️ Al museo guardi le opere e il dinosauro, in biblioteca leggi i libri e impari curiosità.'],
 [/(mappa|dove|perso|trovare)/,()=>'🗺️ Tocca la mappa in alto: ci sono tutti i posti (📍 Posti) e tutte le persone (👥 Persone), con la barra per cercare. Tocca un nome e ci vai.'],
 [/(ciao|salve|buongiorno)/,()=>'Ciao! 👋 Sono l\'aiuto del gioco. Chiedimi come si fa una cosa!'],
 [/(grazie)/,()=>'Prego! 😊 Buon divertimento!'],
];
const HELPSUG=['Come guadagno soldi?','Come vado in vacanza?','Come guido la macchina?','Come compro una casa?','Come compio gli anni?','Come trovo una persona?'];
function helpAnswer(t){const q=norm(t);for(const [re,f] of HELP)if(re.test(q))return f();return 'Mmm, questa non la so ancora! 🤔 Prova a chiedermi per esempio: «'+pick(HELPSUG)+'»'}
function helpBody(){
  const L=ui.helpLog||[];
  return `<div id="helpLog" style="display:grid;gap:8px;margin-bottom:10px">${L.length?L.map(m=>`<div style="justify-self:${m.me?'end':'start'};max-width:85%;padding:10px 14px;border-radius:16px;background:${m.me?'var(--accent)':'var(--chip)'};color:${m.me?'var(--accent-ink)':'var(--ink)'};font-weight:600">${esc(m.t)}</div>`).join(''):`<p class="note">Ciao! Sono l'aiuto del gioco ❓ Scrivi una domanda e ti spiego come si fa.</p>`}</div>
   <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">${HELPSUG.map(s=>`<button class="btn alt" data-helpq="${esc(s)}">${esc(s)}</button>`).join('')}</div>
   <form id="helpF" style="display:flex;gap:8px"><input id="helpIn" placeholder="Scrivi la tua domanda…" autocomplete="off" style="flex:1;min-width:0;padding:12px 14px;border-radius:14px;border:2px solid var(--line);font-size:16px">${micBtn('help')}<button class="btn hot" type="submit">Chiedi</button></form>`;
}
function helpAsk(t){t=(t||'').trim();if(!t)return;ui.helpLog=ui.helpLog||[];ui.helpLog.push({me:1,t},{t:helpAnswer(t)});if(ui.helpLog.length>30)ui.helpLog.splice(0,ui.helpLog.length-30);renderSheet();
  setTimeout(()=>{const l=$('helpLog');if(l)l.lastElementChild.scrollIntoView({block:'nearest'});const i=$('helpIn');if(i&&matchMedia('(pointer:fine)').matches)i.focus()},30)}
document.addEventListener('submit',e=>{if(e.target.id!=='helpF')return;e.preventDefault();helpAsk($('helpIn').value)});
