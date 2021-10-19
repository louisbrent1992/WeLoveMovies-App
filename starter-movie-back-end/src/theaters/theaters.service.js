const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

const addMovies = mapProperties({
    movie_id: "movies[0].movie_id",
    title: "movies[0].title",
    runtime_in_minutes: "movies[0].runtime_in_minutes",
    rating: "movies[0].rating",
    description: "movies[0].description",
    image_url: "movies[0].image_url",
    created_at: "movies[0].created_at",
    updated_at: "movies[0].updated_at",
    is_showing: "movies[0].is_showing",
    theater_id: "movies[0].theater_id",
  });

const reduceTheaterAndMovies = reduceProperties("theater_id", {
    theater_id: ["theater", "theater_id"],
    name: ["theater", "name"],
    address_line_1: ["theater", "address_line_1"],
    address_line_2: ["theater", "address_line_2"],
    city: ["theater", "city"],
    state: ["theater", "state"],
    zip: ["theater", "zip"],
    created_at: ["theater", "created_at"],
    updated_at: ["theater", "updated_at"],
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    created_at: ["movies", null, "created_at"],
    updated_at: ["movies", null, "updated_at"],
    is_showing: ["movies", null, "is_showing"],
    theater_id: ["movies", null, "theater_id"],
  });

function list() {
    return knex("theaters").select("*");
};

function read(theater_id) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .select("t.*", "m.*")
        .where({ "t.theater_id": theater_id })
        .first()
        .then(addMovies)
        .then(reduceTheaterAndMovies);
};

module.exports = {
    list,
    read,
};