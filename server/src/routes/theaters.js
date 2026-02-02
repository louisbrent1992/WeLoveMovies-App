const express = require("express");
const router = express.Router({ mergeParams: true });
const tmdb = require("../services/tmdb");

/**
 * GET /theaters (or /movies/:movieId/theaters via merged params)
 * Get watch providers/theaters for a movie
 */
router.get("/", async (req, res, next) => {
    try {
        const { movieId } = req.params;
        if (movieId) {
            const theaters = await tmdb.getWatchProviders(movieId);
            res.json({ data: theaters });
        } else {
            // Return popular streaming services as "theaters" when no movieId
            res.json({
                data: [
                    { theater_id: 1, name: "Netflix", type: "streaming" },
                    { theater_id: 2, name: "Amazon Prime Video", type: "streaming" },
                    { theater_id: 3, name: "Disney+", type: "streaming" },
                    { theater_id: 4, name: "Hulu", type: "streaming" },
                    { theater_id: 5, name: "Max", type: "streaming" },
                    { theater_id: 6, name: "Apple TV+", type: "streaming" },
                ]
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
