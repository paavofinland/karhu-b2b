/* eslint-disable global-require */
module.exports = {
  content: [
    './templates/*.liquid',
    './templates/customers/*.liquid',
    './sections/**/*.liquid',
    './snippets/**/*.liquid',
    './layout/**/*.liquid',
    './styles/**/*.css',
    './scripts/**/*.js',
  ],
  theme: {
    screens: {
      '26rem': '416px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        primary: '#D6981E',
        second: '#663B89',
        alert: '#CC0000',
      },
      fontFamily: {
        circular: "'Circular', sans-serif",
      },
    },
  },
  plugins: [require('./.dev/tailwind.variants')],
};
