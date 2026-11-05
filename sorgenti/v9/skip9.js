/* ===== v9: «Salta i primi 5 anni» — si chiede con una richiesta che arriva nella Posta dell'app account; l'amministratrice lo attiva dall'app degli account ===== */
function sk9Acc(){try{const c=ACC9.cur();if(!c)return null;return {n:c.n,fb:!!c.fb,uid:c.fb&&OL9.user?OL9.user.uid:null,mail:c.fb&&OL9.user?OL9.user.email:null,reg:c.reg&&c.reg!=='-'?c.reg:null}}catch(e){return null}}
async function sk9Has(){const a=sk9Acc();if(!a||!nm9Ok())return false;const db=await nm9Db();let g=null;
  if(a.fb&&a.uid)g=await nm9T(db.collection('utenti').doc(a.uid).get(),6000);else if(a.reg)g=await nm9T(db.collection('nomi').doc(a.reg).get(),6000);
  return !!(g&&g.exists&&g.data().salta5)}
function sk9Open(){if($('sk9')||!S)return;const e=document.createElement('div');e.id='sk9';const a=sk9Acc();
  e.innerHTML=`<div class="in" role="dialog" aria-label="Salta i primi 5 anni"><div style="font-size:44px">⏩</div><h2>Saltare i primi 5 anni?</h2>
  <p>I primi 5 anni li fanno soprattutto mamma e papà. Con questa <b>funzione speciale</b> parti subito da 5 anni.</p><div id="sk9s"><p>⏳ Controllo il tuo account…</p></div>
  <button type="button" data-x>Chiudi</button></div>`;
  e.addEventListener('click',ev=>{if(ev.target===e||ev.target.closest('[data-x]'))e.remove()});e.addEventListener('keydown',ev=>{ev.stopPropagation();if(ev.key==='Escape')e.remove()});
  document.body.appendChild(e);const box=e.querySelector('#sk9s');
  const ask=()=>{if(!a){box.innerHTML=`<p>Prima crea il tuo account (basta il nome): pausa → ⚙️ Impostazioni → 👤 Il tuo account. Poi torna qui e manda la richiesta!</p>`;return}
    let sent=0;try{sent=+localStorage.getItem('vita_sk9req_'+(a.uid||a.reg||a.n))||0}catch(e){}
    if(sent&&Date.now()-sent<7*864e5){box.innerHTML=`<p class="ml"><b>📩 Richiesta inviata!</b></p><p>Aspetta la risposta: quando la funzione viene attivata sul tuo account (<b>${esc(a.n)}</b>), torna qui e premi il pulsante per saltare.</p>`;return}
    box.innerHTML=`<p>Manda una richiesta: scrivi <b>quanto saresti disposto a pagare</b>. Arriva con il nome del tuo account: <b>${esc(a.n)}</b>.</p>
     <input id="sk9p" maxlength="30" placeholder="Quanto pagheresti? (es. 2 €)" aria-label="Quanto pagheresti"><textarea id="sk9m" maxlength="300" rows="2" placeholder="Messaggio (se vuoi)" aria-label="Messaggio"></textarea>
     <button type="button" class="go" data-sk9send>📩 Invia la richiesta</button><p id="sk9e" class="sm"></p>`;
    const sb=box.querySelector('[data-sk9send]'),ip=box.querySelector('#sk9p');ip.focus();
    sb.onclick=async ev=>{ev.stopPropagation();const pr=ip.value.trim(),ms=box.querySelector('#sk9m').value.trim(),er=box.querySelector('#sk9e');if(!pr){er.textContent='✏️ Scrivi quanto pagheresti.';ip.focus();return}
      sb.disabled=true;sb.textContent='⏳ Invio…';try{const db=await nm9Db();const d={tipo:'salta5',nome:String(a.n).slice(0,40),acc:a.fb?'u':'n',id:String(a.fb?a.uid||'':a.reg||'').slice(0,80),prezzo:pr.slice(0,30),creato:firebase.firestore.FieldValue.serverTimestamp(),letto:false};if(ms)d.msg=ms.slice(0,300);
        await nm9T(db.collection('richieste').add(d),8000);try{localStorage.setItem('vita_sk9req_'+(a.uid||a.reg||a.n),String(Date.now()))}catch(e){}ask()}
      catch(e){sb.disabled=false;sb.textContent='📩 Invia la richiesta';er.textContent='⚠️ Non sono riuscito a inviarla. Controlla internet e riprova.'}}};
  sk9Has().then(ok=>{if(!$('sk9'))return;if(!ok)return ask();
    box.innerHTML=S.age<5?`<p class="ml"><b>✅ Il tuo account ha la funzione!</b></p><button type="button" class="go" data-sk9go>⏩ Salta a 5 anni</button>`:`<p class="ml"><b>✅ Il tuo account ha la funzione!</b></p><p>Hai già ${S.age} anni: la potrai usare nella tua prossima vita, appena nasci.</p>`;
    const g=box.querySelector('[data-sk9go]');if(g)g.onclick=ev=>{ev.stopPropagation();try{setAge(5);add('fel',5);save();updateHud();renderModal();e.remove();toast('⏩ Hai saltato i primi 5 anni: adesso hai 5 anni e vai all\'asilo!')}catch(err){}}}).catch(()=>{if($('sk9'))ask()})}
{const st=document.createElement('style');st.textContent=`#sk9{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);display:grid;place-items:center;padding:16px}
#sk9 .in{max-width:380px;width:100%;max-height:92vh;overflow:auto;box-sizing:border-box;background:#06110b;color:#eafff2;border:2px solid var(--neon,#3fd98a);border-radius:20px;padding:20px;text-align:center;display:flex;flex-direction:column;gap:10px;font-size:16px}
#sk9 #sk9s{display:flex;flex-direction:column;gap:10px}#sk9 h2{margin:0;font-size:22px}#sk9 p{margin:0;line-height:1.4}#sk9 .ml{font-size:17px;word-break:break-all;color:var(--neon,#3fd98a)}
#sk9 .go,#sk9 button{display:block;border-radius:14px;padding:12px;font:inherit;font-weight:800;cursor:pointer;text-decoration:none;border:1.5px solid var(--neon,#3fd98a);background:transparent;color:#eafff2}
#sk9 input,#sk9 textarea{font:inherit;font-size:16px;padding:10px 12px;border-radius:12px;border:1.5px solid var(--neon,#3fd98a);background:#050a07;color:#eafff2;-webkit-user-select:text;user-select:text;resize:none}#sk9 .sm{font-size:14px;color:#ffb3b3;min-height:0}
#sk9 .go{background:var(--neon,#3fd98a);color:#021008}`;document.head.appendChild(st)}
// appena nasci (una volta per vita)
{const _sg=startGame;startGame=function(){const r=_sg.apply(this,arguments);try{if(S&&S.age<1&&!S.sk9){S.sk9=1;setTimeout(()=>{try{if(S&&S.age<1&&!ui.result)sk9Open()}catch(e){}},1800)}}catch(e){}return r}}
// nelle Impostazioni
{const _pr=phRender;phRender=function(){const r=_pr.apply(this,arguments);try{if(PH9.app==='set'){const sc=document.querySelector('#ph9 .scr');if(sc&&!$('sk9b')){const b=document.createElement('button');b.id='sk9b';b.className='li9';
  b.innerHTML='<span class="av9">⏩</span><span class="tx"><b>Salta i primi 5 anni</b><small>Funzione speciale · tocca per saperne di più</small></span>';b.onclick=ev=>{ev.stopPropagation();sk9Open()};sc.insertBefore(b,sc.firstChild)}}}catch(e){}return r}}
