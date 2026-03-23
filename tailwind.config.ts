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
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        bg: "#f1f5f9",
        surface: "#ffffff",
        card: "#ffffff",
        border: "#e2e8f0",
        border2: "#cbd5e1",
        sidebar: "#1e293b",
        primary: "#6366f1",
        primary2: "#818cf8",
        gold: "#f59e0b",
        emerald: "#10b981",
        rose: "#ef4444",
        muted: "#64748b",
        muted2: "#94a3b8",
        text2: "#334155",
        amber: "#fbbf24",
        amber2: "#f59e0b",
        amber8: "#1f2937",
        amberFg: "#92400e",
      },
    },
  },
  plugins: [],
};
export default config;
