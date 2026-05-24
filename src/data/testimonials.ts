import type { LocalizedString } from "@/lib/i18n/types";

export type Testimonial = {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  content: LocalizedString;
  rating: number;
  avatarPlaceholder: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: { ar: "أحمد محمود", en: "Ahmed Mahmoud" },
    role: {
      ar: "ولي أمر — مسار برمجة الأطفال",
      en: "Parent — Kids Coding track",
    },
    content: {
      ar: "ابني أصبح يفكر بمنطق البرمجة ويبني مشاريع صغيرة في البيت. التجربة احترافية ومنظمة جداً.",
      en: "My son now thinks in code and builds small projects at home. Professional and very well organized.",
    },
    rating: 5,
    avatarPlaceholder: "ahmed",
  },
  {
    id: "2",
    name: { ar: "سارة علي", en: "Sara Ali" },
    role: {
      ar: "طالبة — الذكاء الاصطناعي",
      en: "Student — Artificial Intelligence",
    },
    content: {
      ar: "المشاريع العملية والمختبر ساعدوني أفهم AI بعمق. أشعر أنني جاهزة لسوق العمل.",
      en: "Practical projects and the lab helped me understand AI deeply. I feel ready for the job market.",
    },
    rating: 5,
    avatarPlaceholder: "sara",
  },
  {
    id: "3",
    name: { ar: "كريم حسن", en: "Karim Hassan" },
    role: {
      ar: "طالب — الإلكترونيات والروبوتات",
      en: "Student — Electronics & Robotics",
    },
    content: {
      ar: "أفضل أكاديمية تقنية جربتها. المدربون يشرحون بطريقة هندسية واضحة ومباشرة.",
      en: "The best tech academy I've tried. Instructors explain clearly with an engineering approach.",
    },
    rating: 5,
    avatarPlaceholder: "karim",
  },
];
