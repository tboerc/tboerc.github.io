import { defineConfig } from 'astro/config'
import { i18n } from 'astro-i18n-aut/integration'
import tailwind from '@astrojs/tailwind'

import { DEFAULT_LOCALE, LOCALES } from './src/consts'

// https://astro.build/config
export default defineConfig({
	site: 'https://tboerc.github.io/',
	trailingSlash: 'always',
	build: {
		format: 'directory'
	},
	integrations: [
		tailwind(),
		i18n({
			locales: LOCALES,
			defaultLocale: DEFAULT_LOCALE,
			redirectDefaultLocale: false
		})
	]
})
