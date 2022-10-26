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

/***/ "./scripts/components/account/account.js":
/*!***********************************************!*\
  !*** ./scripts/components/account/account.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n/* eslint-disable no-unused-expressions */\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(node => {\n  const {\n    addAddressButton,\n    resetPageButton,\n    editAddressButton,\n    addAddress,\n    info,\n    addresses,\n    editAddresses,\n    editAddressForm,\n    makeDefaultButton,\n  } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n\n  const resetPage = e => {\n    e.preventDefault();\n    info.classList.remove('hidden');\n    addresses.classList.remove('hidden');\n    addAddress.classList.add('hidden');\n    editAddresses.classList.add('hidden');\n    [].concat(editAddressForm).forEach(form => form.classList.add('hidden'));\n    window.scrollTo(0, 0);\n  };\n\n  addAddressButton &&\n    addAddressButton.addEventListener('click', e => {\n      e.preventDefault();\n      addAddress.classList.remove('hidden');\n      info.classList.add('hidden');\n      addresses.classList.add('hidden');\n      window.scrollTo(0, 0);\n    });\n  resetPageButton &&\n    [].concat(resetPageButton).forEach(button => {\n      button.addEventListener('click', resetPage);\n    });\n\n  editAddressButton &&\n    [].concat(editAddressButton).forEach(button => {\n      button.addEventListener('click', e => {\n        e.preventDefault();\n        const { addressId } = button.dataset;\n        addresses.classList.add('hidden');\n        info.classList.add('hidden');\n\n        const targetEditAddressForm = []\n          .concat(editAddressForm)\n          .find(form => form.dataset.addressId === addressId);\n\n        editAddresses.classList.remove('hidden');\n        targetEditAddressForm.classList.remove('hidden');\n\n        window.scrollTo(0, 0);\n      });\n    });\n\n  makeDefaultButton &&\n    [].concat(makeDefaultButton).forEach(button => {\n      button.addEventListener('click', e => {\n        const { addressId } = e.target.dataset;\n        const editForm = editAddressForm.find(form => form.dataset.addressId === addressId);\n        const formElement = editForm.querySelector('form');\n        const makeDefaultCheckbox = formElement.querySelector('input[type=\"checkbox\"]');\n        makeDefaultCheckbox.click();\n        formElement.submit();\n      });\n    });\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/account/account.js?");

/***/ }),

/***/ "./scripts/components/account/address.js":
/*!***********************************************!*\
  !*** ./scripts/components/account/address.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n/* eslint-disable no-unused-expressions */\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(node => {\n  const { deleteAddressButton, deleteAddressModal, closeModal, deleteAddressConfirm } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(\n    node,\n    null\n  );\n\n  if (closeModal) {\n    [].concat(closeModal).forEach(button =>\n      button.addEventListener('click', e => {\n        e.preventDefault();\n        deleteAddressModal.classList.remove('open');\n      })\n    );\n  }\n\n  if (deleteAddressButton) {\n    deleteAddressButton.addEventListener('click', e => {\n      e.preventDefault();\n      deleteAddressModal.classList.add('open');\n    });\n  }\n\n  if (deleteAddressConfirm) {\n    deleteAddressConfirm.addEventListener('click', () => {\n      const targetDeleteForm = document.getElementById(\n        `delete-address-form--${deleteAddressConfirm.dataset.addressId}`\n      );\n      targetDeleteForm.submit();\n    });\n  }\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/account/address.js?");

/***/ }),

/***/ "./scripts/components/account/components.js":
/*!**************************************************!*\
  !*** ./scripts/components/account/components.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login */ \"./scripts/components/account/login.js\");\n/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./account */ \"./scripts/components/account/account.js\");\n/* harmony import */ var _address__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./address */ \"./scripts/components/account/address.js\");\n/* harmony import */ var _orders__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./orders */ \"./scripts/components/account/orders.js\");\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  login: _login__WEBPACK_IMPORTED_MODULE_0__.default,\n  account: _account__WEBPACK_IMPORTED_MODULE_1__.default,\n  address: _address__WEBPACK_IMPORTED_MODULE_2__.default,\n  orders: _orders__WEBPACK_IMPORTED_MODULE_3__.default,\n});\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/account/components.js?");

