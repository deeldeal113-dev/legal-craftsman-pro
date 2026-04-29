import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { LocaleProvider } from "@/lib/locale-context";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsappButton } from "@/components/WhatsappButton";
import { JsonLd } from "@/components/JsonLd";
import { legalServiceJsonLd } from "@/lib/structured-data";
import { SITE } from "@/lib/site-config";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الصفحة غير موجودة. The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-deep shadow-gold"
          >
            الرئيسية / Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "د. محمد خالد مكي للمحاماة | Dr. Mohamed Khaled Mekky Law Firm" },
      {
        name: "description",
        content:
          "مكتب الدكتور محمد خالد مكي للمحاماة والاستشارات القانونية في سوهاج، المراغة، ومكة المكرمة. Lawyer in Sohag and Mecca — legal consultancy across Egypt and Saudi Arabia.",
      },
      { name: "author", content: "Dr. Mohamed Khaled Mekky" },
      { name: "keywords", content: "محامي في سوهاج, محامي في مكة, lawyer in Sohag, lawyer in Mecca, محمد خالد مكي, استشارات قانونية" },
      { name: "robots", content: "index, follow" },
      { name: "geo.region", content: "EG-SHG" },
      { name: "geo.placename", content: "Sohag, Egypt; Mecca, Saudi Arabia" },
      { property: "og:title", content: "د. محمد خالد مكي للمحاماة | Dr. Mohamed Khaled Mekky Law Firm" },
      { property: "og:description", content: "A professional, multilingual lawyer website for Dr. Mohamed Khaled Mekky, showcasing services and expertise." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE.url },
      { property: "og:image", content: `${SITE.url}/images/og-image.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "د. محمد خالد مكي للمحاماة | Dr. Mohamed Khaled Mekky Law Firm" },
      { name: "twitter:description", content: "A professional, multilingual lawyer website for Dr. Mohamed Khaled Mekky, showcasing services and expertise." },
      { name: "twitter:image", content: `${SITE.url}/images/og-image.jpg` },
      { name: "description", content: "A professional, multilingual lawyer website for Dr. Mohamed Khaled Mekky, showcasing services and expertise." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/782d78ea-d241-4ace-a005-e2f44a5de2bf/id-preview-2911b766--1bf04be6-2e44-42d7-990e-01e6d9587c18.lovable.app-1777458795434.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/782d78ea-d241-4ace-a005-e2f44a5de2bf/id-preview-2911b766--1bf04be6-2e44-42d7-990e-01e6d9587c18.lovable.app-1777458795434.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE.url },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Cairo:wght@400;600;700&family=Playfair+Display:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LocaleProvider>
      <JsonLd data={legalServiceJsonLd()} />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <WhatsappButton />
      </div>
    </LocaleProvider>
  );
}
