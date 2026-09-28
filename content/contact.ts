// İletişim bilgileri — navbar, footer, iletişim bölümü ve /contact sayfası buradan okur.
// TODO: adres ve diğer sosyal medya hesapları (LinkedIn/YouTube/Vimeo) eklenecek.

export const contact = {
  phone: {
    display: "0539 844 45 21",
    href: "tel:+905398444521",
  },
  whatsapp: {
    // ülke kodu ile, boşluksuz
    number: "905398444521",
    message: {
      tr: "Merhaba Range Media, bir proje hakkında görüşmek istiyorum.",
      en: "Hi Range Media, I'd like to talk about a project.",
    },
  },
  email: "range.media0@gmail.com",
  address: {
    tr: "Adres eklenecek", // TODO: açık adres
    en: "Address to be added",
  },
  instagram: {
    handle: "@range.media",
    url: "https://www.instagram.com/range.media/",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/range.media/" },
    // TODO: varsa ekle → { label: "LinkedIn", href: "https://www.linkedin.com/company/..." }
  ],

  // /contact sayfası metinleri
  page: {
    eyebrow: { tr: "İletişim", en: "Contact" },
    socialLabel: { tr: "Sosyal medya", en: "Social" },
    title: {
      tr: "Projenizi *konuşalım.*",
      en: "Let's talk about *your project.*",
    },
    description: {
      tr: "Projenizi, hedefinizi ya da yalnızca aklınızdaki fikri anlatın. Size en kısa sürede dönüş yapalım.",
      en: "Tell us about your project, your goal or simply the idea on your mind. We'll get back to you shortly.",
    },
    form: {
      name: { tr: "Ad Soyad", en: "Full name" },
      company: { tr: "Şirket / Marka", en: "Company / Brand" },
      email: { tr: "E-posta", en: "Email" },
      phone: { tr: "Telefon", en: "Phone" },
      service: { tr: "İlgilendiğiniz hizmet", en: "Service you're interested in" },
      serviceOther: { tr: "Diğer / Emin değilim", en: "Other / Not sure yet" },
      message: { tr: "Projenizden bahsedin", en: "Tell us about your project" },
      // Gönderim butonları — form doldurulunca e-posta uygulaması / WhatsApp mesaj hazır açılır
      sendMail: { tr: "Mail ile Gönder", en: "Send via Email" },
      sendWhatsapp: { tr: "WhatsApp ile Gönder", en: "Send via WhatsApp" },
      sendNote: {
        tr: "Mesajınız hazır şekilde e-posta uygulamanızda veya WhatsApp'ta açılır; göndermeniz yeterli.",
        en: "Your message opens ready to send in your email app or WhatsApp — just hit send.",
      },
      mailSubject: { tr: "Proje talebi", en: "Project inquiry" },
      greeting: { tr: "Merhaba Range Media,", en: "Hi Range Media," },
      required: { tr: "Bu alan zorunlu.", en: "This field is required." },
      invalidEmail: { tr: "Geçerli bir e-posta girin.", en: "Enter a valid email." },
    },
  },
};

export const whatsappHref = (message: string) =>
  `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(message)}`;
