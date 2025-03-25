/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        deepBlue: '#2c3481',
        vibrantOrange: '#f57d36',
        lightBeige: '#f8f1e4',
        softOrange: '#f6c07c',
        lightBlue: '#5c74d4',
        darkGray: '#252629',
      },
      fontFamily: {
        'comic-heading': ['Bangers', 'cursive'],
        'comic-body': ['"Red Hat Display"', 'sans-serif'],
      },
      boxShadow: {
        comic: '4px 4px 0px #222',
        'comic-sm': '2px 2px 0px #222',
        'comic-lg': '6px 6px 0px #222',
      },
      borderWidth: {
        comic: '2px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
