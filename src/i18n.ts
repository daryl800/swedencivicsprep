import i18n from "i18next";
import { initReactI18next } from "react-i18next";

void i18n.use(initReactI18next).init({
  fallbackLng: "sv",
  interpolation: {
    escapeValue: false
  },
  lng: "sv",
  react: {
    useSuspense: false
  },
  resources: {}
});

export default i18n;
