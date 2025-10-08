import { Link } from 'react-router-dom';
import '../styles/MovieCard.css';

export default function MovieCard({ movie }) {
  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : null;

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="movie-card"
    >
      <div className="movie-poster-container">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie.Title} poster`}
            className="movie-poster"
            loading="lazy"
          />
        ) : (
          <div className="movie-poster-placeholder">
            <div className="movie-poster-placeholder-content">
              <div className="movie-poster-placeholder-icon">🎬</div>
              <div className="movie-poster-placeholder-text">No Poster</div>
            </div>
          </div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">
          {movie.Title}
        </h3>
        <p className="movie-meta">
          {movie.Year} • {movie.Type}
        </p>
      </div>
    </Link>
  );
}