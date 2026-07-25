import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Scale, ListChecks, CalendarDays, Receipt, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/$lang/_app/dashboard/")({
  head: () => ({
    meta: [
      { title: "Dashboard — LexOffice" },
      { name: "description", content: "Overview of your active cases, tasks, hearings, and unpaid invoices." },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { key: "active_cases", value: 24, icon: Scale },
  { key: "open_tasks", value: 12, icon: ListChecks },
  { key: "upcoming_hearings", value: 3, icon: CalendarDays },
  { key: "unpaid_invoices", value: 5, icon: Receipt },
] as const;

function Dashboard() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams({ from: "/$lang/_app/dashboard/" });
  const nf = new Intl.NumberFormat(i18n.language);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("dashboard.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("dashboard.welcome")}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ key, value, icon: Icon }) => (
          <div key={key} className="rounded-lg border border-border bg-card p-4 flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-muted-foreground">{t(`dashboard.cards.${key}`)}</div>
              <div className="text-2xl font-semibold mt-1 tabular-nums">{nf.format(value)}</div>
            </div>
            <div className="rounded-md bg-primary/10 text-primary p-2">
              <Icon className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-lg border border-border bg-card">
        <header className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="text-sm font-semibold">{t("dashboard.recent_cases")}</h2>
          <Link to="/$lang/dashboard/cases" params={{ lang }} className="text-xs text-primary inline-flex items-center gap-1 hover:underline">
            {t("cases.title")} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
          </Link>
        </header>
        <div className="p-8 text-center text-sm text-muted-foreground">{t("dashboard.empty")}</div>
      </section>
    </div>
  );
}
