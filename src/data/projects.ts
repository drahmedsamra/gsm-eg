import type { LocalizedString } from "@/lib/i18n/types";

export type StudentProject = {
  id: string;
  title: LocalizedString;
  category: LocalizedString;
  description: LocalizedString;
  imagePlaceholder: string;
};

export const studentProjects: StudentProject[] = [
  {
    id: "smart-home",
    title: { ar: "نظام منزل ذكي", en: "Smart home system" },
    category: { ar: "إلكترونيات + IoT", en: "Electronics + IoT" },
    description: {
      ar: "تحكم بالإضاءة والحساسات عبر تطبيق مخصص.",
      en: "Control lighting and sensors through a custom app.",
    },
    imagePlaceholder: "smart-home",
  },
  {
    id: "ai-classifier",
    title: { ar: "مصنّف صور بالذكاء الاصطناعي", en: "AI image classifier" },
    category: { ar: "ذكاء اصطناعي", en: "Artificial Intelligence" },
    description: {
      ar: "نموذج تعلم آلي يتعرّف على الكائنات في الوقت الفعلي.",
      en: "A machine learning model that recognizes objects in real time.",
    },
    imagePlaceholder: "ai-classifier",
  },
  {
    id: "line-follower",
    title: { ar: "روبوت متتبع خط", en: "Line-following robot" },
    category: { ar: "روبوتات", en: "Robotics" },
    description: {
      ar: "روبوت مبرمج يتبع المسار باستخدام حساسات الأشعة تحت الحمراء.",
      en: "A programmed robot that follows paths using infrared sensors.",
    },
    imagePlaceholder: "line-follower",
  },
  {
    id: "game-app",
    title: { ar: "لعبة تعليمية", en: "Educational game" },
    category: { ar: "برمجة", en: "Programming" },
    description: {
      ar: "تطبيق تفاعلي يعلّم مفاهيم البرمجة للأطفال.",
      en: "An interactive app that teaches coding concepts to kids.",
    },
    imagePlaceholder: "game-app",
  },
];
