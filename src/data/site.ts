import type { LocalizedString } from "@/lib/i18n/types";

export const siteConfig = {
  name: "جي اس ام مصر",
  nameAr: "جي اس ام مصر",

  description: {
    ar: "جي اس ام مصر لهندسة الإلكترونيات والصيانة والبرمجة — كورسات احترافية في صيانة الموبايل والإلكترونيات والبرمجة والذكاء الاصطناعي.",
    en: "GSM Egypt for Electronics Engineering, Maintenance & Programming.",
  } satisfies LocalizedString,

  url: "https://gsm-eg.com",

  whatsapp: {
    number: "201011822931",

    message: {
      ar: "مرحبًا، أريد الحجز والاستفسار عن كورسات جي اس ام مصر.",
      en: "Hello, I would like to inquire about GSM Egypt courses.",
    } satisfies LocalizedString,

    href(locale: "ar" | "en" = "ar") {
      const text = encodeURIComponent(this.message[locale]);
      return `https://wa.me/${this.number}?text=${text}`;
    },
  },

  email: "info@gsm-eg.com",

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