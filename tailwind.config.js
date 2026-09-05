/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        legal: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#070B14',
          canvas: '#070B14',
          surface: '#0D1320',
          'surface-elevated': '#121A29',
          'surface-border': 'rgba(255, 255, 255, 0.08)',
          'surface-border-subtle': 'rgba(255, 255, 255, 0.04)',
          'surface-border-gold': 'rgba(217, 164, 65, 0.35)',
        },
        gold: {
          50: '#fbf8ea',
          100: '#f6eecc',
          200: '#eed99a',
          300: '#f2c15c',
          400: '#d9a441',
          500: '#c58b20',
          600: '#a76a17',
          700: '#844c15',
          800: '#6f3e18',
          900: '#5e3418',
          950: '#371a09',
          primary: '#D9A441',
          hover: '#F2C15C',
          subtle: 'rgba(217, 164, 65, 0.12)',
        },
        navy: {
          800: '#0D1B2A',
          850: '#0B1528',
          900: '#070D1B',
          950: '#070B14',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Merriweather', 'Georgia', 'Cambria', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'legal': '0 4px 20px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'legal-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.2)',
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
