/* eslint-disable global-require */

/** @type {import('tailwindcss').Config} */
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
  corePlugins: {
    container: false,
  },
  theme: {
    fontSize: {
      'heading-1': [
        '12.5rem',
        {
          lineHeight: '11.25rem',
          letterSpacing: '-0.02em',
          fontWeight: '700',
        },
      ],
      'heading-2': [
        '6.25rem',
        {
          lineHeight: '5rem',
          letterSpacing: '-0.01em',
          fontWeight: '700',
        },
      ],
      'heading-3': [
        '3.75rem',
        {
          lineHeight: '3.75rem',
          fontWeight: '700',
        },
      ],
      'heading-4': [
        '2.25rem',
        {
          lineHeight: '2.5rem',
          letterSpacing: '0.01em',
          fontWeight: '700',
        },
      ],
      'heading-5': [
        '1.5rem',
        {
          lineHeight: '1.5rem',
          letterSpacing: '0.01em',
          fontWeight: '700',
        },
      ],
      'heading-6': [
        '1.25rem',
        {
          lineHeight: '1.25rem',
          letterSpacing: '0.01em',
          fontWeight: '700',
        },
      ],
      'heading-7': [
        '1rem',
        {
          lineHeight: '1.25rem',
          letterSpacing: '0.02em',
          fontWeight: '500',
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
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '2560px',
    },
    extend: {
      spacing: {
        content: 'var(--content-padding)',
        'content-wide': 'var(--content-padding-wide)',
      },
      colors: {
        black: '#000000',
        white: '#FFFFFF',
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
        headings: ['GTAmericaCompressed', 'sans-serif'],
        body: ['GTAmerica', 'sans-serif'],
      },
    },
  },
  plugins: [require('./.dev/tailwind.variants'), require('./.dev/tailwind.containers')],
};
