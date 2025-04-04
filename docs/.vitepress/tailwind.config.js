module.exports = {
  purge: false,
  content: [
    './docs/**/*.{vue,js,ts,jsx,tsx,md}',
    './.vitepress/**/*.{vue,js,ts,jsx,tsx,md}',
    './.vitepress/theme/**/*.{vue,js,ts,jsx,tsx,md}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} 