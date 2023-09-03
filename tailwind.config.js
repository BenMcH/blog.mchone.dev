module.exports = {
  content: ["./src/**/*.{md,html,liquid,njk}"],
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography')
  ]
};
