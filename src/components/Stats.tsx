"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { Container } from "@/components/ui/Container";
import { stats } from "@/data/stats";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { t as pick } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

function AnimatedCounter({
  value,
  suffix = "",
  active,
  locale,
}: {
  value: number;
  suffix?: string;
  active: boolean;
  locale: "ar" | "en";
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;

    const duration = 1600;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [active, value]);

  return (
    <span className="tabular-nums">
      {display.toLocaleString(locale === "ar" ? "ar-EG" : "en-US")}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { locale, t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24"
      aria-label={t("statsAria")}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,26,255,0.08),transparent_70%)]"
      />
      <Container className="relative">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <FadeIn key={stat.id} delay={i * 80}>
              <div
                className={cn(
                  "rounded-2xl border border-gsm-navy/8 bg-white p-8 text-center shadow-lg",
                  "transition-shadow duration-300 hover:shadow-xl hover:shadow-gsm-blue/10 glow-blue",
                )}
              >
                <p className="text-4xl font-bold text-gsm-blue sm:text-5xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    active={active}
                    locale={locale}
                  />
                </p>
                <p className="mt-2 font-semibold text-gsm-navy">{pick(locale, stat.label)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
