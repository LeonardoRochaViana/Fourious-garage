import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        garage: {
          black: "#050505",
          panel: "#111111",
          muted: "#1a1a1a",
          red: "#dc2626",
          darkRed: "#991b1b",
          line: "#262626",
          text: "#a3a3a3"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial", "sans-serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"]
      },
      boxShadow: {
        redGlow: "0 0 30px rgba(220, 38, 38, 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
