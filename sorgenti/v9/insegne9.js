/* ================= v9: cartelloni pubblicitari sui tetti (come le città di GTA), con marche inventate e luci di notte ================= */
const AD9=[['🍦','GELATO POLARE','Freddo… da paura!','#2fb6e8','#ffffff'],['🍕','PIZZA RAZZO','Arriva in 10 minuti!','#e5484d','#ffe08a'],['📻','RADIO VITA FM','La musica della città','#7b2cbf','#ffd23a'],
  ['🚀','CENTRO SPAZIALE','Vieni a vedere i razzi!','#1d2340','#9fd3ff'],['🥤','BOLLA COLA','Tante bollicine!','#d62828','#ffffff'],['🐶','CROCCHETTE FIDO','Il cane è contento','#f4a261','#3a2a1c'],
  ['🎢','LUNA PARK','Giostre tutto l\'anno','#ff006e','#ffffff'],['📚','BIBLIOTECA','Un libro al giorno!','#2a9d8f','#ffffff'],['🦁','ZOO','I leoni ti aspettano','#5f8a3b','#ffe08a'],
  ['🍫','CIOCCOLATO STELLA','Il più buono!','#5a3a24','#ffd23a'],['⚽','CLUB SPORTIVO','Corri con noi!','#16a34a','#ffffff'],['🎬','CINEMA','Stasera: Pinguini nello spazio','#3b1d5e','#ffd23a']];
TD.adMats=TD.adMats||{};
function tdAdMat(i){if(TD.adMats[i])return TD.adMats[i];const [ic,t,s,bg,fg]=AD9[i%AD9.length],[c,g]=tdCan(512,256);
  const gr=g.createLinearGradient(0,0,0,256);gr.addColorStop(0,bg);gr.addColorStop(1,shade(bg,.72));g.fillStyle=gr;g.fillRect(0,0,512,256);
  g.fillStyle='rgba(255,255,255,.12)';g.beginPath();g.arc(430,40,170,0,7);g.fill();
  g.font='130px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText(ic,100,128);
  g.fillStyle=fg;g.textAlign='left';let fs=58;g.font=`900 ${fs}px "Baloo 2",system-ui`;while(g.measureText(t).width>310&&fs>26){fs-=2;g.font=`900 ${fs}px "Baloo 2",system-ui`}g.fillText(t,190,104);
  g.font='700 30px system-ui';g.globalAlpha=.92;let ss=30;while(g.measureText(s).width>310&&ss>16){ss-=2;g.font=`700 ${ss}px system-ui`}g.fillText(s,192,170);g.globalAlpha=1;
  g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=10;g.strokeRect(5,5,502,246);
  const tx=new THREE.CanvasTexture(c);tx.encoding=THREE.sRGBEncoding;tx.anisotropy=4;
  const m=new THREE.MeshLambertMaterial({map:tx,emissive:new THREE.Color(1,1,1),emissiveMap:tx,emissiveIntensity:0});return TD.adMats[i]=m}
{const _b=tdBuilding;tdBuilding=function(grp,o){const H=_b.apply(this,arguments);try{
  if(o.gable||(o.b&&(o.b.custom||o.b.id==='stadio'))||H<3.6||Math.max(o.w,o.h)<4)return H;const k=h9r(o.x,o.y,9);if(k>.5)return H;
  const long=o.w>=o.h,bw=Math.min(4.2,(long?o.w:o.h)-.8),bh=bw*.5,cxp=o.x+o.w/2,czp=o.y+o.h/2,ry=long?0:Math.PI/2,leg=.55;
  // il lato del cartellone guarda verso la strada più vicina
  const near=long?(at(Math.floor(cxp),o.y+o.h+1)===1||at(Math.floor(cxp),o.y+o.h+2)===1?1:-1):(at(o.x+o.w+1,Math.floor(czp))===1||at(o.x+o.w+2,Math.floor(czp))===1?1:-1);
  const off=(long?o.h:o.w)*.5-.45,px=cxp+(long?0:near*off),pz=czp+(long?near*off:0),face=ry+(near<0?Math.PI:0);
  const idx=Math.floor(h9r(o.x,o.y,10)*AD9.length),pane=new THREE.Mesh(new THREE.PlaneGeometry(bw,bh),tdAdMat(idx));
  pane.position.set(px+Math.sin(face)*.07,H+leg+bh/2,pz+Math.cos(face)*.07);pane.rotation.y=face;tdSt(pane);(TD.ads=TD.ads||[]).push([px,H+leg+bh/2,pz,face]);
  const back=new THREE.Mesh(tdBox(bw+.12,bh+.12,.1),tdMat('#3a3f45'));back.position.set(px,H+leg+bh/2,pz);back.rotation.y=face;back.castShadow=true;tdSt(back);
  const pm=tdMat('#4b5157');[-1,1].forEach(s=>{const p=new THREE.Mesh(tdBox(.1,leg+bh*.6,.1),pm);p.position.set(px+Math.cos(face)*s*bw*.35,H+(leg+bh*.6)/2,pz-Math.sin(face)*s*bw*.35);p.rotation.y=face;tdSt(p)});
  // faretti che lo illuminano
  const lm=tdMat('#2a2d31');[-1,0,1].forEach(s=>{const l=new THREE.Mesh(tdBox(.16,.06,.22),lm);l.position.set(px+Math.cos(face)*s*bw*.33+Math.sin(face)*.3,H+leg+bh+.12,pz-Math.sin(face)*s*bw*.33+Math.cos(face)*.3);l.rotation.y=face;tdSt(l)})}catch(e){}return H}}
// di notte i cartelloni si accendono
{const _l=tdLight;tdLight=function(){const r=_l.apply(this,arguments);try{const d=Math.min(1,gtaDark()/.5);for(const k in TD.adMats)TD.adMats[k].emissiveIntensity=d*.85}catch(e){}return r}}
