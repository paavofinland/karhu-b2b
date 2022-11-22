import { fetchHtml, updateURLHash } from './utils';
import choozy from '../../lib/choozy';

export default window.component((node, ctx) => {
  const { sectionId } = node.dataset;

  const init = () => {
    const {
      filtersForm,
      input: inputElement,
      clearButton: clearButtonElement,
      clearAllButton,
      toggleFiltersButton: toggleFiltersButtonElement,
    } = choozy(node);

    const inputs = [].concat(inputElement).filter(Boolean);
    const clearButtons = [].concat(clearButtonElement).filter(Boolean);
    const toggleFiltersButtons = [].concat(toggleFiltersButtonElement).filter(Boolean);

    const applyFilters = async (reset = false) => {
      const sortBy = new URLSearchParams(window.location.search).get('sort_by');
      const persistedParams = sortBy ? { sort_by: sortBy } : {};
      const filterParams = reset ? {} : Object.fromEntries(new FormData(filtersForm));

      ctx.emit('product:loading', null, { isLoading: true });

      const searchParams = new URLSearchParams({
        ...filterParams,
        ...persistedParams,
      }).toString();

      const collectionHtml = await fetchHtml(
        `${
          window.location.origin + window.location.pathname
        }?section_id=${sectionId}&${searchParams}`
      );

      window.app.emit(['filter:render'], {
        html: collectionHtml,
        uri: searchParams,
      });
    };

    if (clearAllButton) clearAllButton.addEventListener('click', () => applyFilters(true));
    inputs.forEach(input => input.addEventListener('change', () => applyFilters()));
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

    toggleFiltersButtons.forEach(b =>
      b.addEventListener('click', () => ctx.emit('filters:toggle'))
    );
  };

  const toggleSidebar = n => {
    const { sidebar, overlay } = choozy(n);
    sidebar.classList.toggle('is-active');
    overlay.classList.toggle('is-active');
  };

  ctx.on('filter:render', ({ html, uri }) => {
    console.log(uri);
    ctx.emit('product:update', null, { html });
    const filtersHtml = choozy(html).filters;
    toggleSidebar(filtersHtml);
    // eslint-disable-next-line no-param-reassign
    node.innerHTML = choozy(html).filters.innerHTML;
    updateURLHash(uri);
    init();
    ctx.emit('product:loading', null, { isLoading: false });
  });

  ctx.on('filters:toggle', () => {
    toggleSidebar(node);
    document.body.classList.toggle('overflow-hidden');
  });

  init();
});
