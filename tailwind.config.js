/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          accent: {
            100: 'var(--color-accent-100)',
            300: 'var(--color-accent-300)',
            500: 'var(--color-accent-500)',
            700: 'var(--color-accent-700)',
            900: 'var(--color-accent-900)',
          },
        },
        success: {
          100: 'var(--color-success-100)',
          300: 'var(--color-success-300)',
          500: 'var(--color-success-500)',
          700: 'var(--color-success-700)',
          900: 'var(--color-success-900)',
        },
        danger: {
          100: 'var(--color-danger-100)',
          300: 'var(--color-danger-300)',
          500: 'var(--color-danger-500)',
          700: 'var(--color-danger-700)',
          900: 'var(--color-danger-900)',
        },
        warning: {
          100: 'var(--color-warning-100)',
          300: 'var(--color-warning-300)',
          500: 'var(--color-warning-500)',
          700: 'var(--color-warning-700)',
          900: 'var(--color-warning-900)',
        },
        dark: {
          100: 'var(--color-dark-100)',
          300: 'var(--color-dark-300)',
          500: 'var(--color-dark-500)',
          600: 'var(--color-dark-600)',
          700: 'var(--color-dark-700)',
          900: 'var(--color-dark-900)',
        },
        light: {
          100: 'var(--color-light-100)',
          300: 'var(--color-light-300)',
          500: 'var(--color-light-500)',
          700: 'var(--color-light-700)',
          900: 'var(--color-light-900)',
        },
      },
    },
  },
  plugins: [],
}
