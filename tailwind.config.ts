import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cb-blue':     '#0052FF',
        'cb-gold':     '#C9A84C',
        'surface':     '#1e2025',
        'bg-primary':  '#0a0b0d',
        'bg-secondary':'#14161a',
        'text-muted':  '#8a919e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
