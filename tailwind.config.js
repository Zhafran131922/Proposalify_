/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      variants: {
        extend: {},
      },
      textShadow: {
        'default': '0 2px 4px rgba(0, 0, 0, 0.2)',
        'md': '0 3px 6px rgba(0, 0, 0, 0.3)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.4)',
      },
      height: {
        '500': '500px', 
        '400': '450px',
      },
      width: {
        '400': '400px', 
        '300': '350px',
      },
  },
  plugins: [],
}

};