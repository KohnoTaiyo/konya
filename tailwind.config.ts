import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontSize: {
      xLarge: "24px",
      large: "20px",
      small: "10px",
    },
    colors: {
      primary: "#528126",
      secondary: "#59c959",
      white: "#FFFFFF",
      lightGray: "#f3f4f6",
      gray: "#d1d5db",
      red: "#ff0000",
      skyBlue: "#22d3ee",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
