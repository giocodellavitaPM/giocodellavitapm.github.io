// aeroporto: check-in, tabellone, vetrate sulla pista e il gate d'imbarco
room('aeroporto',22,14,'#e8eef4','#dde5ee','#e3edf5',[
  fu('planewin',1,1,6,1),fu('board',8,1,6,1),fu('planewin',15,1,6,1),
  fu('checkin',2,4,6,1,'sheet:checkin','Check-in'),fu('rope',2,6,6,1),
  fu('gate',15,4,4,1,'sheet:gate','Gate 3 · imbarco'),fu('chairs',14,7,5,1),fu('chairs',14,9,5,1),
  fu('vending',20,9,1,1,'sheet:distributore','Distributore'),fu('counter',3,10,3,1,'cornetto','Bar dell\'aeroporto'),fu('plant',1,12,1,1),fu('plant',20,12,1,1)]);
// casa tua da grande: stesse stanze di casa, ma è un'altra casa
SC.casamia=Object.assign({},SC.casa,{id:'casamia',furn:SC.casa.furn.map(f=>f.act==='lettone'?Object.assign({},f,{label:'Il tuo lettone'}):f.act==='sheet:letto'?Object.assign({},f,{label:'Letto degli ospiti'}):f)});
// negozio di bici e monopattini
room('bici',14,10,'#e7ece3','#dde4d8','#dff0e0',[
  fu('vshow',1,3,2,1,'sheet:bici','Biciclette',null,false),fu('vshow',4,3,2,1,'sheet:bici','Mountain bike',null,false),fu('vshow',8,3,2,1,'sheet:bici','Monopattini',null,false),fu('vshow',11,3,2,1,'sheet:bici','Skate e pattini',null,false),
  fu('counter',5,6,4,1,'sheet:bici','Cassa'),fu('plant',1,8,1,1),fu('plant',12,8,1,1)]);
SC.bici.furn.forEach((f,i)=>{if(f.k==='vshow')f.emo=['🚲','🚵','🛴','🛼'][i]});
SC.auto.furn.push(...[['🏍️','Moto e motorini',1],['🚜','Trattori',5],['🚚','Camion e furgoni',13],['🚌','Autobus e pick-up',17]].map(([e,l,x])=>{const f=fu('vshow',x,6,3,1,'sheet:veicoli',l);f.emo=e;return f}));
SC.auto.furn.slice(-4).forEach(f=>{for(let x=f.x;x<f.x+f.w;x++)SC.auto.sol[f.y*SC.auto.w+x]=1});
// il centro commerciale gigante: tre file di negozi, food court e fontana
const MALLROWS=[
 [['c_bimbi','Prima infanzia','#e98aa8'],['c_giochi','Giocattoli','#f5a700'],['m_peluche','Peluche','#f7b6c8'],['m_lego','Mattoncini','#e5484d'],['m_costumi','Costumi','#9b5de5'],['c_sport','Sport','#2f8f5b'],['bici','Bici e monopattini','#16a34a'],['m_scarpe','Scarpe','#7a5a3a'],['c_vestiti','Abbigliamento','#3b6fe0'],['m_gioielli','Gioielleria','#b08a2e'],['m_ottica','Ottica','#3e6f73']],
 [['c_elettro','Elettronica','#3b6fe0'],['m_tel','Telefonia','#1f2540'],['m_video','Videogiochi','#7d6aa8'],['m_musica','Musica','#c0643a'],['m_libri','Libreria','#8a5a33'],['edicola','Edicola','#2f6b4f'],['m_carto','Cartoleria','#f08a24'],['m_casa','Casa e arredo','#596273'],['m_profumi','Profumeria','#ec6fa4'],['m_parrucch','Parrucchiere','#d9534f'],['farmacia','Farmacia','#16a34a']],
 [['supermercato','Ipermercato','#4f6b45'],['m_fiori','Fioraio','#e98aa8'],['m_pet','Animali','#c98a6a'],['m_dolci','Caramelle','#ff6fb1'],['c_bar','Bar','#c0643a'],['gelateria','Gelateria','#ec6fa4'],['m_crepes','Crêpes e waffle','#d9a066'],['pizzeria','Pizzeria','#a24f37'],['m_burger','Hamburger','#e3b52a'],['m_sushi','Sushi','#e5484d'],['m_luna','Sala giochi','#9b5de5']]];
