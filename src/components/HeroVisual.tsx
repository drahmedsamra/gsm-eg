import Image from "next/image";

import { FloatingCards } from "./FloatingCards";

type HeroVisualProps = {
  locale: "ar" | "en";
};

export function HeroVisual({ locale }: HeroVisualProps) {
  return (
    <div
      className="relative mx-auto w-full max-w-2xl"
      aria-hidden
    >
      {/* Soft Glow */}
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-gsm-blue/10 to-gsm-red/5 blur-lg" />

      {/* Main Image */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-lg shadow-gsm-navy/10 sm:rounded-[32px]">
        <Image
          src="/assets/images/hero/gsm-hero.webp"
          alt="GSM Egypt Academy"
          width={900}
          height={650}
          priority
          quality={75}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gsm-navy/20 via-transparent to-transparent" />
      </div>

      {/* Temporarily disable to test performance */}
      {/* <FloatingCards locale={locale} /> */}

      <FloatingCards locale={locale} />
    </div>
  );
}