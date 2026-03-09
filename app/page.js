export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

import TmdbProvider from "@/components/providerRows/tmdbProvider";

import CommonHeader from "../components/commonHeader";
export default async function Home() {
  return (
    <main className="space-y-12 overflow-x-hidden">
      {/* Hero Section */}
      <CommonHeader />

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
      <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
        <h2 className="text-white text-xl font-semibold">Top Rated Movies</h2>
        <TmdbProvider category="top_rated" type="movie" />
      </div>

      {/* Top Rated TV Shows Row */}
      <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
        <h2 className="text-white text-xl font-semibold">Top Rated TV Shows</h2>
        <TmdbProvider category="top_rated" type="tv" />
      </div>

      {/* Upcoming Movies Row */}
      <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
        <h2 className="text-white text-xl font-semibold">Upcoming Movies</h2>
        <TmdbProvider category="upcoming" type="movie" />
      </div>
    </main>
  );
}
