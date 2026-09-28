"use client";

import { useRef, useState } from "react";
import { contact, whatsappHref } from "@/content/contact";
import { t, type Locale } from "@/lib/i18n";
import { Mail, WhatsApp } from "@/components/ui/icons";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Channel = "mail" | "whatsapp";

const inputBase =
  "w-full rounded-[10px] border border-border px-3.5 py-3 text-[1rem] outline-none transition-colors focus:border-brand aria-[invalid=true]:border-red-500";

/**
 * İletişim formu — sunucuya gönderim YOK. Form doldurulunca iki buton:
 * - "Mail ile Gönder": ziyaretçinin e-posta uygulamasını, konu ve mesaj hazır şekilde açar (mailto:)
 * - "WhatsApp ile Gönder": WhatsApp'ı mesaj yazılı şekilde açar (wa.me)
 * Alıcı bilgileri content/contact.ts'den (email, whatsapp.number) gelir.
 *
 * onSurface: form gri (surface) bir kartın içindeyse (/contact sayfası) → alanlar beyaz.
 * Beyaz kart içinde (ana sayfa) → alanlar gri, odakta beyaz.
 */
export function ContactForm({
  locale,
  services,
  onSurface = false,
}: {
  locale: Locale;
  services: { value: string; label: string }[];
  onSurface?: boolean;
}) {
  const inputCls = `${inputBase} ${onSurface ? "bg-background" : "bg-surface focus:bg-background"}`;
  const f = contact.page.form;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});

  /** Formu okuyup doğrular; geçerliyse okunabilir bir mesaj metni döndürür. */
  const compose = () => {
    const form = formRef.current;
    if (!form) return null;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const data = { name: get("name"), company: get("company"), email: get("email"), phone: get("phone"), message: get("message") };
    const picked = [...fd.entries()].filter(([k]) => k.startsWith("service_")).map(([, v]) => String(v));

    const next: Errors = {};
    if (!data.name) next.name = t(f.required, locale);
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) next.email = t(f.invalidEmail, locale);
    if (!data.message) next.message = t(f.required, locale);
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return null;
    }

    const L = (k: keyof typeof f) => t(f[k] as { tr: string; en: string }, locale);
    const lines = [
      t(f.greeting, locale),
      "",
      data.message,
      "",
      `${L("name")}: ${data.name}`,
      data.company ? `${L("company")}: ${data.company}` : null,
      data.email ? `${L("email")}: ${data.email}` : null,
      data.phone ? `${L("phone")}: ${data.phone}` : null,
      picked.length ? `${L("service")}: ${picked.join(", ")}` : null,
    ].filter((l): l is string => l !== null); // boş bırakılan alanlar mesaja girmez
    return { text: lines.join("\n"), subject: `${t(f.mailSubject, locale)} — ${data.name}` };
  };

  const send = (channel: Channel) => {
    const msg = compose();
    if (!msg) return;
    if (channel === "mail") {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(msg.subject)}&body=${encodeURIComponent(msg.text)}`;
    } else {
      window.open(whatsappHref(msg.text), "_blank", "noopener,noreferrer");
    }
  };

  const field = (name: "name" | "company" | "email" | "phone", type = "text", required = false) => {
    const err = errors[name as keyof Errors];
    return (
      <label className="grid gap-2 text-[0.875rem] font-medium">
        <span>
          {t(f[name], locale)}
          {required && <span className="text-brand"> *</span>}
        </span>
        <input
          name={name}
          type={type}
          autoComplete={name === "name" ? "name" : name === "company" ? "organization" : name === "email" ? "email" : "tel"}
          aria-invalid={err ? true : undefined}
          className={inputCls}
        />
        {err && <span className="text-xs text-red-500">{err}</span>}
      </label>
    );
  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        send("mail");
      }}
      noValidate
      className="grid gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "text", true)}
        {field("company")}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("email", "email")}
        {field("phone", "tel")}
      </div>

      <fieldset>
        <legend className="mb-2 text-[0.875rem] font-medium">{t(f.service, locale)}</legend>
        <div className="flex flex-wrap gap-2">
          {[...services, { value: "other", label: t(f.serviceOther, locale) }].map((s) => (
            <label key={s.value} className="cursor-pointer">
              <input type="checkbox" name={`service_${s.value}`} value={s.label} className="peer sr-only" />
              <span className={`inline-block rounded-full border border-border px-4 py-2 text-sm ${onSurface ? "bg-background" : "bg-surface"} transition-colors peer-checked:border-brand peer-checked:bg-brand peer-checked:text-brand-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand hover:border-brand`}>
                {s.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-2 text-[0.875rem] font-medium">
        <span>
          {t(f.message, locale)}
          <span className="text-brand"> *</span>
        </span>
        <textarea name="message" rows={5} aria-invalid={errors.message ? true : undefined} className={`${inputCls} resize-none`} />
        {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
      </label>

      {/* Gönderim: e-posta uygulaması veya WhatsApp, mesaj hazır şekilde açılır */}
      <div className="mt-1 grid gap-3 sm:grid-cols-2">
        <button
          type="submit"
          data-tilt="sm"
          className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-brand px-6 py-3.5 text-[0.9375rem] font-semibold text-brand-foreground transition-[filter] hover:brightness-110"
        >
          <Mail width={18} height={18} /> {t(f.sendMail, locale)}
        </button>
        <button
          type="button"
          onClick={() => send("whatsapp")}
          data-tilt="sm"
          className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#25d366] px-6 py-3.5 text-[0.9375rem] font-semibold text-[#0b3d22] transition-[filter] hover:brightness-105"
        >
          <WhatsApp width={18} height={18} /> {t(f.sendWhatsapp, locale)}
        </button>
      </div>
      <p className="text-small -mt-1 text-muted">{t(f.sendNote, locale)}</p>
    </form>
  );
}
