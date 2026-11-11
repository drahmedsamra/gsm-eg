"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  Search,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  X,
  ListFilter,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface CertificateRecord {
  id: string;
  code: string;
  student_name: string;
  course_name: string;
  course_description?: string;
  hours?: number;
  start_date?: string;
  end_date?: string;
  grade?: string;
  director_name?: string;
  instructor_name?: string;
  created_at?: string;
}

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

function formatDateDisplay(d?: string | null): string {
  if (!d) return "-";
  if (d.includes("-")) {
    const parts = d.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  }
  return d;
}

export function AdminCertificateUpload() {
  const [activeTab, setActiveTab] = useState<"auto" | "manage" | "pdf">("manage");

  // Tab 1: Auto Certificate Generator Form State
  const [autoForm, setAutoForm] = useState({
    code: "",
    student_name: "",
    course_name: "دورة صيانة الهاتف المحمول الشامله",
    course_description: "COMPREHENSIVE MOBILE PHONE MAINTENANCE COURSE",
    hours: "36",
    start_date: "2026-01-14",
    end_date: "2026-06-14",
    grade: "VERY GOOD",
    director_name: "MR. AHMED El Sayed",
    instructor_name: "ENG. KHALED Mohamed",
  });
  const [autoLoading, setAutoLoading] = useState(false);
  const [autoSuccessCode, setAutoSuccessCode] = useState<string | null>(null);
  const [autoError, setAutoError] = useState<string | null>(null);

  // Tab 2: Manage & Search State
  const [certificatesList, setCertificatesList] = useState<CertificateRecord[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCert, setEditingCert] = useState<CertificateRecord | null>(null);
  const [deletingCert, setDeletingCert] = useState<CertificateRecord | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [manageFeedback, setManageFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Edit Form State inside Modal
  const [editForm, setEditForm] = useState({
    student_name: "",
    code: "",
    course_name: "",
    course_description: "",
    hours: "36",
    start_date: "",
    end_date: "",
    grade: "VERY GOOD",
    director_name: "",
    instructor_name: "",
  });

  // Tab 3: Manual PDF Upload State
  const [file, setFile] = useState<File | null>(null);
  const [customCode, setCustomCode] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfSuccessCode, setPdfSuccessCode] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Fetch Certificates List from Supabase (Manual / Reload)
  const fetchCertificates = useCallback(async () => {
    setListLoading(true);
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching certificates:", error);
        setManageFeedback({ type: "error", text: "تعذر تحميل الشهادات: " + error.message });
      } else if (data) {
        setCertificatesList(data as CertificateRecord[]);
      }
    } catch (err) {
      console.error(err);
      setManageFeedback({ type: "error", text: "حدث خطأ في الاتصال بقاعدة البيانات" });
    } finally {
      setListLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("certificates")
          .select("*")
          .order("created_at", { ascending: false });

        if (!active) return;
        if (error) {
          console.error("Error fetching certificates:", error);
          setManageFeedback({ type: "error", text: "تعذر تحميل الشهادات: " + error.message });
        } else if (data) {
          setCertificatesList(data as CertificateRecord[]);
        }
      } catch (err) {
        if (!active) return;
        console.error(err);
        setManageFeedback({ type: "error", text: "حدث خطأ في الاتصال بقاعدة البيانات" });
      } finally {
        if (active) {
          setListLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

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
      course_description: autoForm.course_description.trim(),
      hours: Number(autoForm.hours) || 36,
      start_date: parseDateForDb(autoForm.start_date),
      end_date: parseDateForDb(autoForm.end_date),
      grade: autoForm.grade.trim(),
      director_name: autoForm.director_name.trim(),
      instructor_name: autoForm.instructor_name.trim(),
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
        // Refresh list in background
        fetchCertificates();
      }
    } catch (err) {
      console.error(err);
      setAutoError("حدث خطأ أثناء حفظ الشهادة في قاعدة البيانات");
    } finally {
      setAutoLoading(false);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (cert: CertificateRecord) => {
    setEditingCert(cert);
    setEditForm({
      student_name: cert.student_name || "",
      code: cert.code || "",
      course_name: cert.course_name || "دورة صيانة الهاتف المحمول الشامله",
      course_description: cert.course_description || "COMPREHENSIVE MOBILE PHONE MAINTENANCE COURSE",
      hours: cert.hours ? String(cert.hours) : "36",
      start_date: cert.start_date || "2026-01-14",
      end_date: cert.end_date || "2026-06-14",
      grade: cert.grade || "VERY GOOD",
      director_name: cert.director_name || "MR. AHMED El Sayed",
      instructor_name: cert.instructor_name || "ENG. KHALED Mohamed",
    });
  };

  // Save Edits to Database
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    if (!editForm.student_name.trim() || !editForm.code.trim()) {
      alert("اسم الطالب وكود الشهادة حقول إجبارية");
      return;
    }

    setIsSavingEdit(true);

    const payload = {
      student_name: editForm.student_name.trim(),
      code: editForm.code.trim(),
      course_name: editForm.course_name.trim(),
      course_description: editForm.course_description.trim(),
      hours: Number(editForm.hours) || 36,
      start_date: parseDateForDb(editForm.start_date),
      end_date: parseDateForDb(editForm.end_date),
      grade: editForm.grade.trim(),
      director_name: editForm.director_name.trim(),
      instructor_name: editForm.instructor_name.trim(),
    };

    try {
      const { error } = await supabase
        .from("certificates")
        .update(payload)
        .eq("id", editingCert.id);

      if (error) {
        setManageFeedback({ type: "error", text: "فشل حفظ التعديلات: " + error.message });
      } else {
        setCertificatesList((prev) =>
          prev.map((c) => (c.id === editingCert.id ? { ...c, ...payload } : c))
        );
        setEditingCert(null);
        setManageFeedback({
          type: "success",
          text: `تم تحديث شهادة الطالب (${payload.student_name}) بنجاح!`,
        });
        setTimeout(() => setManageFeedback(null), 4000);
      }
    } catch (err) {
      console.error(err);
      setManageFeedback({ type: "error", text: "حدث خطأ غير متوقع أثناء حفظ التعديل" });
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Confirm and Execute Delete
  const handleConfirmDelete = async () => {
    if (!deletingCert) return;
    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from("certificates")
        .delete()
        .eq("id", deletingCert.id);

      if (error) {
        setManageFeedback({ type: "error", text: "فشل حذف الشهادة: " + error.message });
      } else {
        const deletedName = deletingCert.student_name;
        setCertificatesList((prev) => prev.filter((c) => c.id !== deletingCert.id));
        setDeletingCert(null);
        setManageFeedback({
          type: "success",
          text: `تم حذف شهادة (${deletedName}) بنجاح من قاعدة البيانات!`,
        });
        setTimeout(() => setManageFeedback(null), 4000);
      }
    } catch (err) {
      console.error(err);
      setManageFeedback({ type: "error", text: "حدث خطأ غير متوقع أثناء الحذف" });
    } finally {
      setIsDeleting(false);
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
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Filter Certificates by Name, Code, or Course
  const filteredCertificates = certificatesList.filter((cert) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const name = (cert.student_name || "").toLowerCase();
    const code = (cert.code || "").toLowerCase();
    const course = (cert.course_name || "").toLowerCase();
    return name.includes(q) || code.includes(q) || course.includes(q);
  });

  return (
    <section className="px-4 py-12" dir="rtl">
      <div
        className={`mx-auto rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-10 transition-all duration-300 ${
          activeTab === "manage" ? "max-w-5xl" : "max-w-2xl"
        }`}
      >
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[var(--gsm-blue)]">
            <Award className="h-8 w-8" />
          </div>

          <h1 className="text-3xl font-extrabold text-[var(--gsm-navy)] sm:text-4xl">
            لوحة إدارة وإصدار الشهادات
          </h1>

          <p className="mt-2 text-base text-gray-500">
            أصدر وابحث وعدّل أو احذف شهادات خريجي الأكاديمية بنظام سوبابيز المباشر
          </p>
        </div>

        {/* Global Feedback Banner for Management actions */}
        {manageFeedback && (
          <div
            className={`mb-6 flex items-center justify-between gap-3 rounded-2xl p-4 text-sm font-bold animate-fadeIn ${
              manageFeedback.type === "success"
                ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border border-red-200 bg-red-50 text-red-700"
            }`}
          >
            <div className="flex items-center gap-2">
              {manageFeedback.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
              )}
              <span>{manageFeedback.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setManageFeedback(null)}
              className="text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* 3 Mode Selector Tabs */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-1 rounded-2xl bg-gray-100 p-1.5 text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("manage")}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 px-3 transition cursor-pointer ${
              activeTab === "manage"
                ? "bg-white text-[var(--gsm-blue)] shadow-sm font-black"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <ListFilter className="h-4 w-4 shrink-0" />
            <span>سجل وبحث الشهادات</span>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-[var(--gsm-blue)]">
              {certificatesList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("auto")}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 px-3 transition cursor-pointer ${
              activeTab === "auto"
                ? "bg-white text-[var(--gsm-blue)] shadow-sm font-black"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>إصدار شهادة جديدة</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pdf")}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 px-3 transition cursor-pointer ${
              activeTab === "pdf"
                ? "bg-white text-[var(--gsm-blue)] shadow-sm font-black"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <UploadCloud className="h-4 w-4 shrink-0" />
            <span>رفع PDF يدوي</span>
          </button>
        </div>

        {/* TAB: MANAGE & SEARCH CERTIFICATES */}
        {activeTab === "manage" && (
          <div className="space-y-6">
            {/* Search Bar & Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث باسم الطالب، كود الشهادة، أو اسم الدورة..."
                  className="w-full rounded-2xl border border-gray-300 py-3.5 pr-12 pl-10 text-sm font-medium outline-none transition focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={fetchCertificates}
                disabled={listLoading}
                title="تحديث البيانات"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-4 py-3.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer shrink-0 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${listLoading ? "animate-spin text-[var(--gsm-blue)]" : ""}`} />
                <span>تحديث</span>
              </button>
            </div>

            {/* Total Results Counter */}
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500 px-1">
              <span>
                عرض {filteredCertificates.length} من إجمالي {certificatesList.length} شهادة
              </span>
              {searchQuery && (
                <span className="text-[var(--gsm-blue)]">
                  تصفية بحسب: &ldquo;{searchQuery}&rdquo;
                </span>
              )}
            </div>

            {/* List / Table Area */}
            {listLoading && certificatesList.length === 0 ? (
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-12 text-center">
                <RefreshCw className="mx-auto h-8 w-8 animate-spin text-[var(--gsm-blue)] mb-3" />
                <p className="text-sm font-bold text-gray-600">جارٍ جلب الشهادات من سوبابيز...</p>
              </div>
            ) : filteredCertificates.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-12 text-center">
                <Search className="mx-auto h-10 w-10 text-gray-300 mb-3" />
                <p className="text-base font-bold text-gray-700">لم يتم العثور على أي شهادة</p>
                <p className="text-xs text-gray-400 mt-1">
                  {searchQuery
                    ? "جرّب البحث بكلمة أو رقم كود مختلف"
                    : "لا توجد شهادات مسجلة حالياً، يمكنك إضافة شهادة جديدة من التبويب أعلاه"}
                </p>
              </div>
            ) : (
              <>
                {/* Desktop View: Clean Responsive Table */}
                <div className="hidden sm:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 text-xs font-bold text-gray-600 border-b border-gray-200">
                      <tr>
                        <th className="py-3.5 px-4">كود الشهادة</th>
                        <th className="py-3.5 px-4">اسم الطالب</th>
                        <th className="py-3.5 px-4">اسم الدورة</th>
                        <th className="py-3.5 px-4">التقدير / الساعات</th>
                        <th className="py-3.5 px-4">التاريخ</th>
                        <th className="py-3.5 px-4 text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {filteredCertificates.map((cert) => (
                        <tr key={cert.id} className="hover:bg-blue-50/30 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-xs text-gray-800">
                            <div className="flex items-center gap-1.5">
                              <span className="bg-gray-100 px-2 py-0.5 rounded text-[var(--gsm-navy)]">
                                {cert.code}
                              </span>
                              <button
                                type="button"
                                onClick={() => copyUrl(cert.code)}
                                title="نسخ رابط التحقق"
                                className="text-gray-400 hover:text-[var(--gsm-blue)] p-1 cursor-pointer transition"
                              >
                                {copiedCode === cert.code ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </button>
                            </div>
                          </td>

                          <td className="py-3 px-4 font-bold text-gray-900 text-sm">
                            {cert.student_name}
                          </td>

                          <td className="py-3 px-4 text-xs text-gray-600 max-w-xs truncate" title={cert.course_name}>
                            {cert.course_name}
                          </td>

                          <td className="py-3 px-4 text-xs">
                            <div className="flex items-center gap-1.5">
                              <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-[var(--gsm-blue)]">
                                {cert.grade || "VERY GOOD"}
                              </span>
                              <span className="text-gray-400 text-[11px]">
                                {cert.hours ? `${cert.hours} س` : "36 س"}
                              </span>
                            </div>
                          </td>

                          <td className="py-3 px-4 text-xs text-gray-500 font-mono">
                            {formatDateDisplay(cert.end_date || cert.start_date)}
                          </td>

                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {/* View Certificate */}
                              <Link
                                href={`/verify?code=${cert.code}`}
                                target="_blank"
                                title="معاينة في صفحة التحقق"
                                className="p-2 text-gray-500 hover:text-[var(--gsm-blue)] hover:bg-blue-50 rounded-lg transition"
                              >
                                <Eye className="h-4 w-4" />
                              </Link>

                              {/* Edit Certificate */}
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(cert)}
                                title="تعديل بيانات الشهادة"
                                className="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition cursor-pointer"
                              >
                                <Edit className="h-4 w-4" />
                              </button>

                              {/* Delete Certificate */}
                              <button
                                type="button"
                                onClick={() => setDeletingCert(cert)}
                                title="حذف الشهادة"
                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View: Cards */}
                <div className="sm:hidden space-y-3">
                  {filteredCertificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-gray-900 text-base">{cert.student_name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{cert.course_name}</p>
                        </div>
                        <span className="font-mono text-xs font-bold bg-gray-100 text-[var(--gsm-navy)] px-2.5 py-1 rounded-lg">
                          {cert.code}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-[var(--gsm-blue)]">
                          {cert.grade || "VERY GOOD"}
                        </span>
                        <span>{cert.hours ? `${cert.hours} ساعة` : "36 ساعة"}</span>
                        <span>•</span>
                        <span>{formatDateDisplay(cert.end_date || cert.start_date)}</span>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                        <Link
                          href={`/verify?code=${cert.code}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-200"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>معاينة</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleOpenEdit(cert)}
                          className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-100 cursor-pointer"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          <span>تعديل</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeletingCert(cert)}
                          className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>حذف</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

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
                    {copiedCode === autoSuccessCode ? (
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

                  <button
                    type="button"
                    onClick={() => setActiveTab("manage")}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    <ListFilter className="h-4 w-4 text-gray-500" />
                    <span>عرض سجل الشهادات</span>
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
                  اسم الدورة التدريبية (بالعربية)
                </label>
                <input
                  type="text"
                  value={autoForm.course_name}
                  onChange={(e) => setAutoForm({ ...autoForm, course_name: e.target.value })}
                  placeholder="دورة صيانة الهاتف المحمول الشامله"
                  className="w-full rounded-xl border border-gray-300 p-3.5 text-base outline-none transition focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  وصف الدورة (بالإنجليزية - COMPREHENSIVE COURSE)
                </label>
                <input
                  type="text"
                  value={autoForm.course_description}
                  onChange={(e) => setAutoForm({ ...autoForm, course_description: e.target.value })}
                  placeholder="COMPREHENSIVE MOBILE PHONE MAINTENANCE COURSE"
                  dir="ltr"
                  className="w-full rounded-xl border border-gray-300 p-3.5 text-base outline-none transition focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    اسم مدير الأكاديمية (ACADEMIC DIRECTOR)
                  </label>
                  <input
                    type="text"
                    value={autoForm.director_name}
                    onChange={(e) => setAutoForm({ ...autoForm, director_name: e.target.value })}
                    placeholder="MR. AHMED El Sayed"
                    dir="ltr"
                    className="w-full rounded-xl border border-gray-300 p-3.5 text-base outline-none transition focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    اسم المحاضر (INSTRUCTOR)
                  </label>
                  <input
                    type="text"
                    value={autoForm.instructor_name}
                    onChange={(e) => setAutoForm({ ...autoForm, instructor_name: e.target.value })}
                    placeholder="ENG. KHALED Mohamed"
                    dir="ltr"
                    className="w-full rounded-xl border border-gray-300 p-3.5 text-base outline-none transition focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100 font-medium"
                  />
                </div>
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

        {/* TAB 3: MANUAL PDF UPLOAD */}
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
                    {copiedCode === pdfSuccessCode ? (
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

        {/* FOOTER LINK */}
        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[var(--gsm-blue)]"
          >
            الانتقال إلى صفحة التحقق العامة (Verify)
          </Link>
        </div>
      </div>

      {/* EDIT MODAL DIALOG */}
      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Edit className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900">
                    تعديل بيانات الشهادة
                  </h3>
                  <p className="text-xs text-gray-500 font-mono">
                    الكود: {editingCert.code}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditingCert(null)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  اسم الطالب الكامل *
                </label>
                <input
                  type="text"
                  required
                  value={editForm.student_name}
                  onChange={(e) => setEditForm({ ...editForm, student_name: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm font-bold outline-none focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  كود الشهادة (Certificate ID) *
                </label>
                <input
                  type="text"
                  required
                  value={editForm.code}
                  onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm font-mono font-bold outline-none focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  اسم الدورة التدريبية (بالعربية)
                </label>
                <input
                  type="text"
                  value={editForm.course_name}
                  onChange={(e) => setEditForm({ ...editForm, course_name: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  وصف الدورة (بالإنجليزية)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={editForm.course_description}
                  onChange={(e) => setEditForm({ ...editForm, course_description: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    اسم مدير الأكاديمية (ACADEMIC DIRECTOR)
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={editForm.director_name}
                    onChange={(e) => setEditForm({ ...editForm, director_name: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    اسم المحاضر (INSTRUCTOR)
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={editForm.instructor_name}
                    onChange={(e) => setEditForm({ ...editForm, instructor_name: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    عدد الساعات (DURATION)
                  </label>
                  <input
                    type="number"
                    value={editForm.hours}
                    onChange={(e) => setEditForm({ ...editForm, hours: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    التقدير (GRADE)
                  </label>
                  <select
                    value={editForm.grade}
                    onChange={(e) => setEditForm({ ...editForm, grade: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100 bg-white"
                  >
                    <option value="VERY GOOD">VERY GOOD (جيد جداً)</option>
                    <option value="EXCELLENT">EXCELLENT (امتياز)</option>
                    <option value="GOOD">GOOD (جيد)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    من تاريخ (FROM)
                  </label>
                  <input
                    type="text"
                    value={editForm.start_date}
                    onChange={(e) => setEditForm({ ...editForm, start_date: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    إلى تاريخ (TO)
                  </label>
                  <input
                    type="text"
                    value={editForm.end_date}
                    onChange={(e) => setEditForm({ ...editForm, end_date: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-[var(--gsm-blue)] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--gsm-blue)] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {isSavingEdit ? (
                    <span>جارٍ الحفظ...</span>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>حفظ التعديلات</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-gray-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <Trash2 className="h-7 w-7" />
            </div>

            <h3 className="text-xl font-black text-gray-900 mb-2">
              تأكيد حذف الشهادة
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              هل أنت متأكد من رغبتك في حذف شهادة الطالب{" "}
              <strong className="text-gray-900">({deletingCert.student_name})</strong>{" "}
              ذات الكود{" "}
              <span className="font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                {deletingCert.code}
              </span>
              ؟ هذا الإجراء نهائي ولا يمكن التراجع عنه.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingCert(null)}
                className="flex-1 rounded-xl border border-gray-300 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                إلغاء
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-700 transition disabled:opacity-50 cursor-pointer shadow-sm"
              >
                {isDeleting ? "جارٍ الحذف..." : "نعم، احذف نهائياً"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
