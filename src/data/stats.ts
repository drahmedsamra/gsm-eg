import type { LocalizedString } from "@/lib/i18n/types";

export type StatItem = {
  id: string;
  value: number;
  suffix?: string;
  label: LocalizedString;
};

export const stats: StatItem[] = [
  {
    id: "students",
    value: 2500,
    suffix: "+",
    label: { ar: "طالب وطالبة", en: "Students" },
  },
  {
    id: "courses",
    value: 15,
    suffix: "+",
    label: { ar: "دورة تدريبيه", en: "Programs" },
  },
  {
    id: "projects",
    value: 500,
    suffix: "+",
    label: { ar: "خريج يعمل الان", en: "Graduates Employed" },
  },
  {
    id: "satisfaction",
    value: 98,
    suffix: "%",
    label: { ar: "رضا الطلبه والخريجين", en: "Students Satisfaction Rate" },
  },
];
