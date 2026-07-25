import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/$lang/_app/cases")({
  head: () => ({
    meta: [
      { title: "Cases — LexOffice" },
      { name: "description", content: "All legal cases across your organization with status, lead lawyer, and updates." },
    ],
  }),
  component: CasesPage,
});

function CasesPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t("cases.title")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("cases.subtitle")}</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          {t("actions.new_case")}
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr className="text-start">
              <th className="px-4 py-3 text-start font-medium">{t("cases.columns.reference")}</th>
              <th className="px-4 py-3 text-start font-medium">{t("cases.columns.title")}</th>
              <th className="px-4 py-3 text-start font-medium">{t("cases.columns.client")}</th>
              <th className="px-4 py-3 text-start font-medium">{t("cases.columns.status")}</th>
              <th className="px-4 py-3 text-start font-medium">{t("cases.columns.lawyer")}</th>
              <th className="px-4 py-3 text-start font-medium">{t("cases.columns.updated")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="px-4 py-16 text-center text-muted-foreground">
                {t("cases.empty")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
