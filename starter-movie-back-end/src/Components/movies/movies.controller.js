const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const moviesService = require("./movies.service");

async function list(req, res) {
  const { is_showing } = req.query;
  if (is_showing === "true") {
    const data = await moviesService.isShowing();
    res.json({ data });
  } else {
    const data = await moviesService.list();
    res.json({ data });
  }
}

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
  movieExists,
};
