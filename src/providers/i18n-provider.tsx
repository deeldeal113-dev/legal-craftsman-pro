import { useEffect, type ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n, { getLanguageDir } from "@/i18n";

function DirSync() {
  const { i18n: instance } = useTranslation();
  useEffect(() => {
    const apply = (lng: string) => {
      const dir = getLanguageDir(lng);
      document.documentElement.dir = dir;
      document.documentElement.lang = lng;
    };
    apply(instance.language);
    instance.on("languageChanged", apply);
    return () => {
      instance.off("languageChanged", apply);
    };
  }, [instance]);
  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <DirSync />
      {children}
    </I18nextProvider>
  );
}
