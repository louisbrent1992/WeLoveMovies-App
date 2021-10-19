const knex = require("../db/connection");

function create(review) {
    return knex("reviews")
        .insert(review)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
};

function read(review_id) {
    return knex("reviews").select("*").where({ review_id }).first();
};

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*")
        .then((updatedRecords) => updatedRecords[0]);
};

function destroy(review_id) {
    return knex("reviews").select("*").where({ review_id }).del();
};

module.exports = {
    create,
    read,
    update,
    delete: destroy,
};