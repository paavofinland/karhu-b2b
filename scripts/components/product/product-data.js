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
      slidesPerView: 3.25,
      watchSlidesProgress: true,
      breakpoints: {
        1024: {
          slidesPerView: Math.max(Math.min(mainSlide.length, 9.5), 5),
        },
      },
    };

    // eslint-disable-next-line no-undef
    const subSwiper = new Swiper(subImageSlider, subSwiperOptions);

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
    };

    // eslint-disable-next-line no-undef, no-new
    new Swiper(mainImageSlider, swiperOptions);
  }

  if (colorSlide.length > 4) {
    // eslint-disable-next-line no-undef, no-unused-vars
    const colorSwiper = new Swiper(colorSlider, {
      slidesPerView: 'auto',
      spaceBetween: 0,
      breakpoints: {
        1024: {
          touchStartForcePreventDefault: true,
          touchMoveStopPropagation: true,
          allowTouchMove: false,
        },
      },
    });

    colorPrev.addEventListener('click', () => {
      colorSwiper.slidePrev();
      if (colorSwiper.activeIndex === 0) {
        colorPrev.classList.remove('lg:block');
      }
      colorNext.classList.add('lg:block');
    });
    colorNext.addEventListener('click', () => {
      colorSwiper.slideNext();
      if (colorSlide.length - colorSwiper.activeIndex === 4) {
        colorNext.classList.remove('lg:block');
      }
      colorPrev.classList.add('lg:block');
    });
    colorNext.classList.add('lg:block');
  }
});
