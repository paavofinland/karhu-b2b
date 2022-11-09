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
    } = choozy(node);

    const inputs = [].concat(inputElement).filter(Boolean);
    const clearButtons = [].concat(clearButtonElement).filter(Boolean);

    const applyFilters = async (reset = false) => {
      ctx.emit('product:loading', null, { isLoading: true });

      const searchParams = reset ? '' : new URLSearchParams(new FormData(filtersForm)).toString();
      const collectionHtml = await fetchHtml(
        `${
          window.location.origin + window.location.pathname
        }?section_id=${sectionId}&${searchParams}`
      );

      window.app.emit(['filter:render'], { html: collectionHtml, uri: searchParams });
    };

    if (clearAllButton) clearAllButton.addEventListener('click', () => applyFilters(true));

    inputs.forEach(input => input.addEventListener('change', () => applyFilters()));

    clearButtons.forEach(clearButton =>
      clearButton.addEventListener('click', () => {
        inputs
          .filter(({ name }) => name === clearButton.dataset.name)
          .forEach(input => {
            // eslint-disable-next-line no-param-reassign
            input.checked = false;
          });
        applyFilters();
      })
    );
  };

  ctx.on('filter:render', ({ html, uri }) => {
    ctx.emit('product:update', null, { html });
    choozy(node).filtersForm.innerHTML = choozy(html).filtersForm.innerHTML;
    updateURLHash(uri);
    init();
    ctx.emit('product:loading', null, { isLoading: false });
  });

  init();
});
