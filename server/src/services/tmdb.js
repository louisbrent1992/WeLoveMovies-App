/**
 * TMDB API Service
 * Handles all communication with The Movie Database API
 */

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

/**
 * Helper function to make TMDB API requests
 */
async function fetchTMDB(endpoint, params = {}) {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    url.searchParams.append("api_key", TMDB_API_KEY);

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * Format movie data to match our API structure
 */
function formatMovie(movie) {
    return {
        movie_id: movie.id,
        title: movie.title,
        runtime_in_minutes: movie.runtime || 0,
        rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A",
        description: movie.overview,
        image_url: movie.poster_path
            ? `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`
            : null,
        backdrop_url: movie.backdrop_path
            ? `${TMDB_IMAGE_BASE_URL}/w1280${movie.backdrop_path}`
            : null,
        release_date: movie.release_date,
        genres: movie.genres || [],
        vote_count: movie.vote_count,
        popularity: movie.popularity,
    };
}

/**
 * Format review data to match our API structure
 */
function formatReview(review) {
    return {
        review_id: review.id,
        content: review.content,
        score: review.author_details?.rating || null,
        created_at: review.created_at,
        updated_at: review.updated_at,
        critic: {
            preferred_name: review.author,
            surname: "",
            organization_name: review.author_details?.username || review.author,
            avatar_path: review.author_details?.avatar_path
                ? review.author_details.avatar_path.startsWith("/https")
                    ? review.author_details.avatar_path.slice(1)
                    : `${TMDB_IMAGE_BASE_URL}/w185${review.author_details.avatar_path}`
                : null,
        },
    };
}

/**
 * Get now playing movies
 */
async function getNowPlaying(page = 1) {
    const data = await fetchTMDB("/movie/now_playing", { page });
    return data.results.map(formatMovie);
}

/**
 * Get popular movies
 */
async function getPopularMovies(page = 1) {
    const data = await fetchTMDB("/movie/popular", { page });
    return data.results.map(formatMovie);
}

/**
 * Get all movies (combines now playing for home page)
 */
async function listMovies(isShowing = false) {
    if (isShowing) {
        return getNowPlaying();
    }
    return getPopularMovies();
}

/**
 * Get movie details by ID
 */
async function getMovie(movieId) {
    const movie = await fetchTMDB(`/movie/${movieId}`);
    return formatMovie(movie);
}

/**
 * Get movie reviews
 */
async function getMovieReviews(movieId) {
    const data = await fetchTMDB(`/movie/${movieId}/reviews`);
    return data.results.map(formatReview);
}

/**
 * Get movie credits (cast and crew)
 */
async function getMovieCredits(movieId) {
    const data = await fetchTMDB(`/movie/${movieId}/credits`);
    return {
        cast: data.cast.slice(0, 10).map(person => ({
            id: person.id,
            name: person.name,
            character: person.character,
            profile_path: person.profile_path
                ? `${TMDB_IMAGE_BASE_URL}/w185${person.profile_path}`
                : null,
        })),
        crew: data.crew.filter(person =>
            ["Director", "Producer", "Writer", "Screenplay"].includes(person.job)
        ).map(person => ({
            id: person.id,
            name: person.name,
            job: person.job,
            profile_path: person.profile_path
                ? `${TMDB_IMAGE_BASE_URL}/w185${person.profile_path}`
                : null,
        })),
    };
}

/**
 * Get where to watch a movie (theaters/streaming)
 */
async function getWatchProviders(movieId) {
    const data = await fetchTMDB(`/movie/${movieId}/watch/providers`);
    const usProviders = data.results?.US || {};

    // Format theaters as streaming/rental options
    const theaters = [];

    if (usProviders.flatrate) {
        theaters.push(...usProviders.flatrate.map(provider => ({
            theater_id: provider.provider_id,
            name: provider.provider_name,
            type: "streaming",
            logo_path: provider.logo_path
                ? `${TMDB_IMAGE_BASE_URL}/w92${provider.logo_path}`
                : null,
        })));
    }

    if (usProviders.rent) {
        theaters.push(...usProviders.rent.map(provider => ({
            theater_id: provider.provider_id,
            name: provider.provider_name,
            type: "rent",
            logo_path: provider.logo_path
                ? `${TMDB_IMAGE_BASE_URL}/w92${provider.logo_path}`
                : null,
        })));
    }

    if (usProviders.buy) {
        theaters.push(...usProviders.buy.map(provider => ({
            theater_id: provider.provider_id,
            name: provider.provider_name,
            type: "buy",
            logo_path: provider.logo_path
                ? `${TMDB_IMAGE_BASE_URL}/w92${provider.logo_path}`
                : null,
        })));
    }

    return theaters;
}

/**
 * Search movies
 */
async function searchMovies(query, page = 1) {
    const data = await fetchTMDB("/search/movie", { query, page });
    return data.results.map(formatMovie);
}

/**
 * Get movie genres
 */
async function getGenres() {
    const data = await fetchTMDB("/genre/movie/list");
    return data.genres;
}

/**
 * Get movies by genre
 */
async function getMoviesByGenre(genreId, page = 1) {
    const data = await fetchTMDB("/discover/movie", {
        with_genres: genreId,
        page,
        sort_by: "popularity.desc"
    });
    return data.results.map(formatMovie);
}

module.exports = {
    listMovies,
    getMovie,
    getMovieReviews,
    getMovieCredits,
    getWatchProviders,
    searchMovies,
    getGenres,
    getMoviesByGenre,
    getNowPlaying,
    getPopularMovies,
};
