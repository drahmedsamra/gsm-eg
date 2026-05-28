"use client";

import { HeroVisual } from "@/components/HeroVisual";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Hero() {
  const { locale, t, tags } = useLocale();

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-gsm-light pt-24 pb-14 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(26,26,255,0.12),transparent)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute top-0 end-0 h-96 w-96 rounded-full bg-gsm-red/5 blur-3xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 start-0 h-80 w-80 rounded-full bg-gsm-blue/8 blur-3xl"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <div className="text-center lg:text-start">

            {/* 
            <p className="mb-4 inline-flex items-center rounded-full border border-gsm-navy/10 bg-white px-4 py-1.5 text-xs font-semibold text-gsm-blue shadow-sm sm:text-sm">
              <span className="me-2 h-2 w-2 rounded-full bg-gsm-red animate-pulse" />
              {t("heroBadge")}
            </p> 
            */}

            <h1 className="text-balance text-[2.2rem] font-bold leading-[1.1] tracking-tight text-gsm-navy sm:text-5xl lg:text-[3.25rem]">
              {t("heroTitle")}
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-gsm-muted sm:text-lg lg:mx-0">
              {t("heroSubtitle")}
            </p>

            <ul className="mx-auto mt-6 flex max-w-lg flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-gsm-navy/5 px-3 py-1 text-sm font-medium text-gsm-navy"
                >
                  {tag}
                </li>
              ))}
            </ul>

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

          <div className="order-first lg:order-last">
            <HeroVisual locale={locale} />
          </div>

        </div>
      </Container>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gsm-navy/10 to-transparent"
      />
    </section>
  );
}