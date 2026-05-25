"use client";

import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { t as pick } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function WhatsAppCTA() {
  const { locale, t } = useLocale();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#312e81_0%,#1d4ed8_45%,#0f172a_100%)] py-12 sm:py-16"
      aria-labelledby="contact-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_55%)]"
      />

      <Container className="relative">
        <FadeIn>
          <div className="mx-auto max-w-3xl rounded-[28px] border border-white/20 bg-white/[0.12] p-6 text-center backdrop-blur-xl sm:p-10">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-[2px] w-8 rounded-full bg-blue-200/70 sm:w-12" />

              <p
                className={cn(
                  "text-lg font-extrabold text-white sm:text-2xl",
                  locale === "ar"
                    ? "tracking-normal"
                    : "uppercase tracking-[0.2em]",
                )}
              >
                {locale === "ar" ? "تواصل معنا" : "CONTACT US"}
              </p>

              <span className="h-[2px] w-8 rounded-full bg-blue-200/70 sm:w-12" />
            </div>

            <h2
              id="contact-heading"
              className="text-3xl font-extrabold leading-tight text-white sm:text-5xl"
            >
              {t("contactTitle")}
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
              {t("contactDesc")}
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href={siteConfig.whatsapp.href(locale)}
                variant="primary"
                size="lg"
                className="min-w-[190px]"
              >
                {t("contactWhatsapp")}
              </Button>

              <Button
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                variant="outline"
                size="lg"
                className="min-w-[190px] border-white/30 text-white hover:bg-white/10"
              >
                {locale === "ar" ? "اتصل تليفونيًا" : "Make a Call"}
              </Button>
            </div>

            <p className="mt-5 text-xs text-white/60 sm:text-sm">
              {pick(locale, siteConfig.address)} · {siteConfig.email}
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}