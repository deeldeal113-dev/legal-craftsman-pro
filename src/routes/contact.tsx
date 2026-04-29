import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, MessageCircle, MapPin, Mail, Send, CheckCircle2 } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { Section, SectionHeader } from "@/components/Section";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | Contact — Mohamed Khaled Mekky Law Firm" },
      { name: "description", content: "تواصل مع مكتب د. محمد خالد مكي في سوهاج، المراغة، ومكة. Contact our offices in Sohag, El Maragha, and Mecca." },
      { property: "og:title", content: "تواصل معنا | Contact Us" },
      { property: "og:description", content: "Phone, WhatsApp, address and embedded map for our offices." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(20),
  message: z.string().trim().min(10).max(1000),
});

function ContactPage() {
  const { t, locale } = useLocale();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      phone: fd.get("phone"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((iss) => { errs[iss.path[0] as string] = iss.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    // Open WhatsApp with prefilled message
    const text = encodeURIComponent(
      `${parsed.data.name} (${parsed.data.phone}):\n${parsed.data.message}`
    );
    window.open(`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}?text=${text}`, "_blank");
    setSent(true);
    (e.currentTarget as HTMLFormElement).reset();
  };

  const mecca = SITE.locations.find((l) => l.id === "mecca")!;

  return (
    <>
      <Section className="pt-12 md:pt-20 pb-0">
        <SectionHeader
          eyebrow={locale === "ar" ? "تواصل" : "Contact"}
          title={t.sections.contactTitle}
          lead={t.sections.contactLead}
        />
      </Section>

      <Section className="pt-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={onSubmit} className="lg:col-span-3 p-6 md:p-8 rounded-2xl bg-card border border-border shadow-elegant space-y-5">
            {sent && (
              <div className="flex items-center gap-2 p-3 rounded-md bg-gold/10 text-foreground border border-gold/30">
                <CheckCircle2 className="h-5 w-5 text-gold" />
                <span className="text-sm">{t.contact.sent}</span>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1.5">{t.contact.name}</label>
              <input
                name="name" type="text" required maxLength={100}
                className="w-full px-4 py-2.5 rounded-md bg-background border border-input focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none"
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">{t.contact.phone}</label>
              <input
                name="phone" type="tel" required maxLength={20}
                className="w-full px-4 py-2.5 rounded-md bg-background border border-input focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none"
                dir="ltr"
              />
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">{t.contact.message}</label>
              <textarea
                name="message" required rows={5} maxLength={1000}
                className="w-full px-4 py-2.5 rounded-md bg-background border border-input focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none resize-none"
              />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>
            <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gold-gradient text-deep font-semibold shadow-gold hover:opacity-90 transition-opacity">
              <Send className="h-4 w-4" /> {t.contact.submit}
            </button>
          </form>

          {/* Quick contacts */}
          <aside className="lg:col-span-2 space-y-4">
            <a href={`tel:${SITE.phones.egyptIntl}`} className="flex items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-gold/50 transition-colors">
              <span className="h-11 w-11 rounded-md bg-gold-gradient flex items-center justify-center"><Phone className="h-5 w-5 text-deep" /></span>
              <div>
                <div className="text-xs text-muted-foreground">{t.contact.callEgypt}</div>
                <div className="font-semibold" dir="ltr">{SITE.phones.egyptIntl}</div>
              </div>
            </a>
            <a href={`tel:${SITE.phones.saudiIntl}`} className="flex items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-gold/50 transition-colors">
              <span className="h-11 w-11 rounded-md bg-gold-gradient flex items-center justify-center"><Phone className="h-5 w-5 text-deep" /></span>
              <div>
                <div className="text-xs text-muted-foreground">{t.contact.callSaudi}</div>
                <div className="font-semibold" dir="ltr">{SITE.phones.saudiIntl}</div>
              </div>
            </a>
            <a href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/40 hover:bg-[#25D366]/20 transition-colors">
              <span className="h-11 w-11 rounded-md bg-[#25D366] flex items-center justify-center"><MessageCircle className="h-5 w-5 text-white" /></span>
              <div>
                <div className="text-xs text-muted-foreground">WhatsApp</div>
                <div className="font-semibold">{t.contact.whatsapp}</div>
              </div>
            </a>
          </aside>
        </div>

        {/* Locations */}
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {SITE.locations.map((l) => (
            <div key={l.id} className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-gold" />
                <h3 className="font-display text-lg font-semibold">
                  {locale === "ar" ? l.cityAr : l.cityEn}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{locale === "ar" ? l.addressAr : l.addressEn}</p>
              <a href={`tel:${l.phone}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:underline" dir="ltr">
                <Phone className="h-4 w-4" /> {l.phone}
              </a>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-border shadow-elegant">
          <iframe
            title="Mecca office map"
            src={`https://maps.google.com/maps?q=${mecca.geo.lat},${mecca.geo.lng}&z=15&output=embed`}
            width="100%" height="420" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0 }}
          />
        </div>
      </Section>
    </>
  );
}