// ✉️ Scrivici: domande, idee, cose da migliorare → arrivano nella Posta dell'app account
function sk9Msg(){if($('sk9')||!S)return;const e=document.createElement('div');e.id='sk9';const a=sk9Acc();
  e.innerHTML=`<div class="in" role="dialog" aria-label="Scrivici"><div style="font-size:44px">✉️</div><h2>Scrivici!</h2><div id="sk9s">
  <p>Hai una domanda, un'idea o qualcosa da migliorare nel gioco? Scrivila qui: la leggiamo tutta!</p>
  <textarea id="sk9m" maxlength="500" rows="4" placeholder="Scrivi qui il tuo messaggio…" aria-label="Messaggio"></textarea>
  <button type="button" class="go" data-sk9send>📩 Invia</button><p id="sk9e" class="sm"></p></div><button type="button" data-x>Chiudi</button></div>`;
  e.addEventListener('click',ev=>{if(ev.target===e||ev.target.closest('[data-x]'))e.remove()});e.addEventListener('keydown',ev=>{ev.stopPropagation();if(ev.key==='Escape')e.remove()});
  document.body.appendChild(e);const box=e.querySelector('#sk9s'),ta=box.querySelector('#sk9m'),sb=box.querySelector('[data-sk9send]');ta.focus();
  sb.onclick=async ev=>{ev.stopPropagation();const ms=ta.value.trim(),er=box.querySelector('#sk9e');if(ms.length<2){er.textContent='✏️ Scrivi il tuo messaggio.';ta.focus();return}
    sb.disabled=true;sb.textContent='⏳ Invio…';try{const db=await nm9Db();const d={tipo:'messaggio',nome:String(a?a.n:'Senza account').slice(0,40),acc:a?(a.fb?'u':'n'):'-',id:String(a?(a.fb?a.uid||'':a.reg||''):'').slice(0,80),msg:ms.slice(0,500),creato:firebase.firestore.FieldValue.serverTimestamp(),letto:false};
      await nm9T(db.collection('richieste').add(d),8000);box.innerHTML='<p class="ml"><b>✅ Messaggio inviato!</b></p><p>Grazie! Lo leggeremo presto. 😊</p>'}
    catch(err){sb.disabled=false;sb.textContent='📩 Invia';er.textContent='⚠️ Non sono riuscito a inviarlo. Controlla internet e riprova.'}}}
{const _pr=phRender;phRender=function(){const r=_pr.apply(this,arguments);try{if(PH9.app==='set'){const sc=document.querySelector('#ph9 .scr');if(sc&&!$('sk9w')){const b=document.createElement('button');b.id='sk9w';b.className='li9';
  b.innerHTML='<span class="av9">✉️</span><span class="tx"><b>Scrivici</b><small>Domande, idee o cose da migliorare</small></span>';b.onclick=ev=>{ev.stopPropagation();sk9Msg()};const s5=$('sk9b');s5?s5.after(b):sc.insertBefore(b,sc.firstChild)}}}catch(e){}return r}}
