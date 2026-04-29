import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { Section, SectionHeader } from "@/components/Section";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "المدونة القانونية | Legal Blog — Mohamed Khaled Mekky" },
      { name: "description", content: "مقالات وأبحاث قانونية في القانون المصري والسعودي. Legal articles and research on Egyptian and Saudi law." },
      { property: "og:title", content: "المدونة القانونية | Legal Blog" },
      { property: "og:description", content: "مقالات قانونية لمساعدتك على فهم حقوقك." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { t, locale, dir } = useLocale();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  return (
    <Section className="pt-12 md:pt-20">
      <SectionHeader
        eyebrow={locale === "ar" ? "المدونة" : "Blog"}
        title={t.sections.blogTitle}
        lead={t.sections.blogLead}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.blog.map((p) => (
          <article key={p.slug} className="rounded-xl bg-card border border-border overflow-hidden hover:shadow-elegant hover:border-gold/50 transition-all">
            <div className="aspect-[16/9] bg-hero-gradient relative overflow-hidden">
              <div className="absolute inset-0 pattern-dots opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center text-gold-soft font-display text-2xl px-4 text-center">
                {p.t.split(" ").slice(0, 3).join(" ")}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <CalendarDays className="h-3.5 w-3.5" /> 2025
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 line-clamp-2">{p.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">{p.d}</p>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:underline"
              >
                {locale === "ar" ? "اقرأ المزيد" : "Read more"} <Arrow className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
