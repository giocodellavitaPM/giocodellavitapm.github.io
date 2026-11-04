const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:430,height:860}});const errs=[];p.on('pageerror',e=>errs.push('ERR '+e.message));
await p.goto('file://'+process.cwd()+'/'+(process.env.DIR||'vita9')+'/index.html');await p.evaluate(()=>{localStorage.clear()});await p.reload();await p.waitForTimeout(800);
await p.click('#born');await p.waitForTimeout(500);await p.evaluate(()=>{ui.result=null;renderModal();setAge(12);save();updateHud()});await p.waitForTimeout(300);
console.log(await p.evaluate(()=>JSON.stringify({school:S.school,bld:schoolBld(),b:BUILD.filter(b=>/medie9|sup9|^scuola$/.test(b.id)).map(b=>b.id+':'+b.n+':'+b.dx+','+b.dy+':'+at(b.dx,b.dy)+'/'+at(b.x+1,b.y+1))})));
// enter medie9
await p.evaluate(()=>{S.scene='citta';enterBuilding('medie9')});await p.waitForTimeout(600);
console.log(await p.evaluate(()=>JSON.stringify({scene:S.scene,npcs:NPCS.filter(n=>n.scene==='medie9').map(n=>n.name+'/'+n.role)})));
await p.evaluate(()=>openPlace('medie9'));await p.waitForTimeout(300);console.log('medie9 sheet:',(await p.evaluate(()=>document.querySelector('#sheet')?document.querySelector('#sheet').innerText:'')).slice(0,400));
await p.screenshot({path:'s_medie.png'});
await p.evaluate(()=>{closeSheet();exitBuilding();enterBuilding('scuola');openPlace('scuola')});await p.waitForTimeout(300);console.log('scuola sheet:',(await p.evaluate(()=>document.querySelector('#sheet').innerText)).slice(0,300));
await p.evaluate(()=>{closeSheet();startQuiz('interr')});await p.waitForTimeout(500);console.log('quiz goes',await p.evaluate(()=>JSON.stringify({goQuiz:ui.goQuiz,walk:!!ui.walk})));
// uni
await p.evaluate(()=>{ui.goQuiz=null;ui.walk=null;setAge(18);S.edu=2;S.diploma='liceo';S.school=null;S.uni={fac:'medicina',anno:1,fc:0};S.scene='uni';S.pos={x:SC.uni.door.x+.5,y:SC.uni.h-1.6};openPlace('uni')});await p.waitForTimeout(300);
console.log('uni sheet:',(await p.evaluate(()=>document.querySelector('#sheet').innerText)).slice(0,500));
await p.evaluate(()=>uniQStart('verif'));await p.waitForTimeout(300);
for(let i=0;i<5;i++){await p.evaluate(()=>{const E=ui.uq9;const k=E.qs[E.i].opts.findIndex(o=>o.ok);uniQAnswer(k)});await p.waitForTimeout(1500)}
console.log('uq end',(await p.evaluate(()=>document.querySelector('#sheet').innerText)).slice(0,200),await p.evaluate(()=>JSON.stringify(S.uni)));
await p.screenshot({path:'s_uni.png'});
await p.evaluate(()=>{ui.uq9=null;closeSheet();for(let a=0;a<8;a++){S.studied=true;S.st.int=100;uniYear()}});console.log('after years',await p.evaluate(()=>JSON.stringify({uni:S.uni,lvl:dipLvl(),edu:S.edu})));
console.log(errs.join('\n'));await b.close()})();
