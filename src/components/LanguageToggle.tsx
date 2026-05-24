"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();
  const next = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      className={cn(
        "rounded-full border border-gsm-navy/15 px-2.5 py-1 text-[11px] font-semibold font-en transition-colors",
        "hover:border-gsm-blue hover:text-gsm-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsm-blue",
        className,
      )}
      aria-label={t("langSwitchAria")}
    >
      {t("langSwitch")}
    </button>
  );
}
