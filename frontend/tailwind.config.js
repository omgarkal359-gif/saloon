/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          light: '#2C2C2C',
          DEFAULT: '#1A1A1A',
          dark: '#121212',
          card: '#222222',
        },
        cream: {
          light: '#FFFFFF',
          DEFAULT: '#FDFBF7',
          dark: '#ECEAE4',
          muted: '#A8A29E',
        },
        gold: {
          light: '#E5C05E',
          DEFAULT: '#D4AF37',
          dark: '#B89025',
          glow: 'rgba(212, 175, 55, 0.15)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Outfit"', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
