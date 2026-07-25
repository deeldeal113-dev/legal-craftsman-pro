import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "@/i18n";

const CODES = SUPPORTED_LANGUAGES.map((l) => l.code);

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!CODES.includes(params.lang as (typeof CODES)[number])) {
      throw redirect({ to: "/$lang", params: { lang: "ar" } });
    }
  },
  component: LangLayout,
});

function LangLayout() {
  const { lang } = Route.useParams();
  const { i18n } = useTranslation();
  useEffect(() => {
    if (i18n.language.split("-")[0] !== lang) {
      void i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);
  return <Outlet />;
}
