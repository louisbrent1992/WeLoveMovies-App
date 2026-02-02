const { c } = require("tar");
const knex = require("../../db/connection");
const reduceProperties = require("../../utils/reduce-properties");

const reduceCritic = reduceProperties("review_id", {
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
});

function create(review) {
  return knex("reviews")
    .insert(review)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function list(movieId) {
  return knex("reviews as r")
    .join("movies as m", "r.movie_id", "m.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where("r.movie_id", movieId)
    .then(reduceCritic)
    .then((reviews) => {
      return reviews.map((review) => {
        review.critic = review.critic[0]
        return review;
      })
    })
}

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function readCritic(review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id });
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then(() => readCritic(updatedReview.review_id))
    .then((data) => reduceCritic(data)[0])
    .then((review) => {
      review.critic = review.critic[0];
      return review;
    });
}

function destroy(review_id) {
  return knex("reviews").select("*").where({ review_id }).del();
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
  list,
};
