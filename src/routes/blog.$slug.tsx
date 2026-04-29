import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { Section } from "@/components/Section";
import { translations } from "@/lib/i18n";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = translations.ar.blog.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const slug = loaderData?.slug;
    const ar = translations.ar.blog.find((p) => p.slug === slug);
    const en = translations.en.blog.find((p) => p.slug === slug);
    const title = ar && en ? `${ar.t} | ${en.t}` : "Blog";
    const desc = ar && en ? `${ar.d} ${en.d}` : "";
    return {
      meta: [
        { title: `${title} — Mohamed Khaled Mekky` },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
      ],
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
  const { locale, dir } = useLocale();
  const post = locale === "ar"
    ? translations.ar.blog.find((p) => p.slug === slug)!
    : translations.en.blog.find((p) => p.slug === slug)!;
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowLeft;

  return (
    <Section className="pt-12 md:pt-20">
      <article className="max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gold hover:underline mb-6">
          <Arrow className="h-4 w-4" /> {locale === "ar" ? "كل المقالات" : "All articles"}
        </Link>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{post.t}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">{post.d}</p>
        <div className="prose prose-neutral max-w-none">
          <p className="leading-loose text-foreground/90">
            {locale === "ar"
              ? "هذا مقال قانوني تعريفي. نقدّم لك ملخصاً ميسّراً لأهم النقاط القانونية المتعلقة بالموضوع، مع إمكانية التواصل مع المكتب لطلب استشارة قانونية مفصّلة في حالتك."
              : "This is an introductory legal article providing a concise overview of the key legal points on the topic. Contact our firm for a detailed consultation tailored to your case."}
          </p>
          <p className="leading-loose text-foreground/90 mt-4">
            {locale === "ar"
              ? "للحصول على استشارة قانونية مفصّلة، يرجى التواصل مع فروعنا في سوهاج، المراغة، أو مكة المكرمة."
              : "For a detailed legal consultation, please contact our offices in Sohag, El Maragha, or Mecca."}
          </p>
        </div>
        <div className="mt-10 p-6 rounded-xl bg-secondary/50 border border-border">
          <h3 className="font-display text-lg font-semibold mb-2">
            {locale === "ar" ? "تحتاج استشارة؟" : "Need a consultation?"}
          </h3>
          <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gold-gradient text-deep font-semibold shadow-gold">
            {locale === "ar" ? "تواصل معنا" : "Contact us"}
          </Link>
        </div>
      </article>
    </Section>
  );
}
