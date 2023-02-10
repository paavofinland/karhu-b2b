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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/get-liquid-variables */ \"./scripts/lib/get-liquid-variables.js\");\n/* harmony import */ var _lib_fetch_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/fetch-function */ \"./scripts/lib/fetch-function.js\");\n/* harmony import */ var _core_store_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/store-select */ \"./scripts/components/core/store-select.js\");\n/* eslint-disable no-prototype-builtins */\n/* eslint-disable no-param-reassign */\n/* eslint-disable no-unused-expressions */\n/* eslint-disable camelcase */\n\n\n\n\nconst querySelect = (node, queries) => queries.map(q => node.querySelector(q));\n\nconst getStoreCustomerAddresses = async (store, customerId, customerSecret) => {\n  const query = new URLSearchParams({\n    store,\n    customerId,\n    secret: customerSecret,\n    storeId: localStorage.getItem(_core_store_select__WEBPACK_IMPORTED_MODULE_2__.SELECTED_STORE_CUSTOMER),\n  });\n\n  return (0,_lib_fetch_function__WEBPACK_IMPORTED_MODULE_1__.default)(`/customer/get-store-customer-addresses?${query}`).catch(e => {\n    console.info('[unhandled error]');\n    return [];\n  });\n};\n\nconst formatAddress = ({\n  address1,\n  address2,\n  zip,\n  city,\n  country,\n  first_name,\n  last_name,\n  company,\n}) => {\n  return `${address1 ? `${address1}, ` : ' '}${address2 ? `${address2}, ` : ' '}${\n    zip ? `${zip} ` : ' '\n  }${city ? `${city}, ` : ' '}${country ? `${country}, ` : ' '}${\n    first_name || last_name || company\n      ? `${first_name ? `${first_name} ` : ' '}${last_name ? `${last_name}, ` : ' '}${\n          company ? `${company} ` : ''\n        }`\n      : ''\n  }`;\n};\n\nconst onChangeOptions = {\n  bubbles: true,\n  cancelable: false,\n  detail: {\n    shouldTriggerChange: false,\n  },\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(node => {\n  const {\n    skip_payment_discount_code: discountCode,\n    skip_payment_discount_applied: discountApplied,\n    store: { store },\n    customer: { secret: customerSecret, id: customerId },\n  } = (0,_lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_0__.default)();\n\n  const [totalSectionElement, billingAddress] = querySelect(node, [\n    '.order-summary__sections',\n    '[data-different-billing-address]',\n  ]);\n\n  const updateAddressField = () => {\n    const saveAddressInLocalStorage = id => {\n      localStorage.setItem(\n        billingAddress ? _core_store_select__WEBPACK_IMPORTED_MODULE_2__.SELECTED_BILLING_ADDRESS : _core_store_select__WEBPACK_IMPORTED_MODULE_2__.SELECTED_SHIPPING_ADDRESS,\n        id\n      );\n    };\n\n    const setupOption = address => {\n      const option = document.createElement('option');\n      option.value = address.id;\n      option.innerText = formatAddress(address);\n      option.setAttribute('data-properties', JSON.stringify(address));\n      const preSavedShippingAddress = localStorage.getItem(_core_store_select__WEBPACK_IMPORTED_MODULE_2__.SELECTED_SHIPPING_ADDRESS);\n      const preSavedBillingAddress = localStorage.getItem(_core_store_select__WEBPACK_IMPORTED_MODULE_2__.SELECTED_BILLING_ADDRESS);\n      const hasShippingAddress = preSavedShippingAddress\n        ? preSavedShippingAddress === address.id\n        : address.default;\n      const hasBillingAddress = preSavedBillingAddress\n        ? preSavedBillingAddress === address.id\n        : hasShippingAddress;\n      const isSelectedAddress = billingAddress ? hasBillingAddress : hasShippingAddress;\n\n      if (isSelectedAddress) {\n        option.selected = true;\n        saveAddressInLocalStorage(address.id);\n      }\n      return option;\n    };\n\n    const appendAddressSelector = (addressContainer, addressList) => {\n      const fragment = document.createDocumentFragment();\n      addressList.forEach(address => {\n        fragment.appendChild(setupOption(address));\n      });\n      addressContainer.appendChild(fragment);\n      addressContainer.dispatchEvent(new CustomEvent('change', onChangeOptions));\n      addressContainer.firstElementChild.remove();\n    };\n\n    const [addressSelector, addressFields] = querySelect(node, [\n      '[data-address-selector]',\n      '[data-address-fields]',\n    ]);\n    if (!addressFields) return;\n    addressFields.style.opacity = '0.5';\n    addressFields.style.pointerEvents = 'none';\n    Array.from(addressSelector.children).forEach(childNode => {\n      if (childNode.selected) {\n        childNode.innerText = 'Please wait...';\n        childNode.removeAttribute('selected');\n        return;\n      }\n      childNode.remove();\n    });\n\n    getStoreCustomerAddresses(store, customerId, customerSecret)\n      .then(addressList => appendAddressSelector(addressSelector, addressList))\n      .finally(() => {\n        addressFields.style.opacity = '1';\n        addressFields.style.pointerEvents = 'auto';\n      });\n\n    const updateAddressSelector = selectedAddress => {\n      const selectedOption = Array.from(addressSelector.children).find(\n        option => option.value === selectedAddress\n      );\n      selectedOption.selected = true;\n      addressSelector.dispatchEvent(new CustomEvent('change', onChangeOptions));\n    };\n\n    addressFields.addEventListener('change', e => {\n      if (e.detail && !e.detail.shouldTriggerChange) return;\n      if (e.target.dataset.hasOwnProperty('addressSelector')) {\n        saveAddressInLocalStorage(e.target.value);\n        return;\n      }\n      const preSavedShippingAddress = localStorage.getItem(_core_store_select__WEBPACK_IMPORTED_MODULE_2__.SELECTED_SHIPPING_ADDRESS);\n      const preSavedBillingAddress = localStorage.getItem(_core_store_select__WEBPACK_IMPORTED_MODULE_2__.SELECTED_BILLING_ADDRESS);\n      const selectedAddress = billingAddress ? preSavedBillingAddress : preSavedShippingAddress;\n      if (!selectedAddress) return;\n      setTimeout(() => updateAddressSelector(selectedAddress));\n    });\n  };\n\n  updateAddressField();\n\n  new MutationObserver(mutationList => {\n    mutationList.forEach(mutation => {\n      const { type, addedNodes } = mutation;\n      if (type !== 'childList' || !addedNodes[0] || !addedNodes[0].dataset?.hasOwnProperty('step'))\n        return;\n\n      updateAddressField();\n    });\n  }).observe(node, {\n    childList: true,\n    subtree: true,\n  });\n\n  const replaceTotalWithSubtotal = () => {\n    const [subtotalElement, totalElement] = querySelect(node, [\n      '[data-checkout-subtotal-price-target]',\n      '.total-line [data-checkout-payment-due-target]',\n    ]);\n\n    if (totalElement.innerText !== subtotalElement.innerText)\n      // Check to prevent infinite loop in MutationObserver\n      totalElement.innerText = subtotalElement.innerText;\n  };\n\n  replaceTotalWithSubtotal();\n\n  new MutationObserver(mutationList => {\n    mutationList.forEach(mutation => {\n      const { type, addedNodes } = mutation;\n      if (type !== 'childList' || !addedNodes[0]) return;\n\n      const totalMutation =\n        addedNodes[0].nodeType === Node.ELEMENT_NODE\n          ? addedNodes[0].querySelector('[data-checkout-payment-due-target]')\n          : 'checkoutPaymentDueTarget' in addedNodes[0].parentNode.dataset &&\n            addedNodes[0].parentNode;\n\n      if (totalMutation) replaceTotalWithSubtotal();\n    });\n  }).observe(totalSectionElement, {\n    childList: true,\n    subtree: true,\n  });\n\n  if (!discountApplied) {\n    const [discountInput, discountSubmit] = querySelect(node, [\n      '.order-summary__section--discount [name=\"checkout[reduction_code]\"]',\n      '.order-summary__section--discount [name=\"checkout[submit]\"]',\n    ]);\n    discountInput.value = discountCode;\n    discountSubmit.click();\n  }\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/checkout/checkout.js?");

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

