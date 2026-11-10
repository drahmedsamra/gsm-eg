"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { CourseCard } from "@/components/CourseCard";
import { FadeIn } from "@/components/FadeIn";
import { SectionTitle } from "@/components/SectionTitle";
import { Container } from "@/components/ui/Container";
import { courses as defaultCourses, type Course } from "@/data/courses";
import { useLocale } from "@/lib/i18n/LocaleProvider";

type CoursesProps = {
  initialCourses?: Course[];
};

export function Courses({ initialCourses }: CoursesProps) {
  const { t, locale } = useLocale();
  const displayCourses = initialCourses && initialCourses.length > 0 ? initialCourses : defaultCourses;

  return (
    <section
      id="courses"
      className="py-20 sm:py-24"
      aria-labelledby="courses-heading"
    >
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow={t("coursesEyebrow")}
            eyebrowEn="Programs"
            title={t("coursesTitle")}
            description={t("coursesDesc")}
          />
        </FadeIn>

        {/* Urgency Announcement Bar */}
        <FadeIn delay={60}>
          <div className="mt-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 px-5 py-2.5 text-xs sm:text-sm font-bold text-red-800 shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              <span>
                {locale === "ar"
                  ? "🔥 خصومات حصرية لدفعة هذا الشهر — احجز مقعدك بالخصم قبل اكتمال العدد!"
                  : "🔥 Special discounts for this month's batch — Book your seat before it fills up!"}
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Desktop Grid */}
        <div className="mt-10 hidden gap-8 sm:grid sm:grid-cols-2 xl:grid-cols-3">
          {displayCourses.map((course, i) => (
            <FadeIn key={course.id} delay={i * 80}>
              <CourseCard course={course} />
            </FadeIn>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="mt-10 sm:hidden">
          <Swiper
            key={locale}
            dir={locale === "ar" ? "rtl" : "ltr"}
            spaceBetween={20}
            slidesPerView={1.15}
          >
            {displayCourses.map((course) => (
              <SwiperSlide key={course.id}>
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
