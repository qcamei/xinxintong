!function(e){function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var o={};t.m=e,t.c=o,t.i=function(e){return e},t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=66)}([function(e,t){function o(e,t){var o=e[1]||"",r=e[3];if(!r)return o;if(t&&"function"==typeof btoa){var i=n(r);return[o].concat(r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"})).concat([i]).join("\n")}return[o].join("\n")}function n(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=o(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,o){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(n[i]=!0)}for(r=0;r<e.length;r++){var a=e[r];"number"==typeof a[0]&&n[a[0]]||(o&&!a[2]?a[2]=o:o&&(a[2]="("+a[2]+") and ("+o+")"),t.push(a))}},t}},function(e,t,o){function n(e,t){for(var o=0;o<e.length;o++){var n=e[o],r=m[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(d(n.parts[i],t))}else{for(var a=[],i=0;i<n.parts.length;i++)a.push(d(n.parts[i],t));m[n.id]={id:n.id,refs:1,parts:a}}}}function r(e,t){for(var o=[],n={},r=0;r<e.length;r++){var i=e[r],a=t.base?i[0]+t.base:i[0],s=i[1],c=i[2],l=i[3],d={css:s,media:c,sourceMap:l};n[a]?n[a].parts.push(d):o.push(n[a]={id:a,parts:[d]})}return o}function i(e,t){var o=g(e.insertInto);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var n=x[x.length-1];if("top"===e.insertAt)n?n.nextSibling?o.insertBefore(t,n.nextSibling):o.appendChild(t):o.insertBefore(t,o.firstChild),x.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");o.appendChild(t)}}function a(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=x.indexOf(e);t>=0&&x.splice(t,1)}function s(e){var t=document.createElement("style");return e.attrs.type="text/css",l(t,e.attrs),i(e,t),t}function c(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",l(t,e.attrs),i(e,t),t}function l(e,t){Object.keys(t).forEach(function(o){e.setAttribute(o,t[o])})}function d(e,t){var o,n,r,i;if(t.transform&&e.css){if(!(i=t.transform(e.css)))return function(){};e.css=i}if(t.singleton){var l=b++;o=v||(v=s(t)),n=u.bind(null,o,l,!1),r=u.bind(null,o,l,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(o=c(t),n=f.bind(null,o,t),r=function(){a(o),o.href&&URL.revokeObjectURL(o.href)}):(o=s(t),n=p.bind(null,o),r=function(){a(o)});return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else r()}}function u(e,t,o,n){var r=o?"":n.css;if(e.styleSheet)e.styleSheet.cssText=y(t,r);else{var i=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function p(e,t){var o=t.css,n=t.media;if(n&&e.setAttribute("media",n),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}function f(e,t,o){var n=o.css,r=o.sourceMap,i=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||i)&&(n=w(n)),r&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([n],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}var m={},h=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),g=function(e){var t={};return function(o){return void 0===t[o]&&(t[o]=e.call(this,o)),t[o]}}(function(e){return document.querySelector(e)}),v=null,b=0,x=[],w=o(3);e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");t=t||{},t.attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=h()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var o=r(e,t);return n(o,t),function(e){for(var i=[],a=0;a<o.length;a++){var s=o[a],c=m[s.id];c.refs--,i.push(c)}if(e){n(r(e,t),t)}for(var a=0;a<i.length;a++){var c=i[a];if(0===c.refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete m[c.id]}}}};var y=function(){var e=[];return function(t,o){return e[t]=o,e.filter(Boolean).join("\n")}}()},function(module,exports,__webpack_require__){"use strict";var ngMod=angular.module("page.ui.xxt",[]);ngMod.directive("dynamicHtml",["$compile",function(e){return{restrict:"EA",replace:!0,link:function(t,o,n){t.$watch(n.dynamicHtml,function(n){n&&n.length&&(o.html(n),e(o.contents())(t))})}}}]),ngMod.service("tmsDynaPage",["$q",function($q){this.loadCss=function(e){var t,o;t=document.createElement("style"),t.innerHTML=e,o=document.querySelector("head"),o.appendChild(t)},this.loadExtCss=function(e){var t,o;t=document.createElement("link"),t.href=e,t.rel="stylesheet",o=document.querySelector("head"),o.appendChild(t)},this.loadJs=function(ngApp,js){!function(ngApp){eval(js)}(ngApp)},this.loadScript=function(e){var t,o,n=$q.defer();return o=function(){var r;r=document.createElement("script"),r.src=e[t],r.onload=function(){t++,t<e.length?o():n.resolve()},document.body.appendChild(r)},e&&(angular.isString(e)&&(e=[e]),e.length&&(t=0,o())),n.promise},this.loadExtJs=function(e,t){var o,n=this,r=$q.defer(),i=t.ext_js.length;return o=function(o){var a;a=document.createElement("script"),a.src=o.url,a.onload=function(){0===--i&&(t.js&&t.js.length&&n.loadJs(e,t.js),r.resolve())},document.body.appendChild(a)},t.ext_js&&t.ext_js.length&&t.ext_js.forEach(o),r.promise},this.loadCode=function(e,t){var o=this,n=$q.defer();return t.ext_css&&t.ext_css.length&&t.ext_css.forEach(function(e){o.loadExtCss(e.url)}),t.css&&t.css.length&&this.loadCss(t.css),t.ext_js&&t.ext_js.length?o.loadExtJs(e,t).then(function(){n.resolve()}):(t.js&&t.js.length&&o.loadJs(e,t.js),n.resolve()),n.promise},this.openPlugin=function(e){var t,o,n,r=$q.defer();return t=document.createDocumentFragment(),o=document.createElement("div"),o.setAttribute("id","frmPlugin"),n=document.createElement("iframe"),o.appendChild(n),o.onclick=function(){o.parentNode.removeChild(o)},t.appendChild(o),document.body.appendChild(t),0===e.indexOf("http")?(window.onClosePlugin=function(e){o.parentNode.removeChild(o),r.resolve(e)},n.setAttribute("src",e)):n.contentDocument&&n.contentDocument.body&&(n.contentDocument.body.innerHTML=e),r.promise}}])},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var o=t.protocol+"//"+t.host,n=o+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var r=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r))return e;var i;return i=0===r.indexOf("//")?r:0===r.indexOf("/")?o+r:n+r.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}},function(e,t,o){"use strict";angular.module("modal.ui.xxt",[]).service("tmsModal",["$rootScope","$compile","$q","$controller",function(e,t,o,n){this.open=function(r){var i,a=o.defer(),s=o.defer(),c={result:a.promise,closed:s.promise,close:function(e){document.body.removeChild(p[0]),a.resolve(e)},dismiss:function(e){document.body.removeChild(p[0]),s.resolve(e)}};i=e.$new(!0),r.controller&&n(r.controller,{$scope:i,$tmsModalInstance:c});var l,d,u,p;return l=angular.element("<div></div>"),l.attr({class:"modal-content","ng-style":"{'z-index':1060}"}).append(r.template),d=angular.element("<div></div>"),d.attr({class:"modal-dialog"}).append(l),u=angular.element("<div></div>"),u.attr({class:"modal-backdrop","ng-style":"{'z-index':1040}"}),p=angular.element("<div></div>"),p.attr({class:"modal","ng-style":"{'z-index':1050}",tabindex:-1}).append(d).append(u),t(p)(i),document.body.appendChild(p[0]),c}}])},function(e,t,o){var n=o(8);"string"==typeof n&&(n=[[e.i,n,""]]);var r={};r.transform=void 0;o(1)(n,r);n.locals&&(e.exports=n.locals)},function(module,exports,__webpack_require__){"use strict";var ngMod=angular.module("snsshare.ui.xxt",[]);ngMod.service("tmsSnsShare",["$http",function($http){function setWxShare(e,t,o,n,r){window.wx.onMenuShareTimeline({title:r.descAsTitle?o:e,link:t,imgUrl:n,success:function(){try{r.logger&&r.logger("T")}catch(e){alert("share failed:"+e.message)}},cancel:function(){}}),window.wx.onMenuShareAppMessage({title:e,desc:o,link:t,imgUrl:n,success:function(){try{r.logger&&r.logger("F")}catch(e){alert("share failed:"+e.message)}},cancel:function(){}})}function setYxShare(e,t,o,n,r){var i={img_url:n,link:t,title:e,desc:o};window.YixinJSBridge.on("menu:share:appmessage",function(e){try{r.logger&&r.logger("F")}catch(e){alert("share failed:"+e.message)}window.YixinJSBridge.invoke("sendAppMessage",i,function(e){})}),window.YixinJSBridge.on("menu:share:timeline",function(e){try{r.logger&&r.logger("T")}catch(e){alert("share failed:"+e.message)}window.YixinJSBridge.invoke("shareTimeline",i,function(e){})})}this.config=function(e){this.options=e},this.set=function(title,link,desc,img,fnOther){var _this=this;if(img&&-1===img.indexOf("http")&&(img="http://"+location.host+img),/MicroMessenger/i.test(navigator.userAgent)){var script;script=document.createElement("script"),script.src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js",script.onload=function(){var xhr,url;xhr=new XMLHttpRequest,url="/rest/site/fe/wxjssdksignpackage?site="+_this.options.siteId+"&url="+encodeURIComponent(location.href.split("#")[0]),xhr.open("GET",url,!0),xhr.onreadystatechange=function(){if(4==xhr.readyState)if(xhr.status>=200&&xhr.status<400){var signPackage;try{eval("("+xhr.responseText+")"),signPackage&&(signPackage.debug=!1,signPackage.jsApiList=_this.options.jsApiList,wx.config(signPackage),setWxShare(title,link,desc,img,_this.options))}catch(e){alert("local error:"+e.toString())}}else alert("http error:"+xhr.statusText)},xhr.send()},document.body.appendChild(script)}else/Yixin/i.test(navigator.userAgent)?void 0===window.YixinJSBridge?document.addEventListener("YixinJSBridgeReady",function(){setYxShare(title,link,desc,img,_this.options)},!1):setYxShare(title,link,desc,img,_this.options):fnOther&&"function"==typeof fnOther&&fnOther(title,link,desc,img)}}])},function(e,t,o){"use strict";o(5),o(2),o(4),angular.module("favor.ui.xxt",["page.ui.xxt","modal.ui.xxt"]).service("tmsFavor",["$rootScope","$http","$q","tmsDynaPage","tmsModal",function(e,t,o,n,r){function i(e){var n,r;return r=o.defer(),n="/rest/site/fe/user/favor/byUser",n+="?site="+e.siteid,n+="&id="+e.id,n+="&type="+e.type,t.get(n).success(function(e){r.resolve(e.data)}),r.promise}function a(e){var n,r;return r=o.defer(),n="/rest/site/fe/user/favor/add",n+="?site="+e.siteid,n+="&id="+e.id,n+="&type="+e.type,t.get(n).success(function(e){r.resolve(e.data)}),r.promise}function s(e){var n,r;return r=o.defer(),n="/rest/site/fe/user/favor/remove",n+="?site="+e.siteid,n+="&id="+e.id,n+="&type="+e.type,t.get(n).success(function(e){r.resolve(e.data)}),r.promise}function c(e){var n,r;return r=o.defer(),n="/rest/pl/fe/site/favor/sitesByUser?site="+e.siteid+"&id="+e.id+"&type="+e.type+"&_="+1*new Date,t.get(n).success(function(e){0==e.err_code&&r.resolve(e.data)}),r.promise}function l(e,n){var r,i;return i=o.defer(),r="/rest/pl/fe/site/favor/add?id="+e.id+"&type="+e.type,t.post(r,n).success(function(e){i.resolve(e.data)}),i.promise}function d(e,n){var r,i;return i=o.defer(),r="/rest/pl/fe/site/favor/remove?id="+e.id+"&type="+e.type,t.post(r,n).success(function(e){i.resolve(e.data)}),i.promise}this.open=function(e){var o;o='<div class="modal-header"><span class="modal-title">指定收藏位置</span></div>',o+='<div class="modal-body">',o+='<div class="checkbox">',o+="<label>",o+="<input type='checkbox' ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model='person._selected'>",o+="<span>个人账户</span>",o+="<span ng-if=\"person._favored==='Y'\">（已收藏）</span>",o+="</label>",o+="</div>",o+='<div class="checkbox" ng-repeat="site in mySites">',o+="<label>",o+="<input type='checkbox' ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model='site._selected'>",o+="<span>{{site.name}}</span>",o+="<span ng-if=\"site._favored==='Y'\">（已收藏）</span>",o+="</label>",o+="</div>",o+='<div ng-if="mySites.length===0"><a href="" ng-click="createSite()">创建</a>团队进行收藏，方便团队内共享信息</div>',o+="</div>",o+='<div class="modal-footer"><button class="btn btn-default" ng-click="cancel()">关闭</button><button class="btn btn-success" ng-click="ok()">确定</button></div>',r.open({template:o,controller:["$scope","$tmsModalInstance",function(o,n){i(e).then(function(e){o.person={_favored:e?"Y":"N"},o.person._selected=o.person._favored}),c(e).then(function(e){var t=e;t.forEach(function(e){e._selected=e._favored}),o.mySites=t}),o.createSite=function(){t.get("/rest/pl/fe/site/create").success(function(e){var t=e.data;t._favored=t._selected="N",o.mySites=[t]})},o.ok=function(){var e;e={person:o.person,mySites:o.mySites},n.close(e)},o.cancel=function(){n.dismiss()}}]}).result.then(function(t){var o,n;if(o=t.person,o&&o._selected!==o._favored&&("Y"===o._selected?a(e):s(e)),n=t.mySites){var r=[],i=[];n.forEach(function(e){e._selected!==e._favored&&("Y"===e._selected?r.push(e.id):i.push(e.id))}),r.length&&l(e,r),i.length&&d(e,i)}})},this.showSwitch=function(t,o){var r,i=this;r=document.createElement("div"),r.classList.add("tms-switch","tms-switch-favor"),r.addEventListener("click",function(r){r.preventDefault(),r.stopPropagation(),e.$apply(function(){t.loginExpire?i.open(o):n.openPlugin("http://"+location.host+"/rest/site/fe/user/login?site="+o.siteid).then(function(e){t.loginExpire=e.loginExpire,i.open(o)})})},!0),document.body.appendChild(r)}}])},function(e,t,o){t=e.exports=o(0)(void 0),t.push([e.i,".modal{display:block;overflow:hidden;outline:0;overflow-x:hidden;overflow-y:auto;opacity:1}.modal,.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0}.modal-backdrop{background-color:#000;opacity:.5}.modal-dialog{z-index:1055;margin:0;position:relative;width:auto;margin:10px}.modal-content{position:relative;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #999;border:1px solid rgba(0,0,0,.2);border-radius:6px;outline:0;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5)}.modal-header{padding:15px;border-bottom:1px solid #e5e5e5}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.42857143}.modal-body{position:relative;padding:15px}.modal-footer{padding:15px;text-align:right;border-top:1px solid #e5e5e5}button.close{-webkit-appearance:none;padding:0;cursor:pointer;background:0 0;border:0}.close{float:right;font-size:21px;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.2}@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,.5);box-shadow:0 5px 15px rgba(0,0,0,.5)}}",""])},function(e,t,o){"use strict";function n(e,t){var o,n,r;o=document.createDocumentFragment(),n=document.createElement("div"),n.setAttribute("id","frmPlugin"),r=document.createElement("iframe"),n.appendChild(r),n.onclick=function(){n.parentNode.removeChild(n)},o.appendChild(n),document.body.appendChild(o),0===e.indexOf("http")?(window.onClosePlugin=function(){n.parentNode.removeChild(n),t&&t()},r.setAttribute("src",e)):r.contentDocument&&r.contentDocument.body&&(r.contentDocument.body.innerHTML=e)}angular.module("coinpay.ui.xxt",[]).service("tmsCoinPay",function(){this.showSwitch=function(e,t){var o;o=document.createElement("div"),o.classList.add("tms-switch","tms-switch-coinpay"),o.addEventListener("click",function(o){o.preventDefault(),o.stopPropagation();var r="http://"+location.host;r+="/rest/site/fe/coin/pay",r+="?site="+e,r+="&matter="+t,n(r)},!0),document.body.appendChild(o)}})},function(e,t,o){"use strict";function n(e,t){var o,n,r;o=document.createDocumentFragment(),n=document.createElement("div"),n.setAttribute("id","frmPlugin"),r=document.createElement("iframe"),n.appendChild(r),n.onclick=function(){n.parentNode.removeChild(n)},o.appendChild(n),document.body.appendChild(o),0===e.indexOf("http")?(window.onClosePlugin=function(){n.parentNode.removeChild(n),t&&t()},r.setAttribute("src",e)):r.contentDocument&&r.contentDocument.body&&(r.contentDocument.body.innerHTML=e)}angular.module("siteuser.ui.xxt",[]).service("tmsSiteUser",function(){this.showSwitch=function(e,t){var o;o=document.createElement("div"),o.classList.add("tms-switch","tms-switch-siteuser"),o.addEventListener("click",function(o){o.preventDefault(),o.stopPropagation();var r="http://"+location.host;r+="/rest/site/fe/user",r+="?site="+e,t?location.href=r:n(r)},!0),document.body.appendChild(o)}})},function(e,t,o){t=e.exports=o(0)(void 0),t.push([e.i,'.dialog.mask{position:fixed;background:rgba(0,0,0,.3);top:0;left:0;bottom:0;right:0;overflow:auto;z-index:998}.dialog.dlg{position:absolute;background:#fff;left:0;right:0;bottom:0;margin:15px}.dialog .dlg-body,.dialog .dlg-header{padding:15px 15px 0}.dialog .dlg-footer{text-align:right;padding:15px}.dialog .dlg-footer button{border-radius:0}div[wrap=filter] .detail{background:#ccc}div[wrap=filter] .detail .options .label{display:inline-block;margin:.5em;padding-top:.3em;font-size:100%}div[wrap=filter] .detail .actions .btn{border-radius:0}.tms-switch{position:fixed;right:15px;width:48px;height:48px;background:hsla(0,0%,75%,.5);border-radius:4px;color:#666;font-size:24px;line-height:48px;text-align:center;cursor:pointer}.tms-switch:before{font-size:.7em}.tms-switch:nth-of-type(2){bottom:8px}.tms-switch:nth-of-type(3){bottom:64px}.tms-switch:nth-of-type(4){bottom:120px}.tms-switch:nth-of-type(5){bottom:176px}.tms-switch:nth-of-type(6){bottom:236px}.tms-switch-favor:before{content:"\\6536\\85CF"}.tms-switch-favor.favored{background:rgba(132,255,192,.5)}.tms-switch-coinpay:before{content:"\\6253\\8D4F"}.tms-switch-siteuser:before{content:"\\6211"}.tms-discuss-switch{position:fixed;bottom:48px;right:15px;width:48px;height:48px;background:hsla(0,0%,75%,.5);border-radius:4px;color:#666;font-size:24px;line-height:48px;text-align:center}@media screen and (max-width:719px){body{margin-bottom:128px}.tms-switch{bottom:8px}.tms-switch:nth-of-type(2){right:16px;bottom:8px}.tms-switch:nth-of-type(3){right:72px;bottom:8px}.tms-switch:nth-of-type(4){right:128px;bottom:8px}.tms-switch:nth-of-type(5){right:184px;bottom:8px}.tms-switch:nth-of-type(6){right:244px;bottom:8px}}#frmPlugin{position:absolute;top:0;bottom:0;left:0;right:0;border:none;z-index:999;box-sizing:border-box;padding-bottom:48px;background:#fff}#frmPlugin,#frmPlugin iframe{width:100%;height:100%}#frmPlugin:after{content:"\\5173\\95ED";position:absolute;width:100px;text-align:center;left:50%;margin-left:-50px;bottom:4px;padding:5px 6px 3px;border:1px solid #ccc;border-radius:4px}div[wrap]>.description{word-wrap:break-word}',""])},function(e,t,o){var n=o(11);"string"==typeof n&&(n=[[e.i,n,""]]);var r={};r.transform=void 0;o(1)(n,r);n.locals&&(e.exports=n.locals)},function(e,t,o){"use strict";var n={};n.makeDialog=function(e,t){var o,n;return n=document.createElement("div"),n.setAttribute("id",e),n.classList.add("dialog","mask"),o="<div class='dialog dlg'>",t.header&&t.header.length&&(o+="<div class='dlg-header'>"+t.header+"</div>"),o+="<div class='dlg-body'>"+t.body+"</div>",t.footer&&t.footer.length&&(o+="<div class='dlg-footer'>"+t.footer+"</div>"),o+="</div>",n.innerHTML=o,document.body.appendChild(n),n.children};var r=angular.module("directive.enroll",[]);r.directive("tmsDate",["$compile",function(e){return{restrict:"A",scope:{value:"=tmsDateValue"},controller:["$scope",function(e){e.close=function(){var t;t=document.querySelector("#"+e.dialogID),document.body.removeChild(t),e.opened=!1},e.ok=function(){var t;t=new Date,t.setTime(0),t.setFullYear(e.data.year),t.setMonth(e.data.month-1),t.setDate(e.data.date),t.setHours(e.data.hour),t.setMinutes(e.data.minute),e.value=parseInt(t.getTime()/1e3),e.close()}}],link:function(t,o,r){var i,a,s,c;void 0===t.value&&(t.value=1*new Date/1e3),a=new Date,a.setTime(1e3*t.value),t.options={years:[2014,2015,2016,2017],months:[1,2,3,4,5,6,7,8,9,10,11,12],dates:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],hours:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],minutes:[0,5,10,15,20,25,30,35,40,45,50,55]},s=5*Math.round(a.getMinutes()/5),t.data={year:a.getFullYear(),month:a.getMonth()+1,date:a.getDate(),hour:a.getHours(),minute:s},-1===t.options.minutes.indexOf(s)&&t.options.minutes.push(s),c='<div class="form-group"><select class="form-control" ng-model="data.year" ng-options="y for y in options.years"></select></div>',c+='<div class="form-group"><select class="form-control" ng-model="data.month" ng-options="m for m in options.months"></select></div>',c+='<div class="form-group"><select class="form-control" ng-model="data.date" ng-options="d for d in options.dates"></select></div>',c+='<div class="form-group"><select class="form-control" ng-model="data.hour" ng-options="h for h in options.hours"></select></div>',c+='<div class="form-group"><select class="form-control" ng-model="data.minute" ng-options="mi for mi in options.minutes"></select></div>',i=function(o){if(o.preventDefault(),o.stopPropagation(),!t.opened){var r,i;i="_dlg-"+1*new Date,r={header:"",body:c,footer:'<button class="btn btn-default" ng-click="close()">关闭</button><button class="btn btn-success" ng-click="ok()">确定</button>'},r=n.makeDialog(i,r),t.opened=!0,t.dialogID=i,e(r)(t)}},o[0].querySelector("[ng-bind]").addEventListener("click",i)}}}]),r.directive("tmsCheckboxGroup",function(){return{restrict:"A",link:function(e,t,o){var n,r,i,a;o.tmsCheckboxGroup&&o.tmsCheckboxGroup.length&&(n=o.tmsCheckboxGroup,o.tmsCheckboxGroupModel&&o.tmsCheckboxGroupModel.length&&(r=o.tmsCheckboxGroupModel,o.tmsCheckboxGroupUpper&&o.tmsCheckboxGroupUpper.length&&(a=o.tmsCheckboxGroupUpper,i=document.querySelectorAll("[name="+n+"]"),e.$watch(r+"."+n,function(e){var t;t=0,angular.forEach(e,function(e,o){e&&t++}),t>=a?[].forEach.call(i,function(e){void 0===e.checked?!e.classList.contains("checked")&&e.setAttribute("disabled",!0):!e.checked&&(e.disabled=!0)}):[].forEach.call(i,function(e){void 0===e.checked?e.removeAttribute("disabled"):e.disabled=!1})},!0))))}}}),r.directive("flexImg",function(){return{restrict:"A",replace:!0,template:"<img ng-src='{{img.imgSrc}}'>",link:function(e,t,o){angular.element(t).on("load",function(){var e,t,o=this.clientWidth,n=this.clientHeight;o>n?(e=o/n*80,angular.element(this).css({height:"100%",width:e+"px",top:"0",left:"50%","margin-left":-1*e/2+"px"})):(t=n/o*80,angular.element(this).css({width:"100%",height:t+"px",left:"0",top:"50%","margin-top":-1*t/2+"px"}))})}}})},function(e,t,o){"use strict";angular.module("http.ui.xxt",[]).service("http2",["$rootScope","$http","$timeout","$q","$sce","$compile",function(e,t,o,n,r,i){function a(t,o,n){var a;return a=angular.element("<div></div>"),a.attr({class:"tms-notice alert alert-"+(o||"info"),"ng-style":"{'z-index':1040}"}).html(r.trustAsHtml(t)),n||a[0].addEventListener("click",function(){document.body.removeChild(a[0])},!0),i(a)(e),document.body.appendChild(a[0]),a[0]}function s(e){e&&document.body.removeChild(e)}this.get=function(e,r){var i,c,l=n.defer();return r=angular.extend({headers:{accept:"application/json"},autoBreak:!0,autoNotice:!0,showProgress:!0,showProgressDelay:500,showProgressText:"正在获取数据..."},r),!0===r.showProgress&&(c=o(function(){c=null,i=a(r.showProgressText,"info")},r.showProgressDelay)),t.get(e,r).success(function(e){if(!0===r.showProgress&&(c&&o.cancel(c),i&&(s(i),i=null)),angular.isString(e))return void(r.autoNotice&&a(e,"warning"));0!=e.err_code&&(r.autoNotice&&a(e.err_msg,"warning"),r.autoBreak)||l.resolve(e)}).error(function(e,t){!0===r.showProgress&&(c&&o.cancel(c),i&&(s(i),i=null)),a(null===e?"网络不可用":e,"danger")}),l.promise},this.post=function(e,r,i){var c,l,d=n.defer();return i=angular.extend({headers:{accept:"application/json"},autoBreak:!0,autoNotice:!0,showProgress:!0,showProgressDelay:500,showProgressText:"正在获取数据..."},i),!0===i.showProgress&&(l=o(function(){l=null,c=a(i.showProgressText,"info")},i.showProgressDelay)),t.post(e,r,i).success(function(e){if(!0===i.showProgress&&(l&&o.cancel(l),c&&(s(c),c=null)),angular.isString(e))return void(i.autoNotice&&(a(e,"warning"),c=null));0!=e.err_code&&(i.autoNotice&&a(e.err_msg,"warning"),i.autoBreak)||d.resolve(e)}).error(function(e,t){!0===i.showProgress&&(l&&o.cancel(l),c&&(s(c),c=null)),a(null===e?"网络不可用":e,"danger")}),d.promise}}])},function(e,t,o){"use strict";o(6),/MicroMessenger/i.test(navigator.userAgent)&&window.signPackage&&window.wx?window.wx.ready(function(){window.wx.showOptionMenu()}):/YiXin/i.test(navigator.userAgent)&&document.addEventListener("YixinJSBridgeReady",function(){YixinJSBridge.call("showOptionMenu")},!1),o(12),o(14),o(2),o(10),o(7),o(9),o(13);var n=angular.module("app",["ngSanitize","ui.bootstrap","http.ui.xxt","page.ui.xxt","snsshare.ui.xxt","directive.enroll","siteuser.ui.xxt","favor.ui.xxt"]);n.provider("ls",function(){var e={};this.params=function(t){var o;return o=location.search,angular.forEach(t,function(t){var n,r;r=new RegExp(t+"=([^&]*)"),n=o.match(r),e[t]=n?n[1]:""}),e},this.$get=function(){return{p:e,j:function(t){var o=1,n=arguments.length,r="/rest/site/fe/matter/enroll",i=[];for(t&&t.length&&(r+="/"+t);o<n;o++)i.push(arguments[o]+"="+e[arguments[o]]);return i.length&&(r+="?"+i.join("&")),r}}}}),n.config(["$controllerProvider","$uibTooltipProvider","lsProvider",function(e,t,o){n.provider={controller:e.register},t.setTriggers({show:"hide"}),o.params(["site","app","rid","page","ek","preview","newRecord","ignoretime"])}]),n.controller("ctrlAppTip",["$scope","$interval",function(e,t){var o;e.autoCloseTime=6,e.domId="",e.closeTip=function(){var t=document.querySelector(e.domId),o=document.createEvent("HTMLEvents");o.initEvent("hide",!1,!1),t.dispatchEvent(o)},o=t(function(){0===--e.autoCloseTime&&(t.cancel(o),e.closeTip())},1e3)}]),n.controller("ctrlMain",["$scope","$http","$timeout","ls","tmsDynaPage","tmsSnsShare","tmsSiteUser","tmsFavor",function(e,t,o,r,i,a,s,c){var l=[];e.errmsg="",e.closePreviewTip=function(){e.preview="N"};var d=function(){t.get(r.j("askFollow","site")).error(function(e){var t,o;t=document.body,o=document.createElement("iframe"),o.setAttribute("id","frmPopup"),o.height=t.clientHeight,t.scrollTop=0,t.appendChild(o),window.closeAskFollow=function(){o.style.display="none"},o.setAttribute("src",r.j("askFollow","site")),o.style.display="block"})},u=function(){return{exec:function(t){var o,n,r,i;i=!0,o=e,r=t.match(/\((.*?)\)/)[1].replace(/'|"/g,"").split(","),angular.forEach(t.replace(/\(.*?\)/,"").split("."),function(e){if(n&&(o=n),!o[e])return void(i=!1);n=o[e]}),i&&n.apply(o,r)}}}();e.back=function(){history.back()},e.closeWindow=function(){/MicroMessenger/i.test(navigator.userAgent)?window.wx.closeWindow():/YiXin/i.test(navigator.userAgent)&&window.YixinJSBridge.call("closeWebView")},e.addRecord=function(t,o){if(o)e.gotoPage(t,o,null,null,!1,"Y");else for(var n in e.app.pages){var r=e.app.pages[n];if("I"===r.type){e.gotoPage(t,r.name,null,null,!1,"Y");break}}},e.gotoPage=function(t,o,n,i,a,s){if(t&&(t.preventDefault(),t.stopPropagation()),a&&!e.User.fan)return void d();var c=r.j("","site","app");void 0!==n&&null!==n&&n.length&&(c+="&ek="+n),void 0!==i&&null!==i&&i.length&&(c+="&rid="+i),void 0!==o&&null!==o&&o.length&&(c+="&page="+o),void 0!==s&&"Y"===s&&(c+="&newRecord=Y"),/remark|repos/.test(o)?location=c:location.replace(c)},e.openMatter=function(e,t,o,n){var i="/rest/site/fe/matter?site="+r.p.site+"&id="+e+"&type="+t;o?location.replace(i):!1===n?location.href=i:window.open(i)},e.onReady=function(t){e.params?u.exec(t):l.push(t)},t.get(r.j("get","site","app","rid","page","ek","newRecord")).success(function(d){if(0!==d.err_code)return void(e.errmsg=d.err_msg);var p,f,m,h=d.data,g=h.site,v=h.app,b=h.mission,x=h.page,w=h.user,y={};v.dataSchemas.forEach(function(e){y[e.id]=e}),v._schemasById=y,e.params=h,e.site=g,e.mission=b,e.app=v,e.user=w,"Y"===v.multi_rounds&&(e.activeRound=h.activeRound),p=w.uid+"_"+1*new Date,f="http://"+location.host+r.j("","site","app","rid","newRecord"),f+="&shareby="+p,x&&x.share_page&&"Y"===x.share_page&&(f+="&page="+x.name,h.record&&(f+="&ek="+h.record.enroll_key),/iphone|ipad/i.test(navigator.userAgent)||window.history&&window.history.replaceState&&window.history.replaceState({},v.title,f)),/MicroMessenger|Yixin/i.test(navigator.userAgent)&&(m=v.summary,x&&x.share_summary&&x.share_summary.length&&h.record&&(m=h.record.data[x.share_summary]),window.shareCounter=0,a.config({siteId:v.siteid,logger:function(e){var o;o="/rest/site/fe/matter/logShare",o+="?shareid="+p,o+="&site="+v.siteid,o+="&id="+v.id,o+="&type=enroll",o+="&title="+v.title,o+="&shareby="+p,o+="&shareto="+e,t.get(o),window.shareCounter++,"Y"===v.can_autoenroll&&"Y"===x.autoenroll_onshare&&t.get(r.j("emptyGet","site","app")+"&once=Y"),window.onshare&&window.onshare(window.shareCounter)},jsApiList:["hideOptionMenu","onMenuShareTimeline","onMenuShareAppMessage","chooseImage","uploadImage","getLocation"]}),a.set(v.title,f,m,v.pic)),"Y"===v.use_site_header&&g&&g.header_page&&i.loadCode(n,g.header_page),"Y"===v.use_mission_header&&b&&b.header_page&&i.loadCode(n,b.header_page),"Y"===v.use_mission_footer&&b&&b.footer_page&&i.loadCode(n,b.footer_page),"Y"===v.use_site_footer&&g&&g.footer_page&&i.loadCode(n,g.footer_page),h.page&&i.loadCode(n,h.page).then(function(){e.page=h.page}),l.length&&angular.forEach(l,u.exec),c.showSwitch(e.user,v),"Y"===v.can_siteuser&&s.showSwitch(v.siteid,!0),o(function(){e.$broadcast("xxt.app.enroll.ready",h)});var k;(k=document.querySelector(".loading"))&&k.parentNode.removeChild(k),t.post("/rest/site/fe/matter/logAccess?site="+v.siteid+"&id="+v.id+"&type=enroll&title="+v.title+"&shareby=",{search:location.search.replace("?",""),referer:document.referrer})}).error(function(t,o){if(401===o){var n=document.createElement("iframe");n.setAttribute("id","frmPopup"),n.onload=function(){this.height=document.querySelector("body").clientHeight},document.body.appendChild(n),0===t.indexOf("http")?(window.onAuthSuccess=function(){n.style.display="none"},n.setAttribute("src",t),n.style.display="block"):n.contentDocument&&n.contentDocument.body&&(n.contentDocument.body.innerHTML=t,n.style.display="block")}else e.errmsg=t})}]),e.exports=n},,,,,,,,,,,,,,,function(e,t,o){"use strict";o(53),o(15).controller("ctrlRemark",["$scope","$q","http2","$sce",function(e,t,o,n){function r(){var n,r=t.defer();return n="/rest/site/fe/matter/enroll/remark/list?site="+i.siteid+"&ek="+a,n+="&schema="+e.filter.schema.id,o.get(n).then(function(e){r.resolve(e.data)}),r.promise}var i,a,s;a=location.search.match(/[\?&]ek=([^&]*)/)[1],s=location.search.match(/[\?&]schema=[^&]*/)?location.search.match(/[\?&]schema=([^&]*)/)[1]:null,e.newRemark={},e.filter={},e.addRemark=function(){var t;t="/rest/site/fe/matter/enroll/remark/add?site="+i.siteid+"&ek="+a,t+="&schema="+e.filter.schema.id,o.post(t,e.newRemark).then(function(t){e.remarks.push(t.data),e.newRemark.content=""})},e.likeRemark=function(e){var t;t="/rest/site/fe/matter/enroll/remark/like",t+="?site="+i.siteid,t+="&remark="+e.id,o.get(t).then(function(t){e.like_log=t.data.like_log,e.like_num=t.data.like_num})},e.likeRecordData=function(){var t;t="/rest/site/fe/matter/enroll/record/like",t+="?site="+i.siteid,t+="&ek="+e.record.enroll_key,t+="&schema="+e.filter.schema.id,o.get(t).then(function(t){e.data.like_log=t.data.like_log,e.data.like_num=t.data.like_num})},e.gotoRecord=function(){var t;if(e.record.userid===e.user.uid)for(var o in e.app.pages)if(t=e.app.pages[o],"V"===t.type){e.gotoPage(null,t.name,e.record.enroll_key);break}},e.value2Label=function(t){var o,r,i,a=[];return(r=e.app._schemasById[t])&&e.record.data&&((o=e.record.data[t])?r.ops&&r.ops.length&&(i=o.split(","),r.ops.forEach(function(e){-1!==i.indexOf(e.v)&&a.push(e.l)}),o=a.join(",")):o=""),n.trustAsHtml(o)},e.$on("xxt.app.enroll.ready",function(t,o){var n,r=[];i=o.app,e.record=o.record;for(var a=0,c=i.dataSchemas.length;a<c;a++)i.dataSchemas[a].remarkable&&"Y"===i.dataSchemas[a].remarkable&&r.push(i.dataSchemas[a]),s&&i.dataSchemas[a].id===s&&(n=i.dataSchemas[a]);n?e.filter.schema=n:r.length&&(e.filter.schema=r[0]),e.remarkableSchemas=r}),e.$watch("filter",function(t){t&&t.schema&&r().then(function(t){e.data=t.data,e.remarks=t.remarks})},!0)}])},,,,,,,,,,,,,function(e,t,o){t=e.exports=o(0)(void 0),t.push([e.i,'body,html{height:100%;width:100%;background:#efefef;font-family:Microsoft Yahei,Arial}body{position:relative;font-size:16px}img{max-width:100%}.glyphicon-heart{color:red}.bottom-bar{display:flex}.bottom-bar .datetime{color:#777;flex:1;line-height:30px;font-size:.8em}p{word-break:break-all}#recordData{padding:0 1rem 1rem;background:#eee}#recordData .title{margin:.5rem -1rem;background:#ddd;padding:.5rem 1rem;border-bottom:3px ridge #ccc}#recordData blockquote{border-left:5px solid #999}#remarks{position:relative;background:#fff;padding:1rem;margin-top:1rem;margin-bottom:15px}#remarks:before{content:"\\8BC4\\8BBA";position:absolute;left:50%;margin-left:-1em;top:-1em;font-size:.7em;color:#eee;padding:.2em 1em;background:#666;border-radius:1em}#remarks .remark{border-bottom:1px solid #ddd}#remarks .remark:last-child{border-bottom:0}#remarks .remark>*{margin:1em 0}',""])},,,,,,,,,,function(e,t,o){var n=o(43);"string"==typeof n&&(n=[[e.i,n,""]]);var r={};r.transform=void 0;o(1)(n,r);n.locals&&(e.exports=n.locals)},,,,,,,,,,,,,function(e,t,o){e.exports=o(30)}]);