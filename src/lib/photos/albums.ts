export type PhotoAlbumConfig = {
  slug: string;
  title: string;
  date: string;
  cover: string;
  description: string;
  imageDirectory: string;
  eventSlugs?: string[];
  previewFileNames?: string[];
};

export const PHOTO_ALBUMS: PhotoAlbumConfig[] = [
  {
    slug: "125-ans",
    title: "Fête des 125 ans",
    date: "2026",
    cover: "/images/events/fete-125-ans/001.webp",
    description: "Retour en images sur les 125 ans de la Gym de Gimel.",
    imageDirectory: "fete-125-ans",
  },
  {
    slug: "spectacle-2025",
    title: "Soirée de Gym 2025",
    date: "2025",
    cover: "/images/events/spectacle-2025/001.webp",
    description: "Retour en images sur la soirée de gym de la Gym de Gimel.",
    imageDirectory: "spectacle-2025",
    eventSlugs: ["soiree-de-gym-2025"],
  },
];

export function getPhotoAlbumConfig(slug: string) {
  return PHOTO_ALBUMS.find((album) => album.slug === slug);
}

export function getPhotoAlbumForEventSlug(eventSlug: string) {
  return PHOTO_ALBUMS.find((album) => album.eventSlugs?.includes(eventSlug));
}
