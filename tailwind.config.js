/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        bg: '#060D1A',
        navy: '#1B2A4A',
        'navy-dark': '#0E1A30',
        orange: '#F7931E',
        'orange-dark': '#D97B0E',
        'orange-light': '#FDB044',
      },
    },
  },
  plugins: [],
}
