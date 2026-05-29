

"use client";

import { useState } from "react";

import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { courses } from "@/data/courses";
import { siteConfig } from "@/data/site";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { t as pick } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export function ContactForm() {
  const { locale, t } = useLocale();

  const [loading, setLoading] = useState(false);

  return (
    <section
      id="inquiry"
      className="bg-gsm-light py-12 sm:py-16"
      aria-labelledby="inquiry-heading"
    >
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="inquiry-heading"
              className="text-4xl font-extrabold tracking-tight text-gsm-navy sm:text-5xl"
            >
              {t("formTitle")}
            </h2>

            <p className="mt-3 text-sm leading-7 text-gsm-muted sm:text-base">
              {t("formDesc")}
            </p>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              setLoading(true);

              const formData = new FormData(e.currentTarget);

              const data = {
                name: formData.get("name"),
                phone: formData.get("phone"),
                course: formData.get("course"),
                message: formData.get("message"),
                locale,
              };

              try {
                const response = await fetch("/api/contact", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                });

                if (response.ok) {
                  alert(
                    locale === "ar"
                      ? "تم إرسال طلبك بنجاح 🎉"
                      : "Message sent successfully 🎉"
                  );

                  (e.target as HTMLFormElement).reset();

                  // Meta Pixel Lead Event
                  if (
                    typeof window !== "undefined" &&
                    window.fbq
                  ) {
                    window.fbq("track", "Lead");
                  }
                } else {
                  alert(
                    locale === "ar"
                      ? "حدث خطأ أثناء الإرسال"
                      : "Something went wrong"
                  );
                }
              } catch (error) {
                console.error(error);

                alert(
                  locale === "ar"
                    ? "حدث خطأ أثناء الإرسال"
                    : "Something went wrong"
                );
              }

              setLoading(false);
            }}
            className="mx-auto mt-8 max-w-xl space-y-6 rounded-[36px] bg-white p-6 shadow-xl shadow-gsm-navy/5 sm:p-10"
          >
            <input type="hidden" name="locale" value={locale} />

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-base font-bold text-gsm-navy"
              >
                {t("formName")}
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder={
                  locale === "ar"
                    ? "اكتب اسمك الكامل"
                    : "Enter your full name"
                }
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-base font-bold text-gsm-navy"
              >
                {t("formPhone")}
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                dir="ltr"
                placeholder="+20 101 182 2931"
                className={cn(inputClass, "text-end")}
              />
            </div>

            <div>
              <label
                htmlFor="course"
                className="mb-2 block text-base font-bold text-gsm-navy"
              >
                {t("formCourse")}
              </label>

              <select
                id="course"
                name="course"
                className={inputClass}
                defaultValue=""
              >
                <option value="">
                  {t("formSelectCourse")}
                </option>

                {courses.map((course) => (
                  <option
                    key={course.id}
                    value={course.id}
                  >
                    {pick(locale, course.title)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-base font-bold text-gsm-navy"
              >
                {t("formMessage")}
              </label>

              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={
                  locale === "ar"
                    ? "اكتب استفسارك هنا..."
                    : "Write your message here..."
                }
                className={cn(inputClass, "resize-none")}
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                type="submit"
                variant="primary"
                className="h-16 flex-1 rounded-full text-lg font-bold shadow-xl shadow-red-500/20"
              >
                {loading
                  ? locale === "ar"
                    ? "جارٍ الإرسال..."
                    : "Sending..."
                  : t("formSubmit")}
              </Button>

              <Button
                href={siteConfig.whatsapp.href(locale)}
                className="h-16 flex-1 rounded-full !bg-blue-600 !text-white text-lg font-bold hover:!bg-blue-700"
              >
                {t("whatsapp")}
              </Button>
            </div>
          </form>
        </FadeIn>
      </Container>
    </section>
  );
}

const inputClass =
  "w-full rounded-[26px] border-2 border-gsm-navy/10 bg-white px-6 py-5 text-lg text-gsm-navy transition-all duration-300 placeholder:text-gsm-muted/60 focus:border-gsm-blue focus:outline-none focus:ring-4 focus:ring-gsm-blue/10";