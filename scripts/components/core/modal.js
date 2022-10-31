import choozy from '../../lib/choozy';

export default window.component(node => {
  const { closeModalBtn } = choozy(node, null);

  closeModalBtn.addEventListener('click', () => {
    node.classList.remove('flex');
    node.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  });
});
