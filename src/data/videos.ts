import type { LocalizedString } from "@/lib/i18n/types";

export type VideoTestimonial = {
  id: string;
  youtubeId: string;
  url: string;
  label: LocalizedString;
  caption?: LocalizedString;
};

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "v1",
    youtubeId: "3Qf5RxJ28zI",
    url: "https://youtu.be/3Qf5RxJ28zI",
    label: {
      ar: "قصة نجاح — صيانة الموبايل والإلكترونيات",
      en: "Success story — Mobile Maintenance",
    },
  },
  {
    id: "v2",
    youtubeId: "zFmUwF3Bj3M",
    url: "https://youtu.be/zFmUwF3Bj3M",
    label: {
      ar: "قصة نجاح — تدريب عملي",
      en: "Success story — Hands-on training",
    },
  },
  {
    id: "v3",
    youtubeId: "L7IHU62fipY",
    url: "https://youtu.be/L7IHU62fipY",
    label: {
      ar: "قصة نجاح — جاهز لسوق العمل",
      en: "Success story — Job-ready",
    },
  },
  {
    id: "v4",
    youtubeId: "badv18nlrE0",
    url: "https://youtube.com/shorts/badv18nlrE0?si=1470UUOgoNkAuJZe",
    label: {
      ar: "Shorts — تجربة طالب",
      en: "Shorts — Student experience",
    },
  },
];