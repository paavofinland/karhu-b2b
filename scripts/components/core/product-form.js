import choozy from '../../lib/choozy';
import getLiquidVariables from '../../lib/get-liquid-variables';

export const MAX_LINE_ITEMS = 500;

export default window.component((node, ctx) => {
  const {
    size,
    sizeButton,
    quantityInputs: quantityInput,
    addToCartButton,
    error: errorElement,
  } = choozy(node);

  const {
    translations: { server_error: serverErrorMessage, select_sizes_error: selectSizesErrorMessage },
    line_items: lineItems,
  } = getLiquidVariables();

  let localLineItems = [];

  const sizeLabels = [].concat(size).filter(Boolean);
  const sizeButtons = [].concat(sizeButton).filter(Boolean);
  const quantityInputs = [].concat(quantityInput).filter(Boolean);

  const { state } = choozy(addToCartButton);
  const buttonStates = [].concat(state);

  const toggleButtonAnimations = (enable = true) => {
    buttonStates.forEach(s => {
      // eslint-disable-next-line no-param-reassign
      s.style.transition = enable ? '' : 'unset';
    });
  };

  const setError = (error = '') => {
    errorElement.innerHTML = error;
  };

  let resetAddTocartButtonTimeout;

  node.addEventListener('submit', async e => {
    e.preventDefault();

    setError();
    toggleButtonAnimations();

    if (resetAddTocartButtonTimeout) clearTimeout(resetAddTocartButtonTimeout);

    addToCartButton.classList.add('is-loading');
    addToCartButton.classList.remove('is-active');
    addToCartButton.disabled = true;

    const formData = new FormData(e.target);
    const quantities = Array.from(formData.entries())
      .filter(([key]) => key.endsWith('[quantity]'))
      .map(([, value]) => Number(value));

    // const validateQuantity =

    try {
      if (quantities.filter(q => q > 0).length === 0) {
        throw Error(selectSizesErrorMessage);
      }

      Array.from(formData.entries()).forEach(([, value], idx) => {
        if (value && value !== '0') return;
        const itemIdx = Math.floor(idx / 2);
        formData.delete(`items[${itemIdx}][id]`);
        formData.delete(`items[${itemIdx}][quantity]`);
      });

      const response = await fetch(`${window.Shopify.routes.root}cart/add.js`, {
        method: 'POST',
        body: formData,
      });
      localLineItems = [];

      const json = await response.json();

      if (response.status !== 200 && json.description) {
        throw Error(json.description);
      } else if (response.status !== 200) {
        throw Error(serverErrorMessage);
      }

      addToCartButton.classList.remove('is-loading');
      addToCartButton.disabled = false;

      ctx.emit('cart:update', null, {
        countAdd: quantities.reduce((acc, quantity) => acc + quantity, 0),
      });
      addToCartButton.classList.add('is-active');

      resetAddTocartButtonTimeout = setTimeout(() => {
        toggleButtonAnimations(false);
        addToCartButton.classList.remove('is-active');
      }, 2000);
    } catch (error) {
      setError(error.message);
    }

    addToCartButton.classList.remove('is-loading');
    addToCartButton.disabled = false;
  });

  // TODO: refactor, remove duplication from cart-edit-drawer
  node.addEventListener('input', async e => {
    const newQuantity = +e.target.value;
    setError();
    addToCartButton.disabled = false;
    if (
      newQuantity > 0 &&
      !localLineItems.includes(e.target.id) &&
      !lineItems.includes(e.target.id)
    ) {
      localLineItems.push(e.target.id);
    } else if (!newQuantity) {
      const foundIdx = localLineItems.findIndex(id => id === e.target.id);
      if (foundIdx !== -1) {
        localLineItems.splice(foundIdx, 1);
      }
    }
    if (localLineItems.length + lineItems.length > MAX_LINE_ITEMS) {
      setError('You cannot add more than 500 items to your cart');
      addToCartButton.disabled = true;
    }
  });

  quantityInputs.forEach(input => {
    input.addEventListener('keypress', e => {
      setError();
      if (e.target.value === '0') {
        e.target.value = e.target.value.slice(1);
      }
    });
  });

  sizeButtons.forEach(button =>
    button.addEventListener('click', e => {
      const sizeLabel = e.target.textContent.trim().toLowerCase();

      sizeLabels.forEach(label => {
        // eslint-disable-next-line no-param-reassign
        label.innerText = label.dataset[sizeLabel];
      });

      sizeButtons.forEach(({ classList }) => classList.remove('is-active'));
      button.classList.add('is-active');
    })
  );
});
