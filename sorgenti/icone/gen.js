const fs=require('fs');
// ---------- icona del gioco: città 3D al tramonto + scritta VITA ----------
function iso(gx,gy,w,d,h,cols,win){const S=27,ox=256,oy=318;const P=(x,y,z)=>[ox+(x-y)*S,oy+(x+y)*S*0.5-z];
  const x0=gx,y0=gy,x1=gx+w,y1=gy+d;const t=[P(x0,y0,h),P(x1,y0,h),P(x1,y1,h),P(x0,y1,h)],L=[P(x0,y1,h),P(x1,y1,h),P(x1,y1,0),P(x0,y1,0)],R=[P(x1,y0,h),P(x1,y1,h),P(x1,y1,0),P(x1,y0,0)];
  const pp=a=>a.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ');let s=`<polygon points="${pp(L)}" fill="${cols[1]}"/><polygon points="${pp(R)}" fill="${cols[2]}"/><polygon points="${pp(t)}" fill="${cols[0]}"/>`;
  if(win){const rows=Math.floor((h-14)/16);for(let r=0;r<rows;r++){const z=h-12-r*16;
    for(let i=0;i<w*2;i++){const a=P(x0+(i+.25)/2,y1,z),b=P(x0+(i+.75)/2,y1,z),c=P(x0+(i+.75)/2,y1,z-8),dd=P(x0+(i+.25)/2,y1,z-8);const on=((r*7+i*3+gx*5)%5)>1;s+=`<polygon points="${pp([a,b,c,dd])}" fill="${on?'#ffd772':'#2c3557'}" opacity="${on?.95:.8}"/>`}
    for(let i=0;i<d*2;i++){const a=P(x1,y0+(i+.25)/2,z),b=P(x1,y0+(i+.75)/2,z),c=P(x1,y0+(i+.75)/2,z-8),dd=P(x1,y0+(i+.25)/2,z-8);const on=((r*5+i*2+gy*3)%4)>0;s+=`<polygon points="${pp([a,b,c,dd])}" fill="${on?'#ffe9a8':'#3a4470'}" opacity="${on?.9:.8}"/>`}}}
  return s}
const B=[ // gx,gy,w,d,h, colori (tetto, sinistra, destra)
 [-3.2,-3.4,1.4,1.4,150,['#9fb3ff','#5b67b8','#7684d6']],
 [-1.0,-3.6,1.5,1.6,215,['#ffb3a1','#c0566a','#e07a7f']],
 [1.2,-3.6,1.6,1.6,170,['#a8f0d0','#2e9a7a','#46bf98']],
 [-3.6,-1.0,1.6,1.5,110,['#ffe08a','#c98a2c','#e8a93f']],
 [-1.0,-1.0,1.5,1.5,135,['#c9b6ff','#6b52c4','#8a72e0']],
 [1.2,-1.0,1.6,1.5,95,['#ffc4dd','#c45a8a','#e07aa8']],
];
const Q=(x,y,z)=>[256+(x-y)*27,318+(x+y)*13.5-(z||0)];const pp=a=>a.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ');
function ground(){const a=-4,b=3.2;let g=`<polygon points="${pp([Q(a,a),Q(b,a),Q(b,b),Q(a,b)])}" fill="#3ccf78"/><polygon points="${pp([Q(a,b),Q(b,b),Q(b,b,-14),Q(a,b,-14)])}" fill="#1f8a4c"/><polygon points="${pp([Q(b,a),Q(b,b),Q(b,b,-14),Q(b,a,-14)])}" fill="#28a05a"/>`;
  g+=`<polygon points="${pp([Q(-1.55,a),Q(-1.25,a),Q(-1.25,b),Q(-1.55,b)])}" fill="#4b5263"/><polygon points="${pp([Q(a,-1.55),Q(b,-1.55),Q(b,-1.25),Q(a,-1.25)])}" fill="#4b5263"/><polygon points="${pp([Q(a,.65),Q(b,.65),Q(b,.95),Q(a,.95)])}" fill="#4b5263"/><polygon points="${pp([Q(.65,a),Q(.95,a),Q(.95,b),Q(.65,b)])}" fill="#4b5263"/>`;return g}
