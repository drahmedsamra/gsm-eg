import type { Metadata } from "next";
import { AdminCertificateUpload } from "@/components/AdminCertificateUpload";

export const metadata: Metadata = {
  title: "رفع شهادات PDF | جي اس ام مصر",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <main className="min-h-screen py-10">
      <AdminCertificateUpload />
    </main>
  );
}
