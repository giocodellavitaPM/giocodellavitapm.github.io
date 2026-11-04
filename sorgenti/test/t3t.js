const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const p=await b.newPage({viewport:{width:390,height:780}});
const errs=[];p.on('pageerror',e=>errs.push('ERR '+e.message));p.on('console',m=>{if(m.type()==='error'||m.type()==='warning')errs.push('C '+m.text().slice(0,200))});
await p.goto('file://'+process.cwd()+'/'+(process.env.DIR||'vita9')+'/index.html');await p.evaluate(()=>{localStorage.clear();localStorage.setItem('vita_td9','0')});await p.reload();await p.waitForTimeout(800);
await p.click('#born');await p.waitForTimeout(500);await p.evaluate(()=>{ui.result=null;renderModal();setAge(14);S.scene='citta';S.pos={x:20.5,y:13.5};save();updateHud()});await p.waitForTimeout(1500);
console.log('ui shown',await p.evaluate(()=>!$('td9ui').hidden));
const t0=Date.now();await p.click('#td9v');
for(let i=0;i<30;i++){await p.waitForTimeout(500);const a=await p.evaluate(()=>({act:tdActive(),R:!!TD.R,city:!!TD.city,t:TD.t,le:TD.lastErr,safe:TD.safe}));if(a.t>2){console.log('3D after ms',Date.now()-t0,JSON.stringify(a));break}if(i==29)console.log('never',JSON.stringify(a))}
console.log(errs.slice(0,8).join('\n'));await b.close()})();
