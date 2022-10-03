/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/async.js":
/*!**************************!*\
  !*** ./scripts/async.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_vendors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/vendors */ \"./scripts/util/vendors.js\");\n\n\nconst asyncLoad = (scriptsToLoad, stylesToLoad) => {\n  const tag = document.getElementsByTagName('script')[0];\n\n  scriptsToLoad.forEach(s => {\n    if (window?.hasLoaded?.scripts[s?.name] || !s.include) return '';\n\n    const script = document.createElement('script');\n\n    script.type = 'text/javascript';\n    script.async = true;\n    script.src = s?.src;\n\n    script.addEventListener('load', e => {\n      if (window.vendors) window.vendors(s.name);\n      if (s.callback) s.callback(e);\n\n      if (window?.hasLoaded?.scripts && s?.name) window.hasLoaded.scripts[s.name] = true;\n    });\n\n    return tag.parentNode.insertBefore(script, tag);\n  });\n\n  stylesToLoad.forEach(s => {\n    if (window?.hasLoaded?.styles[s?.name] || !s.include) return '';\n\n    const script = document.createElement('link');\n\n    script.rel = 'stylesheet';\n    script.href = s?.src;\n\n    tag.parentNode.insertBefore(script, tag);\n\n    tag.addEventListener('load', e => {\n      if (s.callback) s.callback(e);\n      if (window?.hasLoaded?.styles && s?.name) window.hasLoaded.styles[s.name] = true;\n    });\n\n    return s;\n  });\n};\n\nwindow.hasLoaded = {\n  styles: {},\n  scripts: {},\n};\n\nif (window.attachEvent) window.attachEvent('onload', () => asyncLoad(_util_vendors__WEBPACK_IMPORTED_MODULE_0__.scripts, _util_vendors__WEBPACK_IMPORTED_MODULE_0__.styles));\nelse window.addEventListener('load', () => asyncLoad(_util_vendors__WEBPACK_IMPORTED_MODULE_0__.scripts, _util_vendors__WEBPACK_IMPORTED_MODULE_0__.styles), false);\n\nasyncLoad(\n  _util_vendors__WEBPACK_IMPORTED_MODULE_0__.scripts.filter(s => s.important),\n  _util_vendors__WEBPACK_IMPORTED_MODULE_0__.styles.filter(s => s.important)\n);\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/async.js?");

/***/ }),

/***/ "./scripts/lib/links.js":
/*!******************************!*\
  !*** ./scripts/lib/links.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getShopifyLink\": () => (/* binding */ getShopifyLink),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst getShopifyLink = (fileName, location = 'asset') => {\n  if (!window?.Phill?.theme?.links) return;\n  const baseLink = window.Phill.theme.links[location];\n\n  // eslint-disable-next-line consistent-return\n  return baseLink.replace('XXX.XXX', fileName);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ getShopifyLink });\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/links.js?");

/***/ }),

/***/ "./scripts/util/vendors.js":
/*!*********************************!*\
  !*** ./scripts/util/vendors.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/async.js");
/******/ 	
/******/ })()
;