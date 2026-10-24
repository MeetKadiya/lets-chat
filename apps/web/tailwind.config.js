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
        letschat: {
          cream: '#FFF9E9',
          mint: '#E8F2DF',
          green: '#65C93F',
          greenHover: '#5BB937',
          greenDark: '#278344',
          sky: '#8BC9F6',
          ink: '#111111',
          red: '#F35E55',
          dirt: '#87552E',
          dirtDark: '#683F1F',
          yellow: '#F4D03F',
        },
        mingleo: {
          cream: '#FFF9ED',
          mint: '#EAF5D5',
          green: '#65A843',
          greenHover: '#58973A',
          deepGreen: '#316B25',
          charcoal: '#252820',
          sky: '#8CCDF4',
          white: '#FFFFFF',
          sand: '#F4EBD9',
          border: '#252820',
        },
        background: '#E8F2DF',
        surface: {
          50: '#1e293b',
          100: '#161e2e',
          200: '#111726',
          300: '#0B0F17',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        nunito: ['Nunito', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'pixel-sm': '0 2px 0 #111111',
        'pixel-md': '0 4px 0 #111111',
        'pixel-lg': '0 5px 0 #111111',
        'pixel-xl': '0 8px 0 #111111',
      },
    },
  },
  plugins: [],
};
