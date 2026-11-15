/* ================= v9: medaglie delle consegne (missioni9.js) e app «Medaglie» nel telefono ================= */
// medaglie del fattorino: più consegne fai, più medaglie vinci (con un premio in soldi)
const MXM9=[[5,'🥉','Bronzo',50],[15,'🥈','Argento',150],[30,'🥇','Oro',300],[50,'💎','Diamante',500],[100,'👑','Re delle consegne',1000]];
function mxMedal(){if(!S)return;const n=S.mx9||0;S.mxM9=S.mxM9||0;const m=MXM9.filter(x=>n>=x[0]);if(m.length<=S.mxM9)return;const x=m[m.length-1];S.mxM9=m.length;money(x[3]);add('fel',6);save();updateHud();
  if(typeof gtaPassed==='function')gtaPassed(`MEDAGLIA ${x[2].toUpperCase()}! ${x[1]}`,`${n} consegne fatte! Premio: +${x[3]} €`);else toast(`${x[1]} Medaglia ${x[2]}! ${n} consegne. +${x[3]} €`)}
PHX9.med9={t:'🏅 Medaglie',h:()=>{const n=(S&&S.mx9)||0,nx=MXM9.find(x=>n<x[0]);
  return `<div class="scr"><p style="margin:0 0 10px;color:var(--soft)">Consegne fatte in tempo: <b>${n}</b>. Chiedi «hai una missione?» a Totò, Gino, Beppe, Rosa, Lucia, Marta, Giacomo, Davide, alla Dottoressa Neri o alla Signora Anna.</p>
  <div style="display:grid;gap:8px">${MXM9.map(([k,i,t,p])=>{const ok=n>=k,pc=Math.min(100,Math.round(n/k*100));return `<div style="display:flex;gap:10px;align-items:center;padding:9px 11px;border-radius:14px;background:${ok?'rgba(255,200,60,.16)':'rgba(127,127,127,.08)'}">
  <span style="font-size:30px;${ok?'':'filter:grayscale(1);opacity:.45'}">${i}</span><span style="flex:1"><b>${t}</b> · ${k} consegne<br><small style="color:var(--soft)">${ok?'✅ Vinta! Premio '+p+' €':'Premio '+p+' € · '+n+'/'+k}</small>
  <span style="display:block;height:6px;border-radius:4px;background:rgba(127,127,127,.25);margin-top:4px"><span style="display:block;height:100%;width:${pc}%;border-radius:4px;background:${ok?'#f2b632':'#3fd98a'}"></span></span></span></div>`}).join('')}</div>
  ${nx?`<p style="margin:12px 0 0;text-align:center;font-weight:700">Prossima medaglia: ${nx[1]} ${nx[2]} tra ${nx[0]-n} consegne!</p>`:'<p style="margin:12px 0 0;text-align:center;font-weight:700">👑 Hai vinto tutte le medaglie!</p>'}</div>`}};
{const _a=phApps;phApps=function(){const L=_a.apply(this,arguments),i=L.findIndex(x=>x[0]==='set');L.splice(i<0?L.length:i,0,['med9','🏅','Medaglie']);return L}}
