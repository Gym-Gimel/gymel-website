export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fileName: string;
};

export type PhotoAlbumSummary = {
  slug: string;
  title: string;
  date: string;
  description: string;
  cover: string;
  photoCount: number;
};
