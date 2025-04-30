/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      "md": "1024px",
      "lg": "1240px",
      "xl": "1440px",
      "hd": "1920px"
    },
    extend: {
      colors: {
        primary: '#0da487',
        dark: '#000000',
        gray1: '#f9f9f6',
        black1: '#343a40',
        black2: '#1c2128',
        black3: '#0b141d',
        current: 'currentColor',
        transparent: 'transparent'
      },
    },
  },
  plugins: [],
};

