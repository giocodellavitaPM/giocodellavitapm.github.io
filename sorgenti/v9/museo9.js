/* ===== v9: il Museo dei tesori: compri tesori famosi e i visitatori pagano il biglietto ===== */
room('museo9',14,9,'#efe6d6','#e5dac6','#e9dcc3',[fu('plant',1,7,1,1),fu('plant',12,7,1,1),fu('shelf',1,2,3,1),fu('shelf',10,2,3,1),fu('counter',5,4,4,1,'sheet:museo9','Biglietteria del museo')]);
SCENE_N.museo9='al Museo dei tesori';SCENE_DO.museo9='Alla biglietteria compri tesori famosi per il tuo museo: i visitatori pagano il biglietto ogni giorno!';
// [id, icona, nome, prezzo, sala]
const TES9=[['moneta','🪙','Moneta d\'oro dei Romani',5e4,'Storia'],['vaso','🏺','Vaso degli antichi Greci',2e5,'Storia'],['mummia','⚱️','Tesoro della mummia egizia',2e6,'Storia'],['elmo','⛑️','Elmo di un cavaliere',8e5,'Storia'],
 ['spada','🗡️','Spada di re Artù',5e6,'Leggende'],['corona','👑','Corona del re',2e7,'Leggende'],['scettro','🔱','Tridente di Nettuno',4e7,'Leggende'],['lampada','🪔','Lampada del genio',8e7,'Leggende'],
 ['trex','🦖','Scheletro di T-Rex intero',3e7,'Dinosauri'],['triceratopo','🦕','Scheletro di brontosauro',5e7,'Dinosauri'],['uovoDino','🥚','Uovo di dinosauro',6e6,'Dinosauri'],['ambra','🟠','Zanzara nell\'ambra',2e6,'Dinosauri'],
 ['diamante','💎','Diamante più grande del mondo',3e8,'Gioielli'],['rubino','❤️','Rubino gigante',1e8,'Gioielli'],['uovo','🥚','Uovo d\'oro dello zar',2e8,'Gioielli'],['collana','📿','Collana della regina',1.5e8,'Gioielli'],
 ['meteorite','☄️','Meteorite caduto dallo spazio',4e7,'Spazio'],['pietraLuna','🌑','Pietra della Luna',1e8,'Spazio'],['tuta','🧑‍🚀','Tuta del primo astronauta',6e7,'Spazio'],['razzoAntico','🚀','Primo razzo della storia',5e8,'Spazio'],
 ['quadro','🖼️','Quadro più famoso del mondo',1e9,'Arte'],['statua','🗿','Statua gigante dell\'isola di Pasqua',8e8,'Arte'],['violino','🎻','Violino d\'oro',3e8,'Arte'],['mosaico','🧩','Mosaico antico',2e8,'Arte'],
 ['mappa','🗺️','Mappa del tesoro dei pirati',5e7,'Pirati'],['forziere','🧰','Forziere dei pirati pieno d\'oro',2e8,'Pirati'],['nave','⛵','Nave dei pirati vera',6e8,'Pirati'],['pappagallo','🦜','Cappello del capitano Barbanera',3e7,'Pirati']];
const musS=()=>S.museo9||(S.museo9={own:{}});
const musDay=()=>TES9.reduce((a,t)=>a+(musS().own[t[0]]?t[3]/25:0),0);
{const _st=step;step=function(dt){if(S&&S.alive&&S.museo9&&!ui.flying&&$('veil').hidden){const d=musDay();if(d){if(S.bank==null)S.bank=0;S.bank+=d*dt/1440}}return _st(dt)}}
function musBuy(id){const st=musS(),L=id==='all'?TES9.filter(t=>!st.own[t[0]]):TES9.filter(t=>t[0]===id&&!st.own[t[0]]);if(!L.length)return;const c=L.reduce((a,t)=>a+t[3],0);if(!canPay(c))return toast('Non hai abbastanza soldi. 💸');
  money(-c);L.forEach(t=>st.own[t[0]]=1);add('int',L.length>1?5:1);add('fel',3);const m=L.length>1?`🏛️ Hai comprato tutti i tesori per ${fmtE(c)}! Il tuo museo è il più bello del mondo!`:`🏛️ ${L[0][1]} ${L[0][2]} è nel tuo museo! I visitatori fanno la fila! 🎟️`;log(m);save();updateHud();refreshSheet();toast(m)}
