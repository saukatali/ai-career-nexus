/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00D9FF',
          purple: '#B026FF',
          pink: '#FF006B',
          green: '#00FFB9',
          yellow: '#FFD600',
        },
        dark: {
          900: '#0A0A0F',
          800: '#13131A',
          700: '#1C1C26',
          600: '#252533',
          500: '#2E2E40',
        }
      },

      boxShadow: {
        'neon-blue': '0 2px 8px rgba(0, 217, 255, 0.2)',
        'neon-purple': '0 2px 8px rgba(176, 38, 255, 0.2)',
        'neon-pink': '0 2px 8px rgba(255, 0, 107, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        }
      }
    },
  },
  plugins: [],
}
