"use client";

import { useState } from "react";

export function CertificateVerification() {
  const [code, setCode] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSearch = async () => {
    setError("");
    setPdfUrl("");
    setSuccess(false);

    if (!code.trim()) {
      setError("من فضلك ادخل كود الشهادة");
      return;
    }

    const cleanCode = code.trim().toLowerCase();

    const fileUrl = `https://tuybjmletxtmrbjnikmj.supabase.co/storage/v1/object/public/certificates/${cleanCode}.pdf`;

    try {
      const response = await fetch(fileUrl, {
        method: "HEAD",
      });

      if (response.ok) {
        setPdfUrl(fileUrl);
        setSuccess(true);
      } else {
        setError("الشهادة غير موجودة");
      }
    } catch {
      setError("حدث خطأ أثناء التحقق");
    }
  };

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-10">

        <h2 className="text-center text-4xl font-bold text-[var(--gsm-navy)] sm:text-5xl">
          التحقق من الشهادة
        </h2>

        <p className="mt-4 text-center text-lg text-gray-500">
          ادخل كود الشهادة للتحقق منها
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="مثال: nabilagsm"
            className="flex-1 rounded-2xl border border-gray-300 px-6 py-5 text-lg outline-none transition focus:border-[var(--gsm-blue)]"
          />

          <button
            onClick={handleSearch}
            className="rounded-2xl bg-[var(--gsm-blue)] px-10 py-5 text-lg font-semibold text-white transition hover:opacity-90"
          >
            بحث
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
              تم العثور على الشهادة
            </h3>

            <p className="mt-3 text-gray-600">
              يمكنك الآن فتح أو تحميل الشهادة
            </p>

            <div className="mt-8 flex items-center justify-center">

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--gsm-blue)] px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90 sm:w-auto"
              >
                فتح / تحميل الشهادة
              </a>

            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white">

              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="h-[500px] w-full"
              />

            </div>

          </div>
        )}

      </div>
    </section>
  );
}