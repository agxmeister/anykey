if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,o)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let t={};const c=e=>n(e,s),f={module:{uri:s},exports:t,require:c};i[s]=Promise.all(r.map((e=>f[e]||c(e)))).then((e=>(o(...e),t)))}}define(["./workbox-1f84e78b"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./index.html",revision:"1b80f27a4b04f0a8a3b7adc01c6b2b3a"},{url:"icons/192x192.png",revision:"f425958009ac60b9e992760e6c753664"},{url:"icons/512x512.png",revision:"afd89c312fb8904881810f6dab710ee2"},{url:"main.js",revision:"2aa14ac1fc3f95b85f22e45e1e29fa85"},{url:"main.js.LICENSE.txt",revision:"b114cc85da504a772f040e3f40f8e46a"},{url:"manifest.json",revision:"3577c540d2450c4f43b1a31df0c1d459"}],{})}));