import type { ReactNode } from "react";
import { contactSection } from "@/content/home";
import { contact, whatsappHref } from "@/content/contact";
import { services } from "@/content/services";
import { ui } from "@/content/navigation";
import { t, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RichText } from "@/components/ui/RichText";
import { Instagram, Mail, Phone, WhatsApp } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";
import { Camera3D, CameraLayer } from "@/components/motion/Camera3D";
import { ContactForm } from "./ContactForm";

/**
 * İletişim kanalları — ikonlu kartlar. Ana sayfa ve /contact sayfasında kullanılır.
 * onWhite: beyaz zemindeyse (/contact) kartlar gri, gri zemindeyse (ana sayfa) beyaz.
 */
export function ContactChannels({ locale, onWhite = false }: { locale: Locale; onWhite?: boolean }) {
  const channels: {
    label: string;
    value: string;
    href: string;
    icon: ReactNode;
  }[] = [
    {
      label: t(ui.email, locale),
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: <Mail />,
    },
    {
      label: t(ui.phone, locale),
      value: contact.phone.display,
      href: contact.phone.href,
      icon: <Phone />,
    },
    {
      label: "WhatsApp",
      value: t(ui.whatsapp, locale),
      href: whatsappHref(t(contact.whatsapp.message, locale)),
      icon: <WhatsApp />,
    },
    {
      label: "Instagram",
      value: contact.instagram.handle,
      href: contact.instagram.url,
      icon: <Instagram />,
    },
  ];
  return (
    <ul className="grid gap-3">
      {channels.map((c) => {
        const external = c.href.startsWith("http");
        return (
          <li key={c.label}>
            <a
              href={c.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              data-tilt
              className={`group relative flex items-center gap-4 rounded-2xl border border-border p-4 ${onWhite ? "bg-surface" : "bg-background"} transition-colors hover:border-brand`}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                {c.icon}
              </span>
              <span className="min-w-0">
                <span className="text-small block text-muted">{c.label}</span>
                <span className="block truncate font-medium transition-colors group-hover:text-brand">
                  {c.value}
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** İletişim bölümü: solda başlık + kanallar, sağda form. */
export function ContactSection({
  locale,
  as: Tag = "h2",
  tone = "soft",
}: {
  locale: Locale;
  as?: "h1" | "h2";
  tone?: "soft" | "default";
}) {
  const soft = tone === "soft";
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className={`relative overflow-x-clip py-[var(--section-y)] ${soft ? "bg-surface" : "bg-background"}`}
    >
      <Container>
        <Camera3D>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <CameraLayer depth={1} orbit={12}>
              <Reveal>
                {soft && (
                  <Eyebrow className="mb-3">
                    {t(contactSection.eyebrow, locale)}
                  </Eyebrow>
                )}
                <Tag
                  id="contact-title"
                  className={Tag === "h1" ? "text-h1" : "text-h2"}
                >
                  <RichText
                    text={t(
                      Tag === "h1" ? contact.page.title : contactSection.title,
                      locale,
                    )}
                  />
                </Tag>
                <p className="text-body mt-4 max-w-md text-muted">
                  {t(contactSection.description, locale)}
                </p>
                <div className="mt-10">
                  <ContactChannels locale={locale} onWhite={!soft} />
                </div>
              </Reveal>
            </CameraLayer>
            <CameraLayer depth={1.6} orbit={-16}>
              <Reveal delay={0.1}>
                <div
                  className={`rounded-[20px] border border-border p-6 md:p-9 ${soft ? "bg-background" : "bg-surface"}`}
                >
                  <ContactForm
                    locale={locale}
                    onSurface={!soft}
                    services={services.map((s) => ({
                      value: s.slug,
                      label: t(s.title, locale),
                    }))}
                  />
                </div>
              </Reveal>
            </CameraLayer>
          </div>
        </Camera3D>
      </Container>
    </section>
  );
}
