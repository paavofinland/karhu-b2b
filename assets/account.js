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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n/* eslint-disable no-unused-expressions */\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(node => {\n  const {\n    addAddressButton,\n    resetPageButton,\n    editAddressButton,\n    addAddress,\n    info,\n    addresses,\n    editAddresses,\n    editAddressForm,\n    makeDefaultButton,\n    links,\n  } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n\n  const resetPage = e => {\n    e.preventDefault();\n    info.classList.remove('hidden');\n    addresses.classList.remove('hidden');\n    addAddress.classList.add('hidden');\n    editAddresses.classList.add('hidden');\n    [].concat(editAddressForm).forEach(form => form.classList.add('hidden'));\n    window.scrollTo(0, 0);\n  };\n\n  addAddressButton &&\n    addAddressButton.addEventListener('click', e => {\n      e.preventDefault();\n      addAddress.classList.remove('hidden');\n      info.classList.add('hidden');\n      addresses.classList.add('hidden');\n      window.scrollTo(0, 0);\n    });\n  resetPageButton &&\n    [].concat(resetPageButton).forEach(button => {\n      button.addEventListener('click', resetPage);\n    });\n\n  editAddressButton &&\n    [].concat(editAddressButton).forEach(button => {\n      button.addEventListener('click', e => {\n        e.preventDefault();\n        const { addressId } = button.dataset;\n        addresses.classList.add('hidden');\n        info.classList.add('hidden');\n\n        const targetEditAddressForm = []\n          .concat(editAddressForm)\n          .find(form => form.dataset.addressId === addressId);\n\n        editAddresses.classList.remove('hidden');\n        targetEditAddressForm.classList.remove('hidden');\n\n        window.scrollTo(0, 0);\n      });\n    });\n\n  makeDefaultButton &&\n    [].concat(makeDefaultButton).forEach(button => {\n      button.addEventListener('click', e => {\n        const { addressId } = e.target.dataset;\n        const editForm = editAddressForm.find(form => form.dataset.addressId === addressId);\n        const formElement = editForm.querySelector('form');\n        const makeDefaultCheckbox = formElement.querySelector('input[type=\"checkbox\"]');\n        makeDefaultCheckbox.click();\n        formElement.submit();\n      });\n    });\n\n  if (window.location.href.includes('carts')) {\n    links.forEach(linkElem => {\n      const isCartLink = linkElem.href.includes('carts');\n      linkElem.parentNode.classList[isCartLink ? 'remove' : 'add']('text-grey-4');\n    });\n  }\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/account/account.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n/* harmony import */ var _lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/get-liquid-variables */ \"./scripts/lib/get-liquid-variables.js\");\n/* eslint-disable no-unused-expressions */\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(async (node, ctx) => {\n  const {\n    store: { store },\n    customer: { secret: customerSecret, id: customerId },\n  } = (0,_lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_1__.default)();\n\n  const {\n    selectCustomer,\n    ordersContainer,\n    noOrders,\n    customerSelectText,\n    ordersTable,\n    ordersTableRow,\n    ordersBlockContainer,\n    ordersBlock,\n    orders,\n  } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node);\n\n  const getCustomerOrders = async e => {\n    const query = new URLSearchParams({\n      store,\n      secret: customerSecret,\n      customerId,\n      selectedCustomerId: e?.target.value || '',\n    });\n\n    return fetch(`${\"http://localhost:3000/api\"}/customer/get-store-customer-orders?${query}`).then(\n      async res => {\n        if (res.status === 200) return res.json();\n        console.error(`Could not fetch customer orders [${(await res.json()).message}]`);\n        return [];\n      }\n    );\n  };\n\n  const appendHtmlWithOrders = ({ container, containerItem, orderList }) => {\n    // eslint-disable-next-line no-param-reassign\n    container.innerHTML = '';\n    const fragment = document.createDocumentFragment();\n    orderList.forEach(order => {\n      const newElement = containerItem.content.cloneNode(true);\n      Object.keys(order).forEach(prop => {\n        const value = order[prop];\n        const elements = [].concat((0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(newElement)[prop]).filter(Boolean);\n        elements.forEach(element => {\n          // eslint-disable-next-line no-param-reassign\n          element.innerText = value;\n        });\n      });\n      fragment.appendChild(newElement);\n    });\n    container.appendChild(fragment);\n  };\n\n  const clearState = () => {\n    noOrders.classList.add('hidden');\n    ordersContainer.classList.add('hidden');\n    orders.classList.add('is-active');\n    customerSelectText && customerSelectText.classList.add('hidden');\n  };\n\n  const onSelectCustomer = async e => {\n    clearState();\n    const orderList = await getCustomerOrders(e);\n    orders.classList.remove('is-active');\n    if (!orderList.length) {\n      noOrders.classList.remove('hidden');\n      return;\n    }\n    ordersContainer.classList.remove('hidden');\n    appendHtmlWithOrders({ container: ordersTable, containerItem: ordersTableRow, orderList });\n    appendHtmlWithOrders({\n      container: ordersBlockContainer,\n      containerItem: ordersBlock,\n      orderList,\n    });\n  };\n\n  const appendCustomerSelect = data => {\n    const documentFragment = document.createDocumentFragment();\n    data.forEach(customer => {\n      const option = document.createElement('option');\n      option.value = customer.id;\n      option.innerText = customer.name;\n      documentFragment.appendChild(option);\n    });\n    selectCustomer.appendChild(documentFragment);\n  };\n\n  if (selectCustomer) {\n    selectCustomer.addEventListener('change', onSelectCustomer);\n    ctx.on('agent-stores:received', (_state, { data }) => {\n      selectCustomer.classList.add('is-active');\n      selectCustomer.removeAttribute('disabled');\n      customerSelectText.classList.remove('hidden');\n      appendCustomerSelect(data);\n    });\n  } else {\n    onSelectCustomer();\n  }\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/account/orders.js?");

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