/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        popIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1.05)', opacity: '1' },
        },
      },
      animation: {
        popIn: 'popIn 200ms ease-out forwards',
      },
    },
  },
  plugins: [],
}

