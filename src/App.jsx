import { useState } from "react";

import "./App.css";
import Header from "./components/Header/Header.jsx";
import Banner from "./components/Banner/Banner";
import DisplayRow from "./components/DisplayRow/DisplayRow";
import Footer from "./components/Footer/Footer.jsx";
import MovieModal from "./components/MovieModal/MovieModal";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [autoPlay, setAutoPlay] = useState(false);

  function openMovie(movie, play = true) {
    if (!movie?.id) return;
    setSelectedMovie(movie);
    setAutoPlay(play);
  }

  function closeMovie() {
    setSelectedMovie(null);
  }

  return (
    <>
      <Header />
      <Banner onSelect={openMovie} />
      <DisplayRow onSelect={openMovie} />
      <Footer />
      {selectedMovie && <MovieModal key={`${selectedMovie.media_type || selectedMovie.first_air_date || "movie"}-${selectedMovie.id}`} movie={selectedMovie} autoPlay={autoPlay} onClose={closeMovie} />}
    </>
  );
}

export default App;
