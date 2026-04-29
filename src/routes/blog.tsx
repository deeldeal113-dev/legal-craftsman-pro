import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Folder, Tag as TagIcon } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { Section, SectionHeader } from "@/components/Section";
import { POSTS, CATEGORIES, TAGS, type BlogCategoryId, type BlogTagId } from "@/lib/blog-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "المدونة القانونية | Legal Blog — Mohamed Khaled Mekky" },
      { name: "description", content: "مقالات وأبحاث قانونية في القانون المصري والسعودي. Legal articles and research on Egyptian and Saudi law." },
      { property: "og:title", content: "المدونة القانونية | Legal Blog" },
      { property: "og:description", content: "مقالات قانونية لمساعدتك على فهم حقوقك." },
    ],
    links: [{ rel: "canonical", href: "https://mohamedkhaled-law.com/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { t, locale, dir } = useLocale();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const categoryIds = Object.keys(CATEGORIES) as BlogCategoryId[];
  const tagIds = Object.keys(TAGS) as BlogTagId[];

  return (
    <Section className="pt-12 md:pt-20">
      <SectionHeader
        eyebrow={locale === "ar" ? "المدونة" : "Blog"}
        title={t.sections.blogTitle}
        lead={t.sections.blogLead}
      />

      {/* Categories */}
      <div className="max-w-4xl mx-auto mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 inline-flex items-center gap-1.5">
          <Folder className="h-3.5 w-3.5" /> {locale === "ar" ? "التصنيفات" : "Categories"}
        </p>
        <div className="flex flex-wrap gap-2">
          {categoryIds.map((c) => {
            const info = CATEGORIES[c];
            return (
              <Link
                key={c}
                to="/blog/category/$category"
                params={{ category: c }}
                className="px-3 py-1.5 rounded-md text-sm bg-secondary/60 hover:bg-gold-gradient hover:text-deep transition-colors"
              >
                {locale === "ar" ? info.ar : info.en}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tags */}
      <div className="max-w-4xl mx-auto mb-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 inline-flex items-center gap-1.5">
          <TagIcon className="h-3.5 w-3.5" /> {locale === "ar" ? "العلامات" : "Tags"}
        </p>
        <div className="flex flex-wrap gap-2">
          {tagIds.map((tg) => {
            const info = TAGS[tg];
            return (
              <Link
                key={tg}
                to="/blog/tag/$tag"
                params={{ tag: tg }}
                className="px-2.5 py-1 rounded-full text-xs border border-border hover:border-gold/50 hover:text-gold transition-colors"
              >
                #{locale === "ar" ? info.ar : info.en}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {POSTS.map((p) => {
          const l = locale === "ar" ? p.ar : p.en;
          const cat = CATEGORIES[p.category];
          return (
            <article key={p.slug} className="rounded-xl bg-card border border-border overflow-hidden hover:shadow-elegant hover:border-gold/50 transition-all">
              <div className="aspect-[16/9] bg-hero-gradient relative overflow-hidden">
                <div className="absolute inset-0 pattern-dots opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center text-gold-soft font-display text-2xl px-4 text-center">
                  {l.title.split(" ").slice(0, 3).join(" ")}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <CalendarDays className="h-3.5 w-3.5" /> {p.date}
                  <Link
                    to="/blog/category/$category"
                    params={{ category: p.category }}
                    className="inline-flex items-center gap-1 text-gold hover:underline ms-auto"
                  >
                    <Folder className="h-3 w-3" /> {locale === "ar" ? cat.ar : cat.en}
                  </Link>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 line-clamp-2">{l.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">{l.description}</p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:underline"
                >
                  {t ? (locale === "ar" ? "اقرأ المزيد" : "Read more") : "Read"} <Arrow className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
