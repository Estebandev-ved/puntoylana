/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rosa': {
          50: '#FFF0F3',
          100: '#FFE1E8',
          200: '#FFC7D3',
          300: '#FFA3B5',
          400: '#FF7A94',
          500: '#FFB6C1',  // Rosa pastel principal
          600: '#E8899A',
          700: '#D16B7D',
          800: '#B8506A',
          900: '#9E3A59',
        },
        'lavanda': {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#E6E6FA',  // Lavanda principal
          400: '#A78BFA',
          500: '#8B5CF6',
        },
        'menta': {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#98D2C0',  // Menta principal
          400: '#2DD4BF',
          500: '#14B8A6',
        },
        'crema': {
          50: '#FFFBF0',
          100: '#FFF8F0',  // Crema principal (fondo)
          200: '#FEF3E2',
          300: '#FDEBD0',
        },
        'chocolate': {
          400: '#8D6E63',
          500: '#5D4037',  // Chocolate (texto)
          600: '#4E342E',
          700: '#3E2723',
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Nunito', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'wiggle': 'wiggle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
