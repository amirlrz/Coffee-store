/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/swiper/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
    },

    extend: {
      colors: {
        specialRed: "#b90000",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        productOpen: {
          "0%": { transform: "scale(0.5) rotateX(-90deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotateX(0deg)", opacity: "1" },
        },
        macbookOpen: {
          "0%": { transform: "scale(0.5) rotateX(-90deg)", opacity: "0" },
          "50%": { transform: "scale(1.1) rotateX(0deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotateX(0deg)", opacity: "1" },
        },

        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        macbookOpen: "macbookOpen 0.9s ease forwards",
        productOpen: "macbookOpen 0.6s ease forwards",
        "slide-in-right": "slideInRight 0.4s ease-in-out",
        "slide-out-right": "slideOutRight 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
