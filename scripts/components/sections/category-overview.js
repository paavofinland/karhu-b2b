import waitToLoad from '../../lib/waitToLoad';
import choozy from '../../lib/choozy';

export default window.component(async node => {
  const { slider } = choozy(node, null);

  await waitToLoad('Swiper');

  /** @type {import('swiper').SwiperOptions} */
  const swiperOptions = {
    slidesPerView: 1.4,
    spaceBetween: 16,
    slidesOffsetBefore: 16,
    slidesOffsetAfter: 16,
    breakpoints: {
      768: {
        slidesPerView: 2.2,
        spaceBetween: 16,
        slidesOffsetBefore: 16,
        slidesOffsetAfter: 16,
      },
      1024: {
        slidesPerView: 2.4,
        spaceBetween: 60,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 60,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
    },
  };

  // eslint-disable-next-line no-undef
  const swiper = new Swiper(slider, swiperOptions);
  slider.classList.add('is-loaded');

  return swiper;
});
