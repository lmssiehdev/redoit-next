/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        indieFlower: ['var(--font-indie-flower)'],
        andalusia: ['var(--font-andalusia)'],
      },
      colors: {
        'azalea': {  DEFAULT: '#FAD4D3',  50: '#FEF6F5',  100: '#FDEFEE',  200: '#FCE1E1',  300: '#FAD4D3',  400: '#F4A3A1',  500: '#EF726E',  600: '#E9403C',  700: '#D41D18',  800: '#A21612',  900: '#700F0D'},
      },

    },
  },
  plugins: [],
}
