import choozy from '../../lib/choozy';

export default window.component((node, ctx) => {
  const { formCartAdd, addToCartButton } = choozy(node, null);

  formCartAdd.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(formCartAdd);
    fetch(`${window.Shopify.routes.root}cart/add.js`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
      });
  });

  ctx.on('button:enable', () => {
    if (addToCartButton.hasAttribute('disabled')) {
      addToCartButton.removeAttribute('disabled');
    }
  });
});
