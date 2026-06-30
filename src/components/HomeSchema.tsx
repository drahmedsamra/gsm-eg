export default function HomeSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://gsm-eg.com/#organization",

        name: "آكاديمية جي إس إم مصر",
        alternateName: "GSM Egypt Academy",

        url: "https://gsm-eg.com",

        logo: "https://gsm-eg.com/gsmlogo.webp",

        image: "https://gsm-eg.com/gsm-meta.webp",

        description:
          "أكاديمية جي إس إم مصر الدولية متخصصة في تدريب صيانة الموبايل والإلكترونيات والبرمجة والروبوتات وبرنامج المخترع الصغير، وتقدم دورات احترافية تؤهل لسوق العمل.",

        telephone: "+201155999333",

        email: "gsm.academy@gmail.com",

        founder: {
          "@type": "Person",
          name: "أحمد سمرة",
          alternateName: "Ahmed Samra",
        },

        areaServed: {
          "@type": "Country",
          name: "Egypt",
        },

        address: {
          "@type": "PostalAddress",
          addressLocality: "القاهرة",
          addressCountry: "EG",
        },

        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+201155999333",
          contactType: "customer support",
          areaServed: "EG",
          availableLanguage: ["ar", "en"],
        },

        sameAs: [
          "https://www.facebook.com/gsmacademy/",
          "https://www.youtube.com/@gsmacademy3495",
          "https://instagram.com/gsmacdemy",
        ],
      },

      {
        "@type": "WebSite",
        "@id": "https://gsm-eg.com/#website",

        url: "https://gsm-eg.com",

        name: "أكاديمية GSM الدولية",
        alternateName: "GSM International Academy",

        description: "الموقع الرسمي لأكاديمية GSM الدولية للتدريب.",

        inLanguage: "ar-EG",

        publisher: {
          "@id": "https://gsm-eg.com/#organization",
        },
      },

      {
        "@type": "WebPage",
        "@id": "https://gsm-eg.com/#homepage",

        url: "https://gsm-eg.com",

        name: "الصفحة الرئيسية | أكاديمية GSM الدولية",

        description:
          "تعلم صيانة الموبايل والإلكترونيات وبرمجة الأطفال والروبوتات وبرنامج المخترع الصغير مع أكاديمية GSM الدولية.",

        isPartOf: {
          "@id": "https://gsm-eg.com/#website",
        },

        about: {
          "@id": "https://gsm-eg.com/#organization",
        },

        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://gsm-eg.com/gsm-meta.webp",
        },
      },

      {
        "@type": "ItemList",

        name: "الدورات التدريبية",

        itemListOrder: "https://schema.org/ItemListOrderAscending",

        numberOfItems: 4,

        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "كورس صيانة الموبايل",
            url: "https://gsm-eg.com/mobile",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "كورسات الإلكترونيات",
            url: "https://gsm-eg.com/electronics",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "برنامج المخترع الصغير",
            url: "https://gsm-eg.com/kids",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "كورسات البرمجة للأطفال",
            url: "https://gsm-eg.com/programming",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}