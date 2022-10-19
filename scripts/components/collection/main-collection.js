import choozy from '../../lib/choozy';

const fetchHtml = async url =>
  fetch(url)
    .then(response => response.text())
    .then(responseText => new DOMParser().parseFromString(responseText, 'text/html'));

const updateURLHash = searchParams =>
  // eslint-disable-next-line no-restricted-globals
  history.pushState(
    { searchParams },
    '',
    `${window.location.pathname}${
      searchParams.includes('?') ? searchParams : '?'.concat(searchParams)
    }`
  );

const getParameter = paramName => {
  const searchString = window.location.search.substring(1);
  let i;
  let val;
  const params = searchString.split('&');

  for (i = 0; i < params.length; i++) {
    val = params[i].split('=');
    if (val[0] === paramName) {
      return parseInt(val[1], 0);
    }
  }
  return 1;
};

/* eslint-disable no-unused-vars */
export default window.component((node, ctx) => {
  const { filters, openFilterBtn, closeFiltersBtn, loadMore, productGrid } = choozy(node, null);
  const body = document.getElementsByTagName('body')[0];

  const onToggleFiltersMenu = () => {
    body.classList.toggle('overflow-hidden');
    node.classList.toggle('filters_opened');
    filters.classList.toggle('filters_opened');
  };

  openFilterBtn.addEventListener('click', onToggleFiltersMenu);

  closeFiltersBtn.addEventListener('click', onToggleFiltersMenu);

  const renderMoreProducts = async setPageNum => {
    const currentPage = getParameter('page');
    const pageToQuery = setPageNum || currentPage + 1;

    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', pageToQuery);
    const query = queryParams.toString();

    const filterHtmlRender = await fetchHtml(
      `${window.location.origin + window.location.pathname}?section_id=main-collection&${query}`
    );

    loadMore.classList.add('opacity-0');

    if (filterHtmlRender.querySelector('[data-empty]')) return;

    const renderBefore = currentPage !== 1;

    window.app.emit(['filter:render'], {
      html: filterHtmlRender,
      uri: query,
      addProducts: !renderBefore,
    });
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          loadMore.classList.remove('active');
          renderMoreProducts();
        }
      });
    },
    {
      rootMargin: '0px',
      threshold: 0,
    }
  );

  if (loadMore) {
    observer.observe(loadMore);
  }

  if (getParameter('page') !== 1) {
    window.addEventListener('load', () => {
      renderMoreProducts(1);
      setTimeout(() => window.scrollTo(0, 0), 100);
    });
  }

  ctx.on('filter:render', ({ html, uri, addProducts = false }) => {
    if (addProducts) {
      productGrid.innerHTML += html.querySelector('[data-product-grid]').innerHTML;
    } else {
      productGrid.innerHTML = html.querySelector('[data-product-grid]').innerHTML;
    }

    updateURLHash(uri);
    window.app.mount();
  });
});
