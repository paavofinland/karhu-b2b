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

/***/ "./styles/checkout.css":
/*!*****************************!*\
  !*** ./styles/checkout.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://shopify-starter/./styles/checkout.css?");

/***/ }),

/***/ "./scripts/components/checkout/checkout.js":
/*!*************************************************!*\
  !*** ./scripts/components/checkout/checkout.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/get-liquid-variables */ \"./scripts/lib/get-liquid-variables.js\");\n\n\nconst querySelect = (node, queries) => queries.map(q => node.querySelector(q));\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(node => {\n  const {\n    skip_payment_discount_code: discountCode,\n    skip_payment_discount_applied: discountApplied,\n  } = (0,_lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_0__.default)();\n\n  const [totalSectionElement] = querySelect(node, ['.order-summary__sections']);\n\n  const replaceTotalWithSubtotal = () => {\n    const [subtotalElement, totalElement] = querySelect(node, [\n      '[data-checkout-subtotal-price-target]',\n      '.total-line [data-checkout-payment-due-target]',\n    ]);\n\n    if (totalElement.innerText !== subtotalElement.innerText)\n      // Check to prevent infinite loop in MutationObserver\n      totalElement.innerText = subtotalElement.innerText;\n  };\n\n  replaceTotalWithSubtotal();\n\n  new MutationObserver(mutationList => {\n    mutationList.forEach(mutation => {\n      const { type, addedNodes } = mutation;\n      if (type !== 'childList' || !addedNodes[0]) return;\n\n      const totalMutation =\n        addedNodes[0].nodeType === Node.ELEMENT_NODE\n          ? addedNodes[0].querySelector('[data-checkout-payment-due-target]')\n          : 'checkoutPaymentDueTarget' in addedNodes[0].parentNode.dataset &&\n            addedNodes[0].parentNode;\n\n      if (totalMutation) replaceTotalWithSubtotal();\n    });\n  }).observe(totalSectionElement, {\n    childList: true,\n    subtree: true,\n  });\n\n  if (!discountApplied) {\n    const [discountInput, discountSubmit] = querySelect(node, [\n      '.order-summary__section--discount [name=\"checkout[reduction_code]\"]',\n      '.order-summary__section--discount [name=\"checkout[submit]\"]',\n    ]);\n    discountInput.value = discountCode;\n    discountSubmit.click();\n  }\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/checkout/checkout.js?");

/***/ }),

/***/ "./scripts/components/checkout/components.js":
/*!***************************************************!*\
  !*** ./scripts/components/checkout/components.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _checkout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkout */ \"./scripts/components/checkout/checkout.js\");\n/* harmony import */ var _payment_method__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payment-method */ \"./scripts/components/checkout/payment-method.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  checkout: _checkout__WEBPACK_IMPORTED_MODULE_0__.default,\n  paymentMethod: _payment_method__WEBPACK_IMPORTED_MODULE_1__.default,\n});\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/checkout/components.js?");

/***/ }),

/***/ "./scripts/components/checkout/payment-method.js":
/*!*******************************************************!*\
  !*** ./scripts/components/checkout/payment-method.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/get-liquid-variables */ \"./scripts/lib/get-liquid-variables.js\");\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n/* eslint-disable no-restricted-globals */\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(node => {\n  const { skip_payment_discount_applied: discountApplied } = (0,_lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_0__.default)();\n  const { paymentForm } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_1__.default)(node);\n\n  paymentForm.addEventListener('submit', e => {\n    if (!discountApplied) {\n      e.preventDefault();\n      window.alert('Something went wrong, please reload the page and try again.');\n      location.reload();\n    }\n  });\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/checkout/payment-method.js?");

/***/ }),

/***/ "./scripts/lib/choozy.js":
/*!*******************************!*\
  !*** ./scripts/lib/choozy.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable */\n\n/**\n * @param {Element} container \n * @param {string} prefix \n * @returns {Object.<string, Element | Array<Element>} components\n */\n /* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(container = document.body, prefix) {\n  const elements = [...container.querySelectorAll(!prefix ? '*' : `[class*=\"${prefix}\"]`)];\n  const property = !prefix ? 'dataset' : 'classList';\n  return elements.reduce((res, el) => {\n    [].slice.call(!prefix ? Object.entries(el[property]) : el[property]).forEach(property => {\n      let key;\n      if (prefix && property.slice(0, prefix.length) === prefix)\n        key = property.slice(prefix.length, property.length);\n      else if (!prefix) [key] = property;\n      if (key) {\n        res[key] = res.hasOwnProperty(key)\n          ? res[key].constructor === Array\n            ? res[key].concat(el)\n            : [res[key], el]\n          : el;\n      }\n    });\n    return res;\n  }, {});\n}\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/choozy.js?");

/***/ }),

/***/ "./scripts/lib/get-liquid-variables.js":
/*!*********************************************!*\
  !*** ./scripts/lib/get-liquid-variables.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return JSON.parse(document.querySelector('script#liquid-variables').innerHTML);\n}\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/get-liquid-variables.js?");

/***/ }),

/***/ "./scripts/util/checkout.js":
/*!**********************************!*\
  !*** ./scripts/util/checkout.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_checkout_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/checkout.css */ \"./styles/checkout.css\");\n/* harmony import */ var _components_checkout_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/checkout/components */ \"./scripts/components/checkout/components.js\");\n\n\n\nwindow.app.add(_components_checkout_components__WEBPACK_IMPORTED_MODULE_1__.default);\nwindow.app.mount();\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/util/checkout.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/util/checkout.js");
/******/ 	
/******/ })()
;