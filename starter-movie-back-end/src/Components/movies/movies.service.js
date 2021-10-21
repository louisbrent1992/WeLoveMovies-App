const knex = require("../../db/connection");

function list() {
    return knex("movies").select("*");
}

function isShowing() {
    return knex("movies as m")
        .select("m.*")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")      
        .where( 
            "mt.is_showing", true
        )
        .groupBy("m.movie_id");
}

function read(movie_id) {
    return knex("movies").select("*").where({ "movie_id": movie_id }).first();
}



module.exports = {
    list,
    read,
    isShowing,
}