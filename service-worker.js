if(!self.define){let e,i={};const a=(a,n)=>(a=new URL(a+".js",n).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,s)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let r={};const o=e=>a(e,c),d={module:{uri:c},exports:r,require:o};i[c]=Promise.all(n.map((e=>d[e]||o(e)))).then((e=>(s(...e),r)))}}define(["./workbox-d301b984"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"./BingSiteAuth.xml",revision:"783973f48be559430bac58f64ec53601"},{url:"./CNAME",revision:"353563adeb2e7d3e228db13569f0ccfd"},{url:"./dani-gamez-franco-cv-2023.12.21.pdf",revision:"2a09055c646013818ca66b7d583b96bf"},{url:"./drawings/artists/daniel-sheldon/daniel-sheldon.json",revision:"e0dc103529e7b030d94ad622cd6a7594"},{url:"./favicon.ico",revision:"e506ac2162a6389872f9463f3230fed0"},{url:"./googled698dfba7b29af8c.html",revision:"80a16e52988b4c4605000b26ace1cb78"},{url:"./index.html",revision:"df9f79116a1db4098982d37c2a8ee3a0"},{url:"./main.204db60b1b11e3d0.css",revision:null},{url:"./main.204db60b1b11e3d0.css.map",revision:"d5ee97cfef75fb6446285134f5fa2e7d"},{url:"./main.8cd73e22ebaecd6d.js",revision:null},{url:"./main.8cd73e22ebaecd6d.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"./main.8cd73e22ebaecd6d.js.map",revision:"6de18c9094adbf13c748e8c7df9b77f2"},{url:"./manifest.json",revision:"c141a39ed320ab7fc9a778f8a6336f83"},{url:"./robots.txt",revision:"98820f6f7ad42dc4aef853786c2f1237"},{url:"./sitemap.txt",revision:"a4f878f53438851a241a17946b14b92e"},{url:"./sw.js",revision:"49be7b3f6c30547477ad4c42ee4df275"},{url:"./videos/gran-torino-trailer-finger-gun-house-scene.mp4",revision:"4cc8da12fe067bc05647aaa38902abcd"},{url:"./videos/gran-torino-trailer-finger-gun-street-scene.mp4",revision:"5555a1b6c24e070805a54ca0a81b398d"},{url:"./videos/gran-torino-trailer-get-off-my-lawn-scene.mp4",revision:"728d7fb660c033d33e0d4405b85cc486"},{url:"./videos/gran-torino-trailer-throwing-ie-user-out-scene.mp4",revision:"2a4cc7495a82c0fd22ae7eb02651f044"},{url:"dani-gamez-franco-cv-2023.12.21.pdf",revision:"3104a76f47cd4c739c3ef45732885af388d92648783702ee050a86e5d9a3c2c8a6c9e70b3b1f36028bbdda9a45694f59dbc136924c4b834917ebd6a049a76ab2"},{url:"manifest.json",revision:"e1cd30b70219ec70334f99ca557e277970b1f616f8bddb48e6fa7a90ac54ebec32c5f60198ba54c9a80ff096c3ecab36c6f97b12e767695f4c82818fce005246"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/\.(?:png|jpg|jpeg|gif|svg|woff2)$/,new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com/,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:30,maxAgeSeconds:31536e3})]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
