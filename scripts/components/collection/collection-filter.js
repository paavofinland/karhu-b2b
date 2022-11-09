import { fetchHtml, updateURLHash } from './utils';
import choozy from '../../lib/choozy';

const sections = {
  filters: '[data-filters]',
  input: '[data-input]',
  clearAll: '[data-clear-all-filters-btn]',
  clearFilter: '[data-clear-filter]',
};

const fetchCollectionSection = async (searchParams, section) => {
  const collectionHtml = await fetchHtml(
    `${window.location.origin + window.location.pathname}?section_id=${
      section.dataset.sectionId
    }&${searchParams}`
  );
  window.app.emit(['filter:render'], { html: collectionHtml, uri: searchParams });
};

const onChangeFilter = (event, section) => {
  const formFilters = new URLSearchParams(new FormData(event.target.closest('form'))).toString();
  fetchCollectionSection(formFilters, section);
};

export default window.component((node, ctx) => {
  const { filtersForm } = choozy(node);

  const clearListener = () => {
    const clearAllBtn = node.querySelector(sections.clearAll);
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', async e => {
        e.preventDefault();
        ctx.emit('product:loading', null, { isLoading: true });
        const filterHtmlRender = await fetchHtml(
          `${window.location.origin + window.location.pathname}?section_id=${
            node.dataset.sectionId
          }`
        );
        window.app.emit(['filter:render'], { html: filterHtmlRender, uri: '' });
      });
    }
  };
  clearListener();

  const updateFilterControls = () => {
    node.querySelectorAll(sections.input).forEach(input =>
      input.addEventListener('change', e => {
        ctx.emit('product:loading', null, { isLoading: true });
        onChangeFilter(e, node);
      })
    );
  };

  updateFilterControls();

  const updateClearFiltersControls = () => {
    node.querySelectorAll(sections.clearFilter).forEach(clearBtn =>
      clearBtn.addEventListener('click', e => {
        e.preventDefault();
        const filterName = e.currentTarget.dataset.clearFilter;
        const filtersToClear = node.querySelectorAll(`${sections.input}[id*='${filterName}']`);
        filtersToClear.forEach(filter => {
          // eslint-disable-next-line no-param-reassign
          filter.checked = false;
        });
        const event = new Event('change');
        filtersToClear[0].dispatchEvent(event);
      })
    );
  };

  updateClearFiltersControls();

  ctx.on('filter:render', ({ html, uri }) => {
    ctx.emit('product:update', null, { html });
    filtersForm.innerHTML = choozy(html).filtersForm.innerHTML;

    clearListener();
    updateFilterControls();
    updateClearFiltersControls();
    updateURLHash(uri);
    ctx.emit('product:loading', null, { isLoading: false });
    window.app.mount();
  });
});
