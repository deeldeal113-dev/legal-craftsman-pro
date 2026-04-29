import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { Section, SectionHeader } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/structured-data";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "الأسئلة الشائعة | FAQ — Mohamed Khaled Mekky Law Firm" },
      { name: "description", content: "إجابات على أكثر الأسئلة القانونية شيوعاً. Answers to the most common legal questions from our clients." },
      { property: "og:title", content: "الأسئلة الشائعة | FAQ" },
      { property: "og:description", content: "إجابات على أكثر الأسئلة القانونية شيوعاً." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { t, locale } = useLocale();
  const [open, setOpen] = useState<number | null>(0);
  // FAQ schema in both languages combined for richer indexing
  const allFaqs = [...translations.ar.faqs, ...translations.en.faqs];

  return (
    <>
      <JsonLd data={faqJsonLd(allFaqs)} />
      <Section className="pt-12 md:pt-20">
        <SectionHeader
          eyebrow={locale === "ar" ? "أسئلة شائعة" : "FAQ"}
          title={t.sections.faqTitle}
        />
        <div className="max-w-3xl mx-auto space-y-3">
          {t.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-xl bg-card border border-border overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-start hover:bg-secondary/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold">{f.q}</span>
                  <ChevronDown className={cn("h-5 w-5 text-gold transition-transform shrink-0", isOpen && "rotate-180")} />
                </button>
                <div className={cn("grid transition-all", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
