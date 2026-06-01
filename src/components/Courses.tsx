"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { CourseCard } from "@/components/CourseCard";
import { FadeIn } from "@/components/FadeIn";
import { SectionTitle } from "@/components/SectionTitle";
import { Container } from "@/components/ui/Container";

import { courses } from "@/data/courses";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Courses() {
  const { t, locale } = useLocale();

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

        {/* Desktop Grid */}
        <div className="mt-14 hidden gap-8 sm:grid sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course, i) => (
            <FadeIn key={course.id} delay={i * 80}>
              <CourseCard course={course} />
            </FadeIn>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="mt-14 sm:hidden">
          <Swiper
            key={locale}
            dir={locale === "ar" ? "rtl" : "ltr"}
            spaceBetween={20}
            slidesPerView={1.2}
          >
            {courses.map((course) => (
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