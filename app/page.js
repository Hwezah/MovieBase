import TmdbProvider from "@/components/providerRows/tmdbProvider";

export default function Home() {
  return (
    <div>
      <main className="space-y-12 py-6 ">
        {/* Hero Section */}
        <div className="h-120 bg-gray-700 rounded-lg flex items-center justify-center text-white text-2xl">
          Hero Banner
        </div>

        {/* Trending Movies Row */}
        <div className="space-y-2">
          <h2 className="text-white text-xl font-semibold">Trending Movies</h2>
          <TmdbProvider category="trending" type="movie" />
        </div>

        {/* Popular Movies Row */}
        <div className="space-y-2">
          <h2 className="text-white text-xl font-semibold">Popular Movies</h2>
          <TmdbProvider category="trending" />
        </div>

        {/* Popular TV Shows Row */}
        <div className="space-y-2">
          <h2 className="text-white text-xl font-semibold">Popular TV Shows</h2>
          <TmdbProvider category="popular" type="tv" />
        </div>

        {/* Airing Today TV Shows Row */}
        <div className="space-y-2">
          <h2 className="text-white text-xl font-semibold">
            Airing Today TV Shows
          </h2>
          <TmdbProvider category="airing_today" type="tv" />
        </div>

        {/* Top Rated Movies Row */}
        <div className="space-y-2">
          <h2 className="text-white text-xl font-semibold">Top Rated Movies</h2>
          <TmdbProvider category="top_rated" type="movie" />
        </div>

        {/* Top Rated TV Shows Row */}
        <div className="space-y-2">
          <h2 className="text-white text-xl font-semibold">
            Top Rated TV Shows
          </h2>
          <TmdbProvider category="top_rated" type="tv" />
        </div>

        {/* Upcoming Movies Row */}
        <div className="space-y-2">
          <h2 className="text-white text-xl font-semibold">Upcoming Movies</h2>
          <TmdbProvider category="upcoming" type="movie" />
        </div>
      </main>
    </div>
  );
}