PLACES.museo9={sub:()=>'Il tuo museo dei tesori',body:()=>{const st=musS(),n=TES9.filter(t=>st.own[t[0]]).length,L=TES9.filter(t=>!st.own[t[0]]),c=L.reduce((a,t)=>a+t[3],0),vis=Math.round(50+n*120);
  let h=`<p class="note">🏛️ Questo è il <b>tuo museo</b>! Compra i tesori più famosi del mondo e mettili in mostra. Ogni giorno arrivano i visitatori e pagano il biglietto: i soldi vanno da soli sul tuo conto in banca. Hai ${fmtE(wealth())}.</p>
  <div class="row" style="border:3px solid #2bb673;background:#eafff2"><div class="t"><b>🎟️ ${n?vis+' visitatori al giorno':'Il museo è vuoto'}</b><span>${n?'Guadagni '+fmtE(musDay())+' al giorno · tesori '+n+'/'+TES9.length:'Compra il primo tesoro!'}</span></div></div>`;
  if(L.length)h+=`<div class="row" style="border:3px solid #f5a700;background:#fff6dd"><div class="t"><b>🛍️ Compra tutti i tesori</b><span>${L.length} tesori · ${fmtE(c)}</span></div><button class="btn ${canPay(c)?'hot':''}" data-mus9="all" ${canPay(c)?'':'disabled'}>Compra</button></div>`;
  [...new Set(TES9.map(t=>t[4]))].forEach(sala=>{h+=`<div class="h3">🏛️ Sala ${sala}</div>`+TES9.filter(t=>t[4]===sala).map(t=>st.own[t[0]]?`<div class="row"><div class="t"><b>${t[1]} ${t[2]}</b><span>In mostra nel tuo museo ✓</span></div></div>`:
    `<div class="row"><div class="t"><b>${t[1]} ${t[2]}</b><span>Porta ${fmtE(t[3]/25)} al giorno</span></div><button class="btn ${canPay(t[3])?'hot':''}" data-mus9="${t[0]}" ${canPay(t[3])?'':'disabled'}>Compra ${fmtE(t[3])}</button></div>`).join('')});
  return h}};
SHEET_T.museo9=['🏛️','Museo dei tesori'];
document.addEventListener('click',e=>{const b=e.target.closest('[data-mus9]');if(b)musBuy(b.dataset.mus9)});
// altri super trucchi
SUPER9.push(['museo','🏛️','Tutti i tesori nel museo'],['bisogni','🍎','Fame, sete e sonno a posto'],['piazza','🏬','Vai alla piazza'],['soldi','💶','5 quintilioni in tasca e in banca']);
{const _s=super9;super9=function(k){if(k==='museo'){TES9.forEach(t=>musS().own[t[0]]=1)}else if(k==='bisogni'){needReset()}else if(k==='piazza'){if(ui.sheet)closeSheet();if(typeof closeChat==='function')closeChat();S.scene='citta';S.pos={x:136.5,y:65.5};ui.walk=null;ui.car=null;S.ride=false;syncNpcs()}
  else if(k==='soldi'){S.money=5e30;S.bank=5e30;if(ui.cheat){ui.cheat.money=5e30;ui.cheat.bank=5e30}['chMoney','chBank'].forEach(id=>{const i=$(id);if(i)i.value='5e30'})}else return _s(k);
  const x=SUPER9.find(y=>y[0]===k);save();updateHud();toast(`${x[1]} Fatto: ${x[2]}!`)}}
