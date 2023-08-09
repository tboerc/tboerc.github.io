export type Locales = 'pt' | 'en'

export const DEFAULT_LOCALE: Locales = 'en'

export const LOCALES: Record<Locales, string> = {
	en: 'en-US',
	pt: 'pt-BR'
}

export const LOCALES_FULL: Record<Locales, string> = {
	en: 'English (US)',
	pt: 'Português (Brasil)'
}
