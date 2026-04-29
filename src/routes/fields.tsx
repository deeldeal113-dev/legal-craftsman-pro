import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { Section, SectionHeader } from "@/components/Section";

export const Route = createFileRoute("/fields")({
  head: () => ({
    meta: [
      { title: "مجالات العمل | Practice Areas — Mohamed Khaled Mekky Law Firm" },
      { name: "description", content: "مجالات العمل: مدني، تجاري، أحوال شخصية، جنائي، عمل، إداري، دولي خاص، وتحكيم. Practice areas: civil, commercial, personal status, criminal, labor, administrative, private international, and arbitration." },
      { property: "og:title", content: "مجالات العمل | Practice Areas" },
      { property: "og:description", content: "خبرة موثقة في مختلف فروع القانون." },
    ],
  }),
  component: FieldsPage,
});

function FieldsPage() {
  const { t, locale } = useLocale();
  return (
    <Section className="pt-12 md:pt-20">
      <SectionHeader
        eyebrow={locale === "ar" ? "مجالات العمل" : "Practice Areas"}
        title={t.sections.fieldsTitle}
        lead={t.sections.fieldsLead}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {t.fields.map((f) => (
          <div key={f} className="p-5 rounded-xl bg-card border border-border hover:border-gold/50 hover:shadow-elegant transition-all flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
            <span className="font-medium">{f}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
