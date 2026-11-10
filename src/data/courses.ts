import type { LocalizedString } from "@/lib/i18n/types";
import { supabase } from "@/lib/supabase";

export type Course = {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  category: LocalizedString;
  duration: LocalizedString;
  level: LocalizedString;
  imagePlaceholder: string;
  thumbnail?: string;
  accent: "blue" | "red" | "navy";
  price: LocalizedString;
  priceNumber: number;
  oldPrice?: LocalizedString;
  oldPriceNumber?: number;
  seatsLeft?: number;
  longDescription?: string;
};

// Fallback static courses (aligned with Supabase courses)
export const staticCourses: Course[] = [
  {
    id: "mobile-repair-course",
    slug: "mobile-repair-course",
    title: {
      ar: "كورس صيانة الموبايل",
      en: "Mobile Phone Repair Course",
    },
    description: {
      ar: "تعلم صيانة الهواتف الذكية عمليًا من البداية وحتى الاحتراف وتشخيص الأعطال بأحدث أجهزة القياس والمخططات.",
      en: "Learn smartphone diagnostics and practical repair techniques from scratch using modern tools and schematics.",
    },
    category: {
      ar: "صيانة وهندسة",
      en: "Maintenance & Skills",
    },
    duration: {
      ar: "32 ساعة تدريبية",
      en: "32 Hours",
    },
    level: {
      ar: "مبتدئ — محترف",
      en: "Beginner — Pro",
    },
    imagePlaceholder: "mobile",
    thumbnail: "https://iwovcjoddtvivakareuq.supabase.co/storage/v1/object/public/course-media/mobile-repair-course/thumbnail/mobile.webp",
    accent: "navy",
    price: {
      ar: "5000 جنيه",
      en: "EGP 5000",
    },
    priceNumber: 5000,
    oldPrice: {
      ar: "7000 جنيه",
      en: "EGP 7000",
    },
    oldPriceNumber: 7000,
    seatsLeft: 3,
    longDescription: "تعلم صيانة الموبايل من البداية وحتي الإحتراف في كورس عملي مع أفضل مهندسين صيانه بالوطن العربي",
  },
  {
    id: "electronics-course",
    slug: "electronics-course",
    title: {
      ar: "كورس الإلكترونيات العملية",
      en: "Practical Electronics Course",
    },
    description: {
      ar: "دوائر، مكونات إلكترونية، تحليل البوردات، واستخدام أجهزة القياس وتتبع الأعطال بشكل عملي 100%.",
      en: "Circuits, electronic components, board analysis, and hands-on multimeter diagnostics from scratch.",
    },
    category: {
      ar: "هندسة وإلكترونيات",
      en: "Engineering",
    },
    duration: {
      ar: "28 ساعة تدريبية",
      en: "28 Hours",
    },
    level: {
      ar: "مبتدئ — متوسط",
      en: "Beginner — Intermediate",
    },
    imagePlaceholder: "electronics",
    thumbnail: "https://iwovcjoddtvivakareuq.supabase.co/storage/v1/object/public/course-media/electronics-course/thumbnail/electronics.webp",
    accent: "navy",
    price: {
      ar: "6950 جنيه",
      en: "EGP 6950",
    },
    priceNumber: 6950,
    oldPrice: {
      ar: "7200 جنيه",
      en: "EGP 7200",
    },
    oldPriceNumber: 7200,
    seatsLeft: 4,
    longDescription: "تعلم الإلكترونيات العملية من البداية للاحتراف مع المهندس أحمد سمرة: تحليل الدوائر، قياس المكونات، واكتشاف الأعطال.",
  },
  {
    id: "little-inventor-course",
    slug: "little-inventor-course",
    title: {
      ar: "كورس المخترع الصغير",
      en: "Little Inventor (Coding & Robotics)",
    },
    description: {
      ar: "كورس يجمع بين البرمجة والإلكترونيات والروبوتات للأطفال في تجربة تعليمية ممتعة تساعدهم على بناء مشاريع ذكية.",
      en: "An integrated program combining coding, electronics, and robotics for kids to build real smart projects.",
    },
    category: {
      ar: "أطفال وروبوتات",
      en: "Kids & Robotics",
    },
    duration: {
      ar: "16 ساعة تدريبية",
      en: "16 Hours",
    },
    level: {
      ar: "للأطفال والناشئين",
      en: "Kids & Teens",
    },
    imagePlaceholder: "robotics",
    thumbnail: "https://iwovcjoddtvivakareuq.supabase.co/storage/v1/object/public/course-media/little-inventor-course/thumnail/kids%20.webp",
    accent: "blue",
    price: {
      ar: "4950 جنيه",
      en: "EGP 4950",
    },
    priceNumber: 4950,
    oldPrice: {
      ar: "6000 جنيه",
      en: "EGP 6000",
    },
    oldPriceNumber: 6000,
    seatsLeft: 2,
    longDescription: "كورس المخترع الصغير يجمع بين البرمجة والإلكترونيات والروبوتات في تجربة تفاعلية ممتعة ومحفزة على الابتكار.",
  },
];

