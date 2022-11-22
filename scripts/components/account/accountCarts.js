/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';
import getLiquidVariables from '../../lib/get-liquid-variables';

const deleteCart = query => {
  return fetch(`${process.env.API_URL}/customer/delete-cart?${query}`, {
    method: 'POST',
  }).then(async res => {
    console.log(res.status);
    if (res.status === 202) return res;
    throw new Error(res.message);
  });
};

export default window.component((node, ctx) => {
  if (window.location.search.includes('menu=carts')) {
    node.classList.remove('hidden');
  }

  const {
    store: { store },
    customer: { secret: customerSecret, id: customerId },
  } = getLiquidVariables();

  const { deleteCartBtn, deleteCartPopupBtn, cart, cartsLength, container, empty, viewCartBtn } =
    choozy(node, null);

  let currentCartId = null;

  const toggleLoadingDeleteState = e => {
    e.target.classList.toggle('is-active');
    document.body.classList.toggle('pointer-events-none');
  };

  const updateCartCount = () => {
    const cartCount = parseFloat(cartsLength.innerText);
    const newCartCount = cartCount - 1;
    cartsLength.innerText = newCartCount;
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

  viewCartBtn &&
    [].concat(viewCartBtn).forEach(btn =>
      btn.addEventListener('click', async e => {
        console.log(e.target);
      })
    );

  deleteCartBtn &&
    [].concat(deleteCartBtn).forEach(btn =>
      btn.addEventListener('click', e => {
        currentCartId = e.currentTarget.dataset.name;
        ctx.emit('popup:open', null, 'delete-cart');
      })
    );

  deleteCartPopupBtn &&
    [].concat(deleteCartPopupBtn).forEach(btn =>
      btn.addEventListener('click', async e => {
        const cartId = currentCartId;
        const query = getQueryParams(cartId);
        toggleLoadingDeleteState(e);
        try {
          await deleteCart(query);
          removeCarts(cartId);
          const newCartCount = updateCartCount();
          if (newCartCount === 0) {
            empty.classList.remove('hidden');
            [].concat(container).forEach(elem => elem.remove());
          }
        } catch (err) {
          console.log(err);
        } finally {
          currentCartId = '';
          ctx.emit('popup:close', null, 'delete-cart');
          toggleLoadingDeleteState(e);
        }
      })
    );
});
