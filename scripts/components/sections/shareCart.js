/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';
import fetchFunction from '../../lib/fetch-function';
import getLiquidVariables from '../../lib/get-liquid-variables';

const getSharedData = () => {
  const url = new URL(window.location.href);
  const agentId = url.searchParams.get('agentId');
  const cartId = url.searchParams.get('cartId');
  return { ...(agentId && { agentId }), ...(cartId && { cartId }) };
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
  return fetchFunction(`/customer/get-cart-products?${query}`).catch(e => {
    console.info('[unhandled error]');
    throw Error('Shared shopping bag could not be found. The link is invalid or has expired.');
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
    shareCartBtn,
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

  const getCurrencySymbol = currencyCode => {
    const foundSymbol = storeData.store.currencies.find(
      ({ iso_code }) => iso_code === currencyCode
    );
    return foundSymbol?.symbol || currencyCode;
  };

  const renderVariantData = ({ quantity, id: variantId, title }, template, container) => {
    const productSharedDataElem = template.content.cloneNode(true);
    const { quantityElem, sizeElem, inputId, inputQuantity } = choozy(productSharedDataElem, null);
    quantityElem.innerText = quantity;
    sizeElem.innerText = `${title}:`;
    inputId.value = variantId;
    inputQuantity.value = quantity;
    container.appendChild(productSharedDataElem);
  };

  const renderProductData = ({ title, image, price, id, variants, currencySymbol }, fragment) => {
    const newProductElem = productTemplate.content.cloneNode(true);
    const {
      item,
      titleElem,
      priceElem,
      imageElem,
      currencyElem,
      quantityContainer,
      productSharedDataTemplate,
    } = choozy(newProductElem, null);
    item.dataset.id = id;
    titleElem.innerText = title;
    titleElem.setAttribute('title', title);
    priceElem.innerText = new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
    }).format(price);
    currencyElem.innerText = currencySymbol;
    if (image) imageElem.src = image;
    variants.forEach(variant =>
      renderVariantData(variant, productSharedDataTemplate, quantityContainer)
    );
    fragment.appendChild(newProductElem);
  };

  const renderDataInContainer = (products, currencySymbol) => {
    productContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    products.forEach(product => renderProductData({ ...product, currencySymbol }, fragment));
    productContainer.appendChild(fragment);
  };

  ctx.on('cart:loaded', () => {
    loader.classList.add('hidden');
    section.classList.remove('hidden');
  });

  const query = getQueryParams();

  if (
    !['agentId', 'cartId'].every(requiredParam => Array.from(query.keys()).includes(requiredParam))
  )
    window.location = window.Shopify.routes.root;

  try {
    const { name, products, subtotal, currencyCode } = await getCartProducts(query);
    const currencySymbol = getCurrencySymbol(currencyCode);
    renderDataInContainer(products, currencySymbol);
    const { cartTitle, subtotal: subtotalEl, currency: currencyEl } = choozy(node, null);
    cartTitle.innerText = name;
    subtotalEl.innerText = new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
    }).format(subtotal.toFixed(2));
    currencyEl.innerText = currencySymbol;
  } catch (e) {
    content.classList.add('is-active');
    productsError.innerText = e.message;
  } finally {
    ctx.emit('cart:loaded');
  }

  const onOpenAddToBagPopup = () => ctx.emit('popup:open', null, 'add-to-bag');
  const onCloseAddToBagPopup = e => {
    e.preventDefault();
    ctx.emit('popup:close', null, 'add-to-bag');
  };

  addToBagBtn && addToBagBtn.addEventListener('click', onOpenAddToBagPopup);
  closePopupBtn &&
    [].concat(closePopupBtn).forEach(btn => btn.addEventListener('click', onCloseAddToBagPopup));

  const onAddToBag = async () => {
    addToBagPopupBtn.classList.add('is-active');
    document.body.classList.add('pointer-events-none');
    await clearCart();
    const formData = new FormData(addToBagForm);
    await addToCart(formData);
    window.location.replace(`${window.location.origin}/cart`);
  };

  addToBagPopupBtn && addToBagPopupBtn.addEventListener('click', onAddToBag);

  const onShareCart = async () => {
    await navigator.clipboard.writeText(window.location.href);
    shareCartBtn.classList.add('is-active');
    setTimeout(() => {
      shareCartBtn.classList.remove('is-active');
    }, 2000);
  };

  shareCartBtn && shareCartBtn.addEventListener('click', onShareCart);
});
