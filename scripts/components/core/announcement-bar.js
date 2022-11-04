import choozy from '../../lib/choozy';

const LOADING_EVENT = 'agent-stores:loading';

export default window.component(async (node, ctx) => {
  const { selectCustomer } = choozy(node, null);
  const { select: customerSelect } = choozy(selectCustomer, null);
  const { customerId, customerSecret, store, selectedStoreCustomer } = node.dataset;

  if (!customerId || !customerSecret || !store || !selectCustomer) return;

  ctx.on(LOADING_EVENT, (_, isLoading = true) => {
    selectCustomer.classList[isLoading ? 'add' : 'remove']('is-loading');
  });

  const appendSelect = data => {
    const documentFragment = document.createDocumentFragment();
    data.forEach(customer => {
      const option = document.createElement('option');
      if (selectedStoreCustomer === customer.id) {
        option.setAttribute('selected', true);
      }
      option.value = customer.id;
      option.innerText = customer.name;
      documentFragment.appendChild(option);
    });
    customerSelect.appendChild(documentFragment);
  };

  ctx.emit(LOADING_EVENT, null, true);

  const query = new URLSearchParams({
    store,
    customerId,
    secret: customerSecret,
  });

  const getAgentStores = () => {
    return fetch(`${process.env.API_URL}/customer/list-agent-stores?${query}`).then(async res => {
      if (res.status === 200) {
        const data = await res.json();
        ctx.emit('agent-stores:received', null, { data });
        return data;
      }
      console.error(`Could not fetch agent stores [${(await res.json()).message}]`);
      return [];
    });
  };

  const agentStores = await getAgentStores();

  ctx.emit(LOADING_EVENT, null, false);

  if (!agentStores.length) {
    customerSelect.setAttribute('disabled', true);
    return;
  }

  appendSelect(agentStores);
  customerSelect.addEventListener('change', async e => {
    ctx.emit(LOADING_EVENT, null, true);
    await fetch(
      `${process.env.API_URL}/customer/set-selected-store?${query}&storeCustomerId=${e.target.value}`
    ).then(async r => {
      if (r.status === 201) {
        window.location.reload();
      } else {
        console.error(`Could not set selected store [${(await r.json()).message}]`);
      }
    });
    ctx.emit(LOADING_EVENT, null, false);
  });

  ctx.emit('store-data:send', null, { data: node.dataset });
});
