import { getLocale } from 'astro-i18n-aut'
import { DEFAULT_LOCALE, LOCALES, LOCALES_FULL, type Locales } from '@i18n/locales'

import en from './en/strings.json'
import pt from './pt/strings.json'

type EN = keyof typeof en
type PT = keyof typeof pt

export { DEFAULT_LOCALE, LOCALES, LOCALES_FULL }

const t = (localeKey: Locales) => (key: EN | PT) => {
	switch (localeKey) {
		case 'pt':
			return pt[key]
		default:
			return en[key]
	}
}

const r = (localeKey: Locales) => (route: string) => {
	if (localeKey === DEFAULT_LOCALE) return route
	return '/' + localeKey + route
}

const switchPathLanguageTo = (localeKey: Locales) => (currentPathname: string, language: string) => {
	if (language === localeKey) return currentPathname
	if (language === DEFAULT_LOCALE) return currentPathname.slice(3)
	return '/' + language + currentPathname
}

export const i18n = (url: URL) => {
	const localeKey = (getLocale(url) ?? DEFAULT_LOCALE) as Locales
	return {
		localeKey,
		locale: LOCALES[localeKey],
		t: t(localeKey),
		r: r(localeKey),
		switchPathLanguageTo: switchPathLanguageTo(localeKey)
	}
}
