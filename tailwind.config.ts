import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        rooh: {
          deep: "var(--color-rooh-deep, #354936)",
          forest: "var(--color-rooh-forest, #203A2B)",
          soft: "var(--color-rooh-soft, #78866B)",
          sage: "var(--color-rooh-sage, #A6B39A)",
          cream: "var(--color-rooh-cream, #F6F1E7)",
          ivory: "var(--color-rooh-ivory, #FFFDF7)",
          gold: "var(--color-rooh-gold, #C9A96E)",
          charcoal: "var(--color-rooh-charcoal, #30332D)",
        },
        primary: {
          DEFAULT: "var(--color-primary, #354936)",
          hover: "var(--color-primary-hover, #203A2B)",
          light: "var(--color-primary-light, #78866B)",
          foreground: "var(--color-primary-fg, #FFFDF7)",
        },
        accent: {
          DEFAULT: "var(--color-accent, #C9A96E)",
          hover: "var(--color-accent-hover, #B39255)",
          foreground: "var(--color-accent-fg, #203A2B)",
        },
        background: "var(--color-bg, #FFFDF7)",
        surface: "var(--color-surface, #F6F1E7)",
        card: "var(--color-card, #FFFFFF)",
        border: "var(--color-border, #E2DAD0)",
        text: {
          main: "var(--color-text, #30332D)",
          muted: "var(--color-text-muted, #6A7265)",
        },
      },
      fontFamily: {
        sans: ["var(--font-body, system-ui)", "sans-serif"],
        heading: ["var(--font-heading, serif)"],
        arabic: ["Cairo", "Tajawal", "sans-serif"],
        english: ["Inter", "Playfair Display", "sans-serif"],
      },
      borderRadius: {
        theme: "var(--border-radius, 0.75rem)",
      },
    },
  },
  plugins: [],
};
export default config;

