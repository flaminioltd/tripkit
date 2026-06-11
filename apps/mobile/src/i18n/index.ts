import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  de: { translation: de },
};

// Use the first locale preferred by the user, fallback to 'en'
const languageDetector = {
  type: 'languageDetector' as const,
  async: false,
  detect: () => {
    const locales = Localization.getLocales();
    return locales[0]?.languageCode ?? 'en';
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
