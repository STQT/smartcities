/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    extend: {
      border: ["last"],
      padding: ["last"]
    }
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      blue: "#4D85CF",
      "blue-pale": "#F0F4FD",
      green: "#4BB34B",
      gray: {
        100: "#F5F6FA",
        200: "#D9DCE5",
        300: "#C7C7C7",
        400: "#858585",
        500: "#333333"
      }
    }
  },

  plugins: []
}
