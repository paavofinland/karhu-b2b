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

/***/ "./scripts/components/core/accordion.js":
/*!**********************************************!*\
  !*** ./scripts/components/core/accordion.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component((node, ctx) => {\n  const { group } = node.dataset;\n  const { inner, toggle, shrinkBtn, expandBtn } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n  const activeClass = 'is-active';\n\n  const updateHeight = () => {\n    node.style.setProperty('--innerHeight', `auto`);\n    node.style.setProperty('--innerHeight', `${inner.scrollHeight}px`);\n  };\n\n  updateHeight();\n\n  window.addEventListener('resize', updateHeight, { passive: true });\n\n  toggle.addEventListener('click', () => {\n    ctx.emit('accordion:toggle', null, {\n      open: !node.classList.contains(activeClass),\n      node,\n      group,\n    });\n  });\n\n  ctx.on('accordion:toggle', (state, a = {}) => {\n    if (group !== a.group) return;\n    node.classList[a.open && a.node === node ? 'add' : 'remove'](activeClass);\n    shrinkBtn.classList.toggle('hidden');\n    shrinkBtn.classList.toggle('flex');\n    expandBtn.classList.toggle('hidden');\n    expandBtn.classList.toggle('block');\n  });\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/accordion.js?");

/***/ }),

/***/ "./scripts/components/core/announcement-bar.js":
/*!*****************************************************!*\
  !*** ./scripts/components/core/announcement-bar.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\nconst LOADING_EVENT = 'agent-stores:loading';\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(async (node, ctx) => {\n  const { selectCustomer } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n  const { select: customerSelect } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(selectCustomer, null);\n  const { customerId, customerSecret, store, selectedStoreCustomer } = node.dataset;\n\n  if (!customerId || !customerSecret || !store) return;\n\n  ctx.on(LOADING_EVENT, (_, isLoading = true) => {\n    selectCustomer.classList[isLoading ? 'add' : 'remove']('is-loading');\n  });\n\n  const appendSelect = data => {\n    const documentFragment = document.createDocumentFragment();\n    data.forEach(customer => {\n      const option = document.createElement('option');\n      if (selectedStoreCustomer === customer.id) {\n        option.setAttribute('selected', true);\n      }\n      option.value = customer.id;\n      option.innerText = customer.name;\n      documentFragment.appendChild(option);\n    });\n    customerSelect.appendChild(documentFragment);\n  };\n\n  ctx.emit(LOADING_EVENT, null, true);\n\n  const query = new URLSearchParams({\n    store,\n    customerId,\n    secret: customerSecret,\n  });\n\n  const agentStores = await fetch(\n    `${\"http://localhost:3000/api\"}/customer/list-agent-stores?${query}`\n  ).then(async res => {\n    if (res.status === 200) return res.json();\n    console.error(`Could not fetch agent stores [${(await res.json()).message}]`);\n    return [];\n  });\n\n  ctx.emit(LOADING_EVENT, null, false);\n\n  if (!agentStores.length) {\n    customerSelect.setAttribute('disabled', true);\n    return;\n  }\n\n  appendSelect(agentStores);\n  customerSelect.addEventListener('change', async e => {\n    ctx.emit(LOADING_EVENT, null, true);\n    await fetch(\n      `${\"http://localhost:3000/api\"}/customer/set-selected-store?${query}&storeCustomerId=${e.target.value}`\n    ).then(async r => {\n      if (r.status === 201) {\n        window.location.reload();\n      } else {\n        console.error(`Could not set selected store [${(await r.json()).message}]`);\n      }\n    });\n    ctx.emit(LOADING_EVENT, null, false);\n  });\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/announcement-bar.js?");

/***/ }),

/***/ "./scripts/components/core/cart-drawer.js":
/*!************************************************!*\
  !*** ./scripts/components/core/cart-drawer.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/cart */ \"./scripts/lib/cart.js\");\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n/* harmony import */ var _lib_listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/listeners */ \"./scripts/lib/listeners.js\");\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(async (node, ctx) => {\n  const parent = node.parentNode;\n  const el = node;\n  const { toggle, clear, focusEl } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_1__.default)(node, null);\n\n  const toggleDrawer = ({ cartOpen }) => {\n    node.classList[cartOpen ? 'add' : 'remove']('open');\n    if (cartOpen) {\n      el.tabIndex = '0';\n      (focusEl || node).focus();\n    } else {\n      el.tabIndex = '-1';\n    }\n  };\n\n  toggle.forEach(btn => {\n    btn.addEventListener('click', () =>\n      ctx.emit('cart:toggle', ({ cartOpen }) => ({ cartOpen: !cartOpen ?? true }))\n    );\n  });\n\n  toggleDrawer(ctx.getState());\n\n  if (clear) clear.addEventListener('click', () => (0,_lib_cart__WEBPACK_IMPORTED_MODULE_0__.clearCart)());\n\n  node.addEventListener('keyup', e => (0,_lib_listeners__WEBPACK_IMPORTED_MODULE_2__.default)(e, { type: 'cart:toggle', boolean: 'cartOpen' }));\n\n  await ctx.on('cart:render', ({ cart }) => {\n    if (parent)\n      document.getElementById('shopify-section-cart-drawer').outerHTML =\n        cart.sections['cart-drawer'];\n    window.app.unmount();\n    window.app.mount();\n  });\n\n  ctx.on('cart:toggle', toggleDrawer);\n\n  return () => {\n    ctx.on(['cart:toggle', 'cart:render'], () => {})();\n    node.removeEventListener('keyup', e => (0,_lib_listeners__WEBPACK_IMPORTED_MODULE_2__.default)(e, { type: 'cart:toggle', boolean: 'cartOpen' }));\n  };\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/cart-drawer.js?");

