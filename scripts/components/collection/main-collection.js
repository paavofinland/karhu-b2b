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

/* eslint-disable no-unused-vars */
export default window.component((node, ctx) => {
  const { filters, openFilterBtn, closeFiltersBtn, loadMore, productGrid } = choozy(node, null);
  const body = document.getElementsByTagName('body')[0];

  const sections = {
    productGrid: '[data-product-grid]',
    empty: '[data-empty]',
  };

  ctx.on('product:update', (_state, { html }) => {
    // eslint-disable-next-line no-param-reassign
    node.querySelector(sections.productGrid).innerHTML = html.querySelector(
      sections.productGrid
    ).innerHTML;
  });

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

    if (filterHtmlRender.querySelector(sections.empty)) return;

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
    if (addProducts) {
      productGrid.innerHTML += html.querySelector(sections.productGrid).innerHTML;
    } else {
      productGrid.innerHTML = html.querySelector(sections.productGrid).innerHTML;
    }

    updateURLHash(uri);
    window.app.mount();
  });
});
