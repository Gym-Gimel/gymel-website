import { NextResponse } from "next/server";
import { getPhotoAlbumPage } from "@/lib/photos/files";

const DEFAULT_LIMIT = 24;
const MAX_LIMIT = 48;

function parsePositiveInteger(value: string | null, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const offset = parsePositiveInteger(searchParams.get("offset"), 0);
  const limit = Math.min(
    parsePositiveInteger(searchParams.get("limit"), DEFAULT_LIMIT),
    MAX_LIMIT,
  );
  const page = await getPhotoAlbumPage(slug, offset, limit);

  if (!page) {
    return NextResponse.json({ message: "Album introuvable." }, { status: 404 });
  }

  return NextResponse.json({
    photos: page.photos,
    totalCount: page.totalCount,
    hasMore: page.hasMore,
  });
}
