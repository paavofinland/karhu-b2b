(()=>{"use strict";function e(e=document.body,s){const i=[...e.querySelectorAll(s?`[class*="${s}"]`:"*")],n=s?"classList":"dataset";return i.reduce(((e,i)=>([].slice.call(s?i[n]:Object.entries(i[n])).forEach((n=>{let t;s&&n.slice(0,s.length)===s?t=n.slice(s.length,n.length):s||([t]=n),t&&(e[t]=e.hasOwnProperty(t)?e[t].constructor===Array?e[t].concat(i):[e[t],i]:i)})),e)),{})}const s=e=>new Promise((s=>{window?.hasLoaded?.scripts?.[e]?s():window.app.on(`${e}:loaded`,s)})),i={productImages:window.component((async i=>{const{slider:n,thumbnailSlider:t,prev:o,next:l}=e(i),{slides:r}=i.dataset;if(!n)return;await s("Swiper");const a={slidesPerView:3.25,watchSlidesProgress:!0,breakpoints:{1024:{slidesPerView:Math.max(Math.min(Number(r),9.5),5)}},on:{beforeInit(e){e.$el.removeClass("is-loading")}}},d=new Swiper(t,a);new Swiper(n,{resizeObserver:!0,thumbs:{swiper:d,multipleActiveThumbs:!1,slideThumbActiveClass:"is-active"},navigation:{nextEl:l,prevEl:o},on:{beforeInit(e){e.$el.removeClass("is-loading")}}})})),productColors:window.component((async i=>{const{slider:n,slide:t,prev:o,next:l}=e(i),r=[].concat(t).length;await s("Swiper"),r>3&&new Swiper(n,{slidesPerView:3.5,spaceBetween:4,on:{beforeInit(e){e.$el.removeClass("is-loading")},navigationNext(e){(e.slides.length-1)/2<=4&&e.slideTo(e.slides.length-1)},navigationPrev(e){(e.slides.length-1)/2<=4&&e.slideTo(0)}},breakpoints:{768:{slidesPerView:5.5},1024:{slidesPerView:4,navigation:{nextEl:l,prevEl:o}}}})}))};window.app.add(i),window.app.mount()})();