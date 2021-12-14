module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: 'var(--light)',
        dark: 'var(--dark)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        'sans': ["Inria Sans","ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        'serif': ["Inria Serif", 'ui-serif', "Georgia", "Cambria", "Times New Roman", "Times", "serif"]
      },
      backgroundImage: {
        'tesselation-3-pattern': "url('/img/tesselation-3.svg')",
        'tess-1-light': "url('/img/tess-1-light.svg')",
        'tess-1-primary': "url('/img/tess-1-primary.svg')",
        'tess-2-light': "url('/img/tess-2-light.svg')",
        'tess-2-primary': "url('/img/tess-2-primary.svg')",
      },
      listStyleType: {
         circle: 'circle'
      },      
      boxShadow: {
        'btn': '2px 4px rgba(0, 0, 0, 0.25)',
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
