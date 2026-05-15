import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-icon.jpeg";

const links = [
  { to: "/", key: "home" as const },
  { to: "/about", key: "about" as const },
  { to: "/services", key: "services" as const },
  { to: "/blog", key: "blog" as const },
  { to: "/fields", key: "fields" as const },
  { to: "/faq", key: "faq" as const },
  { to: "/contact", key: "contact" as const },
];

export function Navbar() {
  const { t, locale, setLocale } = useLocale();
  const { theme, toggle: toggleTheme } = useTheme();
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
    <header className="sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 pt-3 pb-2">
        <div
          className={cn(
            "relative flex items-center justify-between gap-4 rounded-full border border-white/10 px-3 py-2 md:px-4 md:py-2.5 transition-all duration-300",
            scrolled
              ? "bg-deep/95 backdrop-blur-xl shadow-elegant"
              : "bg-deep/85 backdrop-blur-md"
          )}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src={logo}
              alt="Mohamed Khaled Law"
              className="h-9 md:h-10 w-9 md:w-10 rounded-full object-cover ring-1 ring-gold/40"
            />
          </Link>

          {/* Centered nav */}
          <nav className="hidden lg:flex items-center gap-1 mx-auto">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-4 py-2 text-sm font-medium text-white/75 hover:text-white transition-colors rounded-full"
                activeProps={{
                  className:
                    "bg-white/10 text-white shadow-inner ring-1 ring-white/10",
                }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {t.nav[l.key]}
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center h-8 w-8 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Switch language"
            >
              <Globe className="h-3.5 w-3.5" />
              {locale === "ar" ? "EN" : "ع"}
            </button>
            <button
              className="lg:hidden p-2 rounded-full hover:bg-white/10 text-white"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden mb-2 rounded-2xl border border-white/10 bg-deep/95 backdrop-blur-xl shadow-elegant">
            <nav className="flex flex-col p-3">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/5"
                  activeProps={{ className: "bg-white/10 text-white" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {t.nav[l.key]}
                </Link>
              ))}
              <button
                onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
                className="mt-2 inline-flex items-center gap-1.5 self-start px-3 py-2 rounded-full text-sm font-medium border border-white/15 text-white/90"
              >
                <Globe className="h-4 w-4" />
                {locale === "ar" ? "English" : "العربية"}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
