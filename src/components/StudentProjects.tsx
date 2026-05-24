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
      className="bg-gsm-light py-20 sm:py-24"
      aria-labelledby="projects-heading"
    >
      <Container>
        <FadeIn>
          <SectionTitle
            eyebrow={t("projectsEyebrow")}
            eyebrowEn="Student Work"
            title={t("projectsTitle")}
            description={t("projectsDesc")}
          />
        </FadeIn>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {studentProjects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 100}>
              <article
                className={cn(
                  "group overflow-hidden rounded-2xl border border-gsm-navy/8 bg-white shadow-lg",
                  "transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gsm-navy/10",
                )}
              >
                <div className="grid sm:grid-cols-2">
                  <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[220px]">
                    <MediaImage
                      id={project.imagePlaceholder}
                      alt={pick(locale, project.title)}
                      category="projects"
                      variant="project"
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-4 rounded-xl border-2 border-white/20" aria-hidden />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gsm-blue">
                      {pick(locale, project.category)}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-gsm-navy">
                      {pick(locale, project.title)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gsm-muted">
                      {pick(locale, project.description)}
                    </p>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
