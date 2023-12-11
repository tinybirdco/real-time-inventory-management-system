/** @type {import('tailwindcss/types')} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
    mode: 'jit',
    darkMode: 'class',
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
                backgroundDark: '#161620',
                // flowbite-svelte
                primary: {
                    50: '#FFF5F2',
                    100: '#FFF1EE',
                    200: '#FFE4DE',
                    300: '#FFD5CC',
                    400: '#FFBCAD',
                    500: '#FE795D',
                    600: '#EF562F',
                    700: '#EB4F27',
                    800: '#CC4522',
                    900: '#A5371B'
                }
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
    plugins: [require('flowbite/plugin'), require('flowbite/plugin')({
        charts: true
    })],

};
