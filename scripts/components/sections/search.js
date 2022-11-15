/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import choozy from '../../lib/choozy';
import debounce from '../../lib/debounce';
import { fetchHtml, getParameter, updateURLHash } from '../../lib/html.utils';

const getQueryString = ({ page, q, sortBy }) => {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set('page', page);
  queryParams.set('q', q);
  queryParams.set('sort_by', sortBy);
  return queryParams;
};

const replaceEmptyParams = ({ page, q, sortBy }) => {
  return {
    page: page || getParameter('page'),
    q: q || getParameter('q'),
    sortBy: sortBy || getParameter('sort_by'),
  };
};

const onSearch = sectionId =>
  debounce(async queryData => {
    const { page, q, sortBy } = replaceEmptyParams(queryData);
    const queryParams = getQueryString({ page, q, sortBy });
    queryParams.set('sectionId', sectionId);
    queryParams.set('type', 'product');
    const query = queryParams.toString();

    const productsHtml = await fetchHtml(
      `${window.location.origin + window.location.pathname}?${query}`
    );
    window.app.emit(['search:render'], null, {
      html: productsHtml,
      uri: query,
      requestedPage: page,
    });
  });

export default window.component(async (node, ctx) => {
  const { searchInput, searchContainer, sortByOptions, closeSearch } = choozy(node, null);

  const onSearchProducts = onSearch(node.dataset.sectionId);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          const currentPage = getParameter('page');
          onSearchProducts({ q: searchInput.value, page: +currentPage + 1 });
        }
      });
    },
    {
      rootMargin: '0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  const renderSearchData = html => {
    const currentPage = getParameter('page');
    const { searchResults } = choozy(node, null);
    const { searchResults: newSearchResultsContent } = choozy(html, null);

    if (currentPage === '1') {
      searchResults.innerHTML = newSearchResultsContent.innerHTML;
      return;
    }
    searchResults.insertAdjacentHTML('beforeEnd', newSearchResultsContent.innerHTML);
  };

  const getNewProductsCount = html => {
    const { productsCount } = choozy(html, null);
    return productsCount.innerText;
  };

  const updateProductsCount = countText => {
    const { productsCount } = choozy(node, null);
    productsCount.innerText = countText;
  };

  const clearSearchResults = () => {
    const { searchResults } = choozy(node, null);
    searchResults.innerHTML = '';
  };

  const onStartLoadingState = () => {
    const { searchResults, loader, empty } = choozy(node, null);
    empty.classList.add('hidden');
    loader.classList.remove('hidden');
    searchResults.classList.add('hidden');
  };

  const onEndLoadingState = () => {
    const { searchResults, loader } = choozy(node, null);
    loader.classList.add('hidden');
    searchResults.classList.remove('hidden');
  };

  const initializeOnFirstRender = () => {
    const { loadMore } = choozy(node, null);
    if (loadMore) {
      observer.observe(loadMore);
    }
  };

  const onInputSearch = value => {
    searchContainer.classList[value ? 'add' : 'remove']('is-active');

    if (value) {
      onSearchProducts({ q: value, page: 1 });
      onStartLoadingState();
      return;
    }

    clearSearchResults();
    updateProductsCount('No results found');
    const uri = getQueryString({ page: 1, q: '', sortBy: sortByOptions.value }).toString();
    updateURLHash(uri);
  };

  const onChangeSortBy = e => {
    const { productsContainer } = choozy(node, null);
    productsContainer.classList.add('is-loading');

    const sortBy = e.target.value;
    onSearchProducts({ q: searchInput.value, page: getParameter('page'), sortBy });
  };

  searchInput.addEventListener('input', e => onInputSearch(e.target.value));
  sortByOptions.addEventListener('change', onChangeSortBy);
  closeSearch.addEventListener('click', () => searchContainer.classList.add('is-active'));

  ctx.on('search:render', (_state, { html, uri, requestedPage }) => {
    const countText = getNewProductsCount(html);
    updateProductsCount(countText);

    const { searchResults } = choozy(html, null);
    const { empty, productsContainer } = choozy(node, null);
    productsContainer.classList.remove('is-loading');
    const isEmpty = !searchResults.childNodes.length;
    if (isEmpty) {
      if (requestedPage === 1) {
        clearSearchResults();
        empty.classList.remove('hidden');
      }
      onEndLoadingState();
      return;
    }

    updateURLHash(uri);
    renderSearchData(html);
    empty.classList.add('hidden');
    if (requestedPage === 1) {
      initializeOnFirstRender();
      onEndLoadingState();
    }
    window.app.mount();
  });

  const currentPage = getParameter('page');
  const searchValue = getParameter('q');
  if ((currentPage && currentPage !== '1') || searchValue) {
    searchContainer.classList.add('is-active');
    searchInput.value = searchValue;
    onInputSearch(searchValue);
    setTimeout(() => window.scrollTo(0, 0), 100);
  }
});
