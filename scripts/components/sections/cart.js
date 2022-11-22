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
    errorMessage.innerText = message;
    cartInput.setAttribute('required', !message);
    cartInput.setAttribute('aria-invalid', !message);
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
  const onCloseSaveCartPopup = type => {
    ctx.emit('popup:close', null, type);
    setErrorState('');
  };

  const getShareLink = (cartId = '') => {
    const {
      customer: { id: customerId },
    } = storeData;
    return `${window.location.origin}/pages/share-cart?agentId=${customerId}&cartId=${cartId}`;
  };

  const onCopySuccess = () => {
    const { shareCartPopupBtn } = choozy(node);
    shareCartPopupBtn.classList.add('is-active');
    setTimeout(() => {
      shareCartPopupBtn.classList.remove('is-active');
    }, 2000);
  };

  const onShareCart = async e => {
    const url = getShareLink(e.target.dataset.cartId);
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
    return []
      .concat(item)
      .map(productEl => {
        const { variant } = choozy(productEl, null);
        const { productId } = productEl.dataset;
        const variantsData = [].concat(variant).map(variantEl => {
          const { name: id, value: quantity } = variantEl;
          return { productId, id, quantity };
        });
        return variantsData;
      })
      .flat();
  };

  const saveCart = () => {
    const { cartInput } = choozy(node);
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

  const toggleSaveCartRenderState = () => {
    const { saveCartPopupBtn } = choozy(node);
    saveCartPopupBtn.classList.toggle('is-active');
    document.body.classList.toggle('pointer-events-none');
  };

  const onClickSaveCart = async () => {
    const { cartInput, shareCartPopupBtn } = choozy(node);
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
      shareCartPopupBtn,
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
      []
        .concat(closePopupBtn)
        .forEach(btn =>
          btn.addEventListener('click', e => onCloseSaveCartPopup(e.currentTarget.dataset.type))
        );

    shareCartPopupBtn && shareCartPopupBtn.addEventListener('click', onShareCart);

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
