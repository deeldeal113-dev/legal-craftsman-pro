import { Link, Outlet, useParams, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Scale,
  Users,
  FileText,
  ListChecks,
  CalendarDays,
  Receipt,
  MessageSquare,
  UsersRound,
  Settings,
  Search,
  Bell,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

const NAV = [
  { to: "/$lang/dashboard", key: "dashboard", icon: LayoutDashboard, match: "/dashboard" },
  { to: "/$lang/cases", key: "cases", icon: Scale, match: "/cases" },
  { to: "/$lang/clients", key: "clients", icon: Users, match: "/clients" },
  { to: "/$lang/documents", key: "documents", icon: FileText, match: "/documents" },
  { to: "/$lang/tasks", key: "tasks", icon: ListChecks, match: "/tasks" },
  { to: "/$lang/calendar", key: "calendar", icon: CalendarDays, match: "/calendar" },
  { to: "/$lang/invoices", key: "invoices", icon: Receipt, match: "/invoices" },
  { to: "/$lang/messages", key: "messages", icon: MessageSquare, match: "/messages" },
  { to: "/$lang/team", key: "team", icon: UsersRound, match: "/team" },
  { to: "/$lang/settings", key: "settings", icon: Settings, match: "/settings" },
] as const;

export function AppShell() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { lang } = useParams({ from: "/$lang/_app" });


  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col border-e border-border bg-sidebar text-sidebar-foreground">
        <div className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            L
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">{t("app.name")}</span>
            <span className="text-xs text-muted-foreground leading-tight">{t("app.tagline")}</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV.map(({ to, key, icon: Icon, match }) => {
            const active = pathname.endsWith(match) || pathname.includes(match + "/");
            return (
              <Link
                key={to}
                to={to}
                params={{ lang }}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{t(`nav.${key}`)}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/80 backdrop-blur px-4 md:px-6 h-14">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder={t("actions.search")}
              className="w-full rounded-md border border-input bg-background ps-9 pe-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-md border border-input px-3 py-2 text-xs font-medium hover:bg-accent"
            title="AI assistant"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">AI</span>
          </button>
          <button
            className="relative rounded-md border border-input p-2 hover:bg-accent"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -end-1 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <LanguageSwitcher />
          <ThemeToggle />
        </header>

        <main className="flex-1 min-w-0 px-4 md:px-6 py-6">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden sticky bottom-0 grid grid-cols-5 border-t border-border bg-background">
          {NAV.slice(0, 5).map(({ to, key, icon: Icon, match }) => {
            const active = pathname.endsWith(match) || pathname.includes(match + "/");
            return (
              <Link
                key={to}
                to={to}
                params={{ lang }}
                className={`flex flex-col items-center justify-center gap-1 py-2 text-[11px] ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{t(`nav.${key}`)}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
