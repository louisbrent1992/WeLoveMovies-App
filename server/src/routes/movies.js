const express = require("express");
const router = express.Router();
const tmdb = require("../services/tmdb");

/**
 * GET /movies
 * Get all movies, optionally filter by is_showing
 */
router.get("/", async (req, res, next) => {
    try {
        const { is_showing } = req.query;
        const movies = await tmdb.listMovies(is_showing === "true");
        res.json({ data: movies });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /movies/:movieId
 * Get a single movie by ID
 */
router.get("/:movieId", async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const movie = await tmdb.getMovie(movieId);
        res.json({ data: movie });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).json({ error: "Movie cannot be found." });
        }
        next(error);
    }
});

/**
 * GET /movies/:movieId/reviews
 * Get reviews for a movie
 */
router.get("/:movieId/reviews", async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const reviews = await tmdb.getMovieReviews(movieId);
        res.json({ data: reviews });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /movies/:movieId/theaters
 * Get where to watch a movie (streaming/rental options)
 */
router.get("/:movieId/theaters", async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const theaters = await tmdb.getWatchProviders(movieId);
        res.json({ data: theaters });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /movies/:movieId/credits
 * Get cast and crew for a movie
 */
router.get("/:movieId/credits", async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const credits = await tmdb.getMovieCredits(movieId);
        res.json({ data: credits });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
