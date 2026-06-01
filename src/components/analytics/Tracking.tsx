"use client";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

/* ==========================================================================
Tracking IDs
========================================================================== */

const GTM_ID = "GTM-W8RC98QR";

const META_PIXEL_ID = "105757756600816";

/* ==========================================================================
Tracking Component
========================================================================== */

export default function Tracking() {
return (
<>

  {/* =========================================================
      Meta Pixel
     ========================================================= */}
  <Script id="facebook-pixel" strategy="afterInteractive">
    {`
      !function(f,b,e,v,n,t,s)
      {
        if(f.fbq) return;
        n = f.fbq = function(){
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments)
        };
        if(!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      }(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js'
      );
      fbq('init', '${META_PIXEL_ID}');
      fbq('track', 'PageView');
      /* =====================================================
         Button Tracking
         ===================================================== */
      document.addEventListener('click', function(e) {
        const target = e.target;
        if (target.closest('a, button')) {
          const text =
            target.innerText?.toLowerCase() || '';
          // Lead Event
          if (
            text.includes('احجز') ||
            text.includes('سجل') ||
            text.includes('ابدأ')
          ) {
            fbq('track', 'Lead');
          }
          // Contact Event
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
  {/* =========================================================
      Meta Pixel Fallback
     ========================================================= */}
  <noscript>
    <img
      height="1"
      width="1"
      style={{
        display: "none",
      }}
      src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
      alt=""
    />
  </noscript>
  {/* =========================================================
      Google Tag Manager
     ========================================================= */}
  <GoogleTagManager gtmId={GTM_ID} />
</>

);
}