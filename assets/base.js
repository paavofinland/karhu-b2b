(()=>{"use strict";const e=e=>new Promise((t=>{window?.hasLoaded?.scripts?.[e]?t():window.app.on(`${e}:loaded`,t)}));function t(e=document.body,t){const n=[...e.querySelectorAll(t?`[class*="${t}"]`:"*")],s=t?"classList":"dataset";return n.reduce(((e,n)=>([].slice.call(t?n[s]:Object.entries(n[s])).forEach((s=>{let o;t&&s.slice(0,t.length)===t?o=s.slice(t.length,s.length):t||([o]=s),o&&(e[o]=e.hasOwnProperty(o)?e[o].constructor===Array?e[o].concat(n):[e[o],n]:n)})),e)),{})}const n=window.component((async n=>{const{slider:s,slide:o,prev:a,next:r}=t(n,null);if(o.length>1){await e("Swiper");const t=new Swiper(s,{slidesPerView:1,loop:!0,on:{afterInit:e=>{e.wrapperEl.classList.remove("overflow-hidden","flex")}}});a.addEventListener("click",(()=>t.slidePrev())),r.addEventListener("click",(()=>t.slideNext()))}})),s=()=>{window.app.unmount(),window.app.mount()},o=window.component((async(e,n)=>{const{itemCount:o}=e.dataset,{removeForm:a,storeId:r}=t(e);n.on("cart-edit-drawer:toggle",((t,n=!1)=>e.classList[!1===n?"add":"remove"]("is-loading:opacity-50","is-loading:pointer-events-none"))),n.emit("cart:update",null,{count:o}),n.on("cart:loading",((t,n=!1)=>{e.classList[n?"add":"remove"]("is-loading")})),n.on("cart:render",(async()=>{const{"main-cart":t}=await fetch(`${window.location.origin+window.location.pathname}?sections=main-cart`).then((e=>e.json()));e.innerHTML=t,s(),n.emit("cart:loading"),n.emit("cart-edit-drawer:toggle")})),n.on("store:change",((e,{id:t})=>{r.setAttribute("value",t)})),[].concat(a).filter(Boolean).forEach((e=>e.addEventListener("submit",(async e=>{console.log("go"),e.preventDefault(),n.emit("cart:loading",null,!0),await(async e=>fetch(`${window.Shopify.routes.root}cart/update.js`,{method:"POST",body:e}))(new FormData(e.target)),n.emit("cart:render")}))))}));function a(){return JSON.parse(document.querySelector("script#liquid-variables").innerHTML)}const r=e=>{console.error("Error:",e),document.body.classList.remove("pointer-events-none")},i=a(),c=window.component((async(e,n)=>{const{productTemplate:s,productContainer:o,loader:a,section:c,addToBagBtn:d,closePopupBtn:l,addToBagPopupBtn:u,addToBagForm:p,content:m,productsError:w,shareCartBtn:h}=t(e);n.on("cart:loaded",(()=>{a.classList.add("hidden"),c.classList.remove("hidden")}));const g=(()=>{const{store:{store:e},customer:{secret:t,id:n}}=i,{agentId:s,cartId:o}=(()=>{const e=new URL(window.location.href),t=e.searchParams.get("agentId"),n=e.searchParams.get("cartId");return{...t&&{agentId:t},...n&&{cartId:n}}})();return new URLSearchParams({store:e,secret:t,customerId:n,agentId:s,cartId:o})})();["agentId","cartId"].every((e=>Array.from(g.keys()).includes(e)))||(window.location=window.Shopify.routes.root);try{const{name:a,products:r,subtotal:i}=await(e=>fetch(`https://karhu-b2b-functions.vercel.app/api/customer/get-cart-products?${e}`).then((async e=>{const t=await e.json();if(200===e.status)return t;throw new Error("Shared shopping bag could not be found. The link is invalid or has expired.")})))(g);(e=>{o.innerHTML="";const n=document.createDocumentFragment();e.forEach((e=>(({title:e,image:n,price:o,id:a,variants:r},i)=>{const c=s.content.cloneNode(!0),{item:d,titleElem:l,priceElem:u,imageElem:p,quantityContainer:m,productSharedDataTemplate:w}=t(c,null);d.dataset.id=a,l.innerText=e,l.setAttribute("title",e),u.innerText=new Intl.NumberFormat("de-DE",{minimumFractionDigits:2}).format(o),n&&(p.src=n),r.forEach((e=>(({quantity:e,id:n,title:s},o,a)=>{const r=o.content.cloneNode(!0),{quantityElem:i,sizeElem:c,inputId:d,inputQuantity:l}=t(r,null);i.innerText=e,c.innerText=`${s}:`,d.value=n,l.value=e,a.appendChild(r)})(e,w,m))),i.appendChild(c)})(e,n))),o.appendChild(n)})(r);const{cartTitle:c,subtotal:d}=t(e,null);c.innerText=a,d.innerText=new Intl.NumberFormat("de-DE",{minimumFractionDigits:2}).format(i.toFixed(2))}catch(e){m.classList.add("is-active"),w.innerText=e.message}finally{n.emit("cart:loaded")}const v=e=>{e.preventDefault(),n.emit("popup:close",null,"add-to-bag")};d&&d.addEventListener("click",(()=>n.emit("popup:open",null,"add-to-bag"))),l&&[].concat(l).forEach((e=>e.addEventListener("click",v))),u&&u.addEventListener("click",(async()=>{u.classList.add("is-active"),document.body.classList.add("pointer-events-none"),await fetch(`${window.Shopify.routes.root}cart/clear.js`,{method:"POST"}).then((e=>e.json())).catch(r);const e=new FormData(p);var t;await(t=e,fetch(`${window.Shopify.routes.root}cart/add.js`,{method:"POST",body:t}).then((e=>e.json())).catch(r)),window.location.replace(`${window.location.origin}/cart`)})),h&&h.addEventListener("click",(async()=>{await navigator.clipboard.writeText(window.location.href),h.classList.add("is-active"),setTimeout((()=>{h.classList.remove("is-active")}),2e3)}))})),d=window.component((async n=>{const{slider:s}=t(n,null);return await e("Swiper"),new Swiper(s,{slidesPerView:1.4,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16,breakpoints:{768:{slidesPerView:2.2,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16},1024:{slidesPerView:2.4,spaceBetween:60,slidesOffsetBefore:0,slidesOffsetAfter:0},1440:{slidesPerView:3,spaceBetween:60,slidesOffsetBefore:0,slidesOffsetAfter:0}}})})),l=e=>{let t,n;const s=window.location.search.substring(1).split("&");for(t=0;t<s.length;t++)if(n=s[t].split("="),n[0]===e)return n[1];return null},u=e=>history.pushState({searchParams:e},"",`${window.location.pathname}${e.includes("?")?e:"?".concat(e)}`),p=({page:e,q:t,sortBy:n})=>{const s=new URLSearchParams(window.location.search);return s.set("page",e),s.set("q",t),s.set("sort_by",n),s},m=e=>function(e,t=300){let n;return(...s)=>{clearTimeout(n),n=setTimeout((()=>{e.apply(this,s)}),t)}}((async t=>{const{page:n,q:s,sortBy:o}=(({page:e,q:t,sortBy:n})=>({page:e||l("page"),q:t||l("q"),sortBy:n||l("sort_by")}))(t),a=p({page:n,q:s,sortBy:o});a.set("sectionId",e),a.set("type","product");const r=a.toString(),i=await(async e=>fetch(e).then((e=>e.text())).then((e=>(new DOMParser).parseFromString(e,"text/html"))))(`${window.location.origin+window.location.pathname}?${r}`);window.app.emit("search:render",null,{html:i,uri:r,requestedPage:n})})),w={hero:n,cart:o,shareCart:c,categoryOverview:d,search:window.component((async(e,n)=>{const{searchInput:o,searchContainer:a,sortByOptions:r,closeSearch:i}=t(e,null),c=m(e.dataset.sectionId),d=new IntersectionObserver((e=>{e.forEach((async e=>{if(e.isIntersecting){const e=l("page");c({q:o.value,page:+e+1})}}))}),{rootMargin:"0px",threshold:[0,.25,.5,.75,1]}),w=n=>{const{productsCount:s}=t(e,null);s.innerText=n},h=()=>{const{searchResults:n}=t(e,null);n.innerHTML=""},g=()=>{const{searchResults:n,loader:s}=t(e,null);s.classList.add("hidden"),n.classList.remove("hidden")},v=n=>{if(a.classList[n?"add":"remove"]("is-active"),n)return c({q:n,page:1}),void(()=>{const{searchResults:n,loader:s,empty:o}=t(e,null);o.classList.add("hidden"),s.classList.remove("hidden"),n.classList.add("hidden")})();h(),w("No results found");const s=p({page:1,q:"",sortBy:r.value}).toString();u(s)};o.addEventListener("input",(e=>v(e.target.value))),r.addEventListener("change",(n=>{const{productsContainer:s}=t(e,null);s.classList.add("is-loading");const a=n.target.value;c({q:o.value,page:l("page"),sortBy:a})})),i.addEventListener("click",(()=>a.classList.add("is-active"))),n.on("search:render",((n,{html:o,uri:a,requestedPage:r})=>{const i=(e=>{const{productsCount:n}=t(e,null);return n.innerText})(o);w(i);const{searchResults:c}=t(o,null),{empty:p,productsContainer:m}=t(e,null);if(m.classList.remove("is-loading"),!c.childNodes.length)return 1===r&&(h(),p.classList.remove("hidden")),void g();u(a),(n=>{const s=l("page"),{searchResults:o}=t(e,null),{searchResults:a}=t(n,null);"1"!==s?o.insertAdjacentHTML("beforeEnd",a.innerHTML):o.innerHTML=a.innerHTML})(o),p.classList.add("hidden"),1===r&&((()=>{const{loadMore:n}=t(e,null);n&&d.observe(n)})(),g()),s()}));const L=l("page"),f=l("q");(L&&"1"!==L||f)&&(a.classList.add("is-active"),o.value=f,v(f),setTimeout((()=>window.scrollTo(0,0)),100))}))},h=window.component((()=>{document.addEventListener("shopify:section:load",(()=>{window.app.unmount(),window.app.mount()}))})),g=window.component((e=>{const{text:t}=e.dataset;console.log("console:log",t)})),v=window.component(((e,n)=>{const{group:s}=e.dataset,{inner:o,toggle:a,shrinkBtn:r,expandBtn:i,toggleModalBtn:c}=t(e,null),d="is-active",l=()=>{e.style.setProperty("--innerHeight","auto"),e.style.setProperty("--innerHeight",`${o.scrollHeight}px`)};l(),window.addEventListener("resize",l,{passive:!0}),a.addEventListener("click",(()=>{n.emit("accordion:toggle",null,{open:!e.classList.contains(d),node:e,group:s})})),c&&c.addEventListener("click",(e=>{n.emit("modal:open",{type:e.target.dataset.modalType})})),n.on("accordion:toggle",((t,n={})=>{s===n.group&&(e.classList[n.open&&n.node===e?"add":"remove"](d),r.classList.toggle("hidden"),r.classList.toggle("flex"),i.classList.toggle("hidden"),i.classList.toggle("block"))}))})),L=window.component((e=>{const{hamburger:n,hamburgerOpened:s,hamburgerClosed:o,mobileMenu:a,main:r}=t(e),{clear:i}=e.dataset,c=document.querySelector("#shopify-section-announcement-bar").offsetHeight||0,d=()=>{void 0!==i&&r.classList[!s.classList.contains("hidden")||window.scrollY>c?"add":"remove"]("is-active")};window.addEventListener("scroll",d,{passive:!0}),window.addEventListener("load",d),n.addEventListener("click",(()=>{s.classList.toggle("hidden"),o.classList.toggle("hidden"),document.body.classList.toggle("overflow-hidden"),a.classList.toggle("left-0"),d()}));const l=()=>{a.style.height=window.innerHeight-c-a.parentElement.offsetHeight+"px"};l(),window.addEventListener("resize",l)})),f=window.component((async(e,t)=>{})),y=window.component(((e,n)=>{const{productId:s}=e.dataset;if(!s)return;const{edit:o}=t(e);o.addEventListener("click",(()=>n.emit("cart-edit-drawer:toggle",null,s)))})),E=window.component(((e,n)=>{const{closeModalBtn:s}=t(e,null),o=()=>{e.classList.toggle("flex"),e.classList.toggle("hidden"),document.body.classList.toggle("overflow-hidden")};e.addEventListener("click",(e=>{e.target.dataset.modalType&&o()}),{capture:!0}),s.addEventListener("click",o),n.on("modal:open",(t=>{e.dataset.modalType===t.type&&o()}))})),b=window.component(((e,n)=>{const{select:s}=t(e),o=new URLSearchParams(window.location.search).get("country_code"),a=s.dataset.current,r=s.dataset.default,i=()=>{const e=s.options[s.selectedIndex];e.dataset.url?window.location.href=`${e.dataset.url}?country_code=${e.value}`:s.form.submit()};r&&a!==r?(s.value=r,i()):o&&o!==a&&(s.value=o,i()),n.on("store:change",((e,{countryCode:t})=>{t!==a&&(s.value=t,i())})),s.addEventListener("change",(()=>i()))})),T="agent-stores:loading",B=window.component((async(e,n)=>{const{store:{store:s},customer:{secret:o,selected_store_customer:r,id:i}}=a(),{selectCustomer:c}=t(e,null),{select:d}=t(c,null);n.on(T,((e,t=!0)=>{d.classList[t?"add":"remove"]("is-loading"),d.disabled=t})),n.emit(T,null,!0);const l=new URLSearchParams({store:s,customerId:i,secret:o});d.addEventListener("change",(async e=>{n.emit(T,null,!0),await fetch(`https://karhu-b2b-functions.vercel.app/api/customer/set-selected-store?${l}&storeCustomerId=${e.target.value}`).then((async e=>{201!==e.status&&console.error(`Could not set selected store [${(await e.json()).message}]`)})),n.emit(T,null,!1),n.emit("store:change",null,{id:e.target.value,countryCode:e.target.options[e.target.selectedIndex].dataset.countryCode})})),await(async()=>{const e=await(async(e,t,n)=>{const s=new URLSearchParams({store:e,customerId:t,secret:n});return fetch(`https://karhu-b2b-functions.vercel.app/api/customer/list-agent-stores?${s}`).then((async e=>200===e.status?await e.json():(console.error(`Could not fetch agent stores [${(await e.json()).message}]`),[])))})(s,i,o);n.emit(T,null,!1),n.emit("agent-stores:received",null,{data:e}),e.length?(e=>{const t=document.createDocumentFragment();e.forEach((e=>{const n=document.createElement("option");r===e.id&&n.setAttribute("selected",!0),n.value=e.id,n.innerText=e.name,n.setAttribute("data-country-code",e.countryCode||"NL"),t.appendChild(n)})),d.appendChild(t)})(e):d.setAttribute("disabled",!0)})()})),k=window.component(((e,n)=>{const{count:s}=t(e);n.on("cart:update",((e,{countAdd:t,count:n})=>{Number.isNaN(Number(n))?t&&(s.innerHTML=Number(s.innerHTML)+t):s.innerHTML=n}))})),S={sectionRendering:h,consoleLog:g,accordion:v,header:L,cartDrawer:f,cartItem:y,modal:E,countrySelect:b,popup:window.component(((e,n)=>{const{popupOverlay:s,closePopupBtn:o}=t(e,null),a=()=>{e.classList.add("hidden"),document.body.classList.remove("overflow-hidden")};n.on("popup:open",((t,n)=>{e.dataset.popup===n&&(e.classList.remove("hidden"),document.body.classList.add("overflow-hidden"))})),n.on("popup:close",((t,n)=>{e.dataset.popup===n&&a()})),s.addEventListener("click",(e=>{e.currentTarget.dataset.popupOverlay&&a()})),o&&[].concat(o).forEach((e=>e.addEventListener("click",a)))})),storeSelect:B,quickAddButton:window.component((async(e,t)=>{const{productHandle:n}=e.dataset;e.addEventListener("click",(async()=>{e.classList.add("is-loading");const{"quick-add-drawer-content":s}=await fetch(`${window.Shopify.routes.root}products/${n}?sections=quick-add-drawer-content`).then((e=>e.json()));t.emit("quick-add:open",null,{html:s}),e.classList.remove("is-loading")}))})),quickAddDrawer:window.component(((e,n)=>{const{drawer:s,backdrop:o,content:a,closeButton:r}=t(e);let i;const c=()=>{s.classList.remove("is-active"),o.classList.remove("is-active")};n.on("quick-add:open",((e,{html:t})=>{a.innerHTML=t,s.classList.add("is-active"),o.classList.add("is-active"),window.app.unmount(),window.app.mount()})),[o,r].forEach((e=>e.addEventListener("click",c))),n.on("cart:update",(()=>{i&&clearTimeout(i),i=setTimeout((()=>c()),1e3)}))})),cartCount:k,productForm:window.component(((e,n)=>{const{size:s,sizeButton:o,quantityInputs:r,addToCartButton:i,error:c}=t(e),{translations:{server_error:d,select_sizes_error:l}}=a(),u=[].concat(s).filter(Boolean),p=[].concat(o).filter(Boolean),m=[].concat(r).filter(Boolean),{state:w}=t(i),h=[].concat(w),g=(e=!0)=>{h.forEach((t=>{t.style.transition=e?"":"unset"}))},v=(e="")=>{c.innerHTML=e};let L;e.addEventListener("submit",(async e=>{e.preventDefault(),v(),g(),L&&clearTimeout(L),i.classList.add("is-loading"),i.classList.remove("is-active"),i.disabled=!0;const t=new FormData(e.target),s=Array.from(t.entries()).filter((([e])=>e.endsWith("[quantity]"))).map((([,e])=>Number(e)));try{if(0===s.filter((e=>e>0)).length)throw Error(l);const e=await fetch(`${window.Shopify.routes.root}cart/add.js`,{method:"POST",body:t}),o=await e.json();if(200!==e.status&&o.description)throw Error(o.description);if(200!==e.status)throw Error(d);i.classList.remove("is-loading"),i.disabled=!1,n.emit("cart:update",null,{countAdd:s.reduce(((e,t)=>e+t),0)}),i.classList.add("is-active"),L=setTimeout((()=>{g(!1),i.classList.remove("is-active")}),2e3)}catch(e){v(e.message)}i.classList.remove("is-loading"),i.disabled=!1})),m.forEach((e=>{e.addEventListener("keypress",(e=>{v(),"0"===e.target.value&&(e.target.value=e.target.value.slice(1))}))})),p.forEach((e=>e.addEventListener("click",(t=>{const n=t.target.textContent.trim().toLowerCase();u.forEach((e=>{e.innerText=e.dataset[n]})),p.forEach((({classList:e})=>e.remove("is-active"))),e.classList.add("is-active")}))))})),cartEditDrawer:window.component(((e,n)=>{const{productId:s}=e.dataset,{drawer:o,backdrop:a,submit:r,form:i,closeButton:c}=t(e);n.on("cart-edit-drawer:toggle",((e,t=!1)=>{[o,a].forEach((e=>e.classList[t===s?"add":"remove"]("is-active")))})),n.on("cart:loading",((e,t=!1)=>{r.classList[t?"add":"remove"]("is-active")})),[a,c].forEach((e=>e.addEventListener("click",(()=>n.emit("cart-edit-drawer:toggle"))))),i.addEventListener("submit",(async e=>{e.preventDefault(),n.emit("cart:loading",null,!0),await(async e=>fetch(`${window.Shopify.routes.root}cart/update.js`,{method:"POST",body:e}).then((e=>e.json())))(new FormData(e.target)),n.emit("cart:render")}))})),cartSave:window.component(((e,n)=>{const{store:{store:s},customer:{secret:o,id:r}}=a(),{saveButton:i,closePopupBtn:c,shareCartPopupBtn:d,saveCartPopupBtn:l,errorMessage:u,cartInput:p,lineItemsJson:m}=t(e),w=e=>{u.innerText=e;const t=Boolean(e||!u);p.setAttribute("aria-invalid",t)};i.addEventListener("click",(()=>n.emit("popup:open",null,"save-cart"))),[].concat(c).forEach((e=>e.addEventListener("click",(e=>{const{type:t}=e.currentTarget.dataset;n.emit("popup:close",null,t),w("")})))),d.addEventListener("click",(async e=>{const{cartId:t}=e.target.dataset,n=`${window.location.origin}/pages/share-cart?agentId=${r}&cartId=${t}`;await navigator.clipboard.writeText(n),d.classList.add("is-active"),setTimeout((()=>{d.classList.remove("is-active")}),2e3)}));const h=()=>{l.classList.toggle("is-active"),document.body.classList.toggle("pointer-events-none")};l.addEventListener("click",(async()=>{if(p.value){h(),w("");try{const{id:e}=await(()=>{const e=new URLSearchParams({store:s,secret:o,customerId:r});return fetch(`https://karhu-b2b-functions.vercel.app/api/customer/save-cart?${e}`,{method:"POST",body:JSON.stringify({name:p.value,updated_at:new Date,line_items:JSON.parse(m.innerHTML)})}).then((async e=>{const t=await e.json();if(200===e.status)return t;throw new Error(t.message)}))})();"save-cart",n.emit("popup:close",null,"save-cart"),w(""),n.emit("popup:open",null,"share-cart"),d.dataset.cartId=e,p.value=""}catch(e){w(e.message)}finally{h()}}else w("Please fill in a name")})),p.addEventListener("input",(e=>{e.target.value&&p.setAttribute("aria-invalid",!1)}))}))};window.app.add(w),window.app.add(S),window.app.mount()})();