/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#060a0f",
          900: "#0a0e14",
          850: "#0d121a",
          800: "#11171f",
          700: "#161d27",
          600: "#1d2632",
          500: "#27323f",
          400: "#3a4757",
        },
        pitch: {
          dark: "#0d3b25",
          mid: "#15613b",
          light: "#1c7a4a",
          stripe: "#0f4530",
          line: "rgba(255,255,255,0.55)",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        accent: {
          DEFAULT: "#22d3ee",
          soft: "#0e7490",
        },
        success: "#34d399",
        warning: "#fbbf24",
        danger: "#f87171",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Bebas Neue'", "Impact", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.4)",
        glow: "0 0 0 1px rgba(251,191,36,0.4), 0 8px 24px -8px rgba(251,191,36,0.35)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out both",
        "scale-in": "scale-in 0.25s ease-out both",
        shimmer: "shimmer 2.2s linear infinite",
      },
    },
  },
  plugins: [],
};
