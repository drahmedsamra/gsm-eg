/**
 * GSM Egypt Academy unified media library.
 * Cool-toned tech education photography + consistent Unsplash delivery params.
 * Replace any entry with /public/images/{category}/{id}.jpg when ready.
 */

const UNSPLASH = "https://images.unsplash.com";

/** Shared delivery — same dimensions, quality, and crop behavior sitewide */
function photo(id: string, width: number): string {
  return `${UNSPLASH}/${id}?auto=format&fit=crop&w=${width}&q=85`;
}

const W = {
  card: 960,
  gallery: 1080,
  avatar: 256,
} as const;

/**
 * Curated set: dark/blue tech labs, screens, engineering — grades uniformly in CSS.
 * IDs chosen for similar moody lighting and cool color temperature.
 */
export const defaultImages = {
  courses: {
    
    
    
    
    mobile:"/assets/images/courses-images/mobile.webp",
    electronics: "/assets/images/courses-images/electronics.webp",
    kids: "/assets/images/courses-images/kids.webp",
    robotics: "/assets/images/courses-images/robot.webp",
    ai:    "/assets/images/courses-images/mobile-course-cover.webp",
    programming:    "/assets/images/courses-images/prog.webp",
  },
  projects: {
    "smart-home": photo("photo-1558002038-1055907df827", W.card),
    "ai-classifier": photo("photo-1555949963-aa79dcee981c", W.card),
    "line-follower": photo("photo-1485827404703-89b55fcc595e", W.card),
    "game-app": photo("photo-1516321318423-f06f85e504b3", W.card),
  },
  gallery: {
    "graduation-1": "/assets/images/gallery/graduation1.webp",
    "graduation-2": "/assets/images/gallery/graduation2.webp",
    "graduation-3": "/assets/images/gallery/graduation3.webp",
    "graduation-4": "/assets/images/gallery/graduation4.webp",
    "graduation-5": "/assets/images/gallery/graduation5.webp",
    "graduation-6": "/assets/images/gallery/graduation6.webp",
    "graduation-7": "/assets/images/gallery/graduation7.webp",
    "graduation-8": "/assets/images/gallery/graduation8.webp",
    
  },
  avatars: {

    ahmed:  "/assets/images/avatar/ahmed.webp",
    yousef: "/assets/images/avatar/yousef.webp",
    mostafa: "/assets/images/avatar/mostafa.webp",
    nasr: "/assets/images/avatar/nasr.webp",
    mohsen: "/assets/images/avatar/mohsen.webp",
    karim: "/assets/images/avatar/karim.webp",
    magdy: "/assets/images/avatar/magdy.webp",
    saad: "/assets/images/avatar/saad.webp",
    osama: "/assets/images/avatar/osama.webp",
    mamdouh: "/assets/images/avatar/mamdouh.webp",
    sayed: "/assets/images/avatar/sayed.webp",
    islam: "/assets/images/avatar/islam.webp",

  },
} as const;

export type ImageCategory = keyof typeof defaultImages;

export function getDefaultImageSrc(
  category: ImageCategory,
  id: string,
): string | undefined {
  const group = defaultImages[category] as Record<string, string>;
  return group[id];
}

/** Monogram for fallback tiles — subtle, on-brand */
export const mediaFallbackGlyphs: Partial<Record<string, string>> = {
  programming: "dev",
  electronics: "hw",
  ai: "AI",
  robotics: "bot",
  mobile: "mob",
  kids: "edu",
};
