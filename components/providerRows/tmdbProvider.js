import TmdbInfiniteRow from "@/components/providerRows/TmdbInfiniteRow";
import { fetchMedia } from "@/lib/tmdb";

export default async function TmdbProvider({ category, type }) {
  const data = await fetchMedia(category, type, {
    page: 1,
    includeMeta: true,
    cache: "no-store",
  });
  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? null;
  return (
    <TmdbInfiniteRow
      category={category}
      type={type}
      initialItems={movies}
      initialPage={1}
      initialTotalPages={totalPages}
    />
  );
}
