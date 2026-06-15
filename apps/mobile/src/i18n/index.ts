import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import pt from './locales/pt.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  de: { translation: de },
  fr: { translation: fr },
  it: { translation: it },
  pt: { translation: pt },
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

import { LocaleConfig } from 'react-native-calendars';

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

const setupCalendarLocales = () => {
  ['en', 'es', 'de', 'fr', 'it', 'pt'].forEach(lang => {
    const t = i18n.getFixedT(lang);
    LocaleConfig.locales[lang] = {
      monthNames: [
        t('calendar.months.january'), t('calendar.months.february'), t('calendar.months.march'), t('calendar.months.april'),
        t('calendar.months.may'), t('calendar.months.june'), t('calendar.months.july'), t('calendar.months.august'),
        t('calendar.months.september'), t('calendar.months.october'), t('calendar.months.november'), t('calendar.months.december')
      ],
      monthNamesShort: [
        t('calendar.monthsShort.jan'), t('calendar.monthsShort.feb'), t('calendar.monthsShort.mar'), t('calendar.monthsShort.apr'),
        t('calendar.monthsShort.may'), t('calendar.monthsShort.jun'), t('calendar.monthsShort.jul'), t('calendar.monthsShort.aug'),
        t('calendar.monthsShort.sep'), t('calendar.monthsShort.oct'), t('calendar.monthsShort.nov'), t('calendar.monthsShort.dec')
      ],
      dayNames: [
        t('calendar.days.sunday'), t('calendar.days.monday'), t('calendar.days.tuesday'), t('calendar.days.wednesday'),
        t('calendar.days.thursday'), t('calendar.days.friday'), t('calendar.days.saturday')
      ],
      dayNamesShort: [
        t('calendar.daysShort.sun'), t('calendar.daysShort.mon'), t('calendar.daysShort.tue'), t('calendar.daysShort.wed'),
        t('calendar.daysShort.thu'), t('calendar.daysShort.fri'), t('calendar.daysShort.sat')
      ],
      today: t('calendar.today', 'Today')
    };
  });
  LocaleConfig.defaultLocale = i18n.language.split('-')[0] || 'en';
};

setupCalendarLocales();

i18n.on('languageChanged', (lng) => {
  LocaleConfig.defaultLocale = lng.split('-')[0] || 'en';
});

export default i18n;