/***/ "./scripts/components/core/store-select.js":
/*!*************************************************!*\
  !*** ./scripts/components/core/store-select.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SELECTED_STORE_CUSTOMER\": () => (/* binding */ SELECTED_STORE_CUSTOMER),\n/* harmony export */   \"SELECTED_SHIPPING_ADDRESS\": () => (/* binding */ SELECTED_SHIPPING_ADDRESS),\n/* harmony export */   \"SELECTED_BILLING_ADDRESS\": () => (/* binding */ SELECTED_BILLING_ADDRESS),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n/* harmony import */ var _lib_fetch_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/fetch-function */ \"./scripts/lib/fetch-function.js\");\n/* harmony import */ var _lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/get-liquid-variables */ \"./scripts/lib/get-liquid-variables.js\");\n\n\n\n\nconst LOADING_EVENT = 'agent-stores:loading';\nconst SELECTED_STORE_CUSTOMER = 'selectedStoreCustomer';\nconst SELECTED_SHIPPING_ADDRESS = 'selectedShippingAddress';\nconst SELECTED_BILLING_ADDRESS = 'selectedBillingAddress';\n\nconst getAgentStores = async (store, customerId, customerSecret) => {\n  const query = new URLSearchParams({\n    store,\n    customerId,\n    secret: customerSecret,\n  });\n\n  return (0,_lib_fetch_function__WEBPACK_IMPORTED_MODULE_1__.default)(`/customer/list-agent-stores?${query}`).catch(e => {\n    console.info('[unhandled error]');\n    return [];\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(async (node, ctx) => {\n  const selectedCustomerStore = localStorage.getItem(SELECTED_STORE_CUSTOMER);\n  if (selectedCustomerStore) ctx.emit('store:change', null, { id: selectedCustomerStore });\n\n  const {\n    store: { store },\n    customer: { secret: customerSecret, id: customerId },\n  } = (0,_lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_2__.default)();\n\n  const { selectCustomer } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n  const { select: customerSelect } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(selectCustomer, null);\n\n  ctx.on(LOADING_EVENT, (_, isLoading = true) => {\n    customerSelect.classList[isLoading ? 'add' : 'remove']('is-loading');\n    customerSelect.disabled = isLoading;\n  });\n\n  const appendSelect = data => {\n    const documentFragment = document.createDocumentFragment();\n    data.forEach(customer => {\n      const option = document.createElement('option');\n      if (selectedCustomerStore === customer.id) {\n        option.setAttribute('selected', true);\n      }\n      option.value = customer.id;\n      option.innerText = customer.name;\n      option.setAttribute('data-customer-select-option', '');\n      option.setAttribute('data-country-code', customer.countryCode || 'NL');\n      documentFragment.appendChild(option);\n    });\n    customerSelect.appendChild(documentFragment);\n  };\n\n  ctx.emit(LOADING_EVENT, null, true);\n\n  const loadAgentStores = async () => {\n    const agentStores = await getAgentStores(store, customerId, customerSecret);\n\n    ctx.emit(LOADING_EVENT, null, false);\n    ctx.emit('agent-stores:received', null, { data: agentStores });\n\n    if (!agentStores.length) {\n      customerSelect.setAttribute('disabled', true);\n      return;\n    }\n\n    appendSelect(agentStores);\n\n    const storeCustomer = agentStores.find(({ id }) => id === selectedCustomerStore);\n\n    if (!storeCustomer) {\n      const { id: defaultId } = agentStores[0];\n      customerSelect.setAttribute('value', defaultId);\n      customerSelect.dispatchEvent(new Event('change'));\n      return;\n    }\n\n    ctx.emit('store:change', null, { id: storeCustomer.id });\n\n    const { countryCode } = storeCustomer;\n    if (countryCode)\n      ctx.emit('country:revalidate', null, {\n        countryCode,\n      });\n  };\n\n  customerSelect.addEventListener('change', async e => {\n    ctx.emit('cart:clear');\n    const storeCustomerId = e.target.value;\n    const { countryCode } = e.target.options[e.target.selectedIndex].dataset;\n\n    localStorage.setItem(SELECTED_STORE_CUSTOMER, storeCustomerId);\n    localStorage.removeItem(SELECTED_SHIPPING_ADDRESS);\n    localStorage.removeItem(SELECTED_BILLING_ADDRESS);\n    ctx.emit('store:change', null, { id: storeCustomerId });\n    ctx.emit('country:revalidate', null, {\n      countryCode,\n    });\n  });\n\n  await loadAgentStores();\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/store-select.js?");

