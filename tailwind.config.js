/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: v('canvas'),
        surface: v('surface'),
        ink: v('ink'),
        ink2: v('ink2'),
        line: 'var(--line)',
        signal: v('signal'),
        warn: v('warn'),
        fault: v('fault'),
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
};
