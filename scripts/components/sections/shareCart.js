/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';

const checkCopyData = () => {
  const url = new URL(window.location.href);
  return url.searchParams.get('data');
};

export default window.component(async (node, ctx) => {
  const { productTemplate, productContainer, loader, section } = choozy(node);

  const renderDataInContainer = renderData => {
    productContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    renderData.forEach(product => {
      const newProductElem = productTemplate.content.cloneNode(true);
      const { titleElem, priceElem, quantityElem, imageElem } = choozy(newProductElem, null);
      titleElem.innerText = product.title;
      priceElem.innerText = product.price;
      quantityElem.innerText = product.quantity;
      imageElem.src = product.image;
      fragment.appendChild(newProductElem);
    });
    productContainer.appendChild(fragment);
  };

  ctx.on('cart:loaded', () => {
    loader.classList.add('hidden');
    section.classList.remove('hidden');
  });

  ctx.on('data:render', (_state, renderData) => {
    const { subtotal } = choozy(node, null);
    subtotal.innerText = renderData.subtotal;
    renderDataInContainer(renderData.items);
    ctx.emit('cart:loaded');
  });

  const copyData = checkCopyData();
  ctx.emit('data:render', null, JSON.parse(copyData));
});
