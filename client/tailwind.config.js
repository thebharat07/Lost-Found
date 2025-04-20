/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#02143d',
        secondary: '#1e40af',
        lightGray: '#f3f4f6',
        darkGray: '#1f2937',
        success: '#16a34a',
        danger: '#dc2626',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        '2xl': '1.5rem',
      },
      transitionDuration: {
        400: '400ms',
      },
      fontSize: {
        xxs: '0.65rem',
      },
    },
  },
  plugins: [],
}
