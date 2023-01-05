const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addComponents }) => {
    addComponents({
      '.container': {
        '@apply max-w-full xxl:max-w-screen-xxl lg:mx-auto': {},
      },
      '.container-content': {
        '@apply w-full px-content mx-auto xxl:max-w-screen-xxl': {},
      },
      '.container-content-wide': {
        '@apply container-content px-content-wide': {},
      },
      '.total-line--reduction, .section--payment-method, .order-summary__section--discount': {
        '@apply hidden': {},
      },
      '.order-summary__section~.order-summary__section--discount~.order-summary__section--total-lines': {
        '@apply border-none': {},
      }
    });
  })
