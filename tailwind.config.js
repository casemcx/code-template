/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,.vue}',
  ],
  theme: {
    screens: {
      '2xl': { min: '1535px' },
      xl: { max: '1535px', min: '1023px' },
      lg: { min: '767px', max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
    },
    extend: {
      width: {
        1920: '1920px',
      },
      height: {
        1080: '1080px',
      },
      screens: {
        mobile: { max: '960px' },
      },
      spacing: {
        13: '3.25rem',
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        circular: '50%',
      },
      borderWidth: {
        DEFAULT: '1px',
      },
      colors: {
        grey: 'rgba(219, 219, 219, 1)',
        theme: '#7165F4',
        'theme-weaken': '#d9d7f6',
        'padding-theme': 'rgb(241 245 249)',
      },
      padding: {
        1.5: '6px',
      },
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
    },
  },
  plugins: [],
};
