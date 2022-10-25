const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addVariant, e }) => {
  addVariant("is-active", "&.is-active");
  addVariant("is-slide-active", "&.swiper-slide-thumb-active");
  addVariant("slide", "&.swiper-slide");
  addVariant("swiper", "&.swiper");
  addVariant("group-is-open", ".group.open > &");
  // addVariant("group-is-active", ({ modifySelectors, separator }) => {
  //   modifySelectors(
  //     ({ className }) =>
  //       `.group.is-active .${e(`group-is-active${separator}${className}`)}`
  //   );
  // });
});