"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Award,
  UploadCloud,
  FileText,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  Plus,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

function parseDateForDb(d: string): string {
  const clean = d.trim();
  if (clean.includes("/")) {
    const parts = clean.split("/");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
    }
  }
  return clean;
}

export function AdminCertificateUpload() {
  const [activeTab, setActiveTab] = useState<"auto" | "pdf">("auto");

  // Tab 1: Auto Certificate Generator Form State
  const [autoForm, setAutoForm] = useState({
    code: "",
    student_name: "",
    course_name: "دورة صيانة الهاتف المحمول الشامله",
    hours: "36",
    start_date: "2026-01-14",
    end_date: "2026-06-14",
    grade: "VERY GOOD",
  });
  const [autoLoading, setAutoLoading] = useState(false);
  const [autoSuccessCode, setAutoSuccessCode] = useState<string | null>(null);
  const [autoError, setAutoError] = useState<string | null>(null);

  // Tab 2: Manual PDF Upload State
  const [file, setFile] = useState<File | null>(null);
  const [customCode, setCustomCode] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfSuccessCode, setPdfSuccessCode] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [copied, setCopied] = useState(false);

  // Auto Generate random code (e.g. 2026 + 7 random digits)
  const generateRandomCode = () => {
    const randomDigits = Math.floor(1000000 + Math.random() * 9000000);
    const generated = `2026${randomDigits}`;
    setAutoForm((prev) => ({ ...prev, code: generated }));
  };

  // Submit Auto Certificate to Database
  const handleAutoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAutoError(null);
    setAutoSuccessCode(null);

    if (!autoForm.code.trim() || !autoForm.student_name.trim()) {
      setAutoError("يرجى إدخال اسم الطالب وكود الشهادة");
      return;
    }

    setAutoLoading(true);

    const payload = {
      code: autoForm.code.trim(),
      student_name: autoForm.student_name.trim(),
      course_name: autoForm.course_name.trim(),
      hours: Number(autoForm.hours) || 36,
      start_date: parseDateForDb(autoForm.start_date),
      end_date: parseDateForDb(autoForm.end_date),
      grade: autoForm.grade.trim(),
    };

    try {
      const { error } = await supabase.from("certificates").insert([payload]);

      if (error) {
        console.error("DB Error:", error);
        setAutoError(error.message);
      } else {
        setAutoSuccessCode(payload.code);
        setAutoForm((prev) => ({
          ...prev,
          student_name: "",
          code: "",
        }));
      }
    } catch (err) {
      console.error(err);
      setAutoError("حدث خطأ أثناء حفظ الشهادة في قاعدة البيانات");
    } finally {
      setAutoLoading(false);
    }
  };

  // Upload Manual PDF
  const handlePdfUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setPdfError("من فضلك اختر ملف PDF");
      return;
    }

    const finalCode = (customCode || file.name)
      .toLowerCase()
      .replace(/\.pdf$/i, "")
      .trim();

    if (!finalCode) {
      setPdfError("من فضلك أدخل كود الشهادة");
      return;
    }

    setPdfLoading(true);
    setPdfError("");
    setPdfSuccessCode(null);

    const fileName = `${finalCode}.pdf`;

    try {
      const { error } = await supabase.storage
        .from("certificates")
        .upload(fileName, file, {
          upsert: true,
          contentType: "application/pdf",
        });

      if (error) {
        setPdfError(error.message);
      } else {
        setPdfSuccessCode(finalCode);
      }
    } catch {
      setPdfError("حدث خطأ غير متوقع أثناء رفع الملف");
    } finally {
      setPdfLoading(false);
    }
  };

  const copyUrl = (code: string) => {
    const url = typeof window !== "undefined"
      ? `${window.location.origin}/verify?code=${code}`
      : `https://gsm-eg.com/verify?code=${code}`;

    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="px-4 py-16" dir="rtl">
      <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-10">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[var(--gsm-blue)]">
            <Award className="h-8 w-8" />
          </div>

          <h1 className="text-3xl font-extrabold text-[var(--gsm-navy)] sm:text-4xl">
            لوحة إصدار الشهادات
          </h1>

          <p className="mt-2 text-base text-gray-500">
            أصدر شهادات معتمدة بدقة متناهية ليتم بناؤها تلقائياً عند فحصها بكود الطالب
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mb-8 grid grid-cols-2 rounded-2xl bg-gray-100 p-1.5 text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("auto")}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 transition cursor-pointer ${
              activeTab === "auto"
                ? "bg-white text-[var(--gsm-blue)] shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>إصدار شهادة تلقائية (بالقالب الجديد)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pdf")}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 transition cursor-pointer ${
              activeTab === "pdf"
                ? "bg-white text-[var(--gsm-blue)] shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <UploadCloud className="h-4 w-4" />
            <span>رفع ملف PDF يدوي</span>
          </button>
        </div>

        {/* TAB 1: AUTO CERTIFICATE BUILDER */}
        {activeTab === "auto" && (
          <div>
            {autoSuccessCode && (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-lg mb-2 text-emerald-800">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                  <span>تم حفظ وإصدار الشهادة بنجاح!</span>
                </div>
                <p className="text-sm text-emerald-700 mb-4">
                  كود الشهادة:{" "}
                  <span className="font-mono font-bold text-base bg-emerald-100 px-2.5 py-0.5 rounded-lg">
                    {autoSuccessCode}
                  </span>
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/verify?code=${autoSuccessCode}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 shadow-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    معاينة الشهادة الآن في صفحة التحقق
                  </Link>

                  <button
                    type="button"
                    onClick={() => copyUrl(autoSuccessCode)}
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span>تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>نسخ رابط الفحص</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {autoError && (
              <div className="mb-6 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{autoError}</span>
              </div>
            )}

            <form onSubmit={handleAutoSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  اسم الطالب الكامل (كما سيظهر على الشهادة) *
                </label>
                <input
                  type="text"
                  required
                  value={autoForm.student_name}
                  onChange={(e) => setAutoForm({ ...autoForm, student_name: e.target.value })}
                  placeholder="مثال: نبيلة مصطفي محمد"
                  className="w-full rounded-xl border border-gray-300 p-3.5 text-base outline-none transition focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100 font-bold"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-bold text-gray-700">
                    كود الشهادة (Certificate ID) *
                  </label>
                  <button
                    type="button"
                    onClick={generateRandomCode}
                    className="text-xs font-bold text-[var(--gsm-blue)] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="h-3 w-3" />
                    توليد كود تلقائي
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={autoForm.code}
                  onChange={(e) => setAutoForm({ ...autoForm, code: e.target.value })}
                  placeholder="مثال: 20263435227 أو GSM-2026-101"
                  className="w-full rounded-xl border border-gray-300 p-3.5 text-base outline-none transition focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  اسم الدورة التدريبية
                </label>
                <input
                  type="text"
                  value={autoForm.course_name}
                  onChange={(e) => setAutoForm({ ...autoForm, course_name: e.target.value })}
                  placeholder="دورة صيانة الهاتف المحمول الشامله"
                  className="w-full rounded-xl border border-gray-300 p-3.5 text-base outline-none transition focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    عدد الساعات (DURATION)
                  </label>
                  <input
                    type="number"
                    value={autoForm.hours}
                    onChange={(e) => setAutoForm({ ...autoForm, hours: e.target.value })}
                    placeholder="36"
                    className="w-full rounded-xl border border-gray-300 p-3.5 text-base outline-none transition focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    التقدير (GRADE)
                  </label>
                  <select
                    value={autoForm.grade}
                    onChange={(e) => setAutoForm({ ...autoForm, grade: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 p-3.5 text-base outline-none transition focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100 bg-white"
                  >
                    <option value="VERY GOOD">VERY GOOD (جيد جداً)</option>
                    <option value="EXCELLENT">EXCELLENT (امتياز)</option>
                    <option value="GOOD">GOOD (جيد)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    من تاريخ (FROM)
                  </label>
                  <input
                    type="text"
                    value={autoForm.start_date}
                    onChange={(e) => setAutoForm({ ...autoForm, start_date: e.target.value })}
                    placeholder="14/01/2026"
                    className="w-full rounded-xl border border-gray-300 p-3.5 text-base outline-none transition focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    إلى تاريخ (TO)
                  </label>
                  <input
                    type="text"
                    value={autoForm.end_date}
                    onChange={(e) => setAutoForm({ ...autoForm, end_date: e.target.value })}
                    placeholder="14/06/2026"
                    className="w-full rounded-xl border border-gray-300 p-3.5 text-base outline-none transition focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={autoLoading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--gsm-blue)] p-4 text-lg font-bold text-white transition hover:opacity-90 disabled:opacity-50 shadow-md cursor-pointer mt-4"
              >
                {autoLoading ? (
                  <span>جارٍ حفظ الشهادة في سوبابيز...</span>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    <span>إصدار الشهادة فوراً</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: MANUAL PDF UPLOAD */}
        {activeTab === "pdf" && (
          <div>
            {pdfSuccessCode && (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-lg mb-2 text-emerald-800">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                  <span>تم رفع ملف PDF بنجاح!</span>
                </div>
                <p className="text-sm text-emerald-700 mb-4">
                  كود الملف:{" "}
                  <span className="font-mono font-bold text-base bg-emerald-100 px-2.5 py-0.5 rounded-lg">
                    {pdfSuccessCode}
                  </span>
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/verify?code=${pdfSuccessCode}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 shadow-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    معاينة الملف في صفحة التحقق
                  </Link>

                  <button
                    type="button"
                    onClick={() => copyUrl(pdfSuccessCode)}
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span>تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>نسخ الرابط</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {pdfError && (
              <div className="mb-6 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{pdfError}</span>
              </div>
            )}

            <form onSubmit={handlePdfUpload} className="space-y-6">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-8 text-center transition hover:border-[var(--gsm-blue)] hover:bg-blue-50/30 cursor-pointer"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const f = e.target.files[0];
                      setFile(f);
                      setCustomCode(f.name.toLowerCase().replace(/\.pdf$/i, "").trim());
                    }
                  }}
                />

                {file ? (
                  <div className="flex flex-col items-center">
                    <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-[var(--gsm-blue)]">
                      <FileText className="h-7 w-7" />
                    </div>
                    <p className="font-bold text-gray-800 text-lg">{file.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {(file.size / 1024).toFixed(1)} KB — انقر لاختيار ملف آخر
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-[var(--gsm-blue)] transition">
                      <FileText className="h-7 w-7" />
                    </div>
                    <p className="text-base font-bold text-gray-700">
                      انقر هنا لاختيار ملف الشهادة (PDF)
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      يُفضل تسمية الملف بكود الشهادة (مثال: 2026181979.pdf)
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  كود الشهادة للبحث
                </label>
                <input
                  type="text"
                  required
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder="مثال: 2026181979"
                  className="w-full rounded-xl border border-gray-300 p-3.5 text-base outline-none transition focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100 font-mono font-bold"
                />
              </div>

              <button
                type="submit"
                disabled={pdfLoading || !file}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--gsm-blue)] p-4 text-lg font-bold text-white transition hover:opacity-90 disabled:opacity-50 shadow-md cursor-pointer"
              >
                {pdfLoading ? (
                  <span>جاري الرفع إلى سوبابيز...</span>
                ) : (
                  <>
                    <UploadCloud className="h-5 w-5" />
                    <span>رفع ملف الـ PDF</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[var(--gsm-blue)]"
          >
            الانتقال إلى صفحة التحقق العامة (Verify)
          </Link>
        </div>
      </div>
    </section>
  );
}
