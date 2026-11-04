const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push('ERR '+e.message+' '+(e.stack||'').split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/'+(process.env.DIR||'vita9')+'/index.html');await p.waitForTimeout(1500);console.log(errs.join('\n')||'no errors');await b.close()})();
