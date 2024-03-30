import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
        'dark': {
          100: '#000000',
        },
        'cryptoblue': {
            100: '#FFFFFF',
            200: '#EBEBFD',
            300: '#FFFFFF',
            400: '#E6E8EC',
            500: '#9B9AB6',
            600: '#A5A4DA',
            650: '#01F1E3',
            660: '#1fcac0',
            670: '#0E393D',
            700: '#D878FA',
            750: '#FE2264',
            800: '#7878FA',
            810: '#424286',
            900: '#353570',
        },
        'cryptodark': {
            100: '#FFFFFF',
            110: '#FAFBFC',
            150: '#232336',
            160: '#2C2C4A',
            200: '#191925',
            300: '#1E1932',
            350: '#191932',
            400: '#05050F',
            500: '#9B9AB6',
            510: '#9E9E9E',
            520: '#b8b8b8',
            550: '#D1D1D1',
            600: '#A5A4DA',
            610: '#C27721',
            620: '#F3EB2F',
            630: '#F5AC37',
            640: '#6374C3',
            700: '#D878FA',
            750: '#383979',
            800: '#7776F8',
            850: '#6161D6',
            900: '#14142B',
        },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
