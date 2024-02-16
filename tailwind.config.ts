import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1530px",
    },
    colors: {
      foreground: "#dfdfdf",
      white: "#fff",
      black: "#000",
      background: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#323232",
        700: "#292929",
        800: "#202020",
        900: "#171717",
        950: "#0a0a0a",
      },
      green: {
        50: "#eefbf3",
        100: "#d6f5e1",
        200: "#b1e9c8",
        300: "#7dd8a8",
        400: "#48bf84",
        500: "#25a469",
        600: "#178454",
        700: "#136946",
        800: "#115438",
        900: "#0f4530",
        950: "#07271b",
      },
      blue: {
        50: "#eaffff",
        100: "#caffff",
        200: "#9bfcff",
        300: "#57f6ff",
        400: "#0be7ff",
        500: "#00c9eb",
        600: "#00a0c5",
        700: "#007e9e",
        800: "#0a6680",
        900: "#0b4458",
        950: "#01374b",
      },

      "dark-blue": {
        50: "#f4f7fb",
        100: "#e9eef5",
        200: "#cddcea",
        300: "#a2bed7",
        400: "#709bc0",
        500: "#4d7ea8",
        600: "#3b658e",
        700: "#315273",
        800: "#2c4660",
        900: "#283c52",
        950: "#1b2736",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    styled: true,
    base: false,
  }
};
export default config;
