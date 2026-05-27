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
    "lab-1": photo("photo-1581091226825-a6a2a5aee158", W.gallery),
    "coding-1": photo("photo-1504639725590-34d6c12a8f2e", W.gallery),
    "robotics-1": photo("photo-1532094349884-543bc11b234d", W.gallery),
    "kids-1": photo("photo-1522202176988-66273c2fd55f", W.gallery),
    "ai-1": photo("photo-1677442136019-21780ecad995", W.gallery),
    "graduation-1": photo("photo-1524178232363-1fb2b075b655", W.gallery),
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
