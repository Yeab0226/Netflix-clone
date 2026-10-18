import React from "react";
import styles from "./SlideShow.module.css";
import MovieCard from "./../MovieCard/MovieCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Navigation } from "swiper/modules";

import "swiper/css/navigation";

function SlideShow({ title, movies, onSelect }) {
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.Row}>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={1.4}
          breakpoints={{
            480: {
              slidesPerView: 2.2,
            },
            768: {
              slidesPerView: 2.6,
            },
            1024: {
              slidesPerView: 3.6,
            },
            1440: {
              slidesPerView: 5.2,
            },
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} onSelect={onSelect} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SlideShow;
