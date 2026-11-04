// Marina di Lido, molto più grande: spiaggia lunga, molo, faro, due strade, negozi, parco con il laghetto e le case
const MW=60,MH=52;
const MROAD=[23,30],MCROSS=[[10,13,23],[28,31,23],[28,31,30],[46,49,30]];
room('mare',MW,MH,'#e9d7a8','#e2cf9c','#9fd0ea',[
  fu('shore',1,7,58,1,'bagnoMare','Riva del mare',null,true),
  fu('pier',44,2,3,5,'pescaMare','Molo dei pescatori',null,true),fu('faro',55,2,2,2),
  fu('boat',6,4,3,1),fu('boat',21,3,2,1,null,null,'#e5484d'),fu('boat',50,5,3,1,null,null,'#3b6fe0'),fu('boat',34,3,2,1,null,null,'#f5a700'),
  ...[3,7,11,15,19,23,35,39,43,51,55].map((x,i)=>fu('umbrella',x,10,1,1,null,null,['#e5484d','#3b6fe0','#f5a700','#16a34a','#e98aa8','#0f9e8a'][i%6])),
  ...[3,7,11,15,19,23,35,39,43,51,55].map(x=>fu('sunbed',x,11,1,1,'abbronzati','Lettino',null,true)),
  fu('torretta',29,8,1,1),fu('castle',9,13,1,1,'castello','Castello di sabbia'),fu('castle',41,13,1,1,'castello','Castello di sabbia'),
  fu('kiosk',25,12,3,1,'cornetto','Bar del lido'),fu('kiosk',47,12,3,1,'gelato','Chiosco dei gelati'),
  fu('volley',14,12,5,1,'calcioMare','Rete da beach volley',null,true),
  ...[2,9,16,24,36,44,51,57].map(x=>fu('palm',x,14,1,1)),
  // prima fila di negozi, sul lungomare
  fu('facade',1,16,6,3,'sheet:hotel','Hotel Belvedere','#f2d49b'),fu('facade',8,16,5,3,'gelato','Gelateria del porto','#f7c6d9'),
  fu('facade',14,16,5,3,'sheet:souvenir','Souvenir','#bfe0ef'),fu('facade',21,16,6,3,'pizza','Pizzeria Il Gabbiano','#f0c9a2'),
  fu('facade',33,16,6,3,'pesceMare','Ristorante Il Pescatore','#cfe3d6'),fu('facade',40,16,5,3,'sheet:souvenir','Negozio da surf','#9fd0ea'),
  fu('facade',46,16,6,3,'sheet:hotel','Hotel Miramare','#f6e0c8'),fu('facade',53,16,6,3,'sheet:c_bar','Caffè del porto','#e8d2b4'),
  // piazza
  fu('fountain',29,19,2,2),fu('bench',5,21,2,1),fu('bench',17,21,2,1),fu('bench',40,21,2,1),fu('bench',52,21,2,1),fu('palm',23,20,1,1),fu('palm',36,20,1,1),
  // seconda fila
  fu('facade',1,26,6,3,'sheet:farmacia','Farmacia','#c9e6c4'),fu('facade',8,26,5,3,'sheet:edicola','Edicola','#e9e3d3'),
  fu('facade',14,26,6,3,'sheet:supermercato','Market','#d6e4ef'),fu('facade',22,26,5,3,'cornetto','Panetteria','#f3e1c4'),
  fu('facade',33,26,6,3,'chiesa','Chiesetta del mare','#ece5d6'),fu('facade',40,26,5,3,'sheet:edicola','Libreria','#e6d3b3'),
  fu('facade',46,26,6,3,'sheet:c_bar','Bar Marina','#f3d9b0'),fu('facade',53,26,6,3,'sheet:supermercato','Pescheria','#bfe0ef'),
  // il parco
  fu('pond',5,34,9,4),fu('slide',17,34,2,2,'scivoloMare','Scivolo'),fu('slide',21,34,2,2,'scivoloMare','Scivolo'),fu('kiosk',35,34,3,1,'gelato','Gelati e granite'),
  fu('field',42,34,14,6,'calcioMare','Campetto da calcio',null,true),
  ...[[2,34],[15,39],[24,38],[26,34],[33,39],[38,37],[58,35],[2,40],[57,40]].map(([x,y])=>fu('palm',x,y,1,1)),
  fu('bench',8,39,2,1),fu('bench',19,39,2,1),fu('bench',34,37,2,1),
  // le case della cittadina
  ...[[1,6,'#f2d49b'],[8,5,'#f7c6d9'],[14,6,'#bfe0ef'],[21,5,'#cfe3d6'],[33,6,'#f6e0c8'],[40,5,'#e8d2b4'],[46,6,'#d6e4ef'],[53,6,'#f3e1c4']].map(([x,w,c],i)=>fu('facade',x,43,w,3,i===4?'sheet:hotel':null,i===4?'B&B Le Conchiglie':null,c)),
]);
(function(){const sc=SC.mare,w=sc.w;sc.outdoor=true;
  for(let y=1;y<sc.h-1;y++)for(let x=1;x<w-1;x++)sc.t[y*w+x]=10;
  for(let y=1;y<=6;y++)for(let x=0;x<w;x++)if(!(x>=44&&x<=46&&y>=2))sc.sol[y*w+x]=1;
  MROAD.forEach(r=>{for(let y=r;y<=r+1;y++)for(let x=0;x<w;x++)if(!MCROSS.some(([a,b,ry])=>ry===r&&x>=a&&x<=b))sc.sol[y*w+x]=1});
  sc.zone=(x,y)=>'m_town';sc.zones=[];
  ZONES.m_town={kind:'stone',col:'#cfc6b5',n:()=>'',lx:0,ly:0,sc:'mare'};
})();
Object.assign(NPOS,{bagnino2:[30,9],mar0:[38,12],mar1:[6,12],mar2:[12,12],mar3:[10,21],mar4:[20,36],mar5:[8,40]});
