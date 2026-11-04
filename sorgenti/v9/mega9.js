/* ================= v9: città doppia e centro commerciale gigante ================= */
// la porta più vicina (il centro commerciale ne ha tante)
function doorNear(b){const L=b.doors||[[b.dx,b.dy]];if(!S||S.scene!=='citta')return L[0];let best=L[0],bd=1e9;L.forEach(d=>{const k=Math.hypot(d[0]-S.pos.x,d[1]-S.pos.y);if(k<bd){bd=k;best=d}});return best}
{const _eb=enterBuilding;enterBuilding=function(id){const b=BUILD.find(x=>x.id===id);if(b&&S.scene==='citta'){const d=doorNear(b);S.entDoor={id,x:d[0],y:d[1]}}return _eb(id)}}
// elenco dei posti: casa tua per prima
function mapPlaces(){const mine=b=>b.id==='casamia'||/^casa[2-6]$/.test(b.id);const H=BUILD.filter(b=>mine(b)&&(b.id==='casamia'||houseK(+b.id.slice(4)))),rest=BUILD.filter(b=>!mine(b));return S.home!=='genitori'?[...H,...rest]:[...rest.slice(0,1),...H,...rest.slice(1)]}

// le cose nuove da comprare
const MGOODS={
 m_scarpe:[['scarpeGin','👟','Scarpe da ginnastica',40,3,'w'],['scarpeLuci','✨','Scarpe con le luci',35,3,'w'],['stivali','👢','Stivali da pioggia',25,2,'w'],['infradito','🩴','Infradito',8,3,'w']],
 m_libri:[['libro',null,null,8,6],['fiabe','📖','Libro di fiabe',10,3,'r'],['atlante','🗺️','Atlante del mondo',15,7,'r'],['dizionario','📕','Dizionario di inglese',12,8,'r']],
 m_dolci:[['caramelle',null,null,1,0],['lecca','🍭','Lecca-lecca gigante',2,3,'e'],['cioccolato',null,null,2,3],['zucchero','🍥','Zucchero filato',3,3,'e'],['orsetti','🐻','Orsetti gommosi',2,3,'e']],
 m_pet:[['crocchette','🦴','Crocchette per cani',6,4,'p'],['pallinaCane','🎾','Pallina per il cane',3,3,'p'],['acquario','🐠','Acquario con il pesciolino',30,6,'w'],['tiragraffi','🐈','Tiragraffi per il gatto',15,6,'p']],
 m_musica:[['chitarra','🎸','Chitarra',120,6,'m'],['tamburo','🥁','Tamburo',30,3,'m'],['flauto','🎶','Flauto dolce',10,6,'m'],['microfono','🎤','Microfono per il karaoke',25,5,'m'],['cuffie','🎧','Cuffie',40,8,'w']],
 m_profumi:[['bagnoschiuma','🫧','Bagnoschiuma alla fragola',5,3,'w'],['smalto','💅','Smalto colorato',6,6,'w'],['profumo','🌸','Profumo',30,10,'w']],
 m_gioielli:[['braccialetto','📿','Braccialetto',15,5,'w'],['collana','📿','Collana',40,8,'w'],['orologio','⌚','Orologio',60,8,'w'],['anello','💍','Anello',120,16,'w']],
 m_ottica:[['occhialiSole','🕶️','Occhiali da sole',20,3,'w'],['occhialiStar','⭐','Occhiali a forma di stella',12,3,'w']],
 m_fiori:[['rosa','🌹','Una rosa',3,3,'f'],['girasole','🌻','Girasole',4,3,'f'],['mazzo','💐','Mazzo di fiori',15,5,'f'],['piantina','🪴','Piantina',10,5,'w']],
 m_carto:[['pennarelli','🖍️','Pennarelli',5,3,'d'],['astuccio','✏️','Astuccio',12,5,'w'],['diario','📔','Diario segreto',8,7,'w'],['zainetto','🎒','Zaino nuovo',30,5,'w'],['adesivi','⭐','Adesivi',2,3,'d']],
 m_video:[['vgCalcio','⚽','Videogioco di calcio',40,6,'v'],['vgAuto','🏎️','Videogioco di macchine',40,6,'v'],['vgAvv','🗺️','Videogioco di avventura',45,7,'v'],['joypad','🎮','Controller nuovo',30,6,'w']],
 m_tel:[['cover','📱','Cover per il telefono',10,10,'w'],['caricatore','🔌','Caricabatterie',12,10,'w'],['auricolari','🎧','Auricolari',25,10,'w']],
 m_casa:[['lampadaLuna','🌙','Lampada a forma di luna',25,3,'w'],['cuscino','🛏️','Cuscino morbidoso',15,2,'w'],['poster','🖼️','Poster del tuo idolo',6,5,'w'],['lucine','✨','Lucine colorate',12,5,'w']],
 m_sushi:[['sushi','🍣','Sushi',8,5,'e'],['ramen','🍜','Ramen',9,5,'e']],
 m_burger:[['hamburger','🍔','Hamburger',7,4,'e'],['patatine',null,null,3,0],['milkshake','🥤','Milkshake',4,3,'e']],
 m_crepes:[['crepe','🥞','Crêpe alla nocciola',4,3,'e'],['waffle','🧇','Waffle con la panna',4,3,'e']],
 m_lego:[['mattoncini','🧱','Scatola di mattoncini',20,4,'t'],['castelloM','🏰','Castello di mattoncini',60,6,'t'],['astronave','🚀','Astronave di mattoncini',80,7,'t']],
 m_costumi:[['supereroe','🦸','Costume da supereroe',25,3,'t'],['principessa','👸','Vestito da principessa',25,3,'t'],['dino','🦖','Costume da dinosauro',30,3,'t'],['pirata','🏴‍☠️','Cappello da pirata',8,3,'t']],
 m_peluche:[['orsetto','🧸','Orsetto di peluche',15,0,'t'],['unicorno','🦄','Unicorno di peluche',18,0,'t'],['cagnolinoP','🐶','Cagnolino di peluche',15,0,'t'],['squalo','🦈','Squalo di peluche',20,0,'t']],
};
const MTXT={w:n=>`Usi ${n}: che bello! 😍`,r:n=>`Leggi ${n} e impari tante cose! 📚`,e:n=>`Gnam! ${n}: buonissimo! 😋`,p:n=>`Giochi con gli animali: ${n} è perfett${n.endsWith('a')?'a':'o'}! 🐾`,m:n=>`Suoni ${n.toLowerCase()}: che musica! 🎶`,f:n=>`Regali ${n.toLowerCase()}: che sorriso! 💐`,d:n=>`Fai un disegno bellissimo con ${n.toLowerCase()}! 🎨`,v:n=>`Giochi al ${n.toLowerCase()}: livello superato! 🏆`,t:n=>`Giochi con ${n.toLowerCase()}: che divertimento! 🎉`};
Object.entries(MGOODS).forEach(([k,L])=>{GOODS[k]=L.map(([it,ic,n,p,a,ty])=>{
  if(!LOOT[it]&&ic){LOOT[it]={ic,n,w:0,inv:true};
    USE[it]=ty==='e'?()=>{add('fel',3);add('sal',ty==='e'&&/sushi|ramen/.test(it)?2:0);return MTXT.e(n)}:()=>{S.inv.push(it);add('fel',2);if(ty==='r'||ty==='m')add('int',1);return MTXT[ty](n)}}
  return [it,p,a]})});
