export async function fetchMedia(category = "trending", type = "movie") {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB_API_KEY not found in environment");

  let url;
  if (category === "trending") {
    url = `https://api.themoviedb.org/3/trending/${type}/week?api_key=${apiKey}&language=en-US&page=1`;
  } else if (category === "popular") {
    url = `https://api.themoviedb.org/3/${type}/popular?api_key=${apiKey}&language=en-US&page=1`;
  } else if (category === "top_rated") {
    url = `https://api.themoviedb.org/3/${type}/top_rated?api_key=${apiKey}&language=en-US&page=1`;
  } else if (category === "upcoming" && type === "movie") {
    url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;
  } else if (category === "now_playing" && type === "movie") {
    url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
  } else if (category === "on_the_air" && type === "tv") {
    url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=1`;
  } else if (category === "airing_today" && type === "tv") {
    url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=1`;
  } else {
    throw new Error(`Invalid category "${category}" for type "${type}"`);
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch media");
  const data = await res.json();
  console.log(data.results);
  return data.results || [];
}
