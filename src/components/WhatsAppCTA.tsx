"use client";

import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { t as pick } from "@/lib/i18n/types";

export function WhatsAppCTA() {
  const { locale, t } = useLocale();

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 sm:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="section-dark absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(26,26,255,0.25),transparent_50%)]"
      />
      <Container className="relative">
        <FadeIn>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm sm:p-12">
            <p className="font-en text-sm font-semibold uppercase tracking-widest text-gsm-blue/90">
              {t("contactEyebrow")}
            </p>
            <h2 id="contact-heading" className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              {t("contactTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75">
              {t("contactDesc")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href={siteConfig.whatsapp.href(locale)}
                variant="primary"
                size="lg"
                className="min-w-[200px]"
              >
                {t("contactWhatsapp")}
              </Button>
              <Button href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} variant="outline" size="lg">
                {siteConfig.phone}
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/50">
              {pick(locale, siteConfig.address)} · {siteConfig.email}
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
