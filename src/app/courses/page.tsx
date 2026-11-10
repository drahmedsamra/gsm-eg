import type { Metadata } from "next";
import { CourseCard } from "@/components/CourseCard";
import { getCourses } from "@/data/courses";
import { Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "جميع الدورات التدريبية | جي اس ام مصر",
  description:
    "استكشف دورات جي اس ام مصر في هندسة الإلكترونيات، صيانة الموبايل، البرمجة، والذكاء الاصطناعي مع تدريب عملي وشهادات معتمدة وخصومات حصرية.",
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-32">
      <div className="mb-12 text-center" dir="rtl">
        <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold text-red-700 shadow-xs mb-4">
          <Flame className="h-4 w-4 text-red-600" />
          <span>خصومات حصرية لدفعة هذا الشهر — المقاعد محدودة!</span>
        </div>

        <h1 className="text-4xl font-black text-[var(--gsm-navy)] sm:text-5xl lg:text-6xl">
          دورات أكاديمية جي إس إم
        </h1>

        <p className="mt-4 text-lg text-gray-500 sm:text-xl max-w-2xl mx-auto leading-relaxed">
          تعلم صيانة الموبايل، هندسة الإلكترونيات، البرمجة والروبوتات مع تدريب عملي 100% وشهادات معتمدة
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </main>
  );
}
