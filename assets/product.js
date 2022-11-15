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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _product_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product-form */ \"./scripts/components/product/product-form.js\");\n/* harmony import */ var _product_images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product-images */ \"./scripts/components/product/product-images.js\");\n/* harmony import */ var _product_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-colors */ \"./scripts/components/product/product-colors.js\");\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  productForm: _product_form__WEBPACK_IMPORTED_MODULE_0__.default,\n  productImages: _product_images__WEBPACK_IMPORTED_MODULE_1__.default,\n  productColors: _product_colors__WEBPACK_IMPORTED_MODULE_2__.default,\n});\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/product/components.js?");

/***/ }),

/***/ "./scripts/components/product/product-colors.js":
/*!******************************************************!*\
  !*** ./scripts/components/product/product-colors.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_waitToLoad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/waitToLoad */ \"./scripts/lib/waitToLoad.js\");\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(async node => {\n  const { slider, slide, prev, next } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_1__.default)(node);\n\n  const slides = [].concat(slide).length;\n  await (0,_lib_waitToLoad__WEBPACK_IMPORTED_MODULE_0__.default)('Swiper');\n\n  const desktopSlidesPerView = 4;\n\n  if (slides > 3) {\n    /** @type {import('swiper').SwiperOptions} */\n    const swiperConfig = {\n      slidesPerView: 3.5,\n      spaceBetween: 4,\n\n      on: {\n        beforeInit(s) {\n          s.$el.removeClass('is-loading');\n        },\n        navigationNext(s) {\n          // Slide to last\n          if ((s.slides.length - 1) / 2 <= desktopSlidesPerView) s.slideTo(s.slides.length - 1);\n        },\n        navigationPrev(s) {\n          // Slide to first\n          if ((s.slides.length - 1) / 2 <= desktopSlidesPerView) s.slideTo(0);\n        },\n      },\n      breakpoints: {\n        768: {\n          slidesPerView: 5.5,\n        },\n        1024: {\n          slidesPerView: desktopSlidesPerView,\n          navigation: {\n            nextEl: next,\n            prevEl: prev,\n          },\n        },\n      },\n    };\n\n    // eslint-disable-next-line no-undef, no-new\n    const a = new Swiper(slider, swiperConfig);\n  }\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/product/product-colors.js?");

/***/ }),

