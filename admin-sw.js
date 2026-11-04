// Gioco della Vita PM: fa funzionare l'app installata (prima prova internet, se manca usa la copia salvata)
const C='gioco-pm-v1',F=['','index.html','manifest.json','admin.html','admin-manifest.json','icona-192.png','icona-512.png','fb/firebase-app-compat.js','fb/firebase-auth-compat.js','fb/firebase-firestore-compat.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(f=>'./'+f))).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&/^(account|gioco)-pm/.test(x)).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  const base=new URL('./',self.registration.scope).pathname,p=u.pathname.slice(base.length);if(!F.includes(p))return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
