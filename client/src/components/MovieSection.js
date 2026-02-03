import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieSection({ title, movies, linkTo, linkText }) {
    if (!movies || movies.length === 0) {
        return null;
    }

    return (
        <section className="section">
            <div className="container-fluid">
                <div className="section-header">
                    <h2 className="section-title">{title}</h2>
                    {linkTo && (
                        <Link to={linkTo} className="section-link">
                            {linkText || "View All"}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </Link>
                    )}
                </div>

                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.movie_id} movie={movie} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MovieSection;
