"use client";

import Image from "next/image";
import { useState } from "react";
import {
  getDefaultImageSrc,
  type ImageCategory,
} from "@/lib/images";
import { cn } from "@/lib/utils";
import { MediaGrade } from "./MediaGrade";
import { PlaceholderImage } from "./PlaceholderImage";

type MediaImageProps = {
  id: string;
  alt: string;
  category: ImageCategory;
  className?: string;
  variant?: "course" | "project" | "gallery" | "avatar";
  priority?: boolean;
  sizes?: string;
};

export function MediaImage({
  id,
  alt,
  category,
  className,
  variant = "course",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: MediaImageProps) {
  const src = getDefaultImageSrc(category, id);
  const [failed, setFailed] = useState(false);
  const isAvatar = variant === "avatar";

  if (!src || failed) {
    return (
      <PlaceholderImage
        id={id}
        alt={alt}
        variant={variant}
        className={className}
      />
    );
  }

  return (
    <MediaGrade
      className={className}
      variant={isAvatar ? "avatar" : "default"}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        onError={() => setFailed(true)}
        data-image-id={id}
        data-replace-with={`/images/${category}/${id}.jpg`}
      />
    </MediaGrade>
  );
}
