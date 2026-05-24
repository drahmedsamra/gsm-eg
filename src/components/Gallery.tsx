"use client";

import { useCallback, useEffect, useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { SectionTitle } from "@/components/SectionTitle";
import { Container } from "@/components/ui/Container";
import { MediaImage } from "@/components/ui/MediaImage";
import { galleryItems, type GalleryItem } from "@/data/gallery";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { t as pick } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

function GalleryTile({
  item,
  alt,
  onOpen,
  className,
}: {
  item: GalleryItem;
  alt: string;
  onOpen: (id: string) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "group relative min-h-[200px] overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsm-blue focus-visible:ring-offset-2",
        className,
      )}
      onClick={() => onOpen(item.id)}
      aria-label={`${alt}`}
    >
      <MediaImage
        id={item.imagePlaceholder}
        alt={alt}
        category="gallery"
        variant="gallery"
        className="h-full min-h-[200px] w-full transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 25vw"
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-gsm-navy/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="text-sm font-medium text-white">{alt}</span>
      </div>
    </button>
  );
}

export function Gallery() {
  const { locale, t } = useLocale();
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const openLightbox = useCallback((id: string) => {
    const idx = galleryItems.findIndex((g) => g.id === id);
    setSlideIndex(idx >= 0 ? idx : 0);
    setLightboxId(id);
  }, []);

  const closeLightbox = useCallback(() => setLightboxId(null), []);

  const activeItem = galleryItems[slideIndex];
  const activeAlt = activeItem ? pick(locale, activeItem.alt) : "";

  useEffect(() => {
    if (!lightboxId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft")
        setSlideIndex((i) => (i + 1) % galleryItems.length);
      if (e.key === "ArrowRight")
        setSlideIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxId, closeLightbox]);

  return (
    <section id="gallery" className="py-20 sm:py-24">
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow={t("galleryEyebrow")}
            eyebrowEn="Gallery"
            title={t("galleryTitle")}
            description={t("galleryDesc")}
          />
        </FadeIn>

        <div className="mt-14 hidden gap-4 md:grid md:grid-cols-4 md:grid-rows-2 md:auto-rows-[minmax(180px,1fr)]">
          {galleryItems.map((item) => (
            <GalleryTile
              key={item.id}
              item={item}
              alt={pick(locale, item.alt)}
              onOpen={openLightbox}
              className={cn(
                item.span === "wide" && "md:col-span-2",
                item.span === "tall" && "md:row-span-2",
              )}
            />
          ))}
        </div>

        <div className="mt-14 md:hidden">
          <GalleryTile
            item={galleryItems[slideIndex]}
            alt={pick(locale, galleryItems[slideIndex].alt)}
            onOpen={openLightbox}
            className="w-full"
          />
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              className="rounded-full border border-gsm-navy/15 px-4 py-2 text-sm font-medium text-gsm-navy hover:bg-gsm-navy/5"
              onClick={() =>
                setSlideIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length)
              }
            >
              {t("galleryPrev")}
            </button>
            <span className="text-sm text-gsm-muted">
              {slideIndex + 1} / {galleryItems.length}
            </span>
            <button
              type="button"
              className="rounded-full border border-gsm-navy/15 px-4 py-2 text-sm font-medium text-gsm-navy hover:bg-gsm-navy/5"
              onClick={() => setSlideIndex((i) => (i + 1) % galleryItems.length)}
            >
              {t("galleryNext")}
            </button>
          </div>
        </div>
      </Container>

      {lightboxId && activeItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gsm-navy/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activeAlt}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="absolute top-4 end-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={closeLightbox}
            aria-label={t("galleryClose")}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative min-h-[300px] w-full">
              <MediaImage
                id={activeItem.imagePlaceholder}
                alt={activeAlt}
                category="gallery"
                variant="gallery"
                className="min-h-[300px] max-h-[85vh] w-full"
                sizes="100vw"
              />
            </div>
            <p className="absolute bottom-0 inset-x-0 bg-gsm-navy/80 p-4 text-center text-white">
              {activeAlt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
