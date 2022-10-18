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
    });
  })
