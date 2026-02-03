import React, { useState, useEffect } from "react";
import { listTheaters } from "../utils/api";

function StreamingPage() {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        async function loadProviders() {
            try {
                setLoading(true);
                const data = await listTheaters(abortController.signal);
                setProviders(data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        }

        loadProviders();
        return () => abortController.abort();
    }, []);

    const getProviderIcon = (name) => {
        const icons = {
            'Netflix': '🔴',
            'Amazon Prime Video': '📦',
            'Disney+': '✨',
            'Hulu': '💚',
            'Max': '💜',
            'Apple TV+': '🍎',
        };
        return icons[name] || '📺';
    };

    return (
        <div className="streaming-page">
            <section className="section">
                <div className="container-fluid">
                    <div className="section-header" style={{ marginBottom: "2rem" }}>
                        <h2 className="section-title">Streaming Services</h2>
                    </div>

                    <p style={{
                        color: "var(--color-text-secondary)",
                        marginBottom: "2rem",
                        maxWidth: "600px"
                    }}>
                        Discover where to watch your favorite movies. We partner with the top streaming platforms to help you find content faster.
                    </p>

                    {error && (
                        <div className="error-alert">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="m15 9-6 6" />
                                <path d="m9 9 6 6" />
                            </svg>
                            <span>Error loading streaming services: {error.message}</span>
                        </div>
                    )}

                    {loading ? (
                        <div className="streaming-grid">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="streaming-card">
                                    <div className="loading-skeleton" style={{ width: "80px", height: "80px", borderRadius: "1rem" }} />
                                    <div className="loading-skeleton" style={{ width: "120px", height: "24px", marginTop: "1rem" }} />
                                    <div className="loading-skeleton" style={{ width: "80px", height: "16px", marginTop: "0.5rem" }} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="streaming-grid">
                            {providers.map((provider, index) => (
                                <div key={provider.theater_id || index} className="streaming-card">
                                    {provider.logo_path ? (
                                        <img
                                            src={provider.logo_path}
                                            alt={provider.name}
                                            className="streaming-logo"
                                        />
                                    ) : (
                                        <div className="streaming-logo-placeholder">
                                            {getProviderIcon(provider.name)}
                                        </div>
                                    )}
                                    <h3 className="streaming-name">{provider.name}</h3>
                                    <span className="streaming-type">{provider.type || "Streaming"}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Additional Info Section */}
            <section className="section">
                <div className="container-fluid">
                    <div style={{
                        background: "var(--color-bg-secondary)",
                        borderRadius: "var(--radius-xl)",
                        padding: "var(--space-2xl)",
                        textAlign: "center",
                        border: "1px solid rgba(255, 255, 255, 0.05)"
                    }}>
                        <h3 style={{ marginBottom: "var(--space-md)", fontSize: "1.5rem" }}>
                            Find Where to Watch Any Movie
                        </h3>
                        <p style={{
                            color: "var(--color-text-secondary)",
                            maxWidth: "500px",
                            margin: "0 auto var(--space-lg)"
                        }}>
                            Browse our movie catalog and click on any film to see all available streaming, rental, and purchase options.
                        </p>
                        <a href="/movies" className="btn-primary-glow">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                            Browse Movies
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default StreamingPage;
