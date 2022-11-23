import choozy from '../../lib/choozy';

const updateCart = async payload =>
  fetch(`${window.Shopify.routes.root}cart/update.js`, {
    method: 'POST',
    body: payload,
  }).then(r => r.json());

export default window.component((node, ctx) => {
  const { productId } = node.dataset;
  const { drawer, backdrop, submit, form, closeButton } = choozy(node);

  ctx.on('cart-edit-drawer:toggle', (_, id = false) => {
    [drawer, backdrop].forEach(e => e.classList[id === productId ? 'add' : 'remove']('is-active'));
  });

  ctx.on('cart:loading', (_, isLoading = false) => {
    submit.classList[isLoading ? 'add' : 'remove']('is-active');
  });

  [backdrop, closeButton].forEach(e =>
    e.addEventListener('click', () => ctx.emit('cart-edit-drawer:toggle'))
  );

  form.addEventListener('submit', async e => {
    e.preventDefault();
    ctx.emit('cart:loading', null, true);
    const response = await updateCart(new FormData(e.target));
    // TODO: Error handling?
    ctx.emit('cart:render');
  });
});
