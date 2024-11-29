import React from "react";
import Comments from "./comments";

function MovieDetails({ movie, comments, addComment }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const comment = e.target.comment.value;
    addComment({ name, comment });
    e.target.reset();
  };

  return (
    <div className="movie-details">
      <h2>{movie.prominentCharacter.name}</h2>
      <img
        src={movie.prominentCharacter.image}
        alt={movie.prominentCharacter.name}
      />
      <p>{movie.prominentCharacter.bio}</p>
      <h3>Comments</h3>
      <ul>
        {comments.map((c, index) => (
          <li key={index}>
            <strong>{c.name}:</strong> {c.comment}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required />
        <textarea name="comment" placeholder="Your Comment" required />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default MovieDetails;
