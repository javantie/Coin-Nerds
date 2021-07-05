const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function({ addUtilities, addComponents, e, prefix, config }) {
      // Add your custom styles here
    }),
  ]
}


module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss'),
  require('autoprefixer'),]
}
module.exports = {
  theme: {
    screens: {
      'sm': {'min': '600px'},
      // => @media (min-width: 640px) { ... }

      'md': {'min': '768px'},
      // => @media (min-width: 768px) { ... }

      'lg': {'min': '992px'},
      // => @media (min-width: 992px) { ... }

      'xl': {'min': '1024px'},
      // => @media (min-width: 1024px) { ... }

      '2xl': {'min': '1200px'},
      // => @media (min-width: 1200px) { ... }
    }
  }
}