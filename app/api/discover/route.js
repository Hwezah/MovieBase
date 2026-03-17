import { fetchDiscoverMovies } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const with_genres = searchParams.get("with_genres");
  const primary_release_year = searchParams.get("primary_release_year");
  const sort_by = searchParams.get("sort_by");
  const pageParam = searchParams.get("page") || "1";
  const page = Number.parseInt(pageParam, 10) || 1;

  try {
    const data = await fetchDiscoverMovies({with_genres, primary_release_year, sort_by,
      page,
    });
    return Response.json(data);
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Failed to fetch media" },
      { status: 400 },
    );
  }
}