/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';
import getLiquidVariables from '../../lib/get-liquid-variables';

const getElementByDataId = id => element => element.dataset.id === id;

export default window.component(async (node, ctx) => {
  const {
    editItemBtn,
    sidebar,
    sidebarLayer,
    closeSidebarBtn,
    saveCartBtn,
    closePopupBtn,
    shareCartBtn,
    saveCartPopupBtn,
    cartInput,
    errorMessage,
  } = choozy(node);

  const storeData = getLiquidVariables();

  const setErrorState = message => {
    errorMessage.innerText = message;
    console.log(!message);
    cartInput.setAttribute('required', !message);
    cartInput.setAttribute('aria-invalid', !message);
  };

  const sidebarList = Array.isArray(sidebar) ? Array.from(sidebar) : [sidebar];

  const onToggleSidebar = e => {
    const { id: itemId } = e.currentTarget.dataset;
    const sidebarEl = sidebarList.find(getElementByDataId(itemId));
    sidebarEl.classList.toggle('is-active');
    sidebarLayer.classList.toggle('is-active');
    sidebarLayer.dataset.id = itemId;
    document.body.classList.toggle('overflow-hidden');
  };

  editItemBtn &&
    [].concat(editItemBtn).forEach(btn => btn.addEventListener('click', onToggleSidebar));
  closeSidebarBtn &&
    [].concat(closeSidebarBtn).forEach(btn => btn.addEventListener('click', onToggleSidebar));
  sidebarLayer.addEventListener('click', onToggleSidebar);

  const onOpenSaveCartPopup = () => ctx.emit('popup:open', null, 'save-cart');
  const onCloseSaveCartPopup = () => {
    ctx.emit('popup:close', null, 'save-cart');
    setErrorState('');
  };

  saveCartBtn && saveCartBtn.addEventListener('click', onOpenSaveCartPopup);
  closePopupBtn &&
    [].concat(closePopupBtn).forEach(btn => btn.addEventListener('click', onCloseSaveCartPopup));

  const getShareLink = (cartName = 'test6') => {
    const {
      customer: { id: customerId },
    } = storeData;
    return `${window.location.origin}/pages/share-cart?agentId=${customerId}&cartName=${cartName}`;
  };

  const onCopySuccess = () => {
    shareCartBtn.classList.add('is-active');
    setTimeout(() => {
      shareCartBtn.classList.remove('is-active');
    }, 2000);
  };

  shareCartBtn &&
    shareCartBtn.addEventListener('click', async () => {
      const url = getShareLink('test6');
      await navigator.clipboard.writeText(url);
      onCopySuccess();
    });

  const getSaveCartQuery = () => {
    const {
      store: { store },
      customer: { secret, id: customerId },
    } = storeData;
    return new URLSearchParams({
      store,
      secret,
      customerId,
    });
  };

  const getCartItems = () => {
    const { item } = choozy(node, null);
    return [].concat(item).map(productEl => {
      const { id, productId, quantity } = productEl.dataset;
      return { id, productId, quantity };
    });
  };

  const saveCart = () => {
    const query = getSaveCartQuery();
    const cartItems = getCartItems();
    return fetch(`${process.env.API_URL}/customer/save-cart?${query}`, {
      method: 'POST',
      body: JSON.stringify({
        name: cartInput.value,
        updated_at: new Date(),
        line_items: cartItems,
      }),
    }).then(async res => {
      const data = await res.json();
      if (res.status === 200) {
        return data;
      }
      throw new Error(data.message);
    });
  };

  const toggleRenderState = () => {
    saveCartPopupBtn.classList.toggle('is-active');
    document.body.classList.toggle('pointer-events-none');
  };

  const onToggleSaveCartBtnState = () => {
    saveCartBtn.classList.toggle('is-active');
    saveCartBtn.toggleAttribute('disabled');
  };

  saveCartPopupBtn.addEventListener('click', async () => {
    if (!cartInput.value) {
      setErrorState('Please fill in a name');
      return;
    }

    toggleRenderState();
    setErrorState('');
    try {
      await saveCart();
      onCloseSaveCartPopup();
      cartInput.value = '';
      onToggleSaveCartBtnState();
      setTimeout(() => {
        onToggleSaveCartBtnState();
      }, 1000);
    } catch (e) {
      setErrorState(e.message);
    } finally {
      toggleRenderState();
    }
  });
});
