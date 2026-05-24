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
    label: { ar: "مسار تدريبي", en: "Programs" },
  },
  {
    id: "projects",
    value: 500,
    suffix: "+",
    label: { ar: "مشروع طلابي", en: "Student projects" },
  },
  {
    id: "satisfaction",
    value: 98,
    suffix: "%",
    label: { ar: "رضا الأولياء", en: "Parent satisfaction" },
  },
];
