/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#050505',
        graphite: {
          DEFAULT: '#121214',
          50: '#F4F4F5',
          100: '#E4E4E7',
          200: '#D4D4D8',
          300: '#A1A1AA',
          400: '#71717A',
          500: '#52525B',
          600: '#3F3F46',
          700: '#27272A',
          800: '#1C1C1F',
          900: '#121214',
          950: '#09090B',
        },
        charcoal: {
          DEFAULT: '#09090B',
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#121214',
          950: '#08080A',
        },
        ivory: {
          DEFAULT: '#FAFAFA',
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F4F4F5',
          300: '#E4E4E7',
          400: '#D4D4D8',
          500: '#A1A1AA',
        },
        gold: {
          DEFAULT: '#FFFFFF',
          light: '#F4F4F5',
          hover: '#E4E4E7',
          dark: '#D4D4D8',
          muted: '#A1A1AA',
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
        },
        slate: {
          DEFAULT: '#71717A',
          muted: '#A1A1AA',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'DM Serif Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'Manrope', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 40px -10px rgba(0, 0, 0, 0.06)',
        'luxury-hover': '0 20px 50px -12px rgba(0, 0, 0, 0.15)',
        'luxury-dark': '0 20px 50px -10px rgba(0, 0, 0, 0.7)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'dark-gradient': 'linear-gradient(180deg, #09090B 0%, #121214 100%)',
        'monochrome-metallic': 'linear-gradient(135deg, #FFFFFF 0%, #D4D4D8 50%, #A1A1AA 100%)',
      }
    },
  },
  plugins: [],
};
