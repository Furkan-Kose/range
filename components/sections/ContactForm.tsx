"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/contact";
import { t, type Locale } from "@/lib/i18n";

type Status = "idle" | "sending" | "sent";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

/**
 * İletişim formu — şimdilik sadece frontend.
 * Backend eklemek için: aşağıdaki `submitForm` fonksiyonunu bir API route'a
 * (ör. app/api/contact/route.ts) veya form servisine istek atacak şekilde değiştir.
 */
async function submitForm(data: Record<string, string>) {
  // TODO: gerçek gönderim (API route / e-posta servisi)
  console.info("[contact form]", data);
  await new Promise((r) => setTimeout(r, 600));
}

const inputCls =
  "w-full rounded-[10px] border border-border bg-surface px-3.5 py-3 text-[1rem] outline-none transition-colors focus:border-brand focus:bg-background aria-[invalid=true]:border-red-500";

export function ContactForm({ locale, services }: { locale: Locale; services: { value: string; label: string }[] }) {
  const f = contact.page.form;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = t(f.required, locale);
    if (!data.email?.trim()) next.email = t(f.required, locale);
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = t(f.invalidEmail, locale);
    if (!data.message?.trim()) next.message = t(f.required, locale);
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    await submitForm(data);
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl bg-brand-soft p-6">
        <p className="text-h3 text-brand">{t(f.success, locale)}</p>
      </div>
    );
  }

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
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "text", true)}
        {field("company")}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("email", "email", true)}
        {field("phone", "tel")}
      </div>

      <fieldset>
        <legend className="mb-2 text-[0.875rem] font-medium">{t(f.service, locale)}</legend>
        <div className="flex flex-wrap gap-2">
          {[...services, { value: "other", label: t(f.serviceOther, locale) }].map((s) => (
            <label key={s.value} className="cursor-pointer">
              <input type="checkbox" name={`service_${s.value}`} value={s.label} className="peer sr-only" />
              <span className="inline-block rounded-full border border-border px-4 py-2 text-sm transition-colors peer-checked:border-brand peer-checked:bg-brand peer-checked:text-brand-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand hover:border-brand">
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

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-[0.9375rem] font-semibold text-brand-foreground transition-[filter] hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? t(f.sending, locale) : t(f.submit, locale)} <span aria-hidden>→</span>
      </button>
    </form>
  );
}
