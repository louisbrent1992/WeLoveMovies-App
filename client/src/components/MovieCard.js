import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    const getRatingClass = (rating) => {
        const score = parseFloat(rating);
        if (score >= 7) return "high";
        if (score >= 5) return "mid";
        return "low";
    };

    const getYear = (releaseDate) => {
        if (!releaseDate) return "";
        return new Date(releaseDate).getFullYear();
    };

    return (
        <Link to={`/movies/${movie.movie_id}`} className="movie-card">
            {movie.image_url ? (
                <img
                    src={movie.image_url}
                    alt={movie.title}
                    className="movie-card-image"
                    loading="lazy"
                />
            ) : (
                <div
                    className="movie-card-image"
                    style={{
                        background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "3rem"
                    }}
                >
                    🎬
                </div>
            )}

            {movie.rating && movie.rating !== "N/A" && (
                <div className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {movie.rating}
                </div>
            )}

            <div className="movie-card-play">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
            </div>

            <div className="movie-card-overlay">
                <h3 className="movie-card-title">{movie.title}</h3>
                <span className="movie-card-year">{getYear(movie.release_date)}</span>
            </div>
        </Link>
    );
}

export default MovieCard;
