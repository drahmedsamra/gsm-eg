import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { getCourseBySlug, getCourseWhatsAppUrl } from "@/data/courses";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { OfferCountdown } from "@/components/OfferCountdown";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "دورة تدريبية | جي اس ام مصر",
    };
  }

  const titleStr = typeof course.title === "string" ? course.title : course.title.ar;
  const descStr = typeof course.description === "string" ? course.description : course.description.ar;

  return {
    title: `${titleStr} | جي اس ام مصر`,
    description: descStr,
    openGraph: {
      title: `${titleStr} | جي اس ام مصر`,
      description: descStr,
      images: course.thumbnail ? [{ url: course.thumbnail }] : [],
    },
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-36 text-center" dir="rtl">
        <h1 className="text-3xl font-black text-[var(--gsm-navy)] mb-4">
          عذرًا، الدورة التدريبية غير موجودة
        </h1>
        <p className="text-gray-500 mb-8">
          قد يكون تم تغيير الرابط أو أن الدورة غير متاحة حاليًا.
        </p>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--gsm-blue)] px-6 py-3 font-bold text-white transition hover:opacity-90"
        >
          <span>تصفح جميع الدورات التدريبية</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
    );
  }

  const titleAr = typeof course.title === "string" ? course.title : course.title.ar;
  const descAr = typeof course.description === "string" ? course.description : course.description.ar;
  const priceAr = typeof course.price === "string" ? course.price : course.price.ar;
  const oldPriceAr = course.oldPrice ? (typeof course.oldPrice === "string" ? course.oldPrice : course.oldPrice.ar) : undefined;
  const durationAr = typeof course.duration === "string" ? course.duration : course.duration.ar;

  const waUrl = getCourseWhatsAppUrl({
    title: titleAr,
    price: priceAr,
    oldPrice: oldPriceAr,
    locale: "ar",
  });

  const savings =
    course.oldPriceNumber && course.priceNumber
      ? course.oldPriceNumber - course.priceNumber
      : null;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-32">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500 font-medium" dir="rtl">
        <Link href="/" className="hover:text-[var(--gsm-blue)]">الرئيسية</Link>
        <span>/</span>
        <Link href="/courses" className="hover:text-[var(--gsm-blue)]">الدورات التدريبية</Link>
        <span>/</span>
        <span className="text-gray-900 font-bold">{titleAr}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        {/* Course Media Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-xl">
            {course.thumbnail ? (
              <Image
                src={course.thumbnail}
                alt={titleAr}
                width={800}
                height={550}
                priority
                className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[420px]"
              />
            ) : (
              <div className="h-[280px] w-full bg-gray-200 sm:h-[380px] flex items-center justify-center text-gray-400">
                صورة الدورة
              </div>
            )}

            {savings && savings > 0 && (
              <div className="absolute top-4 start-4 rounded-full bg-red-600 px-4 py-1.5 text-xs font-black text-white shadow-lg">
                🔥 وفر {savings} جنيه عبر الموقع
              </div>
            )}
          </div>

          {/* Offer Countdown Widget */}
          {course.oldPrice && (
            <OfferCountdown className="shadow-md" />
          )}
        </div>

        {/* Course Info Column (7 cols) */}
        <div dir="rtl" className="lg:col-span-7 space-y-6">
          {/* Urgency Scarcity Badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <UrgencyBadge seatsLeft={course.seatsLeft || 3} />
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[var(--gsm-blue)] border border-blue-200">
              <Sparkles className="h-3 w-3" />
              تدريب عملي 100% داخل المعامل
            </span>
          </div>

          <h1 className="text-3xl font-black leading-tight text-[var(--gsm-navy)] sm:text-4xl lg:text-5xl">
            {titleAr}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            {descAr}
          </p>

          {/* Pricing Box */}
          <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold text-gray-500 block mb-1">
                  سعر الدورة التدريبية مع خصم الموقع الحصري:
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black text-[var(--gsm-blue)]">
                    {priceAr}
                  </span>

                  {oldPriceAr && (
                    <span className="text-xl text-gray-400 line-through font-bold">
                      {oldPriceAr}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-left" dir="ltr">
                <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-600 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-xs">
                  ⏱ {durationAr}
                </span>
              </div>
            </div>
          </div>

          {/* Value Props / Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-xs font-bold text-emerald-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>تدريب عملي على أجهزة حقيقية</span>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/60 p-3.5 text-xs font-bold text-blue-900">
              <ShieldCheck className="h-4 w-4 text-[var(--gsm-blue)] shrink-0" />
              <span>شهادة تخرج معتمدة من GSM</span>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-amber-100 bg-amber-50/60 p-3.5 text-xs font-bold text-amber-900">
              <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
              <span>دعم فني واستشارات بعد التخرج</span>
            </div>
          </div>

          {/* Detailed Course Syllabus / Description */}
          {course.longDescription && (
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xs">
              <h2 className="text-xl font-bold text-[var(--gsm-navy)] mb-4">
                تفاصيل ومحتوى الدورة التدريبية:
              </h2>
              <div className="text-base leading-8 text-gray-700 whitespace-pre-line">
                {course.longDescription}
              </div>
            </div>
          )}

          {/* Primary High-Converting CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 p-4 text-center text-lg font-bold text-white shadow-md transition hover:bg-emerald-700 hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="h-5 w-5" />
              <span>احجز مقعدك بالخصم عبر الواتساب</span>
            </a>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--gsm-navy)] px-8 py-4 text-center text-lg font-bold text-white shadow-md transition hover:opacity-90 hover:scale-[1.02] cursor-pointer"
            >
              <span>استفسار عن المواعيد</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
