"use client";

import { HeroVisual } from "@/components/HeroVisual";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Hero() {
  const { locale, tags, t } = useLocale();

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gsm-light pt-24 pb-8 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-14"
    >
      {/* Lightweight Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gsm-blue/[0.03]"
      />

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* Content */}
          <div className="text-center lg:text-start">

            <h1 className="text-balance text-[2rem] font-bold leading-[1.2] tracking-tight text-gsm-navy sm:text-5xl lg:text-[3.2rem]">
              {locale === "ar" ? (
                <>
                  التدريب على{" "}
                  <span className="text-gsm-blue">الإلكترونيات</span>
                  <br />
                  والصيانة والبرمجيات
                </>
              ) : (
                <>
                  Training in{" "}
                  <span className="text-gsm-blue">Electronics</span>
                  <br />
                  Maintenance & Software
                </>
              )}
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-gsm-muted sm:text-lg lg:mx-0">
              {locale === "ar" ? (
                <>
                  نقدم برامج تدريبية{" "}
                  <span className="font-semibold text-gsm-blue">
                    عملية ومتخصصة
                  </span>{" "}
                  في الإلكترونيات والبرمجيات وصيانة الموبايل، بالإضافة إلى قسم
                  مخصص للأطفال لتعلم{" "}
                  <span className="font-bold text-gsm-blue">
                    البرمجة والروبوتات والذكاء الاصطناعي
                  </span>{" "}
                  بأسلوب تفاعلي حديث يعتمد على التطبيق العملي والمشاريع
                  الحقيقية.
                </>
              ) : (
                <>
                  We provide{" "}
                  <span className="font-semibold text-gsm-blue">
                    practical and specialized
                  </span>{" "}
                  training programs in electronics, software, and mobile
                  maintenance, along with a dedicated section for kids to learn{" "}
                  <span className="font-bold text-gsm-blue">
                    programming, robotics & AI
                  </span>{" "}
                  through modern interactive hands-on projects.
                </>
              )}
            </p>

            {/* Optimized Tags */}
            <ul className="mx-auto mt-6 flex max-w-lg flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
              {tags.slice(0, 4).map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-gsm-navy/5 px-3 py-1 text-sm font-medium text-gsm-navy"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                href={siteConfig.whatsapp.href(locale)}
                variant="primary"
                size="lg"
              >
                {t("bookNow")}
              </Button>

              <Button
                href="#courses"
                variant="secondary"
                size="lg"
              >
                {t("exploreCourses")}
              </Button>
            </div>

          </div>

          {/* Hero Image */}
          <div className="order-first lg:order-last">
            <HeroVisual locale={locale} />
          </div>

        </div>
      </Container>
    </section>
  );
}