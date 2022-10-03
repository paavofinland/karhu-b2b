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
    fontSize: {
      'heading-1': [
        '12.5rem',
        {
          lineHeight: '11.25rem',
          letterSpacing: '-0.02em',
        },
      ],
      'heading-2': [
        '6.25rem',
        {
          lineHeight: '5rem',
          letterSpacing: '-0.01em',
        },
      ],
      'heading-3': [
        '3.75rem',
        {
          lineHeight: '3.75rem',
        },
      ],
      'heading-4': [
        '2.25rem',
        {
          lineHeight: '2.5rem',
          letterSpacing: '0.01em',
        },
      ],
      'heading-5': [
        '1.5rem',
        {
          lineHeight: '1.5rem',
          letterSpacing: '0.01em',
        },
      ],
      'heading-6': [
        '1.25rem',
        {
          lineHeight: '1.25rem',
          letterSpacing: '0.01em',
        },
      ],
      'heading-7': [
        '1rem',
        {
          lineHeight: '1.25rem',
          letterSpacing: '0.02em',
        },
      ],
      'body-lg': [
        '1.25rem',
        {
          lineHeight: '1.75rem',
        },
      ],
      body: [
        '1.125rem',
        {
          lineHeight: '1.75rem',
        },
      ],
      'body-sm': [
        '1rem',
        {
          lineHeight: '1.5rem',
        },
      ],
      'body-xs': [
        '0.875rem',
        {
          lineHeight: '1.5rem',
        },
      ],
      detailed: [
        '0.75rem',
        {
          lineHeight: '1rem',
        },
      ],
    },
    screens: {
      '26rem': '416px',
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF',
        'grey-1': '#292929',
        'grey-2': '#5C5C5C',
        'grey-3': '#8F8F8F',
        'grey-4': '#C2C2C2',
        'grey-5': '#DBDBDB',
        'grey-6': '#F6F6F6',
        blue: {
          light: '#008AFF',
          dark: '#196CB2',
        },
        green: {
          light: '#69DE8F',
          dark: '#3FB27C',
        },
        red: {
          light: '#DD3043',
          dark: '#B21928',
        },
        purple: {
          light: '#F05AA1',
          dark: '#B24378',
        },
        pink: '#DDBAB4',
        orange: '#DC8106',
      },
      fontFamily: {
        'GTAmerica-bold': "'GTAmerica-Bold', sans-serif",
        'GTAmerica-medium': "'GTAmerica-Medium', sans-serif",
        'GTAmerica-Compressed-regular': "'GTAmerica-Compressed', sans-serif",
        GTAmerica: "'GTAmerica', sans-serif",
      },
    },
  },
  plugins: [require('./.dev/tailwind.variants')],
};
