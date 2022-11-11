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
    shareCartBtn,
    closePopupBtn,
    saveCartPopupBtn,
    cartInput,
    errorMessage,
  } = choozy(node);

  const storeData = getLiquidVariables();

  const setErrorState = message => {
    const action = message ? 'add' : 'remove';
    errorMessage.innerText = message;
    errorMessage.classList[action]('is-active');
    cartInput.classList[action]('is-active');
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

  const getCopyData = () => {
    const { item: itemList, subtotal } = choozy(node, null);
    const data = {
      subtotal: subtotal.dataset.subtotal,
      items: [],
    };
    [].concat(itemList).forEach(itemElem => {
      const { item, ...datasetParams } = itemElem.dataset;
      data.items.push(datasetParams);
    });
    return data;
  };

  const getShareLink = data => {
    const encodedData = encodeURIComponent(JSON.stringify(data));
    return `${window.location.origin}/pages/share-cart?data=${encodedData}`;
  };

  const onCopySuccess = () => {
    shareCartBtn.innerText = 'Link Copied';
    shareCartBtn.classList.add('is-active');
  };

  shareCartBtn &&
    shareCartBtn.addEventListener('click', async () => {
      const data = getCopyData();
      const url = getShareLink(data);
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
      const { id, quantity } = productEl.dataset;
      return { id, quantity };
    });
  };

  const saveCart = () => {
    const query = getSaveCartQuery();
    const cartItems = getCartItems();
    return fetch(`${process.env.API_URL}/customer/save-cart?${query}`, {
      method: 'POST',
      body: JSON.stringify({
        name: cartInput.value,
        udpated_at: new Date(),
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
