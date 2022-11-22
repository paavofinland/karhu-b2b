/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';
import getLiquidVariables from '../../lib/get-liquid-variables';

export default window.component(async (node, ctx) => {
  const {
    store: { store },
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

  const { select: selectCustomer } = choozy(selectCustomerContainer);

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

  const loading = () => {
    noOrders.classList.add('hidden');
    ordersContainer.classList.add('hidden');
    orders.classList.add('is-active');
    customerSelectText.classList.add('hidden');
    orders.classList.remove('hidden');
  };

  const reset = () => {
    noOrders.classList.add('hidden');
    customerSelectText.classList.remove('hidden');
    orders.classList.add('hidden');
  };

  const onSelectCustomer = async e => {
    if (e.target.value === '') {
      reset();
    } else {
      loading();
      const orderList = await getCustomerOrders(e);
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
    selectCustomer.classList.add('is-loading');
    selectCustomer.disabled = true;

    selectCustomer.addEventListener('change', onSelectCustomer);
    ctx.on('agent-stores:received', (_state, { data }) => {
      selectCustomer.classList.add('is-active');
      selectCustomer.removeAttribute('disabled');
      customerSelectText.classList.remove('hidden');

      selectCustomer.classList.remove('is-loading');
      selectCustomer.disabled = false;

      appendCustomerSelect(data);
    });
  } else {
    onSelectCustomer();
  }
});
