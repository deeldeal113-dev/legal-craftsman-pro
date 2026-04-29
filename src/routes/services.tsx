import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Scale, Building2, Gavel, Users, BookOpenCheck } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { Section, SectionHeader } from "@/components/Section";

const ICONS = [Users, Briefcase, Building2, Gavel, Scale, BookOpenCheck];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "الخدمات القانونية | Legal Services — Mohamed Khaled Mekky" },
      { name: "description", content: "خدمات قانونية متكاملة: أحوال شخصية، تجاري، عقاري، جنائي، عمل، واستشارات. Comprehensive legal services for individuals and corporations." },
      { property: "og:title", content: "الخدمات القانونية | Legal Services" },
      { property: "og:description", content: "Personal status, commercial, real-estate, criminal, labor, and consultancy services." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t, locale } = useLocale();
  return (
    <Section className="pt-12 md:pt-20">
      <SectionHeader
        eyebrow={locale === "ar" ? "الخدمات" : "Services"}
        title={t.sections.servicesTitle}
        lead={t.sections.servicesLead}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {t.services.map((s, i) => {
          const Icon = ICONS[i] ?? Scale;
          return (
            <article key={s.t} className="group p-6 rounded-xl bg-card border border-border hover:border-gold/50 hover:shadow-elegant transition-all">
              <div className="h-12 w-12 rounded-lg bg-gold-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="h-6 w-6 text-deep" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
