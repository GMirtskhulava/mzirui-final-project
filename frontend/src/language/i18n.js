import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ka from './locales/ka.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en,
        },
        ka: {
            translation: ka,
        },
    },
    fallbackLng: localStorage.getItem('lang') || 'en', //default language
    interpolation: {
        escapeValue: false,
    },
});
