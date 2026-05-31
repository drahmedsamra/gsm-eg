import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function CoursesPage() {

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("published", true);

  return (
    <main className="mx-auto max-w-7xl px-4 pt-52 pb-16">

      <div className="mb-14 text-center">

        <h1 className="text-5xl font-black text-[var(--gsm-navy)]">
          Our Courses
        </h1>

        <p className="mt-4 text-xl text-gray-500">
          Explore GSM International Academy Courses
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {courses?.map((course) => (

          <Link
            key={course.id}
            href={`/courses/${course.slug}`}
            className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
          >

            <div className="overflow-hidden">

              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
              />

            </div>

            <div className="space-y-5 p-6">

              <div className="space-y-3">

                <h2 className="text-3xl font-black text-[var(--gsm-navy)]">
                  {course.title}
                </h2>

                <p className="line-clamp-3 text-lg leading-8 text-gray-600">
                  {course.short_description}
                </p>

              </div>

              <div className="flex items-center gap-3">

                {course.old_price && (
                  <span className="text-xl text-gray-400 line-through">
                    EGP {course.old_price}
                  </span>
                )}

                <span className="text-3xl font-black text-[var(--gsm-blue)]">
                  EGP {course.price}
                </span>

              </div>

              <div className="flex items-center justify-between pt-2">

                <span className="text-lg font-semibold text-gray-500">
                  ⏱ {course.duration}
                </span>

                <div className="rounded-2xl bg-[var(--gsm-blue)] px-5 py-3 text-lg font-bold text-white transition group-hover:scale-105">
                  View Course
                </div>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </main>
  );
}