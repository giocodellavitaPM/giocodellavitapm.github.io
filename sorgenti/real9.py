# v9: grafica più realistica (persone, macchine, alberi)
rep("""  if(!noShadow){c.fillStyle='rgba(0,0,0,.22)';c.beginPath();c.ellipse(0,0,10,3.5,0,0,7);c.fill()}
  const sw=moving""","""  if(!noShadow){const sg=c.createRadialGradient(0,0,1,0,0,12);sg.addColorStop(0,'rgba(0,0,0,.32)');sg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=sg;c.beginPath();c.ellipse(0,0,12,4.2,0,0,7);c.fill()}
  const sw=moving""")
# busto con luce e pieghe
rep("""  c.fillStyle=L.shirt;c.beginPath();c.moveTo(-bw,-44);c.lineTo(bw,-44);c.lineTo(bw-1,-24);c.lineTo(-bw+1,-24);c.closePath();c.fill();
  c.fillStyle='rgba(0,0,0,.12)';c.fillRect(side?-fx*bw:bw-3,-44,3,20);""","""  {const bg=c.createLinearGradient(-bw,0,bw,0);bg.addColorStop(0,shade(L.shirt,1.12));bg.addColorStop(.55,L.shirt);bg.addColorStop(1,shade(L.shirt,.72));c.fillStyle=bg}
  c.beginPath();c.moveTo(-bw,-44);c.quadraticCurveTo(0,-46,bw,-44);c.lineTo(bw-1,-24);c.lineTo(-bw+1,-24);c.closePath();c.fill();
  c.fillStyle='rgba(0,0,0,.14)';c.fillRect(side?-fx*bw:bw-3,-44,3,20);c.fillStyle='rgba(0,0,0,.1)';c.fillRect(-bw+1,-26,bw*2-2,2);
  if(!back&&!side&&!L.coat){c.strokeStyle='rgba(0,0,0,.18)';c.lineWidth=.8;c.beginPath();c.moveTo(-2.5,-44);c.lineTo(0,-41);c.lineTo(2.5,-44);c.stroke();c.beginPath();c.moveTo(-3,-33);c.lineTo(-1,-31);c.stroke()}""")
# testa sfumata, orecchie, sopracciglia, naso
rep("""  c.fillStyle=L.skin;c.beginPath();c.ellipse(0,hy,6.3,7,0,0,7);c.fill();
  c.fillStyle='rgba(0,0,0,.08)';""","""  if(!back){c.fillStyle=skinD;c.beginPath();c.ellipse(side?-fx*5:-6.2,hy+.5,1.6,2.4,0,0,7);c.fill();if(!side){c.beginPath();c.ellipse(6.2,hy+.5,1.6,2.4,0,0,7);c.fill()}}
  {const hg=c.createRadialGradient(-2,hy-2.5,1,0,hy,8);hg.addColorStop(0,shade(L.skin,1.08));hg.addColorStop(1,shade(L.skin,.9));c.fillStyle=hg}c.beginPath();c.ellipse(0,hy,6.3,7,0,0,7);c.fill();
  c.fillStyle='rgba(0,0,0,.08)';""")
rep("""    else{c.fillRect(-2.9,hy,1.4,1.5);c.fillRect(1.5,hy,1.4,1.5);c.fillStyle='rgba(120,60,50,.55)';c.fillRect(-1.5,hy+3.6,3,.9)}""",
"""    else{c.fillStyle='#fbfbf8';c.fillRect(-3.4,hy-.2,2.4,1.9);c.fillRect(1,hy-.2,2.4,1.9);c.fillStyle='#3b2a20';c.fillRect(-2.6,hy,1.3,1.6);c.fillRect(1.6,hy,1.3,1.6);
      c.fillStyle=shade(L.hair,.8);c.fillRect(-3.6,hy-1.8,2.8,.8);c.fillRect(.9,hy-1.8,2.8,.8);
      c.fillStyle='rgba(0,0,0,.13)';c.fillRect(-.4,hy+.8,1.2,2.2);c.fillStyle='rgba(150,70,60,.6)';c.fillRect(-1.6,hy+3.8,3.2,.9);c.fillStyle='rgba(230,120,110,.16)';c.beginPath();c.arc(-3.6,hy+2.4,1.5,0,7);c.arc(3.6,hy+2.4,1.5,0,7);c.fill()}""")
