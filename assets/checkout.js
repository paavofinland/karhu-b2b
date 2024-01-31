(()=>{"use strict";function e(){return JSON.parse(document.querySelector("script#liquid-variables").innerHTML)}const t=async(e,t)=>fetch(`https://karhu-b2b-functions.vercel.app/api${e}`,t).then((async e=>{const t=await(async e=>e.json().catch((e=>null)))(e);if(!e.ok||e.status>=400&&e.status<500&&404!==e.status)throw Error(t.message||"Something went wrong, please try again later.");return t})).catch((t=>{throw console.info(`⚡️⚠️ Function error [${e}]`),t}));function n(e=document.body,t){const n=[...e.querySelectorAll(t?`[class*="${t}"]`:"*")],r=t?"classList":"dataset";return n.reduce(((e,n)=>([].slice.call(t?n[r]:Object.entries(n[r])).forEach((r=>{let a;t&&r.slice(0,t.length)===t?a=r.slice(t.length,r.length):t||([a]=r),a&&(e[a]=e.hasOwnProperty(a)?e[a].constructor===Array?e[a].concat(n):[e[a],n]:n)})),e)),{})}const r="agent-stores:loading",a="selectedStoreCustomer",o="selectedShippingAddress",s="selectedBillingAddress",c=(window.component((async(c,i)=>{const d=localStorage.getItem(a);d&&i.emit("store:change",null,{id:d});const{store:{store:l},customer:{secret:u,id:m}}=e(),{selectCustomer:g}=n(c,null),{select:p}=n(g,null);i.on(r,((e,t=!0)=>{p.classList[t?"add":"remove"]("is-loading"),p.disabled=t})),i.emit(r,null,!0),p.addEventListener("change",(async e=>{const t=e.target.value,{countryCode:n}=e.target.options[e.target.selectedIndex].dataset;i.emit("cart:clear",null,{onCartClearSuccess:()=>((e,t)=>{localStorage.setItem(a,e),localStorage.removeItem(o),localStorage.removeItem(s),i.emit("store:change",null,{id:e}),i.emit("country:revalidate",null,{countryCode:t})})(t,n)})})),await(async()=>{const e=await(async(e,n,r)=>{const a=new URLSearchParams({store:e,customerId:n,secret:r});return t(`/customer/list-agent-stores?${a}`).catch((e=>(console.info("[unhandled error]"),[])))})(l,m,u);if(i.emit(r,null,!1),i.emit("agent-stores:received",null,{data:e}),!e.length)return void p.setAttribute("disabled",!0);(e=>{const t=document.createDocumentFragment();e.forEach((e=>{const n=document.createElement("option");d===e.id&&n.setAttribute("selected",!0),n.value=e.id,n.innerText=e.name,n.setAttribute("data-customer-select-option",""),n.setAttribute("data-country-code",e.countryCode||"NL"),t.appendChild(n)})),p.appendChild(t)})(e);const n=e.find((({id:e})=>e===d));if(!n){const{id:t}=e[0];return p.setAttribute("value",t),void p.dispatchEvent(new Event("change"))}i.emit("store:change",null,{id:n.id});const{countryCode:a}=n;a&&i.emit("country:revalidate",null,{countryCode:a})})()})),(e,t)=>t.map((t=>e.querySelector(t)))),i={bubbles:!0,cancelable:!1,detail:{shouldTriggerChange:!1}},d={checkout:window.component((n=>{const{skip_payment_discount_code:r,skip_payment_discount_applied:d,store:{store:l},customer:{secret:u,id:m,agent:g=!1}}=e(),[p,h]=c(n,[".order-summary__sections","[data-different-billing-address]"]),y=()=>{const e=e=>{localStorage.setItem(h?s:o,e)},[r,d]=c(n,["[data-address-selector]","[data-address-fields]"]);d&&(d.style.opacity="0.5",d.style.pointerEvents="none",Array.from(r.children).forEach((e=>{e.selected?(e.innerText="Please wait...",e.toggleAttribute("disabled",!0),e.toggleAttribute("selected",!0)):e.remove()})),(async(e,n,r)=>{const o=new URLSearchParams({store:e,customerId:n,secret:r,storeId:localStorage.getItem(a)});return t(`/customer/get-store-customer-addresses?${o}`)})(l,m,u).then((t=>((t,n)=>{const r=document.createDocumentFragment();n.forEach((t=>{r.appendChild((t=>{const n=document.createElement("option");n.value=t.id,n.innerText=(({address1:e,address2:t,zip:n,city:r,country:a,first_name:o,last_name:s,company:c})=>`${e?`${e}, `:" "}${t?`${t}, `:" "}${n?`${n} `:" "}${r?`${r}, `:" "}${a?`${a}, `:" "}${o||s||c?`${o?`${o} `:" "}${s?`${s}, `:" "}${c?`${c} `:""}`:""}`)(t),n.setAttribute("data-properties",JSON.stringify(t));const r=localStorage.getItem(o),a=localStorage.getItem(s),c=r?r===t.id:t.default,i=a?a===t.id:c;return(h?i:c)&&(n.selected=!0,e(t.id)),n})(t))})),t.appendChild(r),t.dispatchEvent(new CustomEvent("change",i)),t.firstElementChild.remove()})(r,t))).finally((()=>{d.style.opacity="1",d.style.pointerEvents="auto"})).catch((e=>{r.firstElementChild.innerText="Something went wrong, please enter your address manually.",r.toggleAttribute("disabled",!0),console.error(e)})),d.addEventListener("change",(t=>{if(t.detail&&!t.detail.shouldTriggerChange)return;if(t.target.dataset.hasOwnProperty("addressSelector"))return void e(t.target.value);const n=localStorage.getItem(o),a=localStorage.getItem(s),c=h?a:n;c&&setTimeout((()=>(e=>{Array.from(r.children).find((t=>t.value===e)).selected=!0,r.dispatchEvent(new CustomEvent("change",i))})(c)))})))};g&&(y(),new MutationObserver((e=>{e.forEach((e=>{const{type:t,addedNodes:n}=e;"childList"===t&&n[0]&&n[0].dataset?.hasOwnProperty("step")&&y()}))})).observe(n,{childList:!0,subtree:!0}));const v=()=>{const[e,t]=c(n,["[data-checkout-subtotal-price-target]",".total-line [data-checkout-payment-due-target]"]);t.innerText!==e.innerText&&(t.innerText=e.innerText)};if(v(),new MutationObserver((e=>{e.forEach((e=>{const{type:t,addedNodes:n}=e;"childList"===t&&n[0]&&(n[0].nodeType===Node.ELEMENT_NODE?n[0].querySelector("[data-checkout-payment-due-target]"):"checkoutPaymentDueTarget"in n[0].parentNode.dataset&&n[0].parentNode)&&v()}))})).observe(p,{childList:!0,subtree:!0}),!d){const[e,t]=c(n,['.order-summary__section--discount [name="checkout[reduction_code]"]','.order-summary__section--discount [name="checkout[submit]"]']);e.value=r,t.click()}})),paymentMethod:window.component((t=>{const{skip_payment_discount_applied:r}=e(),{paymentForm:a}=n(t);a.addEventListener("submit",(e=>{r||(e.preventDefault(),window.alert("Something went wrong, please reload the page and try again."),location.reload())}))}))};window.app.add(d),window.app.mount()})();