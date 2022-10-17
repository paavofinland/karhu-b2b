import waitToLoad from '../../lib/waitToLoad';
import choozy from '../../lib/choozy';

export default window.component(async node => {
  const { slider, slide, prev, next } = choozy(node, null);

  if (slide.length > 1) {
    await waitToLoad('Swiper');

    /** @type {import('swiper').SwiperOptions} */
    const swiperOptions = {
      slidesPerView: 1,
      loop: true,
      on: {
        afterInit: s => {
          s.wrapperEl.classList.remove('overflow-hidden', 'flex');
        },
      },
    };

    // eslint-disable-next-line no-undef
    const swiper = new Swiper(slider, swiperOptions);

    prev.addEventListener('click', () => swiper.slidePrev());
    next.addEventListener('click', () => swiper.slideNext());
  }
});
