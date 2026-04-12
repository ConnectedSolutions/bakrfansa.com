import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Bakr Fansa
        'bf-white': '#FFFFFF',
        'bf-linen': '#F8F7F4',
        'bf-ink': '#1A1A1A',
        'bf-stone': '#6B6B6B',
        'bf-gold': '#C8A882',
        'bf-border': '#E8E4DC',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'Inter', 'sans-serif'],
      },
      fontSize: {
        base: ['16px', { lineHeight: '1.7' }],
      },
      spacing: {
        section: '80px',
      },
      transitionTimingFunction: {
        gallery: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