const MSUB={m_scarpe:'Scarpe per tutti',m_libri:'Libri e fiabe',m_dolci:'Caramelle e dolcetti',m_pet:'Per cani, gatti e pesciolini',m_musica:'Strumenti musicali',m_profumi:'Profumi e saponi',m_gioielli:'Braccialetti e orologi',m_ottica:'Occhiali da sole',m_fiori:'Fiori e piante',m_carto:'Tutto per la scuola',m_video:'Giochi per la console',m_tel:'Telefoni e accessori',m_casa:'Cose belle per la cameretta',m_sushi:'Food court: sushi e ramen',m_burger:'Food court: hamburger e patatine',m_crepes:'Food court: dolci caldi',m_lego:'Costruisci quello che vuoi',m_costumi:'Travestimenti e carnevale',m_peluche:'Morbidissimi'};
MALLROWS.flat().forEach(([id,l])=>{if(id.startsWith('m_'))SHEET_T[id]=[ (MGOODS[id]&&MGOODS[id][0][1])||'🏬',l];if(!PAYPL.includes(id))PAYPL.push(id)});
SHEET_T.m_libri[0]='📚';SHEET_T.m_dolci[0]='🍭';SHEET_T.m_lego[0]='🧱';SHEET_T.m_parrucch=['💇','Parrucchiere'];SHEET_T.m_luna=['🎡','Sala giochi'];SHEET_T.m_tel[0]='📱';SHEET_T.m_casa[0]='🛋️';
Object.keys(MGOODS).forEach(k=>{PLACES[k]={sub:()=>MSUB[k]||'Negozio',body:()=>parPayBar(k)+goodsRows(k)+(k==='m_tel'?itemRows(SHOP.filter(i=>['telefono','computer','console'].includes(i.id))):'')}});
// parrucchiere: cambi colore dei capelli
PLACES.m_parrucch={sub:()=>'Taglio e colore',body:()=>parPayBar('m_parrucch')+`<p class="note">Scegli il colore nuovo per i tuoi capelli! 💇 (15 €)</p><div class="seg wrap">${Object.keys(HAIR).map(h=>`<button class="btn ${S.look.hair===HAIR[h]?'hot':'alt'}" data-hair9="${h}" ${canPay(15)?'':'disabled'}><span class="dot" style="background:${HAIR[h]}"></span> ${h}</button>`).join('')}</div>`};
function hair9(h){if(!canPay(15))return toast('Non hai abbastanza soldi. 💸');money(-15);S.look.hair=HAIR[h];add('fel',3);save();updateHud();refreshSheet();toast(`💇 Capelli ${h}: stai benissimo! ✨`)}
// sala giochi: giostre e giochi
const GIOSTRE=[['autoscontro','🚗','Autoscontro',3,'Bum! Bum! Hai fatto scontrare tutte le macchinine! 😂'],['giostra','🎠','Giostra dei cavalli',2,'Giri e giri sul cavallino… che bello! 🎠'],['flipper','🕹️','Flipper',1,'Ding ding ding! Record della sala giochi! 🏆'],['pesca','🧸','Pesca il peluche',2,null],['tappeto','💃','Ballo sul tappeto luminoso',2,'Balli a tempo di musica: perfetto! 💃'],['trampolini','🤸','Trampolini elastici',3,'Salti altissimo e fai una capriola! 🤸']];
PLACES.m_luna={sub:()=>'Giostre e giochi',body:()=>parPayBar('m_luna')+GIOSTRE.map(([k,ic,n,p])=>`<div class="row"><div class="t"><b>${ic} ${n}</b><span>${eur(p)}</span></div><button class="btn ${canPay(p)?'hot':''}" data-giostra="${k}" ${canPay(p)?'':'disabled'}>Gioca</button></div>`).join('')};
function giostra(k){const g=GIOSTRE.find(x=>x[0]===k);if(!g||!canPay(g[3]))return toast('Non hai abbastanza soldi. 💸');money(-g[3]);add('fel',3);count('gioca');
  let m=g[4];if(k==='pesca'){if(chance(.35)){const pz=pick(['orsetto','unicorno','cagnolinoP','squalo']);S.inv.push(pz);m=`Che bravura! Hai pescato: ${LOOT[pz].ic} ${LOOT[pz].n}! È nello zaino.`}else m='Uffa, il peluche è scivolato all\'ultimo! Riprova! 🧸'}
  save();updateHud();refreshSheet();toast(m)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-hair9],[data-giostra]');if(!b)return;if(b.dataset.hair9)hair9(b.dataset.hair9);else giostra(b.dataset.giostra)});

