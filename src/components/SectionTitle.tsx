import { cn } from "@/lib/utils";

type SectionTitleProps = {
  eyebrow?: string;
  eyebrowEn?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  light?: boolean;
  className?: string;
};

export function SectionTitle({
  eyebrow,
  eyebrowEn,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-start",
        className,
      )}
    >
      {(eyebrow || eyebrowEn) && (
        <p
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-wide",
            light ? "text-gsm-blue/90" : "text-gsm-blue",
          )}
        >
          {eyebrow && <span>{eyebrow}</span>}
          {eyebrowEn && (
            <span className="font-en text-xs opacity-70">{eyebrowEn}</span>
          )}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem]",
          light ? "text-white" : "text-gsm-navy",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-white/75" : "text-gsm-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
