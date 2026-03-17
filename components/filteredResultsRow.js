"use client"
import { Suspense } from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import MovieCard from "@/components/movieCard"
import { useSearchParams } from "next/navigation"
import MovieFilter from "@/components/MovieFilter"

function dedupeById(items) {
  const seen = new Set()
  const out = []
  for (const item of items) {
    if (!item || item.id == null) continue
    if (seen.has(item.id)) continue
    seen.add(item.id)
    out.push(item)
  }
  return out
}

export default function FilteredResultsRow() {
  const searchParams = useSearchParams()
  const with_genres = searchParams.get("with_genres")
  const primary_release_year = searchParams.get("primary_release_year")

  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const scrollerRef = useRef(null)
  const sentinelRef = useRef(null)

  const hasMore = useMemo(() => {
    if (totalPages == null) return true
    return page < totalPages
  }, [page, totalPages])

  useEffect(() => {
    setItems([])
    setPage(1)
    setTotalPages(null)
  }, [with_genres, primary_release_year])

  async function loadNextPage() {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    setError(null)

    const params = new URLSearchParams()
    if (with_genres) params.set("with_genres", with_genres)
    if (primary_release_year) params.set("primary_release_year", primary_release_year)
    params.set("page", page)

    try {
      const res = await fetch(`/api/discover?${params.toString()}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to fetch")

      setItems((prev) => dedupeById([...prev, ...(data.results ?? [])]))
      setPage((prev) => prev + 1)
      if (data.total_pages != null) setTotalPages(data.total_pages)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const rootEl = scrollerRef.current
    const sentinelEl = sentinelRef.current
    if (!rootEl || !sentinelEl) return

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) loadNextPage()
      },
      {
        root: rootEl,
        rootMargin: "200px",
        threshold: 0.01,
      },
    )

    io.observe(sentinelEl)
    return () => io.disconnect()
  }, [with_genres, primary_release_year, page, hasMore, isLoading, loadNextPage])

  // Always render the filter
  return (
    <div className="space-y-4 px-2 md:px-4 flex flex-col">
      <div className="flex gap-4 items-center self-end">
        <h2 className="text-white text-xl font-semibold">Discover</h2>
        <Suspense fallback={<div className="text-gray-400 px-4">Loading filters...</div>}>
          <MovieFilter />
        </Suspense>
      </div>

      {/* Only show results when a filter is selected */}
      {(with_genres || primary_release_year) && (
        <div
          ref={scrollerRef}
          className="flex space-x-4 py-2 px-2 snap-x snap-mandatory overflow-x-auto"
        >
          {items.map((movie) =>
            movie?.poster_path ? (
              <MovieCard key={movie.id} movie={movie} type="movie" />
            ) : null
          )}
          <div ref={sentinelRef} className="shrink-0 w-10" />
          {isLoading && (
            <div className="flex items-center text-gray-300 text-sm shrink-0 pr-4">
              Loading…
            </div>
          )}
          {error && (
            <button type="button" onClick={loadNextPage} className="flex items-center text-red-300 text-sm shrink-0 pr-4 underline">
              Retry
            </button>
          )}
          {!hasMore && (
            <div className="flex items-center text-gray-400 text-sm shrink-0 pr-4">
              End
            </div>
          )}
        </div>
      )}
    </div>
  )
}