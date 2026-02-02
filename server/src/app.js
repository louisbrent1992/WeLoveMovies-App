require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const moviesRouter = require("./routes/movies");
const theatersRouter = require("./routes/theaters");
const reviewsRouter = require("./routes/reviews");
const searchRouter = require("./routes/search");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);
app.use("/search", searchRouter);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ error: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    res.status(status).json({ error: message });
});

module.exports = app;
