import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        frame: {
          black: '#050505',
          dark: '#0A0A0A',
          charcoal: '#141414',
          steel: '#1E1E1E',
          smoke: '#777777',
          silver: '#999999',
          white: '#F0F0F0',
          cream: '#E8E4DC',
        },
        accent: {
          gold: '#B8952F',
          'gold-light': '#D4B156',
          coral: '#E85D4A',
          electric: '#5B5FE6',
          mint: '#2FBF7B',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-hero': ['clamp(3rem, 10vw, 7rem)', { lineHeight: '0.88', letterSpacing: '-0.05em', fontWeight: '700' }],
        'display-xl': ['clamp(2.5rem, 8vw, 5rem)', { lineHeight: '0.9', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-lg': ['clamp(2rem, 6vw, 3.5rem)', { lineHeight: '0.92', letterSpacing: '-0.035em', fontWeight: '600' }],
        'display-md': ['clamp(1.5rem, 4vw, 2.25rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-sm': ['clamp(1.125rem, 3vw, 1.5rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '500' }],
        'label-lg': ['0.8125rem', { lineHeight: '1', letterSpacing: '0.12em', fontWeight: '500' }],
        'label-sm': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.15em', fontWeight: '500' }],
        'label-xs': ['0.5625rem', { lineHeight: '1', letterSpacing: '0.18em', fontWeight: '500' }],
      },
      borderRadius: {
        'pill': '9999px',
        'card': '0.5rem',
        'frame': '2px',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom, 0px)',
        'safe-top': 'env(safe-area-inset-top, 0px)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.08) translate(-0.5%, -0.5%)' },
          '100%': { transform: 'scale(1) translate(0, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        lineExpand: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'ken-burns': 'kenBurns 25s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'line-expand': 'lineExpand 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'grain': 'grain 8s steps(10) infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      screens: {
        'xs': '375px',
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
