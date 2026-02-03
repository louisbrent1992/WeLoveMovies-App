import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const history = useHistory();
    const location = useLocation();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            history.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="container-fluid" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <Link to="/" className="navbar-brand">
                    CineWave
                </Link>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Link
                        to="/"
                        className={`nav-link ${isActive("/") ? "active" : ""}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/movies"
                        className={`nav-link ${isActive("/movies") ? "active" : ""}`}
                    >
                        Browse
                    </Link>
                    <Link
                        to="/theaters"
                        className={`nav-link ${isActive("/theaters") ? "active" : ""}`}
                    >
                        Streaming
                    </Link>
                </div>

                <form onSubmit={handleSearch} className="search-container">
                    <svg
                        className="search-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
            </div>
        </nav>
    );
}

export default Navbar;
