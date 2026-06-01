import Image, { ImageProps } from "next/image";

type OptimizedImageProps = ImageProps & {
  priorityMobile?: boolean;
};

export function OptimizedImage({
  priorityMobile = false,
  quality = 75,
  sizes = "(max-width: 768px) 100vw, 50vw",
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      {...props}
      quality={quality}
      priority={priorityMobile}
      sizes={sizes}
    />
  );
}