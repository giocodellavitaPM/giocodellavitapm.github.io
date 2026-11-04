/* ================= salvataggio sicuro: la partita resta anche quando il gioco si aggiorna ================= */
const CLOUD={db:null,uid:null,t:0,busy:false,dirty:false,boot:performance.now()};
{const _sv=save;save=function(){if(S)S.savedAt=Date.now();_sv();CLOUD.dirty=true;cloudPush()}}
function cloudCol(){return CLOUD.db.collection('data/users/'+CLOUD.uid)}
async function cloudPush(force){
  if(!CLOUD.db||!CLOUD.uid||!S||CLOUD.busy||!CLOUD.dirty)return;if(!force&&performance.now()-CLOUD.t<8000)return;
  CLOUD.busy=true;CLOUD.dirty=false;CLOUD.t=performance.now();
  try{const js=JSON.stringify(S),N=110000,n=Math.ceil(js.length/N),col=cloudCol();
    for(let i=0;i<n;i++)await col.doc('partita'+i).set({s:js.slice(i*N,(i+1)*N)});
    await col.doc('partita').set({n,t:S.savedAt||Date.now(),v:7})}
  catch(e){console.warn('salvataggio online',e);CLOUD.dirty=true}
  CLOUD.busy=false}
async function cloudPull(){const col=cloudCol(),m=await col.doc('partita').get();if(!m.exists)return null;const d=m.data();let js='';
  for(let i=0;i<d.n;i++){const p=await col.doc('partita'+i).get();if(!p.exists)return null;js+=p.data().s}
  try{const o=JSON.parse(js);return o&&o.v===7&&o.st?o:null}catch(e){return null}}
function cloudApply(sv){S=sv;S.chats=S.chats||{};S.drive=null;S.carOut=false;if(!S.parLoc)pickParLoc();if(S.escort&&S.escort.to&&S.scene!=='citta')S.escort=null;
  try{localStorage.setItem(LS,JSON.stringify(S))}catch(e){}if(S.alive){startGame();toast('💾 Bentornat'+o9()+'! Ho ripreso la tua partita.')}else showEnd()}
function o9(){try{return o()}catch(e){return 'o'}}
(async()=>{try{for(let i=0;i<60&&!(window.claude&&window.claude.use);i++)await new Promise(r=>setTimeout(r,100));if(!(window.claude&&window.claude.use))return;const [db,user]=await Promise.all([claude.use('db'),claude.use('user')]);if(!db||!user)return;
  const uid=await user.id();if(!uid)return;CLOUD.db=db;CLOUD.uid=uid;
  const c=await cloudPull();
  if(c&&!(typeof ACC9!=='undefined'&&(ACC9.d().list.length>1||(ACC9.cur()&&ACC9.cur().fb)))&&(!S||((c.savedAt||0)>(S.savedAt||0)&&performance.now()-CLOUD.boot<20000)))return cloudApply(c);
  if(S){CLOUD.dirty=true;cloudPush(true)}}catch(e){console.warn('salvataggio online',e)}})();
document.addEventListener('visibilitychange',()=>{if(document.hidden&&S){CLOUD.dirty=true;cloudPush(true)}});
setInterval(()=>{if(CLOUD.dirty)cloudPush()},10000);
