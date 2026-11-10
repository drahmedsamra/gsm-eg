"use client";

import { Flame } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

type UrgencyBadgeProps = {
  seatsLeft?: number;
  className?: string;
};

export function UrgencyBadge({ seatsLeft = 3, className = "" }: UrgencyBadgeProps) {
  const { locale } = useLocale();

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 px-3 py-1 text-xs font-bold text-red-700 shadow-xs ${className}`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
      </span>

      <Flame className="h-3.5 w-3.5 text-red-600 shrink-0" />

      <span>
        {locale === "ar"
          ? `متبقي ${seatsLeft} مقاعد فقط في دفعة هذا الشهر!`
          : `Only ${seatsLeft} seats left this batch!`}
      </span>
    </div>
  );
}
