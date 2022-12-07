import choozy from '../../lib/choozy';

export default window.component((node, ctx) => {
  const { select } = choozy(node);

  const submit = () => {
    const selectedOption = select.options[select.selectedIndex];
    if (selectedOption.dataset.url) {
      window.location.href = `${selectedOption.dataset.url}?country_code=${selectedOption.value}`;
    } else {
      select.form.submit();
    }
  };

  select.addEventListener('change', () => submit());

  // Handles country select based on URL or store customer
  ctx.on('country:revalidate', (_, { countryCode: c }) => {
    const currentCountryCode = select.dataset.current;
    const countryCode = c || select.dataset.storeCustomer || select.dataset.current;

    console.info(`🌎 Shopping in [${currentCountryCode}]`);

    const countryIsValid = Array.from(select.options)
      .map(({ value }) => value)
      .includes(countryCode);

    if (countryIsValid && currentCountryCode !== countryCode) {
      console.info(`🌎 Switching to [${countryCode}]`);
      select.value = countryCode;
      submit();
    } else {
      console.warn(`🌎 Could not switch to [${countryCode}]`);
    }
  });

  const urlCountryCode = new URLSearchParams(window.location.search).get('country_code');
  ctx.emit('country:revalidate', null, {
    ...(urlCountryCode ? { countryCode: urlCountryCode } : {}),
  });
});
