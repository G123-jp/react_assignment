/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      chocolateBrown: "#A44D08",
      darkBrown: "#342006",
      nude: "#F3DED9",
      mustard: "#DEA02C",
      caramel: "#DBB688"
    },
    fontFamily: {
      title: ['"Poppins-Black"', 'serif'],
      heading: ['Poppins-Bold', 'serif'],
      body1: ['Poppins-Regular', 'serif'],
      body2: ['Poppins-Thin', 'serif'],
      italic: ['Poppins-LightItalic', 'serif'],
      bolditalic: ['Poppins-BoldItalic', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}
