"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { Download, Printer, ExternalLink, Share2, Copy, Check, CheckCircle2 } from "lucide-react";

export type CertificateProps = {
  code: string;
  student_name: string;
  course_name?: string;
  hours?: number | string;
  start_date?: string;
  end_date?: string;
  grade?: string;
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
  const [copied, setCopied] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  const certUrl = typeof window !== "undefined"
    ? `${window.location.origin}/verify?code=${cert.code}`
    : `https://gsm-eg.com/verify?code=${cert.code}`;

  // Generate QR Code dynamically
  useEffect(() => {
    QRCode.toDataURL(certUrl, {
      margin: 0,
      width: 250,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error("QR Code Error:", err));
  }, [certUrl]);

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

  // High-Resolution 1-Click Image Download
  const handleDownloadImage = async () => {
    setDownloading(true);
    try {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = "/certificates/gsm-template.png";

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width || 731;
      canvas.height = img.height || 1024;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      // Draw background
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const fontFamily = "Cairo, 'Segoe UI', Tahoma, Arial, sans-serif";

      // 1. Student Name
      ctx.font = `bold 36px ${fontFamily}`;
      ctx.fillStyle = "#0b1a30";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(cert.student_name, w * 0.513, h * 0.389);

      // 2. Duration
      ctx.font = `bold 13px ${fontFamily}`;
      ctx.fillStyle = "#0b1a30";
      const hoursText = cert.hours ? `${cert.hours} HOURS` : "36 HOURS";
      ctx.fillText(hoursText, w * 0.184, h * 0.588);

      // 3. From Date
      ctx.fillText(formatDateDisplay(cert.start_date) || "14/01/2026", w * 0.403, h * 0.588);

      // 4. To Date
      ctx.fillText(formatDateDisplay(cert.end_date) || "14/06/2026", w * 0.626, h * 0.588);

      // 5. Grade
      ctx.fillText(cert.grade || "VERY GOOD", w * 0.838, h * 0.588);

      // 6. QR Code
      if (qrCodeDataUrl) {
        const qrImg = new window.Image();
        qrImg.src = qrCodeDataUrl;
        await new Promise((res) => {
          qrImg.onload = res;
        });
        const qrSize = w * 0.103;
        ctx.drawImage(qrImg, w * 0.1254 - qrSize / 2, h * 0.74 - qrSize / 2, qrSize, qrSize);
      }

      // 7. Certificate ID (strips duplicate leading GSM if already in template)
      const displayCode = cert.code.replace(/^GSM[- ]*/i, "");
      ctx.font = `bold 14px ${fontFamily}`;
      ctx.fillStyle = "#721a19";
      ctx.textAlign = "left";
      ctx.fillText(displayCode, w * 0.241, h * 0.733);

      // Download PNG
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
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          header,
          footer,
          nav,
          .no-print {
            display: none !important;
          }
          .print-certificate-area {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            box-shadow: none !important;
            border: none !important;
          }
          @page {
            size: portrait;
            margin: 0;
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
          onClick={handleDownloadImage}
          disabled={downloading}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--gsm-navy)] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90 shadow-sm cursor-pointer disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          <span>{downloading ? "جارٍ تجهيز الشهادة..." : "تحميل الشهادة (PNG عالية الدقة)"}</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-xl bg-gray-800 px-5 py-3 text-sm font-bold text-white transition hover:opacity-90 shadow-sm cursor-pointer"
        >
          <Printer className="h-4 w-4" />
          <span>طباعة / حفظ كـ PDF</span>
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
          className="inline-flex items-center gap-2 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100"
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

          {/* QR Code */}
          {qrCodeDataUrl && (
            <div
              className="absolute pointer-events-none"
              style={{
                top: "74.0%",
                left: "12.5%",
                transform: "translate(-50%, -50%)",
                width: "10.3%",
                aspectRatio: "1/1",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrCodeDataUrl}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Certificate Code */}
          <div
            className="absolute font-bold text-[#721a19] pointer-events-none text-left font-mono"
            style={{
              top: "73.3%",
              left: "24.1%",
              transform: "translate(0, -50%)",
              fontSize: "1.9cqw",
              letterSpacing: "0.5px",
            }}
          >
            {cert.code.replace(/^GSM[- ]*/i, "")}
          </div>
        </div>
      </div>
    </div>
  );
}
