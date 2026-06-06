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
      <div className="p-10 text-3xl font-bold">
        Course Not Found
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-32">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="order-1">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-[260px] w-full rounded-3xl object-cover shadow-2xl sm:h-[420px] lg:h-[520px]"
          />
        </div>

        <div
          className="order-2 space-y-5 text-center lg:text-right"
          dir="rtl"
        >
          <div className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-bold text-[var(--gsm-blue)]">
            GSM International Academy
          </div>

          <h1 className="text-4xl font-black leading-tight text-[var(--gsm-navy)] sm:text-5xl lg:text-6xl">
            {course.title}
          </h1>

          <p className="text-xl text-gray-500 sm:text-2xl">
            {course.short_description}
          </p>

          <p className="text-lg leading-9 text-gray-700 sm:text-xl sm:leading-10">
            {course.long_description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 lg:justify-end">
            <span className="text-4xl font-black text-[var(--gsm-blue)] sm:text-5xl">
              EGP {course.price}
            </span>

            {course.old_price && (
              <span className="text-2xl text-gray-400 line-through">
                EGP {course.old_price}
              </span>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-700 lg:justify-end">
            <span>⏱</span>

            <span>
              مدة الكورس: {course.duration}
            </span>
          </div>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center lg:justify-end">
            <a
              href="https://wa.me/2010007031009"
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