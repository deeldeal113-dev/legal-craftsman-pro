import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Locale } from "./site-config";
import { getDict, type Dict } from "./i18n";

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
  dir: "rtl" | "ltr";
}

const Ctx = createContext<LocaleCtx | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("locale")) as Locale | null;
    if (saved === "ar" || saved === "en") setLocaleState(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") localStorage.setItem("locale", l);
  };

  const t = getDict(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";
  return <Ctx.Provider value={{ locale, setLocale, t, dir }}>{children}</Ctx.Provider>;
}

export function useLocale() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
