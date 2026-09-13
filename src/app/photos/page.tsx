import type { Metadata } from "next";
import { PhotoAlbumCard } from "@/components/photos/photo-album-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPhotoAlbumSummaries } from "@/lib/photos/files";

export const metadata: Metadata = {
  title: "Photos",
  description: "Albums photos et archives des événements de la Gym de Gimel.",
};

export default async function PhotosPage() {
  const albums = await getPhotoAlbumSummaries();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Archives" title="Photos">
        Retrouvez les albums photos des événements, fêtes et manifestations de
        la Gym de Gimel.
      </SectionHeading>

      <section className="mt-10">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <PhotoAlbumCard key={album.slug} album={album} />
          ))}
        </div>
      </section>
    </div>
  );
}
