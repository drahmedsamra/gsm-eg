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
      ar: "ما الكورسات المتوفرة داخل أكاديمية GSM مصر؟",
      en: "What courses are available at GSM Egypt Academy?",
    },
    answer: {
      ar: "توفر أكاديمية GSM مصر مجموعة متنوعة من الكورسات الاحترافية، تشمل صيانة الموبايل، والإلكترونيات، والبرمجة، والروبوتات، والذكاء الاصطناعي، بالإضافة إلى برامج مخصصة للأطفال مثل المخترع الصغير والبرمجة للأطفال.",
      en: "GSM Egypt Academy offers professional courses in mobile repair, electronics, programming, robotics, artificial intelligence, and specialized programs for children such as Little Inventor and Coding for Kids.",
    },
  },

  {
    id: "beginners",
    question: {
      ar: "هل الكورسات مناسبة للمبتدئين؟",
      en: "Are the courses suitable for beginners?",
    },
    answer: {
      ar: "نعم، تم تصميم العديد من الكورسات لتبدأ معك من الصفر تمامًا، مع شرح عملي خطوة بخطوة حتى تكتسب المهارات والثقة اللازمة للتطبيق العملي.",
      en: "Yes. Many of our courses are designed for complete beginners, providing step-by-step practical training to build real skills and confidence.",
    },
  },

  {
    id: "practical",
    question: {
      ar: "هل التدريب عملي أم نظري فقط؟",
      en: "Is the training practical or theoretical?",
    },
    answer: {
      ar: "نعتمد بشكل أساسي على التدريب العملي داخل المعامل، حيث يطبق كل متدرب بنفسه على أجهزة ومعدات حقيقية، مع شرح نظري يدعم التطبيق العملي.",
      en: "Our courses focus mainly on hands-on practical training inside fully equipped labs, supported by the necessary theoretical knowledge.",
    },
  },

  {
    id: "online",
    question: {
      ar: "هل يوجد كورسات أونلاين؟",
      en: "Are online courses available?",
    },
    answer: {
      ar: "نعم، جميع كورسات أكاديمية GSM مصر متوفرة بنظام الأونلاين، وهو الخيار المثالي للمتدربين من المحافظات البعيدة أو من خارج مصر. كما نوفر محاضرات فردية (One-to-One)، حيث يكون لكل طالب محاضر متخصص يتابعه بشكل مباشر طوال فترة التدريب ويجيب عن جميع استفساراته، مما يضمن أعلى مستوى من الاستفادة. وقد تخرج معنا عدد كبير من الطلاب من مختلف المحافظات والدول، وأبدوا رضاهم الكامل عن جودة التدريب واستفادوا من المحتوى العملي بشكل كبير.",
      en: "Yes. All GSM Egypt Academy courses are available online, making them an ideal choice for students living in other cities or outside Egypt. We also offer one-to-one live sessions, where each student receives personalized training from a dedicated instructor throughout the course. Many of our online students from different countries and regions have successfully completed their training and were highly satisfied with the quality of instruction and practical learning experience.",
    },
  },

  {
    id: "videos",
    question: {
      ar: "هل يمكن الاشتراك في الكورسات فيديو؟",
      en: "Can I subscribe to the recorded video courses?",
    },
    answer: {
      ar: "نعم، جميع كورسات أكاديمية GSM مصر متوفرة في صورة فيديوهات تعليمية عالية الجودة، ويمكن الاشتراك فيها ومشاهدتها في أي وقت. لمعرفة الأسعار وطريقة الاشتراك، يرجى التواصل مع الأكاديمية على الرقم 01155999333.",
      en: "Yes. All GSM Egypt Academy courses are available as high-quality recorded video lessons that you can subscribe to and watch anytime. For pricing and subscription details, please contact GSM Egypt Academy at +20 115 599 9333.",
    },
  },

  {
    id: "certificate",
    question: {
      ar: "هل أحصل على شهادة معتمدة بعد انتهاء الكورس؟",
      en: "Will I receive an accredited certificate after completing the course?",
    },
    answer: {
      ar: "نعم، يحصل المتدرب بعد اجتياز الكورس على شهادة معتمدة من أكاديمية GSM مصر بالتعاون مع AQS Agency، كما يمكن التحقق من صحة الشهادة إلكترونيًا من خلال موقع الأكاديمية باستخدام كود الشهادة.",
      en: "Yes. Students receive an accredited certificate issued by GSM Egypt Academy in cooperation with AQS Agency. The certificate can also be verified online using its unique verification code.",
    },
  },

  {
    id: "tools",
    question: {
      ar: "هل الأدوات والأجهزة متوفرة داخل الأكاديمية؟",
      en: "Are training tools and equipment provided?",
    },
    answer: {
      ar: "نعم، جميع الأدوات والأجهزة اللازمة للتدريب العملي متوفرة داخل المعامل، مما يتيح للمتدرب التطبيق المباشر أثناء المحاضرات دون الحاجة إلى إحضار معدات خاصة.",
      en: "Yes. All required tools and equipment are available inside our training labs, allowing students to practice during every session without bringing their own equipment.",
    },
  },

  {
    id: "career",
    question: {
      ar: "هل تؤهلني الكورسات للعمل أو بدء مشروع خاص؟",
      en: "Can these courses help me get a job or start my own business?",
    },
    answer: {
      ar: "تم تصميم البرامج التدريبية لتمنحك خبرة عملية حقيقية تساعدك على العمل في الشركات أو مراكز الصيانة، أو بدء مشروعك الخاص بثقة بعد اكتساب المهارات المطلوبة.",
      en: "Our training programs are designed to provide real-world skills that help you work in companies, repair centers, or confidently start your own business.",
    },
  },

  {
    id: "difference",
    question: {
      ar: "ما الذي يميز الدراسة في أكاديمية GSM مصر عن التعلم الذاتي من الإنترنت؟",
      en: "Why choose GSM Egypt Academy instead of self-learning online?",
    },
    answer: {
      ar: "توفر أكاديمية GSM مصر تدريبًا عمليًا داخل المعامل، وإشرافًا مباشرًا من المحاضرين، والتطبيق على أجهزة حقيقية، بالإضافة إلى الدعم الفني، والمتابعة المستمرة، والشهادة المعتمدة بعد اجتياز الكورس، وهي مميزات يصعب الحصول عليها من التعلم الذاتي عبر الإنترنت فقط.",
      en: "Unlike self-learning online, GSM Egypt Academy provides hands-on lab training, direct instructor supervision, real equipment, continuous support, and an accredited certificate upon successful course completion.",
    },
  },

  {
    id: "booking",
    question: {
      ar: "كيف يمكنني حجز الكورس؟",
      en: "How can I book a course?",
    },
    answer: {
      ar: "يمكنك الحجز بسهولة من خلال نموذج الحجز الموجود على الموقع، أو التواصل معنا عبر واتساب أو الهاتف، وسيقوم فريق أكاديمية GSM مصر بمساعدتك في اختيار الكورس المناسب والإجابة عن جميع استفساراتك.",
      en: "You can easily book through the registration form on our website or contact us via WhatsApp or phone. Our team will help you choose the most suitable course and answer all your questions.",
    },
  },
];