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
        bg: '#070A0F',
        bg2: '#0D1117',
        surface: '#111720',
        'surface-2': '#161D28',
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
