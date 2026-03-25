export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";
import { Suspense } from "react"
import TmdbProvider from "@/components/providerRows/tmdbProvider";
import FilteredResultsRow from "@/components/filteredResultsRow"
import CommonHeader from "../components/commonHeader";


export const metadata = {
  title: "MovieBase — Discover Movies & TV Shows",
  description: "Browse trending, popular and top rated movies and TV shows. Add to your watchlist and never miss a film again.",
  openGraph: {
    title: "MovieBase — Discover Movies & TV Shows",
    description: "Browse trending, popular and top rated movies and TV shows.",
    url: "https://movie-base-zeta.vercel.app",
    siteName: "MovieBase",
    type: "website",
  },
}


export default async function Home() {
  return (
    <main className="space-y-12 overflow-x-hidden pb-20">
    
      <CommonHeader />

<div>
<Suspense fallback={<div className="text-gray-400 px-4">Loading results...</div>}>
  <FilteredResultsRow />
</Suspense>
</div>

      <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
        <h2 className="text-white text-xl font-semibold">Trending Movies</h2>
        <TmdbProvider category="trending" type="movie" />
      </div>


      <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
        <h2 className="text-white text-xl font-semibold">Popular TV Shows</h2>
        <TmdbProvider category="popular" type="tv" />
      </div>

 
      <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
        <h2 className="text-white text-xl font-semibold">
          Airing Today TV Shows
        </h2>
        <TmdbProvider category="airing_today" type="tv" />
      </div>

    
      <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
        <h2 className="text-white text-xl font-semibold">Top Rated Movies</h2>
        <TmdbProvider category="top_rated" type="movie" />
      </div>

      <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
        <h2 className="text-white text-xl font-semibold">Top Rated TV Shows</h2>
        <TmdbProvider category="top_rated" type="tv" />
      </div>

    
      <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
        <h2 className="text-white text-xl font-semibold">Upcoming Movies</h2>
        <TmdbProvider category="upcoming" type="movie" />
      </div>
    </main>
  );
}