/***/ }),

/***/ "./scripts/components/account/login.js":
/*!*********************************************!*\
  !*** ./scripts/components/account/login.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(node => {\n  const {\n    loginForm,\n    recoverPasswordForm,\n    toggleRecoverPasswordBtns,\n    recoverMessageSent,\n    recoverPasswordSuccess,\n    emailList,\n  } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n\n  const toggleRecoverPasswordPage = () => {\n    loginForm.classList.toggle('hidden');\n    recoverPasswordForm.classList.toggle('hidden');\n  };\n\n  toggleRecoverPasswordBtns.forEach(button => {\n    button.addEventListener('click', toggleRecoverPasswordPage);\n  });\n\n  const hideError = () => {\n    const errorField = document.querySelector('.errors');\n    // eslint-disable-next-line prettier/prettier, no-unused-expressions\n    errorField ? errorField.style.display = \"none\" : \"\";\n  };\n\n  emailList.forEach(input => {\n    input.addEventListener('focus', hideError);\n    input.addEventListener('keyup', hideError);\n  });\n\n  const isUrlRecoverHash = () => {\n    const { hash } = window.location;\n    return hash === '#recover';\n  };\n\n  if (isUrlRecoverHash() && !recoverMessageSent) toggleRecoverPasswordPage();\n\n  if (recoverMessageSent) {\n    loginForm.classList.add('hidden');\n    recoverPasswordForm.classList.add('hidden');\n    recoverPasswordSuccess.classList.remove('hidden');\n  }\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/account/login.js?");

/***/ }),

/***/ "./scripts/components/account/orders.js":
/*!**********************************************!*\
  !*** ./scripts/components/account/orders.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n/* harmony import */ var _lib_waitToLoad__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/waitToLoad */ \"./scripts/lib/waitToLoad.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(async node => {\n  await (0,_lib_waitToLoad__WEBPACK_IMPORTED_MODULE_1__.default)('Keen slider');\n\n  const { orderSlider } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n\n  if (orderSlider) {\n    [].concat(orderSlider).forEach(slider => {\n      const keen = new KeenSlider(slider, {\n        breakpoints: {\n          '(min-width: 1024px)': {\n            slides: {\n              perView: 5.5,\n              spacing: 16,\n            },\n          },\n        },\n        slides: {\n          perView: 2.8,\n          spacing: 8,\n        },\n      });\n    });\n  }\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/account/orders.js?");

/***/ }),

/***/ "./scripts/lib/choozy.js":
/*!*******************************!*\
  !*** ./scripts/lib/choozy.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable */\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(container = document.body, prefix = 'js-') {\n  const elements = [...container.querySelectorAll(!prefix ? '*' : `[class*=\"${prefix}\"]`)];\n  const property = !prefix ? 'dataset' : 'classList';\n  return elements.reduce((res, el) => {\n    [].slice.call(!prefix ? Object.entries(el[property]) : el[property]).forEach(property => {\n      let key;\n      if (prefix && property.slice(0, prefix.length) === prefix)\n        key = property.slice(prefix.length, property.length);\n      else if (!prefix) [key] = property;\n      if (key) {\n        res[key] = res.hasOwnProperty(key)\n          ? res[key].constructor === Array\n            ? res[key].concat(el)\n            : [res[key], el]\n          : el;\n      }\n    });\n    return res;\n  }, {});\n}\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/choozy.js?");

/***/ }),

/***/ "./scripts/lib/waitToLoad.js":
/*!***********************************!*\
  !*** ./scripts/lib/waitToLoad.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst waitToLoad = scriptName =>\n  new Promise(res => {\n    if (window?.hasLoaded?.scripts?.[scriptName]) res();\n    else window.app.on(`${scriptName}:loaded`, res);\n  });\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (waitToLoad);\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/waitToLoad.js?");

/***/ }),

/***/ "./scripts/util/account.js":
/*!*********************************!*\
  !*** ./scripts/util/account.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_account_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/account/components */ \"./scripts/components/account/components.js\");\n\n\nwindow.app.add(_components_account_components__WEBPACK_IMPORTED_MODULE_0__.default);\nwindow.app.mount();\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/util/account.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/util/account.js");
/******/ 	
/******/ })()
;