// il palazzo gigante visto da fuori
const MSIGNS=MALLROWS.flat();
function drawMega(){
  const b=BUILD.find(x=>x.id==='centro'),c=cx,X=b.x*T,Y=b.y*T,Wd=b.w*T,Hd=b.h*T,fh=T*3.2,fy=Y+Hd-fh,t=performance.now();
  c.fillStyle='rgba(0,0,0,.18)';c.fillRect(X+14,Y+16,Wd+6,Hd);
  // tetto con i lucernari
  c.fillStyle='#c2cad4';c.fillRect(X,Y,Wd,Hd-fh);c.fillStyle='rgba(0,0,0,.05)';for(let yy=Y;yy<Y+Hd-fh;yy+=T)c.fillRect(X,yy,Wd,2);c.fillStyle='#8f99a8';c.fillRect(X,Y,Wd,10);c.fillRect(X,Y,10,Hd-fh);c.fillRect(X+Wd-10,Y,10,Hd-fh);c.fillStyle='#6e7888';c.fillRect(X,Y+Hd-fh-10,Wd,10);
  for(let r=0;r<4;r++){const ly=Y+T*2+r*T*7.2;const g=c.createLinearGradient(0,ly,0,ly+T*2.4);g.addColorStop(0,'#bfe0ef');g.addColorStop(.5,'#7fb3d1');g.addColorStop(1,'#a9d0e4');c.fillStyle=g;c.fillRect(X+T*2,ly,Wd-T*4,T*2.4);
    c.fillStyle='rgba(255,255,255,.5)';for(let x=X+T*2;x<X+Wd-T*2;x+=T){c.fillRect(x,ly,2,T*2.4)}}
  c.fillStyle='#aab3bf';for(let i=0;i<14;i++){const hx=X+T*3+i*T*6,hy=Y+T*4.6+(i%3)*T*7.2;c.fillRect(hx,hy,T*1.2,T*.9);c.fillStyle='#8d96a3';c.beginPath();c.arc(hx+T*.6,hy+T*.45,T*.3,0,7);c.fill();c.fillStyle='#aab3bf'}
  // cupola centrale e scritta gigante sul tetto
  const cxm=X+Wd/2,cym=Y+(Hd-fh)/2;c.fillStyle='#e9eef3';c.beginPath();c.ellipse(cxm,cym,T*6,T*4,0,0,7);c.fill();
  const gd=c.createRadialGradient(cxm-T*2,cym-T*1.5,T,cxm,cym,T*5.5);gd.addColorStop(0,'#e8f6ff');gd.addColorStop(1,'#6fa9c9');c.fillStyle=gd;c.beginPath();c.ellipse(cxm,cym,T*5.4,T*3.5,0,0,7);c.fill();
  c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=2;for(let a=0;a<8;a++){c.beginPath();c.moveTo(cxm,cym);c.lineTo(cxm+Math.cos(a*Math.PI/4)*T*5.4,cym+Math.sin(a*Math.PI/4)*T*3.5);c.stroke()}
  c.fillStyle='#1f2540';c.font='800 96px "Baloo 2",system-ui';c.textAlign='center';c.textBaseline='middle';c.fillText('MEGA CENTRO COMMERCIALE',cxm,Y+T*8.2);
  c.fillText('🏬 '+MSIGNS.length+' NEGOZI',cxm,Y+T*22.6);
  // facciata con le vetrine e le insegne
  c.fillStyle='#e8edf5';c.fillRect(X,fy,Wd,fh);c.fillStyle='#4a5a73';c.fillRect(X,fy,Wd,14);
  const n=MSIGNS.length,sw=(Wd-40)/n;
  MSIGNS.forEach(([id,l,col],i)=>{const sx=X+20+i*sw;
    c.fillStyle=col;rr(c,sx+4,fy+22,sw-8,22,5);c.fill();c.fillStyle='#fff';c.font='700 11px "Atkinson Hyperlegible",system-ui';c.textAlign='center';c.fillText(l.length>14?l.slice(0,13)+'…':l,sx+sw/2,fy+33.5);
    const g=c.createLinearGradient(0,fy+52,0,fy+fh);g.addColorStop(0,'#9cc6dc');g.addColorStop(1,'#cfe6f1');c.fillStyle=g;c.fillRect(sx+6,fy+52,sw-12,fh-56);
    c.fillStyle=col;for(let k=0;k<3;k++){rr(c,sx+12+k*(sw-24)/3,fy+fh-24,(sw-30)/3,16,3);c.fill()}
    c.fillStyle='rgba(255,255,255,.35)';c.fillRect(sx+10,fy+54,6,fh-60)});
  // porte d'ingresso
  (b.doors||[]).forEach(([dx,dy])=>{const DX=dx*T+T/2;
    if(dy===b.y+b.h){c.fillStyle='#1f2540';rr(c,DX-70,fy-6,140,26,8);c.fill();c.fillStyle='#fff';c.font='800 13px "Atkinson Hyperlegible",system-ui';c.textAlign='center';c.fillText('🏬 INGRESSO',DX,fy+7);
      c.fillStyle='#3a3f44';c.fillRect(DX-34,Y+Hd-62,68,62);c.fillStyle='#bfe0ef';c.fillRect(DX-31,Y+Hd-59,30,59);c.fillRect(DX+1,Y+Hd-59,30,59)}
    else if(dx<b.x){const DY=dy*T;c.fillStyle='#3a3f44';c.fillRect(X-4,DY-6,14,T+12);c.fillStyle='#bfe0ef';c.fillRect(X-2,DY-2,10,T+4);c.fillStyle='#1f2540';rr(c,X+12,DY-4,96,22,6);c.fill();c.fillStyle='#fff';c.font='800 11px "Atkinson Hyperlegible",system-ui';c.textAlign='left';c.fillText('⬅ INGRESSO',X+20,DY+7)}
    else{c.fillStyle='#3a3f44';c.fillRect(DX-34,Y-4,68,16);c.fillStyle='#bfe0ef';c.fillRect(DX-31,Y-2,62,10);c.fillStyle='#1f2540';rr(c,DX-60,Y+16,120,22,6);c.fill();c.fillStyle='#fff';c.font='800 11px "Atkinson Hyperlegible",system-ui';c.textAlign='center';c.fillText('⬆ INGRESSO',DX,Y+27)}});
  // bandierine sulla piazza
  for(let x=b.x+3;x<b.x+b.w;x+=8){const px=x*T,py=(b.y+b.h)*T+T*3.3;c.fillStyle='#9aa3b5';c.fillRect(px,py-60,3,60);c.fillStyle=['#e5484d','#3b6fe0','#f5a700','#16a34a'][x%4];c.beginPath();c.moveTo(px+3,py-60);c.lineTo(px+26+Math.sin(t/300+x)*3,py-52);c.lineTo(px+3,py-44);c.closePath();c.fill()}
  c.textAlign='center';
}
