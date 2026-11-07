// App degli account: prima prova internet, se manca usa la copia salvata
const C='account-pm-v17',F=['','index.html','manifest.json','icona-192.png','icona-512.png','icona-512-m.png','icona-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(f=>'./'+f))).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&/^account-pm/.test(x)).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  const base=new URL('./',self.registration.scope).pathname,p=u.pathname.slice(base.length);if(!F.includes(p))return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
// tocchi la notifica: apre (o porta davanti) l'app sulla Posta
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(L=>{for(const c of L){if('focus' in c)return c.focus()}return self.clients.openWindow('./')}))});
