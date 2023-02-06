(()=>{"use strict";const e=e=>new Promise((t=>{window?.hasLoaded?.scripts?.[e]?t():window.app.on(`${e}:loaded`,t)}));function t(e=document.body,t){const n=[...e.querySelectorAll(t?`[class*="${t}"]`:"*")],o=t?"classList":"dataset";return n.reduce(((e,n)=>([].slice.call(t?n[o]:Object.entries(n[o])).forEach((o=>{let a;t&&o.slice(0,t.length)===t?a=o.slice(t.length,o.length):t||([a]=o),a&&(e[a]=e.hasOwnProperty(a)?e[a].constructor===Array?e[a].concat(n):[e[a],n]:n)})),e)),{})}const n=window.component((async n=>{const{slider:o,slide:a,prev:s,next:r}=t(n,null);if(a.length>1){await e("Swiper");const t=new Swiper(o,{slidesPerView:1,loop:!0,on:{afterInit:e=>{e.wrapperEl.classList.remove("overflow-hidden","flex")}}});s.addEventListener("click",(()=>t.slidePrev())),r.addEventListener("click",(()=>t.slideNext()))}})),o=()=>{window.app.unmount(),window.app.mount()},a=async e=>fetch(`${window.Shopify.routes.root}cart/update.js`,{method:"POST",body:e}),s=window.component((async(e,n)=>{const{itemCount:s}=e.dataset,{removeForm:r,storeId:i,attributeInput:c,noteInput:d,goToCheckoutBtn:l}=t(e);[...[].concat(c).filter(Boolean),d].forEach((e=>e.addEventListener("blur",(async e=>{await a(new FormData(e.target.form))})))),n.on("cart-edit-drawer:toggle",((t,n=!1)=>e.classList[!1===n?"add":"remove"]("is-loading:opacity-50","is-loading:pointer-events-none"))),n.emit("cart:update",null,{count:s}),n.on("cart:loading",((t,n=!1)=>{e.classList[n?"add":"remove"]("is-loading")})),n.on("cart:render",(async()=>{const{"main-cart":t}=await fetch(`${window.location.origin+window.location.pathname}?sections=main-cart`).then((e=>e.json()));e.innerHTML=t,o(),n.emit("cart:loading"),n.emit("cart-edit-drawer:toggle")})),n.on("store:change",((e,{id:t})=>{t&&(i.setAttribute("value",t),l.removeAttribute("disabled"))})),[].concat(r).filter(Boolean).forEach((e=>e.addEventListener("submit",(async e=>{e.preventDefault(),n.emit("cart:loading",null,!0),console.log(new FormData(e.target)),await a(new FormData(e.target)),n.emit("cart:render")}))))})),r=async(e,t)=>fetch(`https://karhu-b2b-functions.vercel.app/api${e}`,t).then((async e=>{const t=await(async e=>e.json().catch((e=>null)))(e);if(!e.ok||e.status>=400&&e.status<500&&404!==e.status)throw Error(t.message||"Something went wrong, please try again later.");return t})).catch((t=>{throw console.info(`⚡️⚠️ Function error [${e}]`),t}));function i(){return JSON.parse(document.querySelector("script#liquid-variables").innerHTML)}const c=e=>{console.error("Error:",e),document.body.classList.remove("pointer-events-none")},d=i(),l=window.component((async(e,n)=>{const{productTemplate:o,productContainer:a,loader:s,section:i,addToBagBtn:l,closePopupBtn:u,addToBagPopupBtn:p,addToBagForm:m,content:w,productsError:g,shareCartBtn:h}=t(e);n.on("cart:loaded",(()=>{s.classList.add("hidden"),i.classList.remove("hidden")}));const v=(()=>{const{store:{store:e},customer:{secret:t,id:n}}=d,{agentId:o,cartId:a}=(()=>{const e=new URL(window.location.href),t=e.searchParams.get("agentId"),n=e.searchParams.get("cartId");return{...t&&{agentId:t},...n&&{cartId:n}}})();return new URLSearchParams({store:e,secret:t,customerId:n,agentId:o,cartId:a})})();["agentId","cartId"].every((e=>Array.from(v.keys()).includes(e)))||(window.location=window.Shopify.routes.root);try{const{name:s,products:i,subtotal:c,currencyCode:l}=await(e=>r(`/customer/get-cart-products?${e}`).catch((e=>{throw console.info("[unhandled error]"),Error("Shared shopping bag could not be found. The link is invalid or has expired.")})))(v),u=(e=>d.store.currencies.find((({iso_code:t})=>t===e))?.symbol||e)(l);((e,n)=>{a.innerHTML="";const s=document.createDocumentFragment();e.forEach((e=>(({title:e,image:n,price:a,id:s,variants:r,currencySymbol:i},c)=>{const d=o.content.cloneNode(!0),{item:l,titleElem:u,priceElem:p,image:m,imagePlaceholder:w,currencyElem:g,quantityContainer:h,productSharedDataTemplate:v}=t(d,null);l.dataset.id=s,u.innerText=e,u.setAttribute("title",e),p.innerText=new Intl.NumberFormat("de-DE",{minimumFractionDigits:2}).format(a),g.innerText=i,n&&(m.src=n,w.remove()),r.forEach((e=>(({quantity:e,id:n,title:o},a,s)=>{const r=a.content.cloneNode(!0),{quantityElem:i,sizeElem:c,inputId:d,inputQuantity:l}=t(r,null);i.innerText=e,c.innerText=`${o}:`,d.value=n,l.value=e,s.appendChild(r)})(e,v,h))),c.appendChild(d)})({...e,currencySymbol:n},s))),a.appendChild(s)})(i,u);const{cartTitle:p,subtotal:m,currency:w}=t(e,null);p.innerText=s,m.innerText=new Intl.NumberFormat("de-DE",{minimumFractionDigits:2}).format(c.toFixed(2)),w.innerText=u}catch(e){w.classList.add("is-active"),g.innerText=e.message}finally{n.emit("cart:loaded")}const f=e=>{e.preventDefault(),n.emit("popup:close",null,"add-to-bag")};l&&l.addEventListener("click",(()=>n.emit("popup:open",null,"add-to-bag"))),u&&[].concat(u).forEach((e=>e.addEventListener("click",f))),p&&p.addEventListener("click",(async()=>{p.classList.add("is-active"),document.body.classList.add("pointer-events-none"),await fetch(`${window.Shopify.routes.root}cart/clear.js`,{method:"POST"}).then((e=>e.json())).catch(c);const e=new FormData(m);var t;await(t=e,fetch(`${window.Shopify.routes.root}cart/add.js`,{method:"POST",body:t}).then((e=>e.json())).catch(c)),window.location.replace(`${window.location.origin}/cart`)})),h&&h.addEventListener("click",(async()=>{await navigator.clipboard.writeText(window.location.href),h.classList.add("is-active"),setTimeout((()=>{h.classList.remove("is-active")}),2e3)}))})),u=window.component((async n=>{const{slider:o}=t(n,null);await e("Swiper");const a=new Swiper(o,{slidesPerView:1.4,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16,breakpoints:{768:{slidesPerView:2.2,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16},1024:{slidesPerView:2.4,spaceBetween:60,slidesOffsetBefore:0,slidesOffsetAfter:0},1440:{slidesPerView:3,spaceBetween:60,slidesOffsetBefore:0,slidesOffsetAfter:0}}});return o.classList.add("is-loaded"),a})),p=e=>{let t,n;const o=window.location.search.substring(1).split("&");for(t=0;t<o.length;t++)if(n=o[t].split("="),n[0]===e)return n[1];return null},m=e=>history.pushState({searchParams:e},"",`${window.location.pathname}${e.includes("?")?e:"?".concat(e)}`),w=({page:e,q:t,sortBy:n})=>{const o=new URLSearchParams(window.location.search);return o.set("page",e),o.set("q",t),o.set("sort_by",n),o},g=e=>function(e,t=300){let n;return(...o)=>{clearTimeout(n),n=setTimeout((()=>{e.apply(this,o)}),t)}}((async t=>{const{page:n,q:o,sortBy:a}=(({page:e,q:t,sortBy:n})=>({page:e||p("page"),q:t||p("q"),sortBy:n||p("sort_by")}))(t),s=w({page:n,q:o,sortBy:a});s.set("sectionId",e),s.set("type","product");const r=s.toString(),i=await(async e=>fetch(e).then((e=>e.text())).then((e=>(new DOMParser).parseFromString(e,"text/html"))))(`${window.location.origin+window.location.pathname}?${r}`);window.app.emit("search:render",null,{html:i,uri:r,requestedPage:n})})),h={hero:n,cart:s,shareCart:l,categoryOverview:u,search:window.component((async(e,n)=>{const{searchInput:a,searchContainer:s,sortByOptions:r,closeSearch:i}=t(e,null),c=g(e.dataset.sectionId),d=new IntersectionObserver((e=>{e.forEach((async e=>{if(e.isIntersecting){const e=p("page");c({q:a.value,page:+e+1})}}))}),{rootMargin:"0px",threshold:[0,.25,.5,.75,1]}),l=n=>{const{productsCount:o}=t(e,null);o.innerText=n},u=()=>{const{searchResults:n}=t(e,null);n.innerHTML=""},h=()=>{const{searchResults:n,loader:o}=t(e,null);o.classList.add("hidden"),n.classList.remove("hidden")},v=n=>{if(s.classList[n?"add":"remove"]("is-active"),n)return c({q:n,page:1}),void(()=>{const{searchResults:n,loader:o,empty:a}=t(e,null);a.classList.add("hidden"),o.classList.remove("hidden"),n.classList.add("hidden")})();u(),l("No results found");const o=w({page:1,q:"",sortBy:r.value}).toString();m(o)};a.addEventListener("input",(e=>v(e.target.value))),r.addEventListener("change",(n=>{const{productsContainer:o}=t(e,null);o.classList.add("is-loading");const s=n.target.value;c({q:a.value,page:p("page"),sortBy:s})})),i.addEventListener("click",(()=>s.classList.add("is-active"))),n.on("search:render",((n,{html:a,uri:s,requestedPage:r})=>{const i=(e=>{const{productsCount:n}=t(e,null);return n.innerText})(a);l(i);const{searchResults:c}=t(a,null),{empty:w,productsContainer:g}=t(e,null);if(g.classList.remove("is-loading"),!c.childNodes.length)return 1===r&&(u(),w.classList.remove("hidden")),void h();m(s),(n=>{const o=p("page"),{searchResults:a}=t(e,null),{searchResults:s}=t(n,null);"1"!==o?a.insertAdjacentHTML("beforeEnd",s.innerHTML):a.innerHTML=s.innerHTML})(a),w.classList.add("hidden"),1===r&&((()=>{const{loadMore:n}=t(e,null);n&&d.observe(n)})(),h()),o()}));const f=p("page"),y=p("q");(f&&"1"!==f||y)&&(s.classList.add("is-active"),a.value=y,v(y),setTimeout((()=>window.scrollTo(0,0)),100))}))},v=window.component(((e,n)=>{const{group:o}=e.dataset,{inner:a,toggle:s,shrinkBtn:r,expandBtn:i,toggleModalBtn:c}=t(e,null),d="is-active",l=()=>{e.style.setProperty("--innerHeight","auto"),e.style.setProperty("--innerHeight",`${a.scrollHeight}px`)};l(),window.addEventListener("resize",l,{passive:!0}),s.addEventListener("click",(()=>{n.emit("accordion:toggle",null,{open:!e.classList.contains(d),node:e,group:o})})),c&&c.addEventListener("click",(e=>{n.emit("modal:open",{type:e.target.dataset.modalType})})),n.on("accordion:toggle",((t,n={})=>{o===n.group&&(e.classList[n.open&&n.node===e?"add":"remove"](d),r.classList.toggle("hidden"),r.classList.toggle("flex"),i.classList.toggle("hidden"),i.classList.toggle("block"))}))})),f=window.component((e=>{const{hamburger:n,hamburgerOpened:o,hamburgerClosed:a,mobileMenu:s,main:r}=t(e),{clear:i}=e.dataset,c=document.querySelector("#shopify-section-announcement-bar").offsetHeight||0,d=()=>{void 0!==i&&r.classList[!o.classList.contains("hidden")||window.scrollY>c?"add":"remove"]("is-active")};window.addEventListener("scroll",d,{passive:!0}),window.addEventListener("load",d),n.addEventListener("click",(()=>{o.classList.toggle("hidden"),a.classList.toggle("hidden"),document.body.classList.toggle("overflow-hidden"),s.classList.toggle("left-0"),d()}));const l=()=>{s.style.height=window.innerHeight-c-s.parentElement.offsetHeight+"px"};l(),window.addEventListener("resize",l)})),y=window.component((async(e,t)=>{})),L=window.component(((e,n)=>{const{productId:o}=e.dataset;if(!o)return;const{edit:a}=t(e);a.addEventListener("click",(()=>n.emit("cart-edit-drawer:toggle",null,o)))})),E=window.component(((e,n)=>{const{closeModalBtn:o}=t(e,null),a=()=>{e.classList.toggle("flex"),e.classList.toggle("hidden"),document.body.classList.toggle("overflow-hidden")};e.addEventListener("click",(e=>{e.target.dataset.modalType&&a()}),{capture:!0}),o.addEventListener("click",a),n.on("modal:open",(t=>{e.dataset.modalType===t.type&&a()}))})),b=window.component(((e,n)=>{const{select:o}=t(e),a=()=>{const e=o.options[o.selectedIndex];e.dataset.url?window.location.href=`${e.dataset.url}?country_code=${e.value}`:o.form.submit()};o.addEventListener("change",(()=>a())),n.on("country:revalidate",((e,{countryCode:t})=>{const n=o.dataset.current;Array.from(o.options).map((({value:e})=>e)).includes(t)?n!==t&&(console.info(`🌎 Switching to [${t}]`),o.value=t,a()):console.info(`🌎 Can't switch to invalid country [${t}]`)})),console.info(`🌎 Shopping in [${o.dataset.current}]`);const s=new URLSearchParams(window.location.search).get("country_code");n.emit("country:revalidate",null,{countryCode:s||o.dataset.storeCustomer||o.dataset.current})})),T="agent-stores:loading",S="selectedStoreCustomer",B=window.component((async(e,n)=>{const o=localStorage.getItem(S);o&&n.emit("store:change",null,{id:o});const{store:{store:a},customer:{secret:s,id:c}}=i(),{selectCustomer:d}=t(e,null),{select:l}=t(d,null);n.on(T,((e,t=!0)=>{l.classList[t?"add":"remove"]("is-loading"),l.disabled=t})),n.emit(T,null,!0),l.addEventListener("change",(async e=>{const t=e.target.value,{countryCode:o}=e.target.options[e.target.selectedIndex].dataset;localStorage.setItem(S,t),localStorage.removeItem("selectedShippingAddress"),localStorage.removeItem("selectedBillingAddress"),n.emit("store:change",null,{id:t}),n.emit("country:revalidate",null,{countryCode:o})})),await(async()=>{const e=await(async(e,t,n)=>{const o=new URLSearchParams({store:e,customerId:t,secret:n});return r(`/customer/list-agent-stores?${o}`).catch((e=>(console.info("[unhandled error]"),[])))})(a,c,s);if(n.emit(T,null,!1),n.emit("agent-stores:received",null,{data:e}),!e.length)return void l.setAttribute("disabled",!0);(e=>{const t=document.createDocumentFragment();e.forEach((e=>{const n=document.createElement("option");o===e.id&&n.setAttribute("selected",!0),n.value=e.id,n.innerText=e.name,n.setAttribute("data-customer-select-option",""),n.setAttribute("data-country-code",e.countryCode||"NL"),t.appendChild(n)})),l.appendChild(t)})(e);const t=e.find((({id:e})=>e===o));if(!t){const{id:t}=e[0];return l.setAttribute("value",t),void l.dispatchEvent(new Event("change"))}n.emit("store:change",null,{id:t.id});const{countryCode:i}=t;i&&n.emit("country:revalidate",null,{countryCode:i})})()})),I=window.component(((e,n)=>{const{count:o}=t(e);n.on("cart:update",((e,{countAdd:t,count:n})=>{Number.isNaN(Number(n))?t&&(o.innerHTML=Number(o.innerHTML)+t):o.innerHTML=n}))})),k={accordion:v,header:f,cartDrawer:y,cartItem:L,modal:E,countrySelect:b,popup:window.component(((e,n)=>{const{popupOverlay:o,closePopupBtn:a}=t(e,null),s=()=>{e.classList.add("hidden"),document.body.classList.remove("overflow-hidden")};n.on("popup:open",((t,n)=>{e.dataset.popup===n&&(e.classList.remove("hidden"),document.body.classList.add("overflow-hidden"))})),n.on("popup:close",((t,n)=>{e.dataset.popup===n&&s()})),o.addEventListener("click",(e=>{e.currentTarget.dataset.popupOverlay&&s()})),a&&[].concat(a).forEach((e=>e.addEventListener("click",s)))})),storeSelect:B,quickAddButton:window.component((async(e,t)=>{const{productHandle:n}=e.dataset;e.addEventListener("click",(async()=>{e.classList.add("is-loading");const{"quick-add-drawer-content":o}=await fetch(`${window.Shopify.routes.root}products/${n}?sections=quick-add-drawer-content`).then((e=>e.json()));t.emit("quick-add:open",null,{html:o}),e.classList.remove("is-loading")}))})),quickAddDrawer:window.component(((e,n)=>{const{drawer:o,backdrop:a,content:s,closeButton:r}=t(e);let i;const c=()=>{o.classList.remove("is-active"),a.classList.remove("is-active")};n.on("quick-add:open",((e,{html:t})=>{s.innerHTML=t,o.classList.add("is-active"),a.classList.add("is-active"),window.app.unmount(),window.app.mount()})),[a,r].forEach((e=>e.addEventListener("click",c))),n.on("cart:update",(()=>{i&&clearTimeout(i),i=setTimeout((()=>c()),1e3)}))})),cartCount:I,productForm:window.component(((e,n)=>{const{size:o,sizeButton:a,quantityInputs:s,addToCartButton:r,error:c}=t(e),{translations:{server_error:d,select_sizes_error:l}}=i(),u=[].concat(o).filter(Boolean),p=[].concat(a).filter(Boolean),m=[].concat(s).filter(Boolean),{state:w}=t(r),g=[].concat(w),h=(e=!0)=>{g.forEach((t=>{t.style.transition=e?"":"unset"}))},v=(e="")=>{c.innerHTML=e};let f;e.addEventListener("submit",(async e=>{e.preventDefault(),v(),h(),f&&clearTimeout(f),r.classList.add("is-loading"),r.classList.remove("is-active"),r.disabled=!0;const t=new FormData(e.target),o=Array.from(t.entries()).filter((([e])=>e.endsWith("[quantity]"))).map((([,e])=>Number(e)));try{if(0===o.filter((e=>e>0)).length)throw Error(l);const e=await fetch(`${window.Shopify.routes.root}cart/add.js`,{method:"POST",body:t}),a=await e.json();if(200!==e.status&&a.description)throw Error(a.description);if(200!==e.status)throw Error(d);r.classList.remove("is-loading"),r.disabled=!1,n.emit("cart:update",null,{countAdd:o.reduce(((e,t)=>e+t),0)}),r.classList.add("is-active"),f=setTimeout((()=>{h(!1),r.classList.remove("is-active")}),2e3)}catch(e){v(e.message)}r.classList.remove("is-loading"),r.disabled=!1})),m.forEach((e=>{e.addEventListener("keypress",(e=>{v(),"0"===e.target.value&&(e.target.value=e.target.value.slice(1))}))})),p.forEach((e=>e.addEventListener("click",(t=>{const n=t.target.textContent.trim().toLowerCase();u.forEach((e=>{e.innerText=e.dataset[n]})),p.forEach((({classList:e})=>e.remove("is-active"))),e.classList.add("is-active")}))))})),cartEditDrawer:window.component(((e,n)=>{const{productId:o}=e.dataset,{drawer:a,backdrop:s,submit:r,form:i,closeButton:c}=t(e);n.on("cart-edit-drawer:toggle",((e,t=!1)=>{[a,s].forEach((e=>e.classList[t===o?"add":"remove"]("is-active")))})),n.on("cart:loading",((e,t=!1)=>{r.classList[t?"add":"remove"]("is-active")})),[s,c].forEach((e=>e.addEventListener("click",(()=>n.emit("cart-edit-drawer:toggle"))))),i.addEventListener("submit",(async e=>{e.preventDefault(),n.emit("cart:loading",null,!0),await(async e=>fetch(`${window.Shopify.routes.root}cart/update.js`,{method:"POST",body:e}).then((e=>e.json())))(new FormData(e.target)),n.emit("cart:render")}))})),cartSave:window.component(((e,n)=>{const{store:{store:o},customer:{secret:a,id:s,tags:c}}=i(),d=c.find((e=>e.includes("id:"))).split(":").pop(),{saveButton:l,closePopupBtn:u,shareCartPopupBtn:p,saveCartPopupBtn:m,errorMessage:w,cartInput:g,lineItemsJson:h}=t(e),v=e=>{w.innerText=e;const t=Boolean(e||!w);g.setAttribute("aria-invalid",t)};l.addEventListener("click",(()=>n.emit("popup:open",null,"save-cart"))),[].concat(u).forEach((e=>e.addEventListener("click",(e=>{const{type:t}=e.currentTarget.dataset;n.emit("popup:close",null,t),v("")})))),p.addEventListener("click",(async e=>{const{cartId:t}=e.target.dataset,n=`${window.location.origin}/pages/share-cart?agentId=${d}&cartId=${t}`;await navigator.clipboard.writeText(n),p.classList.add("is-active"),setTimeout((()=>{p.classList.remove("is-active")}),2e3)}));const f=()=>{m.classList.toggle("is-active"),document.body.classList.toggle("pointer-events-none")};m.addEventListener("click",(async()=>{if(g.value){f(),v("");try{const{id:e}=await(()=>{const e=new URLSearchParams({store:o,secret:a,customerId:s,agentId:d});return r(`/customer/save-cart?${e}`,{method:"POST",body:JSON.stringify({name:g.value,updated_at:new Date,line_items:JSON.parse(h.innerHTML)})}).catch((async e=>{throw console.info("[unhandled error]"),console.info({res:e}),new Error(e.message)}))})();"save-cart",n.emit("popup:close",null,"save-cart"),v(""),n.emit("popup:open",null,"share-cart"),p.dataset.cartId=e,g.value=""}catch(e){v(e.message)}finally{f()}}else v("Please fill in a name")})),g.addEventListener("input",(e=>{e.target.value&&g.setAttribute("aria-invalid",!1)}))}))};window.app.add(h),window.app.add(k),window.app.mount()})();