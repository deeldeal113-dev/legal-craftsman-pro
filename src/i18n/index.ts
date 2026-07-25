import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/locales/en/common.json";
import ar from "@/locales/ar/common.json";
import fr from "@/locales/fr/common.json";
import hi from "@/locales/hi/common.json";
import ru from "@/locales/ru/common.json";
import es from "@/locales/es/common.json";
import it from "@/locales/it/common.json";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", dir: "ltr" as const },
  { code: "ar", label: "العربية", dir: "rtl" as const },
  { code: "fr", label: "Français", dir: "ltr" as const },
  { code: "hi", label: "हिन्दी", dir: "ltr" as const },
  { code: "ru", label: "Русский", dir: "ltr" as const },
  { code: "es", label: "Español", dir: "ltr" as const },
  { code: "it", label: "Italiano", dir: "ltr" as const },
];

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export function getLanguageDir(code: string): "rtl" | "ltr" {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code)?.dir ?? "ltr";
}

if (!i18n.isInitialized) {
  void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { common: en },
        ar: { common: ar },
        fr: { common: fr },
        hi: { common: hi },
        ru: { common: ru },
        es: { common: es },
        it: { common: it },
      },
      fallbackLng: "en",
      defaultNS: "common",
      supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "swibba.lang",
      },
    });
}

export default i18n;
