import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALES_FULL,
  type Locales,
} from "@i18n/locales";
import { getLocale } from "astro-i18n-aut";
import en from "./en/strings.json";
import pt from "./pt/strings.json";

type EN = keyof typeof en;
type PT = keyof typeof pt;

export { DEFAULT_LOCALE, LOCALES, LOCALES_FULL };

export function t(localeKey: Locales) {
  return (key: EN | PT) => {
    switch (localeKey) {
      case "pt":
        return pt[key];
      default:
        return en[key];
    }
  };
}

export function r(localeKey: Locales) {
  return (route: string) => {
    if (localeKey === DEFAULT_LOCALE) return route;
    return "/" + localeKey + route;
  };
}

function switchPathLanguageTo(localeKey: Locales) {
  return (currentPathname: string, language: string) => {
    if (language === localeKey) return currentPathname;
    if (language === DEFAULT_LOCALE) return currentPathname.slice(3);
    return "/" + language + currentPathname;
  };
}

export function i18n(url: URL) {
  const localeKey = (getLocale(url) ?? DEFAULT_LOCALE) as Locales;
  return {
    localeKey,
    locale: LOCALES[localeKey],
    t: t(localeKey),
    r: r(localeKey),
    switchPathLanguageTo: switchPathLanguageTo(localeKey),
  };
}
