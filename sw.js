// Build Camera offline shell, version 157165971c
const C='bc-157165971c';const IMG='bc-img-1';let puts=0;
// photo thumbnails: keep a copy on this device, keyed by the file (not the link, which changes)
function trimImg(c){c.keys().then(ks=>{const x=ks.length-2500;if(x>0)ks.slice(0,x).forEach(k=>c.delete(k))})}const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!==IMG).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
 if(/\.supabase\.co$/.test(u.hostname)&&u.pathname.indexOf('/storage/v1/object/sign/sitecam/')===0){const key=u.origin+u.pathname;
  e.respondWith(caches.open(IMG).then(c=>c.match(key).then(hit=>hit||fetch(u.href,{mode:'cors',credentials:'omit'}).then(r=>{const n=+r.headers.get('content-length')||0;if(r.ok&&n>0&&n<600000){c.put(key,r.clone());if(++puts%50===0)trimImg(c)}return r}))).catch(()=>fetch(e.request)));return}
 if(u.origin===location.origin){e.respondWith(fetch(u.href,{cache:'no-cache',credentials:'same-origin'}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));return}
 if(/cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com/.test(u.host)){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res})))}});
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(_){d={body:e.data?e.data.text():''}}
 e.waitUntil(self.registration.showNotification(d.title||'Build Camera',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',data:{url:d.url||'/'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();let u=new URL((e.notification.data&&e.notification.data.url)||'/',self.location.origin);if(u.origin!==self.location.origin)u=new URL('/',self.location.origin);u=u.href;
 e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if(c.url.startsWith(self.location.origin)&&'focus' in c){return c.focus().then(w=>w&&w.navigate?w.navigate(u):null).catch(()=>clients.openWindow(u))}}return clients.openWindow(u)}))});
