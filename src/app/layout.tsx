

import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { Cairo, Inter } from "next/font/google";
import {
  GoogleAnalytics,
  GoogleTagManager,
} from "@next/third-parties/google";

import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";

import "./globals.css";
import { siteConfig } from "@/data/site";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  icons: {
    icon: "/favicon.webp",
    shortcut: "/favicon.webp",
    apple: "/favicon.webp",
  },

  title: {
    default: "جي اس ام مصر لهندسة الإلكترونيات والصيانة والبرمجة",
    template: "%s | جي اس ام مصر",
  },

  description:
    "تعلم صيانة الموبايل والإلكترونيات والبرمجة والذكاء الاصطناعي مع متخصصين وخبراء في المجال.",

  keywords: [
    "جي اس ام مصر",
    "كورس صيانة الموبايل",
    "كورس الإلكترونيات",
    "تعلم البرمجة",
    "كورسات برمجة",
    "كورسات إلكترونيات",
    "المخترع الصغير للأطفال",
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

    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "GSM Egypt Academy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "جي اس ام مصر",

    description:
      "تعلم صيانة الموبايل والإلكترونيات والبرمجة والذكاء الاصطناعي مع متخصصين وخبراء في المجال.",

    images: ["/og-image.webp"],
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
      <body className="overflow-x-hidden bg-gsm-light text-gsm-navy">

        {/* Meta Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;
            n.loaded=!0;
            n.version='2.0';
            n.queue=[];
            t=b.createElement(e);
            t.async=!0;
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '105757756600816');
            fbq('track', 'PageView');

            // Track buttons
            document.addEventListener('click', function(e) {
              const target = e.target;

              if (target.closest('a, button')) {
                const text = target.innerText?.toLowerCase() || '';

                // Lead
                if (
                  text.includes('احجز') ||
                  text.includes('سجل') ||
                  text.includes('ابدأ')
                ) {
                  fbq('track', 'Lead');
                }

                // Contact
                if (
                  text.includes('واتساب') ||
                  text.includes('اتصال') ||
                  text.includes('تواصل')
                ) {
                  fbq('track', 'Contact');
                }
              }
            });
          `}
        </Script>

        {/* NoScript Fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=105757756600816&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <Providers>

          <Navbar />

          {children}

        </Providers>

        <GoogleAnalytics gaId="G-1PMX146HX4" />
        <GoogleTagManager gtmId="GTM-W8RC98QR" />
      </body>
    </html>
  );
}