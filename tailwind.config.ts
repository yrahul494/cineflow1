/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cineFlowRed: "#E59014",
        cineFlowBlack: "#141414"
      }
    }
  },
  plugins: [require("tailwind-scrollbar-hide")]
};

export default config;
