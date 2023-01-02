import choozy from '../../lib/choozy';

export default window.component(node => {
  const { gatewayName } = choozy(node, null);
  const gateWaysToHide = ['credit_card'];
  const gateWays = [].concat(gatewayName);

  // Hide Shopify Payments' default payment methods
  gateWays.forEach(gateway => {
    if (gateWaysToHide.includes(gateway.dataset.gatewayName)) gateway.remove();
  });
});
