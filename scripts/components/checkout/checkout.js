import getLiquidVariables from '../../lib/get-liquid-variables';

const querySelect = (node, queries) => queries.map(q => node.querySelector(q));

export default window.component(node => {
  const {
    skip_payment_discount_code: discountCode,
    skip_payment_discount_applied: discountApplied,
  } = getLiquidVariables();

  const [totalSectionElement] = querySelect(node, ['.order-summary__sections']);

  const replaceTotalWithSubtotal = () => {
    const [subtotalElement, totalElement] = querySelect(node, [
      '[data-checkout-subtotal-price-target]',
      '.total-line [data-checkout-payment-due-target]',
    ]);

    if (totalElement.innerText !== subtotalElement.innerText)
      // Check to prevent infinite loop in MutationObserver
      totalElement.innerText = subtotalElement.innerText;
  };

  replaceTotalWithSubtotal();

  new MutationObserver(mutationList => {
    mutationList.forEach(mutation => {
      const { type, addedNodes } = mutation;
      if (type !== 'childList' || !addedNodes[0]) return;

      const totalMutation =
        addedNodes[0].nodeType === Node.ELEMENT_NODE
          ? addedNodes[0].querySelector('[data-checkout-payment-due-target]')
          : 'checkoutPaymentDueTarget' in addedNodes[0].parentNode.dataset &&
            addedNodes[0].parentNode;

      if (totalMutation) replaceTotalWithSubtotal();
    });
  }).observe(totalSectionElement, {
    childList: true,
    subtree: true,
  });

  if (!discountApplied) {
    const [discountInput, discountSubmit] = querySelect(node, [
      '.order-summary__section--discount [name="checkout[reduction_code]"]',
      '.order-summary__section--discount [name="checkout[submit]"]',
    ]);
    discountInput.value = discountCode;
    discountSubmit.click();
  }
});
