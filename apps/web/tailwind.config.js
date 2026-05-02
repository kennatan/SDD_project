/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'figma-blue': '#2f5869',
        'figma-cyan': '#0e7490',
        'figma-error': '#ff4d4f',
        'figma-bg-gray': '#f2f4f7',
        'figma-bg-dark': '#e0e3e6',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
