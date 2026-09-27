// İletişim bilgileri — navbar, footer, iletişim bölümü ve /contact sayfası buradan okur.
// TODO: Aşağıdaki placeholder değerleri gerçek bilgilerle değiştir.

export const contact = {
  phone: {
    display: "+90 5XX XXX XX XX", // TODO
    href: "tel:+905000000000", // TODO: "tel:+90..." formatında
  },
  whatsapp: {
    // TODO: ülke kodu ile, boşluksuz: "905xxxxxxxxx"
    number: "905000000000",
    message: {
      tr: "Merhaba Range Media, bir proje hakkında görüşmek istiyorum.",
      en: "Hi Range Media, I'd like to talk about a project.",
    },
  },
  email: "info@rangemedia.com.tr", // TODO
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
    { label: "LinkedIn", href: "https://linkedin.com/" }, // TODO
    { label: "YouTube", href: "https://youtube.com/" }, // TODO
    { label: "Vimeo", href: "https://vimeo.com/" }, // TODO
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
      submit: { tr: "Mesajı Gönder", en: "Send Message" },
      sending: { tr: "Gönderiliyor…", en: "Sending…" },
      success: {
        tr: "Teşekkürler! Mesajınız bize ulaştı, en kısa sürede dönüş yapacağız.",
        en: "Thank you! Your message has reached us — we'll get back to you soon.",
      },
      required: { tr: "Bu alan zorunlu.", en: "This field is required." },
      invalidEmail: { tr: "Geçerli bir e-posta girin.", en: "Enter a valid email." },
    },
  },
};

export const whatsappHref = (message: string) =>
  `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(message)}`;
