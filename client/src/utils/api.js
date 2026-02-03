const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch JSON from the specified URL and handle errors
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Populate movie reviews
 */
function populateReviews(signal) {
  return async (movie) => {
    const url = `${API_BASE_URL}/movies/${movie.movie_id}/reviews`;
    movie.reviews = await fetchJson(url, { headers, signal }, []);
    return movie;
  };
}

/**
 * Populate movie theaters/providers
 */
function populateTheaters(signal) {
  return async (movie) => {
    const url = `${API_BASE_URL}/movies/${movie.movie_id}/theaters`;
    movie.theaters = await fetchJson(url, { headers, signal }, []);
    return movie;
  };
}

/**
 * Get now playing movies
 */
export async function listMovies(signal) {
  const url = new URL(`${API_BASE_URL}/movies?is_showing=true`);
  return await fetchJson(url, { headers, signal }, []);
}

/**
 * Get all streaming providers
 */
export async function listTheaters(signal) {
  const url = new URL(`${API_BASE_URL}/theaters`);
  return await fetchJson(url, { headers, signal }, []);
}

/**
 * Get a single movie with reviews and theaters
 */
export async function readMovie(movieId, signal) {
  const url = new URL(`${API_BASE_URL}/movies/${movieId}`);
  const addReviews = populateReviews(signal);
  const addTheaters = populateTheaters(signal);
  return await fetchJson(url, { headers, signal }, [])
    .then(addReviews)
    .then(addTheaters);
}

/**
 * Search movies by query
 */
export async function searchMovies(query, signal) {
  const url = new URL(`${API_BASE_URL}/search`);
  url.searchParams.append("query", query);
  return await fetchJson(url, { headers, signal }, []);
}

/**
 * Get movie genres
 */
export async function listGenres(signal) {
  const url = new URL(`${API_BASE_URL}/search/genres`);
  return await fetchJson(url, { headers, signal }, []);
}

/**
 * Get movies by genre
 */
export async function listMoviesByGenre(genreId, signal) {
  const url = new URL(`${API_BASE_URL}/search/genre/${genreId}`);
  return await fetchJson(url, { headers, signal }, []);
}

/**
 * Delete a review (not supported with TMDB)
 */
export async function deleteReview(reviewId) {
  const url = `${API_BASE_URL}/reviews/${reviewId}`;
  return await fetchJson(url, { method: "DELETE", headers }, {});
}

/**
 * Update a review (not supported with TMDB)
 */
export async function updateReview(reviewId, data) {
  const url = `${API_BASE_URL}/reviews/${reviewId}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data }),
  };
  return await fetchJson(url, options, {});
}
