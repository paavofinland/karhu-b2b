<<<<<<< HEAD
(()=>{"use strict";function e(e=document.body,t){const s=[...e.querySelectorAll(t?`[class*="${t}"]`:"*")],d=t?"classList":"dataset";return s.reduce(((e,s)=>([].slice.call(t?s[d]:Object.entries(s[d])).forEach((d=>{let a;t&&d.slice(0,t.length)===t?a=d.slice(t.length,d.length):t||([a]=d),a&&(e[a]=e.hasOwnProperty(a)?e[a].constructor===Array?e[a].concat(s):[e[a],s]:s)})),e)),{})}function t(){return JSON.parse(document.querySelector("script#liquid-variables").innerHTML)}const s={login:window.component((t=>{const{loginForm:s,recoverPasswordForm:d,toggleRecoverPasswordBtns:a,recoverMessageSent:n,recoverPasswordSuccess:o,emailList:c}=e(t,null),r=()=>{s.classList.toggle("hidden"),d.classList.toggle("hidden")};a.forEach((e=>{e.addEventListener("click",r)}));const i=()=>{const e=document.querySelector(".errors");e&&(e.style.display="none")};c.forEach((e=>{e.addEventListener("focus",i),e.addEventListener("keyup",i)})),(()=>{const{hash:e}=window.location;return"#recover"===e})()&&!n&&r(),n&&(s.classList.add("hidden"),d.classList.add("hidden"),o.classList.remove("hidden"))})),account:window.component((t=>{const{addAddressButton:s,resetPageButton:d,editAddressButton:a,addAddress:n,info:o,addresses:c,editAddresses:r,editAddressForm:i,makeDefaultButton:l,tabLink:u,tab:h}=e(t,null),m=[].concat(h).filter(Boolean),L=[].concat(u).filter(Boolean),v=m.map((e=>e.dataset.tab)),p=new URLSearchParams(window.location.search).get("t"),f=p&&v.includes(p)?p:v[0];m.forEach((e=>e.classList[f===e.dataset.tab?"remove":"add"]("hidden"))),L.forEach((e=>e.classList[f===e.dataset.tabLink?"add":"remove"]("is-active")));const w=e=>{e.preventDefault(),o.classList.remove("hidden"),c.classList.remove("hidden"),n.classList.add("hidden"),r.classList.add("hidden"),[].concat(i).forEach((e=>e.classList.add("hidden"))),window.scrollTo(0,0)};s&&s.addEventListener("click",(e=>{e.preventDefault(),n.classList.remove("hidden"),o.classList.add("hidden"),c.classList.add("hidden"),window.scrollTo(0,0)})),d&&[].concat(d).forEach((e=>{e.addEventListener("click",w)})),a&&[].concat(a).forEach((e=>{e.addEventListener("click",(t=>{t.preventDefault();const{addressId:s}=e.dataset;c.classList.add("hidden"),o.classList.add("hidden");const d=[].concat(i).find((e=>e.dataset.addressId===s));r.classList.remove("hidden"),d.classList.remove("hidden"),window.scrollTo(0,0)}))})),l&&[].concat(l).forEach((e=>{e.addEventListener("click",(e=>{const{addressId:t}=e.target.dataset,s=i.find((e=>e.dataset.addressId===t)).querySelector("form");s.querySelector('input[type="checkbox"]').click(),s.submit()}))}))})),address:window.component((t=>{const{deleteAddressButton:s,deleteAddressModal:d,closeModal:a,deleteAddressConfirm:n}=e(t,null);a&&[].concat(a).forEach((e=>e.addEventListener("click",(e=>{e.preventDefault(),d.classList.remove("open")})))),s&&s.addEventListener("click",(e=>{e.preventDefault(),d.classList.add("open")})),n&&n.addEventListener("click",(()=>{document.getElementById(`delete-address-form--${n.dataset.addressId}`).submit()}))})),orders:window.component((async(s,d)=>{const{store:{store:a,currencies:n},customer:{secret:o,id:c}}=t(),{selectCustomer:r,ordersContainer:i,noOrders:l,customerSelectText:u,ordersTable:h,ordersTableRow:m,ordersBlockContainer:L,ordersBlock:v,orders:p}=e(s),f=({container:t,containerItem:s,orderList:d})=>{t.innerHTML="";const a=document.createDocumentFragment();d.forEach((t=>{const d=s.content.cloneNode(!0);Object.keys(t).map((e=>[e,t[e]])).map((([e,t])=>"currencyCode"===e?[e,n.find((({iso_code:e})=>e===t))?.symbol||t]:[e,t])).forEach((([t,s])=>{[].concat(e(d)[t]).filter(Boolean).forEach((e=>{e instanceof HTMLAnchorElement?e.href=s:e.innerText=s}))})),a.appendChild(d)})),t.appendChild(a)},w=async e=>{if(""===e)l.classList.add("hidden"),u.classList.remove("hidden"),p.classList.add("hidden");else{console.log("loadddd"),l.classList.add("hidden"),i.classList.add("hidden"),p.classList.add("is-active"),p.classList.remove("hidden"),u&&u.classList.add("hidden");const t=await(async e=>{const t=new URLSearchParams({store:a,secret:o,customerId:c,selectedCustomerId:e||""});return fetch(`https://karhu-b2b-functions.vercel.app/api/customer/get-store-customer-orders?${t}`).then((async e=>200===e.status?e.json():(console.error(`Could not fetch customer orders [${(await e.json()).message}]`),[])))})(e);if(p.classList.remove("is-active"),!t.length)return void l.classList.remove("hidden");console.log(t),i.classList.remove("hidden"),f({container:h,containerItem:m,orderList:t}),f({container:L,containerItem:v,orderList:t})}};if(r){const{select:t}=e(r);t.classList.add("is-loading"),t.disabled=!0,t.addEventListener("change",(e=>w(e.target.value))),d.on("agent-stores:received",((e,{data:s})=>{t.classList.add("is-active"),t.removeAttribute("disabled"),t.classList.remove("is-loading"),t.disabled=!1;const d=document.createDocumentFragment();s.forEach((e=>{const t=document.createElement("option");t.value=e.id,t.innerText=e.name,d.appendChild(t)})),t.appendChild(d)}))}else w()})),accountCarts:window.component(((s,d)=>{window.location.search.includes("menu=carts")&&s.classList.remove("hidden");const{store:{store:a},customer:{secret:n,id:o}}=t(),{deleteCartBtn:c,deleteCartPopupBtn:r,cart:i,cartsLength:l,cartsCount:u,container:h,empty:m}=e(s,null),L=e=>{e.target.classList.toggle("is-active"),document.body.classList.toggle("pointer-events-none")};c&&[].concat(c).forEach((e=>e.addEventListener("click",(e=>{r.dataset.id=e.currentTarget.dataset.id,d.emit("popup:open",null,"delete-cart")})))),r&&r.addEventListener("click",(async e=>{const t=r.dataset.id,s=(e=>new URLSearchParams({store:a,secret:n,customerId:o,cartId:encodeURI(e)}))(t);L(e);try{await(e=>fetch(`https://karhu-b2b-functions.vercel.app/api/customer/delete-cart?${e}`,{method:"POST"}).then((async e=>{if(console.log(e.status),202===e.status)return e;throw new Error(e.message)})))(s),(e=>{[].concat(i).filter((t=>t.dataset.cart===e)).forEach((e=>e.remove()))})(t),0===(()=>{const e=parseFloat(l.innerText)-1;return e>0?l.innerText=e:u.classList.add("hidden"),e})()&&(m.classList.remove("hidden"),[].concat(h).forEach((e=>e.remove())))}catch(e){console.log(e)}finally{r.dataset.id="",d.emit("popup:close",null,"delete-cart"),L(e)}}))}))};window.app.add(s),window.app.mount()})();
=======
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

