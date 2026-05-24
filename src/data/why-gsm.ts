import type { LocalizedString } from "@/lib/i18n/types";

export type WhyFeature = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: "engineering" | "hands-on" | "mentors" | "projects" | "certified" | "community";
};

export const whyGsmFeatures: WhyFeature[] = [
  {
    id: "engineering",
    title: { ar: "عقلية هندسية", en: "Engineering mindset" },
    description: {
      ar: "نعلّمك التفكير التحليلي وحل المشكلات كمهندس تقني — ليس فقط حفظ أكواد.",
      en: "We teach analytical thinking and problem-solving like a tech engineer — not memorizing code.",
    },
    icon: "engineering",
  },
  {
    id: "hands-on",
    title: { ar: "تعلم عملي", en: "Hands-on learning" },
    description: {
      ar: "مختبرات ومشاريع حقيقية في كل مسار — تطبّق ما تتعلمه من اليوم الأول.",
      en: "Labs and real projects in every track — apply what you learn from day one.",
    },
    icon: "hands-on",
  },
  {
    id: "mentors",
    title: { ar: "مدربون خبراء", en: "Expert mentors" },
    description: {
      ar: "فريق من المتخصصين في الصناعة والتعليم التقني يرافقك خطوة بخطوة.",
      en: "Industry specialists and tech educators guide you step by step.",
    },
    icon: "mentors",
  },
  {
    id: "projects",
    title: { ar: "مشاريع محفظة", en: "Portfolio projects" },
    description: {
      ar: "تخرّج بمشاريع تبرز مهاراتك أمام الجامعات وأسواق العمل.",
      en: "Graduate with projects that showcase your skills to universities and employers.",
    },
    icon: "projects",
  },
  {
    id: "certified",
    title: { ar: "مسارات معتمدة", en: "Structured pathways" },
    description: {
      ar: "منهج منظم يغطي المهارات المطلوبة في البرمجة والإلكترونيات والذكاء الاصطناعي.",
      en: "Organized curriculum covering skills in programming, electronics, and AI.",
    },
    icon: "certified",
  },
  {
    id: "community",
    title: { ar: "مجتمع تقني", en: "Tech community" },
    description: {
      ar: "بيئة محفزة للأطفال والشباب — تتعلم، تتنافس، وتنمو مع أقرانك.",
      en: "An inspiring environment for kids and youth — learn, compete, and grow together.",
    },
    icon: "community",
  },
];
