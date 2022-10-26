import choozy from '../../lib/choozy';

export default window.component(async node => {
  const { customerSelect } = choozy(node, null);
  const { customerId, customerSecret, store, selectedStoreCustomer } = node.dataset;

  if (!customerId || !customerSecret || !store) return;

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

  const query = new URLSearchParams({
    store,
    customerId,
    secret: customerSecret,
  });

  const agentStores = await fetch(
    `${process.env.API_URL}/customer/list-agent-stores?${query}`
  ).then(res => res.json());

  if (!agentStores.length) {
    customerSelect.setAttribute('disabled', true);
    return;
  }

  appendSelect(agentStores);
  customerSelect.addEventListener('change', async e => {
    query.set('storeCustomerId', e.target.value);
    fetch(`${process.env.API_URL}/customer/set-selected-store?${query}`).then(() =>
      window.location.reload()
    );
  });
});
