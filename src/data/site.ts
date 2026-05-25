import type { LocalizedString } from "@/lib/i18n/types";

export const siteConfig = {
  name: "GSM Academy",
  nameAr: "أكاديمية جي إس إم",

  description: {
    ar: "أكاديمية جي إس إم — رواد التعليم التقني في العالم العربي في مجالات الإلكترونيات والبرمجة وصيانة الموبايل.",
    en: "GSM Academy — Leading technical education in the Arab world for electronics, programming, and mobile maintenance training.",
  } satisfies LocalizedString,

  url: "https://gsm-academy.com",

  whatsapp: {
    number: "201011822931",

    message: {
      ar: "مرحبًا، أريد الحجز والاستفسار عن كورسات أكاديمية جي إس إم.",
      en: "Hello, I would like to book and inquire about GSM Academy courses.",
    } satisfies LocalizedString,

    href(locale: "ar" | "en" = "ar") {
      const text = encodeURIComponent(this.message[locale]);
      return `https://wa.me/${this.number}?text=${text}`;
    },
  },

  email: "info@gsm-academy.com",

  phone: "+201011822931",

  address: {
    ar: "القاهرة، مصر",
    en: "Cairo, Egypt",
  } satisfies LocalizedString,
} as const;

export const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/gsmacademy",
    icon: "facebook",
  },

  {
    name: "Instagram",
    href: "https://instagram.com/gsmacademy",
    icon: "instagram",
  },

  {
    name: "YouTube",
    href: "https://www.youtube.com/@gsmacademy3495",
    icon: "youtube",
  },

  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: "linkedin",
  },
] as const;