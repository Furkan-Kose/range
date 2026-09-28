import { contact, whatsappHref } from "@/content/contact";
import { ui } from "@/content/navigation";
import { t, type Locale } from "@/lib/i18n";
import { Phone, WhatsApp } from "@/components/ui/icons";

/**
 * Sabit iletişim butonları — her sayfada sağ altta: üstte arama (beyaz), altta WhatsApp (yeşil, nabız halkası).
 * Masaüstünde üzerine gelince solda etiket kayarak çıkar. Açılış animasyonu sürerken gizli (globals.css → "SABİT İLETİŞİM").
 * Mobil menü (z-40) ve video lightbox'ı bunların üstünde kalır.
 */
export function FloatingContact({ locale }: { locale: Locale }) {
  const label =
    "pointer-events-none absolute top-1/2 right-full mr-3 hidden -translate-y-1/2 translate-x-2 rounded-lg bg-[#101110] px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-[opacity,translate] duration-300 ease-brand group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block";

  return (
    <div className="fab fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 flex flex-col items-center gap-3 md:right-6 md:bottom-6">
      <a
        href={contact.phone.href}
        aria-label={t(ui.call, locale)}
        className="group relative grid size-12 place-items-center rounded-full border border-border bg-background text-brand shadow-[0_8px_24px_-8px_rgb(0_0_0/0.25)] transition-[scale,box-shadow] duration-300 ease-brand hover:scale-110 hover:shadow-[0_10px_28px_-8px_var(--brand)]"
      >
        <Phone width={20} height={20} />
        <span className={label}>{t(ui.callNow, locale)}</span>
      </a>
      <a
        href={whatsappHref(t(contact.whatsapp.message, locale))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t(ui.whatsapp, locale)}
        className="group fab-pulse relative grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_28px_-8px_rgb(37_211_102/0.7)] transition-[scale] duration-300 ease-brand hover:scale-110"
      >
        <WhatsApp width={26} height={26} />
        <span className={label}>{t(ui.whatsappChat, locale)}</span>
      </a>
    </div>
  );
}
