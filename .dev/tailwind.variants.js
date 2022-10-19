const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addVariant, e }) => {
  addVariant("is-active", "&.is-active");
  // addVariant("group-is-active", ({ modifySelectors, separator }) => {
  //   modifySelectors(
  //     ({ className }) =>
  //       `.group.is-active .${e(`group-is-active${separator}${className}`)}`
  //   );
  // });
});
