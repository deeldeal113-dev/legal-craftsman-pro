import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImage from "@/assets/legal-hero.jpg.asset.json";

import {
  Scale,
  Gavel,
  Briefcase,
  FileText,
  Users,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Download,
  ArrowRight,
  UserPlus,
  Search,
  Handshake,
  CheckCircle2,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Building2,
  Landmark,
  BookOpen,
  Home as HomeIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export const Route = createFileRoute("/$lang/")({
  head: () => ({
    meta: [
      { title: "LexOffice — Legal Practice Management Platform" },
      {
        name: "description",
        content:
          "Connect law offices, lawyers, and clients on one platform. Manage cases, documents, hearings, and billing — with an AI assistant and multi-language support.",
      },
      { property: "og:title", content: "LexOffice — Legal Practice Management Platform" },
      {
        property: "og:description",
        content:
          "One workspace for cases, clients, documents, hearings and billing across your law office.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <ServiceCards />
      <FieldsCards />
      <PostsCards />
      <HowItWorks />
      <InstallApp />
      <CTA />
      <SiteFooter />
    </div>
  );
}

/* ----------------------------- Header ----------------------------- */

function SiteHeader() {
  const { lang } = useParams({ from: "/$lang/" });
  const nav = [
    { label: "Services", href: "#services" },
    { label: "Fields", href: "#fields" },
    { label: "Insights", href: "#posts" },
    { label: "How it works", href: "#how" },
  ];
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link to="/$lang" params={{ lang }} className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <Scale className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">LexOffice</span>
        </Link>
        <nav className="ms-6 hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            to="/$lang/dashboard" params={{ lang }}
            className="hidden rounded-md border border-input px-3 py-2 text-sm font-medium hover:bg-accent sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            to="/$lang/dashboard" params={{ lang }}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Get started <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------ Hero ------------------------------ */

function Hero() {
  const { lang } = useParams({ from: "/$lang/" });

  return (
    <section className="relative isolate overflow-hidden border-b border-border/60">
      {/* Cover image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage.url}
          alt="Scales of justice and gavel on a wooden desk"
          className="h-full w-full object-cover animate-slow-zoom"
          loading="eager"
        />
        {/* Layered overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-e from-background/85 via-background/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-36 lg:py-44">
        <div className="max-w-2xl animate-fade-in-up">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-primary" />
            AI-assisted legal workflow
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Run your legal practice —{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
              without the paperwork.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-foreground/80 md:text-lg">
            LexOffice brings law offices, lawyers, employees, and clients together in one
            multi-tenant workspace. Manage cases, documents, hearings, and billing with an AI
            assistant, in 7 languages including full RTL Arabic.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/$lang/dashboard" params={{ lang }}
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/40"
            >
              Start free{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-md border border-input bg-background/60 px-5 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-accent"
            >
              See how it works
            </a>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border/60 pt-6 text-sm">
            {[
              { k: "Law offices", v: "1,200+" },
              { k: "Cases handled", v: "84k" },
              { k: "Languages", v: "7" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="text-muted-foreground">{s.k}</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}



/* --------------------------- Service Cards --------------------------- */

const SERVICES = [
  {
    icon: Scale,
    title: "Case management",
    desc: "Full lifecycle tracking — intake, filings, hearings, deadlines and outcomes.",
  },
  {
    icon: FileText,
    title: "Document vault",
    desc: "Versioned files, e-signatures, and per-case permissions with audit trails.",
  },
  {
    icon: Users,
    title: "Client portal",
    desc: "Individual and organizational clients get a secure view of their matters.",
  },
  {
    icon: Gavel,
    title: "Hearings & calendar",
    desc: "Court dates, reminders, and conflict detection across your team.",
  },
  {
    icon: Briefcase,
    title: "Billing & invoicing",
    desc: "Time tracking, retainers, and installment plans — with multi-currency.",
  },
  {
    icon: Sparkles,
    title: "AI assistant",
    desc: "Summarize documents, draft motions, and answer case questions safely.",
  },
];

function ServiceCards() {
  return (
    <section id="services" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <SectionHeader
          eyebrow="Services"
          title="Everything a modern law office needs"
          subtitle="Purpose-built modules that replace scattered tools with one connected workspace."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Fields Cards ---------------------------- */

const FIELDS = [
  { icon: Building2, title: "Corporate", tag: "M&A · Compliance" },
  { icon: HomeIcon, title: "Real estate", tag: "Contracts · Disputes" },
  { icon: Users, title: "Family law", tag: "Custody · Estate" },
  { icon: Landmark, title: "Public & admin", tag: "Regulatory" },
  { icon: ShieldCheck, title: "Criminal defense", tag: "Trials · Appeals" },
  { icon: BookOpen, title: "Intellectual property", tag: "Trademarks · Patents" },
  { icon: Briefcase, title: "Labor & employment", tag: "HR · Litigation" },
  { icon: Gavel, title: "Civil litigation", tag: "Torts · Contracts" },
];

function FieldsCards() {
  return (
    <section id="fields" className="border-b border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <SectionHeader
          eyebrow="Practice fields"
          title="Built for every area of law"
          subtitle="Configurable workflows adapt to how your team practices — not the other way around."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {FIELDS.map(({ icon: Icon, title, tag }) => (
            <div
              key={title}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-transform hover:-translate-y-0.5"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{title}</div>
                <div className="truncate text-xs text-muted-foreground">{tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Posts Cards ----------------------------- */

const POSTS = [
  {
    tag: "Guide",
    date: "Jul 18, 2026",
    title: "Building a paperless intake process that clients actually love",
    excerpt:
      "A five-step framework for digitizing client onboarding without losing the human touch.",
  },
  {
    tag: "Case study",
    date: "Jul 02, 2026",
    title: "How Al-Nour Legal cut hearing prep time by 40%",
    excerpt:
      "Centralized documents, AI summaries, and shared calendars reshaped a 30-lawyer practice.",
  },
  {
    tag: "Product",
    date: "Jun 21, 2026",
    title: "New: multi-currency billing and installment plans",
    excerpt: "Bill clients in their currency, track retainers, and automate reminders.",
  },
];

function PostsCards() {
  return (
    <section id="posts" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader
            eyebrow="From the blog"
            title="Insights for modern law offices"
            subtitle="Playbooks, product news, and stories from firms running on LexOffice."
            align="start"
          />
          <a
            href="#"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            All posts <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </a>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {POSTS.map((p) => (
            <article
              key={p.title}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
            >
              <div
                className="aspect-[16/9] w-full"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary) / 0.25), hsl(var(--accent) / 0.2))",
                }}
              />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                    {p.tag}
                  </span>
                  <span>{p.date}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Read more <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- How It Works ----------------------------- */

const STEPS = [
  {
    icon: UserPlus,
    title: "Create your workspace",
    desc: "Invite lawyers, staff, and clients. Roles and permissions ready out of the box.",
  },
  {
    icon: Search,
    title: "Import your cases",
    desc: "Bring in existing matters, documents, and contacts. Nothing gets left behind.",
  },
  {
    icon: Handshake,
    title: "Collaborate & bill",
    desc: "Work with your team and clients, and get paid — all from one place.",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="border-b border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <SectionHeader
          eyebrow="How it works"
          title="Up and running in three steps"
          subtitle="No consultants. No migration nightmares. Just a workspace your team will actually use."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-xl border border-border bg-card p-6"
            >
              <div className="absolute -top-3 start-6 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                Step {i + 1}
              </div>
              <s.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------ Install App ------------------------------ */

function InstallApp() {
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop">("desktop");
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/iphone|ipad|ipod/i.test(ua)) setPlatform("ios");
    else if (/android/i.test(ua)) setPlatform("android");
  }, []);

  return (
    <section className="border-b border-border/60">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Smartphone className="h-3.5 w-3.5" />
            Progressive Web App
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Install LexOffice on your phone
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Access your cases and clients on the go. Add LexOffice to your home screen for a
            native-app feel — no store required.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <InstallCard
              active={platform === "ios"}
              title="iPhone / iPad"
              steps={["Open in Safari", "Tap Share", "Add to Home Screen"]}
            />
            <InstallCard
              active={platform === "android"}
              title="Android"
              steps={["Open in Chrome", "Tap ⋮ menu", "Install app"]}
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <Download className="h-4 w-4" /> Install app
            </button>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2.5 text-sm font-semibold hover:bg-accent"
            >
              View setup guide
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="relative rounded-[2.5rem] border border-border bg-card p-3 shadow-2xl">
            <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-muted-foreground/30" />
            <div className="overflow-hidden rounded-[2rem] border border-border bg-background">
              <div className="border-b border-border px-4 py-3">
                <div className="text-xs text-muted-foreground">Good morning</div>
                <div className="text-base font-semibold">Sara Al-Amin</div>
              </div>
              <div className="grid grid-cols-2 gap-3 p-4">
                {[
                  { l: "Cases", v: "24", i: Scale },
                  { l: "Tasks", v: "12", i: FileText },
                  { l: "Hearings", v: "3", i: Gavel },
                  { l: "Invoices", v: "5", i: Briefcase },
                ].map(({ l, v, i: Icon }) => (
                  <div key={l} className="rounded-lg border border-border p-3">
                    <Icon className="h-4 w-4 text-primary" />
                    <div className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {l}
                    </div>
                    <div className="text-lg font-semibold">{v}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
                Next hearing: Tomorrow · 10:30 AM
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstallCard({
  active,
  title,
  steps,
}: {
  active: boolean;
  title: string;
  steps: string[];
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        active ? "border-primary bg-primary/5" : "border-border bg-card"
      }`}
    >
      <div className="text-sm font-semibold">{title}</div>
      <ol className="mt-2 space-y-1 text-xs text-muted-foreground">
        {steps.map((s, i) => (
          <li key={s} className="flex items-start gap-2">
            <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* --------------------------------- CTA --------------------------------- */

function CTA() {
  const { lang } = useParams({ from: "/$lang/" });
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div
          className="relative overflow-hidden rounded-2xl border border-border p-10 md:p-16"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.15))",
          }}
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to run a better legal practice?
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Start your workspace today. No credit card required — bring your team, your cases,
              and your clients together in minutes.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {[
                "14-day free trial",
                "Unlimited team members",
                "Priority onboarding",
                "Cancel anytime",
              ].map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/$lang/dashboard" params={{ lang }}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Get started free <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-5 py-3 text-sm font-semibold hover:bg-accent"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Footer -------------------------------- */

function SiteFooter() {
  const cols = [
    {
      title: "Product",
      links: ["Services", "Fields", "Pricing", "Changelog"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Contact", "Press"],
    },
    {
      title: "Resources",
      links: ["Blog", "Docs", "Support", "Status"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Security", "DPA"],
    },
  ];
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
                <Scale className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold">LexOffice</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A multi-tenant legal practice management platform for law offices, lawyers, and
              clients — cases, documents, hearings, and billing in one place.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { Icon: Twitter, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Github, href: "#" },
                { Icon: Mail, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-semibold">{c.title}</div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} LexOffice. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------- Helpers ------------------------------- */

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
}) {
  const alignCls =
    align === "center" ? "text-center items-center mx-auto" : "text-start items-start";
  return (
    <div className={`flex max-w-2xl flex-col ${alignCls}`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
