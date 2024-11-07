import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["DM Sans", "sans-serif"],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: {
          100: "#D5CCFF",
          700: "#2B1887",
        },
        red: {
          700: "#E42C5F",
        },
        yellow: {
          700: "#ECB800",
        },
        gray: {
          100: "#D9D9D9",
        },
      },
    },
  },
  plugins: [],
};
export default config;
