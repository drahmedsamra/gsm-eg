import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MediaGradeProps = {
  children: ReactNode;
  className?: string;
  /** Slightly softer grade on portrait crops */
  variant?: "default" | "avatar";
};

/**
 * Wraps photography with the GSM unified cinematic grade
 * (navy/blue/purple, soft contrast, premium tech education look).
 */
export function MediaGrade({
  children,
  className,
  variant = "default",
}: MediaGradeProps) {
  return (
    <div
      className={cn(
        "unified-media relative h-full w-full overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "unified-media__photo relative h-full w-full",
          variant === "avatar" && "scale-100 saturate-[0.78] brightness-[0.92]",
        )}
      >
        {children}
      </div>
      <div className="unified-media__grade pointer-events-none absolute inset-0" aria-hidden />
      <div className="unified-media__glow pointer-events-none absolute inset-0" aria-hidden />
      {variant === "default" && (
        <div className="unified-media__vignette pointer-events-none absolute inset-0" aria-hidden />
      )}
      <div className="unified-media__edge pointer-events-none absolute inset-0" aria-hidden />
    </div>
  );
}
