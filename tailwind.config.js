/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      colors: {
        border: "hsl(214 32% 91%)",
        background: "hsl(210 40% 98%)",
        foreground: "hsl(222 47% 11%)",
        primary: {
          DEFAULT: "hsl(199 89% 48%)",
          foreground: "hsl(0 0% 100%)",
        },
      },
    },
  },
  plugins: [],
};
