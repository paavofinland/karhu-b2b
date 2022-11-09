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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component((node, ctx) => {\n  const { group } = node.dataset;\n  const { inner, toggle, shrinkBtn, expandBtn, toggleModalBtn } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n  const activeClass = 'is-active';\n\n  const updateHeight = () => {\n    node.style.setProperty('--innerHeight', `auto`);\n    node.style.setProperty('--innerHeight', `${inner.scrollHeight}px`);\n  };\n\n  updateHeight();\n\n  window.addEventListener('resize', updateHeight, { passive: true });\n\n  toggle.addEventListener('click', () => {\n    ctx.emit('accordion:toggle', null, {\n      open: !node.classList.contains(activeClass),\n      node,\n      group,\n    });\n  });\n\n  if (toggleModalBtn) {\n    toggleModalBtn.addEventListener('click', e => {\n      ctx.emit('modal:open', { type: e.target.dataset.modalType });\n    });\n  }\n\n  ctx.on('accordion:toggle', (state, a = {}) => {\n    if (group !== a.group) return;\n    node.classList[a.open && a.node === node ? 'add' : 'remove'](activeClass);\n    shrinkBtn.classList.toggle('hidden');\n    shrinkBtn.classList.toggle('flex');\n    expandBtn.classList.toggle('hidden');\n    expandBtn.classList.toggle('block');\n  });\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/accordion.js?");

/***/ }),

/***/ "./scripts/components/core/announcement-bar.js":
/*!*****************************************************!*\
  !*** ./scripts/components/core/announcement-bar.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\nconst LOADING_EVENT = 'agent-stores:loading';\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(async (node, ctx) => {\n  const { selectCustomer } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n  const { select: customerSelect } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(selectCustomer, null);\n  const { customerId, customerSecret, store, selectedStoreCustomer } = node.dataset;\n\n  if (!customerId || !customerSecret || !store || !selectCustomer) return;\n\n  ctx.on(LOADING_EVENT, (_, isLoading = true) => {\n    selectCustomer.classList[isLoading ? 'add' : 'remove']('is-loading');\n  });\n\n  const appendSelect = data => {\n    const documentFragment = document.createDocumentFragment();\n    data.forEach(customer => {\n      const option = document.createElement('option');\n      if (selectedStoreCustomer === customer.id) {\n        option.setAttribute('selected', true);\n      }\n      option.value = customer.id;\n      option.innerText = customer.name;\n      documentFragment.appendChild(option);\n    });\n    customerSelect.appendChild(documentFragment);\n  };\n\n  ctx.emit(LOADING_EVENT, null, true);\n\n  const query = new URLSearchParams({\n    store,\n    customerId,\n    secret: customerSecret,\n  });\n\n  const getAgentStores = () => {\n    return fetch(`${\"http://localhost:3000/api\"}/customer/list-agent-stores?${query}`).then(async res => {\n      if (res.status === 200) {\n        const data = await res.json();\n        ctx.emit('agent-stores:received', null, { data });\n        return data;\n      }\n      console.error(`Could not fetch agent stores [${(await res.json()).message}]`);\n      return [];\n    });\n  };\n\n  const agentStores = await getAgentStores();\n\n  ctx.emit(LOADING_EVENT, null, false);\n\n  if (!agentStores.length) {\n    customerSelect.setAttribute('disabled', true);\n    return;\n  }\n\n  appendSelect(agentStores);\n  customerSelect.addEventListener('change', async e => {\n    ctx.emit(LOADING_EVENT, null, true);\n    await fetch(\n      `${\"http://localhost:3000/api\"}/customer/set-selected-store?${query}&storeCustomerId=${e.target.value}`\n    ).then(async r => {\n      if (r.status === 201) {\n        window.location.reload();\n      } else {\n        console.error(`Could not set selected store [${(await r.json()).message}]`);\n      }\n    });\n    ctx.emit(LOADING_EVENT, null, false);\n  });\n\n  ctx.emit('store-data:send', null, { data: node.dataset });\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/announcement-bar.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _section_rendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./section-rendering */ \"./scripts/components/core/section-rendering.js\");\n/* harmony import */ var _console_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./console-log */ \"./scripts/components/core/console-log.js\");\n/* harmony import */ var _accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./accordion */ \"./scripts/components/core/accordion.js\");\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header */ \"./scripts/components/core/header.js\");\n/* harmony import */ var _cart_drawer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cart-drawer */ \"./scripts/components/core/cart-drawer.js\");\n/* harmony import */ var _cart_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cart-item */ \"./scripts/components/core/cart-item.js\");\n/* harmony import */ var _announcement_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./announcement-bar */ \"./scripts/components/core/announcement-bar.js\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modal */ \"./scripts/components/core/modal.js\");\n/* harmony import */ var _country_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./country-select */ \"./scripts/components/core/country-select.js\");\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  sectionRendering: _section_rendering__WEBPACK_IMPORTED_MODULE_0__.default,\n  consoleLog: _console_log__WEBPACK_IMPORTED_MODULE_1__.default,\n  accordion: _accordion__WEBPACK_IMPORTED_MODULE_2__.default,\n  header: _header__WEBPACK_IMPORTED_MODULE_3__.default,\n  cartDrawer: _cart_drawer__WEBPACK_IMPORTED_MODULE_4__.default,\n  cartItem: _cart_item__WEBPACK_IMPORTED_MODULE_5__.default,\n  announcementBar: _announcement_bar__WEBPACK_IMPORTED_MODULE_6__.default,\n  modal: _modal__WEBPACK_IMPORTED_MODULE_7__.default,\n  countrySelect: _country_select__WEBPACK_IMPORTED_MODULE_8__.default,\n});\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/components.js?");

