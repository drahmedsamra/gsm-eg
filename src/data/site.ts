import type { LocalizedString } from "@/lib/i18n/types";

export const siteConfig = {
  name: "GSM Academy",
  nameAr: "أكاديمية GSM",
  description: {
    ar: "أكاديمية GSM — تعليم تقني حديث في البرمجة والإلكترونيات والذكاء الاصطناعي للأطفال والشباب. تعلم عملي بعقلية هندسية.",
    en: "GSM Academy — modern tech education in programming, electronics, and AI for kids and youth. Hands-on learning with an engineering mindset.",
  } satisfies LocalizedString,
  url: "https://gsm-academy.com",
  whatsapp: {
    number: "201000000000",
    message: {
      ar: "مرحباً، أود حجز مقعد في أكاديمية GSM",
      en: "Hello, I'd like to book a seat at GSM Academy",
    } satisfies LocalizedString,
    href(locale: "ar" | "en" = "ar") {
      const text = encodeURIComponent(this.message[locale]);
      return `https://wa.me/${this.number}?text=${text}`;
    },
  },
  email: "info@gsm-academy.com",
  phone: "+20 100 000 0000",
  address: {
    ar: "القاهرة، مصر",
    en: "Cairo, Egypt",
  } satisfies LocalizedString,
} as const;

export const socialLinks = [
  { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
] as const;
