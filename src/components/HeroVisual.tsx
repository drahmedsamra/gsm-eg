import Image from "next/image";

// import { FloatingCards } from "./FloatingCards";

type HeroVisualProps = {
  locale: "ar" | "en";
};

export function HeroVisual({ locale }: HeroVisualProps) {
  return (
    <div
      className="relative mx-auto w-full max-w-2xl"
      aria-hidden
    >
      {/* Ultra Lightweight Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gsm-blue/5" />

      {/* Main Image */}
      <div className="relative overflow-hidden rounded-3xl bg-white">
        <Image
          src="/assets/images/hero/gsm-herov3.webp"
          alt="GSM Egypt Academy"
          width={900}
          height={650}
          priority
          fetchPriority="high"
          quality={65}
          sizes="(max-width: 768px) 100vw, 900px"
          className="block h-auto w-full object-cover"
        />
      </div>

      {/* Floating Cards */}
      {/* <FloatingCards locale={locale} /> */}
    </div>
  );
}