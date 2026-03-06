import TmdbProvider from "@/components/providerRows/tmdbProvider";
import { fetchMedia } from "@/lib/tmdb";
import Image from "next/image";
export default async function Home() {
  const trending = await fetchMedia("trending", "movie");
  const heroMovie = trending?.results?.[0];
  return (
    <div>
      <main className="space-y-12 pb-6 ">
        {/* Hero Section */}
        <div className="relative lg:h-140 h-96 bg-gray-700 rounded-b-lg overflow-hidden">
          {heroMovie && heroMovie.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
              alt={heroMovie.title}
              fill
              priority
              className="object-cover"
            />
          )}
        </div>

        {/* Trending Movies Row */}
        <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
          <h2 className="text-white text-xl font-semibold">Trending Movies</h2>
          <TmdbProvider category="trending" type="movie" />
        </div>

        {/* Popular TV Shows Row */}
        <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
          <h2 className="text-white text-xl font-semibold">Popular TV Shows</h2>
          <TmdbProvider category="popular" type="tv" />
        </div>

        {/* Airing Today TV Shows Row */}
        <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
          <h2 className="text-white text-xl font-semibold">
            Airing Today TV Shows
          </h2>
          <TmdbProvider category="airing_today" type="tv" />
        </div>

        {/* Top Rated Movies Row */}
        <div className="space-y-2 px-2 md:px-4  ">
          <h2 className="text-white text-xl font-semibold">Top Rated Movies</h2>
          <TmdbProvider category="top_rated" type="movie" />
        </div>

        {/* Top Rated TV Shows Row */}
        <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
          <h2 className="text-white text-xl font-semibold">
            Top Rated TV Shows
          </h2>
          <TmdbProvider category="top_rated" type="tv" />
        </div>

        {/* Upcoming Movies Row */}
        <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
          <h2 className="text-white text-xl font-semibold">Upcoming Movies</h2>
          <TmdbProvider category="upcoming" type="movie" />
        </div>
      </main>
    </div>
  );
}
