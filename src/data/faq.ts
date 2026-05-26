import type { LocalizedString } from "@/lib/i18n/types";

export type FaqItem = {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
};

export const faqItems: FaqItem[] = [
  {
    id: "age",
    question: {
      ar: "ما الفئات العمرية المناسبة للدورات؟",
      en: "What age groups are the courses for?",
    },
    answer: {
      ar: "نوفر مسارات للأطفال من 6 سنوات وبرامج للشباب والمراهقين. كل دورة لها متطلبات عمرية ومستوى واضح عند التسجيل.",
      en: "We offer tracks for children from age 6 and programs for teens and youth. Each course lists clear age and level requirements.",
    },
  },
  {
    id: "experience",
    question: {
      ar: "هل أحتاج خبرة سابقة في البرمجة؟",
      en: "Do I need prior programming experience?",
    },
    answer: {
      ar: "لا. لدينا مسارات للمبتدئين تبدأ من الصفر، ومسارات متقدمة لمن لديه أساسيات. نحدد المستوى المناسب لك عند الحجز.",
      en: "No. We have beginner tracks from zero and advanced paths for those with basics. We place you at the right level when you book.",
    },
  },
  {
    id: "duration",
    question: {
      ar: "كم مدة الدورة؟",
      en: "How long is each course?",
    },
    answer: {
      ar: "تتراوح بين 8 و14 أسبوعاً حسب المسار، مع جلسات أسبوعية عملية في المختبر والمشاريع.",
      en: "Between 8 and 14 weeks depending on the track, with weekly hands-on lab sessions and projects.",
    },
  },
  {
    id: "certificate",
    question: {
      ar: "هل أحصل على شهادة بعد إتمام الدورة؟",
      en: "Do I receive a certificate after completing a course?",
    },
    answer: {
      ar: "نعم. تحصل على شهادة إتمام من أكاديمية GSM مع توثيق المشاريع التي أنجزتها.",
      en: "Yes. You receive a GSM Egypt Academy completion certificate with documentation of your projects.",
    },
  },
  {
    id: "booking",
    question: {
      ar: "كيف أحجز مقعداً؟",
      en: "How do I book a seat?",
    },
    answer: {
      ar: "اضغط على «احجز الآن» أو تواصل معنا عبر واتساب أو نموذج التواصل. فريقنا يساعدك في اختيار المسار والمواعيد.",
      en: "Click Book Now, contact us on WhatsApp, or use the contact form. Our team helps you choose the right track and schedule.",
    },
  },
  {
    id: "equipment",
    question: {
      ar: "هل أحتاج أدوات أو لابتوب خاص؟",
      en: "Do I need my own tools or laptop?",
    },
    answer: {
      ar: "نوفر المعدات في المختبر. للمسارات التي تتطلب لابتوب، نرشدك للمواصفات المناسبة قبل البدء.",
      en: "We provide equipment in the lab. For tracks that need a laptop, we guide you on suitable specs before you start.",
    },
  },
];
