<<<<<<< HEAD
(()=>{"use strict";const e=e=>new Promise((t=>{window?.hasLoaded?.scripts?.[e]?t():window.app.on(`${e}:loaded`,t)}));function t(e=document.body,t){const n=[...e.querySelectorAll(t?`[class*="${t}"]`:"*")],s=t?"classList":"dataset";return n.reduce(((e,n)=>([].slice.call(t?n[s]:Object.entries(n[s])).forEach((s=>{let o;t&&s.slice(0,t.length)===t?o=s.slice(t.length,s.length):t||([o]=s),o&&(e[o]=e.hasOwnProperty(o)?e[o].constructor===Array?e[o].concat(n):[e[o],n]:n)})),e)),{})}const n=window.component((async n=>{const{slider:s,slide:o,prev:a,next:r}=t(n,null);if(o.length>1){await e("Swiper");const t=new Swiper(s,{slidesPerView:1,loop:!0,on:{afterInit:e=>{e.wrapperEl.classList.remove("overflow-hidden","flex")}}});a.addEventListener("click",(()=>t.slidePrev())),r.addEventListener("click",(()=>t.slideNext()))}})),s=window.component((async(e,n)=>{const{editItemBtn:s,sidebar:o,sidebarLayer:a,closeSidebarBtn:r,saveCartBtn:i,popup:c,closePopupBtn:d,shareCartBtn:l}=t(e),p=Array.isArray(o)?Array.from(o):[o],u=e=>{const{id:t}=e.currentTarget.dataset;var n;p.find((n=t,e=>e.dataset.id===n)).classList.toggle("is-active"),a.classList.toggle("is-active"),a.dataset.id=t,document.body.classList.toggle("overflow-hidden")};s&&[].concat(s).forEach((e=>e.addEventListener("click",u))),r&&[].concat(r).forEach((e=>e.addEventListener("click",u))),a.addEventListener("click",u);const w=()=>n.emit("popup:close",null,"save-cart");i&&i.addEventListener("click",(()=>n.emit("popup:open",null,"save-cart"))),d&&[].concat(d).forEach((e=>e.addEventListener("click",w))),l&&l.addEventListener("click",(async()=>{const n=(e=>{const t=encodeURIComponent(JSON.stringify(e));return`${window.location.origin}/pages/share-cart?data=${t}`})((()=>{const{item:n,subtotal:s}=t(e,null),o={subtotal:s.dataset.subtotal,items:[]};return[].concat(n).forEach((e=>{const{item:t,...n}=e.dataset;o.items.push(n)})),o})());await navigator.clipboard.writeText(n),l.classList.add("is-active"),setTimeout((()=>{l.classList.remove("is-active")}),2e3)}))})),o=e=>{console.error("Error:",e),document.body.classList.remove("pointer-events-none")},a=window.component((async(e,n)=>{const{productTemplate:s,productContainer:a,loader:r,section:i,addToBagBtn:c,closePopupBtn:d,addToBagPopupBtn:l,addToBagForm:p}=t(e);n.on("cart:loaded",(()=>{r.classList.add("hidden"),i.classList.remove("hidden")})),n.on("data:render",((o,{subtotal:r,items:i})=>{const{subtotal:c}=t(e,null);c.innerText=r,(e=>{a.innerHTML="";const n=document.createDocumentFragment();e.forEach((({title:e,price:o,quantity:a,image:r,id:i})=>{const c=s.content.cloneNode(!0),{titleElem:d,priceElem:l,quantityElem:p,imageElem:u,item:w,inputId:m,inputQuantity:g}=t(c,null);w.dataset.id=i,d.innerText=e,d.setAttribute("title",e),l.innerText=o,p.innerText=a,u.src=r,m.value=i,g.value=a,n.appendChild(c)})),a.appendChild(n)})(i),n.emit("cart:loaded"),n.emit("data:update",null,i)}));const u=new URL(window.location.href).searchParams.get("data");n.emit("data:render",null,JSON.parse(u));const w=()=>n.emit("popup:close",null,"add-to-bag");c&&c.addEventListener("click",(()=>n.emit("popup:open",null,"add-to-bag"))),d&&[].concat(d).forEach((e=>e.addEventListener("click",w))),l&&l.addEventListener("click",(async()=>{l.classList.add("is-active"),document.body.classList.add("pointer-events-none"),await fetch(`${window.Shopify.routes.root}cart/clear.js`,{method:"POST"}).then((e=>e.json())).catch(o);const e=new FormData(p);var t;await(t=e,fetch(`${window.Shopify.routes.root}cart/add.js`,{method:"POST",body:t}).then((e=>e.json())).catch(o)),window.location.replace(`${window.location.origin}/cart`)}))})),r=window.component((async n=>{const{slider:s}=t(n,null);return await e("Swiper"),new Swiper(s,{slidesPerView:1.4,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16,breakpoints:{768:{slidesPerView:2.2,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16},1024:{slidesPerView:2.4,spaceBetween:60,slidesOffsetBefore:0,slidesOffsetAfter:0},1440:{slidesPerView:3,spaceBetween:60,slidesOffsetBefore:0,slidesOffsetAfter:0}}})})),i=e=>{let t,n;const s=window.location.search.substring(1).split("&");for(t=0;t<s.length;t++)if(n=s[t].split("="),n[0]===e)return n[1];return null},c=e=>history.pushState({searchParams:e},"",`${window.location.pathname}${e.includes("?")?e:"?".concat(e)}`),d=({page:e,q:t,sortBy:n})=>{const s=new URLSearchParams(window.location.search);return s.set("page",e),s.set("q",t),s.set("sort_by",n),s},l=e=>function(e,t=300){let n;return(...s)=>{clearTimeout(n),n=setTimeout((()=>{e.apply(this,s)}),t)}}((async t=>{const{page:n,q:s,sortBy:o}=(({page:e,q:t,sortBy:n})=>({page:e||i("page"),q:t||i("q"),sortBy:n||i("sort_by")}))(t),a=d({page:n,q:s,sortBy:o});a.set("sectionId",e),a.set("type","product");const r=a.toString(),c=await(async e=>fetch(e).then((e=>e.text())).then((e=>(new DOMParser).parseFromString(e,"text/html"))))(`${window.location.origin+window.location.pathname}?${r}`);window.app.emit(["search:render"],null,{html:c,uri:r,requestedPage:n})})),p={hero:n,cart:s,shareCart:a,categoryOverview:r,search:window.component((async(e,n)=>{const{searchInput:s,searchContainer:o,sortByOptions:a}=t(e,null),r=l(e.dataset.sectionId),p=new IntersectionObserver((e=>{e.forEach((async e=>{if(e.isIntersecting){const e=i("page");r({q:s.value,page:+e+1})}}))}),{rootMargin:"0px",threshold:[0,.25,.5,.75,1]}),u=()=>{const{searchResults:n,loader:s}=t(e,null);s.classList.add("hidden"),n.classList.remove("hidden")},w=n=>{if(o.classList[n?"add":"remove"]("is-active"),n)return r({q:n,page:1}),void(()=>{const{searchResults:n,loader:s,empty:o}=t(e,null);o.classList.add("hidden"),s.classList.remove("hidden"),n.classList.add("hidden")})();const s=d({page:1,q:"",sortBy:a.value}).toString();c(s)};s.addEventListener("input",(e=>w(e.target.value))),a.addEventListener("change",(n=>{const{productsContainer:o}=t(e,null);o.classList.add("is-loading");const a=n.target.value;r({q:s.value,page:i("page"),sortBy:a})})),n.on("search:render",((n,{html:s,uri:o,requestedPage:a})=>{(n=>{const{productsCount:s}=t(e,null),{productsCount:o}=t(n,null);s.innerHTML=o.innerHTML})(s);const{searchResults:r}=t(s,null),{empty:d,productsContainer:l}=t(e,null);if(l.classList.remove("is-loading"),!r.childNodes.length)return 1===a&&((()=>{const{searchResults:n}=t(e,null);n.innerHTML=""})(),d.classList.remove("hidden")),void u();c(o),(n=>{const s=i("page"),{searchResults:o}=t(e,null),{searchResults:a}=t(n,null);"1"!==s?o.insertAdjacentHTML("beforeEnd",a.innerHTML):o.innerHTML=a.innerHTML})(s),d.classList.add("hidden"),1===a&&((()=>{const{loadMore:n}=t(e,null);n&&p.observe(n)})(),u()),window.app.mount()}));const m=i("page"),g=i("q");(m&&"1"!==m||g)&&(o.classList.add("is-active"),s.value=g,w(g),setTimeout((()=>window.scrollTo(0,0)),100))}))},u=window.component((()=>{document.addEventListener("shopify:section:load",(()=>{window.app.unmount(),window.app.mount()}))})),w=window.component((e=>{const{text:t}=e.dataset;console.log("console:log",t)})),m=window.component(((e,n)=>{const{group:s}=e.dataset,{inner:o,toggle:a,shrinkBtn:r,expandBtn:i,toggleModalBtn:c}=t(e,null),d="is-active",l=()=>{e.style.setProperty("--innerHeight","auto"),e.style.setProperty("--innerHeight",`${o.scrollHeight}px`)};l(),window.addEventListener("resize",l,{passive:!0}),a.addEventListener("click",(()=>{n.emit("accordion:toggle",null,{open:!e.classList.contains(d),node:e,group:s})})),c&&c.addEventListener("click",(e=>{n.emit("modal:open",{type:e.target.dataset.modalType})})),n.on("accordion:toggle",((t,n={})=>{s===n.group&&(e.classList[n.open&&n.node===e?"add":"remove"](d),r.classList.toggle("hidden"),r.classList.toggle("flex"),i.classList.toggle("hidden"),i.classList.toggle("block"))}))})),g=window.component((e=>{const{hamburger:n,hamburgerOpened:s,hamburgerClosed:o,mobileMenu:a,main:r}=t(e),{clear:i}=e.dataset,c=document.querySelector("#shopify-section-announcement-bar").offsetHeight||0,d=()=>{void 0!==i&&r.classList[!s.classList.contains("hidden")||window.scrollY>c?"add":"remove"]("is-active")};window.addEventListener("scroll",d,{passive:!0}),window.addEventListener("load",d),n.addEventListener("click",(()=>{s.classList.toggle("hidden"),o.classList.toggle("hidden"),document.body.classList.toggle("overflow-hidden"),a.classList.toggle("left-0"),d()}));const l=()=>{a.style.height=window.innerHeight-c-a.parentElement.offsetHeight+"px"};l(),window.addEventListener("resize",l)}));const h=({keyCode:e},{type:t,boolean:n})=>{27===e&&t&&n&&window.app.emit(t,{[n]:!1})},v=window.component((async(e,n)=>{const s=e.parentNode,o=e,{toggle:a,clear:r,focusEl:i}=t(e,null),c=({cartOpen:t})=>{e.classList[t?"add":"remove"]("open"),t?(o.tabIndex="0",(i||e).focus()):o.tabIndex="-1"};return a.forEach((e=>{e.addEventListener("click",(()=>n.emit("cart:toggle",(({cartOpen:e})=>({cartOpen:!e??!0})))))})),c(n.getState()),r&&r.addEventListener("click",(()=>(window.app.emit("cart:updating"),fetch(`${window.Phill.routes.cartClear}.js`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({sections:"cart-drawer"})}).then((e=>e.json())).then((e=>(window.app.emit(["cart:updated","cart:render"],{cart:e}),e)))))),e.addEventListener("keyup",(e=>h(e,{type:"cart:toggle",boolean:"cartOpen"}))),await n.on("cart:render",(({cart:e})=>{s&&(document.getElementById("shopify-section-cart-drawer").outerHTML=e.sections["cart-drawer"]),window.app.unmount(),window.app.mount()})),n.on("cart:toggle",c),()=>{n.on(["cart:toggle","cart:render"],(()=>{}))(),e.removeEventListener("keyup",(e=>h(e,{type:"cart:toggle",boolean:"cartOpen"})))}})),y=window.component((e=>{const{update:n}=t(e,null),{key:s}=e.dataset;[].concat(n).forEach((e=>{const{value:t}=e.dataset;e.addEventListener("click",(()=>function(e,t){return function(e,t){return window.app.emit("cart:updating"),fetch(`${window.Phill.routes.cartChange}.js`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,quantity:t,sections:"cart-drawer"})}).then((e=>e.json())).then((async e=>(window.app.emit(["cart:updated","cart:render"],{cart:e}),e)))}(e,t)}(s,t)))}))})),L=window.component(((e,n)=>{const{closeModalBtn:s}=t(e,null),o=()=>{e.classList.toggle("flex"),e.classList.toggle("hidden"),document.body.classList.toggle("overflow-hidden")};e.addEventListener("click",(e=>{e.target.dataset.modalType&&o()}),{capture:!0}),s.addEventListener("click",o),n.on("modal:open",(t=>{e.dataset.modalType===t.type&&o()}))})),f=window.component(((e,n)=>{const{select:s}=t(e),o=new URLSearchParams(window.location.search).get("country_code"),a=s.dataset.current,r=s.dataset.default,i=()=>{const e=s.options[s.selectedIndex];e.dataset.url?window.location.href=`${e.dataset.url}?country_code=${e.value}`:s.form.submit()};r&&a!==r?(s.value=r,i()):o&&o!==a&&(s.value=o,i()),n.on("store:change",((e,{countryCode:t})=>{t!==a&&(s.value=t,i())})),s.addEventListener("change",(()=>i()))})),b=window.component(((e,n)=>{const{popupOverlay:s}=t(e,null),o=()=>{e.classList.add("hidden"),document.body.classList.remove("overflow-hidden")};n.on("popup:open",((t,n)=>{e.dataset.popup===n&&(e.classList.remove("hidden"),document.body.classList.add("overflow-hidden"))})),n.on("popup:close",((t,n)=>{e.dataset.popup===n&&o()})),s.addEventListener("click",(e=>{e.currentTarget.dataset.popupOverlay&&o()}))})),E="agent-stores:loading",T={sectionRendering:u,consoleLog:w,accordion:m,header:g,cartDrawer:v,cartItem:y,modal:L,countrySelect:f,popup:b,storeSelect:window.component((async(e,n)=>{const{store:{store:s},customer:{secret:o,selected_store_customer:a,id:r}}=JSON.parse(document.querySelector("script#liquid-variables").innerHTML),{selectCustomer:i}=t(e,null),{select:c}=t(i,null);n.on(E,((e,t=!0)=>{c.classList[t?"add":"remove"]("is-loading"),c.disabled=t})),n.emit(E,null,!0);const d=new URLSearchParams({store:s,customerId:r,secret:o});c.addEventListener("change",(async e=>{n.emit(E,null,!0),await fetch(`https://karhu-b2b-functions.vercel.app/api/customer/set-selected-store?${d}&storeCustomerId=${e.target.value}`).then((async e=>{201!==e.status&&console.error(`Could not set selected store [${(await e.json()).message}]`)})),n.emit(E,null,!1),n.emit("store:change",null,{countryCode:e.target.options[e.target.selectedIndex].dataset.countryCode})})),await(async()=>{const e=await(async(e,t,n)=>{const s=new URLSearchParams({store:e,customerId:t,secret:n});return fetch(`https://karhu-b2b-functions.vercel.app/api/customer/list-agent-stores?${s}`).then((async e=>200===e.status?await e.json():(console.error(`Could not fetch agent stores [${(await e.json()).message}]`),[])))})(s,r,o);n.emit(E,null,!1),n.emit("agent-stores:received",null,{data:e}),e.length?(e=>{const t=document.createDocumentFragment();e.forEach((e=>{const n=document.createElement("option");a===e.id&&n.setAttribute("selected",!0),n.value=e.id,n.innerText=e.name,n.setAttribute("data-country-code",e.countryCode),t.appendChild(n)})),c.appendChild(t)})(e):c.setAttribute("disabled",!0)})()}))};window.app.add(p),window.app.add(T),window.app.mount()})();
=======
(()=>{"use strict";const e=e=>new Promise((t=>{window?.hasLoaded?.scripts?.[e]?t():window.app.on(`${e}:loaded`,t)}));function t(e=document.body,t){const n=[...e.querySelectorAll(t?`[class*="${t}"]`:"*")],s=t?"classList":"dataset";return n.reduce(((e,n)=>([].slice.call(t?n[s]:Object.entries(n[s])).forEach((s=>{let o;t&&s.slice(0,t.length)===t?o=s.slice(t.length,s.length):t||([o]=s),o&&(e[o]=e.hasOwnProperty(o)?e[o].constructor===Array?e[o].concat(n):[e[o],n]:n)})),e)),{})}const n=window.component((async n=>{const{slider:s,slide:o,prev:a,next:r}=t(n,null);if(o.length>1){await e("Swiper");const t=new Swiper(s,{slidesPerView:1,loop:!0,on:{afterInit:e=>{e.wrapperEl.classList.remove("overflow-hidden","flex")}}});a.addEventListener("click",(()=>t.slidePrev())),r.addEventListener("click",(()=>t.slideNext()))}}));function s(){return JSON.parse(document.querySelector("script#liquid-variables").innerHTML)}const o=window.component((async(e,n)=>{const{editItemBtn:o,sidebar:a,sidebarLayer:r,closeSidebarBtn:i,saveCartBtn:c,shareCartBtn:d,closePopupBtn:l,saveCartPopupBtn:u,cartInput:p,errorMessage:m}=t(e),w=s(),g=e=>{const t=e?"add":"remove";m.innerText=e,m.classList[t]("is-active"),p.classList[t]("is-active")},h=Array.isArray(a)?Array.from(a):[a],v=e=>{const{id:t}=e.currentTarget.dataset;var n;h.find((n=t,e=>e.dataset.id===n)).classList.toggle("is-active"),r.classList.toggle("is-active"),r.dataset.id=t,document.body.classList.toggle("overflow-hidden")};o&&[].concat(o).forEach((e=>e.addEventListener("click",v))),i&&[].concat(i).forEach((e=>e.addEventListener("click",v))),r.addEventListener("click",v);const y=()=>{n.emit("popup:close",null,"save-cart"),g("")};c&&c.addEventListener("click",(()=>n.emit("popup:open",null,"save-cart"))),l&&[].concat(l).forEach((e=>e.addEventListener("click",y))),d&&d.addEventListener("click",(async()=>{const n=(e=>{const t=encodeURIComponent(JSON.stringify(e));return`${window.location.origin}/pages/share-cart?data=${t}`})((()=>{const{item:n,subtotal:s}=t(e,null),o={subtotal:s.dataset.subtotal,items:[]};return[].concat(n).forEach((e=>{const{item:t,...n}=e.dataset;o.items.push(n)})),o})());await navigator.clipboard.writeText(n),d.innerText="Link Copied",d.classList.add("is-active")}));const f=()=>{u.classList.toggle("is-active"),document.body.classList.toggle("pointer-events-none")},L=()=>{c.classList.toggle("is-active"),c.toggleAttribute("disabled")};u.addEventListener("click",(async()=>{if(p.value){f(),g("");try{await(()=>{const n=(()=>{const{store:{store:e},customer:{secret:t,id:n}}=w;return new URLSearchParams({store:e,secret:t,customerId:n})})(),s=(()=>{const{item:n}=t(e,null);return[].concat(n).map((e=>{const{id:t,quantity:n}=e.dataset;return{id:t,quantity:n}}))})();return fetch(`https://karhu-b2b-functions.vercel.app/api/customer/save-cart?${n}`,{method:"POST",body:JSON.stringify({name:p.value,udpated_at:new Date,line_items:s})}).then((async e=>{const t=await e.json();if(200===e.status)return t;throw new Error(t.message)}))})(),y(),p.value="",L(),setTimeout((()=>{L()}),1e3)}catch(e){g(e.message)}finally{f()}}else g("Please fill in a name")}))})),a=e=>{console.error("Error:",e),document.body.classList.remove("pointer-events-none")},r=window.component((async(e,n)=>{const{productTemplate:s,productContainer:o,loader:r,section:i,addToBagBtn:c,closePopupBtn:d,addToBagPopupBtn:l,addToBagForm:u}=t(e);n.on("cart:loaded",(()=>{r.classList.add("hidden"),i.classList.remove("hidden")})),n.on("data:render",((e,{items:a})=>{(e=>{o.innerHTML="";const n=document.createDocumentFragment();e.forEach((({title:e,quantity:o,image:a,id:r})=>{const i=s.content.cloneNode(!0),{titleElem:c,quantityElem:d,imageElem:l,item:u,inputId:p,inputQuantity:m}=t(i,null);u.dataset.id=r,c.innerText=e,c.setAttribute("title",e),d.innerText=o,l.src=a,p.value=r,m.value=o,n.appendChild(i)})),o.appendChild(n)})(a),n.emit("cart:loaded"),n.emit("data:update",null,a)}));const p=new URL(window.location.href).searchParams.get("data");n.emit("data:render",null,JSON.parse(p));const m=e=>{e.preventDefault(),n.emit("popup:close",null,"add-to-bag")};c&&c.addEventListener("click",(()=>n.emit("popup:open",null,"add-to-bag"))),d&&[].concat(d).forEach((e=>e.addEventListener("click",m))),l&&l.addEventListener("click",(async()=>{l.classList.add("is-active"),document.body.classList.add("pointer-events-none"),await fetch(`${window.Shopify.routes.root}cart/clear.js`,{method:"POST"}).then((e=>e.json())).catch(a);const e=new FormData(u);var t;await(t=e,fetch(`${window.Shopify.routes.root}cart/add.js`,{method:"POST",body:t}).then((e=>e.json())).catch(a)),window.location.replace(`${window.location.origin}/cart`)}))})),i=window.component((async n=>{const{slider:s}=t(n,null);return await e("Swiper"),new Swiper(s,{slidesPerView:1.4,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16,breakpoints:{768:{slidesPerView:2.2,spaceBetween:16,slidesOffsetBefore:16,slidesOffsetAfter:16},1024:{slidesPerView:2.4,spaceBetween:60,slidesOffsetBefore:0,slidesOffsetAfter:0},1440:{slidesPerView:3,spaceBetween:60,slidesOffsetBefore:0,slidesOffsetAfter:0}}})})),c=e=>{let t,n;const s=window.location.search.substring(1).split("&");for(t=0;t<s.length;t++)if(n=s[t].split("="),n[0]===e)return n[1];return null},d=e=>history.pushState({searchParams:e},"",`${window.location.pathname}${e.includes("?")?e:"?".concat(e)}`),l=({page:e,q:t,sortBy:n})=>{const s=new URLSearchParams(window.location.search);return s.set("page",e),s.set("q",t),s.set("sort_by",n),s},u=e=>function(e,t=300){let n;return(...s)=>{clearTimeout(n),n=setTimeout((()=>{e.apply(this,s)}),t)}}((async t=>{const{page:n,q:s,sortBy:o}=(({page:e,q:t,sortBy:n})=>({page:e||c("page"),q:t||c("q"),sortBy:n||c("sort_by")}))(t),a=l({page:n,q:s,sortBy:o});a.set("sectionId",e),a.set("type","product");const r=a.toString(),i=await(async e=>fetch(e).then((e=>e.text())).then((e=>(new DOMParser).parseFromString(e,"text/html"))))(`${window.location.origin+window.location.pathname}?${r}`);window.app.emit(["search:render"],null,{html:i,uri:r,requestedPage:n})})),p={hero:n,cart:o,shareCart:r,categoryOverview:i,search:window.component((async(e,n)=>{const{searchInput:s,searchContainer:o,sortByOptions:a}=t(e,null),r=u(e.dataset.sectionId),i=new IntersectionObserver((e=>{e.forEach((async e=>{if(e.isIntersecting){const e=c("page");r({q:s.value,page:+e+1})}}))}),{rootMargin:"0px",threshold:[0,.25,.5,.75,1]}),p=()=>{const{searchResults:n,loader:s}=t(e,null);s.classList.add("hidden"),n.classList.remove("hidden")},m=n=>{if(o.classList[n?"add":"remove"]("is-active"),n)return r({q:n,page:1}),void(()=>{const{searchResults:n,loader:s,empty:o}=t(e,null);o.classList.add("hidden"),s.classList.remove("hidden"),n.classList.add("hidden")})();const s=l({page:1,q:"",sortBy:a.value}).toString();d(s)};s.addEventListener("input",(e=>m(e.target.value))),a.addEventListener("change",(n=>{const{productsContainer:o}=t(e,null);o.classList.add("is-loading");const a=n.target.value;r({q:s.value,page:c("page"),sortBy:a})})),n.on("search:render",((n,{html:s,uri:o,requestedPage:a})=>{(n=>{const{productsCount:s}=t(e,null),{productsCount:o}=t(n,null);s.innerHTML=o.innerHTML})(s);const{searchResults:r}=t(s,null),{empty:l,productsContainer:u}=t(e,null);if(u.classList.remove("is-loading"),!r.childNodes.length)return 1===a&&((()=>{const{searchResults:n}=t(e,null);n.innerHTML=""})(),l.classList.remove("hidden")),void p();d(o),(n=>{const s=c("page"),{searchResults:o}=t(e,null),{searchResults:a}=t(n,null);"1"!==s?o.insertAdjacentHTML("beforeEnd",a.innerHTML):o.innerHTML=a.innerHTML})(s),l.classList.add("hidden"),1===a&&((()=>{const{loadMore:n}=t(e,null);n&&i.observe(n)})(),p()),window.app.mount()}));const w=c("page"),g=c("q");(w&&"1"!==w||g)&&(o.classList.add("is-active"),s.value=g,m(g),setTimeout((()=>window.scrollTo(0,0)),100))}))},m=window.component((()=>{document.addEventListener("shopify:section:load",(()=>{window.app.unmount(),window.app.mount()}))})),w=window.component((e=>{const{text:t}=e.dataset;console.log("console:log",t)})),g=window.component(((e,n)=>{const{group:s}=e.dataset,{inner:o,toggle:a,shrinkBtn:r,expandBtn:i,toggleModalBtn:c}=t(e,null),d="is-active",l=()=>{e.style.setProperty("--innerHeight","auto"),e.style.setProperty("--innerHeight",`${o.scrollHeight}px`)};l(),window.addEventListener("resize",l,{passive:!0}),a.addEventListener("click",(()=>{n.emit("accordion:toggle",null,{open:!e.classList.contains(d),node:e,group:s})})),c&&c.addEventListener("click",(e=>{n.emit("modal:open",{type:e.target.dataset.modalType})})),n.on("accordion:toggle",((t,n={})=>{s===n.group&&(e.classList[n.open&&n.node===e?"add":"remove"](d),r.classList.toggle("hidden"),r.classList.toggle("flex"),i.classList.toggle("hidden"),i.classList.toggle("block"))}))})),h=window.component((e=>{const{hamburger:n,hamburgerOpened:s,hamburgerClosed:o,mobileMenu:a,main:r}=t(e),{clear:i}=e.dataset,c=document.querySelector("#shopify-section-announcement-bar").offsetHeight||0,d=()=>{void 0!==i&&r.classList[!s.classList.contains("hidden")||window.scrollY>c?"add":"remove"]("is-active")};window.addEventListener("scroll",d,{passive:!0}),window.addEventListener("load",d),n.addEventListener("click",(()=>{s.classList.toggle("hidden"),o.classList.toggle("hidden"),document.body.classList.toggle("overflow-hidden"),a.classList.toggle("left-0"),d()}));const l=()=>{a.style.height=window.innerHeight-c-a.parentElement.offsetHeight+"px"};l(),window.addEventListener("resize",l)}));const v=({keyCode:e},{type:t,boolean:n})=>{27===e&&t&&n&&window.app.emit(t,{[n]:!1})},y=window.component((async(e,n)=>{const s=e.parentNode,o=e,{toggle:a,clear:r,focusEl:i}=t(e,null),c=({cartOpen:t})=>{e.classList[t?"add":"remove"]("open"),t?(o.tabIndex="0",(i||e).focus()):o.tabIndex="-1"};return a.forEach((e=>{e.addEventListener("click",(()=>n.emit("cart:toggle",(({cartOpen:e})=>({cartOpen:!e??!0})))))})),c(n.getState()),r&&r.addEventListener("click",(()=>(window.app.emit("cart:updating"),fetch(`${window.Phill.routes.cartClear}.js`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({sections:"cart-drawer"})}).then((e=>e.json())).then((e=>(window.app.emit(["cart:updated","cart:render"],{cart:e}),e)))))),e.addEventListener("keyup",(e=>v(e,{type:"cart:toggle",boolean:"cartOpen"}))),await n.on("cart:render",(({cart:e})=>{s&&(document.getElementById("shopify-section-cart-drawer").outerHTML=e.sections["cart-drawer"]),window.app.unmount(),window.app.mount()})),n.on("cart:toggle",c),()=>{n.on(["cart:toggle","cart:render"],(()=>{}))(),e.removeEventListener("keyup",(e=>v(e,{type:"cart:toggle",boolean:"cartOpen"})))}})),f=window.component((e=>{const{update:n}=t(e,null),{key:s}=e.dataset;[].concat(n).forEach((e=>{const{value:t}=e.dataset;e.addEventListener("click",(()=>function(e,t){return function(e,t){return window.app.emit("cart:updating"),fetch(`${window.Phill.routes.cartChange}.js`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,quantity:t,sections:"cart-drawer"})}).then((e=>e.json())).then((async e=>(window.app.emit(["cart:updated","cart:render"],{cart:e}),e)))}(e,t)}(s,t)))}))})),L=window.component(((e,n)=>{const{closeModalBtn:s}=t(e,null),o=()=>{e.classList.toggle("flex"),e.classList.toggle("hidden"),document.body.classList.toggle("overflow-hidden")};e.addEventListener("click",(e=>{e.target.dataset.modalType&&o()}),{capture:!0}),s.addEventListener("click",o),n.on("modal:open",(t=>{e.dataset.modalType===t.type&&o()}))})),b=window.component(((e,n)=>{const{select:s}=t(e),o=new URLSearchParams(window.location.search).get("country_code"),a=s.dataset.current,r=s.dataset.default,i=()=>{const e=s.options[s.selectedIndex];e.dataset.url?window.location.href=`${e.dataset.url}?country_code=${e.value}`:s.form.submit()};r&&a!==r?(s.value=r,i()):o&&o!==a&&(s.value=o,i()),n.on("store:change",((e,{countryCode:t})=>{t!==a&&(s.value=t,i())})),s.addEventListener("change",(()=>i()))})),E="agent-stores:loading",T=window.component((async(e,n)=>{const{store:{store:o},customer:{secret:a,selected_store_customer:r,id:i}}=s(),{selectCustomer:c}=t(e,null),{select:d}=t(c,null);n.on(E,((e,t=!0)=>{d.classList[t?"add":"remove"]("is-loading"),d.disabled=t})),n.emit(E,null,!0);const l=new URLSearchParams({store:o,customerId:i,secret:a});d.addEventListener("change",(async e=>{n.emit(E,null,!0),await fetch(`https://karhu-b2b-functions.vercel.app/api/customer/set-selected-store?${l}&storeCustomerId=${e.target.value}`).then((async e=>{201!==e.status&&console.error(`Could not set selected store [${(await e.json()).message}]`)})),n.emit(E,null,!1),n.emit("store:change",null,{countryCode:e.target.options[e.target.selectedIndex].dataset.countryCode})})),await(async()=>{const e=await(async(e,t,n)=>{const s=new URLSearchParams({store:e,customerId:t,secret:n});return fetch(`https://karhu-b2b-functions.vercel.app/api/customer/list-agent-stores?${s}`).then((async e=>200===e.status?await e.json():(console.error(`Could not fetch agent stores [${(await e.json()).message}]`),[])))})(o,i,a);n.emit(E,null,!1),n.emit("agent-stores:received",null,{data:e}),e.length?(e=>{const t=document.createDocumentFragment();e.forEach((e=>{const n=document.createElement("option");r===e.id&&n.setAttribute("selected",!0),n.value=e.id,n.innerText=e.name,n.setAttribute("data-country-code",e.countryCode),t.appendChild(n)})),d.appendChild(t)})(e):d.setAttribute("disabled",!0)})()})),C="agent-stores:loading",S=window.component((async(e,n)=>{const{selectCustomer:s}=t(e,null),{select:o}=t(s,null),{customerId:a,customerSecret:r,store:i,selectedStoreCustomer:c}=e.dataset;if(!(a&&r&&i&&s))return;n.on(C,((e,t=!0)=>{s.classList[t?"add":"remove"]("is-loading")})),n.emit(C,null,!0);const d=new URLSearchParams({store:i,customerId:a,secret:r}),l=await fetch(`https://karhu-b2b-functions.vercel.app/api/customer/list-agent-stores?${d}`).then((async e=>{if(200===e.status){const t=await e.json();return n.emit("agent-stores:received",null,{data:t}),t}return console.error(`Could not fetch agent stores [${(await e.json()).message}]`),[]}));n.emit(C,null,!1),l.length?((e=>{const t=document.createDocumentFragment();e.forEach((e=>{const n=document.createElement("option");c===e.id&&n.setAttribute("selected",!0),n.value=e.id,n.innerText=e.name,t.appendChild(n)})),o.appendChild(t)})(l),o.addEventListener("change",(async e=>{n.emit(C,null,!0),await fetch(`https://karhu-b2b-functions.vercel.app/api/customer/set-selected-store?${d}&storeCustomerId=${e.target.value}`).then((async e=>{201===e.status?window.location.reload():console.error(`Could not set selected store [${(await e.json()).message}]`)})),n.emit(C,null,!1)}))):o.setAttribute("disabled",!0)})),k={sectionRendering:m,consoleLog:w,accordion:g,header:h,cartDrawer:y,cartItem:f,modal:L,countrySelect:b,storeSelect:T,popup:window.component(((e,n)=>{const{popupOverlay:s}=t(e,null),o=()=>{e.classList.add("hidden"),document.body.classList.remove("overflow-hidden")};n.on("popup:open",((t,n)=>{e.dataset.popup===n&&(e.classList.remove("hidden"),document.body.classList.add("overflow-hidden"))})),n.on("popup:close",((t,n)=>{e.dataset.popup===n&&o()})),s.addEventListener("click",(e=>{e.currentTarget.dataset.popupOverlay&&o()}))})),announcementBar:S};window.app.add(p),window.app.add(k),window.app.mount()})();
>>>>>>> feat/save-cart
