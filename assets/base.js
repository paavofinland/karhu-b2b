(()=>{"use strict";const e=e=>new Promise((t=>{window?.hasLoaded?.scripts?.[e]?t():window.app.on(`${e}:loaded`,t)}));function t(e=document.body,t){const n=[...e.querySelectorAll(t?`[class*="${t}"]`:"*")],s=t?"classList":"dataset";return n.reduce(((e,n)=>([].slice.call(t?n[s]:Object.entries(n[s])).forEach((s=>{let a;t&&s.slice(0,t.length)===t?a=s.slice(t.length,s.length):t||([a]=s),a&&(e[a]=e.hasOwnProperty(a)?e[a].constructor===Array?e[a].concat(n):[e[a],n]:n)})),e)),{})}const n=window.component((async n=>{const{slider:s,slide:a,prev:o,next:r}=t(n,null);if(a.length>1){await e("Swiper");const t=new Swiper(s,{slidesPerView:1,loop:!0,on:{afterInit:e=>{e.wrapperEl.classList.remove("overflow-hidden","flex")}}});o.addEventListener("click",(()=>t.slidePrev())),r.addEventListener("click",(()=>t.slideNext()))}}));function s(){return JSON.parse(document.querySelector("script#liquid-variables").innerHTML)}const a=async e=>fetch(e).then((e=>e.text())).then((e=>(new DOMParser).parseFromString(e,"text/html"))),o=e=>{let t,n;const s=window.location.search.substring(1).split("&");for(t=0;t<s.length;t++)if(n=s[t].split("="),n[0]===e)return n[1];return null},r=e=>history.pushState({searchParams:e},"",`${window.location.pathname}${e.includes("?")?e:"?".concat(e)}`),c=e=>t=>t.dataset.id===e,i=window.component((async(e,n)=>{const o=s(),r=n=>{const{cartInput:s,errorMessage:a}=t(e);a.innerText=n,console.log(!n),s.setAttribute("required",!n),s.setAttribute("aria-invalid",!n)},i=n=>{const{sidebar:s,sidebarLayer:a}=t(e),{id:o}=(n.currentTarget||n.target).dataset;[].concat(s).find(c(o)).classList.toggle("is-active"),a.classList.toggle("is-active"),a.dataset.id=o,document.body.classList.toggle("overflow-hidden")},d=()=>n.emit("popup:open",null,"save-cart"),l=()=>{n.emit("popup:close",null,"save-cart"),r("")},u=async()=>{const n=((e="")=>{const{customer:{id:t}}=o;return`${window.location.origin}/pages/share-cart?agentId=${t}&cartId=${e}`})("some_custom_id");await navigator.clipboard.writeText(n),(()=>{const{shareCartBtn:n}=t(e);n.classList.add("is-active"),setTimeout((()=>{n.classList.remove("is-active")}),2e3)})()},p=()=>{e.classList.toggle("opacity-50"),e.classList.toggle("pointer-events-none")},m=async()=>{const s=await a(`${window.location.origin+window.location.pathname}?section_id=${e.dataset.sectionId}`),{section:o}=t(e),{section:r}=t(s);o.innerHTML=r.innerHTML,n.emit("cart:update-handlers")},w=async e=>{try{await(e=>fetch(`${window.Shopify.routes.root}cart/update.js`,{method:"POST",body:e}))(e);const t=Array.from(e.values()).reduce(((e,t)=>e+ +t),0);n.emit("cart:update",null,{count:t})}catch(e){throw new Error(e.message)}},g=()=>{const{saveCartPopupBtn:n}=t(e);n.classList.toggle("is-active"),document.body.classList.toggle("pointer-events-none")},h=()=>{const{saveCartBtn:n}=t(e);n.classList.toggle("is-active"),n.toggleAttribute("disabled")},v=async()=>{const{cartInput:n}=t(e);if(n.value){g(),r("");try{await(()=>{const{cartInput:n}=t(e),s=(()=>{const{store:{store:e},customer:{secret:t,id:n}}=o;return new URLSearchParams({store:e,secret:t,customerId:n})})(),a=(()=>{const{item:n}=t(e,null);return[].concat(n).map((e=>{const{id:t,productId:n,quantity:s}=e.dataset;return{id:t,productId:n,quantity:s}}))})();return fetch(`https://karhu-b2b-functions.vercel.app/api/customer/save-cart?${s}`,{method:"POST",body:JSON.stringify({name:n.value,updated_at:new Date,line_items:a})}).then((async e=>{const t=await e.json();if(200===e.status)return t;throw new Error(t.message)}))})(),l(),n.value="",h(),setTimeout((()=>{h()}),1e3)}catch(e){r(e.message)}finally{g()}}else r("Please fill in a name")},L=async n=>{const{removeItemForm:s}=t(e),{id:a}=n.target.dataset,o=[].concat(s).find(c(a)),r=new FormData(o);p(),await w(r),await m(),p()},y=n=>{const{updateOrderBtn:s}=t(e);[].concat(s).find((e=>e.dataset.id===n)).classList.toggle("is-active")},f=()=>{const{sidebarLayer:n}=t(e);document.body.classList.toggle("pointer-events-none"),n.classList.toggle("is-active:pointer-events-auto")},E=(e,n)=>{const{updateErrorMsg:s}=t(e);s.innerText=n.message,s.classList[n.message?"add":"remove"]("is-active")},b=async e=>{e.preventDefault();const t=new FormData(e.currentTarget),{id:n}=e.currentTarget.dataset;E(e.currentTarget,""),f(),y(n);try{await w(t),i(e),await m()}catch(t){E(e.target,t),y(n)}finally{f()}};n.on("cart:update-handlers",(()=>{const{editItemBtn:n,removeItemBtn:s,sidebarLayer:a,closeSidebarBtn:o,saveCartBtn:r,closePopupBtn:c,shareCartBtn:p,saveCartPopupBtn:m,updateSizesForm:w}=t(e);n&&[].concat(n).forEach((e=>e.addEventListener("click",i))),o&&[].concat(o).forEach((e=>e.addEventListener("click",i))),a.addEventListener("click",i),r&&r.addEventListener("click",d),c&&[].concat(c).forEach((e=>e.addEventListener("click",l))),p&&p.addEventListener("click",u),s&&[].concat(s).forEach((e=>e.addEventListener("click",L))),m.addEventListener("click",v),w&&[].concat(w).forEach((e=>e.addEventListener("submit",b)))})),n.emit("cart:update-handlers")})),d=e=>{console.error("Error:",e),document.body.classList.remove("pointer-events-none")},l=s(),u=window.component((async(e,n)=>{const{productTemplate:s,productContainer:a,loader:o,section:r,addToBagBtn:c,closePopupBtn:i,addToBagPopupBtn:u,addToBagForm:p}=t(e);n.on("cart:loaded",(()=>{o.classList.add("hidden"),r.classList.remove("hidden")})),n.on("data:render",(async()=>{const o=(()=>{const{store:{store:e},customer:{secret:t,id:n}}=l,{agentId:s,cartId:a}=(()=>{const e=new URL(window.location.href);return{agentId:e.searchParams.get("agentId"),cartId:e.searchParams.get("cartId")}})();return new URLSearchParams({store:e,secret:t,customerId:n,agentId:s,cartId:a})})();try{const{products:r,subtotal:c}=await(e=>fetch(`https://karhu-b2b-functions.vercel.app/api/customer/get-cart-products?${e}`).then((async e=>{const t=await e.json();if(200===e.status)return t;throw console.error(`Error§ [${(await e.json()).message}]`),new Error(t.message)})))(o);(e=>{a.innerHTML="";const n=document.createDocumentFragment();e.forEach((({title:e,price:a,quantity:o,image:r,id:c})=>{const i=s.content.cloneNode(!0),{titleElem:d,priceElem:l,quantityElem:u,imageElem:p,item:m,inputId:w,inputQuantity:g}=t(i,null);m.dataset.id=c,d.innerText=e,d.setAttribute("title",e),l.innerText=a,u.innerText=o,p.src=r,w.value=c,g.value=o,n.appendChild(i)})),a.appendChild(n)})(r);const{subtotal:i}=t(e,null);i.innerText=c}catch(e){console.log(e)}finally{n.emit("cart:loaded")}})),n.emit("data:render",null);const m=e=>{e.preventDefault(),n.emit("popup:close",null,"add-to-bag")};c&&c.addEventListener("click",(()=>n.emit("popup:open",null,"add-to-bag"))),i&&[].concat(i).forEach((e=>e.addEventListener("click",m))),u&&u.addEventListener("click",(async()=>{u.classList.add("is-active"),document.body.classList.add("pointer-events-none"),await fetch(`${window.Shopify.routes.root}cart/clear.js`,{method:"POST"}).then((e=>e.json())).catch(d);const e=new FormData(p);var t;await(t=e,fetch(`${window.Shopify.routes.root}cart/add.js`,{method:"POST",body:t}).then((e=>e.json())).catch(d)),window.location.replace(`${window.location.origin}/cart`)}))})),p=window.component((async n=>{const{slider:s}=t(n,null);return await e("Swiper"),new Swiper(s,{slidesPerView:1.4,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16,breakpoints:{768:{slidesPerView:2.2,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16},1024:{slidesPerView:2.4,spaceBetween:60,slidesOffsetBefore:0,slidesOffsetAfter:0},1440:{slidesPerView:3,spaceBetween:60,slidesOffsetBefore:0,slidesOffsetAfter:0}}})})),m=({page:e,q:t,sortBy:n})=>{const s=new URLSearchParams(window.location.search);return s.set("page",e),s.set("q",t),s.set("sort_by",n),s},w=e=>function(e,t=300){let n;return(...s)=>{clearTimeout(n),n=setTimeout((()=>{e.apply(this,s)}),t)}}((async t=>{const{page:n,q:s,sortBy:r}=(({page:e,q:t,sortBy:n})=>({page:e||o("page"),q:t||o("q"),sortBy:n||o("sort_by")}))(t),c=m({page:n,q:s,sortBy:r});c.set("sectionId",e),c.set("type","product");const i=c.toString(),d=await a(`${window.location.origin+window.location.pathname}?${i}`);window.app.emit(["search:render"],null,{html:d,uri:i,requestedPage:n})})),g={hero:n,cart:i,shareCart:u,categoryOverview:p,search:window.component((async(e,n)=>{const{searchInput:s,searchContainer:a,sortByOptions:c,closeSearch:i}=t(e,null),d=w(e.dataset.sectionId),l=new IntersectionObserver((e=>{e.forEach((async e=>{if(e.isIntersecting){const e=o("page");d({q:s.value,page:+e+1})}}))}),{rootMargin:"0px",threshold:[0,.25,.5,.75,1]}),u=n=>{const{productsCount:s}=t(e,null);s.innerText=n},p=()=>{const{searchResults:n}=t(e,null);n.innerHTML=""},g=()=>{const{searchResults:n,loader:s}=t(e,null);s.classList.add("hidden"),n.classList.remove("hidden")},h=n=>{if(a.classList[n?"add":"remove"]("is-active"),n)return d({q:n,page:1}),void(()=>{const{searchResults:n,loader:s,empty:a}=t(e,null);a.classList.add("hidden"),s.classList.remove("hidden"),n.classList.add("hidden")})();p(),u("No results found");const s=m({page:1,q:"",sortBy:c.value}).toString();r(s)};s.addEventListener("input",(e=>h(e.target.value))),c.addEventListener("change",(n=>{const{productsContainer:a}=t(e,null);a.classList.add("is-loading");const r=n.target.value;d({q:s.value,page:o("page"),sortBy:r})})),i.addEventListener("click",(()=>a.classList.add("is-active"))),n.on("search:render",((n,{html:s,uri:a,requestedPage:c})=>{const i=(e=>{const{productsCount:n}=t(e,null);return n.innerText})(s);u(i);const{searchResults:d}=t(s,null),{empty:m,productsContainer:w}=t(e,null);if(w.classList.remove("is-loading"),!d.childNodes.length)return 1===c&&(p(),m.classList.remove("hidden")),void g();r(a),(n=>{const s=o("page"),{searchResults:a}=t(e,null),{searchResults:r}=t(n,null);"1"!==s?a.insertAdjacentHTML("beforeEnd",r.innerHTML):a.innerHTML=r.innerHTML})(s),m.classList.add("hidden"),1===c&&((()=>{const{loadMore:n}=t(e,null);n&&l.observe(n)})(),g()),window.app.mount()}));const v=o("page"),L=o("q");(v&&"1"!==v||L)&&(a.classList.add("is-active"),s.value=L,h(L),setTimeout((()=>window.scrollTo(0,0)),100))}))},h=window.component((()=>{document.addEventListener("shopify:section:load",(()=>{window.app.unmount(),window.app.mount()}))})),v=window.component((e=>{const{text:t}=e.dataset;console.log("console:log",t)})),L=window.component(((e,n)=>{const{group:s}=e.dataset,{inner:a,toggle:o,shrinkBtn:r,expandBtn:c,toggleModalBtn:i}=t(e,null),d="is-active",l=()=>{e.style.setProperty("--innerHeight","auto"),e.style.setProperty("--innerHeight",`${a.scrollHeight}px`)};l(),window.addEventListener("resize",l,{passive:!0}),o.addEventListener("click",(()=>{n.emit("accordion:toggle",null,{open:!e.classList.contains(d),node:e,group:s})})),i&&i.addEventListener("click",(e=>{n.emit("modal:open",{type:e.target.dataset.modalType})})),n.on("accordion:toggle",((t,n={})=>{s===n.group&&(e.classList[n.open&&n.node===e?"add":"remove"](d),r.classList.toggle("hidden"),r.classList.toggle("flex"),c.classList.toggle("hidden"),c.classList.toggle("block"))}))})),y=window.component((e=>{const{hamburger:n,hamburgerOpened:s,hamburgerClosed:a,mobileMenu:o,main:r}=t(e),{clear:c}=e.dataset,i=document.querySelector("#shopify-section-announcement-bar").offsetHeight||0,d=()=>{void 0!==c&&r.classList[!s.classList.contains("hidden")||window.scrollY>i?"add":"remove"]("is-active")};window.addEventListener("scroll",d,{passive:!0}),window.addEventListener("load",d),n.addEventListener("click",(()=>{s.classList.toggle("hidden"),a.classList.toggle("hidden"),document.body.classList.toggle("overflow-hidden"),o.classList.toggle("left-0"),d()}));const l=()=>{o.style.height=window.innerHeight-i-o.parentElement.offsetHeight+"px"};l(),window.addEventListener("resize",l)}));const f=({keyCode:e},{type:t,boolean:n})=>{27===e&&t&&n&&window.app.emit(t,{[n]:!1})},E=window.component((async(e,n)=>{const s=e.parentNode,a=e,{toggle:o,clear:r,focusEl:c}=t(e,null),i=({cartOpen:t})=>{e.classList[t?"add":"remove"]("open"),t?(a.tabIndex="0",(c||e).focus()):a.tabIndex="-1"};return o.forEach((e=>{e.addEventListener("click",(()=>n.emit("cart:toggle",(({cartOpen:e})=>({cartOpen:!e??!0})))))})),i(n.getState()),r&&r.addEventListener("click",(()=>(window.app.emit("cart:updating"),fetch(`${window.Phill.routes.cartClear}.js`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({sections:"cart-drawer"})}).then((e=>e.json())).then((e=>(window.app.emit(["cart:updated","cart:render"],{cart:e}),e)))))),e.addEventListener("keyup",(e=>f(e,{type:"cart:toggle",boolean:"cartOpen"}))),await n.on("cart:render",(({cart:e})=>{s&&(document.getElementById("shopify-section-cart-drawer").outerHTML=e.sections["cart-drawer"]),window.app.unmount(),window.app.mount()})),n.on("cart:toggle",i),()=>{n.on(["cart:toggle","cart:render"],(()=>{}))(),e.removeEventListener("keyup",(e=>f(e,{type:"cart:toggle",boolean:"cartOpen"})))}})),b=window.component((e=>{const{update:n}=t(e,null),{key:s}=e.dataset;[].concat(n).forEach((e=>{const{value:t}=e.dataset;e.addEventListener("click",(()=>function(e,t){return function(e,t){return window.app.emit("cart:updating"),fetch(`${window.Phill.routes.cartChange}.js`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,quantity:t,sections:"cart-drawer"})}).then((e=>e.json())).then((async e=>(window.app.emit(["cart:updated","cart:render"],{cart:e}),e)))}(e,t)}(s,t)))}))})),T=window.component(((e,n)=>{const{closeModalBtn:s}=t(e,null),a=()=>{e.classList.toggle("flex"),e.classList.toggle("hidden"),document.body.classList.toggle("overflow-hidden")};e.addEventListener("click",(e=>{e.target.dataset.modalType&&a()}),{capture:!0}),s.addEventListener("click",a),n.on("modal:open",(t=>{e.dataset.modalType===t.type&&a()}))})),k=window.component(((e,n)=>{const{select:s}=t(e),a=new URLSearchParams(window.location.search).get("country_code"),o=s.dataset.current,r=s.dataset.default,c=()=>{const e=s.options[s.selectedIndex];e.dataset.url?window.location.href=`${e.dataset.url}?country_code=${e.value}`:s.form.submit()};r&&o!==r?(s.value=r,c()):a&&a!==o&&(s.value=a,c()),n.on("store:change",((e,{countryCode:t})=>{t!==o&&(s.value=t,c())})),s.addEventListener("change",(()=>c()))})),B="agent-stores:loading",S=window.component((async(e,n)=>{const{store:{store:a},customer:{secret:o,selected_store_customer:r,id:c}}=s(),{selectCustomer:i}=t(e,null),{select:d}=t(i,null);n.on(B,((e,t=!0)=>{d.classList[t?"add":"remove"]("is-loading"),d.disabled=t})),n.emit(B,null,!0);const l=new URLSearchParams({store:a,customerId:c,secret:o});d.addEventListener("change",(async e=>{n.emit(B,null,!0),await fetch(`https://karhu-b2b-functions.vercel.app/api/customer/set-selected-store?${l}&storeCustomerId=${e.target.value}`).then((async e=>{201!==e.status&&console.error(`Could not set selected store [${(await e.json()).message}]`)})),n.emit(B,null,!1),n.emit("store:change",null,{countryCode:e.target.options[e.target.selectedIndex].dataset.countryCode})})),await(async()=>{const e=await(async(e,t,n)=>{const s=new URLSearchParams({store:e,customerId:t,secret:n});return fetch(`https://karhu-b2b-functions.vercel.app/api/customer/list-agent-stores?${s}`).then((async e=>200===e.status?await e.json():(console.error(`Could not fetch agent stores [${(await e.json()).message}]`),[])))})(a,c,o);n.emit(B,null,!1),n.emit("agent-stores:received",null,{data:e}),e.length?(e=>{const t=document.createDocumentFragment();e.forEach((e=>{const n=document.createElement("option");r===e.id&&n.setAttribute("selected",!0),n.value=e.id,n.innerText=e.name,n.setAttribute("data-country-code",e.countryCode),t.appendChild(n)})),d.appendChild(t)})(e):d.setAttribute("disabled",!0)})()})),I=window.component(((e,n)=>{const{count:s}=t(e);n.on("cart:update",((e,{countAdd:t,count:n})=>{Number.isNaN(Number(n))?t&&(s.innerHTML=Number(s.innerHTML)+t):s.innerHTML=n}))})),P={sectionRendering:h,consoleLog:v,accordion:L,header:y,cartDrawer:E,cartItem:b,modal:T,countrySelect:k,popup:window.component(((e,n)=>{const{popupOverlay:s,closePopupBtn:a}=t(e,null),o=()=>{e.classList.add("hidden"),document.body.classList.remove("overflow-hidden")};n.on("popup:open",((t,n)=>{e.dataset.popup===n&&(e.classList.remove("hidden"),document.body.classList.add("overflow-hidden"))})),n.on("popup:close",((t,n)=>{e.dataset.popup===n&&o()})),s.addEventListener("click",(e=>{e.currentTarget.dataset.popupOverlay&&o()})),a&&[].concat(a).forEach((e=>e.addEventListener("click",o)))})),storeSelect:S,quickAddButton:window.component((async(e,t)=>{const{productHandle:n}=e.dataset;e.addEventListener("click",(async()=>{e.classList.add("is-loading");const{"quick-add-drawer-content":s}=await fetch(`${window.Shopify.routes.root}products/${n}?sections=quick-add-drawer-content`).then((e=>e.json()));t.emit("quick-add:open",null,{html:s}),e.classList.remove("is-loading")}))})),quickAddDrawer:window.component(((e,n)=>{const{drawer:s,backdrop:a,content:o,closeButton:r}=t(e);let c;const i=()=>{s.classList.remove("is-active"),a.classList.remove("is-active")};n.on("quick-add:open",((e,{html:t})=>{o.innerHTML=t,s.classList.add("is-active"),a.classList.add("is-active"),window.app.unmount(),window.app.mount()})),[a,r].forEach((e=>e.addEventListener("click",i))),n.on("cart:update",(()=>{c&&clearTimeout(c),c=setTimeout((()=>i()),1e3)}))})),cartCount:I,productForm:window.component(((e,n)=>{const{size:a,sizeButton:o,quantityInputs:r,addToCartButton:c,error:i}=t(e),{translations:{server_error:d,select_sizes_error:l}}=s(),u=[].concat(a).filter(Boolean),p=[].concat(o).filter(Boolean),m=[].concat(r).filter(Boolean),{state:w}=t(c),g=[].concat(w),h=(e=!0)=>{g.forEach((t=>{t.style.transition=e?"":"unset"}))},v=(e="")=>{i.innerHTML=e};let L;e.addEventListener("submit",(async e=>{e.preventDefault(),v(),h(),L&&clearTimeout(L),c.classList.add("is-loading"),c.classList.remove("is-active"),c.disabled=!0;const t=new FormData(e.target),s=Array.from(t.entries()).filter((([e])=>e.endsWith("[quantity]"))).map((([,e])=>Number(e)));try{if(0===s.filter((e=>e>0)).length)throw Error(l);const e=await fetch(`${window.Shopify.routes.root}cart/add.js`,{method:"POST",body:t}),a=await e.json();if(200!==e.status&&a.description)throw Error(a.description);if(200!==e.status)throw Error(d);c.classList.remove("is-loading"),c.disabled=!1,n.emit("cart:update",null,{countAdd:s.reduce(((e,t)=>e+t),0)}),c.classList.add("is-active"),L=setTimeout((()=>{h(!1),c.classList.remove("is-active")}),2e3)}catch(e){v(e.message)}c.classList.remove("is-loading"),c.disabled=!1})),m.forEach((e=>{e.addEventListener("keypress",(e=>{v(),"0"===e.target.value&&(e.target.value=e.target.value.slice(1))}))})),p.forEach((e=>e.addEventListener("click",(t=>{const n=t.target.textContent.trim().toLowerCase();u.forEach((e=>{e.innerText=e.dataset[n]})),p.forEach((({classList:e})=>e.remove("is-active"))),e.classList.add("is-active")}))))}))};window.app.add(g),window.app.add(P),window.app.mount()})();