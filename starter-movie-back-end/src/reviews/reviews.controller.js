const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reviewsService = require("./reviews.service");

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: "Review cannot be found.",
  });
}

async function list(req, res) {
    const { movieId } = req.params;
    const data = await reviewsService.list(movieId);
    console.log(data);
    res.json({ data });
}

async function read(req, res, next) {
    const data = await reviewsService.read();
    res.json({ data });
}

async function create(req, res) {
  const data = await reviewsService.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await reviewsService.update(updatedReview);
  
  res.json({ data });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  create: asyncErrorBoundary(create),
  read: [asyncErrorBoundary(reviewExists),asyncErrorBoundary(read)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  reviewExists,
  list,
};
