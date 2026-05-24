import { mediaFallbackGlyphs } from "@/lib/images";
import { cn } from "@/lib/utils";

type PlaceholderImageProps = {
  id: string;
  alt: string;
  className?: string;
  variant?: "course" | "project" | "gallery" | "avatar";
};

/**
 * Fallback when photography is unavailable — matches unified grade palette.
 */
export function PlaceholderImage({
  id,
  alt,
  className,
  variant = "course",
}: PlaceholderImageProps) {
  const glyph = mediaFallbackGlyphs[id];
  const isAvatar = variant === "avatar";

  return (
    <div
      role="img"
      aria-label={alt}
      data-placeholder-id={id}
      data-replace-with={`/images/${variant}s/${id}.jpg`}
      className={cn(
        "unified-media-fallback relative overflow-hidden",
        className,
      )}
    >
      <div className="unified-media-fallback__mesh absolute inset-0" aria-hidden />
      <div className="unified-media-fallback__grid absolute inset-0 opacity-60" aria-hidden />
      <div className="unified-media__glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="unified-media__edge pointer-events-none absolute inset-0" aria-hidden />

      {isAvatar ? (
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-en text-lg font-semibold tracking-wide text-white/70"
        >
          {id.charAt(0).toUpperCase()}
        </span>
      ) : glyph ? (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 flex items-center justify-center font-en font-semibold uppercase tracking-[0.2em] text-white/20",
            variant === "course" ? "text-4xl" : "text-2xl",
          )}
        >
          {glyph}
        </span>
      ) : null}
    </div>
  );
}
