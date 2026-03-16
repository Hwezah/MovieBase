"use client"
import  {removeFromWatchlistAction } from "@/lib/actions/watchlistAction";
import { Minus, Loader2 } from "lucide-react";
import { useState } from "react";

export default function RemoveFromWatchlistBtn({ movie }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleRemoveFromWatchlist = async (e) => {
   e.stopPropagation()
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const result = await removeFromWatchlistAction(movie);
    setLoading(false)
    setMessage(result)
  }

  return (
    <button 
      onClick={(e) => handleRemoveFromWatchlist(e)}
      disabled={loading}
      className="text-white cursor-pointer flex flex-col items-center  disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Minus className="text-white w-8 h-8 transform transition-transform duration-300 group-hover:scale-110"  strokeWidth={1}  />}
      <p
  className={`leading-none -mt-1.5 ${
    message?.success ? "text-green-400" :
    message?.error ? "text-red-400" :
    "text-white"
  }`}
>
        {loading && "Remove..."}
        {message?.success && "Removed!"}
        {message?.error && "Error!"}   
        {!loading && !message && "Un-Watchlist"}
      </p>
    </button>
  )
}