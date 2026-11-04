/* ================= v9: casa tua da grande, moto e trattori, negozio di bici ================= */
const HOME=()=>S&&S.home!=='genitori'?'casamia':'casa';
const HCOL={mono:['#efe1c4','#8a5a33'],appartamento:['#e3e7ee','#596273'],villa:['#fff3e0','#c0643a']};
(function(){const b=BUILD.find(x=>x.id==='casamia');
  Object.defineProperty(b,'n',{get:()=>!S||S.home==='genitori'?'Casa in vendita':S.house?(S.houses&&S.houses.length?'Casa 1 · ':'Casa tua · ')+S.house.n:'Casa tua (in affitto)'});
  Object.defineProperty(b,'ic',{get:()=>!S||S.home==='genitori'?'🪧':S.house?S.house.ic:'🗝️'});
  Object.defineProperty(b,'wall',{get:()=>(S&&S.house&&HCOL[S.house.id]||['#ddd6c8'])[0]});
  Object.defineProperty(b,'roof',{get:()=>(S&&S.house&&HCOL[S.house.id]||[0,S&&S.home==='affitto'?'#3e6f73':'#9aa3b5'])[1]});
})();
SCENE_N.casamia='a casa tua';SCENE_N.bici='al negozio di bici e monopattini';
Object.defineProperty(SCENE_N,'casa',{get:()=>S&&S.home!=='genitori'?'a casa dei tuoi genitori':'a casa tua'});
PLACE_KW.unshift(['bici',/(negozio (di|delle) bici|monopattin|pattini|mountain bike)/]);
PLACE_ART.bici='al negozio di bici';PLACE_ART.casamia='a casa tua';
// quando cambi casa, la famiglia (e gli animali) vengono con te
function homeMoved(){
  syncNpcs();
  if(S.home!=='genitori')setTimeout(()=>toast(`🗺️ Sulla mappa ora c'è «Casa tua» ${BUILD.find(b=>b.id==='casamia').ic}: è un'altra casa, in basso a destra. Mamma e papà restano nella «Casa dei genitori».`),2600);
}
{const _cc=compraCasa;compraCasa=function(id,m){const h=S.home;_cc(id,m);if(S.home!==h)homeMoved()}}
['vaiAffitto','tornaGenitori','vendiCasa'].forEach(k=>{const r=PA[k].run;PA[k].run=(...a)=>{const h=S.home,m=r(...a);if(S.home!==h)homeMoved();return m}});
{const _eb=enterBuilding;enterBuilding=function(id){
  if(id==='casamia'&&S.home==='genitori'){ui.walk=null;return toast(S.age<18?'🪧 Questa casa è in vendita! Da grande la potrai comprare all\'agenzia case. 🔑':'🪧 È in vendita! Comprala all\'agenzia case (o vai in affitto) e diventa casa tua. 🔑')}
  return _eb(id)}}

