import { getLocale } from 'astro-i18n-aut'
import { DEFAULT_LOCALE, LOCALES } from '@consts'

import en from './en/strings.json'
import pt from './pt/strings.json'

type EN = keyof typeof en
type PT = keyof typeof pt

const t = (locale?: string) => (key: EN | PT) => {
	switch (locale) {
		case 'pt':
			return pt[key]
		default:
			return en[key]
	}
}

const r = (locale?: string) => (route: string) => {
	if (locale) return '/' + locale + route
	return route
}

export const i18n = (url: URL) => {
	const locale = getLocale(url)
	return {
		locale: LOCALES[locale ?? DEFAULT_LOCALE],
		t: t(locale),
		r: r(locale)
	}
}
