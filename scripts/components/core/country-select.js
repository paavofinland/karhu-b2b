import choozy from '../../lib/choozy';
import getLiquidVariables from '../../lib/get-liquid-variables';

export default window.component((node, ctx) => {
  const { select } = choozy(node);
  const {
    customer: { selected_store_customer: selectedStoreCustomer },
  } = getLiquidVariables();

  const submit = (storeCustomerId = selectedStoreCustomer) => {
    const selectedOption = select.options[select.selectedIndex];
    if (selectedOption.dataset.url) {
      window.location.href = `${selectedOption.dataset.url}?country_code=${selectedOption.value}&selected_store_customer=${storeCustomerId}`;
    } else {
      select.form.submit();
    }
  };

  select.addEventListener('change', () => submit());

  // Handles country select based on URL or store customer
  ctx.on('country:revalidate', (_, { countryCode, storeCustomerId }) => {
    const currentCountryCode = select.dataset.current;
    const countryIsValid = Array.from(select.options)
      .map(({ value }) => value)
      .includes(countryCode);

    if (!countryIsValid) {
      console.info(`🌎 Can't switch to invalid country [${countryCode}]`);
    } else if (currentCountryCode !== countryCode) {
      console.info(`🌎 Switching to [${countryCode}]`);
      select.value = countryCode;
      submit(storeCustomerId);
    }
  });

  console.info(`🌎 Shopping in [${select.dataset.current}]`);

  const urlCountryCode = new URLSearchParams(window.location.search).get('country_code');
  const storeCustomerId = new URLSearchParams(window.location.search).get(
    'selected_store_customer'
  );
  const initialCountryCode =
    urlCountryCode || select.dataset.storeCustomer || select.dataset.current;

  ctx.emit('country:revalidate', null, {
    countryCode: initialCountryCode,
    storeCustomerId,
  });
  ctx.emit('agent-stores:load', null, { storeCustomerId, countryCode: initialCountryCode });
});
