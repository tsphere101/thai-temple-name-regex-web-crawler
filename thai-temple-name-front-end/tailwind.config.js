const { colors } = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1360px',
      },
    },
    extend: {
      colors: {
        ...colors,
        'bronze': {
          'a' : "#A13501",  
          'b' : "rgba(208, 83, 2, 0.9)",
          'c' : "rgba(208, 83, 2, 0.5)"
        },
        'light-gold': "rgba(255, 209, 68, 1)",
        'dark-gray' : {
          'a' : 'rgba(32, 32, 32, 1)',
          'b' : 'rgba(32, 32, 32, 0.9)',
        }
      }
    },
  },
  plugins: [
  ],
}