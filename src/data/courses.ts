import type { LocalizedString } from "@/lib/i18n/types";

export type Course = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  category: LocalizedString;
  duration: LocalizedString;
  level: LocalizedString;
  imagePlaceholder: string;
  accent: "blue" | "red" | "navy";

  price: LocalizedString;

  oldPrice?: LocalizedString;
};

export const courses: Course[] = [
  {
    id: "mobile-maintenance",

    title: {
      ar: "صيانة الموبايل",
      en: "Mobile Maintenance",
    },

    description: {
      ar: "تعلم صيانة الهواتف الذكية عمليًا وتشخيص الأعطال باستخدام أحدث أدوات وتقنيات الصيانة.",
      en: "Learn smartphone diagnostics and hands-on repair techniques using modern maintenance tools and real-world training.",
    },

    category: {
      ar: "مهارات",
      en: "Skills",
    },

    duration: {
      ar: "32 ساعه ",
        en: "32 HOUR",
    },

    level: {
      ar: "مبتدئ — متوسط",
      en: "Beginner — Intermediate",
    },

    imagePlaceholder: "mobile",

    accent: "navy",

    price: {
      ar: "4950 جنيه",
      en: "EGP 4950",
    },

    oldPrice: {
      ar: "7950 جنيه",
      en: "EGP 7950",
    },
  },

  {
    id: "electronics",

    title: {
      ar: "الإلكترونيات",
      en: "Electronics",
    },

    description: {
      ar: "دوائر، مكونات، وتجارب عملية تبني فهمك الهندسي من الصفر.",
      en: "Circuits, components, and lab experiments that build engineering intuition from scratch.",
    },

    category: {
      ar: "هندسة",
      en: "Engineering",
    },

    
      duration: {
        ar: "28 ساعه ",
        en: "28 HOUR",
    },

    level: {
      ar: "مبتدئ — متوسط",
      en: "Beginner — Intermediate",
    },

    imagePlaceholder: "electronics",

    accent: "navy",

    price: {
      ar: "6950 جنيه",
      en: "EGP 6950",
    },
  },

  {
    id: "little-inventor",

    title: {
      ar: "المخترع الصغير",
      en: "Little Inventor",
    },

    description: {
      ar: "دبلومة متكاملة تجمع بين البرمجة والإلكترونيات والروبوتات للأطفال من خلال التعلم العملي والمشاريع التفاعلية.",
      en: "A complete diploma combining coding, electronics, and robotics for kids through hands-on learning and interactive projects.",
    },

    category: {
      ar: "هندسة",
      en: "Engineering",
    },
  
    duration: {
      ar: "8 اسابيع ",
        en: "8 Weeks",
    },

    level: {
      ar: "متوسط",
      en: "Intermediate",
    },

    imagePlaceholder: "robotics",

    accent: "blue",

    price: {
      ar: "4950 جنيه",
      en: "EGP 4950",
    },

    oldPrice: {
      ar: "7000 جنيه",
      en: "EGP 7000",
    },
  },
];

  