import choozy from '../../lib/choozy';
import getLiquidVariables from '../../lib/get-liquid-variables';

const LOADING_EVENT = 'agent-stores:loading';

const getAgentStores = async (store, customerId, customerSecret) => {
  const query = new URLSearchParams({
    store,
    customerId,
    secret: customerSecret,
  });

  return fetch(`${process.env.API_URL}/customer/list-agent-stores?${query}`).then(async res => {
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
    console.error(`Could not fetch agent stores [${(await res.json()).message}]`);
    return [];
  });
};

export default window.component(async (node, ctx) => {
  const {
    store: { store },
    customer: {
      secret: customerSecret,
      selected_store_customer: selectedStoreCustomer,
      id: customerId,
    },
  } = getLiquidVariables();

  const { selectCustomer } = choozy(node, null);
  const { select: customerSelect } = choozy(selectCustomer, null);

  ctx.on(LOADING_EVENT, (_, isLoading = true) => {
    customerSelect.classList[isLoading ? 'add' : 'remove']('is-loading');
    customerSelect.disabled = isLoading;
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
      option.setAttribute('data-country-code', customer.countryCode);
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

  const loadAgentStores = async () => {
    const agentStores = await getAgentStores(store, customerId, customerSecret);

    ctx.emit(LOADING_EVENT, null, false);
    ctx.emit('agent-stores:received', null, { data: agentStores });

    if (!agentStores.length) {
      customerSelect.setAttribute('disabled', true);
      return;
    }

    appendSelect(agentStores);
  };

  customerSelect.addEventListener('change', async e => {
    ctx.emit(LOADING_EVENT, null, true);
    await fetch(
      `${process.env.API_URL}/customer/set-selected-store?${query}&storeCustomerId=${e.target.value}`
    ).then(async r => {
      if (r.status !== 201) {
        console.error(`Could not set selected store [${(await r.json()).message}]`);
      }
    });
    ctx.emit(LOADING_EVENT, null, false);
    ctx.emit('store:change', null, {
      countryCode: e.target.options[e.target.selectedIndex].dataset.countryCode,
    });
  });

  await loadAgentStores();
});
