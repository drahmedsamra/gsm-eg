import type { Metadata, Viewport } from "next";
import { Cairo, Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";
import { siteConfig } from "@/data/site";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "جي اس ام مصر لهندسة الإلكترونيات والصيانة والبرمجة",
    template: "%s | جي اس ام مصر",
  },

  description:
    "تعلم صيانة الموبايل والإلكترونيات والبرمجة والذكاء الاصطناعي مع متخصصين وخبراء في المجال.",

  keywords: [
    "جي اس ام مصر",
    "صيانة الموبايل",
    "هندسة الإلكترونيات",
    "تعلم البرمجة",
    "كورسات برمجة",
    "كورسات إلكترونيات",
    "ذكاء اصطناعي",
    "تعليم الأطفال البرمجة",
    "GSM Egypt",
    "Electronics Engineering",
    "Mobile Maintenance",
  ],

  openGraph: {
    title: "جي اس ام مصر لهندسة الإلكترونيات والصيانة والبرمجة",
    description:
      "تعلم صيانة الموبايل والإلكترونيات والبرمجة والذكاء الاصطناعي مع متخصصين وخبراء في المجال.",
    locale: "ar_EG",
    type: "website",
    siteName: "جي اس ام مصر",
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#06004f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <body className="bg-gsm-light text-gsm-navy overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

