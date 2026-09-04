/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
      },
      colors: {
        bg: '#000000',
        bg2: '#0A0A0A',
        surface: '#131313',
        'surface-2': '#1C1C1C',
        ink: '#F5F7FA',
        'ink-dim': '#89929E',
        accent: '#249DFF',
        'accent-d': '#1476D4',
        'accent-l': '#6EDCFF',
      },
    },
  },
  plugins: [],
}
