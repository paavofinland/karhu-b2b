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
  ctx.on('country:revalidate', (_, { countryCode }) => {
    const currentCountryCode = select.dataset.current;
    const countryIsValid = Array.from(select.options)
      .map(({ value }) => value)
      .includes(countryCode);

    if (!countryIsValid) {
      console.info(`🌎 Can't switch to invalid country [${countryCode}]`);
    } else if (currentCountryCode !== countryCode) {
      console.info(`🌎 Switching to [${countryCode}]`);
      select.value = countryCode;
      submit();
    }
  });

  console.info(`🌎 Shopping in [${select.dataset.current}]`);

  const urlCountryCode = new URLSearchParams(window.location.search).get('country_code');
  ctx.emit('country:revalidate', null, {
    countryCode: urlCountryCode || select.dataset.storeCustomer || select.dataset.current,
  });
});
