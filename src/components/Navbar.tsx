import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Globe, Scale } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { SITE } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", key: "home" as const },
  { to: "/about", key: "about" as const },
  { to: "/services", key: "services" as const },
  { to: "/fields", key: "fields" as const },
  { to: "/blog", key: "blog" as const },
  { to: "/faq", key: "faq" as const },
  { to: "/contact", key: "contact" as const },
];

export function Navbar() {
  const { t, locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-gradient shadow-gold">
            <Scale className="h-5 w-5 text-deep" strokeWidth={2.2} />
          </div>
          <div className="leading-tight hidden sm:block">
            <div className="font-display text-lg font-semibold text-foreground">
              {locale === "ar" ? SITE.shortAr : SITE.shortEn}
            </div>
            <div className="text-[11px] uppercase tracking-widest text-gold">
              {locale === "ar" ? "محاماة واستشارات" : "Law & Consultancy"}
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-gold transition-colors rounded-md"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {t.nav[l.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-gold hover:bg-muted transition-colors"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
            {locale === "ar" ? "EN" : "ع"}
          </button>
          <a
            href={`tel:${SITE.phones.egyptIntl}`}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gold-gradient text-deep font-semibold text-sm shadow-gold hover:opacity-90 transition-opacity"
          >
            <Phone className="h-4 w-4" />
            {t.nav.callNow}
          </a>
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container mx-auto flex flex-col px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="py-2.5 text-sm font-medium text-foreground/80 hover:text-gold"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {t.nav[l.key]}
              </Link>
            ))}
            <button
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              className="mt-2 inline-flex items-center gap-1.5 self-start px-3 py-2 rounded-md text-sm font-medium border border-border"
            >
              <Globe className="h-4 w-4" />
              {locale === "ar" ? "English" : "العربية"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
