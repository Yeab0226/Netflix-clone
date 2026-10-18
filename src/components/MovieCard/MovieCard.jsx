import React, { useEffect, useState } from "react";
import styles from "./MovieCard.module.css";
import { FaCirclePlay } from "react-icons/fa6";
import { BsPlusCircle } from "react-icons/bs";
import { GoCheckCircleFill } from "react-icons/go";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { fetchMovieDetails, findTrailer } from "../../Utility/movieDetails";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [details, setDetails] = useState(null);
  const trailer = findTrailer(details);
  const title = movie.title || movie.name;
  const genres = details?.genres || [];

  useEffect(() => {
    if (!hovered) return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      setShowPreview(true);
      if (!details) {
        try {
          const data = await fetchMovieDetails(movie);
          if (!cancelled) setDetails(data);
        } catch {
          // Keep the poster visible when the trailer cannot be loaded.
        }
      }
    }, 800);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [hovered, movie, details]);

  function stopPreview() {
    setHovered(false);
    setShowPreview(false);
  }

  function openMovie(play) {
    stopPreview();
    onSelect(details || movie, play);
  }

  return (
    <div className={styles.cardWrapper} onMouseEnter={() => setHovered(true)} onMouseLeave={stopPreview}>
      <button className={styles.posterButton} onClick={() => openMovie(true)} aria-label={`Play ${title} trailer`}>
        <img className={styles.poster} src={`${IMAGE_BASE}${movie.backdrop_path || movie.poster_path}`} alt={title} />
      </button>
      <div className={styles.hoverCard}>
        <div className={styles.preview}>
          <img className={styles.hoverImage} src={`${IMAGE_BASE}${movie.backdrop_path || movie.poster_path}`} alt="" />
          {showPreview && trailer && (
            <iframe
              className={styles.previewPlayer}
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailer.key)}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1`}
              title={`${title} muted preview`}
              allow="autoplay; encrypted-media"
              tabIndex={-1}
            />
          )}
        </div>
        <div className={styles.badge}>{title}</div>
        <div className={styles.buttonRow}>
          <button className={styles.iconButton} onClick={() => openMovie(true)} aria-label={`Play ${title} trailer`}>
            <FaCirclePlay className={styles.circleButton} color="white" size={40} />
          </button>
          <BsPlusCircle className={styles.circleButton} color="white" size={40} />
          <GoCheckCircleFill className={styles.circleButton} color="white" size={40} />
          <button className={`${styles.iconButton} ${styles.detailsButton}`} onClick={() => openMovie(false)} aria-label={`Details for ${title}`}>
            <IoIosArrowDropdownCircle className={styles.circleButton} color="white" size={40} />
          </button>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.tag}>{(movie.release_date || movie.first_air_date || "").slice(0, 4)}</span>
          <span className={styles.tag}>{movie.vote_average > 0 ? `${movie.vote_average.toFixed(1)} / 10` : "Not yet rated"}</span>
          <span className={styles.tag}>{movie.media_type === "tv" || movie.first_air_date ? "TV Series" : "Movie"}</span>
        </div>
        <div className={styles.genres}>
          {genres.map((genre, index) => (
            <span key={genre.id}>{genre.name}{index < genres.length - 1 && <span className={styles.dot}>•</span>}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
