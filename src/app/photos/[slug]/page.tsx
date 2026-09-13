import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PhotoGallery } from "@/components/photos/photo-gallery";
import { SectionHeading } from "@/components/ui/section-heading";
import { PHOTO_ALBUMS, getPhotoAlbumConfig } from "@/lib/photos/albums";
import { getPhotoAlbumPage, getPhotoAlbumSummary } from "@/lib/photos/files";

const PHOTOS_PER_PAGE = 24;

export function generateStaticParams() {
  return PHOTO_ALBUMS.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const album = getPhotoAlbumConfig(slug);
  if (!album) return {};

  return {
    title: album.title,
    description: album.description,
  };
}

export default async function PhotoAlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [summary, page] = await Promise.all([
    getPhotoAlbumSummary(slug),
    getPhotoAlbumPage(slug, 0, PHOTOS_PER_PAGE),
  ]);

  if (!summary || !page) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/photos"
        className="text-sm font-bold text-brand hover:text-brand-dark"
      >
        Retour aux photos
      </Link>

      <div className="mt-6 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <SectionHeading eyebrow={summary.date} title={summary.title}>
          {summary.description}
        </SectionHeading>
        <p className="text-sm font-bold text-stone-600">
          {summary.photoCount} photos
        </p>
      </div>

      <section className="mt-10">
        <PhotoGallery
          albumTitle={summary.title}
          photos={page.photos}
          albumSlug={summary.slug}
          totalCount={summary.photoCount}
          pageSize={PHOTOS_PER_PAGE}
        />
      </section>
    </div>
  );
}
