import choozy from '../../lib/choozy';
import getLiquidVariables from '../../lib/get-liquid-variables';
import { MAX_LINE_ITEMS } from './product-form';

const updateCart = async payload =>
  fetch(`${window.Shopify.routes.root}cart/update.js`, {
    method: 'POST',
    body: payload,
  }).then(r => r.json());

export default window.component((node, ctx) => {
  const { productId } = node.dataset;
  const { drawer, backdrop, submit, form, closeButton, updateErrorMsg } = choozy(node);

  const { line_items: lineItems } = getLiquidVariables();

  let addedLineItems = [];
  let removedLineItems = [];

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

    const formData = new FormData(e.target);
    Array.from(formData.entries()).forEach(([key, value]) => {
      if (value) return;
      formData.delete(key);
    });

    const response = await updateCart(formData);
    addedLineItems = [];
    removedLineItems = [];
    // TODO: Error handling?
    ctx.emit('cart:render');
  });

  const setError = (error = '') => {
    updateErrorMsg.innerHTML = error;
  };

  form.addEventListener('keypress', e => {
    if (e.target.value === '0') {
      e.target.value = e.target.value.slice(1);
    }
  });

  // TODO: refactor, remove duplication from product-form
  form.addEventListener('input', async e => {
    const { id: targetId, value: newQuantity } = e.target;
    if (Number(newQuantity) > 0 && !addedLineItems.includes(targetId)) {
      if (!lineItems.includes(targetId)) {
        addedLineItems.push(targetId);
      }
      const foundIdx = removedLineItems.findIndex(id => id === targetId);
      if (foundIdx !== -1) {
        removedLineItems.splice(foundIdx, 1);
      }
    } else if (!Number(newQuantity) && !removedLineItems.includes(targetId)) {
      if (lineItems.includes(targetId)) {
        removedLineItems.push(targetId);
      }
      const foundIdx = addedLineItems.findIndex(id => id === targetId);
      if (foundIdx !== -1) {
        addedLineItems.splice(foundIdx, 1);
      }
    }
    const tempLineItems = lineItems.filter(id => !removedLineItems.includes(id));
    if (addedLineItems.length + tempLineItems.length > MAX_LINE_ITEMS) {
      setError('You cannot add more than 500 items to your cart');
      submit.disabled = true;
      return;
    }
    setError();
    submit.disabled = false;
  });
});
