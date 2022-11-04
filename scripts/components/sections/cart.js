import choozy from '../../lib/choozy';

export default window.component(async node => {
  const { editItemBtn, sidebar, sidebarLayer, closeSidebarBtn, saveCartBtn, popup, closePopupBtn } =
    choozy(node);

  const getElementByDataId = id => element => element.dataset.id === id;

  const sidebarList = Array.isArray(sidebar) ? Array.from(sidebar) : [sidebar];

  const onToggleSidebar = e => {
    const { id: itemId } = e.currentTarget.dataset;
    const sidebarEl = sidebarList.find(getElementByDataId(itemId));
    sidebarEl.classList.toggle('is-active');
    sidebarLayer.classList.toggle('is-active');
    document.body.classList.toggle('overflow-hidden');
  };

  editItemBtn.addEventListener('click', onToggleSidebar);
  closeSidebarBtn.addEventListener('click', onToggleSidebar);
  sidebarLayer.addEventListener('click', onToggleSidebar);

  const onToggleSaveCartPopup = () => popup.classList.toggle('hidden');

  saveCartBtn.addEventListener('click', onToggleSaveCartPopup);
  closePopupBtn.forEach(btn => btn.addEventListener('click', onToggleSaveCartPopup));
});
