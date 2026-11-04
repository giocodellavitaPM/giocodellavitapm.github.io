const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
for(const [w,h,n] of [[1900,900,'L1'],[1280,680,'L2']]){const p=await b.newPage({viewport:{width:w,height:h}});const errs=[];p.on('pageerror',e=>errs.push('ERR '+e.message));
await p.route('**/three.min.js',r=>r.fulfill({path:'lib/three.min.js',contentType:'text/javascript'}));
await p.goto('file://'+process.cwd()+'/vitaN/index.html');await p.evaluate(()=>{localStorage.clear();localStorage.setItem('vita_dev9','pc')});await p.reload();await p.waitForTimeout(1200);await p.evaluate(()=>{const g=document.getElementById('gira9');if(g)g.remove()});
await p.fill('#nm','Pietro');await p.click('#born');await p.waitForTimeout(1500);
await p.evaluate(()=>{S.age=18;S.money=2170;S.bank=90163283081375.8;S.school={tipo:'liceo',anno:5};S.scene='citta';updateHud()});await p.waitForTimeout(4000);await p.evaluate(()=>updateHud());await p.waitForTimeout(500);
await p.screenshot({path:n+'.png'});console.log(n,await p.evaluate(()=>[document.getElementById('hSt9').textContent,document.getElementById('pc9').innerText.replace(/\n/g,' / ')]));console.log(errs.join('\n'));await p.close()}await b.close()})();
