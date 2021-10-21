if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const theatersRouter = require("./Components/theaters/theaters.router");
const reviewsRouter = require("./Components/reviews/reviews.router");
const moviesRouter = require("./Components/movies/movies.router");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(cors());
app.use(express.json());

app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);
app.use("/movies", moviesRouter);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
