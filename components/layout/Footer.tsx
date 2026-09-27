import Link from "next/link";
import { mainNav, ui } from "@/content/navigation";
import { contact, whatsappHref } from "@/content/contact";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { localePath, t, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const colTitle = "mb-4 text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase";
  const link = "transition-colors hover:text-brand";

  return (
    <footer
      // Footer üstü: yuvarlak üst köşeli koyu blok. Köşe yarıçapı kadar önceki bölümün altına biner,
      // böylece köşelerin arkasında her sayfada son bölümün kendi rengi görünür.
      className="on-dark relative -mt-[var(--footer-r)] rounded-t-[var(--footer-r)] bg-[var(--footer-bg)] pt-[calc(var(--footer-r)+clamp(2rem,4vw,3rem))] pb-8 text-foreground [--footer-r:clamp(32px,4.5vw,64px)]"
    >
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.3fr]">
          <div>
            <Logo variant="white" className="h-11 w-auto" />
            <p className="text-small mt-5 max-w-xs text-muted">{t(ui.footerNote, locale)}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className={colTitle}>{t(ui.menu, locale)}</h2>
            <ul className="text-small space-y-2.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={localePath(item.href, locale)} className={link}>
                    {t(item.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={colTitle}>{t(ui.services, locale)}</h2>
            <ul className="text-small space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={localePath(`/services/${s.slug}`, locale)} className={link}>
                    {t(s.title, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={colTitle}>{t(ui.contact, locale)}</h2>
            <ul className="text-small space-y-2.5">
              <li>
                <a href={`mailto:${contact.email}`} className={link}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phone.href} className={link}>
                  {contact.phone.display}
                </a>
              </li>
              <li>
                <a href={whatsappHref(t(contact.whatsapp.message, locale))} target="_blank" rel="noopener noreferrer" className={link}>
                  WhatsApp
                </a>
              </li>
            </ul>
            <ul className="text-small mt-5 flex flex-wrap gap-x-4 gap-y-2 text-muted">
              {contact.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-small mt-14 flex flex-col gap-4 border-t border-border pt-6 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t(ui.rights, locale)}
          </p>
          <LocaleSwitcher locale={locale} label={t(ui.language, locale)} />
        </div>
      </Container>
    </footer>
  );
}
