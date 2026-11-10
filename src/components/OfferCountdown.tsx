"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

type OfferCountdownProps = {
  compact?: boolean;
  className?: string;
};

export function OfferCountdown({ compact = false, className = "" }: OfferCountdownProps) {
  const { locale } = useLocale();
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // Calculate time remaining until midnight
    const calculateTime = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      const diff = midnight.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ hours: 23, minutes: 59, seconds: 59 });
        return;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className={`inline-flex items-center gap-1.5 text-xs text-gray-500 ${className}`}>
        <Clock className="h-3.5 w-3.5 text-red-500 animate-spin" />
        <span>{locale === "ar" ? "عرض الخصم سارٍ اليوم" : "Special discount valid today"}</span>
      </div>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-900 border border-amber-200/80 ${className}`}
        dir="ltr"
      >
        <Clock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
        <span className="font-mono text-amber-800">
          {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
        </span>
        <span className="text-[11px] text-amber-700" dir={locale === "ar" ? "rtl" : "ltr"}>
          {locale === "ar" ? "متبقي على العرض" : "left on offer"}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-red-200 bg-gradient-to-br from-red-50/80 via-orange-50/40 to-white p-4 text-center shadow-xs ${className}`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-red-700 mb-2.5">
        <Clock className="h-4 w-4 text-red-600" />
        <span>{locale === "ar" ? "ينتهي خصم الموقع الخاص خلال:" : "Website discount ends in:"}</span>
      </div>

      <div className="flex items-center justify-center gap-2 font-mono text-lg font-black text-gray-900" dir="ltr">
        <div className="flex flex-col items-center">
          <span className="rounded-xl bg-white px-3 py-1.5 shadow-xs border border-gray-200 text-[var(--gsm-navy)]">
            {pad(timeLeft.hours)}
          </span>
          <span className="text-[10px] font-sans font-semibold text-gray-400 mt-1">
            {locale === "ar" ? "ساعة" : "Hours"}
          </span>
        </div>

        <span className="text-red-500 font-bold mb-4">:</span>

        <div className="flex flex-col items-center">
          <span className="rounded-xl bg-white px-3 py-1.5 shadow-xs border border-gray-200 text-[var(--gsm-navy)]">
            {pad(timeLeft.minutes)}
          </span>
          <span className="text-[10px] font-sans font-semibold text-gray-400 mt-1">
            {locale === "ar" ? "دقيقة" : "Mins"}
          </span>
        </div>

        <span className="text-red-500 font-bold mb-4">:</span>

        <div className="flex flex-col items-center">
          <span className="rounded-xl bg-white px-3 py-1.5 shadow-xs border border-gray-200 text-red-600 animate-pulse">
            {pad(timeLeft.seconds)}
          </span>
          <span className="text-[10px] font-sans font-semibold text-gray-400 mt-1">
            {locale === "ar" ? "ثانية" : "Secs"}
          </span>
        </div>
      </div>
    </div>
  );
}
