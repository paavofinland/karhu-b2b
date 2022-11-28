/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';

export default window.component(node => {
  const {
    addAddressButton,
    resetPageButton,
    editAddressButton,
    addAddress,
    info,
    addresses,
    editAddresses,
    editAddressForm,
    makeDefaultButton,
    tabLink,
    tab,
  } = choozy(node, null);

  const tabs = [].concat(tab).filter(Boolean);
  const tabLinks = [].concat(tabLink).filter(Boolean);
  const availableTabSlugs = tabs.map(t => t.dataset.tab);
  const urlTabSlug = new URLSearchParams(window.location.search).get('t');
  const activeTabSlug =
    urlTabSlug && availableTabSlugs.includes(urlTabSlug) ? urlTabSlug : availableTabSlugs[0];

  tabs.forEach(t => t.classList[activeTabSlug === t.dataset.tab ? 'remove' : 'add']('hidden'));
  tabLinks.forEach(l =>
    l.classList[activeTabSlug === l.dataset.tabLink ? 'add' : 'remove']('is-active')
  );

  const resetPage = e => {
    e.preventDefault();
    info.classList.remove('hidden');
    addresses.classList.remove('hidden');
    addAddress.classList.add('hidden');
    editAddresses.classList.add('hidden');
    [].concat(editAddressForm).forEach(form => form.classList.add('hidden'));
    window.scrollTo(0, 0);
  };

  addAddressButton &&
    addAddressButton.addEventListener('click', e => {
      e.preventDefault();
      addAddress.classList.remove('hidden');
      info.classList.add('hidden');
      addresses.classList.add('hidden');
      window.scrollTo(0, 0);
    });
  resetPageButton &&
    [].concat(resetPageButton).forEach(button => {
      button.addEventListener('click', resetPage);
    });

  editAddressButton &&
    [].concat(editAddressButton).forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        const { addressId } = button.dataset;
        addresses.classList.add('hidden');
        info.classList.add('hidden');

        const targetEditAddressForm = []
          .concat(editAddressForm)
          .find(form => form.dataset.addressId === addressId);

        editAddresses.classList.remove('hidden');
        targetEditAddressForm.classList.remove('hidden');

        window.scrollTo(0, 0);
      });
    });

  makeDefaultButton &&
    [].concat(makeDefaultButton).forEach(button => {
      button.addEventListener('click', e => {
        const { addressId } = e.target.dataset;
        const editForm = editAddressForm.find(form => form.dataset.addressId === addressId);
        const formElement = editForm.querySelector('form');
        const makeDefaultCheckbox = formElement.querySelector('input[type="checkbox"]');
        makeDefaultCheckbox.click();
        formElement.submit();
      });
    });
});
