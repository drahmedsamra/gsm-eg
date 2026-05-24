"use client";

import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { courses } from "@/data/courses";
import { siteConfig } from "@/data/site";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { t as pick } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const { locale, t } = useLocale();

  return (
    <section
      id="inquiry"
      className="border-y border-gsm-navy/8 bg-white py-20 sm:py-24"
      aria-labelledby="inquiry-heading"
    >
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="inquiry-heading"
              className="text-3xl font-bold text-gsm-navy sm:text-4xl"
            >
              {t("formTitle")}
            </h2>

            <p className="mt-4 text-gsm-muted">
              {t("formDesc")}
            </p>
          </div>

          <form
            action="https://formspree.io/f/mdajdqnr"
            method="POST"
            className="mx-auto mt-10 max-w-xl space-y-5"
          >
            <input type="hidden" name="locale" value={locale} />

            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-semibold text-gsm-navy"
              >
                {t("formName")}
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-semibold text-gsm-navy"
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
                className={cn(inputClass, "text-end")}
              />
            </div>

            <div>
              <label
                htmlFor="course"
                className="mb-1.5 block text-sm font-semibold text-gsm-navy"
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
                className="mb-1.5 block text-sm font-semibold text-gsm-navy"
              >
                {t("formMessage")}
              </label>

              <textarea
                id="message"
                name="message"
                rows={4}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
              >
                {t("formSubmit")}
              </Button>

              <Button
                href={siteConfig.whatsapp.href(locale)}
                variant="secondary"
                className="flex-1"
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
  "w-full rounded-xl border border-gsm-navy/15 bg-gsm-light px-4 py-3 text-gsm-navy transition-colors placeholder:text-gsm-muted/60 focus:border-gsm-blue focus:outline-none focus:ring-2 focus:ring-gsm-blue/20";