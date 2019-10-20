module.exports = {
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [
    require("tailwindcss/lib/plugins/container")({
      center: true,
      padding: true
    })
  ]
}
