
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function AdminCertificateUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("اختر ملف الشهادة");
      return;
    }

    setLoading(true);
    setMessage("");

    const fileName = file.name.toLowerCase();

    const { error } = await supabase.storage
  .from("certificates")
  .upload(fileName, file, {
    upsert: true,
  });

    if (error) {
  console.error("UPLOAD ERROR:", error);
  setMessage(error.message);
} else {
      setMessage("تم رفع الشهادة بنجاح");
    }

    setLoading(false);
  };

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl">

        <h2 className="text-center text-4xl font-bold text-[var(--gsm-navy)]">
          رفع الشهادات
        </h2>

        <p className="mt-4 text-center text-gray-500">
          اختر ملف PDF أو صورة وسيتم رفعها مباشرة
        </p>

        <div className="mt-10 space-y-4">

          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
              }
            }}
            className="w-full rounded-2xl border border-gray-300 p-4"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full rounded-2xl bg-[var(--gsm-blue)] px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "جاري الرفع..." : "رفع الشهادة"}
          </button>

          {message && (
            <div className="rounded-2xl bg-gray-100 p-4 text-center">
              {message}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
