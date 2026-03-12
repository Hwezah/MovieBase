import { fetchMedia } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "trending";
  const type = searchParams.get("type") || "movie";
  const pageParam = searchParams.get("page") || "1";
  const page = Number.parseInt(pageParam, 10) || 1;

  try {
    const data = await fetchMedia(category, type, {
      page,
      includeMeta: true,
      cache: "no-store",
    });
    return Response.json(data);
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Failed to fetch media" },
      { status: 400 },
    );
  }
}

