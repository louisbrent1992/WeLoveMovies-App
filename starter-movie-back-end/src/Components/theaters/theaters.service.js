const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

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
