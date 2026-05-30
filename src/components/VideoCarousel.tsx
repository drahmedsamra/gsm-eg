"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

import { Container } from "@/components/ui/Container";

import {
  videoTestimonials,
  type VideoTestimonial,
} from "@/data/videos";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export function VideoCarousel() {
  const { locale } = useLocale();

  const isAr = locale === "ar";

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] =
    useState<VideoTestimonial | null>(null);

  const cards = useMemo(
    () =>
      videoTestimonials.map((v) => ({
        ...v,

        title: isAr
          ? v.label.ar
          : v.label.en,

        thumbnail:
          `https://i.ytimg.com/vi/${v.youtubeId}/mqdefault.jpg`,
      })),
    [isAr]
  );

  function scrollByCards(dir: "prev" | "next") {
    const el = scrollerRef.current;

    if (!el) return;

    const width = Math.min(
      340,
      el.clientWidth * 0.78
    );

    el.scrollBy({
      left: dir === "next" ? width : -width,
      behavior: "smooth",
    });
  }

  const prevIcon = isAr
    ? <ChevronRight className="h-5 w-5" />
    : <ChevronLeft className="h-5 w-5" />;

  const nextIcon = isAr
    ? <ChevronLeft className="h-5 w-5" />
    : <ChevronRight className="h-5 w-5" />;

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(26,26,255,0.06),transparent_40%)]"
      />

      <Container>

        <div className="relative text-center">

          <div className="mx-auto max-w-3xl">

            <div className="mb-2 text-sm font-semibold text-gsm-blue">
              {isAr ? "الفيديوهات" : "Videos"}
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-gsm-navy sm:text-4xl">
              {isAr
                ? "قصص النجاح والفيديوهات"
                : "Success Stories & Videos"}
            </h2>

            <p className="mt-3 text-base leading-relaxed text-gsm-muted sm:text-lg">
              {isAr
                ? "شاهد تجارب وآراء خريجي أكاديمية جي إس إم بعد انتهاء آخر محاضرة"
                : "Watch Real Reviews and Experiences from GSM Academy Graduates After Their Final Lecture"}
            </p>

          </div>

          <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-3 md:flex">

            <NavButton
              onClick={() => scrollByCards("prev")}
              ariaLabel={isAr ? "السابق" : "Previous"}
            >
              {prevIcon}
            </NavButton>

            <NavButton
              onClick={() => scrollByCards("next")}
              ariaLabel={isAr ? "التالي" : "Next"}
            >
              {nextIcon}
            </NavButton>

          </div>

        </div>

        <div
          ref={scrollerRef}
          className="mt-8 flex gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-12"
          style={{ scrollSnapType: "x mandatory" }}
        >

          {cards.map((v) => (

            <button
              key={v.id}
              onClick={() => setActive(v)}
              className="min-w-[78%] text-start sm:min-w-[340px] md:min-w-[390px]"
              style={{ scrollSnapAlign: "start" }}
              aria-label={v.title}
            >

              <div className="group overflow-hidden rounded-[24px] border border-white/50 bg-white/90 shadow-[0_20px_60px_-20px_rgba(2,6,23,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-20px_rgba(2,6,23,0.18)]">

                <div className="relative aspect-video overflow-hidden">

                  <Image
                    src={v.thumbnail}
                    alt={v.title}
                    fill
                    sizes="(max-width: 768px) 78vw, 390px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-950/5 to-transparent" />

                  <div className="absolute inset-0 grid place-items-center">

                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur-xl transition duration-300 group-hover:scale-110 group-hover:bg-white/25">

                      <Play className="h-6 w-6 fill-white text-white" />

                    </div>

                  </div>

                  <div className="absolute top-3 left-3">

                    <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/15 backdrop-blur-md sm:text-sm">

                      {isAr ? "قصة نجاح" : "Success Story"}

                    </span>

                  </div>

                </div>

                <div className="p-4 text-center sm:p-5">

                  <div className="text-lg font-bold tracking-tight text-gsm-navy sm:text-xl">
                    {v.title}
                  </div>

                  {v.caption ? (
                    <div className="mt-2 text-sm leading-relaxed text-gsm-muted">
                      {isAr
                        ? v.caption.ar
                        : v.caption.en}
                    </div>
                  ) : null}

                </div>

              </div>

            </button>

          ))}

        </div>

      </Container>

      {active ? (
        <VideoModal
          title={
            isAr
              ? active.label.ar
              : active.label.en
          }
          youtubeId={active.youtubeId}
          onClose={() => setActive(null)}
          isAr={isAr}
        />
      ) : null}

    </section>
  );
}

function NavButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-lg shadow-gsm-navy/5 ring-1 ring-gsm-navy/10 backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-white"
    >
      {children}
    </button>
  );
}

function VideoModal({
  youtubeId,
  title,
  onClose,
  isAr,
}: {
  youtubeId: string;
  title: string;
  onClose: () => void;
  isAr: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[80]">

      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="absolute inset-x-4 top-10 mx-auto max-w-5xl sm:top-20">

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black/95 shadow-[0_50px_120px_-70px_rgba(2,6,23,0.9)]">

          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-white sm:px-5 sm:py-4">

            <div className="text-sm font-semibold">
              {title}
            </div>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 transition hover:bg-white/15"
              onClick={onClose}
              aria-label={isAr ? "إغلاق" : "Close"}
            >
              ✕
            </button>

          </div>

          <div className="relative aspect-video bg-black">

            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />

          </div>

        </div>

      </div>

    </div>
  );
}