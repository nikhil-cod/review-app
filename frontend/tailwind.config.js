/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      colors:{
        primary: '#171717',
        secondary:'#272727',
        'dark-subtle':"rgba(255,255,255,0.5)",// 0.5 indicates opacity
        'light-subtle':"rgba(39,39,39,0.5)"
      }
    },
  },
  plugins: [],
}
