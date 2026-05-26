"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import { FadeIn } from "@/components/FadeIn";
import { SectionTitle } from "@/components/SectionTitle";
import { Container } from "@/components/ui/Container";
import { MediaImage } from "@/components/ui/MediaImage";

import {
  galleryItems,
} from "@/data/gallery";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { t as pick } from "@/lib/i18n/types";

export function Gallery() {
  const { locale, t } = useLocale();

  const scrollerRef =
    useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const activeItem =
    activeIndex !== null
      ? galleryItems[activeIndex]
      : null;

  const activeAlt = activeItem
    ? pick(locale, activeItem.alt)
    : "";

  const scrollByCards = (
    dir: "prev" | "next"
  ) => {

    const el = scrollerRef.current;

    if (!el) return;

    const width = Math.min(
      360,
      el.clientWidth * 0.8
    );

    el.scrollBy({
      left: dir === "next"
        ? width
        : -width,
      behavior: "smooth",
    });
  };

  const openLightbox = useCallback(
    (index: number) => {
      setActiveIndex(index);
    },
    []
  );

  const closeLightbox = useCallback(
    () => setActiveIndex(null),
    []
  );

  useEffect(() => {

    if (activeIndex === null) return;

    const onKey = (
      e: KeyboardEvent
    ) => {

      if (e.key === "Escape")
        closeLightbox();

      if (e.key === "ArrowLeft")
        setActiveIndex(
          (i) =>
            i === null
              ? 0
              : (i + 1) %
                galleryItems.length
        );

      if (e.key === "ArrowRight")
        setActiveIndex(
          (i) =>
            i === null
              ? 0
              : (i - 1 + galleryItems.length) %
                galleryItems.length
        );
    };

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      onKey
    );

    return () => {

      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        onKey
      );
    };

  }, [activeIndex, closeLightbox]);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden py-12 sm:py-16 lg:py-24"
    >

      {/* Background Glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(26,26,255,0.06),transparent_40%)]"
      />

      <Container>

        <FadeIn>

          <div className="relative text-center">

            <div className="mx-auto max-w-3xl">

              <SectionTitle
                eyebrow={t("galleryEyebrow")}
                eyebrowEn="Gallery"
                title={t("galleryTitle")}
                description={t("galleryDesc")}
              />

            </div>

            {/* Navigation */}
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-3 md:flex">

              <NavButton
                onClick={() =>
                  scrollByCards("prev")
                }
              >
                <ChevronRight className="h-5 w-5" />
              </NavButton>

              <NavButton
                onClick={() =>
                  scrollByCards("next")
                }
              >
                <ChevronLeft className="h-5 w-5" />
              </NavButton>

            </div>

          </div>

        </FadeIn>

        {/* Horizontal Showcase */}
        <div
          ref={scrollerRef}
          className="mt-8 flex gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-12"
          style={{
            scrollSnapType:
              "x mandatory",
          }}
        >

          {galleryItems.map(
            (item, index) => (

              <button
                key={item.id}
                type="button"
                onClick={() =>
                  openLightbox(index)
                }
                className="group relative min-w-[78%] overflow-hidden rounded-[28px] border border-white/40 bg-white/70 shadow-[0_20px_60px_-20px_rgba(2,6,23,0.12)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-20px_rgba(2,6,23,0.18)] sm:min-w-[360px] md:min-w-[460px]"
                style={{
                  scrollSnapAlign:
                    "start",
                }}
              >

                <div className="relative aspect-[16/10] overflow-hidden rounded-[28px]">

                  <MediaImage
                    id={
                      item.imagePlaceholder
                    }
                    alt={pick(
                      locale,
                      item.alt
                    )}
                    category="gallery"
                    variant="gallery"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 78vw, 460px"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-center sm:p-6">

                    <div className="translate-y-1 transition duration-500 group-hover:translate-y-0">

                      <p className="text-xl font-bold tracking-tight text-white sm:text-2xl">

                        {pick(
                          locale,
                          item.alt
                        )}

                      </p>

                      <p className="mt-1 text-xs text-white/80 sm:text-sm">

                        GSM Egypt Academy

                      </p>

                    </div>

                  </div>

                </div>

              </button>

            )
          )}

        </div>

      </Container>

      {/* Lightbox */}
      {activeItem && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={closeLightbox}
        >

          <button
            type="button"
            className="absolute top-5 end-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/15"
            onClick={closeLightbox}
          >

            <X className="h-5 w-5" />

          </button>

          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-black/90 shadow-[0_50px_120px_-70px_rgba(2,6,23,0.9)]"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="relative">

              <MediaImage
                id={
                  activeItem.imagePlaceholder
                }
                alt={activeAlt}
                category="gallery"
                variant="gallery"
                className="max-h-[85vh] w-full object-cover"
                sizes="100vw"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center sm:p-8">

                <p className="text-xl font-bold text-white sm:text-2xl">

                  {activeAlt}

                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

function NavButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-lg shadow-gsm-navy/5 ring-1 ring-gsm-navy/10 backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-white"
    >
      {children}
    </button>
  );
}