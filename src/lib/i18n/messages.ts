import type { Locale, LocalizedString } from "./types";

const ui = {
  bookNow: { ar: "احجز الآن", en: "Book Now" },

  bookSeat: {
    ar: "احجز مقعدك",
    en: "Book your seat",
  },

  exploreCourses: {
    ar: "استكشف الدورات",
    en: "Explore courses",
  },

  openMenu: {
    ar: "فتح القائمة",
    en: "Open menu",
  },

  closeMenu: {
    ar: "إغلاق القائمة",
    en: "Close menu",
  },

  navLabel: {
    ar: "التنقل الرئيسي",
    en: "Main navigation",
  },

  quickLinks: {
    ar: "روابط سريعة",
    en: "Quick links",
  },

  contactUs: {
    ar: "تواصل معنا",
    en: "Contact us",
  },

  followUs: {
    ar: "تابعنا",
    en: "Follow us",
  },

  whatsapp: {
    ar: "واتساب",
    en: "WhatsApp",
  },

  rights: {
    ar: "جميع الحقوق محفوظة.",
    en: "All rights reserved.",
  },

  langSwitch: {
    ar: "English",
    en: "عربي",
  },

  langSwitchAria: {
    ar: "التبديل إلى الإنجليزية",
    en: "Switch to Arabic",
  },

  heroBadge: {
    ar: "اكاديمية جي اس ام مصر — لهندسة الإلكترونيات والصيانة والبرمجيات",
    en: "GSM Egypt Academy — Electronics Engineering, Mobile Maintenance & Software Academy",
  },

  heroTitle: {
    ar: "التدريب علي الإلكترونيات والصيانة والبرمجيات",
    en: "Learn Electronics, Maintenance & Software Development",
  },

  heroSubtitle: {
    ar: "نقدم برامج تدريبية عملية ومتخصصة في الإلكترونيات والبرمجيات وصيانة الموبايل، بالإضافة إلى قسم مخصص للأطفال لتعلم البرمجة والروبوتات والذكاء الاصطناعي بأسلوب تفاعلي حديث يعتمد على التطبيق العملي والمشاريع الحقيقية.",
    en: "We provide practical and specialized training programs in electronics, software development, and mobile maintenance, in addition to a dedicated kids’ section for coding, robotics, and AI through an interactive hands-on learning experience focused on real projects and practical application.",
  },

  coursesEyebrow: {
    ar: "دوراتنا التدريبية",
    en: "Our programs",
  },

  coursesTitle: {
    ar: "أحدث البرامج التدريبية",
    en: "Our Latest Training Programs",
  },

  coursesDesc: {
    ar: "كورسات عملية تناسب مختلف الأعمار بأقوى شهادة مصرية على الإطلاق معتمدة من AQS Agency الدولية.",
    en: "Practical courses for all age groups with one of the strongest Egyptian certifications accredited by AQS International Agency.",
  },

  whyEyebrow: {
    ar: "لماذا نحن",
    en: "Why us",
  },

  whyTitle: {
    ar: "أكاديمية هندسية بتعليم عالمي",
    en: "An engineering academy with global education",
  },

  whyDesc: {
    ar: "نجمع بين دقة الهندسة وحداثة التكنولوجيا — بيئة تثق بها العائلات ويحترمها الشباب الطموح.",
    en: "We combine engineering rigor with modern technology — trusted by families, respected by ambitious youth.",
  },

  projectsEyebrow: {
    ar: "إنجازات الطلاب",
    en: "Student achievements",
  },

  projectsTitle: {
    ar: "مشاريع طلبة الأكاديمية",
    en: "Real projects from our labs",
  },

  projectsDesc: {
    ar: "معرض لمشاريع طلاب أكاديمية جي اس ام مصر.",
    en: "A showcase of GSM Egypt Academy students' work",
  },

  testimonialsEyebrow: {
    ar: "آراء الطلبة والخريجين",
    en: "Student & Graduate Testimonials",
  },

  testimonialsTitle: {
    ar: "ثقة تبنيها النتائج",
    en: "Trust built on results",
  },

  testimonialsDesc: {
    ar: "آراء خريجي وطلبة أكاديمية جي اس ام مصر.",
    en: "Reviews from GSM Egypt Academy students and graduates.",
  },

  galleryEyebrow: {
    ar: "معرض الصور",
    en: "Gallery",
  },

  galleryTitle: {
    ar: "لحظات من رحلتنا التعليمية",
    en: "Moments from our learning journey",
  },

  galleryDesc: {
    ar: "مختبرات، ورش، وإنجازات وتخرجات.",
    en: "Labs, workshops, achievements, and graduations.",
  },

  galleryPrev: {
    ar: "السابق",
    en: "Previous",
  },

  galleryNext: {
    ar: "التالي",
    en: "Next",
  },

  galleryClose: {
    ar: "إغلاق",
    en: "Close",
  },

  galleryView: {
    ar: "عرض صورة:",
    en: "View image:",
  },

  faqEyebrow: {
    ar: "الأسئلة الشائعة",
    en: "FAQ",
  },

  faqTitle: {
    ar: "كل ما تحتاج معرفته",
    en: "Everything you need to know",
  },

  faqDesc: {
    ar: "إجابات سريعة — تواصل معنا عبر واتساب لأي استفسار إضافي.",
    en: "Quick answers — reach us on WhatsApp for anything else.",
  },

  contactEyebrow: {
    ar: "احجز مقعدك",
    en: "Book your seat",
  },

  contactTitle: {
    ar: "ابدأ اليوم",
    en: "Start your tech journey today",
  },

  contactDesc: {
    ar: "احجز مقعدك الآن عبر واتساب — فريقنا يساعدك في اختيار المسار المناسب لعمرك ومستواك خلال دقائق.",
    en: "Book via WhatsApp — our team helps you pick the right track for your age and level in minutes.",
  },

  contactWhatsapp: {
    ar: "احجز الآن عبر واتساب",
    en: "Book now on WhatsApp",
  },

  formTitle: {
    ar: "نموذج الحجز",
    en: "Reserve Your Seat",
  },

  formDesc: {
    ar: "املأ نموذج الحجز الآن وسيقوم فريق أكاديمية جي إس إم بالتواصل معك مباشرة، كما سيتم تحويلك تلقائيًا إلى واتساب بعد إرسال بياناتك.",
    en: "Complete the registration form now and the GSM Academy team will contact you directly. You will also be automatically redirected to WhatsApp after submitting your details.",
  },

  formName: {
    ar: "الاسم الكامل",
    en: "Full name",
  },

  formNamePlaceholder: {
    ar: "اكتب اسمك الكامل",
    en: "Enter your full name",
  },

  formPhone: {
    ar: "رقم الهاتف",
    en: "Phone number",
  },

  formCourse: {
    ar: "الدورة المهتم بها",
    en: "Course of interest",
  },

  formBranch: {
    ar: "الفرع",
    en: "Branch",
  },

  formMessage: {
    ar: "رسالتك",
    en: "Your message",
  },

  formMessagePlaceholder: {
    ar: "اكتب استفسارك هنا...",
    en: "Write your message here...",
  },

  formFooterText: {
    ar: "بعد التسجيل سيقوم فريقنا بالتواصل معك",
    en: "Our team will contact you after registration",
  },

  formSubmit: {
    ar: "إرسال الطلب",
    en: "Send request",
  },

  formSending: {
    ar: "جاري الإرسال...",
    en: "Sending...",
  },

  formSuccess: {
    ar: "تم استلام طلبك بنجاح! سنتواصل معك قريباً.",
    en: "Request received! We'll contact you soon.",
  },

  formError: {
    ar: "حدث خطأ. حاول مرة أخرى أو تواصل عبر واتساب.",
    en: "Something went wrong. Try again or contact us on WhatsApp.",
  },

  formSelectCourse: {
    ar: "اختر دورة",
    en: "Select a course",
  },

  formSelectBranch: {
    ar: "اختر الفرع",
    en: "Select branch",
  },

  duration: {
    ar: "المدة",
    en: "Duration",
  },

  level: {
    ar: "المستوى",
    en: "Level",
  },

  rating: {
    ar: "تقييم",
    en: "Rating",
  },

  statsAria: {
    ar: "إحصائيات الأكاديمية",
    en: "Academy statistics",
  },

  whatsappAria: {
    ar: "تواصل عبر واتساب",
    en: "Contact on WhatsApp",
  },

  footerDesc: {
    ar: "أكاديمية جي إس إم مصر — تدريب عملي حديث في الإلكترونيات وصيانة الموبايل والبرمجة للأطفال والشباب.",
    en: "GSM Egypt Academy — Modern Hands-on Training in Electronics, Mobile Maintenance, and Programming for Kids & Youth.",
  },
} as const;

