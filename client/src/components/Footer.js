import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <Link to="/" className="footer-brand">
                    CineWave
                </Link>

                <div className="footer-links">
                    <Link to="/" className="footer-link">Home</Link>
                    <Link to="/movies" className="footer-link">Browse</Link>
                    <Link to="/theaters" className="footer-link">Streaming</Link>
                </div>

                <p className="footer-attribution">
                    This product uses the TMDB API but is not endorsed or certified by TMDB.
                    <br />
                    © {new Date().getFullYear()} CineWave. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
