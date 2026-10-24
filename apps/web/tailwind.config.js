/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#582BF7',
          purpleDark: '#471FE0',
          purpleDeep: '#3712BE',
          card: '#6F47FC',
          cardLight: '#7D57FC',
          yellow: '#FFE814',
          yellowHover: '#F5DC00',
          dark: '#161426',
          darkCard: '#1E1B33',
          darkBorder: '#2E2A4A',
          darkHover: '#292544',
        },
        background: '#582BF7',
        surface: {
          50: '#1e293b',
          100: '#161e2e',
          200: '#111726',
          300: '#0B0F17',
        },
        primary: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          active: '#1D4ED8',
        },
        accent: {
          cyan: '#06B6D4',
          emerald: '#10B981',
          rose: '#F43F5E',
          amber: '#F59E0B',
        },
      },
    },
  },
  plugins: [],
};
