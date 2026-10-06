/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#2B7FFF',
        black: '#151D20',
        grey: '#F9FAFB',
        white: '#FFFFFF',
        'dark-grey': '#757575',
        'dark-gray': '#757575',
      },
      fontFamily: {
        sans: ['"Funnel Sans"', 'sans-serif'],
        display: ['"Funnel Display"', 'sans-serif'],
        heading: ['"Funnel Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        hero: ['128px', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'token-heading': ['14px', { lineHeight: '1.4', fontWeight: '700' }],
        'token-body': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
        'token-sub-body': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
        'token-code': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      letterSpacing: {
        'tight-3': '-0.03em',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add this line
  ],
}
