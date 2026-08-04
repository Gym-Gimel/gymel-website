import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#b71313",
          dark: "#7f0e0e",
          soft: "#fff1f1"
        },
        ink: "#19202a",
        meadow: "#1f7a5a",
        gold: "#d99a2b"
      },
      boxShadow: {
        soft: "0 14px 40px rgba(25, 32, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
