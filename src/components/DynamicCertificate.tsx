"use client";

import { useState } from "react";
import Image from "next/image";
import { jsPDF } from "jspdf";
import { Download, FileDown, Printer, ExternalLink, Share2, Copy, Check, CheckCircle2 } from "lucide-react";

export type CertificateProps = {
  code: string;
  student_name: string;
  course_name?: string;
  course_description?: string;
  hours?: number | string;
  start_date?: string;
  end_date?: string;
  grade?: string;
  director_name?: string;
  instructor_name?: string;
};

function formatDateDisplay(d?: string): string {
  if (!d) return "";
  if (d.includes("-")) {
    const parts = d.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  }
  return d;
}

export function DynamicCertificate({ cert }: { cert: CertificateProps }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [copied, setCopied] = useState(false);
  const certUrl = typeof window !== "undefined"
    ? `${window.location.origin}/verify?code=${cert.code}`
    : `https://gsm-eg.com/verify?code=${cert.code}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(certUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // High-Resolution Canvas Renderer (scale = 2 for ultra-sharp 300 DPI export)
  const renderCanvas = async (scale = 2): Promise<HTMLCanvasElement> => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = "/certificates/gsm-template.png";

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const canvas = document.createElement("canvas");
    canvas.width = (img.width || 731) * scale;
    canvas.height = (img.height || 1024) * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");

    // Draw background
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const fontFamily = "Cairo, 'Segoe UI', Tahoma, Arial, sans-serif";

    // 1. Student Name
    ctx.font = `bold ${36 * scale}px ${fontFamily}`;
    ctx.fillStyle = "#0b1a30";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(cert.student_name, w * 0.513, h * 0.389);

    // 2. Arabic Course Title
    const arabicCourse = cert.course_name || "دورة صيانة الهاتف المحمول الشامله";
    ctx.font = `bold ${20 * scale}px ${fontFamily}`;
    ctx.fillStyle = "#721a19";
    ctx.textAlign = "center";
    ctx.fillText(arabicCourse, w * 0.50, h * 0.470);

    // 3. English Course Description
    const englishDesc = cert.course_description || "COMPREHENSIVE MOBILE PHONE MAINTENANCE COURSE";
    ctx.font = `bold ${11 * scale}px ${fontFamily}`;
    ctx.fillStyle = "#0b1a30";
    ctx.textAlign = "center";
    ctx.fillText(englishDesc, w * 0.50, h * 0.495);

    // 4. Duration
    ctx.font = `bold ${13 * scale}px ${fontFamily}`;
    ctx.fillStyle = "#0b1a30";
    const hoursText = cert.hours ? `${cert.hours} HOURS` : "36 HOURS";
    ctx.fillText(hoursText, w * 0.184, h * 0.588);

    // 5. From Date
    ctx.fillText(formatDateDisplay(cert.start_date) || "14/01/2026", w * 0.403, h * 0.588);

    // 6. To Date
    ctx.fillText(formatDateDisplay(cert.end_date) || "14/06/2026", w * 0.626, h * 0.588);

    // 7. Grade
    ctx.fillText(cert.grade || "VERY GOOD", w * 0.838, h * 0.588);

    // 8. Certificate ID
    const displayCode = cert.code.replace(/^GSM[- ]*/i, "");
    ctx.font = `bold ${14 * scale}px monospace, ${fontFamily}`;
    ctx.fillStyle = "#721a19";
    ctx.textAlign = "left";
    ctx.fillText(displayCode, 143 * scale, h * 0.733);

    // 9. Academic Director Name
    const director = cert.director_name || "MR. AHMED El Sayed";
    ctx.font = `bold ${11 * scale}px ${fontFamily}`;
    ctx.fillStyle = "#0b1a30";
    ctx.textAlign = "center";
    ctx.fillText(director, w * 0.292, h * 0.909);

    // 10. Instructor Name
    const instructor = cert.instructor_name || "ENG. KHALED Mohamed";
    ctx.fillText(instructor, w * 0.720, h * 0.909);

    return canvas;
  };

  // 1-Click Direct A4 PDF Download
  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    try {
      const canvas = await renderCanvas(2);
      const imgData = canvas.toDataURL("image/jpeg", 0.96);

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // A4 is 210 x 297 mm. Template is 731 x 1024 (aspect ratio 0.7138)
      // 210 * (1024 / 731) = 294.2 mm height, centered vertically
      doc.addImage(imgData, "JPEG", 0, 1.4, 210, 294.2, undefined, "FAST");
      doc.save(`شهادة_${cert.student_name.replace(/\s+/g, "_")}_GSM.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      handlePrint();
    } finally {
      setDownloadingPdf(false);
    }
  };

  // High-Resolution 1-Click Image Download (PNG)
  const handleDownloadImage = async () => {
    setDownloading(true);
    try {
      const canvas = await renderCanvas(2);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png", 1.0)
      );

      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `شهادة_${cert.student_name.replace(/\s+/g, "_")}_GSM.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Canvas export failed:", err);
      handlePrint();
    } finally {
      setDownloading(false);
    }
  };

  const linkedinUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
    cert.course_name || "دورة صيانة الهاتف المحمول الشامله"
  )}&organizationName=${encodeURIComponent(
    "GSM Egypt Academy - جي اس ام مصر"
  )}&certUrl=${encodeURIComponent(certUrl)}&certId=${encodeURIComponent(cert.code)}`;

  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `شهادة إتمام معتمدة من GSM للطالب: ${cert.student_name}\nرابط التحقق الرسمي:\n${certUrl}`
  )}`;

  return (
    <div className="w-full">
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait !important;
            margin: 0mm !important;
          }
          html,
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          header,
          footer,
          nav,
          aside,
          .no-print {
            display: none !important;
          }
          #verify-certificate {
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
          }
          #verify-certificate > div {
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            max-width: 100% !important;
            background: transparent !important;
          }
          .print-certificate-area {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            page-break-inside: avoid !important;
            page-break-before: avoid !important;
            page-break-after: avoid !important;
            break-inside: avoid !important;
            z-index: 999999 !important;
          }
          .print-certificate-area > div {
            height: 98vh !important;
            max-height: 98vh !important;
            width: auto !important;
            aspect-ratio: 731 / 1024 !important;
            margin: auto !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      {/* Header Info */}
      <div className="no-print text-center pb-6 border-b border-emerald-200">
        <div className="mx-auto mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h2 className="text-2xl font-black text-emerald-800 sm:text-3xl">
          شهادة معتمدة من GSM
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          تم التحقق رسميًا من صحة الشهادة وسجلات التخرج في أكاديمية جي اس ام مصر
        </p>

        <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-1.5 border border-emerald-300 shadow-xs">
          <span className="text-xs text-gray-500">كود الشهادة:</span>
          <span className="font-mono font-bold text-base text-[var(--gsm-navy)]">
            {cert.code}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="no-print my-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={downloadingPdf}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--gsm-navy)] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90 shadow-md cursor-pointer disabled:opacity-50"
        >
          <FileDown className="h-4 w-4 text-red-400" />
          <span>{downloadingPdf ? "جارٍ تجهيز ملف الـ PDF..." : "تحميل PDF الشهادة (A4 جاهز)"}</span>
        </button>

        <button
          type="button"
          onClick={handleDownloadImage}
          disabled={downloading}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-800 transition hover:bg-gray-50 shadow-xs cursor-pointer disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          <span>{downloading ? "جارٍ تجهيز الصورة..." : "تحميل صورة (PNG عالية الدقة)"}</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-xl bg-gray-800 px-4 py-3 text-sm font-bold text-white transition hover:opacity-90 shadow-xs cursor-pointer"
        >
          <Printer className="h-4 w-4" />
          <span>طباعة فورية</span>
        </button>

        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0077b5] px-4 py-3 text-sm font-bold text-white transition hover:opacity-90 shadow-sm"
        >
          <ExternalLink className="h-4 w-4" />
          <span>LinkedIn</span>
        </a>

        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-600">تم النسخ!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>نسخ الرابط</span>
            </>
          )}
        </button>

        <a
          href={waShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900 transition hover:bg-blue-100"
        >
          <Share2 className="h-4 w-4" />
          <span>واتساب</span>
        </a>
      </div>

      {/* The Dynamic Responsive Portrait Canvas */}
      <div className="print-certificate-area mx-auto max-w-xl overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-2xl relative">
        <div
          className="relative w-full aspect-[731/1024] select-none"
          style={{
            containerType: "inline-size",
          }}
        >
          {/* Base Template Image */}
          <Image
            src="/certificates/gsm-template.png"
            alt="GSM Certificate Template"
            fill
            sizes="(max-width: 768px) 100vw, 650px"
            priority
            className="object-contain"
          />

          {/* Student Name */}
          <div
            className="absolute font-black text-[#0b1a30] text-center pointer-events-none"
            style={{
              top: "38.9%",
              left: "51.3%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              fontSize: "4.8cqw",
              lineHeight: "1.2",
            }}
          >
            {cert.student_name}
          </div>

          {/* Course Name (Arabic) */}
          <div
            className="absolute font-black text-[#721a19] text-center pointer-events-none"
            style={{
              top: "47.0%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              fontSize: "2.7cqw",
              lineHeight: "1.2",
            }}
          >
            {cert.course_name || "دورة صيانة الهاتف المحمول الشامله"}
          </div>

          {/* Course Description (English) */}
          <div
            className="absolute font-extrabold text-[#0b1a30] text-center pointer-events-none uppercase tracking-wide"
            style={{
              top: "49.5%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "85%",
              fontSize: "1.5cqw",
              lineHeight: "1.2",
            }}
          >
            {cert.course_description || "COMPREHENSIVE MOBILE PHONE MAINTENANCE COURSE"}
          </div>

          {/* Duration */}
          <div
            className="absolute font-bold text-[#0b1a30] text-center pointer-events-none"
            style={{
              top: "58.8%",
              left: "18.4%",
              transform: "translate(-50%, -50%)",
              fontSize: "1.8cqw",
            }}
          >
            {cert.hours ? `${cert.hours} HOURS` : "36 HOURS"}
          </div>

          {/* From Date */}
          <div
            className="absolute font-bold text-[#0b1a30] text-center pointer-events-none"
            style={{
              top: "58.8%",
              left: "40.3%",
              transform: "translate(-50%, -50%)",
              fontSize: "1.6cqw",
            }}
          >
            {formatDateDisplay(cert.start_date) || "14/01/2026"}
          </div>

          {/* To Date */}
          <div
            className="absolute font-bold text-[#0b1a30] text-center pointer-events-none"
            style={{
              top: "58.8%",
              left: "62.6%",
              transform: "translate(-50%, -50%)",
              fontSize: "1.6cqw",
            }}
          >
            {formatDateDisplay(cert.end_date) || "14/06/2026"}
          </div>

          {/* Grade */}
          <div
            className="absolute font-bold text-[#0b1a30] text-center pointer-events-none"
            style={{
              top: "58.8%",
              left: "83.8%",
              transform: "translate(-50%, -50%)",
              fontSize: "1.7cqw",
            }}
          >
            {cert.grade || "VERY GOOD"}
          </div>

          {/* Certificate Code (Left-aligned under CERTIFICATE ID at 19.6%) */}
          <div
            className="absolute font-bold text-[#721a19] pointer-events-none text-left font-mono"
            style={{
              top: "73.3%",
              left: "19.6%",
              transform: "translate(0, -50%)",
              fontSize: "1.9cqw",
              letterSpacing: "0.5px",
            }}
          >
            {cert.code.replace(/^GSM[- ]*/i, "")}
          </div>

          {/* Academic Director Name */}
          <div
            className="absolute font-bold text-[#0b1a30] text-center pointer-events-none uppercase tracking-tight"
            style={{
              top: "90.9%",
              left: "29.2%",
              transform: "translate(-50%, -50%)",
              fontSize: "1.5cqw",
              width: "35%",
            }}
          >
            {cert.director_name || "MR. AHMED El Sayed"}
          </div>

          {/* Instructor Name */}
          <div
            className="absolute font-bold text-[#0b1a30] text-center pointer-events-none uppercase tracking-tight"
            style={{
              top: "90.9%",
              left: "72.0%",
              transform: "translate(-50%, -50%)",
              fontSize: "1.5cqw",
              width: "35%",
            }}
          >
            {cert.instructor_name || "ENG. KHALED Mohamed"}
          </div>
        </div>
      </div>
    </div>
  );
}
