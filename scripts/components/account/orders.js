import choozy from '../../lib/choozy';

const orderPropertyNames = {
  orderNumber: 'Order number',
  date: 'Date',
  paymentStatus: 'Payment Status',
  orderStatus: 'Order Status',
  price: 'Price',
};

export default window.component(async node => {
  const {
    selectCustomer,
    ordersContainer,
    noOrders,
    customerSelectText,
    ordersTable,
    ordersBlock,
  } = choozy(node, null);

  const announcementBar = document.querySelector('[data-store]');
  const { customerId, customerSecret, store } = announcementBar.dataset;

  const getCustomerOrders = async e => {
    const query = new URLSearchParams({
      store,
      secret: customerSecret,
      customerId,
      selectedCustomerId: e?.target.value || '',
    });

    return fetch(`${process.env.API_URL}/order/get-store-customer-orders?${query}`).then(
      async res => {
        if (res.status === 200) return res.json();
        console.error(`Could not fetch customer orders [${(await res.json()).message}]`);
        return [];
      }
    );
  };

  const createButtonElement = () => {
    const button = document.createElement('button');
    button.innerText = 'View details';
    button.classList.add('underline');
    return button;
  };

  const appendOrdersTable = orderList => {
    const fragment = document.createDocumentFragment();
    orderList.forEach(order => {
      const tr = document.createElement('tr');
      Object.keys(orderPropertyNames).forEach(prop => {
        const td = document.createElement('td');
        td.innerText = order[prop];
        td.classList.add('py-7');
        tr.appendChild(td);
      });

      const td = document.createElement('td');
      const button = createButtonElement();
      td.appendChild(button);

      td.classList.add('py-7');
      tr.classList.add('border-b', 'border-grey-5');
      tr.appendChild(td);
      fragment.appendChild(tr);
    });
    ordersTable.appendChild(fragment);
  };

  const appendOrdersBlock = orderList => {
    const fragment = document.createDocumentFragment();
    orderList.forEach(order => {
      const div = document.createElement('div');
      div.classList.add('grid', 'grid-cols-2', 'gap-4', 'py-10');
      Object.entries(orderPropertyNames).forEach(([prop, value]) => {
        const innerDiv = document.createElement('div');
        const keyPlaceholder = document.createElement('p');
        const dataPlaceholder = document.createElement('p');
        dataPlaceholder.classList.add('text-heading-7');
        dataPlaceholder.innerText = value;
        keyPlaceholder.innerText = order[prop];
        innerDiv.appendChild(dataPlaceholder);
        innerDiv.appendChild(keyPlaceholder);
        div.appendChild(innerDiv);
      });

      const innerDiv = document.createElement('div');
      const p = document.createElement('p');
      p.innerText = 'View details';
      const button = createButtonElement();
      innerDiv.appendChild(p);
      innerDiv.appendChild(button);
      div.appendChild(innerDiv);

      fragment.appendChild(div);
    });
    ordersBlock.appendChild(fragment);
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
    appendOrdersTable(orderList);
    appendOrdersBlock(orderList);
  };

  const getAgentStores = () => {
    const query = new URLSearchParams({
      store,
      customerId,
      secret: customerSecret,
    });

    return fetch(`${process.env.API_URL}/customer/list-agent-stores?${query}`).then(async res => {
      if (res.status === 200) return res.json();
      console.error(`Could not fetch agent stores [${(await res.json()).message}]`);
      return [];
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
    const agentStores = await getAgentStores();
    appendCustomerSelect(agentStores);
  } else {
    onSelectCustomer();
  }
});
