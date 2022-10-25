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

/***/ "./scripts/components/product/components.js":
/*!**************************************************!*\
  !*** ./scripts/components/product/components.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _product_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product-data */ \"./scripts/components/product/product-data.js\");\n/* harmony import */ var _product_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product-form */ \"./scripts/components/product/product-form.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  productData: _product_data__WEBPACK_IMPORTED_MODULE_0__.default,\n  productForm: _product_form__WEBPACK_IMPORTED_MODULE_1__.default,\n});\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/product/components.js?");

/***/ }),

/***/ "./scripts/components/product/product-data.js":
/*!****************************************************!*\
  !*** ./scripts/components/product/product-data.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_waitToLoad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/waitToLoad */ \"./scripts/lib/waitToLoad.js\");\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(async node => {\n  const {\n    mainImageSlider,\n    subImageSlider,\n    colorSlider,\n    colorSlide,\n    mainSlide,\n    prev,\n    next,\n    colorPrev,\n    colorNext,\n  } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_1__.default)(node, null);\n\n  await (0,_lib_waitToLoad__WEBPACK_IMPORTED_MODULE_0__.default)('Swiper');\n\n  if (mainSlide.length > 1) {\n    /** @type {import('swiper').SwiperOptions} */\n    const subSwiperOptions = {\n      slidesPerView: 'auto',\n      freeMode: true,\n      watchSlidesProgress: true,\n      breakpoints: {\n        1024: {\n          slidesPerView: 6,\n        },\n      },\n    };\n\n    // eslint-disable-next-line no-undef\n    const subSwiper = new Swiper(subImageSlider, subSwiperOptions);\n    // eslint-disable-next-line no-undef\n    const swiper = new Swiper(mainImageSlider, {\n      thumbs: {\n        swiper: subSwiper,\n      },\n    });\n\n    prev.addEventListener('click', () => swiper.slidePrev());\n    next.addEventListener('click', () => swiper.slideNext());\n  }\n\n  if (colorSlide.length > 4) {\n    // eslint-disable-next-line no-undef, no-unused-vars\n    const colorSwiper = new Swiper(colorSlider, {\n      slidesPerView: 'auto',\n      spaceBetween: 0,\n      simulateTouch: false,\n    });\n\n    colorPrev.addEventListener('click', () => {\n      colorSwiper.slidePrev();\n      if (colorSwiper.activeIndex === 0) {\n        colorPrev.classList.add('hidden');\n      }\n      colorNext.classList.remove('hidden');\n    });\n    colorNext.addEventListener('click', () => {\n      colorSwiper.slideNext();\n      if (colorSlide.length - colorSwiper.activeIndex === 4) {\n        colorNext.classList.add('hidden');\n      }\n      colorPrev.classList.remove('hidden');\n    });\n  }\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/product/product-data.js?");

/***/ }),

/***/ "./scripts/components/product/product-form.js":
/*!****************************************************!*\
  !*** ./scripts/components/product/product-form.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/cart */ \"./scripts/lib/cart.js\");\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n/* harmony import */ var _lib_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/string */ \"./scripts/lib/string.js\");\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component((node, ctx) => {\n  const { submit } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_1__.default)(node, null);\n\n  let currentVariant = {};\n\n  ctx.on('variant:change', (state, variant) => {\n    currentVariant = variant;\n    submit.textContent = (0,_lib_string__WEBPACK_IMPORTED_MODULE_2__.getString)(variant.available ? 'product.add_to_cart' : 'product.sold_out');\n    submit.disabled = !variant.available;\n  });\n\n  node.addEventListener('submit', e => {\n    e.preventDefault();\n\n    submit.disabled = true;\n    submit.textContent = (0,_lib_string__WEBPACK_IMPORTED_MODULE_2__.getString)('product.adding_to_cart');\n\n    (0,_lib_cart__WEBPACK_IMPORTED_MODULE_0__.addVariant)(currentVariant, node.elements.quantity.value).then(({ error }) => {\n      // eslint-disable-next-line no-alert\n      if (error) alert(error);\n\n      submit.disabled = true;\n      submit.textContent = (0,_lib_string__WEBPACK_IMPORTED_MODULE_2__.getString)('product.added_to_cart');\n\n      setTimeout(() => {\n        if (!error) ctx.emit('cart:toggle', { cartOpen: true });\n      }, 0);\n\n      setTimeout(\n        () => {\n          submit.disabled = false;\n          submit.textContent = (0,_lib_string__WEBPACK_IMPORTED_MODULE_2__.getString)('product.add_to_cart');\n        },\n        error ? 0 : 1000\n      );\n    });\n  });\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/product/product-form.js?");

/***/ }),

