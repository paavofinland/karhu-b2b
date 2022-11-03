import choozy from '../../lib/choozy';

const orderPropertyNames = {
  orderNumber: 'Order number',
  date: 'Date',
  paymentStatus: 'Payment Status',
  orderStatus: 'Order Status',
  price: 'Price',
};

export default window.component(async (node, ctx) => {
  const {
    selectCustomer,
    ordersContainer,
    noOrders,
    customerSelectText,
    ordersTable,
    ordersBlock,
  } = choozy(node, null);

  let storeData = {};

  const getCustomerOrders = async e => {
    const { store, customerSecret, customerId } = storeData;
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
    ctx.on('agent-stores:received', ({ data }) => {
      appendCustomerSelect(data);
    });
  } else {
    onSelectCustomer();
  }

  ctx.on('store-data:send', data => {
    storeData = data;
  });
});
