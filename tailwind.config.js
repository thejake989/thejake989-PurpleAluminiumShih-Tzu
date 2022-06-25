/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.handlebars"],
  theme: {
    extend: {
      fontFamily: {
        "google-fonts": ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
