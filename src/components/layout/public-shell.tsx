import { Link, Outlet, useParams } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

const NAV = [
  { to: "/$lang/about", label: "About" },
  { to: "/$lang/service", label: "Services" },
  { to: "/$lang/fields", label: "Fields" },
  { to: "/$lang/lawyers", label: "Lawyers" },
  { to: "/$lang/posts", label: "Posts" },
  { to: "/$lang/contact", label: "Contact" },
] as const;

const FOOTER = [
  { to: "/$lang/privacy", label: "Privacy" },
  { to: "/$lang/terms-and-conditions", label: "Terms" },
  { to: "/$lang/help-center", label: "Help center" },
] as const;

export function PublicShell() {
  const { lang } = useParams({ from: "/$lang/_public" });
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
          <Link to="/$lang" params={{ lang }} className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
              <Scale className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">LexOffice</span>
          </Link>
          <nav className="ms-6 hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                params={{ lang }}
                activeProps={{ className: "bg-accent text-foreground" }}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ms-auto flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              to="/$lang/dashboard"
              params={{ lang }}
              className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 md:px-6 md:py-14">
        <Outlet />
      </main>
      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground md:px-6">
          <span>© {new Date().getFullYear()} LexOffice</span>
          <nav className="flex flex-wrap items-center gap-4">
            {FOOTER.map((n) => (
              <Link key={n.to} to={n.to} params={{ lang }} className="hover:text-foreground">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
