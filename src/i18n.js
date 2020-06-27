import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import es from "./translations/es.json";

const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  }
};

i18n
  .use(initReactI18next)  
  .init({
    resources,
    lng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;
