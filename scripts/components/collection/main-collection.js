import choozy from '../../lib/choozy';
import { fetchHtml, updateURLHash } from './utils';

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

export default window.component((node, ctx) => {
  const { loadMore, sortByOptions, productGrid } = choozy(node);

  ctx.on('product:update', (_state, { html }) => {
    // eslint-disable-next-line no-param-reassign
    productGrid.innerHTML = choozy(html).productGrid.innerHTML;
  });

  const getQueryParams = (pageToQuery, sortBy) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', pageToQuery);
    queryParams.set('sort_by', sortBy);
    return queryParams.toString();
  };

  const renderMoreProducts = async setPageNum => {
    const currentPage = getParameter('page');
    const pageToQuery = setPageNum || currentPage + 1;
    const sortBy = sortByOptions.value;
    const query = getQueryParams(pageToQuery, sortBy);

    const filterHtmlRender = await fetchHtml(
      `${window.location.origin + window.location.pathname}?section_id=main-collection&${query}`
    );

    loadMore.classList.add('opacity-0');

    const { empty } = choozy(filterHtmlRender, null);
    if (empty) return;

    const renderBefore = pageToQuery === 1;

    window.app.emit(['product:render'], {
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

  ctx.on('product:render', ({ html, uri, addProducts = false }) => {
    const { productGrid: productGridToRender } = choozy(html, null);
    if (addProducts) {
      productGrid.innerHTML += productGridToRender.innerHTML;
    } else {
      productGrid.innerHTML = productGridToRender.innerHTML;
    }

    updateURLHash(uri);
    window.app.mount();
    ctx.emit('product:loading', null, { isLoading: false });
  });

  ctx.on('product:loading', (_, { isLoading }) => {
    choozy(node).container.classList[isLoading ? 'add' : 'remove']('is-loading');
  });

  sortByOptions.addEventListener('change', () => {
    ctx.emit('product:loading', null, { isLoading: true });
    renderMoreProducts(1);
  });
});
