module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      '2xl': {'min': '1500px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'land': {'max': '939px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '800px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '679px'},
      // => @media (max-width: 639px) { ... }
      'xs': {'max': '580px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
}
