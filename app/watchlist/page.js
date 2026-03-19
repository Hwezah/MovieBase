import LoginButton from "@/components/Buttons/loginBtn";
import { fetchMediaDetails } from "@/lib/tmdb";
import supabaseAdmin from "@/lib/supabase/admin";
import { auth } from "@/lib/auth";
import MovieCardOverlay from "@/components/movieCardOverlay";
export default async function WatchlistPage() {
  const { user } = (await auth()) || {}; // guard against null

  if (!user || !user.id) {
    return (
      <div className="space-y-8 overflow-x-hidden py-8 px-4 text-center md:text-left">
        <h1 className="text-white font-bold text-2xl">Your Watchlist</h1>
        <p className="text-gray-300">You must be logged in to view your watchlist.</p>
        <LoginButton />
      </div>
    )
  }
  const { data: watchlistRows } = await supabaseAdmin
  .from("watchlist")
  .select("movie_id")
  .eq("user_id", user.id)

 const movies = await Promise.all(
  watchlistRows.map((row) => fetchMediaDetails("movie", row.movie_id))
 )
  return (
    <div className="space-y-8 overflow-x-hidden py-8 px-4 text-center md:text-left">
      <h1 className="text-white font-bold text-2xl">Your Watchlist</h1>
      {movies.length === 0 ? (
        <p className="text-gray-300">Your watchlist is currently empty.</p>
      ) : (
        <div className="relative flex flex-wrap gap-4">
          {movies.map((movie) => (
            <MovieCardOverlay key={movie.id} movie={movie} type="movie" />
          ))}
        </div>
      )}
    </div>
  );
}
