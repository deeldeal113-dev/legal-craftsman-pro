import { createFileRoute, redirect } from "@tanstack/react-router";
import { SUPPORTED_LANGUAGES } from "@/i18n";

const DEFAULT_LANG = "ar";

function detectLang(): string {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const stored = window.localStorage.getItem("swibba.lang");
    if (stored) {
      const code = stored.split("-")[0];
      if (SUPPORTED_LANGUAGES.some((l) => l.code === code)) return code;
    }
  } catch {}
  return DEFAULT_LANG;
}

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$lang", params: { lang: detectLang() } });
  },
});
