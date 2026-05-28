import type { LocalizedString } from "@/lib/i18n/types";

export type FaqItem = {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
};

export const faqItems: FaqItem[] = [
  {
    id: "courses",
    question: {
      ar: "ما الكورسات المتوفرة داخل أكاديمية جي إس إم مصر؟",
      en: "What courses are available at GSM Egypt Academy?",
    },
    answer: {
      ar: "نوفر كورسات صيانة الموبايل والإلكترونيات والبرمجة والروبوتات والذكاء الاصطناعي، بالإضافة إلى برامج الأطفال مثل المخترع الصغير والبرمجة للأطفال.",
      en: "We offer courses in mobile repair, electronics, programming, robotics, and AI, in addition to kids programs such as Little Inventor and programming for children.",
    },
  },

  {
    id: "beginners",
    question: {
      ar: "هل الكورسات مناسبة للمبتدئين؟",
      en: "Are the courses suitable for beginners?",
    },
    answer: {
      ar: "نعم، لدينا مسارات تبدأ من الصفر تمامًا للمبتدئين، مع شرح عملي خطوة بخطوة حتى يتمكن الطالب من التطبيق بنفسه بثقة.",
      en: "Yes. We offer beginner-friendly tracks that start from zero with practical step-by-step training to help students gain real confidence.",
    },
  },

  {
    id: "practical",
    question: {
      ar: "هل التدريب عملي أم نظري فقط؟",
      en: "Is the training practical or only theoretical?",
    },
    answer: {
      ar: "نعتمد بشكل أساسي على التدريب العملي داخل المعامل، حيث يعمل كل طالب بنفسه على الأجهزة والمشاريع والتطبيقات الحقيقية.",
      en: "Our training is mainly hands-on inside the labs, where every student works on real devices, projects, and practical applications.",
    },
  },

  {
    id: "age",
    question: {
      ar: "ما الأعمار المناسبة للكورسات؟",
      en: "What age groups are suitable for the courses?",
    },
    answer: {
      ar: "لدينا كورسات الإلكترونيات وصيانة الموبايل مناسبه لجميع الأعمار . وأيضا لدينا كورسات المخترع الصغير للأطفال بداية من ٦ سنوات",
      en: "We offer electronics and mobile maintenance courses suitable for all age groups. We also provide Little Inventor programs for children starting from the age of 6.",
    },
  },

  {
    id: "certificate",
    question: {
      ar: "هل يحصل الطالب على شهادة بعد انتهاء الكورس؟",
      en: "Do students receive a certificate after completing the course?",
    },
    answer: {
      ar: "    يحصل المتدرب على شهادة معتمدة من أكاديمية جي إس إم مصر بالتعاون مع AQS Agency",
      en: "    Professional certificate certified by AQS Agency upon course completion.",
    },
  },

  {
    id: "tools",
    question: {
      ar: "هل الأدوات والأجهزة متوفرة داخل الأكاديمية؟",
      en: "Are tools and equipment available inside the academy?",
    },
    answer: {
      ar: "نعم، نوفر الأدوات والأجهزة اللازمة للتدريب العملي داخل المعامل، بحيث يستطيع الطالب التطبيق بشكل مباشر أثناء الكورس.",
      en: "Yes. We provide the necessary tools and equipment for practical training inside the labs so students can practice directly during the course.",
    },
  },

  {
    id: "duration",
    question: {
      ar: "كم مدة الكورسات؟",
      en: "How long are the courses?",
    },
    answer: {
      ar: "مدة الكورس تختلف حسب التخصص والمستوى، ويتم توضيح جميع التفاصيل الخاصة بالمواعيد وعدد المحاضرات قبل الحجز.",
      en: "Course duration depends on the specialization and level. All schedule details and lecture counts are explained before booking.",
    },
  },

  {
    id: "booking",
    question: {
      ar: "كيف يمكنني حجز الكورس؟",
      en: "How can I book a course?",
    },
    answer: {
      ar: "يمكنك الحجز بسهولة من خلال زر «احجز الآن» أو التواصل معنا عبر واتساب، وسيقوم فريق أكاديمية جي إس إم مصر بمساعدتك في اختيار الكورس المناسب.",
      en: "You can easily book through the Book Now button or contact us via WhatsApp, and our team will help you choose the right course.",
    },
  },

  {
    id: "career",
    question: {
      ar: "هل تساعد الكورسات في دخول سوق العمل؟",
      en: "Can these courses help students enter the job market?",
    },
    answer: {
      ar: "تم تصميم الكورسات لتوفير خبرة عملية حقيقية تساعد الطلاب على تطوير مهاراتهم والاستعداد للعمل أو بدء مشاريعهم الخاصة.",
      en: "The courses are designed to provide real practical experience that helps students develop their skills and prepare for jobs or their own projects.",
    },
  },
];