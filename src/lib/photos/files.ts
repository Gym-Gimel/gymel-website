import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { getPhotoAlbumConfig, PHOTO_ALBUMS, type PhotoAlbumConfig } from "@/lib/photos/albums";
import type { Photo, PhotoAlbumSummary } from "@/types/photos";

const EVENTS_IMAGE_ROOT = path.join(process.cwd(), "public", "images", "events");
const WEBP_EXTENSION = ".webp";
const DEFAULT_IMAGE_SIZE = {
  width: 1600,
  height: 1067,
};

function getAlbumDirectory(album: PhotoAlbumConfig) {
  return path.join(EVENTS_IMAGE_ROOT, album.imageDirectory);
}

function toPublicImagePath(album: PhotoAlbumConfig, fileName: string) {
  return `/images/events/${album.imageDirectory}/${fileName}`;
}

export function sortPhotoFileNames(fileNames: string[]) {
  return [...fileNames].sort((a, b) =>
    a.localeCompare(b, "fr-CH", {
      numeric: true,
      sensitivity: "base",
    }),
  );
}

function readUint24LE(buffer: Buffer, offset: number) {
  return buffer[offset] + (buffer[offset + 1] << 8) + (buffer[offset + 2] << 16);
}

export function getWebpDimensions(buffer: Buffer) {
  if (
    buffer.length < 30 ||
    buffer.toString("ascii", 0, 4) !== "RIFF" ||
    buffer.toString("ascii", 8, 12) !== "WEBP"
  ) {
    return null;
  }

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;

    if (dataOffset + chunkSize > buffer.length) return null;

    if (chunkType === "VP8X" && chunkSize >= 10) {
      return {
        width: readUint24LE(buffer, dataOffset + 4) + 1,
        height: readUint24LE(buffer, dataOffset + 7) + 1,
      };
    }

    if (chunkType === "VP8 " && chunkSize >= 10) {
      return {
        width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff,
      };
    }

    if (chunkType === "VP8L" && chunkSize >= 5) {
      const byte1 = buffer[dataOffset + 1];
      const byte2 = buffer[dataOffset + 2];
      const byte3 = buffer[dataOffset + 3];
      const byte4 = buffer[dataOffset + 4];

      return {
        width: 1 + byte1 + ((byte2 & 0x3f) << 8),
        height: 1 + ((byte2 >> 6) | (byte3 << 2) | ((byte4 & 0x0f) << 10)),
      };
    }

    offset = dataOffset + chunkSize + (chunkSize % 2);
  }

  return null;
}

async function readAlbumFileNames(album: PhotoAlbumConfig) {
  const entries = await readdir(getAlbumDirectory(album), { withFileTypes: true });

  return sortPhotoFileNames(
    entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => path.extname(fileName).toLowerCase() === WEBP_EXTENSION),
  );
}

async function getPhoto(album: PhotoAlbumConfig, fileName: string, index: number): Promise<Photo> {
  const filePath = path.join(getAlbumDirectory(album), fileName);
  const dimensions = getWebpDimensions(await readFile(filePath)) ?? DEFAULT_IMAGE_SIZE;

  return {
    src: toPublicImagePath(album, fileName),
    alt: `${album.title} - photo ${index + 1}`,
    width: dimensions.width,
    height: dimensions.height,
    fileName,
  };
}

export async function getPhotoAlbumSummaries(): Promise<PhotoAlbumSummary[]> {
  return Promise.all(
    PHOTO_ALBUMS.map(async (album) => ({
      slug: album.slug,
      title: album.title,
      date: album.date,
      description: album.description,
      cover: album.cover,
      photoCount: (await readAlbumFileNames(album)).length,
    })),
  );
}

export async function getPhotoAlbumSummary(slug: string) {
  const album = getPhotoAlbumConfig(slug);
  if (!album) return null;

  return {
    slug: album.slug,
    title: album.title,
    date: album.date,
    description: album.description,
    cover: album.cover,
    photoCount: (await readAlbumFileNames(album)).length,
  } satisfies PhotoAlbumSummary;
}

export async function getPhotoAlbumPage(slug: string, offset = 0, limit = 24) {
  const album = getPhotoAlbumConfig(slug);
  if (!album) return null;

  const fileNames = await readAlbumFileNames(album);
  const selectedFileNames = fileNames.slice(offset, offset + limit);
  const photos = await Promise.all(
    selectedFileNames.map((fileName, index) => getPhoto(album, fileName, offset + index)),
  );

  return {
    album,
    photos,
    totalCount: fileNames.length,
    hasMore: offset + photos.length < fileNames.length,
  };
}

export async function getPhotoAlbumPreview(album: PhotoAlbumConfig, limit = 10) {
  const fileNames = await readAlbumFileNames(album);
  const selectedFileNames = album.previewFileNames?.length
    ? album.previewFileNames.filter((fileName) => fileNames.includes(fileName)).slice(0, limit)
    : fileNames.slice(0, limit);

  return Promise.all(
    selectedFileNames.map((fileName, index) => getPhoto(album, fileName, index)),
  );
}
