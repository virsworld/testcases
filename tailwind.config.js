/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        'primary-dark': "#153E75",
        'accent-light': "#FF9B91",
        accent: "#f88379",
        secondary: "#FDFFFE",
      }
    },
  },
  plugins: [],
}

