import Image, { ImageProps } from "next/image";

type OptimizedImageProps = ImageProps & {
  priorityMobile?: boolean;
};

export function OptimizedImage({
  priorityMobile = false,
  quality = 75,
  sizes = "(max-width: 768px) 100vw, 50vw",
  alt = "",
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      alt={alt}
      quality={quality}
      priority={priorityMobile}
      sizes={sizes}
      {...props}
    />
  );
}