/* eslint-disable no-param-reassign */
import choozy from '../../lib/choozy';
import { debounce } from '../../lib/debounce';
import { fetchHtml, getParameter, updateURLHash } from '../../lib/html.utils';

const sections = {
  productsContainer: '[data-products-container]',
  loader: '[data-loader]',
  pagination: '[data-pagination]',
  loadMore: '[data-load-more]',
  searchResults: '[data-search-results]',
  empty: '[data-empty]',
};

const getQueryParams = ({ page, sectionId, value }) => {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set('page', page);
  queryParams.set('q', value);
  queryParams.set('sectionId', sectionId);
  queryParams.set('type', 'product');
  return queryParams.toString();
};

const onSearch = sectionId =>
  debounce(async (value, page) => {
    const query = getQueryParams({ page, value, sectionId });
    const productsHtml = await fetchHtml(
      `${window.location.origin + window.location.pathname}?${query}`
    );
    window.app.emit(['search:render'], null, { html: productsHtml, uri: query });
  });

export default window.component(async (node, ctx) => {
  const { searchInput, searchContainer } = choozy(node, null);

  const onSearchProducts = onSearch(node.dataset.sectionId);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          const currentPage = getParameter('page');
          onSearchProducts(searchInput.value, +currentPage + 1);
        }
      });
    },
    {
      rootMargin: '0px',
      threshold: 0,
    }
  );

  const updateSearchResults = html => {
    const currentPage = getParameter('page');
    if (currentPage === '1') {
      node.querySelector(sections.productsContainer).innerHTML = html.querySelector(
        sections.productsContainer
      ).innerHTML;
      return;
    }
    node
      .querySelector(sections.searchResults)
      .insertAdjacentHTML('beforeEnd', html.querySelector(sections.searchResults).innerHTML);
  };

  const onEndLoadingState = () => {
    node.querySelector(sections.loader).classList.add('hidden');
    node.querySelector(sections.productsContainer).classList.remove('hidden');
  };

  const initializeOnFirstRender = () => {
    onEndLoadingState();

    const loadMore = node.querySelector(sections.loadMore);
    if (loadMore) {
      observer.observe(loadMore);
    }
  };

  const onInputSearch = value => {
    if (value) {
      onSearchProducts(value, 1);
    }
    node.querySelector(sections.loader).classList.remove('hidden');
    node.querySelector(sections.productsContainer).classList.add('hidden');
    searchContainer.classList[value ? 'add' : 'remove']('is-search');
  };

  searchInput.addEventListener('input', e => onInputSearch(e.target.value));

  ctx.on('search:render', (_state, { html, uri }) => {
    updateURLHash(uri);

    const isEmpty = !html.querySelector(sections.searchResults).childNodes.length;
    if (isEmpty) {
      onEndLoadingState();
      node.querySelector(sections.empty).classList.remove('hidden');
      node.querySelector(sections.loadMore).remove();
      return;
    }

    updateSearchResults(html);
    if (getParameter('page') === '1') initializeOnFirstRender();
    window.app.mount();
  });

  const currentPage = getParameter('page');
  const searchValue = getParameter('q');
  if ((currentPage && currentPage !== '1') || searchValue) {
    searchContainer.classList.add('is-search');
    searchInput.value = searchValue;
    onInputSearch(searchValue);
    setTimeout(() => window.scrollTo(0, 0), 100);
  }
});
