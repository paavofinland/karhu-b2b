import choozy from '../../lib/choozy';

export default window.component(async node => {
  const { editItemBtn, sidebar, sidebarLayer, closeSidebarBtn, saveCartBtn, popup, closePopupBtn } =
    choozy(node, null);

  console.log(closePopupBtn);
  const getElementByDataId = id => element => element.dataset.id === id;

  const sidebarList = Array.isArray(sidebar) ? Array.from(sidebar) : [sidebar];

  const onToggleSidebar = e => {
    const { id: itemId } = e.currentTarget.dataset;
    const sidebarEl = sidebarList.find(getElementByDataId(itemId));
    sidebarEl.classList.toggle('hidden');
    sidebarEl.classList.toggle('flex');
    sidebarLayer.classList.toggle('hidden');
    sidebarLayer.classList.toggle('flex');
    document.body.classList.toggle('overflow-hidden');
  };

  editItemBtn.addEventListener('click', onToggleSidebar);
  closeSidebarBtn.addEventListener('click', onToggleSidebar);

  const onToggleSaveCartPopup = () => {
    popup.classList.toggle('hidden');
  };

  saveCartBtn.addEventListener('click', onToggleSaveCartPopup);
  closePopupBtn.forEach(btn => btn.addEventListener('click', onToggleSaveCartPopup));
});
