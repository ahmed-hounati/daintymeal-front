import i18next, { reloadResources } from 'i18next';
import { initReactI18next } from 'react-i18next';



i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en'
})