import { supabase } from "@/lib/supabase";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CoursePage({ params }: PageProps) {

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
    <main className="mx-auto max-w-7xl px-4 pt-64 pb-16">

      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

        <div>

          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-[500px] w-full rounded-3xl object-cover shadow-2xl"
          />

        </div>

        <div className="space-y-6">

          <div className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-bold text-[var(--gsm-blue)]">
            GSM International Academy
          </div>

          <h1 className="text-5xl font-black leading-tight text-[var(--gsm-navy)]">
            {course.title}
          </h1>

          <p className="text-2xl text-gray-500">
            {course.short_description}
          </p>

          <p className="max-w-3xl text-xl leading-10 text-gray-700">
            {course.long_description}
          </p>

          <div className="flex items-center gap-4 pt-4">

            {course.old_price && (
              <span className="text-3xl text-gray-400 line-through">
                EGP {course.old_price}
              </span>
            )}

            <span className="text-5xl font-black text-[var(--gsm-blue)]">
              EGP {course.price}
            </span>

          </div>

          <div className="flex items-center gap-3 text-xl font-semibold text-gray-700">

            <span>
              ⏱
            </span>

            <span>
              Duration: {course.duration}
            </span>

          </div>

          <div className="flex flex-wrap gap-4 pt-6">

            <a
              href="https://wa.me/201000000000"
              target="_blank"
              className="rounded-2xl bg-green-500 px-8 py-4 text-lg font-bold text-white transition hover:scale-105"
            >
              WhatsApp
            </a>

            <button
              className="rounded-2xl bg-[var(--gsm-blue)] px-8 py-4 text-lg font-bold text-white transition hover:scale-105"
            >
              احجز الآن
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}