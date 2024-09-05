/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        mullish: ["Mulish: sans-serif"],
        //here you can also be improtant your color
        // here you can imrprot your fonts
      },
    },
  },
  plugins: [require("daisyui")],
};
