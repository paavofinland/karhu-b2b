const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addVariant, e }) => {
  addVariant('is-active', '&.is-active');
  addVariant('group-is-active', ':merge(.group).is-active &');

  addVariant('is-loading', '&.is-loading');
  addVariant('group-is-loading', ':merge(.group).is-loading &');

  addVariant('filters_opened', '&.filters_opened');
  addVariant('group-filters_opened', ':merge(.group).filters_opened &');
});
