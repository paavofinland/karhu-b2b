import waitToLoad from '../../lib/waitToLoad';
import choozy from '../../lib/choozy';

export default window.component(async node => {
  const { slider, slide, prev, next } = choozy(node, null);

  if (slide.length > 1) {
    await waitToLoad('Swiper');
    // eslint-disable-next-line no-undef
    const swiper = new Swiper(slider, {
      slidesPerView: 1,
      loop: true,
    });

    prev.addEventListener('click', () => swiper.slidePrev());
    next.addEventListener('click', () => swiper.slideNext());
  }
});
