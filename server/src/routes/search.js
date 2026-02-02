const express = require("express");
const router = express.Router();
const tmdb = require("../services/tmdb");

/**
 * GET /search
 * Search for movies by query
 */
router.get("/", async (req, res, next) => {
    try {
        const { query, page = 1 } = req.query;

        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }

        const movies = await tmdb.searchMovies(query, page);
        res.json({ data: movies });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /search/genres
 * Get all available movie genres
 */
router.get("/genres", async (req, res, next) => {
    try {
        const genres = await tmdb.getGenres();
        res.json({ data: genres });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /search/genre/:genreId
 * Get movies by genre
 */
router.get("/genre/:genreId", async (req, res, next) => {
    try {
        const { genreId } = req.params;
        const { page = 1 } = req.query;
        const movies = await tmdb.getMoviesByGenre(genreId, page);
        res.json({ data: movies });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
