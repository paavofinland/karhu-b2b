import choozy from '../../lib/choozy';
import waitToLoad from '../../lib/waitToLoad';

export default window.component(async node => {
  const { slider, thumbnailSlider, prev, next } = choozy(node);
  const { slides } = node.dataset;

  if (!slider) return;

  await waitToLoad('Swiper');

  /** @type {import('swiper').SwiperOptions} */
  const subSwiperOptions = {
    slidesPerView: 3.25,
    watchSlidesProgress: true,
    breakpoints: {
      1024: {
        slidesPerView: Math.max(Math.min(Number(slides), 9.5), 5),
      },
    },
    on: {
      beforeInit(s) {
        s.$el.removeClass('is-loading');
      },
    },
  };

  // eslint-disable-next-line no-undef
  const subSwiper = new Swiper(thumbnailSlider, subSwiperOptions);

  /** @type {import('swiper').SwiperOptions} */
  const swiperOptions = {
    resizeObserver: true,
    thumbs: {
      swiper: subSwiper,
      multipleActiveThumbs: false,
      slideThumbActiveClass: 'is-active',
    },
    navigation: {
      nextEl: next,
      prevEl: prev,
    },
    on: {
      beforeInit(s) {
        s.$el.removeClass('is-loading');
      },
    },
  };

  // eslint-disable-next-line no-undef, no-new
  new Swiper(slider, swiperOptions);
});
