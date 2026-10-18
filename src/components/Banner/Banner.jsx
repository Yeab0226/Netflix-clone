import React, { useEffect, useState } from "react";


import { Play, Info } from "lucide-react";

import styles from "./Banner.module.css";

import { movieInstance } from "../../Utility/MovieInstance";
import requests from "../../Utility/requestUrls";

const BANNER_BASE = "https://image.tmdb.org/t/p/original/";

function Banner({ onSelect }) {
  let [bannerImage, setBannerImage] = useState({});

  useEffect(() => {
    async function fetchBanner() {
      try {
        const request = await movieInstance.get(requests.fetchNetflixOriginals);

        const movies = request.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];

        setBannerImage(randomMovie);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBanner();
  }, []);

  useEffect(() => {
    console.log(bannerImage);
  }, [bannerImage]);

  //console.log(bannerImage)

  function truncate(str, n) {
    return str?.length ? str.substr(0, n - 1) + " ..." : str;
  }

  return (
    <div
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${BANNER_BASE}${bannerImage.backdrop_path}")`,
      }}
    >
      <div className={styles.contents}>
        {/* logo  */}
        <p>TRAILER SHOWCASE · PORTFOLIO DEMO</p>
        {/* title  */}
        <h1 className={styles.title}>{bannerImage?.original_name}</h1>
        {/* description  */}
        <h1 className={styles.description}>
          {truncate(bannerImage?.overview, 120)}
        </h1>
        {/* buttons  */}
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => onSelect(bannerImage, true)}>
            <Play size={30} />
            Play
          </button>
          <button className={styles.button} onClick={() => onSelect(bannerImage, false)}>
            <Info size={30} />
            More Info
          </button>
        </div>
      </div>
      {/* div for the banner fading effect  */}
      <div className={styles.fadeButtom}></div>
    </div>
  );
}

export default Banner;
