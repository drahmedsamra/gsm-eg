"use client";

import { useEffect, useState } from "react";

type FloatingCardsProps = {
  locale: "ar" | "en";
};

export function FloatingCards({
  locale,
}: FloatingCardsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Mobile Maintenance */}
      <div
        className={`absolute top-3 start-3 sm:top-6 sm:start-6 will-change-transform ${
          mounted ? "animate-float" : ""
        }`}
        style={{ animationDelay: "0.2s" }}
      >
        <div className="w-[150px] rounded-xl bg-white/92 px-3 py-2 text-center shadow-lg backdrop-blur-sm sm:w-[230px] sm:rounded-2xl sm:px-5 sm:py-4 sm:shadow-xl">
          <p className="text-sm font-extrabold text-gsm-blue sm:text-lg">
            {locale === "ar"
              ? "صيانة الموبايل"
              : "Mobile Maintenance"}
          </p>

          <p className="mt-1 text-[11px] leading-5 text-gsm-muted sm:text-sm sm:leading-6">
            {locale === "ar"
              ? "تعلم صيانة الهواتف"
              : "Learn smartphone repair"}
          </p>
        </div>
      </div>

      {/* Electronics */}
      <div
        className={`absolute top-1/2 end-2 -translate-y-1/2 will-change-transform sm:end-4 ${
          mounted ? "animate-float-slow" : ""
        }`}
        style={{ animationDelay: "0.7s" }}
      >
        <div className="w-[145px] rounded-xl bg-gsm-navy/95 px-3 py-2 text-center shadow-lg sm:w-[220px] sm:rounded-2xl sm:px-5 sm:py-4 sm:shadow-xl">
          <p className="text-sm font-extrabold text-white sm:text-lg">
            {locale === "ar"
              ? "الإلكترونيات"
              : "Electronics"}
          </p>

          <p className="mt-1 text-[11px] leading-5 text-white/80 sm:text-sm sm:leading-6">
            {locale === "ar"
              ? "دوائر ومشاريع"
              : "Circuits & Projects"}
          </p>
        </div>
      </div>

      {/* Kids Programming */}
      <div
        className={`absolute bottom-3 start-5 will-change-transform sm:bottom-6 sm:start-10 ${
          mounted ? "animate-float" : ""
        }`}
        style={{ animationDelay: "1s" }}
      >
        <div className="w-[165px] rounded-xl bg-gsm-red/95 px-3 py-2 text-center shadow-lg sm:w-[250px] sm:rounded-2xl sm:px-5 sm:py-4 sm:shadow-xl">
          <p className="text-sm font-extrabold text-white sm:text-lg">
            {locale === "ar"
              ? "برمجة للأطفال"
              : "Kids Programming"}
          </p>

          <p className="mt-1 text-[11px] leading-5 text-white/85 sm:text-sm sm:leading-6">
            {locale === "ar"
              ? "روبوت وذكاء اصطناعي"
              : "Robotics & AI"}
          </p>
        </div>
      </div>
    </>
  );
}
``