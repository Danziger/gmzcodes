if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,c,f)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const n={uri:location.origin+r.slice(1)};return Promise.all(c.map(r=>{switch(r){case"exports":return s;case"module":return n;default:return e(r)}})).then(e=>{const r=f(...e);return s.default||(s.default=r),s})}))}}define("./service-worker.js",["./workbox-a86acf2f"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"./favicon.ico",revision:"e506ac2162a6389872f9463f3230fed0"},{url:"./index.html",revision:"419f0b76e99b3bbc8fe3295d08c462c5"},{url:"./main.10547cb266ebfcfaf9fc.js",revision:"53388c10fb729ea3e021d70bd98b1305"},{url:"./main.10547cb266ebfcfaf9fc.js.map",revision:"927f96f1f35fa9a1d1f268d6655ce44b"},{url:"./main.d905f6acc0725dcf9d00.css",revision:"6eff9277a391adb4422d803d0948be61"},{url:"dani-gamez-franco-cv-2022.08.22.pdf",revision:"9d19375dadbb2978387e20a468424112592908eacb58baa139540be604f866237746f05ee06ac301551b55f727e24da2d41a3fffac9e65547b29b11b3ea4425b"},{url:"manifest.json",revision:"e1cd30b70219ec70334f99ca557e277970b1f616f8bddb48e6fa7a90ac54ebec32c5f60198ba54c9a80ff096c3ecab36c6f97b12e767695f4c82818fce005246"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/\.(?:png|jpg|jpeg|gif|svg|woff2)$/,new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com/,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:30,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
