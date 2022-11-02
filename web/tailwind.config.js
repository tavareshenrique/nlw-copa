/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },

      colors: {
        gray: {
          900: '#121214',
        },
      },
    },
  },
  plugins: [],
};
