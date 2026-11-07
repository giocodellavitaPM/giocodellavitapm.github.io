self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n.indexOf('guida-pm')==0).map(n=>caches.delete(n)))).then(()=>self.registration.unregister())));
