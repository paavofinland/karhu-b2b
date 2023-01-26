import choozy from '../../lib/choozy';
import fetchFunction from '../../lib/fetch-function';
import getLiquidVariables from '../../lib/get-liquid-variables';

const LOADING_EVENT = 'agent-stores:loading';
const SELECTED_STORE_CUSTOMER = 'selectedStoreCustomer';

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
  const selectedCustomerStore = localStorage.getItem(SELECTED_STORE_CUSTOMER);
  if (selectedCustomerStore) {
    ctx.emit('store:change', null, { id: selectedCustomerStore });
  }

  const {
    store: { store },
    customer: { secret: customerSecret, id: customerId },
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
      if (selectedCustomerStore === customer.id) {
        option.setAttribute('selected', true);
      }
      option.value = customer.id;
      option.innerText = customer.name;
      option.setAttribute('data-customer-select-option', '');
      option.setAttribute('data-country-code', customer.countryCode || 'NL');
      documentFragment.appendChild(option);
    });
    customerSelect.appendChild(documentFragment);
  };

  const updateSelectedOption = selectedStoreCustomer => {
    const { customerSelectOption } = choozy(customerSelect, null);
    const customerSelectOptionList = customerSelectOption ? [].concat(customerSelectOption) : [];
    const selectedOption = customerSelectOptionList.find(
      option => option.value === localStorage.getItem(SELECTED_STORE_CUSTOMER)
    );
    if (!selectedOption) return;
    selectedOption.value = selectedStoreCustomer;
    selectedOption.setAttribute('selected', true);
  };

  ctx.emit(LOADING_EVENT, null, true);

  const updateStoreCustomer = async (storeCustomerId, countryCode) => {
    localStorage.setItem(SELECTED_STORE_CUSTOMER, storeCustomerId);
    ctx.emit('store:change', null, { id: storeCustomerId });
    ctx.emit('country:revalidate', null, {
      countryCode,
    });
  };

  const loadAgentStores = async () => {
    const agentStores = await getAgentStores(store, customerId, customerSecret);

    ctx.emit(LOADING_EVENT, null, false);
    ctx.emit('agent-stores:received', null, { data: agentStores });

    if (!agentStores.length) {
      customerSelect.setAttribute('disabled', true);
      return;
    }

    appendSelect(agentStores);

    const storeCustomer = agentStores.find(({ id }) => id === selectedCustomerStore);

    if (!storeCustomer) {
      const { id: defaultId, countryCode: defaultCountryCode } = agentStores[0];
      updateStoreCustomer(defaultId, defaultCountryCode);
      updateSelectedOption(localStorage.getItem(SELECTED_STORE_CUSTOMER));
      return;
    }

    ctx.emit('store:change', null, { id: storeCustomer.id });

    const { countryCode } = storeCustomer;
    if (countryCode)
      ctx.emit('country:revalidate', null, {
        countryCode,
      });
  };

  customerSelect.addEventListener('change', async e => {
    updateStoreCustomer(
      e.target.value,
      e.target.options[e.target.selectedIndex].dataset.countryCode
    );
  });

  await loadAgentStores();
});
