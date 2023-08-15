import en from './en/strings.json'
import pt from './pt/strings.json'

type EN = keyof typeof en
type PT = keyof typeof pt

export const t = (key: EN | PT, locale?: string) => {
	switch (locale) {
		case 'pt':
			return pt[key]
		default:
			return en[key]
	}
}

export const r = (route: string, locale?: string) => {
	if (locale) return '/' + locale + route
	return route
}
