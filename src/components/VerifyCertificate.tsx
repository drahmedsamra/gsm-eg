"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Search, FileText, Download, Copy, Check, Share2, AlertCircle } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { supabase } from "@/lib/supabase";
import { DynamicCertificate, type CertificateProps } from "./DynamicCertificate";

export function VerifyCertificate() {
  const { locale } = useLocale();
  const searchParams = useSearchParams();

  const isAr = locale === "ar";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [dbCert, setDbCert] = useState<CertificateProps | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [verifiedCode, setVerifiedCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPdf, setIsPdf] = useState(false);
  const [copied, setCopied] = useState(false);

  const performSearch = useCallback(async (searchCode: string) => {
    const cleanCode = searchCode
      .trim()
      .toLowerCase()
      .replace(/\.pdf$/i, "")
      .replace(/\.png$/i, "")
      .replace(/\.jpg$/i, "");

    if (!cleanCode) {
      setError(
        isAr
          ? "من فضلك أدخل كود الشهادة"
          : "Please enter the certificate code"
      );
      return;
    }

    setLoading(true);
    setError("");
    setDbCert(null);
    setFileUrl("");
    setSuccess(false);
    setVerifiedCode("");

    try {
      // 1. Search in Database for dynamic generation
      const { data: cert } = await supabase
        .from("certificates")
        .select("*")
        .ilike("code", cleanCode)
        .maybeSingle();

      if (cert) {
        setDbCert(cert as CertificateProps);
        setVerifiedCode(cert.code);
        setSuccess(true);
        setLoading(false);
        return;
      }

      // 2. Search in Supabase Storage for uploaded PDF/Image files
      const extensions = ["pdf", "jpg", "png", "webp"];
      let foundUrl = "";
      let foundPdf = false;

      for (const ext of extensions) {
        const testUrl = `https://iwovcjoddtvivakareuq.supabase.co/storage/v1/object/public/certificates/${cleanCode}.${ext}`;

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
        setVerifiedCode(cleanCode);
        setSuccess(true);
      } else {
        setError(
          isAr
            ? "لم يتم العثور على شهادة بهذا الكود. يرجى التأكد من كتابة الكود بشكل صحيح."
            : "No certificate found with this code. Please verify the code and try again."
        );
      }
    } catch (err) {
      console.error(err);
      setError(
        isAr
          ? "حدث خطأ أثناء فحص الشهادة، يرجى المحاولة لاحقاً."
          : "An error occurred while verifying the certificate."
      );
    } finally {
      setLoading(false);
    }
  }, [isAr]);

  // Auto search if ?code= is present in URL
  useEffect(() => {
    const urlCode = searchParams.get("code");
    if (urlCode && urlCode.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCode(urlCode.trim());
      performSearch(urlCode.trim());
    }
  }, [searchParams, performSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(code);
  };

  const shareUrl = typeof window !== "undefined" && verifiedCode
    ? `${window.location.origin}/verify?code=${verifiedCode}`
    : `https://gsm-eg.com/verify?code=${verifiedCode}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `رابط التحقق من شهادة جي اس ام مصر:\n${shareUrl}`,
  )}`;

  return (
    <section id="verify-certificate" className="px-4 py-16" dir={isAr ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-10">
        <div className="text-center">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[var(--gsm-blue)]">
            <FileText className="h-8 w-8" />
          </div>

          <h1 className="text-3xl font-extrabold text-[var(--gsm-navy)] sm:text-4xl">
            {isAr ? "التحقق من صحة الشهادات" : "Certificate Verification"}
          </h1>

          <p className="mt-3 text-base text-gray-500 sm:text-lg">
            {isAr
              ? "أدخل كود الشهادة للتحقق من صحتها واستعراض الشهادة المعتمدة فورياً"
              : "Enter the certificate code to verify its authenticity and view the certificate instantly"}
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={
              isAr
                ? "أدخل كود الشهادة (مثال: 20263435227)"
                : "Enter certificate code (e.g. 20263435227)"
            }
            className="flex-1 rounded-2xl border border-gray-300 px-6 py-4 text-lg outline-none transition focus:border-[var(--gsm-blue)] focus:ring-4 focus:ring-blue-100"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--gsm-blue)] px-8 py-4 text-lg font-bold text-white transition hover:opacity-90 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <span>{isAr ? "جارٍ الفحص..." : "Verifying..."}</span>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>{isAr ? "تحقق الآن" : "Verify"}</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-red-50 p-4 text-center text-base font-semibold text-red-600 border border-red-200">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Verification Result */}
        {success && (
          <div className="mt-10 animate-fadeIn">
            {/* If found in Database -> Dynamic Portrait Certificate Engine */}
            {dbCert ? (
              <DynamicCertificate cert={dbCert} />
            ) : fileUrl ? (
              /* If found in Storage -> PDF/Image Viewer */
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 sm:p-8">
                <div className="text-center pb-6 border-b border-emerald-200">
                  <h2 className="text-2xl font-black text-emerald-800 sm:text-3xl">
                    {isAr ? "شهادة معتمدة من GSM" : "Certified by GSM"}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    {isAr
                      ? "تم العثور على ملف الشهادة المعتمد الصادر من أكاديمية جي اس ام مصر"
                      : "The certified document issued by GSM Egypt Academy has been verified"}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-1.5 border border-emerald-300 shadow-xs">
                    <span className="text-xs text-gray-500">{isAr ? "كود الشهادة:" : "Code:"}</span>
                    <span className="font-mono font-bold text-base text-[var(--gsm-navy)]">{verifiedCode}</span>
                  </div>
                </div>

                <div className="my-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--gsm-navy)] px-6 py-3 text-base font-bold text-white transition hover:opacity-90 shadow-sm"
                  >
                    <Download className="h-4 w-4" />
                    <span>{isAr ? "فتح / تحميل ملف PDF" : "Open / Download PDF"}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span className="text-emerald-600">{isAr ? "تم النسخ!" : "Copied!"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>{isAr ? "نسخ رابط الشهادة" : "Copy Link"}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={waShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>{isAr ? "مشاركة عبر واتساب" : "WhatsApp"}</span>
                  </a>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-lg">
                  {isPdf ? (
                    <iframe
                      src={`${fileUrl}#toolbar=1&navpanes=0`}
                      className="h-[650px] sm:h-[850px] w-full border-0"
                      title={`Certificate ${verifiedCode}`}
                    />
                  ) : (
                    <div className="p-4 flex justify-center">
                      <Image
                        src={fileUrl}
                        alt="Certificate"
                        width={1060}
                        height={1484}
                        unoptimized
                        className="h-auto max-h-[850px] w-full object-contain rounded-xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
