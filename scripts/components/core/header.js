/* eslint-disable consistent-return */
import choozy from '../../lib/choozy';

const SCREEN_MD = 768;

export default window.component(node => {
  const { hamburger, hamburgerOpened, hamburgerClosed, mobileMenu } = choozy(node, null);

  const announcementBarHeight = document.querySelector('#announcement-bar')?.offsetHeight || 0;

  const setHeaderWhiteTheme = () => {
    node.classList.add('header_scrolled', 'border-grey-5');
    node.classList.remove('border-opacity-20');
  };

  const setHeaderBasicTheme = () => {
    node.classList.remove('header_scrolled', 'border-grey-5');
    node.classList.add('border-opacity-20');
  };

  const isMenuClosed = () => hamburgerOpened.classList.contains('hidden');
  const isHeaderScrolled = () => window.scrollY > announcementBarHeight;

  const handleScrollHeader = () =>
    isMenuClosed() && (isHeaderScrolled() ? setHeaderWhiteTheme() : setHeaderBasicTheme());

  const handleClickHamburgerMenu = () =>
    !isHeaderScrolled() && (isMenuClosed() ? setHeaderBasicTheme() : setHeaderWhiteTheme());

  window.addEventListener('scroll', handleScrollHeader);
  window.addEventListener('load', handleScrollHeader);
  node.addEventListener('mouseover', setHeaderWhiteTheme);
  node.addEventListener('mouseleave', () => !isHeaderScrolled() && setHeaderBasicTheme());

  hamburger.addEventListener('click', () => {
    hamburgerOpened.classList.toggle('hidden');
    hamburgerClosed.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
    mobileMenu.classList.toggle('left-0');
    handleClickHamburgerMenu();
  });

  if (window.innerWidth <= SCREEN_MD) {
    mobileMenu.style.height = `${
      window.innerHeight - announcementBarHeight - mobileMenu.parentElement.offsetHeight
    }px`;
  }
});
