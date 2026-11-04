const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:411,height:860}});const errs=[];p.on('pageerror',e=>errs.push('ERR '+e.message+' @'+(e.stack||'').split('\n')[1]));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push('CERR '+m.text().slice(0,200))});
await p.goto('file://'+process.cwd()+'/'+(process.env.DIR||'vita9')+'/index.html');await p.evaluate(()=>{localStorage.clear()});await p.reload();await p.waitForTimeout(800);
await p.click('#born');await p.waitForTimeout(500);await p.evaluate(()=>{ui.result=null;renderModal();setAge(8);S.scene='citta';save();updateHud()});
const N=+(process.argv[2]||200);const keys=['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'];const PH=['ciao','come stai?','mi racconti una barzelletta?','ho paura','perché?','mi aiuti?','quanti anni hai?','giochiamo a calcio','sei bravo a tennis?','mi presti la palla?','che ore sono?','asdfgh','ti voglio bene','fammi una domanda','42','sì','no','non lo so','come si diventa medico?','ciao ciao'];
for(let i=0;i<N;i++){const r=Math.random();
  try{
  if(r<.35){const k=keys[Math.floor(Math.random()*4)];await p.keyboard.down(k);await p.waitForTimeout(150+Math.random()*400);await p.keyboard.up(k)}
  else if(r<.45){await p.evaluate(()=>{try{if(typeof doAction==='function')doAction()}catch(e){console.error('doAction '+e.message+' '+(e.stack||'').split('\n').slice(1,4).join(' | ')+' near='+JSON.stringify(near).slice(0,200)+' sc='+S.scene)}})}
  else if(r<.6){await p.evaluate((PH)=>{const ns=NPCS.filter(n=>n.scene===S.scene&&!n.hide&&!n.animal);if(!ns.length)return;const n=ns[Math.floor(Math.random()*ns.length)];try{openChat(n.id);for(let k=0;k<3;k++)say(PH[Math.floor(Math.random()*PH.length)]);closeChat&&closeChat()}catch(e){console.error('chat '+n.role+' '+e.message)}},PH)}
  else if(r<.7){await p.evaluate(()=>{const b=BUILD[Math.floor(Math.random()*BUILD.length)];try{if(S.scene!=='citta')exitBuilding();enterBuilding(b.id)}catch(e){console.error('enter '+b.id+' '+e.message)}})}
  else if(r<.75){await p.evaluate(()=>{try{if(S.scene!=='citta')exitBuilding()}catch(e){console.error('exit '+e.message)}})}
  else if(r<.8){await p.evaluate(()=>{try{setAge(3+Math.floor(Math.random()*70));ui.result=null;renderModal()}catch(e){console.error('age '+e.message)}})}
  else if(r<.85){await p.evaluate(()=>{try{S.clock=Math.floor(Math.random()*1440)}catch(e){}})}
  else if(r<.9){await p.evaluate(()=>{try{if(S.scene==='citta'&&S.age>=8&&!JK_CANT()){const c=TRAF[Math.floor(Math.random()*TRAF.length)];const [x,y]=carXY(c);S.pos={x,y:y+1.1};jackStart(TRAF.indexOf(c))}}catch(e){console.error('jack '+e.message)}})}
  else {await p.evaluate(()=>{const bs=[...document.querySelectorAll('.modal button, #modal button, [data-ch], [data-cont]')].filter(x=>!x.disabled&&x.offsetParent);if(bs.length)bs[Math.floor(Math.random()*bs.length)].click()})}
  }catch(e){errs.push('PW '+e.message.slice(0,150))}
  await p.waitForTimeout(80)}
console.log('done',N,await p.evaluate(()=>JSON.stringify({age:S.age,scene:S.scene,alive:S.alive,pos:S.pos})));
console.log([...new Set(errs)].slice(0,30).join('\n'));await b.close()})();
