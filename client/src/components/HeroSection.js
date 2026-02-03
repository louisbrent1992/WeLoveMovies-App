import React from "react";
import { Link } from "react-router-dom";

function HeroSection({ movie }) {
    if (!movie || !movie.movie_id) {
        return (
            <section className="hero">
                <div className="hero-backdrop">
                    <div style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, #1a1a25 0%, #0a0a0f 100%)"
                    }} />
                </div>
                <div className="hero-gradient" />
                <div className="hero-glow" />
                <div className="hero-content">
                    <div className="hero-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        Now Streaming
                    </div>
                    <h1 className="hero-title">Discover Your Next Favorite Film</h1>
                    <p className="hero-description">
                        Explore thousands of movies, read reviews from critics, and find where to stream them all in one place.
                    </p>
                    <div className="hero-actions">
                        <Link to="/movies" className="btn-primary-glow">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                            Browse Movies
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="hero">
            <div className="hero-backdrop">
                {movie.backdrop_url ? (
                    <img src={movie.backdrop_url} alt={movie.title} />
                ) : movie.image_url ? (
                    <img src={movie.image_url} alt={movie.title} style={{ filter: "blur(20px)" }} />
                ) : (
                    <div style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, #1a1a25 0%, #0a0a0f 100%)"
                    }} />
                )}
            </div>
            <div className="hero-gradient" />
            <div className="hero-glow" />

            <div className="hero-content">
                <div className="hero-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Featured Today
                </div>

                <h1 className="hero-title">{movie.title}</h1>

                <div className="hero-meta">
                    {movie.rating && movie.rating !== "N/A" && (
                        <div className="hero-rating">
                            <svg className="rating-star" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            {movie.rating}/10
                        </div>
                    )}
                    {movie.runtime_in_minutes > 0 && (
                        <span className="hero-info">
                            {Math.floor(movie.runtime_in_minutes / 60)}h {movie.runtime_in_minutes % 60}m
                        </span>
                    )}
                    {movie.release_date && (
                        <span className="hero-info">
                            {new Date(movie.release_date).getFullYear()}
                        </span>
                    )}
                </div>

                <p className="hero-description">
                    {movie.description?.length > 200
                        ? movie.description.substring(0, 200) + "..."
                        : movie.description}
                </p>

                <div className="hero-actions">
                    <Link to={`/movies/${movie.movie_id}`} className="btn-primary-glow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        View Details
                    </Link>
                    <Link to="/movies" className="btn-secondary-glass">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                        </svg>
                        Browse All
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
