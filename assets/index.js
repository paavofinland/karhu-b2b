/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./styles/main.css":
/*!*************************!*\
  !*** ./styles/main.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://shopify-starter/./styles/main.css?");

/***/ }),

/***/ "./node_modules/picoapp/dist/picoapp.es.js":
/*!*************************************************!*\
  !*** ./node_modules/picoapp/dist/picoapp.es.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"component\": () => (/* binding */ u),\n/* harmony export */   \"picoapp\": () => (/* binding */ c)\n/* harmony export */ });\nvar n=function(n){if(\"object\"!=typeof(t=n)||Array.isArray(t))throw\"state should be an object\";var t},t=function(n,t,r,e){return(o=n,o.reduce(function(n,t,r){return n.indexOf(t)>-1?n:n.concat(t)},[])).reduce(function(n,r){return n.concat(t[r]||[])},[]).map(function(n){return n(r,e)});var o};function r(r){void 0===r&&(r={});var e={};return{getState:function(){return Object.assign({},r)},hydrate:function(o){return n(o),Object.assign(r,o),function(){var n=[\"*\"].concat(Object.keys(o));t(n,e,r)}},on:function(n,t){return(n=[].concat(n)).map(function(n){return e[n]=(e[n]||[]).concat(t)}),function(){return n.map(function(n){return e[n].splice(e[n].indexOf(t),1)})}},emit:function(o,u,c){var i=(\"*\"===o?[]:[\"*\"]).concat(o);(u=\"function\"==typeof u?u(r):u)&&(n(u),Object.assign(r,u),i=i.concat(Object.keys(u))),t(i,e,r,c)}}}r();var e=function(n){return\"object\"==typeof n&&!Array.isArray(n)},o=function(n){return\"function\"==typeof n};function u(n){return function(t,r){var e=[];return{subs:e,unmount:n(t,Object.assign({},r,{on:function(n,t){var o=r.on(n,t);return e.push(o),o}})),node:t}}}function c(n,t,u){void 0===n&&(n={}),void 0===t&&(t={}),void 0===u&&(u=[]);var c=r(t),i=[];return{on:c.on,emit:c.emit,getState:function(){return c.getState()},add:function(t){if(!e(t))throw\"components should be an object\";Object.assign(n,t)},use:function(n){if(!o(n))throw\"plugins should be a function\";u.push(n)},hydrate:function(n){return c.hydrate(n)},mount:function(t){void 0===t&&(t=\"data-component\"),t=[].concat(t);for(var r=0;r<t.length;r++){for(var a=t[r],f=[].slice.call(document.querySelectorAll(\"[\"+a+\"]\")),s=function(){for(var t=f.pop(),r=t.getAttribute(a).split(/\\s/),s=0;s<r.length;s++){var v=n[r[s]];if(v){t.removeAttribute(a);try{var d=u.reduce(function(n,r){var o=r(t,c);return e(o)?Object.assign(n,o):n},{}),m=v(t,Object.assign({},d,c));o(m.unmount)&&i.push(m)}catch(n){console.error(n),c.emit(\"error\",{error:n}),c.hydrate({error:void 0})}}}};f.length;)s();c.emit(\"mount\")}},unmount:function(){for(var n=i.length-1;n>-1;n--){var t=i[n],r=t.subs;(0,t.unmount)(t.node),r.map(function(n){return n()}),i.splice(n,1)}c.emit(\"unmount\")}}}\n//# sourceMappingURL=picoapp.es.js.map\n\n\n//# sourceURL=webpack://shopify-starter/./node_modules/picoapp/dist/picoapp.es.js?");

/***/ }),

/***/ "./scripts/async.js":
/*!**************************!*\
  !*** ./scripts/async.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_vendors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/vendors */ \"./scripts/util/vendors.js\");\n\n\nconst asyncLoad = (scriptsToLoad, stylesToLoad) => {\n  const tag = document.getElementsByTagName('script')[0];\n\n  scriptsToLoad.forEach(s => {\n    if (window?.hasLoaded?.scripts[s?.name] || !s.include) return '';\n\n    const script = document.createElement('script');\n\n    script.type = 'text/javascript';\n    script.async = true;\n    script.src = s?.src;\n\n    script.addEventListener('load', e => {\n      if (window.vendors) window.vendors(s.name);\n      if (s.callback) s.callback(e);\n\n      if (window?.hasLoaded?.scripts && s?.name) window.hasLoaded.scripts[s.name] = true;\n    });\n\n    return tag.parentNode.insertBefore(script, tag);\n  });\n\n  stylesToLoad.forEach(s => {\n    if (window?.hasLoaded?.styles[s?.name] || !s.include) return '';\n\n    const script = document.createElement('link');\n\n    script.rel = 'stylesheet';\n    script.href = s?.src;\n\n    tag.parentNode.insertBefore(script, tag);\n\n    tag.addEventListener('load', e => {\n      if (s.callback) s.callback(e);\n      if (window?.hasLoaded?.styles && s?.name) window.hasLoaded.styles[s.name] = true;\n    });\n\n    return s;\n  });\n};\n\nwindow.hasLoaded = {\n  styles: {},\n  scripts: {},\n};\n\nif (window.attachEvent) window.attachEvent('onload', () => asyncLoad(_util_vendors__WEBPACK_IMPORTED_MODULE_0__.scripts, _util_vendors__WEBPACK_IMPORTED_MODULE_0__.styles));\nelse window.addEventListener('load', () => asyncLoad(_util_vendors__WEBPACK_IMPORTED_MODULE_0__.scripts, _util_vendors__WEBPACK_IMPORTED_MODULE_0__.styles), false);\n\nasyncLoad(\n  _util_vendors__WEBPACK_IMPORTED_MODULE_0__.scripts.filter(s => s.important),\n  _util_vendors__WEBPACK_IMPORTED_MODULE_0__.styles.filter(s => s.important)\n);\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/async.js?");

