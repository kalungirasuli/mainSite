/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#3b8aff',
        'white': '#fff',
        'smoke':'#F5F5F5',
        'bluegreen':'#29ABE2',
        'greendark':'#10AD32',
        'greytextdark':'#726F6F',
        'greenbutton':'#C8F1FF',
        'greytextfade':'#D9D9D9',
        'reddark':'#F92D2D',
        'redlight':'#FFBEB8',
        'cream':'#FFCC8A',


      },
      //media queries
      screens: {
        'sm': '324px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
}

