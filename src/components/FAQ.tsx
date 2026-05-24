"use client";

import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { SectionTitle } from "@/components/SectionTitle";
import { Container } from "@/components/ui/Container";
import { faqItems } from "@/data/faq";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { t as pick } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function FAQ() {
  const { locale, t } = useLocale();
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="faq" className="bg-gsm-light py-20 sm:py-24">
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow={t("faqEyebrow")}
            eyebrowEn="FAQ"
            title={t("faqTitle")}
            description={t("faqDesc")}
          />
        </FadeIn>

        <div className="mx-auto mt-14 max-w-3xl">
          {faqItems.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <FadeIn key={item.id} delay={i * 50}>
                <div className="border-b border-gsm-navy/10 last:border-0">
                  <h3>
                    <button
                      type="button"
                      id={`faq-trigger-${item.id}`}
                      className="flex w-full items-center justify-between gap-4 py-5 text-start text-lg font-semibold text-gsm-navy transition-colors hover:text-gsm-blue"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${item.id}`}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                    >
                      {pick(locale, item.question)}
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gsm-navy/5 text-gsm-blue transition-transform duration-300",
                          isOpen && "rotate-180 bg-gsm-blue/10",
                        )}
                        aria-hidden
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${item.id}`}
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-sm leading-relaxed text-gsm-muted sm:text-base">
                        {pick(locale, item.answer)}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
