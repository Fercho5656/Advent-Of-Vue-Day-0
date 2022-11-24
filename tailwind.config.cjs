/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.vue", "./index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'retro': ['\'Press Start 2P\'', 'serif'],
      }
    },
  },
  plugins: [],
}
