import getLiquidVariables from '../../lib/get-liquid-variables';

const config = {
  childList: true,
  subtree: true,
};

export default window.component((node, ctx) => {
  const { skip_payment_discount_code: discountCode, skip_payment_discount_applied: applied } =
    getLiquidVariables();

  const subtotalEl = document.querySelector('[data-checkout-subtotal-price-target]');
  const subtotal = subtotalEl.innerText;
  const total = document.querySelector('.total-line [data-checkout-payment-due-target]');
  total.innerText = subtotal;

  const totalSection = document.querySelector('.order-summary__sections');

  const callback = mutationList => {
    mutationList.forEach(mutation => {
      const { type, addedNodes } = mutation;
      if (type !== 'childList' || !addedNodes[0]) return;
      const newTotal =
        addedNodes[0].nodeType === Node.ELEMENT_NODE
          ? addedNodes[0].querySelector('[data-checkout-payment-due-target]')
          : 'checkoutPaymentDueTarget' in addedNodes[0].parentNode.dataset &&
            addedNodes[0].parentNode;
      if (!newTotal || newTotal.innerText === subtotal) return;
      newTotal.innerText = subtotal;
    });
  };

  const observer = new MutationObserver(callback);
  observer.observe(totalSection, config);

  if (!applied) {
    const discountInput = document.querySelector('[name="checkout[reduction_code]"]');
    discountInput.value = discountCode;
    const discountSubmit = document.querySelector('[name="checkout[submit]"]');
    discountSubmit.click();
  }
});
