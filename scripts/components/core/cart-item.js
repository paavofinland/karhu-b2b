import choozy from '../../lib/choozy';

const updateCart = payload =>
  fetch(`${window.Shopify.routes.root}cart/update.js`, {
    method: 'POST',
    body: payload,
  });

export default window.component((node, ctx) => {
  const { productId } = node.dataset;

  if (!productId) return;

  const { edit, removeForm } = choozy(node);

  edit.addEventListener('click', () => ctx.emit('cart-edit-drawer:toggle', null, productId));
  removeForm.addEventListener('submit', async e => {
    e.preventDefault();
    ctx.emit('cart:loading', null, true);
    await updateCart(new FormData(e.target));
    ctx.emit('cart:render');
  });
});
