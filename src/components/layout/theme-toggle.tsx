import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme, type Theme } from "@/providers/theme-provider";

const OPTIONS: { value: Theme; icon: typeof Sun; key: string }[] = [
  { value: "light", icon: Sun, key: "theme.light" },
  { value: "dark", icon: Moon, key: "theme.dark" },
  { value: "auto", icon: Monitor, key: "theme.auto" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  return (
    <div className="inline-flex items-center rounded-md border border-input bg-background p-0.5">
      {OPTIONS.map(({ value, icon: Icon, key }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          aria-label={t(key)}
          title={t(key)}
          className={`inline-flex h-7 w-7 items-center justify-center rounded-sm transition-colors ${
            theme === value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
}
