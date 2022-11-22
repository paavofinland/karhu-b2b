export default window.component(async (node, ctx) => {
  const { productHandle } = node.dataset;

  node.addEventListener('click', async () => {
    node.classList.add('is-loading');

    const { 'quick-add-drawer-content': quickAddDrawerContent } = await fetch(
      `${window.Shopify.routes.root}products/${productHandle}?sections=quick-add-drawer-content`
    ).then(r => r.json());

    ctx.emit('quick-add:open', null, { html: quickAddDrawerContent });

    node.classList.remove('is-loading');
  });
});
