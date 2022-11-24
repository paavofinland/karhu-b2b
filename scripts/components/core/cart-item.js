import choozy from '../../lib/choozy';

export default window.component((node, ctx) => {
  const { productId } = node.dataset;

  if (!productId) return;

  const { edit } = choozy(node);

  edit.addEventListener('click', () => ctx.emit('cart-edit-drawer:toggle', null, productId));
});