/***/ }),

/***/ "./scripts/components/core/console-log.js":
/*!************************************************!*\
  !*** ./scripts/components/core/console-log.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(node => {\n  const { text } = node.dataset;\n  console.log('console:log', text);\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/console-log.js?");

/***/ }),

/***/ "./scripts/components/core/country-select.js":
/*!***************************************************!*\
  !*** ./scripts/components/core/country-select.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(node => {\n  const { select } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node);\n\n  const urlCountryCode = new URLSearchParams(window.location.search).get('country_code');\n  const currentCountryCode = select.dataset.current;\n\n  if (urlCountryCode && urlCountryCode !== currentCountryCode) {\n    select.value = urlCountryCode;\n    select.form.submit();\n  }\n\n  select.addEventListener('change', e => {\n    const selectedOption = e.target.options[e.target.selectedIndex];\n    if (selectedOption.dataset.url) {\n      window.location.href = `${selectedOption.dataset.url}?country_code=${selectedOption.value}`;\n    } else {\n      e.target.form.submit();\n    }\n  });\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/country-select.js?");

/***/ }),

/***/ "./scripts/components/core/header.js":
/*!*******************************************!*\
  !*** ./scripts/components/core/header.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(node => {\n  const { hamburger, hamburgerOpened, hamburgerClosed, mobileMenu, main } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node);\n  const { clear } = node.dataset;\n\n  const announcementBarHeight =\n    document.querySelector('#shopify-section-announcement-bar').offsetHeight || 0;\n\n  const isMenuClosed = () => hamburgerOpened.classList.contains('hidden');\n  const isHeaderScrolled = () => window.scrollY > announcementBarHeight;\n\n  const toggleTheme = () => {\n    if (clear !== undefined)\n      main.classList[!isMenuClosed() || isHeaderScrolled() ? 'add' : 'remove']('is-active');\n  };\n\n  window.addEventListener('scroll', toggleTheme, { passive: true });\n  window.addEventListener('load', toggleTheme);\n\n  hamburger.addEventListener('click', () => {\n    hamburgerOpened.classList.toggle('hidden');\n    hamburgerClosed.classList.toggle('hidden');\n    document.body.classList.toggle('overflow-hidden');\n    mobileMenu.classList.toggle('left-0');\n    toggleTheme();\n  });\n\n  const setMobileMenuHeight = () => {\n    mobileMenu.style.height = `${\n      window.innerHeight - announcementBarHeight - mobileMenu.parentElement.offsetHeight\n    }px`;\n  };\n\n  setMobileMenuHeight();\n  window.addEventListener('resize', setMobileMenuHeight);\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/header.js?");

/***/ }),

