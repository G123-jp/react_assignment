/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      whiteish: "#F9FAF4",
      charcoal: "#4A6163",
      lightorange: "#F9A66C",
      mustard: "#FFC94B",
      pomelo: "#F17A7E",
    },
    fontFamily: {
      title: ['"Poppins-Black"', "serif"],
      heading: ["Poppins-Bold", "serif"],
      body1: ["Poppins-Regular", "serif"],
      body2: ["Poppins-Thin", "serif"],
      italic: ["Poppins-LightItalic", "serif"],
      bolditalic: ["Poppins-BoldItalic", "serif"],
    },
    extend: {
      // backgroundImage: {
      //   "foodPicture": "url('.src/assets/foodPhoto.jpg')",
      // },
    },
  },
  plugins: [],
};
