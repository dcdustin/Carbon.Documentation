/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './docs/**/*.{js,ts,vue,md}',
    './docs/.vitepress/**/*.{js,ts,vue,md}',

    '!./docs/.vitepress/cache',
    '!./docs/.vitepress/dist',
  ],
  darkMode: 'selector',
  theme: {
    extend: {},
  },
  plugins: [],
}
