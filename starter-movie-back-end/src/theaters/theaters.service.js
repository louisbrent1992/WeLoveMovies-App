const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

// const addMovies = mapProperties({
//   movie_id: "movies[0].movie_id",
//   title: "movies[0].title",
//   runtime_in_minutes: "movies[0].runtime_in_minutes",
//   rating: "movies[0].rating",
//   description: "movies[0].description",
//   image_url: "movies[0].image_url",
//   created_at: "movies[0].created_at",
//   updated_at: "movies[0].updated_at",
//   is_showing: "movies[0].is_showing",
//   theater_id: "movies[0].theater_id",
// });

const reduceTheaterAndMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
  });

function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("t.*", "m.*")
    .then((data) => reduceTheaterAndMovies(data));
}

function read(theater_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("t.*", "m.*")
    .where({ "t.theater_id": theater_id })
    .first()
}

module.exports = {
  list,
  read,
};
