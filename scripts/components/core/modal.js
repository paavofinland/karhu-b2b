import choozy from '../../lib/choozy';

export default window.component((node, ctx) => {
  const { closeModalBtn } = choozy(node, null);

  const onToggleModal = () => {
    node.classList.toggle('flex');
    node.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  };

  node.addEventListener(
    'click',
    e => {
      if (e.target.dataset.modalType) {
        onToggleModal();
      }
    },
    { capture: true }
  );

  closeModalBtn.addEventListener('click', onToggleModal);

  ctx.on('modal:open', state => {
    if (node.dataset.modalType === state.type) {
      onToggleModal();
    }
  });
});
