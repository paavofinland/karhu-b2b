/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { updateCart } from '../../lib/cart';
import choozy from '../../lib/choozy';
import getLiquidVariables from '../../lib/get-liquid-variables';
import remount from '../../lib/remount';

export default window.component(async (node, ctx) => {
  const { itemCount } = node.dataset;
  const { removeForm, storeId, attributeInput, noteInput, goToCheckoutBtn } = choozy(node);
  const {
    customer: { tags },
  } = getLiquidVariables();

  const attributeInputs = [].concat(attributeInput).filter(Boolean);

  const isAgent = tags.includes('agent');
  if (!isAgent) {
    goToCheckoutBtn.removeAttribute('disabled');
  }

  [...attributeInputs, noteInput].forEach(input =>
    input?.addEventListener('blur', async e => {
      await updateCart(new FormData(e.target.form));
    })
  );

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

  ctx.on('store:change', (_, { id }) => {
    if (!id || !storeId || !goToCheckoutBtn) return;
    storeId.setAttribute('value', id);
    goToCheckoutBtn.removeAttribute('disabled');
  });

  []
    .concat(removeForm)
    .filter(Boolean)
    .forEach(f =>
      f.addEventListener('submit', async e => {
        e.preventDefault();
        ctx.emit('cart:loading', null, true);
        console.log(new FormData(e.target));
        await updateCart(new FormData(e.target));
        ctx.emit('cart:render');
      })
    );
});
