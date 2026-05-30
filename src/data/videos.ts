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
      ar: "آراء وتجارب 9 من خريجي أكاديمية جي إس إم",
      en: "Reviews & Experiences from ٩ GSM Academy Graduates",
    },
  },

  {
    id: "v2",
    youtubeId: "zFmUwF3Bj3M",
    url: "https://youtu.be/zFmUwF3Bj3M",
    label: {
      ar: "٤ خريجين يتحدثون عن تجربتهم",
      en: "4 GSM Academy Graduates Share Their Experience",
    },
  },

  {
    id: "v3",
    youtubeId: "L7IHU62fipY",
    url: "https://youtu.be/L7IHU62fipY",
    label: {
      ar: "٨ خريجين يصفون الكورس والمدربين",
      en: "8 Graduates Describe the Course and Trainers",
    },
  },

  {
    id: "v4",
    youtubeId: "badv18nlrE0",
    url: "https://youtube.com/shorts/badv18nlrE0?si=1470UUOgoNkAuJZe",
    label: {
      ar: "٩ خريجين بعد انتهاء آخر محاضرة",
      en: "9 Graduates Share Their Experience After the Final Lecture",
    },
  },

  {
    id: "v5",
    youtubeId: "ZeMFDjVUk7o",
    url: "https://youtube.com/shorts/ZeMFDjVUk7o?si=MNAkh8ZHATh8RhyR",
    label: {
      ar: "تجارب ٨ مهندسات من السودان قبل السفر وبعد انتهاء آخر محاضرة في أكاديمية جي إس إم",
      en: "The Journey and Experiences of 7 Female Engineers from Sudan at GSM Academy Until Their Final Lecture",
    },
  },
];