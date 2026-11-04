/* ================= v9: il vocale in chat (parli e il gioco scrive) ================= */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
function micBtn(target){if(!S||!S.flags||!S.flags.mic)return '';return `<button class="btn mic" type="button" data-mic="${target}" aria-label="Parla con il microfono">🎤</button>`}
function startMic(target){
  const inp=$(target==='help'?'helpIn':'sayIn');if(!inp)return;
  if(!SR)return toast('🎤 Il vocale funziona con Chrome (Android) o Safari (iPhone). Su questo browser scrivi con la tastiera!');
  if(ui.rec){try{ui.rec.stop()}catch(e){}return}
  const r=new SR();r.lang='it-IT';r.interimResults=true;r.maxAlternatives=1;let fin='';ui.rec=r;
  const btn=document.querySelector(`[data-mic="${target}"]`);if(btn)btn.classList.add('on');inp.placeholder='Parla adesso… ti ascolto 👂';
  r.onresult=e=>{let t='';for(let i=0;i<e.results.length;i++){t+=e.results[i][0].transcript;if(e.results[i].isFinal)fin=t}const el=$(target==='help'?'helpIn':'sayIn');if(el)el.value=t};
  r.onerror=e=>{if(e.error==='not-allowed'||e.error==='service-not-allowed')toast('🎤 Devi dare il permesso al microfono: tocca «Consenti» quando il telefono te lo chiede.');else if(e.error==='no-speech')toast('🎤 Non ho sentito niente. Riprova e parla vicino al telefono!')};
  r.onend=()=>{ui.rec=null;const b2=document.querySelector(`[data-mic="${target}"]`);if(b2)b2.classList.remove('on');const el=$(target==='help'?'helpIn':'sayIn');if(!el)return;el.placeholder=target==='help'?'Scrivi la tua domanda…':'Scrivi cosa vuoi dire…';
    const v=(fin||el.value).trim();if(!v)return;el.value='';if(target==='help')helpAsk(v);else say(v)};
  try{r.start()}catch(e){ui.rec=null;toast('🎤 Il microfono non si è acceso. Riprova!')}
}
