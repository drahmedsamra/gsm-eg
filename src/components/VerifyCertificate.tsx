"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function VerifyCertificate() {
  const { locale } = useLocale();

  const isAr = locale === "ar";

  const [code, setCode] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPdf, setIsPdf] = useState(false);

  const handleSearch = async () => {
    setError("");
    setFileUrl("");
    setSuccess(false);

    if (!code.trim()) {
      setError(
        isAr
          ? "من فضلك ادخل كود الشهادة"
          : "Please enter the certificate code"
      );

      return;
    }

    const cleanCode = code.trim().toLowerCase();

    const extensions = ["pdf", "jpg", "png", "webp"];

    let foundUrl = "";
    let foundPdf = false;

    for (const ext of extensions) {
      const testUrl =
        `https://iwovcjoddtvivakareuq.supabase.co/storage/v1/object/public/certificates/${cleanCode}.${ext}`;

      try {
        const response = await fetch(testUrl, {
          method: "HEAD",
        });

        if (response.ok) {
          foundUrl = testUrl;
          foundPdf = ext === "pdf";
          break;
        }
      } catch {}
    }

    if (foundUrl) {
      setFileUrl(foundUrl);
      setIsPdf(foundPdf);
      setSuccess(true);
    } else {
      setError(
        isAr
          ? "الشهادة غير موجودة"
          : "Certificate not found"
      );
    }
  };

  return (
    <section id="verify-certificate" className="px-4 py-20">
      <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-10">

        <h2 className="text-center text-4xl font-bold text-[var(--gsm-navy)] sm:text-5xl">
          {isAr
            ? "التحقق من الشهادة"
            : "Certificate Verification"}
        </h2>

        <p className="mt-4 text-center text-lg text-gray-500">
          {isAr
            ? "ادخل كود الشهادة للتحقق منها"
            : "Enter the certificate code to verify it"}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={
              isAr
                ? "مثال: GSM-2026-00123"
                : "Example: GSM-2026-00123"
            }
            className="flex-1 rounded-2xl border border-gray-300 px-6 py-5 text-lg outline-none transition focus:border-[var(--gsm-blue)]"
          />

          <button
            onClick={handleSearch}
            className="rounded-2xl bg-[var(--gsm-blue)] px-10 py-5 text-lg font-semibold text-white transition hover:opacity-90"
          >
            {isAr ? "بحث" : "Search"}
          </button>

        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 px-6 py-5 text-center text-lg text-red-500">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-8 rounded-3xl border border-green-200 bg-green-50 p-8 text-center">

            <div className="mb-4 text-5xl">
              ✅
            </div>

            <h3 className="text-2xl font-bold text-green-700">
              {isAr
                ? "تم العثور على الشهادة"
                : "Certificate Found"}
            </h3>

            <p className="mt-3 text-gray-600">
              {isAr
                ? "يمكنك الآن فتح أو تحميل الشهادة"
                : "You can now open or download the certificate"}
            </p>

            <div className="mt-8 flex items-center justify-center">

              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--gsm-blue)] px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90 sm:w-auto"
              >
                {isAr
                  ? "فتح / تحميل الشهادة"
                  : "Open / Download Certificate"}
              </a>

            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white">

              {isPdf ? (
                <iframe
                  src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="h-[500px] w-full"
                />
              ) : (
                <img
                  src={fileUrl}
                  alt="Certificate"
                  className="w-full"
                />
              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}