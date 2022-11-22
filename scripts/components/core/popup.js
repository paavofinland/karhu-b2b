/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';

export default window.component((node, ctx) => {
  const { popupOverlay, closePopupBtn } = choozy(node, null);

  const onClosePopup = () => {
    node.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  ctx.on('popup:open', (_state, type) => {
    if (node.dataset.popup === type) {
      node.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  });

  ctx.on('popup:close', (_state, type) => {
    if (node.dataset.popup === type) {
      onClosePopup();
    }
  });

  popupOverlay.addEventListener('click', e => {
    if (e.currentTarget.dataset.popupOverlay) {
      onClosePopup();
    }
  });

  closePopupBtn &&
    [].concat(closePopupBtn).forEach(btn => btn.addEventListener('click', onClosePopup));
});
