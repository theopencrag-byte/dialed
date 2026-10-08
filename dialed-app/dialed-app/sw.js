// Dialed service worker: app files are cached on first visit so the app opens offline.
// Bump VERSION whenever you change index.html so phones pick up the new copy.
const VERSION='dialed-v3';
const SHELL=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/apple-touch-icon.png','icons/favicon-32.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request,url=new URL(req.url);
  if(req.method!=='GET')return;
  // Weather and place lookups always go to the network and are never cached.
  if(url.hostname.endsWith('open-meteo.com'))return;
  // Fonts: use the cached copy if there is one, refresh it in the background.
  if(url.hostname==='fonts.googleapis.com'||url.hostname==='fonts.gstatic.com'){
    e.respondWith(caches.open(VERSION).then(c=>c.match(req).then(hit=>{
      const net=fetch(req).then(r=>{if(r&&(r.ok||r.type==='opaque'))c.put(req,r.clone());return r;}).catch(()=>hit);
      return hit||net;
    })));
    return;
  }
  // The app itself: cached copy first, network as a fallback.
  if(url.origin===location.origin){
    e.respondWith(caches.match(req,{ignoreSearch:true}).then(hit=>hit||fetch(req).then(r=>{
      if(r&&r.ok)caches.open(VERSION).then(c=>c.put(req,r.clone()));
      return r;
    }).catch(()=>req.mode==='navigate'?caches.match('index.html'):undefined)));
  }
});
