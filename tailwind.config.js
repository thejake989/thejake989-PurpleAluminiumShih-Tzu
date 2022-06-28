/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.handlebars"],
  theme: {
    extend: {
      fontFamily: {
        "google-fonts": ["Lato", "sans-serif"],
      },
      gridTemplateRows: {
        layout: "auto 1fr auto",
      },
    },
  },
  plugins: [],
};