/***/ }),

/***/ "./scripts/lib/choozy.js":
/*!*******************************!*\
  !*** ./scripts/lib/choozy.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable */\n\n/**\n * @param {Element} container \n * @param {string} prefix \n * @returns {Object.<string, Element | Array<Element>} components\n */\n /* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(container = document.body, prefix) {\n  const elements = [...container.querySelectorAll(!prefix ? '*' : `[class*=\"${prefix}\"]`)];\n  const property = !prefix ? 'dataset' : 'classList';\n  return elements.reduce((res, el) => {\n    [].slice.call(!prefix ? Object.entries(el[property]) : el[property]).forEach(property => {\n      let key;\n      if (prefix && property.slice(0, prefix.length) === prefix)\n        key = property.slice(prefix.length, property.length);\n      else if (!prefix) [key] = property;\n      if (key) {\n        res[key] = res.hasOwnProperty(key)\n          ? res[key].constructor === Array\n            ? res[key].concat(el)\n            : [res[key], el]\n          : el;\n      }\n    });\n    return res;\n  }, {});\n}\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/choozy.js?");

/***/ }),

/***/ "./scripts/lib/fetch-function.js":
/*!***************************************!*\
  !*** ./scripts/lib/fetch-function.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\n * Used to fetch serverless functions\n */\n\nconst apiUrl = \"http://localhost:3000/api\";\n\nconst tryJson = async response =>\n  response.json().catch(e => {\n    return null;\n  });\n\n/**\n *\n * @param {string} url\n * @param {RequestInit | undefined} init\n */\nconst fetchFunction = async (url, init) => {\n  return fetch(`${apiUrl}${url}`, init)\n    .then(async response => {\n      //   response.headers;\n      const data = await tryJson(response);\n\n      if (\n        !response.ok ||\n        (response.status >= 400 && response.status < 500 && response.status !== 404)\n      )\n        throw Error(data.message || 'Something went wrong, please try again later.');\n\n      return data;\n    })\n    .catch(error => {\n      // TODO: Show warning for user\n      console.info(`⚡️⚠️ Function error [${url}]`);\n      throw error;\n    });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchFunction);\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/fetch-function.js?");

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