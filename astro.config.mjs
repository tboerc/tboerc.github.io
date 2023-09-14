import { defineConfig } from 'astro/config'
import { i18n, filterSitemapByDefaultLocale } from 'astro-i18n-aut/integration'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

import { DEFAULT_LOCALE, LOCALES } from './src/i18n/locales'

// https://astro.build/config
export default defineConfig({
	site: 'https://tboerc.github.io/',
	trailingSlash: 'always',
	build: {
		format: 'directory'
	},
	markdown: {
		shikiConfig: {
			theme: 'dark-plus'
		}
	},
	integrations: [
		tailwind(),
		i18n({
			locales: LOCALES,
			defaultLocale: DEFAULT_LOCALE,
			redirectDefaultLocale: false
		}),
		sitemap({
			i18n: {
				locales: LOCALES,
				defaultLocale: DEFAULT_LOCALE
			},
			filter: filterSitemapByDefaultLocale({ defaultLocale: DEFAULT_LOCALE })
		})
	]
})
