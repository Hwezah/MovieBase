type FetchMediaProps = {
    page?: number
    includeMeta?: boolean
} & RequestInit
export async function fetchMedia(category = "trending", type = "movie", options: FetchMediaProps) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB_API_KEY not found in environment");

  const opts = options ?? {};
  const page =
    typeof opts.page === "number"
      ? opts.page
      : Number.parseInt(String(opts.page ?? "1"), 10) || 1;
  const includeMeta = Boolean(opts.includeMeta);
  const { page: _page, includeMeta: _includeMeta, ...fetchOptions } = opts;

  let url: string;
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

export async function fetchMediaDetails(type: string, id: string) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) throw new Error("TMDB_API_KEY not found in environment");

  const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits,videos`;

  const res = await fetch(url);
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

type ActorDetails = {
  name: string
  biography: string
  birthday: string
  profile_path: string
  known_for_department: string
  credits: {
    cast: {
      id: number
      poster_path: string | null
      title?: string
      name?: string
      genres?: { name: string }[]
      release_date?: string
      vote_average?: number
    }[]
  }
}
export async function fetchActorDetails(person_id: string) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) throw new Error("TMDB_API_KEY not found in environment");

  const url = `https://api.themoviedb.org/3/person/${person_id}?api_key=${apiKey}&language=en-US&append_to_response=credits,videos`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch actor details");

  const data = await res.json() as ActorDetails;
  return data;
}


// { with_genres, primary_release_year, sort_by, page }...These are the filters the user selects. It builds a URL with those filters and fetches the results from TMDB.
type FetchDiscoverMoviesProps = {
  with_genres?: string
  primary_release_year?: string
  sort_by?: string
  page?: number 
}
export async function fetchDiscoverMovies({ with_genres, primary_release_year, sort_by,  page = 1 }: FetchDiscoverMoviesProps) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) throw new Error("TMDB_API_KEY not found in environment");

  const params = new URLSearchParams()

// Why URLSearchParams Here??
// We use URLSearchParams instead of manually building the URL string because filters are optional — a user might select only a genre with no year, or only a year with no genre. URLSearchParams lets us conditionally add only the params that have values.
  params.append("api_key", apiKey)
  params.append("page", String(page))
  if (with_genres) params.append("with_genres", with_genres)
  if (primary_release_year) params.append("primary_release_year", primary_release_year)
  if (sort_by) params.append("sort_by", sort_by)


    // The Url is finally constructed Here Based on User Filter Inputs!!!
  const url = `https://api.themoviedb.org/3/discover/movie?${params.toString()}`

  const res = await fetch(url, { cache: "no-store" });
  
  if (!res.ok) throw new Error("Failed to fetch discover movies");

  const data = await res.json();
  return data;
}

type FetchMovieRecommendationsProps = {
  id: string
  page?: number
}
export async function fetchMovieRecommendations({ id, page = 1 }: FetchMovieRecommendationsProps) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB_API_KEY not found in environment");

  const params = new URLSearchParams()
  params.append("api_key", apiKey)
  params.append("page", String(page))

  const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?${params.toString()}`

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch recommendations");

  const data = await res.json();
  return data;
}