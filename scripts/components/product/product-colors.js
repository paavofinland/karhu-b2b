import waitToLoad from '../../lib/waitToLoad';
import choozy from '../../lib/choozy';

export default window.component(async node => {
  const { slider, slide, prev, next } = choozy(node);

  const slides = [].concat(slide).length;
  await waitToLoad('Swiper');

  const desktopSlidesPerView = 4;

  if (slides > 3) {
    /** @type {import('swiper').SwiperOptions} */
    const swiperConfig = {
      slidesPerView: 3.5,
      spaceBetween: 4,

      on: {
        beforeInit(s) {
          s.$el.removeClass('is-loading');
        },
        navigationNext(s) {
          // Slide to last
          if ((s.slides.length - 1) / 2 <= desktopSlidesPerView) s.slideTo(s.slides.length - 1);
        },
        navigationPrev(s) {
          // Slide to first
          if ((s.slides.length - 1) / 2 <= desktopSlidesPerView) s.slideTo(0);
        },
      },
      breakpoints: {
        768: {
          slidesPerView: 5.5,
        },
        1024: {
          slidesPerView: desktopSlidesPerView,
          navigation: {
            nextEl: next,
            prevEl: prev,
          },
        },
      },
    };

    // eslint-disable-next-line no-undef, no-new
    const a = new Swiper(slider, swiperConfig);
  }
});
