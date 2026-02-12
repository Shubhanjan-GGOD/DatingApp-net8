/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // daisyui: {
  //   themes: [],   // force light theme
  //   base: false          // stop dark background
  // }

}
