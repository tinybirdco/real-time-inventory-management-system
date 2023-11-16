/** @type {import('tailwindcss/types')} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  mode: 'jit',
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      colors: {
        svelteOrange: '#FF3E00',
        svelteDark: '#F03A00',
        hotPink: '#FF1966',
        dark: '#111111',
        light: '#FAFAFA',
        tbHeaderBlue: '#25283d',
        tbTextGrey: '#3f4154',
        tbTextLightGrey: '#717380',
        tbGreen: '#1fcc83',
        secondary: '#25283d',
        background: '#e5e6ea',
        backgroundDark: '#161620'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        }
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out'
      }
    }
  },
  plugins: []
};
