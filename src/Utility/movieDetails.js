import { movieInstance } from "./MovieInstance";

export async function fetchMovieDetails(movie) {
  const type = movie.media_type || (movie.first_air_date ? "tv" : "movie");
  const response = await movieInstance.get(`/${type}/${movie.id}`, {
    params: { append_to_response: "videos", language: "en-US" },
  });
  return { ...response.data, media_type: type };
}

export function findTrailer(movie) {
  const videos = movie?.videos?.results || [];
  return videos.find((video) => video.site === "YouTube" && video.type === "Trailer" && video.official)
    || videos.find((video) => video.site === "YouTube" && video.type === "Trailer")
    || videos.find((video) => video.site === "YouTube" && video.type === "Teaser");
}
