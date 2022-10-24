import choozy from '../../lib/choozy';

export default window.component(node => {
  const { hamburger, hamburgerOpened, hamburgerClosed, mobileMenu } = choozy(node, null);

  const announcementBarHeight =
    document.querySelector('#shopify-section-announcement-bar').offsetHeight || 0;

  const isMenuClosed = () => hamburgerOpened.classList.contains('hidden');
  const isHeaderScrolled = () => window.scrollY > announcementBarHeight;

  const toggleTheme = () =>
    node.classList[!isMenuClosed() || isHeaderScrolled() ? 'add' : 'remove']('is-active');

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
});
