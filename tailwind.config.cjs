/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

const customColors = {
  primary: {
    DEFAULT: '#8004EE',
    50: '#EBD5FF',
    100: '#D6A9FE',
    200: '#BC73FD',
    300: '#A644FC',
    400: '#921BFB',
    500: '#8004EE',
    600: '#6E03CD',
    700: '#5F03B0',
    800: '#520397',
    900: '#470382',
  },
  secondary: {
    DEFAULT: '#130364',
    50: '#2403C1',
    100: '#2003A9',
    200: '#1C0394',
    300: '#190382',
    400: '#160372',
    500: '#130364',
    600: '#100356',
    700: '#0E034A',
    800: '#0C0340',
    900: '#0A0337',
  },
  tertiary: {
    DEFAULT: '#D65CEF',
    50: '#FAE9FD',
    100: '#F2C8FA',
    200: '#EAAAF7',
    300: '#E38EF4',
    400: '#DC74F1',
    500: '#D65CEF',
    600: '#D044ED',
    700: '#CA2EEB',
    800: '#C519E9',
    900: '#B715D9',
  },
}

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        ...customColors,
      },
      fontFamily: {
        'harabara-mais-demo': '"Harabara Mais Demo"',
        'avant-gard-ef-book': 'AvantGardEF-Book',
        'itc-avant-garde-gothic-demi': 'ITC Avant Garde Gothic Demi',
      },
      backgroundImage: {
        pattern: 'url("/src/assets/images/bg-pattern.png")',
      },
      backgroundSize: {
        sm: '10rem',
        md: '15rem',
        lg: '20rem',
        xl: '20rem',
        '2xl': '30rem',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
