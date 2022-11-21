/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';
import getLiquidVariables from '../../lib/get-liquid-variables';
import { fetchHtml } from '../../lib/html.utils';

const getElementByDataId = id => element => element.dataset.id === id;

const updateCart = formData =>
  fetch(`${window.Shopify.routes.root}cart/update.js`, {
    method: 'POST',
    body: formData,
  });

export default window.component(async (node, ctx) => {
  const storeData = getLiquidVariables();

  const setErrorState = message => {
    const { cartInput, errorMessage } = choozy(node);
    const action = message ? 'add' : 'remove';
    errorMessage.innerText = message;
    errorMessage.classList[action]('is-active');
    cartInput.classList[action]('is-active');
  };

  const onToggleSidebar = e => {
    const { sidebar, sidebarLayer } = choozy(node);
    const { id: itemId } = (e.currentTarget || e.target).dataset;
    const sidebarEl = [].concat(sidebar).find(getElementByDataId(itemId));
    sidebarEl.classList.toggle('is-active');
    sidebarLayer.classList.toggle('is-active');
    sidebarLayer.dataset.id = itemId;
    document.body.classList.toggle('overflow-hidden');
  };

  const onOpenSaveCartPopup = () => ctx.emit('popup:open', null, 'save-cart');
  const onCloseSaveCartPopup = () => {
    ctx.emit('popup:close', null, 'save-cart');
    setErrorState('');
  };

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
    const { shareCartBtn } = choozy(node);
    shareCartBtn.classList.add('is-active');
    setTimeout(() => {
      shareCartBtn.classList.remove('is-active');
    }, 2000);
  };

  const onShareCart = async () => {
    const data = getCopyData();
    const url = getShareLink(data);
    await navigator.clipboard.writeText(url);
    onCopySuccess();
  };

  const onToggleNodeLoadingState = () => {
    node.classList.toggle('opacity-50');
    node.classList.toggle('pointer-events-none');
  };

  const updateCartSection = async () => {
    const cartHtml = await fetchHtml(
      `${window.location.origin + window.location.pathname}?section_id=${node.dataset.sectionId}`
    );
    const { section } = choozy(node);
    const { section: newSection } = choozy(cartHtml);
    section.innerHTML = newSection.innerHTML;
    ctx.emit('cart:update-handlers');
  };

  const onHandleUpdateCart = async formData => {
    try {
      await updateCart(formData);
      const count = Array.from(formData.values()).reduce((acc, val) => acc + +val, 0);
      ctx.emit('cart:update', null, { count });
    } catch (err) {
      throw new Error(err.message);
    }
  };

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
    const { cartInput } = choozy(node);
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

  const toggleSaveCartRenderState = () => {
    const { saveCartPopupBtn } = choozy(node);
    saveCartPopupBtn.classList.toggle('is-active');
    document.body.classList.toggle('pointer-events-none');
  };

  const onToggleSaveCartLoadingState = () => {
    const { saveCartBtn } = choozy(node);
    saveCartBtn.classList.toggle('is-active');
    saveCartBtn.toggleAttribute('disabled');
  };

  const onClickSaveCart = async () => {
    const { cartInput } = choozy(node);
    if (!cartInput.value) {
      setErrorState('Please fill in a name');
      return;
    }

    toggleSaveCartRenderState();
    setErrorState('');
    try {
      await saveCart();
      onCloseSaveCartPopup();
      cartInput.value = '';
      onToggleSaveCartLoadingState();
      setTimeout(() => {
        onToggleSaveCartLoadingState();
      }, 1000);
    } catch (e) {
      setErrorState(e.message);
    } finally {
      toggleSaveCartRenderState();
    }
  };

  const onRemoveProduct = async e => {
    const { removeItemForm } = choozy(node);
    const { id: itemId } = e.target.dataset;
    const form = [].concat(removeItemForm).find(getElementByDataId(itemId));
    const formData = new FormData(form);
    onToggleNodeLoadingState();
    await onHandleUpdateCart(formData);
    await updateCartSection();
    onToggleNodeLoadingState();
  };

  const toggleUpdateProductBtn = id => {
    const { updateOrderBtn } = choozy(node);
    const updateOrderBtnEl = [].concat(updateOrderBtn).find(btn => btn.dataset.id === id);
    updateOrderBtnEl.classList.toggle('is-active');
  };

  const toggleUpdateProductState = () => {
    const { sidebarLayer } = choozy(node);
    document.body.classList.toggle('pointer-events-none');
    sidebarLayer.classList.toggle('is-active:pointer-events-auto');
  };

  const setUpdateErrorMessage = (elem, err) => {
    const { updateErrorMsg } = choozy(elem);
    updateErrorMsg.innerText = err.message;
    updateErrorMsg.classList[err.message ? 'add' : 'remove']('is-active');
  };

  const onUpdateProductSizes = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { id } = e.currentTarget.dataset;
    setUpdateErrorMessage(e.currentTarget, '');
    toggleUpdateProductState();
    toggleUpdateProductBtn(id);
    try {
      await onHandleUpdateCart(formData);
      onToggleSidebar(e);
      await updateCartSection();
    } catch (err) {
      setUpdateErrorMessage(e.target, err);
      toggleUpdateProductBtn(id);
    } finally {
      toggleUpdateProductState();
    }
  };

  ctx.on('cart:update-handlers', () => {
    const {
      editItemBtn,
      removeItemBtn,
      sidebarLayer,
      closeSidebarBtn,
      saveCartBtn,
      closePopupBtn,
      shareCartBtn,
      saveCartPopupBtn,
      updateSizesForm,
    } = choozy(node);

    editItemBtn &&
      [].concat(editItemBtn).forEach(btn => btn.addEventListener('click', onToggleSidebar));
    closeSidebarBtn &&
      [].concat(closeSidebarBtn).forEach(btn => btn.addEventListener('click', onToggleSidebar));
    sidebarLayer.addEventListener('click', onToggleSidebar);

    saveCartBtn && saveCartBtn.addEventListener('click', onOpenSaveCartPopup);
    closePopupBtn &&
      [].concat(closePopupBtn).forEach(btn => btn.addEventListener('click', onCloseSaveCartPopup));

    shareCartBtn && shareCartBtn.addEventListener('click', onShareCart);

    removeItemBtn &&
      [].concat(removeItemBtn).forEach(btn => btn.addEventListener('click', onRemoveProduct));

    saveCartPopupBtn.addEventListener('click', onClickSaveCart);

    updateSizesForm &&
      []
        .concat(updateSizesForm)
        .forEach(form => form.addEventListener('submit', onUpdateProductSizes));
  });

  ctx.emit('cart:update-handlers');
});
