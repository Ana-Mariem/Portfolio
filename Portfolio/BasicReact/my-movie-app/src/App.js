import React, { useState } from "react";
import MovieCard from "./components/movieCard";
import MovieDetails from "./components/movieDetails";
import "./components/styles.css";
import sw from "./my-movie-app/src/data.js"
import './my-movie-app/src/components/styles.css'

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState([]);

  const handleLike = (id) => {
    setLikes({ ...likes, [id]: (likes[id] || 0) + 1 });
  };

  const handleDislike = (id) => {
    setLikes({ ...likes, [id]: (likes[id] || 0) - 1 });
  };

  const handleMoreClick = (id) => {
    const movie = movie.find((m) => m.id === id);
    setSelectedMovie(movie);
    setComments([]);
  };

  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <div className="app">
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMoreClick={handleMoreClick}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        ))}
      </div>
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          comments={comments}
          addComment={handleAddComment}
        />
      )}
    </div>
  );
}

export default App;
