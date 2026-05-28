"use client";

import type { Course } from "@/data/courses";
import { Button } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import { siteConfig } from "@/data/site";
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

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-gsm-navy/8 bg-white shadow-md transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-2xl",
        accentMap[course.accent],
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <MediaImage
          id={course.imagePlaceholder}
          alt={title}
          category="courses"
          variant="course"
          className="h-full w-full brightness-105 transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gsm-navy/30 via-transparent to-transparent" />

        <span className="absolute bottom-4 start-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gsm-navy backdrop-blur-sm">
          {pick(locale, course.category)}
        </span>

        <span
          className={cn(
            "absolute top-4 end-4 text-xs font-semibold text-white/90",
            locale === "en" && "font-en uppercase tracking-wider",
          )}
        >
          {pick(locale, course.title)}
        </span>

        {course.oldPrice && (
          <span className="absolute top-4 start-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-red-500/30">
            {locale === "ar" ? "خصم خاص" : "Special Offer"}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-gsm-navy">
          {title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-gsm-muted">
          {pick(locale, course.description)}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-2xl font-extrabold text-gsm-red">
            {pick(locale, course.price)}
          </span>

          {course.oldPrice && (
            <span className="text-sm text-gsm-muted line-through">
              {pick(locale, course.oldPrice)}
            </span>
          )}
        </div>

        <dl className="mt-4 flex gap-4 text-xs text-gsm-muted">
          <div>
            <dt className="sr-only">
              {t("duration")}
            </dt>

            <dd>
              <span className="font-semibold text-gsm-navy">
                {pick(locale, course.duration)}
              </span>
            </dd>
          </div>

          <div>
            <dt className="sr-only">
              {t("level")}
            </dt>

            <dd>
              {pick(locale, course.level)}
            </dd>
          </div>
        </dl>

        <Button
          href={siteConfig.whatsapp.href(locale)}
          variant="ghost"
          size="sm"
          className="mt-5 w-full sm:w-auto"
        >
          {t("bookSeat")}
        </Button>
      </div>
    </article>
  );
}