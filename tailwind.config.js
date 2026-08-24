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
        primary: '#000000',    // Black — structure, luxury backgrounds, dark surfaces
        secondary: '#262626',  // Charcoal — secondary dark surfaces, card borders, secondary buttons
        accent: '#EAB308',     // Gold — primary CTAs, links, active states, brand accent
        neutral: '#FAFAFA',    // Off-White — page backgrounds, clean canvas
        ink: '#171717',        // Near Black — body text, dark headings
        black: '#000000',
        charcoal: {
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#D4D4D4',
          300: '#A3A3A3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#262626',
          800: '#171717',
          900: '#0A0A0A',
          950: '#000000',
        },
        gold: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
          950: '#422006',
        },
        offwhite: '#FAFAFA',
        nearblack: '#171717',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'DM Serif Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'Manrope', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury-soft': '0 4px 20px -2px rgba(0, 0, 0, 0.06)',
        'luxury-hover': '0 14px 35px -4px rgba(0, 0, 0, 0.18)',
        'gold-glow': '0 0 25px -4px rgba(234, 179, 8, 0.35)',
        'gold-glow-lg': '0 0 40px -6px rgba(234, 179, 8, 0.5)',
      },
      backgroundImage: {
        'black-hero': 'linear-gradient(180deg, #171717 0%, #000000 100%)',
        'gold-grad': 'linear-gradient(135deg, #FACC15 0%, #CA8A04 100%)',
        'black-gold-grad': 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(38, 38, 38, 0.85) 100%)',
      }
    },
  },
  plugins: [],
};
