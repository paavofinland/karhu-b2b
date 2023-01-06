/* eslint-disable no-restricted-globals */
import getLiquidVariables from '../../lib/get-liquid-variables';
import choozy from '../../lib/choozy';

export default window.component(node => {
  const { skip_payment_discount_applied: discountApplied } = getLiquidVariables();
  const { paymentForm } = choozy(node);

  paymentForm.addEventListener('submit', e => {
    if (!discountApplied) {
      e.preventDefault();
      window.alert('Something went wrong, please reload the page and try again.');
      location.reload();
    }
  });
});
