/* ================= v9: le tue imprese come in GTA: statistiche e percentuale di completamento (nel pannello 🎯) ================= */
const ST9={lx:null,ly:null};
{const _s=step;step=function(dt){const r=_s(dt);try{if(!S||!S.alive)return r;if((JK.stars||0)>(S.maxst9||0))S.maxst9=JK.stars;
  if(typeof rdInCar==='function'&&rdInCar()&&S.scene==='citta'){if(ST9.lx!=null){const d=Math.hypot(S.pos.x-ST9.lx,S.pos.y-ST9.ly);if(d<3)S.km9=(S.km9||0)+d*.004}ST9.lx=S.pos.x;ST9.ly=S.pos.y}else ST9.lx=null}catch(e){}return r}}
{const _b=jkBig;jkBig=function(txt){try{if(S&&/^SEMINATI/.test(txt))S.esc9=(S.esc9||0)+1}catch(e){}return _b.apply(this,arguments)}}
{const _h=heBoom;heBoom=function(v,st,npc){try{if(S&&!npc&&performance.now()-(HE9.lb||0)>=700)S.boom9=(S.boom9||0)+1}catch(e){}return _h.apply(this,arguments)}}
function st9List(){const pk=(S.pk9||[]).length;return [
  ['📦','Pacchi segreti trovati',pk+' / 20',pk/20],
  ['🍕','Consegne a tempo',S.mx9||0,(S.mx9||0)/10],
  ['🚕','Corse in taxi',S.taxi9||0,(S.taxi9||0)/10],
  ['🚗','Km guidati',(S.km9||0).toFixed(1)+' km',(S.km9||0)/20],
  ['🚌','Viaggi in autobus',S.bus9||0,(S.bus9||0)/5],
  ['😎','Volte che hai seminato la polizia',S.esc9||0,(S.esc9||0)/5],
  ['🎨','Macchine riverniciate in officina',S.spray9||0,(S.spray9||0)/3],
  ['⭐','Stelle della polizia (record)','★'.repeat(S.maxst9||0)+'☆'.repeat(Math.max(0,3-(S.maxst9||0))),(S.maxst9||0)/3],
  ['🚔','Volte che ti ha preso la polizia',S.stole9||0,null],
  ['💥','Botti con la macchina',S.boom9||0,null]]}
function st9Card(){const L=st9List(),P=L.filter(a=>a[3]!=null),pc=Math.round(100*P.reduce((s,a)=>s+Math.min(1,a[3]),0)/P.length);
  return `<details style="margin:0 0 12px;background:#1f2540;color:#fff;border-radius:16px;padding:10px 14px;box-shadow:0 3px 0 rgba(0,0,0,.2)"><summary style="list-style:none;cursor:pointer">
  <div style="display:flex;align-items:center;gap:8px;font:800 16px system-ui"><span style="font-size:22px">📊</span> Le tue imprese <span style="font:600 12px system-ui;opacity:.7">(tocca)</span><span style="margin-left:auto;color:#ffd23a;font:900 20px system-ui">${pc}%</span></div>
  <div style="height:10px;border-radius:6px;background:rgba(255,255,255,.15);margin:8px 0 2px;overflow:hidden"><div style="height:100%;width:${pc}%;background:linear-gradient(90deg,#3ddc84,#ffd23a)"></div></div></summary>
  ${L.map(([ic,t,v,k])=>`<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-top:1px solid rgba(255,255,255,.08);font:600 14px system-ui"><span style="font-size:18px;width:24px;text-align:center">${ic}</span><span style="flex:1">${t}</span><b style="color:${k!=null&&k>=1?'#3ddc84':'#fff'}">${v}${k!=null&&k>=1?' ✔':''}</b></div>`).join('')}
  <div style="font:500 12px system-ui;opacity:.75;margin-top:6px">Arriva al 100% come in GTA! 😎</div></details>`}
{const _g=goalsBody;goalsBody=function(){const b=_g.apply(this,arguments);try{if(!S||S.age<8)return b;return st9Card()+b}catch(e){return b}}}
