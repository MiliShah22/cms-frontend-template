import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      colors: {
        bg: "#080a0e",
        surface: "#0f1117",
        card: "#13161f",
        border: "#1e2232",
        border2: "#252b3d",
        gold: "#c9a84c",
        gold2: "#e8c97a",
        muted: "#6b7290",
        muted2: "#8e96b5",
        emerald: "#34d399",
        rose: "#f87171",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #c9a84c, #e8c97a)",
      },
      boxShadow: {
        gold: "0 8px 30px rgba(201,168,76,0.18)",
        card: "0 20px 50px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
