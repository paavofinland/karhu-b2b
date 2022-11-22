const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addVariant, e }) => {
  addVariant('is-active', '&.is-active');
  addVariant('group-is-active', ':merge(.group).is-active &');

  addVariant('is-loading', '&.is-loading');
  addVariant('group-is-loading', ':merge(.group).is-loading &');

  addVariant('aria-invalid', `[aria-invalid="true"]&`);
  addVariant(`peer-aria-invalid`, `:merge(.peer)[aria-invalid="true"] ~ &`);
  addVariant(`group-aria-invalid`, `:merge(.group)[aria-invalid="true"] &`);
});