/***/ "./scripts/lib/cart.js":
/*!*****************************!*\
  !*** ./scripts/lib/cart.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchCart\": () => (/* binding */ fetchCart),\n/* harmony export */   \"fetchCartMarkup\": () => (/* binding */ fetchCartMarkup),\n/* harmony export */   \"clearCart\": () => (/* binding */ clearCart),\n/* harmony export */   \"addItemsById\": () => (/* binding */ addItemsById),\n/* harmony export */   \"addVariant\": () => (/* binding */ addVariant),\n/* harmony export */   \"updateAddon\": () => (/* binding */ updateAddon),\n/* harmony export */   \"removeAddon\": () => (/* binding */ removeAddon)\n/* harmony export */ });\nfunction fetchCart() {\n  return fetch(`${window.Phill.routes.cart}.js`, {\n    method: 'GET',\n    credentials: 'include',\n  }).then(res => res.json());\n}\n\nfunction fetchCartMarkup() {\n  return fetch(`${window.Phill.routes.cart}?sections=cart-drawer`, {\n    method: 'GET',\n    credentials: 'include',\n  }).then(res => res.json());\n}\n\nfunction changeAddon(id, quantity) {\n  window.app.emit('cart:updating');\n\n  return fetch(`${window.Phill.routes.cartChange}.js`, {\n    method: 'POST',\n    credentials: 'include',\n    headers: {\n      'Content-Type': 'application/json',\n    },\n    body: JSON.stringify({ id, quantity, sections: 'cart-drawer' }),\n  })\n    .then(res => res.json())\n    .then(async cart => {\n      window.app.emit(['cart:updated', 'cart:render'], { cart });\n      return cart;\n    });\n}\n\nfunction clearCart() {\n  window.app.emit('cart:updating');\n\n  return fetch(`${window.Phill.routes.cartClear}.js`, {\n    method: 'POST',\n    credentials: 'include',\n    headers: {\n      'Content-Type': 'application/json',\n    },\n    body: JSON.stringify({ sections: 'cart-drawer' }),\n  })\n    .then(r => r.json())\n    .then(cart => {\n      window.app.emit(['cart:updated', 'cart:render'], { cart });\n      return cart;\n    });\n}\n\nfunction addItemsById(items = []) {\n  window.app.emit('cart:updating');\n\n  return fetch(`${window.Phill.routes.cartAdd}.js`, {\n    method: 'POST',\n    credentials: 'include',\n    headers: {\n      'Content-Type': 'application/json',\n    },\n    body: JSON.stringify({ items }),\n  })\n    .then(r => r.json())\n    .then(async item => {\n      if (item.status) {\n        window.app.emit(['cart:updated', 'cart:error'], null, item);\n        return { item, cart: window.app.getState().cart, error: item?.description };\n      }\n\n      const [cart, cartMarkup] = await Promise.all([fetchCart(), fetchCartMarkup()]);\n\n      cart.sections = cartMarkup;\n\n      window.app.emit(['cart:updated', 'cart:render'], { cart });\n\n      return {\n        item,\n        cart,\n      };\n    });\n}\n\nfunction addVariant(variant, quantity, properties = {}) {\n  return addItemsById([{ id: variant.id, quantity, properties }]);\n}\n\nfunction updateAddon(key, quantity) {\n  return changeAddon(key, quantity);\n}\n\nfunction removeAddon(key) {\n  return updateAddon(key, 0);\n}\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/cart.js?");

/***/ }),

/***/ "./scripts/lib/choozy.js":
/*!*******************************!*\
  !*** ./scripts/lib/choozy.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable */\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(container = document.body, prefix = 'js-') {\n  const elements = [...container.querySelectorAll(!prefix ? '*' : `[class*=\"${prefix}\"]`)];\n  const property = !prefix ? 'dataset' : 'classList';\n  return elements.reduce((res, el) => {\n    [].slice.call(!prefix ? Object.entries(el[property]) : el[property]).forEach(property => {\n      let key;\n      if (prefix && property.slice(0, prefix.length) === prefix)\n        key = property.slice(prefix.length, property.length);\n      else if (!prefix) [key] = property;\n      if (key) {\n        res[key] = res.hasOwnProperty(key)\n          ? res[key].constructor === Array\n            ? res[key].concat(el)\n            : [res[key], el]\n          : el;\n      }\n    });\n    return res;\n  }, {});\n}\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/choozy.js?");

/***/ }),

/***/ "./scripts/lib/string.js":
/*!*******************************!*\
  !*** ./scripts/lib/string.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"toCamelCase\": () => (/* binding */ toCamelCase),\n/* harmony export */   \"getCamelCase\": () => (/* binding */ getCamelCase),\n/* harmony export */   \"getString\": () => (/* binding */ getString)\n/* harmony export */ });\nconst toCamelCase = function camalize(str) {\n  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());\n};\n\nconst getCamelCase = obj => {\n  return Object.entries(obj).reduce((o, [key, value]) => {\n    const object = o;\n    object[toCamelCase(key)] = value;\n    return object;\n  }, {});\n};\n\nconst getString = string => {\n  /**\n   * Get string from window.Phill.theme.strings\n   * @param {String} string seperate keys, by . just like in liquid\n   */\n\n  return (\n    string.split('.').reduce((obj, str) => obj?.[str], window?.Phill?.theme?.strings) ||\n    `Missing translation for ${string} in window.Phill`\n  );\n};\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/string.js?");

/***/ }),

/***/ "./scripts/lib/waitToLoad.js":
/*!***********************************!*\
  !*** ./scripts/lib/waitToLoad.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst waitToLoad = scriptName =>\n  new Promise(res => {\n    if (window?.hasLoaded?.scripts?.[scriptName]) res();\n    else window.app.on(`${scriptName}:loaded`, res);\n  });\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (waitToLoad);\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/waitToLoad.js?");

/***/ }),

/***/ "./scripts/util/product.js":
/*!*********************************!*\
  !*** ./scripts/util/product.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_product_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/product/components */ \"./scripts/components/product/components.js\");\n\n\nwindow.app.add(_components_product_components__WEBPACK_IMPORTED_MODULE_0__.default);\nwindow.app.mount();\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/util/product.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/util/product.js");
/******/ 	
/******/ })()
;