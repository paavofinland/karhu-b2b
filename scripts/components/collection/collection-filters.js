import { updateURLHash } from './utils';
import choozy from '../../lib/choozy';

const remount = () => {
  window.app.unmount();
  window.app.mount();
};

export default window.component((node, ctx) => {
  const {
    input: inputElement,
    clearButton: clearButtonElement,
    clearAllButton,
    toggleFiltersButton: toggleFiltersButtonElement,
  } = choozy(node);

  const inputs = [].concat(inputElement).filter(Boolean);
  const clearButtons = [].concat(clearButtonElement).filter(Boolean);
  const toggleFiltersButtons = [].concat(toggleFiltersButtonElement).filter(Boolean);

  const applyFilters = async form => {
    const sortBy = new URLSearchParams(window.location.search).get('sort_by');
    const persistedParams = [...(sortBy ? [['sort_by', sortBy]] : [])];
    const filterParams = form ? Array.from(new FormData(form).entries()) : [];

    ctx.emit('product:loading', null, { isLoading: true });

    const searchParams = new URLSearchParams([...filterParams, ...persistedParams]).toString();

    const { 'main-collection': collectionHtml } = await fetch(
      `${
        window.location.origin + window.location.pathname
      }?sections=main-collection&${searchParams}`
    ).then(r => r.json());

    ctx.emit('filter:render', {
      html: new DOMParser().parseFromString(collectionHtml, 'text/html'),
      uri: searchParams,
    });
  };

  if (clearAllButton) clearAllButton.addEventListener('click', () => applyFilters());
  inputs.forEach(input => input.addEventListener('change', e => applyFilters(e.target.form)));
  clearButtons.forEach(b =>
    b.addEventListener('click', () => {
      inputs
        .filter(({ name }) => name === b.dataset.name)
        .forEach(input => {
          // eslint-disable-next-line no-param-reassign
          input.checked = false;
        });
      applyFilters();
    })
  );

  toggleFiltersButtons.forEach(b => b.addEventListener('click', () => ctx.emit('filters:toggle')));

  const toggleSidebar = (n, forceOpen) => {
    const { sidebarFilters, overlay } = choozy(n);
    sidebarFilters.classList.toggle('is-active');
    overlay.classList.toggle('is-active');

    if (forceOpen) {
      sidebarFilters.classList.add('is-active');
      overlay.classList.add('is-active');
    }
  };

  ctx.on('filter:render', ({ html, uri }) => {
    ctx.emit('product:update', null, { html });
    const filtersHtml = choozy(html).filters;
    toggleSidebar(filtersHtml, true);
    // eslint-disable-next-line no-param-reassign
    node.outerHTML = filtersHtml.outerHTML;
    ctx.emit('product:loading', null, { isLoading: false });
    updateURLHash(uri);
    remount();
  });

  ctx.on('filters:toggle', () => {
    toggleSidebar(node);
    document.body.classList.toggle('overflow-hidden');
  });
});
