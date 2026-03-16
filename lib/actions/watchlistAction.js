"use server"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import supabaseAdmin from "@/lib/supabase/admin"

export async function addToWatchlistAction(movie) {
  const { user } = (await auth()) || {}; // guard against null

  if (!user || !user.id) {
    return { error: "You must be logged in to add to your watchlist" }
  }

  const userId = user.id
  const movieId = movie.id

  // Use maybeSingle() so "no row" is not an error; only a returned row means "already added"
  const { data: existing } = await supabaseAdmin
    .from("watchlist")
    .select("id")
    .eq("user_id", userId)
    .eq("movie_id", movieId)
    .maybeSingle()

  if (existing) {
    return { error: "Movie already in your watchlist" }
  }
  const { error } = await supabaseAdmin
    .from("watchlist")
    .insert({ user_id: userId, movie_id: movieId })

  if (error) {
    return { error: "Something went wrong, please try again" }
  }
  revalidatePath("/watchlist")
  return { success: "Movie added to your watchlist!" }
}


export async function removeFromWatchlistAction(movie) {
  const { user } = (await auth()) || {}; // guard against null

  if (!user || !user.id) {
    return { error: "You must be logged in to remove from your watchlist" };
  }

  const userId = user.id;
  const movieId = movie.id;

  const { data, error } = await supabaseAdmin
    .from("watchlist")
    .delete()
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  if (error) {
    return { error: "Something went wrong, please try again" };
  }

  // Revalidate page to update UI
  revalidatePath("/watchlist");

  return { success: true };
}
