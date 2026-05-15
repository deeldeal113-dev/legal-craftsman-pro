import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Phone, MapPin, ShieldCheck, Scale, Award, Globe2, MessageCircle, CheckCircle2 } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { Section, SectionHeader } from "@/components/Section";
import { SITE } from "@/lib/site-config";
import lawyerPortrait from "@/assets/lawyer-portrait.jpg";
import banner from "@/assets/hero-bg.jpeg";
import heroLogo from "@/assets/hero-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "د. محمد خالد مكي — محاماة واستشارات في سوهاج ومكة | Dr. Mohamed Khaled Mekky" },
      { name: "description", content: "مكتب الدكتور محمد خالد مكي للمحاماة والاستشارات القانونية في سوهاج، المراغة، ومكة المكرمة. Trusted lawyer serving Sohag and Mecca." },
      { property: "og:title", content: "د. محمد خالد مكي — محاماة واستشارات قانونية" },
      { property: "og:description", content: "خدمات قانونية متكاملة في مصر والسعودية." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t, locale, dir } = useLocale();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-deep text-primary-foreground">
        <div
          className="absolute inset-0 opacity-60"
          style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep/80 via-deep/60 to-deep" aria-hidden />
        <div className="absolute inset-0 pattern-dots opacity-30" aria-hidden />

        <div className="relative container mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 backdrop-blur">
              <Award className="h-4 w-4 text-gold" />
              <span className="text-xs font-semibold tracking-widest uppercase text-gold-soft">
                {t.hero.eyebrow}
              </span>
            </div>
            <img
              src={heroLogo}
              alt={locale === "ar" ? "مكتب الدكتور محمد خالد مكي للمحاماة" : "Dr. Mohamed Khaled Mekky Law Firm"}
              className="w-full max-w-lg h-auto object-contain drop-shadow-[0_8px_24px_rgba(201,168,76,0.35)]"
              loading="eager"
            />
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gold-gradient text-deep font-semibold shadow-gold hover:scale-[1.02] transition-transform"
              >
                {t.hero.ctaConsult} <Arrow className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-gold/40 text-gold-soft hover:bg-gold/10 transition-colors"
              >
                {t.hero.ctaServices}
              </Link>
            </div>
            <div className="flex items-center gap-2 pt-3 text-sm text-primary-foreground/70">
              <ShieldCheck className="h-4 w-4 text-gold" />
              {t.hero.member}
            </div>
          </div>

          <div className="relative mx-auto max-w-md w-full">
            <div className="absolute inset-0 -m-4 bg-gold/20 rounded-3xl blur-2xl" aria-hidden />
            <div className="relative aspect-square rounded-3xl overflow-hidden ring-4 ring-gold/40 shadow-elegant">
              <img
                src={lawyerPortrait}
                alt={locale === "ar" ? "د. محمد خالد مكي" : "Dr. Mohamed Khaled Mekky"}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-5 inset-inline-start-6 bg-background text-foreground rounded-xl px-4 py-3 shadow-elegant flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gold-gradient flex items-center justify-center">
                <Scale className="h-5 w-5 text-deep" />
              </div>
              <div className="text-xs leading-tight">
                <div className="font-semibold">{locale === "ar" ? "خبرة موثقة" : "Proven Expertise"}</div>
                <div className="text-muted-foreground">{locale === "ar" ? "مصر • السعودية" : "Egypt • KSA"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <Section>
        <SectionHeader
          eyebrow={locale === "ar" ? "ثقة وخبرة" : "Trust & Experience"}
          title={t.sections.whyTitle}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.why.map((w, i) => {
            const Icon = [ShieldCheck, Globe2, Scale, Award][i] ?? ShieldCheck;
            return (
              <div
                key={w.t}
                className="group p-6 rounded-xl bg-card border border-border hover:border-gold/50 hover:shadow-elegant transition-all"
              >
                <div className="h-12 w-12 rounded-lg bg-gold-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-deep" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{w.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.d}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* SERVICES preview */}
      <Section className="bg-secondary/40">
        <SectionHeader
          eyebrow={locale === "ar" ? "خدماتنا" : "Services"}
          title={t.sections.servicesTitle}
          lead={t.sections.servicesLead}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.services.map((s) => (
            <div key={s.t} className="p-6 rounded-xl bg-card border border-border hover:shadow-elegant transition-shadow">
              <CheckCircle2 className="h-6 w-6 text-gold mb-3" />
              <h3 className="font-display text-lg font-semibold mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-gold font-semibold hover:underline">
            {locale === "ar" ? "عرض كل الخدمات" : "View all services"} <Arrow className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* LOCATIONS */}
      <Section>
        <SectionHeader
          eyebrow={locale === "ar" ? "تواجد إقليمي" : "Regional Presence"}
          title={t.sections.locationsTitle}
          lead={t.sections.locationsLead}
        />
        <div className="grid md:grid-cols-3 gap-5">
          {SITE.locations.map((l) => (
            <div key={l.id} className="p-6 rounded-xl bg-card border border-border hover:border-gold/50 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-5 w-5 text-gold" />
                <h3 className="font-display text-lg font-semibold">
                  {locale === "ar" ? l.cityAr : l.cityEn}
                </h3>
                <span className="text-xs text-muted-foreground ms-auto">
                  {locale === "ar" ? l.countryAr : l.countryEn}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {locale === "ar" ? l.addressAr : l.addressEn}
              </p>
              <a
                href={`tel:${l.phone}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline"
              >
                <Phone className="h-4 w-4" /> {l.phone}
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-12">
        <div className="relative overflow-hidden rounded-2xl bg-hero-gradient p-10 md:p-14 text-primary-foreground text-center">
          <div className="absolute inset-0 pattern-dots opacity-30" aria-hidden />
          <div className="relative max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gold-soft">{t.sections.ctaTitle}</h2>
            <p className="text-primary-foreground/80">{t.sections.ctaLead}</p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#25D366] text-white font-semibold"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gold-gradient text-deep font-semibold shadow-gold">
                {t.hero.ctaConsult}
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
