/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'md-home': {'min': '951px', 'max': '1510px'},
        'xl-home': {'min': '1511px'}
      },
    },
  },
  plugins: [],
}

