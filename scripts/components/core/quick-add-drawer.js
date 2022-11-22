import choozy from '../../lib/choozy';

export default window.component((node, ctx) => {
  const { drawer, backdrop } = choozy(node);

  let closeTimeout;

  const close = () => {
    drawer.classList.remove('is-active');
    backdrop.classList.remove('is-active');
  };

  ctx.on('quick-add:open', (_, { html }) => {
    drawer.innerHTML = html;
    drawer.classList.add('is-active');
    backdrop.classList.add('is-active');
    window.app.unmount();
    window.app.mount();
  });

  backdrop.addEventListener('click', close);
  ctx.on('cart:update', () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    closeTimeout = setTimeout(() => close(), 1000);
  });
});
