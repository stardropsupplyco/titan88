export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#1C1C1E',
        steel: '#2A2A2E',
        slate: '#3A3A3F',
        orange: '#E8722C',
        'orange-light': '#FF8A47',
        concrete: '#8A8A92',
        border: '#3A3A3F',
        bright: '#F5F5F5',
        muted: '#7A7A82',
        success: '#4A9B6F',
        danger: '#D9534F',
        warning: '#E8B84B',
      },
      fontFamily: {
        display: ['Archivo Black', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
