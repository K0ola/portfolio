const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  safelist: ['bg-bg', 'text-text'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
      }
    }
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        'body': {
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
        }
      });
    })
  ]
}
