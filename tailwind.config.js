/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './docs/.vitepress/**/*.{js,ts,vue}',
    './docs/**/*.{js,ts,vue,md}'
  ],
  darkMode: 'selector',
  theme: {
    extend: {}
  },
  plugins: []
}
