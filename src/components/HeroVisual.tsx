import Image from "next/image";

export function HeroVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-2xl"
      aria-hidden
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-gsm-blue/15 to-gsm-red/10 blur-3xl" />

      {/* Main Image */}
      <div className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white shadow-2xl shadow-gsm-navy/10">
        <Image
          src="/assets/images/hero/gsm-hero.webp"
          alt="GSM Academy"
          width={1400}
          height={1000}
          priority
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gsm-navy/20 via-transparent to-transparent" />
      </div>

      {/* Mobile Maintenance */}
      <div
        className="absolute top-6 start-6 animate-float"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="rounded-2xl bg-white/95 px-5 py-4 text-center shadow-xl backdrop-blur-md">
          <p className="text-lg font-extrabold text-gsm-blue">
            صيانة الموبايل
          </p>

          <p className="mt-1 text-sm leading-6 text-gsm-muted">
            تعلم صيانة الهواتف
          </p>
        </div>
      </div>

      {/* Electronics */}
      <div
        className="absolute top-1/2 end-4 -translate-y-1/2 animate-float-slow"
        style={{ animationDelay: "0.7s" }}
      >
        <div className="rounded-2xl bg-gsm-navy px-5 py-4 text-center shadow-xl">
          <p className="text-lg font-extrabold text-white">
            الإلكترونيات
          </p>

          <p className="mt-1 text-sm leading-6 text-white/80">
            دوائر ومشاريع
          </p>
        </div>
      </div>

      {/* Kids Programming */}
      <div
        className="absolute bottom-6 start-10 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <div className="rounded-2xl bg-gsm-red px-5 py-4 text-center shadow-xl">
          <p className="text-lg font-extrabold text-white">
            برمجة للأطفال
          </p>

          <p className="mt-1 text-sm leading-6 text-white/85">
            روبوت وذكاء اصطناعي
          </p>
        </div>
      </div>
    </div>
  );
}