/***/ "./scripts/components/account/accountCarts.js":
/*!****************************************************!*\
  !*** ./scripts/components/account/accountCarts.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n/* harmony import */ var _lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/get-liquid-variables */ \"./scripts/lib/get-liquid-variables.js\");\n/* eslint-disable no-param-reassign */\n/* eslint-disable no-unused-expressions */\n\n\n\nconst deleteCart = query => {\n  return fetch(`${\"http://localhost:3000/api\"}/customer/delete-cart?${query}`, {\n    method: 'POST',\n  }).then(async res => {\n    console.log(res.status);\n    if (res.status === 202) return res;\n    throw new Error(res.message);\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component((node, ctx) => {\n  if (window.location.search.includes('menu=carts')) {\n    node.classList.remove('hidden');\n  }\n\n  const {\n    store: { store },\n    customer: { secret: customerSecret, id: customerId },\n  } = (0,_lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_1__.default)();\n\n  const {\n    deleteCartBtn,\n    deleteCartPopupBtn,\n    cart,\n    cartsLength,\n    cartsCount,\n    container,\n    empty,\n    viewCartBtn,\n  } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node, null);\n\n  const toggleLoadingDeleteState = e => {\n    e.target.classList.toggle('is-active');\n    document.body.classList.toggle('pointer-events-none');\n  };\n\n  const updateCartCount = () => {\n    const cartCount = parseFloat(cartsLength.innerText);\n    const newCartCount = cartCount - 1;\n\n    if (newCartCount > 0) {\n      cartsLength.innerText = newCartCount;\n    } else {\n      cartsCount.classList.add('hidden');\n    }\n\n    return newCartCount;\n  };\n\n  const removeCarts = cartId => {\n    const cartElemsToRemove = [].concat(cart).filter(cartElem => cartElem.dataset.cart === cartId);\n    cartElemsToRemove.forEach(elem => elem.remove());\n  };\n\n  const getQueryParams = cartId => {\n    return new URLSearchParams({\n      store,\n      secret: customerSecret,\n      customerId,\n      cartId: encodeURI(cartId),\n    });\n  };\n\n  deleteCartBtn &&\n    [].concat(deleteCartBtn).forEach(btn =>\n      btn.addEventListener('click', e => {\n        deleteCartPopupBtn.dataset.id = e.currentTarget.dataset.id;\n        ctx.emit('popup:open', null, 'delete-cart');\n      })\n    );\n\n  deleteCartPopupBtn &&\n    deleteCartPopupBtn.addEventListener('click', async e => {\n      const cartId = deleteCartPopupBtn.dataset.id;\n      const query = getQueryParams(cartId);\n      toggleLoadingDeleteState(e);\n      try {\n        await deleteCart(query);\n        removeCarts(cartId);\n        const newCartCount = updateCartCount();\n        if (newCartCount === 0) {\n          empty.classList.remove('hidden');\n          [].concat(container).forEach(elem => elem.remove());\n        }\n      } catch (err) {\n        console.log(err);\n      } finally {\n        deleteCartPopupBtn.dataset.id = '';\n        ctx.emit('popup:close', null, 'delete-cart');\n        toggleLoadingDeleteState(e);\n      }\n    });\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/account/accountCarts.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login */ \"./scripts/components/account/login.js\");\n/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./account */ \"./scripts/components/account/account.js\");\n/* harmony import */ var _address__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./address */ \"./scripts/components/account/address.js\");\n/* harmony import */ var _orders__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./orders */ \"./scripts/components/account/orders.js\");\n/* harmony import */ var _accountCarts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./accountCarts */ \"./scripts/components/account/accountCarts.js\");\n\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  login: _login__WEBPACK_IMPORTED_MODULE_0__.default,\n  account: _account__WEBPACK_IMPORTED_MODULE_1__.default,\n  address: _address__WEBPACK_IMPORTED_MODULE_2__.default,\n  orders: _orders__WEBPACK_IMPORTED_MODULE_3__.default,\n  accountCarts: _accountCarts__WEBPACK_IMPORTED_MODULE_4__.default,\n});\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/account/components.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_choozy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/choozy */ \"./scripts/lib/choozy.js\");\n/* harmony import */ var _lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/get-liquid-variables */ \"./scripts/lib/get-liquid-variables.js\");\n/* eslint-disable no-param-reassign */\n/* eslint-disable no-unused-expressions */\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.component(async (node, ctx) => {\n  if (!window.location.search.includes('menu=carts')) {\n    node.classList.remove('hidden');\n  }\n\n  const {\n    store: { store, currencies },\n    customer: { secret: customerSecret, id: customerId },\n  } = (0,_lib_get_liquid_variables__WEBPACK_IMPORTED_MODULE_1__.default)();\n\n  const {\n    selectCustomer: selectCustomerContainer,\n    ordersContainer,\n    noOrders,\n    customerSelectText,\n    ordersTable,\n    ordersTableRow,\n    ordersBlockContainer,\n    ordersBlock,\n    orders,\n  } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(node);\n\n  const getCustomerOrders = async customer => {\n    const query = new URLSearchParams({\n      store,\n      secret: customerSecret,\n      customerId,\n      selectedCustomerId: customer || '',\n    });\n\n    return fetch(`${\"http://localhost:3000/api\"}/customer/get-store-customer-orders?${query}`).then(\n      async res => {\n        if (res.status === 200) return res.json();\n        console.error(`Could not fetch customer orders [${(await res.json()).message}]`);\n        return [];\n      }\n    );\n  };\n\n  const appendHtmlWithOrders = ({ container, containerItem, orderList }) => {\n    // eslint-disable-next-line no-param-reassign\n    container.innerHTML = '';\n    const fragment = document.createDocumentFragment();\n    orderList.forEach(order => {\n      const newElement = containerItem.content.cloneNode(true);\n      Object.keys(order)\n        .map(key => [key, order[key]])\n        .map(([key, value]) => {\n          if (key === 'currencyCode')\n            return [key, currencies.find(({ iso_code: code }) => code === value)?.symbol || value];\n\n          return [key, value];\n        })\n        .forEach(([key, value]) => {\n          []\n            .concat((0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(newElement)[key])\n            .filter(Boolean)\n            .forEach(element => {\n              if (element instanceof HTMLAnchorElement) {\n                element.href = value;\n              } else {\n                element.innerText = value;\n              }\n            });\n        });\n      fragment.appendChild(newElement);\n    });\n    container.appendChild(fragment);\n  };\n\n  const loading = () => {\n    noOrders.classList.add('hidden');\n    ordersContainer.classList.add('hidden');\n    orders.classList.add('is-active');\n    orders.classList.remove('hidden');\n\n    if (customerSelectText) customerSelectText.classList.add('hidden');\n  };\n\n  const reset = () => {\n    noOrders.classList.add('hidden');\n    customerSelectText.classList.remove('hidden');\n    orders.classList.add('hidden');\n  };\n\n  const onSelectCustomer = async customer => {\n    if (customer === '') {\n      reset();\n    } else {\n      console.log('loadddd');\n      loading();\n      const orderList = await getCustomerOrders(customer);\n      orders.classList.remove('is-active');\n      if (!orderList.length) {\n        noOrders.classList.remove('hidden');\n        return;\n      }\n      console.log(orderList);\n      ordersContainer.classList.remove('hidden');\n      appendHtmlWithOrders({ container: ordersTable, containerItem: ordersTableRow, orderList });\n      appendHtmlWithOrders({\n        container: ordersBlockContainer,\n        containerItem: ordersBlock,\n        orderList,\n      });\n    }\n  };\n\n  if (selectCustomerContainer) {\n    const { select: selectCustomer } = (0,_lib_choozy__WEBPACK_IMPORTED_MODULE_0__.default)(selectCustomerContainer);\n\n    selectCustomer.classList.add('is-loading');\n    selectCustomer.disabled = true;\n\n    selectCustomer.addEventListener('change', e => onSelectCustomer(e.target.value));\n    ctx.on('agent-stores:received', (_state, { data }) => {\n      selectCustomer.classList.add('is-active');\n      selectCustomer.removeAttribute('disabled');\n\n      selectCustomer.classList.remove('is-loading');\n      selectCustomer.disabled = false;\n\n      const documentFragment = document.createDocumentFragment();\n      data.forEach(customer => {\n        const option = document.createElement('option');\n        option.value = customer.id;\n        option.innerText = customer.name;\n        documentFragment.appendChild(option);\n      });\n      selectCustomer.appendChild(documentFragment);\n    });\n  } else {\n    onSelectCustomer();\n  }\n}));\n\n\n//# sourceURL=webpack://shopify-starter/./scripts/components/account/orders.js?");

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
>>>>>>> 5799c45 (feat: include query in url for login redirect)