/***/ "./scripts/components/core/modal.js":
/*!******************************************!*\
  !*** ./scripts/components/core/modal.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component((node, ctx) => {\n  const { closeModalBtn } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n\n  const onToggleModal = () => {\n    node.classList.toggle('flex');\n    node.classList.toggle('hidden');\n    document.body.classList.toggle('overflow-hidden');\n  };\n\n  node.addEventListener(\n    'click',\n    e => {\n      if (e.target.dataset.modalType) {\n        onToggleModal();\n      }\n    },\n    { capture: true }\n  );\n\n  closeModalBtn.addEventListener('click', onToggleModal);\n\n  ctx.on('modal:open', state => {\n    if (node.dataset.modalType === state.type) {\n      onToggleModal();\n    }\n  });\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/modal.js?");

/***/ }),

/***/ "./scripts/components/core/section-rendering.js":
/*!******************************************************!*\
  !*** ./scripts/components/core/section-rendering.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(() => {\n  document.addEventListener('shopify:section:load', () => {\n    window.app.unmount();\n    window.app.mount();\n  });\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/core/section-rendering.js?");

/***/ }),

/***/ "./scripts/components/sections/cart.js":
/*!*********************************************!*\
  !*** ./scripts/components/sections/cart.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(async node => {\n  const { editItemBtn, sidebar, sidebarLayer, closeSidebarBtn, saveCartBtn, popup, closePopupBtn } =\n    (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node);\n\n  const getElementByDataId = id => element => element.dataset.id === id;\n\n  const sidebarList = Array.isArray(sidebar) ? Array.from(sidebar) : [sidebar];\n\n  const onToggleSidebar = e => {\n    const { id: itemId } = e.currentTarget.dataset;\n    const sidebarEl = sidebarList.find(getElementByDataId(itemId));\n    sidebarEl.classList.toggle('is-active');\n    sidebarLayer.classList.toggle('is-active');\n    document.body.classList.toggle('overflow-hidden');\n  };\n\n  editItemBtn.addEventListener('click', onToggleSidebar);\n  closeSidebarBtn.addEventListener('click', onToggleSidebar);\n  sidebarLayer.addEventListener('click', onToggleSidebar);\n\n  const onToggleSaveCartPopup = () => popup.classList.toggle('hidden');\n\n  saveCartBtn.addEventListener('click', onToggleSaveCartPopup);\n  closePopupBtn.forEach(btn => btn.addEventListener('click', onToggleSaveCartPopup));\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/sections/cart.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _hero__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hero */ \"./scripts/components/sections/hero.js\");\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart */ \"./scripts/components/sections/cart.js\");\n/* harmony import */ var _category_overview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./category-overview */ \"./scripts/components/sections/category-overview.js\");\n/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./search */ \"./scripts/components/sections/search.js\");\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  hero: _hero__WEBPACK_IMPORTED_MODULE_0__.default,\n  cart: _cart__WEBPACK_IMPORTED_MODULE_1__.default,\n  categoryOverview: _category_overview__WEBPACK_IMPORTED_MODULE_2__.default,\n  search: _search__WEBPACK_IMPORTED_MODULE_3__.default,\n});\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/sections/components.js?");

/***/ }),

/***/ "./scripts/components/sections/hero.js":
/*!*********************************************!*\
  !*** ./scripts/components/sections/hero.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_waitToLoad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/waitToLoad */ \"./scripts/lib/waitToLoad.js\");\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(async node => {\n  const { slider, slide, prev, next } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_1__.default)(node, null);\n\n  if (slide.length > 1) {\n    await (0,_lib_waitToLoad__WEBPACK_IMPORTED_MODULE_0__.default)('Swiper');\n\n    /** @type {import('swiper').SwiperOptions} */\n    const swiperOptions = {\n      slidesPerView: 1,\n      loop: true,\n      on: {\n        afterInit: s => {\n          s.wrapperEl.classList.remove('overflow-hidden', 'flex');\n        },\n      },\n    };\n\n    // eslint-disable-next-line no-undef\n    const swiper = new Swiper(slider, swiperOptions);\n\n    prev.addEventListener('click', () => swiper.slidePrev());\n    next.addEventListener('click', () => swiper.slideNext());\n  }\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/sections/hero.js?");

