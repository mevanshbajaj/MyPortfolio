/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#08090b',
        surface: '#0d0f12',
        surface2: '#12151a',
        line: '#1c2026',
        'line-strong': '#2b323b',
        ink: '#e9ecef',
        mute: '#a1a9b3',
        faint: '#7d8793',
        accent: {
          DEFAULT: '#3ddc97',
          dim: '#2aa874',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
