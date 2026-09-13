import Image from "next/image";
import Link from "next/link";
import type { PhotoAlbumSummary } from "@/types/photos";

export function PhotoAlbumCard({ album }: { album: PhotoAlbumSummary }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-soft">
      <div className="relative aspect-[16/9] shrink-0 bg-stone-100">
        <Image
          src={album.cover}
          alt={album.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-bold text-brand">{album.date}</p>
        <h2 className="mt-1 text-xl font-black text-ink">{album.title}</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          {album.description}
        </p>
        <p className="mt-4 text-sm font-bold text-stone-700">
          {album.photoCount} photos
        </p>
        <div className="mt-auto pt-6">
          <Link
            href={`/photos/${album.slug}`}
            className="block rounded border border-brand px-4 py-2 text-center text-sm font-bold text-brand hover:bg-brand hover:text-white"
          >
            Voir l'album
          </Link>
        </div>
      </div>
    </article>
  );
}
