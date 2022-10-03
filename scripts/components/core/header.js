import choozy from '../../lib/choozy';

export default window.component((node, ctx) => {
  const { cartCount, cartToggle } = choozy(node, null);

  const updateCartCount = cart => {
    if (!cart?.token) return;
    cartCount.textContent = cart.item_count;
  };

  ctx.on('cart:updated', ({ cart }) => updateCartCount(cart));

  cartToggle.addEventListener('click', e => {
    e.preventDefault();
    ctx.emit('cart:toggle', ({ cartOpen }) => ({ cartOpen: !cartOpen ?? true }));
  });

  updateCartCount(ctx.getState()?.cart);
});
