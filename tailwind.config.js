/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        CustomPurple: '#D1D9FF',
        CustomActivePurple: '#BA78FC',
        CustomVeryPurple: '#482284',
        CustomLightPurple: '#B6C3FF',

        CustomWhite: '#F2F4FF',
        CustomBlack: '#100F0F',
        // CustomBlack: '#040404',
        // Custom
        CustomBackgroundBlack: '#262626',
        CustomLightGrey: '#6C6C6C',
        CustomTextGrey: '#9A9A9A',
      },
      backgroundImage: {
        gradient: 'linear-gradient(to right, #4B1E7A, #2E47E6)',
      },
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        marqueetext: {
          '0%,100%': {
            transform: 'translateX(10%)',
          },
          '50%': {
            transform: 'translateX(-100%)',
          },
        },
      },
      animation: {
        marqueetext: 'marqueetext 10s linear infinite',
      },
      boxShadow: {
        active: '7px 5px 5px 1px #BA78FC',
      },
    },
  },
  plugins: [],
};
