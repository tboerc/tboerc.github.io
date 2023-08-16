import { getLocale } from 'astro-i18n-aut'

import en from './en/strings.json'
import pt from './pt/strings.json'

type EN = keyof typeof en
type PT = keyof typeof pt
type Locale = keyof Omit<typeof LOCALES, 'en'>

const t = (locale?: Locale) => (key: EN | PT) => {
	switch (locale) {
		case 'pt':
			return pt[key]
		default:
			return en[key]
	}
}

const r = (locale?: Locale) => (route: string) => {
	if (locale) return '/' + locale + route
	return route
}

export const DEFAULT_LOCALE = 'en'

export const LOCALES = {
	en: 'en-US',
	pt: 'pt-BR'
}

export const LOCALES_FULL: Record<keyof typeof LOCALES, string> = {
	en: 'English (US)',
	pt: 'Português (Brasil)'
}

export const i18n = (url: URL) => {
	const locale = getLocale(url) as Locale | undefined
	return {
		locale: LOCALES[locale ?? DEFAULT_LOCALE],
		t: t(locale),
		r: r(locale)
	}
}
