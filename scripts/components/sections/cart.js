/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';

export default window.component(async node => {
  const {
    editItemBtn,
    sidebar,
    sidebarLayer,
    closeSidebarBtn,
    saveCartBtn,
    popup,
    closePopupBtn,
    shareCartBtn,
  } = choozy(node);

  const getElementByDataId = id => element => element.dataset.id === id;

  const sidebarList = Array.isArray(sidebar) ? Array.from(sidebar) : [sidebar];

  const onToggleSidebar = e => {
    const { id: itemId } = e.currentTarget.dataset;
    const sidebarEl = sidebarList.find(getElementByDataId(itemId));
    sidebarEl.classList.toggle('is-active');
    sidebarLayer.classList.toggle('is-active');
    document.body.classList.toggle('overflow-hidden');
  };

  editItemBtn &&
    [].concat(editItemBtn).forEach(btn => btn.addEventListener('click', onToggleSidebar));
  closeSidebarBtn &&
    [].concat(closeSidebarBtn).forEach(btn => btn.addEventListener('click', onToggleSidebar));
  sidebarLayer.addEventListener('click', onToggleSidebar);

  const onToggleSaveCartPopup = () => popup.classList.toggle('hidden');

  saveCartBtn &&
    [].concat(saveCartBtn).forEach(btn => btn.addEventListener('click', onToggleSaveCartPopup));
  closePopupBtn &&
    [].concat(closePopupBtn).forEach(btn => btn.addEventListener('click', onToggleSaveCartPopup));

  shareCartBtn &&
    shareCartBtn.addEventListener('click', async () => {
      const { item: itemList } = choozy(node, null);
      const data = [];
      [].concat(itemList).forEach(item => data.push(item.dataset));
      const encodedData = encodeURIComponent(JSON.stringify(data));
      const url = `${window.location.href}?data=${encodedData}`;
      await navigator.clipboard.writeText(url);
    });
});