/***/ }),

/***/ "./scripts/components/core/cart-item.js":
/*!**********************************************!*\
  !*** ./scripts/components/core/cart-item.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/cart */ \"./scripts/lib/cart.js\");\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(node => {\n  const { update } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_1__.default)(node, null);\n  const { key } = node.dataset;\n\n  [].concat(update).forEach(btn => {\n    const { value } = btn.dataset;\n    btn.addEventListener('click', () => (0,_lib_cart__WEBPACK_IMPORTED_MODULE_0__.updateAddon)(key, value));\n  });\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/cart-item.js?");

/***/ }),

/***/ "./scripts/components/core/components.js":
/*!***********************************************!*\
  !*** ./scripts/components/core/components.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _section_rendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./section-rendering */ \"./scripts/components/core/section-rendering.js\");\n/* harmony import */ var _console_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./console-log */ \"./scripts/components/core/console-log.js\");\n/* harmony import */ var _accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./accordion */ \"./scripts/components/core/accordion.js\");\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header */ \"./scripts/components/core/header.js\");\n/* harmony import */ var _cart_drawer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cart-drawer */ \"./scripts/components/core/cart-drawer.js\");\n/* harmony import */ var _cart_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cart-item */ \"./scripts/components/core/cart-item.js\");\n/* harmony import */ var _announcement_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./announcement-bar */ \"./scripts/components/core/announcement-bar.js\");\n\n\n\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  sectionRendering: _section_rendering__WEBPACK_IMPORTED_MODULE_0__.default,\n  consoleLog: _console_log__WEBPACK_IMPORTED_MODULE_1__.default,\n  accordion: _accordion__WEBPACK_IMPORTED_MODULE_2__.default,\n  header: _header__WEBPACK_IMPORTED_MODULE_3__.default,\n  cartDrawer: _cart_drawer__WEBPACK_IMPORTED_MODULE_4__.default,\n  cartItem: _cart_item__WEBPACK_IMPORTED_MODULE_5__.default,\n  announcementBar: _announcement_bar__WEBPACK_IMPORTED_MODULE_6__.default,\n});\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/components.js?");

/***/ }),

/***/ "./scripts/components/core/console-log.js":
/*!************************************************!*\
  !*** ./scripts/components/core/console-log.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(node => {\n  const { text } = node.dataset;\n  console.log('console:log', text);\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/console-log.js?");

/***/ }),

/***/ "./scripts/components/core/header.js":
/*!*******************************************!*\
  !*** ./scripts/components/core/header.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(node => {\n  const { hamburger, hamburgerOpened, hamburgerClosed, mobileMenu, main } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node);\n  const { clear } = node.dataset;\n\n  const announcementBarHeight =\n    document.querySelector('#shopify-section-announcement-bar').offsetHeight || 0;\n\n  const isMenuClosed = () => hamburgerOpened.classList.contains('hidden');\n  const isHeaderScrolled = () => window.scrollY > announcementBarHeight;\n\n  const toggleTheme = () => {\n    if (clear !== undefined)\n      main.classList[!isMenuClosed() || isHeaderScrolled() ? 'add' : 'remove']('is-active');\n  };\n\n  window.addEventListener('scroll', toggleTheme, { passive: true });\n  window.addEventListener('load', toggleTheme);\n\n  hamburger.addEventListener('click', () => {\n    hamburgerOpened.classList.toggle('hidden');\n    hamburgerClosed.classList.toggle('hidden');\n    document.body.classList.toggle('overflow-hidden');\n    mobileMenu.classList.toggle('left-0');\n    toggleTheme();\n  });\n\n  const setMobileMenuHeight = () => {\n    mobileMenu.style.height = `${\n      window.innerHeight - announcementBarHeight - mobileMenu.parentElement.offsetHeight\n    }px`;\n  };\n\n  setMobileMenuHeight();\n  window.addEventListener('resize', setMobileMenuHeight);\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/header.js?");

/***/ }),

