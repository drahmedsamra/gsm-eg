type FloatingCardsProps = {
  locale: "ar" | "en";
};

export function FloatingCards({
  locale,
}: FloatingCardsProps) {
  return (
    <>
      {/* Mobile Maintenance */}
      <div className="absolute top-3 start-3 sm:top-6 sm:start-6">
        <div className="w-[145px] rounded-xl bg-white/95 px-3 py-2 text-center sm:w-[220px] sm:rounded-2xl sm:px-5 sm:py-4">
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
      <div className="absolute top-1/2 end-2 -translate-y-1/2 sm:end-4">
        <div className="w-[145px] rounded-xl bg-gsm-navy px-3 py-2 text-center sm:w-[220px] sm:rounded-2xl sm:px-5 sm:py-4">
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
      <div className="absolute bottom-3 start-5 sm:bottom-6 sm:start-10">
        <div className="w-[160px] rounded-xl bg-gsm-red px-3 py-2 text-center sm:w-[250px] sm:rounded-2xl sm:px-5 sm:py-4">
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