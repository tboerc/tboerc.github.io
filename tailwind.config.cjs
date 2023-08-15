const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
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
