"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import type { Course } from "@/data/courses";
import { getCourseWhatsAppUrl } from "@/data/courses";
import { MediaImage } from "@/components/ui/MediaImage";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { OfferCountdown } from "@/components/OfferCountdown";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { t as pick } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

const accentMap = {
  blue: "group-hover:shadow-gsm-blue/20 group-hover:border-gsm-blue/30",
  red: "group-hover:shadow-gsm-red/20 group-hover:border-gsm-red/30",
  navy: "group-hover:shadow-gsm-navy/15 group-hover:border-gsm-navy/20",
} as const;

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  const { locale, t } = useLocale();
  const title = pick(locale, course.title);
  const isAr = locale === "ar";

  const waUrl = getCourseWhatsAppUrl({
    title,
    price: pick(locale, course.price),
    oldPrice: course.oldPrice ? pick(locale, course.oldPrice) : undefined,
    locale,
  });

  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined" && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq(
        "track",
        "Lead",
        {
          content_name: title,
          value: course.priceNumber,
          currency: "EGP",
        }
      );
    }
  };

  const savings =
    course.oldPriceNumber && course.priceNumber
      ? course.oldPriceNumber - course.priceNumber
      : null;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-gsm-navy/8 bg-white shadow-md transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-2xl",
        accentMap[course.accent]
      )}
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-full object-cover brightness-105 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <MediaImage
            id={course.imagePlaceholder}
            alt={title}
            category="courses"
            variant="course"
            className="h-full w-full brightness-105 transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-gsm-navy/40 via-transparent to-transparent" />

        {/* Category Pill */}
        <span className="absolute bottom-3 start-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-gsm-navy shadow-xs backdrop-blur-sm">
          {pick(locale, course.category)}
        </span>

        {/* Discount Badge */}
        {course.oldPrice && (
          <span className="absolute top-3 start-3 rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white shadow-lg shadow-red-500/40">
            {isAr ? "🔥 خصم خاص" : "Special Offer"}
          </span>
        )}

        {/* Savings Tag */}
        {savings && savings > 0 && (
          <span className="absolute top-3 end-3 rounded-full bg-[var(--gsm-navy)]/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-black text-white shadow-xs border border-white/20">
            {isAr ? `وفر ${savings} جنيه` : `Save EGP ${savings}`}
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-6">
        {/* Urgency Badge */}
        <div className="mb-3">
          <UrgencyBadge seatsLeft={course.seatsLeft || 3} />
        </div>

        <Link href={`/courses/${course.slug}`}>
          <h3 className="text-xl font-bold text-gsm-navy hover:text-[var(--gsm-blue)] transition">
            {title}
          </h3>
        </Link>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-gsm-muted line-clamp-2">
          {pick(locale, course.description)}
        </p>

        {/* Price & Offer Timer */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-gsm-red">
              {pick(locale, course.price)}
            </span>

            {course.oldPrice && (
              <span className="text-sm text-gsm-muted line-through font-semibold">
                {pick(locale, course.oldPrice)}
              </span>
            )}
          </div>

          {course.oldPrice && <OfferCountdown compact />}
        </div>

        {/* Metadata */}
        <dl className="mt-4 flex gap-4 text-xs text-gsm-muted">
          <div>
            <dt className="sr-only">{t("duration")}</dt>
            <dd>
              <span className="font-semibold text-gsm-navy">
                ⏱ {pick(locale, course.duration)}
              </span>
            </dd>
          </div>

          <div>
            <dt className="sr-only">{t("level")}</dt>
            <dd>
              <span>🎯 {pick(locale, course.level)}</span>
            </dd>
          </div>
        </dl>

        {/* Actions: Conversion WhatsApp Booking & Details Link */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--gsm-blue)] px-3 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[var(--gsm-navy)] hover:scale-[1.02] cursor-pointer"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{isAr ? "احجز بالخصم" : "Book Offer"}</span>
          </a>

          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center justify-center gap-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-gray-100 hover:text-[var(--gsm-blue)]"
          >
            <span>{isAr ? "تفاصيل الكورس" : "Details"}</span>
            {isAr ? <ArrowLeft className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
          </Link>
        </div>
      </div>
    </article>
  );
}