/***/ "./scripts/components/product/product-form.js":
/*!****************************************************!*\
  !*** ./scripts/components/product/product-form.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n/* harmony import */ var _lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/get-liquid-variables */ \"./scripts/lib/get-liquid-variables.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component((node, ctx) => {\n  const {\n    size,\n    sizeButton,\n    quantityInputs: quantityInput,\n    addToCartButton,\n    error: errorElement,\n  } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node);\n\n  const {\n    translations: { server_error: serverErrorMessage, select_sizes_error: selectSizesErrorMessage },\n  } = (0,_lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_1__.default)();\n\n  const sizeLabels = [].concat(size).filter(Boolean);\n  const sizeButtons = [].concat(sizeButton).filter(Boolean);\n  const quantityInputs = [].concat(quantityInput).filter(Boolean);\n\n  const { state } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(addToCartButton);\n  const buttonStates = [].concat(state);\n\n  console.log(serverErrorMessage);\n\n  const toggleButtonAnimations = (enable = true) => {\n    buttonStates.forEach(s => {\n      // eslint-disable-next-line no-param-reassign\n      s.style.transition = enable ? '' : 'unset';\n    });\n  };\n\n  const setError = (error = '') => {\n    errorElement.innerHTML = error;\n  };\n\n  let resetAddTocartButtonTimeout;\n\n  node.addEventListener('submit', async e => {\n    e.preventDefault();\n\n    setError();\n    toggleButtonAnimations();\n\n    if (resetAddTocartButtonTimeout) clearTimeout(resetAddTocartButtonTimeout);\n\n    addToCartButton.classList.add('is-loading');\n    addToCartButton.classList.remove('is-active');\n    addToCartButton.disabled = true;\n\n    const formData = new FormData(e.target);\n    const quantities = Array.from(formData.entries())\n      .filter(([key]) => key.endsWith('[quantity]'))\n      .map(([, value]) => Number(value));\n\n    // const validateQuantity =\n\n    try {\n      if (quantities.filter(q => q > 0).length === 0) {\n        throw Error(selectSizesErrorMessage);\n      }\n\n      const response = await fetch(`${window.Shopify.routes.root}cart/add.js`, {\n        method: 'POST',\n        body: formData,\n      });\n\n      const json = await response.json();\n\n      if (response.status !== 200 && json.description) {\n        throw Error(json.description);\n      } else if (response.status !== 200) {\n        throw Error(serverErrorMessage);\n      }\n\n      addToCartButton.classList.remove('is-loading');\n      addToCartButton.disabled = false;\n\n      ctx.emit('cart:update', null, {\n        countAdd: quantities.reduce((acc, quantity) => acc + quantity, 0),\n      });\n      addToCartButton.classList.add('is-active');\n\n      resetAddTocartButtonTimeout = setTimeout(() => {\n        toggleButtonAnimations(false);\n        addToCartButton.classList.remove('is-active');\n      }, 2000);\n    } catch (error) {\n      setError(error.message);\n    }\n\n    addToCartButton.classList.remove('is-loading');\n    addToCartButton.disabled = false;\n  });\n\n  quantityInputs.forEach(input => {\n    input.addEventListener('keypress', e => {\n      setError();\n      if (e.target.value === '0') {\n        e.target.value = e.target.value.slice(1);\n      }\n    });\n  });\n\n  sizeButtons.forEach(button =>\n    button.addEventListener('click', e => {\n      const sizeLabel = e.target.textContent.trim().toLowerCase();\n\n      sizeLabels.forEach(label => {\n        // eslint-disable-next-line no-param-reassign\n        label.innerText = label.dataset[sizeLabel];\n      });\n\n      sizeButtons.forEach(({ classList }) => classList.remove('is-active'));\n      button.classList.add('is-active');\n    })\n  );\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/product/product-form.js?");

/***/ }),

/***/ "./scripts/components/product/product-images.js":
/*!******************************************************!*\
  !*** ./scripts/components/product/product-images.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n/* harmony import */ var _lib_waitToLoad__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/waitToLoad */ \"./scripts/lib/waitToLoad.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(async node => {\n  const { slider, thumbnailSlider, prev, next } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node);\n  const { slides } = node.dataset;\n\n  if (!slider) return;\n\n  await (0,_lib_waitToLoad__WEBPACK_IMPORTED_MODULE_1__.default)('Swiper');\n\n  /** @type {import('swiper').SwiperOptions} */\n  const subSwiperOptions = {\n    slidesPerView: 3.25,\n    watchSlidesProgress: true,\n    breakpoints: {\n      1024: {\n        slidesPerView: Math.max(Math.min(Number(slides), 9.5), 5),\n      },\n    },\n    on: {\n      beforeInit(s) {\n        s.$el.removeClass('is-loading');\n      },\n    },\n  };\n\n  // eslint-disable-next-line no-undef\n  const subSwiper = new Swiper(thumbnailSlider, subSwiperOptions);\n\n  /** @type {import('swiper').SwiperOptions} */\n  const swiperOptions = {\n    resizeObserver: true,\n    thumbs: {\n      swiper: subSwiper,\n      multipleActiveThumbs: false,\n      slideThumbActiveClass: 'is-active',\n    },\n    navigation: {\n      nextEl: next,\n      prevEl: prev,\n    },\n    on: {\n      beforeInit(s) {\n        s.$el.removeClass('is-loading');\n      },\n    },\n  };\n\n  // eslint-disable-next-line no-undef, no-new\n  new Swiper(slider, swiperOptions);\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/product/product-images.js?");

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