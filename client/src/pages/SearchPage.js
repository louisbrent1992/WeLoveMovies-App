import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../utils/api";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchPage() {
    const query = useQuery();
    const searchTerm = query.get("q") || "";
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!searchTerm) {
            setMovies([]);
            return;
        }

        const abortController = new AbortController();

        async function search() {
            try {
                setLoading(true);
                setError(null);
                const data = await searchMovies(searchTerm, abortController.signal);
                setMovies(data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        }

        search();
        return () => abortController.abort();
    }, [searchTerm]);

    return (
        <div className="streaming-page">
            <section className="section">
                <div className="container-fluid">
                    <div className="section-header" style={{ marginBottom: "0.5rem" }}>
                        <h2 className="section-title">
                            {searchTerm ? `Results for "${searchTerm}"` : "Search Movies"}
                        </h2>
                    </div>

                    {searchTerm && !loading && (
                        <p style={{
                            color: "var(--color-text-secondary)",
                            marginBottom: "2rem"
                        }}>
                            Found {movies.length} movie{movies.length !== 1 ? "s" : ""}
                        </p>
                    )}

                    {error && (
                        <div className="error-alert">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="m15 9-6 6" />
                                <path d="m9 9 6 6" />
                            </svg>
                            <span>Error searching: {error.message}</span>
                        </div>
                    )}

                    {!searchTerm && (
                        <div style={{
                            textAlign: "center",
                            padding: "4rem 0"
                        }}>
                            <svg
                                width="80"
                                height="80"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="var(--color-text-muted)"
                                strokeWidth="1.5"
                                style={{ marginBottom: "1.5rem", opacity: 0.5 }}
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                            <h3 style={{ color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>
                                Start Searching
                            </h3>
                            <p style={{ color: "var(--color-text-muted)" }}>
                                Use the search bar above to find movies
                            </p>
                        </div>
                    )}

                    {loading ? (
                        <div className="movies-grid">
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className="loading-skeleton"
                                    style={{ aspectRatio: "2/3", borderRadius: "1rem" }}
                                />
                            ))}
                        </div>
                    ) : movies.length > 0 ? (
                        <div className="movies-grid">
                            {movies.map((movie) => (
                                <MovieCard key={movie.movie_id} movie={movie} />
                            ))}
                        </div>
                    ) : searchTerm && !loading ? (
                        <div style={{
                            textAlign: "center",
                            padding: "4rem 0"
                        }}>
                            <svg
                                width="80"
                                height="80"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="var(--color-text-muted)"
                                strokeWidth="1.5"
                                style={{ marginBottom: "1.5rem", opacity: 0.5 }}
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="m15 9-6 6" />
                                <path d="m9 9 6 6" />
                            </svg>
                            <h3 style={{ color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>
                                No Results Found
                            </h3>
                            <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                                We couldn't find any movies matching "{searchTerm}"
                            </p>
                            <Link to="/movies" className="btn-secondary-glass">
                                Browse All Movies
                            </Link>
                        </div>
                    ) : null}
                </div>
            </section>
        </div>
    );
}

export default SearchPage;
