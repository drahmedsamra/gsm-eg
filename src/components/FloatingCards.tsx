type FloatingCardsProps = {
  locale: "ar" | "en";
};

export function FloatingCards({
  locale,
}: FloatingCardsProps) {
  return (
    <>
      {/* Mobile Maintenance */}
      <div className="absolute top-2 start-2 sm:top-6 sm:start-6">
        <div className="w-[110px] rounded-lg bg-white/95 px-2 py-1.5 text-center sm:w-[220px] sm:rounded-2xl sm:px-5 sm:py-4">
          <p className="text-[11px] font-extrabold text-gsm-blue sm:text-lg">
            {locale === "ar"
              ? "صيانة الموبايل"
              : "Mobile Maintenance"}
          </p>

          <p className="mt-0.5 text-[9px] leading-4 text-gsm-muted sm:mt-1 sm:text-sm sm:leading-6">
            {locale === "ar"
              ? "تعلم صيانة الهواتف"
              : "Learn smartphone repair"}
          </p>
        </div>
      </div>

      {/* Electronics */}
      <div className="absolute top-1/2 end-1 -translate-y-1/2 sm:end-4">
        <div className="w-[105px] rounded-lg bg-gsm-navy px-2 py-1.5 text-center sm:w-[220px] sm:rounded-2xl sm:px-5 sm:py-4">
          <p className="text-[11px] font-extrabold text-white sm:text-lg">
            {locale === "ar"
              ? "الإلكترونيات"
              : "Electronics"}
          </p>

          <p className="mt-0.5 text-[9px] leading-4 text-white/80 sm:mt-1 sm:text-sm sm:leading-6">
            {locale === "ar"
              ? "دوائر ومشاريع"
              : "Circuits & Projects"}
          </p>
        </div>
      </div>

      {/* Kids Programming */}
      <div className="absolute bottom-2 start-4 sm:bottom-6 sm:start-10">
        <div className="w-[120px] rounded-lg bg-gsm-red px-2 py-1.5 text-center sm:w-[250px] sm:rounded-2xl sm:px-5 sm:py-4">
          <p className="text-[11px] font-extrabold text-white sm:text-lg">
            {locale === "ar"
              ? "برمجة للأطفال"
              : "Kids Programming"}
          </p>

          <p className="mt-0.5 text-[9px] leading-4 text-white/85 sm:mt-1 sm:text-sm sm:leading-6">
            {locale === "ar"
              ? "روبوت وذكاء اصطناعي"
              : "Robotics & AI"}
          </p>
        </div>
      </div>
    </>
  );
}