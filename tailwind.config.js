/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveLeftRight: {
          '0%, 100%': { transform: 'translateX(0) rotate(48deg)' },
          '50%': { transform: 'translateX(-10px) rotate(48deg)' }, 
        },
      },
      animation: {
        moveLeftRight: 'moveLeftRight 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

