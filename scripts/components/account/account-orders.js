/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';
import getLiquidVariables from '../../lib/get-liquid-variables';

export default window.component(async (node, ctx) => {
  const {
    store: { store, currencies },
    customer: { secret: customerSecret, id: customerId },
  } = getLiquidVariables();

  const {
    selectCustomer: selectCustomerContainer,
    ordersContainer,
    noOrders,
    customerSelectText,
    ordersTable,
    ordersTableRow,
    ordersBlockContainer,
    ordersBlock,
    orders,
  } = choozy(node);

  const getCustomerOrders = async customer => {
    const query = new URLSearchParams({
      store,
      secret: customerSecret,
      customerId,
      selectedCustomerId: customer || '',
    });

    return fetch(`${process.env.API_URL}/customer/get-store-customer-orders?${query}`).then(
      async res => {
        if (res.status === 200) return res.json();
        console.error(`Could not fetch customer orders [${(await res.json()).message}]`);
        return [];
      }
    );
  };

  const appendHtmlWithOrders = ({ container, containerItem, orderList }) => {
    // eslint-disable-next-line no-param-reassign
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    orderList.forEach(order => {
      const newElement = containerItem.content.cloneNode(true);
      Object.keys(order)
        .map(key => [key, order[key]])
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

    selectCustomer.addEventListener('change', e => onSelectCustomer(e.target.value));
    ctx.on('agent-stores:received', (_state, { data }) => {
      selectCustomer.classList.add('is-active');
      selectCustomer.removeAttribute('disabled');

      selectCustomer.classList.remove('is-loading');
      selectCustomer.disabled = false;

      const documentFragment = document.createDocumentFragment();
      data.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.innerText = customer.name;
        documentFragment.appendChild(option);
      });
      selectCustomer.appendChild(documentFragment);
    });
  } else {
    onSelectCustomer();
  }
});