let city='';const T=[[2.4,2.4],[-3.3,2.4],[2.4,-3.3],[-0.2,2.5],[2.5,-0.2],[-3.4,0.1]];const all=B.map(b=>({k:b[0]+b[1]+b[2]+b[3],s:()=>iso(b[0],b[1],b[2],b[3],b[4],b[5],1)})).concat(T.map(([x,y])=>({k:x+y+0.6,s:()=>{const [px,py]=Q(x+.3,y+.3);return tree(px,py-14,17)}})));all.sort((a,b)=>a.k-b.k).forEach(o=>city+=o.s());
// alberi davanti
function tree(x,y,r){return `<ellipse cx="${x}" cy="${y+r*.9}" rx="${r*.8}" ry="${r*.25}" fill="#000" opacity=".18"/><rect x="${x-3}" y="${y}" width="6" height="${r*.9}" rx="2" fill="#6b4226"/><circle cx="${x}" cy="${y-r*.2}" r="${r}" fill="#2fbf6a"/><circle cx="${x-r*.35}" cy="${y-r*.45}" r="${r*.45}" fill="#5fe08e"/>`}
const mkGame=M=>`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b2f7a"/><stop offset=".45" stop-color="#7a4fb0"/><stop offset=".72" stop-color="#ff8a6b"/><stop offset="1" stop-color="#ffc56b"/></linearGradient>
<radialGradient id="sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6c8"/><stop offset=".6" stop-color="#ffd36b"/><stop offset="1" stop-color="#ffd36b" stop-opacity="0"/></radialGradient>
<linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2fae62"/><stop offset="1" stop-color="#1b7a45"/></linearGradient>
<linearGradient id="tx" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d9fbe6"/></linearGradient></defs>
<rect width="512" height="512" fill="url(#sky)"/>
<circle cx="370" cy="150" r="70" fill="url(#sun)"/>
${[[70,70],[130,40],[200,95],[300,55],[440,85],[460,40],[95,140]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.6" fill="#fff" opacity=".85"/>`).join('')}
<path d="M0 330 Q 128 300 256 326 T 512 320 L512 512 L0 512Z" fill="url(#gr)"/><rect x="0" y="${M?371:400}" width="512" height="${M?141:112}" fill="#145c33" opacity=".55"/><g transform="${M?'translate(51.2 51.2) scale(.8)':''}">
${ground()}
${city}

<g font-family="Inter, sans-serif" font-weight="900" text-anchor="middle">
<text x="256" y="436" font-size="26" letter-spacing="5" fill="#0b3d22" opacity=".45">GIOCO DELLA</text><text x="256" y="434" font-size="26" letter-spacing="5" fill="#ffffff">GIOCO DELLA</text>
<text x="256" y="497" font-size="66" letter-spacing="10" fill="#0b3d22" opacity=".5" dy="4">VITA</text><text x="256" y="497" font-size="66" letter-spacing="10" fill="url(#tx)">VITA</text></g></g>
</svg>`;const game=mkGame(0);
// ---------- icona degli account: due amici e un badge ----------
const mkAcc=M=>`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1fd1a0"/><stop offset=".55" stop-color="#139a78"/><stop offset="1" stop-color="#0b5f53"/></linearGradient>
<radialGradient id="gl" cx=".3" cy=".2" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
<rect width="512" height="512" fill="url(#bg)"/><rect width="512" height="512" fill="url(#gl)"/>
<g transform="${M?'translate(51.2 51.2) scale(.8)':''}"><circle cx="256" cy="250" r="168" fill="#ffffff" opacity=".14"/>
<!-- amico dietro -->
<path d="M268 392 q0-92 72-92 q72 0 72 92z" fill="#ffb648"/><circle cx="340" cy="232" r="50" fill="#ffd9b0"/><path d="M290 226 q4-56 52-56 q46 0 48 50 q-22-20-56-18 q-26 2-44 24z" fill="#5a3a22"/>
<circle cx="324" cy="236" r="5" fill="#2a1f1a"/><circle cx="356" cy="236" r="5" fill="#2a1f1a"/><path d="M326 256 q14 12 28 0" stroke="#2a1f1a" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- amico davanti -->
<path d="M96 410 q0-108 86-108 q86 0 86 108z" fill="#6c8cff"/><circle cx="182" cy="226" r="60" fill="#f6c9a0"/><path d="M120 222 q2-70 64-70 q60 0 62 66 q-12-26-62-30 q-46 0-64 34z" fill="#2b2b3a"/>
<circle cx="162" cy="230" r="6" fill="#2a1f1a"/><circle cx="202" cy="230" r="6" fill="#2a1f1a"/><circle cx="150" cy="250" r="8" fill="#ff9b9b" opacity=".6"/><circle cx="214" cy="250" r="8" fill="#ff9b9b" opacity=".6"/><path d="M164 254 q18 16 36 0" stroke="#2a1f1a" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- badge con la spunta -->
<circle cx="382" cy="378" r="56" fill="#ffffff"/><circle cx="382" cy="378" r="44" fill="#ffcc33"/><path d="M360 380 l16 16 l30 -32" stroke="#ffffff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
</svg>`;const acc=mkAcc(0);
fs.writeFileSync('gioco.svg',game);fs.writeFileSync('account.svg',acc);
fs.writeFileSync('gioco-m.svg',mkGame(1));fs.writeFileSync('account-m.svg',mkAcc(1));
