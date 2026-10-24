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
        obsidian: {
          950: '#070A11',
          900: '#0B0F19',
          850: '#0F1626',
          800: '#141C30',
          700: '#1E293B',
        },
        brand: {
          cyan: '#06B6D4',
          cyanHover: '#0891B2',
          indigo: '#6366F1',
          indigoDark: '#4F46E5',
          coral: '#F43F5E',
          emerald: '#10B981',
          glass: 'rgba(16, 23, 38, 0.7)',
          glassBorder: 'rgba(255, 255, 255, 0.08)',
          glassHover: 'rgba(255, 255, 255, 0.12)',
          yellow: '#FFE814',
        },
        background: '#070A11',
        surface: {
          50: '#1E293B',
          100: '#141C30',
          200: '#0F1626',
          300: '#070A11',
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
