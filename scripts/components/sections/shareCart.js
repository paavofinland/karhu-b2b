/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';
import getLiquidVariables from '../../lib/get-liquid-variables';

const getSharedData = () => {
  const url = new URL(window.location.href);
  return { agentId: url.searchParams.get('agentId'), cartId: url.searchParams.get('cartId') };
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

const addToCart = body =>
  fetch(`${window.Shopify.routes.root}cart/add.js`, {
    method: 'POST',
    body,
  })
    .then(response => response.json())
    .catch(onHandleError);

const getCartProducts = query => {
  return fetch(`${process.env.API_URL}/customer/get-cart-products?${query}`).then(async res => {
    const responseData = await res.json();
    if (res.status === 200) return responseData;
    throw new Error(responseData.message);
  });
};

const storeData = getLiquidVariables();

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
    content,
    productsError,
  } = choozy(node);

  const getQueryParams = () => {
    const {
      store: { store },
      customer: { secret, id: customerId },
    } = storeData;
    const { agentId, cartId } = getSharedData();
    return new URLSearchParams({
      store,
      secret,
      customerId,
      agentId,
      cartId,
    });
  };

  const renderVariantData = ({ quantity, id: variantId, title }, template, container) => {
    const productSharedDataElem = template.content.cloneNode(true);
    const { quantityElem, sizeElem, inputId, inputQuantity } = choozy(productSharedDataElem, null);
    quantityElem.innerText = quantity;
    sizeElem.innerText = `US ${title}:`;
    inputId.value = variantId;
    inputQuantity.value = quantity;
    container.appendChild(productSharedDataElem);
  };

  const renderProductData = ({ title, image, price, id, variants }, fragment) => {
    const newProductElem = productTemplate.content.cloneNode(true);
    const { item, titleElem, priceElem, imageElem, quantityContainer, productSharedDataTemplate } =
      choozy(newProductElem, null);
    item.dataset.id = id;
    titleElem.innerText = title;
    titleElem.setAttribute('title', title);
    priceElem.innerText = price.replace('.', ',');
    imageElem.src = image;
    variants.forEach(variant =>
      renderVariantData(variant, productSharedDataTemplate, quantityContainer)
    );
    fragment.appendChild(newProductElem);
  };

  const renderDataInContainer = products => {
    productContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    products.forEach(product => renderProductData(product, fragment));
    productContainer.appendChild(fragment);
  };

  ctx.on('cart:loaded', () => {
    loader.classList.add('hidden');
    section.classList.remove('hidden');
  });

  ctx.on('data:render', async () => {
    const query = getQueryParams();
    try {
      const { name, products, subtotal } = await getCartProducts(query);
      renderDataInContainer(products);
      const { cartTitle, subtotal: subtotalEl } = choozy(node, null);
      cartTitle.innerText = name;
      subtotalEl.innerText = subtotal.toFixed(2).replace('.', ',');
    } catch (e) {
      content.classList.add('is-active');
      productsError.innerText = e.message;
    } finally {
      ctx.emit('cart:loaded');
    }
  });

  ctx.emit('data:render', null);

  const onOpenAddToBagPopup = () => ctx.emit('popup:open', null, 'add-to-bag');
  const onCloseAddToBagPopup = e => {
    e.preventDefault();
    ctx.emit('popup:close', null, 'add-to-bag');
  };

  addToBagBtn && addToBagBtn.addEventListener('click', onOpenAddToBagPopup);
  closePopupBtn &&
    [].concat(closePopupBtn).forEach(btn => btn.addEventListener('click', onCloseAddToBagPopup));

  addToBagPopupBtn &&
    addToBagPopupBtn.addEventListener('click', async () => {
      addToBagPopupBtn.classList.add('is-active');
      document.body.classList.add('pointer-events-none');
      await clearCart();
      const formData = new FormData(addToBagForm);
      await addToCart(formData);
      window.location.replace(`${window.location.origin}/cart`);
    });
});
