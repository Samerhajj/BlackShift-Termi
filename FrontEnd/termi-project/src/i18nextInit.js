import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// --> 
const fallbackLanguage = ["en"];

// --> all the available languages
const availableLanguages = ["en", "ar", "he"];

// --> 
i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: availableLanguages,
        fallbackLng: fallbackLanguage,
        detection: {
            order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
            caches: ["cookie"],
        },
        interpolation:{
            escapeValue: false
        },
        allowMultiLoading: true
    });

export default i18n;