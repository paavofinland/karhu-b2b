import remount from '../../lib/remount';

export default window.component(async (node, ctx) => {
  const { itemCount } = node.dataset;

  ctx.on('cart-edit-drawer:toggle', (_, id = false) =>
    node.classList[id === false ? 'add' : 'remove'](
      'is-loading:opacity-50',
      'is-loading:pointer-events-none'
    )
  );

  ctx.emit('cart:update', null, { count: itemCount });

  ctx.on('cart:loading', (_, isLoading = false) => {
    node.classList[isLoading ? 'add' : 'remove']('is-loading');
  });

  ctx.on('cart:render', async () => {
    const { 'main-cart': html } = await fetch(
      `${window.location.origin + window.location.pathname}?sections=main-cart`
    ).then(r => r.json());
    // eslint-disable-next-line no-param-reassign
    node.innerHTML = html;
    remount();
    ctx.emit('cart:loading');
    ctx.emit('cart-edit-drawer:toggle');
  });
});
