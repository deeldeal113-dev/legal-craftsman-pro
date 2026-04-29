import { SITE } from "./site-config";

export function legalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: SITE.nameEn,
    alternateName: SITE.nameAr,
    url: SITE.url,
    image: `${SITE.url}/images/og-image.jpg`,
    telephone: SITE.phones.egyptIntl,
    priceRange: "$$",
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      { "@type": "Country", name: "Saudi Arabia" },
    ],
    sameAs: [SITE.facebook],
    founder: {
      "@type": "Person",
      name: "Dr. Mohamed Khaled Mekky",
      alternateName: "د. محمد خالد مكي",
      jobTitle: "Attorney at Law",
      memberOf: { "@type": "Organization", name: "Egyptian Society of International Law" },
      sameAs: [SITE.facebook],
    },
    address: SITE.locations.map((l) => ({
      "@type": "PostalAddress",
      streetAddress: l.addressEn,
      addressLocality: l.cityEn,
      addressCountry: l.countryEn,
    })),
    location: SITE.locations.map((l) => ({
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#${l.id}`,
      name: `${SITE.nameEn} — ${l.cityEn}`,
      telephone: l.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: l.addressEn,
        addressLocality: l.cityEn,
        addressCountry: l.countryEn,
      },
      geo: { "@type": "GeoCoordinates", latitude: l.geo.lat, longitude: l.geo.lng },
    })),
  };
}

export function faqJsonLd(faqs: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