/***/ }),

/***/ "./scripts/components/sections/search.js":
/*!***********************************************!*\
  !*** ./scripts/components/sections/search.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n/* harmony import */ var _lib_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/debounce */ \"./scripts/lib/debounce.js\");\n/* harmony import */ var _lib_html_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/html.utils */ \"./scripts/lib/html.utils.js\");\n/* eslint-disable no-unused-expressions */\n/* eslint-disable no-param-reassign */\n\n\n\n\nconst getQueryString = ({ page, q, sortBy }) => {\n  const queryParams = new URLSearchParams(window.location.search);\n  queryParams.set('page', page);\n  queryParams.set('q', q);\n  queryParams.set('sort_by', sortBy);\n  return queryParams;\n};\n\nconst replaceEmptyParams = ({ page, q, sortBy }) => {\n  return {\n    page: page || (0,_lib_html_utils__WEBPACK_IMPORTED_MODULE_2__.getParameter)('page'),\n    q: q || (0,_lib_html_utils__WEBPACK_IMPORTED_MODULE_2__.getParameter)('q'),\n    sortBy: sortBy || (0,_lib_html_utils__WEBPACK_IMPORTED_MODULE_2__.getParameter)('sort_by'),\n  };\n};\n\nconst onSearch = sectionId =>\n  (0,_lib_debounce__WEBPACK_IMPORTED_MODULE_1__.default)(async queryData => {\n    const { page, q, sortBy } = replaceEmptyParams(queryData);\n    const queryParams = getQueryString({ page, q, sortBy });\n    queryParams.set('sectionId', sectionId);\n    queryParams.set('type', 'product');\n    const query = queryParams.toString();\n\n    const productsHtml = await (0,_lib_html_utils__WEBPACK_IMPORTED_MODULE_2__.fetchHtml)(\n      `${window.location.origin + window.location.pathname}?${query}`\n    );\n    window.app.emit(['search:render'], null, {\n      html: productsHtml,\n      uri: query,\n      requestedPage: page,\n    });\n  });\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(async (node, ctx) => {\n  const { searchInput, searchContainer, sortByOptions } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n\n  const onSearchProducts = onSearch(node.dataset.sectionId);\n\n  const observer = new IntersectionObserver(\n    entries => {\n      entries.forEach(async entry => {\n        if (entry.isIntersecting) {\n          const currentPage = (0,_lib_html_utils__WEBPACK_IMPORTED_MODULE_2__.getParameter)('page');\n          onSearchProducts({ q: searchInput.value, page: +currentPage + 1 });\n        }\n      });\n    },\n    {\n      rootMargin: '0px',\n      threshold: [0, 0.25, 0.5, 0.75, 1],\n    }\n  );\n\n  const renderSearchData = html => {\n    const currentPage = (0,_lib_html_utils__WEBPACK_IMPORTED_MODULE_2__.getParameter)('page');\n    const { searchResults } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n    const { searchResults: newSearchResultsContent } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(html, null);\n\n    if (currentPage === '1') {\n      searchResults.innerHTML = newSearchResultsContent.innerHTML;\n      return;\n    }\n    searchResults.insertAdjacentHTML('beforeEnd', newSearchResultsContent.innerHTML);\n  };\n\n  const updateProductsCount = html => {\n    const { productsCount } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n    const { productsCount: newProductsCountContent } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(html, null);\n    productsCount.innerHTML = newProductsCountContent.innerHTML;\n  };\n\n  const clearSearchResults = () => {\n    const { searchResults } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n    searchResults.innerHTML = '';\n  };\n\n  const onStartLoadingState = () => {\n    const { searchResults, loader, empty } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n    empty.classList.add('hidden');\n    loader.classList.remove('hidden');\n    searchResults.classList.add('hidden');\n  };\n\n  const onEndLoadingState = () => {\n    const { searchResults, loader } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n    loader.classList.add('hidden');\n    searchResults.classList.remove('hidden');\n  };\n\n  const initializeOnFirstRender = () => {\n    const { loadMore } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n    if (loadMore) {\n      observer.observe(loadMore);\n    }\n  };\n\n  const onInputSearch = value => {\n    searchContainer.classList[value ? 'add' : 'remove']('is-active');\n\n    if (value) {\n      onSearchProducts({ q: value, page: 1 });\n      onStartLoadingState();\n      return;\n    }\n\n    const uri = getQueryString({ page: 1, q: '', sortBy: sortByOptions.value }).toString();\n    (0,_lib_html_utils__WEBPACK_IMPORTED_MODULE_2__.updateURLHash)(uri);\n  };\n\n  const onChangeSortBy = e => {\n    const { productsContainer } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n    productsContainer.classList.add('is-loading');\n\n    const sortBy = e.target.value;\n    onSearchProducts({ q: searchInput.value, page: (0,_lib_html_utils__WEBPACK_IMPORTED_MODULE_2__.getParameter)('page'), sortBy });\n  };\n\n  searchInput.addEventListener('input', e => onInputSearch(e.target.value));\n  sortByOptions.addEventListener('change', onChangeSortBy);\n\n  ctx.on('search:render', (_state, { html, uri, requestedPage }) => {\n    updateProductsCount(html);\n\n    const { searchResults } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(html, null);\n    const { empty, productsContainer } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n    productsContainer.classList.remove('is-loading');\n    const isEmpty = !searchResults.childNodes.length;\n    if (isEmpty) {\n      if (requestedPage === 1) {\n        clearSearchResults();\n        empty.classList.remove('hidden');\n      }\n      onEndLoadingState();\n      return;\n    }\n\n    (0,_lib_html_utils__WEBPACK_IMPORTED_MODULE_2__.updateURLHash)(uri);\n    renderSearchData(html);\n    empty.classList.add('hidden');\n    if (requestedPage === 1) {\n      initializeOnFirstRender();\n      onEndLoadingState();\n    }\n    window.app.mount();\n  });\n\n  const currentPage = (0,_lib_html_utils__WEBPACK_IMPORTED_MODULE_2__.getParameter)('page');\n  const searchValue = (0,_lib_html_utils__WEBPACK_IMPORTED_MODULE_2__.getParameter)('q');\n  if ((currentPage && currentPage !== '1') || searchValue) {\n    searchContainer.classList.add('is-active');\n    searchInput.value = searchValue;\n    onInputSearch(searchValue);\n    setTimeout(() => window.scrollTo(0, 0), 100);\n  }\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/sections/search.js?");

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

