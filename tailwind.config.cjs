const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,md,ts,tsx,json}'],
	theme: {
		container: {
			center: true
		},
		extend: {
			fontFamily: {
				sans: ['Poppins', defaultTheme.fontFamily.sans],
				display: ['Oswald', defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
