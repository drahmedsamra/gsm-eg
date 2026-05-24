import type { LocalizedString } from "@/lib/i18n/types";

export type GalleryItem = {
  id: string;
  alt: LocalizedString;
  imagePlaceholder: string;
  span?: "normal" | "wide" | "tall";
};

export const galleryItems: GalleryItem[] = [
  {
    id: "lab-1",
    alt: {
      ar: "مختبر الإلكترونيات في أكاديمية GSM",
      en: "Electronics lab at GSM Academy",
    },
    imagePlaceholder: "lab-1",
    span: "wide",
  },
  {
    id: "coding-1",
    alt: { ar: "جلسة برمجة عملية", en: "Hands-on coding session" },
    imagePlaceholder: "coding-1",
  },
  {
    id: "robotics-1",
    alt: { ar: "ورشة الروبوتات", en: "Robotics workshop" },
    imagePlaceholder: "robotics-1",
    span: "tall",
  },
  {
    id: "kids-1",
    alt: { ar: "فصل برمجة الأطفال", en: "Kids coding class" },
    imagePlaceholder: "kids-1",
  },
  {
    id: "ai-1",
    alt: { ar: "مختبر الذكاء الاصطناعي", en: "AI lab session" },
    imagePlaceholder: "ai-1",
  },
  {
    id: "graduation-1",
    alt: { ar: "حفل تخرج الطلاب", en: "Student graduation ceremony" },
    imagePlaceholder: "graduation-1",
    span: "wide",
  },
];
