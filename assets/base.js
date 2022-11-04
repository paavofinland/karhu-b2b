(()=>{"use strict";const e=e=>new Promise((t=>{window?.hasLoaded?.scripts?.[e]?t():window.app.on(`${e}:loaded`,t)}));function t(e=document.body,t){const n=[...e.querySelectorAll(t?`[class*="${t}"]`:"*")],o=t?"classList":"dataset";return n.reduce(((e,n)=>([].slice.call(t?n[o]:Object.entries(n[o])).forEach((o=>{let a;t&&o.slice(0,t.length)===t?a=o.slice(t.length,o.length):t||([a]=o),a&&(e[a]=e.hasOwnProperty(a)?e[a].constructor===Array?e[a].concat(n):[e[a],n]:n)})),e)),{})}const n={hero:window.component((async n=>{const{slider:o,slide:a,prev:s,next:i}=t(n,null);if(a.length>1){await e("Swiper");const t=new Swiper(o,{slidesPerView:1,loop:!0,on:{afterInit:e=>{e.wrapperEl.classList.remove("overflow-hidden","flex")}}});s.addEventListener("click",(()=>t.slidePrev())),i.addEventListener("click",(()=>t.slideNext()))}})),cart:window.component((async e=>{const{editItemBtn:n,sidebar:o,sidebarLayer:a,closeSidebarBtn:s,saveCartBtn:i,popup:r,closePopupBtn:c}=t(e),d=Array.isArray(o)?Array.from(o):[o],l=e=>{const{id:t}=e.currentTarget.dataset;var n;d.find((n=t,e=>e.dataset.id===n)).classList.toggle("is-active"),a.classList.toggle("is-active"),document.body.classList.toggle("overflow-hidden")};n.addEventListener("click",l),s.addEventListener("click",l),a.addEventListener("click",l);const p=()=>r.classList.toggle("hidden");i.addEventListener("click",p),c.forEach((e=>e.addEventListener("click",p)))})),categoryOverview:window.component((async n=>{const{slider:o}=t(n,null);return await e("Swiper"),new Swiper(o,{allowTouchMove:!0,direction:"horizontal",slidesPerView:"auto",grabCursor:!0})}))},o=window.component((()=>{document.addEventListener("shopify:section:load",(()=>{window.app.unmount(),window.app.mount()}))})),a=window.component((e=>{const{text:t}=e.dataset;console.log("console:log",t)})),s=window.component(((e,n)=>{const{group:o}=e.dataset,{inner:a,toggle:s,shrinkBtn:i,expandBtn:r,toggleModalBtn:c}=t(e,null),d="is-active",l=()=>{e.style.setProperty("--innerHeight","auto"),e.style.setProperty("--innerHeight",`${a.scrollHeight}px`)};l(),window.addEventListener("resize",l,{passive:!0}),s.addEventListener("click",(()=>{n.emit("accordion:toggle",null,{open:!e.classList.contains(d),node:e,group:o})})),c&&c.addEventListener("click",(e=>{n.emit("modal:open",{type:e.target.dataset.modalType})})),n.on("accordion:toggle",((t,n={})=>{o===n.group&&(e.classList[n.open&&n.node===e?"add":"remove"](d),i.classList.toggle("hidden"),i.classList.toggle("flex"),r.classList.toggle("hidden"),r.classList.toggle("block"))}))})),i=window.component((e=>{const{hamburger:n,hamburgerOpened:o,hamburgerClosed:a,mobileMenu:s,main:i}=t(e),{clear:r}=e.dataset,c=document.querySelector("#shopify-section-announcement-bar").offsetHeight||0,d=()=>{void 0!==r&&i.classList[!o.classList.contains("hidden")||window.scrollY>c?"add":"remove"]("is-active")};window.addEventListener("scroll",d,{passive:!0}),window.addEventListener("load",d),n.addEventListener("click",(()=>{o.classList.toggle("hidden"),a.classList.toggle("hidden"),document.body.classList.toggle("overflow-hidden"),s.classList.toggle("left-0"),d()}));const l=()=>{s.style.height=window.innerHeight-c-s.parentElement.offsetHeight+"px"};l(),window.addEventListener("resize",l)}));const r=({keyCode:e},{type:t,boolean:n})=>{27===e&&t&&n&&window.app.emit(t,{[n]:!1})},c=window.component((async(e,n)=>{const o=e.parentNode,a=e,{toggle:s,clear:i,focusEl:c}=t(e,null),d=({cartOpen:t})=>{e.classList[t?"add":"remove"]("open"),t?(a.tabIndex="0",(c||e).focus()):a.tabIndex="-1"};return s.forEach((e=>{e.addEventListener("click",(()=>n.emit("cart:toggle",(({cartOpen:e})=>({cartOpen:!e??!0})))))})),d(n.getState()),i&&i.addEventListener("click",(()=>(window.app.emit("cart:updating"),fetch(`${window.Phill.routes.cartClear}.js`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({sections:"cart-drawer"})}).then((e=>e.json())).then((e=>(window.app.emit(["cart:updated","cart:render"],{cart:e}),e)))))),e.addEventListener("keyup",(e=>r(e,{type:"cart:toggle",boolean:"cartOpen"}))),await n.on("cart:render",(({cart:e})=>{o&&(document.getElementById("shopify-section-cart-drawer").outerHTML=e.sections["cart-drawer"]),window.app.unmount(),window.app.mount()})),n.on("cart:toggle",d),()=>{n.on(["cart:toggle","cart:render"],(()=>{}))(),e.removeEventListener("keyup",(e=>r(e,{type:"cart:toggle",boolean:"cartOpen"})))}})),d=window.component((e=>{const{update:n}=t(e,null),{key:o}=e.dataset;[].concat(n).forEach((e=>{const{value:t}=e.dataset;e.addEventListener("click",(()=>function(e,t){return function(e,t){return window.app.emit("cart:updating"),fetch(`${window.Phill.routes.cartChange}.js`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,quantity:t,sections:"cart-drawer"})}).then((e=>e.json())).then((async e=>(window.app.emit(["cart:updated","cart:render"],{cart:e}),e)))}(e,t)}(o,t)))}))})),l="agent-stores:loading",p={sectionRendering:o,consoleLog:a,accordion:s,header:i,cartDrawer:c,cartItem:d,announcementBar:window.component((async(e,n)=>{const{selectCustomer:o}=t(e,null),{select:a}=t(o,null),{customerId:s,customerSecret:i,store:r,selectedStoreCustomer:c}=e.dataset;if(!(s&&i&&r&&o))return;n.on(l,((e,t=!0)=>{o.classList[t?"add":"remove"]("is-loading")})),n.emit(l,null,!0);const d=new URLSearchParams({store:r,customerId:s,secret:i}),p=await fetch(`https://karhu-b2b-functions.vercel.app/api/customer/list-agent-stores?${d}`).then((async e=>{if(200===e.status){const t=await e.json();return n.emit("agent-stores:received",null,{data:t}),t}return console.error(`Could not fetch agent stores [${(await e.json()).message}]`),[]}));n.emit(l,null,!1),p.length?((e=>{const t=document.createDocumentFragment();e.forEach((e=>{const n=document.createElement("option");c===e.id&&n.setAttribute("selected",!0),n.value=e.id,n.innerText=e.name,t.appendChild(n)})),a.appendChild(t)})(p),a.addEventListener("change",(async e=>{n.emit(l,null,!0),await fetch(`https://karhu-b2b-functions.vercel.app/api/customer/set-selected-store?${d}&storeCustomerId=${e.target.value}`).then((async e=>{201===e.status?window.location.reload():console.error(`Could not set selected store [${(await e.json()).message}]`)})),n.emit(l,null,!1)})),n.emit("store-data:send",null,{data:e.dataset})):a.setAttribute("disabled",!0)})),modal:window.component(((e,n)=>{const{closeModalBtn:o}=t(e,null),a=()=>{e.classList.toggle("flex"),e.classList.toggle("hidden"),document.body.classList.toggle("overflow-hidden")};e.addEventListener("click",(e=>{e.target.dataset.modalType&&a()}),{capture:!0}),o.addEventListener("click",a),n.on("modal:open",(t=>{e.dataset.modalType===t.type&&a()}))}))};window.app.add(n),window.app.add(p),window.app.mount()})();