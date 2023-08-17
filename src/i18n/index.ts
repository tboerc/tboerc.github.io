import { getLocale } from 'astro-i18n-aut'

import en from './en/strings.json'
import pt from './pt/strings.json'

type Locales = 'pt' | 'en'

type EN = keyof typeof en
type PT = keyof typeof pt

export const DEFAULT_LOCALE: Locales = 'en'

export const LOCALES: Record<Locales, string> = {
	en: 'en-US',
	pt: 'pt-BR'
}

export const LOCALES_FULL: Record<Locales, string> = {
	en: 'English (US)',
	pt: 'Português (Brasil)'
}

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
