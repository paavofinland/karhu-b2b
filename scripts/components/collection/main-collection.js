/* eslint-disable no-unused-expressions */
import choozy from '../../lib/choozy';
import remount from '../../lib/remount';
import { fetchHtml, updateURLHash } from './utils';

const getPage = () => Number(new URLSearchParams(window.location.search).get('page') || 1);

const getQueryParams = (pageToQuery, sortBy) => {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set('page', pageToQuery);
  queryParams.set('sort_by', sortBy);
  return queryParams.toString();
};

export default window.component((node, ctx) => {
  const { loadMore, productGrid, sortByOptions, sortByContainer, container } = choozy(node);

  ctx.on('product:update', (_state, { html }) => {
    // eslint-disable-next-line no-param-reassign
    productGrid.innerHTML = choozy(html).productGrid.innerHTML;
  });

  const renderMoreProducts = async setPageNum => {
    const currentPage = getPage();
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

    window.app.emit('product:render', null, {
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

  if (getPage() !== 1) {
    window.addEventListener('load', () => {
      renderMoreProducts(1);
      setTimeout(() => window.scrollTo(0, 0), 100);
    });
  }

  ctx.on('product:render', (_, { html, uri, addProducts = false }) => {
    const { productGrid: productGridToRender } = choozy(html, null);
    if (addProducts) {
      productGrid.innerHTML += productGridToRender.innerHTML;
    } else {
      productGrid.innerHTML = productGridToRender.innerHTML;
    }

    // To reinit
    []
      .concat(choozy(productGrid).quickAddButton)
      .filter(Boolean)
      .forEach(button => button.setAttribute('data-component', 'quickAddButton'));

    updateURLHash(uri);
    ctx.emit('product:loading', null, { isLoading: false });
    remount();
  });

  ctx.on('product:loading', (_, { isLoading }) => {
    [container, sortByContainer, productGrid].forEach(e =>
      e.classList[isLoading ? 'add' : 'remove']('is-loading')
    );
  });

  sortByOptions.addEventListener('change', () => {
    ctx.emit('product:loading', null, { isLoading: true });
    renderMoreProducts(1);
  });
});
