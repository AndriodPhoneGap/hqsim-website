/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        /* ---- Brand tokens: 深空硅蓝 ---- */
        ink: {
          950: "#04060d",
          900: "#070b16",
          850: "#0a0f1e",
          800: "#0e1528",
          700: "#141d35",
          600: "#1c2745",
        },
        cyan: {
          400: "#5ee9ff",
          500: "#22d3ee",
          600: "#06b6d4",
        },
        violet: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        mint: {
          400: "#5eead4",
          500: "#2dd4bf",
        },
      },
      fontFamily: {
        sans: [
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Source Han Sans SC"',
          '"Noto Sans SC"',
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"SFMono-Regular"',
          "Menlo",
          "Consolas",
          '"Liberation Mono"',
          "monospace",
        ],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glow: "0 0 40px -12px hsl(var(--cyan-500) / 0.55)",
        "glow-lg": "0 0 90px -20px hsl(var(--cyan-500) / 0.45)",
        card: "0 24px 60px -30px rgb(0 0 0 / 0.85)",
        inset: "inset 0 1px 0 0 rgb(255 255 255 / 0.06)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "grid-drift": {
          from: { backgroundPosition: "0px 0px" },
          to: { backgroundPosition: "60px 60px" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.85" },
        },
        "trace-flow": {
          "0%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "-220" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(1100%)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "grid-drift": "grid-drift 24s linear infinite",
        "pulse-glow": "pulse-glow 3.2s ease-in-out infinite",
        "trace-flow": "trace-flow 4s linear infinite",
        "scan-line": "scan-line 7s linear infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "spin-slow": "spin-slow 26s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
