import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Tag as TagIcon } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { Section, SectionHeader } from "@/components/Section";
import { TAGS, postsByTag, type BlogTagId } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/tag/$tag")({
  loader: ({ params }) => {
    if (!(params.tag in TAGS)) throw notFound();
    return { tag: params.tag as BlogTagId };
  },
  head: ({ loaderData }) => {
    const tag = loaderData?.tag;
    const t = tag ? TAGS[tag] : null;
    const title = t ? `${t.ar} | ${t.en}` : "Tag";
    return {
      meta: [
        { title: `${title} — مقالات قانونية | Legal Articles` },
        { name: "description", content: t ? `مقالات موسومة بـ ${t.ar}. Articles tagged ${t.en}.` : "" },
        { property: "og:title", content: title },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index, follow" },
      ],
      links: [{ rel: "canonical", href: `https://mohamedkhaled-law.com/blog/tag/${tag}` }],
    };
  },
  component: TagArchive,
  notFoundComponent: () => (
    <Section>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">العلامة غير موجودة | Tag not found</h1>
        <Link to="/blog" className="text-gold hover:underline">العودة للمدونة</Link>
      </div>
    </Section>
  ),
});

function TagArchive() {
  const { tag } = Route.useLoaderData();
  const { locale, dir } = useLocale();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const t = TAGS[tag];
  const posts = postsByTag(tag);
  const label = locale === "ar" ? t.ar : t.en;

  return (
    <Section className="pt-12 md:pt-20">
      <SectionHeader
        eyebrow={<span className="inline-flex items-center gap-1.5"><TagIcon className="h-4 w-4" /> {locale === "ar" ? "علامة" : "Tag"}</span>}
        title={`#${label}`}
        lead={locale === "ar" ? `كل المقالات الموسومة بـ ${t.ar}` : `All articles tagged ${t.en}`}
      />
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">{locale === "ar" ? "لا توجد مقالات بعد." : "No articles yet."}</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => {
            const l = locale === "ar" ? p.ar : p.en;
            return (
              <article key={p.slug} className="rounded-xl bg-card border border-border overflow-hidden hover:shadow-elegant hover:border-gold/50 transition-all">
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <CalendarDays className="h-3.5 w-3.5" /> {p.date}
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{l.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">{l.description}</p>
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:underline">
                    {locale === "ar" ? "اقرأ المزيد" : "Read more"} <Arrow className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
      <div className="mt-10 text-center">
        <Link to="/blog" className="text-sm text-gold hover:underline">{locale === "ar" ? "← كل المقالات" : "← All articles"}</Link>
      </div>
    </Section>
  );
}
