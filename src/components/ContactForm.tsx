"use client";

import { useState } from "react";

import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { courses } from "@/data/courses";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { t as pick } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const branches = [
  {
    value: "nasr-city",
    ar: "مدينة نصر",
    en: "Nasr City",
  },

  {
    value: "dokki",
    ar: "الدقي",
    en: "Dokki",
  },

  {
    value: "mansoura",
    ar: "المنصورة",
    en: "Mansoura",
  },

  {
    value: "october",
    ar: "أكتوبر",
    en: "October",
  },

  {
    value: "online",
    ar: "أونلاين",
    en: "Online",
  },
];

export function ContactForm() {
  const { locale, t } = useLocale();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

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

              setSuccess(false);

              const formData = new FormData(
                e.currentTarget
              );

              const selectedBranch = branches.find(
                (branch) =>
                  branch.value ===
                  formData.get("branch")
              );

              const branchName =
                locale === "ar"
                  ? selectedBranch?.ar
                  : selectedBranch?.en;

              const data = {
                name: formData.get("name"),

                phone: formData.get("phone"),

                course: formData.get("course"),

                branch: branchName,

                message: formData.get("message"),

                locale,
              };

              try {
                const response = await fetch(
                  "/api/contact",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body: JSON.stringify(data),
                  }
                );

                if (response.ok) {
                  setSuccess(true);

                  if (
                    typeof window !==
                      "undefined" &&
                    window.fbq
                  ) {
                    window.fbq(
                      "track",
                      "Lead"
                    );
                  }

                  const whatsappMessage =
                    locale === "ar"
                      ? `مرحباً، أريد الحجز والاستفسار عن كورسات جي اس ام مصر

الاسم: ${String(data.name || "")}

رقم الهاتف: ${String(data.phone || "")}

الكورس: ${String(data.course || "")}

الفرع: ${String(data.branch || "")}
`
                      : `Hello, I would like to inquire about GSM Egypt courses

Name: ${String(data.name || "")}

Phone Number: ${String(data.phone || "")}

Course: ${String(data.course || "")}

Branch: ${String(data.branch || "")}
`;

                  (
                    e.target as HTMLFormElement
                  ).reset();

                  setTimeout(() => {
                    window.location.href = `https://wa.me/201011822931?text=${encodeURIComponent(
                      whatsappMessage
                    )}`;
                  }, 1200);
                } else {
                  alert(t("formError"));
                }
              } catch (error) {
                console.error(error);

                alert(t("formError"));
              }

              setLoading(false);
            }}
            className="mx-auto mt-8 max-w-xl space-y-6 rounded-[36px] bg-white p-6 shadow-xl shadow-gsm-navy/5 sm:p-10"
          >
            <input
              type="hidden"
              name="locale"
              value={locale}
            />

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
                placeholder={t(
                  "formNamePlaceholder"
                )}
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
                className={cn(
                  inputClass,
                  "text-end"
                )}
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
                required
                className={inputClass}
                defaultValue=""
              >
                <option value="">
                  {t("formSelectCourse")}
                </option>

                {courses.map((course) => (
                  <option
                    key={course.id}
                    value={pick(
                      locale,
                      course.title
                    )}
                  >
                    {pick(
                      locale,
                      course.title
                    )}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="branch"
                className="mb-2 block text-base font-bold text-gsm-navy"
              >
                {t("formBranch")}
              </label>

              <select
                id="branch"
                name="branch"
                required
                className={inputClass}
                defaultValue=""
              >
                <option value="">
                  {t("formSelectBranch")}
                </option>

                {branches.map((branch) => (
                  <option
                    key={branch.value}
                    value={branch.value}
                  >
                    {locale === "ar"
                      ? branch.ar
                      : branch.en}
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
                placeholder={t(
                  "formMessagePlaceholder"
                )}
                className={cn(
                  inputClass,
                  "resize-none"
                )}
              />
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                disabled={loading}
                variant="primary"
                className="h-16 w-full rounded-full text-lg font-bold shadow-xl shadow-red-500/20 disabled:opacity-70"
              >
                {loading
                  ? t("formSending")
                  : success
                    ? t("formSuccess")
                    : t("bookNow")}
              </Button>

              <p className="text-center text-sm text-gsm-muted">
                {t("formFooterText")}
              </p>
            </div>
          </form>
        </FadeIn>
      </Container>
    </section>
  );
}

const inputClass =
  "font-cairo w-full rounded-[26px] border-2 border-gsm-navy/10 bg-white px-6 py-5 text-lg text-gsm-navy transition-all duration-300 placeholder:text-gsm-muted/60 focus:border-gsm-blue focus:outline-none focus:ring-4 focus:ring-gsm-blue/10";