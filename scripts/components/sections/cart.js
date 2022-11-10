/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';

const getElementByDataId = id => element => element.dataset.id === id;
const test = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej(new Error('error'));
    }, 500);
  });
};

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

  saveCartPopupBtn.addEventListener('click', async () => {
    setErrorState('');
    try {
      await test();
      onCloseSaveCartPopup();
      saveCartBtn.classList.add('is-active');
    } catch (e) {
      setErrorState(e.message);
    }
  });
});
