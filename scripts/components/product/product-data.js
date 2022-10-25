import waitToLoad from '../../lib/waitToLoad';
import choozy from '../../lib/choozy';

export default window.component(async node => {
  const { mainImageSlider, subImageSlider, prev, next } = choozy(node, null);

  await waitToLoad('Swiper');

  /** @type {import('swiper').SwiperOptions} */
  const subSwiperOptions = {
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      1024: {
        slidesPerView: 6,
      },
    },
  };

  // eslint-disable-next-line no-undef
  const subSwiper = new Swiper(subImageSlider, subSwiperOptions);
  // eslint-disable-next-line no-undef
  const swiper = new Swiper(mainImageSlider, {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: subSwiper,
    },
  });

  prev.addEventListener('click', () => swiper.slidePrev());
  next.addEventListener('click', () => swiper.slideNext());
});
