import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function CoursesPage() {
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("published", true);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-32">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black text-[var(--gsm-navy)] sm:text-5xl lg:text-6xl">
          دورات أكاديمية جي إس إم
        </h1>

        <p className="mt-4 text-lg text-gray-500 sm:text-xl">
          تعلم الإلكترونيات وصيانة الموبايل والبرمجة والروبوتات مع تدريب عملي
          وشهادات معتمدة
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {courses?.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.slug}`}
            className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative overflow-hidden">
              {course.old_price && (
                <div className="absolute left-4 top-4 z-10 rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">
                  خصم
                </div>
              )}

              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-6 text-center" dir="rtl">
              <h2 className="mb-3 text-2xl font-black text-[var(--gsm-navy)]">
                {course.title}
              </h2>

              <p className="mb-5 line-clamp-2 text-gray-600">
                {course.short_description}
              </p>

              <div className="mb-4">
                {course.old_price && (
                  <div className="mb-1 text-lg text-gray-400 line-through">
                    {course.old_price} جنيه
                  </div>
                )}

                <div className="text-4xl font-black text-[var(--gsm-blue)]">
                  {course.price} جنيه
                </div>
              </div>

              <div className="mb-6 text-lg font-semibold text-gray-500">
                ⏱ {course.duration}
              </div>

              <div className="rounded-2xl bg-[var(--gsm-blue)] py-4 text-center text-lg font-bold text-white transition group-hover:scale-105">
                عرض التفاصيل
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}