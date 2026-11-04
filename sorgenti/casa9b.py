# v9: tante case diverse + aggiungi garage/pista sotto ogni casa
rep("const CASE=[{id:'mono',n:'Monolocale',ic:'🏠',p:90000,fel:8},{id:'appartamento',n:'Appartamento',ic:'🏢',p:180000,fel:12},{id:'villa',n:'Villa con giardino',ic:'🏡',p:400000,fel:20}];",
"""const CASE=[{id:'mono',n:'Monolocale',ic:'🏠',p:90000,fel:8,mq:35,pi:1,d:'Piccolo e comodo, al primo piano'},
 {id:'baita',n:'Baita di legno',ic:'🛖',p:140000,fel:12,mq:70,pi:2,d:'Tutta di legno, col camino',garden:1},
 {id:'appartamento',n:'Appartamento',ic:'🏢',p:180000,fel:12,mq:90,pi:1,d:'Tre stanze e un balcone'},
 {id:'loft',n:'Loft in centro',ic:'🏙️',p:230000,fel:14,mq:120,pi:1,d:'Un unico stanzone enorme con le vetrate'},
 {id:'schiera',n:'Villetta a schiera',ic:'🏘️',p:260000,fel:15,mq:130,pi:2,d:'Due piani e un giardinetto',garden:1},
 {id:'attico',n:'Attico con terrazza',ic:'🌆',p:340000,fel:18,mq:150,pi:8,d:'All\\'ottavo piano, con la terrazza panoramica',terrazza:1},
 {id:'villa',n:'Villa con giardino',ic:'🏡',p:400000,fel:20,mq:200,pi:2,d:'Giardino grande, senza piscina',garden:1},
 {id:'casalago',n:'Casa sul lago',ic:'🛶',p:520000,fel:22,mq:180,pi:2,d:'Con il pontile e la barchetta',garden:1,lago:1},
 {id:'villapisc',n:'Villa con piscina',ic:'🏊',p:680000,fel:25,mq:260,pi:2,d:'Giardino con una bella piscina',garden:1,pool:1},
 {id:'ranch',n:'Ranch con i cavalli',ic:'🐴',p:900000,fel:25,mq:300,pi:1,d:'Tanto prato, la stalla e i cavalli',garden:1,cavalli:1},
 {id:'grattacielo',n:'Attico nel grattacielo',ic:'🏙️',p:1500000,fel:28,mq:350,pi:40,d:'Al 40° piano! Piscina sul tetto',terrazza:1,pool:1},
 {id:'villona',n:'Villa gigante',ic:'🎾',p:2200000,fel:32,mq:600,pi:3,d:'Piscina, campo da tennis e un parco',garden:1,pool:1,tennis:1},
 {id:'castello',n:'Castello',ic:'🏰',p:5000000,fel:40,mq:1500,pi:4,d:'Con le torri, il fossato e la piscina',garden:1,pool:1,torri:1}];""")
rep("const HCOL={mono:['#efe1c4','#8a5a33'],appartamento:['#e3e7ee','#596273'],villa:['#fff3e0','#c0643a']};",
"const HCOL={mono:['#efe1c4','#8a5a33'],appartamento:['#e3e7ee','#596273'],villa:['#fff3e0','#c0643a'],baita:['#b07a4a','#5a3b26'],loft:['#9aa3ad','#2f3337'],schiera:['#f6d6d6','#8c3b3b'],attico:['#dfe8f3','#3e6f73'],casalago:['#e5f0d8','#4f6b45'],villapisc:['#ffffff','#3b6fe0'],ranch:['#e8c99a','#7a2f22'],grattacielo:['#a9c6db','#1f2540'],villona:['#fbe8b0','#a24f37'],castello:['#c9c3b6','#5d6b74']};")
rep("""     h+=`<div class="row"><div class="t"><b>${c.ic} ${c.n}</b><span>${eur(c.p)} · o mutuo: anticipo ${eur(c.p*0.2)} e ${eur(rata(c.p))}/anno per ${MUTUO_ANNI} anni</span></div>
       <div style="display:grid;gap:6px"><button class="btn ${okC?'hot':''}" data-casa="${c.id}" ${okC?'':'disabled'}>Compra</button><button class="btn alt" data-mutuo="${c.id}" ${okM?'':'disabled'}>Mutuo</button></div></div>`});""",
"""     const ad=(ui.addon9=ui.addon9||{})[c.id]||{},tot=c.p+(ad.g?40000:0)+(ad.p?250000:0);
     h+=`<div class="row" style="flex-wrap:wrap"><div class="t"><b>${c.ic} ${c.n}</b><span>${c.d||''}<br>${houseTags(c)}<br><b>${eur(c.p)}</b> · o mutuo: anticipo ${eur(c.p*0.2)} e ${eur(rata(c.p))}/anno per ${MUTUO_ANNI} anni</span></div>
       <div style="display:grid;gap:6px"><button class="btn ${okC?'hot':''}" data-casa="${c.id}" ${okC?'':'disabled'}>Compra</button><button class="btn alt" data-mutuo="${c.id}" ${okM?'':'disabled'}>Mutuo</button></div>
       <div class="seg wrap" style="width:100%;margin-top:6px"><button type="button" class="sw" data-addon9="${c.id}:g" aria-pressed="${!!ad.g}">${ad.g?'✓':'➕'} Aggiungi garage · ${eur(40000)}</button><button type="button" class="sw" data-addon9="${c.id}:p" aria-pressed="${!!ad.p}">${ad.p?'✓':'➕'} Aggiungi pista per aerei ed eliporto · ${eur(250000)}</button>${ad.g||ad.p?`<span class="tag">Totale: ${eur(tot)}</span>`:''}</div></div>`});""")
