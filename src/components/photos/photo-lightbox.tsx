"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Photo } from "@/types/photos";

type PhotoLightboxProps = {
  photos: Photo[];
  currentIndex: number;
  albumTitle: string;
  hasNext: boolean;
  isLoadingNext?: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function PhotoLightbox({
  photos,
  currentIndex,
  albumTitle,
  hasNext,
  isLoadingNext = false,
  onClose,
  onPrevious,
  onNext,
}: PhotoLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const currentPhoto = photos[currentIndex];
  const canGoPrevious = currentIndex > 0;

  useEffect(() => {
    const previousActiveElement = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && canGoPrevious) onPrevious();
      if (event.key === "ArrowRight" && hasNext) onNext();

      if (event.key === "Tab") {
        const focusableElements = dialogRef.current?.querySelectorAll<HTMLButtonElement>(
          "button:not(:disabled)",
        );
        const firstElement = focusableElements?.[0];
        const lastElement = focusableElements?.[focusableElements.length - 1];

        if (!firstElement || !lastElement) return;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canGoPrevious, hasNext, onClose, onNext, onPrevious]);

  if (!currentPhoto) return null;

  return (
    <div
      ref={dialogRef}
      aria-label={`Photo ${currentIndex + 1} de ${photos.length} - ${albumTitle}`}
      aria-modal="true"
      className="fixed inset-0 z-[100] bg-ink/95 text-white"
      role="dialog"
      onPointerDown={(event) => {
        touchStartX.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (touchStartX.current === null) return;
        const deltaX = event.clientX - touchStartX.current;
        touchStartX.current = null;

        if (Math.abs(deltaX) < 60) return;
        if (deltaX > 0 && canGoPrevious) onPrevious();
        if (deltaX < 0 && hasNext) onNext();
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded border border-white/30 bg-black/30 text-2xl font-bold hover:bg-white hover:text-ink"
        aria-label="Fermer la photo"
        onClick={onClose}
      >
        ×
      </button>

      <button
        type="button"
        className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded border border-white/30 bg-black/30 text-3xl font-bold hover:bg-white hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Photo précédente"
        onClick={onPrevious}
        disabled={!canGoPrevious}
      >
        ‹
      </button>

      <button
        type="button"
        className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded border border-white/30 bg-black/30 text-3xl font-bold hover:bg-white hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Photo suivante"
        onClick={onNext}
        disabled={!hasNext || isLoadingNext}
      >
        ›
      </button>

      <div className="flex h-full flex-col">
        <div className="relative min-h-0 flex-1">
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            fill
            sizes="100vw"
            className="object-contain p-4 sm:p-8"
          />
        </div>
        <p className="border-t border-white/10 px-4 py-3 text-center text-sm text-stone-200">
          Photo {currentIndex + 1}
        </p>
      </div>
    </div>
  );
}
