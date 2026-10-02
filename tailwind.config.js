/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#171513',
          soft: '#26211D',
          muted: 'rgba(23, 21, 19, 0.55)',
        },
        paper: {
          DEFAULT: '#F5F1EB',
          muted: '#E8E0D6',
        },
        sand: {
          DEFAULT: '#CBBBA8',
          light: '#E2D8CC',
          dark: '#9A8570',
        },
        gold: {
          DEFAULT: '#B8945B',
          light: '#D4B37F',
          hover: '#C9A56D',
          50: '#FAF6EF',
          100: '#F5EBDC',
          200: '#EAD7B9',
          300: '#DFC296',
          400: '#D4B37F',
          500: '#B8945B',
          600: '#9E7C46',
          700: '#7D6033',
          800: '#5C4422',
          900: '#3D2A12',
        },
        primary: '#171513',
        secondary: '#26211D',
        accent: '#B8945B',
        neutral: '#F5F1EB',
        charcoal: {
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#D4D4D4',
          300: '#A3A3A3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#26211D',
          800: '#171513',
          900: '#0E0D0C',
          950: '#000000',
        },
        offwhite: '#F5F1EB',
        nearblack: '#171513',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'DM Serif Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'Manrope', 'Plus Jakarta Sans', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury-soft': '0 4px 25px -2px rgba(23, 21, 19, 0.05)',
        'luxury-hover': '0 18px 40px -4px rgba(23, 21, 19, 0.14)',
        'gold-glow': '0 0 25px -4px rgba(184, 148, 91, 0.35)',
        'gold-glow-lg': '0 0 40px -6px rgba(184, 148, 91, 0.5)',
      },
      backgroundImage: {
        'luxury-hero-scrim': 'linear-gradient(180deg, rgba(23, 21, 19, 0.3) 0%, rgba(23, 21, 19, 0.8) 100%)',
        'gold-grad': 'linear-gradient(135deg, #D4B37F 0%, #B8945B 100%)',
        'dark-glass-grad': 'linear-gradient(135deg, rgba(23, 21, 19, 0.95) 0%, rgba(38, 33, 29, 0.85) 100%)',
      }
    },
  },
  plugins: [],
};

