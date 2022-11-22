(()=>{"use strict";function e(e=document.body,s){const t=[...e.querySelectorAll(s?`[class*="${s}"]`:"*")],d=s?"classList":"dataset";return t.reduce(((e,t)=>([].slice.call(s?t[d]:Object.entries(t[d])).forEach((d=>{let n;s&&d.slice(0,s.length)===s?n=d.slice(s.length,d.length):s||([n]=d),n&&(e[n]=e.hasOwnProperty(n)?e[n].constructor===Array?e[n].concat(t):[e[n],t]:t)})),e)),{})}const s={login:window.component((s=>{const{loginForm:t,recoverPasswordForm:d,toggleRecoverPasswordBtns:n,recoverMessageSent:o,recoverPasswordSuccess:c,emailList:r}=e(s,null),a=()=>{t.classList.toggle("hidden"),d.classList.toggle("hidden")};n.forEach((e=>{e.addEventListener("click",a)}));const i=()=>{const e=document.querySelector(".errors");e&&(e.style.display="none")};r.forEach((e=>{e.addEventListener("focus",i),e.addEventListener("keyup",i)})),(()=>{const{hash:e}=window.location;return"#recover"===e})()&&!o&&a(),o&&(t.classList.add("hidden"),d.classList.add("hidden"),c.classList.remove("hidden"))})),account:window.component((s=>{const{addAddressButton:t,resetPageButton:d,editAddressButton:n,addAddress:o,info:c,addresses:r,editAddresses:a,editAddressForm:i,makeDefaultButton:l,links:u}=e(s,null),h=e=>{e.preventDefault(),c.classList.remove("hidden"),r.classList.remove("hidden"),o.classList.add("hidden"),a.classList.add("hidden"),[].concat(i).forEach((e=>e.classList.add("hidden"))),window.scrollTo(0,0)};t&&t.addEventListener("click",(e=>{e.preventDefault(),o.classList.remove("hidden"),c.classList.add("hidden"),r.classList.add("hidden"),window.scrollTo(0,0)})),d&&[].concat(d).forEach((e=>{e.addEventListener("click",h)})),n&&[].concat(n).forEach((e=>{e.addEventListener("click",(s=>{s.preventDefault();const{addressId:t}=e.dataset;r.classList.add("hidden"),c.classList.add("hidden");const d=[].concat(i).find((e=>e.dataset.addressId===t));a.classList.remove("hidden"),d.classList.remove("hidden"),window.scrollTo(0,0)}))})),l&&[].concat(l).forEach((e=>{e.addEventListener("click",(e=>{const{addressId:s}=e.target.dataset,t=i.find((e=>e.dataset.addressId===s)).querySelector("form");t.querySelector('input[type="checkbox"]').click(),t.submit()}))})),window.location.href.includes("carts")&&u.forEach((e=>{const s=e.href.includes("carts");e.parentNode.classList[s?"remove":"add"]("text-grey-4")}))})),address:window.component((s=>{const{deleteAddressButton:t,deleteAddressModal:d,closeModal:n,deleteAddressConfirm:o}=e(s,null);n&&[].concat(n).forEach((e=>e.addEventListener("click",(e=>{e.preventDefault(),d.classList.remove("open")})))),t&&t.addEventListener("click",(e=>{e.preventDefault(),d.classList.add("open")})),o&&o.addEventListener("click",(()=>{document.getElementById(`delete-address-form--${o.dataset.addressId}`).submit()}))})),orders:window.component((async(s,t)=>{const{store:{store:d},customer:{secret:n,id:o}}=JSON.parse(document.querySelector("script#liquid-variables").innerHTML),{selectCustomer:c,ordersContainer:r,noOrders:a,customerSelectText:i,ordersTable:l,ordersTableRow:u,ordersBlockContainer:h,ordersBlock:m,orders:L}=e(s),v=({container:s,containerItem:t,orderList:d})=>{s.innerHTML="";const n=document.createDocumentFragment();d.forEach((s=>{const d=t.content.cloneNode(!0);Object.keys(s).forEach((t=>{const n=s[t];[].concat(e(d)[t]).filter(Boolean).forEach((e=>{e.innerText=n}))})),n.appendChild(d)})),s.appendChild(n)},p=async e=>{a.classList.add("hidden"),r.classList.add("hidden"),L.classList.add("is-active"),i&&i.classList.add("hidden");const s=await(async e=>{const s=new URLSearchParams({store:d,secret:n,customerId:o,selectedCustomerId:e?.target.value||""});return fetch(`https://karhu-b2b-functions.vercel.app/api/customer/get-store-customer-orders?${s}`).then((async e=>200===e.status?e.json():(console.error(`Could not fetch customer orders [${(await e.json()).message}]`),[])))})(e);L.classList.remove("is-active"),s.length?(r.classList.remove("hidden"),v({container:l,containerItem:u,orderList:s}),v({container:h,containerItem:m,orderList:s})):a.classList.remove("hidden")};c?(c.addEventListener("change",p),t.on("agent-stores:received",((e,{data:s})=>{c.classList.add("is-active"),c.removeAttribute("disabled"),i.classList.remove("hidden"),(e=>{const s=document.createDocumentFragment();e.forEach((e=>{const t=document.createElement("option");t.value=e.id,t.innerText=e.name,s.appendChild(t)})),c.appendChild(s)})(s)}))):p()}))};window.app.add(s),window.app.mount()})();