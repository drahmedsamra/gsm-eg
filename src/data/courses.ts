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
  price: string;
  oldPrice?: string;
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
      ar: "3 أسابيع",
      en: "3 weeks",
    },

    level: {
      ar: "مبتدئ — متوسط",
      en: "Beginner — Intermediate",
    },

    imagePlaceholder: "mobile",

    accent: "navy",

    price: "4950 جنيه",

    oldPrice: "7950 جنيه",
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
      ar: "10 أسابيع",
      en: "10 weeks",
    },

    level: {
      ar: "مبتدئ — متوسط",
      en: "Beginner — Intermediate",
    },

    imagePlaceholder: "electronics",

    accent: "navy",

    price: "6950 جنيه",

  
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
      ar: "8 أسابيع",
      en: "8 weeks",
    },

    level: {
      ar: "متوسط",
      en: "Intermediate",
    },

    imagePlaceholder: "robotics",

    accent: "blue",

    price: "4950 جنيه",

    oldPrice: "7000 جنيه",
  },

  {
    id: "programming",

    title: {
      ar: "البرمجة",
      en: "Programming",
    },

    description: {
      ar: "من الأساسيات إلى المشاريع الحقيقية — تعلم بناء التطبيقات والمواقع بمنهج عملي.",
      en: "From fundamentals to real projects — build apps and websites with a hands-on curriculum.",
    },

    category: {
      ar: "تقنية",
      en: "Technology",
    },

    duration: {
      ar: "12 أسبوع",
      en: "12 weeks",
    },

    level: {
      ar: "مبتدئ — متقدم",
      en: "Beginner — Advanced",
    },

    imagePlaceholder: "programming",

    accent: "blue",

    price: "3500 جنيه",

    oldPrice: "5000 جنيه",
  },

  {
    id: "ai",

    title: {
      ar: "الذكاء الاصطناعي",
      en: "Artificial Intelligence",
    },

    description: {
      ar: "تعلم الآلة، النماذج، والتطبيقات العملية للذكاء الاصطناعي في مشاريع حقيقية.",
      en: "Machine learning, models, and practical AI applications in real-world projects.",
    },

    category: {
      ar: "تقنية",
      en: "Technology",
    },

    duration: {
      ar: "14 أسبوع",
      en: "14 weeks",
    },

    level: {
      ar: "متوسط — متقدم",
      en: "Intermediate — Advanced",
    },

    imagePlaceholder: "ai",

    accent: "red",

    price: "4200 جنيه",

    oldPrice: "6000 جنيه",
  },

  {
    id: "robotics",

    title: {
      ar: "الروبوتات",
      en: "Robotics",
    },

    description: {
      ar: "برمجة وتحكم وبناء روبوتات — دمج البرمجة والإلكترونيات والهندسة.",
      en: "Program, control, and build robots — merging code, electronics, and engineering.",
    },

    category: {
      ar: "هندسة",
      en: "Engineering",
    },

    duration: {
      ar: "12 أسبوع",
      en: "12 weeks",
    },

    level: {
      ar: "متوسط",
      en: "Intermediate",
    },

    imagePlaceholder: "robotics",

    accent: "blue",

    price: "3700 جنيه",

    oldPrice: "5200 جنيه",
  },

  {
    id: "kids-coding",

    title: {
      ar: "برمجة الأطفال",
      en: "Kids Coding",
    },

    description: {
      ar: "مغامرات برمجية ممتعة تبني التفكير المنطقي والإبداع للأطفال.",
      en: "Fun coding adventures that build logical thinking and creativity for children.",
    },

    category: {
      ar: "أطفال",
      en: "Kids",
    },

    duration: {
      ar: "10 أسابيع",
      en: "10 weeks",
    },

    level: {
      ar: "6 — 14 سنة",
      en: "Ages 6 — 14",
    },

    imagePlaceholder: "kids",

    accent: "red",

    price: "2200 جنيه",

    oldPrice: "3200 جنيه",
  },
];