room('centro',57,30,'#ece9e2','#e2ded5','#e4e8ee',[
  ...MALLROWS.flatMap((row,r)=>row.map(([id,l,c],i)=>fu('shopfront',1+i*5,[2,10,18][r],4,1,'sheet:'+id,l,c))),
  fu('fountain',26,23,4,2,null,null),fu('plant',24,22,1,1),fu('plant',31,22,1,1),fu('plant',24,25,1,1),fu('plant',31,25,1,1),
  ...[3,9,15,38,44,50].map(x=>fu('bench',x,23,3,1)),
  ...[4,10,16,39,45,51].map(x=>fu('rtable',x,26,2,1)),
  ...[1,55].map(x=>fu('plant',x,27,1,1))]);
// le altre case che compri da grande
for(let k=2;k<=6;k++)SC['casa'+k]=Object.assign({},SC.casamia,{id:'casa'+k});
// concessionaria moto
room('motoshop',16,10,'#e5e7eb','#d9dce2','#dde3ec',[
  ...[1,4,7,10,13].map((x,i)=>{const f=fu('vshow',x,3,2,1,'sheet:motoshop',['Minimoto','Scooter','Cross','Corsa','Americana'][i]);f.emo=i===1?'🛵':'🏍️';return f}),
  fu('desk2',4,6,4,1,'sheet:motoshop','Banco vendite'),fu('blackboard',10,6,4,1,'sheet:patentiMoto','Scuola guida moto'),fu('plant',1,8,1,1),fu('plant',14,8,1,1)]);
