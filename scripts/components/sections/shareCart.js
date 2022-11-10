/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';

const checkCopyData = () => {
  const url = new URL(window.location.href);
  return url.searchParams.get('data');
};

const onHandleError = error => {
  console.error('Error:', error);
  document.body.classList.remove('pointer-events-none');
};

const clearCart = () =>
  fetch(`${window.Shopify.routes.root}cart/clear.js`, {
    method: 'POST',
  })
    .then(response => response.json())
    .catch(onHandleError);

const updateCart = body =>
  fetch(`${window.Shopify.routes.root}cart/add.js`, {
    method: 'POST',
    body,
  })
    .then(response => response.json())
    .catch(onHandleError);

export default window.component(async (node, ctx) => {
  const {
    productTemplate,
    productContainer,
    loader,
    section,
    addToBagBtn,
    closePopupBtn,
    addToBagPopupBtn,
    addToBagForm,
  } = choozy(node);

  const renderDataInContainer = renderData => {
    productContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    renderData.forEach(({ title, price, quantity, image, id }) => {
      const newProductElem = productTemplate.content.cloneNode(true);
      const { titleElem, priceElem, quantityElem, imageElem, item, inputId, inputQuantity } =
        choozy(newProductElem, null);
      item.dataset.id = id;
      titleElem.innerText = title;
      titleElem.setAttribute('title', title);
      priceElem.innerText = price;
      quantityElem.innerText = quantity;
      imageElem.src = image;
      inputId.value = id;
      inputQuantity.value = quantity;
      fragment.appendChild(newProductElem);
    });
    productContainer.appendChild(fragment);
  };

  ctx.on('cart:loaded', () => {
    loader.classList.add('hidden');
    section.classList.remove('hidden');
  });

  ctx.on('data:render', (_state, { subtotal: subtotalValue, items }) => {
    const { subtotal } = choozy(node, null);
    subtotal.innerText = subtotalValue;
    renderDataInContainer(items);
    ctx.emit('cart:loaded');
    ctx.emit('data:update', null, items);
  });

  const copyData = checkCopyData();
  ctx.emit('data:render', null, JSON.parse(copyData));

  const onOpenAddToBagPopup = () => ctx.emit('popup:open', null, 'add-to-bag');
  const onCloseAddToBagPopup = () => ctx.emit('popup:close', null, 'add-to-bag');

  addToBagBtn && addToBagBtn.addEventListener('click', onOpenAddToBagPopup);
  closePopupBtn &&
    [].concat(closePopupBtn).forEach(btn => btn.addEventListener('click', onCloseAddToBagPopup));

  addToBagPopupBtn &&
    addToBagPopupBtn.addEventListener('click', async () => {
      addToBagPopupBtn.classList.add('is-active');
      document.body.classList.add('pointer-events-none');
      await clearCart();
      const formData = new FormData(addToBagForm);
      await updateCart(formData);
      window.location.replace(`${window.location.origin}/cart`);
    });
});
