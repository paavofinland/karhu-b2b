import choozy from '../../lib/choozy';

export default window.component((node, ctx) => {
  const { group } = node.dataset;
  const { inner, toggle, shrinkBtn, expandBtn, toggleModalBtn } = choozy(node, null);
  const activeClass = 'is-active';

  const updateHeight = () => {
    node.style.setProperty('--innerHeight', `auto`);
    node.style.setProperty('--innerHeight', `${inner.scrollHeight}px`);
  };

  updateHeight();

  window.addEventListener('resize', updateHeight, { passive: true });

  toggle.addEventListener('click', () => {
    ctx.emit('accordion:toggle', null, {
      open: !node.classList.contains(activeClass),
      node,
      group,
    });
  });

  if (toggleModalBtn) {
    toggleModalBtn.addEventListener('click', e => {
      const modal = document.querySelector(`.modal[data-modal-type=${e.target.dataset.modalType}]`);
      modal.classList.add('flex');
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  }

  ctx.on('accordion:toggle', (state, a = {}) => {
    if (group !== a.group) return;
    node.classList[a.open && a.node === node ? 'add' : 'remove'](activeClass);
    shrinkBtn.classList.toggle('hidden');
    shrinkBtn.classList.toggle('flex');
    expandBtn.classList.toggle('hidden');
    expandBtn.classList.toggle('block');
  });
});
