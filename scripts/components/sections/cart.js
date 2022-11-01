import choozy from '../../lib/choozy';

export default window.component(async node => {
  const { editItemBtn, sidebar, sidebarLayer, closeSidebarBtn } = choozy(node, null);

  const getElementByDataId = id => element => element.dataset.id === id;

  const sidebarList = Array.isArray(sidebar) ? Array.from(sidebar) : [sidebar];

  const onToggleSidebar = e => {
    const { id: itemId } = e.target.dataset;
    const sidebarEl = sidebarList.find(getElementByDataId(itemId));
    sidebarEl.classList.toggle('hidden');
    sidebarLayer.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  };

  editItemBtn.addEventListener('click', onToggleSidebar);
  closeSidebarBtn.addEventListener('click', onToggleSidebar);
});
