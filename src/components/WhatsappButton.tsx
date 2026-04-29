import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site-config";
import { useLocale } from "@/lib/locale-context";

export function WhatsappButton() {
  const { locale } = useLocale();
  const number = SITE.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(
    locale === "ar"
      ? "السلام عليكم، أرغب في حجز استشارة قانونية."
      : "Hello, I would like to book a legal consultation."
  );
  return (
    <a
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 z-40 flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-elegant hover:scale-105 transition-transform"
      style={{ insetInlineEnd: "1.5rem" }}
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40" aria-hidden />
    </a>
  );
}
