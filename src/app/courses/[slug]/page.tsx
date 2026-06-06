import { supabase } from "@/lib/supabase";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CoursePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!course) {
    return (
      <div className="p-10 text-center text-3xl font-bold">
        الكورس غير موجود
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-32">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-[260px] w-full rounded-3xl object-cover shadow-2xl sm:h-[420px] lg:h-[520px]"
          />
        </div>

        <div dir="rtl" className="space-y-6 text-center lg:text-right">
          <div className="inline-flex rounded-full bg-red-100 px-5 py-2 text-sm font-bold text-red-600">
            🔥 خصم لفترة محدودة
          </div>

          <h1 className="text-4xl font-black leading-tight text-[var(--gsm-navy)] sm:text-5xl">
            {course.title}
          </h1>

          <p className="text-xl text-gray-500">
            {course.short_description}
          </p>

          <div className="rounded-2xl bg-gray-50 p-6">
            {course.old_price && (
              <div className="mb-2 text-2xl text-gray-400 line-through">
                {course.old_price} جنيه
              </div>
            )}

            <div className="text-5xl font-black text-[var(--gsm-blue)]">
              {course.price} جنيه
            </div>

            <div className="mt-3 text-lg text-gray-500">
              ⏱ {course.duration}
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-gray-200 p-5 text-right">
            <div>✅ تدريب عملي 100%</div>
            <div>🎓 شهادة معتمدة</div>
            <div>📞 دعم بعد التدريب</div>
          </div>

          <p className="text-lg leading-9 text-gray-700">
            {course.long_description}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-end">
            <a
              href="https://wa.me/201011822931"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-green-500 px-8 py-4 text-center text-lg font-bold text-white transition hover:scale-105"
            >
              تواصل واتساب
            </a>

            <button className="rounded-2xl bg-[var(--gsm-blue)] px-8 py-4 text-lg font-bold text-white transition hover:scale-105">
              احجز الآن
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}