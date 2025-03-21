module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6200',
        secondary: '#1A1A1A',
        gold: '#D4AF37',
        whiteFuturistic: '#F5F5F5',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
