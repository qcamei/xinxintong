!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=122)}({0:function(e,t){function n(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var r=o(i);return[n].concat(i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"})).concat([r]).join("\n")}return[n].join("\n")}function o(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var o=n(t,e);return t[2]?"@media "+t[2]+"{"+o+"}":o}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(o[r]=!0)}for(i=0;i<e.length;i++){var s=e[i];"number"==typeof s[0]&&o[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},1:function(e,t,n){function o(e,t){for(var n=0;n<e.length;n++){var o=e[n],i=h[o.id];if(i){i.refs++;for(var r=0;r<i.parts.length;r++)i.parts[r](o.parts[r]);for(;r<o.parts.length;r++)i.parts.push(u(o.parts[r],t))}else{for(var s=[],r=0;r<o.parts.length;r++)s.push(u(o.parts[r],t));h[o.id]={id:o.id,refs:1,parts:s}}}}function i(e,t){for(var n=[],o={},i=0;i<e.length;i++){var r=e[i],s=t.base?r[0]+t.base:r[0],a=r[1],c=r[2],l=r[3],u={css:a,media:c,sourceMap:l};o[s]?o[s].parts.push(u):n.push(o[s]={id:s,parts:[u]})}return n}function r(e,t){var n=m(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=x[x.length-1];if("top"===e.insertAt)o?o.nextSibling?n.insertBefore(t,o.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),x.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function s(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=x.indexOf(e);t>=0&&x.splice(t,1)}function a(e){var t=document.createElement("style");return e.attrs.type="text/css",l(t,e.attrs),r(e,t),t}function c(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",l(t,e.attrs),r(e,t),t}function l(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function u(e,t){var n,o,i,r;if(t.transform&&e.css){if(!(r=t.transform(e.css)))return function(){};e.css=r}if(t.singleton){var l=b++;n=v||(v=a(t)),o=d.bind(null,n,l,!1),i=d.bind(null,n,l,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=c(t),o=f.bind(null,n,t),i=function(){s(n),n.href&&URL.revokeObjectURL(n.href)}):(n=a(t),o=p.bind(null,n),i=function(){s(n)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else i()}}function d(e,t,n,o){var i=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=w(t,i);else{var r=document.createTextNode(i),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(r,s[t]):e.appendChild(r)}}function p(e,t){var n=t.css,o=t.media;if(o&&e.setAttribute("media",o),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function f(e,t,n){var o=n.css,i=n.sourceMap,r=void 0===t.convertToAbsoluteUrls&&i;(t.convertToAbsoluteUrls||r)&&(o=y(o)),i&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var s=new Blob([o],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}var h={},g=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),m=function(e){var t={};return function(n){return void 0===t[n]&&(t[n]=e.call(this,n)),t[n]}}(function(e){return document.querySelector(e)}),v=null,b=0,x=[],y=n(4);e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");t=t||{},t.attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=g()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=i(e,t);return o(n,t),function(e){for(var r=[],s=0;s<n.length;s++){var a=n[s],c=h[a.id];c.refs--,r.push(c)}if(e){o(i(e,t),t)}for(var s=0;s<r.length;s++){var c=r[s];if(0===c.refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete h[c.id]}}}};var w=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},122:function(e,t,n){e.exports=n(58)},2:function(module,exports,__webpack_require__){"use strict";var ngMod=angular.module("page.ui.xxt",[]);ngMod.directive("dynamicHtml",["$compile",function(e){return{restrict:"EA",replace:!0,link:function(t,n,o){t.$watch(o.dynamicHtml,function(o){o&&o.length&&(n.html(o),e(n.contents())(t))})}}}]),ngMod.service("tmsDynaPage",["$q",function($q){this.loadCss=function(e){var t,n;t=document.createElement("style"),t.innerHTML=e,n=document.querySelector("head"),n.appendChild(t)},this.loadExtCss=function(e){var t,n;t=document.createElement("link"),t.href=e,t.rel="stylesheet",n=document.querySelector("head"),n.appendChild(t)},this.loadJs=function(ngApp,js){!function(ngApp){eval(js)}(ngApp)},this.loadScript=function(e){var t,n,o=$q.defer();return n=function(){var i;i=document.createElement("script"),i.src=e[t],i.onload=function(){t++,t<e.length?n():o.resolve()},document.body.appendChild(i)},e&&(angular.isString(e)&&(e=[e]),e.length&&(t=0,n())),o.promise},this.loadExtJs=function(e,t){var n,o=this,i=$q.defer(),r=t.ext_js.length;return n=function(n){var s;s=document.createElement("script"),s.src=n.url,s.onload=function(){0===--r&&(t.js&&t.js.length&&o.loadJs(e,t.js),i.resolve())},document.body.appendChild(s)},t.ext_js&&t.ext_js.length&&t.ext_js.forEach(n),i.promise},this.loadCode=function(e,t){var n=this,o=$q.defer();return t.ext_css&&t.ext_css.length&&t.ext_css.forEach(function(e){n.loadExtCss(e.url)}),t.css&&t.css.length&&this.loadCss(t.css),t.ext_js&&t.ext_js.length?n.loadExtJs(e,t).then(function(){o.resolve()}):(t.js&&t.js.length&&n.loadJs(e,t.js),o.resolve()),o.promise},this.openPlugin=function(e){var t,n,o,i,r,s;return s=$q.defer(),e||(console.log("参数为空"),s.reject()),document.documentElement.clientWidth>768?document.documentElement.scrollTop=0:document.body.scrollTop=0,r=document.getElementsByTagName("body")[0],i=document.getElementsByTagName("html")[0],i.style.cssText="height:100%;",r.style.cssText="height:100%;overflow-y:hidden",t=document.createDocumentFragment(),n=document.createElement("div"),n.setAttribute("id","frmPlugin"),o=document.createElement("iframe"),n.appendChild(o),n.onclick=function(){n.parentNode.removeChild(n),r.style.cssText="overflow-y:auto"},t.appendChild(n),document.body.appendChild(t),0===e.indexOf("http")?(window.onClosePlugin=function(e){n.parentNode.removeChild(n),r.style.cssText="overflow-y:auto",s.resolve(e)},o.setAttribute("src",e)):o.contentDocument&&o.contentDocument.body&&(o.contentDocument.body.innerHTML=e),s.promise}}])},23:function(e,t,n){"use strict";angular.module("modal.ui.xxt",[]).service("tmsModal",["$rootScope","$compile","$q","$controller",function(e,t,n,o){this.open=function(i){var r,s=n.defer(),a=n.defer(),c={result:s.promise,closed:a.promise,close:function(e){document.body.removeChild(p[0]),s.resolve(e)},dismiss:function(e){document.body.removeChild(p[0]),a.resolve(e)}};r=e.$new(!0),i.controller&&o(i.controller,{$scope:r,$tmsModalInstance:c});var l,u,d,p;return l=angular.element("<div></div>"),l.attr({class:"modal-content","ng-style":"{'z-index':1060}"}).append(i.template),u=angular.element("<div></div>"),u.attr({class:"modal-dialog"}).append(l),d=angular.element("<div></div>"),d.attr({class:"modal-backdrop","ng-style":"{'z-index':1040}"}),p=angular.element("<div></div>"),p.attr({class:"modal","ng-style":"{'z-index':1050}",tabindex:-1}).append(u).append(d),t(p)(r),document.body.appendChild(p[0]),c}}])},24:function(e,t,n){var o=n(28);"string"==typeof o&&(o=[[e.i,o,""]]);var i={};i.transform=void 0;n(1)(o,i);o.locals&&(e.exports=o.locals)},27:function(e,t,n){"use strict";n(24),n(2),n(23),angular.module("favor.ui.xxt",["page.ui.xxt","modal.ui.xxt"]).service("tmsFavor",["$rootScope","$http","$q","tmsDynaPage","tmsModal",function(e,t,n,o,i){function r(e){var o,i;return i=n.defer(),o="/rest/site/fe/user/favor/byUser",o+="?site="+e.siteid,o+="&id="+e.id,o+="&type="+e.type,t.get(o).success(function(e){i.resolve(e.data)}),i.promise}function s(e){var o,i;return i=n.defer(),o="/rest/site/fe/user/favor/add",o+="?site="+e.siteid,o+="&id="+e.id,o+="&type="+e.type,t.get(o).success(function(e){i.resolve(e.data)}),i.promise}function a(e){var o,i;return i=n.defer(),o="/rest/site/fe/user/favor/remove",o+="?site="+e.siteid,o+="&id="+e.id,o+="&type="+e.type,t.get(o).success(function(e){i.resolve(e.data)}),i.promise}function c(e){var o,i;return i=n.defer(),o="/rest/pl/fe/site/favor/sitesByUser?site="+e.siteid+"&id="+e.id+"&type="+e.type+"&_="+1*new Date,t.get(o).success(function(e){0==e.err_code&&i.resolve(e.data)}),i.promise}function l(e,o){var i,r;return r=n.defer(),i="/rest/pl/fe/site/favor/add?id="+e.id+"&type="+e.type,t.post(i,o).success(function(e){r.resolve(e.data)}),r.promise}function u(e,o){var i,r;return r=n.defer(),i="/rest/pl/fe/site/favor/remove?id="+e.id+"&type="+e.type,t.post(i,o).success(function(e){r.resolve(e.data)}),r.promise}this.open=function(e){var n;n='<div class="modal-header"><span class="modal-title">指定收藏位置</span></div>',n+='<div class="modal-body">',n+='<div class="checkbox">',n+="<label>",n+="<input type='checkbox' ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model='person._selected'>",n+="<span>个人账户</span>",n+="<span ng-if=\"person._favored==='Y'\">（已收藏）</span>",n+="</label>",n+="</div>",n+='<div class="checkbox" ng-repeat="site in mySites">',n+="<label>",n+="<input type='checkbox' ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model='site._selected'>",n+="<span>{{site.name}}</span>",n+="<span ng-if=\"site._favored==='Y'\">（已收藏）</span>",n+="</label>",n+="</div>",n+='<div ng-if="mySites.length===0"><a href="" ng-click="createSite()">创建</a>团队进行收藏，方便团队内共享信息</div>',n+="</div>",n+='<div class="modal-footer"><button class="btn btn-default" ng-click="cancel()">关闭</button><button class="btn btn-success" ng-click="ok()">确定</button></div>',i.open({template:n,controller:["$scope","$tmsModalInstance",function(n,o){r(e).then(function(e){n.person={_favored:e?"Y":"N"},n.person._selected=n.person._favored}),c(e).then(function(e){var t=e;t.forEach(function(e){e._selected=e._favored}),n.mySites=t}),n.createSite=function(){t.get("/rest/pl/fe/site/create").success(function(e){var t=e.data;t._favored=t._selected="N",n.mySites=[t]})},n.ok=function(){var e;e={person:n.person,mySites:n.mySites},o.close(e)},n.cancel=function(){o.dismiss()}}]}).result.then(function(t){var n,o;if(n=t.person,n&&n._selected!==n._favored&&("Y"===n._selected?s(e):a(e)),o=t.mySites){var i=[],r=[];o.forEach(function(e){e._selected!==e._favored&&("Y"===e._selected?i.push(e.id):r.push(e.id))}),i.length&&l(e,i),r.length&&u(e,r)}})},this.showSwitch=function(t,n){var i,r=this;i=document.createElement("div"),i.classList.add("tms-switch","tms-switch-favor"),i.addEventListener("click",function(i){i.preventDefault(),i.stopPropagation(),e.$apply(function(){t.loginExpire?r.open(n):o.openPlugin(location.protocol+"//"+location.host+"/rest/site/fe/user/access?site=platform#login").then(function(e){t.loginExpire=e.loginExpire,r.open(n)})})},!0),document.body.appendChild(i)}}])},28:function(e,t,n){t=e.exports=n(0)(void 0),t.push([e.i,".modal{display:block;overflow:hidden;outline:0;overflow-x:hidden;overflow-y:auto;opacity:1}.modal,.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0}.modal-backdrop{background-color:#000;opacity:.5}.modal-dialog{z-index:1055;margin:0;position:relative;width:auto;margin:10px}.modal-content{position:relative;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #999;border:1px solid rgba(0,0,0,.2);border-radius:6px;outline:0;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5)}.modal-header{padding:15px;border-bottom:1px solid #e5e5e5}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.42857143}.modal-body{position:relative;padding:15px}.modal-footer{padding:15px;text-align:right;border-top:1px solid #e5e5e5}button.close{-webkit-appearance:none;padding:0;cursor:pointer;background:0 0;border:0}.close{float:right;font-size:21px;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.2}@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,.5);box-shadow:0 5px 15px rgba(0,0,0,.5)}}",""])},3:function(e,t,n){"use strict";var o=angular.module("http.ui.xxt",[]);o.provider("tmsLocation",function(){var e;this.config=function(t){e=t||location.pathname},this.$get=["$location",function(t){return e||(e=location.pathname),{s:function(){return t.search()},j:function(n){var o=e,i=[];n&&n.length&&(o+="/"+n);for(var r=1,s=arguments.length;r<s;r++)i.push(arguments[r]+"="+(t.search()[arguments[r]]||""));return i.length&&(o+="?"+i.join("&")),o}}}]}),o.service("http2",["$rootScope","$http","$timeout","$q","$sce","$compile",function(e,t,n,o,i,r){function s(t,n,o){var s;return i.trustAsHtml(t),s=angular.element("<div></div>"),s.attr({class:"tms-notice-box alert alert-"+(n||"info"),"ng-style":"{'z-index':1099}"}).html(t),o||s[0].addEventListener("click",function(){document.body.removeChild(s[0])},!0),r(s)(e),document.body.appendChild(s[0]),s[0]}function a(e){e&&document.body.removeChild(e)}function c(e){return!(!e.page||!angular.isObject(e.page))&&(void 0===e.page.at&&(e.page.at=1),void 0===e.page.size&&(e.page.size=12),void 0!==e.page.j&&angular.isFunction(e.page.j)||(e.page.j=function(){return"page="+this.at+"&size="+this.size}),!0)}function l(e,t,n){if(e){if(angular.isArray(e)){e.length>t.length&&e.splice(t.length-1,e.length-t.length);for(var o=0,i=t.length;o<i;o++)o<e.length?l(e[o],t[o]):e.push(t[o])}else if(angular.isObject(e)){for(var r in e)n&&-1!==n.indexOf(r)||(void 0===t[r]?delete e[r]:angular.isObject(t[r])&&angular.isObject(e[r])?l(e[r],t[r]):e[r]=t[r]);for(var r in t)n&&-1!==n.indexOf(r)||void 0===e[r]&&(e[r]=t[r])}}else e=t;return!0}this.get=function(e,i){var r,l,u=o.defer();return i=angular.extend({headers:{accept:"application/json"},parseResponse:!0,autoBreak:!0,autoNotice:!0,showProgress:!0,showProgressDelay:500,showProgressText:"正在获取数据..."},i),!0===i.showProgress&&(l=n(function(){l=null,r=s(i.showProgressText,"info")},i.showProgressDelay)),c(i)&&(e+=(-1===e.indexOf("?")?"?":"&")+i.page.j()),t.get(e,i).success(function(e){if(i.page&&void 0!==e.data.total&&(i.page.total=e.data.total),!0===i.showProgress&&(l&&n.cancel(l),r&&(a(r),r=null)),i.parseResponse)if(angular.isString(e)){if(i.autoNotice&&s(e,"warning"),i.autoBreak)return;u.reject(e)}else if(0!=e.err_code){if(i.autoNotice){var t;t=angular.isString(e.err_msg)?e.err_msg:angular.isArray(e.err_msg)?e.err_msg.join("<br>"):JSON.stringify(e.err_msg),s(t,"warning")}if(i.autoBreak)return;u.reject(e)}else u.resolve(e);else u.resolve(e)}).error(function(e,t){!0===i.showProgress&&(l&&n.cancel(l),r&&(a(r),r=null)),s(null===e?"网络不可用":e,"danger")}),u.promise},this.post=function(e,i,r){var l,u,d=o.defer();return r=angular.extend({headers:{accept:"application/json"},parseResponse:!0,autoBreak:!0,autoNotice:!0,showProgress:!0,showProgressDelay:500,showProgressText:"正在获取数据..."},r),!0===r.showProgress&&(u=n(function(){u=null,l=s(r.showProgressText,"info")},r.showProgressDelay)),c(r)&&(e+=(-1===e.indexOf("?")?"?":"&")+r.page.j()),t.post(e,i,r).success(function(e){if(r.page&&void 0!==e.data.total&&(r.page.total=e.data.total),!0===r.showProgress&&(u&&n.cancel(u),l&&(a(l),l=null)),r.parseResponse)if(angular.isString(e)){if(r.autoNotice&&(s(e,"warning"),l=null),r.autoBreak)return;d.reject(e)}else if(0!=e.err_code){if(r.autoNotice){var t;t=angular.isString(e.err_msg)?e.err_msg:angular.isArray(e.err_msg)?e.err_msg.join("<br>"):JSON.stringify(e.err_msg),s(t,"warning")}if(r.autoBreak)return;d.reject(e)}else d.resolve(e);else d.resolve(e)}).error(function(e,t){!0===r.showProgress&&(u&&n.cancel(u),l&&(a(l),l=null)),s(null===e?"网络不可用":e,"danger")}),d.promise},this.merge=function(e,t,n){return!angular.equals(e,t)&&l(e,t,n)}}])},37:function(e,t,n){"use strict";n(24),n(2),n(23),angular.module("forward.ui.xxt",["page.ui.xxt","modal.ui.xxt"]).service("tmsForward",["$rootScope","$http","$q","tmsDynaPage","tmsModal",function(e,t,n,o,i){function r(e){var o,i;return i=n.defer(),o="/rest/pl/fe/site/forward/sitesByUser?site="+e.siteid+"&id="+e.id+"&type="+e.type+"&_="+1*new Date,t.get(o).success(function(e){0==e.err_code&&i.resolve(e.data)}),i.promise}this.open=function(e){var t;t='<div class="modal-header"><span class="modal-title">转发到哪个团队和频道</span></div>',t+='<div class="modal-body">',t+='<div ng-repeat="site in mySites">',t+="<span>{{site.name}}</span>",t+='<div class="checkbox" ng-repeat="chn in site.homeChannels">',t+="<label>",t+="<input type='checkbox' ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model='chn._selected' ng-change=\"choose(site,chn)\">",t+="<span>{{chn.title}}</span>",t+="</label>",t+="</div>",t+='<div ng-if="site.homeChannels.length===0"><a href="" ng-click="createChannel(site)">创建</a>团队主页频道，转发内容到团队主页</div>',t+="</div>",t+='<div ng-if="mySites.length===0"><a href="" ng-click="createSite()">创建</a>团队，转发内容到团队主页</div>',t+="</div>",t+='<div class="modal-footer"><button class="btn btn-default" ng-click="cancel()">关闭</button><button class="btn btn-success" ng-click="ok()">确定</button></div>',i.open({template:t,controller:["$http","$scope","$tmsModalInstance",function(t,n,o){var i=[];r(e).then(function(e){var t=e;t.forEach(function(e){e._selected=e._recommended}),n.mySites=t}),n.createChannel=function(e){t.post("/rest/pl/fe/matter/channel/create?site="+e.id,{}).success(function(n){var o=n.data;t.post("/rest/pl/fe/site/setting/page/addHomeChannel?site="+e.id,o).success(function(t){e.homeChannels.push(t.data)})})},n.createSite=function(){t.get("/rest/pl/fe/site/create").success(function(e){var t=e.data;t._selected="N",t.homeChannels=[],n.mySites=[t]})},n.choose=function(e,t){"Y"===t._selected?(t.siteid=e.id,i.push(t)):i.splice(i.indexOf(t),1)},n.ok=function(){var n=[];i.length&&(i.forEach(function(e){n.push({siteid:e.siteid,channelId:e.channel_id})}),t.post("/rest/pl/fe/site/forward/push?id="+e.id+"&type="+e.type,n).success(function(){o.close()}))},n.cancel=function(){o.dismiss()}}]})},this.showSwitch=function(t,n){var i,r=this;i=document.createElement("div"),i.classList.add("tms-switch","tms-switch-forward"),i.addEventListener("click",function(i){i.preventDefault(),i.stopPropagation(),e.$apply(function(){t.loginExpire?r.open(n):o.openPlugin(location.protocol+"//"+location.host+"/rest/site/fe/user/access?site=platform#login").then(function(e){t.loginExpire=e.loginExpire,r.open(n)})})},!0),document.body.appendChild(i)}}])},38:function(e,t,n){"use strict";n(24),n(23),angular.module("subscribe.ui.xxt",["modal.ui.xxt"]).service("tmsSubscribe",["$http","tmsModal",function(e,t){this.open=function(n,o){var i;i='<div class="modal-header"><span class="modal-title">关注团队，接收该团队发布的内容</span></div>',i+='<div class="modal-body">',i+='<div class="checkbox">',i+="<label>",i+="<input type='checkbox' ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model='atSite._selected'>",i+="<span>个人账户</span>",i+="<span ng-if=\"atSite._subscribed==='Y'\">（已关注）</span>",i+="</label>",i+="</div>",i+='<div class="checkbox" ng-repeat="site in mySites">',i+="<label>",i+="<input type='checkbox' ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model='site._selected'>",i+="<span>{{site.name}}</span>",i+="<span ng-if=\"site._subscribed==='Y'\">（已关注）</span>",i+="</label>",i+="</div>",i+='<div ng-if="mySites.length===0"><a href="" ng-click="createSite()">创建</a>团队进行关注，方便团队内共享信息</div>',i+="</div>",i+='<div class="modal-footer"><button class="btn btn-default" ng-click="cancel()">关闭</button><button class="btn btn-success" ng-click="ok()">确定</button></div>',t.open({template:i,controller:["$scope","$tmsModalInstance",function(t,n){e.get("/rest/site/home/get?site="+o.id+"&_="+1*new Date).success(function(e){var n=e.data;n._selected=n._subscribed,t.atSite=n}),e.get("/rest/pl/fe/site/subscribe/sitesByUser?site="+o.id+"&_="+1*new Date).success(function(e){if(0==e.err_code){var n=e.data;n.forEach(function(e){e._selected=e._subscribed}),t.mySites=n}}),t.createSite=function(){e.get("/rest/pl/fe/site/create").success(function(e){var n=e.data;n._subscribed=n._selected="N",t.mySites=[n]})},t.ok=function(){var e;e={atSite:t.atSite,mySites:t.mySites},n.close(e)},t.cancel=function(){n.dismiss()}}]}).result.then(function(t){var n,i,r;if(i=t.atSite,i&&i._selected!==i._subscribed&&(n="Y"===i._selected?"/rest/site/fe/user/site/subscribe?site="+o.id+"&target="+i.id:"/rest/site/fe/user/site/unsubscribe?site="+o.id+"&target="+i.id,e.get(n)),r=t.mySites){var s=[],a=[];if(r.forEach(function(e){e._selected!==e._subscribed&&("Y"===e._selected?s.push(e.id):a.push(e.id))}),s.length){var n="/rest/pl/fe/site/subscribe/do?site="+o.id;n+="&subscriber="+s.join(","),e.get(n)}}})}}])},4:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,o=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(i))return e;var r;return r=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:o+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")"})}},58:function(e,t,n){"use strict";n(3),n(2),n(38),n(27),n(37);var o=angular.module("app",["ngSanitize","ui.bootstrap","ui.tms","http.ui.xxt","page.ui.xxt","subscribe.ui.xxt","favor.ui.xxt","forward.ui.xxt"]);o.config(["$locationProvider","$controllerProvider","$uibTooltipProvider",function(e,t,n){e.html5Mode(!0),o.provider={controller:t.register},n.setTriggers({show:"hide"})}]),o.provider("srvUser",function(){var e;this.$get=["$q","http2",function(t,n){return{getSiteUser:function(o){return e?e.promise:(e=t.defer(),n.get("/rest/site/fe/user/get?site="+o).then(function(t){e.resolve(t.data)}),e.promise)}}}]}),o.directive("autoHeight",["$window",function(e){return{restrict:"A",scope:{},link:function(t,n,o){var i=e.innerHeight;n.css("min-height",i-52-50+"px")}}}]),o.directive("imageonload",function(){return{restrict:"A",link:function(e,t,n){t.bind("load",function(){e.$apply(n.imageonload)})}}}),o.controller("ctrlMain",["$scope","$timeout","$q","$uibModal","http2","srvUser","tmsDynaPage","tmsSubscribe","tmsFavor","tmsForward",function(e,t,n,i,r,s,a,c,l,u){function d(){var e=n.defer(),t="/rest/pl/fe/site/create?_="+1*new Date;return r.get(t).then(function(t){e.resolve(t.data)}),e.promise}function p(e,t){var n="/rest/pl/fe/template/purchase?template="+t.id;n+="&site="+e.id,r.get(n).then(function(n){r.get("/rest/pl/fe/matter/enroll/createByOther?site="+e.id+"&template="+t.id).then(function(t){location.href="/rest/pl/fe/matter/enroll?id="+t.data.id+"&site="+e.id})})}var f,h,g={},m=!1,v=!1;e.subView="",$("body").click(function(){m&&($("#popoverUseTempateAsAdmin").trigger("hide"),m=!1),v&&($("#popoverFavorTempateAsAdmin").trigger("hide"),v=!1)}),e.favorTemplate=function(e){if(h.loginExpire){var t="/rest/pl/fe/template/siteCanFavor?template="+e.id+"&_="+1*new Date;r.get(t).then(function(t){var n=t.data;i.open({templateUrl:"favorTemplateSite.html",dropback:"static",controller:["$scope","$uibModalInstance",function(e,t){e.mySites=n,e.ok=function(){var e=[];n.forEach(function(t){"Y"===t._selected&&e.push(t)}),e.length?t.close(e):t.dismiss()},e.cancel=function(){t.dismiss()}}]}).result.then(function(t){var n="/rest/pl/fe/template/favor?template="+e.id,o=[];t.forEach(function(e){o.push(e.id)}),n+="&site="+o.join(","),r.get(n).then(function(e){})})})}},e.useTemplate=function(e){if(h.loginExpire){var t="/rest/pl/fe/site/list?_="+1*new Date;r.get(t).then(function(t){var n=t.data;1===n.length?p(n[0],e):0===n.length?d().then(function(t){p(t,e)}):i.open({templateUrl:"useTemplateSite.html",dropback:"static",controller:["$scope","$uibModalInstance",function(e,t){var o;e.mySites=n,e.data=o={},e.ok=function(){void 0!==o.index?t.close(n[o.index]):t.dismiss()},e.cancel=function(){t.dismiss()}}]}).result.then(function(t){p(t,e)})})}},e.subscribeSite=function(){if(e.user.loginExpire)c.open(h,e.site);else{if(window.sessionStorage){var t=JSON.stringify({name:"subscribeSite"});window.sessionStorage.setItem("xxt.home.auth.pending",t)}location.href="/rest/site/fe/user/login?site="+siteId}},e.shiftPage=function(t){e.subView!==t&&(void 0===g[t]?a.loadCode(o,f[t+"_page"]).then(function(){g[t]=f[t+"_page"],e.page=g[t]||{html:"<div></div>"},e.subView=t,history.replaceState({},"","/rest/home/"+t)}):(e.page=g[t]||{html:"<div></div>"},e.subView=t,history.replaceState({},"","/rest/home/"+t)))},e.openSite=function(e){location.href="/rest/site/home?site="+e.siteid},e.openTemplate=function(e){location.href="/rest/site/fe/matter/template?template="+e.id},r.get("/rest/home/get").then(function(t){f=t.data.platform,!1===f.home_page?location.href="/rest/pl/fe":(e.platform=f,/\/site/.test(location.href)?e.shiftPage("site"):/\/template/.test(location.href)?e.shiftPage("template"):e.shiftPage("home")),s.getSiteUser("platform").then(function(t){if(e.user=h=t,window.sessionStorage){var n;(n=window.sessionStorage.getItem("xxt.home.auth.pending"))&&(window.sessionStorage.removeItem("xxt.home.auth.pending"),user.isLogin&&(n=JSON.parse(n),e[n.name].apply(e,n.args||[])))}})})}]),e.exports=o}});