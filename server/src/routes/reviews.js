const express = require("express");
const router = express.Router({ mergeParams: true });
const tmdb = require("../services/tmdb");

/**
 * GET /reviews (or /movies/:movieId/reviews via merged params)
 * Get reviews - if movieId is present, get reviews for that movie
 */
router.get("/", async (req, res, next) => {
    try {
        const { movieId } = req.params;
        if (movieId) {
            const reviews = await tmdb.getMovieReviews(movieId);
            res.json({ data: reviews });
        } else {
            // Without a movieId, we can't fetch reviews from TMDB
            res.json({ data: [] });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * Note: TMDB doesn't support user-submitted reviews via API
 * These endpoints are kept for API compatibility but will return appropriate responses
 */

router.put("/:reviewId", async (req, res, next) => {
    res.status(501).json({
        error: "Review updates are not supported with TMDB API"
    });
});

router.delete("/:reviewId", async (req, res, next) => {
    res.status(501).json({
        error: "Review deletion is not supported with TMDB API"
    });
});

module.exports = router;
