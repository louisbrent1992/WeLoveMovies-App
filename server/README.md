# WeLoveMovies API Server

A modern, streamlined Express.js API server powered by [The Movie Database (TMDB)](https://www.themoviedb.org/) API.

## Features

- 🎬 **Movies**: Browse now playing and popular movies
- 🔍 **Search**: Search movies by title or filter by genre
- ⭐ **Reviews**: Get movie reviews from TMDB
- 📺 **Watch Providers**: Find where to stream, rent, or buy movies
- 🎭 **Credits**: Get cast and crew information

## Setup

### 1. Get a TMDB API Key

1. Go to [TMDB](https://www.themoviedb.org/) and create a free account
2. Navigate to Settings → API
3. Click "Request an API Key" and select "Developer"
4. Fill in the required details and accept the terms
5. Copy your API key (v3 auth)

### 2. Configure Environment

```bash
cp .env.sample .env
```

Edit `.env` and add your TMDB API key:

```
PORT=5001
TMDB_API_KEY=your_api_key_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Movies

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/movies` | Get all popular movies |
| GET | `/movies?is_showing=true` | Get now playing movies |
| GET | `/movies/:id` | Get a specific movie |
| GET | `/movies/:id/reviews` | Get movie reviews |
| GET | `/movies/:id/theaters` | Get watch providers |
| GET | `/movies/:id/credits` | Get cast and crew |

### Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/search?query=term` | Search movies by title |
| GET | `/search/genres` | Get all movie genres |
| GET | `/search/genre/:id` | Get movies by genre |

### Theaters

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/theaters` | Get popular streaming services |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |

## Response Format

All responses follow this format:

```json
{
  "data": [...]
}
```

Error responses:

```json
{
  "error": "Error message"
}
```

## Movie Object

```json
{
  "movie_id": 123,
  "title": "Movie Title",
  "runtime_in_minutes": 120,
  "rating": "8.5",
  "description": "Movie description...",
  "image_url": "https://image.tmdb.org/t/p/w500/...",
  "backdrop_url": "https://image.tmdb.org/t/p/w1280/...",
  "release_date": "2024-01-01",
  "genres": [...],
  "vote_count": 1000,
  "popularity": 50.5
}
```

## Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

![TMDB Logo](https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg)
