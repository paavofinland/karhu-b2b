(()=>{"use strict";function e(e=document.body,s="js-"){const d=[...e.querySelectorAll(s?`[class*="${s}"]`:"*")],t=s?"classList":"dataset";return d.reduce(((e,d)=>([].slice.call(s?d[t]:Object.entries(d[t])).forEach((t=>{let n;s&&t.slice(0,s.length)===s?n=t.slice(s.length,t.length):s||([n]=t),n&&(e[n]=e.hasOwnProperty(n)?e[n].constructor===Array?e[n].concat(d):[e[n],d]:d)})),e)),{})}const s=window.component((s=>{const{loginForm:d,recoverPasswordForm:t,toggleRecoverPasswordBtns:n,recoverMessageSent:o,recoverPasswordSuccess:c,emailList:a}=e(s,null),i=()=>{d.classList.toggle("hidden"),t.classList.toggle("hidden")};n.forEach((e=>{e.addEventListener("click",i)}));const r=()=>{const e=document.querySelector(".errors");e&&(e.style.display="none")};a.forEach((e=>{e.addEventListener("focus",r),e.addEventListener("keyup",r)})),(()=>{const{hash:e}=window.location;return"#recover"===e})()&&!o&&i(),o&&(d.classList.add("hidden"),t.classList.add("hidden"),c.classList.remove("hidden"))})),d=window.component((s=>{const{addAddressButton:d,resetPageButton:t,editAddressButton:n,addAddress:o,info:c,addresses:a,editAddresses:i,editAddressForm:r,accountPageSwitcher:l}=e(s,null);l.addEventListener("change",(()=>{window.location.href=l.value}));const w=e=>{e.preventDefault(),c.classList.remove("hidden"),a.classList.remove("hidden"),o.classList.add("hidden"),i.classList.add("hidden"),[].concat(r).forEach((e=>e.classList.add("hidden"))),window.scrollTo(0,0)};d&&d.addEventListener("click",(e=>{e.preventDefault(),o.classList.remove("hidden"),c.classList.add("hidden"),a.classList.add("hidden"),window.scrollTo(0,0)})),t&&[].concat(t).forEach((e=>{e.addEventListener("click",w)})),n&&[].concat(n).forEach((e=>{e.addEventListener("click",(s=>{s.preventDefault();const{addressId:d}=e.dataset;a.classList.add("hidden"),c.classList.add("hidden");const t=[].concat(r).find((e=>e.dataset.addressId===d));i.classList.remove("hidden"),t.classList.remove("hidden"),window.scrollTo(0,0)}))}))})),t=window.component((s=>{const{deleteAddressButton:d,deleteAddressModal:t,closeModal:n,deleteAddressConfirm:o}=e(s,null);n&&[].concat(n).forEach((e=>e.addEventListener("click",(e=>{e.preventDefault(),t.classList.remove("open")})))),d&&d.addEventListener("click",(e=>{e.preventDefault(),t.classList.add("open")})),o&&o.addEventListener("click",(()=>{document.getElementById(`delete-address-form--${o.dataset.addressId}`).submit()}))})),n={login:s,account:d,address:t,orders:window.component((async s=>{var d;await(d="Keen slider",new Promise((e=>{window?.hasLoaded?.scripts?.[d]?e():window.app.on(`${d}:loaded`,e)})));const{orderSlider:t}=e(s,null);t&&[].concat(t).forEach((e=>{new KeenSlider(e,{breakpoints:{"(min-width: 1024px)":{slides:{perView:5.5,spacing:16}}},slides:{perView:2.8,spacing:8}})}))}))};window.app.add(n),window.app.mount()})();
