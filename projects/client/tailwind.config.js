/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      chivo: ["Chivo", "sans-serif"],
      lora: ["Lora", "serif"],
      maitree: ["Maitree", "serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      darkgreen: "#013820",
      lightgreen: "#ABE090",
      jetblack: "#302C2C",
      babypowder: "#FDFFF7",
      flashwhite: "#EBEBEB",
      redd: "#C91A3D",
      bluee: "#1A3DC9",
      greenn: "#3DC91A",
    },
    fontSize: {
      xxs: "0.5rem",
      xs: "0.75rem",
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  plugins: [require("flowbite/plugin")],
};
