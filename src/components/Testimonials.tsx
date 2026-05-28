"use client";

import { SectionTitle } from "@/components/SectionTitle";
import { Container } from "@/components/ui/Container";
import { MediaImage } from "@/components/ui/MediaImage";

import { testimonials } from "@/data/testimonials";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { t as pick } from "@/lib/i18n/types";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function StarRating({
  rating,
  label,
}: {
  rating: number;
  label: string;
}) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${label} ${rating}/5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "text-amber-400"
              : "text-gsm-navy/15"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const { locale, t } = useLocale();

  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-white py-20 sm:py-24"
    >
      <Container>

        <SectionTitle
          eyebrow={t("testimonialsEyebrow")}
          eyebrowEn="Testimonials"
          title={t("testimonialsTitle")}
          description={t("testimonialsDesc")}
        />

        <div className="mt-14 overflow-hidden">

          <Swiper
            key={locale}
            dir={locale === "ar" ? "rtl" : "ltr"}
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            loop={true}
            speed={700}
            grabCursor={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              reverseDirection: locale === "ar",
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },

              640: {
                slidesPerView: 2,
              },

              1024: {
                slidesPerView: 3,
              },
            }}
          >

            {testimonials.map((item) => (

              <SwiperSlide
                key={item.id}
                className="h-auto"
              >

                <blockquote className="flex h-full flex-col rounded-3xl border border-gsm-navy/8 bg-gsm-light p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                  <StarRating
                    rating={item.rating}
                    label={t("rating")}
                  />

                  <p className="mt-5 flex-1 text-sm leading-8 text-gsm-muted sm:text-base">

                    &ldquo;
                    {pick(locale, item.content)}
                    &rdquo;

                  </p>

                  <footer className="mt-6 flex items-center gap-3 border-t border-gsm-navy/8 pt-6">

                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">

                      <MediaImage
                        id={item.avatarPlaceholder}
                        alt={pick(locale, item.name)}
                        category="avatars"
                        variant="avatar"
                        className="h-full w-full"
                        sizes="56px"
                      />

                    </div>

                    <div>

                      <cite className="not-italic text-lg font-bold text-gsm-navy">

                        {pick(locale, item.name)}

                      </cite>

                      <p className="mt-1 text-sm text-gsm-muted">

                        {pick(locale, item.role)}

                      </p>

                    </div>

                  </footer>

                </blockquote>

              </SwiperSlide>

            ))}

          </Swiper>

        </div>

      </Container>
    </section>
  );
}