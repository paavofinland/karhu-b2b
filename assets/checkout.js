(()=>{"use strict";const e=window.component((e=>{})),t={childList:!0,subtree:!0},o={paymentMethod:e,checkout:window.component(((e,o)=>{const{skip_payment_discount_code:n,skip_payment_discount_applied:c}=JSON.parse(document.querySelector("script#liquid-variables").innerHTML),r=document.querySelector("[data-checkout-subtotal-price-target]").innerText;document.querySelector(".total-line [data-checkout-payment-due-target]").innerText=r;const d=document.querySelector(".order-summary__sections");new MutationObserver((e=>{e.forEach((e=>{const{type:t,addedNodes:o}=e;if("childList"!==t||!o[0])return;const n=o[0].nodeType===Node.ELEMENT_NODE?o[0].querySelector("[data-checkout-payment-due-target]"):"checkoutPaymentDueTarget"in o[0].parentNode.dataset&&o[0].parentNode;n&&n.innerText!==r&&(n.innerText=r)}))})).observe(d,t),c||(document.querySelector('[name="checkout[reduction_code]"]').value=n,document.querySelector('[name="checkout[submit]"]').click())}))};window.app.add(o),window.app.mount()})();