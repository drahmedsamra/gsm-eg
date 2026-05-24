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
    default: "GSM Academy | أكاديمية GSM للتعليم التقني",
    template: "%s | GSM Academy",
  },
  description: siteConfig.description.ar,
  keywords: [
    "أكاديمية GSM",
    "تعليم البرمجة",
    "الإلكترونيات",
    "الذكاء الاصطناعي",
    "روبوتات",
    "برمجة أطفال",
    "GSM Academy",
  ],
  openGraph: {
    title: "GSM Academy | أكاديمية GSM",
    description: siteConfig.description.ar,
    locale: "ar_EG",
    type: "website",
    siteName: "GSM Academy",
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
      className={`${cairo.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-gsm-light text-gsm-navy">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
