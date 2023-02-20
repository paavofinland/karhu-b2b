/* eslint-disable no-param-reassign */
import choozy from '../../lib/choozy';
import { clearCart, updateCart } from '../../lib/cart';

export default window.component((node, ctx) => {
  const { clearCartForm, hamburger, hamburgerOpened, hamburgerClosed, mobileMenu, main } =
    choozy(node);
  const { clear } = node.dataset;

  const announcementBarHeight =
    document.querySelector('#shopify-section-announcement-bar').offsetHeight || 0;

  const isMenuClosed = () => hamburgerOpened.classList.contains('hidden');
  const isHeaderScrolled = () => window.scrollY > announcementBarHeight;

  const toggleTheme = () => {
    if (clear !== undefined)
      main.classList[!isMenuClosed() || isHeaderScrolled() ? 'add' : 'remove']('is-active');
  };

  window.addEventListener('scroll', toggleTheme, { passive: true });
  window.addEventListener('load', toggleTheme);

  hamburger.addEventListener('click', () => {
    hamburgerOpened.classList.toggle('hidden');
    hamburgerClosed.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
    mobileMenu.classList.toggle('left-0');
    toggleTheme();
  });

  const setMobileMenuHeight = () => {
    mobileMenu.style.height = `${
      window.innerHeight - announcementBarHeight - mobileMenu.parentElement.offsetHeight
    }px`;
  };

  setMobileMenuHeight();
  window.addEventListener('resize', setMobileMenuHeight);

  ctx.on('cart:clear', async (_, { onCartClearSuccess }) => {
    ctx.emit('cart:loading', null, true);
    await clearCart();
    await updateCart(clearCartForm);
    ctx.emit('cart:render');
    onCartClearSuccess();
  });
});
