"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MovieCard from "@/components/movieCard";

function dedupeById(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    if (!item || item.id == null) continue;
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
  }
  return out;
}

export default function TmdbInfiniteRow({
  category,
  type,
  initialItems,
  initialPage = 1,
  initialTotalPages = null,
}) {
  const [items, setItems] = useState(() => dedupeById(initialItems ?? []));
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const scrollerRef = useRef(null);
  const sentinelRef = useRef(null);
  const hasMore = useMemo(() => {
    if (totalPages == null) return true;
    return page < totalPages;
  }, [page, totalPages]);

  async function loadNextPage() {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setError(null);
    const nextPage = page + 1;

    try {
      const res = await fetch(
        `/api/tmdb?category=${encodeURIComponent(category)}&type=${encodeURIComponent(type)}&page=${nextPage}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to fetch next page");

      setItems((prev) => dedupeById([...prev, ...(data.results ?? [])]));
      setPage(data.page ?? nextPage);
      if (data.total_pages != null) setTotalPages(data.total_pages);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch next page");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const rootEl = scrollerRef.current;
    const sentinelEl = sentinelRef.current;
    if (!rootEl || !sentinelEl) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) loadNextPage();
      },
      {
        root: rootEl,
        rootMargin: "200px",
        threshold: 0.01,
      },
    );

    io.observe(sentinelEl);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, type, page, hasMore, isLoading]);

  return (
    <div
      ref={scrollerRef}
      className="flex space-x-4 py-2 px-2 snap-x snap-mandatory overflow-x-auto"
    >
      {items.map((movie) =>
        movie?.poster_path ? (
          <MovieCard movie={movie} type={type} key={movie.d}/>
        ) : null
      )}

      <div ref={sentinelRef} className="flex-shrink-0 w-10" />

      {isLoading && (
        <div className="flex items-center text-gray-300 text-sm flex-shrink-0 pr-4">
          Loading…
        </div>
      )}
      {error && (
        <button
          type="button"
          onClick={loadNextPage}
          className="flex items-center text-red-300 text-sm flex-shrink-0 pr-4 underline"
        >
          Retry
        </button>
      )}
      {!hasMore && (
        <div className="flex items-center text-gray-400 text-sm flex-shrink-0 pr-4">
          End
        </div>
      )}
    </div>
  );
}

