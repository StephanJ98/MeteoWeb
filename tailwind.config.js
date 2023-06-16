/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        clouds: {
          '0%, 100%': { transform: 'translateX(15px)' },
          '50%': { transform: 'translateX(0px)' }
        },
        sunshines: {
          '0%': {
            transform: 'scale(1)',
            opacity: '0.6'
          },
          '100%': {
            transform: 'scale(1.4)',
            opacity: '0'
          }
        }
      },
      animation: {
        clouds: 'clouds 8s ease-in-out infinite',
        clouds2: 'clouds 12s ease-in-out infinite',
        sunshines: 'sunshines 2s infinite'
      }
    },
  },
  plugins: [],
}
