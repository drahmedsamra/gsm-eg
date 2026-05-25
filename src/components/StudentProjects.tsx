"use client";

import { FadeIn } from "@/components/FadeIn";
import { SectionTitle } from "@/components/SectionTitle";
import { Container } from "@/components/ui/Container";
import { MediaImage } from "@/components/ui/MediaImage";
import { studentProjects } from "@/data/projects";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { t as pick } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function StudentProjects() {
  const { locale, t } = useLocale();

  return (
    <section
      id="projects"
      className="bg-gsm-light py-12 sm:py-16"
      aria-labelledby="projects-heading"
    >
      <Container>
        <FadeIn>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-[2px] w-8 rounded-full bg-gsm-blue/40 sm:w-12" />

              <p
                className={cn(
                  "text-lg font-extrabold text-gsm-navy sm:text-2xl",
                  locale === "ar"
                    ? "tracking-normal"
                    : "uppercase tracking-[0.2em]",
                )}
              >
                {locale === "ar" ? "مشاريع الطلاب" : "STUDENT PROJECTS"}
              </p>

              <span className="h-[2px] w-8 rounded-full bg-gsm-blue/40 sm:w-12" />
            </div>

            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold leading-tight text-gsm-navy sm:text-5xl">
                {t("projectsTitle")}
              </h2>

              <p className="mt-3 text-sm leading-6 text-gsm-muted sm:text-base">
                {t("projectsDesc")}
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="mt-7 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex snap-x snap-mandatory gap-4">
            {studentProjects.map((project, i) => (
              <FadeIn key={project.id} delay={i * 50}>
                <article
                  className={cn(
                    "group min-w-[280px] max-w-[280px] snap-center overflow-hidden rounded-[24px]",
                    "border border-gsm-navy/8 bg-white shadow-md",
                    "transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-xl hover:shadow-gsm-navy/10",
                  )}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <MediaImage
                      id={project.imagePlaceholder}
                      alt={pick(locale, project.title)}
                      category="projects"
                      variant="project"
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />

                    <div
                      className="absolute inset-3 rounded-2xl border border-white/20"
                      aria-hidden
                    />
                  </div>

                  <div className="p-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gsm-blue">
                      {pick(locale, project.category)}
                    </span>

                    <h3 className="mt-2 text-base font-bold leading-relaxed text-gsm-navy">
                      {pick(locale, project.title)}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-gsm-muted">
                      {pick(locale, project.description)}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}