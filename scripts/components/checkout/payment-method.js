import choozy from '../../lib/choozy';
import getLiquidVariables from '../../lib/get-liquid-variables';

export default window.component(node => {
  const { gatewayName } = choozy(node, null);
  const {
    payment_methods: { hide_credit_card: hideCreditCard },
  } = getLiquidVariables();

  const gateWaysToHide = [...(hideCreditCard && ['credit_card'])];
  const gateWays = [].concat(gatewayName);

  // Hide Shopify Payments' default payment methods
  gateWays.forEach(gateway => {
    if (gateWaysToHide.includes(gateway.dataset.gatewayName)) gateway.remove();
  });
});
