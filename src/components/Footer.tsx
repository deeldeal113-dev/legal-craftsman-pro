import { Link } from "@tanstack/react-router";
import { Facebook, Phone, MapPin, Scale } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { SITE } from "@/lib/site-config";

export function Footer() {
  const { t, locale } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep text-primary-foreground/90 mt-24">
      <div className="container mx-auto px-4 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-gradient shadow-gold">
              <Scale className="h-5 w-5 text-deep" />
            </div>
            <div>
              <div className="font-display text-lg font-semibold text-gold-soft">
                {locale === "ar" ? SITE.nameAr : SITE.nameEn}
              </div>
              <div className="text-xs tracking-widest uppercase text-gold/80">
                {t.footer.tagline}
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-primary-foreground/70 max-w-md">
            {t.sections.aboutLead}
          </p>
          <a
            href={SITE.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gold-soft hover:text-gold"
          >
            <Facebook className="h-4 w-4" /> Facebook
          </a>
        </div>

        <div>
          <h4 className="font-display text-gold-soft mb-4 text-base">{t.footer.quick}</h4>
          <ul className="space-y-2 text-sm">
            {(["home", "about", "services", "fields", "blog", "faq", "contact"] as const).map((k) => (
              <li key={k}>
                <Link
                  to={
                    k === "home" ? "/" : k === "faq" ? "/faq" : (`/${k}` as "/about")
                  }
                  className="text-primary-foreground/70 hover:text-gold"
                >
                  {t.nav[k]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-gold-soft mb-4 text-base">{t.footer.branches}</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            {SITE.locations.map((l) => (
              <li key={l.id} className="flex gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold" />
                <div>
                  <div className="text-gold-soft font-medium">
                    {locale === "ar" ? l.cityAr : l.cityEn} — {locale === "ar" ? l.countryAr : l.countryEn}
                  </div>
                  <a href={`tel:${l.phone}`} className="inline-flex items-center gap-1 mt-1 hover:text-gold">
                    <Phone className="h-3 w-3" /> {l.phone}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-5 text-center text-xs text-primary-foreground/60">
          © {year} {locale === "ar" ? SITE.nameAr : SITE.nameEn} — {t.footer.rights}.
        </div>
      </div>
    </footer>
  );
}
