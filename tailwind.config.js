/** @type {import('tailwindcss').Config} */

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    spacing: {
      '14': '3.5rem',
    },
    width: {
      '64': '16rem',
      '96': '24rem',
    },
    height: {
      'custom': '32rem',
    },
    fontSize: {
      '18': '1.125rem',
    },
    screen:{
      'xs':'280',
      'xsm':'400',
    },
    backgroundColor: {
      'pink': '#ED003B',
      'blue':'#6366F1',
      'red': '#D70004',
      'green': '#00D752',
    },
    textColor: {
      'custom': '#21D0B2',
      'pink': '#ED003B',
      'blue':'#6366F1',
      'red': '#D70004',
      'green': '#00D752',
    },
    borderColor: {
      'custom': '#21D0B2',
      'pink': '#ED003B',
      'blue':'#6366F1'
    },
    outlineColor: {
      'pink': '#ED003B',
      'blue':'#6366F1'
    },
    perspective: {
      '500': '500px',
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
      typing: {
        from: { width: 0 },
        to: { width: '100%' },
      },
      typingh: {
        from: { height: 0 },
        to: { height: '100%' },
      },
      'blink-caret': {
        'from, to': { borderColor: 'transparent' },
        '50%': { borderColor: 'orange' },
      },
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
      typing: 'typing 2s steps(40, end) infinite',
      typingh: 'typingh 4s steps(40, end)',
      'blink-caret': 'blink-caret .75s step-end infinite',
    },
    
  },
};
export const variants = {};
export const plugins = [];