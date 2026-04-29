import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Award, Scale } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { Section, SectionHeader } from "@/components/Section";
import { SITE } from "@/lib/site-config";
import portrait from "@/assets/lawyer-formal.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن | About — Dr. Mohamed Khaled Mekky Law Firm" },
      { name: "description", content: "تعرّف على مكتب د. محمد خالد مكي للمحاماة، خبرات قانونية في مصر والسعودية. About our law firm and our experience across Egypt and Saudi Arabia." },
      { property: "og:title", content: "من نحن | About — Dr. Mohamed Khaled Mekky" },
      { property: "og:description", content: "خبرات قانونية موثقة في القانون المصري والسعودي." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, locale } = useLocale();
  return (
    <>
      <Section className="pt-12 md:pt-20 pb-0">
        <SectionHeader
          eyebrow={locale === "ar" ? "من نحن" : "About"}
          title={t.sections.aboutTitle}
          lead={t.sections.aboutLead}
        />
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative max-w-md mx-auto w-full">
            <div className="absolute -inset-3 bg-gold/20 rounded-3xl blur-2xl" aria-hidden />
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-4 ring-gold/40 shadow-elegant">
              <img src={portrait} alt={locale === "ar" ? SITE.nameAr : SITE.nameEn} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-5">
            <h3 className="font-display text-2xl md:text-3xl font-bold">
              {locale === "ar" ? "د. محمد خالد مكي" : "Dr. Mohamed Khaled Mekky"}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {locale === "ar"
                ? "محامٍ ومستشار قانوني، صاحب خبرة موثقة في الترافع أمام مختلف درجات التقاضي في جمهورية مصر العربية والمملكة العربية السعودية. يقود المكتب فريقًا قانونيًا متخصصًا يهدف إلى تقديم حلول قانونية ذكية وفعّالة لعملائه من الأفراد والشركات."
                : "An attorney and legal consultant with proven experience appearing before all degrees of litigation in Egypt and Saudi Arabia. The firm leads a specialized legal team that delivers smart, effective legal solutions for individuals and corporations."}
            </p>
            <ul className="space-y-3">
              {[
                { Icon: Award, text: t.hero.member },
                { Icon: Scale, text: locale === "ar" ? "ترافع أمام مختلف درجات التقاضي" : "Appearance across all degrees of litigation" },
                { Icon: ShieldCheck, text: locale === "ar" ? "التزام صارم بسرية ملفات الموكلين" : "Strict confidentiality of client files" },
              ].map(({ Icon, text }, i) => (
                <li key={i} className="flex gap-3">
                  <span className="h-9 w-9 shrink-0 rounded-md bg-gold-gradient flex items-center justify-center">
                    <Icon className="h-4 w-4 text-deep" />
                  </span>
                  <span className="text-foreground/90">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
