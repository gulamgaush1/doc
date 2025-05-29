/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7fa',
          100: '#cceff6',
          200: '#99dfed',
          300: '#66cfe3',
          400: '#33bfda',
          500: '#0891b2',
          600: '#06748e',
          700: '#05576b',
          800: '#033a47',
          900: '#021d24',
        },
        secondary: {
          50: '#e6faf9',
          100: '#ccf5f2',
          200: '#99ebe6',
          300: '#66e0d9',
          400: '#33d6cd',
          500: '#14b8a6',
          600: '#109385',
          700: '#0c6e64',
          800: '#084a42',
          900: '#042521',
        },
        accent: {
          50: '#e9f9ee',
          100: '#d3f4dd',
          200: '#a8e9bb',
          300: '#7cde99',
          400: '#51d377',
          500: '#22c55e',
          600: '#1b9e4b',
          700: '#147638',
          800: '#0e4f25',
          900: '#072713',
        },
        error: {
          50: '#fdecec',
          100: '#fcd9d9',
          200: '#f9b3b3',
          300: '#f58d8d',
          400: '#f26666',
          500: '#ef4444',
          600: '#bf3636',
          700: '#8f2929',
          800: '#601c1c',
          900: '#300e0e',
        },
        warning: {
          50: '#fef5e7',
          100: '#fdebd0',
          200: '#fcd7a1',
          300: '#fac272',
          400: '#f9ae43',
          500: '#f59e0b',
          600: '#c47e09',
          700: '#935f06',
          800: '#623f04',
          900: '#312002',
        },
        neutral: {
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
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'pulse-subtle': 'pulseSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}