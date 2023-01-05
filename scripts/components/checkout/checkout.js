import getLiquidVariables from '../../lib/get-liquid-variables';

export default window.component((node, ctx) => {
  const { skip_payment_discount_code: discountCode, skip_payment_discount_applied: applied } =
    getLiquidVariables();

  // TODO: Hide discount block

  // TODO: Hide discount price and copy subtotal to total

  if (!applied) {
    console.log(discountCode);
    //   TODO: apply discount code
  }
});
