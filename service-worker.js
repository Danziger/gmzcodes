if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,n,o)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const i={uri:location.origin+r.slice(1)};return Promise.all(n.map(r=>{switch(r){case"exports":return s;case"module":return i;default:return e(r)}})).then(e=>{const r=o(...e);return s.default||(s.default=r),s})}))}}define("./service-worker.js",["./workbox-a86acf2f"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"./favicon.ico",revision:"a36c367e5703bd2a37196c16e1762704"},{url:"./index.html",revision:"48273f1f852c762a6a21569d79cbf9d5"},{url:"./main.b32c6d9781673996f27c.js",revision:"210e4ab59f0698711ab3bd7134716db6"},{url:"./main.df38130835e8da7a3aea.css",revision:"a685b19563925d2573155b76303dc6e7"},{url:"dani-gamez-franco-cv-2020.01.06.pdf",revision:null},{url:"manifest.json",revision:null}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/\.(?:png|jpg|jpeg|gif|svg|woff2)$/,new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com/,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:30,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET")}));
