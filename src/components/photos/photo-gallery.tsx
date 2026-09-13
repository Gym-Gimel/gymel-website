"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { PhotoLightbox } from "@/components/photos/photo-lightbox";
import type { Photo } from "@/types/photos";

type PhotoGalleryProps = {
  albumTitle: string;
  photos: Photo[];
  albumSlug?: string;
  totalCount?: number;
  pageSize?: number;
};

export function PhotoGallery({
  albumTitle,
  photos,
  albumSlug,
  totalCount = photos.length,
  pageSize = 24,
}: PhotoGalleryProps) {
  const [visiblePhotos, setVisiblePhotos] = useState(photos);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasMore = visiblePhotos.length < totalCount;

  const loadMorePhotos = useCallback(async () => {
    if (!albumSlug || isLoadingMore || !hasMore) return false;

    setIsLoadingMore(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        offset: String(visiblePhotos.length),
        limit: String(pageSize),
      });
      const response = await fetch(`/api/photos/${albumSlug}?${params.toString()}`);

      if (!response.ok) throw new Error("Impossible de charger les photos.");

      const data = (await response.json()) as { photos: Photo[] };
      setVisiblePhotos((currentPhotos) => [...currentPhotos, ...data.photos]);
      return data.photos.length > 0;
    } catch {
      setError("Les photos supplémentaires n'ont pas pu être chargées.");
      return false;
    } finally {
      setIsLoadingMore(false);
    }
  }, [albumSlug, hasMore, isLoadingMore, pageSize, visiblePhotos.length]);

  const showNextPhoto = useCallback(async () => {
    if (activeIndex === null) return;

    if (activeIndex < visiblePhotos.length - 1) {
      setActiveIndex(activeIndex + 1);
      return;
    }

    if (hasMore && (await loadMorePhotos())) {
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex, hasMore, loadMorePhotos, visiblePhotos.length]);

  const showPreviousPhoto = useCallback(() => {
    setActiveIndex((index) => (index !== null && index > 0 ? index - 1 : index));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
        {visiblePhotos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-stone-200 bg-stone-100 shadow-soft"
            aria-label={`Ouvrir ${photo.alt}`}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition duration-200 group-hover:scale-[1.03]"
              sizes="(min-width: 1280px) 280px, (min-width: 768px) 30vw, 50vw"
            />
          </button>
        ))}
      </div>

      {albumSlug && hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="rounded bg-brand px-5 py-3 font-bold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => {
              void loadMorePhotos();
            }}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Chargement..." : "Afficher plus de photos"}
          </button>
        </div>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-lg border border-dashed border-stone-300 bg-white p-4 text-center text-sm text-stone-600">
          {error}
        </p>
      ) : null}

      {activeIndex !== null ? (
        <PhotoLightbox
          photos={visiblePhotos}
          currentIndex={activeIndex}
          albumTitle={albumTitle}
          hasNext={activeIndex < visiblePhotos.length - 1 || hasMore}
          isLoadingNext={isLoadingMore}
          onClose={() => setActiveIndex(null)}
          onPrevious={showPreviousPhoto}
          onNext={() => {
            void showNextPhoto();
          }}
        />
      ) : null}
    </div>
  );
}
