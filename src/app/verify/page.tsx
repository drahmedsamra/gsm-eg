import { Suspense } from "react";
import type { Metadata } from "next";
import { VerifyCertificate } from "@/components/VerifyCertificate";

export const metadata: Metadata = {
  title: "التحقق من صحة الشهادات | جي اس ام مصر",
  description:
    "خدمة التحقق الإلكتروني الرسمي من شهادات خريجي أكاديمية جي اس ام مصر المعتمدة في هندسة الإلكترونيات وصيانة الموبايل والبرمجة.",
};

export default function VerifyPage() {
  return (
    <main className="min-h-screen py-10">
      <Suspense fallback={<div className="p-20 text-center font-bold text-gray-500">جارٍ تحميل نظام التحقق...</div>}>
        <VerifyCertificate />
      </Suspense>
    </main>
  );
}
