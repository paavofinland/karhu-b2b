import choozy from '../../lib/choozy';
import getLiquidVariables from '../../lib/get-liquid-variables';

export default window.component((node, ctx) => {
  const {
    store: { store },
    customer: { secret, id: customerId, tags },
  } = getLiquidVariables();
  const agentId = tags
    .find(tag => tag.includes('id:'))
    .split(':')
    .pop();

  const {
    saveButton,
    closePopupBtn,
    shareCartPopupBtn,
    saveCartPopupBtn,
    errorMessage,
    cartInput,
    lineItemsJson,
  } = choozy(node);

  const setErrorState = message => {
    errorMessage.innerText = message;
    const isValid = Boolean(message || !errorMessage);
    cartInput.setAttribute('aria-invalid', isValid);
  };

  saveButton.addEventListener('click', () => ctx.emit('popup:open', null, 'save-cart'));

  [].concat(closePopupBtn).forEach(btn =>
    btn.addEventListener('click', e => {
      const { type } = e.currentTarget.dataset;
      ctx.emit('popup:close', null, type);
      setErrorState('');
    })
  );

  shareCartPopupBtn.addEventListener('click', async e => {
    const { cartId } = e.target.dataset;
    const url = `${window.location.origin}/pages/share-cart?agentId=${agentId}&cartId=${cartId}`;
    await navigator.clipboard.writeText(url);
    shareCartPopupBtn.classList.add('is-active');
    setTimeout(() => {
      shareCartPopupBtn.classList.remove('is-active');
    }, 2000);
  });

  const toggleSaveCartRenderState = () => {
    saveCartPopupBtn.classList.toggle('is-active');
    document.body.classList.toggle('pointer-events-none');
  };

  const onCloseSaveCartPopup = type => {
    ctx.emit('popup:close', null, type);
    setErrorState('');
  };

  const saveCart = () => {
    const query = new URLSearchParams({
      store,
      secret,
      customerId,
      agentId,
    });

    return fetch(`${process.env.API_URL}/customer/save-cart?${query}`, {
      method: 'POST',
      body: JSON.stringify({
        name: cartInput.value,
        updated_at: new Date(), // TODO: server side?
        line_items: JSON.parse(lineItemsJson.innerHTML),
      }),
    }).then(async res => {
      const data = await res.json();
      if (res.status === 200) {
        return data;
      }
      throw new Error(data.message);
    });
  };

  saveCartPopupBtn.addEventListener('click', async () => {
    if (!cartInput.value) {
      setErrorState('Please fill in a name');
      return;
    }

    toggleSaveCartRenderState();
    setErrorState('');
    try {
      const { id: cartId } = await saveCart();
      onCloseSaveCartPopup('save-cart');
      ctx.emit('popup:open', null, 'share-cart');
      shareCartPopupBtn.dataset.cartId = cartId;
      cartInput.value = '';
    } catch (e) {
      setErrorState(e.message);
    } finally {
      toggleSaveCartRenderState();
    }
  });

  cartInput.addEventListener('input', e => {
    if (e.target.value) cartInput.setAttribute('aria-invalid', false);
  });
});
