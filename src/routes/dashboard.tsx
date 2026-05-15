import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  Users,
  MessageCircle,
  Scale,
  TrendingUp,
  Calendar,
  Phone,
  MapPin,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { POSTS, CATEGORIES } from "@/lib/blog-data";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم | Dashboard — Mohamed Khaled Law" },
      { name: "description", content: "Internal overview dashboard for the law firm." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { locale } = useLocale();
  const isAr = locale === "ar";

  const stats = [
    {
      label: isAr ? "المقالات المنشورة" : "Published Articles",
      value: POSTS.length,
      icon: FileText,
      delta: "+2",
    },
    {
      label: isAr ? "الفروع" : "Office Branches",
      value: SITE.locations.length,
      icon: MapPin,
      delta: isAr ? "نشطة" : "Active",
    },
    {
      label: isAr ? "الاستشارات (شهرياً)" : "Consultations / mo",
      value: 124,
      icon: Users,
      delta: "+18%",
    },
    {
      label: isAr ? "رسائل واتساب" : "WhatsApp Messages",
      value: 47,
      icon: MessageCircle,
      delta: "+9",
    },
  ];

  const recentInquiries = [
    {
      name: isAr ? "أحمد محمد" : "Ahmed Mohamed",
      subject: isAr ? "استشارة أحوال شخصية" : "Personal Status Consultation",
      time: isAr ? "منذ ساعتين" : "2h ago",
      city: isAr ? "سوهاج" : "Sohag",
    },
    {
      name: isAr ? "سارة علي" : "Sara Ali",
      subject: isAr ? "نزاع عقاري" : "Real Estate Dispute",
      time: isAr ? "منذ 5 ساعات" : "5h ago",
      city: isAr ? "مكة" : "Mecca",
    },
    {
      name: isAr ? "خالد إبراهيم" : "Khaled Ibrahim",
      subject: isAr ? "تأسيس شركة" : "Company Formation",
      time: isAr ? "أمس" : "Yesterday",
      city: isAr ? "المراغة" : "El Maragha",
    },
  ];

  return (
    <section className="bg-background min-h-screen py-10 md:py-14">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold">
              {isAr ? "نظرة عامة" : "Overview"}
            </p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
              {isAr ? "لوحة التحكم" : "Dashboard"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isAr
                ? "ملخص أداء المكتب والمحتوى والاستشارات."
                : "Summary of firm performance, content, and consultations."}
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-4 py-2 text-sm font-semibold text-deep shadow-gold"
          >
            <Phone className="h-4 w-4" />
            {isAr ? "حجز جديد" : "New Booking"}
          </Link>
        </header>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-5 rounded-xl bg-card border border-border hover:border-gold/40 hover:shadow-elegant transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-lg bg-gold-gradient flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-deep" />
                </div>
                <span className="text-xs font-semibold text-gold inline-flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> {s.delta}
                </span>
              </div>
              <div className="mt-4 text-2xl md:text-3xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* 2-column area */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Recent posts */}
          <div className="lg:col-span-2 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-gold" />
                {isAr ? "أحدث المقالات" : "Recent Articles"}
              </h2>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:underline"
              >
                {isAr ? "عرض الكل" : "View all"} <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <ul className="divide-y divide-border">
              {POSTS.slice(0, 5).map((p) => (
                <li key={p.slug} className="flex items-center gap-4 p-4 hover:bg-secondary/40 transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Scale className="h-5 w-5 text-gold" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="block font-medium text-sm text-foreground hover:text-gold truncate"
                    >
                      {isAr ? p.ar.title : p.en.title}
                    </Link>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {p.date}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[10px] font-semibold uppercase tracking-wider">
                        {isAr ? CATEGORIES[p.category].ar : CATEGORIES[p.category].en}
                      </span>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="h-3 w-3" /> {Math.floor(Math.random() * 800) + 120}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent inquiries */}
          <div className="rounded-xl bg-card border border-border">
            <div className="p-5 border-b border-border">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-gold" />
                {isAr ? "آخر الاستفسارات" : "Recent Inquiries"}
              </h2>
            </div>
            <ul className="divide-y divide-border">
              {recentInquiries.map((i) => (
                <li key={i.name} className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{i.name}</p>
                    <span className="text-[10px] text-muted-foreground">{i.time}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{i.subject}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-gold">
                    <MapPin className="h-3 w-3" /> {i.city}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Branches snapshot */}
        <div className="rounded-xl bg-card border border-border">
          <div className="p-5 border-b border-border">
            <h2 className="font-display text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gold" />
              {isAr ? "الفروع" : "Branches"}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {SITE.locations.map((l) => (
              <div key={l.id} className="p-5 bg-card">
                <h3 className="font-semibold text-foreground">
                  {isAr ? l.cityAr : l.cityEn}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isAr ? l.countryAr : l.countryEn}
                </p>
                <a
                  href={`tel:${l.phone}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm text-gold hover:underline"
                >
                  <Phone className="h-3.5 w-3.5" /> {l.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
