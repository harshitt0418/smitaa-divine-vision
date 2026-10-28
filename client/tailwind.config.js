/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#05070E',
          900: '#080B16',
          850: '#0E1324',
          800: '#141B33',
          750: '#1A2342',
          700: '#232E54',
          600: '#324273',
          border: 'rgba(212, 175, 55, 0.15)',
          'border-subtle': 'rgba(255, 255, 255, 0.08)',
        },
        gold: {
          50: '#FBF8EE',
          100: '#F6EFCB',
          200: '#EDE097',
          300: '#E4CF63',
          400: '#DCBF3C',
          500: '#D4AF37', // primary gold
          600: '#B89425',
          700: '#947318',
          800: '#735715',
          900: '#533D10',
        },
        ivory: {
          light: '#FFFDF9',
          DEFAULT: '#F7F4EC',
          soft: '#E8E3D5',
          muted: '#A9A495',
          faint: '#736F64',
        },
        celestial: {
          cyan: '#60C0F0',
          violet: '#9D7CF2',
          glow: 'rgba(212, 175, 55, 0.18)',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -3px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 50px -5px rgba(212, 175, 55, 0.35)',
        'celestial': '0 10px 40px -10px rgba(10, 15, 35, 0.8), 0 0 20px -2px rgba(212, 175, 55, 0.12)',
        'card': '0 8px 30px rgba(3, 5, 12, 0.6)',
      },
      backgroundImage: {
        'radial-radial': 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.12) 0%, transparent 60%)',
        'subtle-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'spin-very-slow': 'spin 60s linear infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
