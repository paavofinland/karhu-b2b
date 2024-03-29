/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';
import fetchFunction from '../../lib/fetch-function';
import getLiquidVariables from '../../lib/get-liquid-variables';

export default window.component((node, ctx) => {
  if (window.location.search.includes('menu=carts')) {
    node.classList.remove('hidden');
  }

  const {
    store: { store },
    customer: { secret: customerSecret, id: customerId },
  } = getLiquidVariables();

  const { deleteCartBtn, deleteCartPopupBtn, cart, cartsLength, cartsCount, container, empty } =
    choozy(node, null);

  const toggleLoadingDeleteState = e => {
    e.target.classList.toggle('is-active');
    document.body.classList.toggle('pointer-events-none');
  };

  const updateCartCount = () => {
    const cartCount = parseFloat(cartsLength.innerText);
    const newCartCount = cartCount - 1;

    if (newCartCount > 0) {
      cartsLength.innerText = newCartCount;
    } else {
      cartsCount.classList.add('hidden');
    }

    return newCartCount;
  };

  const removeCarts = cartId => {
    const cartElemsToRemove = [].concat(cart).filter(cartElem => cartElem.dataset.cart === cartId);
    cartElemsToRemove.forEach(elem => elem.remove());
  };

  const getQueryParams = cartId => {
    return new URLSearchParams({
      store,
      secret: customerSecret,
      customerId,
      cartId: encodeURI(cartId),
    });
  };

  deleteCartBtn &&
    [].concat(deleteCartBtn).forEach(btn =>
      btn.addEventListener('click', e => {
        deleteCartPopupBtn.dataset.id = e.currentTarget.dataset.id;
        ctx.emit('popup:open', null, 'delete-cart');
      })
    );

  deleteCartPopupBtn &&
    deleteCartPopupBtn.addEventListener('click', async e => {
      const cartId = deleteCartPopupBtn.dataset.id;
      const query = getQueryParams(cartId);
      toggleLoadingDeleteState(e);

      await fetchFunction(`/customer/delete-cart?${query}`, { method: 'POST' }).catch(e => {
        console.info('[unhandled error]');
      });

      removeCarts(cartId);
      const newCartCount = updateCartCount();
      if (newCartCount === 0) {
        empty.classList.remove('hidden');
        [].concat(container).forEach(elem => elem.remove());
      }

      deleteCartPopupBtn.dataset.id = '';
      ctx.emit('popup:close', null, 'delete-cart');
      toggleLoadingDeleteState(e);
    });
});
