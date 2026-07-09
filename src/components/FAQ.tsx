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

  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-gradient-to-b from-[#f7f8ff] via-white to-[#f8f9ff] py-16 sm:py-20"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_40%)]"
      />

      <Container className="relative">
        <FadeIn>
          <SectionTitle
            eyebrow={t("faqEyebrow")}
            title={t("faqTitle")}
            description={t("faqDesc")}
          />
        </FadeIn>

        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {faqItems.map((item, i) => {
            const isOpen = openId === item.id;

            return (
              <FadeIn key={item.id} delay={i * 60}>
                <div
                  className={cn(
                    "group overflow-hidden rounded-[24px] border border-white/60 bg-white/80 backdrop-blur-xl",
                    "shadow-lg",
                    "transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-xl",
                    isOpen &&
                      "border-gsm-blue/20 shadow-xl",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      id={`faq-trigger-${item.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${item.id}`}
                      onClick={() =>
                        setOpenId(isOpen ? null : item.id)
                      }
                      className="flex w-full items-center justify-between gap-5 px-6 py-6 text-start sm:px-8 sm:py-7"
                    >
                      <span
                        className={cn(
                          "text-lg font-bold leading-relaxed tracking-tight text-gsm-navy transition-colors duration-300 sm:text-[1.45rem]",
                          "group-hover:text-gsm-navy",
                          isOpen && "text-gsm-blue",
                        )}
                      >
                        {pick(locale, item.question)}
                      </span>

                      <span
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                          "bg-gradient-to-br from-[#f4f7ff] to-[#edf2ff]",
                          "text-gsm-blue shadow-sm",
                          "transition-all duration-300",
                          "group-hover:scale-105",
                          isOpen &&
                            "bg-gsm-blue text-white shadow-md",
                        )}
                        aria-hidden
                      >
                        <span className="text-3xl font-light leading-none">
                          {isOpen ? "−" : "+"}
                        </span>
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${item.id}`}
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="mx-6 border-t border-gsm-navy/5 sm:mx-8" />

                      <p
                        className={cn(
                          "px-6 pb-7 pt-5 text-[15px] leading-8 text-gsm-muted sm:px-8 sm:text-base",
                          locale === "ar"
                            ? "font-medium"
                            : "font-normal",
                        )}
                      >
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