import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readMovie } from "../utils/api";

function MovieDetailPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        async function loadMovie() {
            try {
                setLoading(true);
                const data = await readMovie(movieId, abortController.signal);
                setMovie(data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        }

        loadMovie();
        return () => abortController.abort();
    }, [movieId]);

    if (loading) {
        return (
            <div className="movie-detail">
                <div className="movie-detail-hero">
                    <div className="hero-gradient" />
                    <div className="movie-detail-content" style={{ paddingTop: "100px" }}>
                        <div className="movie-detail-poster">
                            <div className="loading-skeleton" style={{ width: "300px", height: "450px" }} />
                        </div>
                        <div className="movie-detail-info">
                            <div className="loading-skeleton" style={{ width: "200px", height: "32px", marginBottom: "1rem" }} />
                            <div className="loading-skeleton" style={{ width: "400px", height: "48px", marginBottom: "1rem" }} />
                            <div className="loading-skeleton" style={{ width: "300px", height: "24px", marginBottom: "1rem" }} />
                            <div className="loading-skeleton" style={{ width: "100%", maxWidth: "600px", height: "100px" }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="streaming-page">
                <div className="section">
                    <div className="container-fluid">
                        <div className="error-alert">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="m15 9-6 6" />
                                <path d="m9 9 6 6" />
                            </svg>
                            <span>Error loading movie: {error.message}</span>
                        </div>
                        <Link to="/movies" className="btn-primary-glow" style={{ display: "inline-flex", marginTop: "1rem" }}>
                            ← Back to Movies
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!movie) return null;

    return (
        <div className="movie-detail">
            {/* Hero Section with Backdrop */}
            <div className="movie-detail-hero">
                <div className="movie-detail-backdrop">
                    {movie.backdrop_url ? (
                        <img src={movie.backdrop_url} alt={movie.title} />
                    ) : movie.image_url ? (
                        <img src={movie.image_url} alt={movie.title} style={{ filter: "blur(30px)", transform: "scale(1.1)" }} />
                    ) : null}
                </div>
                <div className="hero-gradient" />

                <div className="movie-detail-content">
                    <div className="movie-detail-poster">
                        {movie.image_url ? (
                            <img src={movie.image_url} alt={movie.title} />
                        ) : (
                            <div style={{
                                width: "300px",
                                height: "450px",
                                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "4rem"
                            }}>
                                🎬
                            </div>
                        )}
                    </div>

                    <div className="movie-detail-info">
                        {movie.genres && movie.genres.length > 0 && (
                            <div className="movie-detail-genres">
                                {movie.genres.map((genre) => (
                                    <span key={genre.id || genre.name} className="genre-tag">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h1 className="movie-detail-title">{movie.title}</h1>

                        <div className="movie-detail-meta">
                            {movie.rating && movie.rating !== "N/A" && (
                                <div className="meta-item">
                                    <svg className="meta-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                    <strong>{movie.rating}</strong>/10
                                </div>
                            )}
                            {movie.runtime_in_minutes > 0 && (
                                <div className="meta-item">
                                    <svg className="meta-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    <span>{Math.floor(movie.runtime_in_minutes / 60)}h {movie.runtime_in_minutes % 60}m</span>
                                </div>
                            )}
                            {movie.release_date && (
                                <div className="meta-item">
                                    <svg className="meta-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    <span>{new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                            )}
                        </div>

                        <p className="movie-detail-description">{movie.description}</p>

                        <div className="hero-actions">
                            <a
                                href={`https://www.themoviedb.org/movie/${movie.movie_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary-glow"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                                View on TMDB
                            </a>
                            <Link to="/movies" className="btn-secondary-glass">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 12H5" />
                                    <path d="m12 19-7-7 7-7" />
                                </svg>
                                Back to Browse
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Where to Watch Section */}
            {movie.theaters && movie.theaters.length > 0 && (
                <div className="section" style={{ paddingTop: "100px" }}>
                    <div className="container-fluid">
                        <div className="watch-providers">
                            <h3 className="watch-providers-title">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                                    <polyline points="17 2 12 7 7 2" />
                                </svg>
                                Where to Watch
                            </h3>
                            <div className="providers-grid">
                                {movie.theaters.map((provider, index) => (
                                    <div key={provider.theater_id || index} className="provider-card">
                                        {provider.logo_path ? (
                                            <img src={provider.logo_path} alt={provider.name} className="provider-logo" />
                                        ) : (
                                            <div className="streaming-logo-placeholder">
                                                {provider.name?.charAt(0) || "?"}
                                            </div>
                                        )}
                                        <div>
                                            <div className="provider-name">{provider.name}</div>
                                            <div className="provider-type">{provider.type}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews Section */}
            {movie.reviews && movie.reviews.length > 0 && (
                <div className="reviews-section">
                    <div className="section-header">
                        <h2 className="section-title">
                            Reviews ({movie.reviews.length})
                        </h2>
                    </div>

                    {movie.reviews.slice(0, 5).map((review, index) => (
                        <div key={review.review_id || index} className="review-card">
                            <div className="review-header">
                                <div className="review-author">
                                    <div className="review-avatar">
                                        {review.critic?.avatar_path ? (
                                            <img
                                                src={review.critic.avatar_path}
                                                alt={review.critic.preferred_name}
                                                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                                            />
                                        ) : (
                                            review.critic?.preferred_name?.charAt(0) || "?"
                                        )}
                                    </div>
                                    <div className="review-author-info">
                                        <h4>{review.critic?.preferred_name || "Anonymous"}</h4>
                                        <span>
                                            {review.created_at
                                                ? new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                                : ""}
                                        </span>
                                    </div>
                                </div>
                                {review.score && (
                                    <div className="review-score">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                        {review.score}/10
                                    </div>
                                )}
                            </div>
                            <div className="review-content">
                                {review.content?.length > 500
                                    ? review.content.substring(0, 500) + "..."
                                    : review.content}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MovieDetailPage;
