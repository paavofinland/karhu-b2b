import choozy from '../../lib/choozy';
import getLiquidVariables from '../../lib/get-liquid-variables';

export default window.component(async (node, ctx) => {
  const {
    store: { store },
    customer: { secret: customerSecret, id: customerId },
  } = getLiquidVariables();

  const {
    selectCustomer,
    ordersContainer,
    noOrders,
    customerSelectText,
    ordersTable,
    ordersTableRow,
    ordersBlockContainer,
    ordersBlock,
  } = choozy(node);

  const getCustomerOrders = async e => {
    const query = new URLSearchParams({
      store,
      secret: customerSecret,
      customerId,
      selectedCustomerId: e?.target.value || '',
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
      Object.keys(order).forEach(prop => {
        const value = order[prop];
        const elements = [].concat(choozy(newElement)[prop]).filter(Boolean);
        elements.forEach(element => {
          // eslint-disable-next-line no-param-reassign
          element.innerText = value;
        });
      });
      fragment.appendChild(newElement);
    });
    container.appendChild(fragment);
  };

  const onSelectCustomer = async e => {
    const orderList = await getCustomerOrders(e);
    if (customerSelectText) {
      customerSelectText.classList.add('hidden');
    }
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
  };

  const appendCustomerSelect = data => {
    const documentFragment = document.createDocumentFragment();
    data.forEach(customer => {
      const option = document.createElement('option');
      option.value = customer.id;
      option.innerText = customer.name;
      documentFragment.appendChild(option);
    });
    selectCustomer.appendChild(documentFragment);
  };

  if (selectCustomer) {
    selectCustomer.addEventListener('change', onSelectCustomer);
    ctx.on('agent-stores:received', (_state, { data }) => {
      appendCustomerSelect(data);
    });
  } else {
    onSelectCustomer();
  }
});
