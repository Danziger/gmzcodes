if(!self.define){let e,a={};const i=(i,c)=>(i=new URL(i+".js",c).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,n)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(a[s])return;let r={};const f=e=>i(e,s),o={module:{uri:s},exports:r,require:f};a[s]=Promise.all(c.map((e=>o[e]||f(e)))).then((e=>(n(...e),r)))}}define(["./workbox-c38c542b"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"./BingSiteAuth.xml",revision:"783973f48be559430bac58f64ec53601"},{url:"./CNAME",revision:"353563adeb2e7d3e228db13569f0ccfd"},{url:"./dani-gamez-franco-cv-2023.09.12.pdf",revision:"03f20b8ac8b65b96d7edf911623e3bab"},{url:"./drawings/artists/daniel-sheldon/daniel-sheldon.json",revision:"e0dc103529e7b030d94ad622cd6a7594"},{url:"./favicon.ico",revision:"e506ac2162a6389872f9463f3230fed0"},{url:"./googled698dfba7b29af8c.html",revision:"80a16e52988b4c4605000b26ace1cb78"},{url:"./index.html",revision:"c5b1cd928f4b3bd29a7f34b727973fbb"},{url:"./main.83d10a867aa815c2.css",revision:null},{url:"./main.83d10a867aa815c2.css.map",revision:"dcaddc180c6d5a46c85f50c194942f4e"},{url:"./main.fc664dd42cd405e4.js",revision:null},{url:"./main.fc664dd42cd405e4.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"./main.fc664dd42cd405e4.js.map",revision:"1cbfaf6df4338a038da5c5ca606a7583"},{url:"./manifest.json",revision:"c141a39ed320ab7fc9a778f8a6336f83"},{url:"./robots.txt",revision:"98820f6f7ad42dc4aef853786c2f1237"},{url:"./sitemap.txt",revision:"ab910ab747ce56a98f534f7bb0b7ff7f"},{url:"./sw.js",revision:"49be7b3f6c30547477ad4c42ee4df275"},{url:"./videos/gran-torino-trailer-finger-gun-house-scene.mp4",revision:"4cc8da12fe067bc05647aaa38902abcd"},{url:"./videos/gran-torino-trailer-finger-gun-street-scene.mp4",revision:"5555a1b6c24e070805a54ca0a81b398d"},{url:"./videos/gran-torino-trailer-get-off-my-lawn-scene.mp4",revision:"728d7fb660c033d33e0d4405b85cc486"},{url:"./videos/gran-torino-trailer-throwing-ie-user-out-scene.mp4",revision:"2a4cc7495a82c0fd22ae7eb02651f044"},{url:"dani-gamez-franco-cv-2023.09.12.pdf",revision:"7a4dd61714a45b71d1f84f8351cadcb7689a00c010a46df941a0c2e3459e449d44b7edf7a456b508316fa2085dc15dfeae0bfa590e2a7eb45b75aacd2b66a9c9"},{url:"manifest.json",revision:"e1cd30b70219ec70334f99ca557e277970b1f616f8bddb48e6fa7a90ac54ebec32c5f60198ba54c9a80ff096c3ecab36c6f97b12e767695f4c82818fce005246"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/\.(?:png|jpg|jpeg|gif|svg|woff2)$/,new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com/,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:30,maxAgeSeconds:31536e3})]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
