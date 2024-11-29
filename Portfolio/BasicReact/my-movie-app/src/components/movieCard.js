import React, { useState } from "react";
import "./styles.css";

function MovieCard({ movie, onMoreClick, onLike, onDislike }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="movie-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={hover ? movie.affiliationLogo : movie.poster}
        alt={movie.name}
        className={`movie-poster ${movie.affiliation}`}
      />
      <h3>{movie.name} ({movie.year})</h3>
      <div className="actions">
        <button onClick={() => onLike(movie.id)}>👍 Like</button>
        <button onClick={() => onDislike(movie.id)}>👎 Dislike</button>
      </div>
      <button onClick={() => onMoreClick(movie.id)}>More...</button>
    </div>
  );
}

export default MovieCard;
