if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,a,c)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const n={uri:location.origin+r.slice(1)};return Promise.all(a.map(r=>{switch(r){case"exports":return s;case"module":return n;default:return e(r)}})).then(e=>{const r=c(...e);return s.default||(s.default=r),s})}))}}define("./service-worker.js",["./workbox-a86acf2f"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"./favicon.ico",revision:"e506ac2162a6389872f9463f3230fed0"},{url:"./index.html",revision:"4d988a9e9bc93f414bd4619457291ab6"},{url:"./main.1e81fefc5b4c3a627fdd.css",revision:"c0187a337d11ac867c0bb19399cbc3f1"},{url:"./main.3dc3b03ff6daf9a3e1ca.js",revision:"e4e1a4c160aa3011d3ecf271b873d3a4"},{url:"./main.3dc3b03ff6daf9a3e1ca.js.map",revision:"c4b905f9ded36bdc4473f2e316c6034f"},{url:"dani-gamez-franco-cv-2022.08.22.pdf",revision:"9d19375dadbb2978387e20a468424112592908eacb58baa139540be604f866237746f05ee06ac301551b55f727e24da2d41a3fffac9e65547b29b11b3ea4425b"},{url:"manifest.json",revision:"e1cd30b70219ec70334f99ca557e277970b1f616f8bddb48e6fa7a90ac54ebec32c5f60198ba54c9a80ff096c3ecab36c6f97b12e767695f4c82818fce005246"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/\.(?:png|jpg|jpeg|gif|svg|woff2)$/,new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com/,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:30,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
