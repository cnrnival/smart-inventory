import type { Config } from "tailwindcss";
import scrollbarHide from 'tailwind-scrollbar-hide';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6b9dff",
        secondary: "#222222",
        background: "#262626",
        third: "#323232",
        fourth: "#424242",
      },
    },
  },
  plugins: [scrollbarHide],
};

export default config;