import { fetchMovieRecommendations } from "@/lib/tmdb";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");        // add this
    const pageParam = searchParams.get("page") || "1";
    const page = Number.parseInt(pageParam, 10) || 1;

  
  
    try {
      const data = await fetchMovieRecommendations({ id, page });
      return Response.json(data);
    } catch (e) {
      return Response.json(
        { error: e instanceof Error ? e.message : "Failed to fetch media" },
        { status: 400 },
      );
    }
  }