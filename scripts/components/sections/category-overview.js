import waitToLoad from '../../lib/waitToLoad';
import choozy from '../../lib/choozy';

export default window.component(async node => {
  const { slider } = choozy(node, null);

  await waitToLoad('Swiper');
  // eslint-disable-next-line no-undef
  const swiper = new Swiper(slider, {
    allowTouchMove: true,
    direction: 'horizontal',
    slidesPerView: 'auto',
    grabCursor: true,
  });

  return swiper;
});
