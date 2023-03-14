/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';
import fetchFunction from '../../lib/fetch-function';
import getLiquidVariables from '../../lib/get-liquid-variables';

const PRICE_FILTER = 'TOTAL_PRICE';

export default window.component(async (node, ctx) => {
  const {
    store: { store, currencies },
    customer: { secret: customerSecret, id: customerId },
  } = getLiquidVariables();

  const {
    selectCustomer: selectCustomerContainer,
    selectOrderSorting,
    ordersContainer,
    noOrders,
    customerSelectText,
    ordersTable,
    ordersTableRow,
    ordersBlockContainer,
    ordersBlock,
    orders,
  } = choozy(node);

  const sortOrderByPrice = (prevOrder, nextOrder, reverse) => {
    const prevFormattedPrice = parseFloat(prevOrder.price.replaceAll('.', ''));
    const nextFormattedPrice = parseFloat(nextOrder.price.replaceAll('.', ''));
    return reverse
      ? nextFormattedPrice - prevFormattedPrice
      : prevFormattedPrice - nextFormattedPrice;
  };

  const getCustomerOrders = async customer => {
    const [sortKey, reverse] = selectOrderSorting.value.split('-');
    const query = new URLSearchParams({
      store,
      secret: customerSecret,
      customerId,
      selectedCustomerId: customer?.id || '',
      selectedCustomerShopifyId: customer?.shopifyId || '',
      sortKey,
      reverse,
    });

    return fetchFunction(`/customer/get-store-customer-orders?${query}`)
      .then(data => {
        return sortKey === PRICE_FILTER
          ? data.sort((a, b) => sortOrderByPrice(a, b, !!Number(reverse)))
          : data;
      })
      .catch(e => {
        console.info('[unhandled error]');
        return [];
      });
  };

  const appendHtmlWithOrders = ({ container, containerItem, orderList }) => {
    // eslint-disable-next-line no-param-reassign
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    orderList.forEach(order => {
      const newElement = containerItem.content.cloneNode(true);
      Object.entries(order)
        .map(([key, value]) => {
          if (key === 'currencyCode')
            return [key, currencies.find(({ iso_code: code }) => code === value)?.symbol || value];

          return [key, value];
        })
        .forEach(([key, value]) => {
          []
            .concat(choozy(newElement)[key])
            .filter(Boolean)
            .forEach(element => {
              if (element instanceof HTMLAnchorElement) {
                element.href = value;
              } else {
                element.innerText = value;
              }
            });
        });
      fragment.appendChild(newElement);
    });
    container.appendChild(fragment);
  };

  const loading = () => {
    noOrders.classList.add('hidden');
    ordersContainer.classList.add('hidden');
    orders.classList.add('is-active');
    orders.classList.remove('hidden');

    if (customerSelectText) customerSelectText.classList.add('hidden');
  };

  const reset = () => {
    noOrders.classList.add('hidden');
    customerSelectText.classList.remove('hidden');
    orders.classList.add('hidden');
  };

  const onSelectCustomer = async customer => {
    if (customer === '') {
      reset();
    } else {
      loading();
      const orderList = await getCustomerOrders(customer);
      orders.classList.remove('is-active');
      if (!orderList.length) {
        noOrders.classList.remove('hidden');
        return;
      }
      ordersContainer.classList.remove('hidden');
      appendHtmlWithOrders({ container: ordersTable, containerItem: ordersTableRow, orderList });
      appendHtmlWithOrders({
        container: ordersBlockContainer,
        containerItem: ordersBlock,
        orderList,
      });
    }
  };

  if (selectCustomerContainer) {
    const { select: selectCustomer } = choozy(selectCustomerContainer);

    selectCustomer.classList.add('is-loading');
    selectCustomer.disabled = true;

    selectCustomer.addEventListener('change', e => {
      const { value, options, selectedIndex } = e.target;
      onSelectCustomer({
        id: value,
        shopifyId: options[selectedIndex].dataset.shopifyId,
      });
    });
    ctx.on('agent-stores:received', (_state, { data }) => {
      selectCustomer.classList.add('is-active');
      selectCustomer.removeAttribute('disabled');

      selectCustomer.classList.remove('is-loading');
      selectCustomer.disabled = false;

      const documentFragment = document.createDocumentFragment();
      data.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.dataset.shopifyId = customer.shopifyId;
        option.innerText = customer.name;
        documentFragment.appendChild(option);
      });
      selectCustomer.appendChild(documentFragment);
    });

    selectOrderSorting.addEventListener('change', () => {
      const { value, options, selectedIndex } = selectCustomer;
      onSelectCustomer({
        id: value,
        shopifyId: options[selectedIndex].dataset.shopifyId,
      });
    });
  } else {
    onSelectCustomer();
    selectOrderSorting.addEventListener('change', () => {
      onSelectCustomer();
    });
  }
});
