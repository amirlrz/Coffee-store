/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/swiper/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    
    extend: {
      colors: {
        lightorange: "#fe8a00",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        productOpen: {
          '0%': { transform: 'scale(0.5) rotateX(-90deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotateX(0deg)', opacity: '1' },
        },
        macbookOpen: {
          '0%': { transform: 'scale(0.5) rotateX(-90deg)', opacity: '0' },
          '50%': { transform: 'scale(1.1) rotateX(0deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotateX(0deg)', opacity: '1' },
        },
      },
      animation: {
        macbookOpen: 'macbookOpen 0.9s ease forwards',
        productOpen: 'macbookOpen 0.6s ease forwards',
      },
    },
  },
  plugins: [],
};
