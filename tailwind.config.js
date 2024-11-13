/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    //prettier-ignore
    screens: {
      "mobile": "350px",
      "tablet": "801px",
      "laptop": "1280px",
      "1440": "1440px",
      "full": "1920px",
      "2k": "2560px",
      "4k": "4096px",
    },
    extend: {},
  },
  plugins: [],
};
