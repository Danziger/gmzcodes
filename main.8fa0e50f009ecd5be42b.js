!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="./",n(n.s=54)}([function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(2),o=n(35),i=n(3),s=n(36),a=n(41),c=n(70),u=o("wks"),l=r.Symbol,f=c?l:l&&l.withoutSetter||s;t.exports=function(t){return i(u,t)||(a&&i(l,t)?u[t]=l[t]:u[t]=f("Symbol."+t)),u[t]}},function(t,e,n){(function(e){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e&&e)||Function("return this")()}).call(this,n(55))},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(8);t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t}},function(t,e,n){var r=n(2),o=n(19).f,i=n(6),s=n(12),a=n(22),c=n(58),u=n(65);t.exports=function(t,e){var n,l,f,h,d,p=t.target,v=t.global,y=t.stat;if(n=v?r:y?r[p]||a(p,{}):(r[p]||{}).prototype)for(l in e){if(h=e[l],f=t.noTargetGet?(d=o(n,l))&&d.value:n[l],!u(v?l:p+(y?".":"#")+l,t.forced)&&void 0!==f){if(typeof h==typeof f)continue;c(h,f)}(t.sham||f&&f.sham)&&i(h,"sham",!0),s(n,l,h,t)}}},function(t,e,n){var r=n(9),o=n(11),i=n(16);t.exports=r?function(t,e,n){return o.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(0);t.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(9),o=n(30),i=n(4),s=n(21),a=Object.defineProperty;e.f=r?a:function(t,e,n){if(i(t),e=s(e,!0),i(n),o)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(2),o=n(6),i=n(3),s=n(22),a=n(32),c=n(34),u=c.get,l=c.enforce,f=String(String).split("String");(t.exports=function(t,e,n,a){var c=!!a&&!!a.unsafe,u=!!a&&!!a.enumerable,h=!!a&&!!a.noTargetGet;"function"==typeof n&&("string"!=typeof e||i(n,"name")||o(n,"name",e),l(n).source=f.join("string"==typeof e?e:"")),t!==r?(c?!h&&t[e]&&(u=!0):delete t[e],u?t[e]=n:o(t,e,n)):u?t[e]=n:s(e,n)})(Function.prototype,"toString",(function(){return"function"==typeof this&&u(this).source||a(this)}))},function(t,e,n){var r=n(14),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(7);t.exports=function(t){return Object(r(t))}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){t.exports=!1},function(t,e){t.exports={}},function(t,e,n){var r=n(9),o=n(56),i=n(16),s=n(20),a=n(21),c=n(3),u=n(30),l=Object.getOwnPropertyDescriptor;e.f=r?l:function(t,e){if(t=s(t),e=a(e,!0),u)try{return l(t,e)}catch(t){}if(c(t,e))return i(!o.f.call(t,e),t[e])}},function(t,e,n){var r=n(29),o=n(7);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(8);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(2),o=n(6);t.exports=function(t,e){try{o(r,t,e)}catch(n){r[t]=e}return e}},function(t,e,n){var r=n(35),o=n(36),i=r("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},function(t,e){t.exports={}},function(t,e){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(t,e,n){"use strict";var r,o,i=n(44),s=n(74),a=RegExp.prototype.exec,c=String.prototype.replace,u=a,l=(r=/a/,o=/b*/g,a.call(r,"a"),a.call(o,"a"),0!==r.lastIndex||0!==o.lastIndex),f=s.UNSUPPORTED_Y||s.BROKEN_CARET,h=void 0!==/()??/.exec("")[1];(l||h||f)&&(u=function(t){var e,n,r,o,s=this,u=f&&s.sticky,d=i.call(s),p=s.source,v=0,y=t;return u&&(-1===(d=d.replace("y","")).indexOf("g")&&(d+="g"),y=String(t).slice(s.lastIndex),s.lastIndex>0&&(!s.multiline||s.multiline&&"\n"!==t[s.lastIndex-1])&&(p="(?: "+p+")",y=" "+y,v++),n=new RegExp("^(?:"+p+")",d)),h&&(n=new RegExp("^"+p+"$(?!\\s)",d)),l&&(e=s.lastIndex),r=a.call(u?n:s,y),u?r?(r.input=r.input.slice(v),r[0]=r[0].slice(v),r.index=s.lastIndex,s.lastIndex+=r[0].length):s.lastIndex=0:l&&r&&(s.lastIndex=s.global?r.index+r[0].length:e),h&&r&&r.length>1&&c.call(r[0],n,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(r[o]=void 0)})),r}),t.exports=u},function(t,e,n){var r={};r[n(1)("toStringTag")]="z",t.exports="[object z]"===String(r)},function(t,e,n){"use strict";var r=n(5),o=n(39);r({target:"Array",proto:!0,forced:[].forEach!=o},{forEach:o})},function(t,e,n){var r=n(0),o=n(10),i="".split;t.exports=r((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==o(t)?i.call(t,""):Object(t)}:Object},function(t,e,n){var r=n(9),o=n(0),i=n(31);t.exports=!r&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},function(t,e,n){var r=n(2),o=n(8),i=r.document,s=o(i)&&o(i.createElement);t.exports=function(t){return s?i.createElement(t):{}}},function(t,e,n){var r=n(33),o=Function.toString;"function"!=typeof r.inspectSource&&(r.inspectSource=function(t){return o.call(t)}),t.exports=r.inspectSource},function(t,e,n){var r=n(2),o=n(22),i=r["__core-js_shared__"]||o("__core-js_shared__",{});t.exports=i},function(t,e,n){var r,o,i,s=n(57),a=n(2),c=n(8),u=n(6),l=n(3),f=n(23),h=n(24),d=a.WeakMap;if(s){var p=new d,v=p.get,y=p.has,g=p.set;r=function(t,e){return g.call(p,t,e),e},o=function(t){return v.call(p,t)||{}},i=function(t){return y.call(p,t)}}else{var S=f("state");h[S]=!0,r=function(t,e){return u(t,S,e),e},o=function(t){return l(t,S)?t[S]:{}},i=function(t){return l(t,S)}}t.exports={set:r,get:o,has:i,enforce:function(t){return i(t)?o(t):r(t,{})},getterFor:function(t){return function(e){var n;if(!c(e)||(n=o(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}}},function(t,e,n){var r=n(17),o=n(33);(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.6.5",mode:r?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+r).toString(36)}},function(t,e,n){var r=n(60),o=n(2),i=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?i(r[t])||i(o[t]):r[t]&&r[t][e]||o[t]&&o[t][e]}},function(t,e,n){var r=n(3),o=n(20),i=n(62).indexOf,s=n(24);t.exports=function(t,e){var n,a=o(t),c=0,u=[];for(n in a)!r(s,n)&&r(a,n)&&u.push(n);for(;e.length>c;)r(a,n=e[c++])&&(~i(u,n)||u.push(n));return u}},function(t,e,n){"use strict";var r=n(66).forEach,o=n(71),i=n(72),s=o("forEach"),a=i("forEach");t.exports=s&&a?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},function(t,e,n){var r=n(67);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(0);t.exports=!!Object.getOwnPropertySymbols&&!r((function(){return!String(Symbol())}))},function(t,e,n){var r=n(2),o=n(73),i=n(39),s=n(6);for(var a in o){var c=r[a],u=c&&c.prototype;if(u&&u.forEach!==i)try{s(u,"forEach",i)}catch(t){u.forEach=i}}},function(t,e,n){"use strict";var r=n(5),o=n(26);r({target:"RegExp",proto:!0,forced:/./.exec!==o},{exec:o})},function(t,e,n){"use strict";var r=n(4);t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},function(t,e,n){var r=n(14),o=n(7),i=function(t){return function(e,n){var i,s,a=String(o(e)),c=r(n),u=a.length;return c<0||c>=u?t?"":void 0:(i=a.charCodeAt(c))<55296||i>56319||c+1===u||(s=a.charCodeAt(c+1))<56320||s>57343?t?a.charAt(c):i:t?a.slice(c,c+2):s-56320+(i-55296<<10)+65536}};t.exports={codeAt:i(!1),charAt:i(!0)}},function(t,e,n){var r=n(38),o=n(25);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(27),o=n(12),i=n(80);r||o(Object.prototype,"toString",i,{unsafe:!0})},function(t,e,n){var r=n(27),o=n(10),i=n(1)("toStringTag"),s="Arguments"==o(function(){return arguments}());t.exports=r?o:function(t){var e,n,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),i))?n:s?o(e):"Object"==(r=o(e))&&"function"==typeof e.callee?"Arguments":r}},function(t,e,n){"use strict";var r=n(12),o=n(4),i=n(0),s=n(44),a=RegExp.prototype,c=a.toString,u=i((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),l="toString"!=c.name;(u||l)&&r(RegExp.prototype,"toString",(function(){var t=o(this),e=String(t.source),n=t.flags;return"/"+e+"/"+String(void 0===n&&t instanceof RegExp&&!("flags"in a)?s.call(t):n)}),{unsafe:!0})},function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},function(t,e,n){"use strict";var r,o,i,s=n(52),a=n(6),c=n(3),u=n(1),l=n(17),f=u("iterator"),h=!1;[].keys&&("next"in(i=[].keys())?(o=s(s(i)))!==Object.prototype&&(r=o):h=!0),null==r&&(r={}),l||c(r,f)||a(r,f,(function(){return this})),t.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:h}},function(t,e,n){var r=n(3),o=n(15),i=n(23),s=n(100),a=i("IE_PROTO"),c=Object.prototype;t.exports=s?Object.getPrototypeOf:function(t){return t=o(t),r(t,a)?t[a]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?c:null}},function(t,e,n){var r=n(11).f,o=n(3),i=n(1)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){n(107),t.exports=n(106)},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";var r={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,i=o&&!r.call({1:2},1);e.f=i?function(t){var e=o(this,t);return!!e&&e.enumerable}:r},function(t,e,n){var r=n(2),o=n(32),i=r.WeakMap;t.exports="function"==typeof i&&/native code/.test(o(i))},function(t,e,n){var r=n(3),o=n(59),i=n(19),s=n(11);t.exports=function(t,e){for(var n=o(e),a=s.f,c=i.f,u=0;u<n.length;u++){var l=n[u];r(t,l)||a(t,l,c(e,l))}}},function(t,e,n){var r=n(37),o=n(61),i=n(64),s=n(4);t.exports=r("Reflect","ownKeys")||function(t){var e=o.f(s(t)),n=i.f;return n?e.concat(n(t)):e}},function(t,e,n){var r=n(2);t.exports=r},function(t,e,n){var r=n(38),o=n(25).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var r=n(20),o=n(13),i=n(63),s=function(t){return function(e,n,s){var a,c=r(e),u=o(c.length),l=i(s,u);if(t&&n!=n){for(;u>l;)if((a=c[l++])!=a)return!0}else for(;u>l;l++)if((t||l in c)&&c[l]===n)return t||l||0;return!t&&-1}};t.exports={includes:s(!0),indexOf:s(!1)}},function(t,e,n){var r=n(14),o=Math.max,i=Math.min;t.exports=function(t,e){var n=r(t);return n<0?o(n+e,0):i(n,e)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(0),o=/#|\.prototype\./,i=function(t,e){var n=a[s(t)];return n==u||n!=c&&("function"==typeof e?r(e):!!e)},s=i.normalize=function(t){return String(t).replace(o,".").toLowerCase()},a=i.data={},c=i.NATIVE="N",u=i.POLYFILL="P";t.exports=i},function(t,e,n){var r=n(40),o=n(29),i=n(15),s=n(13),a=n(68),c=[].push,u=function(t){var e=1==t,n=2==t,u=3==t,l=4==t,f=6==t,h=5==t||f;return function(d,p,v,y){for(var g,S,m=i(d),x=o(m),_=r(p,v,3),w=s(x.length),b=0,E=y||a,O=e?E(d,w):n?E(d,0):void 0;w>b;b++)if((h||b in x)&&(S=_(g=x[b],b,m),t))if(e)O[b]=S;else if(S)switch(t){case 3:return!0;case 5:return g;case 6:return b;case 2:c.call(O,g)}else if(l)return!1;return f?-1:u||l?l:O}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},function(t,e,n){var r=n(8),o=n(69),i=n(1)("species");t.exports=function(t,e){var n;return o(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!o(n.prototype)?r(n)&&null===(n=n[i])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},function(t,e,n){var r=n(10);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(41);t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},function(t,e,n){"use strict";var r=n(0);t.exports=function(t,e){var n=[][t];return!!n&&r((function(){n.call(null,e||function(){throw 1},1)}))}},function(t,e,n){var r=n(9),o=n(0),i=n(3),s=Object.defineProperty,a={},c=function(t){throw t};t.exports=function(t,e){if(i(a,t))return a[t];e||(e={});var n=[][t],u=!!i(e,"ACCESSORS")&&e.ACCESSORS,l=i(e,0)?e[0]:c,f=i(e,1)?e[1]:void 0;return a[t]=!!n&&!o((function(){if(u&&!r)return!0;var t={length:-1};u?s(t,1,{enumerable:!0,get:c}):t[1]=1,n.call(t,l,f)}))}},function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},function(t,e,n){"use strict";var r=n(0);function o(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=r((function(){var t=o("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=r((function(){var t=o("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},function(t,e,n){"use strict";var r=n(76),o=n(4),i=n(15),s=n(13),a=n(14),c=n(7),u=n(77),l=n(78),f=Math.max,h=Math.min,d=Math.floor,p=/\$([$&'`]|\d\d?|<[^>]*>)/g,v=/\$([$&'`]|\d\d?)/g;r("replace",2,(function(t,e,n,r){var y=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,g=r.REPLACE_KEEPS_$0,S=y?"$":"$0";return[function(n,r){var o=c(this),i=null==n?void 0:n[t];return void 0!==i?i.call(n,o,r):e.call(String(o),n,r)},function(t,r){if(!y&&g||"string"==typeof r&&-1===r.indexOf(S)){var i=n(e,t,this,r);if(i.done)return i.value}var c=o(t),d=String(this),p="function"==typeof r;p||(r=String(r));var v=c.global;if(v){var x=c.unicode;c.lastIndex=0}for(var _=[];;){var w=l(c,d);if(null===w)break;if(_.push(w),!v)break;""===String(w[0])&&(c.lastIndex=u(d,s(c.lastIndex),x))}for(var b,E="",O=0,A=0;A<_.length;A++){w=_[A];for(var L=String(w[0]),T=f(h(a(w.index),d.length),0),C=[],R=1;R<w.length;R++)C.push(void 0===(b=w[R])?b:String(b));var I=w.groups;if(p){var M=[L].concat(C,T,d);void 0!==I&&M.push(I);var P=String(r.apply(void 0,M))}else P=m(L,d,T,C,I,r);T>=O&&(E+=d.slice(O,T)+P,O=T+L.length)}return E+d.slice(O)}];function m(t,n,r,o,s,a){var c=r+t.length,u=o.length,l=v;return void 0!==s&&(s=i(s),l=p),e.call(a,l,(function(e,i){var a;switch(i.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,r);case"'":return n.slice(c);case"<":a=s[i.slice(1,-1)];break;default:var l=+i;if(0===l)return e;if(l>u){var f=d(l/10);return 0===f?e:f<=u?void 0===o[f-1]?i.charAt(1):o[f-1]+i.charAt(1):e}a=o[l-1]}return void 0===a?"":a}))}}))},function(t,e,n){"use strict";n(43);var r=n(12),o=n(0),i=n(1),s=n(26),a=n(6),c=i("species"),u=!o((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),l="$0"==="a".replace(/./,"$0"),f=i("replace"),h=!!/./[f]&&""===/./[f]("a","$0"),d=!o((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,f){var p=i(t),v=!o((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),y=v&&!o((function(){var e=!1,n=/a/;return"split"===t&&((n={}).constructor={},n.constructor[c]=function(){return n},n.flags="",n[p]=/./[p]),n.exec=function(){return e=!0,null},n[p](""),!e}));if(!v||!y||"replace"===t&&(!u||!l||h)||"split"===t&&!d){var g=/./[p],S=n(p,""[t],(function(t,e,n,r,o){return e.exec===s?v&&!o?{done:!0,value:g.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}),{REPLACE_KEEPS_$0:l,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:h}),m=S[0],x=S[1];r(String.prototype,t,m),r(RegExp.prototype,p,2==e?function(t,e){return x.call(t,this,e)}:function(t){return x.call(t,this)})}f&&a(RegExp.prototype[p],"sham",!0)}},function(t,e,n){"use strict";var r=n(45).charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},function(t,e,n){var r=n(10),o=n(26);t.exports=function(t,e){var n=t.exec;if("function"==typeof n){var i=n.call(t,e);if("object"!=typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(t))throw TypeError("RegExp#exec called on incompatible receiver");return o.call(t,e)}},function(t,e,n){var r=n(5),o=n(15),i=n(46);r({target:"Object",stat:!0,forced:n(0)((function(){i(1)}))},{keys:function(t){return i(o(t))}})},function(t,e,n){"use strict";var r=n(27),o=n(48);t.exports=r?{}.toString:function(){return"[object "+o(this)+"]"}},function(t,e,n){n(5)({target:"String",proto:!0},{repeat:n(82)})},function(t,e,n){"use strict";var r=n(14),o=n(7);t.exports="".repeat||function(t){var e=String(o(this)),n="",i=r(t);if(i<0||i==1/0)throw RangeError("Wrong number of repetitions");for(;i>0;(i>>>=1)&&(e+=e))1&i&&(n+=e);return n}},function(t,e,n){"use strict";var r,o=n(5),i=n(19).f,s=n(13),a=n(84),c=n(7),u=n(86),l=n(17),f="".startsWith,h=Math.min,d=u("startsWith");o({target:"String",proto:!0,forced:!!(l||d||(r=i(String.prototype,"startsWith"),!r||r.writable))&&!d},{startsWith:function(t){var e=String(c(this));a(t);var n=s(h(arguments.length>1?arguments[1]:void 0,e.length)),r=String(t);return f?f.call(e,r,n):e.slice(n,n+r.length)===r}})},function(t,e,n){var r=n(85);t.exports=function(t){if(r(t))throw TypeError("The method doesn't accept regular expressions");return t}},function(t,e,n){var r=n(8),o=n(10),i=n(1)("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==o(t))}},function(t,e,n){var r=n(1)("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[r]=!1,"/./"[t](e)}catch(t){}}return!1}},function(t,e,n){"use strict";var r=n(5),o=n(88).trim;r({target:"String",proto:!0,forced:n(89)("trim")},{trim:function(){return o(this)}})},function(t,e,n){var r=n(7),o="["+n(50)+"]",i=RegExp("^"+o+o+"*"),s=RegExp(o+o+"*$"),a=function(t){return function(e){var n=String(r(e));return 1&t&&(n=n.replace(i,"")),2&t&&(n=n.replace(s,"")),n}};t.exports={start:a(1),end:a(2),trim:a(3)}},function(t,e,n){var r=n(0),o=n(50);t.exports=function(t){return r((function(){return!!o[t]()||"​᠎"!="​᠎"[t]()||o[t].name!==t}))}},function(t,e,n){var r=n(5),o=n(91);r({target:"Array",stat:!0,forced:!n(96)((function(t){Array.from(t)}))},{from:o})},function(t,e,n){"use strict";var r=n(40),o=n(15),i=n(92),s=n(93),a=n(13),c=n(94),u=n(95);t.exports=function(t){var e,n,l,f,h,d,p=o(t),v="function"==typeof this?this:Array,y=arguments.length,g=y>1?arguments[1]:void 0,S=void 0!==g,m=u(p),x=0;if(S&&(g=r(g,y>2?arguments[2]:void 0,2)),null==m||v==Array&&s(m))for(n=new v(e=a(p.length));e>x;x++)d=S?g(p[x],x):p[x],c(n,x,d);else for(h=(f=m.call(p)).next,n=new v;!(l=h.call(f)).done;x++)d=S?i(f,g,[l.value,x],!0):l.value,c(n,x,d);return n.length=x,n}},function(t,e,n){var r=n(4);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(e){var i=t.return;throw void 0!==i&&r(i.call(t)),e}}},function(t,e,n){var r=n(1),o=n(18),i=r("iterator"),s=Array.prototype;t.exports=function(t){return void 0!==t&&(o.Array===t||s[i]===t)}},function(t,e,n){"use strict";var r=n(21),o=n(11),i=n(16);t.exports=function(t,e,n){var s=r(e);s in t?o.f(t,s,i(0,n)):t[s]=n}},function(t,e,n){var r=n(48),o=n(18),i=n(1)("iterator");t.exports=function(t){if(null!=t)return t[i]||t["@@iterator"]||o[r(t)]}},function(t,e,n){var r=n(1)("iterator"),o=!1;try{var i=0,s={next:function(){return{done:!!i++}},return:function(){o=!0}};s[r]=function(){return this},Array.from(s,(function(){throw 2}))}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i={};i[r]=function(){return{next:function(){return{done:n=!0}}}},t(i)}catch(t){}return n}},function(t,e,n){"use strict";var r=n(45).charAt,o=n(34),i=n(98),s=o.set,a=o.getterFor("String Iterator");i(String,"String",(function(t){s(this,{type:"String Iterator",string:String(t),index:0})}),(function(){var t,e=a(this),n=e.string,o=e.index;return o>=n.length?{value:void 0,done:!0}:(t=r(n,o),e.index+=t.length,{value:t,done:!1})}))},function(t,e,n){"use strict";var r=n(5),o=n(99),i=n(52),s=n(104),a=n(53),c=n(6),u=n(12),l=n(1),f=n(17),h=n(18),d=n(51),p=d.IteratorPrototype,v=d.BUGGY_SAFARI_ITERATORS,y=l("iterator"),g=function(){return this};t.exports=function(t,e,n,l,d,S,m){o(n,e,l);var x,_,w,b=function(t){if(t===d&&T)return T;if(!v&&t in A)return A[t];switch(t){case"keys":case"values":case"entries":return function(){return new n(this,t)}}return function(){return new n(this)}},E=e+" Iterator",O=!1,A=t.prototype,L=A[y]||A["@@iterator"]||d&&A[d],T=!v&&L||b(d),C="Array"==e&&A.entries||L;if(C&&(x=i(C.call(new t)),p!==Object.prototype&&x.next&&(f||i(x)===p||(s?s(x,p):"function"!=typeof x[y]&&c(x,y,g)),a(x,E,!0,!0),f&&(h[E]=g))),"values"==d&&L&&"values"!==L.name&&(O=!0,T=function(){return L.call(this)}),f&&!m||A[y]===T||c(A,y,T),h[e]=T,d)if(_={values:b("values"),keys:S?T:b("keys"),entries:b("entries")},m)for(w in _)(v||O||!(w in A))&&u(A,w,_[w]);else r({target:e,proto:!0,forced:v||O},_);return _}},function(t,e,n){"use strict";var r=n(51).IteratorPrototype,o=n(101),i=n(16),s=n(53),a=n(18),c=function(){return this};t.exports=function(t,e,n){var u=e+" Iterator";return t.prototype=o(r,{next:i(1,n)}),s(t,u,!1,!0),a[u]=c,t}},function(t,e,n){var r=n(0);t.exports=!r((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},function(t,e,n){var r,o=n(4),i=n(102),s=n(25),a=n(24),c=n(103),u=n(31),l=n(23),f=l("IE_PROTO"),h=function(){},d=function(t){return"<script>"+t+"<\/script>"},p=function(){try{r=document.domain&&new ActiveXObject("htmlfile")}catch(t){}var t,e;p=r?function(t){t.write(d("")),t.close();var e=t.parentWindow.Object;return t=null,e}(r):((e=u("iframe")).style.display="none",c.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write(d("document.F=Object")),t.close(),t.F);for(var n=s.length;n--;)delete p.prototype[s[n]];return p()};a[f]=!0,t.exports=Object.create||function(t,e){var n;return null!==t?(h.prototype=o(t),n=new h,h.prototype=null,n[f]=t):n=p(),void 0===e?n:i(n,e)}},function(t,e,n){var r=n(9),o=n(11),i=n(4),s=n(46);t.exports=r?Object.defineProperties:function(t,e){i(t);for(var n,r=s(e),a=r.length,c=0;a>c;)o.f(t,n=r[c++],e[n]);return t}},function(t,e,n){var r=n(37);t.exports=r("document","documentElement")},function(t,e,n){var r=n(4),o=n(105);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,n={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),e=n instanceof Array}catch(t){}return function(n,i){return r(n),o(i),e?t.call(n,i):n.__proto__=i,n}}():void 0)},function(t,e,n){var r=n(8);t.exports=function(t){if(!r(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype");return t}},function(t,e,n){},function(t,e,n){"use strict";n.r(e);n(28),n(42),n(43),n(75);var r=function t(e){var n=this;this.root=document.querySelector(t.S_ROOT),this.button=document.querySelector(t.S_BUTTON),this.isRulerActive=!1,this.onRulerToggled=void 0;var r=this.root;if(e){for(var o="",i="",s=0;s<80;++s)o+='<span class="ruler__stepX">'+8*s+"</span>",i+='<span class="ruler__stepY">'+8*s+"</span>";r.querySelector(t.S_RULER_X).innerHTML=o,r.querySelector(t.S_RULER_Y).innerHTML=i,r.removeAttribute("hidden"),r.classList.add(t.C_IS_VISIBLE),this.button.addEventListener("click",(function(){var t=n.isRulerActive=!n.isRulerActive;e(t)}))}};r.C_IS_VISIBLE="ruler--isVisible",r.S_ROOT=".ruler__root",r.S_RULER_X=".ruler__x",r.S_RULER_Y=".ruler__y",r.S_BUTTON=".ruler__button";n(79),n(47),n(49),n(81),n(83);var o=navigator.maxTouchPoints>0||"ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,i=!/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),s=!/MSIE|Trident/.test(window.navigator.userAgent)&&window.CSS&&window.CSS.supports&&window.CSS.supports("mix-blend-mode","multiply");function a(t){var e=t.toString(16);return 1===e.length?"0"+e:e}function c(t,e,n){return("#"+a(t)+a(e)+a(n)).toUpperCase()}var u=function(){function t(t){var e=t.enabled,n=t.resetOscillator;this.context=null,this.currentOscillator=null,this.currentFrequency=null,this.enabled=!1,this.resetOscillator=!1,this.enabled=e,this.resetOscillator=n}var e=t.prototype;return e.createCurrentOscillator=function(t){void 0===t&&(t=100);var e=this.context||new window.AudioContext,n=e.createOscillator(),r=e.createGain();return this.currentOscillator&&this.currentOscillator.disconnect(),n.type="square",this.currentFrequency=n.frequency.value=t,r.gain.value=.025,n.connect(r),r.connect(e.destination),n.start(0),this.currentOscillator=n},e.playFreq=function(t){if(this.enabled)if(this.resetOscillator)this.createCurrentOscillator(t);else if(this.currentFrequency!==t){var e=this.currentOscillator||this.createCurrentOscillator(t);this.currentFrequency=e.frequency.value=t}},e.resume=function(){this.enabled&&this.context.resume()},e.enable=function(){this.enabled=!0},e.disable=function(){this.enabled=!1,this.currentOscillator&&this.currentOscillator.disconnect()},t}(),l=window.audioService=new u({enabled:!1,resetOscillator:!1}),f=window.navigator,h=f.vibrate?f.vibrate.bind(f):function(){},d=new(function(){function t(){this.isEnabled=!0}var e=t.prototype;return e.vibrate=function(t){this.isEnabled&&h(t)},e.enable=function(){this.isEnabled=!0},e.disable=function(){this.isEnabled=!1,h(0)},t}());function p(t,e,n){return e<t?t:e>n?n:e}var v={"#FFFFFF":130,"#FFFF00":140,"#FF00FF":150,"#0000FF":160,"#000000":170},y=function(){function t(t){this.scale=window.devicePixelRatio||1,this.unit=8,this.scaledUnit=this.unit*this.scale,this.color="#000000",this.drawing=!1,this.lastX=null,this.lastY=null,this.offsetLeft=0,this.offsetTop=0,this.pressedKeys={},this.isSpacePressed=!1,this.isMousePressed=!1,this.canvas=document.querySelector(".jsPaint__root"),this.ctx=this.canvas.getContext("2d"),this.cursor=null,this.keysIntervalID=null,this.cursor=t.cursor,this.reset(!0),this.addEventListeners()}var e=t.prototype;return e.addEventListeners=function(){window.addEventListener("resize",this.handleResize.bind(this)),o&&(document.addEventListener("touchstart",this.handleTouchStart.bind(this)),document.addEventListener("touchmove",this.handleMove.bind(this)),document.addEventListener("touchend",this.handleStop.bind(this)),document.addEventListener("touchcancel",this.handleStop.bind(this))),document.addEventListener("mousedown",this.handleMouseDown.bind(this)),document.addEventListener("mousemove",this.handleMove.bind(this)),document.addEventListener("mouseup",this.handleStop.bind(this)),document.addEventListener("mouseleave",this.handleStop.bind(this)),document.addEventListener("contextmenu",(function(t){var e=t.target;(!e||"A"!==e.tagName&&"A"!==e.parentElement.tagName&&""===window.getSelection().toString())&&t.preventDefault()})),i&&(document.addEventListener("keydown",this.handleKeyDown.bind(this)),document.addEventListener("keyup",this.handleKeyUp.bind(this)),document.documentElement.addEventListener("mouseenter",this.handleMouseEnter.bind(this)),document.documentElement.addEventListener("mouseout",this.handleMouseOut.bind(this)))},e.handleTouchStart=function(t){if(!this.keysIntervalID){var e=t.target;"BUTTON"!==e.tagName&&"A"!==e.tagName&&"A"!==e.parentElement.tagName&&(this.isMousePressed=!0,this.touch(t.pageX,t.pageY,!0))}},e.handleMouseDown=function(t){if(!this.keysIntervalID){var e=t.which,n=t.target;"BUTTON"!==n.tagName&&"A"!==n.tagName&&"A"!==n.parentElement.tagName&&2!==e&&(this.isMousePressed=!0,this.touch(t.pageX,t.pageY,1===e))}},e.handleResize=function(){this.reset()},e.handleMove=function(t){if(!this.keysIntervalID){var e=(t.touches?t.touches[0]:t).pageX,n=(t.touches?t.touches[0]:t).pageY;this.drag(e,n,t.target)}},e.handleStop=function(){this.isMousePressed=!1,this.stopDrawing()},e.handleKeyDown=function(e){var n=this,r=e.key,o=e.repeat,i=e.shiftKey;if(!o)return" "===r||"Shift"===this.key&&this.isSpacePressed?(this.isSpacePressed=!0,void this.touch(this.lastX,this.lastY,!i,!0)):void(r.startsWith("Arrow")&&(this.pressedKeys[r]=!0,window.clearInterval(this.keysIntervalID),this.keysUpdate(),this.keysIntervalID=window.setTimeout((function(){n.keysIntervalID=window.setInterval(n.keysUpdate.bind(n),t.KEY_RATE)}),2*t.KEY_RATE)))},e.handleKeyUp=function(t){var e=t.key;t.repeat||(" "===e?(this.isSpacePressed=!1,this.stopDrawing()):"Shift"===e&&(this.ctx.fillStyle=this.color),e.startsWith("Arrow")&&(delete this.pressedKeys[e],0===Object.keys(this.pressedKeys).length&&(window.clearInterval(this.keysIntervalID),this.keysIntervalID=null)))},e.keysUpdate=function(){var t=this.pressedKeys,e=this.lastX,n=this.lastY;e+=t.ArrowRight?1:0,e-=t.ArrowLeft?1:0,n-=t.ArrowUp?1:0,n+=t.ArrowDown?1:0,this.drag(p(0,e,(window.innerWidth-1)/this.unit|0),p(0,n,(window.innerHeight-1)/this.unit|0))},e.handleMouseEnter=function(){this.cursor.show()},e.handleMouseOut=function(t){t.relatedTarget||t.toElement||this.cursor.hide()},e.reset=function(e){var n=this.canvas,r=this.ctx,o=this.scale;n.setAttribute("width",window.innerWidth*o),n.setAttribute("height",window.innerHeight*o),r.fillStyle=t.BACKGROUND_COLOR,r.fillRect(0,0,window.innerWidth*o,window.innerHeight*o),e||d.vibrate(200)},e.stopDrawing=function(){this.isSpacePressed||this.isMousePressed||(this.drawing=!1)},e.setColor=function(t){this.ctx.fillStyle=this.color=t,d.vibrate(100)},e.touch=function(e,n,r,o){var i=this;this.drawing=!0;var s=this.offsetLeft,a=this.offsetTop,c=this.unit,u=this.cursor,l=this.lastX=o?e:Math.floor((e-s)/c),f=this.lastY=o?n:Math.floor((n-a)/c);this.ctx.fillStyle=r?this.color:t.BACKGROUND_COLOR,requestAnimationFrame((function(){u&&u.update(l*c+s,f*c+a,l+1+" , "+(f+1)),i.paintPixel(l,f)}))},e.drag=function(t,e,n){var r=this,o=this.offsetLeft,i=this.offsetTop,s=this.unit,a=this.scaledUnit,u=this.lastX,f=this.lastY,h=this.cursor,d=this.drawing,p=n?Math.floor((t-o)/s):t,y=n?Math.floor((e-i)/s):e,g=Math.abs(p-u),S=Math.abs(y-f),m=this.lastX!==p||this.lastY!==y;if(this.lastX=p,this.lastY=y,m){var x=d?this.color:c.apply(void 0,this.ctx.getImageData(p*a+o,y*a+i,1,1).data);try{l.playFreq(v[x]),l.resume()}catch(t){}}requestAnimationFrame((function(){h&&!d&&h.setModeForElement(n),m&&(h&&h.update(p*s+o,y*s+i,p+1+" , "+(y+1)),d&&(0===g&&0===S?r.paintPixel(p,y):g>S?r.lineLandscape(u,f,p,y):r.linePortrait(u,f,p,y)))}))},e.paintPixel=function(t,e){var n=this.ctx,r=this.scaledUnit,o=this.offsetLeft,i=this.offsetTop;n.fillRect(t*r+o,e*r+i,r,r)},e.lineLandscape=function(t,e,n,r){if(t>n){var o=[n,t];t=o[0],n=o[1];var i=[r,e];e=i[0],r=i[1]}for(var s=n-t,a=Math.abs(r-e),c=e>r?-1:1,u=2*a-s,l=e,f=t;f<=n;++f)this.paintPixel(f,l),u>0&&(l+=c,u-=2*s),u+=2*a},e.linePortrait=function(t,e,n,r){if(e>r){var o=[n,t];t=o[0],n=o[1];var i=[r,e];e=i[0],r=i[1]}for(var s=Math.abs(n-t),a=r-e,c=t>n?-1:1,u=2*s-a,l=t,f=e;f<=r;++f)this.paintPixel(l,f),u>0&&(l+=c,u-=2*a),u+=2*s},t}();y.BACKGROUND_COLOR="#FFFFFF",y.KEY_RATE=50;var g=function(){function t(){this.root=document.querySelector(t.S_ROOT),this.position=document.querySelector(t.S_POSITION)}var e=t.prototype;return e.update=function(t,e,n){this.root.style.transform="translate("+t+"px, "+e+"px)",this.position.textContent=n},e.setModeForElement=function(e){if(e){var n=e.tagName,r=e.className;"BUTTON"===n||"A"===n||"content__underline"===r?this.root.classList.add(t.C_IS_CLICKABLE):this.root.classList.remove(t.C_IS_CLICKABLE)}else this.root.classList.remove(t.C_IS_CLICKABLE)},e.hide=function(){this.root.style.display="none"},e.show=function(){this.root.style.display="block"},t}();g.C_IS_CLICKABLE="cursor--isClickable",g.S_ROOT=".cursor__root",g.S_POSITION=".cursor__position";n(87);var S=function(){function t(e){this.root=document.querySelector(t.S_ROOT),this.colors=document.querySelector(t.S_COLORS),this.onActionClicked=void 0,this.onActionClicked=e,e?(this.addEventListeners(),this.show()):this.hide()}var e=t.prototype;return e.addEventListeners=function(){var e=this;this.colors.addEventListener("click",(function(n){var r=n.target;if(r.classList.contains(t.C_SAMPLE)){var o=r.dataset.action;if(o)e.onActionClicked(o);else{var i=document.querySelector(t.S_CURRENT);i&&i.classList.remove(t.C_CURRENT),r.classList.add(t.C_CURRENT),e.onActionClicked(window.getComputedStyle(r).getPropertyValue("--bg").trim())}}}))},e.show=function(){this.root.removeAttribute("hidden")},e.hide=function(){this.root.setAttribute("hidden",!0)},t}();S.S_ROOT=".footer__root",S.S_COLORS=".footer__colors",S.S_CURRENT=".footer__sample--isCurrent",S.C_SAMPLE="footer__sample",S.C_CURRENT="footer__sample--isCurrent";n(90),n(97);function m(t){var e=Math.round(60*Math.random()),n=Math.round(60*Math.random()),r=Math.round(60*Math.random()),o=Math.round(Math.random()*(100-e)),i=Math.round(Math.random()*(100-n)),s=Math.round(Math.random()*(100-r));e=e<10?0:e,n=n<10?0:n,r=r<10?0:r,t.style="--x-1: "+o+"%; --w-1: "+e+"%; --x-2: "+i+"%; --w-2: "+n+"%; --x-3: "+s+"%; --w-3: "+r+"%;"}var x={};function _(t){var e=t.currentTarget;window.clearTimeout(x[e])}function w(){Array.from(document.querySelectorAll(".link__underline")).forEach((function(t){var e=t.parentElement,n=t.className;if(m(e),e.onmouseenter=function(t){return function t(e){window.clearTimeout(x[e]),x[e]=setTimeout((function(){m(e),t(e)}),250+750*Math.random())}(t.currentTarget)},e.onmouseleave=_,"link__underline"===n||"link__underline link__underline--hidden"===n){var r=t.cloneNode(!0);r.className="link__linkEffect",r.setAttribute("aria-hidden",!0),e.appendChild(r)}}))}var b=function(){function t(){this.root=document.body,this.footer=null,this.jsPaint=null,this.ruler=null,this.cursor=null;var e=this.root,n=!1;if(i){var r=function(){n=!1,e.classList.remove(t.C_HAS_ACTIVE_FOCUS)};document.addEventListener("keydown",(function(o){"Tab"!==o.key||n?"Escape"===o.key&&n&&r():(n=!0,e.classList.add(t.C_HAS_ACTIVE_FOCUS))})),document.addEventListener("mousedown",r),document.addEventListener("touchstart",r)}s&&"#uncool"!==window.location.hash?this.init():this.showFallback()}var e=t.prototype;return e.init=function(){var e=this.root;o||(this.root.classList.add(t.C_HAS_ACTIVE_HOVER),this.cursor=new g,w()),this.ruler=new r((function(n){n?e.classList.add(t.C_HAS_ACTIVE_RULER):e.classList.remove(t.C_HAS_ACTIVE_RULER)}));var n=this.jsPaint=new y({cursor:this.cursor});this.footer=new S((function(t){"#"===t[0]?(n.setColor(t),e.style.setProperty("--c-current",t)):"reset"===t&&n.reset()}))},e.showFallback=function(){o||this.root.classList.add(t.C_HAS_ACTIVE_HOVER),this.root.classList.add(t.C_SHOW_FALLBACK),document.querySelector(".content__regularHeader").setAttribute("hidden",!0),document.querySelector(".content__warningHeader").removeAttribute("hidden");var e=document.getElementById("torino-"+(1+Math.floor(2*Math.random())));e.remove?e.remove():e.removeNode?e.removeNode():e.setAttribute("hidden"),this.ruler=new r(!1),this.footer=new S(!1),"#uncool"!==window.location.hash&&window.location.replace("#uncool")},e.enableScreenshotMode=function(){this.root.classList.add(t.C_SHOW_SCREENSHOT)},e.disableScreenshotMode=function(){this.root.classList.remove(t.C_SHOW_SCREENSHOT)},t}();b.C_HAS_ACTIVE_FOCUS="app--hasActiveFocus",b.C_HAS_ACTIVE_HOVER="app--hasActiveHover",b.C_HAS_ACTIVE_RULER="app--hasActiveRuler",b.C_SHOW_FALLBACK="app--showFallback",b.C_SHOW_SCREENSHOT="app--showScreenshot",console.log("Hello there 👋. Wanna play a game? 👉 https://danziger.github.io/slotjs/");var E=new b;window.enableScreenshotMode=function(){return E.enableScreenshotMode()},window.disableScreenshotMode=function(){return E.disableScreenshotMode()},window.v=function(){var t=new Date("2020-07-12T01:07:29.797Z");return t.toDateString()+" at "+t.toLocaleTimeString()+" | 0708cb07f97e5a84383c6c29ba8eb238861f03d5"},"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/service-worker.js")}))}]);