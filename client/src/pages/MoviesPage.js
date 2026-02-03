import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { listMovies } from "../utils/api";

function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        async function loadMovies() {
            try {
                setLoading(true);
                const data = await listMovies(abortController.signal);
                setMovies(data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        }

        loadMovies();
        return () => abortController.abort();
    }, []);

    return (
        <div className="streaming-page">
            <section className="section">
                <div className="container-fluid">
                    <div className="section-header">
                        <h2 className="section-title">Browse All Movies</h2>
                    </div>

                    {error && (
                        <div className="error-alert">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="m15 9-6 6" />
                                <path d="m9 9 6 6" />
                            </svg>
                            <span>Error loading movies: {error.message}</span>
                        </div>
                    )}

                    {loading ? (
                        <div className="movies-grid">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="loading-skeleton"
                                    style={{ aspectRatio: "2/3", borderRadius: "1rem" }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="movies-grid">
                            {movies.map((movie) => (
                                <MovieCard key={movie.movie_id} movie={movie} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default MoviesPage;
