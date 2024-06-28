import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en/translation.json';
import fr from '../locales/fr/translation.json';
import ar from '../locales/ar/translation.json';

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        fallbackLng: 'en',
        lng: 'en',
        resources: {
            en: { translation: en },
            fr: { translation: fr },
            ar: { translation: ar },
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;