# macchine: ruote, carrozzeria lucida, riflessi
rep("""  c.fillStyle='rgba(0,0,0,.25)';rr(c,-L/2+3,-Wc/2+4,L,Wc,7);c.fill();
  c.fillStyle=col;rr(c,-L/2,-Wc/2,L,Wc,sh==='van'?5:7);c.fill();""","""  c.fillStyle='rgba(0,0,0,.16)';rr(c,-L/2+1,-Wc/2+2,L+6,Wc+6,9);c.fill();c.fillStyle='rgba(0,0,0,.22)';rr(c,-L/2+3,-Wc/2+4,L,Wc,7);c.fill();
  c.fillStyle='#1c1c1e';[[-L*.3,-1],[L*.28,-1],[-L*.3,1],[L*.28,1]].forEach(([wx,s])=>{rr(c,wx-5.5,s*Wc/2-(s<0?2.5:2.5),11,5,2);c.fill()});
  {const bg=c.createLinearGradient(0,-Wc/2,0,Wc/2);bg.addColorStop(0,shade(col,1.22));bg.addColorStop(.45,col);bg.addColorStop(1,shade(col,.7));c.fillStyle=bg}rr(c,-L/2,-Wc/2,L,Wc,sh==='van'?5:7);c.fill();
  c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=1;rr(c,-L/2+.5,-Wc/2+.5,L-1,Wc-1,sh==='van'?5:7);c.stroke();
  c.fillStyle='rgba(255,255,255,.22)';rr(c,-L/2+5,-Wc/2+2,L-10,3,1.5);c.fill();c.fillStyle='rgba(0,0,0,.25)';c.fillRect(-L/2+L*.35,-Wc/2-1.2,4,2.2);c.fillRect(-L/2+L*.35,Wc/2-1,4,2.2);""")
rep("""    c.fillStyle='#3d4a55';rr(c,-L/2+L*(r0+rw)-L*.1,-Wc/2+4,L*.1,Wc-8,2);c.fill();rr(c,-L/2+L*r0,-Wc/2+4,L*.08,Wc-8,2);c.fill();""",
"""    {const wg=c.createLinearGradient(0,-Wc/2,0,Wc/2);wg.addColorStop(0,'#6f8aa0');wg.addColorStop(.5,'#2c3946');wg.addColorStop(1,'#1d2630');c.fillStyle=wg}rr(c,-L/2+L*(r0+rw)-L*.1,-Wc/2+4,L*.1,Wc-8,2);c.fill();rr(c,-L/2+L*r0,-Wc/2+4,L*.08,Wc-8,2);c.fill();
    c.fillStyle='rgba(255,255,255,.35)';c.beginPath();c.moveTo(-L/2+L*(r0+rw)-L*.08,-Wc/2+5);c.lineTo(-L/2+L*(r0+rw)-L*.04,-Wc/2+5);c.lineTo(-L/2+L*(r0+rw)-L*.07,-2);c.closePath();c.fill();""")
# alberi: chioma con luce e foglie
rep("""  [['#35582a',0,-6,sz],['#416b31',-sz*.35,-9,sz*.7],['#4a7a37',sz*.3,-10,sz*.65],['#5a8c44',-sz*.15,-14,sz*.5],['#6b9c52',-sz*.3,-16,sz*.28]].forEach(([c,dx,dy,rr2])=>{cx.fillStyle=c;cx.beginPath();cx.arc(X+dx,Y+dy,rr2,0,7);cx.fill()});""",
"""  {const tg=cx.createLinearGradient(X-3,0,X+3,0);tg.addColorStop(0,'#6e5440');tg.addColorStop(1,'#3e2e20');cx.fillStyle=tg;cx.fillRect(X-3,Y,6,14)}
  [['#2c4a23',0,-6,sz],['#3a6129',-sz*.35,-9,sz*.7],['#43702f',sz*.3,-10,sz*.65],['#558540',-sz*.15,-14,sz*.5],['#6b9c52',-sz*.3,-16,sz*.28]].forEach(([c,dx,dy,rr2])=>{const g=cx.createRadialGradient(X+dx-rr2*.35,Y+dy-rr2*.4,1,X+dx,Y+dy,rr2);g.addColorStop(0,shade(c,1.25));g.addColorStop(1,shade(c,.82));cx.fillStyle=g;cx.beginPath();cx.arc(X+dx,Y+dy,rr2,0,7);cx.fill()});
  for(let k=0;k<14;k++){const a=r()*6.28,d=r()*sz*.85;cx.fillStyle=k%3?'rgba(120,170,90,.45)':'rgba(20,40,15,.3)';cx.beginPath();cx.arc(X+Math.cos(a)*d,Y-8+Math.sin(a)*d*.8,1.8+r()*1.8,0,7);cx.fill()}""")
