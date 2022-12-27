import choozy from '../../lib/choozy';
import fetchFunction from '../../lib/fetch-function';
import getLiquidVariables from '../../lib/get-liquid-variables';

const LOADING_EVENT = 'agent-stores:loading';

const getAgentStores = async (store, customerId, customerSecret) => {
  const query = new URLSearchParams({
    store,
    customerId,
    secret: customerSecret,
  });

  return fetchFunction(`/customer/list-agent-stores?${query}`).catch(e => {
    console.info('[unhandled error]');
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
      option.setAttribute('data-country-code', customer.countryCode || 'NL');
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

    const selectedStore = agentStores.find(({ id }) => id === selectedStoreCustomer);
    if (selectedStore) {
      ctx.emit('country:revalidate', null, {
        countryCode: selectedStore.countryCode,
        storeCustomerId: selectedStore.id,
      });
    }

    if (!agentStores.length) {
      customerSelect.setAttribute('disabled', true);
      return;
    }

    appendSelect(agentStores);
  };

  const updateStoreCustomer = async ({ countryCode, storeCustomerId }) => {
    ctx.emit(LOADING_EVENT, null, true);
    await fetchFunction(
      `/customer/set-selected-store?${query}&storeCustomerId=${storeCustomerId}`,
      {
        method: 'POST',
      }
    ).catch(() => console.info('[unhandled error]'));
    ctx.emit(LOADING_EVENT, null, false);
    ctx.emit('country:revalidate', null, {
      countryCode,
      storeCustomerId,
    });
  };

  customerSelect.addEventListener('change', async e =>
    updateStoreCustomer({
      countryCode: e.target.options[e.target.selectedIndex].dataset.countryCode,
      storeCustomerId: e.target.value,
    })
  );

  ctx.on('agent-stores:load', async (_, { storeCustomerId, countryCode }) => {
    if (countryCode && storeCustomerId && storeCustomerId !== selectedStoreCustomer) {
      await updateStoreCustomer({ countryCode, storeCustomerId });
    }

    await loadAgentStores();
  });
});
