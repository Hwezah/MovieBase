export async function fetchMedia(category = "trending", type = "movie", options) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB_API_KEY not found in environment");

  const opts = options ?? {};
  const page =
    typeof opts.page === "number"
      ? opts.page
      : Number.parseInt(String(opts.page ?? "1"), 10) || 1;
  const includeMeta = Boolean(opts.includeMeta);
  const { page: _page, includeMeta: _includeMeta, ...fetchOptions } = opts;

  let url;
  if (category === "trending") {
    url = `https://api.themoviedb.org/3/trending/${type}/week?api_key=${apiKey}&language=en-US&page=${page}`;
  } else if (category === "popular") {
    url = `https://api.themoviedb.org/3/${type}/popular?api_key=${apiKey}&language=en-US&page=${page}`;
  } else if (category === "top_rated") {
    url = `https://api.themoviedb.org/3/${type}/top_rated?api_key=${apiKey}&language=en-US&page=${page}`;
  } else if (category === "upcoming" && type === "movie") {
    url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`;
  } else if (category === "now_playing" && type === "movie") {
    url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
  } else if (category === "on_the_air" && type === "tv") {
    url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=${page}`;
  } else if (category === "airing_today" && type === "tv") {
    url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=${page}`;
  } else {
    throw new Error(`Invalid category "${category}" for type "${type}"`);
  }

  const res = await fetch(url, fetchOptions);
  if (!res.ok) throw new Error("Failed to fetch media");
  const data = await res.json();
  if (!includeMeta) return data.results || [];
  return {
    page: data.page ?? page,
    total_pages: data.total_pages ?? null,
    total_results: data.total_results ?? null,
    results: data.results || [],
  };
}

export async function fetchMediaDetails(type, id) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) throw new Error("TMDB_API_KEY not found in environment");

  const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits,videos`;

  const res = await fetch(url);
  console.log("Fetching:", url);
  if (!res.ok) throw new Error("Failed to fetch media details");

  const data = await res.json();
  return data;
}
export async function searchMedia(query) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`,
  );

  if (!res.ok) throw new Error("Failed to search media");

  const data = await res.json();
  return data.results || [];
}
