
exports.up = function(knex) {
  return knex.schema.table("reviews", (table) => {
      table.renameColumn("reviews", "review_id");
  });
};

exports.down = function(knex) {
  return knex.schema.table("reviews", (table) => {
      table.renameColumn("review_id", "reviews");
  })
};
