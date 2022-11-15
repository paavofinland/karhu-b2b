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

/***/ "./scripts/components/collection/collection-filter.js":
/*!************************************************************!*\
  !*** ./scripts/components/collection/collection-filter.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./scripts/components/collection/utils.js\");\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component((node, ctx) => {\n  const { sectionId } = node.dataset;\n\n  const init = () => {\n    const {\n      filtersForm,\n      input: inputElement,\n      clearButton: clearButtonElement,\n      clearAllButton,\n      toggleFiltersButton: toggleFiltersButtonElement,\n    } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_1__.default)(node);\n\n    const inputs = [].concat(inputElement).filter(Boolean);\n    const clearButtons = [].concat(clearButtonElement).filter(Boolean);\n    const toggleFiltersButtons = [].concat(toggleFiltersButtonElement).filter(Boolean);\n\n    const applyFilters = async (reset = false) => {\n      ctx.emit('product:loading', null, { isLoading: true });\n\n      const searchParams = reset ? '' : new URLSearchParams(new FormData(filtersForm)).toString();\n      const collectionHtml = await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.fetchHtml)(\n        `${\n          window.location.origin + window.location.pathname\n        }?section_id=${sectionId}&${searchParams}`\n      );\n\n      window.app.emit(['filter:render'], {\n        html: collectionHtml,\n        uri: searchParams,\n      });\n    };\n\n    if (clearAllButton) clearAllButton.addEventListener('click', () => applyFilters(true));\n    inputs.forEach(input => input.addEventListener('change', () => applyFilters()));\n    clearButtons.forEach(b =>\n      b.addEventListener('click', () => {\n        inputs\n          .filter(({ name }) => name === b.dataset.name)\n          .forEach(input => {\n            // eslint-disable-next-line no-param-reassign\n            input.checked = false;\n          });\n        applyFilters();\n      })\n    );\n\n    toggleFiltersButtons.forEach(b =>\n      b.addEventListener('click', () => ctx.emit('filters:toggle'))\n    );\n  };\n\n  const toggleSidebar = n => {\n    const { sidebar, overlay } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_1__.default)(n);\n    sidebar.classList.toggle('is-active');\n    overlay.classList.toggle('is-active');\n  };\n\n  ctx.on('filter:render', ({ html, uri }) => {\n    ctx.emit('product:update', null, { html });\n    const filtersHtml = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_1__.default)(html).filters;\n    toggleSidebar(filtersHtml);\n    // eslint-disable-next-line no-param-reassign\n    node.innerHTML = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_1__.default)(html).filters.innerHTML;\n    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.updateURLHash)(uri);\n    init();\n    ctx.emit('product:loading', null, { isLoading: false });\n  });\n\n  ctx.on('filters:toggle', () => {\n    toggleSidebar(node);\n    document.body.classList.toggle('overflow-hidden');\n  });\n\n  ctx.on('product:loading', (_, { isLoading }) => {\n    (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_1__.default)(node).filtersForm.classList[isLoading ? 'add' : 'remove']('is-loading');\n  });\n\n  init();\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/collection/collection-filter.js?");

/***/ }),

/***/ "./scripts/components/collection/components.js":
/*!*****************************************************!*\
  !*** ./scripts/components/collection/components.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _collection_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collection-filter */ \"./scripts/components/collection/collection-filter.js\");\n/* harmony import */ var _main_collection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main-collection */ \"./scripts/components/collection/main-collection.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  collectionFilter: _collection_filter__WEBPACK_IMPORTED_MODULE_0__.default,\n  mainCollection: _main_collection__WEBPACK_IMPORTED_MODULE_1__.default,\n});\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/collection/components.js?");

/***/ }),