/***/ }),

/***/ "./scripts/index.js":
/*!**************************!*\
  !*** ./scripts/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/main.css */ \"./styles/main.css\");\n/* harmony import */ var _lib_hmr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/hmr */ \"./scripts/lib/hmr.js\");\n/* harmony import */ var _lib_hmr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_hmr__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var picoapp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! picoapp */ \"./node_modules/picoapp/dist/picoapp.es.js\");\n/* harmony import */ var _async__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./async */ \"./scripts/async.js\");\n\n\n\n\n\n\nwindow.app = (0,picoapp__WEBPACK_IMPORTED_MODULE_2__.picoapp)({}, {});\nwindow.component = picoapp__WEBPACK_IMPORTED_MODULE_2__.component;\nwindow.vendors = name => window.app.emit(`${name}:loaded`);\n\n// app.on('mount', () => console.info('♻️ Mounting'));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/index.js?");

/***/ }),

/***/ "./scripts/lib/hmr.js":
/*!****************************!*\
  !*** ./scripts/lib/hmr.js ***!
  \****************************/
/***/ (() => {

eval("if (window.Shopify.theme && window.Shopify.theme.role === 'development') {\n  const eventSource = new EventSource('/hot-reload');\n\n  eventSource.onmessage = () => {\n    setTimeout(() => {\n      window.app.mount();\n    }, 600);\n  };\n}\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/hmr.js?");

/***/ }),

/***/ "./scripts/lib/links.js":
/*!******************************!*\
  !*** ./scripts/lib/links.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getShopifyLink\": () => (/* binding */ getShopifyLink),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst getShopifyLink = (fileName, location = 'asset') => {\n  if (!window?.Phill?.theme?.links) return;\n  const baseLink = window.Phill.theme.links[location];\n\n  // eslint-disable-next-line consistent-return\n  return baseLink.replace('XXX.XXX', fileName);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ getShopifyLink });\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/links.js?");

/***/ }),

/***/ "./scripts/util/vendors.js":
/*!*********************************!*\
  !*** ./scripts/util/vendors.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"scripts\": () => (/* binding */ scripts),\n/* harmony export */   \"styles\": () => (/* binding */ styles)\n/* harmony export */ });\n/* harmony import */ var _lib_links__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/links */ \"./scripts/lib/links.js\");\n\n\n/**\n * Adding a vendor script/stylesheet, being initialised on window.load\n * @type {Object}\n * @param {String} name identify if loaded or not\n * @param {String} src link to to vendor-file\n * @param {Boolean|Element} include if truthy, include on load\n * @param {Boolean} important import before window.load event\n * @param {Function} callback run after load\n */\n\nconst scripts = [\n  {\n    name: `Tag manager`,\n    src: `https://www.googletagmanager.com/gtm.js?id=${window?.Phill?.scripts?.tag_manager}`,\n    include: window?.Phill?.scripts?.tag_manager,\n  },\n  {\n    name: `Google Optimize`,\n    src: `https://www.googleoptimize.com/optimize.js?id=${window?.Phill?.scripts?.google_optimize}`,\n    include: window?.Phill?.scripts?.google_optimize,\n    important: true,\n  },\n  {\n    name: `Swiper`,\n    src: (0,_lib_links__WEBPACK_IMPORTED_MODULE_0__.getShopifyLink)('swiper.min.js'),\n    include: document.querySelector('.swiper-wrapper'),\n  },\n  {\n    name: `Keen slider`,\n    src: (0,_lib_links__WEBPACK_IMPORTED_MODULE_0__.getShopifyLink)('keen-slider.min.js'),\n    include: document.querySelector('.keen-slider'),\n  },\n];\n\nconst styles = [\n  {\n    name: `Swiper`,\n    src: (0,_lib_links__WEBPACK_IMPORTED_MODULE_0__.getShopifyLink)('swiper.min.css'),\n    include: document.querySelector('.swiper-wrapper'),\n  },\n  {\n    name: `Keen slider`,\n    src: (0,_lib_links__WEBPACK_IMPORTED_MODULE_0__.getShopifyLink)('keen-slider.css'),\n    include: document.querySelector('.keen-slider'),\n  },\n];\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/util/vendors.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/index.js");
/******/ 	
/******/ })()
;