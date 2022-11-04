import choozy from '../../lib/choozy';

export default window.component(node => {
  const { select } = choozy(node);

  const urlCountryCode = new URLSearchParams(window.location.search).get('country_code');
  const currentCountryCode = select.dataset.current;

  if (urlCountryCode && urlCountryCode !== currentCountryCode) {
    select.value = urlCountryCode;
    select.form.submit();
  }

  select.addEventListener('change', e => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    if (selectedOption.dataset.url) {
      window.location.href = `${selectedOption.dataset.url}?country_code=${selectedOption.value}`;
    } else {
      e.target.form.submit();
    }
  });
});
