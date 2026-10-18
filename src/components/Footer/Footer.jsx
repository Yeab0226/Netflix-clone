import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>Trailer Showcase — an educational portfolio project.</p>
        <p className={styles.copyright}>Not affiliated with, endorsed by, or operated by Netflix. No sign-in, subscriptions, or payments.</p>
        <p className={styles.copyright}>This product uses the TMDB API but is not endorsed or certified by TMDB. Trailers play through YouTube.</p>
        <a className={styles.footerLink} href="https://www.themoviedb.org/">Movie information from TMDB</a>
      </div>
    </footer>
  );
}

export default Footer;
