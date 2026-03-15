"use client"
import { addToWatchlistAction } from "@/lib/actions/watchlistAction";
import { Plus, Loader2 } from "lucide-react";
import { useState } from "react";

export default function AddToWatchlistBtn({ movie }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleAddToWatchlist = async () => {
    setLoading(true)
    setMessage(null)
    const result = await addToWatchlistAction(movie);
    setLoading(false)
    setMessage(result)
  }

  return (
    <button 
      onClick={handleAddToWatchlist}
      disabled={loading}
      className="text-white cursor-pointer flex flex-col items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
      <p className={message?.success ? "text-green-400" : message?.error ? "text-red-400" : "text-white"}>
        {loading && "Adding..."}
        {message?.success && "Added to Watchlist!"}
        {message?.error && "Already in Watchlist"}
        {!loading && !message && "Watchlist"}
      </p>
    </button>
  )
}