const heroTags = {
  ar: [
    "التدريب عملي",
    "مختبرات حديثة",
    "شهادة معتمدة",
    "لجميع الأعمار",
  ],

  en: [
    "Hands-on learning",
    "Modern labs",
    "Certified",
    "Kids & youth",
  ],
} as const;

export type MessageKey = keyof typeof ui;

export function getMessage(
  locale: Locale,
  key: MessageKey
): string {
  const entry = ui[key];

  if (
    typeof entry === "object" &&
    "ar" in entry &&
    !Array.isArray(entry)
  ) {
    return entry[locale];
  }

  return "";
}

export function getTags(locale: Locale): string[] {
  return [...heroTags[locale]];
}

export const navItems = [
  { key: "home" as const, href: "#hero" },

  {
    key: "courses" as const,
    href: "#courses",
  },

  {
    key: "why" as const,
    href: "#why-gsm",
  },

  {
    key: "booking" as const,
    href: "#inquiry",
  },

  {
    key: "faq" as const,
    href: "#faq",
  },

  {
    key: "contact" as const,
    href: "#contact",
  },
];
``

export const navLabels: Record<
  (typeof navItems)[number]["key"],
  LocalizedString
> = {
  home: {
    ar: "الرئيسية",
    en: "Home",
  },

  courses: {
    ar: "الدورات",
    en: "Courses",
  },

  why: {
    ar: "لماذا GSM",
    en: "Why GSM",
  },

  booking: {
    ar: "احجز الآن",
    en: "Book Now",
  },

  faq: {
    ar: "الأسئلة الشائعة",
    en: "FAQ",
  },

  contact: {
    ar: "تواصل معنا",
    en: "Contact",
  },
};
``