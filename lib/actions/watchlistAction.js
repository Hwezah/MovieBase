"use server"

import { auth } from "@/lib/auth"
import supabaseAdmin from "@/lib/supabase/admin"

export async function addToWatchlistAction(movie) {
  const { user } = (await auth()) || {}; // guard against null

  if (!user || !user.id) {
    return { error: "You must be logged in to add to your watchlist" }
  }
  console.log("USER ID:", user.id)
  console.log("MOVIE ID:", movie.id)

  const userId = user.id
  const movieId = movie.id

  const { data: existing } = await supabaseAdmin
    .from("watchlist")
    .select("id")
    .eq("user_id", userId)
    .eq("movie_id", movieId)
    .single()

  if (existing) {
    return { error: "Movie already in your watchlist" }
  }

  const { error } = await supabaseAdmin
    .from("watchlist")
    .insert({ user_id: userId, movie_id: movieId })

  if (error) {
    return { error: "Something went wrong, please try again" }
  }

  return { success: "Movie added to your watchlist!" }
}