/***/ "./scripts/components/collection/main-collection.js":
/*!**********************************************************!*\
  !*** ./scripts/components/collection/main-collection.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./scripts/components/collection/utils.js\");\n\n\n\nconst getParameter = paramName => {\n  const searchString = window.location.search.substring(1);\n  let i;\n  let val;\n  const params = searchString.split('&');\n\n  for (i = 0; i < params.length; i++) {\n    val = params[i].split('=');\n    if (val[0] === paramName) {\n      return parseInt(val[1], 0);\n    }\n  }\n  return 1;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component((node, ctx) => {\n  const { loadMore, sortByOptions, productGrid } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node);\n\n  ctx.on('product:update', (_state, { html }) => {\n    // eslint-disable-next-line no-param-reassign\n    productGrid.innerHTML = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(html).productGrid.innerHTML;\n  });\n\n  const getQueryParams = (pageToQuery, sortBy) => {\n    const queryParams = new URLSearchParams(window.location.search);\n    queryParams.set('page', pageToQuery);\n    queryParams.set('sort_by', sortBy);\n    return queryParams.toString();\n  };\n\n  const renderMoreProducts = async setPageNum => {\n    const currentPage = getParameter('page');\n    const pageToQuery = setPageNum || currentPage + 1;\n    const sortBy = sortByOptions.value;\n    const query = getQueryParams(pageToQuery, sortBy);\n\n    const filterHtmlRender = await (0,_utils__WEBPACK_IMPORTED_MODULE_1__.fetchHtml)(\n      `${window.location.origin + window.location.pathname}?section_id=main-collection&${query}`\n    );\n\n    loadMore.classList.add('opacity-0');\n\n    const { empty } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(filterHtmlRender, null);\n    if (empty) return;\n\n    const renderBefore = pageToQuery === 1;\n\n    window.app.emit(['product:render'], {\n      html: filterHtmlRender,\n      uri: query,\n      addProducts: !renderBefore,\n    });\n  };\n\n  const observer = new IntersectionObserver(\n    entries => {\n      entries.forEach(async entry => {\n        if (entry.isIntersecting) {\n          loadMore.classList.remove('active');\n          renderMoreProducts();\n        }\n      });\n    },\n    {\n      rootMargin: '0px',\n      threshold: 0,\n    }\n  );\n\n  if (loadMore) {\n    observer.observe(loadMore);\n  }\n\n  if (getParameter('page') !== 1) {\n    window.addEventListener('load', () => {\n      renderMoreProducts(1);\n      setTimeout(() => window.scrollTo(0, 0), 100);\n    });\n  }\n\n  ctx.on('product:render', ({ html, uri, addProducts = false }) => {\n    const { productGrid: productGridToRender } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(html, null);\n    if (addProducts) {\n      productGrid.innerHTML += productGridToRender.innerHTML;\n    } else {\n      productGrid.innerHTML = productGridToRender.innerHTML;\n    }\n\n    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.updateURLHash)(uri);\n    window.app.mount();\n  });\n\n  ctx.on('product:loading', (_, { isLoading }) => {\n    (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node).productGrid.classList[isLoading ? 'add' : 'remove']('is-loading');\n  });\n\n  sortByOptions.addEventListener('change', () => renderMoreProducts(1));\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/collection/main-collection.js?");

/***/ }),

/***/ "./scripts/components/collection/utils.js":
/*!************************************************!*\
  !*** ./scripts/components/collection/utils.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchHtml\": () => (/* binding */ fetchHtml),\n/* harmony export */   \"updateURLHash\": () => (/* binding */ updateURLHash),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst fetchHtml = async url =>\n  fetch(url)\n    .then(response => response.text())\n    .then(responseText => new DOMParser().parseFromString(responseText, 'text/html'));\n\nconst updateURLHash = searchParams =>\n  // eslint-disable-next-line no-restricted-globals\n  history.pushState(\n    { searchParams },\n    '',\n    `${window.location.pathname}${\n      searchParams.includes('?') || !searchParams ? searchParams : '?'.concat(searchParams)\n    }`\n  );\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  fetchHtml,\n  updateURLHash,\n});\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/collection/utils.js?");

/***/ }),

/***/ "./scripts/lib/choozy.js":
/*!*******************************!*\
  !*** ./scripts/lib/choozy.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable */\n\n/**\n * @param {Element} container \n * @param {string} prefix \n * @returns {Object.<string, Element | Array<Element>} components\n */\n /* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(container = document.body, prefix) {\n  const elements = [...container.querySelectorAll(!prefix ? '*' : `[class*=\"${prefix}\"]`)];\n  const property = !prefix ? 'dataset' : 'classList';\n  return elements.reduce((res, el) => {\n    [].slice.call(!prefix ? Object.entries(el[property]) : el[property]).forEach(property => {\n      let key;\n      if (prefix && property.slice(0, prefix.length) === prefix)\n        key = property.slice(prefix.length, property.length);\n      else if (!prefix) [key] = property;\n      if (key) {\n        res[key] = res.hasOwnProperty(key)\n          ? res[key].constructor === Array\n            ? res[key].concat(el)\n            : [res[key], el]\n          : el;\n      }\n    });\n    return res;\n  }, {});\n}\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/choozy.js?");

/***/ }),

/***/ "./scripts/util/collection.js":
/*!************************************!*\
  !*** ./scripts/util/collection.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_collection_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/collection/components */ \"./scripts/components/collection/components.js\");\n\n\nwindow.app.add(_components_collection_components__WEBPACK_IMPORTED_MODULE_0__.default);\nwindow.app.mount();\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/util/collection.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/util/collection.js");
/******/ 	
/******/ })()
;