// concessionaria: tutti i veicoli a motore
LIC.c={n:'Patente C (camion)',age:21,p:1500};LIC.d={n:'Patente D (autobus)',age:24,p:2000};
const VEI9=[
 {id:'cross',n:'Moto da cross',ic:'🏍️',p:5500,age:16,lic:'a',up:600,fel:12,speed:2.4,g:'moto'},
 {id:'superbike',n:'Superbike',ic:'🏍️',p:18000,age:18,lic:'a',up:1200,fel:16,speed:3.1,g:'moto'},
 {id:'quad',n:'Quad',ic:'🏍️',p:7000,age:16,lic:'a',up:700,fel:12,speed:2.2,g:'moto'},
 {id:'trattorino',n:'Trattorino tagliaerba',ic:'🚜',p:3000,age:16,lic:'am',up:200,fel:8,speed:1.5,g:'campagna'},
 {id:'trattore',n:'Trattore',ic:'🚜',p:40000,age:18,lic:'b',up:1500,fel:14,speed:1.7,g:'campagna',big:1},
 {id:'trattoregr',n:'Trattore gigante a 4 ruote motrici',ic:'🚜',p:95000,age:18,lic:'b',up:2500,fel:18,speed:1.8,g:'campagna',big:1},
 {id:'pickup',n:'Pick-up',ic:'🛻',p:35000,age:18,lic:'b',up:1600,fel:13,speed:2.4,g:'campagna',big:1},
 {id:'furgone',n:'Furgone',ic:'🚚',p:28000,age:18,lic:'b',up:1400,fel:10,speed:2.1,g:'camion',big:1},
 {id:'camion',n:'Camion',ic:'🚚',p:70000,age:21,lic:'c',up:3500,fel:15,speed:1.9,g:'camion',big:1},
 {id:'tir',n:'Tir con rimorchio',ic:'🚛',p:130000,age:21,lic:'c',up:5000,fel:18,speed:1.9,g:'camion',big:1},
 {id:'autobus',n:'Autobus',ic:'🚌',p:160000,age:24,lic:'d',up:6000,fel:18,speed:1.8,g:'camion',big:1},
];
VEI9.forEach(v=>{v.veh=true;v.ride=true;VEICOLI.push(v);ALLITEMS.push(v)});
['motorino','moto'].forEach(id=>VEICOLI.find(v=>v.id===id).g='moto');
['autousata','autonuova','camper','sportiva'].forEach(id=>VEICOLI.find(v=>v.id===id).g='auto');
CASCO_RIDE.push('cross','superbike','quad');
const VGRP=[['moto','🏍️ Moto, motorini e quad'],['auto','🚗 Auto'],['campagna','🚜 Trattori e pick-up'],['camion','🚚 Camion, furgoni e autobus']];
function veicoliBody(){
  const kid=S.age<14;
  return (kid?`<p class="note">Questi sono per i grandi: con la patente giusta li compri tu! Intanto guardali: quale ti piace di più? 😍</p>`:`<p class="note">Per guidarli serve la patente giusta: la prendi alla lavagna della scuola guida.</p>`)+
    VGRP.map(([g,t])=>`<div class="h3">${t}</div>`+itemRows(VEICOLI.filter(v=>v.g===g))).join('');
}
PLACES.veicoli={sub:()=>'Moto, trattori, camion e autobus',body:veicoliBody};
SHEET_T.veicoli=['🏍️','Moto, trattori e camion'];
PLACES.auto.sub=()=>'Moto, auto, trattori, camion e patenti';
PLACES.patenti.sub=()=>'Patentino e patenti A, B, C e D';

// negozio di bici e monopattini
const BICI=[
 {id:'triciclo',n:'Triciclo',ic:'🚲',p:60,age:2,fel:4,speed:1.2,ride:true},
 {id:'bicirotelle',n:'Bici con le rotelle',ic:'🚲',p:90,age:3,fel:5,speed:1.3,ride:true},
 {id:'monospinta',n:'Monopattino a spinta',ic:'🛴',p:50,age:4,fel:4,speed:1.35,ride:true},
 {id:'pattini',n:'Pattini a rotelle',ic:'🛼',p:70,age:5,fel:4,speed:1.45,ride:true},
 {id:'bmx',n:'BMX per le acrobazie',ic:'🚲',p:220,age:7,fel:6,speed:1.55,ride:true},
 {id:'mtb',n:'Mountain bike',ic:'🚲',p:450,age:9,fel:7,speed:1.7,ride:true},
 {id:'corsa',n:'Bici da corsa',ic:'🚲',p:900,age:12,fel:7,speed:1.85,ride:true},
 {id:'ebike',n:'Bici elettrica',ic:'🚲',p:1500,age:14,fel:8,speed:1.95,ride:true},
];
BICI.forEach(b=>ALLITEMS.push(b));CASCO_RIDE.push(...BICI.map(b=>b.id));
PAYPL.push('bici');
PLACES.bici={sub:()=>'Bici, monopattini, skate e pattini',body:()=>parPayBar('bici')+`<div class="h3">🚲 Biciclette</div>`+itemRows([...BICI.filter(b=>b.ic==='🚲'),ALLITEMS.find(i=>i.id==='bici')].sort((a,b)=>a.p-b.p))+
  `<div class="h3">🛴 Monopattini, skate e pattini</div>`+itemRows([BICI.find(b=>b.id==='monospinta'),BICI.find(b=>b.id==='pattini'),...SHOP.filter(i=>i.id==='skate'||i.id==='monopattino')])+
  `<div class="h3">⛑️ Sicurezza</div>`+itemRows(SHOP.filter(i=>i.id==='casco'))+
  `<p class="note">${S.age<14?'Senza casco non si sale! ⛑️ Chiedi alla mamma: «mi compri la mountain bike?»':'Usa il bottone in alto per salire sul mezzo più veloce che hai.'}</p>`};
