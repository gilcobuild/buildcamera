// Build Camera offline shell, version 3b0220ecb4
const C='bc-3b0220ecb4';const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
 if(u.origin===location.origin){e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));return}
 if(/cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com/.test(u.host)){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res})))}});
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(_){d={body:e.data?e.data.text():''}}
 e.waitUntil(self.registration.showNotification(d.title||'Build Camera',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',data:{url:d.url||'/'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=new URL((e.notification.data&&e.notification.data.url)||'/',self.location.origin).href;
 e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if(c.url.startsWith(self.location.origin)&&'focus' in c){return c.focus().then(w=>w&&w.navigate?w.navigate(u):null).catch(()=>clients.openWindow(u))}}return clients.openWindow(u)}))});
