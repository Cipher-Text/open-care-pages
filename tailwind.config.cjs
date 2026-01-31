/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,md,mdx,ts}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        ink: "#121212",
        mist: "#f6f4f0",
        sun: "#ffb454",
        moss: "#2f6f5b"
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
