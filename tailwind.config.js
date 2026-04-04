/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sf': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Segoe UI', 'Roboto', 'sans-serif'],
        'system': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        'macos-blue': '#007AFF',
        'macos-red': '#FF3B30',
        'macos-yellow': '#FFCC00',
        'macos-green': '#34C759',
        'macos-gray': '#8E8E93',
        'macos-bg': '#F2F2F7',
        'macos-sidebar': '#E5E5EA',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'dock-bounce': 'dock-bounce 0.6s ease-in-out',
        'window-open': 'window-open 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
      },
      keyframes: {
        'dock-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'window-open': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}