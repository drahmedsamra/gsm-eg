import Image from "next/image";
import { GSM_LOGO } from "@/lib/brand";
import { cn } from "@/lib/utils";

type GsmLogoProps = {
  /** Visual height in px — width is computed from the official aspect ratio */
  height?: number;
  className?: string;
  priority?: boolean;
};

/**
 * Official GSM wordmark — height-driven sizing, no stretch, transparent PNG.
 */
export function GsmLogo({
  height = 40,
  className,
  priority = false,
}: GsmLogoProps) {
  const width = Math.round(height * GSM_LOGO.aspectRatio);

  return (
    <span
      className={cn("relative inline-block shrink-0 leading-none", className)}
      style={{ width, height }}
    >
      <Image
        src={GSM_LOGO.src}
        alt={GSM_LOGO.alt}
        width={GSM_LOGO.width}
        height={GSM_LOGO.height}
        priority={priority}
        quality={75}
        sizes={`${width}px`}
        draggable={false}
        className="pointer-events-none block h-full w-full select-none object-contain object-start"
      />
    </span>
  );
}
