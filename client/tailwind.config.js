/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink-custom': '#f8a2b2',
        'purple-custom': '#ec95ff',
        'orange-custom': '#ffa985',
      },
    },
  },
  plugins: [],
}