// i posti di lavoro: un edificio per ogni mestiere
const W9=(k,x,y,w,h,label,c)=>fu(k,x,y,w,h,'lavorasodo',label,c);
room('ristorante',14,10,'#efe6d6','#e6dcc8','#f3e2cf',[fu('stove',1,2,1,1),W9('stove',2,2,1,1,'Fornelli dello chef'),fu('fridge',3,2,1,1),fu('counter',5,2,4,1),fu('oven',10,2,2,1),...[[2,5],[6,5],[10,5],[2,7],[6,7],[10,7]].map(([x,y])=>fu('rtable',x,y,2,1))]);
room('officina',14,10,'#c9ccd1','#bfc3c9','#dde1e6',[W9('car',2,3,3,2,'Ripara la macchina','#e5484d'),fu('car',7,3,3,2,null,null,'#3b6fe0'),fu('shelf',11,2,2,1),fu('lockers',11,5,2,1),fu('moto',2,7,1,1),fu('plant',12,8,1,1)]);
room('elettrica',12,9,'#e3e6ea','#d9dde2','#e9edf2',[W9('cupboard',2,2,1,1,'Quadro elettrico'),fu('shelf',4,2,3,1),fu('pcdesk',8,2,2,1),fu('lockers',2,5,2,1),fu('plant',10,6,1,1)]);
room('azienda',14,10,'#d5d9e0','#cdd2da','#e7eaef',[W9('pcdesk',2,3,2,1,'La tua scrivania'),fu('pcdesk',5,3,2,1),fu('pcdesk',8,3,2,1),fu('pcdesk',2,6,2,1),fu('pcdesk',5,6,2,1),fu('pcdesk',8,6,2,1),fu('cooler',12,3,1,1),fu('plant',12,7,1,1)]);
room('questura',14,10,'#dfe4ec','#d4dae4','#e4eaf3',[W9('desk2',2,3,3,1,'Scrivania dell\'agente'),fu('pcdesk',7,3,2,1),fu('lockers',11,2,2,1),fu('car',2,6,3,2,null,null,'#1f3f8a'),fu('plant',12,7,1,1)]);
room('pompieri',16,10,'#d9d2c6','#cfc7ba','#efe2cf',[W9('car',2,3,5,2,'Camion dei pompieri','#d0312d'),fu('car',8,3,5,2,null,null,'#d0312d'),fu('lockers',2,7,3,1),fu('rope',8,7,2,1),fu('plant',14,7,1,1)]);
room('techlab',14,10,'#2b2f3a','#323746','#e7eaf3',[W9('pcdesk',2,3,2,1,'Il tuo computer'),fu('pcdesk',5,3,2,1),fu('pcdesk',8,3,2,1),fu('tv',11,2,2,1),fu('sofa',9,6,3,1,null,null,'#3b6fe0'),fu('cooler',2,7,1,1),fu('plant',12,7,1,1)]);
room('studiocomm',12,9,'#e9e1d2','#e0d6c4','#efe6d6',[W9('desk2',4,3,3,1,'Scrivania del commercialista'),fu('bookshelf',1,2,2,1),fu('bookshelf',9,2,2,1),fu('chairs',4,5,3,1),fu('plant',10,6,1,1)]);
room('studiolegale',12,9,'#e6dccb','#dcd0bc','#ece2d0',[W9('desk2',4,3,3,1,'Scrivania dell\'avvocato'),fu('bookshelf',1,2,2,1),fu('bookshelf',9,2,2,1),fu('lectern',5,6,1,1),fu('plant',10,6,1,1)]);
room('ingegneria',14,10,'#e3e7ec','#d8dde3','#e9edf2',[W9('easel',2,3,1,1,'Tavolo da disegno'),fu('easel',4,3,1,1),fu('pcdesk',7,3,2,1),fu('pcdesk',10,3,2,1),fu('shelf',2,6,3,1),fu('plant',12,7,1,1)]);
room('veterinario',12,9,'#e8f1ec','#dde9e2','#e6f3ec',[W9('exambed',4,3,2,1,'Lettino per gli animali'),fu('cupboard',1,2,1,1),fu('desk2',8,3,2,1),fu('chairs',2,6,3,1),fu('plant',10,6,1,1)]);
room('spazio',18,12,'#1e2235','#262b40','#2f3550',[W9('rocket',8,2,2,4,'Razzo: parti per lo spazio!'),fu('pcdesk',2,3,2,1),fu('pcdesk',2,6,2,1),fu('pcdesk',13,3,2,1),fu('pcdesk',13,6,2,1),fu('planets',2,9,3,1),fu('plant',15,9,1,1)]);
// stadio: il campo grande con le tribune
room('stadio',40,28,'#5fae4a','#58a544','#9fb7c9',[fu('crowd',1,2,38,2),fu('goal',1,11,1,4),fu('goal',38,11,1,4),fu('scoreboard',18,4,4,1,'sheet:stadio','Tabellone'),W9('bench',4,25,4,1,'Panchina dell\'allenatore')]);
// garage e hangar di casa tua (si riempiono con i tuoi mezzi)
room('garagemio',20,10,'#b9bcc2','#b1b4ba','#d5d8de',[]);
room('hangar',30,16,'#9aa1aa','#939aa3','#cfe3f2',[]);
Object.assign(SCN,{garagemio:{ic:'🚗',n:'Il tuo garage'},hangar:{ic:'🛩️',n:'Pista ed eliporto'}});
for(let k=2;k<=6;k++)SC['casa'+k].furn=SC.casamia.furn.slice();
SC.casamia.furn.push(fu('gdoor',13,14,1,1,'garage9','Porta del garage',null,true));
// lavori anche in ospedale, a scuola, in pizzeria e al centro commerciale
{const d=SC.ospedale.furn.find(f=>f.k==='pcdesk');if(d){d.act='lavorasodo';d.label='Computer dei medici'}}
{const d=SC.scuola.furn.find(f=>f.k==='desk');if(d){d.act='lavorasodo';d.label='Cattedra dell\'insegnante'}}
SC.pizzeria.furn.push(fu('stove',9,2,1,1,'lavorasodo','Cucina della pizzeria'));SC.pizzeria.sol[2*SC.pizzeria.w+9]=1;
SC.centro.furn.push(fu('counter',36,21,3,1,'lavorasodo','Cassa del negozio'));for(let x=36;x<39;x++)SC.centro.sol[21*SC.centro.w+x]=1;
{const d=SC.ufficio.furn.find(f=>f.act==='lavorasodo');if(d){d.act=null;d.label=null}}
