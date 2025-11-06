/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#128C7E',
        secondary: '#25D366',
        'primary-dark': '#075E54',
      }
    },
  },
  plugins: [],
}