/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moccasin: '#FFE4B5',
        'moccasin-hover': '#FFD4A5',
      },
      screens: {
        'md-home': {'min': '1100px', 'max': '1510px'},
        'xl-home': {'min': '1511px'}
      },
    },
  },
  plugins: [],
}

