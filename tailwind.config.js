/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#15181C",
        panel: "#1B1F23",
        "panel-alt": "#20262C",
        border: "#2A3038",
        "border-soft": "#22282F",
        input: "#15181C",
        "input-border": "#333B45",
        ink: "#EDEDED",
        "ink-strong": "#F5F1E8",
        muted: "#8B94A0",
        faint: "#5A6270",
        amber: "#E8A33D",
        teal: "#4FD1C5",
        terracotta: "#EF7A6B",
      },
      fontFamily: {
        display: ["Rajdhani", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
