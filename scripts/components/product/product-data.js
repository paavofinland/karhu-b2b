import waitToLoad from '../../lib/waitToLoad';
import choozy from '../../lib/choozy';

export default window.component(async node => {
  const {
    mainImageSlider,
    subImageSlider,
    colorSlider,
    colorSlide,
    mainSlide,
    prev,
    next,
    colorPrev,
    colorNext,
  } = choozy(node, null);

  await waitToLoad('Swiper');

  if (mainSlide.length > 1) {
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
      thumbs: {
        swiper: subSwiper,
      },
    });

    prev.addEventListener('click', () => swiper.slidePrev());
    next.addEventListener('click', () => swiper.slideNext());
  }

  if (colorSlide.length > 4) {
    // eslint-disable-next-line no-undef, no-unused-vars
    const colorSwiper = new Swiper(colorSlider, {
      slidesPerView: 'auto',
      spaceBetween: 0,
      simulateTouch: false,
    });

    colorPrev.addEventListener('click', () => {
      colorSwiper.slidePrev();
      if (colorSwiper.activeIndex === 0) {
        colorPrev.classList.add('hidden');
      }
      colorNext.classList.remove('hidden');
    });
    colorNext.addEventListener('click', () => {
      colorSwiper.slideNext();
      if (colorSlide.length - colorSwiper.activeIndex === 4) {
        colorNext.classList.add('hidden');
      }
      colorPrev.classList.remove('hidden');
    });
  }
});
