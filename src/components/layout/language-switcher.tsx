import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { SUPPORTED_LANGUAGES } from "@/i18n";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = i18n.language.split("-")[0];

  const onChange = (code: string) => {
    void i18n.changeLanguage(code);
    // Swap the leading /{lang}/ segment if present, otherwise prefix.
    const segments = pathname.split("/").filter(Boolean);
    const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
    if (segments.length > 0 && codes.includes(segments[0])) {
      segments[0] = code;
    } else {
      segments.unshift(code);
    }
    navigate({ to: "/" + segments.join("/") });
  };

  return (
    <label className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-2 py-1.5 text-xs">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <select
        value={current}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none text-foreground"
      >
        {SUPPORTED_LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
