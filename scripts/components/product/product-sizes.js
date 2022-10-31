import choozy from '../../lib/choozy';

export default window.component(node => {
  const { size, sizeButton } = choozy(node);
  const sizeLabels = [].concat(size).filter(Boolean);
  const sizeButtons = [].concat(sizeButton).filter(Boolean);

  sizeButtons.forEach(button =>
    button.addEventListener('click', e => {
      const sizeLabel = e.target.textContent.trim().toLowerCase();

      sizeLabels.forEach(label => {
        // eslint-disable-next-line no-param-reassign
        label.innerText = label.dataset[sizeLabel];
      });

      sizeButtons.forEach(({ classList }) => classList.remove('is-active'));
      button.classList.add('is-active');
    })
  );

  console.log(size);
});
