import type { Testimonial } from "@/lib/types";

// Testimonial'lar — fotoğraflar: public/images/testimonials/
// EN: çeviriler TR'den yapıldı — gözden geçir.

export const testimonialsSection = {
  eyebrow: { tr: "İş Ortaklarımız Ne Diyor?", en: "What Our Partners Say" },
  title: {
    tr: "Birlikte çalıştığımız markaların bizimle ilgili söyledikleri.",
    en: "What the brands we work with say about us.",
  },
};

export const testimonials: Testimonial[] = [
  {
    name: "Onur Emirtekin",
    company: "Influencer Marketing",
    photo: "/images/testimonials/1.webp",
    quote: {
      tr: "Range Media ile sayısız iş birliği yapıyoruz; sürekli bir akış içindeyiz. Ayrıca kendi hesabım için de birlikte içerik üretiyoruz. Hem çevremden aldığım geri dönüşler hem de içeriklerin etkileşimleri gerçekten çok tatlı. Birlikte üretmek ve iş birliği yapmak hepimize çok keyif veriyor.",
      en: "We've done countless collaborations with Range Media — we're in a constant flow. We also create content together for my own account. The feedback I get from people around me and the engagement on the content are genuinely lovely. Creating and collaborating together is a real pleasure for all of us.",
    },
  },
  {
    name: "Onur Erdal",
    company: "Octopur Creative London",
    photo: "/images/testimonials/2.webp",
    quote: {
      tr: "Range Media ile yaklaşık 1,5 senedir çalışıyoruz. Bu sürede Octopur Creative'in Türkiye'deki ve İngiltere'deki müşterileri için kurumsal kimlikten video prodüksiyonuna kadar sayısız içerik ürettik. Bu ekiple yollarımızın kesişmesinden şirketim adına çok mutluyum.",
      en: "We've been working with Range Media for about a year and a half. In that time we've produced countless pieces — from corporate identity to video production — for Octopur Creative's clients in Türkiye and the UK. On behalf of my company, I'm very glad our paths crossed with this team.",
    },
  },
  {
    name: "Çağdaş Keleş",
    company: "Peralog Lojistik",
    photo: "/images/testimonials/3.webp",
    quote: {
      tr: "Kurumsal kimlik sürecimizde Range Media'nın profesyonelliği işimizi çok kolaylaştırdı. Tasarladıkları modern logoyla markamızın prestiji gözle görülür şekilde arttı. Hem göze hitap eden hem de kaliteli bir iş oldu, teşekkürler.",
      en: "Range Media's professionalism made our corporate identity process so much easier. The modern logo they designed visibly raised our brand's prestige. It was work that's both eye-catching and high quality — thank you.",
    },
  },
  {
    name: "Nihan Özkan",
    company: "Ritmika Cimnastik",
    photo: "/images/testimonials/4.webp",
    quote: {
      tr: "Range Media ile 3 yıldan uzun süredir çalışıyoruz ve artık gerçekten bir aile gibi olduk. İçerikleri ne kadar beğendiğimden bahsetmeme gerek bile yok. Yaptığım her işte benim için en önemli şey güven ve insanların işine verdiği değer. Range Media'da da bunlardan fazlasıyla memnunum.",
      en: "We've worked with Range Media for more than three years and we've truly become like family. I don't even need to say how much I love the content. In everything I do, what matters most to me is trust and the value people give to their work — and Range Media delivers both, abundantly.",
    },
  },
  {
    name: "Eray Gündoğdu",
    company: "Proje Garaj",
    photo: "/images/testimonials/5.webp",
    quote: {
      tr: "Range Media ile uzun zamandır çalışıyoruz. Daima en iyisi için çaba gösterdiklerine yakından şahit oldum. Herkes video çeker ama çok az kişi ifade gücünün farkındadır. Range Media tam da bu güce sahip bir ajans. Siz hayalinizi anlatıyorsunuz, onlar onu içeriğe dönüştürüyor.",
      en: "We've worked with Range Media for a long time, and I've seen first-hand how they always strive for the best. Anyone can shoot video, but very few understand the power of expression. Range Media is an agency with exactly that power. You describe your dream, they turn it into content.",
    },
  },
  {
    name: "Nadil Kaan Agovic",
    company: "Garage9",
    photo: "/images/testimonials/6.webp",
    quote: {
      tr: "Range Media'dan logo ve kurumsal kimlik hizmeti aldık; süreç boyunca hem çok hızlı hem de fazlasıyla çözüm odaklı ilerlediler. Logo, kartvizit ve genel kimlik dili tam istediğimiz gibi, modern ve profesyonel oldu. Revizelerde de inanılmaz ilgiliydiler; ortaya çıkan işten gerçekten çok memnun kaldık.",
      en: "We worked with Range Media on our logo and corporate identity; throughout the process they were fast and extremely solution-oriented. The logo, business cards and overall identity came out exactly as we wanted — modern and professional. They were incredibly attentive during revisions, and we're really happy with the result.",
    },
  },
];