/***/ "./scripts/components/core/section-rendering.js":
/*!******************************************************!*\
  !*** ./scripts/components/core/section-rendering.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(() => {\n  document.addEventListener('shopify:section:load', () => {\n    window.app.unmount();\n    window.app.mount();\n  });\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/section-rendering.js?");

/***/ }),

/***/ "./scripts/components/sections/category-overview.js":
/*!**********************************************************!*\
  !*** ./scripts/components/sections/category-overview.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_waitToLoad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/waitToLoad */ \"./scripts/lib/waitToLoad.js\");\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(async node => {\n  const { slider } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_1__.default)(node, null);\n\n  await (0,_lib_waitToLoad__WEBPACK_IMPORTED_MODULE_0__.default)('Swiper');\n  // eslint-disable-next-line no-undef\n  const swiper = new Swiper(slider, {\n    allowTouchMove: true,\n    direction: 'horizontal',\n    slidesPerView: 'auto',\n    grabCursor: true,\n  });\n\n  return swiper;\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/sections/category-overview.js?");

/***/ }),

/***/ "./scripts/components/sections/components.js":
/*!***************************************************!*\
  !*** ./scripts/components/sections/components.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _hero__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hero */ \"./scripts/components/sections/hero.js\");\n/* harmony import */ var _category_overview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./category-overview */ \"./scripts/components/sections/category-overview.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  hero: _hero__WEBPACK_IMPORTED_MODULE_0__.default,\n  categoryOverview: _category_overview__WEBPACK_IMPORTED_MODULE_1__.default,\n});\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/sections/components.js?");

/***/ }),

/***/ "./scripts/components/sections/hero.js":
/*!*********************************************!*\
  !*** ./scripts/components/sections/hero.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_waitToLoad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/waitToLoad */ \"./scripts/lib/waitToLoad.js\");\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(async node => {\n  const { slider, slide, prev, next } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_1__.default)(node, null);\n\n  if (slide.length > 1) {\n    await (0,_lib_waitToLoad__WEBPACK_IMPORTED_MODULE_0__.default)('Swiper');\n\n    /** @type {import('swiper').SwiperOptions} */\n    const swiperOptions = {\n      slidesPerView: 1,\n      loop: true,\n      on: {\n        afterInit: s => {\n          s.wrapperEl.classList.remove('overflow-hidden', 'flex');\n        },\n      },\n    };\n\n    // eslint-disable-next-line no-undef\n    const swiper = new Swiper(slider, swiperOptions);\n\n    prev.addEventListener('click', () => swiper.slidePrev());\n    next.addEventListener('click', () => swiper.slideNext());\n  }\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/sections/hero.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable */\n\n/**\n * @param {Element} container \n * @param {string} prefix \n * @returns {Object.<string, Element | Array<Element>} components\n */\n /* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(container = document.body, prefix) {\n  const elements = [...container.querySelectorAll(!prefix ? '*' : `[class*=\"${prefix}\"]`)];\n  const property = !prefix ? 'dataset' : 'classList';\n  return elements.reduce((res, el) => {\n    [].slice.call(!prefix ? Object.entries(el[property]) : el[property]).forEach(property => {\n      let key;\n      if (prefix && property.slice(0, prefix.length) === prefix)\n        key = property.slice(prefix.length, property.length);\n      else if (!prefix) [key] = property;\n      if (key) {\n        res[key] = res.hasOwnProperty(key)\n          ? res[key].constructor === Array\n            ? res[key].concat(el)\n            : [res[key], el]\n          : el;\n      }\n    });\n    return res;\n  }, {});\n}\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/choozy.js?");

/***/ }),

/***/ "./scripts/lib/listeners.js":
/*!**********************************!*\
  !*** ./scripts/lib/listeners.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst escKey = ({ keyCode }, { type, boolean }) => {\n  if (keyCode === 27 && type && boolean) window.app.emit(type, { [boolean]: false });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (escKey);\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/listeners.js?");

/***/ }),

/***/ "./scripts/lib/waitToLoad.js":
/*!***********************************!*\
  !*** ./scripts/lib/waitToLoad.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst waitToLoad = scriptName =>\n  new Promise(res => {\n    if (window?.hasLoaded?.scripts?.[scriptName]) res();\n    else window.app.on(`${scriptName}:loaded`, res);\n  });\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (waitToLoad);\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/waitToLoad.js?");

/***/ }),

/***/ "./scripts/util/base.js":
/*!******************************!*\
  !*** ./scripts/util/base.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_sections_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/sections/components */ \"./scripts/components/sections/components.js\");\n/* harmony import */ var _components_core_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/core/components */ \"./scripts/components/core/components.js\");\n\n\n\nwindow.app.add(_components_sections_components__WEBPACK_IMPORTED_MODULE_0__.default);\nwindow.app.add(_components_core_components__WEBPACK_IMPORTED_MODULE_1__.default);\nwindow.app.mount();\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/util/base.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/util/base.js");
/******/ 	
/******/ })()
;