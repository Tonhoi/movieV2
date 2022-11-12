/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  variants: {
    textColor: ["group-hover", "group-focus"],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
