import React from "react";

function Comments({ comments, addComment }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const comment = e.target.comment.value;

    if (name.trim() && comment.trim()) {
      addComment({ name, comment });
      e.target.reset(); // Limpia el formulario después de agregar un comentario
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {/* Lista de comentarios existentes */}
      <ul>
        {comments.map((c, index) => (
          <li key={index}>
            <strong>{c.name}:</strong> {c.comment}
          </li>
        ))}
      </ul>

      {/* Formulario para agregar un comentario */}
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
        />
        <textarea
          name="comment"
          placeholder="Your Comment"
          required
        ></textarea>
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default Comments;
