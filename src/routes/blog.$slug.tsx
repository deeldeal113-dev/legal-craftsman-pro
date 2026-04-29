import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Folder, Tag as TagIcon, Scale } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { Section } from "@/components/Section";
import { CATEGORIES, TAGS, getPost, relatedPosts } from "@/lib/blog-data";
import { translations } from "@/lib/i18n";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const slug = loaderData?.slug;
    const post = slug ? getPost(slug) : undefined;
    const title = post ? `${post.ar.title} | ${post.en.title}` : "Blog";
    const desc = post ? `${post.ar.description} ${post.en.description}` : "";
    const url = `https://mohamedkhaled-law.com/blog/${slug}`;
    return {
      meta: [
        { title: `${title} — Mohamed Khaled Mekky` },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "robots", content: "index, follow" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.ar.title,
                alternativeHeadline: post.en.title,
                description: post.ar.description,
                datePublished: post.date,
                inLanguage: ["ar", "en"],
                articleSection: CATEGORIES[post.category].en,
                keywords: post.tags.map((t) => TAGS[t].en).join(", "),
                author: { "@type": "Person", name: "Dr. Mohamed Khaled Mekky" },
                mainEntityOfPage: url,
              }),
            },
          ]
        : [],
    };
  },
  component: BlogPostPage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <Section>
        <div className="text-center">
          <p className="text-destructive mb-4">{error.message}</p>
          <button onClick={() => { router.invalidate(); reset(); }} className="px-4 py-2 rounded-md bg-gold-gradient text-deep font-semibold">Retry</button>
        </div>
      </Section>
    );
  },
  notFoundComponent: () => {
    const { locale } = useLocale();
    return (
      <Section>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">{locale === "ar" ? "المقال غير موجود" : "Article not found"}</h1>
          <Link to="/blog" className="text-gold hover:underline">{locale === "ar" ? "العودة للمدونة" : "Back to blog"}</Link>
        </div>
      </Section>
    );
  },
});

function BlogPostPage() {
  const { slug } = Route.useLoaderData();
  const { locale } = useLocale();
  const post = getPost(slug)!;
  const l = locale === "ar" ? post.ar : post.en;
  const cat = CATEGORIES[post.category];
  const catLabel = locale === "ar" ? cat.ar : cat.en;
  const related = relatedPosts(slug);
  const fieldName =
    typeof post.fieldIndex === "number"
      ? translations[locale].fields[post.fieldIndex]
      : undefined;

  return (
    <Section className="pt-12 md:pt-20">
      <article className="max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gold hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" /> {locale === "ar" ? "كل المقالات" : "All articles"}
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
          <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {post.date}</span>
          <Link
            to="/blog/category/$category"
            params={{ category: post.category }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/60 hover:bg-secondary text-foreground transition-colors"
          >
            <Folder className="h-3.5 w-3.5" /> {catLabel}
          </Link>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{l.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{l.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tg) => {
            const tinfo = TAGS[tg];
            return (
              <Link
                key={tg}
                to="/blog/tag/$tag"
                params={{ tag: tg }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border border-border hover:border-gold/50 hover:text-gold transition-colors"
              >
                <TagIcon className="h-3 w-3" /> {locale === "ar" ? tinfo.ar : tinfo.en}
              </Link>
            );
          })}
        </div>

        <div className="prose prose-neutral max-w-none">
          <p className="leading-loose text-foreground/90">{l.body}</p>
          <p className="leading-loose text-foreground/90 mt-4">
            {locale === "ar"
              ? "للحصول على استشارة قانونية مفصّلة، يرجى التواصل مع فروعنا في سوهاج، المراغة، أو مكة المكرمة."
              : "For a detailed legal consultation, please contact our offices in Sohag, El Maragha, or Mecca."}
          </p>
        </div>

        {fieldName && (
          <div className="mt-10 p-5 rounded-xl border border-border bg-secondary/40 flex items-start gap-3">
            <Scale className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {locale === "ar" ? "مجال العمل القانوني" : "Practice Area"}
              </p>
              <Link to="/fields" className="font-semibold hover:text-gold transition-colors">
                {fieldName}
              </Link>
            </div>
          </div>
        )}

        <div className="mt-10 p-6 rounded-xl bg-secondary/50 border border-border">
          <h3 className="font-display text-lg font-semibold mb-2">
            {locale === "ar" ? "تحتاج استشارة؟" : "Need a consultation?"}
          </h3>
          <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gold-gradient text-deep font-semibold shadow-gold">
            {locale === "ar" ? "تواصل معنا" : "Contact us"}
          </Link>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h3 className="font-display text-2xl font-semibold mb-6">
              {locale === "ar" ? "مقالات ذات صلة" : "Related articles"}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((r) => {
                const rl = locale === "ar" ? r.ar : r.en;
                return (
                  <Link
                    key={r.slug}
                    to="/blog/$slug"
                    params={{ slug: r.slug }}
                    className="block p-5 rounded-xl bg-card border border-border hover:border-gold/50 hover:shadow-elegant transition-all"
                  >
                    <p className="text-xs text-gold mb-1">{locale === "ar" ? CATEGORIES[r.category].ar : CATEGORIES[r.category].en}</p>
                    <h4 className="font-semibold leading-snug line-clamp-2">{rl.title}</h4>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </Section>
  );
}
