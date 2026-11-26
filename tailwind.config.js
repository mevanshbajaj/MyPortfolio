/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        surface2: 'rgb(var(--c-surface2) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        'line-strong': 'rgb(var(--c-line-strong) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        heading: 'rgb(var(--c-heading) / <alpha-value>)',
        mute: 'rgb(var(--c-mute) / <alpha-value>)',
        faint: 'rgb(var(--c-faint) / <alpha-value>)',
        danger: 'rgb(var(--c-danger) / <alpha-value>)',
        amber: 'rgb(var(--c-amber) / <alpha-value>)',
        'on-accent': 'rgb(var(--c-on-accent) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          dim: 'rgb(var(--c-accent-dim) / <alpha-value>)',
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
