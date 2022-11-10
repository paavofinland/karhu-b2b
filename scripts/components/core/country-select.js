import choozy from '../../lib/choozy';

export default window.component((node, ctx) => {
  const { select } = choozy(node);

  const urlCountryCode = new URLSearchParams(window.location.search).get('country_code');
  const currentCountryCode = select.dataset.current;
  const defaultCountryCode = select.dataset.default;

  const submit = () => {
    const selectedOption = select.options[select.selectedIndex];
    if (selectedOption.dataset.url) {
      window.location.href = `${selectedOption.dataset.url}?country_code=${selectedOption.value}`;
    } else {
      select.form.submit();
    }
  };

  if (defaultCountryCode && currentCountryCode !== defaultCountryCode) {
    select.value = defaultCountryCode;
    submit();
  } else if (urlCountryCode && urlCountryCode !== currentCountryCode) {
    select.value = urlCountryCode;
    submit();
  }

  ctx.on('store:change', (_, { countryCode }) => {
    if (countryCode !== currentCountryCode) {
      select.value = countryCode;
      submit();
    }
  });

  select.addEventListener('change', () => submit());
});
