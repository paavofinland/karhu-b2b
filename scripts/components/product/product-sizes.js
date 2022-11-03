import choozy from '../../lib/choozy';

export default window.component((node, ctx) => {
  const { size, sizeButton, quantityInputs } = choozy(node);
  const sizeLabels = [].concat(size).filter(Boolean);
  const sizeButtons = [].concat(sizeButton).filter(Boolean);

  const inputList = Array.isArray(quantityInputs) ? quantityInputs : [...quantityInputs];

  const onChangeQuantity = e => {
    if (e.target.value > 0 || inputList.some(elem => elem.value > 0)) {
      ctx.emit('button:enable', null);
    }
  };

  const validateNumberInput = e => {
    if (e.target.value === '0') {
      e.target.value = e.target.value.slice(1);
    }
  };

  inputList.forEach(input => {
    input.addEventListener('change', onChangeQuantity);
    input.addEventListener('keypress', e => {
      onChangeQuantity(e);
      validateNumberInput(e);
    });
  });

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
});