// Helper to determine seats left deterministically
const seatsMap: Record<string, number> = {
  "mobile-repair-course": 3,
  "electronics-course": 4,
  "little-inventor-course": 2,
};

// Aliases map so old routes like /courses/mobile-maintenance redirect/resolve correctly
export const slugAliases: Record<string, string> = {
  "mobile-maintenance": "mobile-repair-course",
  "electronics": "electronics-course",
  "little-inventor": "little-inventor-course",
};

/**
 * Single Source of Truth: Fetch published courses from Supabase
 * with seamless fallback to static data if Supabase is offline.
 */
export async function getCourses(): Promise<Course[]> {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((item) => {
        const slug = item.slug || item.id;
        const matchingStatic = staticCourses.find(
          (c) => c.slug === slug || slugAliases[c.slug] === slug
        );

        const priceNum = Number(item.price) || 0;
        const oldPriceNum = item.old_price ? Number(item.old_price) : undefined;

        return {
          id: slug,
          slug,
          title: {
            ar: item.title,
            en: matchingStatic?.title.en || item.title,
          },
          description: {
            ar: item.short_description || "",
            en: matchingStatic?.description.en || item.short_description || "",
          },
          category: matchingStatic?.category || {
            ar: "دورات تدريبية",
            en: "Courses",
          },
          duration: {
            ar: item.duration || "30 ساعة",
            en: item.duration || "30 Hours",
          },
          level: matchingStatic?.level || {
            ar: "جميع المستويات",
            en: "All Levels",
          },
          imagePlaceholder: matchingStatic?.imagePlaceholder || "mobile",
          thumbnail: item.thumbnail || matchingStatic?.thumbnail,
          accent: matchingStatic?.accent || "navy",
          price: {
            ar: `${priceNum} جنيه`,
            en: `EGP ${priceNum}`,
          },
          priceNumber: priceNum,
          oldPrice: oldPriceNum
            ? {
                ar: `${oldPriceNum} جنيه`,
                en: `EGP ${oldPriceNum}`,
              }
            : undefined,
          oldPriceNumber: oldPriceNum,
          seatsLeft: seatsMap[slug] || 3,
          longDescription: item.long_description,
        };
      });
    }
  } catch (err) {
    console.warn("Could not fetch courses from Supabase, using static fallback:", err);
  }

  return staticCourses;
}

/**
 * Fetch a single course by slug (handles slug aliases as well)
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const normalizedSlug = slugAliases[slug] || slug;
  const allCourses = await getCourses();
  const found = allCourses.find((c) => c.slug === normalizedSlug || c.id === normalizedSlug);
  return found || null;
}

/**
 * Conversion Tracking: Generate pre-filled WhatsApp message for lead attribution
 */
export function getCourseWhatsAppUrl({
  title,
  price,
  oldPrice,
  locale = "ar",
}: {
  title: string;
  price?: string | number;
  oldPrice?: string | number;
  locale?: "ar" | "en";
}): string {
  const phone = "201011822931";
  const isEn = locale === "en";

  const priceText = price ? (isEn ? ` (Offer Price: ${price})` : ` (سعر العرض: ${price})`) : "";
  const discountText = oldPrice ? (isEn ? ` instead of ${oldPrice}` : ` بدلاً من ${oldPrice}`) : "";

  const message = isEn
    ? `Hello GSM Egypt Academy! I would like to book the "${title}" course with the exclusive website discount${priceText}${discountText}. Please send me the available schedules and reservation details.`
    : `مرحبًا أكاديمية GSM مصر! أريد حجز دورة "${title}" مع الاستفادة من خصم الموقع الإلكتروني الحصري${priceText}${discountText}. برجاء إرسال المواعيد المتاحة وتفاصيل تثبيت الحجز.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Backward-compatibility export
export const courses: Course[] = staticCourses;
