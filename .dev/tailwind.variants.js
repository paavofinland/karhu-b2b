const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addVariant, e }) => {
  addVariant("is-active", "&.is-active");
  addVariant("is-loading", "&.is-loading");
  addVariant("group-is-loading", ":merge(.group).is-loading &");
  // addVariant("group-is-active", ({ modifySelectors, separator }) => {
  //   modifySelectors(
  //     ({ className }) =>
  //       `.group.is-active .${e(`group-is-active${separator}${className}`)}`
  //   );
  // });
});