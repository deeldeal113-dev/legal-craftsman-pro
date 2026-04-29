import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { Section, SectionHeader } from "@/components/Section";
import { postsByField, CATEGORIES } from "@/lib/blog-data";

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
  const { t, locale, dir } = useLocale();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  return (
    <Section className="pt-12 md:pt-20">
      <SectionHeader
        eyebrow={locale === "ar" ? "مجالات العمل" : "Practice Areas"}
        title={t.sections.fieldsTitle}
        lead={t.sections.fieldsLead}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {t.fields.map((f, idx) => {
          const related = postsByField(idx);
          return (
            <div key={f} className="p-5 rounded-xl bg-card border border-border hover:border-gold/50 hover:shadow-elegant transition-all">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
                <span className="font-semibold">{f}</span>
              </div>
              {related.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/60">
                  <p className="text-xs text-muted-foreground mb-2 inline-flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" /> {locale === "ar" ? "مقالات ذات صلة" : "Related articles"}
                  </p>
                  <ul className="space-y-1.5">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to="/blog/$slug"
                          params={{ slug: p.slug }}
                          className="text-sm text-foreground/90 hover:text-gold inline-flex items-center gap-1.5"
                        >
                          <Arrow className="h-3 w-3" /> {locale === "ar" ? p.ar.title : p.en.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/blog/category/$category"
                    params={{ category: related[0].category }}
                    className="mt-3 inline-block text-xs text-gold hover:underline"
                  >
                    {locale === "ar" ? `كل مقالات ${CATEGORIES[related[0].category].ar} ←` : `All ${CATEGORIES[related[0].category].en} articles →`}
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
