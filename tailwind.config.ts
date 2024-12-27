import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        custom: {
          // Main yellow shades
          yellow: {
            50: "#fff9e6",
            100: "#fff3cc",
            200: "#ffe799",
            300: "#ffdb66",
            400: "#ffcf33",
            500: "#ffc300", // Primary yellow
            600: "#cc9c00",
            700: "#997500",
            800: "#664d00",
            900: "#332600",
          },
          // Dark backgrounds
          dark: {
            50: "#f7f7f7",
            100: "#e3e3e3",
            200: "#c8c8c8",
            300: "#a4a4a4",
            400: "#818181",
            500: "#666666",
            600: "#515151",
            700: "#434343",
            800: "#383838", // Main background
            900: "#121212", // Darker background
          },
          // Neutral grays
          neutral: {
            50: "#f8f8f8",
            100: "#f0f0f0",
            200: "#e4e4e4",
            300: "#d1d1d1",
            400: "#b4b4b4",
            500: "#9a9a9a",
            600: "#818181",
            700: "#6a6a6a",
            800: "#5a5a5a",
            900: "#4a4a4a",
          },
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
