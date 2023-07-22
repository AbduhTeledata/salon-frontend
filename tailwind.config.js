/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        print: {raw: 'print'},
        screen: {raw: 'screen'},
      },
      fontFamily: {
        Opensans: ['OpenSans'],
        Lato: ['Lato'],
        Roboto: ['Roboto'],
        // mono: ['monospace'],
        merchant: ['merchant'],
      },
      fontSize: {
        xs: '0.62rem',
        sm: '0.875rem',
        base: '1rem',
        xl: '1.10rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
