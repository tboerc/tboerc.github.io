const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,md,ts,tsx,json}'],
	darkMode: 'class',
	theme: {
		container: {
			center: true
		},
		extend: {
			fontFamily: {
				sans: ['Poppins', defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
