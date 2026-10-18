import { useEffect, useRef, useState } from "react";
import { fetchMovieDetails, findTrailer } from "../../Utility/movieDetails";
import styles from "./MovieModal.module.css";

function MovieModal({ movie, autoPlay, onClose }) {
  const [details, setDetails] = useState(movie);
  const [loading, setLoading] = useState(!movie.videos);
  const [error, setError] = useState(false);
  const closeButton = useRef(null);
  const dialog = useRef(null);
  const trailer = findTrailer(details);
  const title = details.title || details.name || "Movie details";
  const year = (details.release_date || details.first_air_date || "").slice(0, 4);

  useEffect(() => {
    let cancelled = false;
    if (!movie.videos) {
      fetchMovieDetails(movie)
        .then((data) => { if (!cancelled) setDetails(data); })
        .catch(() => { if (!cancelled) setError(true); })
        .finally(() => { if (!cancelled) setLoading(false); });
    }
    return () => { cancelled = true; };
  }, [movie]);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    function handleKey(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const buttons = dialog.current?.querySelectorAll("button, iframe");
        const first = buttons?.[0];
        const last = buttons?.[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div ref={dialog} className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="movie-title" onClick={(event) => event.stopPropagation()}>
        <button ref={closeButton} className={styles.close} onClick={onClose} aria-label="Close movie details">×</button>
        {trailer ? (
          <iframe
            className={styles.player}
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailer.key)}?autoplay=${autoPlay ? 1 : 0}&mute=0&controls=1&rel=0&playsinline=1`}
            title={`${title} trailer`}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className={styles.preview}>
            {(details.backdrop_path || details.poster_path) && <img src={`https://image.tmdb.org/t/p/w780${details.backdrop_path || details.poster_path}`} alt="" />}
            <p role="status">{loading ? "Loading trailer…" : error ? "Unable to load the trailer. Please close and try again." : "No trailer is available for this title."}</p>
          </div>
        )}
        <div className={styles.content}>
          <h2 id="movie-title">{title}</h2>
          <div className={styles.meta}>
            {year && <span>{year}</span>}
            <span>{details.vote_average > 0 ? `${details.vote_average.toFixed(1)} / 10` : "Not yet rated"}</span>
            <span>{details.media_type === "tv" || details.first_air_date ? "TV Series" : "Movie"}</span>
          </div>
          <p>{details.overview || "No synopsis is available."}</p>
          <p className={styles.genres}><strong>Genres: </strong>{details.genres?.map((genre) => genre.name).join(" • ") || (loading ? "Loading…" : "Unavailable")}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
