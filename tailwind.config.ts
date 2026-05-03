import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        panel: "0 18px 70px rgba(0, 0, 0, 0.22)",
        lift: "0 18px 42px rgba(0, 0, 0, 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
