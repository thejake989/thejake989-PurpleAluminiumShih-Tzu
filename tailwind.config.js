/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.pug"],
  theme: {
    extend: {
      fontFamily: {
        "google-fonts": ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
