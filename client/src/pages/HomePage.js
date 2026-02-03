import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import MovieSection from "../components/MovieSection";
import { listMovies } from "../utils/api";

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        async function loadMovies() {
            try {
                setLoading(true);
                const data = await listMovies(abortController.signal);
                setMovies(data);

                // Pick a random featured movie from the top rated ones
                if (data.length > 0) {
                    const topRated = data
                        .filter(m => m.rating && parseFloat(m.rating) >= 6)
                        .slice(0, 5);
                    const randomIndex = Math.floor(Math.random() * topRated.length);
                    setFeaturedMovie(topRated[randomIndex] || data[0]);
                }
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

    if (error) {
        return (
            <div style={{ paddingTop: "120px", textAlign: "center" }}>
                <div className="error-alert" style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m15 9-6 6" />
                        <path d="m9 9 6 6" />
                    </svg>
                    <span>Error loading movies: {error.message}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="home-page">
            <HeroSection movie={featuredMovie} />

            {loading ? (
                <section className="section">
                    <div className="container-fluid">
                        <div className="section-header">
                            <h2 className="section-title">Now Playing</h2>
                        </div>
                        <div className="movies-grid">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="loading-skeleton"
                                    style={{ aspectRatio: "2/3", borderRadius: "1rem" }}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <>
                    <MovieSection
                        title="Now Playing"
                        movies={movies.slice(0, 10)}
                        linkTo="/movies"
                        linkText="View All Movies"
                    />

                    {movies.length > 10 && (
                        <MovieSection
                            title="Popular This Week"
                            movies={movies.slice(10, 20)}
                            linkTo="/movies"
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default HomePage;
