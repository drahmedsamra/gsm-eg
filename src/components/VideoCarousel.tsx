"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

import { Container } from "@/components/ui/Container";

import {
  videoTestimonials,
  type VideoTestimonial,
} from "@/data/videos";

export function VideoCarousel() {
  const isAr = true;

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
          `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`,
      })),
    []
  );

  function scrollByCards(dir: "prev" | "next") {
    const el = scrollerRef.current;

    if (!el) return;

    const width = Math.min(
      420,
      el.clientWidth * 0.85
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
    <section className="py-20 sm:py-24">

      <Container>

        <div className="flex items-end justify-between gap-3">

          <div>

            <div className="mb-3 text-sm font-semibold text-gsm-blue">
              الفيديوهات
            </div>

            <h2 className="text-3xl font-bold text-gsm-navy sm:text-4xl">
              قصص النجاح والفيديوهات
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-gsm-muted">
              شاهد تجارب الطلاب والمشاريع داخل GSM Academy
            </p>

          </div>

          <div className="hidden md:flex items-center gap-2">

            <NavButton
              onClick={() => scrollByCards("prev")}
              ariaLabel="Previous"
            >
              {prevIcon}
            </NavButton>

            <NavButton
              onClick={() => scrollByCards("next")}
              ariaLabel="Next"
            >
              {nextIcon}
            </NavButton>

          </div>

        </div>

        <div
          ref={scrollerRef}
          className="mt-8 flex gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >

          {cards.map((v) => (

            <button
              key={v.id}
              onClick={() => setActive(v)}
              className="min-w-[85%] text-start sm:min-w-[420px] md:min-w-[460px]"
              style={{ scrollSnapAlign: "start" }}
              aria-label={v.title}
            >

              <div className="group overflow-hidden rounded-3xl border border-gsm-navy/10 bg-white shadow-lg shadow-gsm-navy/5">

                <div className="relative aspect-video overflow-hidden">

                  <Image
                    src={v.thumbnail}
                    alt={v.title}
                    fill
                    sizes="(max-width: 768px) 85vw, 460px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />

                  <div className="absolute inset-0 grid place-items-center">

                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-md transition group-hover:bg-white/20">

                      <Play className="h-6 w-6 text-white" />

                    </div>

                  </div>

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">

                    <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur-md">

                      قصة نجاح

                    </span>

                  </div>

                </div>

                <div className="p-4">

                  <div className="text-xl font-semibold text-gsm-navy">
                    {v.title}
                  </div>

                  {v.caption ? (
                    <div className="mt-2 text-gsm-muted">
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
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/60 ring-1 ring-slate-900/10 backdrop-blur-md transition hover:bg-white"
    >
      {children}
    </button>
  );
}

function VideoModal({
  youtubeId,
  title,
  onClose,
}: {
  youtubeId: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[80]">

      <div
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute inset-x-4 top-20 mx-auto max-w-4xl">

        <div className="overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-[0_50px_120px_-70px_rgba(2,6,23,0.9)]">

          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-white">

            <div className="text-sm font-semibold">
              {title}
            </div>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 hover:bg-white/15"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>

          </div>

          <div className="relative aspect-video bg-black">

            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />

          </div>

        </div>

      </div>

    </div>
  );
}