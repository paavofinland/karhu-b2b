import { fetchHtml, updateURLHash } from './utils';

const sections = {
  filters: '[data-filters]',
  input: '[data-input]',
  clearAll: '[data-clear-all-filters-btn]',
  activeFilter: '[data-active-filter]',
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
  const clearListener = () => {
    const clearAllBtn = node.querySelector(sections.clearAll);
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', async e => {
        e.preventDefault();
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

  const updateSection = (section, html) => {
    // eslint-disable-next-line no-param-reassign
    node.querySelector(section).innerHTML = html.querySelector(section).innerHTML;
  };

  const updateFilterControls = () => {
    node.querySelectorAll(sections.input).forEach(input =>
      input.addEventListener('change', e => {
        ctx.emit('product:loading', null, { isLoading: true });
        onChangeFilter(e, node);
      })
    );
  };

  updateFilterControls();

  const updateActiveFiltersControls = () => {
    node.querySelectorAll(sections.activeFilter).forEach(filter =>
      filter.addEventListener('click', e => {
        node.querySelector(`#${e.currentTarget.dataset.activeFilter}${sections.input}`).click();
      })
    );
  };

  updateActiveFiltersControls();

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

  ctx.on('product:loading', (_state, { isLoading }) => {
    node.classList[isLoading ? 'add' : 'remove']('pointer-events-none', 'opacity-50');
  });

  ctx.on('filter:render', ({ html, uri }) => {
    ctx.emit('product:update', null, { html });
    updateSection(sections.filters, html);

    clearListener();
    updateFilterControls();
    updateActiveFiltersControls();
    updateClearFiltersControls();
    updateURLHash(uri);
    ctx.emit('product:loading', null, { isLoading: false });
    window.app.mount();
  });
});