/***/ "./scripts/lib/debounce.js":
/*!*********************************!*\
  !*** ./scripts/lib/debounce.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction debounce(func, timeout = 300) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => {\n      func.apply(this, args);\n    }, timeout);\n  };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (debounce);\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/debounce.js?");

/***/ }),

/***/ "./scripts/lib/html.utils.js":
/*!***********************************!*\
  !*** ./scripts/lib/html.utils.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchHtml\": () => (/* binding */ fetchHtml),\n/* harmony export */   \"getParameter\": () => (/* binding */ getParameter),\n/* harmony export */   \"updateURLHash\": () => (/* binding */ updateURLHash),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst fetchHtml = async url =>\n  fetch(url)\n    .then(response => response.text())\n    .then(responseText => new DOMParser().parseFromString(responseText, 'text/html'));\n\nconst getParameter = paramName => {\n  const searchString = window.location.search.substring(1);\n  let i;\n  let val;\n  const params = searchString.split('&');\n\n  for (i = 0; i < params.length; i++) {\n    val = params[i].split('=');\n    if (val[0] === paramName) {\n      return val[1];\n    }\n  }\n  return null;\n};\n\nconst updateURLHash = searchParams =>\n  // eslint-disable-next-line no-restricted-globals\n  history.pushState(\n    { searchParams },\n    '',\n    `${window.location.pathname}${\n      searchParams.includes('?') ? searchParams : '?'.concat(searchParams)\n    }`\n  );\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  fetchHtml,\n  getParameter,\n  updateURLHash,\n});\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/lib/html.utils.js?");

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