const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addVariant, e }) => {
  addVariant('is-active', '&.is-active');
  addVariant('group-is-active', ':merge(.group).is-active &');

  addVariant('is-loading', '&.is-loading');
  addVariant('group-is-loading', ':merge(.group).is-loading &');

  addVariant('is-search', '&.is-search');
  addVariant('group-is-search', ':merge(.group).is-search &');
});
