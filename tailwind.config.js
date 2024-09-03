const { addIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [addIconSelectors(['mdi']), require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['light', 'business'],
  },
};
