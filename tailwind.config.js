/** @type {import('tailwindcss').Config} */
import {
  fontFamily as _fontFamily,
  fontSize as _fontSize,
} from 'tailwindcss/defaultTheme';

export const content = [
  './src/app/**/*.{js,ts,jsx,tsx}',
  './src/pages/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
  extend: {
    colors: {
      CustomBlack: '#111618',
      CustomWhite: '#E3E3E3',
      CustomLightBlack: '#262626',
      CustomActive: '#A852FF',
    },
    backgroundImage: {
      gradient: 'linear-gradient(to right, #4B1E7A, #2E47E6)',
    },
    fontFamily: {
      sans: ['var(--font-nunito)', ..._fontFamily.sans],
    },
    fontSize: {
      ..._fontSize,
      base: ['clamp(16px,5vw,20px)', _fontSize.base[1]],
      stationTitle: ['clamp(1.125rem,1.75vw,2.125rem)', _fontSize['2xl'][1]],
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
};
export const plugins = [
  function ({ addVariant }) {
    addVariant('childPath', '& > path');
  },
];
